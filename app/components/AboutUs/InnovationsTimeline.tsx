"use client";

import { Dna, Layers, BrainCircuit, Cpu, Activity, Sparkles } from "lucide-react";

export default function InnovationsTimeline() {
  const innovations = [
    {
      icon: <Dna className="w-5 h-5 text-[#FF270A]" />,
      title: "Multiplex PCR Integration",
      description: "First PCR kit to simultaneously detect Salmonella spp., L. monocytogenes, E. coli, and S. aureus in one single reaction and workflow."
    },
    {
      icon: <Layers className="w-5 h-5 text-[#FF270A]" />,
      title: "Extreme Multiplexing",
      description: "First extreme highly multiplex PCR kit (proprietary technology) capable of detecting and identifying over 50 spoilage microorganisms in a single PCR reaction."
    },
    {
      icon: <BrainCircuit className="w-5 h-5 text-[#FF270A]" />,
      title: "TxA Platform",
      description: "First AI algorithm capable of dynamically modifying the microbiological testing program based on real-time risk assessment."
    },
    {
      icon: <Cpu className="w-5 h-5 text-[#FF270A]" />,
      title: "MILA Platform",
      description: "Development of MILA (proprietary technology): the first AI software able to predict the best molecules for highly multiplexed PCR kits."
    },
    {
      icon: <Activity className="w-5 h-5 text-[#FF270A]" />,
      title: "AiGOR Technology",
      description: "Development of AiGOR (proprietary technology): a revolutionary RNA detection technology delivering over 10,000 times more sensitivity than standard real-time PCR."
    }
  ];

  return (
    <section className="w-full bg-white py-24 md:py-32 border-t border-gray-100 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Encabezado de la Sección */}
        <div className="text-center max-w-3xl mx-auto mb-20 md:mb-28">
          <h2 className="text-3xl md:text-5xl font-bold text-[#111111] mb-6 font-sora tracking-tight leading-tight">
            A history of firsts. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF270A] to-[#A31C08]">
              A future of breakthroughs.
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-500 font-medium leading-relaxed">
            We don't just use technology, we invent it. Discover the milestones that have redefined microbiological testing over the years.
          </p>
        </div>

        {/* ESTRUCTURA CORREGIDA DE LA LÍNEA DE TIEMPO */}
        <div className="relative w-full">
          
          {/* La Línea Vertical (Fija a la izquierda en móvil, al centro en PC) */}
          <div className="absolute top-0 bottom-0 left-[20px] md:left-1/2 w-[2px] bg-gray-200 transform md:-translate-x-1/2 z-0" />

          {/* Contenedor de las Tarjetas */}
          <div className="space-y-12 md:space-y-24">
            
            {/* Mapeo de Innovaciones 1 a 5 */}
            {innovations.map((item, index) => {
              const isLeft = index % 2 === 0; // Alternar izquierda/derecha
              return (
                <div key={index} className="relative flex flex-col md:flex-row items-center w-full z-10">
                  
                  {/* Icono Central */}
                  <div className="absolute left-[20px] md:left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-white border-2 border-gray-100 flex items-center justify-center shadow-sm z-20 mt-4 md:mt-0 top-0 md:top-auto">
                    {item.icon}
                  </div>

                  {/* Tarjeta de Contenido */}
                  {/* Lógica: pl-[70px] en móvil para esquivar la línea. En PC, alterna entre derecha/izquierda */}
                  <div className={`w-full md:w-1/2 pl-[70px] md:pl-0 ${isLeft ? 'md:pr-16' : 'md:pl-16 md:ml-auto'}`}>
                    <div className="bg-[#F4F4F5] rounded-[2rem] p-8 hover:-translate-y-1 transition-transform duration-300">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">
                        Innovation 0{index + 1}
                      </span>
                      <h3 className="text-xl font-bold text-[#111111] mb-3 font-sora tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-[15px] text-gray-600 font-medium leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                </div>
              );
            })}

            {/* ========================================================= */}
            {/* EL FUTURO (PUNTO 6) - DISEÑO ESPECIAL DESTACADO           */}
            {/* ========================================================= */}
            <div className="relative flex flex-col md:flex-row items-center w-full z-10 pt-8 md:pt-12">
              
              {/* Icono Central Brillante */}
              <div className="absolute left-[20px] md:left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-[#111111] flex items-center justify-center shadow-[0_0_20px_rgba(255,39,10,0.4)] z-20 mt-4 md:mt-0 top-0 md:top-auto">
                <Sparkles className="w-5 h-5 text-[#FF270A]" />
              </div>

              {/* Tarjeta Oscura y Tecnológica (Siempre va a la derecha en este caso, ya que es la 6ta) */}
              <div className="w-full md:w-1/2 pl-[70px] md:pl-16 md:ml-auto">
                <div className="relative bg-[#111111] rounded-[2rem] p-8 md:p-10 shadow-2xl overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
                  
                  {/* Glow interno animado */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#FF270A]/20 to-purple-600/20 blur-3xl rounded-full pointer-events-none group-hover:opacity-100 transition-opacity duration-700 opacity-50" />

                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF270A] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF270A]"></span>
                      </span>
                      <span className="text-[10px] font-bold text-[#FF270A] uppercase tracking-widest">
                        Coming Soon
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-4 font-sora tracking-tight">
                      The Next Generation
                    </h3>
                    <p className="text-[15px] md:text-base text-gray-400 font-medium leading-relaxed">
                      Based on <strong className="text-white">AiGOR</strong> and <strong className="text-white">MILA</strong>, we are developing the next generation of assays. Expect unprecedented capabilities: <span className="text-[#FF270A]">extremely fast (same-shift results)</span>, highly multiplexed, and fully quantitative results.
                    </p>
                  </div>

                </div>
              </div>

            </div>

          </div>
        </div>

      </div>

      <style jsx>{`
        .font-sora { font-family: var(--font-sora), sans-serif; }
      `}</style>
    </section>
  );
}