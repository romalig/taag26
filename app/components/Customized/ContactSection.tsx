"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
// Importamos el hook para el modal
import { useCTA } from "@/app/components/CTAProvider";

export default function ContactSection() {
  const { openMeeting } = useCTA();
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Implementamos exactamente el mismo Observer de InnovationsTimeline
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-white py-20 px-6 md:px-10">
      
      <div className="max-w-[1200px] mx-auto font-sora">

        {/* CONTENEDOR DE LA TARJETA */}
        <div className="relative w-full" ref={cardRef}>
            
            {/* EL GLOW DE INNOVATIONSTIMELINE:
               - Implementa tech-bg-animate (shift + breathe)
               - Usa el isVisible del IntersectionObserver
               - -inset-2.5 y rounded-[3rem] asegura que abrace perfecto a la tarjeta sin cortar las esquinas
            */}
            <div 
               className={`absolute -inset-2.5 md:-inset-3 rounded-[3rem] bg-gradient-to-r from-[#FF270A] via-[#7e22ce] to-[#f59e0b] blur-xl md:blur-2xl z-0 transition-all duration-1000 ease-out
               ${isVisible ? 'opacity-40 md:opacity-50 scale-100 tech-bg-animate' : 'opacity-0 scale-95'}`}
            />

            {/* TARJETA BLANCA */}
            <div className="relative z-10 bg-white rounded-[2.5rem] border border-gray-100 px-8 py-10 md:px-16 md:py-14 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">

                {/* TEXTO */}
                <div className="text-center md:text-left max-w-3xl">
                    <h2 className="text-2xl md:text-4xl font-extrabold text-[#111111] mb-3 tracking-tight">
                      Ready to launch?
                    </h2>
                    <p className="text-base md:text-lg text-gray-500 font-medium leading-relaxed">
                      Start using ready-to-deploy kits developed with the power of MILA.
                    </p>
                </div>

                {/* BOTÓN CONECTADO AL MODAL */}
                <div className="flex-shrink-0">
                    <button 
                      onClick={openMeeting}
                      className="group/btn bg-[#111111] text-white text-base font-bold px-8 py-4 rounded-full flex items-center gap-3 hover:bg-[#FF270A] transition-all active:scale-95 shadow-lg shadow-black/10"
                    >
                        Contact Us
                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                </div>

            </div>
        </div>

      </div>

      <style jsx>{`
        .font-sora { font-family: var(--font-sora), sans-serif; }

        /* Animación copiada exactamente de InnovationsTimeline */
        @keyframes shiftGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

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