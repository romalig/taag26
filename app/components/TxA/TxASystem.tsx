"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function TxASystem() {
  const [isVisible, setIsVisible] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // isIntersecting es true cuando el logo entra en la pantalla
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          // Al ponerlo en false cuando sale, la animación se repite al volver a hacer scroll
          setIsVisible(false);
        }
      },
      { threshold: 0.1 } // Se activa cuando el 10% del elemento es visible
    );

    if (logoRef.current) observer.observe(logoRef.current);
    return () => {
      if (logoRef.current) observer.unobserve(logoRef.current);
    };
  }, []);

  return (
    <div className="relative w-full bg-[#f3f4f6] -mt-px py-32 md:py-48 flex flex-col items-center justify-center overflow-hidden">
      
      <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center relative">
        
        {/* 1. LOGO TxA ANIMADO (Sin librerías externas) */}
        {/* Usamos Tailwind transition-all y translate-y para animar basado en el estado isVisible */}
        <div 
          ref={logoRef}
          className={`relative w-24 h-24 md:w-32 md:h-32 z-10 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-[200px] opacity-0'
          }`}
        >
          <Image
            src="/LogoTxANB.png"
            alt="TAAG Xpert Assistant Logo"
            fill
            className="object-contain drop-shadow-sm"
            priority
          />
        </div>

        {/* 2. CONTENEDOR DE TEXTO (LA MÁSCARA) */}
        {/* Sigue actuando como la pared frontal (z-20) que oculta el logo */}
        <div className="relative z-20 bg-[#f3f4f6] w-[120%] pt-10 flex flex-col items-center">
          
          <h2 className="text-4xl md:text-6xl font-extrabold text-[#111111] mb-16 font-sora tracking-tight leading-tight">
            TAAG Xpert Assistant. <br className="hidden md:block"/>
            <span className="text-gray-400">Your AI-powered ecosystem.</span>
          </h2>

          <p className="text-lg md:text-xl text-gray-500 font-medium leading-relaxed max-w-3xl mx-auto px-8">
            TxA is a complete AI ecosystem built to manage your entire microbiology operation. 
            From digital field sampling and predictive algorithms that optimize your operations, 
            to automated, real-time result analysis, TxA connects every dot.
          </p>

        </div>

      </div>

      <style jsx>{`
        .font-sora { 
          font-family: var(--font-sora), sans-serif; 
        }
      `}</style>
    </div>
  );
}