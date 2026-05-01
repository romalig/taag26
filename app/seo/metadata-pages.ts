import type {Metadata} from "next";
import {getTranslations} from "next-intl/server";

/** Keys under `Metadata.pages` in messages/en.json & messages/es.json */
export type MetadataPageId =
  | "TxA"
  | "Where"
  | "Customized"
  | "Aigor"
  | "Labs"
  | "LabNetwork"
  | "AboutUs"
  | "Industrial"
  | "EmpTesting";

export async function pageMetadataFromMessages(
  locale: string,
  id: MetadataPageId,
): Promise<Metadata> {
  const t = await getTranslations({locale, namespace: "Metadata"});
  const base = `pages.${id}`;
  const keywords = t.raw(`${base}.keywords`) as string[] | undefined;
  return {
    title: t(`${base}.title`),
    description: t(`${base}.description`),
    ...(Array.isArray(keywords) && keywords.length ? {keywords} : {}),
  };
}
