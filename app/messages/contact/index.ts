import type { ContactLocale, ContactMessages } from "./types";
import en from "./en";
import es from "./es";

const catalog: Record<ContactLocale, ContactMessages> = { en, es };

export function getContactMessages(locale: string): ContactMessages {
  if (locale === "es") {
    return catalog.es;
  }
  return catalog.en;
}

export type { ContactLocale, ContactMessages };
