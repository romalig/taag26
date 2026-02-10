"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image"; 
import { 
  MessageSquareText, Map, Sparkles, MousePointerClick, MoreHorizontal, 
  MapPin, CheckCircle2
} from "lucide-react";

// --- SUB-COMPONENTE: TARJETA INDIVIDUAL ---
const FeatureCard = ({ feature }: { feature: any }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Estados Tarjeta 1 (AI Chat)
  const [showUserMessage, setShowUserMessage] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showAiResponse, setShowAiResponse] = useState(false);

  // Estados Tarjeta 3 (AI Prediction)
  const [aiState, setAiState] = useState<'idle' | 'analyzing' | 'complete'>('idle');
  const [showPins, setShowPins] = useState(false);

  const { id, hasCustomVisual, cardBgClass, textColorClass, description } = feature;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);

        if (!entry.isIntersecting) {
            // Reset Tarjeta 1
            setShowUserMessage(false);
            setIsTyping(false);
            setShowAiResponse(false);
            // Reset Tarjeta 3
            setAiState('idle');
            setShowPins(false);
        }
      },
      { threshold: 0.6 } 
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => { if (cardRef.current) observer.unobserve(cardRef.current); };
  }, []);

  // Animación Tarjeta 1
  useEffect(() => {
    if (isVisible && hasCustomVisual && id === 1) {
      const t1 = setTimeout(() => setShowUserMessage(true), 500);
      const t2 = setTimeout(() => setIsTyping(true), 1500);
      const t3 = setTimeout(() => { setIsTyping(false); setShowAiResponse(true); }, 3500);
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }
  }, [isVisible, hasCustomVisual, id]);

  // Animación Tarjeta 3
  useEffect(() => {
    if (isVisible && hasCustomVisual && id === 3) {
      const t1 = setTimeout(() => setAiState('analyzing'), 500);
      const t2 = setTimeout(() => setAiState('complete'), 3000);
      const t3 = setTimeout(() => setShowPins(true), 3500);
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }
  }, [isVisible, hasCustomVisual, id]);

  return (
    <div 
        ref={cardRef}
        className={`snap-center shrink-0 w-[90vw] md:w-[800px] h-[520px] md:h-[450px] rounded-[2.5rem] overflow-hidden relative group transition-all duration-500 ${cardBgClass}`}
    >
        {/* === FONDOS PERSONALIZADOS === */}
        
        {/* Tarjeta 1 (AI Chat): Shine Effect */}
        {id === 1 && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 animate-shine pointer-events-none z-0" />
        )}

        {/* Tarjeta 2 (TxA App): Imagen PNG Completa y Alineada Abajo */}
        {id === 2 && (
            <div className="absolute inset-0 z-0 flex items-end justify-center">
                {/* Contenedor relativo para controlar la posición */}
                <div className="relative w-full h-[85%]"> 
                    <Image 
                        src="/TxA_app.png" // Asegúrate de que tu PNG tenga este nombre o cámbialo aquí
                        alt="TxA App Interface"
                        fill
                        unoptimized={true}
                        // CAMBIOS CLAVE: object-contain para que se vea entera, object-bottom para alinearla abajo
                        className="object-contain object-bottom transition-transform duration-700 group-hover:scale-[1.02]"
                        priority={true} 
                    />
                </div>
                {/* Sin overlay oscuro porque el fondo es claro y el texto oscuro */}
            </div>
        )}

        {/* Tarjeta 3 (Planos): Imagen + Capa Oscura */}
        {id === 3 && (
            <>
                <div className="absolute inset-0 z-0 bg-slate-50">
                    <Image 
                        src="/planos.png" 
                        alt="Architectural Plans"
                        fill
                        unoptimized={true} 
                        className="object-cover object-center"
                        priority={true} 
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-transparent md:bg-gradient-to-r md:from-black/50 md:via-black/10 md:to-transparent z-0" />
            </>
        )}

        {/* === A. TEXTO SUPERIOR === */}
        <div className="absolute top-0 left-0 w-full p-8 md:p-12 z-20 pointer-events-none flex flex-col items-start">
            {isVisible && (
                <p 
                className={`text-sm md:text-base font-medium leading-relaxed animate-slide-in max-w-[80%] md:max-w-[240px] ${textColorClass}`}
                style={{ 
                    animationDelay: '100ms'
                }}
                >
                    {description}
                </p>
            )}
        </div>

        {/* === B. CONTENIDO VISUAL INFERIOR (Animaciones flotantes) === */}
        <div className="absolute bottom-0 left-0 w-full h-[70%] md:h-full z-10 pointer-events-none overflow-hidden flex items-end justify-end">
            
            {hasCustomVisual && isVisible ? (
                <>
                    {/* --- TARJETA 1: CHAT ANIMADO --- */}
                    {id === 1 && (
                        <div className="w-full h-full flex items-end justify-end p-4 md:p-10">
                            <div className="w-full max-w-[450px] flex flex-col gap-3 md:gap-4 transform scale-[0.85] origin-bottom-right md:scale-100">
                                <div className={`self-end bg-white/10 backdrop-blur-md text-white px-5 py-3 rounded-2xl rounded-tr-sm max-w-[90%] border border-white/20 shadow-lg transition-all duration-500 transform ${showUserMessage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                                    <p className="text-xs md:text-sm font-medium">Any emerging trends in zone B?</p>
                                </div>
                                {isTyping && (
                                    <div className="self-start flex gap-3 animate-fade-in">
                                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 shadow-sm border border-white/10"><Sparkles className="w-4 h-4 text-white" /></div>
                                        <div className="bg-white/10 backdrop-blur-sm p-3 rounded-2xl rounded-tl-sm border border-white/10"><MoreHorizontal className="w-5 h-5 text-white animate-pulse" /></div>
                                    </div>
                                )}
                                <div className={`self-start flex flex-col gap-3 max-w-[95%] transition-all duration-500 transform ${showAiResponse ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 hidden'}`}>
                                    <div className="flex gap-3">
                                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 mt-1 shadow-lg shadow-indigo-900/20"><Sparkles className="w-4 h-4 text-indigo-600" /></div>
                                        <div className="bg-white text-slate-800 p-4 rounded-2xl rounded-tl-sm shadow-xl">
                                            <div className="flex items-center gap-2 mb-1"><span className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-indigo-600">TxA Insight</span></div>
                                            <p className="text-xs md:text-sm leading-relaxed font-medium">Detected a <span className="font-bold text-indigo-900">15% increase</span> in <span className="italic">Listeria spp.</span> positives near Line 4.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="w-8 h-8 shrink-0" />
                                        <div className="bg-white text-slate-800 p-4 rounded-2xl rounded-tl-sm shadow-xl w-full">
                                            <p className="text-xs md:text-sm leading-relaxed font-medium mb-3">Based on recent <span className="italic">Listeria spp.</span> trends, I've generated an optimized targeted sampling map.</p>
                                            <div className="border border-indigo-100 rounded-xl p-3 bg-indigo-50/50 hover:bg-indigo-50 transition-colors cursor-pointer group/cta pointer-events-auto">
                                                <div className="flex items-center justify-between mb-2"><span className="text-[9px] md:text-[10px] font-extrabold text-indigo-900 uppercase tracking-wider">BEST SAMPLING SCHEME</span><MousePointerClick className="w-4 h-4 text-indigo-500 group-hover/cta:scale-110 transition-transform" /></div>
                                                <div className="flex items-center gap-2"><div className="w-6 h-6 rounded-lg bg-indigo-100 flex items-center justify-center shrink-0"><Map className="w-3 h-3 text-indigo-600" /></div><p className="text-[10px] font-bold text-indigo-700 leading-tight">Click here to see the proposed sampling scheme.</p></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* --- TARJETA 3: AI PREDICTION --- */}
                    {id === 3 && (
                        <div className="w-full h-full relative">
                            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-500 ${aiState === 'analyzing' ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}>
                                <div className="bg-white/95 backdrop-blur-xl border border-gray-200 shadow-xl rounded-2xl px-8 py-5 flex flex-col gap-3 min-w-[240px]">
                                    <div className="text-center"><span className="block text-sm font-bold text-slate-900 tracking-tight">TxA AI algorithms</span></div>
                                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-blue-600 w-[60%] animate-progress-load"></div></div>
                                </div>
                            </div>
                            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-500 ${aiState === 'complete' && !showPins ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}>
                                <div className="bg-emerald-500 text-white shadow-lg rounded-full px-5 py-2 flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /><span className="text-xs font-bold">Optimization Complete</span></div>
                            </div>
                            {showPins && (
                                <>
                                    <div className="absolute top-[20%] right-[15%] animate-pop-in" style={{animationDelay:'0.1s'}}><MapPin className="w-8 h-8 text-[#D92408] -translate-y-full drop-shadow-none filter-none" /></div>
                                    <div className="absolute top-[50%] right-[30%] animate-pop-in" style={{animationDelay:'0.2s'}}><MapPin className="w-8 h-8 text-[#D92408] -translate-y-full drop-shadow-none filter-none" /></div>
                                    <div className="absolute bottom-[25%] right-[20%] animate-pop-in" style={{animationDelay:'0.3s'}}><MapPin className="w-8 h-8 text-[#D92408] -translate-y-full drop-shadow-none filter-none" /></div>
                                    <div className="absolute bottom-[15%] left-[50%] animate-pop-in" style={{animationDelay:'0.4s'}}><MapPin className="w-8 h-8 text-[#D92408] -translate-y-full drop-shadow-none filter-none" /></div>
                                    <div className="absolute bottom-[35%] left-[30%] animate-pop-in" style={{animationDelay:'0.5s'}}><MapPin className="w-8 h-8 text-[#D92408] -translate-y-full drop-shadow-none filter-none" /></div>
                                </>
                            )}
                        </div>
                    )}
                </>
            ) : null}
        </div>
    </div>
  );
};


export default function TxAFeatures() {
  
  const features = [
    {
      id: 1,
      // #1: AI CHAT
      description: "Ask questions about your data. TxA identifies trends, anomalies, and emerging risks in plain language.",
      hasCustomVisual: true,
      cardBgClass: "bg-gradient-to-br from-indigo-600 to-blue-500", 
      textColorClass: "text-white",
    },
    {
      id: 2,
      // #2: TxA APP (Dynamic Sampling)
      description: "Power your fieldwork with the TxA App. Perform dynamic sampling with attached photos, detailed point information, and instant cloud syncing.",
      hasCustomVisual: false, // Usamos la imagen de fondo estática definida en el componente
      cardBgClass: "bg-[#F4F4F5]", // Gris claro
      textColorClass: "text-[#111111]", // Texto oscuro
    },
    {
      id: 3,
      // #3: AI PREDICTION
      description: "Predictive Sampling. AI algorithms analyze historical data to pinpoint the best sampling locations, preventing risks before they arise.",
      hasCustomVisual: true,
      cardBgClass: "bg-[#F5F5F7]",
      textColorClass: "text-white",
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

        @keyframes progressLoad {
            from { width: 0%; }
            to { width: 100%; }
        }
        .animate-progress-load {
            animation: progressLoad 2s ease-in-out infinite;
        }

        @keyframes popIn {
            0% { transform: scale(0) translateY(10px); opacity: 0; }
            70% { transform: scale(1.2) translateY(-5px); opacity: 1; }
            100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        .animate-pop-in {
            animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
            opacity: 0;
        }
      `}</style>
    </section>
  );
}