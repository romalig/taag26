import type {Metadata} from "next";
import AboutUsPage from "@/app/AboutUs/page";
import {pageMetadataFromMessages} from "@/app/seo/metadata-pages";

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  return pageMetadataFromMessages(locale, "AboutUs");
}

export default AboutUsPage;
