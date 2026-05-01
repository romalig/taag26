/**
 * Canonical public origin (SEO, hreflang in proxy). Next inlines NEXT_PUBLIC_* at build time:
 * pass NEXT_PUBLIC_SITE_URL as a Docker build-arg in CI / compose, not only at container runtime.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://www.taag.bio";

export function getMetadataBase(): URL {
  return new URL(siteUrl);
}
