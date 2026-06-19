// =============================================================================
// briefData.ts — shared "Product Value Brief" builders.
// Pure functions that turn a resolved Protocol / stage option / bundle into the
// ValueBriefData consumed by <ProductBrief/>. Extracted from WorkflowBuilder so the
// Product Explorer (ProductCatalog) can open the SAME brief modal. No component state.
// =============================================================================
import { BROCHURES, PCR_TECH_DETAILS, AOAC_KIT_IDS } from "./data/brochures";
import { COMBINATION_BRIEFS, combinationKey } from "./data/combinationBriefs";
import { STAGE_LABELS, MICRO_BY_ID, formatTime, type Protocol, type ResolvedStageOption } from "./workflowData";
import { type ValueBriefData, type BriefTechDetail, type BriefRelated, type BriefRow } from "./ProductBrief";
import { PRODUCTS } from "./data/products";
import { heroImageForKit, heroImageForIndustry, heroImageForIndustries } from "./data/industryHeroImages";

// Turns a raw protocol target (e.g. "Escherichia_coli_O157_H7", "Lactobacillus_group_…")
// into a clean display name, so every kit can show a "Detected microorganisms" list even
// when the brochure doesn't curate one.
function humanizeTarget(t: string): string {
  let s = t;
  const gi = s.indexOf("_group_");           // collapse "X_group_<long list>" -> "X group"
  if (gi >= 0) s = s.slice(0, gi) + " group";
  s = s.replace(/_/g, " ").replace(/\s+/g, " ").trim();
  return s
    .replace(/\bEscherichia coli\b/g, "E. coli")
    .replace(/\bListeria monocytogenes\b/g, "L. monocytogenes")
    .replace(/\bStaphylococcus aureus\b/g, "S. aureus")
    .replace(/\bO157 H7\b/g, "O157:H7");
}
function targetsToDetected(targets?: string[]): string[] | null {
  return targets && targets.length ? targets.map(humanizeTarget) : null;
}

const STAGE_PURPOSE: Record<string, string> = {
  sampling: "Collects and stabilizes the sample for testing",
  enrichment: "Promotes target growth before detection",
  extraction: "Releases and purifies nucleic acids for PCR",
};

// Hero image (modal + PDF) is derived from the industries a kit serves (mainIndustries): its
// primary industry's image, or /foods.png when it spans >4 industries or declares none.
// The industry→image map and the rule live in ./data/industryHeroImages.
const DEFAULT_KIT_IMAGE = "/kit-placeholder.png";

// --- Time to results: every PCR brief shows it with an hours number, in highlights AND the comparison.
// Both are GAP-FILLED, not clobbered: a number is added only where one is missing, so curated values
// (e.g. AiGOR "3 h", "~26 h") are preserved. HIGHLIGHT_TIME_MODE tunes the highlight bullet —
//   "fill"  = add a time bullet only when the kit has none (default; keeps curated bullets);
//   "full"  = force a full-workflow time bullet, replacing any hand-written one;
//   "assay" = force a bullet using the PCR/AiGOR run time instead of the whole workflow;
//   "off"   = inject nothing into highlights.
const HIGHLIGHT_TIME_MODE: "fill" | "full" | "assay" | "off" = "fill";
// Matches a numeric time mention ("3 h", "~2.5 h", "95 min", "52 hours") in existing highlight text.
const TIME_RE = /(\d+(\.\d+)?\s*(h\b|hr|hour|min))|\bhours\b/i;

