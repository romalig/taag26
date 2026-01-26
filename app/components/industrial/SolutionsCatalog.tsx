"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { ChevronRight, Search, X } from "lucide-react";
import { useCTA } from "../CTAProvider";
import { PANEL_CATEGORIES, PANEL_SOLUTIONS } from "../../industrial/industrialData";

export default function SolutionsCatalog() {
  const { openMeeting } = useCTA();
  const [activePanelTab, setActivePanelTab] = useState("Pathogens");
  const [searchQuery, setSearchQuery] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);

  const scrollToTarget = (element: HTMLElement, offset = 140) => {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  };

  const handleTabClick = (categoryId: string) => {
    setActivePanelTab(categoryId);
    setSearchQuery("");
    if (panelRef.current) {
        scrollToTarget(panelRef.current, 180); 
    }
  };

  const currentSolutions = PANEL_SOLUTIONS[activePanelTab] || [];
  const filteredSolutions = currentSolutions.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.targets.toLowerCase().includes(query)
    );
  });

  return (
    <section className="pb-24 pt-0 bg-white px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-[3rem] border border-gray-200 shadow-sm">
          
          {/* HERO DEL CATALOGO */}
          <div className="relative h-[420px] md:h-[500px] rounded-t-[3rem] overflow-hidden">
            <Image src="/hero16.png" alt="TAAG Solutions Ecosystem" fill className="object-cover object-right md:object-center" priority />
             <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/10" />
             
             {/* CAMBIO AQUÍ: items-center -> items-start, y se añadió pt-20 md:pt-32 */}
             <div className="relative z-10 h-full flex items-start pt-20 md:pt-24">
               <div className="px-10 md:px-20 max-w-3xl">
                 <h2 className="text-white text-4xl md:text-6xl font-extrabold leading-tight">Explore all our solutions</h2>
               </div>
             </div>
             <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          {/* CONTENIDO DEL PANEL */}
          <div className="px-6 pb-12 pt-8 md:px-24 md:pb-24 bg-white relative z-20 rounded-b-[3rem]">
             <div className="max-w-5xl mx-auto" ref={panelRef} id="panel-start">
                
                {/* --- CONTENEDOR STICKY (TABS + BUSCADOR) --- */}
                <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl pt-4 pb-6 -mx-6 px-6 md:-mx-0 md:px-0 transition-all">
                   
                   {/* 1. TABS (Sticky Buttons) - Estilo suave */}
                   <div className="flex flex-nowrap md:flex-wrap gap-3 overflow-x-auto md:overflow-visible pb-4 no-scrollbar items-center justify-start">
                      {PANEL_CATEGORIES.map((category) => (
                         <button
                            key={category.id}
                            onClick={() => handleTabClick(category.id)}
                            className={`px-5 py-2.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 border whitespace-nowrap shrink-0 ${
                               activePanelTab === category.id
                                  ? "bg-[#111111] text-white border-[#111111] shadow-lg scale-105"
                                  : "bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-[#111111]"
                            }`}
                         >
                            {category.label}
                         </button>
                      ))}
                   </div>

                   {/* 2. BUSCADOR (Alineado izquierda) */}
                   <div className="mt-2 max-w-md relative">
                      <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#FF270A] transition-colors" />
                        <input 
                          type="text" 
                          placeholder={`Search inside ${activePanelTab}...`}
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full bg-gray-50 border border-gray-200 rounded-full py-2.5 pl-10 pr-10 text-sm font-medium text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#FF270A]/20 focus:border-[#FF270A] transition-all placeholder:text-gray-400"
                        />
                        {searchQuery && (
                          <button 
                            onClick={() => setSearchQuery("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full transition-colors"
                          >
                            <X className="w-3 h-3 text-gray-500" />
                          </button>
                        )}
                      </div>
                   </div>
                </div>

                {/* --- LISTA DE SOLUCIONES --- */}
                <div className="flex flex-col mt-6 min-h-[300px]">
                   {filteredSolutions.length > 0 ? (
                     filteredSolutions.map((item, index) => (
                        <div key={index} className="flex flex-col md:flex-row justify-between items-start md:items-center py-8 px-4 -mx-4 rounded-2xl group hover:bg-gray-50/80 transition-all duration-300">
                           {/* Info Izquierda */}
                           <div className="flex-1 pr-0 md:pr-12 mb-6 md:mb-0">
                              <h4 className="text-lg font-bold text-[#111111] mb-2 group-hover:text-[#FF270A] transition-colors">{item.title}</h4>
                              <p className="text-gray-500 text-sm font-medium mb-3 max-w-2xl leading-relaxed">{item.description}</p>
                              
                              {/* Tag Targets */}
                              <span className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-md text-[10px] font-bold text-gray-600 tracking-wider">
                                 <div className="w-1.5 h-1.5 rounded-full bg-[#FF270A]"></div>
                                 {item.targets}
                              </span>
                           </div>

                           {/* Botones Derecha (Uppercase + Bold) */}
                           <div className="flex items-center gap-3 w-full md:w-auto shrink-0 opacity-100 md:opacity-0 md:group-hover:opacity-100 translate-y-0 md:translate-y-2 md:group-hover:translate-y-0 transition-all duration-300">
                              <button onClick={openMeeting} className="px-6 py-3 bg-[#111111] text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#FF270A] transition-colors shadow-md min-w-[100px]">
                                 Contact
                              </button>
                              <button className="px-5 py-3 bg-white border border-gray-200 text-[#111111] rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors flex items-center gap-2 justify-center shadow-sm">
                                 Details <ChevronRight className="w-3 h-3" />
                              </button>
                           </div>
                        </div>
                     ))
                   ) : (
                     // ESTADO VACÍO
                     <div className="flex flex-col items-center justify-center py-20 text-center opacity-60">
                        <Search className="w-12 h-12 text-gray-300 mb-4" />
                        <p className="text-lg font-bold text-gray-400">No matching solutions found.</p>
                        <p className="text-sm text-gray-400">Try searching for a target (e.g., "invA") or name.</p>
                     </div>
                   )}
                </div>

             </div>
          </div>
        </div>
      </div>
    </section>
  );
}