import Header from "../../components/Header";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Target, Lightbulb } from "lucide-react";

// Importamos nuestra base de datos central
import { CASE_STUDIES } from "@/app/components/data/caseStudies";

// 1. AÑADIMOS "async" Y ACTUALIZAMOS EL TIPO DE LOS PARAMS A "Promise"
export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  
  // 2. HACEMOS AWAIT PARA DESEMPAQUETAR EL SLUG
  const { slug } = await params;

  // 3. Buscamos el caso usando el slug que ya desempaquetamos
  const caseStudy = CASE_STUDIES.find((c) => c.slug === slug);

  if (!caseStudy) {
    notFound();
  }

  return (
    <main className="w-full bg-white min-h-screen">
    <Header theme="hybrid" />
      {/* --- HERO SECTION --- */}
      <section className="relative w-full h-[60vh] min-h-[500px] flex items-end pb-16 md:pb-24">
        {/* Imagen de fondo */}
        <div className="absolute inset-0 z-0">
          <Image 
            src={caseStudy.image} 
            alt={caseStudy.title} 
            fill 
            className="object-cover"
            priority
          />
        </div>
        
        {/* Capas oscuras para legibilidad */}
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent z-10" />

        {/* Contenido Hero */}
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Columna Izquierda: Reto y Solución (8 columnas) */}
            <div className="lg:col-span-8 flex flex-col gap-16">
              
              {/* El Reto */}
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-[#111111]">
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
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-full bg-[#FF270A]/10 flex items-center justify-center text-[#FF270A]">
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

            {/* Columna Derecha: Métricas y Resultados (4 columnas) */}
            <div className="lg:col-span-4 flex flex-col gap-8">
              
              {/* Tarjeta de Impacto Principal */}
              <div className="bg-[#111111] text-white rounded-3xl p-10 shadow-2xl">
                <span className="text-xs font-bold uppercase tracking-widest text-[#FF270A] mb-4 block">
                  Core Impact
                </span>
                <h3 className="text-5xl md:text-6xl font-black tracking-tighter mb-8">
                  {caseStudy.heroMetric}
                </h3>
                
                <div className="w-full h-px bg-white/10 mb-8" />
                
                <h4 className="text-lg font-bold mb-6">Key Results:</h4>
                <ul className="flex flex-col gap-4">
                  {caseStudy.results.map((result, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#FF270A] flex-shrink-0 mt-0.5" />
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
          <button className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#FF270A] text-white text-sm font-bold uppercase tracking-widest hover:bg-[#d92008] transition-all shadow-[0_0_20px_rgba(255,39,10,0.3)] hover:-translate-y-1">
            Talk to an Expert
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

    </main>
  );
}