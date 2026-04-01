"use client";

import { CheckCircle2, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function LabCapabilities() {
  return (
    // Estructura idéntica al Header exterior
    <section className="w-full bg-[#F4F4F5] py-20 md:py-32 px-6 border-t border-gray-200/50">
      
      {/* Contenedor idéntico al contenedor interno del Header (max-w + px-6 mx-auto) 
          Esto asegura alineación perfecta con el logo TAAG */}
      <div className="max-w-7xl px-6 mx-auto">
        
        {/* Header de la sección + Tarjeta ISO */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 mb-16 md:mb-24">
          
          {/* Títulos alineados a la izquierda */}
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-bold text-[#111111] mb-6 tracking-tight leading-tight">
              Comprehensive analytical capabilities, managed
            </h2>
            <p className="text-base md:text-xl text-gray-600 font-medium leading-relaxed">
              Enable your facility to deliver the highest standard of food safety and quality, without having to build and manage complex internal microbiology workflows.
            </p>
          </div>

          {/* Tarjeta Blanca ISO 17025 (SIMPLEZA: Sin sombra) */}
          <div className="bg-white rounded-[2rem] p-6 md:p-8 border border-gray-100 max-w-sm w-full shrink-0 flex items-start gap-5 transition-transform hover:-translate-y-1 duration-300">
            {/* SIMPLEZA: Icono solo, sin fondo rojo */}
            <ShieldCheck className="w-10 h-10 text-[#FF270A] shrink-0 mt-1" strokeWidth={1.5} />
            <div>
              <h4 className="font-bold text-[#111111] text-lg mb-2 leading-tight">ISO 17025 <br/>Accredited</h4>
              <p className="text-sm text-gray-500 font-medium leading-relaxed">
                Our services operate under strict international standards of quality and technical competence.
              </p>
            </div>
          </div>

        </div>

        {/* Grilla de Servicios (3 columnas) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12 md:gap-y-16">
          
          {/* Servicio 1 */}
          <div className="flex items-start gap-4">
            {/* ELEGANCIA: Solo el ticket dentro del círculo, sin fondo rojo */}
            <CheckCircle2 className="mt-1 w-6 h-6 text-[#FF270A] shrink-0" strokeWidth={2} />
            <div>
              <h4 className="font-bold text-[#111111] text-base md:text-lg mb-2 leading-snug">
                Same day detection of common pathogens
              </h4>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                Leverage molecular technology to rapidly detect Salmonella, Listeria, and E. coli, enabling faster product release and reducing warehousing costs.
              </p>
            </div>
          </div>

          {/* Servicio 2 */}
          <div className="flex items-start gap-4">
            <CheckCircle2 className="mt-1 w-6 h-6 text-[#FF270A] shrink-0" strokeWidth={2} />
            <div>
              <h4 className="font-bold text-[#111111] text-base md:text-lg mb-2 leading-snug">
                Rapid molecular detection of spoilage microorganisms
              </h4>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                Identify yeasts, molds, and acidophilic bacteria to prevent off-flavors and package swelling before distribution.
              </p>
            </div>
          </div>

          {/* Servicio 3 */}
          <div className="flex items-start gap-4">
            <CheckCircle2 className="mt-1 w-6 h-6 text-[#FF270A] shrink-0" strokeWidth={2} />
            <div>
              <h4 className="font-bold text-[#111111] text-base md:text-lg mb-2 leading-snug">
                Next Generation Sequencing (NGS)
              </h4>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                Deep genomic insights for strain confirmation, facility traceability, and definitive root-cause analysis of contamination events.
              </p>
            </div>
          </div>

          {/* Servicio 4 */}
          <div className="flex items-start gap-4">
            <CheckCircle2 className="mt-1 w-6 h-6 text-[#FF270A] shrink-0" strokeWidth={2} />
            <div>
              <h4 className="font-bold text-[#111111] text-base md:text-lg mb-2 leading-snug">
                Routine microbiology and classical testing
              </h4>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                Reliable, ISO-certified traditional plating methods for regulatory compliance and baseline hygiene monitoring.
              </p>
            </div>
          </div>

          {/* Servicio 5 */}
          <div className="flex items-start gap-4">
            <CheckCircle2 className="mt-1 w-6 h-6 text-[#FF270A] shrink-0" strokeWidth={2} />
            <div>
              <h4 className="font-bold text-[#111111] text-base md:text-lg mb-2 leading-snug">
                TxA Integration
              </h4>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                Automate your environmental monitoring program. Connect your lab results with our AI-powered ecosystem to track trends and optimize sampling plans.
              </p>
            </div>
          </div>

          {/* Servicio 6 */}
          <div className="flex items-start gap-4">
            <CheckCircle2 className="mt-1 w-6 h-6 text-[#FF270A] shrink-0" strokeWidth={2} />
            <div>
              <h4 className="font-bold text-[#111111] text-base md:text-lg mb-2 leading-snug">
                Technical and scientific support
              </h4>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                Partner with our expert microbiologists for method selection, complex result interpretation, and troubleshooting.
              </p>
            </div>
          </div>

          {/* Servicio 7 */}
          <div className="flex items-start gap-4">
            <CheckCircle2 className="mt-1 w-6 h-6 text-[#FF270A] shrink-0" strokeWidth={2} />
            <div>
              <h4 className="font-bold text-[#111111] text-base md:text-lg mb-2 leading-snug flex items-center gap-2">
                Custom molecular solutions
              </h4>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                Harness MILA, our proprietary AI software, to design highly specific, non-interacting primers for your unique, high-capacity multiplex challenges.{" "}
                <Link href="/mila" className="text-[#FF270A] hover:underline font-bold inline-flex items-center gap-1 mt-1">
                  Learn more <ArrowRight className="w-3 h-3" />
                </Link>
              </p>
            </div>
          </div>

          {/* Servicio 8 */}
          <div className="flex items-start gap-4">
            <CheckCircle2 className="mt-1 w-6 h-6 text-[#FF270A] shrink-0" strokeWidth={2} />
            <div>
              <h4 className="font-bold text-[#111111] text-base md:text-lg mb-2 leading-snug">
                Advanced microbiological services
              </h4>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                Offload complex and demanding workflows—like challenge studies and shelf-life validations—that are not easily executed at the plant level.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}