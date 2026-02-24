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
    description: "Upgrade to Multiplex PCR and 3-6 hours Elevia results.",
    service: true, food: true, build: true 
  },
  { 
    feature: "Comprehensive Training", 
    description: "Hands-on education for your team on all TAAG products and protocols.",
    service: true, food: true, build: true 
  },
  { 
    feature: "Custom Validations", 
    description: "Tailored matrix validations and verifications to ensure absolute accuracy and quality compliance.",
    service: true, food: true, build: true 
  },
  { 
    feature: "Software Integration", 
    description: "Seamlessly connect our laboratory management and predictive AI software to your existing operations.",
    service: true, food: true, build: true 
  },
  { 
    feature: "Continuous Expert Support", 
    description: "Dedicated TAAG Expert for scientific and technical assistance.",
    service: true, food: true, build: true 
  },
  { 
    feature: "Commercial Enablement", 
    description: "Sales support related to TAAG products.",
    service: true, food: false, build: false 
  },
  { 
    feature: "Growth Partnership", 
    description: "Co-branded campaigns fully designed and executed by TAAG to accelerate your growth.",
    service: true, food: false, build: false 
  },
  { 
    feature: "R&D on Demand", 
    description: "Consider us your private R&D division. We design and validate proprietary multiplex panels exclusively for your lab's unique demands.",
    service: true, food: true, build: true 
  },
  { 
    feature: "Authorized Processing Lab", 
    description: "Join our lab network. Receive inflow of samples from our customer base.",
    service: true, food: false, build: false 
  },
];

const MAIN_GOALS = {
  service: "Maximized Margins & Scale",
  food: "Fast, Reliable Results with Low Costs",
  build: "Rapid Setup & Efficient Operation"
};

