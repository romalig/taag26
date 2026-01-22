"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useCTA } from "./CTAProvider";

export default function Hero() {
  const { openMeeting } = useCTA();

  return (
    // SECCIÓN PRINCIPAL
    <section className="relative h-screen min-h-[600px] w-full overflow-hidden bg-[#111111]">
      
      {/* CAPA 1: IMAGEN DE FONDO (Full Width) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-scientist.png" // Asegúrate de que esta es la última versión HD que descargaste
          alt="TAAG scientist in lab"
          fill
          // AJUSTES DE NITIDEZ:
          quality={100} // Máxima calidad, sin compresión
          sizes="100vw" // Indica que la imagen ocupa todo el ancho
          // Quitamos 'scale-105' para evitar el suavizado del zoom
          className="object-cover object-center animate-in fade-in duration-[1.5s]"
          priority
        />
        
        {/* CAPA 2: FILTRO (Oscuro a la izquierda para contraste del texto) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
      </div>

      {/* CAPA 3: CONTENIDO (Alineado a la izquierda) */}
      <div className="relative z-10 h-full flex flex-col justify-center mx-auto max-w-7xl px-6">
        
        <div className="max-w-3xl flex flex-col items-start animate-in fade-in slide-in-from-bottom-8 duration-700">
          
          {/* Titular */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white mb-6 leading-[1.1] text-left">
            Microbiology, <br />
            <span className="text-white/50">modernized.</span>
          </h1>
          
          {/* Párrafo */}
          <p className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed max-w-xl font-medium text-left">
            Stop waiting days for results. We engineer molecular systems that deliver actionable decisions in as little as 3 hours.
          </p>

          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
            <button 
              onClick={openMeeting}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#FF270A] text-white text-sm font-bold uppercase tracking-widest hover:bg-[#FF270A]/90 transition-all shadow-lg hover:-translate-y-1"
            >
              Talk to an Expert
              <ArrowRight className="w-4 h-4" />
            </button>
            
            <button className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/30 text-white text-sm font-bold uppercase tracking-widest hover:bg-white/10 transition-all backdrop-blur-sm">
              View Solutions
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}