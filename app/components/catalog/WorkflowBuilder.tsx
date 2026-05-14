"use client";

import { useState, useMemo, useRef, useEffect, Fragment } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Factory, Check, RotateCcw, FileText, Clock, X, Mail, Send, CheckCircle2 } from "lucide-react";

// =========================================================
// ÍCONO PERSONALIZADO: BACTERIA
// =========================================================
const BacteriaIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="7" width="16" height="10" rx="5" />
    <path d="M9 12h.01" />
    <path d="M12 12h.01" />
    <path d="M15 12h.01" />
    <path d="M6 7v-2" />
    <path d="M12 7v-2" />
    <path d="M18 7v-2" />
    <path d="M6 17v2" />
    <path d="M12 17v2" />
    <path d="M18 17v2" />
  </svg>
);

// =========================================================
// CONFIGURACIÓN DE DATOS TÉCNICOS
// =========================================================
const INDUSTRIES = ["Dairy", "Meat & Poultry", "Beverages", "Ready-to-Eat", "Produce", "Environmental"];

const MICROORGANISMS = [
  { id: "Sal", name: "Salmonella spp.", type: "PATHOGEN", group: "Multiplex S+L" },
  { id: "Lis", name: "Listeria spp.", type: "PATHOGEN", group: "Multiplex S+L" },
  { id: "Mon", name: "L. monocytogenes", type: "PATHOGEN", group: "Multiplex S+L" },
  { id: "Eco", name: "E. coli O157:H7", type: "PATHOGEN", group: "E. coli Flow" },
  { id: "Cro", name: "Cronobacter spp.", type: "PATHOGEN", group: "Cronobacter Flow" },
  { id: "Ent", name: "Enterobacteriaceae", type: "INDICATOR", group: "Indicators" },
  { id: "Yeast", name: "Yeast & Molds", type: "SPOILAGE", group: "Spoilage" }
];

const STAGE_PRODUCTS: any = {
  "Sampling": [
    { id: "s1", name: "TAAG S1 Swab Kit", cat: "30-0012", format: "100 swabs / box", time: 0.25, desc: "Neutralizing buffer swab for 10x10 surfaces.", link: "#" },
    { id: "s2", name: "TAAG S2 Sponge", cat: "30-0015", format: "50 sponges / box", time: 0.4, desc: "High-capacity sponge for large equipment.", link: "#" }
  ],
  "Enrichment": [
    { id: "e1", name: "TAAG E24 Medium", cat: "20-0540", format: "500g dehydrated", time: 24, desc: "Universal enrichment broth for rapid growth.", link: "#" },
    { id: "e2", name: "TAAG E-Fast", cat: "20-0900", format: "500g dehydrated", time: 18, desc: "Accelerated medium for high-fat samples.", link: "#" }
  ],
  "Extraction": [
    { id: "x1", name: "TAAG X-Extract", cat: "10-0921", format: "96 extractions / kit", time: 0.5, desc: "High-yield magnetic bead DNA/RNA isolation.", link: "#" },
    { id: "x2", name: "TAAG X-Quick", cat: "10-0100", format: "100 extractions / kit", time: 0.2, desc: "5-minute thermal lysis protocol.", link: "#" }
  ],
  "PCR": [
    { id: "p1", name: "TAAG Pathogen Kit", cat: "40-1120", format: "96 reactions / kit", time: 1.5, desc: "Multiplex Real-Time PCR detection.", link: "#" }
  ]
};

