"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function TxASystem() {
  const [isVisible, setIsVisible] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.1 }
    );

    if (logoRef.current) observer.observe(logoRef.current);
    return () => {
      if (logoRef.current) observer.unobserve(logoRef.current);
    };
  }, []);

  return (
    <div className="relative w-full bg-[#f3f4f6] -mt-px py-24 md:py-48 flex flex-col items-center justify-center overflow-hidden">
      
      <div className="w-full max-w-4xl mx-auto text-center flex flex-col items-center relative">
        
        {/* 1. LOGO TxA ANIMADO */}
        <div 
          ref={logoRef}
          className={`relative w-24 h-24 md:w-32 md:h-32 z-10 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-[150px] opacity-0'
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
        {/* w-[110%] asegura que cubra el logo al subir, pero su contenido interno se mantiene centrado y con padding */}
        <div className="relative z-20 bg-[#f3f4f6] w-[110%] pt-8 md:pt-10 flex flex-col items-center">
          
          {/* TÍTULO PRINCIPAL CORREGIDO PARA MÓVIL */}
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-[#111111] mb-10 md:mb-16 font-sora tracking-tight leading-[1.1] md:leading-tight px-8 md:px-0">
            TAAG Xpert Assistant. <br className="hidden md:block"/>
            {/* 'block mt-2' en móvil hace que el subtítulo baje ordenadamente y no se apriete */}
            <span className="text-gray-400 block md:inline mt-2 md:mt-0">Your AI-powered ecosystem.</span>
          </h2>

          <p className="text-base md:text-xl text-gray-500 font-medium leading-relaxed max-w-3xl mx-auto px-10 md:px-8">
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