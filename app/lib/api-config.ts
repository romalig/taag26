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
 *   fetch(`${API.products.baseUrl}/products/industry-categories`);
 */

// ---------------------------------------------------------------------------
// Products API (Laravel) — called directly from the browser
// ---------------------------------------------------------------------------
const PRODUCTS_BASE_URL = process.env.NEXT_PUBLIC_PRODUCTS_API_URL ?? "";
const PRODUCTS_SERVICE_KEY = process.env.NEXT_PUBLIC_PRODUCTS_SERVICE_KEY ?? "";

// ---------------------------------------------------------------------------
// Chat / Dify API — called via Next.js BFF (server-side only, keeps key private)
// ---------------------------------------------------------------------------
const CHAT_API_URL = process.env.CHAT_IA_WEBPAGE_API_URL ?? "";
const CHAT_SERVICE_KEY = process.env.CHAT_IA_WEBPAGE_SERVICE_KEY ?? "";

// ---------------------------------------------------------------------------
// Public object consumed by the rest of the app
// ---------------------------------------------------------------------------
export const API = {
  products: {
    baseUrl: PRODUCTS_BASE_URL,
    serviceKey: PRODUCTS_SERVICE_KEY,
    /** Standard headers for every Products API request. */
    headers(): HeadersInit {
      const h: Record<string, string> = { Accept: "application/json" };
      if (PRODUCTS_SERVICE_KEY) h["X-Service-Key"] = PRODUCTS_SERVICE_KEY;
      return h;
    },
  },
  chat: {
    url: CHAT_API_URL,
    serviceKey: CHAT_SERVICE_KEY,
  },
} as const;
