"use client";

import { useTranslations } from "next-intl";

export default function OurValues() {
  const t = useTranslations("Pages.About");
  const values = t.raw("values") as Array<{title: string; description: string}>;

  return (
    <section className="w-full bg-white pt-24 md:pt-32 pb-12 md:pb-16 border-t border-gray-100">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* ENCABEZADO */}
        <div className="mb-16 md:mb-24">
          <h2 className="text-4xl md:text-5xl font-bold text-[#111111] font-sora tracking-tight">
            {t("valuesTitle")}
          </h2>
        </div>

        {/* GRILLA DE VALORES: 3 Columnas en Desktop, 2 en Tablet, 1 en Móvil */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {values.map((value, index) => (
            <div key={index} className="flex flex-col">
              <h3 className="text-[22px] md:text-2xl font-bold text-[#111111] mb-4 font-sora tracking-tight">
                {value.title}
              </h3>
              <p className="text-[15px] md:text-[16px] text-gray-600 font-medium leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>

      </div>

      <style jsx>{`
        .font-sora { font-family: var(--font-sora), sans-serif; }
      `}</style>
    </section>
  );
}
