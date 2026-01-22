"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useCTA } from "./CTAProvider";

export default function Hero() {
  const { openMeeting } = useCTA();

  return (
    // SECCIÓN PRINCIPAL: Flex column para apilar Texto arriba + Imagen abajo
    // CAMBIO 1: Aumenté pt-32 a pt-48 (y pt-60 en desktop) para dar más espacio libre arriba
    <section className="relative h-screen min-h-[700px] w-full bg-[#111111] overflow-hidden flex flex-col items-center justify-between pt-48 md:pt-60 pb-0">
      
      {/* 1. LUZ DE FONDO (Spotlight detrás de la bacteria) */}
      <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[80%] h-[60%] bg-[#FF270A] opacity-[0.08] blur-[120px] rounded-full pointer-events-none z-0" />

      {/* 2. CONTENIDO DE TEXTO (Centrado Arriba) */}
      {/* CAMBIO 2: Aumenté max-w-4xl a max-w-6xl para que el texto quepa en una sola línea horizontalmente */}
      <div className="relative z-20 flex flex-col items-center text-center px-6 max-w-8xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
      
        {/* Titular */}
        <h1 className="text-5xl md:text-6xl lg:text-6xl font-extrabold tracking-tight text-white mb-24 leading-[1.1]">
          Someday, every biological risk will be detected <br />
          <span className="text-white/50">before it becomes a problem.</span>
        </h1>

        {/* Botones Centrados */}
        <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto justify-center">
          <button 
            onClick={openMeeting}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#FF270A] text-white text-sm font-bold uppercase tracking-widest hover:bg-[#d92008] transition-all shadow-[0_0_20px_rgba(255,39,10,0.3)] hover:-translate-y-1"
          >
            Talk to an Expert
            <ArrowRight className="w-4 h-4" />
          </button>
          <a 
          href="#solutions"
          className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white text-sm font-bold uppercase tracking-widest hover:bg-white/5 transition-all backdrop-blur-sm">
            Go to Our Solutions
          </a>
        </div>
      </div>

      {/* 3. IMAGEN DE LA BACTERIA (Centrada Abajo) */}
      <div className="relative z-10 w-full h-[45vh] md:h-[55vh] mt-auto">
        <Image
          src="/bacteria6.png" // Tu archivo PNG sin fondo
          alt="Hyper-realistic bacteria visualization"
          fill
          quality={100}
          // object-contain: Muestra la bacteria completa sin cortarla
          // object-bottom: La alinea a la base del contenedor
          className="object-contain object-bottom animate-in fade-in zoom-in-95 duration-[1.5s]"
          priority
          sizes="100vw"
        />
      </div>

    </section>
  );
}