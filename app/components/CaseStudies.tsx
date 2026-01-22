"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import Image from "next/image";

// CONFIGURACIÓN DE TAMAÑOS
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
    name: "Ingredion", 
    src: "/logos/ingredion.png", 
    sizeClass: "h-16" 
  },
];

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

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 424; 
      scrollRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-24 bg-[#FFFFFF] overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* --- PARTNERS --- */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-16">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#111111] mb-6">
              Real solutions. <br />
              <span className="text-[#111111]/40">Real impact.</span>
            </h2>
            
            <p className="text-[#111111]/60 text-lg mb-10 leading-relaxed">
              Trusted by global leaders to protect their brands and optimize their production.
            </p>

            <div className="flex items-center gap-4 mb-8">
               <div className="h-8 w-[3px] bg-[#FF270A] rounded-full"></div>
               <span className="text-xs font-bold uppercase tracking-widest text-[#111111]/40">
                  Some of our partners
               </span>
            </div>

            <div className="grid grid-cols-4 gap-8 items-center w-full">
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
                    className="object-contain object-center" 
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- CONTROLES --- */}
        <div className="flex flex-wrap items-center justify-between gap-6 mb-4">
           <div className="flex items-center gap-4">
               <div className="h-8 w-[3px] bg-[#FF270A] rounded-full"></div>
               <span className="text-xs font-bold uppercase tracking-widest text-[#111111]/40">
                  Successful Cases
               </span>
           </div>

           <div className="flex gap-3">
                <button 
                  onClick={() => scroll("left")}
                  className="w-12 h-12 rounded-full border border-[#111111]/10 hover:bg-[#111111] hover:text-white flex items-center justify-center transition-all text-[#111111] active:scale-90"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => scroll("right")}
                  className="w-12 h-12 rounded-full border border-[#111111]/10 hover:bg-[#111111] hover:text-white flex items-center justify-center transition-all text-[#111111] active:scale-90"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
            </div>
        </div>

        {/* --- CARRUSEL --- */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto py-12 -my-12 px-6 lg:px-0 scrollbar-hide snap-x snap-mandatory"
        >
          {CASES.map((item) => (
            <div 
              key={item.id}
              className={`relative flex-none w-[85vw] md:w-[400px] h-[500px] md:h-[600px] rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between overflow-hidden snap-start group transition-all duration-300 ease-out hover:scale-[1.02] hover:-translate-y-2 hover:shadow-2xl bg-black text-white shadow-lg shadow-black/5 cursor-pointer`}
            >
              <div className="absolute inset-0 z-0">
                 <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-transparent z-10" />
                 <Image 
                   src={item.image} 
                   alt={item.title}
                   fill
                   className="object-cover opacity-90"
                 />
              </div>

              <div className="relative z-20">
                <span className="text-xs font-bold uppercase tracking-widest text-white/60 mb-3 block">
                  {item.category}
                </span>
                <h3 className="text-3xl md:text-4xl font-bold leading-tight mb-4 text-white drop-shadow-lg">
                  {item.title}
                </h3>
                <p className="text-sm md:text-base text-white/90 leading-relaxed max-w-xs drop-shadow-md font-medium">
                  {item.description}
                </p>
              </div>

              {/* FOOTER: Solo el botón alineado a la derecha */}
              <div className="relative z-20 flex items-center justify-end mt-auto pt-8">
                 <button className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center group-hover:bg-[#FF270A] group-hover:text-white transition-all shadow-lg group-hover:scale-110">
                    <Plus className="w-6 h-6" />
                 </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}