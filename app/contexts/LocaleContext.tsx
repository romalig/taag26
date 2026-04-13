"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { ContactLocale } from "@/app/messages/contact";

type LocaleContextValue = {
  locale: ContactLocale;
  setLocale: (locale: ContactLocale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  children,
  defaultLocale = "en",
}: {
  children: ReactNode;
  defaultLocale?: ContactLocale;
}) {
  const [locale, setLocale] = useState<ContactLocale>(defaultLocale);

  const value = useMemo(() => ({ locale, setLocale }), [locale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    return { locale: "en", setLocale: () => {} };
  }
  return ctx;
}
