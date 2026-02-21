"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, CheckCircle2, Clock, Dna, GitMerge } from "lucide-react";
import { useCTA } from "../CTAProvider";
import { useModal } from "./ModalProvider";

// IMPORTAMOS LA PLANTILLA MAESTRA Y LA BASE DE DATOS
import SolutionTemplate from "./modals/SolutionTemplate";
import { SOLUTIONS_DATA } from "../data/solutionsData";

// --- DATOS DEL ECOSISTEMA ---
const ECOSYSTEM_FEATURES = [
  {
    id: "mila",
    title: "AI-driven assay design.",
    descriptionLeft: "Access MILA, our proprietary AI software that automatically designs non-interacting primers for highly complex multiplex PCR kits, reducing R&D time from months to days.",
    description: "Accelerate your diagnostic development with unparalleled precision.",
    advantages: [
      "Speed: From months of R&D to just a few days.",
      "Complexity: Seamlessly handles multiplex PCR design.",
      "Accuracy: Zero primer interaction guaranteed."
    ]
  },
  {
    id: "nanopore",
    title: "Next-gen Sequencing & PCR.",
    description: "Deploy our advanced multiplex PCR and long-read Nanopore amplicon-based kits. Engineered for maximum precision.",
    icon: Dna,
    color: "text-purple-500",
    bgGlow: "bg-purple-500/10"
  },
  {
    id: "iso-protocols",
    title: "ISO 13485 Standardized Workflows.",
    description: "Implement our enhanced two-step enrichment processes and perfectly standardized workflows under strict ISO guidelines.",
    icon: GitMerge,
    color: "text-emerald-500",
    bgGlow: "bg-emerald-500/10"
  },
  {
    id: "txa",
    title: "Powered by TxA.",
    description: "Map, track, and prevent contamination seamlessly. Integrate your facility with our AI-driven software for dynamic environmental sampling.",
  }
];

