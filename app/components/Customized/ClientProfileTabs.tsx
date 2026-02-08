"use client";

import { useRef, useState, useEffect } from "react";
import { 
  Factory, 
  Globe, 
  FlaskConical, 
  Microscope, 
  Network, 
  ChevronLeft, 
  ChevronRight,
  ArrowRight 
} from "lucide-react";

// DATOS DE LAS TARJETAS
const CARDS = [
  {
    id: "intro",
    type: "intro",
    title: "Advanced molecular assay development as a service.",
    description: "Whether you are a biotech company or a testing laboratory, TAAG provides outsourced molecular assay development through MILA, helping increase productivity while reducing development time and costs.",
  },
  {
    id: "manufacturer",
    type: "profile",
    icon: Factory,
    color: "text-purple-600",
    bgIcon: "bg-purple-50",
    hoverColor: "hover:text-purple-600", // Color al hacer hover en el botón
    groupHoverColor: "group-hover:bg-purple-50", // Fondo flecha al hover
    label: "Kit Manufacturer",
    title: "Expand your portfolio",
    description: "Support multiple models, from supplying primer mixes to delivering fully branded, validated finished kits globally."
  },
  {
    id: "distributor",
    type: "profile",
    icon: Globe,
    color: "text-blue-600",
    bgIcon: "bg-blue-50",
    hoverColor: "hover:text-blue-600",
    groupHoverColor: "group-hover:bg-blue-50",
    label: "Distributor",
    title: "Private label launch",
    description: "Develop exclusive, high-performance kits distributed under your brand. Differentiate yourself with unique products."
  },
  {
    id: "third-party-lab",
    type: "profile",
    icon: FlaskConical,
    color: "text-teal-600",
    bgIcon: "bg-teal-50",
    hoverColor: "hover:text-teal-600",
    groupHoverColor: "group-hover:bg-teal-50",
    label: "Third-party Lab",
    title: "Increase margins",
    description: "Replace rigid commercial kits with custom, highly multiplexed assays tailored to your specific workflow and throughput."
  },
  {
    id: "internal-lab",
    type: "profile",
    icon: Microscope,
    color: "text-orange-600",
    bgIcon: "bg-orange-50",
    hoverColor: "hover:text-orange-600",
    groupHoverColor: "group-hover:bg-orange-50",
    label: "Internal Lab",
    title: "Solve contamination",
    description: "Detect facility-specific spoilage organisms or rare pathogens that generic kits miss, ensuring precise internal QC."
  },
  {
    id: "outsourcer",
    type: "profile",
    icon: Network,
    color: "text-indigo-600",
    bgIcon: "bg-indigo-50",
    hoverColor: "hover:text-indigo-600",
    groupHoverColor: "group-hover:bg-indigo-50",
    label: "Using a 3rd-party Lab",
    title: "Managed Service",
    description: "We design the assay and run it for you at our strategic TAAG Hubs. Get bespoke testing without the infrastructure."
  }
];

