"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Zap, Activity, ShieldCheck, TrendingDown } from "lucide-react";
import { useTranslations } from "next-intl";

// 1. IMPORTAMOS LAS HERRAMIENTAS DEL MODAL Y LOS DATOS
import { useModal } from "../industrial/ModalProvider"; // Ajusta la ruta si es necesario
import FeaturedSolutionTemplate from "../industrial/modals/FeaturedSolutionTemplate"; // Ajusta la ruta si es necesario
import { FEATURED_MODALS_DATA } from "../data/featuredSolutionsData"; // Ajusta la ruta si es necesario

type AdvantageCopy = { title: string; text: string };
type ProtocolRowCopy = { feature: string; col1: string; col2: string };
type UpcomingProductCopy = { desc: string; launch?: string };

function localizeZeroRiskModal(data: any, tModal: ReturnType<typeof useTranslations>) {
  const mainDescriptions = tModal.raw("eleviaProducts.main") as string[];
  const upcoming = tModal.raw("eleviaProducts.upcoming") as UpcomingProductCopy[];
  const orderingDescriptions = tModal.raw("orderingDescriptions") as string[];

  return {
    ...data,
    title: tModal("title"),
    subtitle: tModal("subtitle"),
    description: tModal("description"),
    eleviaProducts: {
      ...data.eleviaProducts,
      intro: tModal("eleviaProducts.intro"),
      main: data.eleviaProducts.main.map((product: any, index: number) => ({
        ...product,
        desc: mainDescriptions[index] ?? product.desc,
      })),
      upcoming: data.eleviaProducts.upcoming?.map((product: any, index: number) => ({
        ...product,
        desc: upcoming[index]?.desc ?? product.desc,
        launch: upcoming[index]?.launch ?? product.launch,
      })),
    },
    advantages: tModal.raw("advantages") as string[],
    matrices: tModal.raw("matrices") as string[],
    table: {
      ...data.table,
      title: tModal("table.title"),
      rows: tModal.raw("table.rows") as ProtocolRowCopy[],
    },
    orderingInfo: data.orderingInfo.map((item: any, index: number) => ({
      ...item,
      description: orderingDescriptions[index] ?? item.description,
    })),
    txaSection: {
      ...data.txaSection,
      title: tModal("txaSection.title"),
      desc: tModal("txaSection.desc"),
      linkText: tModal("txaSection.linkText"),
    },
  };
}

