"use client";

import { ArrowRight } from "lucide-react"; 

const CARD_IMG = "/2bacterias_verdes.png";
const CARD_IMG1 = "/TxA.png";
const CARD_IMG2 = "/world3.png";
const CARD_IMG3 = "/mila2.png";

// Color unificado para todas las tarjetas
const CARD_THEME = {
  bg: "bg-[#F5F5F7]",
  text: "text-[#111111]", 
  badgeBg: "bg-white/60",
  badgeBorder: "border-white/20"
};

const MODULES = [
  {
    id: "industrial",
    tag: "Speed",
    title: "Industrial Microbiology",
    description: "Decisions in as fast as 3 hours. Replace traditional holds with rapid RNA screening.",
    img: CARD_IMG,
    link: "/industrial",
  },
  {
    id: "custom",
    tag: "Precision",
    title: "Customized Molecular",
    description: "AI-designed molecular assays for your specific needs.",
    img: CARD_IMG3, 
    link: "/customized",
  },
  {
    id: "digital",
    tag: "Intelligence",
    title: "Digital Transformation",
    description: "Trace contamination sources with TxA™ plant mapping.",
    img: CARD_IMG1, 
    link: "#digital",
  },
  {
    id: "hubs",
    tag: "Scale",
    title: "Global Hubs",
    description: "Local labs delivering advanced molecular services.",
    img: CARD_IMG2, 
    link: "#hubs",
  }
];

export default function SystemModules() {
  return (
      <section id="solutions" className="bg-white py-24 lg:py-32 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6">
        
        {/* TEXTO HEADER */}
        <div className="max-w-4xl mx-auto mb-16 md:mb-24 text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#111111] mb-8 leading-tight">
              Beyond Testing. <br />
              <span className="opacity-40">Microbiological Intelligence.</span>
            </h2>

            <div className="max-w-3xl mx-auto space-y-6 text-lg md:text-xl text-gray-600 font-medium leading-relaxed mb-16">
              <p>
                We are building a future where biological insight is fast, automated, and accessible.
              </p>
            </div>
        </div>

        {/* GRID MASONRY */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10 items-start">
          
          {/* Columna 1 */}
          <div className="flex flex-col gap-6 md:gap-8 lg:gap-10">
            {MODULES.filter((_, i) => i % 2 === 0).map((mod) => (
              <Card key={mod.id} item={mod} />
            ))}
          </div>

          {/* Columna 2 */}
          <div className="flex flex-col gap-6 md:gap-8 lg:gap-10 md:mt-32">
             {MODULES.filter((_, i) => i % 2 !== 0).map((mod) => (
              <Card key={mod.id} item={mod} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

function Card({ item }: { item: typeof MODULES[0] }) {
  return (
    <a 
      href={item.link}
      // CAMBIO 1: active:scale-[0.98] para efecto de presión táctil en móviles
      className={`group relative flex flex-col justify-between w-full rounded-[2.5rem] overflow-hidden transition-all duration-300 hover:shadow-2xl active:scale-[0.98] md:hover:-translate-y-2 ${CARD_THEME.bg}`}
    >
      {/* 1. CONTENIDO SUPERIOR */}
      <div className="pt-10 md:pt-14 px-6 md:px-8 text-center z-10">
        
        {/* Badge */}
        <div className="flex justify-center mb-6">
            <span className={`px-4 py-1.5 rounded-full ${CARD_THEME.badgeBg} backdrop-blur border ${CARD_THEME.badgeBorder} text-[10px] font-bold uppercase tracking-[0.2em] ${CARD_THEME.text}`}>
               {item.tag}
            </span>
        </div>

        {/* Título */}
        <h3 className={`text-2xl md:text-4xl font-bold mb-4 ${CARD_THEME.text} tracking-tight leading-tight`}>
          {item.title}
        </h3>
        
        {/* Descripción */}
        <p className={`text-sm md:text-base font-medium opacity-70 leading-relaxed max-w-xs mx-auto ${CARD_THEME.text}`}>
          {item.description}
        </p>

        {/* Link / Botón Hover */}
        {/* CAMBIO 2: opacity-100 por defecto (móvil) -> lg:opacity-0 (desktop) */}
        <div className="mt-8 flex justify-center opacity-100 transform translate-y-0 lg:opacity-0 lg:translate-y-2 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 transition-all duration-300">
           <div className={`flex items-center gap-2 px-6 py-2.5 rounded-full bg-white shadow-lg text-xs font-bold uppercase tracking-widest ${CARD_THEME.text}`}>
              Explore <ArrowRight className="w-3 h-3" />
           </div>
        </div>
      </div>

      {/* 2. IMAGEN INFERIOR */}
      <div className="relative mt-8 md:mt-auto w-full flex justify-center items-end">
        <img
          src={item.img}
          alt={item.title}
          // CAMBIO 3: translate-y-0 en móvil para que se vea bien siempre. La animación de movimiento queda solo para desktop (lg:)
          className="w-[85%] md:w-[80%] h-auto object-contain transform translate-y-0 lg:translate-y-4 transition-transform duration-700 lg:group-hover:scale-110 lg:group-hover:translate-y-0"
        />
      </div>
    </a>
  );
}