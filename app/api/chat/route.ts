import { NextRequest, NextResponse } from "next/server";
import { chatStream } from "@/app/lib/api-client";
import { randomUUID } from "crypto";

interface ChatRequest {
  message: string;
  session_id?: string;
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

    // Proxy the SSE stream back to the client, adding the session_id header
    return new NextResponse(upstreamResponse.body, {
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
