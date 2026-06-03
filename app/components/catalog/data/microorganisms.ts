// microorganisms.ts — EDIT THIS FILE BY HAND.
// Catalog of organisms the selector can target. Every protocol "targets" entry
// (in protocols.ts) must reference an id that exists here.
//   type: controls grouping + tag color in the UI.
//   needsReview: optional note to yourself that a classification is unconfirmed (UI ignores it).

export type MicroorganismType = "PATHOGEN" | "INDICATOR" | "SPOILAGE";

export interface Microorganism {
  id: string;
  name: string;
  shortName: string;
  type: MicroorganismType;
  needsReview?: boolean;
}

export const MICROORGANISMS: Microorganism[] = [
  {
    "id": "acidophilic_bacteria",
    "name": "acidophilic bacteria",
    "shortName": "acidophilic bacteria",
    "type": "SPOILAGE"
  },
  {
    "id": "alicyclobacillus_spp",
    "name": "Alicyclobacillus spp.",
    "shortName": "Alicyclobacillus",
    "type": "SPOILAGE"
  },
  {
    "id": "brettanomyces_bruxellensis",
    "name": "Brettanomyces bruxellensis",
    "shortName": "B. bruxellensis",
    "type": "SPOILAGE"
  },
  {
    "id": "brettanomyces_spp",
    "name": "Brettanomyces spp.",
    "shortName": "Brettanomyces",
    "type": "SPOILAGE"
  },
  {
    "id": "citrobacter_spp",
    "name": "Citrobacter spp.",
    "shortName": "Citrobacter",
    "type": "INDICATOR",
    "needsReview": true
  },
  {
    "id": "e_coli_o157_h7",
    "name": "E. coli O157:H7",
    "shortName": "E. coli O157:H7",
    "type": "PATHOGEN"
  },
  {
    "id": "e_coli_stec",
    "name": "E. coli STEC",
    "shortName": "E. coli STEC",
    "type": "PATHOGEN"
  },
  {
    "id": "enterobacter_spp",
    "name": "Enterobacter spp.",
    "shortName": "Enterobacter",
    "type": "INDICATOR",
    "needsReview": true
  },
  {
    "id": "enterobacteria",
    "name": "Enterobacteria",
    "shortName": "Enterobacteria",
    "type": "INDICATOR",
    "needsReview": true
  },
  {
    "id": "enterococcus_spp",
    "name": "Enterococcus spp.",
    "shortName": "Enterococcus",
    "type": "INDICATOR",
    "needsReview": true
  },
  {
    "id": "escherichia_coli",
    "name": "Escherichia coli",
    "shortName": "E. coli",
    "type": "PATHOGEN"
  },
  {
    "id": "escherichia_spp",
    "name": "Escherichia spp.",
    "shortName": "Escherichia spp.",
    "type": "INDICATOR",
    "needsReview": true
  },
  {
    "id": "fecal_microorganism_indicator",
    "name": "Fecal microorganism indicator",
    "shortName": "Fecal microorganism indicator",
    "type": "INDICATOR",
    "needsReview": true
  },
  {
    "id": "guaiacol_producing_bacteria",
    "name": "guaiacol-producing bacteria",
    "shortName": "guaiacol-producing bacteria",
    "type": "SPOILAGE"
  },
  {
    "id": "inadequate_gmp_indicator",
    "name": "Inadequate GMP indicator",
    "shortName": "Inadequate GMP indicator",
    "type": "INDICATOR",
    "needsReview": true
  },
  {
    "id": "klebsiella_spp",
    "name": "Klebsiella spp.",
    "shortName": "Klebsiella",
    "type": "INDICATOR",
    "needsReview": true
  },
  {
    "id": "lactobacillus_backii",
    "name": "Lactobacillus backii",
    "shortName": "Lactobacillus backii",
    "type": "SPOILAGE"
  },
  {
    "id": "lactobacillus_brevis",
    "name": "Lactobacillus brevis",
    "shortName": "Lactobacillus brevis",
    "type": "SPOILAGE"
  },
  {
    "id": "lactobacillus_collinoides_paracollinoides",
    "name": "Lactobacillus collinoides/paracollinoides",
    "shortName": "Lactobacillus collinoides/paracollinoides",
    "type": "SPOILAGE"
  },
  {
    "id": "lactobacillus_group",
    "name": "Lactobacillus group",
    "shortName": "Lactobacillus group",
    "type": "SPOILAGE"
  },
  {
    "id": "lactobacillus_lindnerii",
    "name": "Lactobacillus lindnerii",
    "shortName": "Lactobacillus lindnerii",
    "type": "SPOILAGE"
  },
  {
    "id": "listeria_monocytogenes",
    "name": "Listeria monocytogenes",
    "shortName": "L. monocytogenes",
    "type": "PATHOGEN"
  },
  {
    "id": "listeria_spp",
    "name": "Listeria spp.",
    "shortName": "Listeria",
    "type": "PATHOGEN"
  },
  {
    "id": "megasphaera_spp",
    "name": "Megasphaera spp.",
    "shortName": "Megasphaera",
    "type": "SPOILAGE"
  },
  {
    "id": "molds",
    "name": "molds",
    "shortName": "molds",
    "type": "SPOILAGE"
  },
  {
    "id": "over_50_spoilage_yeast",
    "name": "over 50 spoilage yeast",
    "shortName": "over 50 spoilage yeast",
    "type": "SPOILAGE"
  },
  {
    "id": "over_80_spoilage_bacteria",
    "name": "over 80 spoilage bacteria",
    "shortName": "over 80 spoilage bacteria",
    "type": "SPOILAGE"
  },
  {
    "id": "pectinatus_spp",
    "name": "Pectinatus spp.",
    "shortName": "Pectinatus",
    "type": "SPOILAGE"
  },
  {
    "id": "pediococcus_spp",
    "name": "Pediococcus spp.",
    "shortName": "Pediococcus",
    "type": "SPOILAGE"
  },
  {
    "id": "pichia_spp",
    "name": "Pichia spp.",
    "shortName": "Pichia",
    "type": "SPOILAGE"
  },
  {
    "id": "preservative_resistant_yeasts",
    "name": "preservative-resistant yeasts",
    "shortName": "preservative-resistant yeasts",
    "type": "SPOILAGE"
  },
  {
    "id": "saccharomyces_cerevisiae",
    "name": "Saccharomyces cerevisiae",
    "shortName": "S. cerevisiae",
    "type": "SPOILAGE"
  },
  {
    "id": "saccharomyces_cerevisiae_var_diastaticus",
    "name": "Saccharomyces cerevisiae var. diastaticus",
    "shortName": "Saccharomyces cerevisiae var. diastaticus",
    "type": "SPOILAGE"
  },
  {
    "id": "saccharomyces_spp",
    "name": "Saccharomyces spp.",
    "shortName": "Saccharomyces spp.",
    "type": "SPOILAGE"
  },
  {
    "id": "salmonella_spp",
    "name": "Salmonella spp.",
    "shortName": "Salmonella",
    "type": "PATHOGEN"
  },
  {
    "id": "staphylococcus_aureus",
    "name": "Staphylococcus aureus",
    "shortName": "S. aureus",
    "type": "PATHOGEN"
  },
  {
    "id": "vibrio_cholerae",
    "name": "Vibrio cholerae",
    "shortName": "Vibrio cholerae",
    "type": "PATHOGEN"
  },
  {
    "id": "vibrio_parahaemolyticus",
    "name": "Vibrio parahaemolyticus",
    "shortName": "Vibrio parahaemolyticus",
    "type": "PATHOGEN"
  },
  {
    "id": "vibrio_vulnificus",
    "name": "Vibrio vulnificus",
    "shortName": "Vibrio vulnificus",
    "type": "PATHOGEN"
  },
  {
    "id": "yeasts",
    "name": "yeasts",
    "shortName": "yeasts",
    "type": "SPOILAGE"
  },
  {
    "id": "zygosaccharomyces_bailii",
    "name": "Zygosaccharomyces bailii",
    "shortName": "Z. bailii",
    "type": "SPOILAGE"
  },
  {
    "id": "zygosaccharomyces_bailii_parabailii",
    "name": "Zygosaccharomyces bailii/parabailii",
    "shortName": "Z. bailii/parabailii",
    "type": "SPOILAGE"
  },
  {
    "id": "zygosaccharomyces_group",
    "name": "Zygosaccharomyces group",
    "shortName": "Zygosaccharomyces",
    "type": "SPOILAGE"
  },
  {
    "id": "zygosaccharomyces_spp",
    "name": "Zygosaccharomyces spp.",
    "shortName": "Zygosaccharomyces spp.",
    "type": "SPOILAGE"
  }
];