function EnvironmentalAdvantageVisual({ id }: { id: number }) {
  switch (id) {
    case 1:
      return (
        <div className="absolute inset-0 bg-black flex items-center justify-center overflow-hidden">
          <div className="text-[140px] font-black leading-none text-transparent bg-clip-text bg-gradient-to-br from-white via-white/80 to-white/5 select-none drop-shadow-[0_0_20px_rgba(255,255,255,0.15)] tracking-tighter">
            0
          </div>
          <div className="absolute w-[120%] h-[2px] bg-red-500/80 -rotate-45 shadow-[0_0_20px_rgba(239,68,68,0.8)] z-10"></div>
          <div className="absolute w-40 h-40 bg-red-600/10 blur-3xl rounded-full"></div>
        </div>
      );
    case 2:
      return (
        <div className="absolute inset-0 bg-black flex flex-col items-center justify-center overflow-hidden px-6">
          <div className="absolute w-32 h-32 bg-purple-600/10 blur-3xl rounded-full"></div>
          <div className="w-full bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-sm relative z-10">
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-3">
              <div className="h-full bg-purple-500 rounded-full w-full shadow-[0_0_10px_rgba(168,85,247,0.8)]"></div>
            </div>
            <div className="flex justify-between items-center">
              <Zap className="w-4 h-4 text-purple-400" />
              <div className="flex items-baseline gap-1">
                <span className="text-xs text-white font-mono font-bold">03:00</span>
                <span className="text-[9px] text-purple-300 font-bold tracking-wider">HRS</span>
              </div>
            </div>
          </div>
        </div>
      );
    case 3:
      return (
        <div className="absolute inset-0 bg-black flex flex-col justify-center items-center overflow-hidden">
          <div className="relative w-full h-[50%]">
            <Image src="/prot3.png" alt="" fill className="object-contain object-center" />
          </div>
        </div>
      );
    case 4:
      return (
        <div className="absolute inset-0 bg-black flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.3)_1px,transparent_1px)] bg-[size:14px_14px]"></div>
          <div className="relative z-10 flex items-center justify-center w-24 h-24 rounded-2xl bg-white/5 border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.02)] backdrop-blur-md">
            <div className="grid grid-cols-3 gap-2 p-1">
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className={`w-3.5 h-3.5 rounded-full ${i === 4 ? "bg-[#FF270A] shadow-[0_0_15px_rgba(255,39,10,0.9)]" : "bg-white/20"}`}
                ></div>
              ))}
            </div>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#FF270A]/10 blur-3xl rounded-full z-0"></div>
        </div>
      );
    case 5:
      return (
        <div className="absolute inset-0 bg-black flex items-center justify-center overflow-hidden">
          <div className="relative w-24 h-24 flex items-center justify-center">
            <div
              className="absolute inset-0 rounded-full border-2 border-emerald-500/20 border-t-emerald-500 animate-spin"
              style={{ animationDuration: "3s" }}
            ></div>
            <Activity className="w-8 h-8 text-emerald-400" />
          </div>
        </div>
      );
    case 6:
      return (
        <div className="absolute inset-0 bg-black flex items-center justify-center overflow-hidden">
          <div className="relative w-20 h-20 rounded-full bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
            <div className="absolute inset-0 rounded-full border border-orange-500/50 animate-ping opacity-20"></div>
            <ShieldCheck className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      );
    case 7:
      return (
        <div className="absolute inset-0 bg-black flex items-end justify-center overflow-hidden pb-8 gap-5">
          <div className="w-12 h-48 bg-white/5 rounded-t-xl border-t border-white/10 relative">
            <TrendingDown className="w-8 h-8 text-green-400 absolute -top-12 left-1/2 -translate-x-1/2" />
          </div>
          <div className="w-12 h-28 bg-white/10 rounded-t-xl border-t border-white/20"></div>
          <div className="w-12 h-12 bg-green-500/20 rounded-t-xl border-t-2 border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.3)] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-green-500/20 to-transparent"></div>
          </div>
        </div>
      );
    case 8:
      return (
        <div className="absolute inset-0 bg-black flex flex-col justify-end items-center overflow-hidden">
          <div className="relative w-full h-[80%] mt-auto">
            <Image src="/TxA.png" alt="" fill className="object-contain object-bottom" />
          </div>
        </div>
      );
    default:
      return null;
  }
}

