"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight,
  TrendingUp,
  Award
} from "lucide-react";
import { SUCCESS_STORIES } from "../../industrial/industrialData";

export default function SuccessStories() {
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
      const scrollAmount = current.clientWidth * 0.5; 
      if (direction === "left") {
        current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  const edgePadding = "max(1.5rem, calc((100vw - 80rem) / 2 + 1.5rem))";

  return (
    // CAMBIO ESPACIADO: py-16 md:py-24
    <section className="bg-white py-16 md:py-24">
      
      {/* ENCABEZADO */}
      <div className="max-w-7xl mx-auto px-10 md:px-20 mb-16 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-[#FF270A] font-bold tracking-widest uppercase text-xs mb-3 block">
              Proven Impact
            </span>
            <h2 className="text-4xl md:text-6xl font-extrabold text-[#111111] leading-[1.1] tracking-tight">
              Real problems. <br />
              <span className="text-gray-400">Solved by science.</span>
            </h2>
          </div>
          <div className="max-w-md md:text-right pb-1">
            <p className="text-gray-500 text-lg font-medium leading-relaxed">
              From reducing warehouse costs to preventing recalls. See how industry leaders are leveraging our ecosystem.
            </p>
          </div>
        </div>
      </div>

      {/* CARRUSEL */}
      <div className="relative w-full group">
        
        {/* Flechas */}
        <div className={`hidden md:flex absolute top-1/2 -translate-y-1/2 left-4 z-30 transition-opacity duration-300 ${canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
           <button onClick={() => scroll("left")} className="w-14 h-14 rounded-full bg-white shadow-xl border border-gray-100 text-[#111111] flex items-center justify-center transition-all duration-300 active:scale-95 hover:bg-gray-50">
             <ChevronLeft className="w-8 h-8 opacity-60" />
           </button>
        </div>
        <div className={`hidden md:flex absolute top-1/2 -translate-y-1/2 right-4 z-30 transition-opacity duration-300 ${canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
           <button onClick={() => scroll("right")} className="w-14 h-14 rounded-full bg-white shadow-xl border border-gray-100 text-[#111111] flex items-center justify-center transition-all duration-300 active:scale-95 hover:bg-gray-50">
             <ChevronRight className="w-8 h-8 opacity-60" />
           </button>
        </div>

        {/* Scrolleable */}
        <div 
          ref={scrollRef}
          onScroll={checkScroll}
          style={{ paddingLeft: edgePadding, paddingRight: edgePadding, scrollPaddingLeft: edgePadding, scrollPaddingRight: edgePadding }}
          className="flex gap-4 md:gap-6 overflow-x-auto pb-12 w-full snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
        >
          {SUCCESS_STORIES.map((story, index) => {
            const isHero = index === 0;

            return (
              <div 
                key={story.id}
                className={`
                  relative flex-shrink-0 
                  ${isHero ? 'w-[85vw] md:w-[800px]' : 'w-[85vw] md:w-[420px]'}
                  h-[580px] 
                  rounded-[2.5rem] 
                  flex flex-col justify-between 
                  snap-start transition-transform duration-300 hover:scale-[1.01]
                  overflow-hidden
                  ${isHero 
                    ? 'border-0 bg-black' 
                    : 'bg-[#F4F4F5] text-[#111111] p-8 md:p-10 border border-transparent'
                  }
                `}
              >
                {isHero ? (
                  <>
                    <div className="absolute inset-0 z-0 opacity-60">
                      <Image 
                        src={story.image} 
                        alt={story.title} 
                        fill 
                        className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent z-10" />

                    <div className="relative z-20 h-full flex flex-col justify-between p-8 md:p-12 max-w-2xl">
                       <div className="flex justify-between items-start">
                         <span className="px-4 py-1.5 rounded-full bg-[#FF270A] text-white text-xs font-bold uppercase tracking-widest shadow-lg">
                           Featured Case
                         </span>
                       </div>

                       <div>
                         <div className="flex items-center gap-3 mb-4">
                            <Award className="w-8 h-8 text-[#FF270A]" />
                            <span className="text-white/80 font-bold uppercase tracking-widest text-sm">{story.client}</span>
                         </div>
                         <h3 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
                           {story.metric}
                         </h3>
                         <p className="text-xl font-bold text-white/90 mb-4">
                           {story.title}
                         </p>
                         <p className="text-base font-medium leading-relaxed text-gray-300 mb-8 line-clamp-3">
                           {story.description}
                         </p>
                         
                         <div className="pt-6 border-t border-white/20">
                            <button className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 text-white hover:text-[#FF270A] transition-colors">
                                Read Case Study <ArrowRight className="w-4 h-4" />
                            </button>
                         </div>
                       </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="relative z-10 flex justify-between items-start mb-6">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#FF270A] mb-1">
                          {story.client}
                        </span>
                        <div className="flex gap-2">
                           {story.tags.map(tag => (
                             <span key={tag} className="text-[10px] font-bold text-gray-400 uppercase tracking-wider border border-gray-200 px-2 py-0.5 rounded-full">
                               {tag}
                             </span>
                           ))}
                        </div>
                      </div>
                      <TrendingUp className="w-6 h-6 text-gray-300" />
                    </div>

                    <div className="relative z-10 flex-1 flex flex-col justify-center mb-4">
                       <span className="text-5xl md:text-6xl font-black text-[#111111] tracking-tighter mb-2">
                         {story.metric.split(" ")[0]}
                       </span>
                       <span className="text-lg md:text-xl font-medium text-gray-500">
                         {story.metric.split(" ").slice(1).join(" ")}
                       </span>
                    </div>

                    <div className="relative z-10">
                       <h4 className="text-xl font-bold text-[#111111] mb-3 leading-tight">
                         {story.title}
                       </h4>
                       <p className="text-sm font-medium leading-relaxed text-gray-500 mb-8 line-clamp-3">
                         {story.description}
                       </p>
                       <div className="pt-6 border-t border-black/10">
                          <button className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 text-[#111111] hover:text-[#FF270A] transition-colors group">
                             Read full story <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                          </button>
                       </div>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}