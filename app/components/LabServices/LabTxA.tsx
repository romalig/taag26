"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { 
  Sparkles,
  MoreHorizontal, 
  MousePointerClick, 
  Map 
} from "lucide-react";
// IMPORTANTE: Esta es la ruta exacta que viene de tu archivo TxASystem.tsx original
import { useModal } from "../industrial/ModalProvider"; 

// --- DATOS EXACTOS PARA LOS MODALES TxA ---
const TXA_MODAL_DATA = {
  app: {
    title: "TxA APP",
    intro: "Transform your field sampling with our intelligent mobile application. Digitize your entire process for total control and end-to-end traceability from the field directly to the lab.",
    features: [
      {
        title: "Digital Field Sampling",
        text: "Replace paper logs and manual data entry with a streamlined digital workflow. Capture photos, detailed data, and the exact sampling point automatically. Track every sample's journey with immutable digital logs, ensuring 100% compliance and complete visibility over your operations.",
        image: "/TxA_app_1.png"
      },
      {
        title: "All information in one click",
        text: "Once you select the sampling point, you can add important information such as a picture from the site, laboratory analyses, sanitization status, and more.",
        image: "/TxA_app_5.png"
      },
      {
        title: "A flawless tracking system",
        text: "If you use our TAAG S11 NeutroSampling kit to perform environmental swabbing, you can automatically link all digital information with the sample by scanning the QR code printed on TAAG S11 NeutroSampling swabs.",
        image: "/TxA_app_4.png"
      }
    ]
  },
  qa: {
    title: "TxA QA",
    intro: "Leverage predictive microbiology to anticipate risks and ensure comprehensive, proactive quality management across your entire facility.",
    features: [
      {
        title: "Interactive Facility Heatmaps",
        text: "Visualize pathogen occurrences and testing results across your entire production plant in real-time to spot historical problem areas.",
        image: "/phone2.png"
      },
      {
        title: "AI Risk Prediction",
        text: "Our proprietary AI models analyze live data to flag potential contamination events before they reach critical thresholds.",
        image: "/phone2.png"
      },
      {
        title: "Automated Compliance Reporting",
        text: "Generate verified quality certificates, trend analyses, and comprehensive compliance reports with just a single click.",
        image: "/phone2.png"
      }
    ]
  }
};

type TxaModalKey = keyof typeof TXA_MODAL_DATA;

