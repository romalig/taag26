"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export default function HeroSection() {
  const t = useTranslations("EmpTesting.Hero");

  return (
    <section className="w-full pt-24 pb-12 px-4 md:px-8 bg-white">
      {/* Contenedor de la tarjeta (más ancho que el texto para respirar) */}
      <div className="max-w-[1400px] mx-auto w-full h-[65vh] min-h-[500px] md:h-[75vh] md:min-h-[600px] relative rounded-[2.5rem] overflow-hidden flex flex-col justify-between">
        
        {/* IMAGEN DE FONDO */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/env.png" 
            alt={t("imageAlt")}
            fill 
            className="object-cover"
            priority
          />
        </div>

        {/* GRADIENTES */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />

        {/* CONTENEDOR DE TEXTOS ALINEADO CON EL HEADER */}
        <div className="relative z-20 w-full h-full py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-6 h-full flex flex-col justify-between">
            
            <div className="flex items-start">
               <span className="text-[#FF270A] font-bold uppercase tracking-widest text-sm drop-shadow-md">
                 {t("eyebrow")}
               </span>
            </div>

            <div className="mb-4 max-w-4xl">
               <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-[1.05] drop-shadow-lg tracking-tight">
                 {t("title")}
               </h1>
               <p className="text-base md:text-xl text-white/90 font-medium leading-relaxed drop-shadow-md max-w-3xl">
                 {t("body")}
               </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
