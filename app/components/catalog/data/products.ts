// products.ts — EDIT BY HAND. Product master data, regenerated from the source workbook
// (Base de Datos Detección). One entry per logical product; presentations (formats/sizes/
// catalog codes) grouped in presentations[]. Protocols reference products by `key`.
//
//   presentations: ordered RTU/SPID-first. Each: catalogCode, format, size, kitContent,
//     isReadyToUse, plus optional pcrTimeMin/incubationTimeH/shelfLifeMonths/storeTemp/dye.
//   key starting with "unlisted_" = referenced in a protocol row but absent from the
//     Product Master List (no catalog data) — review.

export interface ProductPresentation {
  catalogCode: string | null;
  format: string | null;
  size: string | null;
  kitContent: string | null;
  isReadyToUse: boolean;
  pcrTimeMin?: string | null;
  incubationTimeH?: string | null;
  shelfLifeMonths?: string | null;
  storeTemp?: string | null;
  dye?: string | null;
}
export interface ProductDef {
  key: string;
  name: string;
  category: string | null;
  productLine: string | null;
  description: string | null;
  features: string[];   // key features for the product card / value brief
  mainIndustries: string[];   // finished-product industries; [] = no industry (surface-only / universal) -> shown in all industries in the catalog
  presentations: ProductPresentation[];
}

