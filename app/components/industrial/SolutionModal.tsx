"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useModal } from "./ModalProvider";

export default function SolutionModal() {
  const { isOpen, modalContent, closeModal } = useModal();
  
  const [isRendered, setIsRendered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      const timer = setTimeout(() => setIsAnimating(true), 10);
      return () => clearTimeout(timer);
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => setIsRendered(false), 1000); 
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isRendered) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-center">
      
      {/* BACKDROP */}
      <div 
        className={`
          fixed inset-0 bg-black/40 transition-all duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)]
          ${isAnimating ? 'backdrop-blur-xl opacity-100' : 'backdrop-blur-none opacity-0'}
        `}
        onClick={closeModal} 
      />

      {/* WRAPPER SCROLLEABLE */}
      <div 
        className="absolute inset-0 overflow-y-auto overflow-x-hidden scroll-smooth py-12 md:py-20 flex items-start justify-center"
        onClick={closeModal} 
      >
        
        {/* TARJETA MODAL (w-[95vw] para celular, extra ancha en Desktop) */}
        <div 
          className={`
            relative 
            w-[95vw] sm:w-[95%] md:w-full max-w-6xl xl:max-w-7xl 
            h-auto
            bg-white rounded-[2.5rem] shadow-2xl
            transform transition-all duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)]
            ${isAnimating ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-24 opacity-0 scale-95'}
          `}
          onClick={(e) => e.stopPropagation()}
        >
          {/* BOTÓN CERRAR "STICKY" */}
          <div className="sticky top-6 z-50 flex justify-end h-0 overflow-visible pr-6">
            <button 
              onClick={closeModal}
              className="w-10 h-10 rounded-full bg-gray-100/80 hover:bg-gray-200 backdrop-blur-md flex items-center justify-center transition-all active:scale-90 shadow-sm border border-black/5"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* CONTENIDO */}
          <div className="w-full">
             {modalContent}
          </div>
          
        </div>
      </div>
    </div>
  );
}