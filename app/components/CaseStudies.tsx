"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

// CONFIGURACIÓN DE TAMAÑOS (Tu data original)
const CLIENTS = [
  { 
    name: "Danone", 
    src: "/logos/danone.png", 
    sizeClass: "h-24" 
  },
  { 
    name: "Coca-Cola", 
    src: "/logos/coca-cola.png", 
    sizeClass: "h-16" 
  },
  { 
    name: "Grupo Bimbo", 
    src: "/logos/bimbo.png", 
    sizeClass: "h-12" 
  },
  { 
    name: "Kerry", 
    src: "/logos/kerry2.png", 
    sizeClass: "h-16" 
  },
];

// DATA ORIGINAL DE TUS CASOS DE ESTUDIO
const CASES = [
  {
    id: 1,
    company: "Danone",
    category: "MILA™ Custom Design",
    title: "Precision Probiotics.",
    description: "Developing a custom triplex qPCR kit to quantify proprietary strains in finished yogurt products.",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=800&auto=format&fit=crop", 
  },
  {
    id: 2,
    company: "Arca Continental",
    category: "TxA™ Digital Transformation",
    title: "Bottling Intelligence.",
    description: "Standardizing microbiological control across 35 production plants with our AI-driven software.",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=800&auto=format&fit=crop", 
  },
  {
    id: 3,
    company: "Global Chocolate Leader",
    category: "AiGOR™ Pathogen Safety",
    title: "Safety at Speed.",
    description: "Ultra-fast Salmonella detection in chocolate matrices without complex enrichment.",
    image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?q=80&w=800&auto=format&fit=crop", 
  }
];

