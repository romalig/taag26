"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useModal } from "../industrial/ModalProvider"; 

// --- DATOS PARA LOS MODALES DE LOS PRODUCTOS ELEVIA ---
const ELEVIA_MODAL_DATA = {
  env: {
    title: "Elevia Salmonella",
    intro: "The ultimate environmental monitoring solution powered by AiGOR. Identify active pathogens on plant surfaces in hours, not days.",
    features: [
      {
        title: "Zero-Enrichment Swabbing",
        text: "Swab and run. Our RNA technology allows you to detect 1 CFU per sample directly from the surface without a 24-hour growth phase.",
        image: "/TxA_app_4.png" 
      },
      {
        title: "Live Cell Differentiation",
        text: "Avoid costly false positives caused by sanitizers or dead DNA. Elevia Env™ exclusively targets RNA, detecting only living, metabolically active cells.",
        image: "/TxA_app_5.png" 
      }
    ]
  },
  // Datos placeholder para los otros productos
  food: { title: "Elevia Food™", intro: "Placeholder intro for Food.", features: [] },
  water: { title: "Elevia Water™", intro: "Placeholder intro for Water.", features: [] },
  rapid: { title: "Elevia Rapid ID™", intro: "Placeholder intro for Rapid ID.", features: [] }
};

type EleviaModalKey = keyof typeof ELEVIA_MODAL_DATA;

