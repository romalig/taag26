import { NextRequest, NextResponse } from "next/server";
import { apiRequest } from "@/app/lib/api-client";

interface ChatRequest {
  message: string;
}

interface ChatResponse {
  reply: string;
  [key: string]: unknown;
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

    const data = await apiRequest<ChatResponse>("/chat", {
      method: "POST",
      body: { message: body.message },
    });

    return NextResponse.json(data);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal server error";

    const status = message.includes("not configured") ? 503 : 502;

    return NextResponse.json({ error: message }, { status });
  }
}
