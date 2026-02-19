"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Clock, ShieldAlert, CheckCircle2, Package } from "lucide-react";

// --- DATOS DEL CARRUSEL DE VENTAJAS (FOOD) ---
const FOOD_ADVANTAGES = [
  {
    id: 1,
    title: "Ultra-fast release.",
    text: "Get actionable results in just 7 to 9 hours for most food matrices, allowing you to release products same-day.",
    visual: (
      <div className="absolute inset-0 bg-[#0a0a0a] flex flex-col items-center justify-center overflow-hidden px-6 border border-white/5">
          <div className="w-full bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-sm relative z-10">
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-3">
                   {/* Cambiado a Rojo TAAG */}
                   <div className="h-full bg-[#FF270A] rounded-full w-full shadow-[0_0_10px_rgba(255,39,10,0.8)]"></div>
              </div>
              <div className="flex justify-between items-center">
                   <Clock className="w-4 h-4 text-[#FF270A]" />
                   <div className="flex items-baseline gap-1">
                       <span className="text-xs text-white font-mono font-bold">08:00</span>
                       <span className="text-[9px] text-[#FF270A]/80 font-bold tracking-wider">HRS</span>
                   </div>
              </div>
          </div>
      </div>
    )
  },
  {
    id: 2,
    title: "Live cell focus.",
    text: "Elevia's RNA technology exclusively targets living pathogens, eliminating false positives caused by dead cells from cooking or pasteurization.",
    visual: (
      // ELIMINADO EL "relative" DEL FINAL QUE ROMPÍA EL CONTENEDOR
      <div className="absolute inset-0 bg-[#0a0a0a] flex items-center justify-center overflow-hidden border border-white/5">
          {/* Animación inyectada para que los puntos vibren en su lugar */}
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes vibrate-dots {
              0% { transform: translate(0, 0); }
              20% { transform: translate(-1.5px, 1.5px); }
              40% { transform: translate(-1.5px, -1.5px); }
              60% { transform: translate(1.5px, 1.5px); }
              80% { transform: translate(1.5px, -1.5px); }
              100% { transform: translate(0, 0); }
            }
            .dot-vibrate {
               animation: vibrate-dots 0.99s infinite linear alternate;
            }
          `}} />
          
          {/* Contenedor absoluto interno para posicionar los puntos correctamente */}
          <div className="absolute inset-0 w-full h-full z-10">
             {/* Puntos vibrando distribuidos libremente. Colores: Azul, Morado y Rojo TAAG (#FF270A) */}
             <div className="dot-vibrate absolute top-[25%] left-[25%] w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.9)]" style={{animationDelay: '0.1s'}}></div>
             <div className="dot-vibrate absolute top-[65%] left-[20%] w-4 h-4 bg-purple-500 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.9)]" style={{animationDelay: '0.2s'}}></div>
             <div className="dot-vibrate absolute top-[30%] right-[25%] w-3 h-3 bg-[#FF270A] rounded-full shadow-[0_0_15px_rgba(255,39,10,0.9)]" style={{animationDelay: '0.3s'}}></div>
             <div className="dot-vibrate absolute top-[50%] left-[45%] w-2.5 h-2.5 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.9)]" style={{animationDelay: '0.0s'}}></div>
             <div className="dot-vibrate absolute bottom-[25%] right-[35%] w-3.5 h-3.5 bg-purple-500 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.9)]" style={{animationDelay: '0.15s'}}></div>
             <div className="dot-vibrate absolute bottom-[40%] right-[15%] w-3 h-3 bg-[#FF270A] rounded-full shadow-[0_0_15px_rgba(255,39,10,0.9)]" style={{animationDelay: '0.25s'}}></div>
          </div>
          
          <div className="absolute bottom-0 w-full h-1/2 bg-purple-500/10 blur-3xl pointer-events-none z-0"></div>
      </div>
    )
  },
  {
    id: 3,
    title: "Reduced holding costs.",
    text: "By releasing products days earlier, you significantly reduce warehousing space and tied-up capital from immobilized products, maximizing your cash flow.",
    visual: (
      <div className="absolute inset-0 bg-[#0a0a0a] flex flex-col items-center justify-center overflow-hidden border border-white/5">
         <div className="relative w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-3 border border-emerald-500/20">
            <Package className="w-8 h-8 text-emerald-400" strokeWidth={1.5} />
         </div>
         <span className="text-[10px] tracking-widest text-white/50 uppercase text-center leading-tight">Warehouse<br/>Savings</span>
      </div>
    )
  },
  {
    id: 4,
    title: "Complex matrices.",
    text: "Validated for highly inhibitory food types, including spices, cocoa, and high-fat products, without signal interference.",
    visual: (
      // ELIMINADO EL "relative" DEL FINAL PARA QUE SE CENTRE VERTICALMENTE
      <div className="absolute inset-0 bg-[#0a0a0a] flex items-center justify-center overflow-hidden border border-white/5">
          {/* Fondo de matriz compleja (patrón de puntos de malla) */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:10px_10px]"></div>
          
          {/* Elementos abstractos que representan la matriz compleja y la detección */}
          <div className="relative w-20 h-20 flex items-center justify-center z-10">
             {/* Capas superpuestas representando inhibidores (grasas, especias) */}
             <div className="absolute w-12 h-12 border-2 border-amber-500/40 rounded-lg rotate-12"></div>
             <div className="absolute w-14 h-14 border-2 border-amber-600/30 rounded-full -rotate-12 translate-x-2"></div>
             <div className="absolute w-10 h-10 bg-amber-500/10 backdrop-blur-sm border border-amber-400/50 rounded-sm -translate-x-2 translate-y-2"></div>
             
             {/* Señal de detección brillando fuerte y clara en el centro */}
             <div className="absolute w-3 h-3 bg-amber-400 rounded-full shadow-[0_0_15px_rgba(251,191,36,1)]"></div>
          </div>
          
          <div className="absolute bottom-0 w-full h-1/3 bg-amber-500/10 blur-xl z-0"></div>
      </div>
    )
  },
  {
    id: 5,
    title: "Extended shelf life.",
    text: "By cutting testing time by days, you add valuable days to your product's commercial shelf life, increasing profitability.",
    visual: (
      <div className="absolute inset-0 bg-[#0a0a0a] flex flex-col items-center justify-center overflow-hidden border border-white/5">
         <span className="text-5xl font-black text-white mb-2">+2</span>
         <span className="text-xs tracking-widest text-white/50 uppercase">Days</span>
      </div>
    )
  },
  {
    id: 6,
    title: "Brand protection.",
    text: "Ensure absolute confidence in every batch before it leaves the facility, protecting your consumers and your reputation.",
    visual: (
      <div className="absolute inset-0 bg-[#0a0a0a] flex items-center justify-center overflow-hidden border border-white/5">
          <ShieldAlert className="w-12 h-12 text-blue-500/80 stroke-[1.5]" />
          <CheckCircle2 className="absolute top-1/2 left-1/2 translate-x-1 -translate-y-4 w-5 h-5 text-white bg-[#0a0a0a] rounded-full" />
      </div>
    )
  }
];

export default function EleviaFood() {
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
      const scrollAmount = 280; 
      carouselRef.current.scrollBy({ 
        left: direction === 'left' ? -scrollAmount : scrollAmount, 
        behavior: 'smooth' 
      });
    }
  };

  return (
    // SECCIÓN CON FONDO NEGRO PURO (bg-black)
    <section className="relative w-full bg-black py-24 md:py-32 flex flex-col items-center justify-center overflow-hidden border-t border-white/10">      
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
      {/* 1. TARJETA PRINCIPAL (Hero Food)                          */}
      {/* ========================================================= */}
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 mb-20 md:mb-32">
        <div className="relative w-full min-h-[700px] md:min-h-[900px] rounded-[2rem] overflow-hidden flex flex-col bg-neutral-900">
          
          {/* Imagen Limpia sin capas blancas */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <Image 
              src="/Elevia_food4.png" 
              alt="Elevia Food Testing" 
              fill 
              className="object-cover object-center" 
              priority 
            />
          </div>

          {/* CONTENIDO TEXTUAL: Arriba y alineado para que termine en el centro de la imagen */}
          <div className="absolute inset-0 z-20 w-full flex justify-start pt-10 md:pt-12">
            
            {/* Este contenedor ocupa exactamente la mitad izquierda de la pantalla.
                Al usar "justify-end pr-8", el bloque de texto se empuja hacia la derecha 
                terminando casi justo en la línea central imaginaria de la imagen */}
            <div className="w-[90%] md:w-[60%] lg:w-[61%] flex justify-end pl-6 md:pl-0 pr-4 md:pr-4 lg:pr-4">              
              {/* Bloque de texto con el mismo tamaño máximo que EleviaEnvironmental (max-w-[380px]) */}
              <div className="w-full max-w-[380px] flex flex-col items-start">
                
                <span className="text-left text-xs md:text-sm font-bold tracking-[0.2em] text-[#FF270A] uppercase mb-4 block w-full">
                  Finished Product Testing
                </span>
                
                {/* TÍTULO EN COLOR NEGRO (Mismo tamaño que EleviaEnvironmental) */}
                <h2 className="text-left text-2xl md:text-4xl font-bold text-black mb-5 tracking-tight leading-tight w-full">
                  Release faster. <br className="hidden md:block" /> Hold less.
                </h2>
                
                {/* TEXTO DESCRIPTIVO (Interlineado ajustado con leading-snug) */}
                <p className="text-left text-sm md:text-base text-black/80 font-medium leading-snug w-full">
                  Elevia dramatically reduces your hold times. By detecting pathogens from finished products in record time, you can release products with confidence days earlier than traditional methods.
                </p>
                
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. CARRUSEL DE VENTAJAS (FOOD)                            */}
      {/* ========================================================= */}
      <div className="w-full relative">
        
        <div 
          ref={carouselRef}
          onScroll={checkScroll}
          className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory hide-scroll pb-6 pl-[max(1rem,calc(50vw_-_700px_+_1rem))] md:pl-[max(2rem,calc(50vw_-_700px_+_2rem))] scroll-pl-[max(1rem,calc(50vw_-_700px_+_1rem))] md:scroll-pl-[max(2rem,calc(50vw_-_700px_+_2rem))]"
        >
          {FOOD_ADVANTAGES.map((adv) => (
            <div key={adv.id} className="snap-start shrink-0 flex flex-col w-[220px] md:w-[260px]">
              
              <div className="relative w-full aspect-[4/5] rounded-[1.5rem] bg-[#0a0a0a] overflow-hidden mb-5 border border-white/5">
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
          
          <div className="shrink-0 w-[max(1rem,calc(50vw_-_700px_+_1rem))] md:w-[max(2rem,calc(50vw_-_700px_+_2rem))]"></div>
        </div>
        
        <div className="flex items-center justify-between mt-4 px-4 md:px-8 max-w-[1400px] mx-auto w-full">
          
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
              className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all backdrop-blur-md border border-white/10 ${
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
              className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all backdrop-blur-md border border-white/10 ${
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