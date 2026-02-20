"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Zap, Activity, ShieldCheck, TrendingDown } from "lucide-react";

// --- DATOS DEL CARRUSEL DE VENTAJAS ---
const ENVIRONMENTAL_ADVANTAGES = [
  {
    id: 1,
    title: "Zero enrichment.",
    text: "Bypass the 24-hour growth phase. Our direct-from-surface RNA technology eliminates incubation risks and accelerates your workflow.",
    visual: (
      <div className="absolute inset-0 bg-black flex items-center justify-center overflow-hidden">
         <div className="text-[140px] font-black leading-none text-transparent bg-clip-text bg-gradient-to-br from-white via-white/80 to-white/5 select-none drop-shadow-[0_0_20px_rgba(255,255,255,0.15)] tracking-tighter">
            0
         </div>
         <div className="absolute w-[120%] h-[2px] bg-red-500/80 -rotate-45 shadow-[0_0_20px_rgba(239,68,68,0.8)] z-10"></div>
         <div className="absolute w-40 h-40 bg-red-600/10 blur-3xl rounded-full"></div>
      </div>
    )
  },
  {
    id: 2,
    title: "Results in hours.",
    text: "Go from swab to actionable data in just 3 to 6 hours. Enable immediate decision-making and implement same-day corrective actions.",
    visual: (
      <div className="absolute inset-0 bg-black flex flex-col items-center justify-center overflow-hidden px-6">
          <div className="absolute w-32 h-32 bg-purple-600/10 blur-3xl rounded-full"></div>
          <div className="w-full bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-sm relative z-10">
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-3">
                   <div className="h-full bg-purple-500 rounded-full w-full shadow-[0_0_10px_rgba(168,85,247,0.8)]"></div>
              </div>
              <div className="flex justify-between items-center">
                   <Zap className="w-4 h-4 text-purple-400" />
                   <div className="flex items-baseline gap-1">
                       <span className="text-xs text-white font-mono font-bold">03:00</span>
                       <span className="text-[9px] text-purple-300 font-bold tracking-wider">HRS</span>
                   </div>
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
      // Cambiamos justify-end por justify-center
      <div className="absolute inset-0 bg-black flex flex-col justify-center items-center overflow-hidden">
           {/* Eliminamos mt-auto. Puedes ajustar el h-[50%] si quieres que la imagen sea más grande o chica */}
           <div className="relative w-full h-[50%]"> 
               <Image 
                 src="/prot4.png" 
                 alt="Powered by TxA" 
                 fill 
                 className="object-contain object-center" 
               />
           </div>
      </div>
    )
  },
  {
    id: 4,
    title: "Super simple workflow. ",
    text: "It works with common qPCR machines and no need of incubators. Its easy protocol allows any analyst to run the kits effortlessly.",
    visual: (
      <div className="absolute inset-0 bg-black flex items-center justify-center overflow-hidden">
        {/* Abstract PCR plate background */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.3)_1px,transparent_1px)] bg-[size:14px_14px]"></div>
        
        {/* Glassmorphism open platform representation */}
        <div className="relative z-10 flex items-center justify-center w-24 h-24 rounded-2xl bg-white/5 border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.02)] backdrop-blur-md">
           <div className="grid grid-cols-3 gap-2 p-1">
             {[...Array(9)].map((_, i) => (
               <div key={i} className={`w-3.5 h-3.5 rounded-full ${i === 4 ? 'bg-[#FF270A] shadow-[0_0_15px_rgba(255,39,10,0.9)]' : 'bg-white/20'}`}></div>
             ))}
           </div>
        </div>
        
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#FF270A]/10 blur-3xl rounded-full z-0"></div>
      </div>
    )
  },
  {
    id: 5,
    title: "Operational agility.",
    text: "Keep your lines moving. Same-day corrective actions drastically reduce production downtime and optimize resource allocation.",
    visual: (
      <div className="absolute inset-0 bg-black flex items-center justify-center overflow-hidden">
          <div className="relative w-24 h-24 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-emerald-500/20 border-t-emerald-500 animate-spin" style={{ animationDuration: '3s' }}></div>
              <Activity className="w-8 h-8 text-emerald-400" />
          </div>
      </div>
    )
  },
  {
    id: 6,
    title: "Enhanced food safety.",
    text: "Stop threats before they spread. Early detection of contamination hotspots prevents large-scale holds and protects your brand.",
    visual: (
      <div className="absolute inset-0 bg-black flex items-center justify-center overflow-hidden">
          <div className="relative w-20 h-20 rounded-full bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
              <div className="absolute inset-0 rounded-full border border-orange-500/50 animate-ping opacity-20"></div>
              <ShieldCheck className="w-8 h-8 text-orange-500" />
          </div>
      </div>
    )
  },
  {
    id: 7,
    title: "Cost efficiency.",
    text: "Maximize your operational savings. Fast results mean reducing holding times and increasing operational efficiency in your plant.",
    visual: (
      <div className="absolute inset-0 bg-black flex items-end justify-center overflow-hidden pb-8 gap-5">
           <div className="w-12 h-48 bg-white/5 rounded-t-xl border-t border-white/10 relative">
               <TrendingDown className="w-8 h-8 text-green-400 absolute -top-12 left-1/2 -translate-x-1/2" />
           </div>
           <div className="w-12 h-28 bg-white/10 rounded-t-xl border-t border-white/20"></div>
           <div className="w-12 h-12 bg-green-500/20 rounded-t-xl border-t-2 border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.3)] relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-b from-green-500/20 to-transparent"></div>
           </div>
      </div>
    )
  },
  {
    id: 8,
    title: "Powered by TxA.",
    text: "Map, track, and prevent contamination more efficiently. Seamlessly integrate with our AI-driven software for dynamic environmental sampling.",
    visual: (
      <div className="absolute inset-0 bg-black flex flex-col justify-end items-center overflow-hidden">
           <div className="relative w-full h-[80%] mt-auto">
               <Image 
                 src="/TxA.png" 
                 alt="Powered by TxA" 
                 fill 
                 className="object-contain object-bottom" 
               />
           </div>
      </div>
    )
  }
];

