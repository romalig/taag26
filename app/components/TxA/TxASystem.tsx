"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { 
  BarChart3, 
  FileCheck2,
  Sparkles 
} from "lucide-react";
import { useModal } from "../industrial/ModalProvider";
import {
  TXA_MODAL_DATA,
  TxAModalContent,
  type TxaModalKey,
} from "./TxAModalShared";

// --- COMPONENTE PRINCIPAL ---
export default function TxASystem() {
  const [isVisible, setIsVisible] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);
  
  // Extraemos openModal del contexto global
  const { openModal } = useModal(); 

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (logoRef.current) observer.observe(logoRef.current);
    return () => {
      if (logoRef.current) observer.unobserve(logoRef.current);
    };
  }, []);

  // Función para inyectar el contenido en el modal global
  const handleOpenModule = (key: TxaModalKey) => {
    openModal(<TxAModalContent data={TXA_MODAL_DATA[key]} />);
  };

  return (
    <div className="relative w-full bg-[#f5f5f7] -mt-px py-24 md:py-32 flex flex-col items-center justify-center overflow-hidden">
      
      {/* 1. LOGO TxA ANIMADO */}
      <div 
        ref={logoRef}
        className={`absolute top-24 md:top-32 w-24 h-24 md:w-32 md:h-32 z-10 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-[150px] opacity-0'
        }`}
      >
        <Image
          src="/LogoTxANB.png"
          alt="TAAG Xpert Assistant Logo"
          fill
          className="object-contain drop-shadow-sm"
          priority
        />
      </div>

      {/* 2. CONTENEDOR PRINCIPAL */}
      <div className="relative z-20 bg-[#f5f5f7] w-full mt-24 md:mt-32 pt-10 flex flex-col items-center px-4">
        
        {/* ENCABEZADO */}
        <div className="text-center max-w-[800px] mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-[#1d1d1f] mb-6 font-sora tracking-tight leading-[1.05]">
            TAAG Xpert Assistant. <br className="hidden md:block"/>
            <span className="text-[#86868b]">Your AI-powered ecosystem.</span>
          </h2>

          <p className="text-[17px] leading-[1.4] text-[#86868b] font-medium max-w-2xl mx-auto">
            TxA is a complete ecosystem built to manage your entire microbiology operation. 
            From digital field sampling to real-time result analysis.
          </p>
        </div>

        {/* 3. GRILLA EXACTA */}
        <div className="w-full max-w-[1330px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* --- TARJETA 1: TxA APP --- */}
          <div className="bg-white rounded-[32px] p-8 h-[280px] relative flex flex-col justify-center">
            <div className="absolute top-8 left-8">
              <span className="text-sm font-bold tracking-widest text-purple-700 uppercase">TxA APP</span>
            </div>
            <p className="text-[19px] font-semibold text-[#1d1d1f] leading-tight max-w-[90%] font-sora">
              Digitize your sampling process for total control and end-to-end traceability.
            </p>
            <button 
              onClick={() => handleOpenModule('app')}
              className="absolute bottom-8 left-8 text-xs font-medium text-sky-500 hover:text-sky-600 transition-colors flex items-center gap-1 group"
            >
                learn more <span className="transition-transform group-hover:translate-x-0.5">&gt;</span>
            </button>
          </div>

          {/* --- TARJETA 2: TxA LAB --- */}
          <div className="bg-white rounded-[32px] p-8 h-[280px] relative flex flex-col justify-center">
            <div className="absolute top-8 left-8">
              <span className="text-sm font-bold tracking-widest text-blue-700 uppercase">TxA LAB</span>
            </div>
            <p className="text-[19px] font-semibold text-[#1d1d1f] leading-tight max-w-[90%] font-sora">
              Streamline workflows and automate process controls for fully confident lab results.
            </p>
            <button 
              onClick={() => handleOpenModule('lab')}
              className="absolute bottom-8 left-8 text-xs font-medium text-sky-500 hover:text-sky-600 transition-colors flex items-center gap-1 group"
            >
                learn more <span className="transition-transform group-hover:translate-x-0.5">&gt;</span>
            </button>
          </div>

          {/* --- TARJETA 3: TxA QA --- */}
          <div className="bg-white rounded-[32px] p-8 h-[280px] relative flex flex-col justify-center">
            <div className="absolute top-8 left-8">
              <span className="text-sm font-bold tracking-widest text-cyan-500 uppercase">TxA QA</span>
            </div>
            <p className="text-[19px] font-semibold text-[#1d1d1f] leading-tight max-w-[90%] font-sora">
              Utilize predictive microbiology for comprehensive and preventive quality management.
            </p>
            <button 
              onClick={() => handleOpenModule('qa')}
              className="absolute bottom-8 left-8 text-xs font-medium text-sky-500 hover:text-sky-600 transition-colors flex items-center gap-1 group"
            >
                learn more <span className="transition-transform group-hover:translate-x-0.5">&gt;</span>
            </button>
          </div>

          {/* --- TARJETA HORIZONTAL: Neural Core --- */}
          <div className="md:col-span-3 bg-white rounded-[32px] relative overflow-hidden h-[450px] md:h-[400px]">
            
            {/* 1. SECCIÓN DE TEXTO */}
            <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-6 pointer-events-none">
              <span className="text-sm font-bold tracking-[0.2em] bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-400 bg-clip-text text-transparent mb-3 uppercase">
                TxA Core
              </span>
              <p className="text-[24px] md:text-[32px] font-semibold text-[#1d1d1f] leading-[1.1] font-sora tracking-tight md:max-w-[500px]">
                Proprietary AI algorithms connecting field data, lab results, and safety insights.
              </p>
            </div>

            {/* 2. IMAGEN DEL CELULAR (Solo Desktop) */}
            <div className="hidden md:flex absolute bottom-0 left-0 w-[400px] h-full items-end z-10">
               <div className="relative w-full h-[90%] -ml-10">
                 <Image 
                   src="/phone2.png" 
                   alt="TxA App on Phone" 
                   fill 
                   className="object-contain object-bottom-left"
                 />
               </div>
            </div>

            {/* 3. ICONOS FLOTANTES & FONDOS */}
            <div className="absolute inset-0 md:left-auto md:right-0 md:w-[380px] h-full flex items-center justify-center pointer-events-none z-0">
              
              <div className="relative w-full h-full animate-float-slow">

                {/* FONDOS DE LUZ DIFUSA */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-40 md:h-40 bg-[#00C7FD]/10 rounded-full blur-2xl -z-10"></div>
                <div className="absolute bottom-0 right-10 md:right-0 w-32 h-32 bg-[#A13ECD]/10 rounded-full blur-2xl -z-10"></div>

                {/* --- ICONO 1: Risk Prediction --- */}
                <div className="absolute top-8 left-4 md:top-4 md:left-12 bg-white p-3 rounded-2xl shadow-sm border border-purple-50 z-20 flex items-center gap-2 transform -rotate-2 scale-90 md:scale-100">
                   <div className="w-8 h-8 bg-purple-50 rounded-full flex items-center justify-center relative">
                     <Sparkles className="w-4 h-4 text-purple-600" />
                   </div>
                   <div>
                     <p className="text-[10px] font-bold text-gray-800 leading-tight">Risk Prediction</p>
                     <p className="text-[9px] text-purple-600 font-bold">High Probability</p>
                   </div>
                </div>

                {/* --- ICONO 2: Warning Salmonella --- */}
                <div className="absolute top-8 right-4 md:top-6 md:right-8 bg-white p-3 rounded-2xl shadow-sm border border-red-50 z-20 flex items-center gap-2 transform rotate-3 scale-90 md:scale-100">
                   <div className="w-8 h-8 bg-red-50 rounded-full flex items-center justify-center">
                     <Sparkles className="w-4 h-4 text-red-500" />
                   </div>
                   <div>
                     <p className="text-[10px] font-bold text-gray-800 leading-tight">Sampling</p>
                     <p className="text-[9px] text-red-500 font-medium">Optimized</p>
                   </div>
                </div>

                {/* --- ICONO 3: Stats --- */}
                <div className="absolute bottom-8 left-4 md:bottom-auto md:left-auto md:top-36 md:right-4 bg-white/70 backdrop-blur-md p-4 rounded-2xl shadow-sm border border-white/40 z-10 w-[140px] transform scale-90 md:scale-100 origin-bottom-left md:origin-center">
                  <div className="flex gap-1.5 items-end h-12 mb-2">
                    <div className="w-1/3 h-[50%] bg-[#362482]/70 rounded-t-[4px]"></div>
                    <div className="w-1/3 h-[80%] bg-[#00C7FD]/70 rounded-t-[4px]"></div>
                    <div className="w-1/3 h-[30%] bg-[#A13ECD]/70 rounded-t-[4px]"></div>
                  </div>
                  <div className="flex items-center gap-1">
                    <BarChart3 className="w-3 h-3 text-gray-400" />
                    <p className="text-[10px] font-semibold text-gray-600">Live Trends</p>
                  </div>
                </div>

                {/* --- ICONO 4: Reports --- */}
                <div className="absolute bottom-8 right-4 md:bottom-12 md:right-12 bg-white p-3 rounded-2xl shadow-sm border border-gray-50 z-30 flex items-center gap-2 transform -rotate-1 w-max scale-90 md:scale-100 origin-bottom-right md:origin-center">
                   <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center">
                     <FileCheck2 className="w-5 h-5 text-green-500" />
                   </div>
                   <div>
                     <p className="text-xs font-bold text-gray-800 leading-tight">Automated Reports</p>
                     <p className="text-[9px] text-gray-400">Full customized</p>
                   </div>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>

      <style jsx>{`
        .font-sora { 
          font-family: var(--font-sora), sans-serif; 
        }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .animate-float-slow {
          animation: float-slow 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}