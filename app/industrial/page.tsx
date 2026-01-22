"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight, Search, Filter, FlaskConical, Activity, Microscope, CheckCircle2 } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCTA } from "../components/CTAProvider";

// --- DATOS ---
const FEATURED_SOLUTIONS = [
  {
    id: "pathogen-control",
    title: "Zero-Risk Pathogen Control",
    descriptionLeft: "Detect Salmonella and Listeria in <24h with RNA accuracy.",
    descriptionRight: "Stop waiting for cultures. Get definitive results faster.",
    image: "/2bacterias_verdes.png",
    tags: ["Safety", "Speed"],
  },
  {
    id: "spoilage-prevention",
    title: "Spoilage Prevention",
    description: "Identify yeast and mold before they bloat your product.",
    image: "/2bacterias_verdes.png",
    tags: ["Quality", "Shelf-Life"],
  },
  {
    id: "env-monitoring",
    title: "Environmental Mapping",
    description: "Track contamination sources using historical genomic data.",
    image: "/2bacterias_verdes.png",
    tags: ["Mapping", "TxA"],
  },
  {
    id: "validation-services",
    title: "Validation Services",
    description: "ISO 16140 validations tailored to your specific matrix.",
    image: "/2bacterias_verdes.png",
    tags: ["Compliance", "R&D"],
  }
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

  // ESTADO PARA LA ANIMACIÓN DE SCROLL
  const [isImageVisible, setIsImageVisible] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsImageVisible(true);
          // Opcional: desconectar el observer si solo quieres que pase una vez
          observer.disconnect();
        }
      },
      { threshold: 0.2 } // Se activa cuando el 20% del elemento es visible
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const filteredProducts = PRODUCT_CATALOG.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="bg-white min-h-screen font-sans selection:bg-[#FF270A] selection:text-white">
      
      <Header forceDark={true} />

      {/* 1. HERO SECTION */}
      <section className="pt-40 pb-10 px-6 max-w-7xl mx-auto text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-b from-gray-50 to-transparent rounded-full blur-3xl -z-10 opacity-60" />
        <h1 className="text-5xl md:text-7xl font-extrabold text-[#111111] mb-8 tracking-tight leading-[1.1]">
          The Next Generation of <br />
          <span className="text-gray-400">Microbiological Solutions.</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto font-medium leading-relaxed">
          Explore microbiological solutions for multiplex and ultra-fast detection.
        </p>
      </section>

      {/* 2. FEATURED SOLUTIONS */}
      <section className="px-4 md:px-6 mb-32">
        <div className="max-w-7xl mx-auto">
          
          <div className="relative bg-[#F4F4F5] rounded-[3rem] overflow-hidden pt-16 pb-24 px-6 md:px-16 flex flex-col items-center">
            
            <div className="absolute inset-0 opacity-[0.03]" 
                 style={{ backgroundImage: 'radial-gradient(#111 1px, transparent 1px)', backgroundSize: '24px 24px' }} 
            />

            <div className="relative z-10 text-center mb-8 max-w-2xl mx-auto">
               <span className="text-[#FF270A] font-bold uppercase tracking-widest text-xs mb-4 block">Featured Bundles</span>
               <h2 className="text-4xl md:text-5xl font-bold text-[#111111]">Targeted Solutions</h2>
               <p className="text-gray-500 mt-4 text-sm font-medium">
                 Pre-configured combinations designed for specific goals.
               </p>
            </div>

            {/* IMAGEN CENTRAL CON ANIMACIÓN SCROLL TRIGGERED */}
            <div 
              ref={imageRef}
              className={`relative w-full max-w-lg h-[250px] md:h-[350px] z-0 mb-8 transition-all duration-1000 ease-out transform ${
                isImageVisible 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-24" // Empieza invisible y abajo
              }`}
            >
               <Image 
                 src="/2bacterias_verdes.png" 
                 alt="Microbiology Hero" 
                 fill 
                 className="object-contain"
                 priority
               />
            </div>

            {/* GRID PRINCIPAL */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 w-full -mt-12 md:-mt-24">
              
              {FEATURED_SOLUTIONS.map((solution, idx) => {
                
                // --- TARJETA HERO (#1) ---
                if (idx === 0) {
                   return (
                    <div 
                      key={solution.id} 
                      className="md:col-span-3 group bg-[#FDF6E3] rounded-[2rem] p-6 grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border border-yellow-300 overflow-hidden relative"
                    >
                      {/* 1. COLUMNA IZQUIERDA */}
                      <div className="text-left order-2 md:order-1 relative z-10 flex flex-col justify-start pt-8 md:pt-12">
                        <div className="flex gap-2 justify-start mb-6">
                           {solution.tags.map(tag => (
                             <span key={tag} className="px-3 py-1 bg-white text-[10px] font-bold uppercase tracking-wider rounded-full text-[#111111] shadow-sm">
                               {tag}
                             </span>
                           ))}
                        </div>
                        <h3 className="text-3xl font-bold text-[#111111] mb-4 leading-tight">{solution.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed font-medium">
                          {solution.descriptionLeft}
                        </p>
                      </div>

                      {/* 2. COLUMNA CENTRAL */}
                      <div className="relative h-64 md:h-[350px] w-full order-1 md:order-2 flex items-end justify-center -mb-6 md:-mb-10">
                        <Image 
                          src={solution.image} 
                          alt={solution.title} 
                          fill 
                          className="object-contain object-bottom group-hover:scale-105 transition-transform duration-700 drop-shadow-2xl" 
                        />
                      </div>

                      {/* 3. COLUMNA DERECHA */}
                      <div className="text-left flex flex-col justify-start h-full order-3 relative z-10 pt-8 md:pt-12">
                         <p className="text-gray-600 text-sm leading-relaxed mb-10 font-medium">
                            {solution.descriptionRight}
                         </p>
                         
                         <div className="flex gap-3 mt-auto md:mt-0">
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
                
                // --- TARJETAS NORMALES (#2, #3, #4) ---
                else {
                   return (
                    <div 
                      key={solution.id} 
                      className="md:col-span-1 group bg-white rounded-[2rem] p-2 flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                    >
                      {/* Imagen */}
                      <div className="relative bg-gray-50 rounded-[1.5rem] overflow-hidden h-48 w-full flex items-end justify-center">
                        <Image 
                          src={solution.image} 
                          alt={solution.title} 
                          fill 
                          className="object-contain object-bottom p-4 pb-0 group-hover:scale-105 transition-transform duration-700" 
                        />
                        <div className="absolute top-4 left-4 flex gap-2">
                           {solution.tags.map(tag => (
                             <span key={tag} className="px-3 py-1 bg-white/80 backdrop-blur text-[10px] font-bold uppercase tracking-wider rounded-full text-[#111111] border border-black/5">
                               {tag}
                             </span>
                           ))}
                        </div>
                      </div>

                      {/* Texto */}
                      <div className="flex flex-col justify-between p-6 flex-1">
                        <div>
                          <h3 className="text-xl font-bold text-[#111111] mb-3">{solution.title}</h3>
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
                }

              })}

            </div>
          </div>
        </div>
      </section>

      {/* 3. WORKFLOW & 4. CATALOG (Sin cambios) */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
           <div className="text-center mb-20">
              <span className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-4 block">The Ecosystem</span>
              <h2 className="text-4xl md:text-5xl font-bold text-[#111111]">Connected Intelligence</h2>
           </div>
           <div className="relative">
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gray-100 -translate-y-1/2 z-0" />
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
                 <div className="bg-white p-6 text-center group">
                    <div className="w-20 h-20 mx-auto bg-[#F5F5F7] rounded-full flex items-center justify-center mb-6 border border-transparent group-hover:border-[#FF270A]">
                       <FlaskConical className="w-8 h-8 text-[#111111]" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">1. Sample</h3>
                    <p className="text-sm text-gray-500">Universal enrichment protocol.</p>
                 </div>
                 <div className="bg-white p-6 text-center group">
                    <div className="w-20 h-20 mx-auto bg-[#F5F5F7] rounded-full flex items-center justify-center mb-6 border border-transparent group-hover:border-[#FF270A]">
                       <Microscope className="w-8 h-8 text-[#111111]" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">2. Analyze</h3>
                    <p className="text-sm text-gray-500">Run on standard qPCR equipment.</p>
                 </div>
                 <div className="bg-[#111111] rounded-3xl p-6 text-center shadow-2xl scale-110 relative group">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FF270A] text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full">The Brain</div>
                    <div className="w-20 h-20 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-6 backdrop-blur">
                       <Activity className="w-8 h-8 text-[#FF270A]" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">3. TxA™ AI</h3>
                    <p className="text-sm text-white/60">Automated interpretation.</p>
                 </div>
                 <div className="bg-white p-6 text-center group">
                    <div className="w-20 h-20 mx-auto bg-[#F5F5F7] rounded-full flex items-center justify-center mb-6 border border-transparent group-hover:border-[#FF270A]">
                       <CheckCircle2 className="w-8 h-8 text-[#111111]" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">4. Decision</h3>
                    <p className="text-sm text-gray-500">Release product instantly.</p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      <section className="py-24 bg-[#F5F5F7] px-6" id="catalog">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div>
               <h2 className="text-3xl md:text-4xl font-bold text-[#111111] mb-4">Find your Kit</h2>
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
            {CATEGORIES.map(cat => (
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
               <div key={product.id} className="bg-white p-6 rounded-3xl hover:shadow-xl transition-all duration-300 group cursor-pointer border border-transparent hover:border-gray-100">
                  <div className="flex justify-between items-start mb-6">
                     <span className="px-3 py-1 bg-gray-100 rounded-md text-[10px] font-bold uppercase text-gray-500">{product.type}</span>
                     <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center -rotate-45 group-hover:rotate-0 transition-transform"><ArrowRight className="w-4 h-4 text-white" /></div>
                  </div>
                  <h4 className="text-lg font-bold text-[#111111] leading-tight mb-2 group-hover:text-[#FF270A] transition-colors">{product.name}</h4>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Category: {product.category}</p>
               </div>
             ))}
          </div>
          
          <div className="mt-16 text-center">
             <p className="text-gray-500 text-sm mb-4">Don't see the target you need?</p>
             <button onClick={openMeeting} className="text-[#FF270A] font-bold text-sm uppercase tracking-widest hover:underline decoration-2 underline-offset-4">
                Request Custom Assay Development
             </button>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}