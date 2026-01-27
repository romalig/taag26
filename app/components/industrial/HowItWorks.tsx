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
  // --- LÓGICA DEL CARRUSEL ---
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
            {WORKFLOW_STEPS.map((step, index) => {
              const isFirstCard = index === 0;

              return (
                <div 
                  key={step.id}
                  className={`
                    relative flex-shrink-0 w-[85vw] md:w-[420px] 
                    h-[620px] 
                    rounded-[2.5rem] 
                    flex flex-col justify-between 
                    snap-start transition-transform duration-300 hover:scale-[1.01]
                    overflow-hidden
                    ${isFirstCard 
                      ? 'border-0' // Sin borde en la primera tarjeta
                      : 'bg-[#F4F2ED] text-[#111111] p-8 md:p-10 border border-transparent'
                    }
                  `}
                >
                  {/* === CASO 1: PRIMERA TARJETA (IMAGEN FULL) === */}
                  {isFirstCard ? (
                    <>
                      {/* Imagen de Fondo Completa */}
                      <div className="absolute inset-0 z-0">
                        <Image 
                          src="/howitworks.png" 
                          alt={step.title} 
                          fill 
                          className="object-cover"
                        />
                        {/* Overlay Inferior (Solo abajo, para texto blanco) */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                      </div>

                      {/* Contenido sobre la imagen */}
                      <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-10">
                         {/* Bloque Superior (Títulos Negros) */}
                         <div>
                           <span className="text-xs font-bold uppercase tracking-widest opacity-100 mb-3 block text-[#111111]">
                             {step.step}
                           </span>
                           {/* TÍTULO EN COLOR NEGRO */}
                           <h3 className="text-2xl font-bold leading-tight tracking-tight text-[#111111]">
                             {step.title}
                           </h3>
                         </div>

                         {/* Bloque Inferior (Descripción Blanca) */}
                         <div>
                           <p className="text-sm font-medium leading-relaxed opacity-90 mb-6 text-white/90">
                             {step.description}
                           </p>
                           {/* Contenedor alineado */}
                           <div className="pt-6 border-t border-white/20">
                              <button className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:opacity-80 transition-opacity text-white">
                                  Learn more <ArrowRight className="w-3 h-3" />
                              </button>
                           </div>
                         </div>
                      </div>
                    </>
                  ) : (
                    /* === CASO 2: TARJETAS ESTÁNDAR === */
                    <>
                      {/* 1. Header */}
                      <div className="relative z-10">
                        <span className="text-xs font-bold uppercase tracking-widest opacity-60 mb-3 block">
                          {step.step}
                        </span>
                        <h3 className="text-2xl font-bold leading-tight tracking-tight">
                          {step.title}
                        </h3>
                      </div>

                      {/* 2. Imagen Central */}
                      <div className="relative w-full flex-1 min-h-[200px] my-6 rounded-2xl overflow-hidden mix-blend-multiply">
                         <Image 
                           src={step.image} 
                           alt={step.title} 
                           fill 
                           className="object-contain p-2"
                         />
                      </div>

                      {/* 3. Footer */}
                      <div className="relative z-10">
                         <p className="text-sm font-medium leading-relaxed opacity-80 mb-6">
                           {step.description}
                         </p>
                         <div className="pt-6 border-t border-black/5">
                            <button className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:opacity-70 transition-opacity">
                               Learn more <ArrowRight className="w-3 h-3" />
                            </button>
                         </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ==============================================
          PARTE 2: LAB SPECS (SIN CAMBIOS)
      =============================================== */}
      <div className="relative w-full pb-24 pt-12">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Columna Izquierda */}
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
              {/* Lista Vertical */}
              <div className="space-y-6">
                {LAB_SPECS.map((spec, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                    <div className="shrink-0 mt-1 w-8 h-8 rounded-full bg-[#FF270A]/10 flex items-center justify-center">
                      {getIcon(spec.icon)}
                    </div>
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
            {/* Columna Derecha */}
            <div className="relative h-[600px] md:h-[700px] w-full rounded-[3rem] overflow-hidden shadow-2xl">
               <Image src="/termo.png" alt="Laboratory Setup" fill className="object-cover object-center" />
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}