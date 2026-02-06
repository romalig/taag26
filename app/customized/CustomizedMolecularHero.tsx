"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function CustomizedMolecularHero() {
  return (
    <section className="relative w-full h-screen bg-[#FDFBF7] flex flex-col items-center justify-center overflow-hidden">
      
      {/* 1. CONTENEDOR CENTRAL */}
      <div className="relative flex items-center justify-center w-[300px] h-[300px] md:w-[500px] md:h-[500px]">
        
        {/* 2. LOGO CENTRAL (MILA) */}
        {/* Ajusta el tamaño (width/height) según la proporción real de tu logo */}
        <div className="relative z-20 w-32 h-32 md:w-48 md:h-48 flex items-center justify-center">
            <Image
              src="/logo_mila.png" // Asegúrate de tener este archivo en /public
              alt="MILA Logo"
              width={200}
              height={200}
              className="object-contain"
              priority
            />
        </div>

        {/* 3. TEXTO ORBITAL (SVG ROTATORIO) */}
        {/* Este SVG crea el texto circular y lo anima girando infinitamente */}
        <div className="absolute inset-0 z-10 animate-spin-slow pointer-events-none">
          <svg viewBox="0 0 500 500" className="w-full h-full">
            <defs>
              {/* Definimos el camino circular invisible sobre el que se escribe el texto */}
              <path
                id="textCircle"
                d="M 250, 250 m -160, 0 a 160,160 0 1,1 320,0 a 160,160 0 1,1 -320,0"
                fill="none"
              />
            </defs>
            
            <text className="text-[11px] md:text-[13px] font-bold uppercase tracking-[0.25em] fill-black/80">
              <textPath href="#textCircle" startOffset="0%">
                Ai powered molecular design • Ai powered molecular design • Ai powered molecular design •
              </textPath>
            </text>
          </svg>
        </div>

      </div>

      {/* 4. TEXTO INTRODUCTORIO (Opcional, estilo Hims abajo) */}
      <div className="absolute bottom-12 md:bottom-20 text-center px-6 max-w-2xl animate-fadeInUp">
          <h1 className="text-3xl md:text-5xl font-serif text-[#1a1a1a] leading-tight mb-4">
            Precision redefined.
          </h1>
          <p className="text-sm md:text-base text-gray-500 font-medium tracking-wide">
            CUSTOMIZED MOLECULAR SOLUTIONS
          </p>
      </div>

      {/* ESTILOS DE ANIMACIÓN PERSONALIZADOS */}
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
            animation: fadeInUp 1s ease-out forwards 0.5s; /* Delay de 0.5s */
            opacity: 0; /* Estado inicial para el delay */
        }
      `}</style>

    </section>
  );
}