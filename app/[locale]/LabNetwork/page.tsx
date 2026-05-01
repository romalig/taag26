import type {Metadata} from "next";
import LabNetworkPage from "@/app/LabNetwork/page";
import {pageMetadataFromMessages} from "@/app/seo/metadata-pages";

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  return pageMetadataFromMessages(locale, "LabNetwork");
}

export default LabNetworkPage;
