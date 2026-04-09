import { NextResponse } from "next/server";
import { API } from "@/app/lib/api-config";

/**
 * Lightweight reachability check for the chat upstream (server-side only).
 * Uses HEAD first, then GET if HEAD fails at the transport layer (some APIs
 * reject HEAD but still accept GET).
 */
export async function GET() {
  const urlOk = Boolean(API.chat.url?.trim());
  const keyOk = Boolean(API.chat.serviceKey?.trim());
  if (!urlOk || !keyOk) {
    return NextResponse.json(
      { ok: false, reason: "not_configured" as const },
      { status: 503, headers: { "Cache-Control": "no-store" } }
    );
  }

  const headers = { "X-Service-Key": API.chat.serviceKey };
  let usedGetFallback = false;

  try {
    let res: Response;
    try {
      res = await fetch(API.chat.url, {
        method: "HEAD",
        headers,
        signal: AbortSignal.timeout(8000),
      });
    } catch {
      usedGetFallback = true;
      res = await fetch(API.chat.url, {
        method: "GET",
        headers,
        signal: AbortSignal.timeout(8000),
      });
    }

    const status = res.status;
    // HEAD/GET often return 401/403/404/405 on a POST-only chat endpoint; that still means the host answered.
    const upstreamReachable =
      (status >= 200 && status < 300) ||
      status === 401 ||
      status === 403 ||
      status === 404 ||
      status === 405;

    if (!upstreamReachable) {
      return NextResponse.json(
        {
          ok: false as const,
          reason: "unreachable" as const,
          upstreamStatus: status,
          usedGetFallback,
        },
        { status: 503, headers: { "Cache-Control": "no-store" } }
      );
    }

    return NextResponse.json(
      {
        ok: true as const,
        upstreamStatus: status,
        usedGetFallback,
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch {
    return NextResponse.json(
      { ok: false, reason: "unreachable" as const },
      { status: 503, headers: { "Cache-Control": "no-store" } }
    );
  }
}
