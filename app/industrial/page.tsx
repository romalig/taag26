"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Search,
  FlaskConical,
  Activity,
  Microscope,
  CheckCircle2,
  Clock,
  TrendingDown,
  Zap, 
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCTA } from "../components/CTAProvider";

// --- DATOS ---
const FEATURED_SOLUTIONS = [
  {
    id: "pathogen-control",
    title: "Zero-Risk and Ultra-Fast Internal EMP Pathogen Testing",
    descriptionLeft: "Detect pathogens in < 3 hours without enrichment.",
    description: "Bring testing in-house with absolute safety and efficiency.",
    advantages: [
      "Zero Biohazard: No enrichment means no pathogen growth on-site.",
      "Fast Results: Results in hours rather than days.",
      "Instant Action: Shift from reactive waiting to same-day intervention.",
      "Cost Efficiency: Eliminate external lab fees and shipping delays.",
    ],
    image: "/2bacterias_verdes3.png", 
    tags: ["EMP", "efficiciency"],
  },
  {
    id: "pathogen-control2",
    title: "Fast Control of Salmonella in the Food Industry",
    description: "Same-shift results for Salmonella in environmental and food samples.",
    image: "/chocolate3.png",
    tags: ["Salmonella", "Fast"],
  },
  {
    id: "simultaneous-detection",
    title: "Comprehensive and Preventive Process Control",
    description: "Detect Pathogens & Indicators in a single PCR reaction. Preventive control meets efficiency.", 
    image: null, // Usaremos componente CSS personalizado
    tags: ["4-in-1", "Preventive"],
  },
  {
    id: "spoilage",
    title: "Comprehensive Spoilage Control",
    description: "Fast and accurate detection of spoilage yeast, mold, and acidiphilic bacteria in a single PCR run.",
    image: "/spoilage.png",
    tags: ["Spoilage", "Productivity"],
  },
];

const PRODUCT_CATALOG = [
  { id: 1, name: "SalmoQuick™ PCR Kit", category: "Pathogens", type: "Kit" },
  { id: 2, name: "Listeria Monocytogenes PCR", category: "Pathogens", type: "Kit" },
  { id: 3, name: "Total Yeast & Mold", category: "Spoilage", type: "Kit" },
  { id: 4, name: "E. Coli O157:H7 Rapid", category: "Pathogens", type: "Kit" },
  { id: 5, name: "TxA Software License", category: "Software", type: "Digital" },
  { id: 6, name: "Surface Swab Pro", category: "Consumables", type: "Accessory" },
  { id: 7, name: "S. Aureus Detect", category: "Pathogens", type: "Kit" },
  { id: 8, name: "Lactic Acid Bacteria", category: "Spoilage", type: "Kit" },
];

const CATEGORIES = ["All", "Pathogens", "Spoilage", "Software", "Consumables"];

