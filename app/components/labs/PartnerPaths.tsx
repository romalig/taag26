"use client";

import { Check, Microscope, Factory, Sparkles } from "lucide-react";

// --- DATOS DE LA MATRIZ ---
const MATRIX_DATA = [
  { 
    feature: "Smart Lab Design", 
    description: "Custom layout and workflow optimization for your facility.",
    service: false, food: false, build: true 
  },
  { 
    feature: "Hardware Advisory", 
    description: "Unbiased guidance on selecting the exact instruments you need.",
    service: false, food: false, build: true 
  },
  { 
    feature: "Next-Gen Assays", 
    description: "Upgrade to Multiplex PCR and rapid RNA enrichment.",
    service: true, food: true, build: true 
  },
  { 
    feature: "Comprehensive Training", 
    description: "Hands-on education for your team on all TAAG protocols.",
    service: true, food: true, build: true 
  },
  { 
    feature: "Custom Validations", 
    description: "Tailored matrix verifications to ensure absolute accuracy.",
    service: true, food: true, build: true 
  },
  { 
    feature: "Software Integration", 
    description: "Seamlessly connect our predictive AI to your existing operations.",
    service: true, food: true, build: true 
  },
  { 
    feature: "24/7 Expert Support", 
    description: "Round-the-clock scientific and technical assistance.",
    service: true, food: true, build: true 
  },
  { 
    feature: "Commercial Enablement", 
    description: "Strategic sales support to help you close more B2B deals.",
    service: true, food: false, build: false 
  },
  { 
    feature: "Marketing Collateral", 
    description: "Premium white-label assets to position your lab in the market.",
    service: true, food: false, build: false 
  },
  { 
    feature: "R&D on Demand", 
    description: "We design proprietary multiplex panels exclusively for your lab.",
    service: true, food: true, build: true 
  },
  { 
    feature: "Lead Generation", 
    description: "We route local testing demands directly to your facility.",
    service: true, food: false, build: false 
  },
];

const MAIN_GOALS = {
  service: "Maximized Margins & Scale",
  food: "Zero Recalls & Fast Release",
  build: "Rapid Setup & Operation"
};

