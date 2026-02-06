"use client";

import { Check, Cpu, Zap, Layers } from "lucide-react"; // Iconos para las tarjetas

export default function MilaSection() {
  return (
    <section className="bg-white py-24 px-6 md:px-10 relative overflow-hidden">
      
      {/* 1. ENCABEZADO CONECTADO (EL PUENTE DE COLOR) */}
      <div className="max-w-4xl mx-auto text-center mb-24">
        {/* Título con gradiente animado (Mismo ADN que el Hero anterior) */}
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-8 font-sora">
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

      {/* 2. GRID DE TARJETAS (ESTILO APPLE / BENTO) */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
        
        {/* --- TARJETA 1: AI DRIVEN (Clean White) --- */}
        <div className="group">
          <div className="relative w-full aspect-[3/4.5] bg-[#F5F5F7] rounded-[2.5rem] overflow-hidden mb-6 flex items-center justify-center transition-transform duration-500 group-hover:scale-[1.02]">
            {/* Visual: Red neuronal abstracta */}
            <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gray-200 rounded-full blur-3xl" />
            </div>
            <div className="relative z-10 flex flex-col items-center">
                <Cpu className="w-20 h-20 text-[#111111] stroke-[1] mb-4" />
                <span className="text-sm font-bold uppercase tracking-widest text-gray-400">Core Engine</span>
            </div>
          </div>
          {/* Texto Inferior */}
          <div className="px-2">
            <h3 className="text-lg font-bold text-[#111111] mb-2 font-sora">Ai-Driven Intelligence.</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              MILA analyzes genomic data with a proprietary neural network, identifying patterns invisible to traditional design methods.
            </p>
          </div>
        </div>

        {/* --- TARJETA 2: SELECTION (Vibrant Blue/Purple) --- */}
        <div className="group">
          <div className="relative w-full aspect-[3/4.5] bg-gradient-to-br from-blue-600 to-purple-700 rounded-[2.5rem] overflow-hidden mb-6 flex items-center justify-center transition-transform duration-500 group-hover:scale-[1.02]">
            {/* Visual: Target / Selección */}
            <div className="w-32 h-32 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 shadow-2xl">
                <Check className="w-16 h-16 text-white" />
            </div>
          </div>
          {/* Texto Inferior */}
          <div className="px-2">
            <h3 className="text-lg font-bold text-[#111111] mb-2 font-sora">Precision Selection.</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              It doesn't just design; it selects. MILA filters through noise to find the single best primer/probe set for your target.
            </p>
          </div>
        </div>

        {/* --- TARJETA 3: MILLIONS OF COMBINATIONS (Aurora Glow) --- */}
        <div className="group">
          <div className="relative w-full aspect-[3/4.5] bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden mb-6 flex items-center justify-center transition-transform duration-500 group-hover:scale-[1.02] shadow-sm">
            {/* Visual: El "Siri Glow" animado */}
            <div className="absolute inset-0 bg-aurora-vibrant opacity-20 blur-[60px] animate-pulse-slow" />
            <div className="relative z-10 text-center">
               <Layers className="w-20 h-20 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-600 stroke-[1] mx-auto mb-2" />
               <span className="text-4xl font-extrabold text-[#111111] font-sora">10M+</span>
               <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-1">Combinations</p>
            </div>
          </div>
          {/* Texto Inferior */}
          <div className="px-2">
            <h3 className="text-lg font-bold text-[#111111] mb-2 font-sora">Infinite Scale.</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Exploring millions of potential genetic combinations in seconds to ensure high specificity and sensitivity.
            </p>
          </div>
        </div>

        {/* --- TARJETA 4: FAST & EFFORTLESS (Dark UI Style) --- */}
        <div className="group">
          <div className="relative w-full aspect-[3/4.5] bg-[#111111] rounded-[2.5rem] overflow-hidden mb-6 flex flex-col items-center justify-center transition-transform duration-500 group-hover:scale-[1.02]">
            {/* Visual: UI abstracta de "Carga completada" */}
            <div className="relative w-48 h-32 bg-white/5 rounded-xl border border-white/10 p-4 backdrop-blur-sm">
                <div className="w-full h-2 bg-white/10 rounded-full mb-3 overflow-hidden">
                    <div className="h-full w-full bg-green-500 rounded-full animate-load-bar" />
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                        <Zap className="w-4 h-4 text-green-400 fill-current" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] text-white font-bold uppercase">Design Complete</span>
                        <span className="text-[8px] text-white/50">0.4s processing time</span>
                    </div>
                </div>
            </div>
          </div>
          {/* Texto Inferior */}
          <div className="px-2">
            <h3 className="text-lg font-bold text-[#111111] mb-2 font-sora">Fast & Effortless.</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              From concept to kit design in record time. Reduce months of R&D to a simple, streamlined process.
            </p>
          </div>
        </div>

      </div>

      <style jsx>{`
        /* Reutilizamos la animación y colores del Hero para consistencia */
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

        @keyframes loadBar {
            0% { width: 0%; }
            100% { width: 100%; }
        }
        .animate-load-bar {
            animation: loadBar 1.5s ease-out forwards;
        }

        .font-sora {
          font-family: var(--font-sora), sans-serif;
        }
      `}</style>
    </section>
  );
}