// --- COMPONENTE DE CONTENIDO DEL MODAL (MODO OSCURO) ---
function EleviaModalContent({ data }: { data: typeof ELEVIA_MODAL_DATA['env'] }) {
  return (
    <div className="w-full p-8 md:p-14 pb-12 bg-[#050505] text-white rounded-2xl md:rounded-[2rem] overflow-hidden">
      <div className="max-w-3xl mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
          {data.title}
        </h2>
        <p className="text-lg md:text-xl text-gray-400 font-medium leading-relaxed">
          {data.intro}
        </p>
      </div>

      <div className="space-y-16">
        {data.features.map((feature, idx) => (
          <div key={idx} className="flex flex-col gap-8 items-start w-full border-b border-white/10 pb-16 last:border-0 last:pb-0">
            <div className="w-full max-w-4xl">
              <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#FF270A] text-white font-bold text-sm mb-4">
                {idx + 1}
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                {feature.text}
              </p>
            </div>
            
            <div className="w-full bg-[#111111] rounded-[2.5rem] h-[350px] md:h-[550px] relative flex items-center justify-center overflow-hidden border border-white/10 mt-2">
              <Image 
                src={feature.image} 
                alt={feature.title} 
                fill 
                className="object-contain drop-shadow-2xl opacity-90" 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- COMPONENTE PRINCIPAL DE LA SECCIÓN ---
export default function Elevia() {
  const [isVisible, setIsVisible] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);
  
  const { openModal } = useModal(); 

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (titleRef.current) observer.unobserve(titleRef.current);
        }
      },
      { threshold: 0.1 }
    );

    if (titleRef.current) observer.observe(titleRef.current);
    return () => {
      if (titleRef.current) observer.disconnect();
    };
  }, []);

  const handleOpenModule = (key: EleviaModalKey) => {
    openModal(<EleviaModalContent data={ELEVIA_MODAL_DATA[key]} />);
  };

  return (
    <div className="relative w-full bg-black py-24 md:py-32 flex flex-col items-center justify-center overflow-hidden border-t border-white/5">
      
      <div className="relative z-20 w-full flex flex-col items-center px-4">
        
        {/* --- ENCABEZADO --- */}
        <div ref={titleRef} className={`text-center max-w-[800px] mx-auto mb-20 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          <p className="text-[10px] md:text-xs font-bold tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-[#FF270A] mb-4 uppercase">
            POWERED BY AIGOR
          </p>

          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tighter leading-[1.05]">
            Meet Elevia.
          </h2>

          <p className="text-[17px] md:text-xl leading-[1.6] text-white/60 font-medium max-w-2xl mx-auto">
            Elevia is our premium suite of diagnostic products based on AiGOR technology. By targeting RNA, Elevia bypasses traditional biological limits to deliver extreme sensitivity and ultra-fast results across your testing matrices.
          </p>
        </div>

        {/* --- GRILLA DE PRODUCTOS --- */}
        <div className={`w-full max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 transition-all duration-1000 delay-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* 1. TARJETA HORIZONTAL PRINCIPAL (Responsive: Bloque superior en móvil, fondo en desktop) */}
          <div className="md:col-span-3 bg-[#0a0a0a] rounded-[2rem] relative flex flex-col md:flex-row md:items-center justify-between min-h-[300px] overflow-hidden">
            
            {/* IMAGEN DE FONDO */}
            <div className="relative w-full h-[250px] md:h-auto md:absolute md:inset-0 z-0 pointer-events-none">
              <Image 
                src="/Sal11.png" 
                alt="Salmonella" 
                fill 
                className="object-cover object-center opacity-100" 
              />
              {/* Gradiente sutil solo en celular para que la imagen se funda con el fondo negro */}
              <div className="md:hidden absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a0a0a] to-transparent"></div>
            </div>

            {/* CONTENIDO TEXTUAL */}
            {/* Los paddings (p-8 md:p-12) se movieron a los contenedores internos para que la imagen toque los bordes arriba en móvil */}
            <div className="relative z-10 w-full md:w-1/3 p-8 pt-4 md:p-12 mb-4 md:mb-0">
              {/* EFECTO DE HALO MÁS INTENSO Y CERRADO */}
              <div className="relative inline-block mb-4">
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-[#FF270A] opacity-90 blur-xl rounded-full pointer-events-none"></div>
                <h3 className="relative text-3xl md:text-3xl font-bold text-white tracking-tight">Elevia Salmonella</h3>
              </div>
              
              <p className="text-g text-white leading-relaxed font-medium">
                Ultra-fast Salmonella detection in as little as 3 hours, and 6 hours, for environmental and food samples, respectively.
              </p>
            </div>
            
            {/* BOTÓN */}
            <div className="relative z-10 px-8 pb-8 md:p-12 w-full md:w-auto shrink-0 mt-auto md:mt-0">
              <button 
                onClick={() => handleOpenModule('env')}
                className="w-full md:w-auto bg-white text-black px-6 py-3 rounded-full text-sm font-bold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 group/btn"
              >
                  Learn more <span className="transition-transform group-hover/btn:translate-x-1">&gt;</span>
              </button>
            </div>
          </div>

          {/* 2. TARJETA INFERIOR 1: FOOD */}
          <div className="col-span-1 bg-[#0a0a0a] rounded-[2rem] p-8 h-[280px] md:h-[300px] relative flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold text-white mb-3">Elevia Listeria</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Flawless pathogen detection in complex foods. Release inventory faster with zero false positives.
              </p>
            </div>
            <div className="mt-auto">
              <span className="inline-block border border-white/20 bg-white/5 text-white/50 text-[10px] font-mono uppercase tracking-widest px-4 py-2 rounded-full">
                Launch 2Q 2026
              </span>
            </div>
          </div>

          {/* 3. TARJETA INFERIOR 2: WATER */}
          <div className="col-span-1 bg-[#0a0a0a] rounded-[2rem] p-8 h-[280px] md:h-[300px] relative flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold text-white mb-3">Elevia E. coli</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                High-volume filtration coupled with extreme AiGOR amplification for instantaneous results.
              </p>
            </div>
            <div className="mt-auto">
              <span className="inline-block border border-white/20 bg-white/5 text-white/50 text-[10px] font-mono uppercase tracking-widest px-4 py-2 rounded-full">
                Launch 2Q 2026
              </span>
            </div>
          </div>

          {/* 4. TARJETA INFERIOR 3: RAPID ID */}
          <div className="col-span-1 bg-[#0a0a0a] rounded-[2rem] p-8 h-[280px] md:h-[300px] relative flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold text-white mb-3">Elevia Rapid ID™</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Exact species and serotype identification for fast and precise root-cause analysis.
              </p>
            </div>
            <div className="mt-auto">
              <span className="inline-block border border-white/20 bg-white/5 text-white/50 text-[10px] font-mono uppercase tracking-widest px-4 py-2 rounded-full">
                Launch 2Q 2026
              </span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}