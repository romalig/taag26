"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useCTA } from "./CTAProvider";

export default function Hero() {
  const { openMeeting } = useCTA();

  return (
    <section className="relative w-full bg-[#111111] overflow-hidden flex flex-col items-center justify-between pt-32 md:pt-60 pb-0 h-screen min-h-[100dvh]">
      
      {/* 1. LUZ DE FONDO */}
      <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[80%] h-[60%] bg-[#FF270A] opacity-[0.08] blur-[120px] rounded-full pointer-events-none z-0" />

      {/* 2. CONTENIDO DE TEXTO */}
      <div className="relative z-20 flex flex-col items-center text-center px-6 w-full animate-in fade-in slide-in-from-bottom-8 duration-700">
      
        {/* Titular */}
        {/* CORRECCIÓN: 
            - max-w-[95%] en móvil.
            - md:max-w-3xl (768px máx) en laptops pequeñas.
            - lg:max-w-4xl (896px máx) en laptops estándar.
            - xl:max-w-6xl para monitores grandes.
            Esto garantiza márgenes laterales amplios independientemente de la resolución.
        */}
        <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-[4.5rem] font-extrabold tracking-tight text-white mb-10 md:mb-24 leading-[1.1] w-full max-w-[95%] md:max-w-3xl lg:max-w-4xl xl:max-w-6xl mx-auto">
          Someday, every biological risk will be detected <br className="hidden md:block" />
          <span className="text-white/50">before it becomes a problem.</span>
        </h1>

        {/* Botones Centrados */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 w-full sm:w-auto justify-center px-4 sm:px-0">
          <button 
            onClick={openMeeting}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#FF270A] text-white text-sm font-bold uppercase tracking-widest hover:bg-[#d92008] transition-all shadow-[0_0_20px_rgba(255,39,10,0.3)] hover:-translate-y-1 w-full sm:w-auto"
          >
            Talk to an Expert
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <a 
            href="#solutions"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white text-sm font-bold uppercase tracking-widest hover:bg-white/5 transition-all backdrop-blur-sm w-full sm:w-auto cursor-pointer"
          >
            Go to Our Solutions
          </a>
        </div>
      </div>

      {/* 3. IMAGEN DE LA BACTERIA */}
      <div className="relative z-10 w-full h-[40vh] md:h-[55vh] mt-auto">
        <Image
          src="/bacteria6.png" 
          alt="Hyper-realistic bacteria visualization"
          fill
          quality={100}
          className="object-contain object-bottom animate-in fade-in zoom-in-95 duration-[1.5s]"
          priority
          sizes="100vw"
        />
      </div>

    </section>
  );
}