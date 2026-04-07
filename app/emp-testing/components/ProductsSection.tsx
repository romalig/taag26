"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ProductsSection() {
  return (
    <section className="py-24 md:py-32 bg-[#111111] text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* ============================================== */}
        {/* CABECERA */}
        {/* ============================================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 mb-16 md:mb-20 w-full">
           <div>
              <span className="text-[#FF270A] font-bold tracking-widest uppercase text-xs mb-3 md:mb-4 block">
                THE ELEVIA™ SUITE
              </span>
              <h2 className="text-3xl md:text-5xl font-black leading-tight tracking-tighter text-white">
                AiGOR-Powered <br /> <span className="text-gray-400">Multiplex Kits.</span>
              </h2>
           </div>
           {/* 1. Texto comienza más a la izquierda (cambiado max-w-sm a max-w-lg) */}
           <p className="text-sm md:text-base text-gray-400 leading-relaxed font-medium md:text-right md:max-w-lg pb-1 shrink-0">
              Extreme sensitivity and multiplex capabilities targeting RNA to bypass traditional biological limits.
           </p>
        </div>

        {/* GRILLA DE PRODUCTOS BENTO BOX */}
        <div className="w-full grid grid-cols-1 md:grid-cols-6 gap-5">
          
          {/* ============================================== */}
          {/* 1. TARJETA PRINCIPAL 1: SALMONELLA */}
          {/* ============================================== */}
          {/* Ajuste de min-h para dar más espacio al texto bajado */}
          <div className="md:col-span-3 bg-[#1A1A1A] rounded-[2rem] border border-white/5 relative flex flex-col overflow-hidden min-h-[480px] md:min-h-[550px] group hover:border-white/10 transition-colors">
            
            {/* IMAGEN DE FONDO */}
            <div className="absolute inset-0 w-full h-[250px] md:h-[300px] z-0 pointer-events-none">
              <Image 
                src="/Sal11.png" 
                alt="Elevia Salmonella" 
                fill 
                className="object-cover object-center opacity-80 group-hover:opacity-100 transition-opacity duration-500" 
              />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#1A1A1A] to-transparent"></div>
            </div>

            {/* CONTENIDO TEXTUAL: 2. Textos más abajo (mt-[220px] md:mt-[280px]) */}
            <div className="relative z-10 flex flex-col flex-1 p-8 md:p-10 mt-[220px] md:mt-[280px]">
              <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-3">
                Elevia Salmonella
              </h3>
              <p className="text-gray-400 font-medium leading-relaxed text-sm md:text-base mb-8">
                Ultra-fast Salmonella detection in as little as 3 hours, and 6 hours, for environmental and food samples, respectively.
              </p>
              
              {/* 3. Enlace Learn More (Blanco) */}
              <div className="mt-auto pt-4">
                <Link href="#" className="inline-flex items-center gap-2.5 text-sm md:text-base font-semibold text-white hover:text-gray-300 transition-colors group">
                   Learn more
                   <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* ============================================== */}
          {/* 2. TARJETA PRINCIPAL 2: SALMONELLA + EB */}
          {/* ============================================== */}
          <div className="md:col-span-3 bg-[#1A1A1A] rounded-[2rem] border border-white/5 relative flex flex-col overflow-hidden min-h-[480px] md:min-h-[550px] group hover:border-white/10 transition-colors">
            
            {/* IMAGEN DE FONDO */}
            <div className="absolute inset-0 w-full h-[250px] md:h-[300px] z-0 pointer-events-none">
              <Image 
                src="/Sal_EB.png" 
                alt="Elevia Salmonella + EB" 
                fill 
                className="object-cover object-center opacity-80 group-hover:opacity-100 transition-opacity duration-500" 
              />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#1A1A1A] to-transparent"></div>
            </div>

            {/* CONTENIDO TEXTUAL: 2. Textos más abajo */}
            <div className="relative z-10 flex flex-col flex-1 p-8 md:p-10 mt-[220px] md:mt-[280px]">
              <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-3">
                Elevia Salmonella + EB
              </h3>
              <p className="text-gray-400 font-medium leading-relaxed text-sm md:text-base mb-8">
                Simultaneous identification of Salmonella and Enterobacteria in a single reaction, in as little as 3 hours.
              </p>
              
              {/* 3. Enlace Learn More (Blanco) */}
              <div className="mt-auto pt-4">
                <Link href="#" className="inline-flex items-center gap-2.5 text-sm md:text-base font-semibold text-white hover:text-gray-300 transition-colors group">
                   Learn more
                   <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* ============================================== */}
          {/* 3. TARJETAS INFERIORES: COMENTARIO APLICADO (Textos alineados) */}
          {/* ============================================== */}
          
          {/* INFERIOR 1 */}
          <div className="md:col-span-2 bg-[#1A1A1A] rounded-[2rem] border border-white/5 p-8 pb-10 h-[300px] md:h-[320px] relative flex flex-col hover:border-white/10 transition-colors">
            <div className="flex-1 flex flex-col">
              {/* Contenedor de título con altura uniforme para alinear descripciones */}
              <div className="h-16 md:h-20 mb-4 flex items-start">
                <h3 className="text-xl font-bold text-white leading-snug">Elevia Salmonella + Listeria spp.</h3>
              </div>
              <p className="text-sm text-gray-400 font-medium leading-relaxed">
                Simultaneous identification of Salmonella and Listeria spp in a single reaction, in as little as 3 hours.
              </p>
            </div>
            
            <div className="mt-auto pt-6 flex flex-col gap-4">
               <Link href="#" className="inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:text-gray-300 transition-colors group pt-2">
                   Learn more
                   <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
               </Link>
            </div>
          </div>

          {/* INFERIOR 2 */}
          <div className="md:col-span-2 bg-[#1A1A1A] rounded-[2rem] border border-white/5 p-8 pb-10 h-[300px] md:h-[320px] relative flex flex-col hover:border-white/10 transition-colors">
            <div className="flex-1 flex flex-col">
              {/* Contenedor de título con altura uniforme */}
              <div className="h-16 md:h-20 mb-4 flex items-start">
                <h3 className="text-xl font-bold text-white leading-snug">Elevia Listeria spp + L. monocytogenes</h3>
              </div>
              <p className="text-sm text-gray-400 font-medium leading-relaxed">
                Simultaneous identification of Listeria spp. and L. monocytogenes in a single reaction, in as little as 3 hours.
              </p>
            </div>
            
            <div className="mt-auto pt-6 flex flex-col gap-4">
               <Link href="#" className="inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:text-gray-300 transition-colors group pt-2">
                   Learn more
                   <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
               </Link>
            </div>
          </div>

          {/* INFERIOR 3 */}
          <div className="md:col-span-2 bg-[#1A1A1A] rounded-[2rem] border border-white/5 p-8 pb-10 h-[300px] md:h-[320px] relative flex flex-col hover:border-white/10 transition-colors">
            <div className="flex-1 flex flex-col">
              {/* Contenedor de título con altura uniforme */}
              <div className="h-16 md:h-20 mb-4 flex items-start">
                <h3 className="text-xl font-bold text-white leading-snug">Elevia Salmonella + Listeria spp. + L. mono.</h3>
              </div>
              <p className="text-sm text-gray-400 font-medium leading-relaxed overflow-hidden">
                Simultaneous identification of Salmonella + Listeria spp. and L. monocytogenes in a single reaction, in as little as 3 hours.
              </p>
            </div>
            
            <div className="mt-auto pt-6 flex flex-col gap-4">
               <Link href="#" className="inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:text-gray-300 transition-colors group pt-2">
                   Learn more
                   <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
               </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}