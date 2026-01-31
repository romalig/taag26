"use client";

import { useState } from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

const EQUIPMENT_SCENARIOS = {
  simple: {
    id: "simple",
    label: "Environmental & Easy Food",
    image: "/termo6.png", 
    title: "Manual & Rapid Workflow",
    description: "Ideal for environmental sponges and simple liquids. Skip the complex machinery with our rapid extraction protocols that get you to PCR results in record time.",
  },
  complex: {
    id: "complex",
    label: "Complex Food Samples",
    image: "/auto3.png", 
    title: "Automated High-Throughput",
    description: "For complex matrices like meat, chocolate, or spices. We integrate automated magnetic-bead extraction robots to ensure maximum purity and efficiency without bottlenecks.",
  }
};

export default function EquipmentSection() {
  const [activeTab, setActiveTab] = useState<"simple" | "complex">("simple");
  const activeData = EQUIPMENT_SCENARIOS[activeTab];

  return (
    <section className="py-24 bg-white px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* =========================================================
            1. HEADER & CONTROLES
        ========================================================== */}
        <div className="flex flex-col items-center text-center mb-12 space-y-8">
           
           <div className="max-w-3xl">
              <span className="text-[#FF270A] font-bold tracking-widest uppercase text-xs mb-3 block">
                Infrastructure & Equipment
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-[#111111] mb-6 tracking-tight">
                Open platforms. Total flexibility.
              </h2>
              <p className="text-lg text-gray-500 leading-relaxed">
                We believe in open ecosystems. Whether you need a simple manual setup or a fully automated robot, our kits adapt to your lab's reality.
              </p>
           </div>

           {/* Botones de Selección */}
           <div className="inline-flex bg-gray-100 p-1.5 rounded-full border border-gray-200">
              <button
                onClick={() => setActiveTab("simple")}
                className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                  activeTab === "simple" 
                    ? "bg-white text-[#111111] shadow-md transform scale-105" 
                    : "text-gray-500 hover:text-[#111111]"
                }`}
              >
                Environmental & Easy
              </button>
              <button
                onClick={() => setActiveTab("complex")}
                className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                  activeTab === "complex" 
                    ? "bg-white text-[#111111] shadow-md transform scale-105" 
                    : "text-gray-500 hover:text-[#111111]"
                }`}
              >
                Complex Samples
              </button>
           </div>
        </div>

        {/* =========================================================
            2. TARJETA GRANDE
        ========================================================== */}
        {/* CORRECCIÓN: Cambiado bg-black a bg-gray-900 y añadido border-transparent para evitar artefactos */}
        <div className="relative w-full h-[600px] rounded-[3rem] overflow-hidden shadow-2xl bg-[#151516] group transform-gpu">
           
           {/* IMAGEN DE FONDO */}
           <div className="absolute inset-0 w-full h-full">
              <div key={activeTab} className="relative w-full h-full animate-scaleFade">
                 <Image 
                   src={activeData.image}
                   alt={activeData.title}
                   fill
                   // CORRECCIÓN: scale-[1.01] asegura que la imagen cubra cualquier sub-píxel del borde
                   className="object-cover object-right md:object-right transition-transform duration-700 scale-[1.01] group-hover:scale-105"
                   priority
                 />
                 {/* Degradado */}
                 <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
              </div>
           </div>

           {/* CONTENIDO */}
           <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-end items-start">
              
              <div key={activeTab + "-text"} className="max-w-xl animate-slideUp">
                 
                 {/* Badge Contexto */}
                 <div className="flex items-center gap-2 mb-6">
                    <div className="px-3 py-1 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider">
                       Recommended Setup
                    </div>
                    <div className="flex items-center gap-1.5 text-white/80 text-xs font-medium">
                       <CheckCircle2 className="w-4 h-4 text-[#FF270A]" />
                       <span>Analytik Jena Preferred</span>
                    </div>
                 </div>

                 <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                    {activeData.title}
                 </h3>
                 
                 <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
                    {activeData.description}
                 </p>

              </div>
           </div>

        </div>

      </div>

      <style jsx global>{`
        @keyframes scaleFade {
          from { opacity: 0; transform: scale(1.06); } /* Empezamos un poco más grande para el efecto */
          to { opacity: 1; transform: scale(1.01); }    /* Terminamos en 1.01 para evitar la línea negra */
        }
        .animate-scaleFade {
          animation: scaleFade 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideUp {
          animation: slideUp 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards 0.1s;
          opacity: 0;
        }
      `}</style>
    </section>
  );
}