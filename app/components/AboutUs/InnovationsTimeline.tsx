"use client";

import { useEffect, useRef, useState } from "react";
import { Dna, Layers, BrainCircuit, Cpu, Activity, Sparkles } from "lucide-react";

export default function InnovationsTimeline() {
  const [isFutureVisible, setIsFutureVisible] = useState(false);
  const futureCardRef = useRef<HTMLDivElement>(null);

  // Observer para encender la sombra tecnológica cuando se llega a la última tarjeta
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsFutureVisible(true);
          observer.disconnect(); // Solo se enciende una vez
        }
      },
      { threshold: 0.3 } // Se activa cuando el 30% de la tarjeta es visible
    );

    if (futureCardRef.current) {
      observer.observe(futureCardRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const innovations = [
    {
      icon: <Dna className="w-5 h-5 text-[#FF270A]" />,
      title: "Multiplex PCR Integration",
      description: "First PCR kit to simultaneously detect Salmonella spp., L. monocytogenes, E. coli, and S. aureus in one single reaction and workflow."
    },
    {
      icon: <Layers className="w-5 h-5 text-[#FF270A]" />,
      title: "Extreme Multiplexing",
      description: "First extreme highly multiplex PCR kit (proprietary technology) capable of detecting and identifying over 50 spoilage microorganisms in a single PCR reaction."
    },
    {
      icon: <BrainCircuit className="w-5 h-5 text-[#FF270A]" />,
      title: "TxA Platform",
      description: "First AI algorithm capable of dynamically modifying the microbiological testing program based on real-time risk assessment."
    },
    {
      icon: <Cpu className="w-5 h-5 text-[#FF270A]" />,
      title: "MILA Platform",
      description: "Development of MILA (proprietary technology): the first AI software able to predict the best molecules for highly multiplexed PCR kits."
    },
    {
      icon: <Activity className="w-5 h-5 text-[#FF270A]" />,
      title: "AiGOR Technology",
      description: "Development of AiGOR (proprietary technology): a revolutionary RNA detection technology delivering over 10,000 times more sensitivity than standard real-time PCR."
    }
  ];

  return (
    <section className="w-full bg-white py-24 md:py-32 border-t border-gray-100 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Encabezado de la Sección */}
        <div className="text-center max-w-3xl mx-auto mb-20 md:mb-28 relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-[#111111] mb-6 font-sora tracking-tight leading-tight">
            A history of firsts. <br className="hidden md:block" />
            <span className="text-[#FF270A]">
              A future of breakthroughs.
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-500 font-medium leading-relaxed">
            We don't just use technology, we invent it. Discover the milestones that have redefined microbiological testing over the years.
          </p>
        </div>

        {/* ESTRUCTURA DE LA LÍNEA DE TIEMPO */}
        <div className="relative w-full">
          
          {/* La Línea Vertical Central */}
          <div className="absolute top-0 bottom-0 left-[20px] md:left-1/2 w-[2px] bg-gray-200 transform md:-translate-x-1/2 z-0" />

          {/* Contenedor de las Tarjetas */}
          <div className="space-y-12 md:space-y-24 relative z-10">
            
            {/* Mapeo de Innovaciones 1 a 5 */}
            {innovations.map((item, index) => {
              const isLeft = index % 2 === 0; // Alternar izquierda/derecha
              return (
                <div key={index} className="relative flex flex-col md:flex-row items-center w-full z-10">
                  
                  {/* Icono Central */}
                  <div className="absolute left-[20px] md:left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-white border-2 border-gray-100 flex items-center justify-center shadow-sm z-20 mt-4 md:mt-0 top-0 md:top-auto">
                    {item.icon}
                  </div>

                  {/* Tarjeta de Contenido */}
                  <div className={`w-full md:w-1/2 pl-[70px] md:pl-0 ${isLeft ? 'md:pr-16' : 'md:pl-16 md:ml-auto'}`}>
                    <div className="bg-[#F4F4F5] rounded-[2rem] p-8 group">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">
                        Innovation 0{index + 1}
                      </span>
                      <h3 className="text-xl font-bold text-[#111111] mb-3 font-sora tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-[15px] text-gray-600 font-medium leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                </div>
              );
            })}

            {/* ========================================================= */}
            {/* EL FUTURO (PUNTO 6) - SOMBRA ANIMADA DINÁMICA             */}
            {/* ========================================================= */}
            <div className="relative flex flex-col md:flex-row items-center w-full z-10 pt-8 md:pt-12">
              
              {/* Icono Central Brillante */}
              <div className="absolute left-[20px] md:left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-[#111111] flex items-center justify-center z-20 mt-4 md:mt-0 top-0 md:top-auto">
                <Sparkles className="w-5 h-5 text-[#FF270A]" />
              </div>

              {/* Contenedor de la Tarjeta del Futuro */}
              <div className="w-full md:w-1/2 pl-[70px] md:pl-16 md:ml-auto">
                
                {/* Ref para el IntersectionObserver */}
                <div className="relative w-full" ref={futureCardRef}>
                  
                  {/* === SOMBRA TECNOLÓGICA (DETRÁS DE LA TARJETA) === */}
                  {/* -inset-2 o -inset-3 hace que el div sea más grande que la tarjeta, saliendo por los bordes. blur-2xl difumina los bordes. */}
                  <div 
                    className={`absolute -inset-2.5 rounded-[2.5rem] bg-gradient-to-r from-[#FF270A] via-[#8B5CF6] to-[#00C7FD] blur-xl md:blur-2xl z-0 transition-all duration-1000 ease-out
                      ${isFutureVisible ? 'opacity-50 md:opacity-60 scale-100 tech-bg-animate' : 'opacity-0 scale-95'}`}
                  />

                  {/* === TARJETA PRINCIPAL === */}
                  {/* Debe tener bg-color, z-10 y position relative para tapar el centro de la sombra */}
                  <div className="relative bg-[#F4F4F5] rounded-[2rem] p-8 md:p-10 z-10 hover:-translate-y-1 transition-transform duration-300">
                    
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] font-bold text-[#FF270A] uppercase tracking-widest">
                        Under Active Development
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-[#111111] mb-4 font-sora tracking-tight">
                      The Next Generation
                    </h3>
                    
                    <p className="text-[15px] md:text-base text-gray-600 font-medium leading-relaxed">
                      Based on <strong className="text-[#111111]">AiGOR</strong> and <strong className="text-[#111111]">MILA</strong>, we are currently developing the next generation of assays. Expect unprecedented capabilities: extremely fast (same-shift results), highly multiplexed, and fully quantitative results.
                    </p>

                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>

      </div>

      <style jsx>{`
        .font-sora { font-family: var(--font-sora), sans-serif; }

        /* Animación para que los colores de la sombra se muevan de lado a lado */
        @keyframes shiftGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* Animación para que la sombra "respire" (pulse sutilmente) */
        @keyframes breatheGlow {
          0%, 100% { transform: scale(1); filter: blur(24px); }
          50% { transform: scale(1.02); filter: blur(28px); }
        }

        .tech-bg-animate {
          background-size: 200% 200%;
          animation: 
            shiftGradient 6s ease infinite,
            breatheGlow 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}