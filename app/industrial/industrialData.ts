// data/industrialData.ts

export const FEATURED_SOLUTIONS = [
  {
    id: "pathogen-control",
    title: "Zero-Risk and Ultra-Fast Internal EMP Pathogen Testing",
    descriptionLeft: "Detect pathogens in < 3 hours without enrichment.",
    description: "Bring testing in-house with absolute safety and efficiency.",
    advantages: [
      "Zero Biohazard: No enrichment means no pathogen growth on-site.",
      "Fast Results: Results in hours rather than days.",
      "Instant Action: Shift from reactive waiting to same-day intervention.",
      "Cost Efficiency: Eliminate external lab fees and shipping delays.",
    ],
    image: "/2bacterias_verdes3.png",
    tags: ["EMP", "AiGOR"],
  },
  {
    id: "pathogen-control2",
    title: "Fast control of Salmonella in the food industry",
    description: "Same-shift results for Salmonella in environmental and food samples.",
    image: "/chocolate16.png",
    tags: ["Salmonella", "AiGOR"],
  },
  {
    id: "simultaneous-detection",
    title: "Multiplex Process Control",
    description: "Detect Pathogens & Indicators in a single reaction. Preventive control meets efficiency.",
    image: "/F41-9.png",
    tags: ["4-in-1", "Preventive"],
  },
  {
    id: "spoilage-detection",
    title: "Broad-Spectrum Spoilage Defense",
    description: "Screen for yeast, mold, and bacteria in a single run. Secure shelf-life with absolute molecular precision.",
    image: "/spoilage-5.png",
    tags: ["Spoilage", "Beverages"],
  },
  {
    id: "hygiene-monitoring",
    title: "Surface & Drain Hygiene Pro",
    description: "Quantitative tracking of hygiene indicators to prevent biofilm formation.",
    image: "/F39-3.png",
    tags: ["Hygiene", "Prevention"],
  },
  {
    id: "txa-integration",
    title: "All seamlessly integrated to TxA",
    description: "Ai platform to turn complex data into preventive action.",
    image: "/hims4.png",
    tags: ["TxA", "Software"],
  },
];

export const PANEL_CATEGORIES = [
  { id: "Pathogens", label: "Pathogens" },
  { id: "Spoilage", label: "Spoilage" },
  { id: "Beverages", label: "Juices & Soft Drinks" },
  { id: "Brewing", label: "Brewing Quality" },
  { id: "Wine", label: "Wine Quality" },
  { id: "Consumables", label: "Lab consumables" },
];

export const PANEL_SOLUTIONS: Record<string, { title: string; description: string; targets: string }[]> = {
  "Pathogens": [
    {
      title: "Salmonella spp. Rapid Kit",
      description: "Detect Salmonella in environmental sponges and raw materials with high sensitivity.",
      targets: "Target: invA gene",
    },
    {
      title: "Listeria monocytogenes Pro",
      description: "Specific identification of L. mono to prevent outbreaks in RTE foods.",
      targets: "Target: hlyA gene",
    },
    {
      title: "E. coli O157:H7 Screen",
      description: "Critical screening for pathogenic E. coli in meat and fresh produce.",
      targets: "Targets: stx1, stx2",
    },
  ],
  "Spoilage": [
    {
      title: "Total Spoilage Organisms",
      description: "Broad spectrum detection of yeast and mold to predict shelf-life stability.",
      targets: "Targets: 18S rRNA, bacterial 16S",
    },
    {
      title: "Salmonella spp. Rapid Kit",
      description: "Detect Salmonella in environmental sponges and raw materials with high sensitivity.",
      targets: "Target: invA gene",
    },
    {
      title: "Indicator Bacteria Count",
      description: "Quantification of Total Aerobic Bacteria and Enterobacteriaceae.",
      targets: "Targets: TAB, Enteros",
    },
  ],
  "Beverages": [
    {
      title: "Alicyclobacillus (TAB) Detect",
      description: "Prevent 'medicinal' off-flavors in juices caused by thermo-acidophilic bacteria.",
      targets: "Target: Guaiacol producers",
    },
    {
      title: "Osmophilic Yeast Panel",
      description: "Targeted detection of Zygosaccharomyces in high-sugar concentrates.",
      targets: "Targets: Z. rouxii, Z. bailii",
    },
  ],
  "Brewing": [
    {
      title: "Hop-Resistance Screen",
      description: "Identify bacteria capable of growing in hopped beers and spoiling flavor.",
      targets: "Targets: horA, horC genes",
    },
    {
      title: "Strict Anaerobes Detect",
      description: "Identification of obligate anaerobes detrimental to beer quality.",
      targets: "Targets: Megasphaera, Pectinatus",
    },
  ],
  "Wine": [
    {
      title: "Brettanomyces Guard",
      description: "Early warning system for Brettanomyces contamination in aging barrels.",
      targets: "Target: B. bruxellensis",
    },
    {
      title: "Acetic Acid Bacteria Flow",
      description: "Monitor volatile acidity producers during fermentation.",
      targets: "Targets: Acetobacter, Gluconobacter",
    },
  ],
};

