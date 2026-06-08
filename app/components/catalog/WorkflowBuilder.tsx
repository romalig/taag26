"use client";

import { useState, useMemo, useRef, useEffect, Fragment } from "react";
import {
  ArrowRight, ChevronLeft, ChevronRight, Check, RotateCcw,
  FileText, Clock, X, Mail, Send, CheckCircle2, AlertTriangle,
  Timer, Activity, Zap,
} from "lucide-react";
import {
  INDUSTRIES, getFallbackIcon,
  getMicroorganismsForIndustry, getResolvedProtocolsForIndustry, getAvailableSampleTypes, getPcrAlternatives,
  resolveChain, selectOptimalProtocols, MICRO_BY_ID, DEF_BY_ID, formatTime,
  STAGE_LABELS, STAGE_ORDER,
  type Protocol, type StageKey, type Microorganism, type SampleType,
  type ResolvedStageOption, type KeyAdvantage, type ProductPresentation,
} from "./workflowData";
import { BROCHURES, PCR_TECH_DETAILS, AOAC_KIT_IDS } from "./data/brochures";
import ProductBrief, { type ValueBriefData, type BriefTechDetail, type BriefRelated } from "./ProductBrief";
import { useModal } from "./ModalProvider";

type CompetitorKey = "leadingPcr" | "traditional";

const STAGE_PURPOSE: Record<string, string> = {
  sampling: "Collects and stabilizes the sample for testing",
  enrichment: "Promotes target growth before detection",
  extraction: "Releases and purifies nucleic acids for PCR",
};

const DEFAULT_HERO = "/hero-elevia.jpg";
const DEFAULT_KIT_IMAGE = "/kit-placeholder.png";

function briefFromProtocol(p: Protocol): ValueBriefData {
  const pcrStage = p.chain.find(s => s.key === "pcr");
  const cmp = p.comparison;
  const broc = BROCHURES[p.id];

  const isAoac = AOAC_KIT_IDS.includes(p.id);
  const tech: BriefTechDetail[] = PCR_TECH_DETAILS.map(t => ({
    label: t.label,
    value: t.badge === "aoac" ? (isAoac ? "AOAC" : "") : "",
    note: t.note,
    icon: t.icon ?? null,
  }));

  const related: BriefRelated[] = [];
  for (const s of p.chain) {
    if (s.key === "pcr" || !s.chosen) continue;
    related.push({
      stage: STAGE_LABELS[s.key] ?? s.key,
      name: s.chosen.name,
      cat: s.chosen.cat ?? "—",
      note: STAGE_PURPOSE[s.key] ?? "",
      format: s.chosen.format,
      size: s.chosen.size,
    });
  }

  return {
    name: p.name,
    description: p.description.en,
    keyAdvantages: p.keyAdvantages,
    features: p.features,
    techDetails: tech,
    relatedProducts: related,
    presentations: pcrStage ? pcrStage.chosen.presentations : [],
    specs: {
      time: formatTime(p.totalTimeHours),
      sensitivity: p.sensitivity ? p.sensitivity.split("\n")[0] : "1 CFU",
      technology: p.technology ?? "Real-Time PCR",
    },
    detects: p.detects.length ? p.detects.map(id => MICRO_BY_ID[id]?.shortName ?? id).join(", ") : null,
    highlights: broc?.highlights ?? [],
    plant: broc ? broc.plant : [],
    lab: broc ? broc.lab : [],
    pdfPlant: broc?.pdfPlant,
    pdfLab: broc?.pdfLab,
    pdfDescription: broc?.pdfDescription,
    comparisonRows: cmp ? cmp.rows : [],
    isAigor: (p.technology ?? "").includes("AiGOR"),
    isPcr: true,
    heroImage: DEFAULT_HERO,
    kitImage: `/${p.id}.png`,
  };
}

function stageTimeText(o: { timeHours: number | null; timeLabel: string | null; timeEstimated: boolean }): string {
  if (o.timeLabel) return o.timeLabel;
  if (o.timeHours != null) return formatTime(o.timeHours) + (o.timeEstimated ? " est." : "");
  return "—";
}

function briefFromStageOption(o: ResolvedStageOption): ValueBriefData {
  return {
    name: o.name,
    description: o.description,
    keyAdvantages: [],
    features: o.features,
    techDetails: [],
    relatedProducts: [],
    presentations: o.presentations,
    specs: null,
    detects: null,
    highlights: [],
    plant: [],
    lab: [],
    comparisonRows: [],
    isAigor: false,
    isPcr: false,
    heroImage: DEFAULT_HERO,
    kitImage: DEFAULT_KIT_IMAGE,
  };
}

const COMPETITORS: { label: string; key: CompetitorKey }[] = [
  { label: "Leading PCR Test", key: "leadingPcr" },
  { label: "Traditional Micro", key: "traditional" },
];

