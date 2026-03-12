// data/solutionsData.ts

import { SolutionContent } from "../industrial/modals/types";

export const SOLUTIONS_DATA: Record<string, SolutionContent> = {
  
  "pathogen-control": {
    title: "Zero-Risk Internal EMP",
    version: "01-Jan. 10, 2026",
    chips: ["Real-Time PCR", "AiGOR Technology", "Lysis Inactivation", "Multiplex Ready"],
    description: [
      "The Zero-Risk Internal EMP kit allows food production facilities to bring pathogen testing in-house without the need for a BSL-2 laboratory.",
      "Utilizing proprietary lysis buffer technology, pathogens are inactivated immediately upon sampling, eliminating contamination risks and allowing safe transport and processing."
    ],
    mainIndustries: [
      "Ready-to-Eat (RTE) Food Manufacturing",
      "Dairy and Egg Processing",
      "Meat & Poultry",
      "Environmental Monitoring Services"
    ],
    intendedUse: [
      "Qualitative detection and identification of Listeria spp. and Salmonella spp. in environmental samples (sponges, swabs) and liquid matrices.",
      "Intended for use directly in food production plants and microbiological laboratories of low complexity, avoiding the need for specialized biosafety infrastructure."
    ],
    principle: [
      "The assay is based on Real-Time PCR technology coupled with a zero-risk sample preparation. Samples are collected and lysed immediately using TAAG's proprietary buffer, releasing DNA and completely inactivating the pathogen.",
      "The target DNA is amplified using specific primers and detected via fluorescent probes. The unique melting curve signatures are automatically interpreted by TxA software."
    ],
    limitations: [
      "This kit is validated specifically for environmental swabs and sponges without pre-enrichment. Not recommended for highly complex food matrices without prior consultation.",
      "Presence of high concentrations of certain industrial sanitizers may require specific neutralization steps during sampling using Collectio 1 devices."
    ],
    techSpecs: {
      targets: "Listeria spp. & Salmonella spp.",
      lod: "Surface samples: 1 CFU / 100 cm2",
      matrices: "Stainless steel, plastic, ceramic surfaces, and liquids",
      time: "Total Time: < 3 Hours",
      technology: "Real-Time PCR (TaqMan®) with Lysis Inactivation",
      chemistry: "Hydrolysis Probes (5' Nuclease)",
      channels: "FAM (Listeria), HEX (Salmonella), ROX (Internal Control)",
      thermocyclers: "Agilent AriaMx, Bio-Rad CFX96, Chai Open qPCR",
      storage: "-25°C to -15°C (Reagents), Room Temp (Lysis Buffer)",
      shelfLife: "12 Months from manufacturing (Protect from light)",
      certifications: "Manufactured under ISO 13485:2016\nAOAC-RI PTM (Pending)"
    },
    advantages: [
      "No traditional enrichment required.",
      "Total pathogen inactivation at the sampling point.",
      "No dedicated microbiologist or BSL-2 lab needed.",
      "Seamless integration with TxA platform for automatic interpretation."
    ],
    pcrKits: [
      { cat: "TAAG-S11-100", name: "TxA Listeria/Salm - Tube format", size: "100 reactions", format: "Tube", desc: "• 4 Tubes of Master mix\n• 4 Tubes of Primer mix\n• Positive & Negative controls" },
      { cat: "TAAG-S11-SPID", name: "TxA Listeria/Salm - SPID format", size: "96 reactions", format: "SPID", desc: "• 12 preloaded PCR strips with lyophilized reagents\n• Positive & Negative controls" }
    ],
    supplies: [
       { cat: "TAAG-X20-BUF", name: "TAAG Inactivation Lysis Buffer", size: "1 L", format: "Bottle", desc: "Proprietary buffer for immediate DNA release and pathogen neutralization." },
       { cat: "V-TB09", name: "Collectio 1 Neutro Sampling", size: "100 reactions", format: "Tube", desc: "Device for collecting, neutralizing and transporting surface samples." }
    ]
  },

  "tg-multiplex-pathogens": {
    title: "TAAG F41 Multiplex Pathogens",
    version: "02-Feb. 15, 2026",
    chips: ["Multiplex PCR", "Food Safety", "Pathogen Detection"],
    description: [
      "The TAAG F41 Multiplex Pathogens kit is a comprehensive molecular diagnostic tool designed for the simultaneous detection of Salmonella spp., Listeria monocytogenes, and E. coli O157:H7.",
      "By combining three critical pathogen targets into a single reaction, laboratories can significantly reduce hands-on time, reagent costs, and overall time-to-result, without compromising sensitivity or specificity."
    ],
    mainIndustries: [
      "Dairy",
      "Egg products",
      "Meat & Poultry",
      "Ready to eat",
      "Sauces & Condiments"
    ],
    intendedUse: [
      "Qualitative detection and identification of Salmonella spp., Listeria monocytogenes, and E. coli O157:H7 in validated matrices, including stainless steel, pasteurized milk, and raw meats.",
      "Intended for use in food safety laboratories, food production plants and microbiological laboratories of low or high complexity."
    ],
    principle: [
      "Detection is performed through multiplex real-time PCR followed by melting curve analysis.",
      "During this process, PCR amplicons are gradually denatured as temperature increases, generating characteristic melting profiles based on sequence-specific thermal stability.",
      "These profiles enable the differentiation of microorganisms by comparing their unique melting curve signatures, which are automatically interpreted by TxA software."
    ],
    limitations: [
      "Strict compliance with TAAG enrichment protocols using Augmentis media is required for guaranteed LOD.",
      "For use with other matrices, TAAG may provide scientific support or perform validation upon request.",
      "All TAAG Technologies PCR kits have undergone in silico inclusivity and exclusivity analyses using publicly available genomic databases."
    ],
    techSpecs: {
      targets: "Salmonella spp., L. monocytogenes, E. coli O157:H7",
      lod: "Food samples: 1 CFU/25g | Surface samples: 1 CFU/100 cm2",
      matrices: "Meats, Dairy, Surfaces, Water, Leafy greens",
      time: "PCR: 120 minutes (Plus enrichment)",
      technology: "Real-Time PCR with Melt Curve Analysis - KAI TM",
      chemistry: "Intercalating Fluorophore & TaqMan® Probes",
      channels: "FAM, HEX, ROX",
      thermocyclers: "Agilent AriaMx and Chai Open qPCR",
      storage: "-25°C to -15°C (Protect from direct light)",
      shelfLife: "SPID: 9 months\nTube: 12 months",
      certifications: "Manufactured under ISO 13485:2016",
    },
    advantages: [
      "Replaces three separate tests with one highly efficient reaction.",
      "Ready-to-use SPID format available to minimize pipetting errors.",
      "Seamless integration with TxA platform for automatic interpretation."
    ],
    pcrKits: [
      { cat: "V-FP04-1", name: "TAAG F41 Pathogens - Tube", size: "96 reactions", format: "Tube", desc: "• 4 Tubes of Master mix\n• 4 Tubes of Primer mix\n• 1 Tube of DNA Polymerase\n• Positive & Negative controls" },
      { cat: "V-FP04-2", name: "TAAG F41 Pathogens - SPID", size: "96 reactions", format: "SPID", desc: "• 12 preloaded PCR strips\n• Positive & Negative controls" }
    ],
    supplies: [
      { cat: "V-TB09", name: "Collectio 1 Neutro Sampling", size: "100 reactions", format: "Tube", desc: "Device for collecting, neutralizing and transporting surface samples." },
      { cat: "V-FP09", name: "Augmentis 41 Universal Pathogens", size: "500 g", format: "Powder", desc: "Enrichment medium for E. coli, Salmonella spp., and L. monocytogenes." },
      { cat: "V-EQ19", name: "Nucleia 2 Tez-Q Plus", size: "96 reactions", format: "Tube", desc: "Bacterial DNA extraction kit for complex matrices with high concentration of PCR inhibitors." }
    ]
  },

  "taag-e41-listeria": {
    title: "TAAG E41 Listeria species",
    version: "03-Mar. 05, 2026",
    chips: ["Real-Time PCR", "Environmental", "Listeria spp."],
    description: [
      "A highly sensitive and rapid molecular assay dedicated to the precise detection of all Listeria species, designed specifically for environmental monitoring programs in food processing facilities."
    ],
    mainIndustries: [
      "Dairy",
      "Ready to eat",
      "Facility Sanitation",
      "Meat & Poultry"
    ],
    intendedUse: [
      "Qualitative detection and identification of Listeria spp. in validated environmental matrices, including stainless steel, plastic, and ceramic surfaces.",
      "Intended for use in food safety laboratories, food production plants and microbiological laboratories to monitor facility hygiene."
    ],
    principle: [
      "Detection is performed through real-time PCR amplification using species-specific highly conserved genetic markers for the Listeria genus.",
      "PCR amplicons generate characteristic fluorescent signals that are continuously monitored and automatically interpreted by TxA software to prevent human error."
    ],
    limitations: [
      "Presence of high concentrations of quaternary ammonium compounds or other sanitizers may require specific neutralization steps during sampling.",
      "This kit has been validated only for the sample matrices indicated in the Intended Use section."
    ],
    techSpecs: {
      targets: "Listeria spp. (Genus wide)",
      lod: "Surface samples: 1 CFU / 100 cm2",
      matrices: "Environmental Sponges/Swabs (Stainless steel, plastic, rubber)",
      time: "PCR: 120 minutes (Total time 22 hours incl. enrichment)",
      technology: "Real-Time PCR",
      chemistry: "Intercalating Fluorophore / TaqMan® Probes",
      channels: "FAM",
      thermocyclers: "Agilent AriaMx and Chai Open qPCR",
      storage: "-25°C to -15°C (Protect from direct light)",
      shelfLife: "SPID: 9 months\nTube: 12 months",
      certifications: "Manufactured under ISO 13485:2016",
    },
    advantages: [
      "Overcomes background flora interference typical in environmental samples.",
      "Streamlined 1-step enrichment process using Augmentis 13.",
      "Seamless integration with TxA platform for automatic interpretation."
    ],
    pcrKits: [
      { cat: "V-FE01-T", name: "TAAG E41 Listeria - Tube", size: "96 reactions", format: "Tube", desc: "• 4 Tubes of Master mix\n• 4 Tubes of Primer mix\n• Positive & Negative controls" },
      { cat: "V-FE01-S", name: "TAAG E41 Listeria - SPID", size: "96 reactions", format: "SPID", desc: "• 12 preloaded PCR strips\n• Positive & Negative controls" }
    ],
    supplies: [
      { cat: "V-TB09", name: "Collectio 1 Neutro Sampling", size: "100 reactions", format: "Tube", desc: "Device for collecting, neutralizing and transporting surface samples." },
      { cat: "V-FP15", name: "Augmentis 13 Universal Listeria", size: "500 g", format: "Powder", desc: "Dehydrated selective enrichment medium for growth of Listeria spp." }
    ]
  },

  "specio-4-1": {
    title: "Specio 4.1 Salmonella spp., L. monocytogenes, E. coli and S. aureus",
    version: "01-Nov. 03, 2025",
    certImage: "/AOAC.png",
    chips: ["Multiplex Real-Time PCR", "Melt Curve Analysis", "Food Safety"],
    description: [
      "Multiplex real-time PCR kit for the simultaneous detection of Salmonella spp., S. aureus, E. coli and L. monocytogenes."
    ],
    mainIndustries: [
      "Dairy",
      "Egg products",
      "Fresh & Processed products",
      "Meat & Poultry",
      "Ready to eat",
      "Sauces & Condiments"
    ],
    intendedUse: [
      "Qualitative detection and identification of Salmonella spp., Staphylococcus aureus, Escherichia coli and Listeria monocytogenes in validated matrices, including stainless steel surface samples, pasteurized 2% fat liquid milk and leafy green (lettuce).",
      "Intended for use in in food safety laboratories, food production plants and microbiological laboratories of low or high complexity."
    ],
    principle: [
      "Detection is performed through multiplex real-time PCR followed by melting curve analysis.",
      "During this process, PCR amplicons are gradually denatured as temperature increases, generating characteristic melting profiles based on sequence-specific thermal stability.",
      "These profiles enable the differentiation of microorganisms by comparing their unique melting curve signatures, which are automatically interpreted by TxA software."
    ],
    limitations: [
      "This kit has been validated only for the sample matrices indicated in the Intended Use section.",
      "For use with other matrices, TAAG may provide scientific support or perform validation upon request.",
      "All TAAG Technologies PCR kits have undergone in silico inclusivity and exclusivity analyses using publicly available genomic databases.",
      "For details on validations or in silico analyses, contact your TAAG representative or distributor.",
    ],
    techSpecs: {
      targets: "Salmonella spp., S. aureus, E. coli and L. monocytogenes",
      lod: "Food: 1 CFU/25g | Surfaces: 1 CFU/100 cm2",
      matrices: "Stainless steel surfaces, pasteurized milk, leafy greens",
      time: "PCR: 120 minutes",
      technology: "Real-Time PCR with Melt Curve Analysis - KAI TM",
      chemistry: "Intercalating Fluorophore",
      channels: "FAM",
      thermocyclers: "Agilent AriaMx and Chai Open qPCR",
      storage: "-25°C and -15°C (Protect from light)",
      shelfLife: "SPID: 9 months\nTube: 12 months",
      certifications: "Manufactured under an ISO 13485:2016 certified quality management system.\n\nCertified by AOAC by extension of License Number 072101",
    },
    advantages: [
      "Simultaneous detection of 4 critical targets.",
      "AOAC Performance Tested Research Institute Certification.",
      "Seamless integration with TxA platform for automatic interpretation."
    ],
    pcrKits: [
      { cat: "V-SF30", name: "Specio 4.1 - Tube format", size: "96 reactions", format: "Tube", desc: "• 4 Tubes of Master mix Specio 4.1 – 297 µL\n• 4 Tubes of Primer mix Specio 4.1 - 330 µL\n• 1 Tube of DNA Polymerase - 21 µL\n• 1 Tube of Positive control Pathogens F - 100 µL\n• 1 Tube of Negative control - 352 µL" },
      { cat: "V-SF42", name: "Specio 4.1 - SPID format", size: "96 reactions", format: "SPID", desc: "• 12 preloaded PCR strips\n• 1 Tube of Positive control Pathogens F - 100 µL\n• 1 Tube of Negative control - 352 µL" },
      { cat: "V-SF95", name: "Specio 4.1 - SPID format", size: "480 reactions", format: "SPID", desc: "• 60 preloaded PCR strips\n• 5 Tubes of Positive control Pathogens F - 100 µL\n• 5 Tubes of Negative control - 352 µL" },
    ],
    supplies: [
      { cat: "V-TB09", name: "Collectio 1 Neutro Sampling", size: "100 reactions", format: "Tube", desc: "Device for collecting, neutralizing and transporting surface samples." },
      { cat: "V-FP15", name: "Augmentis 13 Universal Listeria", size: "500 g", format: "Powder", desc: "Dehydrated selective enrichment medium for growth of Listeria spp. in food samples." },
      { cat: "V-FP08", name: "Augmentis 31 Universal Surfaces", size: "500 g", format: "Powder", desc: "Enrichment medium for the growth of Staphylococcus aureus, Escherichia coli and Listeria monocytogenes in surface samples." },
      { cat: "V-FP09", name: "Augmentis 41 Universal Pathogens", size: "500 g", format: "Powder", desc: "Enrichment medium for the growth of Staphylococcus aureus, Escherichia coli, Salmonella spp., and Listeria monocytogenes." },
      { cat: "V-FP25", name: "Augmentis 91 BPW", size: "500 g", format: "Powder", desc: "Enrichment culture medium for the non-selective growth of microorganisms in food and environmental samples." },
      { cat: "V-EQ19", name: "Nucleia 2 Tez-Q Plus", size: "96 reactions", format: "Tube", desc: "Bacterial DNA extraction kit for complex matrices with high concentration of PCR inhibitors." }
    ]
  }

};