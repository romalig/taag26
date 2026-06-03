// =============================================================================
// workflowData.ts — assembly + helpers. You normally DON'T edit this file.
// Composes the hand-edited data files into the shape the component needs:
//
//   microorganisms.ts ─┐
//   industries.ts      ├─► workflowData.ts ─► WorkflowBuilder.tsx
//   products.ts        │        + protocolSelection.ts (set-cover algorithm)
//   protocols.ts       │
//   comparisons.ts ────┘
//
// Model: protocols reference products by productKey; products hold presentations
// (catalog codes / formats). Each protocol stage exposes product OPTIONS with their
// own sampleTypes and time. The selector picks the fastest option per stage and the
// most precise kit (least over-coverage). Total time = sum of chosen options.
//
// Default presentation order within a product: (1) lowest time, (2) RTU first for media /
// Automated first for extraction.
//
// No build step. A light validation runs once in development only.
// =============================================================================

import {
  Milk, Drumstick, CupSoda, Utensils, Leaf, Globe, Wine, Egg, Beef,
  Pill, Fish, Candy, Soup, PawPrint, ShieldCheck, Factory,
  type LucideIcon,
} from "lucide-react";

import { MICROORGANISMS, type Microorganism, type MicroorganismType } from "./data/microorganisms";
import { INDUSTRIES as INDUSTRY_DEFS } from "./data/industries";
import { PRODUCTS, type ProductDef, type ProductPresentation } from "./data/products";
import {
  PROTOCOLS, type ProtocolDef, type StageOption as RawStageOption,
  type StageKey, type SampleType, type ExecMode, type KeyAdvantage,
} from "./data/protocols";
import { COMPARISONS, type ProtocolComparison } from "./data/comparisons";

import { selectOptimalProtocols, type SelectableProtocol } from "./protocolSelection";
export { selectOptimalProtocols };
export type { SelectableProtocol };
export type { SelectionResult } from "./protocolSelection";
export type { Microorganism, MicroorganismType, StageKey, SampleType, ExecMode, ProtocolComparison, KeyAdvantage };
export type { ProductPresentation };

// -----------------------------------------------------------------------------
// Resolved runtime shapes (productKey already joined to product + presentation)
// -----------------------------------------------------------------------------
export interface ResolvedStageOption {
  optionId: string;            // unique per presentation: `${productKey}::${cat}` — used to select
  productKey: string;
  name: string;
  cat: string | null;          // catalog code of THIS presentation
  format: string | null;
  size: string | null;
  description: string | null;
  mode: ExecMode | null;
  sampleTypes: SampleType[];
  timeHours: number | null;
  timeLabel: string | null;    // literal time label to display instead of formatted hours
  timeEstimated: boolean;
  features: string[];          // product key features (for the non-PCR value brief)
  presentations: ProductPresentation[]; // all presentations of the product, default-ordered
}

export interface ResolvedStage {
  key: StageKey;
  chosen: ResolvedStageOption;
  options: ResolvedStageOption[];
}

export interface Protocol {
  id: string;
  name: string;
  line: string | null;
  cat: string;
  detects: string[];
  technology: string | null;
  sensitivity: string | null;
  description: { en: string | null };
  keyAdvantages: KeyAdvantage[];
  features: string[];
  comparison: ProtocolComparison | null;
  chain: ResolvedStage[];
  totalTimeHours: number;
  timeEstimated: boolean;
  extraTargets: number;        // how many detected targets beyond what was requested
  _def: ProtocolDef;
}

export interface Industry { name: string; icon: LucideIcon; }

const INDUSTRY_ICONS: Record<string, LucideIcon> = {
  "Dairy": Milk, "Meat and Poultry": Drumstick, "Meat & Poultry": Beef,
  "Beverage": CupSoda, "Beer & Wine": Wine, "Ready-to-eat": Utensils,
  "Fresh & Processed Produce": Leaf, "Egg Products": Egg, "Confectionery": Candy,
  "Sauces and condiments": Soup, "Seafood": Fish, "Nutraceutical": Pill,
  "Pharmaceutical": Pill, "Pet Food & Animal Feed": PawPrint,
  "Sterile products": ShieldCheck, "Environmental": Globe,
};
export const getFallbackIcon = (): LucideIcon => Factory;

const STAGE_ORDER: StageKey[] = ["sampling", "enrichment", "extraction", "pcr"];