export default function ClientProfileTabs() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Lógica de Scroll
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
      const scrollAmount = window.innerWidth < 768 ? current.clientWidth * 0.85 : 400; 
      if (direction === "left") {
        current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  const edgePadding = "max(1.5rem, calc((100vw - 80rem) / 2 + 1.5rem))";

  return (
    <section className="bg-[#F5F5F7] py-24 relative overflow-hidden">
      
      {/* 1. ENCABEZADO DE SECCIÓN */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 mb-12">
        <h2 className="text-3xl md:text-5xl font-extrabold text-[#111111] mb-6 font-sora tracking-tight">
          Tailored solutions for <br />
          every partner.
        </h2>
        <p className="text-lg text-gray-500 font-medium leading-relaxed max-w-2xl">
          Find the perfect fit for your organization. We adapt our technology to your business model.
        </p>
      </div>

      {/* 2. CARRUSEL */}
      <div className="relative w-full group">
        
        {/* Flechas */}
        <div className={`hidden md:flex absolute top-1/2 -translate-y-1/2 left-4 z-30 transition-opacity duration-300 ${canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
           <button onClick={() => scroll("left")} className="w-12 h-12 rounded-full bg-white shadow-xl border border-gray-100 text-[#111111] flex items-center justify-center transition-transform hover:scale-105">
             <ChevronLeft className="w-6 h-6 opacity-70" />
           </button>
        </div>
        <div className={`hidden md:flex absolute top-1/2 -translate-y-1/2 right-4 z-30 transition-opacity duration-300 ${canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
           <button onClick={() => scroll("right")} className="w-12 h-12 rounded-full bg-white shadow-xl border border-gray-100 text-[#111111] flex items-center justify-center transition-transform hover:scale-105">
             <ChevronRight className="w-6 h-6 opacity-70" />
           </button>
        </div>

        {/* Área Scrolleable */}
        <div 
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-5 overflow-x-auto pb-8 pt-4 w-full snap-x snap-mandatory scrollbar-hide"
          style={{ 
            paddingLeft: edgePadding, 
            paddingRight: edgePadding,
            scrollPaddingLeft: edgePadding 
          }}
        >
          {CARDS.map((card, index) => {
            const isIntro = card.type === "intro";

            return (
              <div 
                key={card.id}
                className={`
                  relative flex-shrink-0 
                  rounded-[2rem] 
                  flex flex-col justify-between 
                  snap-start 
                  overflow-hidden
                  ${isIntro 
                    ? 'w-[85vw] md:w-[450px] bg-black p-10 md:p-14' 
                    : 'w-[80vw] md:w-[360px] bg-white p-8'
                  }
                `}
                style={{ height: '480px' }} 
              >
                {isIntro ? (
                  // === TARJETA 1: INTRO (Fondo Negro + Luces Superpuestas estilo Mila) ===
                  <>
                     {/* 1. Fondo de Luces (Aurora Dark Mix Blend) */}
                     <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {/* Luces difusas moviéndose suavemente */}
                        <div className="absolute w-48 h-48 bg-blue-500/40 rounded-full blur-[60px] mix-blend-screen animate-pulse-slow" style={{ left: '10%', top: '20%' }}></div>
                        <div className="absolute w-48 h-48 bg-green-500/40 rounded-full blur-[60px] mix-blend-screen animate-pulse-slow" style={{ animationDelay: '1s', left: '40%', top: '10%' }}></div>
                        <div className="absolute w-48 h-48 bg-red-500/40 rounded-full blur-[60px] mix-blend-screen animate-pulse-slow" style={{ animationDelay: '2s', left: '30%', top: '50%' }}></div>
                        <div className="absolute w-48 h-48 bg-purple-500/40 rounded-full blur-[60px] mix-blend-screen animate-pulse-slow" style={{ animationDelay: '3s', left: '60%', top: '40%' }}></div>
                     </div>
                     
                     {/* 2. Contenido (Texto pequeño y aireado) */}
                     <div className="relative z-10 h-full flex flex-col justify-center">
                        <span className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white/70 text-[10px] font-bold uppercase tracking-widest mb-8 w-fit backdrop-blur-md">
                           Service Overview
                        </span>
                        
                        {/* Título (Más aireado y pequeño) */}
                        <h3 className="text-2xl md:text-3xl font-bold mb-8 leading-snug font-sora text-white">
                          {card.title}
                        </h3>
                        
                        {/* Descripción (Pequeña y sutil) */}
                        <p className="text-sm text-gray-400 font-medium leading-relaxed">
                          {card.description}
                        </p>
                     </div>
                  </>
                ) : (
                  // === TARJETAS PERFIL (BLANCO LIMPIO) ===
                  <>
                    <div className="relative z-10">
                      {/* Icono */}
                      <div className={`w-14 h-14 rounded-2xl ${card.bgIcon} flex items-center justify-center mb-6`}>
                        {/* @ts-ignore */}
                        <card.icon className={`w-7 h-7 ${card.color}`} />
                      </div>
                      
                      {/* Badge (Label) */}
                      <span className={`inline-block text-[10px] font-bold uppercase tracking-wider mb-3 ${card.color}`}>
                        {card.label}
                      </span>

                      {/* Título */}
                      <h3 className="text-2xl font-bold text-[#111111] mb-3 font-sora leading-tight">
                        {card.title}
                      </h3>

                      {/* Descripción */}
                      <p className="text-sm text-gray-500 leading-relaxed font-medium mb-6">
                        {card.description}
                      </p>
                    </div>

                    {/* Botón Contacto (Neutro por defecto, color al hover) */}
                    <div className="mt-auto pt-6 border-t border-gray-50 relative z-10">
                        {/* group/btn para manejar el hover del botón específicamente */}
                        <button className={`group/btn w-full flex items-center justify-between text-sm font-bold text-[#111111] transition-colors ${card.hoverColor}`}>
                            <span>Get Started</span>
                            {/* Círculo gris por defecto, color al hover */}
                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center transition-colors group-hover/btn:bg-gray-200">
                                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                            </div>
                        </button>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* --- CONTROLES MÓVILES --- */}
        <div className="flex md:hidden justify-center gap-2 mt-2">
           <div className="text-xs font-medium text-gray-400 uppercase tracking-widest animate-pulse">
              Swipe to explore
           </div>
        </div>

      </div>

      <style jsx>{`
        .font-sora {
          font-family: var(--font-sora), sans-serif;
        }
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
        .animate-pulse-slow {
            animation: pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </section>
  );
}