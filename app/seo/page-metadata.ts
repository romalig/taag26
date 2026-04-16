import type { Metadata } from "next";

const siteName = "TAAG";

export type PageSeoInput = {
  title: string;
  description: string;
  /** Path only, e.g. `/industrial` — resolved with root `metadataBase`. */
  path: string;
  keywords?: string[];
  /** Optional OG/Twitter image (absolute or root-relative). */
  ogImage?: string;
};

export function pageMetadata(input: PageSeoInput): Metadata {
  const { title, description, path, keywords, ogImage } = input;

  const openGraph: NonNullable<Metadata["openGraph"]> = {
    type: "website",
    siteName,
    title,
    description,
    url: path,
    locale: "en_US",
  };

  if (ogImage) {
    openGraph.images = [{ url: ogImage }];
  }

  return {
    title,
    description,
    ...(keywords?.length ? { keywords } : {}),
    alternates: {
      canonical: path,
    },
    openGraph,
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}
