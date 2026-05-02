"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { SUCCESS_STORIES } from "../../industrial/industrialData";

export default function SuccessStories() {
  const t = useTranslations("Industrial.Success");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = window.innerWidth < 768 ? current.clientWidth * 0.85 : current.clientWidth * 0.5; 
      if (direction === "left") {
        current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  const edgePadding = "max(1.5rem, calc((100vw - 80rem) / 2 + 1.5rem))";

  return (
    <section className="bg-white py-16 md:py-18">
      
      {/* ENCABEZADO */}
      <div className="max-w-7xl mx-auto px-10 md:px-20 mb-10 md:mb-16 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-[#FF270A] font-bold tracking-widest uppercase text-xs mb-3 block">
              {t("eyebrow")}
            </span>
            <h2 className="text-4xl md:text-6xl font-extrabold text-[#111111] leading-[1.1] tracking-tight">
              {t("titleA")} <br />
              <span className="text-gray-400">{t("titleB")}</span>
            </h2>
          </div>
          <div className="max-w-md md:text-right pb-1">
            <p className="text-gray-500 text-lg font-medium leading-relaxed">
              {t("body")}
            </p>
          </div>
        </div>
      </div>

      {/* CARRUSEL */}
      <div className="relative w-full group/carousel">
        
        {/* Flechas Desktop */}
        <div className={`hidden md:flex absolute top-1/2 -translate-y-1/2 left-4 z-30 transition-opacity duration-300 opacity-0 group-hover/carousel:opacity-100 ${canScrollLeft ? '' : 'pointer-events-none'}`}>
           <button onClick={() => scroll("left")} className="w-14 h-14 rounded-full bg-white shadow-xl border border-gray-100 text-[#111111] flex items-center justify-center transition-all duration-300 active:scale-95 hover:bg-gray-50">
             <ChevronLeft className="w-8 h-8 opacity-60" />
           </button>
        </div>
        <div className={`hidden md:flex absolute top-1/2 -translate-y-1/2 right-4 z-30 transition-opacity duration-300 opacity-0 group-hover/carousel:opacity-100 ${canScrollRight ? '' : 'pointer-events-none'}`}>
           <button onClick={() => scroll("right")} className="w-14 h-14 rounded-full bg-white shadow-xl border border-gray-100 text-[#111111] flex items-center justify-center transition-all duration-300 active:scale-95 hover:bg-gray-50">
             <ChevronRight className="w-8 h-8 opacity-60" />
           </button>
        </div>

        {/* Área Scrolleable */}
        <div 
          ref={scrollRef}
          onScroll={checkScroll}
          style={{ paddingLeft: edgePadding, paddingRight: edgePadding, scrollPaddingLeft: edgePadding, scrollPaddingRight: edgePadding }}
          className="flex gap-4 md:gap-6 overflow-x-auto pb-6 w-full snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
        >
          {SUCCESS_STORIES.map((story, index) => {
            const isHero = index === 0;

            // LÓGICA DE RUTAS: 
            const hrefDestination = isHero ? "/emp-testing" : `/cases/${story.slug}`;

            return (
              <Link 
                href={hrefDestination}
                key={story.id}
                className={`
                  relative flex-shrink-0 cursor-pointer block group/card
                  ${isHero ? 'w-[85vw] md:w-[800px]' : 'w-[85vw] md:w-[420px]'}
                  h-[460px] md:h-[580px] 
                  rounded-[2.5rem] 
                  flex flex-col justify-between 
                  snap-start transition-transform duration-300 hover:scale-[1.01]
                  overflow-hidden
                  ${isHero 
                    ? 'border-0 bg-black' 
                    : 'bg-black text-white p-8 md:p-10 border border-white/10'
                  }
                `}
              >
                {/* --- CONTENIDO HERO (Primera tarjeta intacta visualmente pero protegida) --- */}
                {isHero ? (
                  <>
                    <div className="absolute inset-0 z-0">
                      <Image 
                        src={story.image} 
                        alt={t(`stories.${story.id}.title`)} 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover/card:scale-105"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent z-10" />

                    <div className="relative z-20 h-full flex flex-col justify-between p-8 md:p-12 max-w-2xl">
                       <div className="flex justify-between items-start">
                         <span className="px-4 py-1.5 rounded-full bg-[#FF270A] text-white text-xs font-bold uppercase tracking-widest shadow-lg backdrop-blur-sm">
                           {t("featured")}
                         </span>
                       </div>

                       <div>
                         <div className="flex items-center gap-3 mb-4">
                            <span className="text-white/90 font-bold uppercase tracking-widest text-sm drop-shadow-md break-words">{t(`stories.${story.id}.client`)}</span>
                         </div>
                         
                         {/* Métrica protegida */}
                         <h3 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight drop-shadow-lg break-words">
                           {t(`stories.${story.id}.metric`)}
                         </h3>
                         
                         {/* Título un poco más pequeño y con límite de líneas */}
                         <p className="text-base sm:text-lg md:text-xl font-bold text-white/95 mb-4 drop-shadow-md break-words line-clamp-2 md:line-clamp-3">
                           {t(`stories.${story.id}.title`)}
                         </p>
                         
                         {/* Descripción protegida */}
                         <p className="text-sm md:text-base font-medium leading-relaxed text-gray-200 mb-6 md:mb-8 line-clamp-3 break-words drop-shadow-sm">
                           {"description" in story ? t(`stories.${story.id}.description`) : ""}
                         </p>
                         
                         <div className="pt-6 border-t border-white/20">
                            <div className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 text-white hover:text-[#FF270A] transition-colors">
                                {t("readCase")} <ArrowRight className="w-4 h-4" />
                            </div>
                         </div>
                       </div>
                    </div>
                  </>
                ) : (
                  /* --- CONTENIDO NORMAL (Casos 2 al 5) --- */
                  <>
                    <div className="absolute inset-0 z-0">
                      <Image 
                        src={story.image} 
                        alt={t(`stories.${story.id}.title`)} 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover/card:scale-105"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/60 z-10" />

                    <div className="relative z-20 flex flex-col justify-between h-full">
                        
                        {/* Header: Cliente y Tag */}
                        <div className="flex justify-between items-start mb-6">
                          <div className="flex flex-col">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#FF270A] mb-1 break-words">
                              {t(`stories.${story.id}.client`)}
                            </span>
                            <div className="flex gap-2 flex-wrap">
                              {story.tags.map(tag => (
                                <span key={tag} className="text-[10px] font-bold text-gray-300 uppercase tracking-wider border border-white/20 px-2 py-0.5 rounded-full backdrop-blur-sm break-words mt-1">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Métrica Central un poco más pequeña */}
                        <div className="flex-1 flex flex-col justify-center mb-4">
                          <span className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tighter mb-2 drop-shadow-md break-words">
                            {t(`stories.${story.id}.metric`)}
                          </span>
                        </div>

                        {/* Footer protegido con alturas mínimas fijas y line clamps */}
                        <div className="flex flex-col justify-end">
                          <h4 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 leading-tight drop-shadow-sm line-clamp-3 break-words min-h-[84px] md:min-h-[108px]">
                            {t(`stories.${story.id}.title`)}
                          </h4>
                          <p className="text-sm font-medium leading-relaxed text-gray-300 mb-6 md:mb-8 line-clamp-3 break-words min-h-[66px] md:min-h-[68px]">
                            {t(`stories.${story.id}.description`)}
                          </p>
                          <div className="pt-6 border-t border-white/20 mt-auto">
                              <div className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 text-white group-hover/card:text-[#FF270A] transition-colors">
                                {t("readSuccess")} <ArrowRight className="w-3 h-3 group-hover/card:translate-x-1 transition-transform" />
                              </div>
                          </div>
                        </div>

                    </div>
                  </>
                )}
              </Link>
            );
          })}
        </div>

        {/* --- CONTROLES MÓVILES --- */}
        <div className="flex md:hidden justify-end gap-3 px-6 mt-4">
           <button 
             onClick={() => scroll("left")} 
             disabled={!canScrollLeft}
             className={`w-10 h-10 rounded-full bg-[#111111] text-white flex items-center justify-center transition-all active:scale-95 ${!canScrollLeft ? 'opacity-30 cursor-not-allowed' : 'opacity-100 shadow-lg'}`}
             aria-label={t("scrollLeft")}
           >
             <ChevronLeft className="w-5 h-5" />
           </button>
           <button 
             onClick={() => scroll("right")} 
             disabled={!canScrollRight}
             className={`w-10 h-10 rounded-full bg-[#111111] text-white flex items-center justify-center transition-all active:scale-95 ${!canScrollRight ? 'opacity-30 cursor-not-allowed' : 'opacity-100 shadow-lg'}`}
             aria-label={t("scrollRight")}
           >
             <ChevronRight className="w-5 h-5" />
           </button>
        </div>

      </div>
    </section>
  );
}