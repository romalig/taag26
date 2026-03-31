"use client";

import { Timer, Zap, Dna, FlaskConical } from "lucide-react";

export default function LaboratoryServicesHero() {
  return (
    <main className="w-full bg-white min-h-screen">
      <section className="pt-40 pb-20 px-4 md:px-6 max-w-7xl mx-auto text-center relative overflow-hidden">
        
        {/* Glow de fondo de IndustrialHero */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-b from-gray-50 to-transparent rounded-full blur-3xl -z-10 opacity-60 pointer-events-none" />

        {/* Título y Bajada (IndustrialHero Style) */}
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold text-[#111111] mb-12 md:mb-18 tracking-tight leading-tight md:leading-[1.1] max-w-6xl mx-auto drop-shadow-sm">
          The future of <br className="hidden md:block" />
          <span className="text-gray-400 inline-block">Laboratory Services.</span>
        </h1>

        <p className="text-lg md:text-2xl text-gray-500 max-w-3xl mx-auto font-medium leading-relaxed px-2 mb-16 md:mb-24">
          Discover multiplex and ultra-fast microbiological detection solutions to accelerate decisions, reduce risks, and improve productivity.
        </p>

        {/* ================================================================ */}
        {/* CARACTERÍSTICAS: Iconos individuales formando un gradiente visual*/}
        {/* ================================================================ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-12 md:gap-8 w-full max-w-5xl mx-auto">
          
          {/* Concepto 1 - Inicia en Blue */}
          <div className="flex flex-col items-center text-center group">
            <Timer 
              className="w-6 h-6 md:w-8 md:h-8 mb-3 md:mb-4 group-hover:-translate-y-0.5 transition-transform text-blue-700" 
              strokeWidth={1.5} 
            />
            <p className="text-xs md:text-sm text-gray-500 leading-relaxed max-w-[200px] font-medium">
              <span className="font-bold text-[#111111]">Same-day results.</span> For common pathogens.
            </p>
          </div>

          {/* Concepto 2 - Transición a Purple */}
          <div className="flex flex-col items-center text-center group">
            <Zap 
              className="w-6 h-6 md:w-8 md:h-8 mb-3 md:mb-4 group-hover:-translate-y-0.5 transition-transform text-purple-600" 
              strokeWidth={1.5} 
            />
            <p className="text-xs md:text-sm text-gray-500 leading-relaxed max-w-[200px] font-medium">
              <span className="font-bold text-[#111111]">Fast detection.</span> Spoilage microorganisms.
            </p>
          </div>

          {/* Concepto 3 - Transición a Fuchsia/Pink (Ajustado para mejor contraste) */}
          <div className="flex flex-col items-center text-center group">
            <Dna 
              className="w-6 h-6 md:w-8 md:h-8 mb-3 md:mb-4 group-hover:-translate-y-0.5 transition-transform text-fuchsia-500" 
              strokeWidth={1.5} 
            />
            <p className="text-xs md:text-sm text-gray-500 leading-relaxed max-w-[200px] font-medium">
              <span className="font-bold text-[#111111]">NGS.</span> Next-Generation Sequencing.
            </p>
          </div>

          {/* Concepto 4 - Termina en el Rojo de TAAG */}
          <div className="flex flex-col items-center text-center group">
            <FlaskConical 
              className="w-6 h-6 md:w-8 md:h-8 mb-3 md:mb-4 group-hover:-translate-y-0.5 transition-transform text-[#FF270A]" 
              strokeWidth={1.5} 
            />
            <p className="text-xs md:text-sm text-gray-500 leading-relaxed max-w-[200px] font-medium">
              <span className="font-bold text-[#111111]">Custom assays.</span> Bespoke assay development.
            </p>
          </div>

        </div>

      </section>
    </main>
  );
}