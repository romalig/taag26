"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useModal } from "../industrial/ModalProvider"; 

// --- DATOS PARA LOS MODALES DE LOS PRODUCTOS ELEVIA ---
const ELEVIA_MODAL_DATA = {
  salmonella: {
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
  salmonellaEB: {
    title: "Elevia Salmonella + EB",
    intro: "Simultaneous detection of Salmonella and Enterobacteria in a single reaction.",
    features: [
      {
        title: "Multiplex Efficiency",
        text: "Identify two critical targets in one single 3-hour workflow.",
        image: "/TxA_app_4.png" 
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
function EleviaModalContent({ data }: { data: typeof ELEVIA_MODAL_DATA['salmonella'] }) {
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
      
      {/* --- GLOW AMBIENTAL TENUE --- */}
      {/* Se hizo más visible usando mix-blend-screen y colores más puros */}
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[90%] md:w-[70%] max-w-[1000px] h-[500px] bg-gradient-to-r from-purple-600 to-[#FF270A] blur-[140px] opacity-20 md:opacity-30 mix-blend-screen pointer-events-none z-0 rounded-full"></div>

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

        {/* --- GRILLA DE PRODUCTOS BENTO BOX (2 Arriba, 3 Abajo) --- */}
        <div className={`w-full max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-6 gap-5 transition-all duration-1000 delay-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* ============================================== */}
          {/* 1. TARJETA IMPORTANTE SUPERIOR 1: SALMONELLA */}
          {/* ============================================== */}
          <div className="md:col-span-3 bg-[#0a0a0a] rounded-[2rem] relative flex flex-col overflow-hidden min-h-[450px]">
            
            {/* IMAGEN SUPERIOR */}
            <div className="relative w-full h-[220px] md:h-[260px] z-0 pointer-events-none shrink-0">
              <Image 
                src="/Sal11.png" 
                alt="Salmonella" 
                fill 
                className="object-cover object-center opacity-100" 
              />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a0a0a] to-transparent"></div>
            </div>

            {/* CONTENIDO TEXTUAL Y BOTÓN */}
            <div className="relative z-10 flex flex-col flex-1 p-8 pt-8 md:p-12 md:pt-10">
              <div className="mb-4">
                {/* 100% LIMPIO DE GLOW */}
                <h3 className="text-2xl md:text-4xl leading-tight font-bold text-white tracking-tight">Elevia Salmonella</h3>
              </div>
              
              <p className="text-white/80 leading-relaxed font-medium mb-8">
                Ultra-fast Salmonella detection in as little as 3 hours, and 6 hours, for environmental and food samples, respectively.
              </p>
              
              <button 
                onClick={() => handleOpenModule('salmonella')}
                className="w-full md:w-max border border-white/20 bg-white/5 backdrop-blur-md text-white/90 px-8 py-3 rounded-full text-sm font-medium hover:bg-white/10 hover:border-white/40 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group/btn mt-auto"
              >
                  Learn more <span className="transition-transform group-hover/btn:translate-x-1 text-white/40 group-hover/btn:text-white">&gt;</span>
              </button>
            </div>
          </div>

          {/* ============================================== */}
          {/* 2. TARJETA IMPORTANTE SUPERIOR 2: SALMONELLA + EB */}
          {/* ============================================== */}
          <div className="md:col-span-3 bg-[#0a0a0a] rounded-[2rem] relative flex flex-col overflow-hidden min-h-[450px]">
            
            {/* IMAGEN SUPERIOR */}
            <div className="relative w-full h-[220px] md:h-[260px] z-0 pointer-events-none shrink-0">
              <Image 
                src="/Sal_EB.png" 
                alt="Salmonella + EB" 
                fill 
                className="object-cover object-center opacity-100" 
              />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a0a0a] to-transparent"></div>
            </div>

            {/* CONTENIDO TEXTUAL Y BOTÓN */}
            <div className="relative z-10 flex flex-col flex-1 p-8 pt-8 md:p-12 md:pt-10">
              <div className="mb-4">
                 {/* 100% LIMPIO DE GLOW */}
                <h3 className="text-2xl md:text-4xl leading-tight font-bold text-white tracking-tight">Elevia Salmonella + EB</h3>
              </div>
              
              <p className="text-white/80 leading-relaxed font-medium mb-8">
                Simultaneous identification of Salmonella and Enterobacteria in a single reaction, in as little as 3 hours.
              </p>
              
              <button 
                onClick={() => handleOpenModule('salmonellaEB')}
                className="w-full md:w-max border border-white/20 bg-white/5 backdrop-blur-md text-white/90 px-8 py-3 rounded-full text-sm font-medium hover:bg-white/10 hover:border-white/40 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group/btn mt-auto"
              >
                  Learn more <span className="transition-transform group-hover/btn:translate-x-1 text-white/40 group-hover/btn:text-white">&gt;</span>
              </button>
            </div>
          </div>

          {/* ============================================== */}
          {/* 3. TARJETAS INFERIORES SECUNDARIAS (3 Columnas) */}
          {/* ============================================== */}
          
          {/* INFERIOR 1: FOOD */}
          <div className="md:col-span-2 bg-[#0a0a0a] rounded-[2rem] p-8 h-[280px] md:h-[300px] relative flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold text-white mb-3">Elevia Food™</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Advanced pathogen detection across complex food matrices to ensure global compliance.
              </p>
            </div>
            <div className="mt-auto">
              <span className="inline-block border border-white/20 bg-white/5 text-white/50 text-[10px] font-mono uppercase tracking-widest px-4 py-2 rounded-full">
                Launch 2Q 2026
              </span>
            </div>
          </div>

          {/* INFERIOR 2: WATER */}
          <div className="md:col-span-2 bg-[#0a0a0a] rounded-[2rem] p-8 h-[280px] md:h-[300px] relative flex flex-col justify-between">
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

          {/* INFERIOR 3: RAPID ID */}
          <div className="md:col-span-2 bg-[#0a0a0a] rounded-[2rem] p-8 h-[280px] md:h-[300px] relative flex flex-col justify-between">
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