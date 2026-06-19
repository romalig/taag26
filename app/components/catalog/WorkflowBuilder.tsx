"use client";

import { useState, useMemo, useRef, useEffect, Fragment } from "react";
import {
  ArrowRight, ChevronLeft, ChevronRight, ChevronDown, Check, RotateCcw,
  FileText, Clock, Mail, AlertTriangle,
} from "lucide-react";
import {
  INDUSTRIES, getFallbackIcon,
  getMicroorganismsForIndustry, getResolvedProtocolsForIndustry, getAvailableSampleTypes, getPcrAlternatives,
  resolveChain, selectOptimalProtocols, MICRO_BY_ID, DEF_BY_ID, formatTime, normMicroId,
  STAGE_LABELS, STAGE_ORDER,
  type Protocol, type StageKey, type Microorganism, type SampleType,
  type ResolvedStageOption,
} from "./workflowData";
import ProductBrief, { type ValueBriefData } from "./ProductBrief";
import { briefFromProtocol, briefFromStageOption, combinedBriefFromStage, comparisonRowsForBrief } from "./briefData";
import { useModal } from "./ModalProvider";

type CompetitorKey = "leadingPcr" | "traditional";



function stageTimeText(o: { timeHours: number | null; timeLabel: string | null; timeEstimated: boolean }): string {
  if (o.timeLabel) return o.timeLabel;
  if (o.timeHours != null) return formatTime(o.timeHours) + (o.timeEstimated ? " est." : "");
  return "—";
}

// An enrichment stage can carry groups: "parallel" media (a bundle used together) and
// "alternative" media (you pick one). Two different questions, ONE definition each so the
// logic can't drift across the render paths and the picker:
//   stageIsCombinedDisplay — should the stage's product NAME render as a combined "A + B"?
//   stageHasBundleGroups   — are there multiple selectable full combinations (show the picker)?
type GroupShape = { mode: string; options: unknown[] };
const stageIsCombinedDisplay = (grps?: GroupShape[]): boolean =>
  !!grps && (grps.length > 1 || grps.some(g => g.mode === "parallel" && g.options.length > 1));
const stageHasBundleGroups = (grps?: GroupShape[]): boolean =>
  !!grps && grps.length > 0 &&
  (grps.length > 1 || grps.some(g => g.mode === "alternative" && g.options.length > 1) || grps.some(g => g.mode === "parallel"));

// The media actually used in a stage: for grouped enrichment, every parallel medium plus each
// alternative group's chosen medium (deduped by product). For ungrouped stages, just the chosen
// option. One representative option per medium (its currently-selected presentation). Used to
// render the bundle on the card, in the formats picker, and in the quote — one source of truth.
type StageGroupLike = { mode: string; options: ResolvedStageOption[]; chosen: ResolvedStageOption };
function stageMembers(rs: { chosen: ResolvedStageOption; groups?: StageGroupLike[] }): ResolvedStageOption[] {
  const grps = rs.groups;
  if (grps && grps.length) {
    const out: ResolvedStageOption[] = [];
    const seen = new Set<string>();
    for (const g of grps) {
      const opts = g.mode === "parallel" ? g.options : [g.chosen];
      for (const o of opts) if (o && o.productKey && !seen.has(o.productKey)) { seen.add(o.productKey); out.push(o); }
    }
    if (out.length) return out;
  }
  return rs.chosen ? [rs.chosen] : [];
}

// Format picker body. Lives inside the shared modal card. Holds its own selection state so a bundle's
// media can each get a format independently and simultaneously (each pick commits immediately and the
// modal stays open). For single-product stages it's a one-shot select that closes on pick.
function StageFormatPicker({
  stageLabel, groups, initialSel, independent, onPick, onClose,
}: {
  stageLabel: string;
  groups: { medium: ResolvedStageOption; presentations: ResolvedStageOption[] }[];
  initialSel: Record<string, string>;
  independent: boolean;
  onPick: (medium: ResolvedStageOption, opt: ResolvedStageOption) => void;
  onClose: () => void;
}) {
  const [sel, setSel] = useState<Record<string, string>>(initialSel);
  const pick = (medium: ResolvedStageOption, opt: ResolvedStageOption) => {
    setSel(s => ({ ...s, [medium.productKey]: opt.optionId }));
    onPick(medium, opt);
    if (!independent) onClose();
  };
  return (
    <div className="w-full px-7 sm:px-10 md:px-14 pt-12 md:pt-16 pb-10 md:pb-14">
      <span className="text-[11px] font-black text-[#FF270A] uppercase tracking-[0.2em] mb-2 block">{stageLabel}</span>
      <h3 className="text-2xl md:text-4xl font-black text-[#111111] tracking-tight mb-2">Choose a format</h3>
      <p className="text-sm text-gray-400 font-medium mb-8 md:mb-10">{independent ? "Set a format for each medium — they apply independently." : "\u00A0"}</p>
      <div className="flex flex-col gap-8 md:gap-10">
        {groups.map(g => (
          <section key={g.medium.productKey}>
            <p className="text-base md:text-lg font-black text-[#111111] tracking-tight">{g.medium.name}</p>
            {g.medium.description
              ? <p className="text-sm text-gray-500 font-medium leading-snug mt-1 mb-4 max-w-2xl">{g.medium.description}</p>
              : <div className="mb-4" />}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {g.presentations.map(opt => {
                const isSel = sel[g.medium.productKey] === opt.optionId;
                return (
                  <button key={opt.optionId} onClick={() => pick(g.medium, opt)}
                    className={`text-left p-5 rounded-2xl border transition-colors ${isSel ? "bg-[#111111] border-[#111111]" : "bg-gray-50 border-transparent hover:bg-gray-100"}`}>
                    <p className={`font-black text-base mb-1 ${isSel ? "text-white" : "text-[#111111]"}`}>{[opt.format, opt.size].filter(Boolean).join(" · ") || opt.name}</p>
                    <p className={`text-xs font-medium ${isSel ? "text-gray-400" : "text-gray-500"}`}>Cat #{opt.cat ?? "null"}</p>
                    {opt.kitContent && <p className={`text-xs mt-1 ${isSel ? "text-gray-500" : "text-gray-400"}`}>{opt.kitContent}</p>}
                  </button>
                );
              })}
            </div>
          </section>
        ))}
      </div>
      {independent && (
        <div className="mt-10 md:mt-12 flex justify-end">
          <button onClick={onClose} className="bg-[#111111] text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#FF270A] transition-colors">Done</button>
        </div>
      )}
    </div>
  );
}

