"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Clock, ShieldAlert, CheckCircle2, Package, Mail } from "lucide-react";

// IMPORTAMOS LAS HERRAMIENTAS DEL MODAL Y EL CTA
import { useModal } from "../industrial/ModalProvider"; // Ajusta la ruta si es diferente
import { useCTA } from "@/app/components/CTAProvider"; // Ajusta la ruta si es diferente

// --- DATOS INVENTADOS PARA LA TABLA DEL MODAL ---
const FOOD_VALIDATIONS_DATA = [
  { kit: "Elevia Salmonella", matrix: "Cocoa liquor & Chocolate", grammage: "375 g", time: "8 hours" },
  { kit: "Elevia Salmonella", matrix: "Raw ground beef, 90% lean", grammage: "25 g", time: "6 hours" },
  { kit: "Elevia Salmonella + EB", matrix: "Non-fat dry milk", grammage: "375 g", time: "7 hours" },
  { kit: "Elevia Salmonella + Listeria spp.", matrix: "Ready-to-Eat (RTE) Meats", grammage: "25 g", time: "8 hours" },
  { kit: "Elevia Listeria monocytogenes", matrix: "Soft Cheeses & Dairy", grammage: "25 g", time: "7 hours" },
  { kit: "Elevia E. coli O157:H7", matrix: "Fresh Spinach & Leafy Greens", grammage: "200 g", time: "6 hours" },
];

