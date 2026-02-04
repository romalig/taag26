import { SolutionContent } from "../industrial/modals/SolutionTemplate";

export const SOLUTIONS_DATA: Record<string, SolutionContent> = {
  
  "pathogen-control": {
    title: "Zero-Risk Internal EMP",
    chips: ["Real-Time PCR", "AiGOR Technology", "Lysis Inactivation", "Multiplex Ready"],
    
    // --- DATOS PARA EL PDF ---
    description: [
      "The Zero-Risk Internal EMP kit allows food production facilities to bring pathogen testing in-house without the need for a BSL-2 laboratory.",
      "Utilizing proprietary lysis buffer technology, pathogens are inactivated immediately upon sampling."
    ],
    mainIndustries: [
      "Ready-to-Eat (RTE) Food Manufacturing",
      "Dairy Processing",
      "Meat & Poultry",
      "Environmental Monitoring Services"
    ],
    intendedUse: [
      "For the qualitative detection of Listeria spp. and Salmonella spp. in environmental samples (sponges, swabs) and liquid matrices."
    ],
    principle: [
      "The assay is based on Real-Time PCR technology. Samples are collected and lysed immediately, releasing DNA and inactivating the pathogen. The target DNA is amplified using specific primers and detected via fluorescent probes."
    ],
    limitations: [
      "This kit is for professional use only.",
      "Results should be interpreted by trained personnel.",
      "Positive results are presumptive and may require confirmation."
    ],
    
    // SPECS ESTRICTAS
    techSpecs: {
      targets: "Listeria spp. & Salmonella spp.",
      lod: "1 CFU / Sample",
      matrices: "Sponges, Swabs, Liquids",
      time: "< 3 Hours",
      technology: "Real-Time PCR (TaqMan®)",
      chemistry: "Hydrolysis Probes (5' Nuclease)",
      channels: "FAM (Listeria), HEX (Salmonella), ROX (Internal Control)",
      thermocyclers: "Bio-Rad CFX96, Applied Biosystems 7500, AriaMx",
      storage: "-20°C (Reagents), Room Temp (Buffer)",
      shelfLife: "12 Months from manufacturing",
      certifications: "AOAC-RI PTM (Pending)"
    },

    // --- DATOS PARA EL MODAL (Visual) ---
    advantages: ["No enrichment required", "Total pathogen inactivation", "No microbiologist needed"],
    
    pcrKits: [
      { cat: "TAAG-S11-100", name: "TxA Listeria/Salm", size: "100 Rxns", format: "Liquid", desc: "Multiplex PCR Mix" },
    ],
    supplies: [
       { cat: "TAAG-X20-BUF", name: "Lysis Buffer", size: "1 L", format: "Bottle", desc: "Inactivation Buffer" }
    ]
  },
  
  // Agregar más productos aquí...
};