// =============================================================================
// workflowData.ts
// Single source of truth for all WorkflowBuilder content.
//
// HOW TO EDIT:
//   - Add industries      → push to INDUSTRIES array
//   - Add microorganisms  → push to MICROORGANISMS array
//   - Add products        → push into STAGE_PRODUCTS[stage].products
//   - Update protocol comparison data → edit protocol.comparison on each Product
//   - Update value brief  → edit product.valueBrief fields
//
// ARCHITECTURE NOTE:
//   When this file grows beyond ~10 products per stage or marketing needs to
//   edit without PRs, migrate content fields to a headless CMS (Sanity recommended).
//   The types below map 1:1 to what a Sanity schema would look like.
// =============================================================================

import {
  Milk, Drumstick, CupSoda, Utensils, Leaf, Globe, Factory,
  type LucideIcon
} from "lucide-react";

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------

export type MicroorganismType = "PATHOGEN" | "INDICATOR" | "SPOILAGE";

export interface Microorganism {
  id: string;
  name: string;
  type: MicroorganismType;
  /** Groups microorganisms into the same detection protocol flow */
  group: string;
}

export interface CompetitorRow {
  feature: string;
  taag: string;
  competitors: Record<string, string>; // key = competitor name
}

export interface ProtocolComparison {
  /** Shown in "Why TAAG wins" grid */
  highlights: {
    label: string;
    taag: string;
    industryAvg: string;
  }[];
  /** Competitor names shown as columns */
  competitorNames: string[];
  /** Rows of the comparison table */
  rows: CompetitorRow[];
}

export interface ValueBrief {
  advantages: string[];
  metrics: {
    label: string;
    value: string;
    sub: string;
  }[];
}

export type StageKey = "Sampling" | "Enrichment" | "Extraction" | "PCR";

export interface Product {
  id: string;
  name: string;
  cat: string;
  format: string;
  /** Time in hours for this product's stage */
  timeHours: number;
  desc: string;
  /** URL to the full technical data sheet */
  technicalDataUrl: string;
  valueBrief: ValueBrief;
  /** Protocol comparison data — shared at the protocol level, not per-product.
   *  Placed here for simplicity; if protocols diverge per-product, move to
   *  a separate PROTOCOLS record keyed by group. */
  protocolComparison?: ProtocolComparison;
}

export interface Stage {
  key: StageKey;
  label: string;
  products: Product[];
}

export interface Industry {
  name: string;
  icon: LucideIcon;
}

// -----------------------------------------------------------------------------
// DEFAULT PROTOCOL COMPARISON
// Used when a specific protocol doesn't override it.
// Replace values with real validated data before going to production.
// -----------------------------------------------------------------------------

const DEFAULT_PROTOCOL_COMPARISON: ProtocolComparison = {
  highlights: [
    { label: "Total time", taag: "26h avg.", industryAvg: "28–36h industry avg." },
    { label: "Sensitivity", taag: "1 CFU / sample", industryAvg: "10–100 CFU typical" },
    { label: "Multiplexing", taag: "Up to 4 targets / rxn", industryAvg: "1 target / rxn standard" },
  ],
  competitorNames: ["Neogen", "Hygiena"],
  rows: [
    { feature: "AOAC Certified",     taag: "✓",           competitors: { Neogen: "✓",      Hygiena: "Partial" } },
    { feature: "ISO 17025 Labs",     taag: "✓ (4 labs)",  competitors: { Neogen: "✓",      Hygiena: "✓"       } },
    { feature: "RNA Detection",      taag: "✓ AiGOR™",    competitors: { Neogen: "—",      Hygiena: "—"       } },
    { feature: "Multiplex (4-plex)", taag: "✓",           competitors: { Neogen: "2-plex", Hygiena: "1-plex"  } },
    { feature: "AI Primer Design",   taag: "✓ Mila™",     competitors: { Neogen: "—",      Hygiena: "—"       } },
    { feature: "Enrichment-free",    taag: "✓ (AiGOR™)",  competitors: { Neogen: "—",      Hygiena: "—"       } },
  ],
};

// -----------------------------------------------------------------------------
// DEFAULT VALUE BRIEF
// Replace with product-specific content before go-live.
// -----------------------------------------------------------------------------

const buildDefaultValueBrief = (timeHours: number): ValueBrief => ({
  advantages: [
    "ISO 17025-accredited manufacturing across 4 global labs (Santiago, Mexico City, Chicago, Brussels)",
    "AI-optimized primers via Mila™ platform — first-of-its-kind, patent pending",
    `Ultra-fast workflow: ${timeHours >= 1 ? timeHours + "h" : timeHours * 60 + " min"} for this stage alone`,
    "Seamless integration with TxA™ LIMS for automated result management and traceability",
    "Full technical support from TAAG's molecular biology experts included",
  ],
  metrics: [
    { label: "Time saved",   value: "Up to 40%", sub: "vs. conventional" },
    { label: "Sensitivity",  value: "1 CFU",     sub: "per sample"       },
    { label: "Reliability",  value: "99.8%",     sub: "specificity"      },
  ],
});

// -----------------------------------------------------------------------------
// INDUSTRIES
// To add an industry: push a new { name, icon } object.
// Icons must be imported from lucide-react at the top of this file.
// -----------------------------------------------------------------------------

export const INDUSTRIES: Industry[] = [
  { name: "Dairy",          icon: Milk      },
  { name: "Meat & Poultry", icon: Drumstick },
  { name: "Beverages",      icon: CupSoda   },
  { name: "Ready-to-Eat",   icon: Utensils  },
  { name: "Produce",        icon: Leaf      },
  { name: "Environmental",  icon: Globe     },
];

