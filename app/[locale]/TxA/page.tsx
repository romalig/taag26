import type {Metadata} from "next";
import TxAPage from "@/app/TxA/page";
import {pageMetadataFromMessages} from "@/app/seo/metadata-pages";

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  return pageMetadataFromMessages(locale, "TxA");
}

export default TxAPage;
