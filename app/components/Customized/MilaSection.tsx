"use client";

import Image from "next/image"; 
import { Check, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function MilaSection() {
  
  // Estado y Ref para detectar si la tarjeta de "Barra" está visible
  const [isBarActive, setIsBarActive] = useState(false);
  const barCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsBarActive(entry.isIntersecting);
      },
      { threshold: 0.4 } 
    );

    if (barCardRef.current) {
      observer.observe(barCardRef.current);
    }

    return () => {
      if (barCardRef.current) {
        observer.unobserve(barCardRef.current);
      }
    };
  }, []);

  return (
    // CAMBIO: Aumentado el padding inferior a pb-56 para dar MUCHO aire al final
    <section className="bg-white pt-24 pb-56 px-6 md:px-10 relative overflow-hidden">
      
      {/* 1. ENCABEZADO */}
      <div className="max-w-4xl mx-auto text-center mb-24">
        
        {/* Título */}
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-10 font-sora">
          <span className="text-aurora-clip inline-block">
            Unlock the full spectrum of diagnostic potential.
          </span>
        </h2>

        {/* Texto descriptivo: HOOK + TEXTO ORIGINAL */}
        <div className="space-y-6 text-lg md:text-xl text-[#111111]/70 font-medium leading-relaxed max-w-3xl mx-auto">
          <p>
            MILA, our AI-driven platform navigates through millions of genomic combinations to design and select the precise primer and probe set for your targets.
            For any application, MILA ensures the best PCR kits are achieved, fast and effortless.
          </p>
        </div>
      </div>

      {/* 2. GRID DE TARJETAS (4 COLUMNAS) */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16">
        
        {/* --- 1. AI DRIVEN INTELLIGENCE (LOGO MILA) --- */}
        {/* Eliminado hover:scale */}
        <div className="group">
          <div className="relative w-full aspect-[3/4.5] bg-[#F5F5F7] rounded-[2.5rem] overflow-hidden mb-6 flex items-center justify-center">
             <div className="relative w-[50%] h-[50%]">
                 <Image
                   src="/logo_mila.png" 
                   alt="Mila Logo"
                   fill
                   className="object-contain drop-shadow-sm"
                 />
             </div>
          </div>
          <div className="px-2">
            <h3 className="text-lg font-bold text-[#111111] mb-2 font-sora">Ai-Driven Intelligence.</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              MILA analyzes genomic data with a proprietary neural network, identifying patterns invisible to traditional design methods.
            </p>
          </div>
        </div>

        {/* --- 2. PRECISION SELECTION (CHECK) --- */}
        <div className="group">
          <div className="relative w-full aspect-[3/4.5] bg-gradient-to-br from-blue-600 to-purple-700 rounded-[2.5rem] overflow-hidden mb-6 flex items-center justify-center">
            <div className="w-32 h-32 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 shadow-2xl">
                <Check className="w-16 h-16 text-white" />
            </div>
          </div>
          <div className="px-2">
            <h3 className="text-lg font-bold text-[#111111] mb-2 font-sora">Precision Selection.</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              It doesn't just design; it selects. MILA filters through noise to find the single best primer/probe set for your target.
            </p>
          </div>
        </div>

        {/* --- 3. HIGHLY MULTIPLEX DESIGN (FONDO NEGRO + PUNTOS MULTICOLOR) --- */}
        <div className="group">
          <div className="relative w-full aspect-[3/4.5] bg-black rounded-[2.5rem] overflow-hidden mb-6 flex items-center justify-center">
            
            <div className="relative w-full h-full">
                 {/* PUNTOS FLOTANTES CON COLORES ÚNICOS */}
                 
                 {/* 1. Cyan */}
                 <div className="absolute top-[20%] left-[15%] w-2 h-2 bg-cyan-400 rounded-full animate-float" style={{ animationDelay: '0s' }}></div>
                 
                 {/* 2. Indigo */}
                 <div className="absolute top-[45%] left-[25%] w-3 h-3 bg-indigo-500 rounded-full animate-float" style={{ animationDelay: '1.5s', animationDuration: '4s' }}></div>
                 
                 {/* 3. Blue */}
                 <div className="absolute top-[70%] left-[10%] w-1.5 h-1.5 bg-blue-500 rounded-full animate-float" style={{ animationDelay: '0.5s', animationDuration: '3.5s' }}></div>

                 {/* 4. Lime */}
                 <div className="absolute top-[15%] left-[60%] w-2.5 h-2.5 bg-lime-400 rounded-full animate-float" style={{ animationDelay: '0.8s', animationDuration: '4.5s' }}></div>
                 
                 {/* 5. Emerald */}
                 <div className="absolute top-[40%] left-[80%] w-2 h-2 bg-emerald-400 rounded-full animate-float" style={{ animationDelay: '2s', animationDuration: '3.8s' }}></div>
                 
                 {/* 6. Green */}
                 <div className="absolute top-[65%] left-[55%] w-3 h-3 bg-green-500 rounded-full animate-float" style={{ animationDelay: '1.2s', animationDuration: '4.2s' }}></div>

                 {/* 7. Red */}
                 <div className="absolute top-[30%] left-[45%] w-2 h-2 bg-red-500 rounded-full animate-float" style={{ animationDelay: '0.9s', animationDuration: '3.7s' }}></div>
                 
                 {/* 8. Fuchsia */}
                 <div className="absolute top-[60%] left-[35%] w-2.5 h-2.5 bg-fuchsia-500 rounded-full animate-float" style={{ animationDelay: '2.5s', animationDuration: '4.8s' }}></div>
                 
                 {/* 9. Rose */}
                 <div className="absolute top-[80%] left-[70%] w-2 h-2 bg-rose-400 rounded-full animate-float" style={{ animationDelay: '1.1s', animationDuration: '3.2s' }}></div>

                 {/* 10. Purple */}
                 <div className="absolute top-[25%] left-[85%] w-3 h-3 bg-purple-500 rounded-full animate-float" style={{ animationDelay: '1.8s', animationDuration: '5s' }}></div>
                 
                 {/* 11. Yellow */}
                 <div className="absolute top-[10%] left-[35%] w-2 h-2 bg-yellow-400 rounded-full animate-float" style={{ animationDelay: '0.2s', animationDuration: '3.6s' }}></div>
                 
                 {/* 12. Orange */}
                 <div className="absolute top-[75%] left-[30%] w-2.5 h-2.5 bg-orange-400 rounded-full animate-float" style={{ animationDelay: '2.2s', animationDuration: '4.1s' }}></div>
                 
                 {/* Puntos de profundidad (Blancos translúcidos) */}
                 <div className="absolute top-[50%] left-[50%] w-1 h-1 bg-white/50 rounded-full animate-float" style={{ animationDelay: '3s' }}></div>
            </div>

          </div>
          <div className="px-2">
            <h3 className="text-lg font-bold text-[#111111] mb-2 font-sora">Highly Multiplex Design.</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Simultaneously detect multiple targets in a single reaction, maximizing efficiency without losing sensitivity.
            </p>
          </div>
        </div>

        {/* --- 4. FAST & EFFORTLESS --- */}
        <div 
          ref={barCardRef} 
          className="group"
        >
          <div className="relative w-full aspect-[3/4.5] bg-[#111111] rounded-[2.5rem] overflow-hidden mb-6 flex flex-col items-center justify-center">
            <div className="relative w-48 h-32 bg-white/5 rounded-xl border border-white/10 p-4 backdrop-blur-sm">
                <div className="w-full h-2 bg-white/10 rounded-full mb-3 overflow-hidden">
                    <div 
                        className={`h-full bg-green-500 rounded-full transition-all duration-[1500ms] ease-out ${isBarActive ? 'w-full' : 'w-0'}`} 
                    />
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                        <Zap className="w-4 h-4 text-green-400 fill-current" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] text-white font-bold uppercase">Design Complete</span>
                        <span className="text-[8px] text-white/50">100% accurate</span>
                    </div>
                </div>
            </div>
          </div>
          <div className="px-2">
            <h3 className="text-lg font-bold text-[#111111] mb-2 font-sora">Fast & Effortless.</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              From concept to kit design in record time. Reduce months of R&D to a simple, streamlined process.
            </p>
          </div>
        </div>

      </div>

      <style jsx>{`
        .text-aurora-clip {
          background: linear-gradient(
            115deg, 
            #D92408, 
            #7e22ce, 
            #f59e0b, 
            #db2777, 
            #D92408
          );
          background-size: 300% 300%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: gradientPulse 8s ease infinite alternate;
        }

        @keyframes gradientPulse {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }

        /* Animación Float para los puntos */
        @keyframes float {
          0%, 100% { transform: translate(0, 0); opacity: 0.8; }
          25% { transform: translate(5px, -10px); opacity: 0.4; }
          50% { transform: translate(0, -20px); opacity: 1; }
          75% { transform: translate(-5px, -10px); opacity: 0.4; }
        }

        .animate-float {
          animation: float 5s ease-in-out infinite;
        }

        .font-sora {
          font-family: var(--font-sora), sans-serif;
        }
      `}</style>
    </section>
  );
}