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
  Milk, Drumstick, CupSoda, Utensils, Leaf, Globe, Wine, Beer, Egg, Beef,
  Pill, Fish, Candy, Soup, PawPrint, ShieldCheck, Factory,
  type LucideIcon,
} from "lucide-react";

import { MICROORGANISMS, type Microorganism, type MicroorganismType } from "./data/microorganisms";
import { INDUSTRIES as INDUSTRY_DEFS } from "./data/industries";
import { PRODUCTS, type ProductDef, type ProductPresentation } from "./data/products";
import {
  PROTOCOLS, type ProtocolDef, type StageOption as RawStageOption,
  type StageKey, type SampleType, type ExecMode, type KeyAdvantage, type GroupMode, type EnrichmentGroup,
} from "./data/protocols";
import { COMPARISONS, type ProtocolComparison } from "./data/comparisons";
import { BROCHURES } from "./data/brochures";
import { SUPPLEMENT_RULES } from "./data/supplementRules";

import { selectOptimalProtocols, type SelectableProtocol } from "./protocolSelection";
export { selectOptimalProtocols };
export type { SelectableProtocol };
export type { SelectionResult } from "./protocolSelection";
export type { Microorganism, MicroorganismType, StageKey, SampleType, ExecMode, ProtocolComparison, KeyAdvantage, GroupMode, EnrichmentGroup };
export type { ProductPresentation };

// Canonical form for matching microorganism ids against protocol targets.
// Team-maintained protocols.ts and hand-maintained microorganisms.ts can differ
// in case and punctuation (e.g. "Salmonella_spp." vs "salmonella_spp"), so we
// compare on a lowercased, alphanumeric-only key. Used on BOTH sides of the match.
export const normMicroId = (id: string): string => id.toLowerCase().replace(/[^a-z0-9]/g, "");

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
  kitContent: string | null;   // e.g. "• 25 Bottles - 225 mL" — shown in the format picker
  description: string | null;
  mode: ExecMode | null;
  sampleTypes: SampleType[];
  timeHours: number | null;
  timeLabel: string | null;    // literal time label to display instead of formatted hours
  timeEstimated: boolean;
  features: string[];          // product key features (for the non-PCR value brief)
  category: string | null;     // e.g. "Growth Medium", "Extraction Kit" — for the non-PCR brief header
  productLine: string | null;  // e.g. "Augmentis", "Nucleia" — for the non-PCR brief header
  presentations: ProductPresentation[]; // all presentations of the product, default-ordered
}

export interface ResolvedGroup {
  id: string;
  mode: GroupMode;
  options: ResolvedStageOption[];   // all media in this group (resolved to presentations)
  chosen: ResolvedStageOption;      // default pick (the single one used when mode="alternative")
}
export interface ResolvedStage {
  key: StageKey;
  chosen: ResolvedStageOption;          // primary selection (first group's chosen) — back-compat
  options: ResolvedStageOption[];        // all available options for this stage (flat)
  groups?: ResolvedGroup[];              // enrichment grouping; when present, drives display/time
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
  "Beverage": CupSoda, "Beer": Beer, "Wine": Wine, "Ready-to-eat": Utensils,
  "Fresh & Processed Produce": Leaf, "Egg Products": Egg, "Confectionery": Candy,
  "Sauces and condiments": Soup, "Seafood": Fish, "Nutraceutical": Pill,
  "Pharmaceutical": Pill, "Pet Food & Animal Feed": PawPrint,
  "Sterile products": ShieldCheck, "Environmental": Globe,
};
export const getFallbackIcon = (): LucideIcon => Factory;

