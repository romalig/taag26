"use client";

import { useState, useEffect, useRef } from "react";
// Eliminamos Layers ya que ahora usaremos texto para el 4to concepto
import { Zap, Timer, Activity } from "lucide-react";

export default function AigorImpactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // 1. Manejo del Scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
      setScrollProgress(Math.max(0, Math.min(1, progress)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); 
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Manejo del Mouse
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Detección simple para reducir el efecto en dispositivos táctiles si es necesario,
      // pero por ahora confiamos en la optimización CSS.
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-black text-white w-full min-h-screen">
      
      {/* --- FONDO STICKY OPTIMIZADO --- */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden z-0">
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform: `translate(${mousePos.x * -5}px, ${mousePos.y * -5}px)`, 
          }}
        >
          {/* Círculos de fondo con optimización 'will-change-transform' y menor blur en móvil */}
          <div
            className="absolute w-[150vw] h-[150vw] md:w-[100vw] md:h-[100vw] rounded-full bg-blue-950/40 blur-[60px] md:blur-[120px] transition-transform duration-75 ease-out origin-center will-change-transform"
            style={{ transform: `scale(${0.8 + scrollProgress * 1.2})` }}
          />
          <div
            className="absolute w-[100vw] h-[100vw] md:w-[70vw] md:h-[70vw] rounded-full bg-purple-600/40 blur-[40px] md:blur-[100px] transition-transform duration-75 ease-out origin-center will-change-transform"
            style={{ transform: `scale(${0.6 + scrollProgress * 1.8})` }}
          />
          <div
            className="absolute w-[60vw] h-[60vw] md:w-[35vw] md:h-[35vw] rounded-full bg-[#FF270A] blur-[50px] md:blur-[150px] mix-blend-normal transition-all duration-75 ease-out origin-center will-change-transform"
            style={{
              transform: `scale(${scrollProgress > 0.75 ? 1.8 : 0.4 + scrollProgress * 2.2})`,
              opacity: scrollProgress < 0.6 ? 0.8 : scrollProgress > 0.75 ? 0 : 0.8 * (1 - (scrollProgress - 0.6) / (0.75 - 0.6)),
            }}
          />
        </div>
        <div className="absolute inset-0 bg-black pointer-events-none" style={{ opacity: scrollProgress < 0.25 ? 0 : scrollProgress > 0.75 ? 1 : (scrollProgress - 0.55) / (0.75 - 0.55) }} />
      </div>

      {/* --- CONTENIDO PRINCIPAL --- */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-6 pb-24 -mt-[100vh] pt-28 md:pt-36 flex flex-col items-center">
        
        {/* 1. HERO VISUAL (TÍTULO) */}
        <div className="text-center flex flex-col items-center mb-8 md:mb-10 animate-fade-in-up">
          <p className="text-[10px] md:text-xs font-bold tracking-[0.25em] text-white/60 mb-3 uppercase">
            powered by AiGOR
          </p>

          <h2 className="text-3xl md:text-6xl font-bold tracking-tighter leading-[1.1] md:leading-[0.95] drop-shadow-2xl">
            The Next Generation <br />
            of Microbiological <br />
            Solutions.
          </h2>
        </div>

        {/* --- 2. EL "CHIP" AiGOR (LIMPIO) --- */}
        <div className="relative mb-8 md:mb-12">
            {/* SE ELIMINÓ EL DIV DEL HALO DE LUZ QUE CAUSABA EL CUADRO SEMI-TRANSPARENTE */}
            
            <div className="relative w-40 h-40 md:w-52 md:h-52 bg-[#0a0a0a] rounded-[2rem] border border-white/10 flex flex-col items-center justify-center p-6 overflow-hidden">
                <div className="relative z-30 flex flex-col items-center">
                  <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">
                    AiGOR
                  </h2>
                  <span className="mt-1.5 text-[8px] md:text-[10px] font-bold uppercase tracking-[0.35em] text-[#FF270A]">
                    RNA Technology
                  </span>
                </div>
            </div>
        </div>

        {/* 3. TEXTO DESCRIPTIVO */}
        <div className="text-center mb-24 md:mb-32 max-w-2xl animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <p className="text-base md:text-xl font-medium text-white leading-relaxed drop-shadow-lg px-4">
            <span className="text-white">Speed and accuracy like never before.</span>{" "} 
            <br className="hidden md:block" />
            <span className="text-white/80 font-normal">AiGOR utilizes RNA-based detection to bypass biological limits,
            delivering actionable results in hours.</span>
          </p>
        </div>

        {/* 4. CARACTERÍSTICAS MINIMALISTAS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-12 md:gap-8 w-full max-w-5xl mx-auto animate-fade-in-up" style={{ animationDelay: '700ms' }}>
          
          {/* Concepto 1 */}
          <div className="flex flex-col items-center text-center">
            <Timer className="w-6 h-6 md:w-8 md:h-8 text-white mb-3 md:mb-4" strokeWidth={1.5} />
            <p className="text-xs md:text-sm text-white/80 leading-relaxed max-w-[200px]">
              <span className="font-bold text-white">Results as fast as 3 hours.</span> Skip the long enrichment steps.
            </p>
          </div>

          {/* Concepto 2 */}
          <div className="flex flex-col items-center text-center">
            <Activity className="w-6 h-6 md:w-8 md:h-8 text-white mb-3 md:mb-4" strokeWidth={1.5} />
            <p className="text-xs md:text-sm text-white/80 leading-relaxed max-w-[200px]">
              <span className="font-bold text-white">1 CFU/sample sensitivity.</span> Maximum precision and reliability.
            </p>
          </div>

          {/* Concepto 3 */}
          <div className="flex flex-col items-center text-center">
            <Zap className="w-6 h-6 md:w-8 md:h-8 text-white mb-3 md:mb-4" strokeWidth={1.5} />
            <p className="text-xs md:text-sm text-white/80 leading-relaxed max-w-[200px]">
              <span className="font-bold text-white">10,000x higher sensitivity.</span> Compared to traditional real-time PCR.
            </p>
          </div>

          {/* Concepto 4 */}
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center justify-center h-6 md:h-8 mb-3 md:mb-4">
              <span className="text-base md:text-lg text-white tracking-widest uppercase">RNA</span>
            </div>
            <p className="text-xs md:text-sm text-white/80 leading-relaxed max-w-[200px]">
              <span className="font-bold text-white">RNA detection.</span> Targeting only active cells.
            </p>
          </div>

        </div>

      </div>

      <style jsx>{`
        /* Animación estándar de fade-in hacia arriba */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
}