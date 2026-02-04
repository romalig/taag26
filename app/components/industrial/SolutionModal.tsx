"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useModal } from "./ModalProvider";

export default function SolutionModal() {
  const { isOpen, modalContent, closeModal } = useModal();
  
  // Estado 1: Controla si el componente existe en el DOM (Montaje)
  const [isRendered, setIsRendered] = useState(false);
  
  // Estado 2: Controla las clases CSS (Animación visual)
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // 1. Montamos el componente en el DOM (aún invisible/desplazado)
      setIsRendered(true);
      
      // 2. Pequeño delay para permitir que el navegador "vea" el estado inicial antes de animar
      const timer = setTimeout(() => {
        setIsAnimating(true);
      }, 10);
      return () => clearTimeout(timer);
    } else {
      // 1. Iniciamos la animación de salida
      setIsAnimating(false);
      
      // 2. Esperamos a que termine la transición (700ms) para desmontar
      const timer = setTimeout(() => {
        setIsRendered(false);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Si no debe renderizarse, devolvemos null
  if (!isRendered) return null;

  return (
    <div 
      className={`
        fixed inset-0 z-[100] flex items-end md:items-center justify-center 
        transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]
        ${isAnimating ? 'backdrop-blur-xl bg-black/40' : 'backdrop-blur-none bg-transparent'}
      `}
    >
      
      {/* Overlay Clickable para cerrar */}
      {/* Usamos un div transparente para capturar el click fuera */}
      <div className="absolute inset-0 block cursor-default" onClick={closeModal} />

      {/* TARJETA MODAL */}
      <div 
        className={`
          relative w-full max-w-5xl 
          /* Móvil: Pegado abajo, alto casi completo */
          h-[92vh] md:h-auto md:max-h-[85vh]
          
          /* Estilos de Contenedor */
          bg-white rounded-t-[2.5rem] md:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row
          
          /* ANIMACIÓN APPLE */
          transform transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]
          will-change-transform
          
          /* AQUÍ ES LA CLAVE: Usamos 'isAnimating' en lugar de 'isOpen' */
          ${isAnimating 
            /* Estado FINAL (Abierto): En su lugar (0px), opaco, tamaño normal */
            ? 'translate-y-0 opacity-100 scale-100' 
            
            /* Estado INICIAL (Cerrado/Montando): 
               - Móvil: Totalmente abajo (100%)
               - Desktop: Un poco abajo (32px) y más pequeño (95%)
            */
            : 'translate-y-[100%] md:translate-y-32 opacity-0 md:scale-95' 
          }
        `}
        // Detener la propagación del click para que no cierre al hacer click dentro del modal
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón Cerrar Flotante */}
        <button 
          onClick={closeModal}
          className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-gray-100/80 hover:bg-gray-200 backdrop-blur-md flex items-center justify-center transition-all active:scale-90"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {/* CONTENIDO DEL MODAL */}
        {modalContent}
        
      </div>
    </div>
  );
}