export default function WorkflowBuilder() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [selectedMicroorganisms, setSelectedMicroorganisms] = useState<string[]>([]);
  const [stageOverrides, setStageOverrides] = useState<Record<string, Partial<Record<StageKey, string>>>>({});
  const [stagePickerFor, setStagePickerFor] = useState<{ protocolId: string; stage: StageKey; mode: "formats" | "options" } | null>(null);
  const [pcrSubstitutions, setPcrSubstitutions] = useState<Record<string, string>>({});
  const [pcrPickerForId, setPcrPickerForId] = useState<string | null>(null);
  const [sampleType, setSampleType] = useState<SampleType>("Finished");
  const [activeProtocolIndex, setActiveProtocolIndex] = useState(0);

  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteMessage, setQuoteMessage] = useState("");
  const [isSubmittingQuote, setIsSubmittingQuote] = useState(false);
  const [isQuoteSent, setIsQuoteSent] = useState(false);
  const [protocolCompareIndex, setProtocolCompareIndex] = useState<number | null>(null);
  const { openModal, closeAll } = useModal();

  const openBrief = (data: ValueBriefData) =>
    openModal(<ProductBrief data={data} onRequestQuote={() => { closeAll(); setIsQuoteModalOpen(true); }} />);

  const [protocolConfirmed, setProtocolConfirmed] = useState(false);
  const [activeProdDot, setActiveProdDot] = useState(0);
  const productsScrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerPad, setContainerPad] = useState("1.5rem");

  useEffect(() => {
    const updatePad = () => {
      if (containerRef.current) setContainerPad(getComputedStyle(containerRef.current).paddingLeft);
    };
    updatePad();
    window.addEventListener("resize", updatePad);
    return () => window.removeEventListener("resize", updatePad);
  }, []);

  const sectionRef = useRef<HTMLElement>(null);
  const protocolsScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const availableMicros: Microorganism[] = useMemo(
    () => getMicroorganismsForIndustry(selectedIndustry),
    [selectedIndustry]
  );

  const basePlan = useMemo(() => {
    const resolved = getResolvedProtocolsForIndustry(selectedIndustry, sampleType).map(p => {
      const ov = stageOverrides[p.id];
      return ov ? resolveChain(p._def, ov, sampleType, selectedIndustry) : p;
    });
    return selectOptimalProtocols(selectedMicroorganisms, resolved);
  }, [selectedMicroorganisms, selectedIndustry, stageOverrides, sampleType]);

  const plan = useMemo(() => {
    if (!Object.keys(pcrSubstitutions).length) return basePlan;
    const coverage = basePlan.coverageByProtocol.map(c => ({ ...c }));
    const protocols = basePlan.protocols.map((p, idx) => {
      const subId = pcrSubstitutions[p.id];
      if (!subId || subId === p.id) return p;
      const def = DEF_BY_ID[subId];
      if (!def) return p;
      const ov = stageOverrides[subId];
      const newProto = resolveChain(def, ov, sampleType, selectedIndustry);
      const cov = coverage.find(c => c.protocolId === p.id);
      if (cov) cov.protocolId = newProto.id;
      return newProto;
    });
    return { ...basePlan, protocols, coverageByProtocol: coverage };
  }, [basePlan, pcrSubstitutions, stageOverrides, sampleType, selectedIndustry]);

  const availableSampleTypes = useMemo(() => getAvailableSampleTypes(selectedIndustry), [selectedIndustry]);

  useEffect(() => {
    if (availableSampleTypes.length && !availableSampleTypes.includes(sampleType)) setSampleType(availableSampleTypes[0]);
  }, [availableSampleTypes, sampleType]);

  const coversById = useMemo(() => {
    const m: Record<string, string[]> = {};
    plan.coverageByProtocol.forEach(c => { m[c.protocolId] = c.covers; });
    return m;
  }, [plan]);

  const originalCoversByRecommendedId = useMemo(() => {
    const m: Record<string, string[]> = {};
    basePlan.coverageByProtocol.forEach(c => { m[c.protocolId] = c.covers; });
    return m;
  }, [basePlan]);

  const activeProtocol: Protocol | undefined = plan.protocols[activeProtocolIndex];
  const activeRecommendedId: string | undefined = basePlan.protocols[activeProtocolIndex]?.id;

  const pcrAlternatives = useMemo(() => {
    if (activeRecommendedId === undefined) return [];
    const requested = originalCoversByRecommendedId[activeRecommendedId] ?? [];
    if (!requested.length) return [];
    return getPcrAlternatives(requested, selectedIndustry, sampleType);
  }, [activeRecommendedId, originalCoversByRecommendedId, selectedIndustry, sampleType]);

  const toggleMicroorganism = (id: string) => {
    setSelectedMicroorganisms(prev => prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]);
    setProtocolConfirmed(false);
    setActiveProtocolIndex(0);
    setPcrSubstitutions({});
    setStageOverrides({});
  };

  const chainOf = (proto?: Protocol) => proto ? proto.chain : [];

  const chooseStageOption = (protocolId: string, stage: StageKey, optionId: string) => {
    setStageOverrides(prev => ({ ...prev, [protocolId]: { ...prev[protocolId], [stage]: optionId } }));
    setStagePickerFor(null);
  };

  const choosePcrAlternative = (recommendedId: string, chosenId: string) => {
    setPcrSubstitutions(prev => ({ ...prev, [recommendedId]: chosenId }));
    setPcrPickerForId(null);
  };

  const reset = () => {
    setStep(1);
    setSelectedIndustry(null);
    setSelectedMicroorganisms([]);
    setActiveProtocolIndex(0);
    setProtocolConfirmed(false);
    setStageOverrides({});
    setStagePickerFor(null);
    setPcrSubstitutions({});
    setPcrPickerForId(null);
    setSampleType("Finished");
    setTimeout(() => sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };

  const getTagStyle = (type: string, isSelected: boolean) => {
    if (isSelected) {
      if (type === "PATHOGEN") return "bg-red-500/20 text-red-400";
      if (type === "SPOILAGE") return "bg-orange-500/20 text-orange-400";
      return "bg-gray-500/20 text-gray-300";
    }
    if (type === "PATHOGEN") return "bg-red-50 text-red-600";
    if (type === "SPOILAGE") return "bg-orange-50 text-orange-600";
    return "bg-gray-100 text-gray-500";
  };

  const checkScroll = () => {
    if (protocolsScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = protocolsScrollRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  useEffect(() => {
    if (step === 3) { checkScroll(); setTimeout(checkScroll, 150); setTimeout(checkScroll, 400); }
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [step, plan]);

  const scrollProtocols = (direction: "left" | "right") => {
    if (protocolsScrollRef.current) {
      protocolsScrollRef.current.scrollBy({ left: direction === "left" ? -300 : 300, behavior: "smooth" });
      setTimeout(checkScroll, 350);
    }
  };

  const microNames = (ids: string[]) => ids.map(id => MICRO_BY_ID[id]?.shortName ?? id).join(" + ");

  const handleOpenQuote = () => {
    let text = "";
    plan.protocols.forEach((p, idx) => {
      const covers = coversById[p.id] ?? [];
      text += `Protocol ${idx + 1} — ${p.name} (${formatTime(p.totalTimeHours)})\n`;
      text += `  Detects: ${microNames(covers)}\n`;
      p.chain.forEach(s => { if (s.chosen) text += `  - ${STAGE_LABELS[s.key]}: ${s.chosen.name}\n`; });
      text += `\n`;
    });
    if (plan.uncoverable.length) text += `Not covered by current catalog: ${microNames(plan.uncoverable)}\n\n`;
    const msg = `Hello TAAG Team,\n\nI would like a quote for the following workflow(s) for the ${selectedIndustry} industry:\n\n${text}Please share pricing and availability.\n\nThank you.`;
    setQuoteMessage(msg);
    setIsQuoteModalOpen(true);
    setIsQuoteSent(false);
  };

  const openQuoteForProtocol = (p: Protocol) => {
    const covers = coversById[p.id] ?? [];
    let text = `${p.name} (${formatTime(p.totalTimeHours)})\n  Detects: ${microNames(covers)}\n\nProducts:\n`;
    p.chain.forEach(s => { if (s.chosen) text += `  - ${STAGE_LABELS[s.key]}: ${s.chosen.name} (Cat #${s.chosen.cat ?? "—"})\n`; });
    const msg = `Hello TAAG Team,\n\nI would like a quote for the following protocol for the ${selectedIndustry} industry:\n\n${text}\nPlease share pricing and availability.\n\nThank you.`;
    setQuoteMessage(msg);
    setIsQuoteSent(false);
    setIsQuoteModalOpen(true);
  };

  const submitQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingQuote(true);
    await new Promise(r => setTimeout(r, 1500));
    setIsSubmittingQuote(false);
    setIsQuoteSent(true);
    setTimeout(() => { setIsQuoteSent(false); setIsQuoteModalOpen(false); }, 4000);
  };

  const CurrentIndustryIcon = selectedIndustry
    ? (INDUSTRIES.find(i => i.name === selectedIndustry)?.icon ?? getFallbackIcon())
    : getFallbackIcon();

  return (
    <section ref={sectionRef} className="pt-24 pb-20 px-4 md:px-6 w-full max-w-[1400px] mx-auto font-sans relative">
      <div className="mb-14 md:mb-20 text-center flex flex-col items-center px-2">
        <h2 className="text-3xl md:text-5xl font-black text-[#111111] mb-4 tracking-tighter leading-tight">
          Product &amp; Protocol Selector
        </h2>
        <p className="text-sm md:text-base text-gray-400 max-w-lg mx-auto font-medium leading-relaxed">
          Select your industry and target microorganisms to reveal the most efficient testing workflow.
        </p>
      </div>

      <div ref={containerRef} className="w-full bg-gray-50 rounded-[2rem] md:rounded-[3rem] p-6 sm:p-10 md:p-20 relative min-h-[600px] flex flex-col overflow-hidden">
        {/* BARRA DE PROGRESO */}
        <div className="w-full flex flex-col lg:flex-row lg:items-center justify-between mb-12 md:mb-20 gap-6 border-b border-gray-200 pb-8 md:pb-10">
          <div className="flex items-center gap-2 md:gap-8 w-full justify-start overflow-x-hidden no-scrollbar pb-2 md:pb-0">
            <button onClick={() => setStep(1)} className={`text-[10px] font-black flex items-center gap-2 transition-colors shrink-0 uppercase tracking-[0.15em] ${step === 1 ? "text-[#FF270A]" : step > 1 ? "text-[#111111]" : "text-gray-300"}`}>
              <span className={`w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-full text-[10px] shrink-0 transition-colors ${step === 1 ? "bg-[#FF270A] text-white" : step > 1 ? "bg-[#111111] text-white" : "bg-gray-200 text-gray-400"}`}>1</span>
              {step === 1 && <span>Industry</span>}
            </button>
            <div className="w-4 md:w-16 h-px bg-gray-200 shrink-0" />
            <button onClick={() => { if (step > 1) setStep(2); }} disabled={step < 2} className={`text-[10px] font-black flex items-center gap-2 transition-colors shrink-0 uppercase tracking-[0.15em] ${step === 2 ? "text-[#FF270A]" : step > 2 ? "text-[#111111]" : "text-gray-300"} ${step > 1 ? "cursor-pointer" : "cursor-default"}`}>
              <span className={`w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-full text-[10px] shrink-0 transition-colors ${step === 2 ? "bg-[#FF270A] text-white" : step > 2 ? "bg-[#111111] text-white" : "bg-gray-200 text-gray-400"}`}>2</span>
              {step === 2 && <span>Targets</span>}
            </button>
            <div className="w-4 md:w-16 h-px bg-gray-200 shrink-0" />
            <button disabled className={`text-[10px] font-black flex items-center gap-2 transition-colors shrink-0 uppercase tracking-[0.15em] cursor-default ${step === 3 ? "text-[#FF270A]" : "text-gray-300"}`}>
              <span className={`w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-full text-[10px] shrink-0 transition-colors ${step === 3 ? "bg-[#FF270A] text-white" : "bg-gray-200 text-gray-400"}`}>3</span>
              {step === 3 && <span>Protocol</span>}
            </button>
          </div>

          {step > 1 && (
            <div className="flex items-center bg-white rounded-full p-1 shrink-0 max-w-full overflow-hidden">
              <div className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-black text-[#111111] uppercase tracking-[0.12em] border-r border-gray-100 min-w-0">
                <CurrentIndustryIcon className="w-6 h-6 shrink-0 text-[#FF270A]" strokeWidth={1.5} />
                <span className="truncate">{selectedIndustry}</span>
              </div>
              {selectedMicroorganisms.length > 0 && (
                <div className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-black text-[#FF270A] uppercase tracking-[0.12em] shrink-0">
                  <img src="/bacteria.png" alt="" className="w-6 h-6 shrink-0 object-contain" />
                  <span>{selectedMicroorganisms.length} Target{selectedMicroorganisms.length !== 1 ? "s" : ""}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* PASO 1 */}
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
                    onClick={() => { setSelectedIndustry(industry.name); setSelectedMicroorganisms([]); setProtocolConfirmed(false); setPcrSubstitutions({}); setStageOverrides({}); setStep(2); }}
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

        {/* PASO 2 */}
        {step === 2 && (
          <div className="flex flex-col items-center justify-center flex-grow animate-in fade-in slide-in-from-right-8 duration-500">
            <img src="/bacteria.png" alt="Bacteria" className="w-16 h-16 md:w-24 md:h-24 object-contain mb-8 md:mb-10 opacity-70" />
            <div className="text-center mb-10 md:mb-14">
              <h3 className="text-3xl md:text-5xl font-black text-[#111111] mb-3 tracking-tighter leading-none">Select target microorganisms</h3>
              <p className="text-gray-400 font-medium text-sm">Targets validated for {selectedIndustry}. Choose the pathogens, indicators, or spoilage organisms you need to detect.</p>
            </div>

            {availableMicros.length === 0 ? (
              <p className="text-gray-400 font-medium text-sm mb-12">No validated targets found for this industry yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full max-w-4xl mb-12 md:mb-16">
                {availableMicros.map(micro => {
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
                      <span className={`font-black text-lg md:text-xl tracking-tight text-left leading-snug ${isSelected ? "text-white" : "text-[#111111]"}`}>{micro.shortName}</span>
                    </button>
                  );
                })}
              </div>
            )}

            <button
              onClick={() => { setStep(3); setProtocolConfirmed(false); setActiveProtocolIndex(0); setTimeout(() => sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50); }}
              disabled={selectedMicroorganisms.length === 0}
              className="bg-[#FF270A] text-white px-10 md:px-14 py-4 md:py-5 rounded-full font-black uppercase tracking-[0.15em] text-xs hover:bg-[#111111] transition-colors duration-300 disabled:opacity-30 flex items-center gap-3"
            >
              Discover our workflow <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* PASO 3 */}
        {step === 3 && (
          <div className="flex flex-col w-full h-full animate-in fade-in slide-in-from-bottom-8 duration-700 relative">
            <div className="flex flex-col items-start text-left mb-10 md:mb-14 w-full">
              <span className="text-[#FF270A] font-black uppercase tracking-[0.2em] text-[9px] md:text-[10px] mb-8 block">Your optimized workflow</span>

              {availableSampleTypes.length > 1 && (
                <div className="flex flex-col gap-2 mb-8 md:mb-10 w-full sm:w-fit">
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.15em] pl-2">Sample type</span>
                  <div className="flex items-center bg-white p-1 rounded-full">
                    {availableSampleTypes.map(st => (
                      <button
                        key={st}
                        onClick={() => { setSampleType(st); setProtocolConfirmed(false); setStageOverrides({}); }}
                        className={`flex-1 sm:flex-none px-5 md:px-7 py-2.5 rounded-full text-xs font-black uppercase tracking-[0.1em] transition-colors leading-tight whitespace-nowrap ${sampleType === st ? "bg-[#111111] text-white" : "text-gray-400 hover:text-[#111111]"}`}
                      >{st === "Finished" ? "Finished product" : "Environmental"}</button>
                    ))}
                  </div>
                </div>
              )}

              <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-400">
                {plan.uncoverable.length > 0 && (
                  <div className="flex items-start gap-3 bg-orange-50 border border-orange-100 rounded-2xl p-4 mb-6 max-w-2xl">
                    <AlertTriangle className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-orange-700 font-medium leading-relaxed">
                      No catalog protocol currently covers: <span className="font-black">{microNames(plan.uncoverable)}</span>. Our team can advise on alternatives.
                    </p>
                  </div>
                )}

                {!protocolConfirmed && plan.protocols.length > 0 && (
                  <p className="text-gray-400 font-medium text-xs mb-5">
                    {plan.protocols.length === 1
                      ? "One protocol covers all your targets. Select it to see the workflow →"
                      : `Your targets are covered most efficiently by ${plan.protocols.length} protocols. Select one →`}
                  </p>
                )}

                {/* CARRUSEL DE PROTOCOLOS */}
                <div className="relative -mx-6 sm:-mx-10 md:-mx-20">
                  <div className={`hidden md:flex absolute top-1/2 -translate-y-1/2 left-4 z-20 transition-opacity duration-300 ${canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                    <button onClick={() => scrollProtocols("left")} className="w-10 h-10 rounded-full bg-white border border-gray-100 text-[#111111] flex items-center justify-center hover:text-[#FF270A] transition-colors shadow-sm"><ChevronLeft className="w-5 h-5" /></button>
                  </div>
                  <div className={`hidden md:flex absolute top-1/2 -translate-y-1/2 right-4 z-20 transition-opacity duration-300 ${canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                    <button onClick={() => scrollProtocols("right")} className="w-10 h-10 rounded-full bg-white border border-gray-100 text-[#111111] flex items-center justify-center hover:text-[#FF270A] transition-colors shadow-sm"><ChevronRight className="w-5 h-5" /></button>
                  </div>

                  <div
                    ref={protocolsScrollRef}
                    onScroll={checkScroll}
                    className="flex overflow-x-auto gap-3 md:gap-4 py-3 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
                    style={{ paddingLeft: containerPad, paddingRight: containerPad, scrollPaddingLeft: containerPad }}
                  >
                    {plan.protocols.map((proto, idx) => {
                      const isActive = activeProtocolIndex === idx && protocolConfirmed;
                      const covers = coversById[proto.id] ?? [];
                      return (
                        <div
                          key={proto.id}
                          className="snap-start shrink-0 flex flex-col items-start justify-between text-left p-6 md:px-8 md:py-8 rounded-2xl md:rounded-[2rem] transition-all duration-300 w-[80vw] sm:w-[340px] md:w-[380px] h-auto whitespace-normal break-words cursor-pointer"
                          style={{ background: isActive ? "#111111" : "#ffffff" }}
                          onClick={() => { setActiveProtocolIndex(idx); setProtocolConfirmed(true); }}
                        >
                          <div className="w-full">
                            <div className="flex items-baseline gap-3 mb-4">
                              <p className={`text-[9px] font-black uppercase tracking-[0.2em] ${isActive ? "text-gray-400" : "text-gray-500"}`}>Protocol {idx + 1}</p>
                              <span className={`w-px h-3 ${isActive ? "bg-gray-600" : "bg-gray-200"}`} />
                              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#FF270A]">{formatTime(proto.totalTimeHours)}</p>
                            </div>
                            <p className={`font-black text-lg md:text-2xl leading-snug break-words tracking-tight mb-3 ${isActive ? "text-white" : "text-[#111111]"}`}>
                              {proto.name}
                            </p>
                            <p className={`text-[11px] font-medium leading-relaxed ${isActive ? "text-gray-400" : "text-gray-500"}`}>
                              Detects: {microNames(covers)}
                            </p>
                          </div>
                          <button
                            onClick={(e: React.MouseEvent) => { e.stopPropagation(); setProtocolCompareIndex(idx); }}
                            className={`mt-6 flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.15em] transition-colors ${isActive ? "text-white hover:text-gray-300" : "text-gray-500 hover:text-[#FF270A]"}`}
                          >
                            <FileText className="w-3 h-3" /> See how we compare vs. competitors
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  {plan.protocols.length > 1 && (
                    <div className="flex md:hidden justify-center gap-2 mt-4">
                      {plan.protocols.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setActiveProtocolIndex(idx); setProtocolConfirmed(true);
                            protocolsScrollRef.current?.scrollTo({ left: idx * (protocolsScrollRef.current.clientWidth * 0.8 + 12), behavior: "smooth" });
                          }}
                          className={`rounded-full transition-all duration-300 ${activeProtocolIndex === idx && protocolConfirmed ? "w-5 h-2 bg-[#FF270A]" : "w-2 h-2 bg-gray-300"}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* PRODUCTOS DETALLADOS */}
            {protocolConfirmed && activeProtocol && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="w-full mb-8 md:mb-10">
                  <p className="text-[9px] font-black text-[#FF270A] uppercase tracking-[0.2em] mb-1">Recommended Workflow</p>
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">{selectedIndustry} · {formatTime(activeProtocol.totalTimeHours)} total</p>
                  <p className="text-xl md:text-2xl font-black text-[#111111] tracking-tight leading-snug">
                    {activeProtocol.name}
                  </p>
                </div>

                <div className="hidden md:grid gap-3 md:gap-4" style={{ gridTemplateColumns: `repeat(${Math.min(chainOf(activeProtocol).length, 4)}, 1fr)` }}>
                  {chainOf(activeProtocol).map((rs, sIdx) => {
                    const stage = rs.key;
                    const prodName = rs.chosen.name;
                    const isPcr = stage === "pcr";
                    return (
                      <Fragment key={stage}>
                        <div className="bg-white p-6 md:p-8 rounded-2xl md:rounded-[2rem] flex flex-col">
                          <span className="text-[9px] font-black text-[#111111] uppercase tracking-[0.2em] mb-5 block">
                            {String(sIdx + 1).padStart(2, "0")} — {STAGE_LABELS[stage]}
                          </span>
                          <div className="flex-grow">
                            <h5 className="text-lg md:text-xl font-black text-[#111111] leading-tight tracking-tight mb-2">{prodName}</h5>
                            <p className="text-[10px] text-gray-500 font-medium">
                              {[`Cat #${rs.chosen.cat ?? "null"}`, rs.chosen.mode, rs.chosen.format].filter(Boolean).join(" · ")}
                            </p>
                            {rs.chosen.description && <p className="text-[11px] text-gray-400 font-medium leading-snug mt-2">{rs.chosen.description}</p>}
                          </div>
                          <div className="mt-6 pt-5 border-t border-gray-100 flex flex-col gap-3">
                            <div className="flex items-center gap-2 h-5">
                              <Clock className="w-3.5 h-3.5 text-[#FF270A] shrink-0" />
                              <span className="text-[10px] font-black text-[#111111] uppercase tracking-[0.1em]">
                                {stageTimeText(rs.chosen)}
                              </span>
                            </div>
                            {(() => {
                              const chosenKey = rs.chosen.productKey;
                              const formatCount = rs.options.filter(o => o.productKey === chosenKey).length;
                              const otherProducts = new Set(rs.options.filter(o => o.productKey !== chosenKey).map(o => o.productKey));
                              return (
                                <>
                                  {formatCount > 1 && (
                                    <button onClick={() => setStagePickerFor({ protocolId: activeProtocol.id, stage, mode: "formats" })} className="flex items-center gap-2 h-5 hover:opacity-60 transition-opacity">
                                      <ChevronRight className="w-3.5 h-3.5 text-[#FF270A] shrink-0" />
                                      <span className="text-[10px] font-black text-[#111111] uppercase tracking-[0.1em]">| {formatCount} formats</span>
                                    </button>
                                  )}
                                  {otherProducts.size > 0 && (
                                    <button onClick={() => setStagePickerFor({ protocolId: activeProtocol.id, stage, mode: "options" })} className="flex items-center gap-2 h-5 hover:opacity-60 transition-opacity">
                                      <ChevronRight className="w-3.5 h-3.5 text-[#FF270A] shrink-0" />
                                      <span className="text-[10px] font-black text-[#111111] uppercase tracking-[0.1em]">{otherProducts.size + 1} options</span>
                                    </button>
                                  )}
                                </>
                              );
                            })()}
                            {isPcr && pcrAlternatives.length > 1 && (
                              <button onClick={() => activeRecommendedId && setPcrPickerForId(activeRecommendedId)} className="flex items-center gap-2 h-5 hover:opacity-60 transition-opacity">
                                <ChevronRight className="w-3.5 h-3.5 text-[#FF270A] shrink-0" />
                                <span className="text-[10px] font-black text-[#111111] uppercase tracking-[0.1em]">{pcrAlternatives.length} kit options</span>
                              </button>
                            )}
                            {isPcr ? (
                              <button onClick={() => openBrief(briefFromProtocol(activeProtocol))} className="flex items-center gap-2 h-5 hover:opacity-60 transition-opacity">
                                <FileText className="w-3.5 h-3.5 text-[#FF270A] shrink-0" />
                                <span className="text-[10px] font-black text-[#111111] uppercase tracking-[0.1em]">Product Value Brief</span>
                              </button>
                            ) : rs.chosen.features.length > 0 && (
                              <button onClick={() => openBrief(briefFromStageOption(rs.chosen))} className="flex items-center gap-2 h-5 hover:opacity-60 transition-opacity">
                                <FileText className="w-3.5 h-3.5 text-[#FF270A] shrink-0" />
                                <span className="text-[10px] font-black text-[#111111] uppercase tracking-[0.1em]">Product Value Brief</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </Fragment>
                    );
                  })}
                </div>

                {/* Mobile version */}
                <div className="md:hidden relative -mx-6 sm:-mx-10">
                  <div
                    ref={productsScrollRef}
                    onScroll={() => {
                      if (productsScrollRef.current) {
                        const el = productsScrollRef.current;
                        setActiveProdDot(Math.round(el.scrollLeft / (el.clientWidth * 0.8 + 12)));
                      }
                    }}
                    className="flex overflow-x-auto gap-3 py-3 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
                    style={{ paddingLeft: containerPad, paddingRight: containerPad, scrollPaddingLeft: containerPad }}
                  >
                    {chainOf(activeProtocol).map((rs, sIdx) => {
                      const stage = rs.key;
                      const prodName = rs.chosen.name;
                      const isPcr = stage === "pcr";
                      return (
                        <div key={stage} className="snap-start shrink-0 w-[80vw] bg-white p-6 rounded-2xl flex flex-col">
                          <span className="text-[9px] font-black text-[#111111] uppercase tracking-[0.2em] mb-5 block">
                            {String(sIdx + 1).padStart(2, "0")} — {STAGE_LABELS[stage]}
                          </span>
                          <div className="flex-grow">
                            <h5 className="text-xl font-black text-[#111111] leading-tight tracking-tight mb-2">{prodName}</h5>
                            <p className="text-[10px] text-gray-500 font-medium">
                              {[`Cat #${rs.chosen.cat ?? "null"}`, rs.chosen.mode, rs.chosen.format].filter(Boolean).join(" · ")}
                            </p>
                            {rs.chosen.description && <p className="text-[11px] text-gray-400 font-medium leading-snug mt-2">{rs.chosen.description}</p>}
                          </div>
                          <div className="mt-6 pt-5 border-t border-gray-100 flex flex-col gap-3">
                            <div className="flex items-center gap-2 h-5">
                              <Clock className="w-3.5 h-3.5 text-[#FF270A] shrink-0" />
                              <span className="text-[10px] font-black text-[#111111] uppercase tracking-[0.1em]">{stageTimeText(rs.chosen)}</span>
                            </div>
                            {isPcr ? (
                              <button onClick={() => openBrief(briefFromProtocol(activeProtocol))} className="flex items-center gap-2 h-5 hover:opacity-60 transition-opacity">
                                <FileText className="w-3.5 h-3.5 text-[#FF270A] shrink-0" />
                                <span className="text-[10px] font-black text-[#111111] uppercase tracking-[0.1em]">Product Value Brief</span>
                              </button>
                            ) : rs.chosen.features.length > 0 && (
                              <button onClick={() => openBrief(briefFromStageOption(rs.chosen))} className="flex items-center gap-2 h-5 hover:opacity-60 transition-opacity">
                                <FileText className="w-3.5 h-3.5 text-[#FF270A] shrink-0" />
                                <span className="text-[10px] font-black text-[#111111] uppercase tracking-[0.1em]">Product Value Brief</span>
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* SOLICITUD COTIZACION CTA */}
            {protocolConfirmed && (
              <div className="mt-16 md:mt-24 w-full flex flex-col items-center justify-center border-t border-gray-200 pt-12 md:pt-16 animate-in fade-in duration-500">
                <h3 className="text-xl md:text-3xl font-black text-[#111111] mb-2 md:mb-3 tracking-tight text-center">Ready to optimize your lab?</h3>
                <p className="text-sm text-gray-400 font-medium mb-8 text-center max-w-sm">Get a customized quote for your {selectedIndustry} workflow.</p>
                <button onClick={handleOpenQuote} className="bg-[#111111] text-white px-8 py-4 md:px-10 md:py-5 rounded-full font-bold uppercase tracking-widest text-xs md:text-sm hover:bg-[#FF270A] transition-colors duration-300 flex items-center gap-3">
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

      {/* --- ALTERNATIVAS MODAL --- */}
      {pcrPickerForId && (() => {
        const requested = originalCoversByRecommendedId[pcrPickerForId] ?? [];
        const currentlySelectedId = pcrSubstitutions[pcrPickerForId] ?? pcrPickerForId;
        return (
          <div className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] max-w-lg w-full relative animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
              <div className="bg-[#111111] rounded-t-[2rem] md:rounded-t-[2.5rem] px-8 py-8 relative">
                <button onClick={() => setPcrPickerForId(null)} className="absolute top-4 right-4 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"><X className="w-5 h-5 text-white" /></button>
                <span className="text-[10px] font-black text-[#FF270A] uppercase tracking-widest mb-2 block">PCR kit options</span>
                <h3 className="text-xl md:text-2xl font-black text-white leading-tight tracking-tighter">Choose a detection kit</h3>
              </div>
              <div className="px-6 md:px-8 py-6 flex flex-col gap-2">
                {pcrAlternatives.map((alt, altIdx) => {
                  const isChosen = alt.id === currentlySelectedId;
                  const isRecommended = altIdx === 0;
                  const extra = alt.detects.filter(d => !requested.includes(d));
                  return (
                    <button
                      key={alt.id}
                      onClick={() => choosePcrAlternative(pcrPickerForId, alt.id)}
                      className={`flex items-center justify-between text-left p-4 rounded-2xl transition-colors ${isChosen ? "bg-[#111111]" : "bg-gray-50 hover:bg-gray-100"}`}
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className={`font-black text-sm leading-tight ${isChosen ? "text-white" : "text-[#111111]"}`}>{alt.name}</p>
                          {isRecommended && <span className="text-[8px] font-black uppercase tracking-[0.1em] text-[#FF270A] bg-[#FF270A]/10 px-1.5 py-0.5 rounded-full shrink-0">Recommended</span>}
                        </div>
                        <p className={`text-[10px] font-medium mt-1 ${isChosen ? "text-gray-400" : "text-gray-500"}`}>
                          Cat #{alt.cat ?? "null"}{extra.length ? ` · also detects ${extra.map(id => MICRO_BY_ID[id]?.shortName ?? id).join(", ")}` : " · exact match"}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })()}

      {/* --- STAGE MODAL --- */}
      {stagePickerFor && (() => {
        const proto = plan.protocols.find(p => p.id === stagePickerFor.protocolId);
        const rs = proto?.chain.find(s => s.key === stagePickerFor.stage);
        if (!proto || !rs) return null;
        const chosenKey = rs.chosen.productKey;
        let visible = stagePickerFor.mode === "formats" 
          ? rs.options.filter(o => o.productKey === chosenKey)
          : (() => { const seen = new Set<string>(); return rs.options.filter(o => { if (seen.has(o.productKey)) return false; seen.add(o.productKey); return true; }); })();
        
        return (
          <div className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] max-w-md w-full relative animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
              <div className="bg-[#111111] rounded-t-[2rem] md:rounded-t-[2.5rem] px-8 py-8 relative">
                <button onClick={() => setStagePickerFor(null)} className="absolute top-4 right-4 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"><X className="w-5 h-5 text-white" /></button>
                <h3 className="text-xl md:text-2xl font-black text-white">Choose a product</h3>
              </div>
              <div className="px-6 md:px-8 py-6 flex flex-col gap-2">
                {visible.map(opt => {
                  const isChosen = opt.optionId === rs.chosen.optionId;
                  return (
                    <button
                      key={opt.optionId}
                      onClick={() => chooseStageOption(proto.id, stagePickerFor.stage, opt.optionId)}
                      className={`flex items-center justify-between text-left p-4 rounded-2xl transition-colors ${isChosen ? "bg-[#111111]" : "bg-gray-50 hover:bg-gray-100"}`}
                    >
                      <div className="min-w-0">
                        <p className={`font-black text-sm ${isChosen ? "text-white" : "text-[#111111]"}`}>{opt.name}</p>
                        <p className="text-[10px] text-gray-400">Cat #{opt.cat ?? "null"} · {opt.format}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })()}

      {/* --- COMPARISON MODAL --- */}
      {protocolCompareIndex !== null && (() => {
        const proto = plan.protocols[protocolCompareIndex];
        const cmp = proto?.comparison;
        if (!proto || !cmp) return null;
        return (
          <div className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] max-w-4xl w-full relative animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
              <div className="bg-[#111111] rounded-t-[2rem] md:rounded-t-[2.5rem] px-8 md:px-12 py-8 md:py-10 relative">
                <button onClick={() => setProtocolCompareIndex(null)} className="absolute top-4 right-4 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"><X className="w-5 h-5 text-white" /></button>
                <h3 className="text-2xl md:text-3xl font-black text-white">{proto.name}</h3>
              </div>
              <div className="px-8 md:px-12 py-8 flex flex-col gap-8">
                <div className="rounded-2xl overflow-hidden border border-gray-100">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-3 font-black text-[#111111] text-[9px] uppercase">Feature</th>
                        <th className="px-4 py-3 font-black text-[#FF270A] text-[9px] uppercase text-center">TAAG</th>
                        <th className="px-4 py-3 font-black text-[#111111] text-[9px] uppercase">Impact</th>
                        {COMPETITORS.map(c => <th key={c.key} className="px-4 py-3 font-black text-gray-400 text-[9px] uppercase text-center">{c.label}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {cmp.rows.map((row, i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                          <td className="px-4 py-3 font-semibold text-[#111111]">{row.feature}</td>
                          <td className="px-4 py-3 text-center font-bold text-[#111111]">{row.taag}</td>
                          <td className="px-4 py-3 text-[#FF270A] font-medium">{row.businessImpact}</td>
                          {COMPETITORS.map(c => <td key={c.key} className="px-4 py-3 text-center text-gray-400">{(row as any)[c.key]}</td>)}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button onClick={() => { setActiveProtocolIndex(protocolCompareIndex); setProtocolConfirmed(true); openQuoteForProtocol(proto); }} className="w-full bg-[#FF270A] text-white py-4 rounded-2xl font-bold uppercase text-xs">
                  Request Quote
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* --- QUOTE MODAL --- */}
      {isQuoteModalOpen && (
        <div className="fixed inset-0 z-[300] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-12 max-w-2xl w-full relative animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
            <button onClick={() => { setIsQuoteModalOpen(false); setProtocolCompareIndex(null); }} className="absolute top-4 right-4 p-2 bg-gray-50 rounded-full hover:bg-gray-200 transition-colors"><X className="w-5 h-5 text-[#111111]" /></button>
            {isQuoteSent ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <h3 className="text-2xl font-black text-[#111111] mb-2">Request Sent!</h3>
                <p className="text-sm text-gray-500">Our team will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={submitQuote} className="flex flex-col gap-4 mt-8">
                <input type="text" placeholder="Full Name" required className="w-full bg-gray-50 p-4 rounded-xl text-sm" />
                <input type="email" placeholder="Work Email" required className="w-full bg-gray-50 p-4 rounded-xl text-sm" />
                <input type="text" placeholder="Company Name" required className="w-full bg-gray-50 p-4 rounded-xl text-sm" />
                <textarea value={quoteMessage} onChange={(e) => setQuoteMessage(e.target.value)} rows={6} className="w-full bg-gray-50 p-4 rounded-xl text-sm resize-none leading-relaxed" />
                <button type="submit" disabled={isSubmittingQuote} className="w-full bg-[#111111] text-white py-4 rounded-xl font-bold uppercase text-xs hover:bg-[#FF270A]">
                  {isSubmittingQuote ? "Sending..." : "Send Request"}
                </button>
              </form>
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