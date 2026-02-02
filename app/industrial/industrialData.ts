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
    id: "fast Salmonella",
    title: "Fast control of Salmonella in the food industry",
    description: "Same-shift results for Salmonella in environmental and food samples.",
    image: "/chocolate16.png",
    tags: ["Salmonella", "AiGOR"],
  },
  {
    id: "F41",
    title: "Full and Preventive Microbiological Control",
    description: "Detect Pathogens & Indicators in a PCR single reaction. Preventive control meets efficiency.",
    image: "/F41-9.png",
    tags: ["4-in-1", "Preventive"],
  },
  {
    id: "spoilage-beverage",
    title: "Broad-Spectrum Spoilage Defense",
    description: "Screen for spoilage yeast, mold, and bacteria in a single PCR run. Secure shelf-life with absolute molecular precision.",
    image: "/spoilage-5.png",
    tags: ["Spoilage", "Beverages"],
  },
  {
    id: "F39",
    title: "Protection against Salmonella and Pathogenic E. coli",
    description: "One single workflow for simultaneous detection and identification of Salmonella and pathogenic E. coli",
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

// ACTUALIZACIÓN: Se agregó la propiedad 'technology' a la definición y a los objetos
export const PANEL_SOLUTIONS: Record<string, { title: string; description: string; targets: string; technology: string }[]> = {
  "Pathogens": [
    {
      title: "Salmonella spp. Rapid Kit",
      description: "Detect Salmonella in environmental sponges and raw materials with high sensitivity.",
      targets: "Target: invA gene",
      technology: "Real-Time PCR",
    },
    {
      title: "Listeria monocytogenes Pro",
      description: "Specific identification of L. mono to prevent outbreaks in RTE foods.",
      targets: "Target: hlyA gene",
      technology: "Real-Time PCR",
    },
    {
      title: "E. coli O157:H7 Screen",
      description: "Critical screening for pathogenic E. coli in meat and fresh produce.",
      targets: "Targets: stx1, stx2",
      technology: "Multiplex PCR",
    },
  ],
  "Spoilage": [
    {
      title: "Total Spoilage Organisms",
      description: "Broad spectrum detection of yeast and mold to predict shelf-life stability.",
      targets: "Targets: 18S rRNA, bacterial 16S",
      technology: "Multiplex PCR",
    },
    {
      title: "Salmonella spp. Rapid Kit",
      description: "Detect Salmonella in environmental sponges and raw materials with high sensitivity.",
      targets: "Target: invA gene",
      technology: "Real-Time PCR",
    },
    {
      title: "Indicator Bacteria Count",
      description: "Quantification of Total Aerobic Bacteria and Enterobacteriaceae.",
      targets: "Targets: TAB, Enteros",
      technology: "Real-Time PCR",
    },
  ],
  "Beverages": [
    {
      title: "Alicyclobacillus (TAB) Detect",
      description: "Prevent 'medicinal' off-flavors in juices caused by thermo-acidophilic bacteria.",
      targets: "Target: Guaiacol producers",
      technology: "Real-Time PCR",
    },
    {
      title: "Osmophilic Yeast Panel",
      description: "Targeted detection of Zygosaccharomyces in high-sugar concentrates.",
      targets: "Targets: Z. rouxii, Z. bailii",
      technology: "Real-Time PCR",
    },
  ],
  "Brewing": [
    {
      title: "Hop-Resistance Screen",
      description: "Identify bacteria capable of growing in hopped beers and spoiling flavor.",
      targets: "Targets: horA, horC genes",
      technology: "Multiplex PCR",
    },
    {
      title: "Strict Anaerobes Detect",
      description: "Identification of obligate anaerobes detrimental to beer quality.",
      targets: "Targets: Megasphaera, Pectinatus",
      technology: "Real-Time PCR",
    },
  ],
  "Wine": [
    {
      title: "Brettanomyces Guard",
      description: "Early warning system for Brettanomyces contamination in aging barrels.",
      targets: "Target: B. bruxellensis",
      technology: "Real-Time PCR",
    },
    {
      title: "Acetic Acid Bacteria Flow",
      description: "Monitor volatile acidity producers during fermentation.",
      targets: "Targets: Acetobacter, Gluconobacter",
      technology: "Real-Time PCR",
    },
  ],
};

export const WORKFLOW_STEPS = [
  {
    id: "intro",
    step: "The Ecosystem",
    title: "Ultra-fast RNA detection technology",
    description: "Same-shift results. Absolute confidence. Stop contamination early and take instant corrective action.",
    color: "bg-[#111111]",
    textColor: "text-white",
  },
  {
    id: "sample",
    step: "Step 01",
    title: "",
    description: "Deliver every product with absolute confidence.",
    color: "bg-[#F4F4F5]",
    textColor: "text-[#111111]",
  },
  {
    id: "extraction",
    step: "Step 02",
    title: "Instant hygiene verification",
    description: "Obtain ultra-fast results from swabs and sponges, whether pre- or post-sanitization.",
    color: "bg-[#F4F4F5]",
    textColor: "text-[#111111]",
  },
  {
    id: "pcr",
    step: "Step 03",
    title: "Select your choice",
    description: "ZERO or XPRESS protocol.",
    color: "bg-[#F4F4F5]",
    textColor: "text-[#111111]",
  },
  {
    id: "interpretation",
    step: "Step 04",
    title: "Pathogens & Indicators",
    description: "Fast detection of Salmonella spp, Listeria spp, Enterobacteria, L.monocytogenes and more.",
    color: "bg-[#E6FFFA]",
    textColor: "text-[#111111]",
  },
  {
    id: "management",
    step: "Step 05",
    title: "Fast results for fast actions",
    description: "All our kits integrate seamlessly with TxA for advanced, AI-based protection.",
    color: "bg-[#111111]",
    textColor: "text-white",
  },
];

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

// data/industrialData.ts

// ... (Tus otros exports: FEATURED_SOLUTIONS, PANEL_CATEGORIES, etc.)

export const SUCCESS_STORIES = [
  {
    id: "hero-case",
    client: "Global Dairy Leader",
    title: "Zero Salmonella in < 24 Hours",
    metric: "99% Faster Release",
    description: "How a top-tier dairy producer replaced traditional culture methods (5 days) with TAAG's workflow to achieve same-day product release, eliminating warehousing bottlenecks.",
    image: "/onebacteria3.png", // Imagen impactante para la tarjeta ancha
    tags: ["Dairy", "Safety"],
    isHero: true, 
  },
  {
    id: "case-1",
    client: "Major Beverage Brand",
    title: "Preventing Spoilage Recalls",
    metric: "$2M Saved",
    description: "Implementation of Alicyclobacillus detection at the filling line prevented a massive recall campaign.",
    image: "/hero16.png", 
    tags: ["Beverages", "Savings"],
    isHero: false,
  },
  {
    id: "case-2",
    client: "Meat Processing Plant",
    title: "Digital Hygiene Tracking",
    metric: "100% Paperless",
    description: "Transitioned 5 facilities from manual logbooks to TxA software, allowing real-time sanitation monitoring.",
    image: "/laptop.png",
    tags: ["Meat", "Digitalization"],
    isHero: false,
  },
  {
    id: "case-3",
    client: "Craft Brewery Network",
    title: "Hop-Resistance Screening",
    metric: "Zero Spoilage",
    description: "Routine screening for horA/horC genes ensured consistent flavor profiles and prevented cross-contamination.",
    image: "/food.png",
    tags: ["Brewing", "Quality"],
    isHero: false,
  },
  {
    id: "case-4",
    client: "Fruit Exporter",
    title: "Listeria Environmental Control",
    metric: "3x Coverage",
    description: "Expanded testing points by 300% without increasing budget thanks to our high-efficiency multiplex protocols.",
    image: "/swabs.png",
    tags: ["Produce", "Efficiency"],
    isHero: false,
  },
];