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

          {/* 2. CAPA INTELIGENTE DE OSCURECIMIENTO */}
          {/* En móvil: Oscurece arriba y abajo. En desktop: Oscurece la izquierda. */}
          <div className="absolute inset-0 z-10 bg-black/30 bg-gradient-to-b from-black/80 via-transparent to-black/90 md:bg-gradient-to-r md:from-black/90 md:via-black/30 md:to-transparent pointer-events-none"></div>

          {/* 3. CONTENEDOR DE TEXTOS (Ocupa toda la tarjeta con absolute inset-0) */}
          {/* justify-between separa los bloques en móvil, md:justify-start los une en desktop */}
          <div className="absolute inset-0 z-20 w-full flex flex-col justify-between md:justify-start p-8 md:p-16">
            
            {/* BLOQUE SUPERIOR: Kicker + Título */}
            <div className="max-w-[400px] flex flex-col items-start">
              
              <span className="text-left text-xs md:text-sm font-bold tracking-[0.2em] text-[#FF270A] uppercase mb-4 block w-full">
                TAAG: Environmental Monitoring
              </span>
              
              <h2 className="text-left text-2xl md:text-4xl font-bold text-white tracking-tight leading-tight w-full">
                Zero blind spots. <br className="hidden md:block" /> Absolute facility control.
              </h2>
              
            </div>
            
            {/* BLOQUE INFERIOR (BAJADA) */}
            {/* md:mt-6 asegura que en computadora tenga separación respecto al título de arriba */}
            <div className="max-w-[400px] flex flex-col items-start md:mt-6">
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