"use client";

import { Box, Cpu, Globe } from "lucide-react";

export default function ManifestoSection() {
  return (
    <section className="relative bg-[#050505] py-32 overflow-hidden">
      
      {/* Elemento de fondo sutil (Opcional: un brillo muy tenue para dar profundidad) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-white opacity-[0.02] blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center">
        
        {/* HEADLINE: Grande y Bold */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-8 leading-tight">
          Beyond Testing. <br />
          <span className="text-[#FF270A]">Microbiological Intelligence.</span>
        </h2>

        {/* MANIFESTO TEXT: Estilo editorial, fácil de leer */}
        <div className="max-w-3xl mx-auto space-y-6 text-lg md:text-xl text-gray-400 font-medium leading-relaxed">
          <p>
            We are building a future where biological insight is <span className="text-white">immediate and actionable</span>. 
            We turn detection into prevention, and data into decision.
          </p>
          <p>
            By fusing AI-designed molecular tools with ultra-fast analytics, 
            TAAG evolves traditional microbiology into <span className="text-white">true intelligence</span>.
          </p>
        </div>

        {/* DIVIDER: Línea sutil */}
        <div className="h-px w-24 bg-white/20 mx-auto my-16" />

        {/* ACCESSIBILITY PILLARS: 3 Columnas limpias */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          
          {/* Pillar 1 */}
          <div className="flex flex-col items-center group">
            <div className="mb-4 p-4 rounded-full bg-white/5 border border-white/10 group-hover:border-[#FF270A]/50 transition-colors">
              <Box className="w-6 h-6 text-white group-hover:text-[#FF270A] transition-colors" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Ready-to-use Kits</h3>
            <p className="text-sm text-gray-500 max-w-[200px]">
              Standardized molecular kits for immediate deployment in your lab.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="flex flex-col items-center group">
            <div className="mb-4 p-4 rounded-full bg-white/5 border border-white/10 group-hover:border-[#FF270A]/50 transition-colors">
              <Cpu className="w-6 h-6 text-white group-hover:text-[#FF270A] transition-colors" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">AI-Driven Customization</h3>
            <p className="text-sm text-gray-500 max-w-[200px]">
              Bespoke assays designed by algorithms to target your specific strains.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="flex flex-col items-center group">
            <div className="mb-4 p-4 rounded-full bg-white/5 border border-white/10 group-hover:border-[#FF270A]/50 transition-colors">
              <Globe className="w-6 h-6 text-white group-hover:text-[#FF270A] transition-colors" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Global Service Hubs</h3>
            <p className="text-sm text-gray-500 max-w-[200px]">
              Regional labs providing advanced outsourcing and support.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}