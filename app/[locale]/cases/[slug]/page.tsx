import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {CASE_STUDIES} from "@/app/components/data/caseStudies";
import {pageMetadata} from "@/app/seo/page-metadata";
import {siteUrl} from "@/app/seo/site";
import {routing} from "@/i18n/routing";
import CaseStudyPageClient from "@/app/cases/[slug]/CaseStudyPageClient";

type Props = {params: Promise<{locale: string; slug: string}>};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    CASE_STUDIES.map((c) => ({locale, slug: c.slug})),
  );
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale, slug} = await params;
  const c = CASE_STUDIES.find((x) => x.slug === slug);
  if (!c) return {};

  const ogImage =
    c.image.startsWith("http")
      ? c.image
      : c.image.startsWith("/")
        ? c.image
        : `/${c.image}`;

  return {
    ...pageMetadata({
      title: `${c.title} - ${c.company}`,
      description: c.description,
      path: `/${locale}/cases/${slug}`,
      ogImage,
      keywords: [
        c.company,
        c.category,
        c.techKey,
        "case study",
        "TAAG",
      ].filter(Boolean) as string[],
    }),
    alternates: {
      canonical: `${siteUrl}/${locale}/cases/${slug}`,
      languages: {
        en: `${siteUrl}/en/cases/${slug}`,
        es: `${siteUrl}/es/cases/${slug}`,
        "x-default": `${siteUrl}/en/cases/${slug}`,
      },
    },
  };
}

export default async function CaseStudyPage({params}: Props) {
  const {slug} = await params;
  if (!CASE_STUDIES.some((x) => x.slug === slug)) {
    notFound();
  }
  return <CaseStudyPageClient slug={slug} />;
}
