"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, CheckCircle2, ArrowRight, Download } from "lucide-react";
import { useModal } from "./ModalProvider";

export default function SolutionModal() {
  const { isOpen, activeSolution, closeModal } = useModal();
  const [isVisible, setIsVisible] = useState(false);

  // Manejar animación de entrada/salida
  useEffect(() => {
    if (isOpen) setIsVisible(true);
    else setTimeout(() => setIsVisible(false), 300);
  }, [isOpen]);

  if (!isVisible && !isOpen) return null;

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-500 ${isOpen ? 'backdrop-blur-xl bg-black/40' : 'backdrop-blur-none bg-transparent pointer-events-none'}`}>
      
      {/* Overlay Clickable para cerrar */}
      <div className="absolute inset-0" onClick={closeModal} />

      {/* TARJETA MODAL */}
      <div 
        className={`
          relative w-full max-w-4xl h-[90vh] md:h-auto md:max-h-[85vh] 
          bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row
          transform transition-all duration-500 cubic-bezier(0.32, 0.72, 0, 1)
          ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-8'}
        `}
      >
        {/* BOTÓN CERRAR */}
        <button 
          onClick={closeModal}
          className="absolute top-4 right-4 z-50 w-8 h-8 rounded-full bg-gray-100/80 hover:bg-gray-200 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>

        {activeSolution && (
          <>
            {/* COLUMNA IZQUIERDA: VISUAL */}
            <div className="w-full md:w-5/12 bg-[#F5F5F7] relative flex items-center justify-center p-8 min-h-[300px]">
              {activeSolution.image ? (
                <div className="relative w-full h-full min-h-[250px]">
                  <Image 
                    src={activeSolution.image} 
                    alt={activeSolution.title} 
                    fill 
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center h-full w-full opacity-10">
                   {/* Fallback pattern */}
                   <div className="w-24 h-24 rounded-full border-4 border-black" />
                </div>
              )}
            </div>

            {/* COLUMNA DERECHA: CONTENIDO */}
            <div className="w-full md:w-7/12 p-8 md:p-12 overflow-y-auto">
              
              {/* HEADER */}
              <div className="mb-6">
                {activeSolution.tags && (
                  <div className="flex gap-2 mb-3">
                    {activeSolution.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-[#FF270A] bg-[#FF270A]/5 px-2 py-1 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#111111] leading-tight mb-4">
                  {activeSolution.title}
                </h2>
                <p className="text-lg text-gray-500 font-medium leading-relaxed">
                  {activeSolution.description}
                </p>
              </div>

              {/* DETALLES TÉCNICOS (Si existen) */}
              {activeSolution.specs && (
                <div className="mb-8 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Key Specifications</h4>
                  <div className="grid grid-cols-1 gap-3">
                    {activeSolution.specs.map((spec, idx) => (
                      <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0">
                         <span className="text-sm font-semibold text-gray-600">{spec.label}</span>
                         <span className="text-sm font-bold text-[#111111]">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CONTENIDO LARGO GENERADO (Placeholder inteligente) */}
              <div className="prose prose-sm text-gray-500 mb-8">
                 <p>
                   Experience the next level of detection capability. Designed for high-throughput environments, this solution integrates seamlessly with our TxA platform to provide real-time analytics and automated reporting.
                 </p>
                 <ul className="space-y-2 mt-4 list-none pl-0">
                   <li className="flex items-start gap-3">
                     <CheckCircle2 className="w-4 h-4 text-[#FF270A] mt-1 shrink-0" />
                     <span>Validated sensitivity for complex matrices.</span>
                   </li>
                   <li className="flex items-start gap-3">
                     <CheckCircle2 className="w-4 h-4 text-[#FF270A] mt-1 shrink-0" />
                     <span>Compatible with standard laboratory workflows.</span>
                   </li>
                   <li className="flex items-start gap-3">
                     <CheckCircle2 className="w-4 h-4 text-[#FF270A] mt-1 shrink-0" />
                     <span>Full data traceability via AiGOR software.</span>
                   </li>
                 </ul>
              </div>

              {/* ACTIONS */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-100">
                <button className="flex-1 px-6 py-3 bg-[#111111] text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#FF270A] transition-colors flex items-center justify-center gap-2">
                   Request Quote <ArrowRight className="w-3 h-3" />
                </button>
                <button className="flex-1 px-6 py-3 bg-white border border-gray-200 text-[#111111] rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                   Datasheet <Download className="w-3 h-3" />
                </button>
              </div>

            </div>
          </>
        )}
      </div>
    </div>
  );
}