"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronRight, Search, X, Download, Zap, Target, Filter, Loader2 } from "lucide-react";
import { useCTA } from "../CTAProvider";
// Static fallback data commented out — categories now come from the API via target_type
// import { PANEL_CATEGORIES, PANEL_SOLUTIONS } from "../../industrial/industrialData";
import { useModal } from "./ModalProvider";
import SolutionTemplate from "./modals/SolutionTemplate";
import type { SolutionContent } from "./modals/types";

import { SOLUTIONS_DATA } from "../data/solutionsData";
import {
  getAllProductsByCategory,
  getKitSolution,
} from "@/app/lib/products-api";

interface CategoryTab {
  id: string;
  label: string;
}

interface CatalogItem {
  uuid?: string;
  id?: string;
  title: string;
  description: string;
  targets: string;
  technology?: string;
}

interface CatalogSearchEvent extends Event {
  detail?: string;
}

const EMPTY_CATEGORIES: CategoryTab[] = [];
const EMPTY_SOLUTIONS: Record<string, CatalogItem[]> = {};

export default function SolutionsCatalog() {
  const { openMeeting } = useCTA();
  const { openModal } = useModal();

  const [categories, setCategories] = useState<CategoryTab[]>(EMPTY_CATEGORIES);
  const [activePanelTab, setActivePanelTab] = useState("");
  const [catalogByCategory, setCatalogByCategory] = useState<Record<string, CatalogItem[]>>(EMPTY_SOLUTIONS);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [detailsLoadingUuid, setDetailsLoadingUuid] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const toolbarRef = useRef<HTMLDivElement>(null);
  const [isToolbarVisible, setIsToolbarVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsToolbarVisible(entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "-80px 0px 0px 0px" }
    );

    if (toolbarRef.current) observer.observe(toolbarRef.current);
    return () => observer.disconnect();
  }, []);

  /* ---------------------------------------------------------------
     SINGLE API CALL: load all products + derive categories from it
     --------------------------------------------------------------- */
  const pendingSearchQuery = useRef<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    // Check if there's a ?search= param to apply after loading
    const params = new URLSearchParams(window.location.search);
    const urlSearch = params.get("search");
    if (urlSearch) pendingSearchQuery.current = urlSearch;

    const loadAll = async () => {
      setIsLoading(true);
      try {
        const result = await getAllProductsByCategory();
        if (!isMounted) return;

        // Derive categories from the data (unique, preserving order)
        const seen = new Set<string>();
        const derivedCategories: CategoryTab[] = [];
        for (const [uuid, items] of Object.entries(result.byCategory)) {
          if (!seen.has(uuid) && items.length > 0) {
            seen.add(uuid);
            derivedCategories.push({ id: uuid, label: result.categoryNames[uuid] || uuid });
          }
        }

        if (derivedCategories.length > 0) {
          setCategories(derivedCategories);
          setActivePanelTab(derivedCategories[0].id);
        }

        setCatalogByCategory(result.byCategory);
      } catch (error) {
        console.error("Products API fallback:", error);
        // Keep fallback data already set in initial state
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadAll();
    return () => { isMounted = false; };
  }, []);

  /* Apply ?search= AFTER catalog data has loaded from API */
  useEffect(() => {
    if (isLoading || !pendingSearchQuery.current) return;
    const query = pendingSearchQuery.current;
    pendingSearchQuery.current = null;

    setSearchQuery(query);

    requestAnimationFrame(() => {
      const element = document.getElementById("panel-start");
      if (element) {
        const pos = element.getBoundingClientRect().top + window.pageYOffset - 140;
        window.scrollTo({ top: pos, behavior: "smooth" });
      }
    });
  }, [isLoading]);

  useEffect(() => {
    const handleSearchTrigger = (event: Event) => {
        const customEvent = event as CatalogSearchEvent;
        setSearchQuery(customEvent.detail || "");
        const element = document.getElementById("panel-start");
        if (element) {
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - 140;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
    };

    window.addEventListener("trigger-catalog-search", handleSearchTrigger as EventListener);
    return () => window.removeEventListener("trigger-catalog-search", handleSearchTrigger as EventListener);
  }, []);

  const scrollToTarget = (element: HTMLElement, offset = 140) => {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  };

  const handleTabClick = (categoryId: string) => {
    setActivePanelTab(categoryId);
    setSearchQuery("");
    if (panelRef.current) scrollToTarget(panelRef.current, 200); 
  };

  const allSolutions = Object.values(catalogByCategory).flat();
  // Deduplicate by uuid when searching across all categories
  const uniqueSolutions = searchQuery
    ? Array.from(new Map(allSolutions.map((item) => [item.uuid || item.title, item])).values())
    : allSolutions;
  const categorySolutions = catalogByCategory[activePanelTab] || [];
  const sourceList = searchQuery ? uniqueSolutions : categorySolutions;

  const filteredSolutions = sourceList.filter((item) => {
    const searchTerms = searchQuery.toLowerCase().split(" ").filter(term => term.length > 0);
    const itemText = `
      ${item.title} 
      ${item.description} 
      ${item.targets} 
      ${item.technology || ""} 
    `.toLowerCase();

    return searchTerms.every((term) => itemText.includes(term));
  });

  // ===================================================================
  // FUNCIÓN CONECTADA A TU ARCHIVO SOLUTIONS_DATA REAL
  // ===================================================================
  const handleOpenDetails = (item: CatalogItem) => {
    const fallbackId = item.id || item.title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
    const fallbackData = SOLUTIONS_DATA[fallbackId] || SOLUTIONS_DATA["tg-multiplex-pathogens"];

    if (!item.uuid) {
      openModal(<SolutionTemplate data={fallbackData} />);
      return;
    }

    setDetailsLoadingUuid(item.uuid);

    getKitSolution(item.uuid)
      .then((data) => {
        openModal(<SolutionTemplate data={data || fallbackData} />);
      })
      .catch((error) => {
        console.error("Industrial solution fallback:", error);
        openModal(<SolutionTemplate data={fallbackData} />);
      })
      .finally(() => {
        setDetailsLoadingUuid((current) => (current === item.uuid ? null : current));
      });
  };

  return (
    <section id="solutions-catalog" className="bg-white px-4 md:px-6 py-24 md:py-42">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-[3rem] border border-gray-200 shadow-sm">
          
          <div className="relative h-[420px] md:h-[500px] rounded-t-[3rem] overflow-hidden">
            <Image src="/hero16.png" alt="TAAG Solutions Ecosystem" fill className="object-cover object-right md:object-center" priority />
             
             <div className="relative z-10 h-full flex items-start pt-20 md:pt-24">
               <div className="px-10 md:px-20 max-w-3xl">
                 <h2 className="text-white text-4xl md:text-6xl font-extrabold leading-tight">Explore all our solutions</h2>
               </div>
             </div>
             <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          <div className="pb-12 pt-0 bg-white relative z-20 rounded-b-[3rem]">
             <div className="w-full px-10 md:px-20" ref={panelRef} id="panel-start">
                
                <div ref={toolbarRef} className="pt-12 mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
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

                   <a href="/catalogo.pdf" download className="flex items-center gap-3 text-xs font-bold text-[#111111] hover:text-[#FF270A] transition-colors uppercase tracking-widest group cursor-pointer">
                     <div className="p-2 bg-gray-100 rounded-full group-hover:bg-[#FF270A] group-hover:text-white transition-all shrink-0">
                        <Download className="w-4 h-4" />
                     </div>
                     <span className="leading-relaxed md:whitespace-nowrap text-left">
                        Download Product<br className="block md:hidden"/> Selection Guide
                     </span>
                   </a>
                </div>

                {/* --- HEADER STICKY (TABS O INDICADOR DE BÚSQUEDA) --- */}
                {/* Sello matemático: top-[56px] en móvil y top-[60px] en desktop para que encaje exacto bajo el Header */}
                <div className="sticky top-[56px] md:top-[60px] z-40 bg-white py-4 -mx-10 md:-mx-20 px-10 md:px-20 transition-all border-b border-gray-100 flex items-center justify-center">
                   
                   {/* CASO 1: MOSTRAR INDICADOR DE BÚSQUEDA */}
                   {searchQuery && !isToolbarVisible ? (
                      <div className="w-fit mx-auto animate-fadeIn flex items-center justify-between gap-6 bg-white border border-gray-200 text-[#111111] px-6 py-2.5 rounded-full shadow-sm">
                          <div className="flex items-center gap-3">
                             <Filter className="w-4 h-4 text-[#FF270A]" />
                             <span className="text-xs md:text-sm font-medium text-gray-600">
                               Filtering by: <span className="font-bold text-[#111111]">&quot;{searchQuery}&quot;</span>
                             </span>
                          </div>
                          <button 
                             onClick={() => {
                               setSearchQuery("");
                               const el = document.getElementById("panel-start");
                               if(el) {
                                 const pos = el.getBoundingClientRect().top + window.pageYOffset - 140;
                                 window.scrollTo({ top: pos, behavior: "smooth" });
                               }
                             }}
                             className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors group"
                          >
                             <X className="w-3 h-3 text-gray-500 group-hover:text-[#FF270A]" />
                          </button>
                      </div>
                   ) : (
                      /* CASO 2: MOSTRAR TABS NORMALES */
                      <div className="flex flex-nowrap md:flex-wrap gap-3 overflow-x-auto md:overflow-visible p-2 no-scrollbar items-center justify-start w-full -ml-2">
                          {categories.map((category) => (
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
                   )}
                </div>

                <div className="flex flex-col mt-4 min-h-[300px]">
                   {isLoading ? (
                     <div className="flex flex-col items-center justify-center py-20 text-center opacity-70">
                        <Loader2 className="w-10 h-10 animate-spin text-[#FF270A] mb-4" />
                        <p className="text-lg font-bold text-gray-500">Loading products...</p>
                     </div>
                   ) : filteredSolutions.length > 0 ? (
                     filteredSolutions.map((item, index) => (
                        <div key={index} className="flex flex-col md:flex-row justify-between items-start md:items-center py-8 px-4 -mx-4 rounded-2xl group hover:bg-gray-50/80 transition-all duration-300">
                           <div className="flex-1 pr-0 md:pr-12 mb-6 md:mb-0">
                              <h4 className="text-lg font-bold text-[#111111] mb-2 group-hover:text-[#FF270A] transition-colors">{item.title}</h4>
                              <p className="text-gray-500 text-sm font-medium mb-3 max-w-2xl leading-relaxed">{item.description}</p>
                              
                              <div className="flex flex-wrap gap-2 mt-3">
                                {item.targets && (
                                   <span className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-md text-[10px] font-bold text-gray-600 tracking-wider border border-gray-200">
                                      <Target className="w-3 h-3 text-[#FF270A]" />
                                      {item.targets}
                                   </span>
                                )}
                                {item.technology && (
                                   <span className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-md text-[10px] font-bold text-gray-600 tracking-wider border border-gray-200">
                                      <Zap className="w-3 h-3 text-[#FF270A]" />
                                      {item.technology}
                                   </span>
                                )}
                              </div>
                           </div>

                           <div className="flex items-center gap-3 w-full md:w-auto shrink-0 opacity-100 md:opacity-0 md:group-hover:opacity-100 translate-y-0 md:translate-y-2 md:group-hover:translate-y-0 transition-all duration-300">
                              <button onClick={openMeeting} className="px-6 py-3 bg-[#111111] text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#FF270A] transition-colors shadow-md min-w-[100px]">
                                 Contact
                              </button>
                              
                              <button 
                                onClick={() => handleOpenDetails(item)}
                                disabled={detailsLoadingUuid === item.uuid}
                                className="px-5 py-3 bg-white border border-gray-200 text-[#111111] rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors flex items-center gap-2 justify-center shadow-sm"
                              >
                                 {detailsLoadingUuid === item.uuid ? (
                                   <>
                                     <Loader2 className="w-3 h-3 animate-spin" />
                                     Loading
                                   </>
                                 ) : (
                                   <>
                                     Details <ChevronRight className="w-3 h-3" />
                                   </>
                                 )}
                              </button>
                           </div>
                        </div>
                     ))
                   ) : (
                     <div className="flex flex-col items-center justify-center py-20 text-center opacity-60">
                        <Search className="w-12 h-12 text-gray-300 mb-4" />
                        <p className="text-lg font-bold text-gray-400">No matching solutions found.</p>
                        <p className="text-sm text-gray-400">Try searching for a target, technology, or name.</p>
                     </div>
                   )}

                   <div className="mt-6 mb-2 p-6 md:p-8 text-center flex flex-col items-center bg-gray-50 rounded-3xl border border-gray-100">
                       <div className="mb-4">
                          <Image src="/logo_mila.png" alt="MILA Logo" width={60} height={60} className="mx-auto opacity-80" />
                       </div>
                       <h4 className="text-xl font-extrabold text-[#111111] mb-2">Didn&apos;t find what you&apos;re looking for?</h4>
                       <p className="text-gray-500 text-sm font-medium mb-6 max-w-lg leading-relaxed">
                          Powered by Mila, our R&D team turns unique challenges into custom solutions.
                       </p>
                       <button onClick={openMeeting} className="px-6 py-2.5 bg-[#111111] text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#FF270A] transition-colors shadow-lg">
                          Contact Us
                       </button>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
