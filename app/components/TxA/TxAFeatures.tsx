"use client";

import { useState, useEffect, useRef } from "react";
import { MessageSquareText, BarChart3, Map, Sparkles, MousePointerClick, MoreHorizontal } from "lucide-react";

// --- SUB-COMPONENTE: TARJETA INDIVIDUAL ---
const FeatureCard = ({ feature }: { feature: any }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Estados para la animación del Chat
  const [showUserMessage, setShowUserMessage] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showAiResponse, setShowAiResponse] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
            setIsVisible(true);
        }
      },
      { threshold: 0.5 } 
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  // Secuencia de animación del Chat
  useEffect(() => {
    if (isVisible && feature.hasCustomVisual) {
      const t1 = setTimeout(() => setShowUserMessage(true), 500);
      const t2 = setTimeout(() => setIsTyping(true), 1500); // Un poco más de tiempo para leer
      const t3 = setTimeout(() => {
        setIsTyping(false);
        setShowAiResponse(true);
      }, 3500);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
  }, [isVisible, feature.hasCustomVisual]);

  return (
    <div 
        ref={cardRef}
        className={`snap-center shrink-0 w-[90vw] md:w-[800px] h-[500px] md:h-[450px] rounded-[2.5rem] overflow-hidden relative group transition-all duration-500 ${feature.cardBgClass}`}
    >
        {/* Efecto Shine para la tarjeta 1 */}
        {feature.id === 1 && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 animate-shine pointer-events-none" />
        )}

        {/* A. TEXTO SUPERIOR (Fijo arriba) */}
        <div className="absolute top-0 left-0 w-full p-8 md:p-12 z-20 pointer-events-none flex flex-col items-start">
            {isVisible && (
                <p 
                className={`text-base md:text-lg font-medium leading-relaxed animate-slide-in max-w-[90%] md:max-w-[300px] ${feature.textColorClass}`}
                style={{ animationDelay: '100ms' }}
                >
                    {feature.description}
                </p>
            )}
        </div>

        {/* B. CONTENIDO VISUAL (Parte inferior) */}
        {/* Ajustado: bottom-0 con altura suficiente para que no choque con el texto de arriba */}
        <div className="absolute bottom-0 left-0 w-full h-[65%] md:h-full z-10 pointer-events-none overflow-hidden flex items-end justify-end">
            
            {feature.hasCustomVisual && isVisible ? (
                // === ANIMACIÓN CHAT ===
                <div className="w-full h-full flex items-end justify-end p-6 md:p-10">
                    <div className="w-full max-w-[450px] flex flex-col gap-3 md:gap-4">
                        
                        {/* 1. Pregunta Usuario */}
                        <div 
                        className={`self-end bg-white/10 backdrop-blur-md text-white px-5 py-3 rounded-2xl rounded-tr-sm max-w-[90%] border border-white/20 shadow-lg transition-all duration-500 transform ${showUserMessage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                        >
                            <p className="text-sm font-medium">Any emerging trends in zone B?</p>
                        </div>

                        {/* 2. Escribiendo... */}
                        {isTyping && (
                            <div className="self-start flex gap-3 animate-fade-in">
                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 shadow-sm border border-white/10">
                                <Sparkles className="w-4 h-4 text-white" />
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-2xl rounded-tl-sm border border-white/10">
                                <MoreHorizontal className="w-5 h-5 text-white animate-pulse" />
                            </div>
                            </div>
                        )}

                        {/* 3. Respuesta IA + CTA */}
                        <div 
                            className={`self-start flex flex-col gap-3 max-w-[95%] transition-all duration-500 transform ${showAiResponse ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 hidden'}`}
                        >
                            {/* Insight Bubble */}
                            <div className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 mt-1 shadow-lg shadow-indigo-900/20">
                                    <Sparkles className="w-4 h-4 text-indigo-600" />
                                </div>
                                <div className="bg-white text-slate-800 p-4 rounded-2xl rounded-tl-sm shadow-xl">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">TxA Insight</span>
                                    </div>
                                    <p className="text-sm leading-relaxed font-medium">
                                        Detected a <span className="font-bold text-indigo-900">15% increase</span> in <span className="italic">Listeria spp.</span> positives near Line 4.
                                    </p>
                                </div>
                            </div>

                            {/* Recommendation & CTA Bubble */}
                            <div className="flex gap-3">
                                <div className="w-8 h-8 shrink-0" /> {/* Espaciador */}
                                <div className="bg-white text-slate-800 p-4 rounded-2xl rounded-tl-sm shadow-xl w-full">
                                    <p className="text-sm leading-relaxed font-medium mb-3">
                                        Based on recent <span className="italic">Listeria spp.</span> trends, I've generated an optimized targeted sampling map.
                                    </p>
                                    
                                    {/* Botón CTA */}
                                    <div className="border border-indigo-100 rounded-xl p-3 bg-indigo-50/50 hover:bg-indigo-50 transition-colors cursor-pointer group/cta pointer-events-auto">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-[10px] font-extrabold text-indigo-900 uppercase tracking-wider">BEST SAMPLING SCHEME</span>
                                            <MousePointerClick className="w-4 h-4 text-indigo-500 group-hover/cta:scale-110 transition-transform" />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-lg bg-indigo-100 flex items-center justify-center shrink-0">
                                                <Map className="w-3 h-3 text-indigo-600" />
                                            </div>
                                            <p className="text-[10px] font-bold text-indigo-700 leading-tight">
                                                Click here to see the proposed sampling scheme.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    </div>
  );
};


export default function TxAFeatures() {
  
  const features = [
    {
      id: 1,
      description: "Ask questions about your data. TxA identifies trends, anomalies, and emerging risks in plain language.",
      hasCustomVisual: true,
      cardBgClass: "bg-gradient-to-br from-indigo-600 to-blue-500", 
      textColorClass: "text-white",
    },
    {
      id: 2,
      description: "Unify operations. Manage multiple production sites and standardized workflows from a single, intuitive interface.",
      hasCustomVisual: false,
      cardBgClass: "bg-[#F5F5F7]",
      textColorClass: "text-[#111111]",
    },
    {
      id: 3,
      description: "Visualize historical data on dynamic heatmaps to identify persistent hotspots and prevent outbreaks.",
      hasCustomVisual: false,
      cardBgClass: "bg-[#F5F5F7]",
      textColorClass: "text-[#111111]",
    }
  ];

  const edgePadding = "max(1.5rem, calc((100vw - 80rem) / 2 + 1.5rem))";

  return (
    <section className="bg-white py-24 border-t border-gray-100 overflow-hidden">
      
      {/* 1. ENCABEZADO */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#111111] mb-6 font-sora tracking-tight leading-tight">
          Meet your new <br className="hidden md:block"/>
          microbiology expert.
        </h2>
        <p className="text-lg text-gray-500 font-medium leading-relaxed max-w-3xl">
          TxA unifies digital sampling, testing, and analytics into a single intelligent nervous system. 
          By creating total visibility across sites and workflows, we turn isolated data into a coordinated defense strategy—faster, sharper, and fully controlled.
        </p>
      </div>

      {/* 2. CARRUSEL */}
      <div 
        className="flex overflow-x-auto snap-x snap-mandatory pb-10 gap-6 no-scrollbar"
        style={{ 
            paddingLeft: edgePadding, 
            paddingRight: edgePadding 
        }}
      >
        {features.map((feature) => (
          <FeatureCard key={feature.id} feature={feature} />
        ))}
        
        {/* Espaciador final */}
        <div className="shrink-0 w-[1px]" />
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .font-sora { font-family: var(--font-sora), sans-serif; }

        @keyframes slideIn {
            0% { opacity: 0; transform: translateX(15px); }
            100% { opacity: 1; transform: translateX(0); }
        }
        .animate-slide-in {
            animation: slideIn 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
            opacity: 0;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        .animate-fade-in {
            animation: fadeIn 0.3s ease-out forwards;
        }

        @keyframes shine {
            from { transform: translateX(-100%) skewX(12deg); }
            to { transform: translateX(200%) skewX(12deg); }
        }
        .animate-shine {
            animation: shine 8s infinite linear;
        }
      `}</style>
    </section>
  );
}