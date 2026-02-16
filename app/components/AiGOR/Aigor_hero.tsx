"use client";

import { useState, useEffect, useRef } from "react";
import { Zap, Timer, Activity, ArrowRight, Layers } from "lucide-react";

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
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-black text-white w-full min-h-screen">
      
      {/* --- FONDO STICKY --- */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden z-0">
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform: `translate(${mousePos.x * -5}px, ${mousePos.y * -5}px)`, // Movimiento más sutil
          }}
        >
          {/* Círculos de fondo (ligeramente ajustados para no competir con el chip más pequeño) */}
          <div
            className="absolute w-[150vw] h-[150vw] md:w-[100vw] md:h-[100vw] rounded-full bg-blue-950/30 blur-[80px] md:blur-[120px] transition-transform duration-75 ease-out origin-center"
            style={{ transform: `scale(${0.8 + scrollProgress * 1.2})` }}
          />
          <div
            className="absolute w-[100vw] h-[100vw] md:w-[70vw] md:h-[70vw] rounded-full bg-purple-600/40 blur-[60px] md:blur-[100px] transition-transform duration-75 ease-out origin-center"
            style={{ transform: `scale(${0.6 + scrollProgress * 1.8})` }}
          />
          <div
            className="absolute w-[60vw] h-[60vw] md:w-[35vw] md:h-[35vw] rounded-full bg-[#FF270A] blur-[90px] md:blur-[150px] mix-blend-normal transition-all duration-75 ease-out origin-center"
            style={{
              transform: `scale(${scrollProgress > 0.75 ? 1.8 : 0.4 + scrollProgress * 2.2})`,
              opacity: scrollProgress < 0.6 ? 0.8 : scrollProgress > 0.75 ? 0 : 0.8 * (1 - (scrollProgress - 0.6) / (0.75 - 0.6)),
            }}
          />
        </div>
        <div className="absolute inset-0 bg-black pointer-events-none" style={{ opacity: scrollProgress < 0.25 ? 0 : scrollProgress > 0.75 ? 1 : (scrollProgress - 0.55) / (0.75 - 0.55) }} />
      </div>

      {/* --- CONTENIDO PRINCIPAL --- */}
      {/* Ajustado el padding superior (pt-28 md:pt-36) para que todo el bloque suba y quede centrado en la primera pantalla */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-6 pb-24 -mt-[100vh] pt-28 md:pt-36 flex flex-col items-center">
        
        {/* 1. HERO VISUAL (TÍTULO) - Tamaños reducidos */}
        <div className="text-center flex flex-col items-center mb-8 md:mb-10 animate-fade-in-up">
          <p className="text-[10px] md:text-xs font-bold tracking-[0.25em] text-white/60 mb-3 uppercase">
            powered by AiGOR
          </p>

          {/* Texto reducido de 8xl a 6xl en desktop */}
          <h2 className="text-3xl md:text-6xl font-bold tracking-tighter leading-[1.1] md:leading-[0.95] drop-shadow-2xl">
            The Next Generation <br />
            of Microbiological <br />
            Solutions.
          </h2>
        </div>

        {/* --- 2. EL "CHIP" AiGOR (SIMPLE Y PLANO) --- */}
        {/* Margen inferior reducido (mb-8 md:mb-12) */}
        <div className="relative mb-8 md:mb-12">
            {/* Halo de luz trasero */}
            <div className="absolute -inset-2 bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-[#FF270A]/30 rounded-[2.5rem] blur-xl opacity-70"></div>
            
            {/* El Chip Físico - Eliminados todos los efectos 3D y sombras internas */}
            <div className="relative w-40 h-40 md:w-52 md:h-52 bg-[#0a0a0a] rounded-[2rem] border border-white/10 flex flex-col items-center justify-center p-6 overflow-hidden">
                
                {/* Contenido del logo (Tipografía y texto) */}
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

        {/* 3. TEXTO DESCRIPTIVO - Tamaños reducidos */}
        {/* Margen inferior reducido */}
        <div className="text-center mb-16 md:mb-24 max-w-2xl animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          {/* Texto reducido de 3xl a xl/2xl */}
          <p className="text-base md:text-xl font-medium text-white leading-relaxed drop-shadow-lg px-4 py-2 rounded-3xl backdrop-blur-sm">
            <span className="text-white">Speed and accuracy like never before.</span>{" "} 
            <br/>
            <span className="text-white/60 font-normal">AiGOR utilizes RNA-based detection to bypass biological limits,
            delivering actionable results in hours.</span>
          </p>
        </div>

        {/* 4. GRID DE TARJETAS (Sin cambios mayores, solo el delay) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 w-full animate-fade-in-up" style={{ animationDelay: '700ms' }}>
          {/* Card 1 */}
          <div className="bg-[#1c1c1e]/80 backdrop-blur-md rounded-[2rem] p-6 min-h-[260px] md:min-h-[300px] flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300 border border-white/10 shadow-xl">
            <div className="mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mb-3">
                <Activity className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">RNA Sensitivity.</h3>
              <p className="text-xs text-gray-400 font-medium">Detects active cells only.</p>
            </div>
            <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              10k<span className="text-xl text-gray-500">x</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#1c1c1e]/80 backdrop-blur-md rounded-[2rem] p-0 min-h-[260px] md:min-h-[300px] flex flex-col justify-between overflow-hidden relative group hover:scale-[1.02] transition-transform duration-300 border border-white/10 shadow-xl">
            <div className="p-6 relative z-10">
              <h3 className="text-lg font-bold text-white mb-1">Zero Enrichment.</h3>
              <p className="text-xs text-gray-400 font-medium">Skip the growth step.</p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#FF270A]/20" />
            <div className="p-6 pt-0 relative z-10 mt-auto">
              <Zap className="w-8 h-8 text-[#FF270A] mb-2" />
              <div className="text-2xl md:text-3xl font-bold text-white">Direct.</div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#1c1c1e]/80 backdrop-blur-md rounded-[2rem] p-6 min-h-[260px] md:min-h-[300px] flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300 border border-white/10 shadow-xl">
            <div>
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mb-3">
                <Timer className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Speed redefined.</h3>
              <p className="text-xs text-gray-400 font-medium">Sample to certificate.</p>
            </div>
            <div className="text-4xl md:text-5xl font-bold text-white">
              3<span className="text-lg text-gray-500 ml-1">HOURS</span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white/90 backdrop-blur-md rounded-[2rem] p-6 min-h-[260px] md:min-h-[300px] flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300 text-black shadow-xl">
            <div>
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center mb-3">
                <Layers className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-lg font-bold mb-1">Seamless Fit.</h3>
              <p className="text-xs text-gray-600 font-medium">Integrates with LIMS.</p>
            </div>
            <div className="flex justify-end">
              <ArrowRight className="w-6 h-6 text-black opacity-50" />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Animación estándar de fade-in hacia arriba */
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
}