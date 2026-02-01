"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { 
  ChevronLeft, ChevronRight, Plus, Smartphone, 
  CheckCircle2, ChevronUp, ChevronDown, Zap 
} from "lucide-react";
// Importamos la data actualizada
import { WORKFLOW_STEPS } from "../../industrial/industrialData";

const SHORT_LABELS = [
  "Ecosystem",
  "Sampling",
  "Extraction",
  "Multiplex PCR",
  "AiGOR Analysis",
  "TxA Platform"
];

// SOLO mantenemos las variantes específicas del Paso 3 aquí
// porque esto responde a un click de botón (UI State)
const PCR_VARIANTS = {
  ZERO: {
    desktop: "/zero4.png",
    mobile: "/zero4-mobile.png"
  },
  XPRESS: {
    desktop: "/xpress.png",
    mobile: "/xpress-mobile.png"
  }
};

type PcrVariant = 'ZERO' | 'XPRESS';

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const [prevStep, setPrevStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const [pcrVariant, setPcrVariant] = useState<PcrVariant>('ZERO');
  const [prevPcrVariant, setPrevPcrVariant] = useState<PcrVariant>('ZERO');

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50; 

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // --- HELPER ACTUALIZADO Y MÁS LIMPIO ---
  const getStepImages = (stepIndex: number, variant: PcrVariant) => {
    // 1. Caso especial: Paso 3 (PCR) usa las variantes locales
    if (stepIndex === 3) {
      return PCR_VARIANTS[variant];
    }
    
    // 2. Casos normales: Leen directamente de industrialData.ts
    // Como TypeScript puede quejarse si no definiste mobileImage opcional, hacemos un fallback seguro.
    const stepData = WORKFLOW_STEPS[stepIndex];
    return {
      desktop: stepData.image,
      // @ts-ignore: Si TS se queja de que mobileImage no existe en el tipo
      mobile: stepData.mobileImage || stepData.image 
    };
  };

  const handleChange = (nextStep: number) => {
    if (nextStep === activeStep) return;
    setPrevStep(activeStep);
    setActiveStep(nextStep);
    setPrevPcrVariant(pcrVariant); 
    setIsAnimating(true);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsAnimating(false);
      setPrevStep(nextStep);
    }, 800); 
  };

  const handlePcrVariantChange = (newVariant: PcrVariant) => {
    if (newVariant === pcrVariant) return;
    setPrevPcrVariant(pcrVariant);
    setPcrVariant(newVariant);
    setIsAnimating(true);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsAnimating(false);
      setPrevPcrVariant(newVariant);
    }, 800);
  };

  const handlePrev = () => {
    if (activeStep > 0) handleChange(activeStep - 1);
  };

  const handleNext = () => {
    if (activeStep < WORKFLOW_STEPS.length - 1) handleChange(activeStep + 1);
  };

  // ... (Resto de handlers touch igual que antes) ...
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
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
    
    if (isLeftSwipe) handleNext();
    if (isRightSwipe) handlePrev();
  };

  const currentData = WORKFLOW_STEPS[activeStep];
  const label = SHORT_LABELS[activeStep];
  
  const currentImgs = getStepImages(activeStep, pcrVariant);
  const prevImgs = getStepImages(prevStep, prevPcrVariant);

  return (
    <section className="bg-black text-white py-24 md:py-32 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="px-10 md:px-20 mb-12 md:mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight text-left leading-tight">
            Take a closer look into the future.
          </h2>
        </div>

        <div 
          className="relative w-full h-[550px] md:h-[750px] bg-[#151516] rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/5"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* LAYER 0: IMÁGENES */}
          <div className="absolute inset-0 w-full h-full z-0">
             {/* IMAGEN SALIENTE (PREV) */}
             {isAnimating && (
               <div key={`prev-${prevStep}-${prevPcrVariant}`} className="absolute inset-0 z-0 animate-slideOutLeft">
                  <div className="block md:hidden relative w-full h-full">
                    <Image src={prevImgs.mobile} alt="Prev mobile" fill className="object-cover object-center" priority />
                  </div>
                  <div className="hidden md:block relative w-full h-full">
                    <Image src={prevImgs.desktop} alt="Prev desktop" fill className="object-cover object-center" priority />
                  </div>
               </div>
             )}

             {/* IMAGEN ENTRANTE (CURRENT) */}
             <div key={`current-${activeStep}-${pcrVariant}`} className="absolute inset-0 z-10 animate-slideInRight">
                <div className="block md:hidden relative w-full h-full">
                  <Image src={currentImgs.mobile} alt="Current mobile" fill className="object-cover object-center" priority />
                </div>
                <div className="hidden md:block relative w-full h-full">
                  <Image src={currentImgs.desktop} alt="Current desktop" fill className="object-cover object-center" priority />
                </div>
                <div className="absolute inset-0 bg-black/10" />
             </div>
          </div>

          {/* ... (El resto del JSX se mantiene exactamente igual) ... */}
          
          {/* LAYER 1: INTERFAZ MÓVIL (SWIPEABLE) */}
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/30 to-transparent md:hidden pointer-events-none" />

          <div className="absolute bottom-0 left-0 right-0 z-20 md:hidden flex flex-col justify-end pb-8 px-4">
             {/* ... Controles móvil ... */}
             <div className="flex items-center justify-between gap-3 w-full">
                <button onClick={handlePrev} disabled={activeStep === 0} className={`w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center shrink-0 transition-opacity ${activeStep === 0 ? 'opacity-30' : 'active:scale-95'}`}>
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>

                <div className="flex-1 bg-[#1c1c1e]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-5 min-h-[160px] flex flex-col justify-center animate-scaleIn shadow-2xl">
                   <div className="mb-2">
                      <h3 className="text-lg font-bold text-white tracking-wide leading-tight">
                        {label}. <span className="text-white font-normal block mt-1 text-sm">{currentData.title}</span>
                      </h3>
                   </div>
                   <p className="text-xs text-gray-200 leading-snug line-clamp-3">{currentData.description}</p>

                   {/* SUB-CONTROLES MÓVIL (SOLO PASO 3) */}
                   {activeStep === 3 && (
                     <div className="flex gap-4 mt-3 pt-3 border-t border-white/10 pointer-events-auto">
                       <button onClick={(e) => { e.stopPropagation(); handlePcrVariantChange('ZERO'); }} className={`text-[10px] font-bold tracking-widest uppercase transition-colors flex items-center gap-1 ${pcrVariant === 'ZERO' ? 'text-[#FF270A]' : 'text-white/50'}`}>ZERO</button>
                       <button onClick={(e) => { e.stopPropagation(); handlePcrVariantChange('XPRESS'); }} className={`text-[10px] font-bold tracking-widest uppercase transition-colors flex items-center gap-1 ${pcrVariant === 'XPRESS' ? 'text-[#FF270A]' : 'text-white/50'}`}>XPRESS <Zap className="w-3 h-3" /></button>
                     </div>
                   )}
                   
                   {(currentData as any).txa_status && (
                     <div className="mt-3 pt-2 border-t border-white/10 flex items-center gap-2">
                         <Smartphone className="w-3 h-3 text-white/70" />
                         <span className="text-[10px] uppercase tracking-widest font-bold text-white/70">TxA: {(currentData as any).txa_status}</span>
                     </div>
                   )}
                   <div className="flex justify-center gap-1.5 mt-3">
                     {WORKFLOW_STEPS.map((_, i) => (<div key={i} className={`w-1.5 h-1.5 rounded-full transition-colors ${i === activeStep ? 'bg-white' : 'bg-white/20'}`} />))}
                   </div>
                </div>

                <button onClick={handleNext} disabled={activeStep === WORKFLOW_STEPS.length - 1} className={`w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center shrink-0 transition-opacity ${activeStep === WORKFLOW_STEPS.length - 1 ? 'opacity-30' : 'active:scale-95'}`}>
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
             </div>
          </div>

          {/* LAYER 2: INTERFAZ DESKTOP */}
          <div className="hidden md:flex absolute top-0 bottom-0 left-0 z-20 w-full max-w-lg p-12 items-start gap-6 pointer-events-none">
             <div className="flex flex-col gap-3 mt-2 pointer-events-auto">
               <button onClick={handlePrev} disabled={activeStep === 0} className={`w-10 h-10 rounded-full bg-[#333336]/80 backdrop-blur-md flex items-center justify-center transition-all duration-300 border border-white/10 ${activeStep === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[#454548]'}`}><ChevronUp className="w-5 h-5 text-white" /></button>
               <button onClick={handleNext} disabled={activeStep === WORKFLOW_STEPS.length - 1} className={`w-10 h-10 rounded-full bg-[#333336]/80 backdrop-blur-md flex items-center justify-center transition-all duration-300 border border-white/10 ${activeStep === WORKFLOW_STEPS.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[#454548]'}`}><ChevronDown className="w-5 h-5 text-white" /></button>
             </div>

             <div className="flex flex-col gap-3 w-full pointer-events-auto">
               {WORKFLOW_STEPS.map((step, index) => {
                 const isActive = activeStep === index;
                 const desktopLabel = SHORT_LABELS[index];
                 return (
                   <div key={index} className="transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
                     {isActive ? (
                       <div className="bg-[#1D1D1F]/70 backdrop-blur-xl border border-white/10 rounded-[1.5rem] p-6 w-[380px] shadow-2xl animate-scaleIn origin-top-left">
                         <div className="flex flex-col gap-3">
                           <h3 className="text-lg font-bold text-white tracking-wide">{desktopLabel}. <span className="text-white font-medium">{step.title}</span></h3>
                           <p className="text-sm font-medium text-white leading-relaxed opacity-90">{step.description}</p>
                           {/* SUB-CONTROLES DESKTOP (SOLO PASO 3) */}
                           {index === 3 && (
                             <div className="flex gap-6 mt-2 pt-4 border-t border-white/10">
                               <button onClick={(e) => { e.stopPropagation(); handlePcrVariantChange('ZERO'); }} className={`group/btn flex flex-col items-start gap-1 transition-all ${pcrVariant === 'ZERO' ? 'opacity-100' : 'opacity-50 hover:opacity-100'}`}>
                                 <span className={`text-xs font-bold tracking-widest uppercase transition-colors ${pcrVariant === 'ZERO' ? 'text-[#FF270A]' : 'text-white'}`}>ZERO</span>
                                 <span className="h-0.5 w-full bg-[#FF270A] transform scale-x-0 group-hover/btn:scale-x-100 transition-transform origin-left" style={{ transform: pcrVariant === 'ZERO' ? 'scaleX(1)' : undefined }} />
                               </button>
                               <button onClick={(e) => { e.stopPropagation(); handlePcrVariantChange('XPRESS'); }} className={`group/btn flex flex-col items-start gap-1 transition-all ${pcrVariant === 'XPRESS' ? 'opacity-100' : 'opacity-50 hover:opacity-100'}`}>
                                 <span className={`text-xs font-bold tracking-widest uppercase transition-colors flex items-center gap-1 ${pcrVariant === 'XPRESS' ? 'text-[#FF270A]' : 'text-white'}`}>XPRESS <Zap className="w-3 h-3" /></span>
                                 <span className="h-0.5 w-full bg-[#FF270A] transform scale-x-0 group-hover/btn:scale-x-100 transition-transform origin-left" style={{ transform: pcrVariant === 'XPRESS' ? 'scaleX(1)' : undefined }} />
                               </button>
                             </div>
                           )}
                           {(step as any).txa_status && (
                             <div className="mt-2 pt-3 border-t border-white/10 flex items-center gap-2">
                                <Smartphone className="w-3 h-3 text-white opacity-70" />
                                <span className="text-[10px] uppercase tracking-widest font-bold text-white opacity-70">TxA: {(step as any).txa_status}</span>
                                <CheckCircle2 className="w-3 h-3 text-[#FF270A]" />
                             </div>
                           )}
                         </div>
                       </div>
                     ) : (
                       <button onClick={() => handleChange(index)} className="group flex items-center gap-3 bg-[#333336]/60 hover:bg-[#454548]/80 backdrop-blur-md border border-white/5 rounded-full pl-2 pr-5 py-2 w-fit transition-all duration-300">
                          <div className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center group-hover:border-white transition-colors"><Plus className="w-3 h-3 text-white" /></div>
                          <span className="text-sm font-bold text-white tracking-wide">{desktopLabel}</span>
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