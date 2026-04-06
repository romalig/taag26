"use client";

import { Maximize, Users, Server, Wrench, CheckCircle2 } from "lucide-react";

export default function ImplementationSection() {
  return (
    <section className="py-24 md:py-32 bg-white text-[#111111]">
      {/* Contenedor alineado milimétricamente con el Header */}
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Cabecera de la sección */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 max-w-5xl">
           <div>
              <span className="text-[#FF270A] font-bold tracking-widest uppercase text-xs mb-4 block">
                TURNKEY IMPLEMENTATION
              </span>
              <h2 className="text-3xl md:text-5xl font-black leading-tight tracking-tighter">
                Minimal footprint.<br /> <span className="text-gray-400">Maximum capability.</span>
              </h2>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-stretch">
          
          {/* COLUMNA IZQUIERDA: Operaciones y Soporte TAAG */}
          <div className="lg:col-span-7 flex flex-col justify-center gap-12">
            
            {/* Texto Descriptivo Principal */}
            <div className="space-y-6 text-base md:text-lg text-gray-600 leading-relaxed font-medium">
              <p>
                Because AiGOR™ eliminates traditional enrichment steps and doesn’t require autoclaves or specialized bulky equipment, deploying an internal molecular laboratory is faster and more accessible than ever.
              </p>
            </div>

            {/* KPIs Operativos (Espacio y Capacidad) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               <div className="bg-[#F5F5F7] p-8 rounded-3xl border border-gray-100 flex flex-col items-start gap-4 hover:border-[#FF270A]/30 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#FF270A] shadow-sm">
                     <Maximize className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-4xl font-black text-[#111111] tracking-tighter mb-1">≈ 16 m²</h4>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Total Footprint</p>
                  </div>
                  <p className="text-sm font-medium text-gray-600 leading-relaxed mt-2">
                    For a fully equipped in-house molecular testing laboratory.
                  </p>
               </div>

               <div className="bg-[#F5F5F7] p-8 rounded-3xl border border-gray-100 flex flex-col items-start gap-4 hover:border-[#FF270A]/30 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#FF270A] shadow-sm">
                     <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-4xl font-black text-[#111111] tracking-tighter mb-1">200</h4>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Samples / Day</p>
                  </div>
                  <p className="text-sm font-medium text-gray-600 leading-relaxed mt-2">
                    Processing capacity managed by just one single lab analyst.
                  </p>
               </div>
            </div>

            {/* TAAG Support & TxA Software */}
            <div className="pt-8 border-t border-gray-100">
               <h4 className="text-xl font-black text-[#111111] mb-6">End-to-End Partnership</h4>
               <ul className="space-y-5">
                 <li className="flex gap-4 items-start">
                    <Wrench className="w-6 h-6 text-[#FF270A] shrink-0 mt-0.5" />
                    <span className="text-gray-700 font-medium text-base">
                      <strong className="text-[#111111]">Installation & Validation:</strong> TAAG oversees the entire setup process and trains your laboratory analyst on both the AiGOR™ protocol and instrument operation.
                    </span>
                 </li>
                 <li className="flex gap-4 items-start">
                    <Server className="w-6 h-6 text-[#FF270A] shrink-0 mt-0.5" />
                    <span className="text-gray-700 font-medium text-base">
                      <strong className="text-[#111111]">TxA™ Software Integration:</strong> Our suite takes control of the entire workflow—from smart sampling to automated data interpretation and publication of results.
                    </span>
                 </li>
               </ul>
            </div>

          </div>

          {/* COLUMNA DERECHA: Tarjeta de CAPEX */}
          <div className="lg:col-span-5 flex flex-col h-full">
             <div className="bg-[#111111] text-white rounded-[2.5rem] p-8 md:p-12 flex flex-col h-full relative overflow-hidden shadow-2xl">
                
                {/* Elemento decorativo de fondo */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF270A]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF270A] mb-8 relative z-10">
                  Capital Investment (CAPEX)
                </span>
                
                <h3 className="text-6xl md:text-7xl font-black tracking-tighter mb-4 leading-none relative z-10">
                  ~ €40k
                </h3>
                <p className="text-sm font-bold text-gray-400 mb-10 relative z-10">
                  Total Estimated Setup Cost
                </p>
                
                <div className="w-full h-px bg-white/10 mb-8 relative z-10" />
                
                {/* Desglose de Costos */}
                <ul className="flex flex-col gap-6 relative z-10 mb-auto">
                  <li className="flex items-start gap-4">
                     <CheckCircle2 className="w-5 h-5 text-[#FF270A] shrink-0 mt-0.5" />
                     <div>
                        <div className="text-lg font-bold text-white mb-1">~ €25,000</div>
                        <div className="text-sm text-gray-400 font-medium leading-relaxed">
                          Open-platform real-time PCR instrument & open-platform RNA extraction robot.
                        </div>
                     </div>
                  </li>
                  <li className="flex items-start gap-4">
                     <CheckCircle2 className="w-5 h-5 text-[#FF270A] shrink-0 mt-0.5" />
                     <div>
                        <div className="text-lg font-bold text-white mb-1">~ €15,000</div>
                        <div className="text-sm text-gray-400 font-medium leading-relaxed">
                          Cabinets and standard minor laboratory equipment.
                        </div>
                     </div>
                  </li>
                </ul>

                <div className="mt-12 pt-8 border-t border-white/10 relative z-10">
                   <p className="text-[10px] text-gray-500 font-medium leading-relaxed">
                     Based on average market pricing in Europe. Actual costs may vary by region and final equipment provider selection.
                   </p>
                </div>

             </div>
          </div>

        </div>
      </div>
    </section>
  );
}