export default function EleviaEnvironmental() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      // Damos un pequeño margen de 5px para evitar problemas de redondeo de pixeles en móviles
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 5);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 280; 
      carouselRef.current.scrollBy({ 
        left: direction === 'left' ? -scrollAmount : scrollAmount, 
        behavior: 'smooth' 
      });
      // El evento onScroll actualizará el estado automáticamente
    }
  };

  return (
    <section data-header-theme="dark" className="relative w-full bg-[#121212] pt-24 pb-8 md:pt-32 md:pb-16 flex flex-col items-center justify-center overflow-hidden">      
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scroll::-webkit-scrollbar {
          display: none !important;
        }
        .hide-scroll {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
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
                Fast results. <br className="hidden md:block" /> Absolute facility control.
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
      {/* 2. CARRUSEL DE VENTAJAS (Alineado a max-w-[1200px])       */}
      {/* ========================================================= */}
      <div className="w-full relative">
        
        {/* Padding pl ajustado a 600px para calzar exacto con la cuadrícula de Elevia.tsx */}
        <div 
          ref={carouselRef}
          onScroll={checkScroll}
          className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory hide-scroll pb-6 pl-[max(1rem,calc(50vw_-_600px_+_1rem))] scroll-pl-[max(1rem,calc(50vw_-_600px_+_1rem))]"
        >
          {ENVIRONMENTAL_ADVANTAGES.map((adv) => (
            <div key={adv.id} className="snap-start shrink-0 flex flex-col w-[220px] md:w-[260px]">
              
              <div className="relative w-full aspect-[4/5] rounded-[1.5rem] bg-black overflow-hidden mb-5">
                {adv.visual}
              </div>
              
              <div>
                <p className="text-[13px] md:text-[15px] text-white/70 leading-relaxed font-medium">
                  <strong className="text-white font-semibold mr-1">{adv.title}</strong>
                  {adv.text}
                </p>
              </div>

            </div>
          ))}
          
          <div className="shrink-0 w-[max(1rem,calc(50vw_-_600px_+_1rem))]"></div>
        </div>
        
        {/* Controles y Learn More limitados a max-w-[1200px] y px-4 */}
        <div className="flex items-center justify-between mt-4 px-4 max-w-[1200px] mx-auto w-full">
          
          <a href="#" className="inline-flex items-center gap-1.5 text-sm md:text-base text-white hover:text-white/70 transition-colors font-medium group">
            Learn more
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </a>

          <div className="flex gap-3">
            <button 
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all backdrop-blur-md ${
                canScrollLeft 
                  ? "bg-white/5 hover:bg-white/10 text-white/70 hover:text-white cursor-pointer" 
                  : "bg-white/5 text-white/30 opacity-50 cursor-not-allowed"
              }`}
              aria-label="Previous slide"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <button 
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all backdrop-blur-md ${
                canScrollRight 
                  ? "bg-white/5 hover:bg-white/10 text-white/70 hover:text-white cursor-pointer" 
                  : "bg-white/5 text-white/30 opacity-50 cursor-not-allowed"
              }`}
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