// --- COMPONENTE DE CONTENIDO DEL MODAL ---
function TxAModalContent({ data }: { data: typeof TXA_MODAL_DATA['app'] }) {
  return (
    <div className="w-full p-8 md:p-14 pb-12">
      <div className="max-w-3xl mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#111111] tracking-tight leading-tight mb-6">
          {data.title}
        </h2>
        <p className="text-lg md:text-xl text-gray-500 font-medium leading-relaxed">
          {data.intro}
        </p>
      </div>

      <div className="space-y-16">
        {data.features.map((feature, idx) => (
          <div key={idx} className="flex flex-col gap-8 items-start w-full border-b border-gray-100 pb-16 last:border-0 last:pb-0">
            <div className="w-full max-w-4xl"> 
              <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#111111] text-white font-bold text-sm mb-4">
                {idx + 1}
              </div>
              <h3 className="text-3xl font-bold text-[#111111] mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                {feature.text}
              </p>
            </div>
            
            <div className="w-full bg-[#F5F5F7] rounded-[2.5rem] h-[350px] md:h-[550px] relative flex items-center justify-center overflow-hidden border border-gray-100 mt-2">
              <Image src={feature.image} alt={feature.title} fill className="object-contain drop-shadow-2xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- COMPONENTE PRINCIPAL ---
export default function LabTxA() {
  const { openModal } = useModal(); 

  // --- ESTADOS ---
  const [isVisible, setIsVisible] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);

  const [isCardVisible, setIsCardVisible] = useState(false);
  const [showUserMessage, setShowUserMessage] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showAiResponse, setShowAiResponse] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // --- OBSERVER DEL LOGO (FIRE ONCE) ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            obs.disconnect(); // APAGA EL SENSOR: Previene congelamientos por scroll
          }
        });
      },
      { threshold: 0.1 }
    );
    if (logoRef.current) observer.observe(logoRef.current);
    return () => observer.disconnect();
  }, []);

  // --- OBSERVER DE LA TARJETA ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsCardVisible(true);
            obs.disconnect();
          } else {
            setShowUserMessage(false);
            setIsTyping(false);
            setShowAiResponse(false);
          }
        });
      },
      { threshold: 0.2 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  // --- LÓGICA DE TIEMPOS DEL CHAT ---
  useEffect(() => {
    if (isCardVisible) {
      const t1 = setTimeout(() => setShowUserMessage(true), 1000); 
      const t2 = setTimeout(() => setIsTyping(true), 2000);
      const t3 = setTimeout(() => { setIsTyping(false); setShowAiResponse(true); }, 4000);
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }
  }, [isCardVisible]);

  // Manejador del Modal
  const handleOpenModule = (key: TxaModalKey) => {
    openModal(<TxAModalContent data={TXA_MODAL_DATA[key]} />);
  };

  return (
    <section className="relative w-full bg-[#f5f5f7] py-24 md:py-32 flex flex-col items-center justify-center overflow-hidden border-t border-gray-200/50">
      
      {/* 1. LOGO TxA ANIMADO */}
      <div 
        ref={logoRef}
        className={`absolute top-24 md:top-32 w-24 h-24 md:w-32 md:h-32 z-10 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-[150px] opacity-0'
        }`}
      >
        <Image src="/LogoTxANB.png" alt="TAAG Xpert Assistant Logo" fill className="object-contain drop-shadow-sm" priority />
      </div>

      {/* 2. CONTENEDOR PRINCIPAL */}
      <div className="relative z-20 bg-[#f5f5f7] w-full mt-24 md:mt-32 pt-10 flex flex-col items-center">
        
        {/* ENCABEZADO */}
        <div className="text-center w-full max-w-7xl mx-auto px-6 mb-20 flex flex-col items-center">
          <h2 className="text-3xl md:text-5xl font-bold text-[#1d1d1f] mb-6 font-sora tracking-tight leading-[1.05]">
            TAAG Xpert Assistant. <br className="hidden md:block"/>
            <span className="text-[#86868b]">Your AI-powered ecosystem.</span>
          </h2>
          <p className="text-[17px] leading-[1.4] text-[#86868b] font-medium max-w-2xl text-center">
            By partnering with our lab, you get full access to TxA. A complete ecosystem built to manage your entire microbiology operation, from digital field sampling to real-time result analysis.
          </p>
        </div>

        {/* 3. GRILLA PRINCIPAL */}
        <div className="w-full max-w-7xl px-6 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-5">
          
          {/* COLUMNA IZQUIERDA (1/3) */}
          <div className="flex flex-col gap-5 lg:col-span-1">
            
            {/* --- TARJETA 1: TxA APP --- */}
            <div className="bg-white rounded-[2.5rem] p-8 h-[280px] lg:flex-1 relative flex flex-col justify-center">
              <div className="absolute top-8 left-8">
                <span className="text-sm font-bold tracking-widest text-purple-700 uppercase">TxA APP</span>
              </div>
              <p className="text-[19px] font-semibold text-[#1d1d1f] leading-tight max-w-[90%] font-sora">
                Digitize your sampling process for total control and end-to-end traceability.
              </p>
              {/* Botón Restaurado exactamente igual a tu TxASystem.tsx original */}
              <button 
                onClick={() => handleOpenModule('app')}
                className="absolute bottom-8 left-8 text-xs font-medium text-sky-500 hover:text-sky-600 transition-colors flex items-center gap-1 group z-50 cursor-pointer"
              >
                  learn more <span className="transition-transform group-hover:translate-x-0.5">&gt;</span>
              </button>
            </div>

            {/* --- TARJETA 2: TxA QA --- */}
            <div className="bg-white rounded-[2.5rem] p-8 h-[280px] lg:flex-1 relative flex flex-col justify-center">
              <div className="absolute top-8 left-8">
                <span className="text-sm font-bold tracking-widest text-cyan-500 uppercase">TxA QA</span>
              </div>
              <p className="text-[19px] font-semibold text-[#1d1d1f] leading-tight max-w-[90%] font-sora">
                Utilize predictive microbiology for comprehensive and preventive quality management.
              </p>
              {/* Botón Restaurado exactamente igual a tu TxASystem.tsx original */}
              <button 
                onClick={() => handleOpenModule('qa')}
                className="absolute bottom-8 left-8 text-xs font-medium text-sky-500 hover:text-sky-600 transition-colors flex items-center gap-1 group z-50 cursor-pointer"
              >
                  learn more <span className="transition-transform group-hover:translate-x-0.5">&gt;</span>
              </button>
            </div>

          </div>

          {/* COLUMNA DERECHA (2/3): CHAT AI */}
          <div 
            ref={cardRef}
            /* SOLUCIÓN MÓVIL: Altura aumentada h-[600px] para dar mucho más espacio */
            className="lg:col-span-2 w-full h-[520px] md:h-[580px] rounded-[2.5rem] overflow-hidden relative group transition-all duration-500 bg-gradient-to-br from-indigo-600 to-blue-500 shadow-2xl shadow-indigo-600/20"
          >
            {/* Efecto de Brillo de la Tarjeta (Shine) */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 animate-shine pointer-events-none z-0" />
            
            {/* Texto descriptivo superior */}
            <div className="absolute top-0 left-0 w-full p-8 md:p-12 z-20 pointer-events-none flex flex-col items-start">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 font-sora tracking-tight">Meet your new Expert.</h3>
                <p 
                    className={`text-sm md:text-base font-medium leading-relaxed text-indigo-100 max-w-[85%] md:max-w-[340px] transition-all duration-1000 transform ${isCardVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
                    style={{ animationDelay: '100ms' }}
                >
                    Stop digging through spreadsheets. TxA identifies trends, anomalies, and emerging risks in plain language.
                </p>
            </div>

            {/* CONTENIDO VISUAL INFERIOR: CHAT ANIMADO */}
            <div className="absolute bottom-0 left-0 w-full h-[60%] md:h-full z-10 pointer-events-none overflow-hidden flex items-end justify-end">
                <div className="w-full h-full flex items-end justify-end p-4 md:p-10">
                    
                    <div className="w-full max-w-[480px] flex flex-col gap-3 md:gap-4 transform scale-[0.90] origin-bottom-right md:scale-100">
                        
                        {/* Mensaje del Usuario */}
                        <div className={`self-end bg-white/10 backdrop-blur-md text-white px-5 py-3 rounded-2xl rounded-tr-sm max-w-[90%] border border-white/20 shadow-lg transition-all duration-500 transform ${showUserMessage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                            <p className="text-sm font-medium">Any emerging trends in zone B?</p>
                        </div>
                        
                        {/* Animación de "Escribiendo..." - siempre en DOM, controlado por opacity */}
                        <div className={`self-start flex gap-3 transition-all duration-300 ${isTyping ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 shadow-sm border border-white/10">
                                <Sparkles className="w-4 h-4 text-white" />
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-2xl rounded-tl-sm border border-white/10">
                                <MoreHorizontal className="w-5 h-5 text-white animate-pulse" />
                            </div>
                        </div>
                        
                        {/* Respuesta de la IA */}
                        <div className={`self-start flex flex-col gap-3 max-w-[95%] transition-all duration-500 transform ${showAiResponse ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 hidden'}`}>
                            
                            {/* Globo 1: Insight */}
                            <div className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 mt-1 shadow-lg shadow-indigo-900/20">
                                    <Sparkles className="w-4 h-4 text-indigo-600" />
                                </div>
                                <div className="bg-white text-slate-800 p-4 rounded-2xl rounded-tl-sm shadow-xl">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-indigo-600">TxA Insight</span>
                                    </div>
                                    <p className="text-sm leading-relaxed font-medium">
                                        Detected a <span className="font-bold text-indigo-900">15% increase</span> in <span className="italic">Listeria spp.</span> positives near Line 4.
                                    </p>
                                </div>
                            </div>

                            {/* Globo 2: Call to Action (Sampling Scheme) */}
                            <div className="flex gap-3">
                                <div className="w-8 h-8 shrink-0" />
                                <div className="bg-white text-slate-800 p-4 rounded-2xl rounded-tl-sm shadow-xl w-full pointer-events-auto">
                                    <p className="text-sm leading-relaxed font-medium mb-3">
                                        Based on recent <span className="italic">Listeria spp.</span> trends, I've generated an optimized targeted sampling map.
                                    </p>
                                    <div className="border border-indigo-100 rounded-xl p-3 bg-indigo-50/50 hover:bg-indigo-50 transition-colors cursor-pointer group/cta">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-[9px] md:text-[10px] font-extrabold text-indigo-900 uppercase tracking-wider">BEST SAMPLING SCHEME</span>
                                            <MousePointerClick className="w-4 h-4 text-indigo-500 group-hover/cta:scale-110 transition-transform" />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-lg bg-indigo-100 flex items-center justify-center shrink-0">
                                                <Map className="w-3 h-3 text-indigo-600" />
                                            </div>
                                            <p className="text-[10px] font-bold text-indigo-700 leading-tight">Click here to see the proposed sampling scheme.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        .font-sora { font-family: var(--font-sora), sans-serif; }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        .animate-fade-in {
            animation: fadeIn 0.3s ease-out forwards;
        }

        @keyframes shine {
            from { transform: translateX(-100%) skewX(12deg); }
            to { transform: translateX(200%) skewX(12deg); }
        }
        .animate-shine {
            animation: shine 8s infinite linear;
        }
      `}</style>

    </section>
  );
}