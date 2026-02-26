"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Zap, ShieldCheck, Activity, Layers, Clock, Lock } from "lucide-react";

// --- DATOS DEL CARRUSEL DE MODULAR DX ---
const MODULAR_ADVANTAGES = [
  {
    id: 1,
    isWide: true,
    title: "Plug & Play.",
    text: "Arrives fully equipped and ready to operate. Skip the months of construction and start running molecular diagnostics from day one.",
    visual: (
      // Aplicamos object-contain y scale para dejar el margen blanco deseado
      <Image 
        src="/modularDX2.png" 
        alt="ModularDX Interior" 
        fill 
        className="object-contain object-center scale-[85%]" 
        priority
      />
    )
  },
  {
    id: 2,
    title: "ISO Compliant.",
    text: "Built to meet the most stringent international molecular biology standards, ensuring absolute reliability and quality control.",
    visual: (
      <div className="absolute inset-0 bg-white flex items-center justify-center overflow-hidden">
          <div className="relative w-24 h-24 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-emerald-500/30 border-dashed animate-[spin_10s_linear_infinite]"></div>
              <div className="absolute inset-2 rounded-full border border-emerald-500/15 animate-[spin_8s_linear_infinite_reverse]"></div>
              <ShieldCheck className="w-10 h-10 text-emerald-600 relative z-10" strokeWidth={1.5} />
          </div>
      </div>
    )
  },
  {
    id: 3,
    title: "TxA Integrated.",
    text: "Pre-wired and synchronized with our AI software ecosystem. Automate workflows, reporting, and data analysis instantly.",
    visual: (
      <div className="absolute inset-0 bg-white flex items-center justify-center overflow-hidden">
          <div className="absolute w-32 h-32 bg-purple-500/10 blur-3xl rounded-full"></div>
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.1)_1px,transparent_1px)] bg-[size:16px_16px]"></div>
          <div className="w-16 h-16 bg-[#F4F4F5] rounded-xl border border-purple-100 flex items-center justify-center relative z-10">
             <Activity className="w-8 h-8 text-purple-600" />
          </div>
      </div>
    )
  },
  {
    id: 4,
    title: "Scalable footprint.",
    text: "Start with the exact capacity you need today. ModularDX allows you to seamlessly add new modules as your testing volume grows.",
    visual: (
      <div className="absolute inset-0 bg-white flex items-center justify-center overflow-hidden gap-2">
         <div className="w-10 h-10 border-2 border-orange-200 rounded-lg transform -translate-y-4 translate-x-4 opacity-50 bg-[#F4F4F5]"></div>
         <div className="w-12 h-12 border-2 border-orange-400 rounded-lg absolute z-10 bg-white flex items-center justify-center">
            <Layers className="w-6 h-6 text-orange-500" />
         </div>
         <div className="w-14 h-14 border-2 border-orange-500 rounded-lg transform translate-y-4 -translate-x-4 bg-orange-50"></div>
      </div>
    )
  },
  {
    id: 5,
    title: "Rapid Deployment.",
    text: "From finalized order to a fully operational laboratory in a fraction of the time it takes to build a traditional brick-and-mortar facility.",
    visual: (
      <div className="absolute inset-0 bg-white flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute w-40 h-1 bg-gradient-to-r from-transparent via-[#FF270A] to-transparent rotate-45 opacity-30"></div>
          <Clock className="w-10 h-10 text-[#FF270A] relative z-10 mb-2" strokeWidth={1.5} />
          <div className="text-[#111111] font-mono font-bold text-xs tracking-[0.2em] relative z-10">WEEKS, NOT MONTHS</div>
      </div>
    )
  },
  {
    id: 6,
    title: "Maximum Biosecurity.",
    text: "Engineered with unidirectional workflows, HEPA filtration, and strict climate control to guarantee optimal PCR performance.",
    visual: (
      <div className="absolute inset-0 bg-white flex items-center justify-center overflow-hidden">
          <div className="w-20 h-20 rounded-full bg-[#F4F4F5] border border-gray-200 flex items-center justify-center relative">
              <div className="absolute inset-0 rounded-full border-t-2 border-blue-500 animate-spin" style={{ animationDuration: '2s' }}></div>
              <Lock className="w-8 h-8 text-blue-600" strokeWidth={1.5} />
          </div>
      </div>
    )
  }
];

