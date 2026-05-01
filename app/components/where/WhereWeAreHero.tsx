"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

/** Rotating second line — fixed phrases (not i18n). Spanish slot uses “Impacto global.” intentionally. */
const IMPACT_ROTATION = [
  "Local impact.",
  "Impacto global.",
  "تأثير محلي.",
  "Impact local.",
  "Lokale impact.",
];

export default function WhereWeAreHero() {
  const t = useTranslations("Pages.Where");
  const [impactIndex, setImpactIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setImpactIndex((prev) => (prev + 1) % IMPACT_ROTATION.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-[70vh] flex flex-col items-center justify-center px-6 pt-32 text-center bg-white relative z-20">
      <div className="max-w-[1000px] w-full">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#111111] tracking-tight mb-10">
          {t("titleA")} <br />
          <span
            key={impactIndex}
            className="block text-gray-400 animate-in fade-in slide-in-from-bottom-2 duration-500 mt-2"
          >
            {IMPACT_ROTATION[impactIndex]}
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 font-medium max-w-3xl mx-auto leading-relaxed">
          {t("body")}
        </p>
      </div>
    </section>
  );
}
