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

      // Calculamos progreso (0 a 1) mientras la sección está visible
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
    <section ref={sectionRef} className="relative bg-black text-white w-full">
      {/* --- FONDO "TUNEL" STICKY (Se queda fijo mientras bajas) --- */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden z-0">
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)`,
          }}
        >
          {/* Círculo Exterior - Azul Oscuro (Profundidad) */}
          <div
            className="absolute w-[120vw] h-[120vw] rounded-full bg-blue-950/40 blur-[120px] transition-transform duration-75 ease-out origin-center"
            style={{ transform: `scale(${0.8 + scrollProgress * 1.5})` }}
          />

          {/* Círculo Medio - Morado Vivo */}
          <div
            className="absolute w-[80vw] h-[80vw] rounded-full bg-purple-600/50 blur-[100px] transition-transform duration-75 ease-out origin-center"
            style={{ transform: `scale(${0.6 + scrollProgress * 2})` }}
          />

          {/* Círculo Núcleo - ROJO INTENSO (Apple-style: nace fuerte y luego muere a negro) */}
          <div
            className="absolute w-[45vw] h-[45vw] rounded-full bg-[#FF270A] blur-[170px] mix-blend-normal transition-all duration-75 ease-out origin-center"
            style={{
              // Freeze al final para que se sienta “locked” como Apple
              transform: `scale(${scrollProgress > 0.75 ? 1.8 : 0.4 + scrollProgress * 2.5})`,
              // El rojo muere durante la transición a negro
              opacity:
                scrollProgress < 0.6
                  ? 0.9
                  : scrollProgress > 0.75
                  ? 0
                  : 0.9 * (1 - (scrollProgress - 0.6) / (0.75 - 0.6)),
            }}
          />
        </div>

        {/* BLACK FADE OVERLAY – after the red bloom, transition to pure black (Apple-like) */}
        <div
          className="absolute inset-0 bg-black pointer-events-none"
          style={{
            opacity:
              scrollProgress < 0.55
                ? 0
                : scrollProgress > 0.75
                ? 1
                : (scrollProgress - 0.55) / (0.75 - 0.55),
          }}
        />
      </div>

      {/* --- CONTENIDO PRINCIPAL (Se desliza SOBRE el fondo fijo) --- */}
      {/* Usamos mt-[-100vh] para subir el contenido y que empiece sobre el fondo sticky */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-24 -mt-[90vh] flex flex-col items-center">
        {/* 1. HERO VISUAL (Título + Imagen) */}
        <div className="text-center flex flex-col items-center mb-40 pt-20">
          <p className="text-sm md:text-base font-bold tracking-[0.2em] text-white/60 mb-6 uppercase animate-fadeIn">
            Hyper-Fast EMP
          </p>

          <h2 className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-16 drop-shadow-2xl">
            A completely <br />
            transformed <br />
            workflow.
          </h2>

          {/* IMAGEN CENTRAL */}
          <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] flex items-center justify-center">
            <div className="absolute inset-0 bg-black rounded-[3rem] border border-white/10 shadow-2xl flex items-center justify-center z-20 overflow-hidden">
              <div className="text-center relative z-10">
                <span className="text-9xl font-bold text-[#111] drop-shadow-md select-none">
                  Ai
                </span>
              </div>
              <div className="absolute inset-0 rounded-[3rem] shadow-[inset_0_0_50px_rgba(255,255,255,0.15)] pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
            </div>

            <div className="absolute -bottom-12 w-[70%] h-[30px] bg-black/80 blur-2xl rounded-full" />
          </div>
        </div>

        {/* 2. TEXTO DESCRIPTIVO (Aparece al bajar) */}
        <div className="text-center mb-24 max-w-3xl">
          <p className="text-2xl md:text-3xl font-medium text-white leading-relaxed drop-shadow-lg p-6 rounded-3xl backdrop-blur-sm border border-white/5">
            <span className="text-white/50">Immersive speed like never before.</span>{" "}
            <br />
            AiGOR utilizes RNA-based detection to bypass biological limits,
            delivering actionable results in hours, not days.
          </p>
        </div>

        {/* 3. GRID DE TARJETAS (Fondo Glassmorphism para dejar ver el color rojo detrás) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {/* Card 1 */}
          <div className="bg-[#1c1c1e]/80 backdrop-blur-md rounded-[2rem] p-8 min-h-[320px] flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300 border border-white/10 shadow-2xl">
            <div className="mb-6">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                <Activity className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">RNA Sensitivity.</h3>
              <p className="text-sm text-gray-400 font-medium">
                Detects active cells only. No false positives from dead DNA.
              </p>
            </div>
            <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              10k<span className="text-2xl text-gray-500">x</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#1c1c1e]/80 backdrop-blur-md rounded-[2rem] p-0 min-h-[320px] flex flex-col justify-between overflow-hidden relative group hover:scale-[1.02] transition-transform duration-300 border border-white/10 shadow-2xl">
            <div className="p-8 relative z-10">
              <h3 className="text-xl font-bold text-white mb-2">Zero Enrichment.</h3>
              <p className="text-sm text-gray-400 font-medium">Skip the 24h growth step.</p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#FF270A]/20" />
            <div className="p-8 pt-0 relative z-10 mt-auto">
              <Zap className="w-10 h-10 text-[#FF270A] mb-2" />
              <div className="text-3xl font-bold text-white">Direct.</div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#1c1c1e]/80 backdrop-blur-md rounded-[2rem] p-8 min-h-[320px] flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300 border border-white/10 shadow-2xl">
            <div>
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
                <Timer className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Speed redefined.</h3>
              <p className="text-sm text-gray-400 font-medium">From sample to certificate.</p>
            </div>
            <div className="text-5xl font-bold text-white">
              3<span className="text-xl text-gray-500 ml-1">HOURS</span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white/90 backdrop-blur-md rounded-[2rem] p-8 min-h-[320px] flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300 text-black shadow-2xl">
            <div>
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                <Layers className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Seamless Fit.</h3>
              <p className="text-sm text-gray-600 font-medium">
                Integrates with standard LIMS and existing lab workflows.
              </p>
            </div>
            <div className="flex justify-end">
              <ArrowRight className="w-8 h-8 text-black opacity-50" />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 2s ease-out forwards;
        }
      `}</style>
    </section>
  );
}