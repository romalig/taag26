"use client";

import { useLocale } from "next-intl";
import WhereWeAreHero from "./WhereWeAreHero";
import LocalSupportIntro from "./LocalSupportIntro";
import SupportTeamSection from "./SupportTeamSection";
import { TRANSLATIONS } from "./data/translations";

const TRANSLATION_BUCKET_BY_LOCALE: Record<string, keyof typeof TRANSLATIONS> = {
  en: "English",
  es: "Español",
};

export default function WhereWeAre() {
  const locale = useLocale();
  const bucket =
    TRANSLATION_BUCKET_BY_LOCALE[locale] ?? TRANSLATION_BUCKET_BY_LOCALE.en;
  const t = TRANSLATIONS[bucket] ?? TRANSLATIONS["English"];
  const languageCode = locale === "es" ? "es" : "en";

  return (
    <div className="min-h-screen bg-white font-sans overflow-clip">
      {/* 1. Hero Section con frases rotativas */}
      <WhereWeAreHero />
      
      {/* 2. Introducción de soporte */}
      <LocalSupportIntro />

      {/* 3. Sección de Contacto (Formulario Negro) */}
      <div className="max-w-7xl mx-auto px-6 pb-32">
        <SupportTeamSection
          t={t}
          countryName="Global"
          showOnlyForm={true}
          languageCode={languageCode}
          regionId="global"
        />
      </div>
    </div>
  );
}
