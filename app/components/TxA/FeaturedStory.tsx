"use client";

import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function FeaturedStory() {
  return (
    <section className="bg-white py-20 px-6 md:px-10">
      <div className="max-w-[1200px] mx-auto"> 
        
        {/* ENCABEZADO DE SECCIÓN */}
        <div className="mb-20">
            <span className="text-purple-600 font-bold tracking-widest uppercase text-xs mb-3 block">
              Success Stories
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#111111] font-sora tracking-tight">
              Featured Partnership.
            </h2>
        </div>

        {/* TARJETA GRANDE */}
        {/* Eliminado: shadow-sm, border */}
        <div className="bg-[#F5F5F7] rounded-[2.5rem] overflow-hidden flex flex-col lg:flex-row">
          
          {/* 1. COLUMNA IMAGEN */}
          <div className="relative w-full lg:w-1/2 min-h-[300px] lg:min-h-[450px]">
             <Image 
               src="/danone.png" 
               alt="Danone Case Study"
               fill
               className="object-cover"
             />
          </div>

          {/* 2. COLUMNA TEXTO */}
          <div className="w-full lg:w-1/2 p-8 md:p-12 lg:px-20 lg:py-16 flex flex-col justify-center relative z-10">
              
              {/* Tag del Cliente */}
              <div className="mb-6">
                {/* Eliminado: shadow-sm, border */}
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#111111] text-[10px] font-bold uppercase tracking-wider">
                  <CheckCircle2 className="w-3 h-3 text-blue-600" />
                  Top 3 Global Dairy Company
                </span>
              </div>

              {/* Título */}
              <h3 className="text-2xl md:text-3xl font-bold text-[#111111] mb-5 font-sora leading-tight">
                Simultaneous quantification of 3 probiotic strains.
              </h3>

              {/* Texto Descriptivo */}
              <div className="space-y-4 text-gray-500 font-medium text-sm leading-relaxed mb-8">
                <p>
                  Using <span className="text-[#111111] font-semibold">MILA</span>, TAAG engineered a custom triplex qPCR assay capable of detecting and quantifying three distinct probiotic strains in a single reaction directly from finished products.
                </p>
                <p>
                  This breakthrough allows Danone to validate probiotic counts with unprecedented speed and accuracy, streamlining Quality Assurance.
                </p>
              </div>

              {/* Botón CTA */}
              <div>
                <button className="group/btn inline-flex items-center gap-3 text-sm font-bold text-[#111111]">
                    Read full case study
                    {/* Eliminado: shadow-sm, border */}
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center transition-transform group-hover/btn:scale-105">
                        <ArrowRight className="w-4 h-4 text-gray-600 group-hover/btn:text-[#111111] group-hover/btn:translate-x-0.5 transition-all" />
                    </div>
                </button>
              </div>

          </div>

        </div>

      </div>

      <style jsx>{`
        .font-sora {
          font-family: var(--font-sora), sans-serif;
        }
      `}</style>
    </section>
  );
}