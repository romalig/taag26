"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Plug, Users, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";

// =========================================================
// COMPONENTE INTERNO: Animación Inteligente de Scalable
// Lógica reforzada para evitar que se active antes de tiempo
// =========================================================
const ScalableVisual = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let timeoutId: NodeJS.Timeout;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Siempre limpiamos el timeout anterior para evitar animaciones fantasma
        clearTimeout(timeoutId);

        // Usamos un umbral del 70% (0.7) para asegurar que funcione en pantallas pequeñas
        if (entry.isIntersecting && entry.intersectionRatio >= 0.7) {
          timeoutId = setTimeout(() => {
            setInView(true);
          }, 1200); // 1.2 segundos de delay
        } else {
          setInView(false);
        }
      },
      { 
        // Observamos en dos puntos: cuando asoma (0) y cuando llega al 70% (0.7)
        threshold: [0, 0.7] 
      }
    );
    
    observer.observe(el);
    
    return () => {
      observer.unobserve(el);
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div ref={ref} className="absolute inset-0 bg-white flex items-center justify-center overflow-hidden gap-1.5">
       {/* Bloque Izquierdo (Entra desde fuera) */}
       <div 
          className={`w-6 h-12 border-2 border-orange-200 rounded-md bg-[#F4F4F5] ${inView ? 'animate-merge-left' : 'opacity-0'}`}
          style={!inView ? { transform: 'translateX(-40px)' } : {}}
       ></div>
       
       {/* Bloque Central (Fijo) */}
       <div className="w-6 h-12 border-2 border-orange-400 rounded-md bg-white shadow-sm flex items-center justify-center relative z-10">
          <span className="text-orange-500 font-bold text-[10px]">+</span>
       </div>
       
       {/* Bloque Derecho (Entra desde fuera) */}
       <div 
          className={`w-6 h-12 border-2 border-orange-500 rounded-md bg-orange-50 ${inView ? 'animate-merge-right' : 'opacity-0'}`}
          style={!inView ? { transform: 'translateX(40px)' } : {}}
       ></div>
    </div>
  );
};

const ProductivityVisual = () => {
  const t = useTranslations("Labs.ModularDX");

  return (
    <div className="absolute inset-0 bg-white flex flex-col items-center justify-center overflow-hidden">
      <div className="flex items-center gap-2 relative z-10 mb-2">
        <Users className="w-7 h-7 text-[#FF270A]" />
        <span className="text-xl font-bold text-gray-800">x 2</span>
      </div>
      <div className="px-3 py-1 bg-red-50 border border-red-100 text-[#FF270A] font-bold rounded-full text-[11px] tracking-wide relative z-10">
        {t("samples")}
      </div>
    </div>
  );
};


// --- DATOS DEL CARRUSEL DE MODULAR DX ---
const MODULAR_ADVANTAGES = [
  {
    id: 1,
    isWide: true,
    visual: (
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
    visual: (
      <div className="absolute inset-0 bg-white flex items-center justify-center overflow-hidden">
          <div className="absolute w-36 h-36 bg-emerald-500/25 blur-2xl rounded-full"></div>
          <div className="absolute w-20 h-20 bg-emerald-400/30 blur-xl rounded-full"></div>
          
          <div className="w-16 h-16 rounded-2xl bg-white/80 backdrop-blur-sm border border-emerald-100 flex items-center justify-center relative z-10 shadow-sm">
              <Plug className="w-8 h-8 text-emerald-600" />
          </div>
      </div>
    )
  },
  {
    id: 3,
    visual: (
      <div className="absolute inset-0 bg-white flex items-center justify-center overflow-hidden">
          <div className="absolute w-32 h-32 bg-purple-500/10 blur-3xl rounded-full"></div>
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.1)_1px,transparent_1px)] bg-[size:16px_16px]"></div>
          
          <Image 
             src="/LogoTxANB.png" 
             alt="TxA Logo" 
             width={200} 
             height={80} 
             className="object-contain w-[50%] relative z-10 drop-shadow-sm" 
          />
      </div>
    )
  },
  {
    id: 4,
    visual: <ScalableVisual /> 
  },
  {
    id: 5,
    visual: <ProductivityVisual />
  },
  {
    id: 6,
    visual: (
      <div className="absolute inset-0 bg-white flex items-center justify-center overflow-hidden">
          <div className="relative w-28 h-28 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-emerald-500/60 border-dashed animate-[spin_10s_linear_infinite] shadow-[0_0_15px_rgba(16,185,129,0.2)]"></div>
              <div className="absolute inset-2 rounded-full border-2 border-emerald-500/40 animate-[spin_8s_linear_infinite_reverse]"></div>
              <ShieldCheck className="w-12 h-12 text-emerald-600 relative z-10" strokeWidth={1.5} />
          </div>
      </div>
    )
  }
];

