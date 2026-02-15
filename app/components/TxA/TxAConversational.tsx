"use client";

import { useState, useEffect, useRef } from "react";
import { Sparkles, MoreHorizontal, MousePointerClick, Map } from "lucide-react";

export default function TxAConversational() {
  // 1. Estados independientes para la línea y para la tarjeta
  const [isLineVisible, setIsLineVisible] = useState(false);
  const [isCardVisible, setIsCardVisible] = useState(false);
  
  // 2. Referencias independientes
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Estados de la animación del chat
  const [showUserMessage, setShowUserMessage] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showAiResponse, setShowAiResponse] = useState(false);

  // ==========================================
  // OBSERVER 1: LÍNEA EXPANSIVA APPLE
  // ==========================================
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsLineVisible(entry.isIntersecting);
      },
      { threshold: 0.1 } // Se activa apenas la sección asoma (10%)
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // ==========================================
  // OBSERVER 2: TARJETA Y CHAT ANIMADO
  // ==========================================
  useEffect(() => {
    // Umbral dinámico: 30% en móvil, 70% en PC
    const isMobile = window.innerWidth < 768;
    const cardThreshold = isMobile ? 0.5 : 0.9;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsCardVisible(entry.isIntersecting);

        if (!entry.isIntersecting) {
            // Reiniciar animación del chat si sale de la pantalla
            setShowUserMessage(false);
            setIsTyping(false);
            setShowAiResponse(false);
        }
      },
      { threshold: cardThreshold } 
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  // Controladores de tiempo para simular la conversación (Atados a isCardVisible)
  useEffect(() => {
    if (isCardVisible) {
      const t1 = setTimeout(() => setShowUserMessage(true), 1000); 
      const t2 = setTimeout(() => setIsTyping(true), 2000);
      const t3 = setTimeout(() => { setIsTyping(false); setShowAiResponse(true); }, 4000);
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }
  }, [isCardVisible]);

  return (
    <section className="bg-[#f5f5f7] py-24 md:py-32 overflow-hidden relative" ref={sectionRef}>
      
      {/* ========================================================= */}
      {/* ANIMACIÓN APPLE: LÍNEA DE LUZ HORIZONTAL EXPANSIVA        */}
      {/* ========================================================= */}
      {isLineVisible && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1400px] h-[20px] pointer-events-none z-50">
            {/* Glow difuminado amplio */}
            <div className="absolute top-[-10px] left-0 w-full h-[30px] bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-400 blur-[20px] opacity-0 animate-line-glow origin-center" />
            {/* Línea central más brillante y concentrada */}
            <div className="absolute top-[-2px] left-0 w-full h-[4px] bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-400 blur-[4px] opacity-0 animate-line-glow origin-center" />
        </div>
      )}

      {/* 1. ENCABEZADO DE LA SECCIÓN */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 mb-16 text-center flex flex-col items-center relative z-10 pt-4"> 
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111111] mb-6 font-sora tracking-tight leading-[1.1] md:leading-tight">
          Meet you new <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-400">Microbiology Expert.</span>
        </h2>
        <p className="text-[17px] md:text-xl text-gray-500 font-medium leading-relaxed max-w-3xl">
          Stop digging through complex spreadsheets. Talk to your food safety data in plain language. TxA instantly identifies trends, anomalies, and emerging risks, giving you actionable insights in seconds.
        </p>
      </div>

      {/* 2. TARJETA ANIMADA CENTRADA */}
      <div className="w-full flex justify-center px-4 md:px-6 relative z-10" ref={cardRef}>
        <div className="w-full max-w-[900px] h-[520px] md:h-[450px] rounded-[2.5rem] overflow-hidden relative group transition-all duration-500 bg-gradient-to-br from-indigo-600 to-blue-500 shadow-2xl shadow-indigo-600/20">
            
            {/* Efecto de Brillo de la Tarjeta (Shine) */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 animate-shine pointer-events-none z-0" />
            
            {/* Texto descriptivo interno */}
            <div className="absolute top-0 left-0 w-full p-8 md:p-12 z-20 pointer-events-none flex flex-col items-start">
                <p 
                    className={`text-sm md:text-base font-medium leading-relaxed text-white max-w-[85%] md:max-w-[280px] transition-all duration-1000 transform ${isCardVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
                    style={{ animationDelay: '100ms' }}
                >
                    Ask questions about your data. TxA identifies trends, anomalies, and emerging risks in plain language.
                </p>
            </div>

            {/* CONTENIDO VISUAL INFERIOR: CHAT ANIMADO */}
            <div className="absolute bottom-0 left-0 w-full h-[75%] md:h-full z-10 pointer-events-none overflow-hidden flex items-end justify-end">
                <div className="w-full h-full flex items-end justify-end p-4 md:p-10">
                    <div className="w-full max-w-[480px] flex flex-col gap-3 md:gap-4 transform scale-[0.90] origin-bottom-right md:scale-100">
                        
                        {/* Mensaje del Usuario */}
                        <div className={`self-end bg-white/10 backdrop-blur-md text-white px-5 py-3 rounded-2xl rounded-tr-sm max-w-[90%] border border-white/20 shadow-lg transition-all duration-500 transform ${showUserMessage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                            <p className="text-sm font-medium">Any emerging trends in zone B?</p>
                        </div>
                        
                        {/* Animación de "Escribiendo..." */}
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
                        
                        {/* Respuesta de la IA */}
                        <div className={`self-start flex flex-col gap-3 max-w-[95%] transition-all duration-500 transform ${showAiResponse ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 hidden'}`}>
                            
                            {/* Globo 1: Insight */}
                            <div className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 mt-1 shadow-lg shadow-indigo-900/20">
                                    <Sparkles className="w-4 h-4 text-indigo-600" />
                                </div>
                                <div className="bg-white text-slate-800 p-4 rounded-2xl rounded-tl-sm shadow-xl">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-indigo-600">TxA Insight</span>
                                    </div>
                                    <p className="text-sm leading-relaxed font-medium">
                                        Detected a <span className="font-bold text-indigo-900">15% increase</span> in <span className="italic">Listeria spp.</span> positives near Line 4.
                                    </p>
                                </div>
                            </div>

                            {/* Globo 2: Call to Action (Sampling Scheme) */}
                            <div className="flex gap-3">
                                <div className="w-8 h-8 shrink-0" />
                                <div className="bg-white text-slate-800 p-4 rounded-2xl rounded-tl-sm shadow-xl w-full pointer-events-auto">
                                    <p className="text-sm leading-relaxed font-medium mb-3">
                                        Based on recent <span className="italic">Listeria spp.</span> trends, I've generated an optimized targeted sampling map.
                                    </p>
                                    <div className="border border-indigo-100 rounded-xl p-3 bg-indigo-50/50 hover:bg-indigo-50 transition-colors cursor-pointer group/cta">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-[9px] md:text-[10px] font-extrabold text-indigo-900 uppercase tracking-wider">BEST SAMPLING SCHEME</span>
                                            <MousePointerClick className="w-4 h-4 text-indigo-500 group-hover/cta:scale-110 transition-transform" />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-lg bg-indigo-100 flex items-center justify-center shrink-0">
                                                <Map className="w-3 h-3 text-indigo-600" />
                                            </div>
                                            <p className="text-[10px] font-bold text-indigo-700 leading-tight">Click here to see the proposed sampling scheme.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
      </div>

      <style jsx>{`
        .font-sora { font-family: var(--font-sora), sans-serif; }

        /* ======================================================== */
        /* LA MAGIA: ANIMACIÓN DE LÍNEA EXPANSIVA 100% FLUIDA       */
        /* ======================================================== */
        
        /* 1. Carril de Expansión (Solo maneja el tamaño, sin pausas) */
        @keyframes expandLine {
            0% { transform: scaleX(0.01); }
            100% { transform: scaleX(1.1); }
        }

        /* 2. Carril de Visibilidad (Maneja el fade in y fade out) */
        @keyframes fadeLine {
            0% { opacity: 0; }
            10% { opacity: 1; }
            70% { opacity: 0.8; }
            100% { opacity: 0; }
        }

        .animate-line-glow {
            /* Al separar la animación, la curva de aceleración 'cubic-bezier' 
              no se ve interrumpida por cambios de opacidad. 
              Resultado: Desplazamiento perfecto y suave.
            */
            animation: 
                expandLine 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards,
                fadeLine 1.5s linear forwards;
        }

        /* -------------------------------------------------------- */

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