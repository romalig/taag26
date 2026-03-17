export interface DifyCard {
  id: string;
  name: string;
  /** Category label — may be "PCR Kit", "Kit", "Service", etc. */
  category: string;
  technology: string;
  timeToResult: string;
  deliverables: string[];
  /** Product's own description (from product.description in the API response) */
  productDescription?: string;
  canonicalUrl: string;
  /** Card type from API — "product_match" = catalog product, others = landing page */
  type: string;
}

export type DifyAction =
  | "show_products"
  | "ask_clarification"
  | "no_results"
  | "out_of_scope"
  | "error";

export interface DifyResponse {
  action: DifyAction;
  message: string;
  cards?: DifyCard[];
  follow_up?: string;
}

const KNOWN_ACTIONS: DifyAction[] = [
  "show_products",
  "ask_clarification",
  "no_results",
  "out_of_scope",
  "error",
];

/**
 * Normalises a raw card object from the API into a DifyCard.
 *
 * The API returns cards in a nested format:
 *   { type, match_level, product: { name, code, specs: { dye, pcr_time }, ... } }
 *
 * This function handles both that nested format and any future flat format.
 */
function normalizeCard(raw: unknown): DifyCard | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;

  // Nested format: { type: "product_match", product: { ... } }
  if (r.product && typeof r.product === "object") {
    const p = r.product as Record<string, unknown>;
    const specs =
      p.specs && typeof p.specs === "object"
        ? (p.specs as Record<string, unknown>)
        : {};

    // technology: prefer product-level technology field, fall back to specs.dye
    const technology = String(p.technology || specs.dye || "");

    // timeToResult: prefer product-level time_to_result, fall back to specs.pcr_time
    const timeToResult = String(
      p.time_to_result || p.timeToResult || specs.pcr_time || ""
    );

    return {
      id: String(p.code || p.id || ""),
      name: String(p.name || ""),
      category: String(p.category || ""),
      technology,
      timeToResult,
      deliverables: Array.isArray(p.kit_contents)
        ? (p.kit_contents as unknown[]).map(String)
        : Array.isArray(p.deliverables)
        ? (p.deliverables as unknown[]).map(String)
        : [],
      productDescription: p.description ? String(p.description) : undefined,
      canonicalUrl: typeof p.url === "string" && p.url ? p.url
        : typeof p.canonicalUrl === "string" && p.canonicalUrl ? p.canonicalUrl
        : "",
      type: String(r.type || "product_match"),
    };
  }

  // Flat format: { id, name, category, ... }
  if (r.id || r.name) {
    return {
      id: String(r.id || ""),
      name: String(r.name || ""),
      category: String(r.category || ""),
      technology: String(r.technology || ""),
      timeToResult: String(r.timeToResult || ""),
      deliverables: Array.isArray(r.deliverables)
        ? (r.deliverables as unknown[]).map(String)
        : [],
      productDescription: r.description ? String(r.description) : undefined,
      canonicalUrl: String(r.canonicalUrl || ""),
      type: String(r.type || "product_match"),
    };
  }

  return null;
}

/**
 * Strips markdown code-fence wrappers that LLMs sometimes add around JSON.
 * Handles ```json\n{...}\n``` and also partial fences like ```json{...}``
 */