// -----------------------------------------------------------------------------
// Presentation ordering: (1) lowest time is decided at the option level (same product
// shares time), so here we order by (2) RTU-first for media / Automated-first for
// extraction, then by catalog code for stability.
// -----------------------------------------------------------------------------
function orderPresentations(prod: ProductDef, stage: StageKey): ProductPresentation[] {
  const list = [...prod.presentations];
  // Per-stage default presentation order (what shows first; rest are alternatives):
  //   enrichment / sampling : RTU first (ready-to-use media)
  //   extraction            : Automated first (Plate = magnetic-bead / automated workflow)
  //   pcr                   : SPID first (preloaded strips)
  const rank = (p: ProductPresentation): number => {
    if (stage === "extraction") {
      const order: Record<string, number> = { Plate: 0, Bottle: 1, Tube: 2, Powder: 3, RTU: 4, SPID: 5 };
      return p.format && p.format in order ? order[p.format] : 9;
    }
    if (stage === "pcr") {
      const order: Record<string, number> = { SPID: 0, Tube: 1, Plate: 2, RTU: 3, Powder: 4, Bottle: 5 };
      return p.format && p.format in order ? order[p.format] : 9;
    }
    // enrichment / sampling: RTU (or SPID) first, then the rest
    const order: Record<string, number> = { RTU: 0, SPID: 0, Bottle: 1, Powder: 2, Tube: 3, Plate: 4 };
    return p.format && p.format in order ? order[p.format] : 9;
  };
  list.sort((a, b) => {
    const ra = rank(a), rb = rank(b);
    if (ra !== rb) return ra - rb;
    return (a.catalogCode || "").localeCompare(b.catalogCode || "");
  });
  return list;
}
// Resolve a raw stage option into ONE display option PER PRESENTATION (format/catalog code),
// so the stage picker can list every format as its own row. Default-ordered (first = default).
function resolveOptions(raw: RawStageOption, stage: StageKey): ResolvedStageOption[] {
  const prod = PRODUCTS[raw.productKey];
  const presentations = prod ? orderPresentations(prod, stage) : [];
  if (!presentations.length) {
    // product not in catalog (unlisted) — single option with no presentation
    return [{
      optionId: `${raw.productKey}::null`, productKey: raw.productKey,
      name: prod ? prod.name : raw.productKey, cat: null, format: null, size: null,
      description: prod ? prod.description : null, mode: raw.mode ?? null,
      sampleTypes: raw.sampleTypes, timeHours: raw.timeHours ?? null,
      timeEstimated: raw.timeEstimated, timeLabel: raw.timeLabel ?? null, features: prod ? prod.features : [], presentations: [],
    }];
  }
  return presentations.map(pres => ({
    optionId: `${raw.productKey}::${pres.catalogCode ?? "null"}`,
    productKey: raw.productKey,
    name: prod ? prod.name : raw.productKey,
    cat: pres.catalogCode,
    format: pres.format,
    size: pres.size,
    description: prod ? prod.description : null,
    mode: raw.mode ?? null,
    sampleTypes: raw.sampleTypes,
    timeHours: raw.timeHours ?? null,
    timeLabel: raw.timeLabel ?? null,
    timeEstimated: raw.timeEstimated,
    features: prod ? prod.features : [],
    presentations,
  }));
}

function optionMatchesSample(o: RawStageOption, sampleType?: SampleType): boolean {
  if (!sampleType) return true;
  return o.sampleTypes.includes(sampleType);
}