// Comparison rows for a protocol with the "Time to Result" cell guaranteed to carry an hours number
// (added if missing, filled if number-less, curated numbers preserved). Shared by the brief modal, the
// PDF and WorkflowBuilder's "How we compare" table, so the time is identical everywhere.
export function comparisonRowsForBrief(p: Protocol): BriefRow[] {
  const cmp = p.comparison;
  const pcr = p.chain.find(s => s.key === "pcr");
  const pcrHours = pcr?.chosen.timeHours ?? null;
  const timeH = p.totalTimeHours > 0 ? p.totalTimeHours : (pcrHours && pcrHours > 0 ? pcrHours : 0);
  const timeLabel = formatTime(timeH);
  const hasNum = (str: string | null | undefined) => /\d/.test(str ?? "");
  let rows: BriefRow[] = cmp ? cmp.rows.map(r => ({ ...r })) : [];
  if (timeH > 0) {
    const ti = rows.findIndex(r => /time to results?/i.test(r.feature ?? ""));
    if (ti < 0) rows = [{ feature: "Time to Result", taag: timeLabel, leadingPcr: null, traditional: null, businessImpact: "Complete sample-to-result workflow time." }, ...rows];
    else if (!hasNum(rows[ti].taag)) rows[ti] = { ...rows[ti], taag: timeLabel };
  }
  return rows;
}

export function briefFromProtocol(p: Protocol, industry: string | null): ValueBriefData {
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

  // --- Time to results (always numeric) ---
  const pcrHours = pcrStage?.chosen.timeHours ?? null;
  const timeH = p.totalTimeHours > 0 ? p.totalTimeHours : (pcrHours && pcrHours > 0 ? pcrHours : 0);
  const timeLabel = formatTime(timeH);

  // (a) Comparison rows — shared with WorkflowBuilder's "How we compare" modal.
  const comparisonRows = comparisonRowsForBrief(p);

  // (b) Highlights: add a numeric time bullet when none exists; then cap every kit at 4 cards.
  let highlights = broc?.highlights ?? [];
  if (HIGHLIGHT_TIME_MODE !== "off" && timeH > 0) {
    const hasTime = highlights.some(h => TIME_RE.test(h.title) || TIME_RE.test(h.subtitle));
    const forced = HIGHLIGHT_TIME_MODE === "full" || HIGHLIGHT_TIME_MODE === "assay";
    const label = HIGHLIGHT_TIME_MODE === "assay" ? formatTime(pcrHours && pcrHours > 0 ? pcrHours : timeH) : timeLabel;
    if (forced || !hasTime) {
      if (forced) highlights = highlights.filter(h => !TIME_RE.test(h.title) && !TIME_RE.test(h.subtitle));
      highlights = [{
        icon: "timer",
        title: `Results in ${label}`,
        subtitle: HIGHLIGHT_TIME_MODE === "assay" ? "Molecular run time" : "Time to results",
        pdfText: `The full workflow returns a result in about ${label.replace("~", "")}.`,
      }, ...highlights];
    }
  }
  // Every kit shows at most 4 highlight cards — drop extras after the time card is added.
  highlights = highlights.slice(0, 4);

  return {
    name: p.name,
    description: broc?.description ?? p.description.en,
    descriptionIsCustom: !!broc?.description,
    keyAdvantages: p.keyAdvantages,
    features: [],
    techDetails: tech,
    relatedProducts: related,
    presentations: pcrStage ? pcrStage.chosen.presentations : [],
    specs: {
      time: formatTime(p.totalTimeHours),
      sensitivity: p.sensitivity ? p.sensitivity.split("\n")[0] : "1 CFU",
      technology: p.technology ?? "Real-Time PCR",
    },
    detects: p.detects.length ? p.detects.map(id => MICRO_BY_ID[id]?.shortName ?? id).join(", ") : null,
    detectedList: broc?.detectedList ?? targetsToDetected(p._def?.targets),
    highlights,
    plant: broc?.plant ?? [],
    lab: broc?.lab ?? [],
    pdfPlant: broc?.pdfPlant,
    pdfLab: broc?.pdfLab,
    pdfDescription: broc?.pdfDescription,
    comparisonRows,
    isAigor: (p.technology ?? "").includes("AiGOR"),
    isAoac,
    isPcr: true,
    // Protocol selector passes the selected industry -> hero = that industry's image.
    // Products Explorer passes null -> hero = the kit's curated primary-industry image.
    heroImage: industry
      ? heroImageForIndustry(industry)
      : heroImageForKit(p.id, p._def.mainIndustries),
    // Use the curated brochure image when present (e.g. "/Elevia_29.png"); else fall back to the
    // catalog-code name. The modal/PDF add their own onError/placeholder when the file is missing.
    kitImage: broc?.kitImage ?? `/${p.id}.png`,
  };
}