export default function CaseStudies() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = window.innerWidth < 768 ? current.clientWidth * 0.85 : current.clientWidth * 0.5; 
      if (direction === "left") {
        current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <section className="bg-white py-16 md:py-18 overflow-hidden">
      
      {/* ENCABEZADO Y PARTNERS */}
      <div className="max-w-7xl mx-auto px-10 md:px-20 mb-10 md:mb-16 relative z-10">
        
        {/* Textos Principales */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <span className="text-[#FF270A] font-bold tracking-widest uppercase text-xs mb-3 block">
              Proven Impact
            </span>
            <h2 className="text-4xl md:text-6xl font-extrabold text-[#111111] leading-[1.1] tracking-tight">
              Real solutions. <br />
              <span className="text-gray-400">Real impact.</span>
            </h2>
          </div>
          <div className="max-w-md md:text-right pb-1">
            <p className="text-gray-500 text-lg font-medium leading-relaxed">
              Trusted by global leaders to protect their brands and optimize their production.
            </p>
          </div>
        </div>

        {/* Sección de Logos */}
        <div className="flex items-center gap-4 mb-6">
           <div className="h-8 w-[3px] bg-[#FF270A] rounded-full"></div>
           <span className="text-xs font-bold uppercase tracking-widest text-[#111111]/40">
             Some of our partners
           </span>
        </div>
        
        <div className="grid grid-cols-4 gap-4 md:gap-8 items-center w-full max-w-3xl">
          {CLIENTS.map((client) => (
            <div 
              key={client.name} 
              className={`relative w-full flex justify-center items-center group transition-all duration-300 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 ${client.sizeClass}`}
              title={client.name}
            >
              <Image 
                src={client.src} 
                alt={`${client.name} logo`} 
                fill 
                className="object-contain object-left md:object-center" 
              />
            </div>
          ))}
        </div>

      </div>

      {/* --- TÍTULO SOBRE LAS TARJETAS (Restaurado) --- */}
      <div className="max-w-7xl mx-auto px-10 md:px-20 mb-6 relative z-10">
        <div className="flex items-center gap-4">
           <div className="h-8 w-[3px] bg-[#FF270A] rounded-full"></div>
           <span className="text-xs font-bold uppercase tracking-widest text-[#111111]/40">
             Successful Cases
           </span>
        </div>
      </div>

      {/* CARRUSEL TIPO SUCCESS-STORIES UNIFICADO */}
      <div className="relative w-full"> {/* Se removió la clase "group" global para corregir la animación */}
        
        {/* Flechas Desktop */}
        <div className={`hidden md:flex absolute top-1/2 -translate-y-1/2 left-4 z-30 transition-opacity duration-300 ${canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
           <button onClick={() => scroll("left")} className="w-14 h-14 rounded-full bg-white shadow-xl border border-gray-100 text-[#111111] flex items-center justify-center transition-all duration-300 active:scale-95 hover:bg-gray-50">
             <ChevronLeft className="w-8 h-8 opacity-60" />
           </button>
        </div>
        <div className={`hidden md:flex absolute top-1/2 -translate-y-1/2 right-4 z-30 transition-opacity duration-300 ${canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
           <button onClick={() => scroll("right")} className="w-14 h-14 rounded-full bg-white shadow-xl border border-gray-100 text-[#111111] flex items-center justify-center transition-all duration-300 active:scale-95 hover:bg-gray-50">
             <ChevronRight className="w-8 h-8 opacity-60" />
           </button>
        </div>

        {/* Área Scrolleable */}
        {/* Usamos variables CSS para alinear perfectamente con el max-w-7xl (1280px) de arriba */}
        <div 
          ref={scrollRef}
          onScroll={checkScroll}
          style={{
            '--edge-padding-mobile': '2.5rem', /* 40px para px-10 */
            '--edge-padding-desktop': 'max(5rem, calc((100vw - 80rem) / 2 + 5rem))', /* Alineación exacta con px-20 */
          } as React.CSSProperties}
          className="flex gap-4 md:gap-6 overflow-x-auto pb-6 w-full snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] pl-[var(--edge-padding-mobile)] pr-[var(--edge-padding-mobile)] md:pl-[var(--edge-padding-desktop)] md:pr-[var(--edge-padding-desktop)] scroll-pl-[var(--edge-padding-mobile)] scroll-pr-[var(--edge-padding-mobile)] md:scroll-pl-[var(--edge-padding-desktop)] md:scroll-pr-[var(--edge-padding-desktop)]"
        >
          {CASES.map((item) => {
            return (
              <div 
                key={item.id}
                // Añadida clase "group" exclusivamente a la tarjeta individual para que solo esta reaccione
                className="group relative flex-shrink-0 w-[85vw] md:w-[420px] h-[460px] md:h-[580px] rounded-[2.5rem] flex flex-col justify-between snap-start transition-transform duration-300 hover:scale-[1.01] overflow-hidden bg-black text-white p-8 md:p-10 border border-white/10"
              >
                {/* Imagen de Fondo */}
                <div className="absolute inset-0 z-0">
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Capa Oscura Uniforme */}
                <div className="absolute inset-0 bg-black/60 z-10" />

                {/* Contenido */}
                <div className="relative z-20 flex flex-col justify-between h-full">
                   
                   {/* Header: Cliente y Tag */}
                   <div className="flex justify-between items-start mb-6">
                     <div className="flex flex-col">
                       <span className="text-[10px] font-bold uppercase tracking-widest text-[#FF270A] mb-2">
                         {item.company}
                       </span>
                       <div className="flex gap-2">
                          <span className="text-[10px] font-bold text-gray-300 uppercase tracking-wider border border-white/20 px-2 py-0.5 rounded-full backdrop-blur-sm">
                            {item.category}
                          </span>
                       </div>
                     </div>
                   </div>

                   {/* Métrica Central / Título Grande */}
                   <div className="flex-1 flex flex-col justify-center mb-4">
                     <span className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-2 drop-shadow-md leading-tight">
                       {item.title}
                     </span>
                   </div>

                   {/* Footer */}
                   <div>
                     <p className="text-sm font-medium leading-relaxed text-gray-300 mb-6 md:mb-8 line-clamp-3">
                       {item.description}
                     </p>
                     <div className="pt-6 border-t border-white/20">
                         <button className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 text-white hover:text-[#FF270A] transition-colors">
                           Read case study <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                         </button>
                     </div>
                   </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* --- CONTROLES MÓVILES (BAJO EL CARRUSEL) --- */}
        <div className="flex md:hidden justify-end gap-3 px-6 mt-4">
           <button 
             onClick={() => scroll("left")} 
             disabled={!canScrollLeft}
             className={`w-10 h-10 rounded-full bg-[#111111] text-white flex items-center justify-center transition-all active:scale-95 ${!canScrollLeft ? 'opacity-30 cursor-not-allowed' : 'opacity-100 shadow-lg'}`}
             aria-label="Scroll left"
           >
             <ChevronLeft className="w-5 h-5" />
           </button>
           <button 
             onClick={() => scroll("right")} 
             disabled={!canScrollRight}
             className={`w-10 h-10 rounded-full bg-[#111111] text-white flex items-center justify-center transition-all active:scale-95 ${!canScrollRight ? 'opacity-30 cursor-not-allowed' : 'opacity-100 shadow-lg'}`}
             aria-label="Scroll right"
           >
             <ChevronRight className="w-5 h-5" />
           </button>
        </div>

      </div>
    </section>
  );
}