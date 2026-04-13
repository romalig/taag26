import { API } from "@/app/lib/api-config";
import type { ContactLocale } from "@/app/messages/contact";

export type SubmitContactInput = {
  name: string;
  email: string;
  message: string;
  source: string;
  locale: ContactLocale;
  extra?: Record<string, string>;
  /** Honeypot — leave empty */
  website?: string;
};

export class ContactApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly code?: string,
  ) {
    super(message);
    this.name = "ContactApiError";
  }
}

export async function submitContactMessage(
  input: SubmitContactInput,
): Promise<{ uuid: string }> {
  if (!API.apiwebsite.baseUrl) {
    throw new ContactApiError("NEXT_PUBLIC_APIWEBSITE_URL is not configured", 0);
  }

  const response = await fetch(`${API.apiwebsite.baseUrl}/contact/messages`, {
    method: "POST",
    headers: {
      ...API.apiwebsite.headers(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: input.name,
      email: input.email,
      message: input.message,
      source: input.source,
      locale: input.locale,
      extra: input.extra,
      website: input.website ?? "",
    }),
  });

  const json: unknown = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errObj = json as { error?: { code?: string; message?: string } };
    const msg =
      errObj?.error?.message ??
      (typeof json === "object" && json !== null && "message" in json
        ? String((json as { message: unknown }).message)
        : `HTTP ${response.status}`);
    throw new ContactApiError(String(msg), response.status, errObj?.error?.code);
  }

  const ok = json as { data?: { uuid?: string } };
  return { uuid: ok.data?.uuid ?? "" };
}
