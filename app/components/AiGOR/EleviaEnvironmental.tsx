"use client";

import { useRef } from "react";
import Image from "next/image";
import { Zap, Activity, ShieldCheck, TrendingDown, Timer, Ban, Network } from "lucide-react";

// --- DATOS DEL CARRUSEL DE VENTAJAS ---
// Diseño visual basado en el estilo "Mila" (Iconos, Glassmorphism, animaciones sutiles)
const ENVIRONMENTAL_ADVANTAGES = [
  {
    id: 1,
    title: "Zero enrichment.",
    text: "Bypass the 24-hour growth phase. Our direct-from-surface RNA technology eliminates incubation risks and accelerates your workflow.",
    visual: (
      // 1. FONDO NEGRO PURO
      // 2. MEJORA DISEÑO: Mismo estilo CSS (bordes, glow, glassmorphism) que las demás tarjetas
      <div className="absolute inset-0 bg-black flex items-center justify-center overflow-hidden">
         <div className="relative w-24 h-24 rounded-full bg-rose-500/5 flex items-center justify-center border border-rose-500/20 shadow-[0_0_15px_rgba(225,29,72,0.1)]">
             <div className="absolute inset-0 rounded-full border border-rose-500/30 animate-pulse opacity-40"></div>
             <Ban className="absolute w-12 h-12 text-rose-500/80 stroke-[1.5]" />
             <Timer className="w-5 h-5 text-rose-200/50" />
         </div>
      </div>
    )
  },
  {
    id: 2,
    title: "Results in hours.",
    text: "Go from swab to actionable data in just 3 to 6 hours. Enable immediate decision-making and implement same-day corrective actions.",
    visual: (
      // 1. FONDO NEGRO PURO
      <div className="absolute inset-0 bg-black flex flex-col items-center justify-center overflow-hidden px-6">
          <div className="w-full bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-3">
                   <div className="h-full bg-cyan-400 rounded-full w-[80%] shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
              </div>
              <div className="flex justify-between items-center">
                   <Zap className="w-4 h-4 text-cyan-400" />
                   <span className="text-[10px] text-white font-mono">03:00:00</span>
              </div>
          </div>
      </div>
    )
  },
  {
    id: 3,
    title: "Universal sampling.",
    text: "Fully validated for both swabs and sponges. Seamlessly adapt Elevia to your existing environmental monitoring protocols.",
    visual: (
      // 1. FONDO NEGRO PURO
      // 3. MEJORA DISEÑO: Swab y Sponge creados con estilo UI glassmorphism (bordes, blur, color sutil)
      <div className="absolute inset-0 bg-black flex items-center justify-center overflow-hidden gap-5">
         {/* Abstract Swab UI */}
         <div className="relative flex flex-col items-center">
             <div className="w-5 h-8 bg-fuchsia-500/10 border border-fuchsia-500/30 rounded-t-full rounded-b-md backdrop-blur-md z-10 shadow-[0_0_10px_rgba(217,70,239,0.15)]"></div>
             <div className="w-1.5 h-12 bg-white/5 border-x border-b border-white/10 rounded-b-full -mt-1 backdrop-blur-sm"></div>
         </div>
         {/* Abstract Sponge UI */}
         <div className="w-14 h-12 bg-blue-500/10 border border-blue-500/20 rounded-xl backdrop-blur-md flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.15)]">
             <div className="w-8 h-6 border border-blue-400/30 rounded border-dashed opacity-50"></div>
         </div>
      </div>
    )
  },
  {
    id: 4,
    title: "Operational agility.",
    text: "Keep your lines moving. Same-day corrective actions drastically reduce production downtime and optimize resource allocation.",
    visual: (
      // 1. FONDO NEGRO PURO
      <div className="absolute inset-0 bg-black flex items-center justify-center overflow-hidden">
          <div className="relative w-24 h-24 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-emerald-500/20 border-t-emerald-500 animate-spin" style={{ animationDuration: '3s' }}></div>
              <Activity className="w-8 h-8 text-emerald-400" />
          </div>
      </div>
    )
  },
  {
    id: 5,
    title: "Enhanced food safety.",
    text: "Stop threats before they spread. Early detection of contamination hotspots prevents large-scale holds and protects your brand.",
    visual: (
      // 1. FONDO NEGRO PURO
      <div className="absolute inset-0 bg-black flex items-center justify-center overflow-hidden">
          <div className="relative w-20 h-20 rounded-full bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
              <div className="absolute inset-0 rounded-full border border-orange-500/50 animate-ping opacity-20"></div>
              <ShieldCheck className="w-8 h-8 text-orange-500" />
          </div>
      </div>
    )
  },
  {
    id: 6,
    title: "Cost efficiency.",
    text: "Maximize your operational savings. By eliminating enrichment media and reducing holding times, Elevia lowers your true cost per test.",
    visual: (
      // 1. FONDO NEGRO PURO
      <div className="absolute inset-0 bg-black flex items-end justify-center overflow-hidden pb-12 gap-3">
           <div className="w-6 h-24 bg-white/5 rounded-t-md border-t border-white/10 relative">
               <TrendingDown className="w-4 h-4 text-green-400 absolute -top-8 left-1/2 -translate-x-1/2" />
           </div>
           <div className="w-6 h-14 bg-white/10 rounded-t-md border-t border-white/20"></div>
           <div className="w-6 h-6 bg-green-500/20 rounded-t-md border-t-2 border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.3)]"></div>
      </div>
    )
  },
  {
    id: 7,
    title: "Powered by TxA.",
    text: "Map, track, and prevent contamination more efficiently. Seamlessly integrate with our AI-driven software for dynamic environmental sampling.",
    visual: (
      // 1. FONDO NEGRO PURO
      <div className="absolute inset-0 bg-black flex items-center justify-center overflow-hidden">
           {/* Animación de puntos flotantes estilo MILA */}
           <div className="absolute top-[20%] left-[20%] w-2 h-2 bg-cyan-400 rounded-full animate-float" style={{ animationDelay: '0s' }}></div>
           <div className="absolute top-[60%] left-[25%] w-3 h-3 bg-indigo-500 rounded-full animate-float" style={{ animationDelay: '1.5s' }}></div>
           <div className="absolute top-[30%] left-[70%] w-1.5 h-1.5 bg-blue-500 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
           <div className="absolute top-[75%] left-[60%] w-2.5 h-2.5 bg-lime-400 rounded-full animate-float" style={{ animationDelay: '0.8s' }}></div>
           <div className="absolute top-[40%] left-[80%] w-2 h-2 bg-emerald-400 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
           
           <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl flex items-center justify-center z-10">
               <Network className="w-6 h-6 text-white" />
           </div>
      </div>
    )
  }
];

