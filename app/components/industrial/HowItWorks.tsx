"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { 
  ChevronUp, 
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Plus,
  Smartphone,
  CheckCircle2
} from "lucide-react";
import { WORKFLOW_STEPS } from "../../industrial/industrialData";

const SHORT_LABELS = [
  "Ecosystem",
  "Sampling",
  "Extraction",
  "Multiplex PCR",
  "AiGOR Analysis",
  "TxA Platform"
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const [prevStep, setPrevStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // --- LÓGICA DE SWIPE (TACTIL) ---
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50; // Distancia mínima para considerar que fue un swipe

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // --- MANEJADORES DE CAMBIO ---
  const handleChange = (nextStep: number) => {
    if (nextStep === activeStep) return;
    setPrevStep(activeStep);
    setActiveStep(nextStep);
    setIsAnimating(true);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsAnimating(false);
      setPrevStep(nextStep); 
    }, 800); 
  };

  const handlePrev = () => {
    if (activeStep > 0) handleChange(activeStep - 1);
  };

  const handleNext = () => {
    if (activeStep < WORKFLOW_STEPS.length - 1) handleChange(activeStep + 1);
  };

  // --- HANDLERS TÁCTILES ---
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null); // Reseteamos al tocar
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    // Swipe Izquierda -> Siguiente (Como pasar página)
    if (isLeftSwipe) {
      handleNext();
    }
    // Swipe Derecha -> Anterior
    if (isRightSwipe) {
      handlePrev();
    }
  };

  const currentData = WORKFLOW_STEPS[activeStep];
  const prevData = WORKFLOW_STEPS[prevStep];
  const label = SHORT_LABELS[activeStep];

  return (
    <section className="bg-black text-white py-12 md:py-24 px-4 md:px-8">
      
      <div className="max-w-[1400px] mx-auto">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 md:mb-12 tracking-tight text-center md:text-left">
          Take a closer look.
        </h2>

        {/* CONTENEDOR PRINCIPAL */}
        {/* AÑADIDOS LOS EVENTOS ONTOUCH AQUÍ PARA DETECTAR EL SWIPE EN TODO EL ÁREA */}
        <div 
          className="relative w-full h-[600px] md:h-[750px] bg-[#151516] rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/5"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          
          {/* =========================================================
              LAYER 0: IMÁGENES (Fondo Completo)
          ========================================================== */}
          <div className="absolute inset-0 w-full h-full z-0">
             
             {/* IMAGEN SALIENTE */}
             {isAnimating && (
               <div key={`prev-${prevStep}`} className="absolute inset-0 z-0 animate-slideOutLeft">
                  <Image 
                    src={prevData.image} 
                    alt={prevData.title}
                    fill
                    className="object-cover object-center" 
                    priority
                  />
               </div>
             )}

             {/* IMAGEN ENTRANTE */}
             <div key={`current-${activeStep}`} className="absolute inset-0 z-10 animate-slideInRight">
                <Image 
                  src={currentData.image} 
                  alt={currentData.title}
                  fill
                  className="object-cover object-center"
                  priority
                />
                <div className="absolute inset-0 bg-black/10" />
             </div>
          </div>

          {/* =========================================================
              LAYER 1: INTERFAZ MÓVIL (SWIPEABLE)
          ========================================================== */}
          
          {/* Gradiente inferior para legibilidad en móvil */}
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/30 to-transparent md:hidden pointer-events-none" />

          {/* Controles superpuestos */}
          <div className="absolute bottom-0 left-0 right-0 z-20 md:hidden flex flex-col justify-end pb-6 px-4">
            
            <div className="flex items-center justify-between gap-3 w-full">
              
              {/* Flecha Izquierda */}
              <button 
                onClick={handlePrev}
                disabled={activeStep === 0}
                className={`w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center shrink-0 transition-opacity ${activeStep === 0 ? 'opacity-30' : 'active:scale-95'}`}
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>

              {/* Tarjeta Central Flotante */}
              <div className="flex-1 bg-[#1c1c1e]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-5 min-h-[160px] flex flex-col justify-center animate-scaleIn shadow-2xl">
                <div className="mb-2">
                   <h3 className="text-lg font-bold text-white tracking-wide leading-tight">
                     {label}. <span className="text-white font-normal block mt-1 text-sm">{currentData.title}</span>
                   </h3>
                </div>
                
                <p className="text-xs text-gray-200 leading-snug line-clamp-3">
                   {currentData.description}
                </p>

                {(currentData as any).txa_status && (
                  <div className="mt-3 pt-2 border-t border-white/10 flex items-center gap-2">
                      <Smartphone className="w-3 h-3 text-white/70" />
                      <span className="text-[10px] uppercase tracking-widest font-bold text-white/70">
                        TxA: {(currentData as any).txa_status}
                      </span>
                  </div>
                )}
                
                {/* Paginación visual (Puntos) */}
                <div className="flex justify-center gap-1.5 mt-3">
                  {WORKFLOW_STEPS.map((_, i) => (
                    <div key={i} className={`w-1.5 h-1.5 rounded-full transition-colors ${i === activeStep ? 'bg-white' : 'bg-white/20'}`} />
                  ))}
                </div>
              </div>

              {/* Flecha Derecha */}
              <button 
                onClick={handleNext}
                disabled={activeStep === WORKFLOW_STEPS.length - 1}
                className={`w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center shrink-0 transition-opacity ${activeStep === WORKFLOW_STEPS.length - 1 ? 'opacity-30' : 'active:scale-95'}`}
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>

            </div>
          </div>

          {/* =========================================================
              LAYER 2: INTERFAZ DESKTOP
          ========================================================== */}
          <div className="hidden md:flex absolute top-0 bottom-0 left-0 z-20 w-full max-w-lg p-12 items-start gap-6 pointer-events-none">
            
            {/* Controles Desktop */}
            <div className="flex flex-col gap-3 mt-2 pointer-events-auto">
              <button 
                onClick={handlePrev}
                disabled={activeStep === 0}
                className={`w-10 h-10 rounded-full bg-[#333336]/80 backdrop-blur-md flex items-center justify-center transition-all duration-300 border border-white/10 ${activeStep === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[#454548]'}`}
              >
                <ChevronUp className="w-5 h-5 text-white" />
              </button>
              <button 
                onClick={handleNext}
                disabled={activeStep === WORKFLOW_STEPS.length - 1}
                className={`w-10 h-10 rounded-full bg-[#333336]/80 backdrop-blur-md flex items-center justify-center transition-all duration-300 border border-white/10 ${activeStep === WORKFLOW_STEPS.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[#454548]'}`}
              >
                <ChevronDown className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Lista Vertical Desktop */}
            <div className="flex flex-col gap-3 w-full pointer-events-auto">
              {WORKFLOW_STEPS.map((step, index) => {
                const isActive = activeStep === index;
                const desktopLabel = SHORT_LABELS[index];

                return (
                  <div key={index} className="transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
                    {isActive ? (
                      <div className="bg-[#1D1D1F]/70 backdrop-blur-xl border border-white/10 rounded-[1.5rem] p-6 w-[380px] shadow-2xl animate-scaleIn origin-top-left">
                        <div className="flex flex-col gap-3">
                          <h3 className="text-lg font-bold text-white tracking-wide">
                            {desktopLabel}. <span className="text-white font-medium">{step.title}</span>
                          </h3>
                          <p className="text-sm font-medium text-white leading-relaxed opacity-90">
                            {step.description}
                          </p>
                          {(step as any).txa_status && (
                            <div className="mt-2 pt-3 border-t border-white/10 flex items-center gap-2">
                               <Smartphone className="w-3 h-3 text-white opacity-70" />
                               <span className="text-[10px] uppercase tracking-widest font-bold text-white opacity-70">
                                 TxA: {(step as any).txa_status}
                               </span>
                               <CheckCircle2 className="w-3 h-3 text-[#FF270A]" />
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <button 
                        onClick={() => handleChange(index)}
                        className="group flex items-center gap-3 bg-[#333336]/60 hover:bg-[#454548]/80 backdrop-blur-md border border-white/5 rounded-full pl-2 pr-5 py-2 w-fit transition-all duration-300"
                      >
                         <div className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center group-hover:border-white transition-colors">
                            <Plus className="w-3 h-3 text-white" />
                         </div>
                         <span className="text-sm font-bold text-white tracking-wide">
                           {desktopLabel}
                         </span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      <style jsx global>{`
        /* Animaciones Desktop & Mobile */
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); filter: blur(5px); }
          to { opacity: 1; transform: translateX(0); filter: blur(0); }
        }
        .animate-slideInRight {
          animation: slideInRight 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }

        @keyframes slideOutLeft {
          from { opacity: 1; transform: translateX(0); }
          to { opacity: 0; transform: translateX(-50px); }
        }
        .animate-slideOutLeft {
          animation: slideOutLeft 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }

        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-scaleIn {
          animation: scaleIn 0.4s cubic-bezier(0.32, 0.72, 0, 1) forwards;
        }
      `}</style>
    </section>
  );
}