"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, CheckCircle2, Clock, Dna, GitMerge, Zap, Activity, BrainCircuit, ShieldCheck, TrendingUp, Sparkles } from "lucide-react";
import { useCTA } from "../CTAProvider";
import { useModal } from "./ModalProvider";

// IMPORTAMOS LA PLANTILLA MAESTRA Y LA BASE DE DATOS
import SolutionTemplate from "./modals/SolutionTemplate";
import { SOLUTIONS_DATA } from "../data/solutionsData";

// --- DATOS DEL ECOSISTEMA ---
const ECOSYSTEM_FEATURES = [
  {
    id: "intro",
    title: "This is how we will take it to the next level",
    description: "Transform your facility into a highly efficient molecular biology laboratory. Gain immediate access to our complete ecosystem of technologies, kits, software, and continuous TAAG support to scale your operations effortlessly.",
  },
  {
    id: "pcr",
    title: "Multiplex PCR Kits.",
    description: "Access our complete portfolio of multiplex PCR kits. We guarantee the lowest price on the market without compromising on absolute precision and quality.",
    icon: Dna,
    color: "text-blue-500",
    bgGlow: "bg-blue-500/10"
  },
  {
    id: "elevia",
    title: "Elevia Line.",
    description: "Bypass traditional enrichment. Our Elevia line allows your laboratory partners to deliver highly accurate results in just a few hours.",
    icon: Zap,
    color: "text-orange-500",
    bgGlow: "bg-orange-500/10"
  },
  {
    id: "txa",
    title: "TxA Ecosystem.",
    description: "Make your laboratory super efficient. Automate workflows, predict risks, and deliver the safest, most reliable results to your clients.",
    icon: Activity,
    color: "text-purple-500",
    bgGlow: "bg-purple-500/10"
  },
  {
    id: "mila",
    title: "MILA Ai.",
    description: "Leverage our proprietary artificial intelligence for custom assay developments tailored specifically to the unique needs of your lab.",
    icon: BrainCircuit,
    color: "text-yellow-500",
    bgGlow: "bg-yellow-500/10"
  },
  {
    id: "support",
    title: "Protocols & Support.",
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
        
        {/* CONTENEDOR PRINCIPAL GRIS (Se cambió pt-24 por pt-44 para dar el espacio en celular) */}
        <div className="relative bg-[#F4F4F5] rounded-none md:rounded-[3rem] overflow-hidden pt-24 md:pt-32 pb-32 flex flex-col items-center">
          
          <div
            className="absolute inset-0 opacity-[0.03] z-0 mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#111 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative z-20 w-[95%] md:w-full md:px-16 mx-auto">

            <div className="text-center mb-16 max-w-3xl mx-auto">
              <span className="text-[#FF270A] font-bold uppercase tracking-widest text-xs mb-4 block">
                THE PARTNER ECOSYSTEM
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#111111] leading-tight tracking-tight">
                The ultimate lab upgrade.
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
                        <div className="relative pb-14 z-10 bg-white rounded-[2.5rem] pt-16 p-8 md:p-14 lg:p-16 flex flex-col md:flex-row gap-0 md:gap-8 items-center overflow-hidden">
                            
                            {/* IZQUIERDA: Texto -> Iconos Móviles Estáticos -> Botón */}
                            <div className="w-full md:w-[45%] lg:w-[40%] flex flex-col items-start text-left relative z-20 md:pl-4">
                                <h3 className="text-3xl md:text-[32px] font-bold text-[#111111] mb-5 leading-tight tracking-tight max-w-sm">{solution.title}</h3>
                                <p className="text-[#111111] text-sm md:text-base leading-relaxed font-normal mb-8 max-w-sm">
                                  {solution.description}
                                </p>

                                {/* MOBILE ONLY: 4 Elementos estáticos en lista debajo del texto */}
                                <div className="flex md:hidden flex-col w-full gap-3 mb-8">
                                    
                                    {/* 1. Fastest Results */}
                                    <div className="bg-white p-3 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-50 flex items-center gap-3 w-full">
                                        <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center shrink-0">
                                          <Clock className="w-5 h-5 text-purple-500" />
                                        </div>
                                        <div>
                                          <p className="text-xs font-bold text-[#111111] leading-tight">Fastest Results</p>
                                          <p className="text-[10px] text-gray-500 font-normal">In just hours</p>
                                        </div>
                                    </div>

                                    {/* 2. Efficient Operation */}
                                    <div className="bg-white p-3 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-50 flex items-center gap-3 w-full">
                                        <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                                          <Activity className="w-5 h-5 text-blue-500" />
                                        </div>
                                        <div>
                                          <p className="text-xs font-bold text-[#111111] leading-tight">Efficient Operation</p>
                                          <p className="text-[10px] text-gray-500 font-normal">Automated workflows</p>
                                        </div>
                                    </div>

                                    {/* 3. Higher Margins */}
                                    <div className="bg-white p-3 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-50 flex items-center gap-3 w-full">
                                        <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center shrink-0">
                                          <TrendingUp className="w-5 h-5 text-green-500" />
                                        </div>
                                        <div>
                                          <p className="text-xs font-bold text-[#111111] leading-tight">Higher Margins</p>
                                          <p className="text-[10px] text-gray-500 font-normal">Maximized ROI</p>
                                        </div>
                                    </div>

                                    {/* 4. TxA Software */}
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
                                     
                                     {/* 1. Fastest Results (Arriba Izquierda) */}
                                     <div className="absolute top-[5%] left-[15%] lg:left-[25%] bg-white p-2 md:p-3 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-50 z-20 flex items-center gap-3 animate-float-slow" style={{'--rot': '-3deg'} as any}>
                                        <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-50 rounded-full flex items-center justify-center shrink-0">
                                          <Clock className="w-4 h-4 md:w-5 md:h-5 text-purple-500" />
                                        </div>
                                        <div className="pr-2">
                                          <p className="text-[11px] md:text-xs font-bold text-[#111111] leading-tight">Fastest Results</p>
                                          <p className="text-[9px] md:text-[10px] text-gray-500 font-normal">In just hours</p>
                                        </div>
                                     </div>

                                     {/* 2. Higher Margins (Arriba Derecha) */}
                                     <div className="absolute top-[18%] right-[0%] lg:right-[5%] bg-white p-2 md:p-3 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-50 z-30 flex items-center gap-3 animate-float-delayed" style={{'--rot': '2deg'} as any}>
                                        <div className="w-8 h-8 md:w-10 md:h-10 bg-green-50 rounded-full flex items-center justify-center shrink-0">
                                          <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-green-500" />
                                        </div>
                                        <div className="pr-2">
                                          <p className="text-[11px] md:text-xs font-bold text-[#111111] leading-tight">Higher Margins</p>
                                          <p className="text-[9px] md:text-[10px] text-gray-500 font-normal">Maximized ROI</p>
                                        </div>
                                     </div>

                                     {/* 3. TxA (Centro Izquierda) */}
                                     <div className="absolute top-[45%] left-[5%] lg:left-[15%] bg-white p-2 md:p-3 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-50 z-40 flex items-center gap-3 animate-float-fast" style={{'--rot': '-1deg'} as any}>
                                        <div className="w-8 h-8 md:w-10 md:h-10 bg-red-50 rounded-full flex items-center justify-center shrink-0">
                                          <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-red-500" />
                                        </div>
                                        <div className="pr-2">
                                          <p className="text-[11px] md:text-xs font-bold text-[#111111] leading-tight">TxA Software</p>
                                          <p className="text-[9px] md:text-[10px] text-gray-500 font-normal">Predictive Ai</p>
                                        </div>
                                     </div>

                                     {/* 4. Efficient Operation (Empujado a la Derecha) */}
                                     <div className="absolute top-[60%] right-[-5%] lg:right-[0%] bg-white p-2 md:p-3 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-50 z-20 flex items-center gap-3 animate-float-slow" style={{'--rot': '3deg'} as any}>
                                        <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                                          <Activity className="w-4 h-4 md:w-5 md:h-5 text-blue-500" />
                                        </div>
                                        <div className="pr-2">
                                          <p className="text-[11px] md:text-xs font-bold text-[#111111] leading-tight">Efficient Operation</p>
                                          <p className="text-[9px] md:text-[10px] text-gray-500 font-normal">Automated workflows</p>
                                        </div>
                                     </div>

                                     {/* 5. Plug & Play (Abajo Centro) */}
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

                // --- CARD 5: SOPORTE Y PROTOCOLOS ---
                if (idx === 5) {
                  const IconComponent = solution.icon;
                  return (
                    <div key={solution.id} className="md:col-span-2 bg-white rounded-[2.5rem] p-10 md:px-14 flex flex-col md:flex-row h-auto md:h-[240px] relative overflow-hidden text-center md:text-left items-center gap-8 md:gap-10">
                       <div className="flex-grow flex flex-col md:flex-row items-center gap-6 md:gap-10 w-full">
                           
                           <div className={`relative z-10 w-24 h-24 shrink-0 bg-white rounded-3xl border border-gray-100 flex items-center justify-center ${solution.color}`}>
                             <div className={`absolute w-32 h-32 rounded-full blur-2xl ${solution.bgGlow} opacity-50`}></div>
                             {IconComponent && <IconComponent className="w-10 h-10 relative z-10" />}
                           </div>
                           
                           <div className="flex-1 max-w-2xl">
                              <h3 className="text-2xl md:text-3xl font-bold text-[#111111] mb-3 leading-tight">{solution.title}</h3>
                              <p className="text-gray-500 text-sm md:text-base leading-relaxed font-medium">{solution.description}</p>
                           </div>
                       </div>

                       <div className="flex flex-col sm:flex-row md:flex-col gap-2 w-full md:w-40 shrink-0 mt-4 md:mt-0 z-30">
                          <button onClick={openMeeting} className="w-full py-3 bg-[#111111] text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#FF270A] transition-colors flex items-center justify-center">
                            Contact
                          </button>
                          <button 
                            onClick={() => handleOpenDetails(solution.id)}
                            className="w-full py-3 bg-gray-50 border border-gray-200 text-[#111111] rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-gray-100 transition-colors flex items-center justify-center"
                          >
                            Details
                          </button>
                       </div>
                    </div>
                  );
                }

                // --- CARDS 1 A 4: ESTÁNDAR ---
                const IconComponent = solution.icon;
                return (
                  <div key={solution.id} className="md:col-span-1 bg-white rounded-[2.5rem] pt-12 px-8 flex flex-col h-[400px] md:h-[380px] relative overflow-hidden text-center items-center">
                     <div className="relative z-10 w-full max-w-[320px] flex flex-col items-center">
                        <h3 className="text-2xl font-bold text-[#111111] mb-4 leading-tight">{solution.title}</h3>
                        <p className="text-gray-500 text-sm md:text-base leading-relaxed font-medium">{solution.description}</p>
                      </div>

                      <div className="flex-grow flex items-center justify-center relative w-full mt-4">
                         <div className={`absolute w-32 h-32 rounded-full blur-2xl ${solution.bgGlow || 'bg-gray-100'} opacity-50`}></div>
                         {IconComponent && (
                           <div className={`relative z-10 w-20 h-20 bg-white rounded-2xl border border-gray-100 flex items-center justify-center ${solution.color}`}>
                             <IconComponent className="w-10 h-10" />
                           </div>
                         )}
                      </div>

                      <div className="absolute bottom-8 left-10 right-10 flex gap-2 z-30">
                        <button onClick={openMeeting} className="flex-1 py-3 bg-[#111111] text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#FF270A] transition-colors flex items-center justify-center">
                          Contact
                        </button>
                        <button 
                          onClick={() => handleOpenDetails(solution.id)}
                          className="flex-1 py-3 bg-gray-50 border border-gray-200 text-[#111111] rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-gray-100 transition-colors flex items-center justify-center"
                        >
                          Details
                        </button>
                      </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}