const STAGE_ORDER: StageKey[] = ["sampling", "enrichment", "mediumSupplement", "extractionSupplement", "extraction", "pcr"];

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
      name: prod ? prod.name : raw.productKey, cat: null, format: null, size: null, kitContent: null,
      description: prod ? prod.description : null, mode: raw.mode ?? null,
      sampleTypes: raw.sampleTypes, timeHours: raw.timeHours ?? null,
      timeEstimated: raw.timeEstimated, timeLabel: raw.timeLabel ?? null, features: prod ? prod.features : [],
      category: prod ? prod.category : null, productLine: prod ? prod.productLine : null, presentations: [],
    }];
  }
  return presentations.map(pres => ({
    optionId: `${raw.productKey}::${pres.catalogCode ?? "null"}`,
    productKey: raw.productKey,
    name: prod ? prod.name : raw.productKey,
    cat: pres.catalogCode,
    format: pres.format,
    size: pres.size,
    kitContent: pres.kitContent ?? null,
    description: prod ? prod.description : null,
    mode: raw.mode ?? null,
    sampleTypes: raw.sampleTypes,
    timeHours: raw.timeHours ?? null,
    timeLabel: raw.timeLabel ?? null,
    timeEstimated: raw.timeEstimated,
    features: prod ? prod.features : [],
    category: prod ? prod.category : null,
    productLine: prod ? prod.productLine : null,
    presentations,
  }));
}

function optionMatchesSample(o: RawStageOption, sampleType?: SampleType): boolean {
  if (!sampleType) return true;
  return o.sampleTypes.includes(sampleType);
}

// --- Surface (Environmental) validation is cross-industry -------------------
// Business rule: a kit is validated for surfaces if it has a sampling stage with
// options in AT LEAST ONE industry. When so, that sampling stage applies to ALL
// the kit's industries (propagated below). Kits with no sampling anywhere are NOT
// offered for Environmental. Each kit keeps its OWN sampling product (e.g. Elevia
// uses Captus, Ampliora/Specio use NeutroSampling) — we copy the kit's real option,
// never a generic substitute.
function kitSamplingOptions(def: ProtocolDef): RawStageOption[] {
  for (const ind of Object.values(def.stagesByIndustry)) {
    const opts = ind.sampling?.options;
    if (opts && opts.length) return opts;
  }
  return [];
}
export function kitIsSurfaceValidated(def: ProtocolDef): boolean {
  return kitSamplingOptions(def).length > 0;
}

