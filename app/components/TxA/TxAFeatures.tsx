"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image"; 
import { 
  MapPin, CheckCircle2, ChevronLeft, ChevronRight
} from "lucide-react";

// --- SUB-COMPONENTE: TARJETA INDIVIDUAL ---
const FeatureCard = ({ feature }: { feature: any }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Estados Tarjeta 1 (Layout Digitalization)
  const [activeLayoutIndex, setActiveLayoutIndex] = useState(0);

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
            setActiveLayoutIndex(0);
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

  // Animación Tarjeta 1 (Layout Crossfade con detención en la 3ra imagen)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isVisible && hasCustomVisual && id === 1) {
      interval = setInterval(() => {
        setActiveLayoutIndex((prev) => {
          // Si ya estamos en la imagen 3 (índice 2), detenemos el intervalo
          if (prev >= 2) {
            clearInterval(interval);
            return 2;
          }
          // Si no, avanzamos a la siguiente
          return prev + 1;
        });
      }, 2000); // 2 segundos por imagen
    }
    return () => clearInterval(interval);
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
        // Wrapper limpio (sin los trucos de webkit que generaban el borde negro)
        className={`snap-center shrink-0 w-[90vw] md:w-[800px] h-[520px] md:h-[450px] rounded-[2.5rem] overflow-hidden relative group transition-all duration-500 ${cardBgClass}`}
    >
        {/* === FONDOS PERSONALIZADOS === */}
        
        {/* Tarjeta 1: Layout Digitalization (Crossfade de 3 imágenes) */}
        {id === 1 && (
            <>
                {/* TRUCO ANTI-BORDE: El scale-[1.02] empuja los bordes oscuros fuera de la vista garantizando un corte perimetral limpio. */}
                <div className="absolute inset-0 z-0 bg-black scale-[1.02]">
                    <Image 
                        src="/Lay1.png" 
                        alt="Plant Layout Base"
                        fill
                        unoptimized={true}
                        className={`object-cover object-center transition-opacity duration-1000 ${activeLayoutIndex === 0 ? 'opacity-100' : 'opacity-0'}`}
                        priority
                    />
                    <Image 
                        src="/Lay2.png" 
                        alt="Plant Layout Equipment"
                        fill
                        unoptimized={true}
                        className={`object-cover object-center transition-opacity duration-1000 ${activeLayoutIndex === 1 ? 'opacity-100' : 'opacity-0'}`}
                    />
                    <Image 
                        src="/Lay3.png" 
                        alt="Plant Layout AI Zones"
                        fill
                        unoptimized={true}
                        className={`object-cover object-center transition-opacity duration-1000 ${activeLayoutIndex === 2 ? 'opacity-100' : 'opacity-0'}`}
                    />
                </div>
                
                {/* Capa de degradado oscuro para que el texto siempre sea legible */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-transparent md:bg-gradient-to-r md:from-black/50 md:via-black/20 md:to-transparent z-10" />
                
                {/* === NUEVO BOX DE ZOOM MUCHO MÁS EVIDENTE === */}
                <div className="absolute bottom-6 md:bottom-8 right-6 md:right-10 z-30 pointer-events-none flex flex-col items-end gap-2">
                    
                    {/* Indicadores visuales (Dots estilo Apple) */}
                    <div className="flex gap-1.5 mr-1 mb-0.5">
                        {[0, 1, 2].map(idx => (
                            <div 
                                key={idx} 
                                className={`h-1.5 rounded-full transition-all duration-500 ${activeLayoutIndex === idx ? 'w-5 bg-[#00C7FD] shadow-[0_0_8px_rgba(0,199,253,0.6)]' : 'w-1.5 bg-white/40'}`} 
                            />
                        ))}
                    </div>

                    {/* El 'key' obliga a React a re-animar este bloque cada vez que cambia el número */}
                    <div 
                        key={activeLayoutIndex} 
                        className="bg-black/60 backdrop-blur-md border border-white/20 px-4 py-2 rounded-xl shadow-2xl animate-badge-pulse flex items-center gap-2.5"
                    >
                        {/* Punto parpadeante para dar efecto de "Escaneando" */}
                        <div className="w-1.5 h-1.5 rounded-full bg-[#00C7FD] animate-pulse" />
                        
                        <span className="text-white text-xs font-mono uppercase tracking-[0.2em] font-bold drop-shadow-md">
                            zoom {activeLayoutIndex + 1}
                        </span>
                    </div>
                </div>
            </>
        )}

        {/* Tarjeta 2 (Prediction): Planos + Capa Oscura */}
        {id === 2 && (
            <>
                {/* Se aplicó scale-[1.02] también aquí para igualar la exactitud del borde */}
                <div className="absolute inset-0 z-0 bg-slate-50 scale-[1.02]">
                    <Image 
                        src="/planos.png" 
                        alt="Architectural Plans"
                        fill
                        unoptimized={true} 
                        className="object-cover object-center"
                        priority={true} 
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-transparent md:bg-gradient-to-r md:from-black/50 md:via-black/20 md:to-transparent z-10" />
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
                    id === 4 ? 'md:max-w-[400px]' : 'md:max-w-[280px]'
                } ${textColorClass}`}
                style={{ animationDelay: '100ms' }}
                >
                    {description}
                </p>
            )}
        </div>

        {/* === B. CONTENIDO VISUAL INFERIOR === */}
        <div className="absolute bottom-0 left-0 w-full h-[70%] md:h-full z-10 pointer-events-none overflow-hidden flex items-end justify-end">
            
            {hasCustomVisual && isVisible ? (
                <>
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
  
  const isScrolling = useRef(false);

  const checkScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 2);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 2); 
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current || isScrolling.current) return;
    
    isScrolling.current = true;

    const cardWidth = window.innerWidth < 768 ? window.innerWidth * 0.9 : 800;
    const gap = 24; 
    const scrollAmount = cardWidth + gap;
    
    const { scrollLeft } = carouselRef.current;

    if (direction === 'left') {
        if (scrollLeft - scrollAmount <= 10) {
            carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            carouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
    } else {
        carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }

    setTimeout(() => {
      isScrolling.current = false;
      checkScroll();
    }, 500);
  };
  
  const features = [
    {
      id: 1,
      description: "TxA performs a true digitalization of your plant layout, accurately determining equipment, distances, and zones. This spatial awareness is key for our AI algorithms.",
      hasCustomVisual: true,
      cardBgClass: "bg-[#F5F5F7]", 
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
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111111] mb-10 md:mb-16 font-sora tracking-tight leading-[1.1] md:leading-tight">
          Ai for automated, smart and <br className="hidden md:block"/>
          dynamic microbiologycal programs.
        </h2>
        <p className="text-[17px] md:text-xl text-gray-500 font-medium leading-relaxed max-w-2xl">
          An important feature of TxA is the digitalization of your food plant. This will allow TxA algorithms to determine contaminated points in your plant and, according to them, automatically define the best next sampling points to track down contamination sources.
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

        {/* --- BOTONES COMPUTADOR --- */}
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

        {/* --- BOTONES CELULAR --- */}
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

        /* --- NUEVA ANIMACIÓN DE DESTELLO PARA EL ZOOM --- */
        @keyframes badgePulse {
            0% { transform: scale(0.85); background-color: rgba(0, 199, 253, 0.3); border-color: rgba(0, 199, 253, 0.8); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); background-color: rgba(0, 0, 0, 0.6); border-color: rgba(255, 255, 255, 0.2); }
        }
        .animate-badge-pulse {
            animation: badgePulse 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

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

        /* --- ANIMACIONES TARJETA 4 --- */
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