"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { 
  ArrowRight, 
  Check, 
  ChevronLeft, 
  ChevronRight,
  Maximize, 
  Users, 
  Clock, 
  Zap 
} from "lucide-react";
import { WORKFLOW_STEPS, LAB_SPECS } from "../../industrial/industrialData";

export default function HowItWorks() {
  // --- LÓGICA DEL CARRUSEL (Sin cambios) ---
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
      const scrollAmount = current.clientWidth * 0.5;
      if (direction === "left") {
        current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  const edgePadding = "max(1.5rem, calc((100vw - 80rem) / 2 + 1.5rem))";

  // --- LÓGICA DE ICONOS ---
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "space": return <Maximize className="w-5 h-5 text-[#FF270A]" />;
      case "users": return <Users className="w-5 h-5 text-[#FF270A]" />;
      case "time": return <Clock className="w-5 h-5 text-[#FF270A]" />;
      case "plug": return <Zap className="w-5 h-5 text-[#FF270A]" />;
      default: return null;
    }
  };

  return (
    <section className="bg-white">
      
      {/* ==============================================
          PARTE 1: WORKFLOW (CARRUSEL)
      =============================================== */}
      <div className="pt-24 pb-12 relative overflow-hidden">
        {/* ENCABEZADO */}
        <div className="max-w-7xl mx-auto px-6 mb-16 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-extrabold text-[#111111] leading-[1.1] tracking-tight">
                How our solutions work. <br />
                <span className="text-gray-400">From sample to decision.</span>
              </h2>
            </div>
            <div className="max-w-md md:text-right pb-1">
              <p className="text-gray-500 text-lg font-medium leading-relaxed">
                We provide the entire ecosystem. No fragmented vendors, no compatibility issues. Just a seamless flow from the sample collection to the TxA digital management.
              </p>
            </div>
          </div>
        </div>

        {/* CARRUSEL */}
        <div className="relative w-full group">
          {/* Flechas */}
          <div className={`hidden md:flex absolute top-1/2 -translate-y-1/2 left-4 z-30 transition-opacity duration-300 ${canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
             <button onClick={() => scroll("left")} className="w-14 h-14 rounded-full bg-gray-100/50 hover:bg-gray-200/80 backdrop-blur-md text-[#111111] flex items-center justify-center transition-all duration-300 active:scale-95" aria-label="Scroll left">
               <ChevronLeft className="w-8 h-8 opacity-60" />
             </button>
          </div>
          <div className={`hidden md:flex absolute top-1/2 -translate-y-1/2 right-4 z-30 transition-opacity duration-300 ${canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
             <button onClick={() => scroll("right")} className="w-14 h-14 rounded-full bg-gray-100/50 hover:bg-gray-200/80 backdrop-blur-md text-[#111111] flex items-center justify-center transition-all duration-300 active:scale-95" aria-label="Scroll right">
               <ChevronRight className="w-8 h-8 opacity-60" />
             </button>
          </div>

          {/* Área Scrolleable */}
          <div 
            ref={scrollRef}
            onScroll={checkScroll}
            style={{ paddingLeft: edgePadding, paddingRight: edgePadding, scrollPaddingLeft: edgePadding, scrollPaddingRight: edgePadding }}
            className="flex gap-4 md:gap-6 overflow-x-auto pb-12 w-full snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
          >
            {WORKFLOW_STEPS.map((step, index) => (
              <div 
                key={step.id}
                className={`relative flex-shrink-0 w-[85vw] md:w-[420px] h-[620px] rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between snap-start transition-transform duration-300 hover:scale-[1.01] bg-[#F4F2ED] text-[#111111]`}
              >
                <div className="relative z-10">
                  <span className={`text-xs font-bold uppercase tracking-widest opacity-60 mb-5 block`}>{step.step}</span>
                  <h3 className="text-3xl md:text-4xl font-bold mb-4 leading-tight tracking-tight">{step.title}</h3>
                  <p className={`text-base font-medium leading-relaxed opacity-80 max-w-sm`}>{step.description}</p>
                </div>
                <div className="relative w-full h-[260px] mt-6 rounded-[2rem] overflow-hidden mix-blend-multiply">
                   <Image src={step.image} alt={step.title} fill className={`${index === 0 || index === WORKFLOW_STEPS.length - 1 ? 'object-cover' : 'object-contain p-4'} transition-transform duration-700 hover:scale-105`} />
                </div>
                <div className="mt-8 flex items-center justify-between border-t border-black/5 pt-6">
                   <button className={`text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:opacity-70 transition-opacity`}>Learn more <ArrowRight className="w-3 h-3" /></button>
                </div>
                {index === 0 && (<div className="absolute top-10 right-10 w-12 h-12 bg-[#FF270A] rounded-full flex items-center justify-center animate-pulse shadow-xl z-20"><Check className="text-white w-6 h-6" /></div>)}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ==============================================
          PARTE 2: LAB SPECS (ESTILO HIMS LABS - CLEAN LIST)
      =============================================== */}
      <div className="relative w-full pb-24 pt-12">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* --- COLUMNA IZQUIERDA: Lista Simple --- */}
            <div>
              <div className="mb-10">
                <span className="text-[#FF270A] font-bold uppercase tracking-widest text-xs mb-3 block">
                  Installation
                </span>
                <h2 className="text-4xl md:text-5xl font-extrabold text-[#111111] leading-tight mb-6">
                  Simple setup. <br />
                  Powerful results.
                </h2>
                <p className="text-gray-500 text-lg font-medium leading-relaxed">
                  Designed for efficiency. Our ecosystem fits into your existing lab space without the need for expensive renovations or specialized personnel.
                </p>
              </div>

              {/* LISTA VERTICAL (Estilo Hims Check) */}
              <div className="space-y-6">
                {LAB_SPECS.map((spec, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                    {/* Icono pequeño */}
                    <div className="shrink-0 mt-1 w-8 h-8 rounded-full bg-[#FF270A]/10 flex items-center justify-center">
                      {getIcon(spec.icon)}
                    </div>
                    
                    {/* Texto */}
                    <div>
                      <h4 className="text-xl font-bold text-[#111111]">{spec.label}</h4>
                      <p className="text-gray-500 font-medium text-sm mt-1">
                        <span className="text-[#111111] font-semibold">{spec.value}</span> — {spec.subtext}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* --- COLUMNA DERECHA: Imagen Vertical con Degradados --- */}
            <div className="relative h-[600px] md:h-[700px] w-full max-w-md mx-auto lg:mx-0 lg:ml-auto rounded-[3rem] overflow-hidden">
               {/* Imagen: object-cover para llenar el alto vertical */}
               <Image 
                 src="/termo.png" 
                 alt="Laboratory Thermocycler Setup" 
                 fill
                 className="object-cover object-center"
               />
               
               {/* === DEGRADADOS (Faders) === */}
               {/* Arriba: Blanco hacia transparente */}
               <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white to-transparent pointer-events-none" />
               
               {/* Abajo: Blanco hacia transparente */}
               <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}