// Build the resolved enrichment groups for a given sample type. Uses the kit's explicit
// `groups` (verified data). When a kit declares no groups, every applicable option becomes its
// own "alternative" group (safe default: the user picks one). Groups whose media are not
// applicable to the sample type (after the option's own sampleTypes filter) are dropped.
function buildEnrichmentGroups(
  stage: { options: RawStageOption[]; groups?: EnrichmentGroup[] },
  applicable: RawStageOption[],
  sampleType: SampleType | undefined,
  preferredOptionId?: string,
  fmtByKey?: Record<string, string>,
): ResolvedGroup[] {
  // Fallback-only media: broad "universal" broths used in Finished ONLY when no more specific
  // medium is available. If a more specific medium also applies, the fallback is dropped so the
  // workflow recommends the selective option. (Universal Surfaces is already Environmental-only
  // in the data, so this targets Universal Pathogens.)
  const FALLBACK_ONLY_MEDIA = new Set(["augmentis_41_universal_pathogens"]);
  let media = applicable;
  if (sampleType === "Finished") {
    const distinct = new Set(media.map(o => o.productKey));
    const hasSpecific = [...distinct].some(k => !FALLBACK_ONLY_MEDIA.has(k));
    if (hasSpecific) media = media.filter(o => !FALLBACK_ONLY_MEDIA.has(o.productKey));
  }

  const byKey = new Map<string, RawStageOption>();
  for (const o of media) if (!byKey.has(o.productKey)) byKey.set(o.productKey, o);

  const resolveGroup = (id: string, mode: GroupMode, keys: string[]): ResolvedGroup | null => {
    // One representative resolved option PER distinct medium (productKey). resolveOptions expands
    // a product into one entry per presentation/catalog code, so without this dedupe a parallel
    // group would render the same medium many times ("Listeria + Listeria + BPW + BPW…").
    const opts: ResolvedStageOption[] = [];
    const taken = new Set<string>();
    for (const k of keys) {
      const raw = byKey.get(k);
      if (!raw || taken.has(k)) continue;
      const expanded = resolveOptions(raw, "enrichment");
      if (!expanded.length) continue;
      // Presentation per medium: the user's chosen format for THIS medium (fmtByKey[k]) wins;
      // then a legacy single preferred presentation if it belongs to this medium; else the default.
      // fmtByKey holds one entry per medium, so several media can carry independent formats at once.
      const fmtId = fmtByKey?.[k];
      const pick = (fmtId && expanded.find(o => o.optionId === fmtId))
        || (preferredOptionId && expanded.find(o => o.optionId === preferredOptionId))
        || expanded[0];
      opts.push(pick); taken.add(k);
    }
    if (!opts.length) return null;
    // Which medium is "chosen" (the one used for an alternative group) is selected by PRODUCT, not by
    // presentation — so changing a medium's format never silently re-picks a different medium.
    const altKey = preferredOptionId ? preferredOptionId.split("::")[0] : undefined;
    const preferredInGroup = altKey ? opts.find(o => o.productKey === altKey) : undefined;
    const chosen = preferredInGroup ?? opts.slice().sort((a, b) => (a.timeHours ?? 1e9) - (b.timeHours ?? 1e9))[0];
    return { id, mode, options: opts, chosen };
  };

  if (stage.groups && stage.groups.length) {
    const out: ResolvedGroup[] = [];
    for (const g of stage.groups) {
      if (sampleType && g.sampleType !== sampleType) continue;     // group scoped to other sample type
      // honor the fallback rule inside groups too: drop fallback-only keys when specifics remain
      const keys = g.productKeys.filter(k => byKey.has(k));
      const rg = resolveGroup(g.id, g.mode, keys);
      if (rg) out.push(rg);
    }
    if (out.length) return out;
    // groups exist but none matched this sample type → fall through to default
  }
  // default: each applicable medium is its own alternative group
  return media.flatMap(o => {
    const rg = resolveGroup(o.productKey, "alternative", [o.productKey]);
    return rg ? [rg] : [];
  });
}