// -----------------------------------------------------------------------------
// Chain resolution
// -----------------------------------------------------------------------------
export function resolveChain(def: ProtocolDef, preferred?: Partial<Record<StageKey, string>>, sampleType?: SampleType, industry?: string | null): Protocol {
  const chain: ResolvedStage[] = [];
  let total = 0;
  let estimated = false;

  // Stages depend on the (kit, industry) pair. Pick the industry's stage set; if none is
  // selected or the kit doesn't declare that industry, fall back to any available set so the
  // chain still resolves (the PCR stage is identical across industries).
  const industriesAvailable = Object.keys(def.stagesByIndustry);
  const chosenIndustry = (industry && def.stagesByIndustry[industry]) ? industry : industriesAvailable[0];
  const stages = chosenIndustry ? def.stagesByIndustry[chosenIndustry] : undefined;
  if (!stages) {
    // no stage data at all — return a minimal protocol (shouldn't happen with valid data)
    const pcrProdX = PRODUCTS[def.productKey];
    return {
      id: def.id, name: def.name, line: def.productLine, cat: def.catalogCode,
      detects: def.targets, technology: def.technology, sensitivity: def.sensitivity,
      description: { en: pcrProdX ? pcrProdX.description : null },
      keyAdvantages: def.keyAdvantages, features: def.features,
      comparison: COMPARISONS[def.id] ?? null,
      chain: [], totalTimeHours: 0, timeEstimated: true,
      extraTargets: 0, _def: def,
    } as Protocol;
  }

  for (const key of STAGE_ORDER) {
    if (key === "pcr") {
      const p = stages.pcr;
      const prod = PRODUCTS[p.productKey];
      const presentations = prod ? orderPresentations(prod, "pcr") : [];
      // One option per presentation (SPID/96, SPID/480, Tube…), so formats show as rows.
      const opts: ResolvedStageOption[] = (presentations.length ? presentations : [null]).map(pres => ({
        optionId: `${p.productKey}::${pres?.catalogCode ?? def.catalogCode}`,
        productKey: p.productKey, name: prod ? prod.name : def.name,
        cat: pres ? pres.catalogCode : def.catalogCode, format: pres?.format ?? null, size: pres?.size ?? null,
        description: prod ? prod.description : null, mode: null, sampleTypes: ["Environmental", "Finished"],
        timeHours: p.timeHours, timeLabel: p.timeLabel ?? null, timeEstimated: p.timeEstimated, features: prod ? prod.features : [], presentations,
      }));
      let chosen = (preferred && preferred[key]) ? opts.find(o => o.optionId === preferred[key]) : undefined;
      if (!chosen) chosen = opts[0];
      if (p.timeHours != null) total += p.timeHours;
      if (p.timeEstimated || p.timeHours == null) estimated = true;
      chain.push({ key, chosen, options: opts });
      continue;
    }

    const raw = stages[key].options;
    if (!raw.length) continue;
    const filtered = raw.filter(o => optionMatchesSample(o, sampleType));
    const usable = filtered.length ? filtered : raw;
    // expand each product option into one option per presentation
    const resolved = usable.flatMap(o => resolveOptions(o, key));

    let chosen: ResolvedStageOption | undefined;
    if (preferred && preferred[key]) chosen = resolved.find(o => o.optionId === preferred[key]);
    if (!chosen) {
      chosen = resolved.slice().sort((a, b) => {
        const ta = a.timeHours, tb = b.timeHours;
        if (ta == null) return 1;
        if (tb == null) return -1;
        return ta - tb;
      })[0];
    }
    if (chosen.timeHours != null) total += chosen.timeHours;
    if (chosen.timeEstimated || chosen.timeHours == null) estimated = true;
    chain.push({ key, chosen, options: resolved });
  }

  const pcrProd = PRODUCTS[stages.pcr.productKey];
  return {
    id: def.id, name: def.name, line: def.productLine, cat: def.catalogCode,
    detects: def.targets, technology: def.technology, sensitivity: def.sensitivity,
    description: { en: pcrProd ? pcrProd.description : null },
    keyAdvantages: def.keyAdvantages, features: def.features,
    comparison: COMPARISONS[def.id] ?? null,
    chain, totalTimeHours: Math.round(total * 100) / 100, timeEstimated: estimated,
    extraTargets: 0, _def: def,
  };
}

/** Sample types a protocol supports across its stage options (any industry). */
export function protocolSampleTypes(def: ProtocolDef): SampleType[] {
  const set = new Set<SampleType>();
  for (const ind of Object.values(def.stagesByIndustry)) {
    for (const st of [ind.sampling, ind.enrichment, ind.extraction]) {
      for (const o of st.options) o.sampleTypes.forEach(s => set.add(s));
    }
  }
  if (set.size === 0) { set.add("Environmental"); set.add("Finished"); }
  return (["Environmental", "Finished"] as SampleType[]).filter(s => set.has(s));
}

// -----------------------------------------------------------------------------
// Exported data
// -----------------------------------------------------------------------------
export const INDUSTRIES: Industry[] = INDUSTRY_DEFS.map(i => ({ name: i.name, icon: INDUSTRY_ICONS[i.name] ?? Factory }));
export const MICROORGANISMS_LIST = MICROORGANISMS;
export const PROTOCOL_DEFS = PROTOCOLS;

export const MICRO_BY_ID: Record<string, Microorganism> = Object.fromEntries(MICROORGANISMS.map(m => [m.id, m]));
export const DEF_BY_ID: Record<string, ProtocolDef> = Object.fromEntries(PROTOCOLS.map(p => [p.id, p]));

const INDUSTRY_MICROS: Record<string, string[]> = Object.fromEntries(INDUSTRY_DEFS.map(i => [i.name, i.microorganisms]));

