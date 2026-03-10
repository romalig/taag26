const CHAT_API_URL = process.env.CHAT_IA_WEBPAGE_API_URL || "";
const CHAT_SERVICE_KEY = process.env.CHAT_IA_WEBPAGE_SERVICE_KEY || "";

interface ChatPayload {
  message: string;
  session_id: string;
}

/**
 * Opens a streaming connection to the chat API and returns the raw Response
 * for the caller to proxy or consume as SSE.
 */
export async function chatStream(body: ChatPayload): Promise<Response> {
  if (!CHAT_API_URL) {
    throw new Error("CHAT_IA_WEBPAGE_API_URL is not configured");
  }

  const response = await fetch(CHAT_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "text/event-stream",
      "X-Service-Key": CHAT_SERVICE_KEY,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return response;
}