export default function EleviaEnvironmental() {
  const carouselRef = useRef<HTMLDivElement>(null);

  // Función para mover el carrusel con las flechas
  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 280; // Ancho ajustado de la tarjeta para el salto
      carouselRef.current.scrollBy({ 
        left: direction === 'left' ? -scrollAmount : scrollAmount, 
        behavior: 'smooth' 
      });
    }
  };

  return (
    // Fondo de la sección en #121212
    <section className="relative w-full bg-[#121212] py-24 md:py-32 flex flex-col items-center justify-center overflow-hidden">
      
      {/* INYECCIÓN DE ESTILOS Y ANIMACIONES (Sin barras de scroll + animación flotante) */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scroll::-webkit-scrollbar {
          display: none !important;
        }
        .hide-scroll {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
        @keyframes float {
          0%, 100% { transform: translate(0, 0); opacity: 0.8; }
          25% { transform: translate(5px, -10px); opacity: 0.4; }
          50% { transform: translate(0, -20px); opacity: 1; }
          75% { transform: translate(-5px, -10px); opacity: 0.4; }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
      `}} />

      {/* ========================================================= */}
      {/* 1. TARJETA PRINCIPAL (Hero Ambiental)                     */}
      {/* ========================================================= */}
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 mb-20 md:mb-32">
        <div className="relative w-full min-h-[550px] md:min-h-[700px] rounded-[2rem] overflow-hidden flex flex-col">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <Image src="/env.png" alt="Elevia Environmental" fill className="object-cover object-center" priority />
          </div>

          <div className="absolute inset-0 z-10 bg-black/40 bg-gradient-to-bl from-black/80 via-black/20 to-transparent pointer-events-none"></div>

          <div className="absolute inset-0 z-20 w-full flex flex-col justify-between md:justify-start items-end p-8 pr-16 md:p-16 md:pr-40">
            <div className="w-full max-w-[380px] flex flex-col items-end">
              <span className="text-left text-xs md:text-sm font-bold tracking-[0.2em] text-[#FF270A] uppercase mb-4 block w-full">
                Environmental Monitoring
              </span>
              <h2 className="text-left text-2xl md:text-4xl font-bold text-white mb-5 tracking-tight leading-tight w-full">
                Zero blind spots. <br className="hidden md:block" /> Absolute facility control.
              </h2>
            </div>
            <div className="w-full max-w-[380px] flex flex-col items-end md:mt-6">
              <p className="text-left text-sm md:text-base text-white/90 font-medium leading-relaxed w-full">
                Bypass traditional enrichment. Elevia detects active pathogens directly from any surface in record time, transforming your environmental monitoring from reactive to predictive.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. CARRUSEL DE VENTAJAS (Estilo Apple Exacto)             */}
      {/* ========================================================= */}
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="relative w-full">
          
          <div 
            ref={carouselRef}
            className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory hide-scroll pb-12"
          >
            {/* Bloque invisible que empuja la primera tarjeta hacia la derecha */}
            <div className="shrink-0 w-6 md:w-20"></div>

            {ENVIRONMENTAL_ADVANTAGES.map((adv) => (
              <div key={adv.id} className="snap-start shrink-0 flex flex-col w-[220px] md:w-[260px]">
                
                {/* Contenedor Visual: aspect-[4/5], bordes curvos, negro puro */}
                <div className="relative w-full aspect-[4/5] rounded-[1.5rem] bg-black overflow-hidden mb-5">
                  {adv.visual}
                </div>
                
                {/* Texto abajo: Inline, primera frase en negrita y blanca */}
                <div className="px-1">
                  <p className="text-[13px] md:text-[15px] text-white/50 leading-relaxed font-medium">
                    <strong className="text-white font-semibold mr-1">{adv.title}</strong>
                    {adv.text}
                  </p>
                </div>

              </div>
            ))}
            
            <div className="shrink-0 w-8 md:w-32"></div>
          </div>
          
          {/* Botones de Navegación */}
          <div className="flex justify-end gap-3 mt-4 pr-6 md:pr-16 max-w-[1400px] mx-auto w-full">
            <button 
              onClick={() => scroll('left')}
              className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors backdrop-blur-md"
              aria-label="Previous slide"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors backdrop-blur-md"
              aria-label="Next slide"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>

        </div>
      </div>
      
    </section>
  );
}