// ... (al final del archivo data/industrialData.ts)

export const WORKFLOW_STEPS = [
  {
    id: "intro",
    step: "The Ecosystem",
    title: "End-to-End Microbiology",
    description: "Stop juggling multiple vendors. We provide the complete scientific chain—from the sampling tool to the digital report.",
    image: "/hero16.png", // Reusando hero para la intro
    color: "bg-[#111111]",
    textColor: "text-white",
  },
  {
    id: "sample",
    step: "Step 01",
    title: "Sampling",
    description: "Our kits work with standard sponges, swabs, and liquids. No complex pre-processing or enrichment required for most matrices.",
    image: "/muestreo5.png", // Placeholder visual
    color: "bg-[#F4F4F5]",
    textColor: "text-[#111111]",
  },
  {
    id: "extraction",
    step: "Step 02",
    title: "Short enrichment, if needed",
    description: "Simplified protocols designed for speed. Go from raw sample to high-quality DNA in minutes, not hours.",
    image: "/enrich4.png", // Placeholder visual
    color: "bg-[#F4F4F5]",
    textColor: "text-[#111111]",
  },
  {
    id: "pcr",
    step: "Step 03",
    title: "DNA/RNA extration",
    description: "The core of our technology. Detect multiple pathogens and indicators in a single reaction with maximum sensitivity.",
    image: "/extraccion1.png", // Imagen de kit PCR
    color: "bg-[#F4F4F5]",
    textColor: "text-[#111111]",
  },
  {
    id: "interpretation",
    step: "Step 04",
    title: "Real time PCR",
    description: "Eliminate human error. Our AI analyzes PCR curves instantly, giving you a clear Positive/Negative result.",
    image: "/PCR.png", // Placeholder visual
    color: "bg-[#E6FFFA]", // Un tono suave diferente para resaltar la AI
    textColor: "text-[#111111]",
  },
  {
    id: "management",
    step: "Step 05",
    title: "Automated results",
    description: "Your Digital Lab Manager. Organize results, track historical trends, and automate corrective actions in one platform.",
    image: "/laptop.png", // Imagen del software
    color: "bg-[#111111]", // Oscuro para cerrar con fuerza (Software)
    textColor: "text-white",
  },
];

// ... (al final de data/industrialData.ts)

export const LAB_SPECS = [
  {
    label: "Space Required",
    value: "3 m²",
    subtext: "Standard benchtop area",
    icon: "space"
  },
  {
    label: "Operators",
    value: "1 Person",
    subtext: "No specialized degree needed",
    icon: "users"
  },
  {
    label: "Setup Time",
    value: "< 48 Hrs",
    subtext: "Installation & Training",
    icon: "time"
  },
  {
    label: "Infrastructure",
    value: "Minimal",
    subtext: "Standard power & internet",
    icon: "plug"
  }
];