export default function IndustrialPage() {
  const { openMeeting } = useCTA();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const [isImageVisible, setIsImageVisible] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

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

  const filteredProducts = PRODUCT_CATALOG.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="bg-white min-h-screen font-sans selection:bg-[#FF270A] selection:text-white">
      <Header forceDark={true} />

      {/* 1. HERO SECTION */}
      <section className="pt-40 pb-10 px-6 max-w-7xl mx-auto text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-b from-gray-50 to-transparent rounded-full blur-3xl -z-10 opacity-60" />

        <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold text-[#111111] mb-8 tracking-tight leading-[1.1] break-words hyphens-auto max-w-[95vw] mx-auto">
          The Next Generation of <br />
          <span className="text-gray-400">Microbiological Solutions.</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto font-medium leading-relaxed px-2">
          Explore microbiological solutions for multiplex and ultra-fast detection to accelerate decisions, reduce risk, and improve productivity.
        </p>
      </section>

      {/* 2. FEATURED SOLUTIONS */}
      <section className="px-4 md:px-6 mb-32">
        <div className="max-w-7xl mx-auto">
          <div className="relative bg-[#F4F4F5] rounded-[3rem] overflow-hidden pt-16 pb-24 px-6 md:px-16 flex flex-col items-center">
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

            {/* IMAGEN DECORATIVA SUPERIOR */}
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

            {/* GRID PRINCIPAL */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 w-full -mt-26 md:-mt-28">
              {FEATURED_SOLUTIONS.map((solution, idx) => {
                
                // ========================================================================
                // 1. TARJETA HERO (ÍNDICE 0)
                // ========================================================================
                if (idx === 0) {
                  return (
                    <div
                      key={solution.id}
                      className="md:col-span-3 group bg-[#FDF6E3] rounded-[2rem] p-0 md:px-6 md:pt-6 md:pb-0 flex flex-col md:grid md:grid-cols-3 gap-0 md:gap-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border border-yellow-300 overflow-hidden relative"
                    >
                      {/* 1. TEXTO IZQUIERDA */}
                      <div className="order-1 text-left relative z-20 flex flex-col justify-start pt-8 px-8 md:px-0 md:pt-6 pb-4 md:pb-6">
                        <div className="flex gap-2 justify-start mb-6">
                          {solution.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 bg-white text-[10px] font-bold uppercase tracking-wider rounded-full text-[#111111] shadow-sm"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <h3 className="text-3xl font-bold text-[#111111] mb-4 leading-tight">
                          {solution.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed font-medium">
                          {solution.descriptionLeft}
                        </p>
                      </div>

                      {/* 2. COMPONENTE VISUAL: "TIME BENCHMARK" */}
                      <div
                        className="
                          order-2 relative w-full
                          h-auto min-h-[340px] md:min-h-[340px]
                          flex flex-col items-center
                          pt-8 pb-8 md:pt-6 md:pb-6
                          px-8 md:px-6
                          mb-6 md:mb-0
                        "
                      >
                         <style dangerouslySetInnerHTML={{__html: `
                          @keyframes grow-up-slow { from { height: 0%; } to { height: 85%; } }
                          @keyframes grow-up-fast { from { height: 0%; } to { height: 15%; } }
                        `}} />

                        <div className="w-full max-w-[280px] md:max-w-none mx-auto flex flex-col h-full justify-between gap-6 md:gap-0">
                           <div className="flex items-center justify-center md:justify-start gap-2">
                              <Clock className="w-4 h-4 text-yellow-700" />
                              <span className="text-[10px] font-bold uppercase tracking-widest text-yellow-700">Time to Result</span>
                           </div>

                           <div className="flex-1 flex items-end justify-center gap-4 md:gap-8 relative z-10 min-h-[200px] mb-8 md:mb-16 mt-4">
                              <div className="flex flex-col items-center gap-3 w-14 group">
                                 <div className="w-12 bg-white border border-gray-50 rounded-t-full relative overflow-hidden h-[150px] md:h-[160px] flex items-end justify-center">
                                    <div className="w-full bg-gray-300 rounded-t-full" style={{height: '85%', animation: 'grow-up-slow 2s ease-out forwards'}}></div>
                                 </div>
                                 <div className="text-center">
                                    <div className="text-[9px] font-bold text-gray-400 uppercase leading-tight">External Lab</div>
                                    <div className="text-[9px] font-medium text-gray-400 mt-1">3-5 Days</div>
                                 </div>
                              </div>
                              <div className="flex flex-col items-center gap-3 w-14 group">
                                 <div className="w-12 bg-white border border-gray-50 rounded-t-full relative overflow-hidden h-[150px] md:h-[160px] flex items-end justify-center">
                                    <div className="w-full bg-[#FF270A] rounded-t-full shadow-[0_0_20px_rgba(255,39,10,0.3)] relative" style={{height: '15%', animation: 'grow-up-fast 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards'}}>
                                       <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-1 w-full h-[2px] bg-white/50"></div>
                                    </div>
                                 </div>
                                 <div className="text-center">
                                    <div className="text-[9px] font-bold text-[#111111] uppercase leading-tight">AiGOR Tech</div>
                                    <div className="text-[9px] font-bold text-[#FF270A] mt-1">&lt; 3 Hours</div>
                                 </div>
                              </div>
                           </div>

                           <div className="flex justify-center md:justify-center">
                              <div className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-full w-full justify-center">
                                <TrendingDown className="w-3.5 h-3.5 text-emerald-600" />
                                <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">Significant Cost Savings</span>
                              </div>
                           </div>
                        </div>
                      </div>

                      {/* 3. TEXTO DERECHA */}
                      <div className="order-3 text-left flex flex-col justify-start md:justify-between relative z-20 px-8 pb-6 md:px-0 md:pb-6 md:pt-6">
                        <div className="mb-6">
                           <h4 className="text-[#111111] font-bold text-sm uppercase tracking-widest mb-6">
                             Advantages
                           </h4>
                           <p className="text-gray-600 text-sm leading-relaxed mb-3 font-medium">
                              {solution.description}
                           </p>
                           {solution.advantages && (
                             <ul className="flex flex-col gap-2">
                               {solution.advantages.map((adv, i) => {
                                 const [title, ...rest] = adv.split(":");
                                 const description = rest.join(":");
                                 return (
                                   <li key={i} className="flex items-start gap-2 text-sm text-gray-600 font-medium leading-tight">
                                     <CheckCircle2 className="w-4 h-4 text-[#FF270A] shrink-0 mt-0.5" />
                                     <span>
                                       <span className="text-[#111111] font-bold">
                                         {title}{description ? ":" : ""}
                                       </span>
                                       {description}
                                     </span>
                                   </li>
                                 );
                               })}
                             </ul>
                           )}
                        </div>

                         <div className="flex gap-3 mt-auto md:mt-4">
                           <button
                            onClick={openMeeting}
                            className="flex-1 py-3 bg-[#111111] text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#FF270A] transition-colors flex items-center justify-center gap-2 shadow-md"
                            >
                           Contact <ArrowRight className="w-3 h-3" />
                           </button>
                            <button className="flex-1 py-3 bg-white border border-yellow-200 text-[#111111] rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-yellow-50 transition-colors shadow-sm">
                            Details
                           </button>
                          </div>
                        </div>
                    </div>
                  );
                }

                // ========================================================================
                // 2. TARJETA MULTIPLEX (ÍNDICE 2) - DISEÑO CON MÁS "AIRE"
                // ========================================================================
                if (idx === 2) {
                  return (
                    <div
                      key={solution.id}
                      className="md:col-span-1 group bg-white rounded-[2rem] p-2 flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border border-gray-100"
                    >
                      {/* --- COMPONENTE VISUAL: DIAGRAMA SOBRE FONDO GRIS PLANO --- */}
                      <div className="relative bg-gray-50 rounded-[1.5rem] overflow-hidden h-48 w-full flex items-center justify-center">
                        
                        {/* CONTENEDOR PRINCIPAL DEL DIAGRAMA - AUMENTADO PADDING (p-4 -> p-6) */}
                        <div className="relative w-full h-full flex items-center justify-center p-6">

                           {/* NUCLEO CENTRAL */}
                           <div className="absolute z-20 w-14 h-14 bg-gray-900/90 border border-white/20 rounded-full flex flex-col items-center justify-center shadow-[0_0_25px_rgba(0,0,0,0.1)] backdrop-blur-md">
                              <Zap className="w-5 h-5 text-yellow-400 mb-0.5" />
                              <span className="block text-[7px] text-white font-bold uppercase leading-none">1 Reaction</span>
                           </div>

                           {/* ESTRUCTURA DE 4 PANELES GRANDES - AUMENTADO GAP (gap-3 -> gap-5) */}
                           <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-5 relative z-10">
                              
                              {/* Panel 1: Salmonella - REDUCIDO PADDING INTERNO (p-3 -> p-2) */}
                              <div className="relative flex flex-col justify-start items-start p-2 rounded-xl bg-gradient-to-br from-[#FF270A]/20 to-transparent border border-[#FF270A]/30 group-hover:border-[#FF270A]/60 transition-colors">
                                 <span className="text-gray-900 font-black text-base md:text-lg leading-none mb-1 tracking-tight">Salmonella</span>
                                 <span className="text-[#FF270A] text-[9px] font-bold uppercase tracking-wider">Pathogen</span>
                                 <div className="absolute bottom-0 right-0 w-8 h-px bg-gradient-to-l from-[#FF270A]/50 to-transparent origin-right rotate-45 translate-x-2 translate-y-2"></div>
                              </div>

                              {/* Panel 2: Listeria - REDUCIDO PADDING INTERNO (p-3 -> p-2) */}
                              <div className="relative flex flex-col justify-start items-end p-2 rounded-xl bg-gradient-to-bl from-purple-500/20 to-transparent border border-purple-500/30 group-hover:border-purple-500/60 transition-colors text-right">
                                 <span className="text-gray-900 font-black text-base md:text-lg leading-none mb-1 tracking-tight">L. mono</span>
                                 <span className="text-purple-600 text-[9px] font-bold uppercase tracking-wider">Pathogen</span>
                                 <div className="absolute bottom-0 left-0 w-8 h-px bg-gradient-to-r from-purple-500/50 to-transparent origin-left -rotate-45 -translate-x-2 translate-y-2"></div>
                              </div>

                              {/* Panel 3: Gram- - REDUCIDO PADDING INTERNO (p-3 -> p-2) */}
                              <div className="relative flex flex-col justify-end items-start p-2 rounded-xl bg-gradient-to-tr from-emerald-500/20 to-transparent border border-emerald-500/30 group-hover:border-emerald-500/60 transition-colors">
                                 <span className="text-emerald-600 text-[9px] font-bold uppercase tracking-wider mb-1">Indicator</span>
                                 <span className="text-gray-900 font-black text-base md:text-lg leading-none tracking-tight">Gram (-)</span>
                                 <div className="absolute top-0 right-0 w-8 h-px bg-gradient-to-l from-emerald-500/50 to-transparent origin-right -rotate-45 translate-x-2 -translate-y-2"></div>
                              </div>

                              {/* Panel 4: Gram+ - REDUCIDO PADDING INTERNO (p-3 -> p-2) */}
                              <div className="relative flex flex-col justify-end items-end p-2 rounded-xl bg-gradient-to-tl from-blue-500/20 to-transparent border border-blue-500/30 group-hover:border-blue-500/60 transition-colors text-right">
                                 <span className="text-blue-600 text-[9px] font-bold uppercase tracking-wider mb-1">Indicator</span>
                                 <span className="text-gray-900 font-black text-base md:text-lg leading-none tracking-tight">Gram (+)</span>
                                 <div className="absolute top-0 left-0 w-8 h-px bg-gradient-to-r from-blue-500/50 to-transparent origin-left rotate-45 -translate-x-2 -translate-y-2"></div>
                              </div>

                           </div>
                        </div>

                        {/* Etiquetas Flotantes */}
                        <div className="absolute top-3 left-3 flex gap-2 z-30">
                          {solution.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 bg-white/80 backdrop-blur text-[8px] font-bold uppercase tracking-wider rounded-full text-gray-800 border border-black/5 shadow-sm"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* TEXTOS INFERIORES */}
                      <div className="flex flex-col justify-between p-6 flex-1">
                        <div>
                          <h3 className="text-xl font-bold text-[#111111] mb-3 leading-tight">
                            {solution.title}
                          </h3>
                          <p className="text-gray-500 text-sm leading-relaxed font-medium mb-6">
                            {solution.description}
                          </p>
                        </div>

                        <div className="flex gap-3 mt-auto">
                          <button
                            onClick={openMeeting}
                            className="flex-1 py-3 bg-[#111111] text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#FF270A] transition-colors flex items-center justify-center gap-2"
                          >
                            Contact <ArrowRight className="w-3 h-3" />
                          </button>
                          <button className="flex-1 py-3 border border-gray-200 text-[#111111] rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors">
                            Details
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                }

                // ========================================================================
                // 3. TARJETAS NORMALES (RESTO: ÍNDICES 1 y 3)
                // ========================================================================
                return (
                  <div
                    key={solution.id}
                    className="md:col-span-1 group bg-white rounded-[2rem] p-2 flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                  >
                    <div className="relative bg-gray-50 rounded-[1.5rem] overflow-hidden h-48 w-full flex items-end justify-center">
                      <Image
                        src={solution.image!} // El "!" asegura a TS que no es null
                        alt={solution.title}
                        fill
                        className="object-contain object-bottom p-4 pb-0 group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4 flex gap-2">
                        {solution.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-white/80 backdrop-blur text-[10px] font-bold uppercase tracking-wider rounded-full text-[#111111] border border-black/5"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col justify-between p-6 flex-1">
                      <div>
                        <h3 className="text-xl font-bold text-[#111111] mb-3">
                          {solution.title}
                        </h3>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6">
                          {solution.description}
                        </p>
                      </div>

                      <div className="flex gap-3 mt-auto">
                        <button
                          onClick={openMeeting}
                          className="flex-1 py-3 bg-[#111111] text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#FF270A] transition-colors flex items-center justify-center gap-2"
                        >
                          Contact <ArrowRight className="w-3 h-3" />
                        </button>
                        <button className="flex-1 py-3 border border-gray-200 text-[#111111] rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors">
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* SECCIONES RESTANTES */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-4 block">
              The Ecosystem
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#111111]">
              Connected Intelligence
            </h2>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gray-100 -translate-y-1/2 z-0" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
              <div className="bg-white p-6 text-center group">
                <div className="w-20 h-20 mx-auto bg-[#F5F5F7] rounded-full flex items-center justify-center mb-6 border border-transparent group-hover:border-[#FF270A]">
                  <FlaskConical className="w-8 h-8 text-[#111111]" />
                </div>
                <h3 className="text-lg font-bold mb-2">1. Sample</h3>
                <p className="text-sm text-gray-500">
                  Universal enrichment protocol.
                </p>
              </div>
              <div className="bg-white p-6 text-center group">
                <div className="w-20 h-20 mx-auto bg-[#F5F5F7] rounded-full flex items-center justify-center mb-6 border border-transparent group-hover:border-[#FF270A]">
                  <Microscope className="w-8 h-8 text-[#111111]" />
                </div>
                <h3 className="text-lg font-bold mb-2">2. Analyze</h3>
                <p className="text-sm text-gray-500">
                  Run on standard qPCR equipment.
                </p>
              </div>
              <div className="bg-[#111111] rounded-3xl p-6 text-center shadow-2xl scale-110 relative group">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FF270A] text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full">
                  The Brain
                </div>
                <div className="w-20 h-20 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-6 backdrop-blur">
                  <Activity className="w-8 h-8 text-[#FF270A]" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">3. TxA™ AI</h3>
                <p className="text-sm text-white/60">
                  Automated interpretation.
                </p>
              </div>
              <div className="bg-white p-6 text-center group">
                <div className="w-20 h-20 mx-auto bg-[#F5F5F7] rounded-full flex items-center justify-center mb-6 border border-transparent group-hover:border-[#FF270A]">
                  <CheckCircle2 className="w-8 h-8 text-[#111111]" />
                </div>
                <h3 className="text-lg font-bold mb-2">4. Decision</h3>
                <p className="text-sm text-gray-500">
                  Release product instantly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#F5F5F7] px-6" id="catalog">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#111111] mb-4">
                Find your Kit
              </h2>
              <p className="text-gray-500">Search our complete catalog.</p>
            </div>
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Search by pathogen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-full bg-white border border-gray-200 outline-none transition-all text-sm font-medium"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-12">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                  activeCategory === cat
                    ? "bg-[#111111] text-white shadow-lg scale-105"
                    : "bg-white text-gray-500 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white p-6 rounded-3xl hover:shadow-xl transition-all duration-300 group cursor-pointer border border-transparent hover:border-gray-100"
              >
                <div className="flex justify-between items-start mb-6">
                  <span className="px-3 py-1 bg-gray-100 rounded-md text-[10px] font-bold uppercase text-gray-500">
                    {product.type}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center -rotate-45 group-hover:rotate-0 transition-transform">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h4 className="text-lg font-bold text-[#111111] leading-tight mb-2 group-hover:text-[#FF270A] transition-colors">
                  {product.name}
                </h4>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                  Category: {product.category}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-gray-500 text-sm mb-4">
              Don't see the target you need?
            </p>
            <button
              onClick={openMeeting}
              className="text-[#FF270A] font-bold text-sm uppercase tracking-widest hover:underline decoration-2 underline-offset-4"
            >
              Request Custom Assay Development
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}