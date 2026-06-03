// industries.ts — EDIT THIS FILE BY HAND.
// Which microorganism ids are relevant per industry (drives step 2 of the selector).
// Industry "name" must match the industry names referenced by protocols (see workflowData.ts).
// Every id listed must exist in microorganisms.ts.

export interface IndustryDef {
  name: string;
  microorganisms: string[];
}

export const INDUSTRIES: IndustryDef[] = [
  {
    "name": "Beer & Wine",
    "microorganisms": [
      "brettanomyces_bruxellensis",
      "brettanomyces_spp",
      "lactobacillus_backii",
      "lactobacillus_brevis",
      "lactobacillus_collinoides_paracollinoides",
      "lactobacillus_group",
      "lactobacillus_lindnerii",
      "megasphaera_spp",
      "molds",
      "over_50_spoilage_yeast",
      "over_80_spoilage_bacteria",
      "pectinatus_spp",
      "pediococcus_spp",
      "pichia_spp",
      "saccharomyces_cerevisiae",
      "saccharomyces_cerevisiae_var_diastaticus",
      "saccharomyces_spp",
      "zygosaccharomyces_bailii_parabailii",
      "zygosaccharomyces_group"
    ]
  },
  {
    "name": "Beverage",
    "microorganisms": [
      "acidophilic_bacteria",
      "alicyclobacillus_spp",
      "brettanomyces_spp",
      "citrobacter_spp",
      "enterobacter_spp",
      "enterococcus_spp",
      "escherichia_coli",
      "escherichia_spp",
      "guaiacol_producing_bacteria",
      "klebsiella_spp",
      "molds",
      "over_50_spoilage_yeast",
      "over_80_spoilage_bacteria",
      "preservative_resistant_yeasts",
      "yeasts",
      "zygosaccharomyces_bailii",
      "zygosaccharomyces_bailii_parabailii",
      "zygosaccharomyces_spp"
    ]
  },
  {
    "name": "Confectionery",
    "microorganisms": [
      "e_coli_o157_h7",
      "e_coli_stec",
      "enterobacteria",
      "escherichia_coli",
      "fecal_microorganism_indicator",
      "inadequate_gmp_indicator",
      "listeria_monocytogenes",
      "listeria_spp",
      "molds",
      "over_50_spoilage_yeast",
      "over_80_spoilage_bacteria",
      "salmonella_spp",
      "staphylococcus_aureus"
    ]
  },
  {
    "name": "Dairy",
    "microorganisms": [
      "e_coli_o157_h7",
      "escherichia_coli",
      "fecal_microorganism_indicator",
      "inadequate_gmp_indicator",
      "listeria_monocytogenes",
      "listeria_spp",
      "molds",
      "over_50_spoilage_yeast",
      "over_80_spoilage_bacteria",
      "salmonella_spp",
      "staphylococcus_aureus"
    ]
  },
  {
    "name": "Egg Products",
    "microorganisms": [
      "e_coli_o157_h7",
      "e_coli_stec",
      "enterobacteria",
      "escherichia_coli",
      "fecal_microorganism_indicator",
      "inadequate_gmp_indicator",
      "listeria_monocytogenes",
      "listeria_spp",
      "salmonella_spp",
      "staphylococcus_aureus"
    ]
  },
  {
    "name": "Fresh & Processed Produce",
    "microorganisms": [
      "e_coli_o157_h7",
      "e_coli_stec",
      "enterobacteria",
      "escherichia_coli",
      "fecal_microorganism_indicator",
      "inadequate_gmp_indicator",
      "listeria_monocytogenes",
      "listeria_spp",
      "over_80_spoilage_bacteria",
      "salmonella_spp",
      "staphylococcus_aureus"
    ]
  },
  {
    "name": "Meat and Poultry",
    "microorganisms": [
      "e_coli_o157_h7",
      "e_coli_stec",
      "enterobacteria",
      "escherichia_coli",
      "fecal_microorganism_indicator",
      "inadequate_gmp_indicator",
      "listeria_monocytogenes",
      "listeria_spp",
      "salmonella_spp",
      "staphylococcus_aureus"
    ]
  },
  {
    "name": "Nutraceutical",
    "microorganisms": [
      "e_coli_o157_h7",
      "escherichia_coli",
      "listeria_monocytogenes",
      "listeria_spp",
      "molds",
      "over_50_spoilage_yeast",
      "over_80_spoilage_bacteria",
      "salmonella_spp"
    ]
  },
  {
    "name": "Pet Food & Animal Feed",
    "microorganisms": [
      "e_coli_o157_h7",
      "enterobacteria",
      "escherichia_coli",
      "fecal_microorganism_indicator",
      "inadequate_gmp_indicator",
      "listeria_monocytogenes",
      "listeria_spp",
      "molds",
      "over_50_spoilage_yeast",
      "over_80_spoilage_bacteria",
      "salmonella_spp",
      "staphylococcus_aureus"
    ]
  },
  {
    "name": "Pharmaceutical",
    "microorganisms": [
      "molds",
      "over_50_spoilage_yeast",
      "over_80_spoilage_bacteria"
    ]
  },
  {
    "name": "Ready-to-eat",
    "microorganisms": [
      "e_coli_o157_h7",
      "e_coli_stec",
      "enterobacteria",
      "escherichia_coli",
      "fecal_microorganism_indicator",
      "inadequate_gmp_indicator",
      "listeria_monocytogenes",
      "listeria_spp",
      "molds",
      "over_50_spoilage_yeast",
      "over_80_spoilage_bacteria",
      "salmonella_spp",
      "staphylococcus_aureus"
    ]
  },
  {
    "name": "Sauces and condiments",
    "microorganisms": [
      "acidophilic_bacteria",
      "alicyclobacillus_spp",
      "brettanomyces_spp",
      "e_coli_o157_h7",
      "escherichia_coli",
      "fecal_microorganism_indicator",
      "guaiacol_producing_bacteria",
      "inadequate_gmp_indicator",
      "listeria_monocytogenes",
      "molds",
      "over_50_spoilage_yeast",
      "over_80_spoilage_bacteria",
      "preservative_resistant_yeasts",
      "salmonella_spp",
      "staphylococcus_aureus",
      "yeasts",
      "zygosaccharomyces_bailii",
      "zygosaccharomyces_bailii_parabailii",
      "zygosaccharomyces_spp"
    ]
  },
  {
    "name": "Seafood",
    "microorganisms": [
      "e_coli_o157_h7",
      "escherichia_coli",
      "fecal_microorganism_indicator",
      "inadequate_gmp_indicator",
      "listeria_monocytogenes",
      "listeria_spp",
      "salmonella_spp",
      "staphylococcus_aureus",
      "vibrio_cholerae",
      "vibrio_parahaemolyticus",
      "vibrio_vulnificus"
    ]
  },
  {
    "name": "Sterile products",
    "microorganisms": [
      "over_80_spoilage_bacteria"
    ]
  }
];
