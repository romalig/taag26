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
      const timer = setTimeout(() => setIsRendered(false), 1000); // 1000ms para coincidir con la nueva duración
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isRendered) return null;

  return (
    <div 
      className={`
        fixed inset-0 z-[100] flex items-end md:items-center justify-center 
        /* ANIMACIÓN MÁS LENTA (1000ms) */
        transition-all duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)]
        ${isAnimating ? 'backdrop-blur-xl bg-black/40' : 'backdrop-blur-none bg-transparent'}
      `}
    >
      
      {/* Overlay para cerrar */}
      <div className="absolute inset-0 block cursor-default" onClick={closeModal} />

      {/* TARJETA MODAL */}
      <div 
        className={`
          relative 
          /* MÓVIL: Más angosto (95%) y separado del fondo (mb-4) para ver atrás */
          w-[95%] md:w-full max-w-5xl 
          mb-0 md:mb-0
          
          /* ALTURA: Fija para permitir scroll interno */
          h-[85vh] md:h-[85vh]
          
          /* Estilos visuales */
          bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-2xl overflow-hidden
          
          /* ANIMACIÓN */
          transform transition-all duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)]
          will-change-transform
          
          ${isAnimating 
            ? 'translate-y-0 opacity-100 scale-100' 
            : 'translate-y-[100%] md:translate-y-32 opacity-0 md:scale-95' 
          }
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón Cerrar Flotante */}
        <button 
          onClick={closeModal}
          className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-gray-100/80 hover:bg-gray-200 backdrop-blur-md flex items-center justify-center transition-all active:scale-90"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {/* CONTENEDOR DE CONTENIDO */}
        {/* h-full es crítico para que el scroll ocurra aquí dentro */}
        <div className="w-full h-full">
           {modalContent}
        </div>
        
      </div>
    </div>
  );
}