export const getFallbackIcon = (): LucideIcon => Factory;

// -----------------------------------------------------------------------------
// MICROORGANISMS
// To add a target: push a new Microorganism object.
// group must match an existing group string or a new one (creates a new flow).
// -----------------------------------------------------------------------------

export const MICROORGANISMS: Microorganism[] = [
  { id: "Sal",   name: "Salmonella spp.",    type: "PATHOGEN",  group: "Multiplex S+L"    },
  { id: "Lis",   name: "Listeria spp.",      type: "PATHOGEN",  group: "Multiplex S+L"    },
  { id: "Mon",   name: "L. monocytogenes",   type: "PATHOGEN",  group: "Multiplex S+L"    },
  { id: "Eco",   name: "E. coli O157:H7",    type: "PATHOGEN",  group: "E. coli Flow"     },
  { id: "Cro",   name: "Cronobacter spp.",   type: "PATHOGEN",  group: "Cronobacter Flow" },
  { id: "Ent",   name: "Enterobacteriaceae", type: "INDICATOR", group: "Indicators"       },
  { id: "Yeast", name: "Yeast & Molds",      type: "SPOILAGE",  group: "Spoilage"         },
];

// -----------------------------------------------------------------------------
// STAGE PRODUCTS
// Stages are ordered — the component uses this order for display and time calc.
// To add a stage: extend StageKey type above AND add a new Stage here.
// -----------------------------------------------------------------------------

export const STAGES: Stage[] = [
  {
    key: "Sampling",
    label: "Sampling",
    products: [
      {
        id: "s1",
        name: "TAAG S1 Swab Kit",
        cat: "30-0012",
        format: "100 swabs / box",
        timeHours: 0.25,
        desc: "Neutralizing buffer swab for 10x10 surfaces.",
        technicalDataUrl: "#",
        valueBrief: buildDefaultValueBrief(0.25),
        protocolComparison: DEFAULT_PROTOCOL_COMPARISON,
      },
      {
        id: "s2",
        name: "TAAG S2 Sponge",
        cat: "30-0015",
        format: "50 sponges / box",
        timeHours: 0.4,
        desc: "High-capacity sponge for large equipment.",
        technicalDataUrl: "#",
        valueBrief: buildDefaultValueBrief(0.4),
        protocolComparison: DEFAULT_PROTOCOL_COMPARISON,
      },
    ],
  },
  {
    key: "Enrichment",
    label: "Enrichment",
    products: [
      {
        id: "e1",
        name: "TAAG E24 Medium",
        cat: "20-0540",
        format: "500g dehydrated",
        timeHours: 24,
        desc: "Universal enrichment broth for rapid growth.",
        technicalDataUrl: "#",
        valueBrief: buildDefaultValueBrief(24),
        protocolComparison: DEFAULT_PROTOCOL_COMPARISON,
      },
      {
        id: "e2",
        name: "TAAG E-Fast",
        cat: "20-0900",
        format: "500g dehydrated",
        timeHours: 18,
        desc: "Accelerated medium for high-fat samples.",
        technicalDataUrl: "#",
        valueBrief: buildDefaultValueBrief(18),
        protocolComparison: DEFAULT_PROTOCOL_COMPARISON,
      },
    ],
  },
  {
    key: "Extraction",
    label: "Extraction",
    products: [
      {
        id: "x1",
        name: "TAAG X-Extract",
        cat: "10-0921",
        format: "96 extractions / kit",
        timeHours: 0.5,
        desc: "High-yield magnetic bead DNA/RNA isolation.",
        technicalDataUrl: "#",
        valueBrief: buildDefaultValueBrief(0.5),
        protocolComparison: DEFAULT_PROTOCOL_COMPARISON,
      },
      {
        id: "x2",
        name: "TAAG X-Quick",
        cat: "10-0100",
        format: "100 extractions / kit",
        timeHours: 0.2,
        desc: "5-minute thermal lysis protocol.",
        technicalDataUrl: "#",
        valueBrief: buildDefaultValueBrief(0.2),
        protocolComparison: DEFAULT_PROTOCOL_COMPARISON,
      },
    ],
  },
  {
    key: "PCR",
    label: "PCR",
    products: [
      {
        id: "p1",
        name: "TAAG Pathogen Kit",
        cat: "40-1120",
        format: "96 reactions / kit",
        timeHours: 1.5,
        desc: "Multiplex Real-Time PCR detection.",
        technicalDataUrl: "#",
        valueBrief: buildDefaultValueBrief(1.5),
        protocolComparison: DEFAULT_PROTOCOL_COMPARISON,
      },
    ],
  },
];

// -----------------------------------------------------------------------------
// DERIVED LOOKUP — used internally by WorkflowBuilder
// Do not edit. These are computed from the arrays above.
// -----------------------------------------------------------------------------

/** Flat map: productId → Product */
export const PRODUCT_BY_ID: Record<string, Product> = Object.fromEntries(
  STAGES.flatMap(s => s.products.map(p => [p.id, p]))
);

/** Stage key → Stage */
export const STAGE_BY_KEY: Record<string, Stage> = Object.fromEntries(
  STAGES.map(s => [s.key, s])
);

/** Default selected product per stage (first product of each stage) */
export const DEFAULT_SELECTED_IDS: Record<string, string> = Object.fromEntries(
  STAGES.map(s => [s.key, s.products[0].id])
);