export default function ModularDX() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
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
      const scrollAmount = 300; 
      carouselRef.current.scrollBy({ 
        left: direction === 'left' ? -scrollAmount : scrollAmount, 
        behavior: 'smooth' 
      });
    }
  };

  return (
    <section className="relative w-full bg-[#F4F4F5] pt-24 pb-8 md:pt-32 md:pb-16 flex flex-col items-center justify-center overflow-hidden">      
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
      {/* 1. TARJETA PRINCIPAL (Hero ModularDX Responsivo)          */}
      {/* ========================================================= */}
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 mb-16 md:mb-20">
        {/* Cambié la altura mínima en móvil a 600px para que el formato vertical respire mejor */}
        <div className="relative w-full min-h-[600px] md:min-h-[700px] rounded-[2rem] overflow-hidden flex flex-col shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)]">
          
          {/* Imágenes de Fondo (Desktop vs Mobile) */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            {/* Imagen Desktop */}
            <Image 
              src="/modularDX1.png" 
              alt="ModularDX Laboratory" 
              fill 
              className="hidden md:block object-cover object-center" 
              priority 
            />
            {/* Imagen Mobile (Abarca toda la tarjeta) */}
            <Image 
              src="/modularDX_phone.png" 
              alt="ModularDX Laboratory" 
              fill 
              className="block md:hidden object-cover object-center" 
              priority 
            />
          </div>

          {/* Gradientes Responsivos */}
          {/* Móvil: Oscurece arriba y abajo | Desktop: Oscurece de derecha a izquierda */}
          <div className="absolute inset-0 z-10 bg-black/10 md:bg-black/30 bg-gradient-to-b from-black/80 via-transparent to-black/90 md:bg-none md:bg-gradient-to-l md:from-black/90 md:via-black/40 md:to-transparent pointer-events-none"></div>

          {/* Contenedor de Textos: justify-between en móvil, justify-center en escritorio */}
          <div className="absolute inset-0 z-20 w-full flex flex-col justify-between md:justify-center items-start md:items-end p-8 md:p-16 md:pr-24 lg:pr-32">
            
            {/* Bloque Superior (Título) */}
            <div className="w-full max-w-[380px] flex flex-col items-start mt-2 md:mt-0">
              <span className="text-left text-xs md:text-sm font-bold tracking-[0.2em] text-[#FF270A] uppercase mb-4 block w-full drop-shadow-md">
                Turnkey Laboratory
              </span>
              <h2 className="text-left text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 tracking-tight leading-tight w-full drop-shadow-lg">
                Your lab. <br className="hidden md:block" /> Anywhere. Instantly.
              </h2>
            </div>

            {/* Bloque Inferior (Descripción) */}
            <div className="w-full max-w-[380px] flex flex-col items-start mb-4 md:mb-0 md:mt-4">
              <p className="text-left text-sm md:text-base text-white/90 font-medium leading-relaxed w-full drop-shadow-md">
                ModularDX is a fully equipped, plug-and-play molecular diagnostics laboratory. Designed to deploy rapidly and scale effortlessly, bringing the entire TAAG ecosystem to any location.
              </p>
            </div>

          </div>
          
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. CARRUSEL DE VENTAJAS (Sin sombras ni bordes)           */}
      {/* ========================================================= */}
      <div className="w-full relative">
        
        <div 
          ref={carouselRef}
          onScroll={checkScroll}
          className="flex gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory hide-scroll pb-6 pl-[max(1rem,calc(50vw_-_600px_+_2rem))] scroll-pl-[max(1rem,calc(50vw_-_600px_+_2rem))]"
        >
          {MODULAR_ADVANTAGES.map((adv) => (
            // Aplicamos ancho "2x" (584px) para la tarjeta Wide
            <div 
              key={adv.id} 
              className={`snap-start shrink-0 flex flex-col ${
                adv.isWide 
                  ? 'w-[85vw] md:w-[584px] max-w-[584px]' 
                  : 'w-[260px] md:w-[280px]'             
              }`}
            >
              
              <div 
                className={`relative w-full rounded-[2rem] bg-white overflow-hidden mb-6 flex items-center justify-center ${
                  adv.isWide ? 'h-[325px] md:h-[350px]' : 'aspect-[4/5]'
                }`}
              >
                {adv.visual}
              </div>
              
              <div className="pr-4">
                <p className="text-[14px] md:text-[15px] text-gray-600 leading-relaxed font-medium">
                  <strong className="text-[#111111] font-semibold mr-1">{adv.title}</strong>
                  {adv.text}
                </p>
              </div>

            </div>
          ))}
          
          <div className="shrink-0 w-[max(1rem,calc(50vw_-_600px_+_1rem))]"></div>
        </div>
        
        {/* Controles para Light Mode */}
        <div className="flex items-center justify-between mt-4 px-4 max-w-[1200px] mx-auto w-full">
          
          <a href="#" className="inline-flex items-center gap-1.5 text-sm md:text-base text-[#111111] hover:text-[#FF270A] transition-colors font-bold group">
            Learn more
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </a>

          <div className="flex gap-3">
            <button 
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                canScrollLeft 
                  ? "bg-[#111111] hover:bg-gray-800 text-white cursor-pointer shadow-md" 
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
              aria-label="Previous slide"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <button 
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                canScrollRight 
                  ? "bg-[#111111] hover:bg-gray-800 text-white cursor-pointer shadow-md" 
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
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