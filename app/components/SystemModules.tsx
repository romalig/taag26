"use client";

import { ArrowRight, Box, Cpu, Globe } from "lucide-react"; 

const CARD_IMG = "/2bacterias_verdes.png";
const CARD_IMG1 = "/TxA.png";
const CARD_IMG2 = "/world3.png";
const CARD_IMG3 = "/mila2.png";

// Color unificado para todas las tarjetas (Gris Global Hubs)
const CARD_THEME = {
  bg: "bg-[#F5F5F7]",
  text: "text-[#111111]", // Texto casi negro para máximo contraste
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
    link: "#industrial",
  },
  {
    id: "custom",
    tag: "Precision",
    title: "Customized Molecular",
    description: "AI-designed molecular assays for your specific needs.",
    img: CARD_IMG3, 
    link: "#custom",
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
        
        {/* --- NUEVO BLOQUE DE TEXTO: BEYOND TESTING --- */}
        <div className="max-w-4xl mx-auto mb-24 text-center">
            {/* Titular Principal */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#111111] mb-8 leading-tight">
              Beyond Testing. <br />
              <span className="opacity-40">Microbiological Intelligence.</span>
            </h2>

            {/* Texto de Cuerpo */}
            <div className="max-w-3xl mx-auto space-y-6 text-lg md:text-xl text-gray-600 font-medium leading-relaxed mb-16">
              <p>
                We are building a future where biological insight is fast, automated, and accessible, turning detection into prevention and data into action. 
              </p>
            </div>
        </div>

        {/* GRID MASONRY (Desalineado) - ORIGINAL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-start">
          
          {/* Columna 1 */}
          <div className="flex flex-col gap-8 lg:gap-10">
            {MODULES.filter((_, i) => i % 2 === 0).map((mod) => (
              <Card key={mod.id} item={mod} />
            ))}
          </div>

          {/* Columna 2 - Desplazada hacia abajo */}
          <div className="flex flex-col gap-8 lg:gap-10 md:mt-32">
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
      className={`group relative flex flex-col justify-between w-full rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${CARD_THEME.bg}`}
    >
      {/* 1. CONTENIDO SUPERIOR (Texto Centrado) */}
      <div className="pt-14 px-8 text-center z-10">
        
        {/* Badge */}
        <div className="flex justify-center mb-6">
            <span className={`px-4 py-1.5 rounded-full ${CARD_THEME.badgeBg} backdrop-blur border ${CARD_THEME.badgeBorder} text-[10px] font-bold uppercase tracking-[0.2em] ${CARD_THEME.text}`}>
               {item.tag}
            </span>
        </div>

        {/* Título */}
        <h3 className={`text-3xl md:text-4xl font-bold mb-4 ${CARD_THEME.text} tracking-tight leading-tight`}>
          {item.title}
        </h3>
        
        {/* Descripción */}
        <p className={`text-base font-medium opacity-70 leading-relaxed max-w-xs mx-auto ${CARD_THEME.text}`}>
          {item.description}
        </p>

        {/* Link / Botón Hover */}
        <div className="mt-8 flex justify-center opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
           <div className={`flex items-center gap-2 px-6 py-2.5 rounded-full bg-white shadow-lg text-xs font-bold uppercase tracking-widest ${CARD_THEME.text}`}>
              Explore <ArrowRight className="w-3 h-3" />
           </div>
        </div>
      </div>

      {/* 2. IMAGEN INFERIOR (Anclada al fondo) */}
      <div className="relative mt-auto w-full flex justify-center items-end">
        <img
          src={item.img}
          alt={item.title}
          // Ajustes visuales:
          // scale-105: Ligeramente más grande por defecto para llenar bien
          // -mb-1: Corrige cualquier línea de pixel vacía al fondo
          className="w-[85%] md:w-[80%] h-auto object-contain transform translate-y-4 transition-transform duration-700 group-hover:scale-110 group-hover:translate-y-0"
        />
      </div>
    </a>
  );
}