"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, CheckCircle2, Clock, Dna, GitMerge, Zap, Activity, BrainCircuit, ShieldCheck, TrendingUp, Sparkles } from "lucide-react";
import Image from "next/image";
import { useCTA } from "../CTAProvider";
import { useModal } from "./ModalProvider";

// IMPORTAMOS LA PLANTILLA MAESTRA Y LA BASE DE DATOS
import SolutionTemplate from "./modals/SolutionTemplate";
import { SOLUTIONS_DATA } from "../data/solutionsData";

// --- DATOS DEL ECOSISTEMA ---
const ECOSYSTEM_FEATURES = [
  {
    id: "intro",
    title: "Access the latest molecular technologies.",
    description: "Transform your facility into a highly efficient molecular biology laboratory. Gain immediate access to our complete ecosystem of technologies, kits, software, and continuous TAAG support to scale your operations effortlessly.",
  },
  {
    id: "pcr",
    badge: "Cost Efficiency",
    badgeColor: "text-blue-600",
    title: "Multiplex PCR Kits",
    description: "Maximize your lab's profitability. Access our premium multiplex kits at the lowest market price, allowing you to increase margins and win more clients without compromising quality.",
    icon: Dna,
    color: "text-blue-500",
    bgGlow: "bg-blue-500/10"
  },
  {
    id: "elevia",
    badge: "Competitive Edge",
    badgeColor: "text-gray-800",
    title: "Elevia Line",
    description: "Stand out from the competition. Offer your clients same-day results by bypassing traditional enrichment, giving your lab a unique selling proposition in a crowded market.",
    icon: Zap,
    color: "text-orange-500",
    bgGlow: "bg-orange-500/10"
  },
  {
    id: "txa",
    badge: "Maximum Efficiency",
    badgeColor: "text-purple-600",
    title: "TxA Ecosystem",
    description: "Reduce overhead and eliminate human error. Automate your entire workflow to operate leaner, faster, and deliver a modern, digital experience to your customers.",
    icon: Activity,
    color: "text-purple-500",
    bgGlow: "bg-purple-500/10"
  },
  {
    id: "mila",
    badge: "Effortless R&D",
    badgeColor: "text-[#FF270A]",
    title: "MILA Ai",
    description: "Expand your testing menu in days, not months. Use our AI to develop custom multiplex panels without the need for an expensive internal R&D department.",
    icon: BrainCircuit,
    color: "text-yellow-500",
    bgGlow: "bg-yellow-500/10"
  },
  {
    id: "support",
    title: "Protocols & Support",
    description: "Implement our standardized workflows and protocols. Count on TAAG's constant technical support to optimize your laboratory operations to the maximum.",
    icon: ShieldCheck,
    color: "text-emerald-500",
    bgGlow: "bg-emerald-500/10"
  }
];

