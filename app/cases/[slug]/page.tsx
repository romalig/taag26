"use client";

import Header from "../../components/Header";
import { use } from "react"; // Importamos 'use' para desempaquetar Promesas en el cliente
import { notFound } from "next/navigation";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Target, Lightbulb } from "lucide-react";

// Importamos nuestra base de datos central
import { CASE_STUDIES } from "@/app/components/data/caseStudies";

// IMPORTANTE: Ajusta esta ruta dependiendo de dónde esté tu CTAProvider. 
// Usar "@/app/components/..." asegura que la ruta no falle sin importar qué tan profundo estemos.
import { useCTA } from "@/app/components/CTAProvider";

export default function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  // 1. Usamos el nuevo hook de React para leer el slug sin necesitar 'async'
  const { slug } = use(params);
  
  // 2. Traemos tu función openMeeting
  const { openMeeting } = useCTA();

  const caseStudy = CASE_STUDIES.find((c) => c.slug === slug);

  if (!caseStudy) {
    notFound();
  }

  return (
    <main className="w-full bg-white min-h-screen">
    <Header theme="hybrid" />
      {/* --- HERO SECTION --- */}
      <section className="relative w-full h-[60vh] min-h-[500px] flex items-end pb-16 md:pb-24">
        <div className="absolute inset-0 z-0">
          <Image 
            src={caseStudy.image} 
            alt={caseStudy.title} 
            fill 
            className="object-cover"
            priority
          />
        </div>
        
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent z-10" />

        <div className="relative z-20 max-w-[1200px] mx-auto px-6 w-full">
          <div className="flex flex-col items-start gap-4 mb-6">
            <span className="px-4 py-1.5 rounded-full bg-[#FF270A] text-white text-xs font-bold uppercase tracking-widest">
              {caseStudy.category}
            </span>
            <span className="text-white/80 font-bold uppercase tracking-widest text-sm">
              Client: {caseStudy.company}
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight max-w-4xl">
            {caseStudy.title}
          </h1>
        </div>
      </section>

      {/* --- CONTENIDO PRINCIPAL --- */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1200px] mx-auto px-6">
          {/* AJUSTE 3: Cambiamos lg:gap-16 a lg:gap-24 para separar más el texto del cuadro negro en escritorio */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            
            {/* Columna Izquierda: Reto y Solución */}
            <div className="lg:col-span-7 flex flex-col gap-16">
              
              {/* El Reto */}
              <div>
                {/* AJUSTE 1: Flex col en móvil (ícono arriba), y flex row en md (ícono al lado) */}
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6 md:mb-8">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-[#111111] shrink-0">
                    <Target className="w-6 h-6" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#111111] tracking-tight">
                    The Challenge
                  </h2>
                </div>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-medium">
                  {caseStudy.challenge}
                </p>
              </div>

              {/* La Solución */}
              <div>
                {/* AJUSTE 1: Flex col en móvil, flex row en md */}
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6 md:mb-8">
                  <div className="w-12 h-12 rounded-full bg-[#FF270A]/10 flex items-center justify-center text-[#FF270A] shrink-0">
                    <Lightbulb className="w-6 h-6" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#111111] tracking-tight">
                    The TAAG Solution
                  </h2>
                </div>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-medium">
                  {caseStudy.solution}
                </p>
              </div>

            </div>

            {/* Columna Derecha: Métricas y Resultados */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              
              <div className="bg-[#111111] text-white rounded-3xl p-10 shadow-2xl">
                <span className="text-xs font-bold uppercase tracking-widest text-[#FF270A] mb-4 block">
                  Core Impact
                </span>
                {/* AJUSTE 4: Agregado "break-words" y escalado fluido de texto (text-4xl a 6xl) para evitar cortes en títulos largos */}
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-8 leading-[1.1] break-words">
                  {caseStudy.heroMetric}
                </h3>
                
                <div className="w-full h-px bg-white/10 mb-8" />
                
                <h4 className="text-lg font-bold mb-6">Key Results:</h4>
                <ul className="flex flex-col gap-4">
                  {caseStudy.results.map((result, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#FF270A] shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-gray-300 leading-relaxed">
                        {result}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* --- CALL TO ACTION --- */}
      <section className="bg-[#F4F4F5] py-24 border-t border-gray-200">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-[#111111] mb-8 tracking-tight">
            Ready to achieve similar results?
          </h2>
          {/* AJUSTE 2: Evento onClick conectado exitosamente */}
          <button 
            onClick={openMeeting}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#FF270A] text-white text-sm font-bold uppercase tracking-widest hover:bg-[#d92008] transition-all shadow-[0_0_20px_rgba(255,39,10,0.3)] hover:-translate-y-1"
          >
            Talk to an Expert
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

    </main>
  );
}