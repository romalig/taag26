"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Search, X, Filter, ChevronDown, ChevronLeft, ChevronRight,
  Square, CheckSquare, Clock, BarChart2, Target, AlertCircle,
  FileText, FileDown, Award,
} from "lucide-react";
import { PRODUCTS, type ProductDef, type ProductPresentation } from "./data/products";
import { PROTOCOLS } from "./data/protocols";
import ScrollX from "./ScrollX";
import { INDUSTRIES as INDUSTRY_DEFS } from "./data/industries";
import {
  INDUSTRIES, getResolvedProtocolsForIndustry, getAvailableSampleTypes, resolveChain, formatTime,
  type SampleType, type Protocol, type ResolvedStageOption,
} from "./workflowData";
import { AOAC_KIT_IDS } from "./data/brochures";
import ProductBrief from "./ProductBrief";
import { briefFromProtocol, briefFromStageOption } from "./briefData";
import { useModal } from "./ModalProvider";

// =============================================================================
// Catalog view-model — derived entirely from the real data layer.
//   • products.ts  → master product data (name, category, line, presentations)
//   • protocols.ts → PCR-only fields (targets, technology, sensitivity) by productKey
//   • workflowData → resolves full protocol chains → workflow / process times + brief sources
//   • brochures.ts → AOAC_KIT_IDS (validated PCR kits)
//   • briefData.ts → the SAME Product Value Brief builders the protocol section uses
// =============================================================================

const PROTO_BY_PRODUCT_KEY: Record<string, (typeof PROTOCOLS)[number]> =
  Object.fromEntries(PROTOCOLS.map(p => [p.productKey, p]));

const AOAC_SET = new Set<string>(AOAC_KIT_IDS as unknown as string[]);

// "Salmonella_spp." → "Salmonella spp."
const prettyTarget = (t: string) => t.replace(/_/g, " ").replace(/\s+/g, " ").trim();
const clean = (s: string | null | undefined) => (s && s !== "-" ? s : null);
const fmtList = (prod: ProductDef) => prod.presentations.map(p => p.format).filter(Boolean).join(", ") || "—";
const catList = (prod: ProductDef) => prod.presentations.map(p => p.catalogCode).filter(Boolean).join(", ") || "—";

// First positive number out of a free-text hours field ("24", "18-24", "24 / 48" → 24).
function parseHours(s: string | null | undefined): number | null {
  const v = clean(s); if (!v) return null;
  const m = parseFloat(v.replace(",", "."));
  return Number.isFinite(m) && m > 0 ? m : null;
}

// The own-process label shown next to a non-PCR product's time.
function processNoun(cat: string): string {
  switch (cat) {
    case "Growth Medium":
    case "Medium supplement": return "enrichment";
    case "Extraction Kit":
    case "Extraction supplement": return "extraction";
    case "Sampling Kit": return "sampling";
    default: return "process";
  }
}

// --- Times + brief sources, resolved once from the real workflow chains -------
// Resolve every protocol across all industries × available sample types. From each resolved chain:
//   • FULL_WORKFLOW_HOURS[pcrKey]  = fastest COMPLETE workflow time (sampling+enrichment+extraction
//                                    +PCR) — this is the only time that applies to a PCR kit.
//     PROTOCOL_BY_KEY[pcrKey]      = the resolved Protocol behind that fastest workflow (brief source).
//   • OWN_TIME_HOURS[key]          = a NON-PCR product's own stage time (e.g. a medium's incubation,
//                                    an extraction kit's run) — NOT the whole workflow.
//     OPTION_BY_KEY[key]           = a representative resolved option for that product (brief source).
const FULL_WORKFLOW_HOURS: Record<string, number> = {};
const OWN_TIME_HOURS: Record<string, number> = {};
const PROTOCOL_BY_KEY: Record<string, Protocol> = {};
const OPTION_BY_KEY: Record<string, ResolvedStageOption> = {};
(() => {
  try {
    for (const ind of INDUSTRIES) {
      const avail = getAvailableSampleTypes(ind.name);
      const sampleTypes: (SampleType | undefined)[] = avail.length ? avail : [undefined];
      for (const st of sampleTypes) {
        for (const p of getResolvedProtocolsForIndustry(ind.name, st)) {
          const total = p.totalTimeHours;
          const pcrKey = p.chain.find(s => s.key === "pcr")?.chosen?.productKey;
          if (pcrKey && Number.isFinite(total) && total > 0 && (FULL_WORKFLOW_HOURS[pcrKey] == null || total < FULL_WORKFLOW_HOURS[pcrKey])) {
            FULL_WORKFLOW_HOURS[pcrKey] = total;
            PROTOCOL_BY_KEY[pcrKey] = p;
          }
          for (const stage of p.chain) {
            const opts: ResolvedStageOption[] = [stage.chosen, ...(stage.groups?.flatMap(g => g.options) ?? [])].filter(Boolean) as ResolvedStageOption[];
            for (const o of opts) {
              if (!o.productKey) continue;
              if (!(o.productKey in OPTION_BY_KEY)) OPTION_BY_KEY[o.productKey] = o;
              if (o.timeHours != null && o.timeHours > 0 && (OWN_TIME_HOURS[o.productKey] == null || o.timeHours < OWN_TIME_HOURS[o.productKey]))
                OWN_TIME_HOURS[o.productKey] = o.timeHours;
            }
          }
        }
      }
    }
  } catch {
    /* resolver/data issue → times fall back to presentation data or "—" */
  }
})();

