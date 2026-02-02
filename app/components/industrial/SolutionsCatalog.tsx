"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { ChevronRight, Search, X, Download, Cpu, Target } from "lucide-react";
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
        scrollToTarget(panelRef.current, 200); 
    }
  };

  const allSolutions = Object.values(PANEL_SOLUTIONS).flat();
  const categorySolutions = PANEL_SOLUTIONS[activePanelTab] || [];
  const sourceList = searchQuery ? allSolutions : categorySolutions;

  // --- LÓGICA DE BÚSQUEDA MEJORADA (MULTI-PALABRA) ---
  const filteredSolutions = sourceList.filter((item) => {
    // 1. Convertimos la búsqueda a minúsculas y separamos por espacios para tener las palabras clave
    const searchTerms = searchQuery.toLowerCase().split(" ").filter(term => term.length > 0);
    
    // 2. Creamos un "super string" con todo el contenido del item para buscar ahí
    const itemText = `
      ${item.title} 
      ${item.description} 
      ${item.targets} 
      ${item.technology}
    `.toLowerCase();

    // 3. Verificamos que TODAS las palabras escritas aparezcan en el item (AND logic)
    // Si quieres que sea "al menos una" (OR logic), cambia .every por .some
    return searchTerms.every((term) => itemText.includes(term));
  });

  return (
    <section className="bg-white px-4 md:px-6 py-24 md:py-42">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-[3rem] border border-gray-200 shadow-sm">
          
          {/* HERO DEL CATALOGO */}
          <div className="relative h-[420px] md:h-[500px] rounded-t-[3rem] overflow-hidden">
            <Image src="/hero16.png" alt="TAAG Solutions Ecosystem" fill className="object-cover object-right md:object-center" priority />
             <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/10" />
             
             <div className="relative z-10 h-full flex items-start pt-20 md:pt-24">
               <div className="px-10 md:px-20 max-w-3xl">
                 <h2 className="text-white text-4xl md:text-6xl font-extrabold leading-tight">Explore all our solutions</h2>
               </div>
             </div>
             <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          {/* CONTENIDO DEL PANEL */}
          <div className="pb-12 pt-0 bg-white relative z-20 rounded-b-[3rem]">
             <div className="w-full px-10 md:px-20" ref={panelRef} id="panel-start">
                
                {/* --- 1. BUSCADOR Y DESCARGA (ARRIBA) --- */}
                <div className="pt-12 mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                   
                   {/* Buscador Global */}
                   <div className="relative group w-full md:max-w-md">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#FF270A] transition-colors" />
                      <input 
                        type="text" 
                        placeholder={searchQuery ? "Searching in all categories..." : "Search across all solutions..."}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-full py-3 pl-10 pr-10 text-sm font-medium text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#FF270A]/20 focus:border-[#FF270A] transition-all placeholder:text-gray-400"
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

                   {/* Link de Descarga */}
                   <a 
                     href="/catalogo.pdf" 
                     download
                     className="flex items-center gap-3 text-xs font-bold text-[#111111] hover:text-[#FF270A] transition-colors uppercase tracking-widest group cursor-pointer"
                   >
                     <div className="p-2 bg-gray-100 rounded-full group-hover:bg-[#FF270A] group-hover:text-white transition-all shrink-0">
                        <Download className="w-4 h-4" />
                     </div>
                     <span className="leading-relaxed md:whitespace-nowrap text-left">
                        Download Product<br className="block md:hidden"/> Selection Guide
                     </span>
                   </a>
                </div>

                {/* --- 2. CONTENEDOR STICKY (TABS DE CATEGORÍAS) --- */}
                <div className="sticky top-[80px] z-40 bg-white/95 backdrop-blur-xl py-4 -mx-10 md:-mx-20 px-10 md:px-20 transition-all border-b border-transparent">
                   <div className="flex flex-nowrap md:flex-wrap gap-3 overflow-x-auto md:overflow-visible pb-2 no-scrollbar items-center justify-start">
                      {PANEL_CATEGORIES.map((category) => (
                         <button
                            key={category.id}
                            onClick={() => handleTabClick(category.id)}
                            disabled={!!searchQuery}
                            className={`px-5 py-2.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 border whitespace-nowrap shrink-0 ${
                               activePanelTab === category.id && !searchQuery
                                  ? "bg-[#111111] text-white border-[#111111] shadow-lg scale-105"
                                  : searchQuery 
                                    ? "bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed" 
                                    : "bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-[#111111]"
                            }`}
                         >
                            {category.label}
                         </button>
                      ))}
                   </div>
                </div>

                {/* --- LISTA DE SOLUCIONES --- */}
                <div className="flex flex-col mt-4 min-h-[300px]">
                   {filteredSolutions.length > 0 ? (
                     filteredSolutions.map((item, index) => (
                        <div key={index} className="flex flex-col md:flex-row justify-between items-start md:items-center py-8 px-4 -mx-4 rounded-2xl group hover:bg-gray-50/80 transition-all duration-300">
                           {/* Info Izquierda */}
                           <div className="flex-1 pr-0 md:pr-12 mb-6 md:mb-0">
                              <h4 className="text-lg font-bold text-[#111111] mb-2 group-hover:text-[#FF270A] transition-colors">{item.title}</h4>
                              <p className="text-gray-500 text-sm font-medium mb-3 max-w-2xl leading-relaxed">{item.description}</p>
                              
                              <div className="flex flex-wrap gap-2 mt-3">
                                <span className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-md text-[10px] font-bold text-gray-600 tracking-wider border border-gray-200">
                                   <Target className="w-3 h-3 text-[#FF270A]" />
                                   {item.targets}
                                </span>
                                <span className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-md text-[10px] font-bold text-gray-600 tracking-wider border border-gray-200">
                                   <Cpu className="w-3 h-3 text-[#111111]" />
                                   {item.technology}
                                </span>
                              </div>
                           </div>

                           {/* Botones Derecha */}
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
                     <div className="flex flex-col items-center justify-center py-20 text-center opacity-60">
                        <Search className="w-12 h-12 text-gray-300 mb-4" />
                        <p className="text-lg font-bold text-gray-400">No matching solutions found.</p>
                        <p className="text-sm text-gray-400">Try searching for a target (e.g., "invA"), technology, or name.</p>
                     </div>
                   )}

                   {/* --- SECCIÓN "DIDN'T FIND IT?" --- */}
                   <div className="mt-6 mb-2 p-6 md:p-8 text-center flex flex-col items-center bg-gray-50 rounded-3xl border border-gray-100">
                       <div className="mb-4">
                          <Image 
                            src="/logo_mila.png" 
                            alt="MILA Logo" 
                            width={60} 
                            height={60} 
                            className="mx-auto opacity-80"
                          />
                       </div>
                       <h4 className="text-xl font-extrabold text-[#111111] mb-2">Didn't find what you're looking for?</h4>
                       <p className="text-gray-500 text-sm font-medium mb-6 max-w-lg leading-relaxed">
                          Powered by Mila, our R&D team turns unique challenges into custom solutions. If it’s not in our catalog, our AI-driven development engine can build it specifically for your needs.
                       </p>
                       <button 
                          onClick={openMeeting} 
                          className="px-6 py-2.5 bg-[#111111] text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#FF270A] transition-colors shadow-lg"
                       >
                          Contact Us
                       </button>
                   </div>

                </div>

             </div>
          </div>
        </div>
      </div>
    </section>
  );
}