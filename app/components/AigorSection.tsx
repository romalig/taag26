"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, Zap, Microscope, Timer } from "lucide-react";

export default function AigorSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Solo se activa una vez cuando entra en pantalla (threshold 0.1 = 10% visible)
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Desconectamos para que no se anime de nuevo al subir y bajar
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative bg-[#050505] py-24 lg:py-40 overflow-hidden text-white border-t border-white/5"
    >
      
      {/* 1. FONDO AMBIENTAL (Entrada suave) */}
      <div 
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-600 via-purple-600 to-[#FF270A] rounded-full pointer-events-none transition-all duration-[2s] ease-out ${
          isVisible ? "opacity-25 blur-[120px] scale-100" : "opacity-0 blur-0 scale-50"
        }`} 
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
        
        {/* 2. EL "CHIP" / EMBLEMA CENTRAL (Animación de subida y encendido) */}
        <div 
          className={`relative mb-16 transition-all duration-[1.5s] ease-out ${
            isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-90"
          }`}
        >
            {/* Sombra de color detrás del chip (El HALO) */}
            {/* Se expande al aparecer y luego queda estático */}
            <div className={`absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-[#FF270A] rounded-3xl blur transition-opacity duration-[2s] delay-300 ${
               isVisible ? "opacity-60" : "opacity-0"
            }`}></div>
            
            {/* El Chip Físico */}
            <div className="relative w-64 h-64 md:w-80 md:h-80 bg-[#0a0a0a] rounded-3xl border border-white/10 shadow-2xl flex flex-col items-center justify-center p-8 overflow-hidden">
                {/* Brillo metálico superior */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-50"></div>
                
                {/* Logo AiGOR Tipográfico */}
                <h2 className="text-6xl md:text-7xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-white/60">
                  AiGOR
                </h2>
                <span className="mt-2 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-[#FF270A]">
                  RNA Technology
                </span>

                {/* Reflejo sutil */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
            </div>
        </div>

        {/* 3. CONTENIDO DE TEXTO (Aparece con un pequeño retraso) */}
        <div className={`transition-all duration-1000 delay-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          <h3 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
            Sensitivity redefined. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-[#FF270A]">
              10,000x Amplified.
            </span>
          </h3>

          <p className="text-lg text-white/60 max-w-2xl mx-auto mb-16 leading-relaxed">
            The first RNA-based detection technology that bypasses traditional limits. 
            Detect metabolically active microorganisms without waiting for long enrichments.
          </p>
        </div>

        {/* 4. GRID DE CARACTERÍSTICAS (Aparece al final) */}
        <div className={`grid md:grid-cols-3 gap-6 w-full max-w-5xl transition-all duration-1000 delay-700 ${
           isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          
          {/* Card 1 */}
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-left hover:bg-white/10 transition-colors">
            <Microscope className="w-8 h-8 text-purple-400 mb-4" />
            <div className="text-4xl font-bold text-white mb-2">10,000x</div>
            <p className="text-sm font-bold uppercase tracking-wider text-white/40 mb-2">Higher Sensitivity</p>
            <p className="text-sm text-white/60">
              By targeting RNA instead of DNA, AiGOR detects active cells with unprecedented precision compared to traditional PCR.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-left hover:bg-white/10 transition-colors">
            <Timer className="w-8 h-8 text-[#FF270A] mb-4" />
            <div className="text-4xl font-bold text-white mb-2">From 3 hours</div>
            <p className="text-sm font-bold uppercase tracking-wider text-white/40 mb-2">Time to Result</p>
            <p className="text-sm text-white/60">
              Skip or reduce the long enrichment steps. Go from sample to actionable decision in a single shift.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-left hover:bg-white/10 transition-colors">
            <Zap className="w-8 h-8 text-blue-400 mb-4" />
            <div className="text-4xl font-bold text-white mb-2">Protocol Zero</div>
            <p className="text-sm font-bold uppercase tracking-wider text-white/40 mb-2">Enrichment Required</p>
            <p className="text-sm text-white/60">
              Direct detection capabilities mean you stop growing pathogens and start eliminating them.
            </p>
          </div>

        </div>

        {/* CTA */}
        <div className={`mt-16 transition-all duration-1000 delay-1000 ${
           isVisible ? "opacity-100" : "opacity-0"
        }`}>
          <button className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white hover:text-[#FF270A] transition-colors group">
            Explore AiGOR Products
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
}