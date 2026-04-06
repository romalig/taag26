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
    description: "Detect Pathogens & Indicators in a single PCR reaction. Preventive control meets efficiency.",
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
export const PANEL_SOLUTIONS: Record<string, { id?: string; title: string; description: string; targets: string; technology?: string }[]> = {  
  "Pathogens": [
    {
      id: "specio-4-1", // <-- Conecta con SOLUTIONS_DATA["pathogen-control"]
      title: "Specio 4.1 Salmonella spp., L. monocytogenes, E. coli and S. aureus",
      description: "Multiplex real-time PCR kit for the simultaneous detection of Salmonella spp., S. aureus, E. coli and L. monocytogenes.",
      targets: "Salmonella spp., L.monocytogenes, E. coli, S. aureus",
      technology: "Kai"
    },
    {
      id: "pathogen-control", // <-- Conecta con SOLUTIONS_DATA["pathogen-control"]
      title: "Zero-Risk Internal EMP",
      description: "Allows food production facilities to bring pathogen testing in-house without the need for a BSL-2 laboratory using proprietary lysis inactivation.",
      targets: "Listeria spp. & Salmonella spp.",
      technology: "AiGOR"
    },
    {
      id: "tg-multiplex-pathogens", // <-- Conecta con SOLUTIONS_DATA["tg-multiplex-pathogens"]
      title: "TAAG F41 Multiplex Pathogens",
      description: "A comprehensive molecular diagnostic tool designed for the simultaneous detection of Salmonella spp., Listeria monocytogenes, and E. coli O157:H7.",
      targets: "Salmonella, L. mono, E. coli",
      technology: "MILA"
    },
    {
      id: "taag-e41-listeria", // <-- Conecta con SOLUTIONS_DATA["taag-e41-listeria"]
      title: "TAAG E41 Listeria species",
      description: "A highly sensitive assay dedicated to the detection of all Listeria species, designed specifically for environmental monitoring programs.",
      targets: "Listeria spp.",
      technology: "Kai"
    }
  ],
  "Spoilage": [
    {
      id: "total-spoilage",
      title: "Total Spoilage Organisms",
      description: "Broad spectrum detection of yeast and mold to predict shelf-life stability.",
      targets: "Targets: 18S rRNA, bacterial 16S",
      technology: "AiGOR",
    },
    {
      id: "Salmonella-spp",
      title: "Salmonella spp. Rapid Kit2",
      description: "Detect Salmonella in environmental sponges and raw materials with high sensitivity.",
      targets: "Target: invA gene",
      technology: "Real-Time PCR",
    },
    {
      id: "indicator-bacteria-count",
      title: "Indicator Bacteria Count",
      description: "Quantification of Total Aerobic Bacteria and Enterobacteriaceae.",
      targets: "Targets: TAB, Enteros",
      technology: "Real-Time PCR",
    },
  ],
  "Beverages": [
  ],
  "Brewing": [
  ],
  "Wine": [
  ],
};

export const WORKFLOW_STEPS = [
  {
    id: "intro",
    step: "The Ecosystem",
    title: "Ultra-fast RNA detection technology",
    description: "Same-shift results. Absolute confidence. Full productivity.",
    image: "/onebacteria3.png",
    mobileImage: "/onebacteria4-mobile.png",
    color: "bg-[#111111]",
    textColor: "text-white",
  },
  {
    id: "sample",
    step: "Step 01",
    title: "",
    description: "Deliver every product with absolute confidence.",
    image: "/food5.png",
    mobileImage: "/food5-mobile.png",
    color: "bg-[#F4F4F5]",
    textColor: "text-[#111111]",
  },
  {
    id: "extraction",
    step: "Step 02",
    title: "",
    description: "Obtain ultra-fast results from swabs and sponges, whether pre- or post-sanitization.",
    image: "/swabs7.png",
    mobileImage: "/swabs8-mobile.png",
    color: "bg-[#F4F4F5]",
    textColor: "text-[#111111]",
  },
  {
    id: "pcr",
    step: "Step 03",
    title: "Select your choice",
    description: "ZERO or XPRESS protocol.",
    image: "/zero6.png",
    mobileImage: "/zero7-mobile.png",
    color: "bg-[#F4F4F5]",
    textColor: "text-[#111111]",
  },
  {
    id: "interpretation",
    step: "Step 04",
    title: "",
    description: "Fast detection of Salmonella spp, Listeria spp, Enterobacteria, L. monocytogenes and more.",
    image: "/screen_TxA.png",
    mobileImage: "/screen_TxA-mobile.png",
    color: "bg-[#E6FFFA]",
    textColor: "text-[#111111]",
  },
  {
    id: "management",
    step: "Step 05",
    title: "Fast results for fast actions",
    description: "All our kits integrate seamlessly with TxA for advanced, AI-based protection.",
    image: "/bacterias6.png",
    mobileImage: "/bacterias-mobile.png",
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

export const SUCCESS_STORIES = [
  // 1. TARJETA HERO (Intacta, sin slug dinámico porque irá a su propia página)
  {
    id: "hero-case",
    client: "Environmental Testing",
    title: ">$200k savings/year per facility",
    metric: "In-house EMP testing powered by AiGOR technology",
    image: "/lab.png", 
    tags: ["Dairy", "Safety"],
    isHero: true, 
  },
  // 2. NUEVOS CASOS DINÁMICOS (Reemplazados)
  {
    id: "fast-salmonella-food",
    slug: "fast-salmonella-food",
    client: "Food Industry",
    title: "Fast control of Salmonella in the food industry",
    metric: "6 Hours",
    description: "Achieve actionable results and product release in just 6 hours, bypassing 24-48h enrichments.",
    image: "/Elevia_food5.png", 
    tags: ["Salmonella", "AiGOR"],
    isHero: false,
  },
  {
    id: "full-preventive-control",
    slug: "full-preventive-control",
    client: "Quality Control",
    title: "Full and Preventive Microbiological Control",
    metric: "All-in-One",
    description: "The world's only multiplex PCR solution that detects both pathogens and indicator microorganisms in a single reaction.",
    image: "/F41_bacterias.png",
    tags: ["Multiplex", "Preventive"],
    isHero: false,
  },
  {
    id: "broad-spectrum-spoilage",
    slug: "broad-spectrum-spoilage",
    client: "Beverage Industry",
    title: "Broad-Spectrum Spoilage Defense",
    metric: "< 24 Hrs",
    description: "Screen for spoilage yeast, mold, and bacteria in a single PCR run. Secure shelf-life with absolute molecular precision.",
    image: "/coca.png",
    tags: ["Beverages", "Spoilage"],
    isHero: false,
  },
  {
    id: "salmonella-ecoli-protection",
    slug: "salmonella-ecoli-protection",
    client: "Fresh Produce & Meat",
    title: "Protection against Salmonella and Pathogenic E. coli",
    metric: "3-in-1",
    description: "Simultaneous multiplex detection of Salmonella, E. coli O157:H7, and STEC in a single reaction.",
    image: "/lechuga.png",
    tags: ["Pathogens", "Multiplex"],
    isHero: false,
  },
];


