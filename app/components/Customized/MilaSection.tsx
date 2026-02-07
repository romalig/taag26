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
        // Si entra en pantalla, activa la barra. Si sale, la desactiva (reset).
        setIsBarActive(entry.isIntersecting);
      },
      { threshold: 0.4 } // Se activa cuando el 40% de la tarjeta es visible
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
    <section className="bg-white py-24 px-6 md:px-10 relative overflow-hidden">
      
      {/* 1. ENCABEZADO */}
      <div className="max-w-4xl mx-auto text-center mb-24">
        
        {/* Título */}
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-16 font-sora">
          <span className="text-aurora-clip inline-block">
            The full spectrum of possibilities.
          </span>
        </h2>

        {/* Texto descriptivo */}
        <div className="space-y-6 text-lg md:text-xl text-[#111111]/70 font-medium leading-relaxed max-w-3xl mx-auto">
          <p>
            MILA is an Ai-driven platform capable of designing and selecting the best 
            possible primers/probe set through millions of potential combinations.
          </p>
          <p>
            This means that using MILA, for any application you have, the best possible 
            PCR kits are achieved fast and effortless.
          </p>
        </div>
      </div>

      {/* 2. GRID DE TARJETAS (4 COLUMNAS) */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16">
        
        {/* --- 1. AI DRIVEN INTELLIGENCE (LOGO MILA) --- */}
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

        {/* --- 3. HIGHLY MULTIPLEX DESIGN (CHAOS DOTS) --- */}
        <div className="group">
          <div className="relative w-full aspect-[3/4.5] bg-black rounded-[2.5rem] overflow-hidden mb-6 flex items-center justify-center">
            {/* Visual: Canales superpuestos + Puntos dispersos */}
            <div className="relative w-full h-full flex items-center justify-center">
                 {/* Luces de colores de fondo */}
                 <div className="absolute w-32 h-32 bg-blue-500/50 rounded-full blur-[50px] mix-blend-screen animate-pulse-slow" style={{ left: '10%', top: '20%' }}></div>
                 <div className="absolute w-32 h-32 bg-green-500/50 rounded-full blur-[50px] mix-blend-screen animate-pulse-slow" style={{ animationDelay: '1s', left: '40%', top: '10%' }}></div>
                 <div className="absolute w-32 h-32 bg-red-500/50 rounded-full blur-[50px] mix-blend-screen animate-pulse-slow" style={{ animationDelay: '2s', left: '30%', top: '50%' }}></div>
                 <div className="absolute w-32 h-32 bg-purple-500/50 rounded-full blur-[50px] mix-blend-screen animate-pulse-slow" style={{ animationDelay: '3s', left: '60%', top: '40%' }}></div>
                 
                 {/* PUNTOS CAÓTICOS: Tiempos independientes */}
                 <div className="relative z-10 w-full h-full overflow-hidden opacity-90">
                    {/* Azules */}
                    <div className="absolute top-[20%] left-[15%] w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDuration: '2.1s', animationDelay: '0.1s' }}></div>
                    <div className="absolute top-[45%] left-[25%] w-3 h-3 bg-blue-300 rounded-full animate-pulse" style={{ animationDuration: '3.5s', animationDelay: '1.2s' }}></div>
                    <div className="absolute top-[70%] left-[10%] w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" style={{ animationDuration: '1.8s', animationDelay: '0.5s' }}></div>

                    {/* Verdes */}
                    <div className="absolute top-[15%] left-[60%] w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse" style={{ animationDuration: '2.9s', animationDelay: '0.8s' }}></div>
                    <div className="absolute top-[40%] left-[80%] w-2 h-2 bg-green-300 rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationDelay: '1.5s' }}></div>
                    <div className="absolute top-[65%] left-[55%] w-3 h-3 bg-green-500 rounded-full animate-pulse" style={{ animationDuration: '3.2s', animationDelay: '0.3s' }}></div>

                    {/* Rojos/Rosas */}
                    <div className="absolute top-[30%] left-[45%] w-2 h-2 bg-red-400 rounded-full animate-pulse" style={{ animationDuration: '2.4s', animationDelay: '0.9s' }}></div>
                    <div className="absolute top-[60%] left-[35%] w-2.5 h-2.5 bg-pink-500 rounded-full animate-pulse" style={{ animationDuration: '1.9s', animationDelay: '2.0s' }}></div>
                    <div className="absolute top-[80%] left-[70%] w-2 h-2 bg-rose-400 rounded-full animate-pulse" style={{ animationDuration: '3.0s', animationDelay: '0.4s' }}></div>

                    {/* Otros */}
                    <div className="absolute top-[25%] left-[85%] w-3 h-3 bg-purple-400 rounded-full animate-pulse" style={{ animationDuration: '2.7s', animationDelay: '1.1s' }}></div>
                    <div className="absolute top-[10%] left-[35%] w-2 h-2 bg-yellow-300 rounded-full animate-pulse" style={{ animationDuration: '1.6s', animationDelay: '0.2s' }}></div>
                    <div className="absolute top-[75%] left-[30%] w-2.5 h-2.5 bg-orange-300 rounded-full animate-pulse" style={{ animationDuration: '2.2s', animationDelay: '1.7s' }}></div>
                 </div>
            </div>
          </div>
          <div className="px-2">
            <h3 className="text-lg font-bold text-[#111111] mb-2 font-sora">Highly Multiplex Design.</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Simultaneously detect multiple targets in a single reaction, maximizing efficiency without losing sensitivity.
            </p>
          </div>
        </div>

        {/* --- 4. FAST & EFFORTLESS (SCROLL TRIGGER ANIMATION) --- */}
        <div 
          ref={barCardRef} 
          className="group"
        >
          <div className="relative w-full aspect-[3/4.5] bg-[#111111] rounded-[2.5rem] overflow-hidden mb-6 flex flex-col items-center justify-center">
            <div className="relative w-48 h-32 bg-white/5 rounded-xl border border-white/10 p-4 backdrop-blur-sm">
                <div className="w-full h-2 bg-white/10 rounded-full mb-3 overflow-hidden">
                    {/* BARRA DE CARGA:
                       - Depende del estado 'isBarActive'.
                       - Si es true (visible en pantalla) -> w-full.
                       - Si es false (fuera de pantalla) -> w-0 (se resetea).
                    */}
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
        .text-aurora-clip, .bg-aurora-vibrant {
          background: linear-gradient(
            115deg, 
            #D92408, /* Rojo TAAG */
            #7e22ce, /* Morado */
            #f59e0b, /* Naranja */
            #db2777, /* Rosa */
            #D92408
          );
          background-size: 300% 300%;
        }

        .text-aurora-clip {
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: gradientPulse 8s ease infinite alternate;
        }

        @keyframes gradientPulse {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }

        .animate-pulse-slow {
            animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .font-sora {
          font-family: var(--font-sora), sans-serif;
        }
      `}</style>
    </section>
  );
}