// Minimal ResolvedStageOption from a ProductDef — fallback brief source for a non-PCR product that
// appears in no resolved workflow. Only the fields the non-PCR brief reads are meaningful.
function optionFromProduct(key: string): ResolvedStageOption | null {
  const prod = PRODUCTS[key]; if (!prod) return null;
  const p0: ProductPresentation | undefined = prod.presentations[0];
  return {
    optionId: `${key}::${p0?.catalogCode ?? "null"}`,
    productKey: key,
    name: prod.name,
    cat: p0?.catalogCode ?? null,
    format: p0?.format ?? null,
    size: p0?.size ?? null,
    kitContent: p0?.kitContent ?? null,
    description: prod.description ?? null,
    mode: null,
    sampleTypes: [],
    timeHours: null,
    timeLabel: null,
    timeEstimated: false,
    features: prod.features ?? [],
    category: prod.category ?? null,
    productLine: prod.productLine ?? null,
    presentations: prod.presentations,
  };
}

// Spec rows shown in the comparison modal, keyed per category so same-category products align.
const SPEC_TEMPLATE: Record<string, string[]> = {
  "PCR Kit": ["Full workflow", "Targets", "Technology", "Sensitivity", "PCR run time", "Detection dye", "Formats", "Catalog codes", "Shelf life", "Storage temp"],
  "Growth Medium": ["Process time", "Incubation (h)", "Ready to use", "Formats", "Catalog codes", "Shelf life", "Storage temp"],
  "Medium supplement": ["Process time", "Incubation (h)", "Ready to use", "Formats", "Catalog codes", "Shelf life", "Storage temp"],
  "Extraction Kit": ["Process time", "Ready to use", "Formats", "Catalog codes", "Shelf life", "Storage temp"],
  "Extraction supplement": ["Process time", "Ready to use", "Formats", "Catalog codes", "Shelf life", "Storage temp"],
  "Sampling Kit": ["Process time", "Formats", "Catalog codes", "Shelf life", "Storage temp"],
};
const DEFAULT_SPEC_KEYS = ["Process time", "Formats", "Catalog codes", "Shelf life", "Storage temp"];

interface CatalogProduct {
  id: string;
  type: string;                // real category
  isPcr: boolean;
  name: string;
  line: string | null;
  desc: string;
  technology: string | null;   // PCR only
  targets: string | null;      // PCR only, prettified
  aoac: boolean;
  industries: string[];        // mainIndustries (finished scope); [] = no restriction -> shown in all industries
  timeHours: number | null;    // PCR → full workflow; others → own process. Sort key.
  timeLabel: string;           // "full workflow" | "enrichment" | "extraction" | "sampling" | …
  specs: Record<string, string>;
}

