// lib/solutionFinderCatalog.ts

export type Solution = {
  id: string;
  name: string;
  category: "Kit" | "Service" | "Software";
  technology: string;
  timeToResult: string;
  deliverables: string[];
  proof: string[];
  keywords: string[];
  canonicalUrl: string;
  speed: number;
  precision: number;
  system: number;
};

export const SOLUTIONS: Solution[] = [
  {
    id: "elevia-aigor",
    name: "Elevia™ Kits (Powered by AiGOR™)",
    category: "Kit",
    technology: "AiGOR™ RNA-based Technology",
    timeToResult: "As little as 3 Hours",
    deliverables: [
      "Ultra-fast detection without traditional enrichment",
      "10,000-fold sensitivity increase vs standard PCR",
      "Validated on complex matrices (cocoa, spices, dairy)"
    ],
    proof: [
      "Eliminates enrichment steps for same-shift decisions",
      "Up to 8x faster than standard qPCR workflows"
    ],
    keywords: ["fast", "speed", "rapid", "enrichment", "urgent", "time", "hour", "salmonella", "listeria", "aigor"],
    canonicalUrl: "/products/elevia",
    speed: 1.0,
    precision: 0.9,
    system: 0.2
  },
  {
    id: "ampliora-multiplex",
    name: "Ampliora™ Multiplex Kits",
    category: "Kit",
    technology: "MILA™ AI-Designed PCR",
    timeToResult: "24 - 28 Hours",
    deliverables: [
      "Simultaneous detection of multiple pathogens (All-in-one)",
      "Operational cost reduction and labor efficiency",
      "Compatible with high-throughput automation"
    ],
    proof: [
      "AI-designed to prevent primer competition in multiplexing",
      "Higher productivity: Fewer reactions, more results"
    ],
    keywords: ["multiplex", "cost", "efficiency", "volume", "routine", "pcr", "productivity", "e. coli", "staphylococcus"],
    canonicalUrl: "/products/ampliora",
    speed: 0.6,
    precision: 0.8,
    system: 0.5
  },
  {
    id: "specio-spoilage",
    name: "Specio™ Spoilage Identification",
    category: "Kit",
    technology: "KAi™ Technology",
    timeToResult: "Same-day Identification",
    deliverables: [
      "Simultaneous identification of dozens of spoilage targets",
      "Early detection of Yeasts and Molds",
      "Prevention of flavor alteration and gas production"
    ],
    proof: [
      "Prevents market recalls due to late-stage spoilage",
      "Releases good product without false rejections"
    ],
    keywords: ["spoilage", "yeast", "mold", "shelf life", "quality", "flavor", "fermentation", "fungi", "specio"],
    canonicalUrl: "/products/specio",
    speed: 0.7,
    precision: 1.0,
    system: 0.3
  },
  {
    id: "txa-software",
    name: "TxA Software",
    category: "Software",
    technology: "AI Predictive Control",
    timeToResult: "Real-time Data",
    deliverables: [
      "Dynamic and predictive microbiological program",
      "Transforms raw lab data into operational decisions",
      "Seamless integration with Ampliora™ and Elevia™ kits"
    ],
    proof: [
      "From data to decision in real-time",
      "Proactive risk management across plant sites"
    ],
    keywords: ["software", "data", "management", "trend", "predictive", "digital", "control", "decision", "txa", "platform"],
    canonicalUrl: "/software/txa",
    speed: 0.5,
    precision: 0.5,
    system: 1.0
  },
  {
    id: "mila-custom",
    name: "MILA™ Custom Development",
    category: "Service",
    technology: "AI-Driven Assay Design",
    timeToResult: "Custom Timeline",
    deliverables: [
      "Rapid design of custom molecular kits",
      "Free validation on your specific matrices",
      "Development for proprietary strains or targets"
    ],
    proof: [
      "Intensive validation under real-world conditions",
      "The solution when off-the-shelf kits fall short"
    ],
    keywords: ["custom", "develop", "design", "strain", "specific", "unique", "matrix", "new target", "mila", "service"],
    canonicalUrl: "/services/mila",
    speed: 0.2,
    precision: 1.0,
    system: 0.4
  }
];