export default function PartnerEcosystem() {
  const { openMeeting } = useCTA();
  const { openModal } = useModal(); 
  
  // --- LÓGICA DE LA ANIMACIÓN DE LUZ (SOLO SCROLL DOWN Y REINICIABLE) ---
  const [isLineVisible, setIsLineVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const isScrollingDown = useRef(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    // 1. Rastreamos la dirección del scroll
    const handleScroll = () => {
      isScrollingDown.current = window.scrollY > lastScrollY.current;
      lastScrollY.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // 2. Observamos la tarjeta
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Si está visible Y venimos haciendo scroll hacia abajo -> Dispara la luz
          if (isScrollingDown.current) {
            setIsLineVisible(true);
          }
        } else {
          // Si la tarjeta sale completamente de la pantalla, reiniciamos el estado
          // para que vuelva a aparecer la luz la próxima vez que bajemos hacia ella.
          setIsLineVisible(false);
        }
      },
      { threshold: 0.25 }
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
    // Se eliminó px-4 en móvil para que el contenedor gris toque los bordes
    <section id="ecosystem" className="bg-white md:px-6 pt-16 pb-32 md:py-24 overflow-hidden relative">
      
      {/* ======================================================== */}
      {/* ESTILOS DE LA ANIMACIÓN DE LUZ                             */}
      {/* ======================================================== */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes expandLine {
            0% { transform: scaleX(0.01); }
            /* Se expande al 100% de su contenedor padre (que ya mide 90%) */
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
      `}} />

      <div className="max-w-7xl mx-auto">
        
        {/* CONTENEDOR PRINCIPAL GRIS (100% ancho en móvil, bordes redondos en PC) */}
        <div className="relative bg-[#F4F4F5] rounded-none md:rounded-[3rem] overflow-hidden pt-24 md:pt-32 pb-32 flex flex-col items-center">
          
          {/* Patrón de puntos de fondo */}
          <div
            className="absolute inset-0 opacity-[0.03] z-0 mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#111 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* CONTENEDOR INTERNO (Ancho 95% en móvil, 100% con padding en PC) */}
          <div className="relative z-20 w-[95%] md:w-full md:px-16 mx-auto">

            {/* TÍTULO DE LA SECCIÓN */}
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <span className="text-[#FF270A] font-bold uppercase tracking-widest text-xs mb-4 block">
                THE PARTNER ECOSYSTEM
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#111111] leading-tight tracking-tight">
                The ultimate lab upgrade.
              </h2>
            </div>

            {/* GRID DE TARJETAS (Completamente blancas y planas) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative w-full">
              {ECOSYSTEM_FEATURES.map((solution, idx) => {
                
                // --- CARD 0: MILA (Tarjeta Grande) ---
                if (idx === 0) {
                  return (
                    <div className="md:col-span-2 relative" key={solution.id} ref={cardRef}>
                        
                        {/* LÍNEA DE LUZ EXPANSIVA (Ancho al 90%) */}
                        {isLineVisible && (
                          <div className="absolute top-[-2px] left-1/2 -translate-x-1/2 w-[90%] h-[20px] pointer-events-none z-0">
                              <div className="absolute top-[-10px] left-0 w-full h-[30px] bg-gradient-to-r from-[#FF270A] via-[#8b5cf6] to-[#3b82f6] blur-[20px] opacity-0 animate-line-glow origin-center" />
                              <div className="absolute top-[-2px] left-0 w-full h-[4px] bg-gradient-to-r from-[#FF270A] via-[#8b5cf6] to-[#3b82f6] blur-[4px] opacity-0 animate-line-glow origin-center" />
                          </div>
                        )}

                        {/* TARJETA BLANCA PLANA */}
                        <div className="relative z-10 bg-white rounded-[2.5rem] p-0 md:px-8 md:pt-8 md:pb-0 flex flex-col md:grid md:grid-cols-3 gap-0 md:gap-8 overflow-hidden">
                           <div className="order-1 text-left relative z-20 flex flex-col justify-start pt-10 px-10 md:px-0 md:pt-8 pb-6 md:pb-8">
                              <h3 className="text-4xl font-bold text-[#111111] mb-6 leading-tight">{solution.title}</h3>
                              <p className="text-gray-600 text-base leading-relaxed font-medium">{solution.descriptionLeft}</p>
                            </div>

                            <div className="order-2 relative w-full h-auto min-h-[340px] md:min-h-[400px] flex flex-col items-center pt-8 pb-8 md:pt-8 md:pb-8 px-8 md:px-6 mb-6 md:mb-0">
                               <style dangerouslySetInnerHTML={{__html: `
                                @keyframes grow-up-slow { from { height: 0%; } to { height: 95%; } }
                                @keyframes grow-up-fast { from { height: 0%; } to { height: 10%; } }
                              `}} />
                              <div className="w-full max-w-[280px] md:max-w-none mx-auto flex flex-col h-full justify-between gap-6 md:gap-0">
                                 <div className="flex items-center justify-center md:justify-start gap-2">
                                    <Clock className="w-5 h-5 text-gray-500" />
                                    <span className="text-[11px] font-bold uppercase tracking-widest text-gray-500">R&D Time Comparison</span>
                                 </div>
                                 <div className="flex-1 flex items-end justify-center gap-6 md:gap-10 relative z-10 min-h-[240px] mb-10 md:mb-20 mt-6">
                                    <div className="flex flex-col items-center gap-3 w-20">
                                       <div className="w-14 bg-gray-50 border border-gray-100 rounded-t-full relative overflow-hidden h-[180px] md:h-[200px] flex items-end justify-center">
                                          <div className="w-full bg-gray-300 rounded-t-full" style={{height: '95%', animation: 'grow-up-slow 2s ease-out forwards'}}></div>
                                       </div>
                                       <div className="text-center">
                                          <div className="text-[10px] font-bold text-gray-400 uppercase leading-tight">Traditional R&D</div>
                                          <div className="text-[10px] font-medium text-gray-400 mt-1">6+ Months</div>
                                       </div>
                                    </div>
                                    <div className="flex flex-col items-center gap-3 w-20">
                                       <div className="w-14 bg-gray-50 border border-gray-100 rounded-t-full relative overflow-hidden h-[180px] md:h-[200px] flex items-end justify-center">
                                          <div className="w-full bg-blue-600 rounded-t-full relative" style={{height: '10%', animation: 'grow-up-fast 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards'}}>
                                             <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-1 w-full h-[2px] bg-white/50"></div>
                                          </div>
                                       </div>
                                       <div className="text-center">
                                          <div className="text-[10px] font-bold text-[#111111] uppercase leading-tight">MILA Ai</div>
                                          <div className="text-[10px] font-bold text-blue-600 mt-1">Just Days</div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                            </div>

                            <div className="order-3 text-left flex flex-col justify-start md:justify-between relative z-20 px-10 pb-8 md:px-0 md:pb-8 md:pt-8">
                              <div className="mb-8">
                                 <h4 className="text-[#111111] font-bold text-sm uppercase tracking-widest mb-6">Advantages</h4>
                                 <p className="text-gray-600 text-sm leading-relaxed mb-4 font-medium">{solution.description}</p>
                                 {solution.advantages && (
                                   <ul className="flex flex-col gap-3">
                                     {solution.advantages.map((adv, i) => {
                                       const [title, ...rest] = adv.split(":");
                                       const description = rest.join(":");
                                       return (
                                         <li key={i} className="flex items-start gap-2 text-sm text-gray-600 font-medium leading-tight">
                                           <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                                           <span><span className="text-[#111111] font-bold">{title}{description ? ":" : ""}</span>{description}</span>
                                         </li>
                                       );
                                     })}
                                   </ul>
                                 )}
                              </div>
                               <div className="flex gap-3 mt-auto md:mt-6">
                                 <button onClick={openMeeting} className="flex-1 py-3 bg-[#111111] text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#FF270A] transition-colors flex items-center justify-center gap-2">
                                   Contact <ArrowRight className="w-3 h-3" />
                                 </button>
                                  <button 
                                    onClick={() => handleOpenDetails(solution.id)}
                                    className="flex-1 py-3 bg-gray-50 border border-gray-200 text-[#111111] rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-gray-100 transition-colors flex items-center justify-center"
                                  >
                                    Details
                                  </button>
                                </div>
                              </div>
                        </div>
                    </div>
                  );
                }

                // --- CARD 3: TxA (Blanca y Plana) ---
                if (idx === 3) {
                  return (
                    <div key={solution.id} className="md:col-span-2 relative rounded-[2.5rem] overflow-hidden bg-white flex flex-col md:flex-row h-auto md:h-[200px]">
                        <div className="absolute inset-0 z-0 hidden md:block opacity-40">
                           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:14px_14px]"></div>
                        </div>

                        <div className="relative z-20 w-full h-full flex flex-col md:flex-row items-start md:items-center justify-between p-10 md:px-12">
                          <div className="max-w-[320px] z-20">
                              <h3 className="text-2xl font-bold text-[#111111] mb-3 leading-tight tracking-tight">{solution.title}</h3>
                              <p className="text-gray-500 text-sm font-medium leading-relaxed">{solution.description}</p>
                          </div>
                          <div className="absolute left-[450px] top-1/2 -translate-y-1/2 hidden md:block z-20 select-none">
                             <div className="relative w-40 h-40 scale-90">
                                <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none" strokeWidth="1.5" strokeLinecap="round">
                                    <path d="M100 30 A 70 70 0 0 1 165 130" stroke="#3b82f6" strokeDasharray="6 6" opacity="0.9" />
                                    <path d="M165 130 A 70 70 0 0 1 35 130" stroke="#FF270A" strokeDasharray="6 6" opacity="0.9" />
                                    <path d="M35 130 A 70 70 0 0 1 100 30" stroke="#8b5cf6" strokeDasharray="6 6" opacity="0.9" />
                                </svg>
                                <div className="absolute top-2 left-1/2 -translate-x-1/2 text-center">
                                    <span className="block text-[9px] font-medium text-blue-600 uppercase tracking-widest bg-white px-3 py-1 rounded-full border border-blue-100">Predictive</span>
                                </div>
                                <div className="absolute bottom-8 right-0 text-center">
                                    <span className="block text-[9px] font-medium text-[#FF270A] uppercase tracking-widest bg-white px-4 py-1 rounded-full border border-red-100">Map</span>
                                </div>
                                <div className="absolute bottom-8 left-0 text-center">
                                    <span className="block text-[9px] font-medium text-purple-600 uppercase tracking-widest bg-white px-3 py-1 rounded-full border border-purple-100 leading-none">Prevent</span>
                                </div>
                             </div>
                          </div>
                          <div className="relative mt-6 z-30 md:absolute md:bottom-8 md:right-12">
                             <button onClick={openMeeting} className="py-3 px-6 bg-[#111111] text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#FF270A] transition-colors flex items-center gap-2">
                               Learn More <ArrowRight className="w-3 h-3" />
                             </button>
                          </div>
                        </div>
                    </div>
                  );
                }

                // --- CARDS 1 y 2: ESTÁNDAR (Blancas, Planas) ---
                const IconComponent = solution.icon;
                return (
                  <div key={solution.id} className="md:col-span-1 bg-white rounded-[2.5rem] pt-10 px-8 flex flex-col h-[480px] md:h-[420px] relative overflow-hidden text-center items-center">
                     <div className="relative z-10 w-full max-w-[320px] flex flex-col items-center">
                        <h3 className="text-2xl font-bold text-[#111111] mb-4 leading-tight">{solution.title}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed font-medium">{solution.description}</p>
                      </div>

                      <div className="flex-grow flex items-center justify-center relative w-full mt-4">
                         {/* Brillo sutil interno para que el ícono no se vea flotando en la nada */}
                         <div className={`absolute w-32 h-32 rounded-full blur-3xl ${solution.bgGlow || 'bg-gray-100'} opacity-50`}></div>
                         {IconComponent && (
                           <div className={`relative z-10 w-20 h-20 bg-white rounded-2xl border border-gray-100 flex items-center justify-center ${solution.color}`}>
                             <IconComponent className="w-10 h-10" />
                           </div>
                         )}
                      </div>

                      <div className="absolute bottom-6 left-10 right-10 flex gap-2 z-30">
                        <button onClick={openMeeting} className="flex-1 py-3 bg-[#111111] text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#FF270A] transition-colors flex items-center justify-center gap-2">
                          Contact
                        </button>
                        <button 
                          onClick={() => handleOpenDetails(solution.id)}
                          className="flex-1 py-3 bg-gray-50 border border-gray-200 text-[#111111] rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-gray-100 transition-colors"
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