export function getMicroorganismsForIndustry(industry: string | null): Microorganism[] {
  if (!industry) return [];
  const order: MicroorganismType[] = ["PATHOGEN", "INDICATOR", "SPOILAGE"];
  return (INDUSTRY_MICROS[industry] ?? []).map(id => MICRO_BY_ID[id]).filter(Boolean)
    .sort((a, b) => order.indexOf(a.type) - order.indexOf(b.type) || a.name.localeCompare(b.name));
}

function defsForIndustry(industry: string | null): ProtocolDef[] {
  if (!industry) return PROTOCOLS;
  // A kit belongs to an industry only if it DECLARES it in mainIndustries (from the source
  // main_industries field). This is stronger than micro-overlap: a kit that merely detects a
  // microorganism relevant to the industry is NOT shown unless it declares the industry.
  // Note: "declared" is not the same as per-matrix validated — see README data caveats.
  return PROTOCOLS.filter(p => p.mainIndustries.includes(industry));
}

export function getResolvedProtocolsForIndustry(industry: string | null, sampleType?: SampleType): Protocol[] {
  return defsForIndustry(industry).map(d => resolveChain(d, undefined, sampleType, industry));
}

export function getAvailableSampleTypes(industry: string | null): SampleType[] {
  const set = new Set<SampleType>();
  defsForIndustry(industry).forEach(d => protocolSampleTypes(d).forEach(s => set.add(s)));
  return (["Environmental", "Finished"] as SampleType[]).filter(s => set.has(s));
}

/**
 * Alternative PCR kits for a requested target set: kits that CONTAIN the request, grouped
 * by number of extra targets. Returns the exact kits (+0) plus the next non-empty tier of
 * extras (dynamic), ordered by fewest extras then lowest time. Used for the PCR stage's
 * "swap kit" link. `industry` scopes candidates; `sampleType` resolves their times.
 */
export function getPcrAlternatives(requested: string[], industry: string | null, sampleType?: SampleType): Protocol[] {
  const req = new Set(requested);
  if (req.size === 0) return [];
  // All kits (in the selected industry) that detect the requested target(s). Ordered by
  // fewest extra targets first, then lowest time — so the most specific kit leads and is the
  // recommended one. No tier cutoff: every valid kit for the missing target is offered.
  return defsForIndustry(industry)
    .filter(d => [...req].every(t => d.targets.includes(t)))
    .map(d => {
      const p = resolveChain(d, undefined, sampleType, industry);
      p.extraTargets = d.targets.filter(t => !req.has(t)).length;
      return p;
    })
    .sort((a, b) => a.extraTargets - b.extraTargets || a.totalTimeHours - b.totalTimeHours);
}

export function formatTime(hours: number): string {
  if (!hours) return "—";
  if (hours < 1) return `${Math.round(hours * 60)} min`;
  const r = Math.round(hours * 10) / 10;
  return `~${Number.isInteger(r) ? r : r.toFixed(1)}h`;
}

export const STAGE_LABELS: Record<StageKey, string> = {
  sampling: "Sampling", enrichment: "Enrichment", extraction: "Extraction", pcr: "PCR Detection",
};
export { STAGE_ORDER };

// -----------------------------------------------------------------------------
// Light validation — development only.
// -----------------------------------------------------------------------------
function validateData(): void {
  const problems: string[] = [];
  const microIds = new Set(MICROORGANISMS.map(m => m.id));
  for (const p of PROTOCOLS) {
    for (const t of p.targets) if (!microIds.has(t)) problems.push(`protocols.ts: "${p.id}" targets unknown microorganism "${t}"`);
    if (p.targets.length === 0) problems.push(`protocols.ts: "${p.id}" has no targets`);
    const allKeys: string[] = [];
    for (const ind of Object.values(p.stagesByIndustry)) {
      for (const o of [...ind.sampling.options, ...ind.enrichment.options, ...ind.extraction.options]) allKeys.push(o.productKey);
      allKeys.push(ind.pcr.productKey);
    }
    for (const k of allKeys) if (k && !PRODUCTS[k]) problems.push(`protocols.ts: "${p.id}" references unknown productKey "${k}"`);
  }
  for (const ind of INDUSTRY_DEFS) for (const id of ind.microorganisms)
    if (!microIds.has(id)) problems.push(`industries.ts: "${ind.name}" references unknown microorganism "${id}"`);
  if (problems.length) {
    // eslint-disable-next-line no-console
    console.warn(`[WorkflowBuilder data] ${problems.length} issue(s):\n` + problems.map(p => "  • " + p).join("\n"));
  }
}
if (typeof process !== "undefined" && process.env && process.env.NODE_ENV !== "production") {
  try { validateData(); } catch { /* never break the app over validation */ }
}