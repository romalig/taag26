"use client";

import { Timer, Zap, Dna, FlaskConical } from "lucide-react";
import { useTranslations } from "next-intl";

export default function LaboratoryServicesHero() {
  const t = useTranslations("LabNetwork.Hero");

  return (
    <main className="w-full bg-white">
      {/* Añadimos min-h-screen para que ocupe el 100% del monitor.
        Añadimos flex flex-col justify-center para centrar el contenido verticalmente.
      */}
      <section className="w-full min-h-screen relative overflow-hidden flex flex-col justify-center pt-32 pb-24 border-b border-gray-100/50">
        
        {/* Glow de fondo superior */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-b from-gray-50 to-transparent rounded-full blur-3xl opacity-60 pointer-events-none z-0" />

        {/* Contenedor centralizado para el contenido (Protegido con z-10) */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center relative z-10 w-full">
          
          {/* Título y Bajada */}
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold text-[#111111] mb-12 md:mb-18 tracking-tight leading-tight md:leading-[1.1] max-w-6xl mx-auto">
            {t("titleA")} <br className="hidden md:block" />
            <span className="text-gray-400 inline-block">{t("titleB")}</span>
          </h1>

          <p className="text-lg md:text-2xl text-gray-500 max-w-3xl mx-auto font-medium leading-relaxed px-2 mb-16 md:mb-24">
            {t("body")}
          </p>

          {/* ================================================================ */}
          {/* CARACTERÍSTICAS: Iconos estáticos (SIN hover) */}
          {/* ================================================================ */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-12 md:gap-8 w-full max-w-5xl mx-auto">
            
            {/* Concepto 1 - Blue */}
            <div className="flex flex-col items-center text-center">
              <Timer 
                className="w-6 h-6 md:w-8 md:h-8 mb-3 md:mb-4 text-blue-700" 
                strokeWidth={1.5} 
              />
              <p className="text-xs md:text-sm text-gray-500 leading-relaxed max-w-[200px] font-medium">
                <span className="font-bold text-[#111111]">{t("features.results.strong")}</span> {t("features.results.text")}
              </p>
            </div>

            {/* Concepto 2 - Purple */}
            <div className="flex flex-col items-center text-center">
              <Zap 
                className="w-6 h-6 md:w-8 md:h-8 mb-3 md:mb-4 text-purple-600" 
                strokeWidth={1.5} 
              />
              <p className="text-xs md:text-sm text-gray-500 leading-relaxed max-w-[200px] font-medium">
                <span className="font-bold text-[#111111]">{t("features.spoilage.strong")}</span> {t("features.spoilage.text")}
              </p>
            </div>

            {/* Concepto 3 - Fuchsia */}
            <div className="flex flex-col items-center text-center">
              <Dna 
                className="w-6 h-6 md:w-8 md:h-8 mb-3 md:mb-4 text-fuchsia-500" 
                strokeWidth={1.5} 
              />
              <p className="text-xs md:text-sm text-gray-500 leading-relaxed max-w-[200px] font-medium">
                <span className="font-bold text-[#111111]">{t("features.ngs.strong")}</span> {t("features.ngs.text")}
              </p>
            </div>

            {/* Concepto 4 - Red */}
            <div className="flex flex-col items-center text-center">
              <FlaskConical 
                className="w-6 h-6 md:w-8 md:h-8 mb-3 md:mb-4 text-[#FF270A]" 
                strokeWidth={1.5} 
              />
              <p className="text-xs md:text-sm text-gray-500 leading-relaxed max-w-[200px] font-medium">
                <span className="font-bold text-[#111111]">{t("features.custom.strong")}</span> {t("features.custom.text")}
              </p>
            </div>

          </div>
        </div>

        {/* ================================================================ */}
        {/* GLOW INFERIOR CORREGIDO: Más vivo e intenso */}
        {/* ================================================================ */}
        <div className="absolute bottom-[-60px] left-0 right-0 h-[100px] bg-gradient-to-r from-blue-700 via-purple-600 via-fuchsia-500 to-[#FF270A] blur-[40px] opacity-60 pointer-events-none z-0" />

      </section>
    </main>
  );
}
