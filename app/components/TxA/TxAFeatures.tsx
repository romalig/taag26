"use client";

import { useState, useEffect, useRef } from "react";
import { MessageSquareText, BarChart3, Map, Sparkles, MousePointerClick, MoreHorizontal } from "lucide-react";

export default function TxAFeatures() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Estados para la secuencia de animación de la Tarjeta 1
  const [showUserMessage, setShowUserMessage] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showAiResponse, setShowAiResponse] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        
        // Resetear animación al salir
        if (!entry.isIntersecting) {
            setShowUserMessage(false);
            setIsTyping(false);
            setShowAiResponse(false);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // SECUENCIA DE ANIMACIÓN
  useEffect(() => {
    if (isVisible) {
      const t1 = setTimeout(() => setShowUserMessage(true), 500);
      const t2 = setTimeout(() => setIsTyping(true), 1200);
      const t3 = setTimeout(() => {
        setIsTyping(false);
        setShowAiResponse(true);
      }, 3000);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
  }, [isVisible]);

  const features = [
    {
      id: 1,
      description: "Ask questions about your data. TxA identifies trends, anomalies, and emerging risks in plain language.",
      icon: <MessageSquareText className="w-5 h-5" />,
      hasCustomVisual: true,
      
      // CAMBIO: Fondo Pastel Suave (Azul/Índigo Claro)
      cardBgClass: "bg-gradient-to-br from-blue-100 to-indigo-200", 
      // CAMBIO: Texto oscuro para contraste
      textColorClass: "text-slate-800",
      // CAMBIO: Icono con fondo blanco
      iconBgClass: "bg-white text-blue-600 shadow-sm"
    },
    {
      id: 2,
      description: "Unify operations. Manage multiple production sites and standardized workflows from a single, intuitive interface.",
      icon: <BarChart3 className="w-5 h-5" />,
      hasCustomVisual: false,
      cardBgClass: "bg-[#F5F5F7]",
      textColorClass: "text-[#111111]",
      iconBgClass: "bg-white text-[#111111] border border-gray-100"
    },
    {
      id: 3,
      description: "Visualize historical data on dynamic heatmaps to identify persistent hotspots and prevent outbreaks.",
      icon: <Map className="w-5 h-5" />,
      hasCustomVisual: false,
      cardBgClass: "bg-[#F5F5F7]",
      textColorClass: "text-[#111111]",
      iconBgClass: "bg-white text-[#111111] border border-gray-100"
    }
  ];

  const edgePadding = "max(1.5rem, calc((100vw - 80rem) / 2 + 1.5rem))";

  return (
    <section ref={sectionRef} className="bg-white py-24 border-t border-gray-100 overflow-hidden">
      
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
        
        {features.map((feature, index) => (
          <div 
            key={feature.id}
            className={`snap-center shrink-0 w-[90vw] md:w-[800px] h-[450px] rounded-[2.5rem] overflow-hidden relative group transition-colors duration-500 ${feature.cardBgClass}`}
          >
            
            {/* A. TEXTO SUPERIOR */}
            <div className="absolute top-0 left-0 p-8 z-20 pointer-events-none">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-sm ${feature.iconBgClass}`}>
                    {feature.icon}
                </div>
                
                {isVisible && (
                  <p 
                    className={`text-base font-medium leading-relaxed animate-slide-in max-w-[280px] ${feature.textColorClass}`}
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                      {feature.description}
                  </p>
                )}
            </div>


            {/* B. CONTENIDO VISUAL (Solo Tarjeta 1) */}
            <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
                
                {feature.hasCustomVisual && (
                    <div className="absolute bottom-0 right-0 w-full h-full flex items-end justify-end p-6 md:p-10">
                      <div className="w-full max-w-[420px] flex flex-col gap-4">
                          
                          {/* 1. Pregunta Usuario (Burbuja Blanca) */}
                          <div 
                            className={`self-end bg-white text-slate-700 px-5 py-3 rounded-2xl rounded-tr-sm max-w-[80%] shadow-sm transition-all duration-500 transform ${showUserMessage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                          >
                             <p className="text-sm font-medium">Any emerging trends in zone B?</p>
                          </div>

                          {/* 2. Indicador "Escribiendo..." */}
                          {isTyping && (
                             <div className="self-start flex gap-3 animate-fade-in">
                                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                                   <Sparkles className="w-4 h-4 text-blue-500" />
                                </div>
                                <div className="bg-white p-3 rounded-2xl rounded-tl-sm shadow-sm">
                                   <MoreHorizontal className="w-5 h-5 text-blue-400 animate-pulse" />
                                </div>
                             </div>
                          )}

                          {/* 3. Respuesta IA + CTA */}
                          <div 
                             className={`self-start flex flex-col gap-3 max-w-[95%] transition-all duration-500 transform ${showAiResponse ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 hidden'}`}
                          >
                              {/* Burbuja Insight */}
                              <div className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 mt-1 shadow-sm">
                                    <Sparkles className="w-4 h-4 text-blue-600" />
                                </div>
                                <div className="bg-white text-slate-800 p-4 rounded-2xl rounded-tl-sm shadow-md">
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">TxA Insight</span>
                                    </div>
                                    <p className="text-sm leading-relaxed font-medium">
                                      Detected a <span className="font-bold">15% increase</span> in <span className="italic">Listeria spp.</span> positives near Line 4.
                                    </p>
                                </div>
                              </div>

                              {/* Burbuja Recomendación + CTA */}
                              <div className="flex gap-3">
                                <div className="w-8 h-8 shrink-0" />
                                <div className="bg-white text-slate-800 p-4 rounded-2xl rounded-tl-sm shadow-md w-full">
                                    <p className="text-sm leading-relaxed font-medium mb-3">
                                      Based on recent <span className="italic">Listeria spp.</span> trends, I've generated an optimized targeted sampling map.
                                    </p>
                                    
                                    {/* Botón CTA dentro del chat */}
                                    <div className="border border-blue-100 rounded-xl p-3 bg-blue-50/50 hover:bg-blue-50 transition-colors cursor-pointer group/cta pointer-events-auto">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-[10px] font-extrabold text-blue-900 uppercase tracking-wider">BEST SAMPLING SCHEME</span>
                                            <MousePointerClick className="w-4 h-4 text-blue-500 group-hover/cta:scale-110 transition-transform" />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                                                <Map className="w-3 h-3 text-blue-600" />
                                            </div>
                                            <p className="text-[11px] font-bold text-blue-700 leading-tight">
                                                Click here to see the proposed sampling scheme.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                              </div>

                          </div>
                      </div>
                    </div>
                )}
            </div>
          </div>
        ))}

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
      `}</style>
    </section>
  );
}