// Quote form. Rendered inside the shared modal card (no own card/close/scroll), so it grows with the
// page like every other modal. Self-contained local state; submission is a stub (no backend yet).
function QuoteModal({ industry, initialMessage, onClose }: { industry: string | null; initialMessage: string; onClose: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState(initialMessage);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1500));
    setSubmitting(false);
    setSent(true);
  };
  const field = "w-full bg-gray-50 p-4 rounded-xl text-base outline-none focus:ring-2 focus:ring-[#FF270A]/30";
  return (
    <div className="w-full px-7 sm:px-10 md:px-14 pt-12 md:pt-16 pb-10 md:pb-14">
      {sent ? (
        <div className="flex flex-col items-center justify-center py-12 md:py-20 text-center">
          <h3 className="text-3xl md:text-4xl font-black text-[#111111] tracking-tight mb-3">Request sent!</h3>
          <p className="text-base text-gray-500 font-medium mb-8">Our team will get back to you shortly.</p>
          <button onClick={onClose} className="bg-[#111111] text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#FF270A] transition-colors">Close</button>
        </div>
      ) : (
        <>
          <span className="text-[11px] font-black text-[#FF270A] uppercase tracking-[0.2em] mb-2 block">Request a quote</span>
          <h3 className="text-2xl md:text-4xl font-black text-[#111111] tracking-tight mb-2">Ready to optimize your lab?</h3>
          <p className="text-sm md:text-base text-gray-500 font-medium mb-8 md:mb-10">Get a customized quote{industry ? ` for your ${industry} workflow` : ""}.</p>
          <form onSubmit={submit} className="flex flex-col gap-4 max-w-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" required placeholder="Full name" value={name} onChange={e => setName(e.target.value)} className={field} />
              <input type="email" required placeholder="Work email" value={email} onChange={e => setEmail(e.target.value)} className={field} />
            </div>
            <input type="text" required placeholder="Company name" value={company} onChange={e => setCompany(e.target.value)} className={field} />
            <textarea value={message} onChange={e => setMessage(e.target.value)} rows={10} className="w-full bg-gray-50 p-4 rounded-xl text-sm resize-none leading-relaxed outline-none focus:ring-2 focus:ring-[#FF270A]/30" />
            <button type="submit" disabled={submitting} className="w-full bg-[#111111] text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-[#FF270A] transition-colors disabled:opacity-60">
              {submitting ? "Sending\u2026" : "Send request"}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
// For grouped stages (bundle): the count is the number of full combinations = product of each
// alternative group's option count (parallel media always ride along, they don't multiply).
// Otherwise: the number of distinct products.
function countStageOptions(rs: { chosen: ResolvedStageOption; options: ResolvedStageOption[]; groups?: { mode: string; options: ResolvedStageOption[] }[] }): number {
  const grps = rs.groups;
  const hasBundle = stageHasBundleGroups(grps);
  if (hasBundle && grps) {
    const alternatives = grps.filter(g => g.mode === "alternative");
    if (alternatives.length === 0) return 1; // only parallel media → a single fixed combination
    return alternatives.reduce((acc, g) => acc * Math.max(1, g.options.length), 1);
  }
  const distinct = new Set(rs.options.map(o => o.productKey));
  return distinct.size;
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
  const [enrichFormatOverrides, setEnrichFormatOverrides] = useState<Record<string, Record<string, string>>>({});
  const [pcrSubstitutions, setPcrSubstitutions] = useState<Record<string, string>>({});
  const [sampleType, setSampleType] = useState<SampleType>("Finished");
  const [activeProtocolIndex, setActiveProtocolIndex] = useState(0);

  const { openModal, closeAll } = useModal();

  const openBrief = (data: ValueBriefData) =>
    openModal(<ProductBrief data={data} onRequestQuote={() => { closeAll(); handleOpenQuote(); }} />);

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
  const microStepRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const availableMicros: Microorganism[] = useMemo(
    () => [...getMicroorganismsForIndustry(selectedIndustry)].sort((a, b) => a.shortName.localeCompare(b.shortName)),
    [selectedIndustry]
  );

  const basePlan = useMemo(() => {
    const resolved = getResolvedProtocolsForIndustry(selectedIndustry, sampleType).map(p => {
      const ov = stageOverrides[p.id];
      const fmt = enrichFormatOverrides[p.id];
      return (ov || fmt) ? resolveChain(p._def, ov, sampleType, selectedIndustry, fmt) : p;
    });
    return selectOptimalProtocols(selectedMicroorganisms.map(normMicroId), resolved);
  }, [selectedMicroorganisms, selectedIndustry, stageOverrides, enrichFormatOverrides, sampleType]);

  const plan = useMemo(() => {
    if (!Object.keys(pcrSubstitutions).length) return basePlan;
    const coverage = basePlan.coverageByProtocol.map(c => ({ ...c }));
    const protocols = basePlan.protocols.map((p, idx) => {
      const subId = pcrSubstitutions[p.id];
      if (!subId || subId === p.id) return p;
      const def = DEF_BY_ID[subId];
      if (!def) return p;
      const ov = stageOverrides[subId];
      const newProto = resolveChain(def, ov, sampleType, selectedIndustry, enrichFormatOverrides[subId]);
      const cov = coverage.find(c => c.protocolId === p.id);
      if (cov) cov.protocolId = newProto.id;
      return newProto;
    });
    return { ...basePlan, protocols, coverageByProtocol: coverage };
  }, [basePlan, pcrSubstitutions, stageOverrides, enrichFormatOverrides, sampleType, selectedIndustry]);

  const availableSampleTypes = useMemo(() => getAvailableSampleTypes(selectedIndustry, selectedMicroorganisms), [selectedIndustry, selectedMicroorganisms]);

  useEffect(() => {
    if (availableSampleTypes.length && !availableSampleTypes.includes(sampleType)) setSampleType(availableSampleTypes[0]);
  }, [availableSampleTypes, sampleType]);

  // When exactly one protocol covers the targets, select it automatically so the full workflow
  // shows directly — no "select a protocol" prompt for a single, unambiguous option.
  useEffect(() => {
    if (step === 3 && plan.protocols.length === 1 && !protocolConfirmed) {
      setActiveProtocolIndex(0);
      setProtocolConfirmed(true);
    }
  }, [step, plan.protocols.length, protocolConfirmed]);

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
    setStageOverrides({}); setEnrichFormatOverrides({});
  };

  const chainOf = (proto?: Protocol) => proto ? proto.chain : [];

  const chooseStageOption = (protocolId: string, stage: StageKey, optionId: string) => {
    setStageOverrides(prev => ({ ...prev, [protocolId]: { ...prev[protocolId], [stage]: optionId } }));
    closeAll();
  };

  // Per-medium format inside a bundle: updates only that medium's presentation and keeps the modal
  // open, so several media can be set independently in one sitting.
  const chooseEnrichFormat = (protocolId: string, productKey: string, optionId: string) => {
    setEnrichFormatOverrides(prev => ({ ...prev, [protocolId]: { ...prev[protocolId], [productKey]: optionId } }));
  };

  const choosePcrAlternative = (recommendedId: string, chosenId: string) => {
    setPcrSubstitutions(prev => ({ ...prev, [recommendedId]: chosenId }));
    closeAll();
  };

  const reset = () => {
    setStep(1);
    setSelectedIndustry(null);
    setSelectedMicroorganisms([]);
    setActiveProtocolIndex(0);
    setProtocolConfirmed(false);
    setStageOverrides({}); setEnrichFormatOverrides({});
    setPcrSubstitutions({});
    setSampleType("Finished");
    closeAll();
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

  const productLine = (o: ResolvedStageOption): string => {
    const meta = [o.cat ? `Cat #${o.cat}` : null, o.format, o.size].filter(Boolean).join(" · ");
    return `${o.name}${meta ? ` (${meta})` : ""}`;
  };

  const handleOpenQuote = () => {
    let text = "";
    plan.protocols.forEach((p, idx) => {
      const covers = coversById[p.id] ?? [];
      text += `Protocol ${idx + 1} — ${p.name} (${formatTime(p.totalTimeHours)})\n`;
      text += `  Detects: ${microNames(covers)}\n`;
      p.chain.forEach(s => { stageMembers(s).forEach(o => { text += `  - ${s.label ?? STAGE_LABELS[s.key]}: ${productLine(o)}\n`; }); });
      text += `\n`;
    });
    if (plan.uncoverable.length) text += `Not covered by current catalog: ${microNames(plan.uncoverable)}\n\n`;
    const msg = `Hello TAAG Team,\n\nI would like a quote for the following workflow(s) for the ${selectedIndustry} industry:\n\n${text}Please share pricing and availability.\n\nThank you.`;
    openModal(<QuoteModal industry={selectedIndustry} initialMessage={msg} onClose={closeAll} />);
  };

  // ── Pickers rendered through the shared modal provider. SolutionModal already supplies the white
  // card, the close button and the scroll, so content here is plain w-full and fills that card. ──

  const openComparison = (idx: number) => {
    const proto = plan.protocols[idx];
    const cmp = proto?.comparison;
    if (!proto || !cmp) return;
    openModal(
      <div className="w-full px-7 sm:px-10 md:px-14 pt-12 md:pt-16 pb-10 md:pb-14">
        <span className="text-[11px] font-black text-[#FF270A] uppercase tracking-[0.2em] mb-2 block">How we compare</span>
        <h3 className="text-2xl md:text-4xl font-black text-[#111111] tracking-tight mb-8 md:mb-10">{proto.name}</h3>
        <div className="rounded-2xl border border-gray-100 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 font-black text-[#111111] text-[10px] uppercase text-left">Feature</th>
                <th className="px-4 py-3 font-black text-[#FF270A] text-[10px] uppercase text-center">TAAG</th>
                <th className="px-4 py-3 font-black text-[#111111] text-[10px] uppercase text-left">Impact</th>
                {COMPETITORS.map(c => <th key={c.key} className="px-4 py-3 font-black text-gray-400 text-[10px] uppercase text-center">{c.label}</th>)}
              </tr>
            </thead>
            <tbody>
              {comparisonRowsForBrief(proto).map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                  <td className="px-4 py-3 font-semibold text-[#111111] align-top">{row.feature}</td>
                  <td className="px-4 py-3 text-center font-bold text-[#111111] align-top">{row.taag}</td>
                  <td className="px-4 py-3 text-[#FF270A] font-medium align-top leading-snug min-w-[200px]">{row.businessImpact}</td>
                  {COMPETITORS.map(c => <td key={c.key} className="px-4 py-3 text-center text-gray-400 align-top">{(row as any)[c.key]}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const openPcrPicker = () => {
    const recommendedId = activeRecommendedId;
    if (!recommendedId) return;
    const requested = originalCoversByRecommendedId[recommendedId] ?? [];
    const currentlySelectedId = pcrSubstitutions[recommendedId] ?? recommendedId;
    openModal(
      <div className="w-full px-7 sm:px-10 md:px-14 pt-12 md:pt-16 pb-10 md:pb-14">
        <span className="text-[11px] font-black text-[#FF270A] uppercase tracking-[0.2em] mb-2 block">PCR kit options</span>
        <h3 className="text-2xl md:text-4xl font-black text-[#111111] tracking-tight mb-8 md:mb-10">Choose a detection kit</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {pcrAlternatives.map((alt, altIdx) => {
            const isChosen = alt.id === currentlySelectedId;
            const isRecommended = altIdx === 0;
            const extra = alt.detects.filter(d => !requested.includes(d));
            return (
              <button key={alt.id} onClick={() => choosePcrAlternative(recommendedId, alt.id)}
                className={`text-left p-5 rounded-2xl border transition-colors ${isChosen ? "bg-[#111111] border-[#111111]" : "bg-gray-50 border-transparent hover:bg-gray-100"}`}>
                <div className="flex items-center gap-2 mb-1">
                  <p className={`font-black text-sm leading-tight ${isChosen ? "text-white" : "text-[#111111]"}`}>{alt.name}</p>
                  {isRecommended && <span className="text-[8px] font-black uppercase tracking-[0.1em] text-[#FF270A] bg-[#FF270A]/10 px-1.5 py-0.5 rounded-full shrink-0">Recommended</span>}
                </div>
                <p className={`text-[11px] font-medium ${isChosen ? "text-gray-400" : "text-gray-500"}`}>
                  Cat #{alt.cat ?? "null"}{extra.length ? ` · also detects ${extra.map(id => MICRO_BY_ID[id]?.shortName ?? id).join(", ")}` : " · exact match"}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const openStagePicker = (protocolId: string, stage: StageKey, mode: "formats" | "options") => {
    const proto = plan.protocols.find(p => p.id === protocolId);
    const rs = proto?.chain.find(s => s.key === stage);
    if (!proto || !rs) return;
    const grps = rs.groups;
    const hasBundle = stageHasBundleGroups(grps);
    const members = stageMembers(rs);

    // FORMATS → independent presentation per medium (for a bundle) via a stateful picker that stays
    // open; single-product stages keep a one-shot select that closes on pick.
    if (mode === "formats") {
      const formatGroups = members
        .map(m => ({ medium: m, presentations: rs.options.filter(o => o.productKey === m.productKey) }))
        .filter(g => g.presentations.length);
      const independent = stage === "enrichment" && formatGroups.length > 1;
      const initialSel = Object.fromEntries(formatGroups.map(g => [g.medium.productKey, g.medium.optionId]));
      openModal(
        <StageFormatPicker
          stageLabel={STAGE_LABELS[stage]}
          groups={formatGroups}
          initialSel={initialSel}
          independent={independent}
          onPick={(medium, opt) => { if (independent) chooseEnrichFormat(proto.id, medium.productKey, opt.optionId); else chooseStageOption(proto.id, stage, opt.optionId); }}
          onClose={closeAll}
        />
      );
      return;
    }

    // OPTIONS → choose the full combination (which alternative medium; parallel media ride along).
    type ComboPart = { name: string; cat: string | null };
    type Combo = { id: string; selectOptionId: string; parts: ComboPart[] };
    const partOf = (o: ResolvedStageOption): ComboPart => ({ name: o.name, cat: o.cat });
    const buildCombos = (): Combo[] => {
      if (!grps) return [];
      const parallelParts = grps.filter(g => g.mode === "parallel").flatMap(g => g.options.map(partOf));
      const alternatives = grps.filter(g => g.mode === "alternative");
      const out: Combo[] = [];
      const walk = (idx: number, driverSel: string | null, accParts: ComboPart[]) => {
        if (idx === alternatives.length) { out.push({ id: `combo-${out.length}`, selectOptionId: driverSel ?? rs.chosen.optionId, parts: [...parallelParts, ...accParts] }); return; }
        for (const o of alternatives[idx].options) walk(idx + 1, idx === 0 ? o.optionId : driverSel, [...accParts, partOf(o)]);
      };
      if (alternatives.length === 0) out.push({ id: "combo-0", selectOptionId: rs.chosen.optionId, parts: parallelParts });
      else walk(0, null, []);
      return out;
    };
    const combos = hasBundle ? buildCombos() : null;
    const driverChosenKey = (grps?.find(g => g.mode === "alternative")?.chosen.productKey) ?? rs.chosen.productKey;
    const distinctProducts = (() => { const seen = new Set<string>(); return rs.options.filter(o => { if (seen.has(o.productKey)) return false; seen.add(o.productKey); return true; }); })();

    openModal(
      <div className="w-full px-7 sm:px-10 md:px-14 pt-12 md:pt-16 pb-10 md:pb-14">
        <span className="text-[11px] font-black text-[#FF270A] uppercase tracking-[0.2em] mb-2 block">{STAGE_LABELS[stage]}</span>
        <h3 className="text-2xl md:text-4xl font-black text-[#111111] tracking-tight mb-2">Choose a product</h3>
        <p className="text-sm md:text-base text-gray-500 font-medium mb-8 md:mb-10">Detecting <span className="font-black text-[#111111]">{microNames(coversById[proto.id] ?? [])}</span></p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {combos ? combos.map(combo => {
            const isChosen = combo.selectOptionId.split("::")[0] === driverChosenKey;
            return (
              <button key={combo.id} onClick={() => chooseStageOption(proto.id, stage, combo.selectOptionId)}
                className={`text-left p-5 rounded-2xl border transition-colors ${isChosen ? "bg-[#111111] border-[#111111]" : "bg-gray-50 border-transparent hover:bg-gray-100"}`}>
                <p className={`font-black text-base mb-1 ${isChosen ? "text-white" : "text-[#111111]"}`}>{combo.parts.map(p => p.name).join(" + ")}</p>
                <p className={`text-xs font-medium ${isChosen ? "text-gray-400" : "text-gray-500"}`}>{combo.parts.map(p => `Cat #${p.cat ?? "null"}`).join(" · ")}</p>
              </button>
            );
          }) : distinctProducts.map(opt => {
            const isChosen = opt.productKey === rs.chosen.productKey;
            return (
              <button key={opt.optionId} onClick={() => chooseStageOption(proto.id, stage, opt.optionId)}
                className={`text-left p-5 rounded-2xl border transition-colors ${isChosen ? "bg-[#111111] border-[#111111]" : "bg-gray-50 border-transparent hover:bg-gray-100"}`}>
                <p className={`font-black text-base mb-1 ${isChosen ? "text-white" : "text-[#111111]"}`}>{opt.name}</p>
                <p className={`text-xs font-medium ${isChosen ? "text-gray-400" : "text-gray-500"}`}>{[`Cat #${opt.cat ?? "null"}`, opt.format, opt.size].filter(Boolean).join(" · ")}</p>
                {opt.description && <p className={`text-xs mt-1.5 leading-snug ${isChosen ? "text-gray-300" : "text-gray-500"}`}>{opt.description}</p>}
                {opt.kitContent && <p className={`text-xs mt-1 ${isChosen ? "text-gray-500" : "text-gray-400"}`}>{opt.kitContent}</p>}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const CurrentIndustryIcon = selectedIndustry
    ? (INDUSTRIES.find(i => i.name === selectedIndustry)?.icon ?? getFallbackIcon())
    : getFallbackIcon();

  return (
    <section id="workflow" ref={sectionRef} className="pt-24 pb-20 px-4 md:px-6 w-full max-w-[1400px] mx-auto font-sans relative">
      <div className="mb-14 md:mb-20 text-center flex flex-col items-center px-2">
        <h2 className="text-3xl md:text-5xl font-black text-[#111111] mb-4 tracking-tighter leading-tight">
          Product &amp; Protocol Selector
        </h2>
        <p className="text-base md:text-lg text-gray-500 font-medium leading-relaxed max-w-2xl mx-auto">
          Select your industry and target microorganisms to reveal the most efficient testing workflow.
        </p>
      </div>

      <div ref={containerRef} className="w-full bg-gray-50 rounded-[2rem] md:rounded-[3rem] p-6 sm:p-10 md:p-20 relative min-h-[600px] flex flex-col overflow-hidden">
        {/* BARRA DE PROGRESO */}
        <div className="w-full flex flex-col lg:flex-row lg:items-center justify-between mb-12 md:mb-20 gap-6 border-b border-gray-200 pb-8 md:pb-10">
          <div className="flex items-center gap-2 md:gap-8 w-full justify-start overflow-x-hidden no-scrollbar pb-2 md:pb-0">
            <button onClick={() => setStep(1)} className={`text-[10px] font-black flex items-center gap-2 transition-colors shrink-0 uppercase tracking-[0.15em] ${step === 1 ? "text-[#FF270A]" : step > 1 ? "text-[#111111]" : "text-gray-300"}`}>
              <span className={`w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-full text-[10px] shrink-0 transition-colors ${step === 1 ? "bg-[#FF270A] text-white" : step > 1 ? "bg-[#111111] text-white" : "bg-gray-200 text-gray-400"}`}>1</span>
              <span className={step === 1 ? "" : "hidden sm:inline"}>Industry</span>
            </button>
            <div className="w-4 md:w-16 h-px bg-gray-200 shrink-0" />
            <button onClick={() => { if (step > 1) setStep(2); }} disabled={step < 2} className={`text-[10px] font-black flex items-center gap-2 transition-colors shrink-0 uppercase tracking-[0.15em] ${step === 2 ? "text-[#FF270A]" : step > 2 ? "text-[#111111]" : "text-gray-300"} ${step > 1 ? "cursor-pointer" : "cursor-default"}`}>
              <span className={`w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-full text-[10px] shrink-0 transition-colors ${step === 2 ? "bg-[#FF270A] text-white" : step > 2 ? "bg-[#111111] text-white" : "bg-gray-200 text-gray-400"}`}>2</span>
              <span className={step === 2 ? "" : "hidden sm:inline"}>Targets</span>
            </button>
            <div className="w-4 md:w-16 h-px bg-gray-200 shrink-0" />
            <button disabled className={`text-[10px] font-black flex items-center gap-2 transition-colors shrink-0 uppercase tracking-[0.15em] cursor-default ${step === 3 ? "text-[#FF270A]" : "text-gray-300"}`}>
              <span className={`w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-full text-[10px] shrink-0 transition-colors ${step === 3 ? "bg-[#FF270A] text-white" : "bg-gray-200 text-gray-400"}`}>3</span>
              <span className={step === 3 ? "" : "hidden sm:inline"}>Protocol</span>
            </button>
          </div>

          {step > 1 && (
            <div className="flex items-center bg-white rounded-full p-1 w-full sm:w-auto sm:shrink-0 overflow-visible">
              <div className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-black text-[#111111] uppercase tracking-[0.12em] border-r border-gray-100 min-w-0">
                <CurrentIndustryIcon className="w-6 h-6 shrink-0 text-[#FF270A]" strokeWidth={1.5} />
                <span className="truncate">{selectedIndustry}</span>
              </div>
              {selectedMicroorganisms.length > 0 && (
                <div className="relative group flex items-center gap-2.5 px-4 py-2.5 text-xs font-black text-[#FF270A] uppercase tracking-[0.12em] shrink-0 cursor-default">
                  <img src="/bacteria.png" alt="" className="w-6 h-6 shrink-0 object-contain" />
                  <span>{selectedMicroorganisms.length} Target{selectedMicroorganisms.length !== 1 ? "s" : ""}</span>
                  {/* Hover tooltip: the selected microorganisms */}
                  <div className="absolute top-full right-0 mt-2 w-max max-w-xs bg-[#111111] rounded-2xl shadow-xl px-4 py-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[60] normal-case">
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.15em] mb-1.5">Selected targets</p>
                    <ul className="flex flex-col gap-1">
                      {selectedMicroorganisms.map(id => (
                        <li key={id} className="text-xs font-bold text-white tracking-normal flex items-center gap-2 whitespace-nowrap">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF270A] shrink-0" />
                          {MICRO_BY_ID[id]?.shortName ?? id}
                        </li>
                      ))}
                    </ul>
                  </div>
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
                    onClick={() => { setSelectedIndustry(industry.name); setSelectedMicroorganisms([]); setProtocolConfirmed(false); setPcrSubstitutions({}); setStageOverrides({}); setEnrichFormatOverrides({}); setStep(2); setTimeout(() => microStepRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50); }}
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
            <div ref={microStepRef} className="text-center mb-10 md:mb-14 scroll-mt-24">
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
                  <div className="flex items-center bg-white p-1 rounded-full w-full sm:w-fit">
                    {availableSampleTypes.map(st => (
                      <button
                        key={st}
                        onClick={() => { setSampleType(st); setProtocolConfirmed(false); setStageOverrides({}); setEnrichFormatOverrides({}); }}
                        className={`flex-1 sm:flex-none px-3 md:px-7 py-2.5 rounded-full text-[11px] md:text-xs font-black uppercase tracking-[0.06em] md:tracking-[0.1em] transition-colors leading-tight text-center ${sampleType === st ? "bg-[#111111] text-white" : "text-gray-400 hover:text-[#111111]"}`}
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
                      No {sampleType === "Environmental" ? "environmental" : "finished-product"} protocol currently covers: <span className="font-black">{microNames(plan.uncoverable)}</span>. Our team can advise on alternatives.
                    </p>
                  </div>
                )}

                {!protocolConfirmed && plan.protocols.length > 1 && (
                  <div className="flex flex-col items-start gap-2 mb-6">
                    <p className="text-sm md:text-base font-bold text-[#111111] leading-snug">
                      Your targets are covered most efficiently by {plan.protocols.length} protocols — select one to see its full workflow.
                    </p>
                    <ChevronDown className="w-6 h-6 text-[#FF270A] animate-bounce" />
                  </div>
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
                            <div className="flex items-center gap-3 mb-4">
                              <p className={`text-[9px] font-black uppercase tracking-[0.2em] ${isActive ? "text-gray-400" : "text-gray-500"}`}>Protocol {idx + 1}</p>
                              <span className={`w-px h-4 ${isActive ? "bg-gray-600" : "bg-gray-200"}`} />
                              <p className={`text-xl md:text-2xl font-black tracking-tight leading-none ${isActive ? "text-white" : "text-[#FF270A]"}`}>{formatTime(proto.totalTimeHours)}</p>
                            </div>
                            <p className={`font-black text-lg md:text-2xl leading-snug break-words tracking-tight mb-3 ${isActive ? "text-white" : "text-[#111111]"}`}>
                              {proto.name}
                            </p>
                            <p className={`text-[11px] font-medium leading-relaxed ${isActive ? "text-gray-400" : "text-gray-500"}`}>
                              Detects: {microNames(covers)}
                            </p>
                          </div>
                          <button
                            onClick={(e: React.MouseEvent) => { e.stopPropagation(); openComparison(idx); }}
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
                  <p className="text-[10px] font-black text-[#FF270A] uppercase tracking-[0.2em] mb-2">Recommended Workflow</p>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-4">
                    <span className="inline-flex items-center gap-2 text-sm md:text-base font-black text-[#111111] uppercase tracking-[0.1em]">
                      <CurrentIndustryIcon className="w-5 h-5 text-[#FF270A] shrink-0" strokeWidth={1.5} />
                      {selectedIndustry}
                    </span>
                  </div>
                  <p className="text-xl md:text-2xl font-black text-[#111111] tracking-tight leading-snug">
                    Workflow for detecting {microNames(coversById[activeProtocol.id] ?? [])}
                    <span className="text-gray-300 font-light mx-2.5">|</span>
                    <span className="text-[#FF270A] whitespace-nowrap">{formatTime(activeProtocol.totalTimeHours)} <span className="text-xs md:text-sm text-gray-400 uppercase tracking-[0.15em] align-middle">total</span></span>
                  </p>
                </div>

                <div className="hidden md:grid gap-3 md:gap-4" style={{ gridTemplateColumns: `repeat(${chainOf(activeProtocol).length}, 1fr)` }}>
                  {chainOf(activeProtocol).map((rs, sIdx) => {
                    const stage = rs.key;
                    const grps = rs.groups;
                    const isGrouped = stageIsCombinedDisplay(grps);
                    const members = stageMembers(rs);
                    const prodName = isGrouped
                      ? grps!.map(g => g.mode === "parallel"
                          ? g.options.map(o => o.name).join(" + ")
                          : g.chosen.name).join("  +  ")
                      : rs.chosen.name;
                    const isPcr = stage === "pcr";
                    return (
                      <Fragment key={stage}>
                        <div className="bg-white p-6 md:p-8 rounded-2xl md:rounded-[2rem] flex flex-col">
                          <span className="text-[9px] font-black text-[#111111] uppercase tracking-[0.2em] mb-5 block">
                            {String(sIdx + 1).padStart(2, "0")} — {rs.label ?? STAGE_LABELS[stage]}
                          </span>
                          <div className="flex-grow">
                            <h5 className="text-lg md:text-xl font-black text-[#111111] leading-tight tracking-tight mb-2">{prodName}</h5>
                            {isGrouped ? (
                              <div className="flex flex-col gap-2">
                                {members.map(m => (
                                  <div key={m.optionId}>
                                    <p className="text-[11px] font-bold text-[#111111] leading-tight">{m.name}</p>
                                    <p className="text-[10px] text-gray-500 font-medium">{[`Cat #${m.cat ?? "null"}`, m.mode, m.format, m.size].filter(Boolean).join(" · ")}</p>
                                    {m.description && <p className="text-[13px] text-gray-400 font-medium leading-relaxed mt-0.5">{m.description}</p>}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <>
                                <p className="text-[10px] text-gray-500 font-medium">
                                  {[`Cat #${rs.chosen.cat ?? "null"}`, rs.chosen.mode, rs.chosen.format, rs.chosen.size].filter(Boolean).join(" · ")}
                                </p>
                                {rs.chosen.description && <p className="text-[13px] text-gray-400 font-medium leading-relaxed mt-2">{rs.chosen.description}</p>}
                              </>
                            )}
                          </div>
                          <div className="mt-6 pt-5 border-t border-gray-100 flex flex-col gap-3">
                            <div className="flex items-center gap-2 h-5">
                              <Clock className="w-3.5 h-3.5 text-[#FF270A] shrink-0" />
                              <span className="text-[10px] font-black text-[#111111] uppercase tracking-[0.1em]">
                                {stageTimeText(rs.chosen)}
                              </span>
                            </div>
                            {(() => {
                              const memberKeys = new Set(members.map(m => m.productKey));
                              const formatCount = rs.options.filter(o => memberKeys.has(o.productKey)).length;
                              const optionCount = countStageOptions(rs);
                              return (
                                <>
                                  {formatCount > 1 && (
                                    <button onClick={() => openStagePicker(activeProtocol.id, stage, "formats")} className="flex items-center gap-2 h-5 hover:opacity-60 transition-opacity">
                                      <ChevronRight className="w-3.5 h-3.5 text-[#FF270A] shrink-0" />
                                      <span className="text-[10px] font-black text-[#111111] uppercase tracking-[0.1em]">{formatCount} formats</span>
                                    </button>
                                  )}
                                  {optionCount > 1 && (
                                    <button onClick={() => openStagePicker(activeProtocol.id, stage, "options")} className="flex items-center gap-2 h-5 hover:opacity-60 transition-opacity">
                                      <ChevronRight className="w-3.5 h-3.5 text-[#FF270A] shrink-0" />
                                      <span className="text-[10px] font-black text-[#111111] uppercase tracking-[0.1em]">{optionCount} options</span>
                                    </button>
                                  )}
                                </>
                              );
                            })()}
                            {isPcr && pcrAlternatives.length > 1 && (
                              <button onClick={() => openPcrPicker()} className="flex items-center gap-2 h-5 hover:opacity-60 transition-opacity">
                                <ChevronRight className="w-3.5 h-3.5 text-[#FF270A] shrink-0" />
                                <span className="text-[10px] font-black text-[#111111] uppercase tracking-[0.1em]">{pcrAlternatives.length} kit options</span>
                              </button>
                            )}
                            {isPcr ? (
                              <>
                                <button onClick={() => openBrief(briefFromProtocol(activeProtocol, selectedIndustry))} className="flex items-center gap-2 h-5 hover:opacity-60 transition-opacity">
                                  <FileText className="w-3.5 h-3.5 text-[#FF270A] shrink-0" />
                                  <span className="text-[10px] font-black text-[#111111] uppercase tracking-[0.1em]">Product Value Brief</span>
                                </button>
                                <a href={`/datasheets/${activeProtocol.id}.pdf`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 h-5 hover:opacity-60 transition-opacity">
                                  <FileText className="w-3.5 h-3.5 text-[#FF270A] shrink-0" />
                                  <span className="text-[10px] font-black text-[#111111] uppercase tracking-[0.1em]">Technical data sheet</span>
                                </a>
                              </>
                            ) : rs.chosen.features.length > 0 && (
                              <button onClick={() => openBrief(combinedBriefFromStage(rs) ?? briefFromStageOption(rs.chosen))} className="flex items-center gap-2 h-5 hover:opacity-60 transition-opacity">
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
                      const grps = rs.groups;
                      const isGrouped = stageIsCombinedDisplay(grps);
                      const members = stageMembers(rs);
                      const prodName = isGrouped
                        ? grps!.map(g => g.mode === "parallel"
                            ? g.options.map(o => o.name).join(" + ")
                            : g.chosen.name).join("  +  ")
                        : rs.chosen.name;
                      const isPcr = stage === "pcr";
                      return (
                        <div key={stage} className="snap-start shrink-0 w-[80vw] bg-white p-6 rounded-2xl flex flex-col">
                          <span className="text-[9px] font-black text-[#111111] uppercase tracking-[0.2em] mb-5 block">
                            {String(sIdx + 1).padStart(2, "0")} — {rs.label ?? STAGE_LABELS[stage]}
                          </span>
                          <div className="flex-grow">
                            <h5 className="text-xl font-black text-[#111111] leading-tight tracking-tight mb-2">{prodName}</h5>
                            {isGrouped ? (
                              <div className="flex flex-col gap-2">
                                {members.map(m => (
                                  <div key={m.optionId}>
                                    <p className="text-[11px] font-bold text-[#111111] leading-tight">{m.name}</p>
                                    <p className="text-[10px] text-gray-500 font-medium">{[`Cat #${m.cat ?? "null"}`, m.mode, m.format, m.size].filter(Boolean).join(" · ")}</p>
                                    {m.description && <p className="text-[13px] text-gray-400 font-medium leading-relaxed mt-0.5">{m.description}</p>}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <>
                                <p className="text-[10px] text-gray-500 font-medium">
                                  {[`Cat #${rs.chosen.cat ?? "null"}`, rs.chosen.mode, rs.chosen.format, rs.chosen.size].filter(Boolean).join(" · ")}
                                </p>
                                {rs.chosen.description && <p className="text-[13px] text-gray-400 font-medium leading-relaxed mt-2">{rs.chosen.description}</p>}
                              </>
                            )}
                          </div>
                          <div className="mt-6 pt-5 border-t border-gray-100 flex flex-col gap-3">
                            <div className="flex items-center gap-2 h-5">
                              <Clock className="w-3.5 h-3.5 text-[#FF270A] shrink-0" />
                              <span className="text-[10px] font-black text-[#111111] uppercase tracking-[0.1em]">{stageTimeText(rs.chosen)}</span>
                            </div>
                            {(() => {
                              const memberKeys = new Set(members.map(m => m.productKey));
                              const formatCount = rs.options.filter(o => memberKeys.has(o.productKey)).length;
                              const optionCount = countStageOptions(rs);
                              return (
                                <>
                                  {formatCount > 1 && (
                                    <button onClick={() => openStagePicker(activeProtocol.id, stage, "formats")} className="flex items-center gap-2 h-5 hover:opacity-60 transition-opacity">
                                      <ChevronRight className="w-3.5 h-3.5 text-[#FF270A] shrink-0" />
                                      <span className="text-[10px] font-black text-[#111111] uppercase tracking-[0.1em]">{formatCount} formats</span>
                                    </button>
                                  )}
                                  {optionCount > 1 && (
                                    <button onClick={() => openStagePicker(activeProtocol.id, stage, "options")} className="flex items-center gap-2 h-5 hover:opacity-60 transition-opacity">
                                      <ChevronRight className="w-3.5 h-3.5 text-[#FF270A] shrink-0" />
                                      <span className="text-[10px] font-black text-[#111111] uppercase tracking-[0.1em]">{optionCount} options</span>
                                    </button>
                                  )}
                                </>
                              );
                            })()}
                            {isPcr && pcrAlternatives.length > 1 && (
                              <button onClick={() => openPcrPicker()} className="flex items-center gap-2 h-5 hover:opacity-60 transition-opacity">
                                <ChevronRight className="w-3.5 h-3.5 text-[#FF270A] shrink-0" />
                                <span className="text-[10px] font-black text-[#111111] uppercase tracking-[0.1em]">{pcrAlternatives.length} kit options</span>
                              </button>
                            )}
                            {isPcr ? (
                              <>
                                <button onClick={() => openBrief(briefFromProtocol(activeProtocol, selectedIndustry))} className="flex items-center gap-2 h-5 hover:opacity-60 transition-opacity">
                                  <FileText className="w-3.5 h-3.5 text-[#FF270A] shrink-0" />
                                  <span className="text-[10px] font-black text-[#111111] uppercase tracking-[0.1em]">Product Value Brief</span>
                                </button>
                                <a href={`/datasheets/${activeProtocol.id}.pdf`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 h-5 hover:opacity-60 transition-opacity">
                                  <FileText className="w-3.5 h-3.5 text-[#FF270A] shrink-0" />
                                  <span className="text-[10px] font-black text-[#111111] uppercase tracking-[0.1em]">Technical data sheet</span>
                                </a>
                              </>
                            ) : rs.chosen.features.length > 0 && (
                              <button onClick={() => openBrief(combinedBriefFromStage(rs) ?? briefFromStageOption(rs.chosen))} className="flex items-center gap-2 h-5 hover:opacity-60 transition-opacity">
                                <FileText className="w-3.5 h-3.5 text-[#FF270A] shrink-0" />
                                <span className="text-[10px] font-black text-[#111111] uppercase tracking-[0.1em]">Product Value Brief</span>
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {chainOf(activeProtocol).length > 1 && (
                    <div className="flex justify-center gap-2 mt-4">
                      {chainOf(activeProtocol).map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            const el = productsScrollRef.current;
                            if (el) el.scrollTo({ left: idx * (el.clientWidth * 0.8 + 12), behavior: "smooth" });
                          }}
                          className={`rounded-full transition-all duration-300 ${activeProdDot === idx ? "w-5 h-2 bg-[#FF270A]" : "w-2 h-2 bg-gray-300"}`}
                        />
                      ))}
                    </div>
                  )}
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


      {/* --- QUOTE MODAL is provider-hosted via openModal(<QuoteModal/>) --- */}

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}