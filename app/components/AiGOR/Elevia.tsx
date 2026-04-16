"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Loader2, WifiOff } from "lucide-react";
import { useModal } from "../industrial/ModalProvider";
import SolutionTemplate from "../industrial/modals/SolutionTemplate";
import { getKitSolutionByTitle } from "@/app/lib/products-api";
import type { SolutionContent } from "../industrial/modals/types";

// --- Títulos estables de los productos Elevia (se resuelven a UUID en runtime) ---
const ELEVIA_TITLES = {
  salmonella:   "Elevia 1.1 Salmonella spp.",
  salmonellaLS: "Elevia 2.8 Salmonella spp. and Listeria spp.",
  salmonellaEB: "Elevia 2.9 Salmonella spp. and Enterobacteria",
} as const;

type EleviaTitleKey = keyof typeof ELEVIA_TITLES;

// ─── placeholder eliminado — los modales ahora usan SolutionTemplate desde la API

// --- COMPONENTE PRINCIPAL DE LA SECCIÓN ---
export default function Elevia() {
  const [isVisible, setIsVisible] = useState(false);
  const [loadingKey, setLoadingKey] = useState<EleviaTitleKey | null>(null);
  const [errorKey, setErrorKey] = useState<EleviaTitleKey | null>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cacheRef = useRef<Partial<Record<EleviaTitleKey, SolutionContent>>>({});
  const promiseRef = useRef<Partial<Record<EleviaTitleKey, Promise<SolutionContent | null>>>>({}); 

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

  // Prefetch all product datasheets silently on mount
  useEffect(() => {
    (Object.entries(ELEVIA_TITLES) as [EleviaTitleKey, string][]).forEach(([key, title]) => {
      const p = getKitSolutionByTitle(title)
        .then((data) => { if (data) cacheRef.current[key] = data; return data; })
        .catch(() => null);
      promiseRef.current[key] = p;
    });
  }, []);

  const handleLearnMore = (key: EleviaTitleKey) => {
    const cached = cacheRef.current[key];
    if (cached) {
      openModal(<SolutionTemplate data={cached} />);
      return;
    }
    setErrorKey(null);
    setLoadingKey(key);
    const p =
      promiseRef.current[key] ??
      getKitSolutionByTitle(ELEVIA_TITLES[key]).then((d) => {
        if (d) cacheRef.current[key] = d;
        return d;
      });
    p.then((data) => {
        if (data) openModal(<SolutionTemplate data={data} />);
        else setErrorKey(key);
      })
      .catch(() => setErrorKey(key))
      .finally(() => setLoadingKey((cur) => (cur === key ? null : cur)));
  };

  return (
    <div className="relative w-full bg-black py-24 md:py-32 flex flex-col items-center justify-center overflow-hidden border-t border-white/5">
      
      {/* --- GLOW AMBIENTAL CORREGIDO PARA CELULAR REAL --- */}
      <div className="absolute top-[25%] md:top-[30%] left-1/2 -translate-x-1/2 w-[160%] md:w-[70%] max-w-none md:max-w-[1000px] h-[600px] md:h-[600px] bg-gradient-to-r from-purple-600 to-[#FF270A] blur-[140px] md:blur-[140px] opacity-30 md:opacity-30 pointer-events-none z-0 rounded-full transform-gpu"></div>

      <div className="relative z-20 w-full flex flex-col items-center px-4">
        
        {/* --- ENCABEZADO --- */}
        <div ref={titleRef} className={`text-center max-w-[800px] mx-auto mb-20 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          <p className="text-[10px] md:text-xs font-bold tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-[#FF270A] mb-4 uppercase">
            POWERED BY AIGOR
          </p>

          <h2 className="text-4xl md:text-6xl font-bold text-white mb-12 tracking-tighter leading-[1.05]">
            Welcome to the future. <br /> Meet Elevia Products.
          </h2>

          <p className="text-[17px] md:text-xl leading-[1.6] text-white/80 font-medium max-w-2xl mx-auto mb-6">
            Elevia is our premium suite of diagnostic products based on AiGOR technology. By targeting RNA, Elevia bypasses traditional biological limits to deliver extreme sensitivity and ultra-fast results across your testing matrices.
          </p>
        </div>

        {/* --- GRILLA DE PRODUCTOS BENTO BOX --- */}
        <div className={`w-full max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-6 gap-5 transition-all duration-1000 delay-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* ============================================== */}
          {/* 1. TARJETA IMPORTANTE SUPERIOR 1: SALMONELLA */}
          {/* ============================================== */}
          <div className="md:col-span-3 bg-[#121212] rounded-[2rem] relative flex flex-col overflow-hidden min-h-[450px] transition-colors">
            
            {/* IMAGEN SUPERIOR */}
            <div className="relative w-full h-[220px] md:h-[260px] z-0 pointer-events-none shrink-0">
              <Image 
                src="/Sal11.png" 
                alt="Salmonella" 
                fill 
                className="object-cover object-center opacity-100" 
              />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#121212] to-transparent transition-colors"></div>
            </div>

            {/* CONTENIDO TEXTUAL Y BOTÓN */}
            <div className="relative z-10 flex flex-col flex-1 p-8 pt-8 md:p-12 md:pt-10">
              <div className="mb-4">
                <h3 className="text-2xl md:text-2xl leading-tight font-bold text-white tracking-tight">Elevia Salmonella</h3>
              </div>
              
              <p className="text-white/90 font-small mb-8">
                Ultra-fast Salmonella detection in as little as 3 hours, and 7 hours, for environmental and food samples, respectively.
              </p>
              
              <button
                onClick={() => handleLearnMore('salmonella')}
                disabled={loadingKey === 'salmonella' || errorKey === 'salmonella'}
                className="w-full md:w-max border border-white/20 bg-white/5 backdrop-blur-md text-white/90 px-8 py-3 rounded-full text-sm font-medium hover:bg-white/10 hover:border-white/40 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group/btn mt-auto disabled:opacity-60"
              >
                {loadingKey === 'salmonella'
                  ? <><Loader2 className="w-4 h-4 animate-spin" /> Loading…</>
                  : errorKey === 'salmonella'
                  ? <><WifiOff className="w-4 h-4" /> Unavailable</>
                  : <>Learn more <span className="transition-transform group-hover/btn:translate-x-1 text-white/40 group-hover/btn:text-white">&gt;</span></>}
              </button>
            </div>
          </div>

          {/* ============================================== */}
          {/* 2. TARJETA IMPORTANTE SUPERIOR 2: SALMONELLA + EB */}
          {/* ============================================== */}
          <div className="md:col-span-3 bg-[#121212] rounded-[2rem] relative flex flex-col overflow-hidden min-h-[450px] transition-colors">
            
            {/* IMAGEN SUPERIOR */}
            <div className="relative w-full h-[220px] md:h-[260px] z-0 pointer-events-none shrink-0">
              <Image 
                src="/Sal_EB.png" 
                alt="Salmonella + EB" 
                fill 
                className="object-cover object-center opacity-100" 
              />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#121212] to-transparent transition-colors"></div>
            </div>

            {/* CONTENIDO TEXTUAL Y BOTÓN */}
            <div className="relative z-10 flex flex-col flex-1 p-8 pt-8 md:p-12 md:pt-10">
              <div className="mb-4">
                <h3 className="text-2xl md:text-2xl leading-tight font-bold text-white tracking-tight">Elevia Salmonella + Listeria spp.</h3>
              </div>
              
              <p className="text-white/90 font-small mb-8">
                Simultaneous identification of Salmonella and Listeria spp. in a single reaction, in as little as 3 hours, and 6 hours, for environmental and food samples, respectively.
              </p>
              
              <button
                onClick={() => handleLearnMore('salmonellaLS')}
                disabled={loadingKey === 'salmonellaLS' || errorKey === 'salmonellaLS'}
                className="w-full md:w-max border border-white/20 bg-white/5 backdrop-blur-md text-white/90 px-8 py-3 rounded-full text-sm font-medium hover:bg-white/10 hover:border-white/40 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group/btn mt-auto disabled:opacity-60"
              >
                {loadingKey === 'salmonellaLS'
                  ? <><Loader2 className="w-4 h-4 animate-spin" /> Loading…</>
                  : errorKey === 'salmonellaLS'
                  ? <><WifiOff className="w-4 h-4" /> Unavailable</>
                  : <>Learn more <span className="transition-transform group-hover/btn:translate-x-1 text-white/40 group-hover/btn:text-white">&gt;</span></>}
              </button>
            </div>
          </div>
          {/* ============================================== */}
          
          {/* INFERIOR 1: FOOD */}
          <div className="md:col-span-2 bg-[#121212] rounded-[2rem] p-8 h-[280px] md:h-[300px] relative flex flex-col justify-between transition-colors">
            <div>
              <h3 className="text-xl font-bold text-white mb-6">Elevia Salmonella + Enterobacteria</h3>
              <p className="text-sm text-white/90">
                Simultaneous identification of Salmonella and Enterobacteria in a single reaction, in as little as 3 hours, in environmental samples.
              </p>
            </div>
              <button
                onClick={() => handleLearnMore('salmonellaEB')}
                disabled={loadingKey === 'salmonellaEB' || errorKey === 'salmonellaEB'}
                className="w-full md:w-max border border-white/20 bg-white/5 backdrop-blur-md text-white/90 px-8 py-3 rounded-full text-sm font-medium hover:bg-white/10 hover:border-white/40 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group/btn mt-auto disabled:opacity-60"
              >
                {loadingKey === 'salmonellaEB'
                  ? <><Loader2 className="w-4 h-4 animate-spin" /> Loading…</>
                  : errorKey === 'salmonellaEB'
                  ? <><WifiOff className="w-4 h-4" /> Unavailable</>
                  : <>Learn more <span className="transition-transform group-hover/btn:translate-x-1 text-white/40 group-hover/btn:text-white">&gt;</span></>}
              </button>
          </div>

          {/* INFERIOR 2: WATER */}
          <div className="md:col-span-2 bg-[#121212] rounded-[2rem] p-8 h-[280px] md:h-[300px] relative flex flex-col justify-between transition-colors">
            <div>
              <h3 className="text-xl font-bold text-white mb-6">Elevia Listeria spp + L. monocytogenes</h3>
              <p className="text-sm text-white/90">
                Simultaneous identification of Listeria spp. and L. monocytogenes in a single reaction, in as little as 3 hours.
              </p>
            </div>
            <div className="mt-auto">
              <span className="inline-block border border-white/20 bg-white/5 text-white/50 text-[10px] font-mono uppercase tracking-widest px-4 py-2 rounded-full">
                Launch 2Q 2026
              </span>
            </div>
          </div>

          {/* INFERIOR 3: RAPID ID */}
          <div className="md:col-span-2 bg-[#121212] rounded-[2rem] p-8 h-[280px] md:h-[300px] relative flex flex-col justify-between transition-colors">
            <div>
              <h3 className="text-xl font-bold text-white mb-6">Elevia Salmonella + Listeria spp. + L. monocytogenes</h3>
              <p className="text-sm text-white/90">
                Simultaneous identification of Salmonella + Listeria spp. and L. monocytogenes in a single reaction, in as little as 3 hours.
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