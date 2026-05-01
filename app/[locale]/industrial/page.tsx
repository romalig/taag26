import type {Metadata} from "next";
import IndustrialPage from "@/app/industrial/page";
import {pageMetadataFromMessages} from "@/app/seo/metadata-pages";

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  return pageMetadataFromMessages(locale, "Industrial");
}

export default async function LocaleIndustrialPage({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  return <IndustrialPage locale={locale} />;
}
