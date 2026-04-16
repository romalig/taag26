/**
 * Centralized API configuration.
 *
 * All backend URLs are read from NEXT_PUBLIC_ environment variables so they are
 * available both server-side and client-side.  The values are baked into the
 * container at build time (next build) — change them via Docker build-args or
 * .env and rebuild.
 *
 * Usage:
 *   import { API } from "@/app/lib/api-config";
 *   fetch(`${API.apiwebsite.baseUrl}/products/...`);
 *   fetch(`${API.apiwebsite.baseUrl}/contact/messages`, { method: "POST", ... });
 *
 * Todo lo que vive bajo `/api/v1` en el backend (productos, contacto, etc.) usa la misma
 * base URL y cabecera `X-Service-Key` cuando aplique.
 */

// ---------------------------------------------------------------------------
// API del sitio (taag.bio) — llamada directa desde el navegador
// ---------------------------------------------------------------------------
const APIWEBSITE_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_APIWEBSITE_URL ?? "";
const APIWEBSITE_PUBLIC_SERVICE_KEY = process.env.NEXT_PUBLIC_APIWEBSITE_SERVICE_KEY ?? "";

// ---------------------------------------------------------------------------
// Chat / Dify API — called via Next.js BFF (server-side only, keeps key private)
// ---------------------------------------------------------------------------
const CHAT_API_URL = process.env.CHAT_IA_WEBPAGE_API_URL ?? "";
const CHAT_SERVICE_KEY = process.env.CHAT_IA_WEBPAGE_SERVICE_KEY ?? "";

// ---------------------------------------------------------------------------
// Otros enlaces públicos (TxLab / login)
// ---------------------------------------------------------------------------
const TXALAB_LOGIN_URL =
  process.env.NEXT_PUBLIC_TXALAB_LOGIN_URL?.trim() ||
  "https://txalab.taag-genetics.com";

// ---------------------------------------------------------------------------
// Public object consumed by the rest of the app
// ---------------------------------------------------------------------------
export const SITE_URLS = {
  /** Portal de laboratorio (enlace "Log in" del header). */
  txalabLogin: TXALAB_LOGIN_URL,
} as const;

export const API = {
  /** Base del API expuesto al cliente (`/api/v1`): productos, contacto, … */
  apiwebsite: {
    baseUrl: APIWEBSITE_PUBLIC_BASE_URL,
    serviceKey: APIWEBSITE_PUBLIC_SERVICE_KEY,
    headers(): HeadersInit {
      const h: Record<string, string> = { Accept: "application/json" };
      if (APIWEBSITE_PUBLIC_SERVICE_KEY) h["X-Service-Key"] = APIWEBSITE_PUBLIC_SERVICE_KEY;
      return h;
    },
  },
  chat: {
    url: CHAT_API_URL,
    serviceKey: CHAT_SERVICE_KEY,
  },
} as const;