// --- COMPONENTE DEL MODAL (Estilo idéntico a FeaturedSolutionTemplate) ---
function FoodModalContent() {
  const { closeModal } = useModal();
  const { openMeeting } = useCTA();

  return (
    <div className="w-full bg-white rounded-[2.5rem] overflow-hidden flex flex-col">
      {/* HERO IMAGE */}
      <div className="relative w-full h-[250px] md:h-[350px] bg-[#111111]">
         <Image 
           src="/foods2.png" 
           alt="Elevia Food" 
           fill 
           className="object-cover object-center opacity-90" 
           priority 
         />
      </div>

      {/* HEADER */}
      <div className="px-8 md:px-12 pt-16 md:pt-24 bg-white w-full pb-12">
        <div className="max-w-5xl mx-auto w-full">
            <span className="text-[#FF270A] font-bold uppercase tracking-widest text-xs md:text-sm mb-6 block">
               Finished Product Testing
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-[#111111] tracking-tight leading-tight mb-6">
               Elevia Validated Food Matrices
            </h2>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-4xl">
               By targeting active RNA, Elevia technology dramatically reduces hold times. Discover our ultra-fast enrichment protocols across a wide range of highly complex food matrices.
            </p>
        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="px-8 md:px-12 pb-20 bg-white w-full">
        <div className="max-w-5xl mx-auto w-full">
           <h3 className="text-3xl md:text-4xl font-extrabold text-[#111111] tracking-tight leading-tight mb-8">
             Kits & Protocols
           </h3>
           <div className="overflow-x-auto pb-4">
             <table className="w-full text-left border-collapse min-w-[700px]">
               <thead>
                 <tr className="border-b-2 border-[#111111]">
                   <th className="py-4 pr-4 font-bold text-[#111111] text-[10px] uppercase tracking-widest w-[30%]">Elevia Kit</th>
                   <th className="py-4 px-4 font-bold text-[#111111] text-[10px] uppercase tracking-widest w-[35%]">Matrix</th>
                   <th className="py-4 px-4 font-bold text-[#111111] text-[10px] uppercase tracking-widest w-[15%]">Grammage</th>
                   <th className="py-4 pl-4 font-bold text-[#111111] text-[10px] uppercase tracking-widest w-[20%]">Enrichment Time</th>
                 </tr>
               </thead>
               <tbody>
                 {FOOD_VALIDATIONS_DATA.map((row, i) => (
                   <tr key={i} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                     <td className="py-5 pr-4 font-bold text-[#111111] text-sm">{row.kit}</td>
                     <td className="py-5 px-4 text-gray-600 text-sm leading-relaxed">{row.matrix}</td>
                     <td className="py-5 px-4 text-gray-600 text-sm">{row.grammage}</td>
                     <td className="py-5 pl-4 font-bold text-[#FF270A] text-sm">{row.time}</td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>
      </div>

      {/* FOOTER CTA */}
      <div className="p-8 md:p-12 flex justify-end items-center bg-[#F4F4F5]">
         <button
           onClick={() => { closeModal(); openMeeting(); }}
           className="w-full md:w-auto py-4 px-8 bg-[#111111] hover:bg-[#FF270A] text-white rounded-full text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl hover:-translate-y-1"
         >
            <Mail className="w-5 h-5" />
            Request Full Validation Report
         </button>
      </div>
    </div>
  );
}

// --- DATOS DEL CARRUSEL DE VENTAJAS (FOOD) ---
const FOOD_ADVANTAGES = [
  {
    id: 1,
    title: "Ultra-fast release.",
    text: "Get actionable results in just 7 to 9 hours for most food matrices, allowing you to release products same-day.",
    visual: (
      <div className="absolute inset-0 bg-[#0a0a0a] flex flex-col items-center justify-center overflow-hidden px-6 border border-white/5">
          <div className="w-full bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-sm relative z-10">
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-3">
                   <div className="h-full bg-[#FF270A] rounded-full w-full shadow-[0_0_10px_rgba(255,39,10,0.8)]"></div>
              </div>
              <div className="flex justify-between items-center">
                   <Clock className="w-4 h-4 text-[#FF270A]" />
                   <div className="flex items-baseline gap-1">
                       <span className="text-xs text-white font-mono font-bold">08:00</span>
                       <span className="text-[9px] text-[#FF270A]/80 font-bold tracking-wider">HRS</span>
                   </div>
              </div>
          </div>
      </div>
    )
  },
  {
    id: 2,
    title: "Super simple workflow. ",
    text: "Compatible with open-platform thermocyclers. Its streamlined protocol allows any analyst to run the kits effortlessly.",
    visual: (
      <div className="absolute inset-0 bg-[#0a0a0a] flex items-center justify-center overflow-hidden border border-white/5">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.3)_1px,transparent_1px)] bg-[size:14px_14px]"></div>
        <div className="relative z-10 flex items-center justify-center w-24 h-24 rounded-2xl bg-white/5 border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.02)] backdrop-blur-md">
           <div className="grid grid-cols-3 gap-2 p-1">
             {[...Array(9)].map((_, i) => (
               <div key={i} className={`w-3.5 h-3.5 rounded-full ${i === 4 ? 'bg-[#FF270A] shadow-[0_0_15px_rgba(255,39,10,0.9)]' : 'bg-white/20'}`}></div>
             ))}
           </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#FF270A]/10 blur-3xl rounded-full z-0"></div>
      </div>
    )
  },
  {
    id: 3,
    title: "Live cell focus.",
    text: "Elevia's RNA technology exclusively targets living pathogens, eliminating false positives caused by dead cells from cooking or pasteurization.",
    visual: (
      <div className="absolute inset-0 bg-[#0a0a0a] flex items-center justify-center overflow-hidden border border-white/5">
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes vibrate-dots {
              0% { transform: translate(0, 0); }
              20% { transform: translate(-1.5px, 1.5px); }
              40% { transform: translate(-1.5px, -1.5px); }
              60% { transform: translate(1.5px, 1.5px); }
              80% { transform: translate(1.5px, -1.5px); }
              100% { transform: translate(0, 0); }
            }
            .dot-vibrate {
               animation: vibrate-dots 0.99s infinite linear alternate;
            }
          `}} />
          <div className="absolute inset-0 w-full h-full z-10">
             <div className="dot-vibrate absolute top-[25%] left-[25%] w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.9)]" style={{animationDelay: '0.1s'}}></div>
             <div className="dot-vibrate absolute top-[65%] left-[20%] w-4 h-4 bg-purple-500 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.9)]" style={{animationDelay: '0.2s'}}></div>
             <div className="dot-vibrate absolute top-[30%] right-[25%] w-3 h-3 bg-[#FF270A] rounded-full shadow-[0_0_15px_rgba(255,39,10,0.9)]" style={{animationDelay: '0.3s'}}></div>
             <div className="dot-vibrate absolute top-[50%] left-[45%] w-2.5 h-2.5 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.9)]" style={{animationDelay: '0.0s'}}></div>
             <div className="dot-vibrate absolute bottom-[25%] right-[35%] w-3.5 h-3.5 bg-purple-500 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.9)]" style={{animationDelay: '0.15s'}}></div>
             <div className="dot-vibrate absolute bottom-[40%] right-[15%] w-3 h-3 bg-[#FF270A] rounded-full shadow-[0_0_15px_rgba(255,39,10,0.9)]" style={{animationDelay: '0.25s'}}></div>
          </div>
          <div className="absolute bottom-0 w-full h-1/2 bg-purple-500/10 blur-3xl pointer-events-none z-0"></div>
      </div>
    )
  },
  {
    id: 4,
    title: "Reduced holding costs.",
    text: "By releasing products days earlier, you significantly reduce warehousing space and tied-up capital from immobilized products, maximizing your cash flow.",
    visual: (
      <div className="absolute inset-0 bg-[#0a0a0a] flex flex-col items-center justify-center overflow-hidden border border-white/5">
         <div className="relative w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-3 border border-emerald-500/20">
            <Package className="w-8 h-8 text-emerald-400" strokeWidth={1.5} />
         </div>
         <span className="text-[10px] tracking-widest text-white/50 uppercase text-center leading-tight">Warehouse<br/>Savings</span>
      </div>
    )
  },
  {
    id: 5,
    title: "Complex matrices.",
    text: "Validated for highly inhibitory food types, including spices, cocoa, and high-fat products, without signal interference.",
    visual: (
      <div className="absolute inset-0 bg-[#0a0a0a] flex items-center justify-center overflow-hidden border border-white/5">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:10px_10px]"></div>
          <div className="relative w-20 h-20 flex items-center justify-center z-10">
             <div className="absolute w-12 h-12 border-2 border-amber-500/40 rounded-lg rotate-12"></div>
             <div className="absolute w-14 h-14 border-2 border-amber-600/30 rounded-full -rotate-12 translate-x-2"></div>
             <div className="absolute w-10 h-10 bg-amber-500/10 backdrop-blur-sm border border-amber-400/50 rounded-sm -translate-x-2 translate-y-2"></div>
             <div className="absolute w-3 h-3 bg-amber-400 rounded-full shadow-[0_0_15px_rgba(251,191,36,1)]"></div>
          </div>
          <div className="absolute bottom-0 w-full h-1/3 bg-amber-500/10 blur-xl z-0"></div>
      </div>
    )
  },
  {
    id: 6,
    title: "Extended shelf life.",
    text: "By cutting testing time by days, you add valuable days to your product's commercial shelf life, increasing profitability.",
    visual: (
      <div className="absolute inset-0 bg-[#0a0a0a] flex flex-col items-center justify-center overflow-hidden border border-white/5">
         <span className="text-5xl font-black text-white mb-2">+2</span>
         <span className="text-xs tracking-widest text-white/50 uppercase">Days</span>
      </div>
    )
  },
  {
    id: 7,
    title: "Brand protection.",
    text: "Ensure absolute confidence in every batch before it leaves the facility, protecting your consumers and your reputation.",
    visual: (
      <div className="absolute inset-0 bg-[#0a0a0a] flex items-center justify-center overflow-hidden border border-white/5">
          <ShieldAlert className="w-12 h-12 text-blue-500/80 stroke-[1.5]" />
          <CheckCircle2 className="absolute top-1/2 left-1/2 translate-x-1 -translate-y-4 w-5 h-5 text-white bg-[#0a0a0a] rounded-full" />
      </div>
    )
  }
];

export default function EleviaFood() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // EXTRAEMOS LA FUNCIÓN DEL MODAL
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

  // FUNCIÓN PARA ABRIR EL MODAL DE LA TABLA
  const handleOpenFoodModal = () => {
    openModal(<FoodModalContent />);
  };

  return (
    <section className="relative w-full bg-black py-24 md:py-32 flex flex-col items-center justify-center overflow-hidden border-t border-white/10">      
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
      {/* 1. TARJETA PRINCIPAL (Hero Food)                          */}
      {/* ========================================================= */}
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 mb-20 md:mb-32">
        <div className="relative w-full min-h-[700px] md:min-h-[900px] rounded-[2rem] overflow-hidden flex flex-col bg-neutral-900">
          
          <div className="absolute inset-0 z-0 pointer-events-none">
            <Image 
              src="/Elevia_food5.png" 
              alt="Elevia Food Testing" 
              fill 
              className="object-cover object-center" 
              priority 
            />
          </div>

          <div className="absolute inset-0 z-20 w-full flex justify-start pt-10 md:pt-11">
            <div className="w-[90%] md:w-[55%] lg:w-[54%] flex justify-end pl-6 md:pl-0 pr-4 md:pr-4 lg:pr-4">              
              <div className="w-full max-w-[380px] flex flex-col items-start">
                <span className="text-left text-xs md:text-sm font-bold tracking-[0.2em] text-[#FF270A] uppercase mb-3 block w-full">
                  Finished Product Testing
                </span>
                <h2 className="text-left text-2xl md:text-4xl font-bold text-black mb-5 tracking-tight leading-tight w-full">
                  Release faster. <br className="hidden md:block" /> Hold less.
                </h2>
                <p className="text-left text-sm md:text-base text-black/100 font-medium leading-snug w-full">
                  Elevia dramatically reduces your hold times. By detecting pathogens from finished products in record time, you can release products with confidence days earlier than traditional methods.
                </p>
              </div>
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
          {FOOD_ADVANTAGES.map((adv) => (
            <div key={adv.id} className="snap-start shrink-0 flex flex-col w-[220px] md:w-[260px]">
              <div className="relative w-full aspect-[4/5] rounded-[1.5rem] bg-[#0a0a0a] overflow-hidden mb-5 border border-white/5">
                {adv.visual}
              </div>
              <div>
                <p className="text-[13px] md:text-[15px] text-white/70 leading-relaxed font-medium">
                  <strong className="text-white font-semibold mr-1">{adv.title}</strong>
                  {adv.text}
                </p>
              </div>
            </div>
          ))}
          <div className="shrink-0 w-[max(1rem,calc(50vw_-_600px_+_1rem))]"></div>
        </div>
        
        <div className="flex items-center justify-between mt-4 px-4 max-w-[1200px] mx-auto w-full">
          
          {/* BOTÓN LEARN MORE CONECTADO AL MODAL */}
          <button 
            onClick={handleOpenFoodModal}
            className="inline-flex items-center gap-1.5 text-sm md:text-base text-white hover:text-white/70 transition-colors font-medium group"
          >
            Learn more
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>

          <div className="flex gap-3">
            <button 
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all backdrop-blur-md border border-white/10 ${
                canScrollLeft 
                  ? "bg-white/5 hover:bg-white/10 text-white/70 hover:text-white cursor-pointer" 
                  : "bg-white/5 text-white/30 opacity-50 cursor-not-allowed"
              }`}
              aria-label="Previous slide"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <button 
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all backdrop-blur-md border border-white/10 ${
                canScrollRight 
                  ? "bg-white/5 hover:bg-white/10 text-white/70 hover:text-white cursor-pointer" 
                  : "bg-white/5 text-white/30 opacity-50 cursor-not-allowed"
              }`}
              aria-label="Next slide"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}