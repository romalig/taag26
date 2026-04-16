/** Production canonical host (override in preview/staging via env). */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://www.taag.bio";

export function getMetadataBase(): URL {
  return new URL(siteUrl);
}
