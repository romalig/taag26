"use client";

import { useState, useMemo, useRef, useEffect, Fragment } from "react";
import { 
  ArrowRight, ChevronLeft, ChevronRight, Check, RotateCcw, 
  FileText, Clock, X, Mail, Send, CheckCircle2
} from "lucide-react";
import {
  INDUSTRIES, MICROORGANISMS, STAGES, PRODUCT_BY_ID, STAGE_BY_KEY,
  DEFAULT_SELECTED_IDS, getFallbackIcon,
  type Product, type StageKey
} from "./workflowData";

export default function WorkflowBuilder() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [selectedMicroorganisms, setSelectedMicroorganisms] = useState<string[]>([]);
  const [sampleType, setSampleType] = useState<"Environmental" | "Finished product">("Environmental");
  
  const [selectedProductIds, setSelectedProductIds] = useState<Record<string, string>>(DEFAULT_SELECTED_IDS);

  const [activeFlowIndex, setActiveFlowIndex] = useState(0);
  
  // Modales
  const [activeModalStage, setActiveModalStage] = useState<string | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteMessage, setQuoteMessage] = useState("");
  const [isSubmittingQuote, setIsSubmittingQuote] = useState(false);
  const [isQuoteSent, setIsQuoteSent] = useState(false);

  // Modal: Protocol Comparison
  const [protocolCompareIndex, setProtocolCompareIndex] = useState<number | null>(null);
  // Modal: Product Value Brief
  const [valueBriefProduct, setValueBriefProduct] = useState<Product | null>(null);
  // Track if user has explicitly chosen a protocol (not just the default)
  const [protocolConfirmed, setProtocolConfirmed] = useState(false);
  // Track if user has explicitly chosen a matrix
  const [matrixConfirmed, setMatrixConfirmed] = useState(false);
  // Dot indicators for mobile product carousel
  const [activeProdDot, setActiveProdDot] = useState(0);
  const productsScrollRef = useRef<HTMLDivElement>(null);
  // Ref to main container to read its actual computed padding for carousel alignment
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerPad, setContainerPad] = useState('1.5rem');

  useEffect(() => {
    const updatePad = () => {
      if (containerRef.current) {
        const pad = getComputedStyle(containerRef.current).paddingLeft;
        setContainerPad(pad);
      }
    };
    updatePad();
    window.addEventListener('resize', updatePad);
    return () => window.removeEventListener('resize', updatePad);
  }, []);

  // Referencias para el carrusel de protocolos y scroll al tope
  const sectionRef = useRef<HTMLElement>(null);
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

  const getActiveStages = () =>
    sampleType === "Environmental" ? STAGES : STAGES.filter(s => s.key !== "Sampling");

  const calculateTotalTime = () => {
    return getActiveStages()
      .reduce((total, stage) => {
        const prod = PRODUCT_BY_ID[selectedProductIds[stage.key]];
        return total + (prod?.timeHours ?? 0);
      }, 0)
      .toFixed(1);
  };

  const reset = () => {
    setStep(1);
    setSelectedIndustry(null);
    setSelectedMicroorganisms([]);
    setActiveFlowIndex(0);
    setProtocolConfirmed(false);
    setMatrixConfirmed(false);
    setTimeout(() => {
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const getTagStyle = (type: string, isSelected: boolean) => {
    if (isSelected) {
      if (type === "PATHOGEN") return "bg-red-500/20 text-red-400";
      if (type === "SPOILAGE") return "bg-orange-500/20 text-orange-400";
      if (type === "INDICATOR") return "bg-gray-500/20 text-gray-300";
      return "bg-gray-700 text-gray-300";
    } else {
      if (type === "PATHOGEN") return "bg-red-50 text-red-600";
      if (type === "SPOILAGE") return "bg-orange-50 text-orange-600";
      if (type === "INDICATOR") return "bg-gray-100 text-gray-500";
      return "bg-gray-100 text-gray-500";
    }
  };

  const checkScroll = () => {
    if (protocolsScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = protocolsScrollRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  useEffect(() => {
    if (step === 3) {
      checkScroll();
      setTimeout(checkScroll, 150);
      setTimeout(checkScroll, 400);
    }
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [step, potentialFlows, sampleType, selectedProductIds, matrixConfirmed]);

  const scrollProtocols = (direction: "left" | "right") => {
    if (protocolsScrollRef.current) {
      const amount = 300;
      protocolsScrollRef.current.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
      setTimeout(checkScroll, 350);
    }
  };

  const handleOpenQuote = () => {
    const activeStages = getActiveStages();
    let allProtocolsText = "";

    potentialFlows.forEach(([_, micros]: any, idx) => {
      const targets = micros.join(" + ");
      allProtocolsText += `Protocol ${idx + 1} (${targets})\n`;
      activeStages.forEach(stage => {
        const prod = PRODUCT_BY_ID[selectedProductIds[stage.key]];
        if (prod) allProtocolsText += `- ${prod.name} (Cat. ${prod.cat})\n`;
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
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmittingQuote(false);
    setIsQuoteSent(true);
    setTimeout(() => {
      setIsQuoteSent(false);
      setIsQuoteModalOpen(false);
    }, 4000);
  };

  const CurrentIndustryIcon = selectedIndustry
    ? (INDUSTRIES.find(i => i.name === selectedIndustry)?.icon ?? getFallbackIcon())
    : getFallbackIcon();

  return (
    <section ref={sectionRef} className="pt-24 pb-20 px-4 md:px-6 w-full max-w-[1400px] mx-auto font-sans relative">
      
      {/* TÍTULO DE LA SECCIÓN */}
      <div className="mb-14 md:mb-20 text-center flex flex-col items-center px-2">
        <h2 className="text-3xl md:text-5xl font-black text-[#111111] mb-4 tracking-tighter leading-tight">
          Product & Protocol Selector
        </h2>
        <p className="text-sm md:text-base text-gray-400 max-w-lg mx-auto font-medium leading-relaxed">
          Select your industry and target pathogens to reveal your recommended testing workflow.
        </p>
      </div>

      <div ref={containerRef} className="w-full bg-gray-50 rounded-[2rem] md:rounded-[3rem] p-6 sm:p-10 md:p-20 relative min-h-[600px] flex flex-col overflow-hidden">
        
        {/* BARRA DE PROGRESO Y RESUMEN */}
        <div className="w-full flex flex-col lg:flex-row lg:items-center justify-between mb-12 md:mb-20 gap-6 border-b border-gray-200 pb-8 md:pb-10">
           <div className="flex items-center gap-2 md:gap-8 w-full justify-start overflow-x-hidden no-scrollbar pb-2 md:pb-0">
              <button onClick={() => setStep(1)} className={`text-[10px] font-black flex items-center gap-2 transition-colors shrink-0 uppercase tracking-[0.15em] ${step === 1 ? 'text-[#FF270A]' : step > 1 ? 'text-[#111111]' : 'text-gray-300'}`}>
                 <span className={`w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-full text-[10px] shrink-0 transition-colors ${step === 1 ? 'bg-[#FF270A] text-white' : step > 1 ? 'bg-[#111111] text-white' : 'bg-gray-200 text-gray-400'}`}>1</span>
                 {step === 1 && <span>Industry</span>}
              </button>
              <div className="w-4 md:w-16 h-px bg-gray-200 shrink-0" />
              <button onClick={() => { if (step > 1) setStep(2) }} disabled={step < 2} className={`text-[10px] font-black flex items-center gap-2 transition-colors shrink-0 uppercase tracking-[0.15em] ${step === 2 ? 'text-[#FF270A]' : step > 2 ? 'text-[#111111]' : 'text-gray-300'} ${step > 1 ? 'cursor-pointer' : 'cursor-default'}`}>
                 <span className={`w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-full text-[10px] shrink-0 transition-colors ${step === 2 ? 'bg-[#FF270A] text-white' : step > 2 ? 'bg-[#111111] text-white' : 'bg-gray-200 text-gray-400'}`}>2</span>
                 {step === 2 && <span>Targets</span>}
              </button>
              <div className="w-4 md:w-16 h-px bg-gray-200 shrink-0" />
              <button disabled className={`text-[10px] font-black flex items-center gap-2 transition-colors shrink-0 uppercase tracking-[0.15em] cursor-default ${step === 3 ? 'text-[#FF270A]' : 'text-gray-300'}`}>
                 <span className={`w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-full text-[10px] shrink-0 transition-colors ${step === 3 ? 'bg-[#FF270A] text-white' : 'bg-gray-200 text-gray-400'}`}>3</span>
                 {step === 3 && <span>Protocol</span>}
              </button>
           </div>
           
           {/* PILL DE RESUMEN — siempre visible desde paso 2 en adelante */}
           {step > 1 && (
             <div className="flex items-center bg-white rounded-full p-1 shrink-0 max-w-full overflow-hidden">
               <div className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-black text-[#111111] uppercase tracking-[0.12em] border-r border-gray-100 min-w-0">
                 <CurrentIndustryIcon className="w-6 h-6 shrink-0 text-[#FF270A]" strokeWidth={1.5} />
                 <span className="truncate">{selectedIndustry}</span>
               </div>
               {selectedMicroorganisms.length > 0 && (
                 <div className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-black text-[#FF270A] uppercase tracking-[0.12em] shrink-0">
                   <img src="/bacteria.png" alt="" className="w-6 h-6 shrink-0 object-contain" />
                   <span>{selectedMicroorganisms.length} Target{selectedMicroorganisms.length !== 1 ? 's' : ''}</span>
                 </div>
               )}
             </div>
           )}
        </div>

        {/* --- PASO 1 --- */}
        {step === 1 && (
          <div className="flex flex-col items-center justify-center flex-grow animate-in fade-in zoom-in-95 duration-500">
            <div className="text-center mb-12 md:mb-16">
               <h3 className="text-3xl md:text-5xl font-black text-[#111111] mb-3 tracking-tighter leading-none">Select your industry</h3>
               <p className="text-gray-400 font-medium text-sm">Choose the sector that best describes your facility.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 w-full max-w-3xl">
              {INDUSTRIES.map(industry => {
                const Icon = industry.icon;
                return (
                  <button
                    key={industry.name}
                    onClick={() => { setSelectedIndustry(industry.name); setStep(2); }}
                    className="p-6 md:p-10 bg-white rounded-2xl md:rounded-[2rem] transition-all duration-300 flex flex-col items-center justify-center text-center min-h-[130px] md:min-h-[160px] gap-4 md:gap-5 group hover:bg-[#111111]"
                  >
                    <Icon className="w-9 h-9 md:w-12 md:h-12 shrink-0 text-gray-200 group-hover:text-[#FF270A] transition-colors" strokeWidth={1.5} />
                    <span className="text-[10px] md:text-xs font-black text-gray-400 group-hover:text-white uppercase tracking-[0.15em] leading-snug transition-colors">{industry.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* --- PASO 2 --- */}
        {step === 2 && (
          <div className="flex flex-col items-center justify-center flex-grow animate-in fade-in slide-in-from-right-8 duration-500">
            <img src="/bacteria.png" alt="Bacteria" className="w-16 h-16 md:w-24 md:h-24 object-contain mb-8 md:mb-10 opacity-70" />

            <div className="text-center mb-10 md:mb-14">
               <h3 className="text-3xl md:text-5xl font-black text-[#111111] mb-3 tracking-tighter leading-none">Select target microorganisms</h3>
               <p className="text-gray-400 font-medium text-sm">Choose the pathogens, indicators, or spoilage organisms you need to detect.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full max-w-4xl mb-12 md:mb-16">
              {MICROORGANISMS.map(micro => {
                const isSelected = selectedMicroorganisms.includes(micro.id);
                return (
                  <button
                    key={micro.id}
                    onClick={() => toggleMicroorganism(micro.id)}
                    className={`relative flex flex-col items-start p-5 md:p-7 rounded-2xl md:rounded-[2rem] transition-all duration-300 ${isSelected ? "bg-[#111111]" : "bg-white hover:bg-gray-100"}`}
                  >
                    <div className="flex items-center justify-between w-full mb-4">
                      <span className={`text-[9px] font-black tracking-[0.15em] uppercase px-3 py-1 rounded-full ${getTagStyle(micro.type, isSelected)}`}>
                        {micro.type}
                      </span>
                      {isSelected && <Check className="w-4 h-4 text-[#FF270A]" />}
                    </div>
                    <span className={`font-black text-lg md:text-xl tracking-tight text-left leading-snug ${isSelected ? 'text-white' : 'text-[#111111]'}`}>{micro.name}</span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => {
                setStep(3);
                setTimeout(() => {
                  sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                }, 50);
              }}
              disabled={selectedMicroorganisms.length === 0}
              className="bg-[#FF270A] text-white px-10 md:px-14 py-4 md:py-5 rounded-full font-black uppercase tracking-[0.15em] text-xs hover:bg-[#111111] transition-colors duration-300 disabled:opacity-30 flex items-center gap-3"
            >
              Discover our workflow <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col w-full h-full animate-in fade-in slide-in-from-bottom-8 duration-700 relative">

            <div className="flex flex-col items-start text-left mb-10 md:mb-14 w-full">
              <span className="text-[#FF270A] font-black uppercase tracking-[0.2em] text-[9px] md:text-[10px] mb-8 block">Build your workflow</span>

              {/* MATRIZ */}
              {!matrixConfirmed && (
                <p className="text-gray-400 font-medium text-xs mb-4 animate-in fade-in duration-300">
                  Start by selecting your sample matrix →
                </p>
              )}
              <div className="flex w-full md:w-fit items-center bg-white p-1 rounded-full mb-10 md:mb-12">
                <button
                  onClick={() => { setSampleType("Environmental"); setMatrixConfirmed(true); setProtocolConfirmed(false); }}
                  className={`flex-1 md:flex-none px-5 md:px-8 py-2.5 rounded-full text-xs font-black uppercase tracking-[0.1em] transition-colors leading-tight ${sampleType === "Environmental" && matrixConfirmed ? "bg-[#111111] text-white" : "text-gray-400 hover:text-[#111111]"}`}
                >Environmental</button>
                <button
                  onClick={() => { setSampleType("Finished product"); setMatrixConfirmed(true); setProtocolConfirmed(false); }}
                  className={`flex-1 md:flex-none px-5 md:px-8 py-2.5 rounded-full text-xs font-black uppercase tracking-[0.1em] transition-colors leading-tight ${sampleType === "Finished product" && matrixConfirmed ? "bg-[#111111] text-white" : "text-gray-400 hover:text-[#111111]"}`}
                >Finished product</button>
              </div>

              {/* CARRUSEL — aparece tras seleccionar matriz */}
              {matrixConfirmed && (
                <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-400">
                  {!protocolConfirmed && (
                    <p className="text-gray-400 font-medium text-xs mb-5">
                      Now select a detection protocol →
                    </p>
                  )}

                  {/* Wrapper full-bleed */}
                  <div className="relative -mx-6 sm:-mx-10 md:-mx-20">
                    {/* Flechas desktop */}
                    <div className={`hidden md:flex absolute top-1/2 -translate-y-1/2 left-4 z-20 transition-opacity duration-300 ${canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                      <button onClick={() => scrollProtocols("left")} className="w-10 h-10 rounded-full bg-white border border-gray-100 text-[#111111] flex items-center justify-center hover:text-[#FF270A] transition-colors shadow-sm">
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                    </div>
                    <div className={`hidden md:flex absolute top-1/2 -translate-y-1/2 right-4 z-20 transition-opacity duration-300 ${canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                      <button onClick={() => scrollProtocols("right")} className="w-10 h-10 rounded-full bg-white border border-gray-100 text-[#111111] flex items-center justify-center hover:text-[#FF270A] transition-colors shadow-sm">
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Track — inline style padding mirrors container p-6 sm:p-10 md:p-20 exactly */}
                    <div
                      ref={protocolsScrollRef}
                      onScroll={checkScroll}
                      className="flex overflow-x-auto gap-3 md:gap-4 py-3 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
                      style={{ paddingLeft: containerPad, paddingRight: containerPad, scrollPaddingLeft: containerPad }}
                    >
                      {potentialFlows.map(([_, micros]: any, idx) => {
                        const isActive = activeFlowIndex === idx && protocolConfirmed;
                        return (
                          <div
                            key={idx}
                            className="snap-start shrink-0 flex flex-col items-start justify-between text-left p-6 md:px-8 md:py-8 rounded-2xl md:rounded-[2rem] transition-all duration-300 w-[80vw] sm:w-[340px] md:w-[380px] h-auto whitespace-normal break-words cursor-pointer"
                            style={{ background: isActive ? '#111111' : '#ffffff' }}
                            onClick={() => { setActiveFlowIndex(idx); setProtocolConfirmed(true); }}
                          >
                            <div className="w-full">
                              <div className="flex items-baseline gap-3 mb-4">
                                <p className={`text-[9px] font-black uppercase tracking-[0.2em] ${isActive ? 'text-gray-400' : 'text-gray-500'}`}>Protocol {idx + 1}</p>
                                <span className={`w-px h-3 ${isActive ? 'bg-gray-600' : 'bg-gray-200'}`} />
                                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#FF270A]">{calculateTotalTime()} hrs</p>
                              </div>
                              <p className={`font-black text-lg md:text-2xl leading-snug break-words tracking-tight ${isActive ? 'text-white' : 'text-[#111111]'}`}>
                                Detection of {micros.join(" + ")}
                              </p>
                            </div>
                            <button
                              onClick={(e) => { e.stopPropagation(); setProtocolCompareIndex(idx); }}
                              className={`mt-6 flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.15em] transition-colors ${isActive ? 'text-white hover:text-gray-300' : 'text-gray-500 hover:text-[#FF270A]'}`}
                            >
                              <FileText className="w-3 h-3" /> See how we compare vs. competitors
                            </button>
                          </div>
                        );
                      })}
                    </div>

                    {/* Dot indicators — mobile only */}
                    {potentialFlows.length > 1 && (
                      <div className="flex md:hidden justify-center gap-2 mt-4">
                        {potentialFlows.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setActiveFlowIndex(idx);
                              setProtocolConfirmed(true);
                              protocolsScrollRef.current?.scrollTo({ left: idx * (protocolsScrollRef.current.clientWidth * 0.8 + 12), behavior: 'smooth' });
                            }}
                            className={`rounded-full transition-all duration-300 ${activeFlowIndex === idx && protocolConfirmed ? 'w-5 h-2 bg-[#FF270A]' : 'w-2 h-2 bg-gray-300'}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* PRODUCTOS — solo visibles tras confirmar protocolo */}
            {protocolConfirmed && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="w-full mb-8 md:mb-10">
                  <p className="text-[9px] font-black text-[#FF270A] uppercase tracking-[0.2em] mb-1">Recommended Products</p>
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">{sampleType} · {selectedIndustry}</p>
                  {potentialFlows[activeFlowIndex] && (
                    <p className="text-xl md:text-2xl font-black text-[#111111] tracking-tight leading-snug">
                      Detection of {(potentialFlows[activeFlowIndex][1] as string[]).join(" + ")}
                    </p>
                  )}
                </div>

                {/* Desktop: grid hasta 4 columnas. Mobile: carrusel full-bleed con dots */}
                <div className="hidden md:grid gap-3 md:gap-4" style={{ gridTemplateColumns: `repeat(${Math.min(getActiveStages().length, 4)}, 1fr)` }}>
                  {getActiveStages().map((stage, sIdx, arr) => {
                    const currentProd = PRODUCT_BY_ID[selectedProductIds[stage.key]];
                    const alternatives = stage.products.filter(p => p.id !== selectedProductIds[stage.key]);
                    return (
                      <Fragment key={stage.key}>
                        <div className="bg-white p-6 md:p-8 rounded-2xl md:rounded-[2rem] flex flex-col">
                          <span className="text-[9px] font-black text-[#111111] uppercase tracking-[0.2em] mb-5 block">
                            {String(sIdx + 1).padStart(2, '0')} — {stage.label}
                          </span>
                          <div className="flex-grow">
                            <h5 className="text-lg md:text-xl font-black text-[#111111] leading-tight tracking-tight mb-2">{currentProd.name}</h5>
                            <p className="text-[10px] text-gray-500 font-medium mb-4">Cat #{currentProd.cat} · {currentProd.format}</p>
                            <p className="text-sm text-gray-500 leading-relaxed">{currentProd.desc}</p>
                          </div>
                          <div className="mt-6 pt-5 border-t border-gray-100 flex flex-col gap-3">
                            <div className="flex items-center gap-2 h-5">
                              <Clock className="w-3.5 h-3.5 text-[#FF270A] shrink-0" />
                              <span className="text-[10px] font-black text-[#111111] uppercase tracking-[0.1em]">
                                {currentProd.timeHours >= 1 ? `${currentProd.timeHours}h` : `${currentProd.timeHours * 60} min`}
                              </span>
                            </div>
                            <button onClick={() => setValueBriefProduct(currentProd)} className="flex items-center gap-2 h-5 hover:opacity-60 transition-opacity">
                              <FileText className="w-3.5 h-3.5 text-[#FF270A] shrink-0" />
                              <span className="text-[10px] font-black text-[#111111] uppercase tracking-[0.1em]">Product Value Brief</span>
                            </button>
                            <a href={currentProd.technicalDataUrl} className="flex items-center gap-2 h-5 hover:opacity-60 transition-opacity">
                              <FileText className="w-3.5 h-3.5 text-[#FF270A] shrink-0" />
                              <span className="text-[10px] font-black text-[#111111] uppercase tracking-[0.1em]">Technical Data</span>
                            </a>
                            <div className="h-5 flex items-center">
                              {alternatives.length > 0 && (
                                <button onClick={() => setActiveModalStage(stage.key)} className="flex items-center gap-2 hover:opacity-60 transition-opacity">
                                  <RotateCcw className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.1em]">View Alternatives</span>
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                        {sIdx < arr.length - 1 && (
                          <div className="hidden" />
                        )}
                      </Fragment>
                    );
                  })}
                </div>

                {/* Mobile: carrusel full-bleed con dots */}
                <div className="md:hidden relative -mx-6 sm:-mx-10">
                  <div
                    ref={productsScrollRef}
                    onScroll={() => {
                      if (productsScrollRef.current) {
                        const el = productsScrollRef.current;
                        const cardW = el.clientWidth * 0.8 + 12;
                        setActiveProdDot(Math.round(el.scrollLeft / cardW));
                      }
                    }}
                    className="flex overflow-x-auto gap-3 py-3 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
                    style={{ paddingLeft: containerPad, paddingRight: containerPad, scrollPaddingLeft: containerPad }}
                  >
                    {getActiveStages().map((stage, sIdx) => {
                      const currentProd = PRODUCT_BY_ID[selectedProductIds[stage.key]];
                      const alternatives = stage.products.filter(p => p.id !== selectedProductIds[stage.key]);
                      return (
                        <div key={stage.key} className="snap-start shrink-0 w-[80vw] bg-white p-6 rounded-2xl flex flex-col">
                          <span className="text-[9px] font-black text-[#111111] uppercase tracking-[0.2em] mb-5 block">
                            {String(sIdx + 1).padStart(2, '0')} — {stage.label}
                          </span>
                          <div className="flex-grow">
                            <h5 className="text-xl font-black text-[#111111] leading-tight tracking-tight mb-2">{currentProd.name}</h5>
                            <p className="text-[10px] text-gray-500 font-medium mb-4">Cat #{currentProd.cat} · {currentProd.format}</p>
                            <p className="text-sm text-gray-500 leading-relaxed">{currentProd.desc}</p>
                          </div>
                          <div className="mt-6 pt-5 border-t border-gray-100 flex flex-col gap-3">
                            <div className="flex items-center gap-2 h-5">
                              <Clock className="w-3.5 h-3.5 text-[#FF270A] shrink-0" />
                              <span className="text-[10px] font-black text-[#111111] uppercase tracking-[0.1em]">
                                {currentProd.timeHours >= 1 ? `${currentProd.timeHours}h` : `${currentProd.timeHours * 60} min`}
                              </span>
                            </div>
                            <button onClick={() => setValueBriefProduct(currentProd)} className="flex items-center gap-2 h-5 hover:opacity-60 transition-opacity">
                              <FileText className="w-3.5 h-3.5 text-[#FF270A] shrink-0" />
                              <span className="text-[10px] font-black text-[#111111] uppercase tracking-[0.1em]">Product Value Brief</span>
                            </button>
                            <a href={currentProd.technicalDataUrl} className="flex items-center gap-2 h-5 hover:opacity-60 transition-opacity">
                              <FileText className="w-3.5 h-3.5 text-[#FF270A] shrink-0" />
                              <span className="text-[10px] font-black text-[#111111] uppercase tracking-[0.1em]">Technical Data</span>
                            </a>
                            <div className="h-5 flex items-center">
                              {alternatives.length > 0 && (
                                <button onClick={() => setActiveModalStage(stage.key)} className="flex items-center gap-2 hover:opacity-60 transition-opacity">
                                  <RotateCcw className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.1em]">View Alternatives</span>
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Dot indicators productos — mobile */}
                  {getActiveStages().length > 1 && (
                    <div className="flex justify-center gap-2 mt-4">
                      {getActiveStages().map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setActiveProdDot(idx);
                            productsScrollRef.current?.scrollTo({ left: idx * (productsScrollRef.current.clientWidth * 0.8 + 12), behavior: 'smooth' });
                          }}
                          className={`rounded-full transition-all duration-300 ${activeProdDot === idx ? 'w-5 h-2 bg-[#FF270A]' : 'w-2 h-2 bg-gray-300'}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* CTA — solo cuando protocolo confirmado, tamaño original */}
            {protocolConfirmed && (
              <div className="mt-16 md:mt-24 w-full flex flex-col items-center justify-center border-t border-gray-200 pt-12 md:pt-16 animate-in fade-in duration-500">
                <h3 className="text-xl md:text-3xl font-black text-[#111111] mb-2 md:mb-3 tracking-tight text-center">Ready to optimize your lab?</h3>
                <p className="text-sm text-gray-400 font-medium mb-8 text-center max-w-sm">Get a customized quote for your {selectedIndustry} workflow.</p>
                <button
                  onClick={handleOpenQuote}
                  className="bg-[#111111] text-white px-8 py-4 md:px-10 md:py-5 rounded-full font-bold uppercase tracking-widest text-xs md:text-sm hover:bg-[#FF270A] transition-colors duration-300 flex items-center gap-3"
                >
                  <Mail className="w-4 h-4" /> Request Quote
                </button>
                <button onClick={reset} className="mt-8 flex items-center gap-2 text-[9px] font-black text-gray-500 hover:text-[#111111] uppercase tracking-[0.15em] transition-colors">
                  <RotateCcw className="w-3 h-3" /> Start Over
                </button>
              </div>
            )}
            
          </div>
        )}
      </div>

      {/* --- MODAL DE ALTERNATIVAS --- */}
      {activeModalStage && (
        <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
           <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 max-w-md w-full relative animate-in zoom-in-95 duration-300">
              <button 
                onClick={() => setActiveModalStage(null)} 
                className="absolute top-4 right-4 md:top-6 md:right-6 p-2 bg-gray-50 rounded-full hover:bg-gray-200 transition-colors"
              >
                <X className="w-5 h-5 text-[#111111]" />
              </button>
              
              <div className="mb-6 md:mb-8 pr-8">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 block">Switch product for</span>
                <h3 className="text-xl md:text-2xl font-black text-[#111111] leading-tight">{activeModalStage} Stage</h3>
              </div>

              <div className="flex flex-col gap-3">
                 {(STAGE_BY_KEY[activeModalStage]?.products ?? [])
                   .filter((p: Product) => p.id !== selectedProductIds[activeModalStage])
                   .map((alt: Product) => (
                    <div 
                      key={alt.id} 
                      onClick={() => handleProductChange(activeModalStage, alt.id)} 
                      className="p-4 md:p-5 bg-gray-50 hover:bg-gray-200 transition-colors rounded-2xl flex items-center justify-between cursor-pointer group"
                    >
                       <div className="pr-4">
                         <h4 className="font-bold text-[#111111] text-sm mb-1 group-hover:text-[#FF270A] transition-colors">{alt.name}</h4>
                         <span className="text-[10px] md:text-xs font-medium text-gray-400 block mb-2">Cat #{alt.cat} • {alt.format}</span>
                         <p className="text-[10px] md:text-xs text-[#111111] leading-relaxed font-medium">{alt.desc}</p>
                       </div>
                       <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#FF270A] group-hover:translate-x-1 transition-all shrink-0"/>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      )}

      {/* --- MODAL DE COTIZACIÓN --- */}
      {isQuoteModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
           <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-12 max-w-2xl w-full relative animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
              <button 
                onClick={() => setIsQuoteModalOpen(false)} 
                className="absolute top-4 right-4 md:top-6 md:right-6 p-2 bg-gray-50 rounded-full hover:bg-gray-200 transition-colors"
              >
                <X className="w-5 h-5 text-[#111111]" />
              </button>

              {isQuoteSent ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4 md:mb-6">
                    <CheckCircle2 className="w-8 h-8 md:w-10 md:h-10 text-[#111111]" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-[#111111] mb-2 tracking-tight">Request Sent!</h3>
                  <p className="text-sm md:text-base text-gray-500 font-medium">Our team will get back to you with the quotation shortly.</p>
                </div>
              ) : (
                <>
                  <div className="mb-6 md:mb-8 pr-10">
                    <span className="text-[10px] font-black text-[#FF270A] uppercase tracking-widest mb-2 block">Quote Request</span>
                    <h3 className="text-xl md:text-3xl font-black text-[#111111] leading-tight">Get pricing for your {selectedIndustry} workflow</h3>
                  </div>

                  <form onSubmit={submitQuote} className="flex flex-col gap-4 md:gap-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                       <input 
                         type="text" 
                         placeholder="Full Name" 
                         required 
                         className="w-full bg-gray-50 border border-transparent text-[#111111] placeholder:text-gray-400 text-sm rounded-xl md:rounded-2xl px-5 py-3 md:px-6 md:py-4 outline-none focus:border-[#FF270A]/30 focus:bg-white transition-colors font-medium" 
                       />
                       <input 
                         type="email" 
                         placeholder="Work Email" 
                         required 
                         className="w-full bg-gray-50 border border-transparent text-[#111111] placeholder:text-gray-400 text-sm rounded-xl md:rounded-2xl px-5 py-3 md:px-6 md:py-4 outline-none focus:border-[#FF270A]/30 focus:bg-white transition-colors font-medium" 
                       />
                    </div>
                    
                    <input 
                       type="text" 
                       placeholder="Company Name" 
                       required 
                       className="w-full bg-gray-50 border border-transparent text-[#111111] placeholder:text-gray-400 text-sm rounded-xl md:rounded-2xl px-5 py-3 md:px-6 md:py-4 outline-none focus:border-[#FF270A]/30 focus:bg-white transition-colors font-medium" 
                    />

                    <div className="flex flex-col gap-2 mt-2">
                       <label className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest pl-2">Details (Editable)</label>
                       <textarea 
                         value={quoteMessage}
                         onChange={(e) => setQuoteMessage(e.target.value)}
                         rows={8} 
                         required 
                         className="w-full bg-gray-50 border border-transparent text-[#111111] placeholder:text-gray-400 text-xs md:text-sm rounded-xl md:rounded-2xl px-5 py-3 md:px-6 md:py-4 outline-none focus:border-[#FF270A]/30 focus:bg-white transition-colors font-medium resize-none leading-relaxed"
                       />
                    </div>
                    
                    <button 
                      type="submit" 
                      disabled={isSubmittingQuote} 
                      className="w-full bg-[#111111] text-white hover:bg-[#FF270A] font-bold text-xs md:text-sm uppercase tracking-widest py-4 md:py-5 rounded-xl md:rounded-2xl flex items-center justify-center gap-3 transition-colors disabled:opacity-50 mt-2"
                    >
                       {isSubmittingQuote ? "Sending..." : "Send Request"} {!isSubmittingQuote && <Send className="w-4 h-4" />}
                    </button>
                  </form>
                </>
              )}
           </div>
        </div>
      )}

      {/* --- MODAL: PROTOCOL COMPARISON BROCHURE --- */}
      {protocolCompareIndex !== null && (() => {
        const [_, micros]: any = potentialFlows[protocolCompareIndex];
        // Use comparison data from the first active stage's selected product as the protocol reference
        const refProduct = PRODUCT_BY_ID[selectedProductIds[getActiveStages()[0]?.key ?? "Enrichment"]];
        const cmp = refProduct?.protocolComparison;
        if (!cmp) return null;
        return (
          <div className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] max-w-2xl w-full relative animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
              <div className="bg-[#111111] rounded-t-[2rem] md:rounded-t-[2.5rem] px-8 md:px-12 py-8 md:py-10 relative">
                <button onClick={() => setProtocolCompareIndex(null)} className="absolute top-4 right-4 md:top-6 md:right-6 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                  <X className="w-5 h-5 text-white" />
                </button>
                <span className="text-[10px] font-black text-[#FF270A] uppercase tracking-widest mb-2 block">Protocol Comparison</span>
                <h3 className="text-2xl md:text-3xl font-black text-white leading-tight tracking-tighter">Protocol {protocolCompareIndex + 1}</h3>
                <p className="text-gray-400 text-xs md:text-sm font-medium mt-2">Detection of {micros.join(" + ")}</p>
              </div>

              <div className="px-8 md:px-12 py-8 md:py-10 flex flex-col gap-8">
                {/* Why TAAG wins */}
                <div>
                  <span className="text-[10px] font-black text-[#FF270A] uppercase tracking-widest mb-4 block">Why TAAG wins</span>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {cmp.highlights.map(item => (
                      <div key={item.label} className="bg-gray-50 rounded-2xl p-5">
                        <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 block mb-3">{item.label}</span>
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#FF270A] shrink-0" />
                            <span className="text-xs font-bold text-[#111111]">{item.taag}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-gray-300 shrink-0" />
                            <span className="text-xs text-gray-400 font-medium">{item.industryAvg}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Head-to-head table — columns driven by competitorNames */}
                <div>
                  <span className="text-[10px] font-black text-[#FF270A] uppercase tracking-widest mb-4 block">Head-to-Head Comparison</span>
                  <div className="rounded-2xl overflow-hidden border border-gray-100">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="text-left px-4 py-3 font-black text-[#111111] uppercase tracking-widest text-[9px]">Feature</th>
                          <th className="px-4 py-3 font-black text-[#FF270A] uppercase tracking-widest text-[9px] text-center">TAAG</th>
                          {cmp.competitorNames.map(name => (
                            <th key={name} className="px-4 py-3 font-black text-gray-400 uppercase tracking-widest text-[9px] text-center">{name}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {cmp.rows.map((row, i) => (
                          <tr key={row.feature} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                            <td className="px-4 py-3 font-semibold text-[#111111]">{row.feature}</td>
                            <td className="px-4 py-3 text-center font-bold text-[#111111]">{row.taag}</td>
                            {cmp.competitorNames.map(name => (
                              <td key={name} className="px-4 py-3 text-center text-gray-400 font-medium">
                                {row.competitors[name] ?? "—"}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <button onClick={() => { setProtocolCompareIndex(null); setIsQuoteModalOpen(true); }} className="w-full bg-[#FF270A] text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-[#111111] transition-colors flex items-center justify-center gap-3">
                  <Mail className="w-4 h-4" /> Request Quote for this Protocol
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* --- MODAL: PRODUCT VALUE BRIEF --- */}
      {valueBriefProduct && (
        <div className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] max-w-xl w-full relative animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
            <div className="bg-[#111111] rounded-t-[2rem] md:rounded-t-[2.5rem] px-8 md:px-12 py-8 md:py-10 relative">
              <button onClick={() => setValueBriefProduct(null)} className="absolute top-4 right-4 md:top-6 md:right-6 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                <X className="w-5 h-5 text-white" />
              </button>
              <span className="text-[10px] font-black text-[#FF270A] uppercase tracking-widest mb-2 block">Product Value Brief</span>
              <h3 className="text-2xl md:text-3xl font-black text-white leading-tight tracking-tighter">{valueBriefProduct.name}</h3>
              <p className="text-gray-400 text-xs font-medium mt-2">Cat #{valueBriefProduct.cat} · {valueBriefProduct.format}</p>
            </div>

            <div className="px-8 md:px-12 py-8 md:py-10 flex flex-col gap-8">
              <div>
                <span className="text-[10px] font-black text-[#FF270A] uppercase tracking-widest mb-4 block">Key Advantages</span>
                <div className="flex flex-col gap-3">
                  {valueBriefProduct.valueBrief.advantages.map((adv: string, i: number) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                      <div className="w-5 h-5 shrink-0 rounded-full bg-[#FF270A]/10 flex items-center justify-center mt-0.5">
                        <Check className="w-3 h-3 text-[#FF270A]" />
                      </div>
                      <p className="text-xs md:text-sm text-[#111111] font-medium leading-relaxed">{adv}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-black text-[#FF270A] uppercase tracking-widest mb-4 block">Value at a Glance</span>
                <div className="grid grid-cols-3 gap-3">
                  {valueBriefProduct.valueBrief.metrics.map(item => (
                    <div key={item.label} className="bg-gray-50 rounded-2xl p-4 text-center">
                      <span className="text-xl md:text-2xl font-black text-[#111111] block">{item.value}</span>
                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mt-1">{item.label}</span>
                      <span className="text-[9px] text-gray-400 block">{item.sub}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button onClick={() => { setValueBriefProduct(null); setIsQuoteModalOpen(true); }} className="w-full bg-[#111111] text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-[#FF270A] transition-colors flex items-center justify-center gap-3">
                  <Mail className="w-4 h-4" /> Request Quote
                </button>
                <a href={valueBriefProduct.technicalDataUrl} className="w-full border border-gray-200 text-[#111111] py-4 rounded-2xl font-bold uppercase tracking-widest text-xs hover:border-[#111111] transition-colors flex items-center justify-center gap-3">
                  <FileText className="w-4 h-4" /> Full Technical Data
                </a>
              </div>
            </div>
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