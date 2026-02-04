import { SolutionContent } from "../industrial/modals/SolutionTemplate";

export const SOLUTIONS_DATA: Record<string, SolutionContent> = {
  
  // --- CASO 1: EMP ---
  "pathogen-control": {
    title: "Zero-Risk Internal EMP",
    chips: ["Real-Time PCR", "AiGOR Technology", "Lysis Inactivation", "Multiplex Ready"],
    metrics: {
      targets: "Listeria spp. & Salmonella spp.",
      lod: "1 CFU / Sample",
      matrices: "Sponges, Swabs, Liquids",
      time: "< 3 Hours"
    },
    description: [
      "The Zero-Risk Internal EMP kit is designed to allow food production facilities to bring pathogen testing in-house without the need for a BSL-2 laboratory.",
      "Combined with the TxA platform and AiGOR analysis, this solution provides qualitative results in record time."
    ],
    advantages: ["No enrichment required", "Total pathogen inactivation", "High-throughput compatible"],
    specs: [
      { label: "Methodology", value: "Real-Time PCR" },
      { label: "Storage", value: "-20°C" }
    ],
    // AHORA CON NOMBRE
    pcrKits: [
      { cat: "TAAG-S11-100", name: "TxA Listeria spp.", size: "100 Rxns", format: "Liquid", desc: "Complete PCR mix for Listeria spp." },
      { cat: "TAAG-S11-500", name: "TxA Listeria spp. Pro", size: "500 Rxns", format: "Liquid", desc: "High-volume PCR mix." },
      { cat: "TAAG-S13-MPT", name: "TxA Salmonella Plate", size: "96 Rxns", format: "Plate", desc: "Pre-plated 96-well breakdown." },
    ],
    supplies: [
       { cat: "TAAG-X20-BUF", name: "Lysis Buffer X20", size: "1 Liter", format: "Bottle", desc: "Lysis Inactivation Buffer" },
       { cat: "TAAG-E10-KIT", name: "MagBeads DNA Kit", size: "96 Preps", format: "Kit", desc: "Magnetic Beads DNA Extraction" }
    ]
  },

  // --- CASO 2: EJEMPLO PARA EL CATÁLOGO ---
  "salmonella-spp-rapid": {
    title: "Salmonella spp. Rapid Kit",
    chips: ["PCR", "High Sensitivity", "Food Safety"],
    metrics: {
      targets: "Salmonella spp. (invA)",
      lod: "1 CFU / 25g",
      matrices: "Sponges, Raw Materials",
      time: "24 Hours"
    },
    description: [
      "Specific detection of Salmonella spp. using the invA gene target.",
      "Ideal for high-throughput labs needing reliable results."
    ],
    advantages: ["High specificity", "Inhibitor resistant", "Easy workflow"],
    specs: [
      { label: "Target", value: "invA gene" },
      { label: "Technology", value: "PCR" }
    ],
    pcrKits: [
      { cat: "SAL-RAP-100", name: "Salmonella Rapid Mix", size: "100 Rxns", format: "Liquid", desc: "Salmonella Rapid Mix" }
    ]
  }
};