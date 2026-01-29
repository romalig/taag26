"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { 
  ChevronUp, 
  ChevronDown,
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
  // Estado para trackear la imagen "anterior" y poder animar su salida
  const [prevStep, setPrevStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Referencia para manejar timeouts si el usuario clickea rápido
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleChange = (nextStep: number) => {
    if (nextStep === activeStep) return;
    
    // Antes de cambiar, guardamos el actual como "previo"
    setPrevStep(activeStep);
    setActiveStep(nextStep);
    setIsAnimating(true);

    // Reiniciamos el flag de animación después de que termine la transición CSS (800ms)
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsAnimating(false);
      // Opcional: sincronizar prevStep con activeStep al final para limpiar el DOM,
      // pero dejarlo así permite que la imagen "vieja" se quede oculta detrás lista para la prox.
      setPrevStep(nextStep); 
    }, 800); 
  };

  const handlePrev = () => {
    if (activeStep > 0) handleChange(activeStep - 1);
  };

  const handleNext = () => {
    if (activeStep < WORKFLOW_STEPS.length - 1) handleChange(activeStep + 1);
  };

  const currentData = WORKFLOW_STEPS[activeStep];
  const prevData = WORKFLOW_STEPS[prevStep];

  return (
    <section className="bg-black text-white py-24 px-4 md:px-8">
      
      <div className="max-w-[1400px] mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-12 tracking-tight">
          Take a closer look.
        </h2>

        {/* CONTENEDOR PRINCIPAL */}
        <div className="relative w-full h-[600px] md:h-[750px] bg-[#151516] rounded-[3rem] overflow-hidden border border-white/5">
          
          {/* =========================================================
              LAYER 0: SISTEMA DE IMÁGENES (TRANSICIÓN APPLE)
          ========================================================== */}
          <div className="absolute inset-0 w-full h-full z-0">
             
             {/* IMAGEN DE SALIDA (PREVIA) */}
             {/* Solo la renderizamos si hay una animación en curso o si es diferente a la actual */}
             {isAnimating && (
               <div key={`prev-${prevStep}`} className="absolute inset-0 z-0 animate-slideOutLeft">
                  <Image 
                    src={prevData.image} 
                    alt={prevData.title}
                    fill
                    className="object-cover object-center"
                    priority
                  />
                  <div className="absolute inset-0 bg-black/20" />
               </div>
             )}

             {/* IMAGEN DE ENTRADA (ACTUAL) */}
             {/* Esta capa está encima (z-10) y entra desde la derecha */}
             <div key={`current-${activeStep}`} className="absolute inset-0 z-10 animate-slideInRight">
                <Image 
                  src={currentData.image} 
                  alt={currentData.title}
                  fill
                  className="object-cover object-center"
                  priority
                />
                <div className="absolute inset-0 bg-black/20" />
             </div>

          </div>

          {/* =========================================================
              LAYER 1: INTERFAZ FLOTANTE (SIN CAMBIOS EN ANIMACIÓN)
          ========================================================== */}
          <div className="absolute top-0 bottom-0 left-0 z-20 w-full max-w-lg p-8 md:p-12 flex items-start gap-6 pointer-events-none">
            
            {/* Controles */}
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

            {/* Lista de Pasos */}
            <div className="flex flex-col gap-3 w-full pointer-events-auto">
              {WORKFLOW_STEPS.map((step, index) => {
                const isActive = activeStep === index;
                const label = SHORT_LABELS[index];

                return (
                  <div key={index} className="transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
                    {/* ESTADO ACTIVO */}
                    {isActive ? (
                      <div className="bg-[#1D1D1F]/70 backdrop-blur-xl border border-white/10 rounded-[1.5rem] p-6 w-full md:w-[380px] shadow-2xl animate-scaleIn origin-top-left">
                        <div className="flex flex-col gap-3">
                          <h3 className="text-lg font-bold text-white tracking-wide">
                            {label}. <span className="text-white font-medium">{step.title}</span>
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
                      /* ESTADO INACTIVO */
                      <button 
                        onClick={() => handleChange(index)}
                        className="group flex items-center gap-3 bg-[#333336]/60 hover:bg-[#454548]/80 backdrop-blur-md border border-white/5 rounded-full pl-2 pr-5 py-2 w-fit transition-all duration-300"
                      >
                         <div className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center group-hover:border-white transition-colors">
                            <Plus className="w-3 h-3 text-white" />
                         </div>
                         <span className="text-sm font-bold text-white tracking-wide">
                           {label}
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
        /* ANIMACIÓN DE ENTRADA (DESDE LA DERECHA) */
        @keyframes slideInRight {
          from { 
            opacity: 0; 
            transform: translateX(80px) scale(1.05); 
            filter: blur(8px);
          }
          to { 
            opacity: 1; 
            transform: translateX(0) scale(1); 
            filter: blur(0);
          }
        }
        .animate-slideInRight {
          animation: slideInRight 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }

        /* ANIMACIÓN DE SALIDA (HACIA LA IZQUIERDA) */
        @keyframes slideOutLeft {
          from { 
            opacity: 1; 
            transform: translateX(0) scale(1); 
          }
          to { 
            opacity: 0; 
            transform: translateX(-80px) scale(0.95); 
          }
        }
        .animate-slideOutLeft {
          animation: slideOutLeft 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }

        /* ANIMACIÓN DE TARJETAS (Mantenida) */
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95) translateY(-10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-scaleIn {
          animation: scaleIn 0.4s cubic-bezier(0.32, 0.72, 0, 1) forwards;
        }
      `}</style>
    </section>
  );
}