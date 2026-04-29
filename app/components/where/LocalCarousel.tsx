"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useModal } from "../industrial/ModalProvider";

function NewsModalTemplate({ item }: { item: any }) {
  return (
    <div className="w-full bg-white rounded-[2.5rem] overflow-hidden flex flex-col">
      <div className="relative w-full h-[250px] md:h-[450px] bg-gray-100 shrink-0">
        <Image src={item.image} alt={item.title} fill className="object-cover" />
      </div>
      <div className="p-8 md:p-14">
        <h2 className="text-3xl md:text-5xl font-black text-[#111111] mb-6 tracking-tighter leading-tight">
          {item.title}
        </h2>
        <div className="w-20 h-1 bg-[#FF270A] mb-8"></div>
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-medium whitespace-pre-line">
          {item.fullContent}
        </p>
      </div>
    </div>
  );
}

export default function LocalCarousel({ title, items, t }: { title: string; items: any[]; t: any }) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const { openModal } = useModal();
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 5);
    }
  };

  useEffect(() => { checkScroll(); }, [items]);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 350; 
      carouselRef.current.scrollBy({ 
        left: direction === 'left' ? -scrollAmount : scrollAmount, 
        behavior: 'smooth' 
      });
    }
  };

  if (!items || items.length === 0) return null;

  const edgePadding = "max(1.5rem, calc((100vw - 80rem) / 2 + 1.5rem))";

  return (
    <div className="w-[100vw] relative left-1/2 -translate-x-1/2 mb-24 group/carousel">
      <div className="mb-10 flex items-end justify-between" style={{ paddingLeft: edgePadding, paddingRight: edgePadding }}>
        <h3 className="text-3xl md:text-4xl font-bold text-[#111111] tracking-tight">{title}</h3>
        
        <div className="hidden md:flex gap-2">
            <button onClick={() => scroll('left')} className={`w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center transition-all ${canScrollLeft ? 'opacity-100 hover:bg-gray-50' : 'opacity-30 cursor-not-allowed'}`}>
              <ChevronLeft className="w-5 h-5 text-[#111111]" />
            </button>
            <button onClick={() => scroll('right')} className={`w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center transition-all ${canScrollRight ? 'opacity-100 hover:bg-gray-50' : 'opacity-30 cursor-not-allowed'}`}>
              <ChevronRight className="w-5 h-5 text-[#111111]" />
            </button>
        </div>
      </div>
      
      <div ref={carouselRef} onScroll={checkScroll} style={{ scrollPaddingLeft: edgePadding }} className="flex overflow-x-auto snap-x snap-mandatory pb-4 no-scrollbar scroll-smooth">
        <div className="shrink-0" style={{ width: edgePadding }}></div>

        {items.map((item, idx) => (
          <div key={idx} className={`snap-start shrink-0 flex flex-col w-[85vw] md:w-[350px] ${idx !== items.length - 1 ? 'mr-6' : ''}`}>
            <div className="relative w-full aspect-[16/9] rounded-2xl bg-gray-100 overflow-hidden mb-6 border border-gray-200/50 shadow-sm transition-transform hover:scale-[1.02] duration-300 cursor-pointer" onClick={() => openModal(<NewsModalTemplate item={item} />)}>
               <Image src={item.image} alt={item.title} fill className="object-cover" />
            </div>
            
            <div className="flex flex-col flex-grow pr-2">
               <h4 className="text-xl font-bold text-[#111111] mb-2 leading-tight">{item.title}</h4>
               <p className="text-sm text-gray-500 mb-6 line-clamp-3 leading-relaxed">{item.desc}</p>
               
               <button onClick={() => openModal(<NewsModalTemplate item={item} />)} className="text-sm text-[#FF270A] font-bold hover:underline mt-auto flex items-center gap-2 group w-fit">
                 {t.readArticle} 
                 <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
               </button>
            </div>
          </div>
        ))}
        <div className="shrink-0" style={{ width: edgePadding }}></div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}