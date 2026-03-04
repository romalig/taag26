"use client";

import { useState, useEffect, useRef } from "react";

interface LocalCarouselProps {
  title: string;
  items: any[];
}

export default function LocalCarousel({ title, items }: LocalCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

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
      const scrollAmount = 300; 
      carouselRef.current.scrollBy({ 
        left: direction === 'left' ? -scrollAmount : scrollAmount, 
        behavior: 'smooth' 
      });
    }
  };

  return (
    <div className="w-full relative mb-24">
      <div className="mb-14 pr-4 text-center md:text-left">
        <h3 className="text-3xl md:text-4xl font-bold text-[#111111] tracking-tight">{title}</h3>
      </div>
      
      <div 
        ref={carouselRef}
        onScroll={checkScroll}
        className="flex gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {items.map((item, idx) => (
          <div key={idx} className="snap-start shrink-0 flex flex-col w-[260px] md:w-[280px]">
            <div className="relative w-full rounded-[2rem] bg-white overflow-hidden mb-6 flex items-center justify-center aspect-[4/5]">
               <div className={`absolute w-32 h-32 ${item.glowClass} blur-3xl rounded-full opacity-20`}></div>
               <div className="w-16 h-16 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-100 flex items-center justify-center relative z-10">
                  {item.icon}
               </div>
            </div>
            <div className="pr-4">
               <p className="text-[14px] md:text-[15px] text-gray-600 leading-relaxed font-medium">
                 <strong className="text-[#111111] font-semibold mr-1">{item.title}.</strong>
                 {item.desc}
               </p>
            </div>
          </div>
        ))}
      </div>

      {/* Controles del Carrusel desplazados abajo */}
      <div className="hidden md:flex justify-end gap-3 mt-8 pr-4 w-full">
        <button 
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
            canScrollLeft ? "bg-[#111111] hover:bg-gray-800 text-white cursor-pointer" : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        <button 
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
            canScrollRight ? "bg-[#111111] hover:bg-gray-800 text-white cursor-pointer" : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </div>
    </div>
  );
}