export default function ModularDX() {
  const t = useTranslations("Labs.ModularDX");
  const translations = t.raw("advantages") as Array<{title: string; text: string}>;
  const modularAdvantages = MODULAR_ADVANTAGES.map((adv, index) => ({
    ...adv,
    title: translations[index]?.title ?? "",
    text: translations[index]?.text ?? "",
  }));
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
      <style jsx>{`
        .hide-scroll::-webkit-scrollbar {
          display: none !important;
        }
        .hide-scroll {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
        
        /* Animaciones para Scalable */
        @keyframes slideBlockLeft {
          from { transform: translateX(-40px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideBlockRight {
          from { transform: translateX(40px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-merge-left {
          animation: slideBlockLeft 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-merge-right {
          animation: slideBlockRight 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* ========================================================= */}
      {/* 1. TARJETA PRINCIPAL (Hero ModularDX Responsivo)          */}
      {/* ========================================================= */}
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 mb-16 md:mb-20">
        <div className="relative w-full min-h-[600px] md:min-h-[700px] rounded-[2rem] overflow-hidden flex flex-col shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)]">
          
          <div className="absolute inset-0 z-0 pointer-events-none">
            <Image 
              src="/modularDX1.png" 
              alt="ModularDX Laboratory" 
              fill 
              className="hidden md:block object-cover object-center" 
              priority 
            />
            <Image 
              src="/modularDX_phone.png" 
              alt="ModularDX Laboratory" 
              fill 
              className="block md:hidden object-cover object-center" 
              priority 
            />
          </div>

          {/* Gradiente más ligero */}
          <div className="absolute inset-0 z-10 bg-transparent bg-gradient-to-b from-black/50 via-transparent to-black/60 md:bg-gradient-to-l md:from-black/70 md:from-[0%] md:via-black/50 md:via-[35%] md:to-transparent md:to-[100%] pointer-events-none"></div>

          {/* Textos: justify-between en móvil (arriba/abajo) y md:justify-start en escritorio (todo arriba) */}
          <div className="absolute inset-0 z-20 w-full flex flex-col justify-between md:justify-start items-start md:items-end p-8 pt-12 pb-12 md:p-16 md:pt-20 md:pr-24 lg:pr-32 gap-6 md:gap-4">
            
            <div className="w-full max-w-[380px] flex flex-col items-start mt-2 md:mt-0">
              <span className="text-left text-xs md:text-sm font-bold tracking-[0.2em] text-[#FF270A] uppercase mb-4 block w-full drop-shadow-md">
                {t("eyebrow")}
              </span>
              <h2 className="text-left text-3xl md:text-3xl lg:text-4xl font-bold text-white mb-2 md:mb-5 tracking-tight leading-tight w-full drop-shadow-lg">
                {t("title")} <br className="hidden md:block" /> {t("titleB")}
              </h2>
            </div>

            <div className="w-full max-w-[380px] flex flex-col items-start mb-2 md:mb-0">
              <p className="text-left text-sm md:text-base text-white/90 font-medium leading-relaxed w-full drop-shadow-md">
                {t("body")}
              </p>
            </div>

          </div>
          
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. CARRUSEL DE VENTAJAS                                   */}
      {/* ========================================================= */}
      <div className="w-full relative">
        
        <div 
          ref={carouselRef}
          onScroll={checkScroll}
          className="flex gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory hide-scroll pb-6 pl-[max(1rem,calc(50vw_-_600px_+_2rem))] scroll-pl-[max(1rem,calc(50vw_-_600px_+_2rem))]"
        >
          {modularAdvantages.map((adv) => (
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
          
          <div></div> 

          <div className="flex gap-3">
            <button 
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                canScrollLeft 
                  ? "bg-[#111111] hover:bg-gray-800 text-white cursor-pointer shadow-md" 
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
              aria-label={t("previous")}
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
              aria-label={t("next")}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>

        </div>

      </div>
      
    </section>
  );
}
