import { NextRequest, NextResponse } from "next/server";
import { chatStream } from "@/app/lib/api-client";
import { randomUUID } from "crypto";

interface ChatRequest {
  message: string;
  session_id?: string;
}

/**
 * Strips markdown code-fence wrappers (```json...```) that the LLM sometimes
 * adds around its JSON output.
 */
function stripCodeFence(raw: string): string {
  const t = raw.trim();
  if (!t.startsWith("```")) return t;
  const withoutOpen = t.replace(/^```(?:\w+)?\n?/, "");
  const closingIdx = withoutOpen.search(/`{2,}/);
  return closingIdx >= 0 ? withoutOpen.slice(0, closingIdx).trim() : withoutOpen.trim();
}

/**
 * Repairs a JSON string that is missing its closing brace(s) because Dify
 * appended its metadata blob directly after the main response without first
 * closing the outer object:
 *   {"action":"show_products"...{"type":"metadata","conversation_id":"..."}
 */
function repairTruncatedJson(raw: string): string {
  const t = raw.trim();
  if (!t.startsWith("{")) return t;

  // Remove Dify metadata blob appended at the tail
  const withoutMeta = t.replace(/\{"type"\s*:\s*"metadata"[^}]*\}/g, "").trim();

  // Count brace depth to find how many closing braces are missing
  let depth = 0;
  let inString = false;
  let escaped = false;
  for (const ch of withoutMeta) {
    if (escaped) { escaped = false; continue; }
    if (ch === "\\" && inString) { escaped = true; continue; }
    if (ch === '"') { inString = !inString; continue; }
    if (inString) continue;
    if (ch === "{") depth++;
    else if (ch === "}") depth--;
  }

  return depth > 0 ? withoutMeta + "}".repeat(depth) : withoutMeta;
}

/**
 * Extracts the first complete JSON object from a string using brace-depth
 * counting, handling nested objects and quoted strings.
 * Used to strip the Dify metadata blob appended after the main response.
 */
function extractFirstJson(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed.startsWith("{")) return null;

  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let i = 0; i < trimmed.length; i++) {
    const ch = trimmed[i];
    if (escaped) { escaped = false; continue; }
    if (ch === "\\" && inString) { escaped = true; continue; }
    if (ch === '"') { inString = !inString; continue; }
    if (inString) continue;
    if (ch === "{") depth++;
    else if (ch === "}") {
      depth--;
      if (depth === 0) return trimmed.slice(0, i + 1);
    }
  }

  return null;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ChatRequest;

    if (!body.message || typeof body.message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const session_id = body.session_id || randomUUID();

    const upstreamResponse = await chatStream({
      message: body.message,
      session_id,
    });

    if (!upstreamResponse.body) {
      return NextResponse.json({ error: "No upstream body" }, { status: 502 });
    }

    // Fully buffer the Dify SSE stream before sending anything to the client.
    //
    // Streaming Dify tokens directly causes JSON fragmentation: the LLM tokeniser
    // splits JSON key/value pairs across multiple SSE events, so naively
    // concatenating the tokens often produces invalid JSON (e.g. `"cards[],`
    // instead of `"cards": [],`).  Buffering lets us return a single, coherent
    // SSE data event that the client can parse reliably.
    const reader = upstreamResponse.body.getReader();
    const decoder = new TextDecoder();
    let rawSse = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      rawSse += decoder.decode(value, { stream: true });
    }

    // Reconstruct the response content by joining all `data: …` tokens.
    let accumulated = "";
    for (const line of rawSse.split("\n")) {
      if (!line.startsWith("data: ")) continue;
      const token = line.slice(6);
      if (token === "</stream>") continue;
      accumulated += token;
    }

    // Strip markdown code fences (```json…```) that the LLM sometimes adds,
    // repair truncated JSON (Dify appends metadata without closing the main
    // object), then extract a clean JSON object for the client.
    const stripped = stripCodeFence(accumulated);
    const repaired = stripped.startsWith("{") ? repairTruncatedJson(stripped) : stripped;
    let responsePayload = repaired;

    if (repaired.startsWith("{")) {
      const firstJson = extractFirstJson(repaired);
      if (firstJson) {
        try {
          JSON.parse(firstJson);     // validate — use only if parseable
          responsePayload = firstJson;
        } catch {
          // firstJson is brace-balanced but unparseable (streaming fragmentation).
          // Return the repaired string; the client-side regex fallback will
          // extract the known fields from it.
          responsePayload = repaired;
        }
      }
    }

    // Return the complete, deduplicated response as a single SSE event.
    const encoder = new TextEncoder();
    const ssePayload = `data: ${responsePayload}\n\ndata: </stream>\n\n`;

    return new NextResponse(encoder.encode(ssePayload), {
      status: 200,
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "X-Session-Id": session_id,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal server error";

    const status = message.includes("not configured") ? 503 : 502;

    return NextResponse.json({ error: message }, { status });
  }
}