export default function PartnerMatrix() {
  return (
    // 1. Redujimos el padding top (pt-8 md:pt-12) para pegar la sección hacia arriba
    <section className="relative w-full bg-white pt-8 pb-24 md:pt-12 md:pb-32 flex flex-col items-center justify-center">
      
      {/* CABECERA GENERAL */}
      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 mb-12 md:mb-20 text-center">
        <span className="text-xs font-bold tracking-[0.2em] text-[#FF270A] uppercase mb-4 block">
          Tailored for your operation
        </span>
        <h2 className="text-3xl md:text-5xl font-bold text-black tracking-tight mb-4">
          Choose your path to the next level.
        </h2>
        <p className="text-black font-medium text-base md:text-lg max-w-2xl mx-auto">
          Every laboratory is different. Discover exactly what our ecosystem provides based on your unique business model.
        </p>
      </div>

      {/* ============================================================== */}
      {/* 1. VISTA DESKTOP (Tabla Minimalista Estilo Apple)                */}
      {/* ============================================================== */}
      <div className="hidden md:block w-full max-w-[1100px] mx-auto px-8">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="pb-8 pr-8 w-[40%] align-bottom border-b border-gray-200">
                <span className="text-xl font-bold text-black">Ecosystem Capabilities</span>
              </th>
              <th className="pb-8 px-4 w-[20%] border-b border-gray-200">
                <div className="flex flex-col items-center justify-end h-full text-center">
                  <Microscope className="w-8 h-8 text-blue-600 mb-4" strokeWidth={1.5} />
                  <span className="text-base font-bold text-black leading-tight">Service<br/>Laboratories</span>
                </div>
              </th>
              <th className="pb-8 px-4 w-[20%] border-b border-gray-200">
                <div className="flex flex-col items-center justify-end h-full text-center">
                  <Factory className="w-8 h-8 text-orange-500 mb-4" strokeWidth={1.5} />
                  <span className="text-base font-bold text-black leading-tight">Food &<br/>Beverage</span>
                </div>
              </th>
              <th className="pb-8 px-4 w-[20%] border-b border-gray-200">
                <div className="flex flex-col items-center justify-end h-full text-center">
                  <Sparkles className="w-8 h-8 text-purple-600 mb-4" strokeWidth={1.5} />
                  <span className="text-base font-bold text-black leading-tight">Turnkey<br/>Laboratories</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {MATRIX_DATA.map((row, idx) => (
              <tr key={idx}>
                <td className="py-6 pr-8 border-b border-gray-200">
                  <p className="text-base font-bold text-black mb-1">
                    {row.feature}
                  </p>
                  <p className="text-[14px] text-black leading-snug">
                    {row.description}
                  </p>
                </td>
                <td className="py-6 px-4 text-center border-b border-gray-200">
                  {row.service && <Check className="w-[22px] h-[22px] text-[#0071e3] mx-auto" strokeWidth={3} />}
                </td>
                <td className="py-6 px-4 text-center border-b border-gray-200">
                  {row.food && <Check className="w-[22px] h-[22px] text-[#0071e3] mx-auto" strokeWidth={3} />}
                </td>
                <td className="py-6 px-4 text-center border-b border-gray-200">
                  {row.build && <Check className="w-[22px] h-[22px] text-[#0071e3] mx-auto" strokeWidth={3} />}
                </td>
              </tr>
            ))}

            {/* Fila Final: Business Outcome */}
            <tr>
              <td className="py-8 pr-8 text-base font-bold text-black">
                Business Outcome
              </td>
              <td className="py-8 px-2 text-center">
                <span className="text-[13px] font-bold text-black">{MAIN_GOALS.service}</span>
              </td>
              <td className="py-8 px-2 text-center">
                <span className="text-[13px] font-bold text-black">{MAIN_GOALS.food}</span>
              </td>
              <td className="py-8 px-2 text-center">
                <span className="text-[13px] font-bold text-black">{MAIN_GOALS.build}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>


      {/* ============================================================== */}
      {/* 2. VISTA MÓVIL (Lista Plana, sin cajas redondeadas)              */}
      {/* ============================================================== */}
      <div className="block md:hidden w-full px-4 relative">
        
        {/* Cabecera Flotante (Sticky Header) */}
        <div className="sticky top-[60px] z-30 bg-white/95 backdrop-blur-md pt-4 pb-4 border-b border-gray-200 mb-2 -mx-4 px-4 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]">
           <div className="grid grid-cols-3 gap-1">
              <div className="flex flex-col items-center text-center">
                 <Microscope className="w-6 h-6 text-blue-600 mb-2" strokeWidth={1.5} />
                 <span className="text-[10px] font-bold text-black leading-tight">Service<br/>Labs</span>
              </div>
              <div className="flex flex-col items-center text-center">
                 <Factory className="w-6 h-6 text-orange-500 mb-2" strokeWidth={1.5} />
                 <span className="text-[10px] font-bold text-black leading-tight">Food &<br/>Bev</span>
              </div>
              <div className="flex flex-col items-center text-center">
                 <Sparkles className="w-6 h-6 text-purple-600 mb-2" strokeWidth={1.5} />
                 <span className="text-[10px] font-bold text-black leading-tight">Turnkey<br/>Labs</span>
              </div>
           </div>
        </div>

        {/* Listado Plano */}
        <div className="flex flex-col">
           {MATRIX_DATA.map((row, idx) => (
              <div key={idx} className="flex flex-col py-5 border-b border-gray-200">
                 
                 <div className="pb-4">
                    <h4 className="text-[16px] font-bold text-black mb-1 leading-tight">{row.feature}</h4>
                    <p className="text-[14px] text-black leading-snug">{row.description}</p>
                 </div>
                 
                 {/* 2. Eliminamos los border-l border-gray-200 de aquí */}
                 <div className="grid grid-cols-3 pt-2">
                    <div className="flex items-center justify-center">
                       {row.service && <Check className="w-[20px] h-[20px] text-[#0071e3]" strokeWidth={3} />}
                    </div>
                    <div className="flex items-center justify-center">
                       {row.food && <Check className="w-[20px] h-[20px] text-[#0071e3]" strokeWidth={3} />}
                    </div>
                    <div className="flex items-center justify-center">
                       {row.build && <Check className="w-[20px] h-[20px] text-[#0071e3]" strokeWidth={3} />}
                    </div>
                 </div>

              </div>
           ))}

           {/* Fila Final: Business Outcome (Estilo plano) */}
           <div className="flex flex-col py-6">
               <div className="pb-4 text-center">
                  <h4 className="text-[15px] font-bold text-black">Business Outcome</h4>
               </div>
               {/* 2. Eliminamos los border-l border-gray-200 de aquí también */}
               <div className="grid grid-cols-3">
                  <div className="flex items-center justify-center px-1 text-center">
                     <span className="text-[11px] font-bold text-black leading-tight">{MAIN_GOALS.service}</span>
                  </div>
                  <div className="flex items-center justify-center px-1 text-center">
                     <span className="text-[11px] font-bold text-black leading-tight">{MAIN_GOALS.food}</span>
                  </div>
                  <div className="flex items-center justify-center px-1 text-center">
                     <span className="text-[11px] font-bold text-black leading-tight">{MAIN_GOALS.build}</span>
                  </div>
               </div>
           </div>

        </div>
      </div>

    </section>
  );
}