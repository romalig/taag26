export type Solution = {
  id: string;
  name: string;
  module: "industrial" | "custom" | "digital" | "hubs";
  canonicalUrl: string;
  speed: number;      // A
  precision: number;  // B
  system: number;     // C
  keywords: string[];
  deliverables: string[];
  proof: string[];
};

export const SOLUTIONS: Solution[] = [
  {
    id: "industrial_microbiology",
    name: "Industrial Microbiology Solutions",
    module: "industrial",
    canonicalUrl: "/en/industrial-microbiology",
    speed: 5,
    precision: 4,
    system: 3,
    keywords: ["pathogen", "same-shift", "environmental", "release", "hold", "spoiler"],
    deliverables: [
      "Same-shift microbiological screening",
      "High-multiplex detection workflows",
      "Reduced time-to-decision for release or corrective action"
    ],
    proof: [
      "Results available in hours instead of days",
      "Multiple targets consolidated into a single workflow"
    ]
  },
  {
    id: "custom_molecular",
    name: "Customized Molecular Solutions (MILA™)",
    module: "custom",
    canonicalUrl: "/en/customized-molecular-solutions",
    speed: 3,
    precision: 5,
    system: 3,
    keywords: ["custom", "strain", "proprietary", "specific", "assay"],
    deliverables: [
      "Matrix- and strain-specific molecular assays",
      "Rapid development using AI-assisted design",
      "Validation in real industrial samples"
    ],
    proof: [
      "Development cycles reduced from months to weeks",
      "5× faster assay development versus traditional approaches"
    ]
  },
  {
    id: "digital_transformation",
    name: "Digital Transformation (TxA™)",
    module: "digital",
    canonicalUrl: "/en/digital-transformation",
    speed: 2,
    precision: 3,
    system: 5,
    keywords: ["trend", "recurring", "multi-site", "prevention", "program"],
    deliverables: [
      "Centralized microbiological intelligence",
      "Trend analysis across time and locations",
      "Preventive, data-driven microbiology programs"
    ],
    proof: [
      "Transforms results into release, hold, or corrective actions",
      "Supports proactive and preventive control strategies"
    ]
  },
  {
    id: "hubs",
    name: "TAAG Hubs",
    module: "hubs",
    canonicalUrl: "/en/hubs",
    speed: 3,
    precision: 4,
    system: 4,
    keywords: ["outsourcing", "lab", "ngs", "traceability", "services"],
    deliverables: [
      "Advanced molecular testing services",
      "NGS-based traceability and root cause analysis",
      "Local execution under global standards"
    ],
    proof: [
      "ISO/IEC 17025 accredited services",
      "Complex microbiology delivered close to operations"
    ]
  }
];