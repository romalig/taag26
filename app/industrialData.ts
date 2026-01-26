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
  { id: "General Spoilage", label: "General Spoilage" },
  { id: "Beverages", label: "Juices & Soft Drinks" },
  { id: "Brewing", label: "Brewing Quality" },
  { id: "Wine", label: "Wine & Enology" },
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
  "General Spoilage": [
    {
      title: "Total Spoilage Organisms",
      description: "Broad spectrum detection of yeast and mold to predict shelf-life stability.",
      targets: "Targets: 18S rRNA, bacterial 16S",
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