// -----------------------------------------------------------------------------
// Chain resolution
// -----------------------------------------------------------------------------
export function resolveChain(def: ProtocolDef, preferred?: Partial<Record<StageKey, string>>, sampleType?: SampleType, industry?: string | null, enrichFormats?: Record<string, string>): Protocol {
  const chain: ResolvedStage[] = [];
  let total = 0;
  let estimated = false;
  // Enrichment media that ended up active in the chain (parallel: all; alternative: the chosen
  // one). Used to gate conditional supplements (see SUPPLEMENT_RULES). Populated when the
  // enrichment stage resolves, then read when the supplement stages resolve (enrichment comes
  // first in STAGE_ORDER, so it's always known by then).
  const activeMediaKeys = new Set<string>();

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
      detects: def.targets.map(normMicroId), technology: def.technology, sensitivity: def.sensitivity,
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
        cat: pres ? pres.catalogCode : def.catalogCode, format: pres?.format ?? null, size: pres?.size ?? null, kitContent: pres?.kitContent ?? null,
        description: prod ? prod.description : null, mode: null, sampleTypes: ["Environmental", "Finished"],
        timeHours: p.timeHours, timeLabel: p.timeLabel ?? null, timeEstimated: p.timeEstimated, features: prod ? prod.features : [],
        category: prod ? prod.category : null, productLine: prod ? prod.productLine : null, presentations,
      }));
      let chosen = (preferred && preferred[key]) ? opts.find(o => o.optionId === preferred[key]) : undefined;
      if (!chosen) chosen = opts[0];
      if (p.timeHours != null) total += p.timeHours;
      if (p.timeEstimated || p.timeHours == null) estimated = true;
      chain.push({ key, chosen, options: opts });
      continue;
    }

    // --- Sampling stage: Environmental only ---------------------------------
    // Sampling is the surface-collection step. It is shown ONLY for Environmental
    // samples; Finished-product workflows start at Enrichment. Because surface
    // validation is cross-industry, if the chosen industry lacks a sampling option
    // we fall back to the kit's sampling option from any industry (its own product).
    if (key === "sampling") {
      if (sampleType === "Finished") continue;          // Finished skips sampling
      let rawSampling = stages.sampling?.options ?? [];
      if (!rawSampling.length) rawSampling = kitSamplingOptions(def); // propagate across industries
      if (!rawSampling.length) continue;                // kit not surface-validated → no sampling
      const resolvedS = rawSampling.flatMap(o => resolveOptions(o, key));
      let chosenS: ResolvedStageOption | undefined;
      if (preferred && preferred[key]) chosenS = resolvedS.find(o => o.optionId === preferred[key]);
      if (!chosenS) chosenS = resolvedS.slice().sort((a, b) => (a.timeHours ?? 1e9) - (b.timeHours ?? 1e9))[0];
      if (chosenS.timeHours != null) total += chosenS.timeHours;
      if (chosenS.timeEstimated || chosenS.timeHours == null) estimated = true;
      chain.push({ key, chosen: chosenS, options: resolvedS });
      continue;
    }

    const raw = stages[key].options;
    if (!raw.length) continue;
    const filtered = raw.filter(o => optionMatchesSample(o, sampleType));
    // Supplements (medium/extraction) are OPTIONAL and sample-type-specific: if none of their
    // options apply to the current sample type, the stage is omitted entirely (no fallback).
    // Core stages (extraction) keep the fallback so the chain always resolves a product.
    const isOptionalSupplement = key === "mediumSupplement" || key === "extractionSupplement";
    // Conditional supplement rules: a gated supplement only stays if the chosen enrichment medium
    // matches the rule (and industry/sample-type scope). Supplements not named in any rule are
    // unaffected. See data/supplementRules.ts.
    let ruleFiltered = filtered;
    if (isOptionalSupplement) {
      const rules = (SUPPLEMENT_RULES[def.id] ?? []).filter(r => r.stage === key);
      if (rules.length) {
        ruleFiltered = filtered.filter(opt => {
          const applicable = rules.filter(r => r.supplementKey === opt.productKey);
          if (!applicable.length) return true; // not gated → keep
          // keep if ANY applicable rule is satisfied
          return applicable.some(r => {
            const indOk = !r.industries || (chosenIndustry != null && r.industries.includes(chosenIndustry));
            const stOk = !r.sampleTypes || (sampleType != null && r.sampleTypes.includes(sampleType));
            const mediumOk = r.whenMediumIs.some(m => activeMediaKeys.has(m));
            return indOk && stOk && mediumOk;
          });
        });
      }
    }
    if (isOptionalSupplement && !ruleFiltered.length) continue;
    const usable = (isOptionalSupplement ? ruleFiltered : filtered).length ? (isOptionalSupplement ? ruleFiltered : filtered) : raw;
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

    // Enrichment: media are organized into groups (parallel = all together; alternative = pick
    // one), scoped by sample type. All enrichment media run CONCURRENTLY, so the stage time is the
    // MAXIMUM over all active media — never the sum. (A parallel group contributes all its media;
    // an alternative group contributes only its chosen medium.)
    if (key === "enrichment") {
      const groups = buildEnrichmentGroups(stages.enrichment, usable, sampleType, preferred?.enrichment, enrichFormats);
      let stageTime = 0; let anyTime = false;
      for (const g of groups) {
        if (g.mode === "parallel") {
          if (g.options.some(o => o.timeHours == null)) estimated = true;
          for (const o of g.options) {
            if (o.timeHours != null) { stageTime = Math.max(stageTime, o.timeHours); anyTime = true; }
            if (o.productKey) activeMediaKeys.add(o.productKey); // parallel → all media used together
          }
        } else {
          if (g.chosen.timeHours == null) estimated = true;
          else { stageTime = Math.max(stageTime, g.chosen.timeHours); anyTime = true; }
          if (g.chosen.productKey) activeMediaKeys.add(g.chosen.productKey); // alternative → only the chosen medium
        }
      }
      if (anyTime) total += stageTime;
      chain.push({ key, chosen: groups[0]?.chosen ?? chosen, options: resolved, groups });
      continue;
    }

    if (chosen.timeHours != null) total += chosen.timeHours;
    if (chosen.timeEstimated || chosen.timeHours == null) estimated = true;
    chain.push({ key, chosen, options: resolved });
  }

  const pcrProd = PRODUCTS[stages.pcr.productKey];
  return {
    id: def.id, name: def.name, line: def.productLine, cat: def.catalogCode,
    detects: def.targets.map(normMicroId), technology: def.technology, sensitivity: def.sensitivity,
    description: { en: pcrProd ? pcrProd.description : null },
    keyAdvantages: def.keyAdvantages, features: def.features,
    comparison: COMPARISONS[def.id] ?? null,
    chain, totalTimeHours: Math.round(total * 100) / 100, timeEstimated: estimated,
    extraTargets: 0, _def: def,
  };
}

