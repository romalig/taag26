import type {Metadata} from "next";
import CustomizedPage from "@/app/customized/page";
import {pageMetadataFromMessages} from "@/app/seo/metadata-pages";

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  return pageMetadataFromMessages(locale, "Customized");
}

export default CustomizedPage;
