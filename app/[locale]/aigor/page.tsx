import type {Metadata} from "next";
import AigorPage from "@/app/aigor/page";
import {pageMetadataFromMessages} from "@/app/seo/metadata-pages";

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  return pageMetadataFromMessages(locale, "Aigor");
}

export default AigorPage;