export function briefFromStageOption(o: ResolvedStageOption): ValueBriefData {
  return {
    name: o.name,
    description: o.description,
    descriptionIsCustom: false,
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
    category: o.category,
    productLine: o.productLine,
    heroImage: heroImageForIndustries(PRODUCTS[o.productKey]?.mainIndustries ?? []),
    // Non-PCR kits follow the same naming as PCR (`/${catalogCode}.png`); fall back to the
    // placeholder when the option has no catalog code. Previously every non-PCR kit was hardcoded
    // to the placeholder, so none of their real images ever loaded.
    kitImage: o.cat ? `/${o.cat}.png` : DEFAULT_KIT_IMAGE,
  };
}

// When the stage has a parallel group (a "bundle" of media used together), build a COMBINED brief
// from data/combinationBriefs.ts: one description + key features explaining how the media work
// together, plus each member product's formats grouped under its own title. Returns null if the
// stage has no parallel media or no combination entry is defined for that set.
export function combinedBriefFromStage(rs: { groups?: { mode: string; options: ResolvedStageOption[]; chosen: ResolvedStageOption }[] }): ValueBriefData | null {
  const groups = rs.groups;
  if (!groups || groups.length === 0) return null;
  const parallel = groups.filter(g => g.mode === "parallel");
  if (parallel.length === 0) return null;
  // All media that run together: parallel media (always) + the CHOSEN medium of each alternative
  // group — i.e. exactly what resolveChain put in the workflow, not the group's first option.
  const memberOpts: ResolvedStageOption[] = [];
  const seen = new Set<string>();
  for (const g of groups) {
    const opts = g.mode === "parallel" ? g.options : [g.chosen];
    for (const o of opts) {
      if (o && o.productKey && !seen.has(o.productKey)) { seen.add(o.productKey); memberOpts.push(o); }
    }
  }
  if (memberOpts.length < 2) return null; // not actually a combination
  const key = combinationKey(memberOpts.map(o => o.productKey));
  const combo = COMBINATION_BRIEFS[key];
  if (!combo) return null;
  // Order the format groups by the combo's declared member order; fall back to encountered order.
  const byKey = new Map(memberOpts.map(o => [o.productKey, o]));
  const orderedKeys = combo.members.filter(k => byKey.has(k));
  for (const o of memberOpts) if (!orderedKeys.includes(o.productKey)) orderedKeys.push(o.productKey);
  const formatGroups = orderedKeys.map(k => {
    const o = byKey.get(k)!;
    return { name: o.name, presentations: o.presentations };
  });
  // Representative image for the combination: the first member's kit photo (no single combined photo exists).
  const firstCat = byKey.get(orderedKeys[0])?.cat;
  const comboIndustries = [...new Set(memberOpts.flatMap(o => PRODUCTS[o.productKey]?.mainIndustries ?? []))];
  return {
    name: combo.name,
    description: combo.description,
    descriptionIsCustom: false,
    keyAdvantages: [],
    features: combo.features,
    techDetails: [],
    relatedProducts: [],
    presentations: [],          // not used; formatGroups drives the formats section
    formatGroups,
    specs: null,
    detects: null,
    highlights: [],
    plant: [],
    lab: [],
    comparisonRows: [],
    isAigor: false,
    isPcr: false,
    category: combo.category,
    productLine: combo.productLine,
    heroImage: heroImageForIndustries(comboIndustries),
    kitImage: firstCat ? `/${firstCat}.png` : DEFAULT_KIT_IMAGE,
  };
}
