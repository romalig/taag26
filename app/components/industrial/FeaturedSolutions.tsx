"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Clock, TrendingDown } from "lucide-react";
import { useCTA } from "../CTAProvider"; // Ajusta la ruta según tu estructura
import { FEATURED_SOLUTIONS } from "../../industrial/industrialData"; // Ajusta ruta

export default function FeaturedSolutions() {
  const { openMeeting } = useCTA();
  const [isImageVisible, setIsImageVisible] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  // Intersection Observer para la imagen
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsImageVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Función de scroll interna (por si quieres usar el botón Details para ir al panel)
  const scrollToId = (id: string, offset = 120) => {
    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <section id="solutions" className="px-4 md:px-6 mb-8">
      <div className="max-w-7xl mx-auto">
        <div className="relative bg-[#F4F4F5] rounded-[3rem] overflow-hidden pt-16 pb-32 px-6 md:px-16 flex flex-col items-center">
          
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "radial-gradient(#111 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative z-10 text-center mb-8 max-w-2xl mx-auto">
            <span className="text-[#FF270A] font-bold uppercase tracking-widest text-xs mb-4 block">
              Featured SOLUTIONS
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#111111]">
              This is how the future looks like
            </h2>
          </div>

          <div
            ref={imageRef}
            className={`relative w-full max-w-lg h-[250px] md:h-[350px] z-0 mb-12 transition-all duration-1000 ease-out transform ${
              isImageVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-24"
            }`}
          >
            <Image
              src="/2bacterias_verdes3.png"
              alt="Microbiology Hero"
              fill
              className="object-contain"
              priority
            />
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 w-full -mt-26 md:-mt-28">
            {FEATURED_SOLUTIONS.map((solution, idx) => {
              
              // --- CARD TIPO 1: HERO GRANDE (Index 0) ---
              if (idx === 0) {
                return (
                  <div key={solution.id} className="md:col-span-2 group bg-[#FDF6E3] rounded-[2.5rem] p-0 md:px-8 md:pt-8 md:pb-0 flex flex-col md:grid md:grid-cols-3 gap-0 md:gap-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border border-yellow-300 overflow-hidden relative">
                     <div className="order-1 text-left relative z-20 flex flex-col justify-start pt-10 px-10 md:px-0 md:pt-8 pb-6 md:pb-8">
                        <h3 className="text-4xl font-bold text-[#111111] mb-6 leading-tight">{solution.title}</h3>
                        <p className="text-gray-600 text-base leading-relaxed font-medium">{solution.descriptionLeft}</p>
                      </div>

                      <div className="order-2 relative w-full h-auto min-h-[340px] md:min-h-[400px] flex flex-col items-center pt-8 pb-8 md:pt-8 md:pb-8 px-8 md:px-6 mb-6 md:mb-0">
                         <style dangerouslySetInnerHTML={{__html: `
                          @keyframes grow-up-slow { from { height: 0%; } to { height: 85%; } }
                          @keyframes grow-up-fast { from { height: 0%; } to { height: 15%; } }
                        `}} />
                        <div className="w-full max-w-[280px] md:max-w-none mx-auto flex flex-col h-full justify-between gap-6 md:gap-0">
                           <div className="flex items-center justify-center md:justify-start gap-2">
                              <Clock className="w-5 h-5 text-yellow-700" />
                              <span className="text-[11px] font-bold uppercase tracking-widest text-yellow-700">Time to Result</span>
                           </div>
                           <div className="flex-1 flex items-end justify-center gap-6 md:gap-10 relative z-10 min-h-[240px] mb-10 md:mb-20 mt-6">
                              <div className="flex flex-col items-center gap-3 w-16 group">
                                 <div className="w-14 bg-white border border-gray-50 rounded-t-full relative overflow-hidden h-[180px] md:h-[200px] flex items-end justify-center">
                                    <div className="w-full bg-gray-300 rounded-t-full" style={{height: '85%', animation: 'grow-up-slow 2s ease-out forwards'}}></div>
                                 </div>
                                 <div className="text-center">
                                    <div className="text-[10px] font-bold text-gray-400 uppercase leading-tight">External Lab</div>
                                    <div className="text-[10px] font-medium text-gray-400 mt-1">3-5 Days</div>
                                 </div>
                              </div>
                              <div className="flex flex-col items-center gap-3 w-16 group">
                                 <div className="w-14 bg-white border border-gray-50 rounded-t-full relative overflow-hidden h-[180px] md:h-[200px] flex items-end justify-center">
                                    <div className="w-full bg-[#FF270A] rounded-t-full shadow-[0_0_20px_rgba(255,39,10,0.3)] relative" style={{height: '15%', animation: 'grow-up-fast 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards'}}>
                                       <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-1 w-full h-[2px] bg-white/50"></div>
                                    </div>
                                 </div>
                                 <div className="text-center">
                                    <div className="text-[10px] font-bold text-[#111111] uppercase leading-tight">AiGOR Tech</div>
                                    <div className="text-[10px] font-bold text-[#FF270A] mt-1">&lt; 3 Hours</div>
                                 </div>
                              </div>
                           </div>
                           <div className="flex justify-center md:justify-center">
                              <div className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-50 border border-emerald-100 rounded-full w-full justify-center">
                                <TrendingDown className="w-4 h-4 text-emerald-600" />
                                <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">Significant Cost Savings</span>
                              </div>
                           </div>
                        </div>
                      </div>

                      <div className="order-3 text-left flex flex-col justify-start md:justify-between relative z-20 px-10 pb-8 md:px-0 md:pb-8 md:pt-8">
                        <div className="mb-8">
                           <h4 className="text-[#111111] font-bold text-sm uppercase tracking-widest mb-6">Advantages</h4>
                           <p className="text-gray-600 text-sm leading-relaxed mb-4 font-medium">{solution.description}</p>
                           {solution.advantages && (
                             <ul className="flex flex-col gap-3">
                               {solution.advantages.map((adv, i) => {
                                 const [title, ...rest] = adv.split(":");
                                 const description = rest.join(":");
                                 return (
                                   <li key={i} className="flex items-start gap-2 text-sm text-gray-600 font-medium leading-tight">
                                     <CheckCircle2 className="w-4 h-4 text-[#FF270A] shrink-0 mt-0.5" />
                                     <span><span className="text-[#111111] font-bold">{title}{description ? ":" : ""}</span>{description}</span>
                                   </li>
                                 );
                               })}
                             </ul>
                           )}
                        </div>
                         <div className="flex gap-3 mt-auto md:mt-6">
                           <button onClick={openMeeting} className="flex-1 py-3 bg-[#111111] text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#FF270A] transition-colors flex items-center justify-center gap-2 shadow-md">
                           Contact <ArrowRight className="w-3 h-3" />
                           </button>
                           
                           {/* Botón Details con Scroll */}
                            <button 
                              onClick={() => scrollToId('solutions', 120)}
                              className="flex-1 py-3 bg-white border border-yellow-200 text-[#111111] rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-yellow-50 transition-colors shadow-sm flex items-center justify-center"
                            >
                              Details
                            </button>
                          </div>
                        </div>
                  </div>
                );
              }

              // --- CARD TIPO 2: TxA (Index 5) ---
              if (idx === 5) {
                return (
                  <div key={solution.id} className="md:col-span-2 group relative rounded-[2.5rem] overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 bg-[#111111] flex flex-col md:flex-row h-auto md:h-[200px] border border-[#FF270A] shadow-[0_0_15px_rgba(255,39,10,0.2)] md:border-none md:shadow-none">
                     <div className="absolute inset-0 z-0 hidden md:block">
                         {solution.image && (
                             <Image
                               src={solution.image} 
                               alt={solution.title}
                               fill
                               className="object-cover object-center" 
                             />
                         )}
                         <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/5 to-transparent z-10"></div>
                      </div>

                      <div className="relative z-20 w-full h-full flex flex-col md:flex-row items-start md:items-center justify-between p-10 md:px-12">
                        <div className="max-w-[260px] z-20">
                            <h3 className="text-2xl font-bold text-white mb-3 leading-tight tracking-tight drop-shadow-sm">{solution.title}</h3>
                            <p className="text-gray-200 text-sm font-medium leading-relaxed drop-shadow-sm">{solution.description}</p>
                        </div>
                        {/* SVG y animaciones... */}
                        <div className="absolute left-[380px] top-1/2 -translate-y-1/2 hidden md:block z-20 select-none">
                           <div className="relative w-40 h-40 scale-90">
                              <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none" strokeWidth="1.5" strokeLinecap="round" style={{filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.3))'}}>
                                  <path d="M100 30 A 70 70 0 0 1 165 130" stroke="#FDE047" strokeDasharray="6 6" opacity="0.9" />
                                  <path d="M165 130 A 70 70 0 0 1 35 130" stroke="#FCA5A5" strokeDasharray="6 6" opacity="0.9" />
                                  <path d="M35 130 A 70 70 0 0 1 100 30" stroke="#86EFAC" strokeDasharray="6 6" opacity="0.9" />
                              </svg>
                              {/* Texto dentro del círculo */}
                              <div className="absolute top-2 left-1/2 -translate-x-1/2 text-center">
                                  <span className="block text-[9px] font-medium text-[#FDE047] uppercase tracking-widest bg-black/70 px-3 py-1 rounded-full backdrop-blur-sm border border-[#FDE047]/20">Results</span>
                              </div>
                              <div className="absolute bottom-8 right-0 text-center">
                                  <span className="block text-[9px] font-medium text-[#FCA5A5] uppercase tracking-widest bg-black/70 px-4 py-1 rounded-full backdrop-blur-sm border border-[#FCA5A5]/20">Ai</span>
                              </div>
                              <div className="absolute bottom-8 left-0 text-center">
                                  <span className="block text-[9px] font-medium text-[#86EFAC] uppercase tracking-widest bg-black/70 px-3 py-1 rounded-full backdrop-blur-sm border border-[#86EFAC]/20 leading-none">Improve<br/>EMP</span>
                              </div>
                           </div>
                        </div>
                        <div className="relative mt-6 z-30 opacity-100 translate-y-0 md:absolute md:bottom-6 md:right-10 md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-300">
                           <button onClick={openMeeting} className="py-3 px-6 bg-white text-[#111111] rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#FF270A] hover:text-white transition-colors flex items-center gap-2 shadow-md">
                             Learn More <ArrowRight className="w-3 h-3" />
                           </button>
                        </div>
                      </div>
                  </div>
                );
              }

              // --- CARD TIPO 3: STANDARD ---
              return (
                <div key={solution.id} className="md:col-span-1 group bg-white rounded-[2.5rem] pt-10 px-6 flex flex-col h-[520px] md:h-[400px] transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 relative overflow-hidden text-center items-center">
                   <div className="relative z-10 w-full max-w-[400px] flex flex-col items-center">
                      <h3 className="text-2xl font-bold text-[#111111] mb-4 leading-tight">{solution.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{solution.description}</p>
                    </div>

                    {solution.image && (
                      <div className="absolute bottom-24 md:bottom-0 left-0 right-0 h-[220px] z-0 flex items-end justify-center">
                         <div className="relative w-full h-full">
                           <Image src={solution.image} alt={solution.title} fill className="object-contain object-bottom" />
                         </div>
                      </div>
                    )}
                    
                    {!solution.image && <div className="flex-grow"></div>}

                    <div className="absolute bottom-6 left-10 right-10 flex gap-2 z-30 transition-opacity duration-300 opacity-100 md:opacity-0 md:group-hover:opacity-100">
                      <button onClick={openMeeting} className="flex-1 py-3 bg-[#111111]/90 backdrop-blur text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#FF270A] transition-colors flex items-center justify-center gap-2 shadow-xl">
                        Contact <ArrowRight className="w-3 h-3" />
                      </button>
                      <button className="flex-1 py-3 bg-white/90 backdrop-blur border border-gray-200 text-[#111111] rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors shadow-xl">Details</button>
                    </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}