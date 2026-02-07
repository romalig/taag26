"use client";

import { Zap, TrendingDown, DollarSign } from "lucide-react"; // Importamos DollarSign

export default function CustomDevSection() {
  return (
    // SECCIÓN: Aumentado el padding inferior (pb-40 en móvil, md:pb-48 en escritorio) para más aire al final
    <section className="bg-[#F5F5F7] pt-32 pb-40 md:pt-40 md:pb-48 px-6 md:px-10 overflow-hidden">
      
      <div className="max-w-[1200px] mx-auto">
        
        {/* 1. HEADER SECCIÓN */}
        <div className="mb-32 max-w-4xl">
          {/* Título elegido: "Your vision. Engineered by Ai." */}
          <h2 className="text-4xl md:text-6xl font-extrabold text-[#111111] mb-10 font-sora tracking-tight leading-tight">
            Your vision. <br className="hidden md:block" />
            <span className="text-gray-400">Engineered by Ai.</span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-500 font-medium leading-relaxed max-w-3xl">
            Leveraging MILA's AI, TAAG delivers a comprehensive custom assay development service. 
            We design and validate bespoke molecular solutions on your behalf—offering a 
            superior alternative to in-house R&D with faster timelines, simplified workflows, 
            and significantly lower costs.
          </p>
        </div>

        {/* 2. GRID DE 3 TARJETAS (Flat, alineadas arriba) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* --- CARD 1: SPEED --- */}
          <div className="group bg-white rounded-[2rem] p-8 md:p-10 min-h-[320px] flex flex-col transition-transform duration-300 hover:scale-[1.01]">
            {/* Icono */}
            <Zap className="w-8 h-8 text-purple-600 stroke-[1.5] mb-5" />
            
            {/* Título con altura mínima para alineación */}
            <div className="mb-3 min-h-[64px]">
                <h3 className="text-xl md:text-2xl font-bold text-[#111111] font-sora leading-tight">
                  From concept to kit <br />
                  <span className="text-purple-600">5X faster.</span>
                </h3>
            </div>
            
            {/* Bajada */}
            <p className="text-sm text-gray-500 leading-relaxed font-medium">
              MILA targets the optimal design instantly, bypassing iterative failures to drastically shorten your time-to-market.
            </p>
          </div>

          {/* --- CARD 2: DEV COSTS --- */}
          <div className="group bg-white rounded-[2rem] p-8 md:p-10 min-h-[320px] flex flex-col transition-transform duration-300 hover:scale-[1.01]">
            <TrendingDown className="w-8 h-8 text-orange-500 stroke-[1.5] mb-5" />
            
            <div className="mb-3 min-h-[64px]">
                <h3 className="text-xl md:text-2xl font-bold text-[#111111] font-sora leading-tight">
                  <span className="text-orange-500">Up to 50%</span> reduction <br />
                  in development costs.
                </h3>
            </div>
            
            <p className="text-sm text-gray-500 leading-relaxed font-medium">
              Outsourcing to TAAG eliminates internal R&D overhead, reducing your total investment and operational risk.
            </p>
          </div>

          {/* --- CARD 3: REACTION COST (Nuevo Icono: DollarSign) --- */}
          <div className="group bg-white rounded-[2rem] p-8 md:p-10 min-h-[320px] flex flex-col transition-transform duration-300 hover:scale-[1.01]">
            {/* Se reemplazó Ticket por DollarSign */}
            <DollarSign className="w-8 h-8 text-teal-500 stroke-[1.5] mb-5" />
            
            <div className="mb-3 min-h-[64px]">
                <h3 className="text-xl md:text-2xl font-bold text-[#111111] font-sora leading-tight">
                  <span className="text-teal-500">Lowest cost</span> <br />
                  per reaction.
                </h3>
            </div>
            
            <p className="text-sm text-gray-500 leading-relaxed font-medium">
              Advanced multiplexing and design optimization minimize reagent usage, ensuring the most competitive price per test.
            </p>
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