function stripCodeFence(raw: string): string {
  const t = raw.trim();
  if (!t.startsWith("```")) return t;
  // Remove opening fence (```json or ```)
  const withoutOpen = t.replace(/^```(?:\w+)?\n?/, "");
  // Remove closing `` or ``` and everything after (e.g. Dify metadata blob)
  const closingIdx = withoutOpen.search(/`{2,}/);
  return closingIdx >= 0 ? withoutOpen.slice(0, closingIdx).trim() : withoutOpen.trim();
}

/**
 * Repairs a JSON string that is missing its closing brace(s) because Dify
 * appended its metadata blob directly after the main response without first
 * closing the outer object:
 *
 *   {"action":"show_products"...{"type":"metadata","conversation_id":"..."}
 *
 * Steps:
 *  1. Strip any Dify metadata blob ({"type":"metadata",...})
 *  2. Count remaining unclosed braces and append the missing `}`s
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
 * Extracts the first complete JSON object from a string.
 * Handles cases where extra data (e.g. Dify metadata) is concatenated after the main JSON.
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

function tryParse(jsonStr: string): DifyResponse | null {
  try {
    const parsed = JSON.parse(jsonStr);
    if (!parsed || typeof parsed !== "object") return null;

    // 1. Fully structured response with recognised action
    if (KNOWN_ACTIONS.includes(parsed.action)) {
      return {
        action: parsed.action as DifyAction,
        message: String(parsed.message || ""),
        cards: Array.isArray(parsed.cards)
          ? (parsed.cards as unknown[]).map(normalizeCard).filter(Boolean) as DifyCard[]
          : undefined,
        follow_up: typeof parsed.follow_up === "string" ? parsed.follow_up : undefined,
      };
    }

    // 2. Plain error JSON from backend: {"error": "..."}
    if (typeof parsed.error === "string") {
      return { action: "error", message: parsed.error };
    }

    // 3. Dify metadata object — skip it entirely
    if (parsed.type === "metadata" || parsed.event === "message_end") {
      return null;
    }

    // 4. JSON parsed successfully but action is missing / unrecognised.
    //    Try common field names so we can still show the message to the user.
    const fallbackMessage: string | null =
      typeof parsed.message === "string" ? parsed.message :
      typeof parsed.answer  === "string" ? parsed.answer  :
      typeof parsed.text    === "string" ? parsed.text    :
      typeof parsed.content === "string" ? parsed.content :
      null;

    if (fallbackMessage) {
      const action: DifyAction =
        KNOWN_ACTIONS.includes(parsed.action)
          ? parsed.action
          : "ask_clarification";
      return {
        action,
        message: fallbackMessage,
        cards: Array.isArray(parsed.cards)
          ? (parsed.cards as unknown[]).map(normalizeCard).filter(Boolean) as DifyCard[]
          : undefined,
        follow_up: typeof parsed.follow_up === "string" ? parsed.follow_up : undefined,
      };
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Last-resort parser: Dify's LLM tokeniser sometimes splits JSON key/value pairs
 * across SSE events (e.g. `"cards` → `[],`), producing invalid JSON when naively
 * concatenated. This function extracts known DifyResponse fields via regex so we
 * can still present the response even when JSON.parse fails.
 */
function extractByRegex(s: string): DifyResponse | null {
  const actionMatch = s.match(/"action"\s*:\s*"([^"]+)"/);
  if (!actionMatch) return null;

  const action = actionMatch[1] as DifyAction;
  if (!KNOWN_ACTIONS.includes(action)) return null;

  const unescape = (v: string) =>
    v.replace(/\\"/g, '"').replace(/\\n/g, "\n").replace(/\\t/g, "\t");

  const messageMatch = s.match(/"message"\s*:\s*"((?:[^"\\]|\\.)*)"/);
  const message = messageMatch ? unescape(messageMatch[1]) : "";

  const followUpMatch = s.match(/"follow_up"\s*:\s*"((?:[^"\\]|\\.)*)"/);
  const follow_up = followUpMatch ? unescape(followUpMatch[1]) : undefined;

  // For show_products, try to extract and normalise the cards array
  let cards: DifyCard[] | undefined;
  if (action === "show_products") {
    const cardsMatch = s.match(/"cards"\s*:\s*(\[[\s\S]*?\])/);
    if (cardsMatch) {
      try {
        const raw: unknown[] = JSON.parse(cardsMatch[1]);
        cards = raw.map(normalizeCard).filter(Boolean) as DifyCard[];
      } catch { cards = []; }
    } else {
      cards = [];
    }
  }

  return { action, message, follow_up, cards };
}

export function parseDifyResponse(raw: string): DifyResponse | null {
  // Strip markdown code fences before any parsing attempt.
  // The Dify LLM sometimes wraps its JSON output in ```json ... ```.
  const stripped = stripCodeFence(raw);

  // Repair truncated JSON: Dify sometimes appends its metadata blob without
  // first closing the main response object, leaving an unclosed `{`.
  const trimmed = stripped.startsWith("{") ? repairTruncatedJson(stripped) : stripped;

  // 1. Try direct parse (clean single JSON)
  const direct = tryParse(trimmed);
  if (direct) return direct;

  // 2. Try extracting the first JSON object
  // Handles: {main response}{metadata} concatenated by Dify
  const firstJson = extractFirstJson(trimmed);
  if (firstJson) {
    const parsed = tryParse(firstJson);
    if (parsed) return parsed;
  }

  // 3. Last-resort: regex field extraction for streaming-fragmented JSON
  if (trimmed.startsWith("{")) {
    return extractByRegex(trimmed);
  }

  return null;
}

/** Returns true if a string looks like a JSON object being streamed (or code-fenced JSON) */
export function looksLikeJson(raw: string): boolean {
  const t = raw.trimStart();
  return t.startsWith("{") || t.startsWith("```");
}
