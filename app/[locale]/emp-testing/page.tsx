import type {Metadata} from "next";
import EmpTestingPage from "@/app/emp-testing/page";
import {pageMetadataFromMessages} from "@/app/seo/metadata-pages";

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  return pageMetadataFromMessages(locale, "EmpTesting");
}

export default EmpTestingPage;