export const PRODUCTS: Record<string, ProductDef> = {
  "ampliora_1_1_salmonella_spp": {
    "key": "ampliora_1_1_salmonella_spp",
    "name": "Ampliora 1.1 Salmonella spp.",
    "category": "PCR Kit",
    "productLine": "Ampliora",
    "description": "Real-time PCR kit for routine, reliable detection of Salmonella spp. — a simple single-target workflow for everyday pathogen control.",
    "presentations": [
      {
        "catalogCode": "V-SF97",
        "format": "SPID",
        "size": "96 reactions",
        "kitContent": "• 12 Preloaded PCR strips\n• 1 Tube of 1.1 Positive control – 100 µL\n• 1 Tube of Negative control – 352 µL",
        "isReadyToUse": true,
        "pcrTimeMin": "100",
        "incubationTimeH": "-",
        "shelfLifeMonths": "9",
        "storeTemp": "-25°C to -15°C",
        "dye": "FAM and HEX"
      }
    ],
    "features": [],
    "mainIndustries": [
      "Confectionery",
      "Egg Products",
      "Fresh & Processed Produce",
      "Meat and Poultry",
      "Nutraceutical",
      "Pet Food & Animal Feed",
      "Ready-to-eat",
      "Sauces and condiments",
      "Seafood"
    ]
  },
  "ampliora_1_3_e_coli": {
    "key": "ampliora_1_3_e_coli",
    "name": "Ampliora 1.3 E. coli",
    "category": "PCR Kit",
    "productLine": "Ampliora",
    "description": "Real-time PCR kit for routine detection of Escherichia coli — a straightforward single-target workflow for everyday pathogen control.",
    "presentations": [
      {
        "catalogCode": "V-SF69",
        "format": "SPID",
        "size": "96 reactions",
        "kitContent": "• 12 Preloaded PCR strips\n• 1 Tube of Pathogens F Positive control – 100 µL\n• 1 Tube of Negative control – 352 µL",
        "isReadyToUse": true,
        "pcrTimeMin": "100",
        "incubationTimeH": "-",
        "shelfLifeMonths": "9",
        "storeTemp": "-25°C to -15°C",
        "dye": "HEX and ROX"
      }
    ],
    "features": [],
    "mainIndustries": [
      "Confectionery",
      "Fresh & Processed Produce",
      "Meat and Poultry",
      "Nutraceutical",
      "Pet Food & Animal Feed",
      "Ready-to-eat",
      "Seafood"
    ]
  },
  "ampliora_2_10_acb_plus_guaiacol_producing_gene": {
    "key": "ampliora_2_10_acb_plus_guaiacol_producing_gene",
    "name": "Ampliora 2.10 ACB plus Guaiacol producing gene",
    "category": "PCR Kit",
    "productLine": "Ampliora",
    "description": "Multiplex RT-PCR kit detecting Alicyclobacillus spp. and the guaiacol-producing gene in one reaction — targeted spoilage control with lower cost per result.",
    "presentations": [
      {
        "catalogCode": "V-SF161",
        "format": "SPID",
        "size": "96 reactions",
        "kitContent": "• 12 Preloaded PCR strips\n• 1 Tube of Ampliora 2.10 Positive control – 100 µL\n• 1 Tube of Negative control – 352 µL",
        "isReadyToUse": true,
        "pcrTimeMin": "120",
        "incubationTimeH": "-",
        "shelfLifeMonths": "9",
        "storeTemp": "-25°C to -15°C",
        "dye": "FAM, HEX and ROX"
      }
    ],
    "features": [],
    "mainIndustries": [
      "Beverage",
      "Sauces and condiments"
    ]
  },
  "ampliora_2_3_listeria_spp_and_l_monocytogenes": {
    "key": "ampliora_2_3_listeria_spp_and_l_monocytogenes",
    "name": "Ampliora 2.3 Listeria spp. and L. monocytogenes",
    "category": "PCR Kit",
    "productLine": "Ampliora",
    "description": "Multiplex real-time PCR kit detecting Listeria spp. and L. monocytogenes in a single reaction — two targets, fewer reactions, lower cost per result.",
    "presentations": [
      {
        "catalogCode": "V-SF46",
        "format": "SPID",
        "size": "96 reactions",
        "kitContent": "• 12 Preloaded PCR strips\n• 1 Tube of 2.3 Positive control – 100 µL\n• 1 Tube of Negative control – 352 µL",
        "isReadyToUse": true,
        "pcrTimeMin": "95",
        "incubationTimeH": "-",
        "shelfLifeMonths": "9",
        "storeTemp": "-25°C to -15°C",
        "dye": "FAM, HEX and ROX"
      }
    ],
    "features": [],
    "mainIndustries": [
      "Dairy",
      "Fresh & Processed Produce",
      "Meat and Poultry",
      "Ready-to-eat",
      "Seafood"
    ]
  },
  "ampliora_2_8_listeria_spp_and_salmonella_spp": {
    "key": "ampliora_2_8_listeria_spp_and_salmonella_spp",
    "name": "Ampliora 2.8 Listeria spp. and Salmonella spp.",
    "category": "PCR Kit",
    "productLine": "Ampliora",
    "description": "Multiplex real-time PCR kit detecting Salmonella spp. and Listeria spp. in a single reaction — two pathogens at once, with lower cost per result.",
    "presentations": [
      {
        "catalogCode": "V-SF44",
        "format": "SPID",
        "size": "96 reactions",
        "kitContent": "• 12 Preloaded PCR strips\n• 1 Tube of Ampliora 2.8 Positive control – 100 µL\n• 1 Tube of Negative control – 352 µL",
        "isReadyToUse": true,
        "pcrTimeMin": "100",
        "incubationTimeH": "-",
        "shelfLifeMonths": "9",
        "storeTemp": "-25°C to -15°C",
        "dye": "FAM, HEX and ROX"
      }
    ],
    "features": [],
    "mainIndustries": [
      "Confectionery",
      "Dairy",
      "Fresh & Processed Produce",
      "Meat and Poultry",
      "Nutraceutical",
      "Pet Food & Animal Feed",
      "Ready-to-eat",
      "Seafood"
    ]
  },
  "ampliora_3_10_v_cholerae_v_vulnificus_and_v_parahaemolyticus": {
    "key": "ampliora_3_10_v_cholerae_v_vulnificus_and_v_parahaemolyticus",
    "name": "Ampliora 3.10 V. cholerae, V. vulnificus and V. parahaemolyticus",
    "category": "PCR Kit",
    "productLine": "Ampliora",
    "description": "Multiplex real-time PCR kit for simultaneous detection of Vibrio cholerae, V. vulnificus and V. parahaemolyticus in one reaction.",
    "presentations": [
      {
        "catalogCode": "V-SF109",
        "format": "SPID",
        "size": "96 reactions",
        "kitContent": "• 12 Preloaded PCR strips\n• 1 Tube of Ampliora 3.10 Positive control – 100 µL\n• 1Tube of Negative control – 352 µL",
        "isReadyToUse": true,
        "pcrTimeMin": "100",
        "incubationTimeH": "-",
        "shelfLifeMonths": "9",
        "storeTemp": "-25°C to -15°C",
        "dye": "FAM, HEX, ROX and Cy5"
      }
    ],
    "features": [],
    "mainIndustries": [
      "Seafood"
    ]
  },
  "ampliora_3_11_waterscan": {
    "key": "ampliora_3_11_waterscan",
    "name": "Ampliora 3.11 WaterScan",
    "category": "PCR Kit",
    "productLine": "Ampliora",
    "description": "Multiplex real-time PCR kit for water testing, detecting E. coli, Citrobacter spp. and Klebsiella spp. in a single reaction — three indicators, lower cost per result.",
    "presentations": [
      {
        "catalogCode": "V-SF98",
        "format": "SPID",
        "size": "96 reactions",
        "kitContent": "• 12 Preloaded PCR strips\n• 1 Tube of Ampliora WaterScan Positive control – 100 µL\n• 1 Tube of Negative control – 352 µL",
        "isReadyToUse": true,
        "pcrTimeMin": "120",
        "incubationTimeH": "-",
        "shelfLifeMonths": "9",
        "storeTemp": "-25°C to -15°C",
        "dye": "FAM, HEX, ROX and Cy5"
      }
    ],
    "features": [],
    "mainIndustries": [
      "Water"
    ]
  },
  "ampliora_3_12_waterscan": {
    "key": "ampliora_3_12_waterscan",
    "name": "Ampliora 3.12 WaterScan",
    "category": "PCR Kit",
    "productLine": "Ampliora",
    "description": "Multiplex real-time PCR kit for water testing, detecting Enterococcus spp., Enterobacter spp. and Escherichia spp. in one reaction — broad coverage, lower cost per result.",
    "presentations": [
      {
        "catalogCode": "V-SF89",
        "format": "SPID",
        "size": "96 reactions",
        "kitContent": "• 12 Preloaded PCR strips\n• 1 Tube of Ampliora WaterScan Positive control – 100 µL\n• 1 Tube of Negative control – 352 µL",
        "isReadyToUse": true,
        "pcrTimeMin": "120",
        "incubationTimeH": "-",
        "shelfLifeMonths": "9",
        "storeTemp": "-25°C to -15°C",
        "dye": "FAM, HEX, ROX and Cy5"
      }
    ],
    "features": [],
    "mainIndustries": [
      "Water"
    ]
  },
  "ampliora_3_13_acb_guaiacol_producing_gene_plus_zygosaccharomyces_spp": {
    "key": "ampliora_3_13_acb_guaiacol_producing_gene_plus_zygosaccharomyces_spp",
    "name": "Ampliora 3.13 ACB, Guaiacol producing gene plus Zygosaccharomyces spp.",
    "category": "PCR Kit",
    "productLine": "Ampliora",
    "description": "Multiplex RT-PCR kit detecting Alicyclobacillus spp., Zygosaccharomyces spp. and the guaiacol-producing gene in one reaction — targeted beverage spoilage control.",
    "presentations": [
      {
        "catalogCode": "V-SF160",
        "format": "SPID",
        "size": "96 reactions",
        "kitContent": "• 12 Preloaded PCR strips\n• 1 Tube of Ampliora 3.13 Positive control – 100 µL\n• 1 Tube of Negative control – 352 µL",
        "isReadyToUse": true,
        "pcrTimeMin": "95",
        "incubationTimeH": "-",
        "shelfLifeMonths": "9",
        "storeTemp": "-25°C to -15°C",
        "dye": "FAM, HEX, ROX and Cy5"
      }
    ],
    "features": [],
    "mainIndustries": [
      "Beverage",
      "Sauces and condiments"
    ]
  },
  "ampliora_3_15_zygosaccharomyces_group_saccharomyces_spp_and_saccharomyces_cerevisiae": {
    "key": "ampliora_3_15_zygosaccharomyces_group_saccharomyces_spp_and_saccharomyces_cerevisiae",
    "name": "Ampliora 3.15 Zygosaccharomyces group, Saccharomyces spp. and Saccharomyces cerevisiae",
    "category": "PCR Kit",
    "productLine": "Ampliora",
    "description": "Multiplex real-time PCR kit for simultaneous detection of the Zygosaccharomyces group, Saccharomyces spp. and S. cerevisiae in one reaction.",
    "presentations": [
      {
        "catalogCode": "V-SF179",
        "format": "SPID",
        "size": "96 reactions",
        "kitContent": "• 12 Preloaded PCR strips\n• 1 Tube of Ampliora 3.15 Positive control – 100 µL\n• 1 Tube of Negative control – 352 µL",
        "isReadyToUse": true,
        "pcrTimeMin": "95",
        "shelfLifeMonths": "9",
        "storeTemp": "-25°C to -15°C",
        "dye": "FAM, HEX, ROX and Cy5"
      }
    ],
    "features": [],
    "mainIndustries": [
      "Beer",
      "Wine"
    ]
  },
  "ampliora_3_2_salmonella_spp_l_monocytogenes_and_e_coli_o157_h7": {
    "key": "ampliora_3_2_salmonella_spp_l_monocytogenes_and_e_coli_o157_h7",
    "name": "Ampliora 3.2 Salmonella spp., L. monocytogenes and E. coli O157:H7",
    "category": "PCR Kit",
    "productLine": "Ampliora",
    "description": "Multiplex real-time PCR kit detecting Salmonella spp., L. monocytogenes and E. coli O157:H7 in a single reaction — three pathogens, fewer reactions, lower cost per result.",
    "presentations": [
      {
        "catalogCode": "V-SF67",
        "format": "SPID",
        "size": "96 reactions",
        "kitContent": "• 12 Preloaded PCR strips\n• 1 Tube of Ampliora 3.2 Positive control – 100 µL\n• 1 Tube of Negative control – 352 µL",
        "isReadyToUse": true,
        "pcrTimeMin": "100",
        "incubationTimeH": "-",
        "shelfLifeMonths": "9",
        "storeTemp": "-25°C to -15°C",
        "dye": "FAM, HEX, ROX and Cy5"
      }
    ],
    "features": [],
    "mainIndustries": [
      "Confectionery",
      "Dairy",
      "Egg Products",
      "Fresh & Processed Produce",
      "Meat and Poultry",
      "Nutraceutical",
      "Pet Food & Animal Feed",
      "Ready-to-eat",
      "Sauces and condiments",
      "Seafood"
    ]
  },
  "ampliora_3_5_salmonella_spp_l_monocytogenes_and_listeria_spp": {
    "key": "ampliora_3_5_salmonella_spp_l_monocytogenes_and_listeria_spp",
    "name": "Ampliora 3.5 Salmonella spp., L. monocytogenes and Listeria spp.",
    "category": "PCR Kit",
    "productLine": "Ampliora",
    "description": "Multiplex real-time PCR kit detecting Salmonella spp., L. monocytogenes and Listeria spp. in one reaction — broad pathogen coverage with lower cost per result.",
    "presentations": [
      {
        "catalogCode": "V-SF59",
        "format": "SPID",
        "size": "96 reactions",
        "kitContent": "• 12 Preloaded PCR strips\n• 1 Tube of Ampliora 3.5 Positive control – 100 µL\n• 1 Tube of Negative control – 352 µL",
        "isReadyToUse": true,
        "pcrTimeMin": "100",
        "incubationTimeH": "-",
        "shelfLifeMonths": "9",
        "storeTemp": "-25°C to -15°C",
        "dye": "FAM, HEX, ROX and Cy5"
      }
    ],
    "features": [],
    "mainIndustries": [
      "Confectionery",
      "Dairy",
      "Egg Products",
      "Fresh & Processed Produce",
      "Meat and Poultry",
      "Nutraceutical",
      "Pet Food & Animal Feed",
      "Ready-to-eat",
      "Seafood"
    ]
  },
  "ampliora_3_5r_salmonella_spp_l_monocytogenes_and_listeria_spp": {
    "key": "ampliora_3_5r_salmonella_spp_l_monocytogenes_and_listeria_spp",
    "name": "Ampliora 3.5R Salmonella spp., L. monocytogenes and Listeria spp.",
    "category": "PCR Kit",
    "productLine": "Ampliora",
    "description": "Multiplex real-time PCR kit detecting Salmonella spp., L. monocytogenes and Listeria spp. in one reaction — broad pathogen coverage with lower cost per result.",
    "presentations": [
      {
        "catalogCode": "V-SF74",
        "format": "SPID",
        "size": "96 reactions",
        "kitContent": "• 12 Preloaded PCR strips\n• 1 Tube of Ampliora 3.5 Positive control – 100 µL\n• 1 Tube of Negative control – 352 µL",
        "isReadyToUse": true,
        "pcrTimeMin": "110",
        "incubationTimeH": "-",
        "shelfLifeMonths": "9",
        "storeTemp": "-25°C to -15°C",
        "dye": "FAM, VIC, ROX, TAMRA and Cy5"
      }
    ],
    "features": [],
    "mainIndustries": [
      "Confectionery",
      "Dairy",
      "Egg Products",
      "Fresh & Processed Produce",
      "Meat and Poultry",
      "Nutraceutical",
      "Pet Food & Animal Feed",
      "Ready-to-eat",
      "Seafood"
    ]
  },
  "ampliora_3_9_e_coli_stec_e_coli_o157_h7_and_salmonella_spp": {
    "key": "ampliora_3_9_e_coli_stec_e_coli_o157_h7_and_salmonella_spp",
    "name": "Ampliora 3.9 E. coli STEC, E. coli O157:H7 and Salmonella spp.",
    "category": "PCR Kit",
    "productLine": "Ampliora",
    "description": "Multiplex real-time PCR kit identifying STEC strains, E. coli O157:H7 and Salmonella spp. in a single reaction — three critical targets, lower cost per result.",
    "presentations": [
      {
        "catalogCode": "V-SF68",
        "format": "SPID",
        "size": "96 reactions",
        "kitContent": "• 12 Preloaded PCR strips\n• 1 Tube of Ampliora 3.9 Positive control – 100 µL\n• 1 Tube of Negative control – 352 µL",
        "isReadyToUse": true,
        "pcrTimeMin": "100",
        "incubationTimeH": "-",
        "shelfLifeMonths": "9",
        "storeTemp": "-25°C to -15°C",
        "dye": "FAM, HEX, ROX, Cy5 and Cy5.5"
      }
    ],
    "features": [],
    "mainIndustries": [
      "Confectionery",
      "Egg Products",
      "Fresh & Processed Produce",
      "Meat and Poultry",
      "Ready-to-eat"
    ]
  },
  "ampliora_4_3_yeast": {
    "key": "ampliora_4_3_yeast",
    "name": "Ampliora 4.3 Yeast",
    "category": "PCR Kit",
    "productLine": "Ampliora",
    "description": "Multiplex real-time PCR kit for beer spoilage yeasts (Zygosaccharomyces, Saccharomyces and related species) — fast control in as little as 2.5 hours, lower cost per result.",
    "presentations": [
      {
        "catalogCode": "V-SF100",
        "format": "SPID",
        "size": "96 reactions",
        "kitContent": "• 12 Preloaded PCR strips\n• 1 Tube of Ampliora SpoilYeast Positive control – 100 µL\n• 1 Tube of Negative control – 352 µL",
        "isReadyToUse": true,
        "pcrTimeMin": "105",
        "incubationTimeH": "-",
        "shelfLifeMonths": "9",
        "storeTemp": "-25°C to -15°C",
        "dye": "FAM, HEX, ROX, Cy5 and Cy5.5"
      }
    ],
    "features": [],
    "mainIndustries": [
      "Beer",
      "Wine"
    ]
  },
  "ampliora_4_4_yeast": {
    "key": "ampliora_4_4_yeast",
    "name": "Ampliora 4.4 Yeast",
    "category": "PCR Kit",
    "productLine": "Ampliora",
    "description": "Multiplex real-time PCR kit for beer spoilage yeasts (Brettanomyces, Pichia, S. diastaticus) — fast control in as little as 2.5 hours, lower cost per result.",
    "presentations": [
      {
        "catalogCode": "V-SF101",
        "format": "SPID",
        "size": "96 reactions",
        "kitContent": "• 12 Preloaded PCR strips\n• 1 Tube of Ampliora SpoilYeast Positive control – 100 µL\n• 1 Tube of Negative control – 352 µL",
        "isReadyToUse": true,
        "pcrTimeMin": "105",
        "incubationTimeH": "-",
        "shelfLifeMonths": "9",
        "storeTemp": "-25°C to -15°C",
        "dye": "FAM, HEX, ROX, Cy5 and Cy5.5"
      }
    ],
    "features": [],
    "mainIndustries": [
      "Beer",
      "Wine"
    ]
  },
  "ampliora_4_5_bacteria": {
    "key": "ampliora_4_5_bacteria",
    "name": "Ampliora 4.5 Bacteria",
    "category": "PCR Kit",
    "productLine": "Ampliora",
    "description": "Multiplex real-time PCR kit for beer spoilage bacteria (Lactobacillus, Pediococcus and related species) — fast control in as little as 2.5 hours, lower cost per result.",
    "presentations": [
      {
        "catalogCode": "V-SF102",
        "format": "SPID",
        "size": "96 reactions",
        "kitContent": "• 12 Preloaded PCR strips\n• 1 Tube of Ampliora SpoilBac Positive control – 100 µL\n• 1 Tube of Negative control – 352 µL",
        "isReadyToUse": true,
        "pcrTimeMin": "105",
        "incubationTimeH": "-",
        "shelfLifeMonths": "9",
        "storeTemp": "-25°C to -15°C",
        "dye": "FAM, HEX, ROX, Cy5 and Cy5.5"
      }
    ],
    "features": [],
    "mainIndustries": [
      "Beer"
    ]
  },
  "ampliora_4_6_bacteria": {
    "key": "ampliora_4_6_bacteria",
    "name": "Ampliora 4.6 Bacteria",
    "category": "PCR Kit",
    "productLine": "Ampliora",
    "description": "Multiplex real-time PCR kit for beer spoilage bacteria (Pectinatus, Megasphaera and related species) — fast control in as little as 2.5 hours, lower cost per result.",
    "presentations": [
      {
        "catalogCode": "V-SF103",
        "format": "SPID",
        "size": "96 reactions",
        "kitContent": "• 12 Preloaded PCR strips\n• 1 Tube of Ampliora SpoilBac Positive control – 100 µL\n• 1 Tube of Negative control – 352 µL",
        "isReadyToUse": true,
        "pcrTimeMin": "105",
        "incubationTimeH": "-",
        "shelfLifeMonths": "9",
        "storeTemp": "-25°C to -15°C",
        "dye": "FAM, HEX, ROX, Cy5 and Cy5.5"
      }
    ],
    "features": [],
    "mainIndustries": [
      "Beer"
    ]
  },
  "ampliora_4_7_low_ph_microorganisms": {
    "key": "ampliora_4_7_low_ph_microorganisms",
    "name": "Ampliora 4.7 Low-pH Microorganisms",
    "category": "PCR Kit",
    "productLine": "Ampliora",
    "description": "Multiplex real-time PCR kit for low-pH spoilage organisms (Brettanomyces, acidophilic bacteria, preservative-resistant yeasts, molds) — targeted control for acidified products.",
    "presentations": [
      {
        "catalogCode": "V-SF169",
        "format": "SPID",
        "size": "96 reactions",
        "kitContent": "• 12 Preloaded PCR strips\n• 1 Tube of Ampliora 4.7 Positive control – 100 µL\n• 1 Tube of Negative control – 352 µL",
        "isReadyToUse": true,
        "pcrTimeMin": "80",
        "incubationTimeH": "-",
        "shelfLifeMonths": "6",
        "storeTemp": "-25°C to -15°C",
        "dye": "FAM, HEX, ROX, Cy5 and Cy5.5"
      }
    ],
    "features": [],
    "mainIndustries": [
      "Beverage",
      "Sauces and condiments"
    ]
  },
  "ampliora_6_1_waterscan_plus": {
    "key": "ampliora_6_1_waterscan_plus",
    "name": "Ampliora 6.1 WaterScan Plus",
    "category": "PCR Kit",
    "productLine": "Ampliora",
    "description": "Extended multiplex real-time PCR kit for water testing, covering six indicator organisms in a single reaction — broad coverage with lower cost per result.",
    "presentations": [
      {
        "catalogCode": "V-SF88",
        "format": "SPID",
        "size": "96 reactions",
        "kitContent": "• 24 Preloaded PCR strips (12 of Mix 1 and 12 of Mix 2)\n• 2 Tubes of Ampliora WaterScan Positive control - 100 μl\n• 2 Tubes of Negative control - 352 μl",
        "isReadyToUse": true,
        "pcrTimeMin": "120",
        "incubationTimeH": "-",
        "shelfLifeMonths": "9",
        "storeTemp": "-25°C to -15°C",
        "dye": "FAM, HEX, ROX and Cy5"
      }
    ],
    "features": [],
    "mainIndustries": [
      "Water"
    ]
  },
  "ampliora_8_1_yeast_plus": {
    "key": "ampliora_8_1_yeast_plus",
    "name": "Ampliora 8.1 Yeast Plus",
    "category": "PCR Kit",
    "productLine": "Ampliora",
    "description": "Extended multiplex real-time PCR kit covering eight beer spoilage yeasts in one reaction — comprehensive coverage, fast control in as little as 2.5 hours.",
    "presentations": [
      {
        "catalogCode": "V-SF64",
        "format": "SPID",
        "size": "96 reactions",
        "kitContent": "• 24 Preloaded PCR strips (12 of Mix 1 and 12 of Mix 2)\n• 2 Tubes of Ampliora SpoilYeast Positive control - 100 μl\n• 2 Tubes of Negative control - 352 μl",
        "isReadyToUse": true,
        "pcrTimeMin": "105",
        "incubationTimeH": "-",
        "shelfLifeMonths": "9",
        "storeTemp": "-25°C to -15°C",
        "dye": "FAM, HEX, ROX, Cy5 and Cy5.5"
      }
    ],
    "features": [],
    "mainIndustries": [
      "Beer"
    ]
  },
  "ampliora_8_2_bacteria_plus": {
    "key": "ampliora_8_2_bacteria_plus",
    "name": "Ampliora 8.2 Bacteria Plus",
    "category": "PCR Kit",
    "productLine": "Ampliora",
    "description": "Extended multiplex real-time PCR kit covering eight beer spoilage bacteria in one reaction — comprehensive coverage, fast control in as little as 2.5 hours.",
    "presentations": [
      {
        "catalogCode": "V-SF99",
        "format": "SPID",
        "size": "96 reactions",
        "kitContent": "• 24 Preloaded PCR strips (12 of Mix 1 and 12 of Mix 2)\n• 2 Tubes of Ampliora SpoilBac Positive control - 100 μl\n• 2 Tubes of Negative control - 352 μl",
        "isReadyToUse": true,
        "pcrTimeMin": "105",
        "incubationTimeH": "-",
        "shelfLifeMonths": "9",
        "storeTemp": "-25°C to -15°C",
        "dye": "FAM, HEX, ROX, Cy5 and Cy5.5"
      }
    ],
    "features": [],
    "mainIndustries": [
      "Beer"
    ]
  },
  "augmentis_1_listeria": {
    "key": "augmentis_1_listeria",
    "name": "Augmentis 1 Listeria",
    "category": "Growth Medium",
    "productLine": "Augmentis",
    "description": "Selective enrichment medium for the growth of Listeria spp., for use ahead of detection.",
    "presentations": [
      {
        "catalogCode": "V-FL23",
        "format": "RTU",
        "size": "25 reactions",
        "kitContent": "• 25 Bottles - 40 mL",
        "isReadyToUse": true,
        "pcrTimeMin": "-",
        "incubationTimeH": "27 ± 3",
        "shelfLifeMonths": "6",
        "storeTemp": "2°C to 8°C",
        "dye": "-"
      },
      {
        "catalogCode": "V-FL40",
        "format": "RTU",
        "size": "40 reactions",
        "kitContent": "• 40 Bottles - 40 mL",
        "isReadyToUse": true,
        "pcrTimeMin": "-",
        "incubationTimeH": "27 ± 3",
        "shelfLifeMonths": "6",
        "storeTemp": "2°C to 8°C",
        "dye": "-"
      },
      {
        "catalogCode": "V-FP26",
        "format": "Powder",
        "size": "500 g",
        "kitContent": "• 1 Bottle - 500 g",
        "isReadyToUse": false,
        "pcrTimeMin": "-",
        "incubationTimeH": "27 ± 3",
        "shelfLifeMonths": "12",
        "storeTemp": "15°C to 25°C",
        "dye": "-"
      }
    ],
    "features": [
      "Selective enrichment: medium with nutrients and growth factors optimized for Listeria spp. and Listeria monocytogenes.",
      "Samples ready for extraction: after 27 ± 3 h incubation, samples are prepared for DNA extraction and molecular detection.",
      "TAAG compatibility: designed to integrate with PCR kits targeting Listeria spp. and Listeria monocytogenes.",
      "Dehydrated format: supports extended shelf life, simple storage and rapid reconstitution in the lab.",
      "Greater target recovery: promotes proliferation of the target microorganism to improve analytical reliability."
    ],
    "mainIndustries": [
      "Confectionery",
      "Dairy",
      "Egg Products",
      "Fresh & Processed Produce",
      "Meat and Poultry",
      "Nutraceutical",
      "Pet Food & Animal Feed",
      "Ready-to-eat",
      "Sauces and condiments",
      "Seafood"
    ]
  },
  "augmentis_11_universal_bacteria": {
    "key": "augmentis_11_universal_bacteria",
    "name": "Augmentis 11 Universal Bacteria",
    "category": "Growth Medium",
    "productLine": "Augmentis",
    "description": "Universal enrichment medium that promotes broad bacterial growth ahead of detection.",
    "presentations": [
      {
        "catalogCode": "V-FL11",
        "format": "RTU",
        "size": "100 reactions",
        "kitContent": "• 100 Bottles - 9 mL",
        "isReadyToUse": true,
        "pcrTimeMin": "-",
        "incubationTimeH": "24 ± 2",
        "shelfLifeMonths": "18",
        "storeTemp": "2°C to 25°C",
        "dye": "-"
      },
      {
        "catalogCode": "V-FP02",
        "format": "Powder",
        "size": "500 g",
        "kitContent": "• 1 Bottle - 500 g",
        "isReadyToUse": false,
        "pcrTimeMin": "-",
        "incubationTimeH": "24 ± 2",
        "shelfLifeMonths": "12",
        "storeTemp": "15°C to 25°C",
        "dye": "-"
      }
    ],
    "features": [
      "Broad enrichment: formulated with nutritional components to support bacterial growth across different matrices.",
      "Efficient downstream detection: after 24 ± 2 h incubation, samples are ready for extraction and molecular analysis.",
      "TAAG portfolio compatibility: integrates with molecular detection workflows for microbiological control.",
      "Flexible format: available dehydrated and ready-to-use, simplifying storage and operation.",
      "Improved recovery: supports bacterial growth to increase detection rates and result reliability."
    ],
    "mainIndustries": [
      "Beverage",
      "Confectionery",
      "Dairy",
      "Fresh & Processed Produce",
      "Nutraceutical",
      "Pet Food & Animal Feed",
      "Pharmaceutical",
      "Ready-to-eat",
      "Sauces and condiments",
      "Sterile products",
      "Beer",
      "Wine"
    ]
  },
  "augmentis_14_universal_gram_negative": {
    "key": "augmentis_14_universal_gram_negative",
    "name": "Augmentis 14 Universal Gram negative",
    "category": "Growth Medium",
    "productLine": "Augmentis",
    "description": "Enrichment medium optimized for the growth of Gram-negative bacteria ahead of detection.",
    "presentations": [
      {
        "catalogCode": "V-FL46",
        "format": "Bottle",
        "size": "25 reactions",
        "kitContent": "• 25 Bottles - 225 mL",
        "isReadyToUse": false,
        "pcrTimeMin": "-",
        "incubationTimeH": "24 ± 2",
        "shelfLifeMonths": "6",
        "storeTemp": "2°C to 25°C",
        "dye": "-"
      },
      {
        "catalogCode": "V-FP27",
        "format": "Powder",
        "size": "500 g",
        "kitContent": "• 1 Bottle - 500 g",
        "isReadyToUse": false,
        "pcrTimeMin": "-",
        "incubationTimeH": "24 ± 2",
        "shelfLifeMonths": "12",
        "storeTemp": "15°C to 25°C",
        "dye": "-"
      }
    ],
    "features": [
      "Non-selective Gram-negative enrichment: nutritive medium optimized for Salmonella spp. and Escherichia coli.",
      "Fast downstream detection: after 24 ± 2 h incubation, samples are ready for extraction and analysis with TAAG kits.",
      "Operational compatibility: integrates with multiple Gram-negative pathogen detection workflows.",
      "Dehydrated format: simplifies storage, transport and rapid reconstitution.",
      "Greater reliability: promotes target growth to improve recovery and analytical performance."
    ],
    "mainIndustries": [
      "Confectionery",
      "Egg Products",
      "Fresh & Processed Produce",
      "Meat and Poultry",
      "Nutraceutical",
      "Pet Food & Animal Feed",
      "Ready-to-eat",
      "Sauces and condiments",
      "Seafood"
    ]
  },
  "augmentis_2_wort": {
    "key": "augmentis_2_wort",
    "name": "Augmentis 2 Wort",
    "category": "Growth Medium",
    "productLine": "Augmentis",
    "description": "Ready-to-use enrichment medium for the growth of spoilage yeasts and molds in beer and wine.",
    "presentations": [
      {
        "catalogCode": "V-FL34",
        "format": "RTU",
        "size": "100 reactions",
        "kitContent": "• 100 Tubes - 9 mL",
        "isReadyToUse": true,
        "pcrTimeMin": "-",
        "incubationTimeH": "68",
        "shelfLifeMonths": "6",
        "storeTemp": "2°C to 8°C",
        "dye": "-"
      }
    ],
    "features": [
      "Support for yeasts and molds: promotes recovery of spoilage microorganisms before molecular analysis.",
      "Pre-PCR stage: designed as enrichment before DNA extraction and molecular detection.",
      "Beverage application: useful for microbiological spoilage monitoring in fermentative matrices."
    ],
    "mainIndustries": [
      "Beer",
      "Wine"
    ]
  },
  "augmentis_21_yeast_molds": {
    "key": "augmentis_21_yeast_molds",
    "name": "Augmentis 21 Yeast & Molds",
    "category": "Growth Medium",
    "productLine": "Augmentis",
    "description": "Universal enrichment medium that promotes the growth of yeasts and molds ahead of detection.",
    "presentations": [
      {
        "catalogCode": "V-FL12",
        "format": "RTU",
        "size": "50 reactions",
        "kitContent": "• 50 Bottles - 9 mL",
        "isReadyToUse": true,
        "pcrTimeMin": "-",
        "incubationTimeH": "48 ± 2",
        "shelfLifeMonths": "18",
        "storeTemp": "2°C to 25°C",
        "dye": "-"
      },
      {
        "catalogCode": "V-FP18",
        "format": "Powder",
        "size": "50 reactions",
        "kitContent": "• 1 sachet - 21 g\n• 50 Bottles with beads",
        "isReadyToUse": false,
        "pcrTimeMin": "-",
        "incubationTimeH": "48 ± 2",
        "shelfLifeMonths": "12",
        "storeTemp": "15°C to 25°C",
        "dye": "-"
      }
    ],
    "features": [
      "Targeted enrichment: nutrient-rich medium to maximize growth of spoilage yeasts and molds.",
      "Efficient downstream detection: after 48 ± 2 h incubation, samples are ready for extraction and molecular analysis.",
      "Preventive quality control: supports early detection of microorganisms that compromise product freshness and stability.",
      "Flexible format: available in dehydrated and ready-to-use presentations, simplifying lab operation.",
      "Greater operational sensitivity: promotes target growth to improve detection rates and reliability."
    ],
    "mainIndustries": [
      "Beverage",
      "Confectionery",
      "Dairy",
      "Nutraceutical",
      "Pet Food & Animal Feed",
      "Pharmaceutical",
      "Ready-to-eat",
      "Sauces and condiments",
      "Beer",
      "Wine"
    ]
  },
  "augmentis_3_listeria_monocytogenes": {
    "key": "augmentis_3_listeria_monocytogenes",
    "name": "Augmentis 3 Listeria monocytogenes",
    "category": "Growth Medium",
    "productLine": "Augmentis",
    "description": "Selective enrichment medium for the growth of Listeria monocytogenes, for use ahead of detection.",
    "presentations": [
      {
        "catalogCode": "V-FP32",
        "format": "Powder",
        "size": "6 g",
        "kitContent": "• 1 Pail - 6 Kg",
        "isReadyToUse": false,
        "pcrTimeMin": "-",
        "incubationTimeH": "24 ± 3",
        "shelfLifeMonths": "12",
        "storeTemp": "15°C to 25°C",
        "dye": "-"
      },
      {
        "catalogCode": "V-FP33",
        "format": "Powder",
        "size": "500 g",
        "kitContent": "• 1 Bottle - 500 g",
        "isReadyToUse": false,
        "pcrTimeMin": "-",
        "incubationTimeH": "24 ± 3",
        "shelfLifeMonths": "6",
        "storeTemp": "15°C to 25°C",
        "dye": "-"
      }
    ],
    "features": [
      "Targeted enrichment: specifically aimed at Listeria monocytogenes.",
      "Support for extraction and PCR: prepares enriched samples for downstream molecular detection.",
      "Improved recovery: supports growth of the target microorganism before analysis.",
      "Food safety application: suitable for workflows requiring L. monocytogenes enrichment."
    ],
    "mainIndustries": [
      "Confectionery",
      "Dairy",
      "Egg Products",
      "Fresh & Processed Produce",
      "Meat and Poultry",
      "Pet Food & Animal Feed",
      "Ready-to-eat",
      "Sauces and condiments",
      "Seafood"
    ]
  },
  "augmentis_31_universal_surfaces": {
    "key": "augmentis_31_universal_surfaces",
    "name": "Augmentis 31 Universal Surfaces",
    "category": "Growth Medium",
    "productLine": "Augmentis",
    "description": "Enrichment medium that recovers Salmonella, S. aureus, E. coli and L. monocytogenes from surface samples for environmental monitoring.",
    "presentations": [
      {
        "catalogCode": "V-FP08",
        "format": "Powder",
        "size": "500 g",
        "kitContent": "• 1 Bottle - 500 g",
        "isReadyToUse": false,
        "pcrTimeMin": "-",
        "incubationTimeH": "24 ± 2",
        "shelfLifeMonths": "12",
        "storeTemp": "15°C to 25°C",
        "dye": "-"
      },
      {
        "catalogCode": "V-FL18",
        "format": "RTU",
        "size": "25 reactions",
        "kitContent": "25 Bottles - 90 mL",
        "isReadyToUse": true,
        "pcrTimeMin": "-",
        "incubationTimeH": "24 ± 2",
        "shelfLifeMonths": "12",
        "storeTemp": "15°C to 25°C",
        "dye": "-"
      }
    ],
    "features": [
      "Surface enrichment: formulated to recover microorganisms from food-contact surfaces.",
      "Fast downstream detection: after 24 ± 2 h incubation, samples are ready for extraction and molecular detection.",
      "Compatible with surface PCR kits: integrates with environmental monitoring and hygiene workflows.",
      "Dehydrated format: offers extended shelf life, simple storage and rapid reconstitution.",
      "Robust recovery: promotes bacterial growth to improve detection rates and reliability."
    ],
    "mainIndustries": [
      "Beverage",
      "Confectionery",
      "Dairy",
      "Egg Products",
      "Fresh & Processed Produce",
      "Meat and Poultry",
      "Nutraceutical",
      "Pet Food & Animal Feed",
      "Pharmaceutical",
      "Ready-to-eat",
      "Sauces and condiments",
      "Seafood"
    ]
  },
  "augmentis_4_spoilage_beverage": {
    "key": "augmentis_4_spoilage_beverage",
    "name": "Augmentis 4 Spoilage Beverage",
    "category": "Growth Medium",
    "productLine": "Augmentis",
    "description": "Ready-to-use selective medium for acidophilic spoilage organisms — yeasts, molds and bacteria that grow at low pH.",
    "presentations": [
      {
        "catalogCode": "V-FL41",
        "format": "Bottle",
        "size": "48  reactions",
        "kitContent": "• 48 Bottles - 49 mL",
        "isReadyToUse": false,
        "pcrTimeMin": "-",
        "shelfLifeMonths": "6",
        "storeTemp": "2°C to 8°C",
        "dye": "-"
      }
    ],
    "features": [
      "Spoilage enrichment: supports microbial recovery before molecular analysis.",
      "Designed for beverages: aimed at microbiological spoilage monitoring workflows in industrial matrices.",
      "Sample preparation: facilitates the stage prior to extraction and PCR detection.",
      "Compatible with TAAG molecular workflows."
    ],
    "mainIndustries": [
      "Beverage",
      "Sauces and condiments"
    ]
  },
  "augmentis_41_universal_pathogens": {
    "key": "augmentis_41_universal_pathogens",
    "name": "Augmentis 41 Universal Pathogens",
    "category": "Growth Medium",
    "productLine": "Augmentis",
    "description": "Single enrichment medium that supports the growth of multiple foodborne pathogens, simplifying multi-target workflows.",
    "presentations": [
      {
        "catalogCode": "V-FL05",
        "format": "RTU",
        "size": "100 reactions",
        "kitContent": "• 100 Bottles - 9 mL",
        "isReadyToUse": true,
        "pcrTimeMin": "-",
        "incubationTimeH": "24 ± 2",
        "shelfLifeMonths": "12",
        "storeTemp": "2°C to 25°C",
        "dye": "-"
      },
      {
        "catalogCode": "V-FP09",
        "format": "Powder",
        "size": "500 g",
        "kitContent": "• 1 Bottle - 500 g",
        "isReadyToUse": false,
        "pcrTimeMin": "-",
        "incubationTimeH": "24 ± 2",
        "shelfLifeMonths": "12",
        "storeTemp": "15°C to 25°C",
        "dye": "-"
      },
      {
        "catalogCode": "V-FP19",
        "format": "Powder",
        "size": "10 Kg",
        "kitContent": "• 1 Pail - 10 Kg",
        "isReadyToUse": false,
        "pcrTimeMin": "-",
        "incubationTimeH": "24 ± 2",
        "shelfLifeMonths": "12",
        "storeTemp": "15°C to 25°C",
        "dye": "-"
      }
    ],
    "features": [
      "Multi-pathogen enrichment: formulated to support growth of pathogens relevant to food safety.",
      "Efficient downstream detection: after 24 ± 2 h incubation, samples are ready for extraction and PCR.",
      "Unifies workflows: allows preparing samples for multiple targets within a simplified operational scheme.",
      "Compatible with TAAG pathogen detection kits."
    ],
    "mainIndustries": [
      "Confectionery",
      "Dairy",
      "Egg Products",
      "Fresh & Processed Produce",
      "Meat and Poultry",
      "Pet Food & Animal Feed",
      "Ready-to-eat",
      "Seafood"
    ]
  },
  "augmentis_5_pdb": {
    "key": "augmentis_5_pdb",
    "name": "Augmentis 5 PDB",
    "category": "Growth Medium",
    "productLine": "Augmentis",
    "description": "Ready-to-use medium that promotes the growth of yeasts and molds ahead of detection.",
    "presentations": [
      {
        "catalogCode": "V-FL43",
        "format": "RTU",
        "size": "100 reactions",
        "kitContent": "• 100 Tubes - 10 mL",
        "isReadyToUse": true,
        "pcrTimeMin": "-",
        "shelfLifeMonths": "6",
        "storeTemp": "2°C to 8°C",
        "dye": "-"
      }
    ],
    "features": [
      "Support for yeasts and molds: promotes recovery of spoilage microorganisms.",
      "Pre-PCR stage: designed as enrichment before DNA extraction and molecular analysis.",
      "Application in beverages and matrices requiring spoilage monitoring."
    ],
    "mainIndustries": [
      "Sauces and condiments",
      "Beer",
      "Wine"
    ]
  },
  "augmentis_6_ysg_broth": {
    "key": "augmentis_6_ysg_broth",
    "name": "Augmentis 6 YSG Broth",
    "category": "Growth Medium",
    "productLine": "Augmentis",
    "description": "Ready-to-use selective enrichment medium for acidophilic bacteria.",
    "presentations": [
      {
        "catalogCode": "V-FL49",
        "format": "RTU",
        "size": "30 reactions",
        "kitContent": "• 30 Bottles - 49 mL",
        "isReadyToUse": true,
        "pcrTimeMin": "-",
        "incubationTimeH": "24 ± 1",
        "shelfLifeMonths": "6",
        "storeTemp": "2°C to 25°C",
        "dye": "-"
      }
    ],
    "features": [],
    "mainIndustries": [
      "Beverage",
      "Sauces and condiments"
    ]
  },
  "augmentis_51_lactobacillus": {
    "key": "augmentis_51_lactobacillus",
    "name": "Augmentis 51 Lactobacillus",
    "category": "Growth Medium",
    "productLine": "Augmentis",
    "description": "Enrichment broth that promotes the growth of Lactobacillus spp. ahead of detection.",
    "presentations": [
      {
        "catalogCode": "V-FL10",
        "format": "RTU",
        "size": "40 reactions",
        "kitContent": "• 40 Bottles - 49 mL",
        "isReadyToUse": true,
        "pcrTimeMin": "-",
        "incubationTimeH": "24 ± 2",
        "shelfLifeMonths": "6",
        "storeTemp": "2°C to 8°C",
        "dye": "-"
      },
      {
        "catalogCode": "V-FL32",
        "format": "RTU",
        "size": "100 reactions",
        "kitContent": "• 100 Tubes - 9 mL",
        "isReadyToUse": true,
        "pcrTimeMin": "-",
        "incubationTimeH": "24 ± 2",
        "shelfLifeMonths": "6",
        "storeTemp": "2°C to 8°C",
        "dye": "-"
      },
      {
        "catalogCode": "V-FP13",
        "format": "Powder",
        "size": "500 g",
        "kitContent": "• 1 Bottle - 500 g",
        "isReadyToUse": false,
        "pcrTimeMin": "-",
        "incubationTimeH": "24 ± 2",
        "shelfLifeMonths": "12",
        "storeTemp": "15°C to 25°C",
        "dye": "-"
      }
    ],
    "features": [
      "Targeted enrichment: formulated to support growth of spoilage lactic acid bacteria.",
      "Efficient downstream detection: after 24 ± 2 h incubation, samples are ready for analysis with TAAG kits.",
      "Quality protection: helps prevent spoilage associated with lactic acid bacteria.",
      "Flexible format: dehydrated and ready-to-use presentations simplify operation and storage.",
      "Greater target recovery: improves growth conditions for more reliable results."
    ],
    "mainIndustries": [
      "Beverage",
      "Confectionery",
      "Dairy",
      "Fresh & Processed Produce",
      "Nutraceutical",
      "Pet Food & Animal Feed",
      "Pharmaceutical",
      "Ready-to-eat",
      "Sauces and condiments",
      "Sterile products",
      "Beer",
      "Wine"
    ]
  },
  "augmentis_91_bpw": {
    "key": "augmentis_91_bpw",
    "name": "Augmentis 91 BPW",
    "category": "Growth Medium",
    "productLine": "Augmentis",
    "description": "Non-selective enrichment medium for the broad recovery of microorganisms from food and environmental samples.",
    "presentations": [
      {
        "catalogCode": "V-FL06",
        "format": "RTU",
        "size": "25 reactions",
        "kitContent": "• 25 Bottles - 225 mL",
        "isReadyToUse": true,
        "pcrTimeMin": "-",
        "incubationTimeH": "24 ± 2  (General)\n≥ 8 (Cocoa samples)",
        "shelfLifeMonths": "12",
        "storeTemp": "2°C to 8°C",
        "dye": "-"
      },
      {
        "catalogCode": "V-FL31",
        "format": "RTU",
        "size": "100 reactions",
        "kitContent": "• 100 Bottles - 9 mL",
        "isReadyToUse": true,
        "pcrTimeMin": "-",
        "incubationTimeH": "24 ± 2 (General)\n≥ 8 (Cocoa samples)",
        "shelfLifeMonths": "12",
        "storeTemp": "2°C to 8°C",
        "dye": "-"
      },
      {
        "catalogCode": "V-FL36",
        "format": "RTU",
        "size": "100 reactions",
        "kitContent": "• 100 Tubes - 9 mL",
        "isReadyToUse": true,
        "pcrTimeMin": "-",
        "incubationTimeH": "24 ± 2 (General)\n≥ 8 (Cocoa samples)",
        "shelfLifeMonths": "12",
        "storeTemp": "2°C to 8°C",
        "dye": "-"
      },
      {
        "catalogCode": "V-FL37",
        "format": "RTU",
        "size": "100 reactions",
        "kitContent": "• 100 Tubes - 10 mL",
        "isReadyToUse": true,
        "pcrTimeMin": "-",
        "incubationTimeH": "24 ± 2 (General)\n≥ 8 (Cocoa samples)",
        "shelfLifeMonths": "12",
        "storeTemp": "2°C to 8°C",
        "dye": "-"
      },
      {
        "catalogCode": "V-FL45",
        "format": "RTU",
        "size": "24 reactions",
        "kitContent": "• 24 Bottles - 90 mL",
        "isReadyToUse": true,
        "pcrTimeMin": "-",
        "incubationTimeH": "24 ± 2 (General)\n≥ 8 (Cocoa samples)",
        "shelfLifeMonths": "12",
        "storeTemp": "2°C to 8°C",
        "dye": "-"
      },
      {
        "catalogCode": "V-FP25",
        "format": "Powder",
        "size": "500 g",
        "kitContent": "• 1 Bottle - 500 g",
        "isReadyToUse": false,
        "pcrTimeMin": "-",
        "incubationTimeH": "24 ± 2 (General)\n≥ 8 (Cocoa samples)",
        "shelfLifeMonths": "12",
        "storeTemp": "15°C to 25°C",
        "dye": "-"
      },
      {
        "catalogCode": "V-FP31",
        "format": "Powder",
        "size": "10 Kg",
        "kitContent": "• 1 bucket - 10 Kg",
        "isReadyToUse": false,
        "pcrTimeMin": "-",
        "incubationTimeH": "24 ± 2 (General)\n≥ 8 (Cocoa samples)",
        "shelfLifeMonths": "12",
        "storeTemp": "15°C to 25°C",
        "dye": "-"
      }
    ],
    "features": [
      "Non-selective pre-enrichment: provides nutrients and osmotic balance for microbial recovery.",
      "Efficient downstream detection: after a general 24 ± 2 h incubation, samples are ready for extraction and PCR.",
      "Compatible with multiple TAAG products and pathogen detection workflows.",
      "Ready-to-use/dehydrated format: simplifies operation, storage and preparation according to lab needs.",
      "Improves analytical reliability by supporting recovery of the target microorganism."
    ],
    "mainIndustries": [
      "Confectionery",
      "Dairy",
      "Egg Products",
      "Fresh & Processed Produce",
      "Meat and Poultry",
      "Nutraceutical",
      "Pet Food & Animal Feed",
      "Ready-to-eat",
      "Sauces and condiments",
      "Seafood"
    ]
  },
  "augmentis_92_bpw_0_1": {
    "key": "augmentis_92_bpw_0_1",
    "name": "Augmentis 92 BPW 0.1%",
    "category": "Growth Medium",
    "productLine": "Augmentis",
    "description": "Ready-to-use diluent for preparing samples with a high microbial load.",
    "presentations": [
      {
        "catalogCode": "V-FL09",
        "format": "RTU",
        "size": "100 reactions",
        "kitContent": "• 100 Tubes - 9 mL",
        "isReadyToUse": true,
        "pcrTimeMin": "-",
        "incubationTimeH": "-",
        "shelfLifeMonths": "12",
        "storeTemp": "2°C to 8°C",
        "dye": "-"
      }
    ],
    "features": [
      "Ready-to-use dilution: simplifies preparation of samples with high microbial load.",
      "Support for sample handling prior to microbiological or molecular analysis.",
      "Helps standardize initial sample preparation in the lab."
    ],
    "mainIndustries": [
      "Confectionery",
      "Dairy",
      "Egg Products",
      "Fresh & Processed Produce",
      "Meat and Poultry",
      "Nutraceutical",
      "Pet Food & Animal Feed",
      "Ready-to-eat",
      "Sauces and condiments",
      "Seafood"
    ]
  },
  "clarixa_1": {
    "key": "clarixa_1",
    "name": "Clarixa 1",
    "category": "Extraction supplement",
    "productLine": "Clarixa",
    "description": "Pre-extraction treatment for highly complex matrices that reduces PCR inhibitors and improves downstream results.",
    "presentations": [
      {
        "catalogCode": "V-PET02",
        "format": "Bottle",
        "size": "50 mL",
        "kitContent": "• 1 Bottle - 50 mL",
        "isReadyToUse": false,
        "pcrTimeMin": "-",
        "incubationTimeH": "10 minutes",
        "shelfLifeMonths": "6",
        "storeTemp": "2°C to 25°C",
        "dye": "-"
      }
    ],
    "features": [
      "Pre-extraction optimization: reduces inhibitors that can interfere with molecular analysis.",
      "Improves nucleic-acid stability: supports DNA/RNA solubility and preservation for reliable detection.",
      "Facilitates cell lysis: reduces sample viscosity and improves extraction efficiency.",
      "Validated for complex matrices such as 62% cocoa chocolate, cocoa liquor, skim milk powder and fruit concentrate."
    ],
    "mainIndustries": [
      "Beverage",
      "Confectionery",
      "Dairy",
      "Sauces and condiments"
    ]
  },
  "collectio_1_neutrosampling": {
    "key": "collectio_1_neutrosampling",
    "name": "Collectio 1 NeutroSampling",
    "category": "Sampling Kit",
    "productLine": "Collectio",
    "description": "All-in-one device for collecting, neutralizing and transporting surface samples in a single step.",
    "presentations": [
      {
        "catalogCode": "V-FP16",
        "format": "Powder",
        "size": "500 g",
        "kitContent": "• 1 Bottle - 500 g",
        "isReadyToUse": false,
        "pcrTimeMin": "-",
        "incubationTimeH": "-",
        "shelfLifeMonths": "12",
        "storeTemp": "2°C to 25°C",
        "dye": "-"
      },
      {
        "catalogCode": "V-TB09",
        "format": "Tube",
        "size": "100 reactions",
        "kitContent": "• 100 Tubes - 10 mL\n• 100 Swabs",
        "isReadyToUse": false,
        "pcrTimeMin": "-",
        "incubationTimeH": "-",
        "shelfLifeMonths": "12",
        "storeTemp": "2°C to 25°C",
        "dye": "-"
      },
      {
        "catalogCode": "V-TB10",
        "format": "Tube",
        "size": "100 reactions",
        "kitContent": "• 100 Tubes - 10 mL",
        "isReadyToUse": false,
        "pcrTimeMin": "-",
        "incubationTimeH": "-",
        "shelfLifeMonths": "12",
        "storeTemp": "2°C to 25°C",
        "dye": "-"
      }
    ],
    "features": [
      "Surface sampling and transport in a simple, standardized format.",
      "Integrated neutralization to preserve sample integrity during transport.",
      "Aligned with surface monitoring and hygiene verification workflows."
    ],
    "mainIndustries": [
      "Beverage",
      "Confectionery",
      "Dairy",
      "Egg Products",
      "Fresh & Processed Produce",
      "Meat and Poultry",
      "Nutraceutical",
      "Pet Food & Animal Feed",
      "Pharmaceutical",
      "Ready-to-eat",
      "Sauces and condiments",
      "Seafood",
      "Sterile products",
      "Water",
      "Beer",
      "Wine"
    ]
  },
  "collectio_2_surface_transport_buffer": {
    "key": "collectio_2_surface_transport_buffer",
    "name": "Collectio 2 Surface transport buffer",
    "category": "Sampling Kit",
    "productLine": "Collectio",
    "description": "Transport buffer that stabilizes and preserves surface environmental samples on the way to the lab.",
    "presentations": [
      {
        "catalogCode": "V-TB17",
        "format": "Tube",
        "size": "100 reactions",
        "kitContent": "• 100 Tubes - 3 mL\n• 100 Swabs",
        "isReadyToUse": false,
        "pcrTimeMin": "-",
        "incubationTimeH": "-",
        "shelfLifeMonths": "12",
        "storeTemp": "2°C to 25°C",
        "dye": "-"
      }
    ],
    "features": [
      "Surface transport: simplifies sample storage and transfer.",
      "Sample stabilization: helps preserve integrity before downstream analysis.",
      "Aligned with surface monitoring and environmental hygiene programs."
    ],
    "mainIndustries": [
      "Beverage",
      "Confectionery",
      "Dairy",
      "Egg Products",
      "Fresh & Processed Produce",
      "Meat and Poultry",
      "Nutraceutical",
      "Pet Food & Animal Feed",
      "Pharmaceutical",
      "Ready-to-eat",
      "Sauces and condiments",
      "Seafood",
      "Sterile products",
      "Water",
      "Beer",
      "Wine"
    ]
  },
  "collectio_3_letheensampling": {
    "key": "collectio_3_letheensampling",
    "name": "Collectio 3 LetheenSampling",
    "category": "Sampling Kit",
    "productLine": "Collectio",
    "description": "Sampling device that recovers microorganisms from surfaces treated with sanitizers, neutralizing residues on contact.",
    "presentations": [
      {
        "catalogCode": "V-TB16",
        "format": "Tube",
        "size": "100 reactions",
        "kitContent": "• 100 Tubes - 9 mL\n• 100 Swabs",
        "isReadyToUse": false,
        "pcrTimeMin": "-",
        "incubationTimeH": "-",
        "shelfLifeMonths": "12",
        "storeTemp": "2°C to 8°C",
        "dye": "-"
      },
      {
        "catalogCode": "V-TB24",
        "format": "Tube",
        "size": "100 reactions",
        "kitContent": "• 100 Tubes - 10 mL",
        "isReadyToUse": false,
        "pcrTimeMin": "-",
        "incubationTimeH": "-",
        "shelfLifeMonths": "12",
        "storeTemp": "2°C to 8°C",
        "dye": "-"
      },
      {
        "catalogCode": "V-TB27",
        "format": "Tube",
        "size": "100 reactions",
        "kitContent": "• 100 Tubes - 10 mL\n• 100 Swabs",
        "isReadyToUse": false,
        "pcrTimeMin": "-",
        "incubationTimeH": "-",
        "shelfLifeMonths": "12",
        "storeTemp": "2°C to 8°C",
        "dye": "-"
      }
    ],
    "features": [
      "Surface sampling with residues: formulated for contexts requiring neutralization.",
      "Helps preserve sample integrity during transport to the lab.",
      "Aligned with hygiene verification and surface monitoring workflows."
    ],
    "mainIndustries": [
      "Beverage",
      "Confectionery",
      "Dairy",
      "Egg Products",
      "Fresh & Processed Produce",
      "Meat and Poultry",
      "Nutraceutical",
      "Pet Food & Animal Feed",
      "Pharmaceutical",
      "Ready-to-eat",
      "Sauces and condiments",
      "Seafood",
      "Sterile products",
      "Water",
      "Beer",
      "Wine"
    ]
  },
  "elevia_1_1_salmonella_spp": {
    "key": "elevia_1_1_salmonella_spp",
    "name": "Elevia 1.1 Salmonella spp.",
    "category": "PCR Kit",
    "productLine": "Elevia",
    "description": "Ultra-fast RT-PCR kit for detection of Salmonella spp., delivering results in as few as 3 hours with up to 10,000x greater sensitivity than standard PCR — enabling same-day product release.",
    "presentations": [
      {
        "catalogCode": "V-PAT04",
        "format": "SPID",
        "size": "96 reactions",
        "kitContent": "• 12 Preloaded PCR strips\n• 1 Tube of Elevia 1.1 Positive control – 100 µL\n• 1 Tube of Negative control – 352 µL",
        "isReadyToUse": true,
        "pcrTimeMin": "95",
        "incubationTimeH": "-",
        "shelfLifeMonths": "9",
        "storeTemp": "-25°C to -15°C",
        "dye": "FAM and HEX"
      }
    ],
    "features": [],
    "mainIndustries": [
      "Confectionery",
      "Meat and Poultry",
      "Dairy",
      "Pet Food & Animal Feed"
    ]
  },
  "elevia_2_8_salmonella_spp_and_listeria_spp": {
    "key": "elevia_2_8_salmonella_spp_and_listeria_spp",
    "name": "Elevia 2.8 Salmonella spp. and Listeria spp.",
    "category": "PCR Kit",
    "productLine": "Elevia",
    "description": "Ultra-fast multiplex RT-PCR kit for simultaneous detection of Salmonella spp. and Listeria spp., delivering results in as few as 4 hours with up to 10,000x greater sensitivity — for same-day release.",
    "presentations": [
      {
        "catalogCode": "V-PAT07",
        "format": "SPID",
        "size": "96 reactions",
        "kitContent": "• 12 Preloaded PCR strips\n• 1 Tube of Elevia 2.8 Positive control – 100 µL\n• 1 Tube of Negative control – 352 µL",
        "isReadyToUse": true,
        "pcrTimeMin": "100",
        "incubationTimeH": "-",
        "shelfLifeMonths": "9",
        "storeTemp": "-25°C to -15°C",
        "dye": "FAM, HEX and ROX"
      }
    ],
    "features": [],
    "mainIndustries": []
  },
  "elevia_2_9_salmonella_spp_and_enterobacteria": {
    "key": "elevia_2_9_salmonella_spp_and_enterobacteria",
    "name": "Elevia 2.9 Salmonella spp. and Enterobacteria",
    "category": "PCR Kit",
    "productLine": "Elevia",
    "description": "Ultra-fast multiplex RT-PCR kit for simultaneous detection for Salmonella spp. and Enterobacteria, delivering results in as few as 3 hours with up to 10,000x greater sensitivity — for same-day release.",
    "presentations": [
      {
        "catalogCode": "V-PAT06",
        "format": "SPID",
        "size": "96 reactions",
        "kitContent": "• 12 Preloaded PCR strips\n• 1 Tube of Elevia 2.9 Positive control – 100 µL\n• 1 Tube of Negative control – 352 µL",
        "isReadyToUse": true,
        "pcrTimeMin": "95",
        "incubationTimeH": "-",
        "shelfLifeMonths": "9",
        "storeTemp": "-25°C to -15°C",
        "dye": "FAM, HEX and ROX"
      }
    ],
    "features": [],
    "mainIndustries": []
  },
  "magneus_1_bacteria": {
    "key": "magneus_1_bacteria",
    "name": "Magneus 1 Bacteria",
    "category": "Extraction Kit",
    "productLine": "Magneus",
    "description": "Automated magnetic-bead extraction kit for bacterial nucleic acids — clean extracts optimized for real-time PCR.",
    "presentations": [
      {
        "catalogCode": "V-EQ40",
        "format": "Plate",
        "size": "96 reactions",
        "kitContent": "• 6 Plates\n• 12 magnetic Rod Sleeves",
        "isReadyToUse": false,
        "pcrTimeMin": "-",
        "incubationTimeH": "-",
        "shelfLifeMonths": "6",
        "storeTemp": "15°C to 25°C",
        "dye": "-"
      }
    ],
    "features": [
      "Ultra-clean magnetic extraction: automated nucleic-acid isolation using functionalized magnetic particles, with successive washes that reduce inhibitors and optimize extract compatibility with real-time PCR.",
      "Process standardization: automated lysis, washing and elution to reduce manual handling and operator-to-operator variability.",
      "Automated 35-40 min extraction workflow for Salmonella spp. across 16 samples, with 20 min analyst hands-on time per the manual.",
      "Reduces the extraction bottleneck in complex matrices and helps accelerate batch release, investigation or hold decisions."
    ],
    "mainIndustries": [
      "Beverage",
      "Confectionery",
      "Dairy",
      "Fresh & Processed Produce",
      "Meat and Poultry",
      "Nutraceutical",
      "Pet Food & Animal Feed",
      "Pharmaceutical",
      "Ready-to-eat",
      "Sauces and condiments",
      "Sterile products",
      "Beer",
      "Wine"
    ]
  },
  "magneus_2_bacteria_yeast_molds": {
    "key": "magneus_2_bacteria_yeast_molds",
    "name": "Magneus 2 Bacteria, Yeast & Molds",
    "category": "Extraction Kit",
    "productLine": "Magneus",
    "description": "Automated magnetic-bead extraction kit for bacteria, yeasts and molds — clean extracts optimized for real-time PCR.",
    "presentations": [
      {
        "catalogCode": "V-MA10",
        "format": "Plate",
        "size": "96 reactions",
        "kitContent": "• 6 Plates\n• 12 magnetic Rod Sleeves",
        "isReadyToUse": false,
        "pcrTimeMin": "-",
        "incubationTimeH": "-",
        "shelfLifeMonths": "6",
        "storeTemp": "15°C to 25°C",
        "dye": "-"
      }
    ],
    "features": [
      "Ultra-clean magnetic extraction: automated nucleic-acid isolation using functionalized magnetic particles, with successive washes that reduce inhibitors and optimize extract compatibility with real-time PCR.",
      "Process standardization: automated lysis, washing and elution to reduce manual handling and operator-to-operator variability.",
      "Automated 45 min processing for 16 samples, reducing manual handling in repetitive routines.",
      "Allows standardizing spoilage monitoring in viscous or complex matrices and processing samples with less analyst dependence."
    ],
    "mainIndustries": [
      "Beverage",
      "Confectionery",
      "Dairy",
      "Fresh & Processed Produce",
      "Nutraceutical",
      "Pet Food & Animal Feed",
      "Pharmaceutical",
      "Ready-to-eat",
      "Sauces and condiments",
      "Sterile products",
      "Beer",
      "Wine"
    ]
  },
  "magneus_3_bacteria_yeast_molds": {
    "key": "magneus_3_bacteria_yeast_molds",
    "name": "Magneus 3 Bacteria, Yeast & Molds",
    "category": "Extraction Kit",
    "productLine": "Magneus",
    "description": "Automated magnetic-bead extraction kit for bacteria, yeasts and molds in beverages — clean extracts optimized for real-time PCR.",
    "presentations": [
      {
        "catalogCode": "V-MA01",
        "format": "Plate",
        "size": "96 reactions",
        "kitContent": "• 6 Plates\n• 96 Tubes X\n• 12 Units Magnetic Rod Sleeves",
        "isReadyToUse": false,
        "pcrTimeMin": "-",
        "incubationTimeH": "-",
        "shelfLifeMonths": "6",
        "storeTemp": "15°C to 25°C",
        "dye": "-"
      }
    ],
    "features": [
      "Ultra-clean magnetic extraction: automated nucleic-acid isolation using functionalized magnetic particles, with successive washes that reduce inhibitors and optimize extract compatibility with real-time PCR.",
      "Process standardization: automated lysis, washing and elution to reduce manual handling and operator-to-operator variability.",
      "Magnetic preparation with 60 min processing, useful for integrating molecular spoilage control in beverage plants.",
      "Scales spoilage monitoring in beverages without proportionally increasing the lab's manual workload."
    ],
    "mainIndustries": [
      "Beverage",
      "Sauces and condiments"
    ]
  },
  "magneus_6_bacteria": {
    "key": "magneus_6_bacteria",
    "name": "Magneus 6 Bacteria",
    "category": "Extraction Kit",
    "productLine": "Magneus",
    "description": "Automated magnetic-bead extraction kit for Gram-negative bacteria — clean extracts optimized for real-time PCR.",
    "presentations": [
      {
        "catalogCode": "V-MA19",
        "format": "Plate",
        "size": "96 reactions",
        "kitContent": "• 12 Plates\n• 96 Tubes A\n• 12 magnetic Rod Sleeves\n• 3 Bottles of Lysis Buffer",
        "isReadyToUse": false,
        "pcrTimeMin": "-",
        "shelfLifeMonths": "6",
        "storeTemp": "15°C to 25°C",
        "dye": "-"
      }
    ],
    "features": [
      "Ultra-clean magnetic extraction: automated nucleic-acid isolation using functionalized magnetic particles, with successive washes that reduce inhibitors and optimize extract compatibility with real-time PCR.",
      "Process standardization: automated lysis, washing and elution to reduce manual handling and operator-to-operator variability.",
      "Surface workflow with 3 h enrichment and 45 min extraction for 16 samples, per the manual.",
      "Turns environmental monitoring into a fast-action tool to verify hygiene, investigate recontamination and support operational line release."
    ],
    "mainIndustries": [
      "Confectionery",
      "Dairy",
      "Egg Products",
      "Fresh & Processed Produce",
      "Meat and Poultry",
      "Pet Food & Animal Feed",
      "Ready-to-eat",
      "Seafood"
    ]
  },
  "nucleia_2_tez_q_plus": {
    "key": "nucleia_2_tez_q_plus",
    "name": "Nucleia 2 Tez-Q Plus",
    "category": "Extraction Kit",
    "productLine": "Nucleia",
    "description": "Manual extraction kit for complex matrices with high inhibitor content, yielding PCR-ready bacterial nucleic acids.",
    "presentations": [
      {
        "catalogCode": "V-EQ19",
        "format": "Tube",
        "size": "96 reactions",
        "kitContent": "• 96 Tubes Q -  400 µL\n• 5 Bottles of Resuspension Solution - 10 mL",
        "isReadyToUse": false,
        "pcrTimeMin": "-",
        "incubationTimeH": "-",
        "shelfLifeMonths": "12",
        "storeTemp": "2°C to 25°C",
        "dye": "-"
      }
    ],
    "features": [
      "Manual bacterial extraction in two simple steps: concentration of microbiological material and DNA release by heating.",
      "Robust manual extraction for routine PCR: sample preparation via standardized steps using common lab equipment.",
      "Absorbent resin to retain potential PCR inhibitors, yielding a clean extract suitable for real-time PCR.",
      "50 min extraction workflow for 24 samples with 20 min analyst hands-on time; room-temperature kit storage.",
      "Reduces repeats due to inhibition and makes it easier to prepare bacterial-pathogen PCR in plant labs without automation."
    ],
    "mainIndustries": [
      "Beverage",
      "Confectionery",
      "Dairy",
      "Egg Products",
      "Fresh & Processed Produce",
      "Meat and Poultry",
      "Nutraceutical",
      "Pet Food & Animal Feed",
      "Pharmaceutical",
      "Ready-to-eat",
      "Sauces and condiments",
      "Seafood",
      "Sterile products",
      "Water",
      "Beer",
      "Wine"
    ]
  },
  "nucleia_3_clean_q": {
    "key": "nucleia_3_clean_q",
    "name": "Nucleia 3 Clean-Q",
    "category": "Extraction Kit",
    "productLine": "Nucleia",
    "description": "Manual nucleic-acid extraction kit for bacteria, yeasts and molds, using common lab equipment.",
    "presentations": [
      {
        "catalogCode": "V-EQ18",
        "format": "Tube",
        "size": "96 reactions",
        "kitContent": "• 96 Tubes A\n• 96 Tubes Q  -  400 µL\n• 5 Bottles of Resuspension Solution - 10 mL",
        "isReadyToUse": false,
        "pcrTimeMin": "-",
        "incubationTimeH": "-",
        "shelfLifeMonths": "12",
        "storeTemp": "2°C to 25°C",
        "dye": "-"
      }
    ],
    "features": [
      "Versatile manual extraction of bacteria, yeasts and molds from foods, beverages, environmental samples and surfaces.",
      "Robust manual extraction for routine PCR: sample preparation via standardized steps using common lab equipment.",
      "Combined thermal and mechanical disruption with resin designed to capture PCR inhibitors.",
      "50 min workflow for 24 samples with 20 min analyst hands-on time, applicable to food and surface matrices.",
      "Allows extending control beyond pathogens to indicators and spoilage, while keeping a simple manual workflow for QA/QC."
    ],
    "mainIndustries": [
      "Beverage",
      "Confectionery",
      "Dairy",
      "Fresh & Processed Produce",
      "Nutraceutical",
      "Pet Food & Animal Feed",
      "Pharmaceutical",
      "Ready-to-eat",
      "Sauces and condiments",
      "Sterile products",
      "Beer",
      "Wine"
    ]
  },
  "nucleia_4_bacteria_yeast_and_molds": {
    "key": "nucleia_4_bacteria_yeast_and_molds",
    "name": "Nucleia 4 Bacteria, Yeast and Molds",
    "category": "Extraction Kit",
    "productLine": "Nucleia",
    "description": "Manual extraction kit for bacteria, yeasts and molds in alcoholic beverages and surface samples.",
    "presentations": [
      {
        "catalogCode": "V-EQ30",
        "format": "Tube",
        "size": "96 reactions",
        "kitContent": "• 96 Tubes A\n• 2 Bottles of Extraction Buffer - 12 mL\n• 3 Bottles of Wash Solution - 200 mL\n• 4 Bottles of Resuspenson Solution - 12 mL",
        "isReadyToUse": false,
        "pcrTimeMin": "-",
        "incubationTimeH": "-",
        "shelfLifeMonths": "12",
        "storeTemp": "2°C to 25°C",
        "dye": "-"
      }
    ],
    "features": [
      "Specialized manual extraction for bacteria, yeasts and molds in alcoholic/non-alcoholic beverages, concentrates and surfaces.",
      "Robust manual extraction for routine PCR: sample preparation via standardized steps using common lab equipment.",
      "Protocols adaptable to surface samples, filtered and enriched samples, and highly complex matrices with Clarixa 1 where applicable.",
      "45 min extraction for 24 samples with 20 min analyst hands-on time; compatible with spoilage control in beverages and surfaces.",
      "Enables frequent spoilage monitoring to prevent shelf-life failures, turbidity, gas formation, sensory changes or complaints."
    ],
    "mainIndustries": [
      "Beverage",
      "Sauces and condiments",
      "Beer",
      "Wine"
    ]
  },
  "nucleia_4_bacteria_yeast_and_molds_plus": {
    "key": "nucleia_4_bacteria_yeast_and_molds_plus",
    "name": "Nucleia 4 Bacteria, Yeast and Molds Plus",
    "category": "Extraction Kit",
    "productLine": "Nucleia",
    "description": "Manual extraction kit for bacteria, yeasts and molds in beer, alcoholic and non-alcoholic beverages and fruit concentrates.",
    "presentations": [
      {
        "catalogCode": "V-EQ46",
        "format": "Tube",
        "size": "96 reactions",
        "kitContent": "• 96 Tubes A\n• 2 Bottles of Extraction Buffer - 12 mL\n• 3 Bottles of Resuspenson Solution - 14 mL",
        "isReadyToUse": false,
        "pcrTimeMin": "-",
        "incubationTimeH": "-",
        "shelfLifeMonths": "12",
        "storeTemp": "2°C to 25°C",
        "dye": "-"
      }
    ],
    "features": [
      "Optimized for beverages: extraction of bacteria, yeasts and molds in unenriched beer and enriched samples of alcoholic and non-alcoholic beverages and concentrates.",
      "Robust manual workflow for routine PCR: standardized steps with common lab equipment and strong compatibility with beverage matrices.",
      "Two productivity options: standard 45-minute protocol for 24 samples and fast 36-minute protocol for 24 samples.",
      "Safe stopping point: extracted genetic material can be stored for less than 24 hours at 2-8 C or up to 30 days at -25 C to -15 C.",
      "Operational flexibility for beverage plants: allows extraction and PCR to be separated, speeds routine monitoring and supports response to quality deviations."
    ],
    "mainIndustries": [
      "Beverage",
      "Sauces and condiments",
      "Beer",
      "Wine"
    ]
  },
  "nucleia_8_ultra": {
    "key": "nucleia_8_ultra",
    "name": "Nucleia 8 Ultra",
    "category": "Extraction Kit",
    "productLine": "Nucleia",
    "description": "Enzymatic extraction kit that releases bacterial nucleic acids from samples with a simple and fast workflow.",
    "presentations": [
      {
        "catalogCode": "V-EE03",
        "format": "Bottle",
        "size": "96 reactions",
        "kitContent": "• 2 bottles of Buffer 1 – 32 mL  \n• 2 tubes of Resuspension Solution – 1.8 mL  \n• 1 tube of Enzyme 1  \n• 1 tube of Enzyme 2",
        "isReadyToUse": false,
        "pcrTimeMin": "-",
        "incubationTimeH": "-",
        "shelfLifeMonths": "12",
        "storeTemp": "2°C to 25°C",
        "dye": "-"
      }
    ],
    "features": [
      "Controlled enzymatic lysis: temperature-activated, heat-inactivated enzymatic treatment to recover intact nucleic acids.",
      "Robust manual extraction for routine PCR: sample preparation via standardized steps using common lab equipment.",
      "45 min extraction for 24 swab/sponges/food samples; safe stopping point up to 30 days frozen.",
      "Supports fast response in monitoring pathogens, helping make early decisions on sanitation, line release or investigation."
    ],
    "mainIndustries": [
      "Confectionery",
      "Dairy",
      "Egg Products",
      "Fresh & Processed Produce",
      "Meat and Poultry",
      "Pet Food & Animal Feed",
      "Ready-to-eat",
      "Seafood"
    ]
  },
  "potentia_1_salmonella_spp": {
    "key": "potentia_1_salmonella_spp",
    "name": "Potentia 1 Salmonella spp.",
    "category": "Medium supplement",
    "productLine": "Potentia",
    "description": "Growth enhancer that improves Salmonella spp. recovery when added to Buffered Peptone Water.",
    "presentations": [
      {
        "catalogCode": "V-PET06",
        "format": "Powder",
        "size": "500 g",
        "kitContent": "• 1 Plastic bottle - 500 g",
        "isReadyToUse": false,
        "pcrTimeMin": "-",
        "incubationTimeH": "-",
        "shelfLifeMonths": "12",
        "storeTemp": "2°C to 25°C",
        "dye": "-"
      }
    ],
    "features": [
      "Growth activation: promotes Salmonella spp. proliferation to improve recovery.",
      "Optimized for cocoa matrices: validated for 62% cocoa chocolate and related complex samples.",
      "Improves detection sensitivity by increasing recoverable microorganisms before molecular analysis.",
      "Simple integration: incorporated into standard enrichment protocols without additional complex steps."
    ],
    "mainIndustries": [
      "Confectionery",
      "Egg Products",
      "Fresh & Processed Produce",
      "Meat and Poultry",
      "Pet Food & Animal Feed",
      "Ready-to-eat",
      "Seafood"
    ]
  },
  "potentia_2_listeria": {
    "key": "potentia_2_listeria",
    "name": "Potentia 2 Listeria",
    "category": "Medium supplement",
    "productLine": "Potentia",
    "description": "Supplement set that optimizes Listeria culture media for better target recovery.",
    "presentations": [
      {
        "catalogCode": "V-PET05",
        "format": "Powder",
        "size": "3 vials",
        "kitContent": "• 3 vials",
        "isReadyToUse": false,
        "pcrTimeMin": "-",
        "incubationTimeH": "-",
        "shelfLifeMonths": "12",
        "storeTemp": "2°C to 8°C",
        "dye": "-"
      }
    ],
    "features": [
      "Targeted supplementation for Listeria culture media.",
      "Supports enrichment prior to microbiological or molecular analysis.",
      "Aimed at workflows requiring Listeria spp. recovery."
    ],
    "mainIndustries": [
      "Confectionery",
      "Dairy",
      "Egg Products",
      "Fresh & Processed Produce",
      "Meat and Poultry",
      "Nutraceutical",
      "Pet Food & Animal Feed",
      "Ready-to-eat",
      "Sauces and condiments",
      "Seafood"
    ]
  },
  "specio_00_1_bacteria": {
    "key": "specio_00_1_bacteria",
    "name": "Specio 00.1 Bacteria",
    "category": "PCR Kit",
    "productLine": "Specio",
    "description": "Real-time PCR kit that detects and identifies spoilage bacteria by melting-curve analysis — a simple multiplex workflow for matrix-specific spoilage control.",
    "presentations": [
      {
        "catalogCode": "V-SF14",
        "format": "SPID",
        "size": "96 reactions",
        "kitContent": "• 12 Preloaded PCR strips\n• 1 Tube of Specio 00.1 Positive control – 100 µL\n• 1 Tube of Negative control – 352 µL",
        "isReadyToUse": true,
        "pcrTimeMin": "120",
        "incubationTimeH": "-",
        "shelfLifeMonths": "9",
        "storeTemp": "-25°C to -15°C",
        "dye": "FAM"
      }
    ],
    "features": [],
    "mainIndustries": [
      "Beverage",
      "Confectionery",
      "Dairy",
      "Fresh & Processed Produce",
      "Nutraceutical",
      "Pet Food & Animal Feed",
      "Pharmaceutical",
      "Ready-to-eat",
      "Sauces and condiments",
      "Sterile products",
      "Beer"
    ]
  },
  "specio_00_2_yeast_molds": {
    "key": "specio_00_2_yeast_molds",
    "name": "Specio 00.2 Yeast & Molds",
    "category": "PCR Kit",
    "productLine": "Specio",
    "description": "Real-time PCR kit that detects and identifies spoilage yeasts and molds by melting-curve analysis — a simple multiplex workflow for matrix-specific spoilage control.",
    "presentations": [
      {
        "catalogCode": "V-SF15",
        "format": "SPID",
        "size": "96 reactions",
        "kitContent": "• 12 Preloaded PCR strips\n• 1 Tube of Specio 00.2 Positive control – 100 µL\n• 1 Tube of Negative control – 352 µL",
        "isReadyToUse": true,
        "pcrTimeMin": "120",
        "incubationTimeH": "-",
        "shelfLifeMonths": "9",
        "storeTemp": "-25°C to -15°C",
        "dye": "FAM"
      }
    ],
    "features": [],
    "mainIndustries": [
      "Beverage",
      "Confectionery",
      "Dairy",
      "Nutraceutical",
      "Pet Food & Animal Feed",
      "Pharmaceutical",
      "Ready-to-eat",
      "Sauces and condiments",
      "Beer",
      "Wine"
    ]
  },
  "specio_1_1_salmonella_spp": {
    "key": "specio_1_1_salmonella_spp",
    "name": "Specio 1.1 Salmonella spp.",
    "category": "PCR Kit",
    "productLine": "Specio",
    "description": "Real-time PCR kit for detection of Salmonella spp. — a simple, easy-to-run single-target workflow.",
    "presentations": [
      {
        "catalogCode": "V-SF31",
        "format": "SPID",
        "size": "96 reactions",
        "kitContent": "• 12 Preloaded PCR strips\n• 1 Tube of Pathogens F Positive control – 100 µL\n• 1 Tube of Negative control – 352 µL",
        "isReadyToUse": true,
        "pcrTimeMin": "120",
        "incubationTimeH": "-",
        "shelfLifeMonths": "9",
        "storeTemp": "-25°C to -15°C",
        "dye": "FAM"
      }
    ],
    "features": [],
    "mainIndustries": [
      "Confectionery",
      "Egg Products",
      "Meat and Poultry",
      "Pet Food & Animal Feed",
      "Ready-to-eat"
    ]
  },
  "specio_1_2_s_aureus": {
    "key": "specio_1_2_s_aureus",
    "name": "Specio 1.2 S. aureus",
    "category": "PCR Kit",
    "productLine": "Specio",
    "description": "Real-time PCR kit for detection of Staphylococcus aureus — a simple, easy-to-run single-target workflow.",
    "presentations": [
      {
        "catalogCode": "V-SF39",
        "format": "SPID",
        "size": "96 reactions",
        "kitContent": "• 12 Preloaded PCR strips\n• 1 Tube of Pathogens F Positive control – 100 µL\n•  1 Tube of Negative control – 352 µL",
        "isReadyToUse": true,
        "pcrTimeMin": "120",
        "incubationTimeH": "-",
        "shelfLifeMonths": "9",
        "storeTemp": "-25°C to -15°C",
        "dye": "FAM"
      }
    ],
    "features": [],
    "mainIndustries": [
      "Dairy",
      "Egg Products",
      "Meat and Poultry",
      "Ready-to-eat",
      "Seafood"
    ]
  },
  "specio_1_3_e_coli": {
    "key": "specio_1_3_e_coli",
    "name": "Specio 1.3 E. coli",
    "category": "PCR Kit",
    "productLine": "Specio",
    "description": "Real-time PCR kit for detection of Escherichia coli — a simple, easy-to-run single-target workflow.",
    "presentations": [
      {
        "catalogCode": "V-SF167",
        "format": "SPID",
        "size": "96 reactions",
        "kitContent": "• 12 Preloaded PCR strips\n• 1 Tube of Pathogens F Positive control – 100 µL\n• 1 Tube of Negative control – 352 µL",
        "isReadyToUse": true,
        "pcrTimeMin": "120",
        "incubationTimeH": "-",
        "shelfLifeMonths": "9",
        "storeTemp": "-25°C to -15°C",
        "dye": "FAM"
      }
    ],
    "features": [],
    "mainIndustries": [
      "Confectionery",
      "Fresh & Processed Produce",
      "Meat and Poultry",
      "Ready-to-eat",
      "Seafood"
    ]
  },
  "specio_1_4_l_monocytogenes": {
    "key": "specio_1_4_l_monocytogenes",
    "name": "Specio 1.4 L. monocytogenes",
    "category": "PCR Kit",
    "productLine": "Specio",
    "description": "Real-time PCR kit for detection of Listeria monocytogenes — a simple, easy-to-run single-target workflow.",
    "presentations": [
      {
        "catalogCode": "V-SF28",
        "format": "SPID",
        "size": "96 reactions",
        "kitContent": "• 12 Preloaded PCR strips\n• 1 Tube of Pathogens F Positive control – 100 µL\n• 1 Tube of Negative control – 352 µL",
        "isReadyToUse": true,
        "pcrTimeMin": "120",
        "incubationTimeH": "-",
        "shelfLifeMonths": "9",
        "storeTemp": "-25°C to -15°C",
        "dye": "FAM"
      }
    ],
    "features": [],
    "mainIndustries": [
      "Dairy",
      "Fresh & Processed Produce",
      "Meat and Poultry",
      "Ready-to-eat",
      "Seafood"
    ]
  },
  "specio_1_7_zygosaccharomyces_bailii_and_parabailii": {
    "key": "specio_1_7_zygosaccharomyces_bailii_and_parabailii",
    "name": "Specio 1.7 Zygosaccharomyces bailii and parabailii",
    "category": "PCR Kit",
    "productLine": "Specio",
    "description": "Real-time PCR kit for detection of Zygosaccharomyces bailii and parabailii — a simple, easy-to-run workflow for spoilage yeasts.",
    "presentations": [
      {
        "catalogCode": "V-SF45",
        "format": "SPID",
        "size": "96 reactions",
        "kitContent": "• 12 Preloaded PCR strips\n• 1 Tube of Specio 1.7 Positive control – 100 µL\n• 1 Tube of Negative control – 352 µL",
        "isReadyToUse": true,
        "pcrTimeMin": "120",
        "incubationTimeH": "-",
        "shelfLifeMonths": "9",
        "storeTemp": "-25°C to -15°C",
        "dye": "FAM"
      }
    ],
    "features": [],
    "mainIndustries": [
      "Beverage",
      "Sauces and condiments"
    ]
  },
  "specio_1_8_listeria_spp": {
    "key": "specio_1_8_listeria_spp",
    "name": "Specio 1.8 Listeria spp.",
    "category": "PCR Kit",
    "productLine": "Specio",
    "description": "Real-time PCR kit for detection of Listeria spp. — a simple, easy-to-run single-target workflow.",
    "presentations": [
      {
        "catalogCode": "V-SF52",
        "format": "SPID",
        "size": "96 reactions",
        "kitContent": "• 12 Preloaded PCR strips\n• 1 Tube of Pathogens F Positive control – 100 µL\n• 1 Tube of Negative control – 352 µL",
        "isReadyToUse": true,
        "pcrTimeMin": "120",
        "incubationTimeH": "-",
        "shelfLifeMonths": "9",
        "storeTemp": "-25°C to -15°C",
        "dye": "FAM"
      }
    ],
    "features": [],
    "mainIndustries": [
      "Dairy",
      "Fresh & Processed Produce",
      "Meat and Poultry",
      "Ready-to-eat",
      "Seafood"
    ]
  },
  "specio_2_2_s_aureus_and_e_coli": {
    "key": "specio_2_2_s_aureus_and_e_coli",
    "name": "Specio 2.2 S. aureus and E. coli",
    "category": "PCR Kit",
    "productLine": "Specio",
    "description": "Multiplex real-time PCR kit detecting S. aureus and E. coli in a single reaction — simple setup with fewer reactions per result.",
    "presentations": [
      {
        "catalogCode": "V-SF07",
        "format": "SPID",
        "size": "96 reactions",
        "kitContent": "• 12 Preloaded PCR strips\n• 1 Tube of Pathogens F Positive control – 100 µL\n• 1 Tube of Negative control – 352 µL",
        "isReadyToUse": true,
        "pcrTimeMin": "120",
        "incubationTimeH": "-",
        "shelfLifeMonths": "9",
        "storeTemp": "-25°C to -15°C",
        "dye": "FAM"
      }
    ],
    "features": [],
    "mainIndustries": [
      "Dairy",
      "Meat and Poultry",
      "Ready-to-eat",
      "Seafood"
    ]
  },
  "specio_2_3_listeria_spp_and_l_monocytogenes": {
    "key": "specio_2_3_listeria_spp_and_l_monocytogenes",
    "name": "Specio 2.3 Listeria spp. and L. monocytogenes",
    "category": "PCR Kit",
    "productLine": "Specio",
    "description": "Multiplex real-time PCR kit detecting Listeria spp. and L. monocytogenes in a single reaction — simple setup with fewer reactions per result.",
    "presentations": [
      {
        "catalogCode": "V-SF04",
        "format": "SPID",
        "size": "96 reactions",
        "kitContent": "• 12 Preloaded PCR strips\n• 1 Tube of 2.3 Positive control – 100 µL\n• 1 Tube of Negative control – 352 µL",
        "isReadyToUse": true,
        "pcrTimeMin": "120",
        "incubationTimeH": "-",
        "shelfLifeMonths": "9",
        "storeTemp": "-25°C to -15°C",
        "dye": "FAM"
      }
    ],
    "features": [],
    "mainIndustries": [
      "Dairy",
      "Fresh & Processed Produce",
      "Meat and Poultry",
      "Ready-to-eat",
      "Seafood"
    ]
  },
  "specio_2_4_e_coli_and_e_coli_o157_h7": {
    "key": "specio_2_4_e_coli_and_e_coli_o157_h7",
    "name": "Specio 2.4 E. coli and E. coli O157:H7",
    "category": "PCR Kit",
    "productLine": "Specio",
    "description": "Multiplex real-time PCR kit detecting E. coli and E. coli O157:H7 in a single reaction — simple setup with fewer reactions per result.",
    "presentations": [
      {
        "catalogCode": "V-SF05",
        "format": "SPID",
        "size": "96 reactions",
        "kitContent": "• 12 Preloaded PCR strips\n• 1 Tube of Specio 2.4 Positive control – 100 µL\n• 1 Tube of Negative control – 352 µL",
        "isReadyToUse": true,
        "pcrTimeMin": "120",
        "incubationTimeH": "-",
        "shelfLifeMonths": "9",
        "storeTemp": "-25°C to -15°C",
        "dye": "FAM"
      }
    ],
    "features": [],
    "mainIndustries": [
      "Fresh & Processed Produce",
      "Meat and Poultry",
      "Ready-to-eat",
      "Seafood"
    ]
  },
  "specio_2_5_salmonella_spp_and_l_monocytogenes": {
    "key": "specio_2_5_salmonella_spp_and_l_monocytogenes",
    "name": "Specio 2.5 Salmonella spp. and L. monocytogenes",
    "category": "PCR Kit",
    "productLine": "Specio",
    "description": "Multiplex real-time PCR kit detecting Salmonella spp. and L. monocytogenes in a single reaction — simple setup with fewer reactions per result.",
    "presentations": [
      {
        "catalogCode": "V-SF29",
        "format": "SPID",
        "size": "96 reactions",
        "kitContent": "• 12 Preloaded PCR strips\n• 1 Tube of Pathogens F Positive control – 100 µL\n• 1 Tube of Negative control – 352 µL",
        "isReadyToUse": true,
        "pcrTimeMin": "120",
        "incubationTimeH": "-",
        "shelfLifeMonths": "9",
        "storeTemp": "-25°C to -15°C",
        "dye": "FAM"
      }
    ],
    "features": [],
    "mainIndustries": [
      "Confectionery",
      "Egg Products",
      "Meat and Poultry",
      "Pet Food & Animal Feed",
      "Ready-to-eat",
      "Seafood"
    ]
  },
  "specio_2_7_salmonella_spp_and_e_coli": {
    "key": "specio_2_7_salmonella_spp_and_e_coli",
    "name": "Specio 2.7 Salmonella spp. and E. coli",
    "category": "PCR Kit",
    "productLine": "Specio",
    "description": "Multiplex real-time PCR kit detecting Salmonella spp. and E. coli in a single reaction.",
    "presentations": [
      {
        "catalogCode": "V-SF25",
        "format": "SPID",
        "size": "96 reactions",
        "kitContent": "• 12 Preloaded PCR strips\n• 1 Tube of Pathogens F Positive control – 100 µL\n• 1 Tube of Negative control – 352 µL",
        "isReadyToUse": true,
        "pcrTimeMin": "120",
        "incubationTimeH": "-",
        "shelfLifeMonths": "9",
        "storeTemp": "-25°C to -15°C",
        "dye": "FAM"
      }
    ],
    "features": [],
    "mainIndustries": [
      "Confectionery",
      "Fresh & Processed Produce",
      "Meat and Poultry",
      "Pet Food & Animal Feed",
      "Ready-to-eat"
    ]
  },
  "specio_3_2_salmonella_spp_l_monocytogenes_and_e_coli_o157_h7": {
    "key": "specio_3_2_salmonella_spp_l_monocytogenes_and_e_coli_o157_h7",
    "name": "Specio 3.2 Salmonella spp., L. monocytogenes and E. coli O157:H7",
    "category": "PCR Kit",
    "productLine": "Specio",
    "description": "Multiplex real-time PCR kit detecting Salmonella spp., L. monocytogenes and E. coli O157:H7 in one reaction — simple setup with fewer reactions per result.",
    "presentations": [
      {
        "catalogCode": "V-SF56",
        "format": "SPID",
        "size": "96 reactions",
        "kitContent": "• 12 Preloaded PCR strips\n• 1 Tube of Specio 3.2 Positive control – 100 µL\n• 1 Tube of Negative control – 352 µL",
        "isReadyToUse": true,
        "pcrTimeMin": "120",
        "incubationTimeH": "-",
        "shelfLifeMonths": "9",
        "storeTemp": "-25°C to -15°C",
        "dye": "FAM"
      }
    ],
    "features": [],
    "mainIndustries": [
      "Confectionery",
      "Dairy",
      "Egg Products",
      "Fresh & Processed Produce",
      "Meat and Poultry",
      "Pet Food & Animal Feed",
      "Ready-to-eat",
      "Seafood"
    ]
  },
  "specio_4_1_salmonella_spp_l_monocytogenes_e_coli_and_s_aureus": {
    "key": "specio_4_1_salmonella_spp_l_monocytogenes_e_coli_and_s_aureus",
    "name": "Specio 4.1 Salmonella spp., L. monocytogenes, E. coli and S. aureus",
    "category": "PCR Kit",
    "productLine": "Specio",
    "description": "Multiplex real-time PCR kit detecting Salmonella spp., S. aureus, E. coli and L. monocytogenes in a single reaction — four pathogens at once, with fewer reactions per result.",
    "presentations": [
      {
        "catalogCode": "V-SF42",
        "format": "SPID",
        "size": "96 reactions",
        "kitContent": "• 12 Preloaded PCR strips\n• 1 Tube of Pathogens F Positive control – 100 µL\n• 1 Tube of Negative control – 352 µL",
        "isReadyToUse": true,
        "pcrTimeMin": "120",
        "incubationTimeH": "-",
        "shelfLifeMonths": "9",
        "storeTemp": "-25°C to -15°C",
        "dye": "FAM"
      },
      {
        "catalogCode": "V-SF95",
        "format": "SPID",
        "size": "480 reactions",
        "kitContent": "• 60 Preloaded PCR strips\n• 5 Tubes of Pathogens F Positive control – 100 µL\n• 5 Tubes of Negative control – 352 µL",
        "isReadyToUse": true,
        "pcrTimeMin": "120",
        "incubationTimeH": "-",
        "shelfLifeMonths": "9",
        "storeTemp": "-25°C to -15°C",
        "dye": "FAM"
      },
      {
        "catalogCode": "V-SF30",
        "format": "Tube",
        "size": "96 reactions",
        "kitContent": "• 4 Tubes of Master mix Specio – 297 µL\n• 4 Tubes of Primer mix Specio 4.1 – 330 µL\n• 1 Tube of DNA Polymerase – 21 µL\n• 1 Tube of Positive control Pathogens F – 100 µL\n• 1 Tube of Negative control – 352 µL",
        "isReadyToUse": false,
        "pcrTimeMin": "120",
        "incubationTimeH": "-",
        "shelfLifeMonths": "12",
        "storeTemp": "-25°C to -15°C",
        "dye": "FAM"
      }
    ],
    "features": [],
    "mainIndustries": [
      "Confectionery",
      "Dairy",
      "Egg Products",
      "Fresh & Processed Produce",
      "Meat and Poultry",
      "Pet Food & Animal Feed",
      "Ready-to-eat",
      "Sauces and condiments",
      "Seafood"
    ]
  },
  "specio_4_8_pathogens_hygiene_indicators": {
    "key": "specio_4_8_pathogens_hygiene_indicators",
    "name": "Specio 4.8 Pathogens + Hygiene Indicators",
    "category": "PCR Kit",
    "productLine": "Specio",
    "description": "Multiplex real-time PCR kit detecting Salmonella spp., L. monocytogenes and key hygiene indicators in one reaction — pathogen and process control combined, with fewer reactions per result.",
    "presentations": [
      {
        "catalogCode": "V-SF184",
        "format": "SPID",
        "size": "96 reactions",
        "kitContent": "• 12 Preloaded PCR strips\n• 1 Tube of Pathogens F Positive control – 100 µL\n• 1 Tube of Negative control – 352 µL",
        "isReadyToUse": true,
        "pcrTimeMin": "120",
        "incubationTimeH": "-",
        "shelfLifeMonths": "9",
        "storeTemp": "-25°C to -15°C",
        "dye": "FAM"
      },
      {
        "catalogCode": "V-SF193",
        "format": "SPID",
        "size": "480 reactions",
        "kitContent": "• 60 Preloaded PCR strips\n• 5 Tubes of Pathogens F Positive control – 100 µL\n• 5 Tubes of Negative control – 352 µL",
        "isReadyToUse": true,
        "pcrTimeMin": "120",
        "incubationTimeH": "-",
        "shelfLifeMonths": "9",
        "storeTemp": "-25°C to -15°C",
        "dye": "FAM"
      },
      {
        "catalogCode": "V-SF190",
        "format": "Tube",
        "size": "96 reactions",
        "kitContent": "• 4 Tubes of Master mix Specio – 297 µL\n• 4 Tubes of Primer mix Specio 4.8 – 330 µL\n• 1 Tube of DNA Polymerase – 21 µL\n• 1 Tube of Positive control Pathogens F – 100 µL\n• 1 Tube of Negative control – 352 µL",
        "isReadyToUse": false,
        "pcrTimeMin": "120",
        "incubationTimeH": "-",
        "shelfLifeMonths": "9",
        "storeTemp": "-25°C to -15°C",
        "dye": "FAM"
      }
    ],
    "features": [],
    "mainIndustries": [
      "Confectionery",
      "Dairy",
      "Egg Products",
      "Fresh & Processed Produce",
      "Meat and Poultry",
      "Pet Food & Animal Feed",
      "Ready-to-eat",
      "Sauces and condiments",
      "Seafood"
    ]
  },
  "captus_xpress_2": {
    "key": "captus_xpress_2",
    "name": "Captus Xpress 2",
    "category": "Sampling Kit",
    "productLine": "Captus",
    "description": "Sponge-based surface sampling and short-enrichment device designed for Elevia kits, supporting a streamlined 3–4 hour enrichment workflow.",
    "presentations": [
      {
        "catalogCode": "V-FL48",
        "format": "Bottle",
        "size": "25 reactions",
        "kitContent": "• 25 Bottles Augmentis Xpress 1 - 30 mL\n• 25 Tubes Collectio 3 LetheenSampling - 10 mL\n• 25 Sponges",
        "isReadyToUse": false,
        "pcrTimeMin": "-",
        "incubationTimeH": "-",
        "shelfLifeMonths": "6",
        "storeTemp": "2°C to 8°C",
        "dye": "-"
      }
    ],
    "features": [
      "Combines sample collection and short enrichment in a single device, reducing manual steps and simplifying the workflow.",
      "Designed to support a reduced enrichment step of 3–4 hours before molecular testing with Elevia kits.",
      "Short enrichment can be performed using a small heat block, reducing equipment needs and enabling a simpler, more flexible workflow."
    ],
    "mainIndustries": [
      "Confectionery",
      "Dairy",
      "Egg Products",
      "Fresh & Processed Produce",
      "Meat and Poultry",
      "Pet Food & Animal Feed",
      "Ready-to-eat",
      "Seafood"
    ]
  },
  "captus_zero_1": {
    "key": "captus_zero_1",
    "name": "Captus Zero 1",
    "category": "Sampling Kit",
    "productLine": "Captus",
    "description": "Sample collection system for Elevia kits — designed for direct testing without enrichment.",
    "features": [
      "Designed to enable molecular testing without a traditional enrichment step, reducing total time-to-result to 3 hours.",
      "Developed specifically to integrate with Elevia kits, simplifying the path from sample collection to molecular detection.",
      "Enables earlier detection insights, supporting faster release, hold, investigation, or corrective actions."
    ],
    "mainIndustries": [],
    "presentations": [
      {
        "catalogCode": "V-TB36",
        "format": "Tube",
        "size": "100 reactions",
        "kitContent": "•  100 Bottles Letheen - 250 \n• 100 Swabs",
        "isReadyToUse": false,
        "pcrTimeMin": "-",
        "incubationTimeH": "-",
        "shelfLifeMonths": "12",
        "storeTemp": "2°C to 25°C",
        "dye": "-"
      }
    ]
  },
  "augmentis_xpress_1": {
    "key": "augmentis_xpress_1",
    "name": "Augmentis Xpress 1",
    "category": "Growth Medium",
    "productLine": "Augmentis",
    "description": "Sampling and enrichment device all in one for short enrichment (3-4 hrs) for use with Elevia kits.",
    "presentations": [
      {
        "catalogCode": "V-TB32",
        "format": "RTU",
        "size": "100 reactions",
        "kitContent": "• 100 Tubes - 2.2 mL",
        "isReadyToUse": true,
        "pcrTimeMin": "-",
        "incubationTimeH": "-",
        "shelfLifeMonths": "6",
        "storeTemp": "2°C to 25°C",
        "dye": "-"
      },
      {
        "catalogCode": "V-FL47",
        "format": "RTU",
        "size": "50 reactions",
        "kitContent": "• 50 Bottles - 30 mL",
        "isReadyToUse": true,
        "pcrTimeMin": "-",
        "incubationTimeH": "-",
        "shelfLifeMonths": "6",
        "storeTemp": "2°C to 25°C",
        "dye": "-"
      },
      {
        "catalogCode": "V-FL50",
        "format": "RTU",
        "size": "24 reactions",
        "kitContent": "• 24 Bottles - 100 mL",
        "isReadyToUse": true,
        "pcrTimeMin": "-",
        "incubationTimeH": "-",
        "shelfLifeMonths": "6",
        "storeTemp": "2°C to 25°C",
        "dye": "-"
      },
      {
        "catalogCode": "V-FP34",
        "format": "Powder",
        "size": "500 g",
        "kitContent": "• 1 Jar - 500 g",
        "isReadyToUse": false,
        "pcrTimeMin": "-",
        "incubationTimeH": "-",
        "shelfLifeMonths": "6",
        "storeTemp": "2°C to 25°C",
        "dye": "-"
      }
    ],
    "features": [
      "Supports surface sample enrichment workflows.",
      "Designed for reduced microbial growth from surface samples.",
      "Intended to prepare surface samples for downstream molecular testing."
    ],
    "mainIndustries": [
      "Confectionery",
      "Dairy",
      "Egg Products",
      "Fresh & Processed Produce",
      "Meat and Poultry",
      "Pet Food & Animal Feed",
      "Ready-to-eat",
      "Seafood"
    ]
  },
  "captus_xpress_1": {
    "key": "captus_xpress_1",
    "name": "Captus Xpress 1",
    "category": "Sampling Kit",
    "productLine": "Captus",
    "description": "All-in-one swab-based surface sampling and short-enrichment device for Elevia kits, enabling streamlined sample collection and rapid 3–4 hour enrichment in a single workflow.",
    "presentations": [
      {
        "catalogCode": "V-TB37",
        "format": "Tube",
        "size": "100 reactions",
        "kitContent": "• 100 Tubes Augmentis Xpress 1 - 2.2 mL\n• 100 Tubes Letheen - 250 µL\n• 100 Swabs",
        "isReadyToUse": false,
        "pcrTimeMin": "-",
        "incubationTimeH": "-",
        "shelfLifeMonths": "6",
        "storeTemp": "2°C to 25°C",
        "dye": "-"
      }
    ],
    "features": [
      "Combines sample collection and short enrichment in a single device, reducing manual steps and simplifying the workflow.",
      "Designed to support a reduced enrichment step of 3–4 hours before molecular testing with Elevia kits.",
      "Short enrichment can be performed using a small heat block, reducing equipment needs and enabling a simpler, more flexible workflow."
    ],
    "mainIndustries": [
      "Confectionery",
      "Dairy",
      "Egg Products",
      "Fresh & Processed Produce",
      "Meat and Poultry",
      "Pet Food & Animal Feed",
      "Ready-to-eat",
      "Seafood"
    ]
  },
  "ampliora_4_7_spoilage_beverage": {
    "key": "ampliora_4_7_spoilage_beverage",
    "name": "Ampliora 4.7 Spoilage Beverage",
    "category": "PCR Kit",
    "productLine": "Ampliora",
    "description": "Multiplex real-time PCR kit for low-pH spoilage organisms (Brettanomyces, acidophilic bacteria, preservative-resistant yeasts, molds) — targeted control for acidified products.",
    "presentations": [
      {
        "catalogCode": "V-EQ30",
        "format": "SPID",
        "size": "96 reactions",
        "kitContent": "• 12 Preloaded PCR strips\n• 1 Tube of Ampliora 4.7 Positive control – 100 µL\n• 1 Tube of Negative control – 352 µL",
        "isReadyToUse": true,
        "pcrTimeMin": "80",
        "incubationTimeH": "-",
        "shelfLifeMonths": "6",
        "storeTemp": "-25°C to -15°C",
        "dye": "FAM, HEX, ROX, Cy5 and Cy5.5"
      }
    ],
    "features": [],
    "mainIndustries": [
      "Beverage"
    ]
  },
  "alkaline_peptone_water_apw": {
    "key": "alkaline_peptone_water_apw",
    "name": "Alkaline Peptone Water (APW)",
    "category": "Commercial medium",
    "productLine": null,
    "description": "Generic commercial medium — available from any standard microbiology supplier, not a TAAG product.",
    "features": [],
    "mainIndustries": [],
    "presentations": []
  },
  "lactobacilli_mrs_broth": {
    "key": "lactobacilli_mrs_broth",
    "name": "Lactobacilli MRS broth",
    "category": "Commercial medium",
    "productLine": null,
    "description": "Generic commercial medium — available from any standard microbiology supplier, not a TAAG product.",
    "features": [],
    "mainIndustries": [],
    "presentations": []
  }
};