/** Sample types a protocol supports. Environmental requires a sampling stage (surface
 *  validation, cross-industry); Finished is offered whenever the kit has the downstream
 *  workflow (enrichment/extraction/pcr), which every kit does. */
export function protocolSampleTypes(def: ProtocolDef): SampleType[] {
  const out: SampleType[] = [];
  if (kitIsSurfaceValidated(def)) out.push("Environmental");
  out.push("Finished");
  return out;
}

// -----------------------------------------------------------------------------
// Exported data
// -----------------------------------------------------------------------------
export const INDUSTRIES: Industry[] = INDUSTRY_DEFS.map(i => ({ name: i.name, icon: INDUSTRY_ICONS[i.name] ?? Factory }));
export const MICROORGANISMS_LIST = MICROORGANISMS;
export const PROTOCOL_DEFS = PROTOCOLS;

export const MICRO_BY_ID: Record<string, Microorganism> = Object.fromEntries(
  MICROORGANISMS.flatMap(m => [[m.id, m], [normMicroId(m.id), m]] as const)
);
export const DEF_BY_ID: Record<string, ProtocolDef> = Object.fromEntries(PROTOCOLS.map(p => [p.id, p]));

export function getMicroorganismsForIndustry(industry: string | null): Microorganism[] {
  if (!industry) return [];
  const order: MicroorganismType[] = ["PATHOGEN", "INDICATOR", "SPOILAGE"];
  // Derive the selectable organisms from the REAL targets of the kits available in this
  // industry, not from a hand-maintained list. This keeps the picker in lockstep with the
  // catalog: every offered organism is detectable by some kit, and no detectable target is
  // missing. Matching is on the canonical (normalized) id so renamed/reformatted targets
  // still resolve to their microorganism entry.
  const seen = new Set<string>();
  const micros: Microorganism[] = [];
  for (const def of defsForIndustry(industry)) {
    for (const target of def.targets) {
      const m = MICRO_BY_ID[normMicroId(target)];
      if (m && !seen.has(m.id)) { seen.add(m.id); micros.push(m); }
    }
  }
  return micros.sort((a, b) => order.indexOf(a.type) - order.indexOf(b.type) || a.name.localeCompare(b.name));
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
  // Environmental (surface) only lists kits validated for surfaces (have a sampling stage in
  // at least one industry — cross-industry rule). Finished lists all kits in the industry.
  return defsForIndustry(industry)
    .filter(d => sampleType !== "Environmental" || kitIsSurfaceValidated(d))
    .map(d => resolveChain(d, undefined, sampleType, industry));
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
    .filter(d => [...req].every(t => d.targets.map(normMicroId).includes(t)))
    .map(d => {
      const p = resolveChain(d, undefined, sampleType, industry);
      p.extraTargets = d.targets.map(normMicroId).filter(t => !req.has(t)).length;
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
  sampling: "Sampling", enrichment: "Enrichment", mediumSupplement: "Medium Supplement",
  extraction: "Extraction", extractionSupplement: "Extraction Supplement", pcr: "PCR Detection",
};
export { STAGE_ORDER };

// -----------------------------------------------------------------------------
// Light validation — development only.
// -----------------------------------------------------------------------------
function validateData(): void {
  const problems: string[] = [];
  const microIds = new Set(MICROORGANISMS.map(m => normMicroId(m.id)));
  for (const p of PROTOCOLS) {
    for (const t of p.targets) if (!microIds.has(normMicroId(t))) problems.push(`protocols.ts: "${p.id}" targets unknown microorganism "${t}"`);
    if (p.targets.length === 0) problems.push(`protocols.ts: "${p.id}" has no targets`);
    const allKeys: string[] = [];
    for (const ind of Object.values(p.stagesByIndustry)) {
      for (const o of [...ind.sampling.options, ...ind.enrichment.options, ...ind.extraction.options]) allKeys.push(o.productKey);
      allKeys.push(ind.pcr.productKey);
    }
    for (const k of allKeys) if (k && !PRODUCTS[k]) problems.push(`protocols.ts: "${p.id}" references unknown productKey "${k}"`);

    // Enrichment groups: every productKey in a group must exist in that industry's enrichment
    // options, and (when groups are present) every option should belong to some group.
    for (const [indName, ind] of Object.entries(p.stagesByIndustry)) {
      const enr = ind.enrichment;
      if (!enr.groups || !enr.groups.length) continue;
      const optKeys = new Set(enr.options.map(o => o.productKey));
      const grouped = new Set<string>();
      for (const g of enr.groups) {
        for (const pk of g.productKeys) {
          grouped.add(pk);
          if (!optKeys.has(pk)) problems.push(`protocols.ts: "${p.id}" [${indName}] enrichment group "${g.id}" references medium "${pk}" not in options`);
        }
      }
      for (const o of enr.options) if (!grouped.has(o.productKey)) problems.push(`protocols.ts: "${p.id}" [${indName}] enrichment medium "${o.productKey}" is in no group (will default to alternative)`);
    }

    // Flag multi-medium enrichment kits that still lack explicit groups (need review).
    const maxMedia = Math.max(0, ...Object.values(p.stagesByIndustry).map(ind => new Set(ind.enrichment.options.map(o => o.productKey)).size));
    const hasGroups = Object.values(p.stagesByIndustry).some(ind => ind.enrichment.groups && ind.enrichment.groups.length);
    if (maxMedia >= 2 && !hasGroups) problems.push(`protocols.ts: "${p.id}" has ${maxMedia} enrichment media but no groups defined — verify parallel/alternative (defaulting to alternative)`);

    // Flag kits missing brochure or comparison content.
    if (!BROCHURES[p.id] || !BROCHURES[p.id].highlights || !BROCHURES[p.id].plant || !BROCHURES[p.id].lab)
      problems.push(`brochures.ts: "${p.id}" is missing brochure content (highlights/plant/lab)`);
    if (!COMPARISONS[p.id]) problems.push(`comparisons.ts: "${p.id}" is missing a comparison table`);
  }
  if (problems.length) {
    // eslint-disable-next-line no-console
    console.warn(`[WorkflowBuilder data] ${problems.length} issue(s):\n` + problems.map(p => "  • " + p).join("\n"));
  }
}
if (typeof process !== "undefined" && process.env && process.env.NODE_ENV !== "production") {
  try { validateData(); } catch { /* never break the app over validation */ }
}