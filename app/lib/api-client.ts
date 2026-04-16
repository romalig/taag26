import { API } from "@/app/lib/api-config";

interface ChatPayload {
  message: string;
  session_id: string;
}

/**
 * Opens a streaming connection to the chat API and returns the raw Response
 * for the caller to proxy or consume as SSE.
 *
 * This remains server-side only (called from the chat BFF route) because the
 * response requires buffering and JSON cleanup before reaching the client.
 */
export async function chatStream(body: ChatPayload): Promise<Response> {
  if (!API.chat.url) {
    throw new Error("CHAT_IA_WEBPAGE_API_URL is not configured");
  }

  const response = await fetch(API.chat.url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "text/event-stream",
      "X-Service-Key": API.chat.serviceKey,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return response;
}
