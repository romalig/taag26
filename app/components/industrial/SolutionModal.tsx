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
      const timer = setTimeout(() => setIsRendered(false), 1000); // 1s para cerrar
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isRendered) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-center">
      
      {/* 1. BACKDROP (Fondo borroso fijo) */}
      <div 
        className={`
          fixed inset-0 bg-black/40 transition-all duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)]
          ${isAnimating ? 'backdrop-blur-xl opacity-100' : 'backdrop-blur-none opacity-0'}
        `}
        onClick={closeModal} // Click en fondo cierra
      />

      {/* 2. WRAPPER SCROLLEABLE (Maneja el scroll de la página modal) */}
      <div 
        className="absolute inset-0 overflow-y-auto overflow-x-hidden scroll-smooth py-12 md:py-20 px-4 flex items-start justify-center"
        onClick={closeModal} // Click en áreas vacías cierra
      >
        
        {/* 3. TARJETA MODAL (Crece con el contenido) */}
        <div 
          className={`
            relative 
            /* Ancho controlado: 95% en móvil para ver fondo, ancho fijo en desktop */
            w-[95%] md:w-full max-w-5xl 
            
            /* Altura automática: La tarjeta crece lo que necesite */
            h-auto
            
            /* Estilos */
            bg-white rounded-[2.5rem] shadow-2xl
            
            /* ANIMACIÓN (Desde abajo hacia su posición natural) */
            transform transition-all duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)]
            
            ${isAnimating 
              ? 'translate-y-0 opacity-100 scale-100' 
              : 'translate-y-24 opacity-0 scale-95' 
            }
          `}
          // Evitar que clicks dentro de la tarjeta cierren el modal
          onClick={(e) => e.stopPropagation()}
        >
          {/* Botón Cerrar Flotante */}
          <button 
            onClick={closeModal}
            className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-gray-100/80 hover:bg-gray-200 backdrop-blur-md flex items-center justify-center transition-all active:scale-90"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>

          {/* CONTENIDO (Sin scroll interno forzado) */}
          <div className="w-full">
             {modalContent}
          </div>
          
        </div>
      </div>
    </div>
  );
}