function buildCatalog(): CatalogProduct[] {
  return Object.values(PRODUCTS).map((prod): CatalogProduct => {
    const proto = PROTO_BY_PRODUCT_KEY[prod.key];
    const isPcr = prod.category === "PCR Kit";
    const pres0: ProductPresentation | undefined = prod.presentations[0];

    const targets = isPcr && proto ? proto.targets.map(prettyTarget).join(", ") : null;
    const technology = isPcr && proto ? proto.technology : null;
    const sensitivity = proto?.sensitivity ? proto.sensitivity.split("\n")[0] : null;
    const aoac = !!proto && AOAC_SET.has(proto.id);

    // (1) PCR kit → the complete workflow time. Any other product → only its own process time.
    const timeHours = isPcr
      ? (FULL_WORKFLOW_HOURS[prod.key] ?? null)
      : (OWN_TIME_HOURS[prod.key] ?? parseHours(pres0?.incubationTimeH));
    const timeLabel = isPcr ? "full workflow" : processNoun(prod.category ?? "");
    const timeStr = timeHours != null ? formatTime(timeHours) : "—";

    const keys = SPEC_TEMPLATE[prod.category ?? ""] ?? DEFAULT_SPEC_KEYS;
    const specVal = (key: string): string => {
      switch (key) {
        case "Full workflow":
        case "Process time": return timeStr;
        case "Targets": return targets ?? "—";
        case "Technology": return technology ?? "—";
        case "Sensitivity": return sensitivity ?? "—";
        case "PCR run time": return clean(pres0?.pcrTimeMin) ? `${pres0!.pcrTimeMin} min` : "—";
        case "Detection dye": return clean(pres0?.dye) ?? "—";
        case "Incubation (h)": return clean(pres0?.incubationTimeH)?.replace(/\n/g, " / ") ?? "—";
        case "Ready to use": return pres0 ? (pres0.isReadyToUse ? "Yes" : "No (requires prep)") : "—";
        case "Formats": return fmtList(prod);
        case "Catalog codes": return catList(prod);
        case "Shelf life": return clean(pres0?.shelfLifeMonths) ? `${pres0!.shelfLifeMonths} mo` : "—";
        case "Storage temp": return clean(pres0?.storeTemp) ?? "—";
        default: return "—";
      }
    };
    const specs: Record<string, string> = {};
    for (const k of keys) specs[k] = specVal(k);

    return {
      id: prod.key,
      type: prod.category ?? "Other",
      isPcr,
      name: prod.name,
      line: prod.productLine,
      desc: prod.description ?? "",
      technology, targets, aoac,
      industries: prod.mainIndustries,
      timeHours, timeLabel,
      specs,
    };
  });
}

const CATALOG: CatalogProduct[] = buildCatalog();

// Type tabs in the exact requested order. Category tab shown only if it has products;
// "All" always; "AOAC" if any product is AOAC-validated.
const TYPE_TABS: { label: string; match: (p: CatalogProduct) => boolean }[] = ([
  { label: "All", match: () => true },
  { label: "AOAC", match: (p: CatalogProduct) => p.aoac },
  { label: "PCR Kit", match: (p: CatalogProduct) => p.type === "PCR Kit" },
  { label: "Extraction Kit", match: (p: CatalogProduct) => p.type === "Extraction Kit" },
  { label: "Growth Medium", match: (p: CatalogProduct) => p.type === "Growth Medium" },
  { label: "Sampling Kit", match: (p: CatalogProduct) => p.type === "Sampling Kit" },
  { label: "Medium supplement", match: (p: CatalogProduct) => p.type === "Medium supplement" },
  { label: "Extraction supplement", match: (p: CatalogProduct) => p.type === "Extraction supplement" },
] as const).filter(tab =>
  tab.label === "All" ||
  (tab.label === "AOAC" ? CATALOG.some(p => p.aoac) : CATALOG.some(p => p.type === tab.label))
);

const INDUSTRY_OPTIONS = ["All Industries", ...INDUSTRY_DEFS.map(i => i.name)];
const PAGE_SIZE = 10;

