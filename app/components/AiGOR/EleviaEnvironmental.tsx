"use client";

import Image from "next/image";

export default function EleviaEnvironmental() {
  return (
    // Fondo de la sección en #121212
    <section className="relative w-full bg-[#121212] py-24 md:py-32 flex flex-col items-center justify-center">
      
      {/* Contenedor expandido: max-w-[1400px] para hacer la tarjeta más ancha */}
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8">
        
        {/* LA TARJETA GRANDE: Más alta (min-h-[550px] en móvil, min-h-[700px] en desktop) */}
        <div className="relative w-full min-h-[550px] md:min-h-[700px] rounded-[2rem] overflow-hidden flex flex-col">
          
          {/* 1. IMAGEN DE FONDO (env.png) */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <Image
              src="/env.png"
              alt="Elevia Environmental"
              fill
              className="object-cover object-center"
              priority
            />
          </div>

          {/* 2. CAPA PARA HACER LA FOTO UN POCO MÁS NEGRA */}
          <div className="absolute inset-0 z-10 bg-black/40 bg-gradient-to-bl from-black/80 via-black/20 to-transparent pointer-events-none"></div>

          {/* 3. TÍTULO Y TEXTO */}
          {/* AUMENTAMOS EL PADDING DERECHO (pr-16 en móvil, md:pr-40 en desktop) para empujarlo más a la izquierda */}
          <div className="relative z-20 w-full flex justify-end p-8 pr-16 md:p-16 md:pr-40">
            
            {/* Bloque de texto angosto: max-w-[380px] */}
            <div className="max-w-[380px] flex flex-col items-end">
              
              {/* KICKER: Alineado a la derecha estrictamente */}
              <span className="text-left text-xs md:text-sm font-bold tracking-[0.2em] text-[#FF270A] uppercase mb-4 block w-full">
                Environmental Monitoring
              </span>
              
              {/* TÍTULO: Alineado a la derecha estrictamente */}
              <h2 className="text-left text-2xl md:text-4xl font-bold text-white mb-5 tracking-tight leading-tight w-full">
                Zero blind spots. <br className="hidden md:block" /> Absolute facility control.
              </h2>
              
              {/* BAJADA: Alineado a la derecha estrictamente */}
              <p className="text-left text-sm md:text-base text-white/90 font-medium leading-relaxed w-full">
                Bypass traditional enrichment. Elevia detects active pathogens directly from any surface in record time, transforming your environmental monitoring from reactive to predictive.
              </p>
              
            </div>
          </div>

        </div>
      </div>
      
    </section>
  );
}