export default function WorkflowBuilder() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [selectedMicroorganisms, setSelectedMicroorganisms] = useState<string[]>([]);
  const [sampleType, setSampleType] = useState<"Environmental" | "Finished product">("Environmental");
  
  const [selectedProductIds, setSelectedProductIds] = useState<Record<string, string>>({
    Sampling: "s1", Enrichment: "e1", Extraction: "x1", PCR: "p1"
  });

  const [activeFlowIndex, setActiveFlowIndex] = useState(0);
  
  // Modales
  const [activeModalStage, setActiveModalStage] = useState<string | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteMessage, setQuoteMessage] = useState("");
  const [isSubmittingQuote, setIsSubmittingQuote] = useState(false);
  const [isQuoteSent, setIsQuoteSent] = useState(false);

  // Referencias para el carrusel de protocolos
  const protocolsScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const potentialFlows = useMemo(() => {
    const groups: any = {};
    selectedMicroorganisms.forEach(id => {
      const micro = MICROORGANISMS.find(m => m.id === id);
      if (micro) {
        if (!groups[micro.group]) groups[micro.group] = [];
        groups[micro.group].push(micro.name);
      }
    });
    return Object.entries(groups);
  }, [selectedMicroorganisms]);

  const toggleMicroorganism = (id: string) => {
    setSelectedMicroorganisms(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const handleProductChange = (stage: string, prodId: string) => {
    setSelectedProductIds(prev => ({ ...prev, [stage]: prodId }));
    setActiveModalStage(null); 
  };

  const calculateTotalTime = () => {
    const stages = sampleType === "Environmental" 
      ? ["Sampling", "Enrichment", "Extraction", "PCR"] 
      : ["Enrichment", "Extraction", "PCR"];
    
    let total = 0;
    stages.forEach(s => {
      const prod = STAGE_PRODUCTS[s].find((p: any) => p.id === selectedProductIds[s]);
      if (prod) total += prod.time;
    });
    return total.toFixed(1);
  };

  const reset = () => {
    setStep(1);
    setSelectedIndustry(null);
    setSelectedMicroorganisms([]);
    setActiveFlowIndex(0);
  };

  const getTagStyle = (type: string, isSelected: boolean) => {
    if (isSelected) {
      if (type === "PATHOGEN") return "bg-red-500/20 text-red-400";
      if (type === "SPOILAGE") return "bg-orange-500/20 text-orange-400";
      if (type === "INDICATOR") return "bg-green-500/20 text-green-400";
      return "bg-gray-700 text-gray-300";
    } else {
      if (type === "PATHOGEN") return "bg-red-50 text-red-600";
      if (type === "SPOILAGE") return "bg-orange-50 text-orange-600";
      if (type === "INDICATOR") return "bg-green-50 text-green-600";
      return "bg-gray-100 text-gray-500";
    }
  };

  // Manejo de flechas del carrusel de protocolos
  const checkScroll = () => {
    if (protocolsScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = protocolsScrollRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(Math.round(scrollLeft + clientWidth) < scrollWidth - 5);
    }
  };

  useEffect(() => {
    if (step === 3) {
      checkScroll();
      // Pequeño delay para asegurar que el DOM se haya pintado antes de chequear el scroll
      setTimeout(checkScroll, 100);
    }
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [step, potentialFlows, sampleType]);

  const scrollProtocols = (direction: "left" | "right") => {
    if (protocolsScrollRef.current) {
      const amount = 300;
      protocolsScrollRef.current.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
    }
  };

  // Generar Cotización con MÚLTIPLES PROTOCOLOS
  const handleOpenQuote = () => {
    const stages = sampleType === "Environmental" 
      ? ["Sampling", "Enrichment", "Extraction", "PCR"] 
      : ["Enrichment", "Extraction", "PCR"];
      
    let allProtocolsText = "";

    potentialFlows.forEach(([_, micros]: any, idx) => {
      const targets = micros.join(" + ");
      allProtocolsText += `Protocol ${idx + 1} (${targets})\n`;
      
      stages.forEach(stage => {
        const prod = STAGE_PRODUCTS[stage].find((p: any) => p.id === selectedProductIds[stage]);
        if (prod) {
          allProtocolsText += `- ${prod.name} (Cat. ${prod.cat})\n`;
        }
      });
      allProtocolsText += `\n`; 
    });

    const msg = `Hello TAAG Team,\n\nI would like to request a quote for the following workflows designed for the ${selectedIndustry} industry:\n\n${allProtocolsText}Please let me know the pricing and availability.\n\nThank you.`;

    setQuoteMessage(msg);
    setIsQuoteModalOpen(true);
    setIsQuoteSent(false);
  };

  const submitQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingQuote(true);
    // Simulación de envío (reemplazar con lógica real de API)
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmittingQuote(false);
    setIsQuoteSent(true);
    setTimeout(() => {
      setIsQuoteSent(false);
      setIsQuoteModalOpen(false);
    }, 4000);
  };

  return (
    <section className="pt-24 pb-20 px-6 w-full max-w-[1400px] mx-auto font-sans relative">
      
      {/* TÍTULO DE LA SECCIÓN */}
      <div className="mb-12">
        <h2 className="text-4xl md:text-5xl font-black text-[#111111] mb-4 tracking-tighter leading-tight">
          Product & Protocol Selector
        </h2>
        <p className="text-lg text-gray-500 max-w-2xl font-medium">
          Build your optimal testing workflow by selecting your industry and target pathogens to reveal our recommended kits.
        </p>
      </div>

      <div className="w-full bg-gray-50 rounded-[3rem] p-8 md:p-16 relative min-h-[600px] flex flex-col overflow-hidden">
        
        {/* BARRA DE PROGRESO Y RESUMEN DE SELECCIÓN */}
        <div className="w-full flex flex-col md:flex-row md:items-center justify-between mb-16 gap-6 border-b border-gray-200/60 pb-8">
           <div className="flex items-center gap-4 md:gap-6">
              <button onClick={() => setStep(1)} className={`text-sm md:text-base font-bold flex items-center gap-3 transition-colors ${step >= 1 ? 'text-[#111111]' : 'text-gray-300'}`}>
                 <span className={`w-8 h-8 flex items-center justify-center rounded-full text-xs transition-colors ${step === 1 ? 'bg-[#FF270A] text-white' : step > 1 ? 'bg-[#111111] text-white' : 'bg-gray-200 text-gray-500'}`}>1</span>
                 Industry
              </button>
              <div className="w-6 md:w-12 h-px bg-gray-200" />
              <button onClick={() => { if (step > 1) setStep(2) }} disabled={step < 2} className={`text-sm md:text-base font-bold flex items-center gap-3 transition-colors ${step >= 2 ? 'text-[#111111]' : 'text-gray-300'} ${step > 1 ? 'cursor-pointer hover:text-[#FF270A]' : 'cursor-default'}`}>
                 <span className={`w-8 h-8 flex items-center justify-center rounded-full text-xs transition-colors ${step === 2 ? 'bg-[#FF270A] text-white' : step > 2 ? 'bg-[#111111] text-white' : 'bg-gray-200 text-gray-500'}`}>2</span>
                 Targets
              </button>
              <div className="w-6 md:w-12 h-px bg-gray-200" />
              <button disabled className={`text-sm md:text-base font-bold flex items-center gap-3 transition-colors ${step === 3 ? 'text-[#111111]' : 'text-gray-300'} cursor-default`}>
                 <span className={`w-8 h-8 flex items-center justify-center rounded-full text-xs transition-colors ${step === 3 ? 'bg-[#FF270A] text-white' : 'bg-gray-200 text-gray-500'}`}>3</span>
                 Protocol
              </button>
           </div>
           
           {step > 1 && (
             <div className="flex items-center gap-3 bg-white px-5 py-2.5 rounded-full text-xs font-bold text-gray-500 uppercase tracking-widest shadow-sm">
               <span className="text-[#111111]">{selectedIndustry}</span>
               {selectedMicroorganisms.length > 0 && (
                 <>
                   <span className="text-gray-300">•</span>
                   <span className="text-[#FF270A]">{selectedMicroorganisms.length} Targets</span>
                 </>
               )}
             </div>
           )}
        </div>

        {/* --- PASO 1 --- */}
        {step === 1 && (
          <div className="flex flex-col items-center justify-center flex-grow animate-in fade-in zoom-in-95 duration-500">
            <Factory className="w-12 h-12 text-[#FF270A] mb-8" strokeWidth={1.5} />
            
            <div className="text-center mb-10">
               <h3 className="text-3xl font-black text-[#111111] mb-2 tracking-tight">Select your industry</h3>
               <p className="text-gray-500 font-medium text-sm">Choose the sector that best represents your facility's operations.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-3xl">
              {INDUSTRIES.map(ind => (
                <button 
                  key={ind} 
                  onClick={() => { setSelectedIndustry(ind); setStep(2); }} 
                  className="p-8 bg-white rounded-[2rem] font-bold text-[#111111] text-lg hover:text-[#FF270A] transition-colors duration-300 group"
                >
                  {ind}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* --- PASO 2 --- */}
        {step === 2 && (
          <div className="flex flex-col items-center justify-center flex-grow animate-in fade-in slide-in-from-right-8 duration-500">
            <BacteriaIcon className="w-12 h-12 text-[#FF270A] mb-6" />
            
            <div className="text-center mb-10">
               <h3 className="text-3xl font-black text-[#111111] mb-2 tracking-tight">Identify target microorganisms</h3>
               <p className="text-gray-500 font-medium text-sm">Select the pathogens, indicators, or spoilage organisms you need to detect.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl mb-12">
              {MICROORGANISMS.map(micro => {
                const isSelected = selectedMicroorganisms.includes(micro.id);
                return (
                  <button 
                    key={micro.id} 
                    onClick={() => toggleMicroorganism(micro.id)} 
                    className={`relative flex flex-col items-start p-6 rounded-[2rem] transition-colors duration-300 ${isSelected ? "bg-[#111111] text-white" : "bg-white text-[#111111] hover:bg-gray-200"}`}
                  >
                    <div className="flex items-center justify-between w-full mb-3">
                      <span className={`text-[9px] font-black tracking-widest uppercase px-3 py-1 rounded-full ${getTagStyle(micro.type, isSelected)}`}>
                        {micro.type}
                      </span>
                      {isSelected && <Check className="w-5 h-5 text-[#FF270A]" />}
                    </div>
                    <span className="font-bold text-lg">{micro.name}</span>
                  </button>
                );
              })}
            </div>
            
            <button 
              onClick={() => setStep(3)} 
              disabled={selectedMicroorganisms.length === 0} 
              className="bg-[#FF270A] text-white px-8 md:px-12 py-4 md:py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform duration-300 disabled:opacity-30 disabled:hover:scale-100 flex items-center gap-3"
            >
              Discover our workflow <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* --- PASO 3 --- */}
        {step === 3 && (
          <div className="flex flex-col w-full h-full animate-in fade-in slide-in-from-bottom-8 duration-700 relative">
            
            {/* ENCABEZADO PASO 3 */}
            <div className="flex flex-col items-start text-left mb-8 w-full max-w-6xl">
              <span className="text-[#FF270A] font-black uppercase tracking-widest text-sm mb-8 block">Recommended Protocols and kits</span>
              
              <div className="flex items-center bg-white p-1 rounded-full shadow-sm mb-8">
                <button onClick={() => setSampleType("Environmental")} className={`px-6 py-3 rounded-full text-sm font-bold transition-colors ${sampleType === "Environmental" ? "bg-[#111111] text-white" : "text-gray-500 hover:text-[#111111]"}`}>Environmental</button>
                <button onClick={() => setSampleType("Finished product")} className={`px-6 py-3 rounded-full text-sm font-bold transition-colors ${sampleType === "Finished product" ? "bg-[#111111] text-white" : "text-gray-500 hover:text-[#111111]"}`}>Finished product</button>
              </div>

              {/* CARRUSEL DE PROTOCOLOS CON FLECHAS */}
              <div className="relative w-full flex items-center">
                 {canScrollLeft && (
                   <button onClick={() => scrollProtocols("left")} className="absolute -left-4 md:-left-6 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md text-[#111111] hover:text-[#FF270A]">
                     <ChevronLeft className="w-5 h-5" />
                   </button>
                 )}
                 
                 <div ref={protocolsScrollRef} onScroll={checkScroll} className="flex overflow-x-auto gap-4 py-2 w-full snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                    {potentialFlows.map(([_, micros]: any, idx) => (
                      <button 
                        key={idx} 
                        onClick={() => setActiveFlowIndex(idx)}
                        className={`snap-start shrink-0 text-left px-8 py-5 rounded-2xl transition-all border-2 min-w-[280px] md:min-w-[320px] ${activeFlowIndex === idx ? "border-[#111111] bg-white text-[#111111] shadow-sm" : "border-transparent bg-gray-100/50 text-gray-400 hover:bg-gray-200"}`}
                      >
                        <h4 className="text-xl md:text-2xl font-black tracking-tighter mb-1 break-words">Protocol {idx + 1}</h4>
                        <p className="font-medium text-xs md:text-sm break-words">(detection of {micros.join(" + ")})</p>
                      </button>
                    ))}
                 </div>

                 {canScrollRight && (
                   <button onClick={() => scrollProtocols("right")} className="absolute -right-4 md:-right-6 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md text-[#111111] hover:text-[#FF270A]">
                     <ChevronRight className="w-5 h-5" />
                   </button>
                 )}
              </div>
            </div>

            {/* RESUMEN DE TIEMPO (Perfectamente alineado, sin línea arriba) */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 w-full pt-8 mt-2 border-t border-gray-200/60">
              <div>
                <h4 className="text-3xl md:text-4xl font-black text-[#111111] mb-1">{calculateTotalTime()} Hours</h4>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Time to Result (TTR)</span>
              </div>
            </div>

            {/* TARJETAS DE PRODUCTOS */}
            <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-4 w-full mt-4">
              {(sampleType === "Environmental" ? ["Sampling", "Enrichment", "Extraction", "PCR"] : ["Enrichment", "Extraction", "PCR"]).map((stage, sIdx, arr) => {
                const currentProd = STAGE_PRODUCTS[stage].find((p: any) => p.id === selectedProductIds[stage]);
                const alternatives = STAGE_PRODUCTS[stage].filter((p: any) => p.id !== selectedProductIds[stage]);

                return (
                  <Fragment key={stage}>
                    <div className="flex-1 w-full bg-white p-8 rounded-[2.5rem] flex flex-col transition-colors duration-300">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6 block h-4 shrink-0">Stage 0{sIdx + 1} // {stage}</span>
                      
                      <div className="flex items-start mb-2">
                         <h5 className="text-xl font-bold text-[#111111] leading-tight break-words">{currentProd.name}</h5>
                      </div>
                      
                      <div className="flex flex-col gap-0.5 mb-6 shrink-0 break-words">
                         <span className="text-sm font-medium text-gray-400">Cat #{currentProd.cat}</span>
                         <span className="text-sm font-medium text-gray-400">{currentProd.format}</span>
                      </div>
                      
                      <div className="flex items-start mb-8">
                         <p className="text-sm text-[#111111] leading-relaxed font-medium break-words">{currentProd.desc}</p>
                      </div>

                      <div className="mt-auto pt-6 border-t border-gray-50 flex flex-col gap-4 shrink-0">
                        <div className="flex items-center gap-2 text-[#111111] font-bold text-xs uppercase tracking-tight">
                          <Clock className="w-4 h-4 text-[#FF270A]" /> {currentProd.time >= 1 ? `${currentProd.time}h` : `${currentProd.time * 60} min`}
                        </div>
                        <a href={currentProd.link} className="flex items-center gap-2 text-[#FF270A] font-bold text-xs uppercase tracking-tight hover:underline">
                          <FileText className="w-4 h-4" /> Technical Data
                        </a>
                        
                        <div className="h-8 flex items-end">
                          {alternatives.length > 0 && (
                            <button 
                              onClick={() => setActiveModalStage(stage)}
                              className="flex items-center gap-2 text-gray-400 hover:text-[#111111] font-bold text-[10px] uppercase tracking-widest transition-colors"
                            >
                              <RotateCcw className="w-3.5 h-3.5" /> View Alternatives
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Flecha Conectora entre tarjetas */}
                    {sIdx < arr.length - 1 && (
                      <div className="flex items-center justify-center py-2 lg:py-0 shrink-0">
                         <ArrowRight className="w-6 h-6 text-gray-300 rotate-90 lg:rotate-0" />
                      </div>
                    )}
                  </Fragment>
                );
              })}
            </div>

            {/* CALL TO ACTION (Cotización) */}
            <div className="mt-20 w-full flex flex-col items-center justify-center border-t border-gray-200/60 pt-16">
               <h3 className="text-2xl md:text-3xl font-black text-[#111111] mb-3 tracking-tight">Ready to optimize your lab?</h3>
               <p className="text-gray-500 font-medium mb-8 text-center max-w-lg">Get a customized quote and start implementing these advanced diagnostic products in your facility.</p>
               
               <button 
                 onClick={handleOpenQuote} 
                 className="bg-[#111111] text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#FF270A] transition-colors duration-300 flex items-center gap-3"
               >
                 <Mail className="w-4 h-4" /> Request Quote
               </button>

               <button onClick={reset} className="mt-10 flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-[#111111] uppercase tracking-widest transition-colors">
                 <RotateCcw className="w-4 h-4" /> Start New Design
               </button>
            </div>
            
          </div>
        )}
      </div>

      {/* --- MODAL DE ALTERNATIVAS --- */}
      {activeModalStage && (
        <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
           <div className="bg-white rounded-[2.5rem] p-8 max-w-md w-full relative animate-in zoom-in-95 duration-300 border-0">
              <button 
                onClick={() => setActiveModalStage(null)} 
                className="absolute top-6 right-6 p-2 bg-gray-50 rounded-full hover:bg-gray-200 transition-colors"
              >
                <X className="w-5 h-5 text-[#111111]" />
              </button>
              
              <div className="mb-8">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 block">Switch product for</span>
                <h3 className="text-2xl font-black text-[#111111] leading-tight">{activeModalStage} Stage</h3>
              </div>

              <div className="flex flex-col gap-3">
                 {STAGE_PRODUCTS[activeModalStage].filter((p: any) => p.id !== selectedProductIds[activeModalStage]).map((alt: any) => (
                    <div 
                      key={alt.id} 
                      onClick={() => handleProductChange(activeModalStage, alt.id)} 
                      className="p-5 bg-gray-50 hover:bg-gray-200 transition-colors rounded-2xl flex items-center justify-between cursor-pointer group"
                    >
                       <div className="pr-4">
                         <h4 className="font-bold text-[#111111] text-sm mb-1 group-hover:text-[#FF270A] transition-colors">{alt.name}</h4>
                         <span className="text-xs font-medium text-gray-400 block mb-2">Cat #{alt.cat} • {alt.format}</span>
                         <p className="text-xs text-[#111111] leading-relaxed font-medium">{alt.desc}</p>
                       </div>
                       <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#FF270A] group-hover:translate-x-1 transition-all shrink-0"/>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      )}

      {/* --- MODAL DE COTIZACIÓN --- */}
      {isQuoteModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
           <div className="bg-white rounded-[2.5rem] p-8 md:p-12 max-w-2xl w-full relative animate-in zoom-in-95 duration-300">
              <button 
                onClick={() => setIsQuoteModalOpen(false)} 
                className="absolute top-6 right-6 p-2 bg-gray-50 rounded-full hover:bg-gray-200 transition-colors"
              >
                <X className="w-5 h-5 text-[#111111]" />
              </button>

              {isQuoteSent ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                  </div>
                  <h3 className="text-3xl font-black text-[#111111] mb-2 tracking-tight">Request Sent!</h3>
                  <p className="text-gray-500 font-medium">Our team will get back to you with the quotation shortly.</p>
                </div>
              ) : (
                <>
                  <div className="mb-8 pr-12">
                    <span className="text-[10px] font-black text-[#FF270A] uppercase tracking-widest mb-2 block">Quote Request</span>
                    <h3 className="text-2xl md:text-3xl font-black text-[#111111] leading-tight">Get pricing for your {selectedIndustry} workflow</h3>
                  </div>

                  <form onSubmit={submitQuote} className="flex flex-col gap-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                       <input 
                         type="text" 
                         placeholder="Full Name" 
                         required 
                         className="w-full bg-gray-50 border border-transparent text-[#111111] placeholder:text-gray-400 text-sm rounded-2xl px-6 py-4 outline-none focus:border-[#FF270A]/30 focus:bg-white transition-colors font-medium" 
                       />
                       <input 
                         type="email" 
                         placeholder="Work Email" 
                         required 
                         className="w-full bg-gray-50 border border-transparent text-[#111111] placeholder:text-gray-400 text-sm rounded-2xl px-6 py-4 outline-none focus:border-[#FF270A]/30 focus:bg-white transition-colors font-medium" 
                       />
                    </div>
                    
                    <input 
                       type="text" 
                       placeholder="Company Name" 
                       required 
                       className="w-full bg-gray-50 border border-transparent text-[#111111] placeholder:text-gray-400 text-sm rounded-2xl px-6 py-4 outline-none focus:border-[#FF270A]/30 focus:bg-white transition-colors font-medium" 
                    />

                    <div className="flex flex-col gap-2 mt-2">
                       <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-2">Details (Editable)</label>
                       <textarea 
                         value={quoteMessage}
                         onChange={(e) => setQuoteMessage(e.target.value)}
                         rows={8} 
                         required 
                         className="w-full bg-gray-50 border border-transparent text-[#111111] placeholder:text-gray-400 text-sm rounded-2xl px-6 py-4 outline-none focus:border-[#FF270A]/30 focus:bg-white transition-colors font-medium resize-none leading-relaxed"
                       />
                    </div>
                    
                    <button 
                      type="submit" 
                      disabled={isSubmittingQuote} 
                      className="w-full bg-[#111111] text-white hover:bg-[#FF270A] font-bold text-sm uppercase tracking-widest py-5 rounded-2xl flex items-center justify-center gap-3 transition-colors disabled:opacity-50 mt-2"
                    >
                       {isSubmittingQuote ? "Sending..." : "Send Request"} {!isSubmittingQuote && <Send className="w-4 h-4" />}
                    </button>
                  </form>
                </>
              )}
           </div>
        </div>
      )}

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}