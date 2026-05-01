"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useCTA } from "./CTAProvider";
import { useTranslations } from "next-intl";

export default function Hero() {
  const { openMeeting } = useCTA();
  const t = useTranslations("Home.Hero");
  
  // Estado para controlar cuándo mostrar la bacteria
  const [showBacteria, setShowBacteria] = useState(false);

  // Temporizador infalible de React
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBacteria(true);
    }, 1000); // 1000ms = 1 segundo exacto de espera

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full bg-[#111111] overflow-hidden flex flex-col items-center justify-between pt-32 md:pt-40 xl:pt-60 pb-0 h-screen min-h-[100dvh]">
      
      {/* 1. LUZ DE FONDO */}
      <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[80%] h-[60%] bg-[#FF270A] opacity-[0.08] blur-[120px] rounded-full pointer-events-none z-0" />

      {/* 2. CONTENIDO DE TEXTO */}
      <div className="relative z-20 flex flex-col items-center text-center px-6 w-full animate-in fade-in slide-in-from-bottom-8 duration-700">
      
        {/* Titular */}
        <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-[4.5rem] font-extrabold tracking-tight text-white mb-10 md:mb-12 xl:mb-24 leading-[1.1] w-full max-w-[95%] md:max-w-3xl lg:max-w-4xl xl:max-w-6xl mx-auto">
          {t("title")} <br className="hidden md:block" />
          <span className="text-white/50">{t("subtitle")}</span>
        </h1>

        {/* Botones Centrados */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 w-full sm:w-auto justify-center px-4 sm:px-0">
          <button 
            onClick={openMeeting}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#FF270A] text-white text-sm font-bold uppercase tracking-widest hover:bg-[#d92008] transition-all shadow-[0_0_20px_rgba(255,39,10,0.3)] hover:-translate-y-1 w-full sm:w-auto"
          >
            {t("primary")}
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <a 
            href="#solutions"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white text-sm font-bold uppercase tracking-widest hover:bg-white/5 transition-all backdrop-blur-sm w-full sm:w-auto cursor-pointer"
          >
            {t("secondary")}
          </a>
        </div>
      </div>

      {/* 3. IMAGEN DE LA BACTERIA */}
      <div className="relative z-10 w-full h-[40vh] md:h-[55vh] mt-auto">
        <Image
          src="/bacteria6.png" 
          alt={t("imageAlt")}
          fill
          quality={100}
          priority
          sizes="100vw"
          // LÓGICA DE TRANSICIÓN MODIFICADA PARA APARECER DESDE MÁS ABAJO
          // translate-y-[15vh] hace que el objeto comience 15vh más abajo, logrando el efecto deseado.
          className={`object-contain object-bottom transition-all duration-[1500ms] ease-out transform ${
            showBacteria 
              ? "opacity-100 scale-100 translate-y-0" 
              : "opacity-0 scale-95 translate-y-[15vh]" 
          }`}
        />
      </div>

    </section>
  );
}