export default function PartnerMatrix() {
  return (
    <section className="relative w-full bg-white pt-8 pb-24 md:pt-12 md:pb-32 flex flex-col items-center justify-center">
      
      {/* CABECERA GENERAL */}
      {/* Aumentamos el margen inferior (mb-16 md:mb-24) para dar espacio real al parche invisible */}
      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 mb-16 md:mb-24 text-center">
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
              {/* Feature Header (Sticky con parche invisible ajustado al offset exacto) */}
              <th className="sticky top-[60px] lg:top-[80px] z-20 bg-white/95 backdrop-blur-md pt-6 pb-6 pr-8 w-[40%] align-bottom border-b border-gray-200 before:content-[''] before:absolute before:-top-[60px] lg:before:-top-[80px] before:left-0 before:w-full before:h-[60px] lg:before:h-[80px] before:bg-white">
                <span className="text-xl font-bold text-black relative z-10">Ecosystem Capabilities</span>
              </th>
              
              {/* COLUMNA 1: Service Labs */}
              <th className="sticky top-[60px] lg:top-[80px] z-20 bg-white/95 backdrop-blur-md pt-6 pb-6 px-4 w-[20%] border-b border-gray-200 before:content-[''] before:absolute before:-top-[60px] lg:before:-top-[80px] before:left-0 before:w-full before:h-[60px] lg:before:h-[80px] before:bg-white">
                <div className="flex flex-col items-center justify-end h-full text-center relative z-10">
                  <Microscope className="w-8 h-8 text-[#3b82f6] mb-4" strokeWidth={1.5} />
                  <span className="text-base font-bold text-black leading-tight mb-4">Service<br/>Laboratories</span>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1.5">Business Outcome</span>
                  <div className="px-3 py-1.5 bg-[#3b82f6]/10 text-[#3b82f6] rounded-full text-[12px] font-bold w-full max-w-[160px] leading-tight">
                    {MAIN_GOALS.service}
                  </div>
                </div>
              </th>
              
              {/* COLUMNA 2: Food & Beverage */}
              <th className="sticky top-[60px] lg:top-[80px] z-20 bg-white/95 backdrop-blur-md pt-6 pb-6 px-4 w-[20%] border-b border-gray-200 before:content-[''] before:absolute before:-top-[60px] lg:before:-top-[80px] before:left-0 before:w-full before:h-[60px] lg:before:h-[80px] before:bg-white">
                <div className="flex flex-col items-center justify-end h-full text-center relative z-10">
                  <Factory className="w-8 h-8 text-[#8b5cf6] mb-4" strokeWidth={1.5} />
                  <span className="text-base font-bold text-black leading-tight mb-4">Food &<br/>Beverage</span>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1.5">Business Outcome</span>
                  <div className="px-3 py-1.5 bg-[#8b5cf6]/10 text-[#8b5cf6] rounded-full text-[12px] font-bold w-full max-w-[160px] leading-tight">
                    {MAIN_GOALS.food}
                  </div>
                </div>
              </th>
              
              {/* COLUMNA 3: Turnkey Labs */}
              <th className="sticky top-[60px] lg:top-[80px] z-20 bg-white/95 backdrop-blur-md pt-6 pb-6 px-4 w-[20%] border-b border-gray-200 before:content-[''] before:absolute before:-top-[60px] lg:before:-top-[80px] before:left-0 before:w-full before:h-[60px] lg:before:h-[80px] before:bg-white">
                <div className="flex flex-col items-center justify-end h-full text-center relative z-10">
                  <Sparkles className="w-8 h-8 text-[#FF270A] mb-4" strokeWidth={1.5} />
                  <span className="text-base font-bold text-black leading-tight mb-4">Turnkey<br/>Laboratories</span>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1.5">Business Outcome</span>
                  <div className="px-3 py-1.5 bg-[#FF270A]/10 text-[#FF270A] rounded-full text-[12px] font-bold w-full max-w-[160px] leading-tight">
                    {MAIN_GOALS.build}
                  </div>
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
                  {row.service && <Check className="w-[22px] h-[22px] text-gray-700 mx-auto" strokeWidth={3} />}
                </td>
                <td className="py-6 px-4 text-center border-b border-gray-200">
                  {row.food && <Check className="w-[22px] h-[22px] text-gray-700 mx-auto" strokeWidth={3} />}
                </td>
                <td className="py-6 px-4 text-center border-b border-gray-200">
                  {row.build && <Check className="w-[22px] h-[22px] text-gray-700 mx-auto" strokeWidth={3} />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      {/* ============================================================== */}
      {/* 2. VISTA MÓVIL (Lista Plana)                                     */}
      {/* ============================================================== */}
      <div className="block md:hidden w-full px-4 relative">
        
        {/* Cabecera Flotante (Sticky Header con parche invisible ajustado) */}
        <div className="sticky top-[60px] z-30 bg-white/95 backdrop-blur-md pt-4 pb-4 border-b border-gray-200 mb-2 -mx-4 px-4 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] before:content-[''] before:absolute before:-top-[60px] before:left-0 before:w-full before:h-[60px] before:bg-white">
           <div className="grid grid-cols-3 gap-2 relative z-10">
              <div className="flex flex-col items-center text-center">
                 <Microscope className="w-5 h-5 text-[#3b82f6] mb-2" strokeWidth={1.5} />
                 <span className="text-[10px] font-bold text-black leading-tight mb-2">Service<br/>Labs</span>
                 <span className="text-[7px] sm:text-[8px] text-gray-400 font-bold uppercase tracking-widest mb-1">Business Outcome</span>
                 <div className="px-1.5 py-1 bg-[#3b82f6]/10 text-[#3b82f6] rounded-md text-[9px] font-bold w-full leading-tight flex items-center justify-center min-h-[32px]">
                   Maximized<br/>Margins
                 </div>
              </div>
              <div className="flex flex-col items-center text-center">
                 <Factory className="w-5 h-5 text-[#8b5cf6] mb-2" strokeWidth={1.5} />
                 <span className="text-[10px] font-bold text-black leading-tight mb-2">Food &<br/>Bev</span>
                 <span className="text-[7px] sm:text-[8px] text-gray-400 font-bold uppercase tracking-widest mb-1">Business Outcome</span>
                 <div className="px-1.5 py-1 bg-[#8b5cf6]/10 text-[#8b5cf6] rounded-md text-[9px] font-bold w-full leading-tight flex items-center justify-center min-h-[32px]">
                   Fast<br/>Release
                 </div>
              </div>
              <div className="flex flex-col items-center text-center">
                 <Sparkles className="w-5 h-5 text-[#FF270A] mb-2" strokeWidth={1.5} />
                 <span className="text-[10px] font-bold text-black leading-tight mb-2">Turnkey<br/>Labs</span>
                 <span className="text-[7px] sm:text-[8px] text-gray-400 font-bold uppercase tracking-widest mb-1">Business Outcome</span>
                 <div className="px-1.5 py-1 bg-[#FF270A]/10 text-[#FF270A] rounded-md text-[9px] font-bold w-full leading-tight flex items-center justify-center min-h-[32px]">
                   Rapid<br/>Setup
                 </div>
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
                 
                 <div className="grid grid-cols-3 pt-2">
                    <div className="flex items-center justify-center">
                       {row.service && <Check className="w-[20px] h-[20px] text-gray-700" strokeWidth={3} />}
                    </div>
                    <div className="flex items-center justify-center">
                       {row.food && <Check className="w-[20px] h-[20px] text-gray-700" strokeWidth={3} />}
                    </div>
                    <div className="flex items-center justify-center">
                       {row.build && <Check className="w-[20px] h-[20px] text-gray-700" strokeWidth={3} />}
                    </div>
                 </div>

              </div>
           ))}
        </div>
      </div>

    </section>
  );
}