export default function ProductCatalog() {
  const { openModal } = useModal();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("PCR Kit");
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries");
  const [isIndustryDropdownOpen, setIsIndustryDropdownOpen] = useState(false);
  const [page, setPage] = useState(1);

  const [compareList, setCompareList] = useState<string[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [compareAlert, setCompareAlert] = useState<string | null>(null);

  useEffect(() => {
    if (compareAlert) {
      const timer = setTimeout(() => setCompareAlert(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [compareAlert]);

  useEffect(() => { setPage(1); }, [searchQuery, selectedTab, selectedIndustry]);

  const tabMatch = useMemo(() => TYPE_TABS.find(t => t.label === selectedTab)?.match ?? (() => true), [selectedTab]);

  // Filter → sort ascending by the product's relevant time (fastest first; no-time sorts last).
  const filteredSorted = useMemo(() => {
    const terms = searchQuery.toLowerCase().split(" ").filter(t => t.length > 0);
    return CATALOG
      .filter(product => {
        const itemText = `${product.name} ${product.desc} ${product.targets ?? ""} ${product.technology ?? ""} ${product.line ?? ""} ${product.type}`.toLowerCase();
        const matchesSearch = terms.every(term => itemText.includes(term));
        const matchesType = tabMatch(product);
        const matchesIndustry = selectedIndustry === "All Industries" || product.industries.length === 0 || product.industries.includes(selectedIndustry);
        return matchesSearch && matchesType && matchesIndustry;
      })
      .sort((a, b) => {
        const ta = a.timeHours ?? Infinity, tb = b.timeHours ?? Infinity;
        if (ta !== tb) return ta - tb;
        return a.name.localeCompare(b.name);
      });
  }, [searchQuery, tabMatch, selectedIndustry]);

  const pageCount = Math.max(1, Math.ceil(filteredSorted.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const pageItems = filteredSorted.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const rangeStart = filteredSorted.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(currentPage * PAGE_SIZE, filteredSorted.length);

  // (3) Open the SAME Product Value Brief modal used in the protocol section.
  const openValueBrief = (p: CatalogProduct) => {
    if (p.isPcr) {
      const def = PROTO_BY_PRODUCT_KEY[p.id];
      const proto = PROTOCOL_BY_KEY[p.id] ?? (def ? resolveChain(def) : null);
      if (proto) openModal(<ProductBrief data={briefFromProtocol(proto, null)} />);
    } else {
      const opt = OPTION_BY_KEY[p.id] ?? optionFromProduct(p.id);
      if (opt) openModal(<ProductBrief data={briefFromStageOption(opt)} />);
    }
  };
  const datasheetHref = (_id: string) => "#"; // TODO: point to the real Technical Data Sheet URL

  const toggleCompare = (id: string) => {
    const targetProduct = CATALOG.find(p => p.id === id);
    if (!targetProduct) return;
    setCompareList(prev => {
      if (prev.includes(id)) return prev.filter(pId => pId !== id);
      if (prev.length >= 4) { setCompareAlert("You can compare up to 4 products at a time."); return prev; }
      if (prev.length > 0) {
        const firstProduct = CATALOG.find(p => p.id === prev[0]);
        if (firstProduct && firstProduct.type !== targetProduct.type) {
          setCompareAlert(`You can only compare products from the same category (${firstProduct.type}).`);
          return prev;
        }
      }
      return [...prev, id];
    });
  };
  const clearCompare = () => setCompareList([]);

  const comparedProductsData = compareList.map(id => CATALOG.find(p => p.id === id)).filter(Boolean) as CatalogProduct[];
  const specKeys = comparedProductsData.length > 0 ? Object.keys(comparedProductsData[0].specs) : [];

  return (
    <section id="catalog" className="pt-24 pb-6 px-4 md:px-6 w-full max-w-[1400px] mx-auto font-sans relative">

      {compareAlert && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[200] bg-red-50 text-[#FF270A] border border-[#FF270A]/20 px-6 py-3 rounded-full text-sm font-bold shadow-[0_8px_30px_rgb(255,39,10,0.12)] flex items-center gap-3 animate-in slide-in-from-top-4 fade-in duration-300">
          <AlertCircle className="w-5 h-5" />
          <span>{compareAlert}</span>
          <button onClick={() => setCompareAlert(null)} className="ml-2 hover:bg-red-100 p-1 rounded-full transition-colors"><X className="w-4 h-4" /></button>
        </div>
      )}

      <div className="mb-10 md:mb-12 text-center flex flex-col items-center">
        <h2 className="text-4xl md:text-5xl font-black text-[#111111] mb-4 tracking-tighter leading-tight">Product Explorer</h2>
        <p className="text-base md:text-lg text-gray-500 font-medium leading-relaxed max-w-2xl mx-auto">
          Search by microorganism, filter by product type, and compare specifications.
        </p>
      </div>

      <div className="w-full bg-white border border-gray-100 rounded-[2rem] md:rounded-[3rem] p-5 sm:p-8 md:p-16 relative min-h-[600px] flex flex-col shadow-sm">

        {/* TOOLBAR */}
        <div className="flex flex-col md:flex-row items-center gap-4 mb-8 relative z-30">
          <div className="relative w-full md:flex-1 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#FF270A] transition-colors" />
            <input
              type="text"
              placeholder="Search by microorganism (e.g. Salmonella, Listeria)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-transparent rounded-2xl md:rounded-full py-4 pl-12 pr-12 text-sm font-medium text-[#111111] focus:outline-none focus:bg-white focus:border-[#FF270A]/30 transition-all placeholder:text-gray-400"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 hover:bg-gray-200 rounded-full transition-colors">
                <X className="w-3 h-3 text-gray-500" />
              </button>
            )}
          </div>

          <div className="relative w-full md:w-72">
            <button
              onClick={() => setIsIndustryDropdownOpen(!isIndustryDropdownOpen)}
              className="w-full bg-gray-50 border border-transparent rounded-2xl md:rounded-full py-4 px-6 flex items-center justify-between text-sm font-bold text-[#111111] hover:bg-gray-100 transition-colors"
            >
              <span className="flex items-center gap-2"><Filter className="w-4 h-4 text-[#FF270A]" />{selectedIndustry}</span>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isIndustryDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {isIndustryDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 shadow-xl rounded-2xl overflow-hidden z-40 max-h-80 overflow-y-auto">
                {INDUSTRY_OPTIONS.map(ind => (
                  <button key={ind} onClick={() => { setSelectedIndustry(ind); setIsIndustryDropdownOpen(false); }}
                    className={`w-full text-left px-6 py-3 text-sm font-medium transition-colors ${selectedIndustry === ind ? "bg-gray-50 text-[#FF270A] font-bold" : "text-[#111111] hover:bg-gray-50"}`}>
                    {ind}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* TYPE TABS */}
        <ScrollX className="flex overflow-x-auto no-scrollbar gap-2 md:gap-3 border-b border-gray-200/60 pb-4 mb-6">
          {TYPE_TABS.map(tab => (
            <button key={tab.label} onClick={() => setSelectedTab(tab.label)}
              className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-bold whitespace-nowrap transition-colors inline-flex items-center gap-1.5 ${selectedTab === tab.label ? "bg-[#111111] text-white" : "bg-transparent text-gray-400 hover:text-[#111111] hover:bg-gray-50"}`}>
              {tab.label === "AOAC" && <Award className={`w-3.5 h-3.5 ${selectedTab === tab.label ? "text-[#FF270A]" : ""}`} />}
              {tab.label}
            </button>
          ))}
        </ScrollX>

        {/* RESULT COUNT */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{filteredSorted.length} product{filteredSorted.length !== 1 ? "s" : ""}</p>
          {filteredSorted.length > 0 && <p className="text-[10px] font-medium text-gray-400">Fastest first</p>}
        </div>

        {/* PRODUCT LIST */}
        <div className="flex flex-col gap-4 flex-grow">
          {pageItems.length > 0 ? (
            pageItems.map(product => {
              const isCompared = compareList.includes(product.id);
              return (
                <div key={product.id} className="group flex flex-col md:flex-row items-start md:items-stretch justify-between p-6 md:p-8 bg-gray-50 hover:bg-gray-100/60 rounded-3xl transition-colors duration-300 border border-transparent hover:border-gray-200">

                  <div className="flex-1 w-full md:pr-10">
                    {/* 1. Category · Technology (+ AOAC, line) */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="text-[9px] font-black tracking-widest uppercase px-3 py-1 rounded-full bg-white text-gray-500 border border-gray-200">
                        {product.type}{product.technology ? ` · ${product.technology}` : ""}
                      </span>
                      {product.aoac && (
                        <span className="inline-flex items-center gap-1 text-[9px] font-black tracking-widest uppercase px-3 py-1 rounded-full bg-[#FF270A] text-white">
                          <Award className="w-3 h-3" /> AOAC
                        </span>
                      )}
                      {product.line && (
                        <span className="text-[9px] font-black tracking-widest uppercase px-3 py-1 rounded-full bg-[#FF270A]/10 text-[#FF270A]">{product.line}</span>
                      )}
                    </div>

                    {/* 2. Name */}
                    <h4 className="text-xl md:text-2xl font-bold text-[#111111] mb-3 group-hover:text-[#FF270A] transition-colors">{product.name}</h4>

                    {/* 3. Description */}
                    {product.desc && <p className="text-sm text-[#111111] font-medium leading-relaxed max-w-3xl mb-5">{product.desc}</p>}

                    {/* 4. Target microorganisms */}
                    {product.targets && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-[10px] font-bold text-gray-600 tracking-wider">
                          <Target className="w-3 h-3 text-[#FF270A]" />{product.targets}
                        </span>
                      </div>
                    )}

                    {/* 5. Time  6. Value Brief  7. Data Sheet */}
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-5 border-t border-gray-200/60">
                      <div className="flex items-center gap-2 text-[#111111] font-bold text-[10px] md:text-xs uppercase tracking-tight">
                        <Clock className="w-4 h-4 text-[#FF270A]" />
                        <span>{product.timeHours != null ? `${formatTime(product.timeHours)} ${product.timeLabel}` : "—"}</span>
                      </div>
                      <button onClick={() => openValueBrief(product)}
                        className="flex items-center gap-2 text-[#111111] font-bold text-[10px] md:text-xs uppercase tracking-tight hover:text-[#FF270A] transition-colors">
                        <FileText className="w-4 h-4 text-[#FF270A]" /><span>Product Value Brief</span>
                      </button>
                      {product.isPcr && (
                        <a href={datasheetHref(product.id)}
                          className="flex items-center gap-2 text-[#111111] font-bold text-[10px] md:text-xs uppercase tracking-tight hover:text-[#FF270A] transition-colors">
                          <FileDown className="w-4 h-4 text-[#FF270A]" /><span>Technical Data Sheet</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Compare */}
                  <div className="mt-6 md:mt-0 pt-6 md:pt-0 border-t border-gray-200 md:border-none w-full md:w-auto flex justify-start md:justify-end md:items-center shrink-0">
                    <button onClick={() => toggleCompare(product.id)}
                      className={`flex items-center gap-3 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${isCompared ? "bg-[#111111] text-white" : "bg-white text-gray-500 hover:text-[#111111] border border-gray-200"}`}>
                      {isCompared ? <CheckSquare className="w-4 h-4 text-[#FF270A]" /> : <Square className="w-4 h-4" />}
                      {isCompared ? "Selected" : "Compare"}
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-20 text-center flex flex-col items-center">
              <Search className="w-12 h-12 text-gray-200 mb-4" />
              <h4 className="text-xl font-bold text-[#111111] mb-2">No products found</h4>
              <p className="text-gray-500 font-medium">Try adjusting your filters or search terms.</p>
            </div>
          )}
        </div>

        {/* PAGINATION (windows of 10) */}
        {filteredSorted.length > PAGE_SIZE && (
          <div className="flex items-center justify-between gap-4 mt-10 pt-8 border-t border-gray-200/60">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{rangeStart}–{rangeEnd} of {filteredSorted.length}</span>
            <div className="flex items-center gap-2">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-[#111111] hover:border-[#FF270A] hover:text-[#FF270A] transition-colors disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:text-[#111111]">
                <ChevronLeft className="w-5 h-5" />
              </button>
              {Array.from({ length: pageCount }, (_, i) => i + 1)
                .filter(n => n === 1 || n === pageCount || Math.abs(n - currentPage) <= 1)
                .reduce<(number | "…")[]>((acc, n, idx, arr) => {
                  if (idx > 0 && n - (arr[idx - 1] as number) > 1) acc.push("…");
                  acc.push(n); return acc;
                }, [])
                .map((n, i) => n === "…"
                  ? <span key={`g${i}`} className="px-1 text-gray-300 font-bold">…</span>
                  : <button key={n} onClick={() => setPage(n)}
                      className={`min-w-10 h-10 px-3 rounded-full text-sm font-bold transition-colors ${n === currentPage ? "bg-[#111111] text-white" : "text-gray-500 hover:bg-gray-100"}`}>{n}</button>
                )}
              <button onClick={() => setPage(p => Math.min(pageCount, p + 1))} disabled={currentPage === pageCount}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-[#111111] hover:border-[#FF270A] hover:text-[#FF270A] transition-colors disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:text-[#111111]">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* FLOATING COMPARE BAR */}
      {compareList.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-10 fade-in duration-300 w-[90%] md:w-auto">
          <div className="bg-[#111111] text-white p-2 pl-4 md:pl-6 rounded-full shadow-2xl flex flex-col md:flex-row items-center gap-4 md:gap-6 border border-gray-800">
            <div className="flex items-center gap-3 w-full md:w-auto justify-center">
              <BarChart2 className="w-5 h-5 text-[#FF270A]" />
              <span className="text-sm font-bold">{compareList.length} <span className="font-normal text-gray-400">product{compareList.length > 1 ? "s" : ""} selected</span></span>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto justify-center">
              <button onClick={clearCompare} className="px-4 py-2 text-xs font-bold text-gray-400 hover:text-white uppercase tracking-widest transition-colors">Clear</button>
              <button onClick={() => setIsCompareModalOpen(true)} disabled={compareList.length < 2}
                className="px-6 py-2.5 bg-[#FF270A] text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-[#111111] transition-colors disabled:opacity-50 disabled:hover:bg-[#FF270A] disabled:hover:text-white whitespace-nowrap">
                Compare Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* COMPARISON MODAL */}
      {isCompareModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[2rem] w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-300 border-0">
            <div className="p-6 md:p-8 flex items-center justify-between border-b border-gray-100 shrink-0">
              <div>
                <h3 className="text-xl md:text-2xl font-black text-[#111111] leading-tight">Product Comparison</h3>
                <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">{comparedProductsData[0]?.type} Category</span>
              </div>
              <button onClick={() => setIsCompareModalOpen(false)} className="p-2 bg-gray-50 rounded-full hover:bg-gray-200 transition-colors shrink-0">
                <X className="w-5 h-5 text-[#111111]" />
              </button>
            </div>
            <div className="overflow-x-auto overflow-y-auto w-full h-full bg-white">
              <div className="flex flex-col min-w-full">
                <div className="flex items-stretch bg-gray-50/40 w-full">
                  <div className="w-32 md:w-56 shrink-0 p-4 md:p-6 border-b border-gray-100"></div>
                  {comparedProductsData.map(p => (
                    <div key={p.id} className="flex-1 min-w-[240px] md:min-w-[280px] p-4 md:p-6 border-b border-l border-gray-100 relative group flex flex-col justify-end bg-white">
                      <button onClick={() => toggleCompare(p.id)} title="Remove from comparison"
                        className="absolute top-3 right-3 p-1.5 bg-white rounded-full text-gray-300 hover:text-[#FF270A] hover:bg-red-50 transition-colors md:opacity-0 md:group-hover:opacity-100 shadow-sm border border-gray-100">
                        <X className="w-4 h-4" />
                      </button>
                      {p.line && <span className="text-[9px] font-black uppercase tracking-widest text-[#FF270A] mb-1 block">{p.line}</span>}
                      <h4 className="text-base md:text-lg font-bold text-[#111111] leading-tight mb-1 pr-8">{p.name}</h4>
                    </div>
                  ))}
                </div>
                {specKeys.map(key => (
                  <div key={key} className="flex items-stretch hover:bg-gray-50/50 transition-colors w-full">
                    <div className="w-32 md:w-56 shrink-0 p-4 md:p-6 flex items-center text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 bg-white leading-relaxed">{key}</div>
                    {comparedProductsData.map(p => (
                      <div key={`${p.id}-${key}`} className="flex-1 min-w-[240px] md:min-w-[280px] p-4 md:p-6 text-sm font-medium text-[#111111] flex items-center border-b border-l border-gray-100 bg-transparent leading-relaxed whitespace-pre-wrap break-words">
                        {p.specs[key] || "—"}
                      </div>
                    ))}
                  </div>
                ))}
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
