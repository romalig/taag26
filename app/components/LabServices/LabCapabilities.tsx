"use client";

import { CheckCircle2, ArrowRight, ShieldCheck, TrendingDown } from "lucide-react";
import Link from "next/link";
import { useCTA } from "../CTAProvider";
import { useRef, useState, useEffect } from "react";
import { useTranslations } from "next-intl";

export default function LabCapabilities() {
  const t = useTranslations("LabNetwork.Capabilities");
  const items = t.raw("items") as Array<{title: string; body: string}>;
  const { openMeeting } = useCTA();

  const [isInView, setIsInView] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    const currentRef = cardRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <section className="w-full bg-white py-20 md:py-32 border-t border-gray-200/50">
      
      {/* Animaciones CSS Ajustadas: Más recorrido y secuenciales */}
      <div className="max-w-7xl px-6 mx-auto">
        
        {/* Header de la sección + Tarjeta ISO */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 mb-16 md:mb-24">
          
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-bold text-[#111111] mb-6 tracking-tight leading-tight">
              {t("title")}
            </h2>
            <p className="text-base md:text-xl text-gray-600 font-medium leading-relaxed">
              {t("body")}
            </p>
          </div>

          {/* Tarjeta ISO: Actualizada a gris claro bg-[#F4F4F5] */}
          <div className="bg-[#F4F4F5] rounded-[2.5rem] p-8 max-w-sm w-full shrink-0 flex items-start gap-6 transition-transform hover:-translate-y-1 duration-300">
            <ShieldCheck className="w-10 h-10 text-[#FF270A] shrink-0 mt-1" strokeWidth={1.5} />
            <div>
              <h4 className="font-bold text-[#111111] text-lg mb-2 leading-tight">{t("isoTitle")}</h4>
              <p className="text-sm text-gray-500 font-medium leading-relaxed">
                {t("isoBody")}
              </p>
            </div>
          </div>
        </div>

        {/* Grilla de Servicios (9 ítems) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12 md:gap-y-16">
          
          {items.map((item, index) => (
            <div key={item.title} className="flex items-start gap-4">
              <CheckCircle2 className="mt-1 w-6 h-6 text-[#FF270A] shrink-0" strokeWidth={2} />
              <div>
                <h4 className="font-bold text-[#111111] text-base md:text-lg mb-2 leading-snug">
                  {item.title}
                </h4>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  {item.body}
                  {index === 7 && (
                    <>
                      {" "}
                      <Link href="/mila" className="text-[#FF270A] hover:underline font-bold inline-flex items-center gap-1 mt-1">
                        {t("learnMore")} <ArrowRight className="w-3 h-3" />
                      </Link>
                    </>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* TARJETA INFERIOR: Actualizada a gris claro bg-[#F4F4F5] */}
        <div 
          ref={cardRef}
          className={`mt-24 bg-[#F4F4F5] rounded-[2.5rem] p-10 md:p-12 flex flex-col xl:flex-row items-center justify-between gap-12 ${isInView ? 'animate-trigger' : ''}`}
        >
          
          <div className="flex flex-col sm:flex-row items-center gap-10 md:gap-14 w-full xl:w-auto justify-center xl:justify-start">
            
            {/* Garantía 1: AHORRO */}
            <div className="flex flex-col md:flex-row items-center gap-5 text-center md:text-left">
              <div className="w-14 h-14 rounded-full bg-[#FF270A]/10 flex items-center justify-center shrink-0 overflow-hidden relative">
                <TrendingDown className="w-7 h-7 text-[#FF270A] css-arrow" strokeWidth={2} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{t("guaranteed")}</p>
                <h5 className="text-xl md:text-2xl font-bold text-[#111111]">{t("savings")}</h5>
              </div>
            </div>
            
            {/* Garantía 2: TIEMPO */}
            <div className="flex flex-col md:flex-row items-center gap-5 text-center md:text-left">
              <div className="relative w-14 h-14 rounded-full bg-[#FF270A]/10 flex items-center justify-center shrink-0">
                 
                 {/* Nuevo contenedor interno para hacer el reloj más pequeño */}
                 <div className="relative w-7 h-7">
                   {/* Marco del reloj */}
                   <div className="absolute inset-0 rounded-full border-[2px] border-[#FF270A]" />
                   {/* Manecilla de Hora (fija apuntando a las 3) */}
                   <div className="absolute top-[50%] left-[50%] w-[35%] h-[2px] bg-[#FF270A] origin-left -mt-[1px]" />
                   {/* Manecilla de Minutos (Gira 360 grados) */}
                   <div className="absolute bottom-[50%] left-[calc(50%-1px)] w-[2px] h-[40%] bg-[#FF270A] origin-bottom css-minute-hand" />
                 </div>

              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{t("guaranteed")}</p>
                <h5 className="text-xl md:text-2xl font-bold text-[#111111]">{t("fastest")}</h5>
              </div>
            </div>

          </div>
          
          {/* Bloque Derecho: Texto y Botón */}
          <div className="flex flex-col items-center xl:items-end text-center xl:text-right max-w-lg shrink-0">
            <p className="text-sm md:text-base text-gray-600 font-medium mb-6 leading-relaxed">
              {t("ctaBodyA")} <strong className="text-[#111111]">{t("ctaStrongA")}</strong> {t("ctaMiddle")} <strong className="text-[#111111]">{t("ctaStrongB")}</strong>.
            </p>
            <button 
              onClick={openMeeting}
              className="px-8 py-4 bg-[#111111] text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#FF270A] transition-colors flex items-center gap-2 shadow-md hover:-translate-y-0.5"
            >
              {t("ctaButton")} <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
      <style jsx>{`
        @keyframes arrow-slide-in {
          0% { transform: translate(-40px, -40px); opacity: 0; }
          100% { transform: translate(0, 0); opacity: 1; }
        }

        @keyframes minute-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .animate-trigger .css-arrow {
          animation: arrow-slide-in 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          opacity: 0;
        }

        .animate-trigger .css-minute-hand {
          animation: minute-spin 1s cubic-bezier(0.4, 0, 0.2, 1) 0.8s forwards;
        }
      `}</style>
    </section>
  );
}
