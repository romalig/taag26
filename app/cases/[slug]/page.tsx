import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CASE_STUDIES } from "@/app/components/data/caseStudies";
import { pageMetadata } from "@/app/seo/page-metadata";
import CaseStudyPageClient from "./CaseStudyPageClient";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = CASE_STUDIES.find((x) => x.slug === slug);
  if (!c) return {};

  const ogImage =
    c.image.startsWith("http")
      ? c.image
      : c.image.startsWith("/")
        ? c.image
        : `/${c.image}`;

  return pageMetadata({
    title: `${c.title} — ${c.company}`,
    description: c.description,
    path: `/cases/${slug}`,
    ogImage,
    keywords: [
      c.company,
      c.category,
      c.techKey,
      "case study",
      "TAAG",
    ].filter(Boolean) as string[],
  });
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  if (!CASE_STUDIES.some((x) => x.slug === slug)) {
    notFound();
  }
  return <CaseStudyPageClient slug={slug} />;
}