export default function EleviaEnvironmental() {
  const t = useTranslations("EmpTesting.EleviaEnvironmental");
  const tModal = useTranslations("Industrial.FeaturedModalData.zeroRiskEmp");
  const advantages = t.raw("advantages") as AdvantageCopy[];
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // 2. EXTRAEMOS LA FUNCIÓN PARA ABRIR MODALES
  const { openModal } = useModal();

  const checkScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 5);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 280; 
      carouselRef.current.scrollBy({ 
        left: direction === 'left' ? -scrollAmount : scrollAmount, 
        behavior: 'smooth' 
      });
    }
  };

  // 3. FUNCIÓN PARA ABRIR EL MODAL ESPECÍFICO DE EMP
  const handleOpenEMPModal = () => {
    const modalData = FEATURED_MODALS_DATA["zero-risk-emp"];
    if (modalData) {
      openModal(<FeaturedSolutionTemplate data={localizeZeroRiskModal(modalData, tModal)} />);
    }
  };

  return (
    <section data-header-theme="dark" className="relative w-full bg-[#121212] pt-24 pb-8 md:pt-32 md:pb-16 flex flex-col items-center justify-center overflow-hidden">      
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scroll::-webkit-scrollbar {
          display: none !important;
        }
        .hide-scroll {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
      `}} />

      {/* ========================================================= */}
      {/* 1. TARJETA PRINCIPAL (Hero Ambiental)                     */}
      {/* ========================================================= */}
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 mb-20 md:mb-32">
        <div className="relative w-full min-h-[550px] md:min-h-[700px] rounded-[2rem] overflow-hidden flex flex-col">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <Image src="/env.png" alt={t("heroImageAlt")} fill className="object-cover object-center" priority />
          </div>

          <div className="absolute inset-0 z-10 bg-black/40 bg-gradient-to-bl from-black/80 via-black/20 to-transparent pointer-events-none"></div>

          <div className="absolute inset-0 z-20 w-full flex flex-col justify-between md:justify-start items-end p-8 pr-16 md:p-16 md:pr-40">
            <div className="w-full max-w-[380px] flex flex-col items-end">
              <span className="text-left text-xs md:text-sm font-bold tracking-[0.2em] text-[#FF270A] uppercase mb-4 block w-full">
                {t("eyebrow")}
              </span>
              <h2 className="text-left text-2xl md:text-4xl font-bold text-white mb-5 tracking-tight leading-tight w-full">
                {t("titleLine1")} <br className="hidden md:block" /> {t("titleLine2")}
              </h2>
            </div>
            <div className="w-full max-w-[380px] flex flex-col items-end md:mt-6">
              <p className="text-left text-sm md:text-base text-white/90 font-medium leading-relaxed w-full">
                {t("body")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. CARRUSEL DE VENTAJAS                                   */}
      {/* ========================================================= */}
      <div className="w-full relative">
        
        <div 
          ref={carouselRef}
          onScroll={checkScroll}
          className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory hide-scroll pb-6 pl-[max(1rem,calc(50vw_-_600px_+_1rem))] scroll-pl-[max(1rem,calc(50vw_-_600px_+_1rem))]"
        >
          {advantages.map((adv, index) => {
            const id = index + 1;
            return (
              <div key={id} className="snap-start shrink-0 flex flex-col w-[220px] md:w-[260px]">
                <div className="relative w-full aspect-[4/5] rounded-[1.5rem] bg-black overflow-hidden mb-5">
                  <EnvironmentalAdvantageVisual id={id} />
                </div>
                <div>
                  <p className="text-[13px] md:text-[15px] text-white/70 leading-relaxed font-medium">
                    <strong className="text-white font-semibold mr-1">{adv.title}</strong>
                    {adv.text}
                  </p>
                </div>
              </div>
            );
          })}
          
          <div className="shrink-0 w-[max(1rem,calc(50vw_-_600px_+_1rem))]"></div>
        </div>
        
        {/* Controles y Learn More */}
        <div className="flex items-center justify-between mt-4 px-4 max-w-[1200px] mx-auto w-full">
          
          {/* 4. REEMPLAZAMOS EL ENLACE <a> POR UN BOTÓN CON onClick */}
          <button 
            onClick={handleOpenEMPModal}
            className="inline-flex items-center gap-1.5 text-sm md:text-base text-white hover:text-white/70 transition-colors font-medium group"
          >
            {t("learnMore")}
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>

          <div className="flex gap-3">
            <button 
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all backdrop-blur-md ${
                canScrollLeft 
                  ? "bg-white/5 hover:bg-white/10 text-white/70 hover:text-white cursor-pointer" 
                  : "bg-white/5 text-white/30 opacity-50 cursor-not-allowed"
              }`}
              aria-label={t("carouselPrev")}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <button 
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all backdrop-blur-md ${
                canScrollRight 
                  ? "bg-white/5 hover:bg-white/10 text-white/70 hover:text-white cursor-pointer" 
                  : "bg-white/5 text-white/30 opacity-50 cursor-not-allowed"
              }`}
              aria-label={t("carouselNext")}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>

        </div>

      </div>
      
    </section>
  );
}
