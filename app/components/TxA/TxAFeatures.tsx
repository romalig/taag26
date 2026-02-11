"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image"; 
import { 
  MessageSquareText, Map, Sparkles, MousePointerClick, MoreHorizontal, 
  MapPin, CheckCircle2, ChevronLeft, ChevronRight
} from "lucide-react";

// --- SUB-COMPONENTE: TARJETA INDIVIDUAL ---
const FeatureCard = ({ feature }: { feature: any }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Estados Tarjeta 1 (AI Chat)
  const [showUserMessage, setShowUserMessage] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showAiResponse, setShowAiResponse] = useState(false);

  // Estados Tarjeta 2 (AI Prediction)
  const [aiState, setAiState] = useState<'idle' | 'analyzing' | 'complete'>('idle');
  const [showPins, setShowPins] = useState(false);

  const { id, hasCustomVisual, cardBgClass, textColorClass, description } = feature;

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const currentThreshold = isMobile ? 0.2 : 1.0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);

        if (!entry.isIntersecting) {
            // Reset Tarjeta 1
            setShowUserMessage(false);
            setIsTyping(false);
            setShowAiResponse(false);
            // Reset Tarjeta 2
            setAiState('idle');
            setShowPins(false);
        }
      },
      { threshold: currentThreshold } 
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => { if (cardRef.current) observer.unobserve(cardRef.current); };
  }, []);

  // Animación Tarjeta 1 (Chat)
  useEffect(() => {
    if (isVisible && hasCustomVisual && id === 1) {
      const t1 = setTimeout(() => setShowUserMessage(true), 500);
      const t2 = setTimeout(() => setIsTyping(true), 1500);
      const t3 = setTimeout(() => { setIsTyping(false); setShowAiResponse(true); }, 3500);
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }
  }, [isVisible, hasCustomVisual, id]);

  // Animación Tarjeta 2 (Prediction)
  useEffect(() => {
    if (isVisible && hasCustomVisual && id === 2) {
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
        
        {/* Tarjeta 1: Shine */}
        {id === 1 && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 animate-shine pointer-events-none z-0" />
        )}

        {/* Tarjeta 2 (Prediction): Planos + Capa Oscura */}
        {id === 2 && (
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
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-transparent md:bg-gradient-to-r md:from-black/50 md:via-black/20 md:to-transparent z-0" />
            </>
        )}

        {/* Tarjeta 3 (App): Imagen PNG movida a la derecha */}
        {id === 3 && (
            <div className="absolute inset-0 z-0 flex items-end justify-end pr-8 md:pr-16 pb-0">
                <div className="relative w-full h-[85%]"> 
                    <Image 
                        src="/TxA_app.png" 
                        alt="TxA App Interface"
                        fill
                        unoptimized={true}
                        className="object-contain object-bottom-right transition-transform duration-700 group-hover:scale-[1.02]"
                        priority={true} 
                    />
                </div>
            </div>
        )}
        
        {/* === A. TEXTO SUPERIOR === */}
        <div className="absolute top-0 left-0 w-full p-8 md:p-12 z-20 pointer-events-none flex flex-col items-start">
            {isVisible && (
                <p 
                className={`text-sm md:text-base font-medium leading-relaxed animate-slide-in max-w-[85%] ${
                    id === 4 ? 'md:max-w-[400px]' : 'md:max-w-[220px]'
                } ${textColorClass}`}
                style={{ 
                    animationDelay: '100ms'
                }}
                >
                    {description}
                </p>
            )}
        </div>

        {/* === B. CONTENIDO VISUAL INFERIOR === */}
        <div className="absolute bottom-0 left-0 w-full h-[70%] md:h-full z-10 pointer-events-none overflow-hidden flex items-end justify-end">
            
            {hasCustomVisual && isVisible ? (
                <>
                    {/* --- TARJETA 1: CHAT ANIMADO --- */}
                    {id === 1 && (
                        <div className="w-full h-full flex items-end justify-end p-4 md:p-10">
                            <div className="w-full max-w-[450px] flex flex-col gap-3 md:gap-4 transform scale-[0.90] origin-bottom-right md:scale-100">
                                <div className={`self-end bg-white/10 backdrop-blur-md text-white px-5 py-3 rounded-2xl rounded-tr-sm max-w-[90%] border border-white/20 shadow-lg transition-all duration-500 transform ${showUserMessage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                                    <p className="text-sm font-medium">Any emerging trends in zone B?</p>
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
                                            <p className="text-sm leading-relaxed font-medium">Detected a <span className="font-bold text-indigo-900">15% increase</span> in <span className="italic">Listeria spp.</span> positives near Line 4.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="w-8 h-8 shrink-0" />
                                        <div className="bg-white text-slate-800 p-4 rounded-2xl rounded-tl-sm shadow-xl w-full">
                                            <p className="text-sm leading-relaxed font-medium mb-3">Based on recent <span className="italic">Listeria spp.</span> trends, I've generated an optimized targeted sampling map.</p>
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

                    {/* --- TARJETA 2: AI PREDICTION --- */}
                    {id === 2 && (
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

                    {/* --- TARJETA 4: DYNAMIC & PREVENTIVE --- */}
                    {id === 4 && (
                        <div className="w-full h-full flex flex-col items-center justify-center p-4 z-10 text-center">
                            <div className="flex flex-row items-center gap-2 md:gap-4 flex-wrap justify-center">
                                
                                {/* 1. Dynamic */}
                                <h3 className={`text-5xl md:text-6xl font-extrabold text-indigo-600 tracking-tight ${isVisible ? 'is-visible' : ''}`}>
                                    <span className="dynamic-letter let-1">D</span>
                                    <span className="dynamic-letter let-2">y</span>
                                    <span className="dynamic-letter let-3">n</span>
                                    <span className="dynamic-letter let-4">a</span>
                                    <span className="dynamic-letter let-5">m</span>
                                    <span className="dynamic-letter let-6">i</span>
                                    <span className="dynamic-letter let-7">c</span>
                                </h3>
                                
                                {/* Conector & */}
                                <span className="text-4xl md:text-5xl text-gray-400 font-light italic font-serif">&</span>

                                {/* 2. Preventive */}
                                <h3 className={`text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 tracking-tight ${isVisible ? 'animate-float-once' : ''}`}>
                                    Preventive
                                </h3>

                            </div>
                        </div>
                    )}
                </>
            ) : null}
        </div>
    </div>
  );
};


export default function TxAFeatures() {
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  
  // NUEVO: Referencia para bloquear clics múltiples rápidos
  const isScrolling = useRef(false);

  const checkScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 2); // Pequeño margen
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 2); 
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  // --- SOLUCIÓN DEL BUG DE SCROLL ---
  const scroll = (direction: 'left' | 'right') => {
    // Si no hay referencia o ya se está desplazando, ignorar el clic
    if (!carouselRef.current || isScrolling.current) return;
    
    // Bloquear el botón temporalmente
    isScrolling.current = true;

    const cardWidth = window.innerWidth < 768 ? window.innerWidth * 0.9 : 800;
    const gap = 24; 
    const scrollAmount = cardWidth + gap;
    
    const { scrollLeft } = carouselRef.current;

    if (direction === 'left') {
        // SI ESTÁ CERCA DEL PRINCIPIO, FORZAR AL EXACTO 0. EVITA EL OVERSCROLL NEGATIVO EN BLANCO.
        if (scrollLeft - scrollAmount <= 10) {
            carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            carouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
    } else {
        carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }

    // Desbloquear tras 500ms (tiempo suficiente para que la animación fluida termine)
    setTimeout(() => {
      isScrolling.current = false;
      checkScroll();
    }, 500);
  };
  
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
      description: "Predictive Sampling. AI algorithms analyze historical data to pinpoint the best sampling locations, preventing risks before they arise.",
      hasCustomVisual: true,
      cardBgClass: "bg-[#F5F5F7]",
      textColorClass: "text-white",
    },
    {
      id: 3,
      description: "Power your fieldwork with the TxA App. Perform digital sampling with attached photos, detailed point information, and instant cloud syncing.",
      hasCustomVisual: false, 
      cardBgClass: "bg-[#F4F4F5]", 
      textColorClass: "text-[#111111]", 
    },
    {
      id: 4,
      description: "TxA allows you to build dynamic, preventive programs that adapt in real-time to maximize food quality and safety.",
      hasCustomVisual: true,
      cardBgClass: "bg-[#F4F4F5]", 
      textColorClass: "text-[#111111]", 
    }
  ];

  const edgePadding = "max(1.5rem, calc((100vw - 80rem) / 2 + 1.5rem))";

  return (
    <section className="bg-white py-24 border-t border-gray-100 overflow-hidden relative">
      
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

      {/* 2. CARRUSEL Y BOTONES DE NAVEGACIÓN */}
      <div className="relative group">
        
        {/* Carrusel */}
        <div 
            ref={carouselRef}
            onScroll={checkScroll}
            className="flex overflow-x-auto snap-x snap-mandatory pb-24 md:pb-10 gap-6 no-scrollbar"
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

        {/* --- BOTONES COMPUTADOR (Gris translúcido / Glassmorphism) --- */}
        <button 
            onClick={() => scroll('left')}
            className={`hidden md:flex absolute left-4 xl:left-12 top-1/2 -translate-y-1/2 z-30 w-14 h-14 bg-gray-400/20 backdrop-blur-md border border-gray-400/20 shadow-sm rounded-full items-center justify-center text-gray-600 hover:bg-gray-400/40 hover:text-gray-900 hover:scale-110 transition-all duration-300 ${!canScrollLeft ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
            <ChevronLeft className="w-6 h-6" />
        </button>

        <button 
            onClick={() => scroll('right')}
            className={`hidden md:flex absolute right-4 xl:right-12 top-1/2 -translate-y-1/2 z-30 w-14 h-14 bg-gray-400/20 backdrop-blur-md border border-gray-400/20 shadow-sm rounded-full items-center justify-center text-gray-600 hover:bg-gray-400/40 hover:text-gray-900 hover:scale-110 transition-all duration-300 ${!canScrollRight ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
            <ChevronRight className="w-6 h-6" />
        </button>

        {/* --- BOTONES CELULAR (Gris translúcido / Glassmorphism) --- */}
        <div className="flex md:hidden absolute bottom-6 right-6 z-30 gap-3">
            <button 
                onClick={() => scroll('left')}
                className={`w-12 h-12 bg-gray-400/20 backdrop-blur-md border border-gray-400/20 shadow-sm rounded-full flex items-center justify-center text-gray-600 active:scale-95 transition-all duration-300 ${!canScrollLeft ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            >
                <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
                onClick={() => scroll('right')}
                className={`w-12 h-12 bg-gray-400/20 backdrop-blur-md border border-gray-400/20 shadow-sm rounded-full flex items-center justify-center text-gray-600 active:scale-95 transition-all duration-300 ${!canScrollRight ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            >
                <ChevronRight className="w-6 h-6" />
            </button>
        </div>

      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .font-sora { font-family: var(--font-sora), sans-serif; }

        @keyframes slideIn {
            0% { opacity: 0; transform: translateX(30px); }
            100% { opacity: 1; transform: translateX(0); }
        }
        .animate-slide-in {
            animation: slideIn 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
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

        /* --- ANIMACIONES TARJETA 4 (Letras Saltarinas y Float Finito) --- */
        
        @keyframes chaoticJump {
            0% { transform: translateY(0); }
            20% { transform: translateY(-15px); }
            40% { transform: translateY(10px); }
            60% { transform: translateY(-8px); }
            80% { transform: translateY(4px); }
            100% { transform: translateY(0); }
        }
        .dynamic-letter { display: inline-block; }
        h3.is-visible .dynamic-letter {
             animation-name: chaoticJump; animation-timing-function: ease-in-out;
             animation-fill-mode: forwards; animation-iteration-count: 1; 
        }
        h3.is-visible .let-1 { animation-duration: 2.1s; animation-delay: 0.0s; }
        h3.is-visible .let-2 { animation-duration: 2.3s; animation-delay: 0.1s; }
        h3.is-visible .let-3 { animation-duration: 1.9s; animation-delay: 0.05s; }
        h3.is-visible .let-4 { animation-duration: 2.4s; animation-delay: 0.15s; }
        h3.is-visible .let-5 { animation-duration: 2.0s; animation-delay: 0.02s; }
        h3.is-visible .let-6 { animation-duration: 2.2s; animation-delay: 0.08s; }
        h3.is-visible .let-7 { animation-duration: 2.5s; animation-delay: 0.12s; }

        @keyframes floatOnce {
            0% { transform: translateY(0); }
            25% { transform: translateY(-10px); }
            75% { transform: translateY(5px); }
            100% { transform: translateY(0); }
        }
        .animate-float-once {
            animation: floatOnce 2.5s ease-in-out forwards 1;
        }
      `}</style>
    </section>
  );
}