export default function PartnerEcosystem() {
  const { openMeeting } = useCTA();
  const { openModal } = useModal(); 
  
  // --- LÓGICA DE LA ANIMACIÓN DE LUZ (SOLO SCROLL DOWN) ---
  const [isLineVisible, setIsLineVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const isScrollingDown = useRef(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      isScrollingDown.current = window.scrollY > lastScrollY.current;
      lastScrollY.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const observerThreshold = window.innerWidth < 768 ? 0.20 : 0.25;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (isScrollingDown.current) {
            setIsLineVisible(true);
          }
        } else {
          setIsLineVisible(false);
        }
      },
      { threshold: observerThreshold }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleOpenDetails = (id: string) => {
    const data = SOLUTIONS_DATA[id];
    if (data) {
      openModal(<SolutionTemplate data={data} />);
    } else {
      console.warn(`[PartnerEcosystem] No se encontraron datos en solutionsData.ts para el ID: "${id}".`);
    }
  };

  return (
    <section id="ecosystem" className="bg-white md:px-6 pt-16 pb-32 md:py-24 overflow-hidden relative">
      
      {/* ESTILOS DE LA ANIMACIÓN DE LUZ Y ELEMENTOS FLOTANTES */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes expandLine {
            0% { transform: scaleX(0.01); }
            100% { transform: scaleX(1); } 
        }
        @keyframes fadeLine {
            0% { opacity: 0; }
            10% { opacity: 1; }
            70% { opacity: 0.8; }
            100% { opacity: 0; }
        }
        .animate-line-glow {
            animation: 
                expandLine 2s cubic-bezier(0.16, 1, 0.3, 1) forwards,
                fadeLine 2s linear forwards;
        }

        /* Animaciones para las insignias flotantes en PC */
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(var(--rot, 0deg)); }
          50% { transform: translateY(-8px) rotate(calc(var(--rot, 0deg) + 2deg)); }
        }
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-slow 7s ease-in-out infinite 1.5s;
        }
        .animate-float-fast {
          animation: float-slow 5s ease-in-out infinite 0.5s;
        }
      `}} />

      <div className="max-w-7xl mx-auto">
        
        {/* CONTENEDOR PRINCIPAL GRIS */}
        <div className="relative bg-[#F4F4F5] rounded-none md:rounded-[3rem] overflow-hidden pt-48 md:pt-40 pb-32 flex flex-col items-center">
          
          <div
            className="absolute inset-0 opacity-[0.03] z-0 mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#111 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative z-20 w-[95%] md:w-full md:px-16 mx-auto">

            <div className="text-center mb-16 max-w-3xl mx-auto px-4 md:px-0">
              <span className="text-[#FF270A] font-bold uppercase tracking-widest text-xs mb-4 block">
                THE PARTNER ECOSYSTEM
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#111111] leading-tight tracking-tight">
                This is how we will take it to the next level.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative w-full">
              {ECOSYSTEM_FEATURES.map((solution, idx) => {
                
                // --- CARD 0: INTRODUCTORIA ---
                if (idx === 0) {
                  return (
                    <div className="md:col-span-2 relative" key={solution.id} ref={cardRef}>
                        
                        {/* LÍNEA DE LUZ */}
                        {isLineVisible && (
                          <div className="absolute top-[-2px] left-1/2 -translate-x-1/2 w-[90%] h-[20px] pointer-events-none z-0">
                              <div className="absolute top-[-10px] left-0 w-full h-[30px] bg-gradient-to-r from-[#FF270A] via-[#8b5cf6] to-[#3b82f6] blur-[20px] opacity-0 animate-line-glow origin-center" />
                              <div className="absolute top-[-2px] left-0 w-full h-[4px] bg-gradient-to-r from-[#FF270A] via-[#8b5cf6] to-[#3b82f6] blur-[4px] opacity-0 animate-line-glow origin-center" />
                          </div>
                        )}

                        {/* TARJETA BLANCA */}
                        <div className="relative z-10 bg-white rounded-[2.5rem] p-8 md:p-14 lg:p-16 flex flex-col md:flex-row gap-0 md:gap-8 items-center overflow-hidden mb-6 md:mb-10">
                            
                            {/* IZQUIERDA: Texto -> Iconos Móviles Estáticos -> Botón */}
                            <div className="w-full md:w-[45%] lg:w-[40%] flex flex-col items-start text-left relative z-20 md:pl-4">
                                <h3 className="text-3xl md:text-[32px] font-bold text-[#111111] mb-5 leading-tight tracking-tight max-w-sm">{solution.title}</h3>
                                <p className="text-[#111111] text-sm md:text-base leading-relaxed font-normal mb-8 max-w-sm">
                                  {solution.description}
                                </p>

                                {/* MOBILE ONLY: 4 Elementos estáticos en lista debajo del texto */}
                                <div className="flex md:hidden flex-col w-full gap-3 mb-8">
                                    <div className="bg-white p-3 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-50 flex items-center gap-3 w-full">
                                        <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center shrink-0">
                                          <Clock className="w-5 h-5 text-purple-500" />
                                        </div>
                                        <div>
                                          <p className="text-xs font-bold text-[#111111] leading-tight">Fastest Results</p>
                                          <p className="text-[10px] text-gray-500 font-normal">In just hours</p>
                                        </div>
                                    </div>

                                    <div className="bg-white p-3 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-50 flex items-center gap-3 w-full">
                                        <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                                          <Activity className="w-5 h-5 text-blue-500" />
                                        </div>
                                        <div>
                                          <p className="text-xs font-bold text-[#111111] leading-tight">Efficient Operation</p>
                                          <p className="text-[10px] text-gray-500 font-normal">Automated workflows</p>
                                        </div>
                                    </div>

                                    <div className="bg-white p-3 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-50 flex items-center gap-3 w-full">
                                        <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center shrink-0">
                                          <TrendingUp className="w-5 h-5 text-green-500" />
                                        </div>
                                        <div>
                                          <p className="text-xs font-bold text-[#111111] leading-tight">Higher Margins</p>
                                          <p className="text-[10px] text-gray-500 font-normal">Maximized ROI</p>
                                        </div>
                                    </div>

                                    <div className="bg-white p-3 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-50 flex items-center gap-3 w-full">
                                        <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center shrink-0">
                                          <Sparkles className="w-5 h-5 text-red-500" />
                                        </div>
                                        <div>
                                          <p className="text-xs font-bold text-[#111111] leading-tight">TxA Software</p>
                                          <p className="text-[10px] text-gray-500 font-normal">Predictive Ai</p>
                                        </div>
                                    </div>
                                </div>

                                <button onClick={openMeeting} className="py-3 md:py-2.5 px-6 bg-[#111111] text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#FF270A] transition-colors flex items-center justify-center gap-2 w-full md:w-auto">
                                  Become a Partner <ArrowRight className="w-3 h-3" />
                                </button>
                            </div>

                            {/* DERECHA: Elementos Flotantes (Ocultos en Celular, visibles solo en PC) */}
                            <div className="hidden md:flex w-full md:w-[55%] lg:w-[60%] h-[350px] md:h-[400px] relative z-10 items-center justify-center">
                                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl"></div>

                                 <div className="relative w-full h-full">
                                     
                                     {/* 1. Fastest Results */}
                                     <div className="absolute top-[5%] left-[15%] lg:left-[25%] bg-white p-2 md:p-3 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-50 z-20 flex items-center gap-3 animate-float-slow" style={{'--rot': '-3deg'} as any}>
                                        <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-50 rounded-full flex items-center justify-center shrink-0">
                                          <Clock className="w-4 h-4 md:w-5 md:h-5 text-purple-500" />
                                        </div>
                                        <div className="pr-2">
                                          <p className="text-[11px] md:text-xs font-bold text-[#111111] leading-tight">Fastest Results</p>
                                          <p className="text-[9px] md:text-[10px] text-gray-500 font-normal">In just hours</p>
                                        </div>
                                     </div>

                                     {/* 2. Higher Margins */}
                                     <div className="absolute top-[18%] right-[0%] lg:right-[5%] bg-white p-2 md:p-3 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-50 z-30 flex items-center gap-3 animate-float-delayed" style={{'--rot': '2deg'} as any}>
                                        <div className="w-8 h-8 md:w-10 md:h-10 bg-green-50 rounded-full flex items-center justify-center shrink-0">
                                          <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-green-500" />
                                        </div>
                                        <div className="pr-2">
                                          <p className="text-[11px] md:text-xs font-bold text-[#111111] leading-tight">Higher Margins</p>
                                          <p className="text-[9px] md:text-[10px] text-gray-500 font-normal">Maximized ROI</p>
                                        </div>
                                     </div>

                                     {/* 3. TxA */}
                                     <div className="absolute top-[45%] left-[5%] lg:left-[15%] bg-white p-2 md:p-3 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-50 z-40 flex items-center gap-3 animate-float-fast" style={{'--rot': '-1deg'} as any}>
                                        <div className="w-8 h-8 md:w-10 md:h-10 bg-red-50 rounded-full flex items-center justify-center shrink-0">
                                          <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-red-500" />
                                        </div>
                                        <div className="pr-2">
                                          <p className="text-[11px] md:text-xs font-bold text-[#111111] leading-tight">TxA Software</p>
                                          <p className="text-[9px] md:text-[10px] text-gray-500 font-normal">Predictive Ai</p>
                                        </div>
                                     </div>

                                     {/* 4. Efficient Operation */}
                                     <div className="absolute top-[60%] right-[-5%] lg:right-[0%] bg-white p-2 md:p-3 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-50 z-20 flex items-center gap-3 animate-float-slow" style={{'--rot': '3deg'} as any}>
                                        <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                                          <Activity className="w-4 h-4 md:w-5 md:h-5 text-blue-500" />
                                        </div>
                                        <div className="pr-2">
                                          <p className="text-[11px] md:text-xs font-bold text-[#111111] leading-tight">Efficient Operation</p>
                                          <p className="text-[9px] md:text-[10px] text-gray-500 font-normal">Automated workflows</p>
                                        </div>
                                     </div>

                                     {/* 5. Plug & Play */}
                                     <div className="absolute bottom-[5%] left-[30%] lg:left-[40%] bg-white p-2 md:p-3 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-50 z-30 flex items-center gap-3 animate-float-delayed" style={{'--rot': '-2deg'} as any}>
                                        <div className="w-8 h-8 md:w-10 md:h-10 bg-orange-50 rounded-full flex items-center justify-center shrink-0">
                                          <Zap className="w-4 h-4 md:w-5 md:h-5 text-orange-500" />
                                        </div>
                                        <div className="pr-2">
                                          <p className="text-[11px] md:text-xs font-bold text-[#111111] leading-tight">Plug & Play</p>
                                          <p className="text-[9px] md:text-[10px] text-gray-500 font-normal">Ready to scale</p>
                                        </div>
                                     </div>

                                 </div>
                            </div>
                        </div>
                    </div>
                  );
                }

                // --- CARDS 1 A 4: ESTILO APPLE MINIMALISTA ---
                if (idx >= 1 && idx <= 4) {
                  return (
                    <div key={solution.id} className="md:col-span-1 bg-white rounded-[2.5rem] p-10 md:p-14 flex flex-col items-center justify-start text-center relative h-auto min-h-[400px]">
                        
                        {/* 0. INSIGNIA SUPERIOR (VENTAJA) */}
                        {solution.badge && (
                           <span className={`text-[10px] md:text-[11px] font-extrabold uppercase tracking-[0.15em] mb-5 ${solution.badgeColor}`}>
                             {solution.badge}
                           </span>
                        )}

                        {/* 1. Imagen Central Pequeña */}
                        <div className="mb-6 flex items-center justify-center h-12">
                           
                           {solution.id === 'pcr' && (
                              <div className="flex items-center justify-center -space-x-1.5 opacity-90">
                                <div className="w-4 h-4 rounded-full bg-blue-500 mix-blend-multiply"></div>
                                <div className="w-4 h-4 rounded-full bg-purple-500 mix-blend-multiply"></div>
                                <div className="w-4 h-4 rounded-full bg-[#FF270A] mix-blend-multiply"></div>
                              </div>
                           )}

                           {solution.id === 'elevia' && (
                              <div className="flex items-center justify-center">
                                <span className="text-xl md:text-2xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-gray-800 to-gray-400">
                                  AiGOR
                                </span>
                              </div>
                           )}

                           {solution.id === 'txa' && (
                              <Image 
                                src="/LogoTxANB.png" 
                                alt="TxA Logo" 
                                width={40} 
                                height={40} 
                                className="object-contain" 
                              />
                           )}

                           {solution.id === 'mila' && (
                              <Image 
                                src="/logo_mila.png" 
                                alt="MILA Logo" 
                                width={42} 
                                height={42} 
                                className="object-contain" 
                              />
                           )}

                        </div>

                        {/* 2. Título Centrado Más Pequeño */}
                        <h3 className="text-[22px] md:text-2xl font-bold text-[#111111] mb-4 leading-tight tracking-tight">
                           {solution.title}
                        </h3>

                        {/* 3. Texto de Bajada enfocado en el Beneficio */}
                        <p className="text-[#111111] text-sm md:text-base leading-relaxed font-normal mb-8 max-w-[320px]">
                           {solution.description}
                        </p>

                        {/* 4. Link Estilo Apple */}
                        <button 
                          onClick={() => handleOpenDetails(solution.id)}
                          className="mt-auto text-[14px] md:text-[15px] text-[#0066cc] hover:underline font-medium flex items-center justify-center transition-colors"
                        >
                          Learn more about {solution.title.replace('.', '')} <span className="text-[10px] ml-1 translate-y-[0.5px] font-bold">&gt;</span>
                        </button>
                    </div>
                  );
                }

                // --- CARD 5: SOPORTE Y PROTOCOLOS (Horizontal Minimalista) ---
                if (idx === 5) {
                  const IconComponent = solution.icon as any;
                  return (
                    <div key={solution.id} className="md:col-span-2 bg-white rounded-[2.5rem] p-10 md:p-14 flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-8 mt-2 md:mt-6">
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            {/* Icono discreto */}
                            {IconComponent && (
                                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center shrink-0">
                                    <IconComponent className="w-6 h-6 text-gray-800" />
                                </div>
                            )}
                            <div className="max-w-xl">
                                <h3 className="text-[22px] md:text-2xl font-bold text-[#111111] mb-2 leading-tight tracking-tight">
                                   {solution.title}
                                </h3>
                                <p className="text-[#111111] text-sm md:text-base leading-relaxed font-normal">
                                   {solution.description}
                                </p>
                            </div>
                        </div>
                        
                        <button 
                          onClick={() => handleOpenDetails(solution.id)}
                          className="text-[14px] md:text-[15px] text-[#0066cc] hover:underline font-medium flex items-center justify-center shrink-0"
                        >
                          Learn more about our Support <span className="text-[10px] ml-1 translate-y-[0.5px] font-bold">&gt;</span>
                        </button>
                    </div>
                  );
                }

                return null;
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}