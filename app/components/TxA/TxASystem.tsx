"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Smartphone, Microscope, ShieldCheck, BrainCircuit } from "lucide-react";

export default function TxASystem() {
  const [isVisible, setIsVisible] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="relative w-full bg-[#f3f4f6] -mt-px py-24 md:py-32 flex flex-col items-center justify-center overflow-hidden">
      
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center relative">
        
        {/* 1. LOGO TxA ANIMADO */}
        <div 
          ref={logoRef}
          className={`absolute top-0 w-24 h-24 md:w-32 md:h-32 z-10 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
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

        {/* 2. CONTENEDOR DE TEXTO Y TARJETAS (LA MÁSCARA) */}
        {/* Este contenedor completo tiene z-20 y bg gris, actuando como pared sólida sobre el logo */}
        <div className="relative z-20 bg-[#f3f4f6] w-full mt-24 md:mt-32 pt-8 md:pt-10 flex flex-col items-center px-6">
          
          {/* TÍTULO PRINCIPAL Y BAJADA */}
          <div className="text-center max-w-4xl mx-auto mb-20 md:mb-32">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-[#111111] mb-8 md:mb-12 font-sora tracking-tight leading-[1.1] md:leading-tight px-4 md:px-0">
              TAAG Xpert Assistant. <br className="hidden md:block"/>
              <span className="text-gray-400 block md:inline mt-2 md:mt-0">Your AI-powered ecosystem.</span>
            </h2>

            <p className="text-base md:text-xl text-gray-500 font-medium leading-relaxed px-6 md:px-8">
              TxA is a complete AI ecosystem built to manage your entire microbiology operation. 
              From digital field sampling and predictive algorithms that optimize your operations, 
              to automated, real-time result analysis, TxA connects every dot.
            </p>
          </div>

          {/* 3. GRILLA DE MÓDULOS (ESTILO MILA) */}
          <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-y-16">
            
            {/* FILA SUPERIOR: 3 TARJETAS VERTICALES */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-12">
              
              {/* --- TARJETA 1: TxA App --- */}
              <div className="group cursor-default">
                <div className="relative w-full aspect-[3/4.5] bg-gradient-to-br from-[#ffffff] to-[#e4e4e7] rounded-[2.5rem] overflow-hidden mb-6 flex items-center justify-center border border-gray-200/50 shadow-sm transition-transform duration-500 group-hover:-translate-y-2">
                  <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-xl border border-gray-100">
                    <Smartphone className="w-10 h-10 text-[#FF270A]" />
                  </div>
                </div>
                <div className="px-2">
                  <h3 className="text-xl font-bold text-[#111111] mb-3 font-sora">TxA App</h3>
                  <p className="text-sm md:text-base text-gray-500 leading-relaxed">
                    Digitalize your field sampling. Attach photos, GPS coordinates, and sample details instantly from your mobile device directly to the cloud.
                  </p>
                </div>
              </div>

              {/* --- TARJETA 2: TxA Lab --- */}
              <div className="group cursor-default">
                <div className="relative w-full aspect-[3/4.5] bg-gradient-to-br from-indigo-50 to-blue-100 rounded-[2.5rem] overflow-hidden mb-6 flex items-center justify-center border border-indigo-100 shadow-sm transition-transform duration-500 group-hover:-translate-y-2">
                  <div className="w-24 h-24 bg-white/60 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg border border-white">
                    <Microscope className="w-10 h-10 text-indigo-600" />
                  </div>
                </div>
                <div className="px-2">
                  <h3 className="text-xl font-bold text-[#111111] mb-3 font-sora">TxA Lab</h3>
                  <p className="text-sm md:text-base text-gray-500 leading-relaxed">
                    Streamline your laboratory workflow. Automate sample tracking, digitize real-time results, and eliminate human error from data entry.
                  </p>
                </div>
              </div>

              {/* --- TARJETA 3: TxA QA --- */}
              <div className="group cursor-default">
                <div className="relative w-full aspect-[3/4.5] bg-[#111111] rounded-[2.5rem] overflow-hidden mb-6 flex items-center justify-center shadow-sm transition-transform duration-500 group-hover:-translate-y-2">
                  <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
                    <ShieldCheck className="w-10 h-10 text-emerald-400" />
                  </div>
                </div>
                <div className="px-2">
                  <h3 className="text-xl font-bold text-[#111111] mb-3 font-sora">TxA QA</h3>
                  <p className="text-sm md:text-base text-gray-500 leading-relaxed">
                    Empower your Quality Assurance. Access centralized dashboards, perform deep trend analysis, and maintain effortless compliance tracking.
                  </p>
                </div>
              </div>

            </div>

            {/* FILA INFERIOR: TARJETA HORIZONTAL (ALGORITMOS) */}
            <div className="group cursor-default w-full">
              {/* aspect-video en móvil, h-64 a h-80 en desktop para garantizar formato apaisado */}
              <div className="relative w-full aspect-square md:aspect-auto md:h-72 bg-black rounded-[2.5rem] overflow-hidden mb-6 flex flex-col items-center justify-center shadow-xl transition-transform duration-500 group-hover:-translate-y-2">
                
                {/* FONDO ANIMADO (Puntos flotantes tipo Mila) */}
                <div className="absolute inset-0 z-0 opacity-80">
                  <div className="absolute top-[20%] left-[15%] w-2 h-2 bg-blue-400 rounded-full animate-float" style={{ animationDelay: '0s' }}></div>
                  <div className="absolute top-[60%] left-[25%] w-3 h-3 bg-indigo-500 rounded-full animate-float" style={{ animationDelay: '1.5s', animationDuration: '4s' }}></div>
                  <div className="absolute top-[30%] left-[80%] w-2.5 h-2.5 bg-red-500 rounded-full animate-float" style={{ animationDelay: '0.8s', animationDuration: '4.5s' }}></div>
                  <div className="absolute top-[70%] left-[75%] w-2 h-2 bg-[#FF270A] rounded-full animate-float" style={{ animationDelay: '2s', animationDuration: '3.8s' }}></div>
                  <div className="absolute top-[40%] left-[50%] w-1.5 h-1.5 bg-white rounded-full animate-float" style={{ animationDelay: '0.5s', animationDuration: '3.5s' }}></div>
                </div>

                <div className="relative z-10 w-20 h-20 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 flex items-center justify-center mb-4">
                   <BrainCircuit className="w-10 h-10 text-white" />
                </div>
                
                <h4 className="relative z-10 text-white font-sora font-bold tracking-widest uppercase text-sm opacity-50">
                  Core Engine
                </h4>

              </div>
              <div className="px-2 md:px-4 max-w-4xl">
                <h3 className="text-xl font-bold text-[#111111] mb-3 font-sora">TxA AI Algorithms</h3>
                <p className="text-sm md:text-base text-gray-500 leading-relaxed">
                  The intelligent brain connecting the entire ecosystem. Our proprietary algorithms analyze data across the App, Lab, and QA modules to predict emerging risks, uncover hidden correlations, and optimize your sampling routes before outbreaks can occur.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>

      <style jsx>{`
        .font-sora { 
          font-family: var(--font-sora), sans-serif; 
        }

        /* Animación Float para los puntos de la tarjeta de Algoritmos */
        @keyframes float {
          0%, 100% { transform: translate(0, 0); opacity: 0.8; }
          25% { transform: translate(10px, -15px); opacity: 0.4; }
          50% { transform: translate(0, -30px); opacity: 1; }
          75% { transform: translate(-10px, -15px); opacity: 0.4; }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}