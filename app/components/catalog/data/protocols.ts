// protocols.ts — EDIT BY HAND. Main data file, regenerated from the source workbook.
// One entry per PCR kit (only kits that have protocol rows in the source are included).
// Products (and their presentations/catalog codes) live in products.ts; stages reference a
// product by `productKey`.
//
// NORMALIZATION RULES:
//   1. Sample type: always `sampleTypes` (array), inferred from each row's matrix text.
//   2. Time: option has flat `timeHours` (constant) — enrichment times come from the source;
//      sampling times are an invented 0.25h placeholder (timeEstimated: true).
//   3. `matrices[]` lists the matrices an enrichment option was validated on (when >1).
//   4. mainIndustries = industries the kit DECLARES (source main_industries), mapped to the
//      canonical industry names; used to filter which kits appear for a chosen industry.

export type StageKey = "sampling" | "enrichment" | "extraction" | "pcr";
export type SampleType = "Environmental" | "Finished";
export type ExecMode = "Manual" | "Automated";

export interface StageOption {
  productKey: string;
  sampleTypes: SampleType[];
  mode?: ExecMode | null;
  timeHours?: number | null;
  timeLabel?: string;        // shown instead of a formatted time when set (e.g. "X mins" = TODO)
  matrices?: string[];
  timeEstimated: boolean;
}
export interface PcrUse {
  productKey: string;
  timeHours: number | null;
  timeLabel?: string;        // shown instead of a formatted time when set (e.g. "X mins" = TODO)
  timeEstimated: boolean;
}
export interface KeyAdvantage {
  title: string;
  subtitle: string | null;
}
export interface ProtocolDef {
  id: string;
  name: string;
  productLine: string | null;
  catalogCode: string;
  productKey: string;
  targets: string[];
  mainIndustries: string[];
  technology: string | null;
  sensitivity: string | null;
  keyAdvantages: KeyAdvantage[];   // top "value brief" cards; shown above features
  features: string[];
  // Stages depend on the (kit, industry) pair: the same kit can use different enrichment
  // media and extraction kits per industry. Keyed by canonical industry name.
  stagesByIndustry: Record<string, {
    sampling: { options: StageOption[] };
    enrichment: { options: StageOption[] };
    extraction: { options: StageOption[] };
    pcr: PcrUse;
  }>;
}

export const PROTOCOLS: ProtocolDef[] = [
  {
    "id": "V-SF97",
    "name": "Ampliora 1.1 Salmonella spp.",
    "productLine": "Ampliora",
    "catalogCode": "V-SF97",
    "productKey": "ampliora_1_1_salmonella_spp",
    "targets": [
      "salmonella_spp"
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
    ],
    "technology": "Real-Time PCR - Mila",
    "sensitivity": "Food sample: 1 CFU/25 g\nSurface sample: 1 CFU/100 cm2",
    "keyAdvantages": [
      {
        "title": "Specific Salmonella ID",
        "subtitle": "Mila AI primer design"
      },
      {
        "title": "Faster than culture",
        "subtitle": "result before confirmation"
      },
      {
        "title": "Open platform",
        "subtitle": "runs on your instruments"
      },
      {
        "title": "Lower price",
        "subtitle": "below leading platforms"
      }
    ],
    "features": [
      "Mila AI-designed primers give specific, reliable Salmonella amplification with low cross-reactivity.",
      "Molecular result well before culture confirmation speeds lot release.",
      "Runs on open thermocyclers you already own — no proprietary instrument.",
      "Internal control monitors each reaction and supports automated TxA interpretation.",
      "Ready-to-use SPID format with preloaded strips cuts handling and speeds the run."
    ],
    "stagesByIndustry": {
      "Confectionery": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_1_1_salmonella_spp",
          "timeHours": 1.67,
          "timeEstimated": false
        }
      },
      "Egg Products": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_1_1_salmonella_spp",
          "timeHours": 1.67,
          "timeEstimated": false
        }
      },
      "Fresh & Processed Produce": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_1_1_salmonella_spp",
          "timeHours": 1.67,
          "timeEstimated": false
        }
      },
      "Meat and Poultry": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_1_1_salmonella_spp",
          "timeHours": 1.67,
          "timeEstimated": false
        }
      },
      "Nutraceutical": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_1_1_salmonella_spp",
          "timeHours": 1.67,
          "timeEstimated": false
        }
      },
      "Pet Food & Animal Feed": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_1_1_salmonella_spp",
          "timeHours": 1.67,
          "timeEstimated": false
        }
      },
      "Ready-to-eat": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_1_1_salmonella_spp",
          "timeHours": 1.67,
          "timeEstimated": false
        }
      },
      "Sauces and condiments": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_1_1_salmonella_spp",
          "timeHours": 1.67,
          "timeEstimated": false
        }
      },
      "Seafood": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_1_1_salmonella_spp",
          "timeHours": 1.67,
          "timeEstimated": false
        }
      }
    }
  },
  {
    "id": "V-SF69",
    "name": "Ampliora 1.3 E. coli",
    "productLine": "Ampliora",
    "catalogCode": "V-SF69",
    "productKey": "ampliora_1_3_e_coli",
    "targets": [
      "escherichia_coli"
    ],
    "mainIndustries": [
      "Confectionery",
      "Fresh & Processed Produce",
      "Meat and Poultry",
      "Nutraceutical",
      "Pet Food & Animal Feed",
      "Ready-to-eat",
      "Seafood"
    ],
    "technology": "Real-Time PCR - Mila",
    "sensitivity": null,
    "keyAdvantages": [
      {
        "title": "Specific E. coli ID",
        "subtitle": "Mila AI primer design"
      },
      {
        "title": "Faster hygiene checks",
        "subtitle": "speeds sanitation"
      },
      {
        "title": "Open platform",
        "subtitle": "runs on your instruments"
      },
      {
        "title": "Lower price",
        "subtitle": "below leading platforms"
      }
    ],
    "features": [
      "Mila AI-designed primers give specific, reliable E. coli detection with low cross-reactivity.",
      "Quick indicator result speeds hygiene verification and sanitation decisions.",
      "Runs on open thermocyclers you already own — no proprietary instrument.",
      "Internal control monitors each reaction and supports automated TxA interpretation.",
      "Ready-to-use SPID format with preloaded strips cuts handling and speeds the run."
    ],
    "stagesByIndustry": {
      "Confectionery": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_1_3_e_coli",
          "timeHours": 1.67,
          "timeEstimated": false
        }
      },
      "Fresh & Processed Produce": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_1_3_e_coli",
          "timeHours": 1.67,
          "timeEstimated": false
        }
      },
      "Meat and Poultry": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_1_3_e_coli",
          "timeHours": 1.67,
          "timeEstimated": false
        }
      },
      "Nutraceutical": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_1_3_e_coli",
          "timeHours": 1.67,
          "timeEstimated": false
        }
      },
      "Pet Food & Animal Feed": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_1_3_e_coli",
          "timeHours": 1.67,
          "timeEstimated": false
        }
      },
      "Ready-to-eat": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_1_3_e_coli",
          "timeHours": 1.67,
          "timeEstimated": false
        }
      },
      "Seafood": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_1_3_e_coli",
          "timeHours": 1.67,
          "timeEstimated": false
        }
      }
    }
  },
  {
    "id": "V-SF161",
    "name": "Ampliora 2.10 ACB plus Guaiacol producing gene",
    "productLine": "Ampliora",
    "catalogCode": "V-SF161",
    "productKey": "ampliora_2_10_acb_plus_guaiacol_producing_gene",
    "targets": [
      "alicyclobacillus_spp",
      "guaiacol_producing_bacteria"
    ],
    "mainIndustries": [
      "Beverage",
      "Sauces and condiments"
    ],
    "technology": "Real-Time PCR - Mila",
    "sensitivity": "1 CFU or spore per sample",
    "keyAdvantages": [
      {
        "title": "Detects guaiacol gene",
        "subtitle": "the taint marker itself"
      },
      {
        "title": "ACB + marker",
        "subtitle": "one reaction"
      },
      {
        "title": "Prevents taint",
        "subtitle": "protects flavor"
      },
      {
        "title": "~2 h screening",
        "subtitle": "direct workflow"
      }
    ],
    "features": [
      "Targets the guaiacol-producing gene — the molecular taint marker — not just the organism.",
      "Detects Alicyclobacillus and the guaiacol gene together in one reaction.",
      "Early guaiacol-risk detection protects beverage flavor and brand.",
      "Direct ~2 h screening keeps juice and concentrate lines moving.",
      "Internal control monitors each reaction and supports automated TxA interpretation."
    ],
    "stagesByIndustry": {
      "Beverage": {
        "sampling": {
          "options": []
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_6_ysg_broth",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_4_bacteria_yeast_and_molds_plus",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_2_10_acb_plus_guaiacol_producing_gene",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Sauces and condiments": {
        "sampling": {
          "options": []
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_6_ysg_broth",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_4_bacteria_yeast_and_molds_plus",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_2_10_acb_plus_guaiacol_producing_gene",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      }
    }
  },
  {
    "id": "V-SF46",
    "name": "Ampliora 2.3 Listeria spp. and L. monocytogenes",
    "productLine": "Ampliora",
    "catalogCode": "V-SF46",
    "productKey": "ampliora_2_3_listeria_spp_and_l_monocytogenes",
    "targets": [
      "listeria_spp",
      "listeria_monocytogenes"
    ],
    "mainIndustries": [
      "Dairy",
      "Fresh & Processed Produce",
      "Meat and Poultry",
      "Ready-to-eat",
      "Seafood"
    ],
    "technology": "Real-Time PCR - Mila",
    "sensitivity": null,
    "keyAdvantages": [
      {
        "title": "Species + genus",
        "subtitle": "L. mono vs Listeria spp."
      },
      {
        "title": "~50% fewer reactions",
        "subtitle": "one assay, not two"
      },
      {
        "title": "Sharper decisions",
        "subtitle": "species-level result"
      },
      {
        "title": "Open platform",
        "subtitle": "runs on your instruments"
      }
    ],
    "features": [
      "Distinguishes L. monocytogenes from Listeria spp. in one reaction via Mila multiplex design.",
      "Species-level answer in one assay guides the right corrective action immediately.",
      "Two targets in one reaction halve reagent and labor versus separate tests.",
      "Internal control monitors each reaction and supports automated TxA interpretation.",
      "Ready-to-use SPID format with preloaded strips cuts handling and speeds the run."
    ],
    "stagesByIndustry": {
      "Dairy": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 27.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_2_3_listeria_spp_and_l_monocytogenes",
          "timeHours": 1.58,
          "timeEstimated": false
        }
      },
      "Fresh & Processed Produce": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 27.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_2_3_listeria_spp_and_l_monocytogenes",
          "timeHours": 1.58,
          "timeEstimated": false
        }
      },
      "Meat and Poultry": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 27.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_2_3_listeria_spp_and_l_monocytogenes",
          "timeHours": 1.58,
          "timeEstimated": false
        }
      },
      "Ready-to-eat": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 27.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_2_3_listeria_spp_and_l_monocytogenes",
          "timeHours": 1.58,
          "timeEstimated": false
        }
      },
      "Seafood": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 27.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_2_3_listeria_spp_and_l_monocytogenes",
          "timeHours": 1.58,
          "timeEstimated": false
        }
      }
    }
  },
  {
    "id": "V-SF44",
    "name": "Ampliora 2.8 Listeria spp. and Salmonella spp.",
    "productLine": "Ampliora",
    "catalogCode": "V-SF44",
    "productKey": "ampliora_2_8_listeria_spp_and_salmonella_spp",
    "targets": [
      "listeria_spp",
      "salmonella_spp"
    ],
    "mainIndustries": [
      "Confectionery",
      "Dairy",
      "Fresh & Processed Produce",
      "Meat and Poultry",
      "Nutraceutical",
      "Pet Food & Animal Feed",
      "Ready-to-eat",
      "Seafood"
    ],
    "technology": "Real-Time PCR - Mila",
    "sensitivity": "Food sample: 1 CFU/25 g\nSurface sample: 1 CFU/100 cm2",
    "keyAdvantages": [
      {
        "title": "2 pathogens, 1 reaction",
        "subtitle": "Salmonella + Listeria"
      },
      {
        "title": "~50% fewer reactions",
        "subtitle": "one assay, not two"
      },
      {
        "title": "Faster release",
        "subtitle": "combined result"
      },
      {
        "title": "Open platform",
        "subtitle": "runs on your instruments"
      }
    ],
    "features": [
      "Detects Salmonella and Listeria together in one reaction via Mila multiplex design.",
      "Two pathogens in one assay halve reagent and labor versus separate tests.",
      "Combined result speeds the production release decision.",
      "Internal control monitors each reaction and supports automated TxA interpretation.",
      "Ready-to-use SPID format with preloaded strips cuts handling and speeds the run."
    ],
    "stagesByIndustry": {
      "Confectionery": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            },
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_2_8_listeria_spp_and_salmonella_spp",
          "timeHours": 1.67,
          "timeEstimated": false
        }
      },
      "Dairy": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            },
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_2_8_listeria_spp_and_salmonella_spp",
          "timeHours": 1.67,
          "timeEstimated": false
        }
      },
      "Fresh & Processed Produce": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            },
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_2_8_listeria_spp_and_salmonella_spp",
          "timeHours": 1.67,
          "timeEstimated": false
        }
      },
      "Meat and Poultry": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            },
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_2_8_listeria_spp_and_salmonella_spp",
          "timeHours": 1.67,
          "timeEstimated": false
        }
      },
      "Nutraceutical": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            },
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_2_8_listeria_spp_and_salmonella_spp",
          "timeHours": 1.67,
          "timeEstimated": false
        }
      },
      "Pet Food & Animal Feed": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            },
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_2_8_listeria_spp_and_salmonella_spp",
          "timeHours": 1.67,
          "timeEstimated": false
        }
      },
      "Ready-to-eat": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            },
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_2_8_listeria_spp_and_salmonella_spp",
          "timeHours": 1.67,
          "timeEstimated": false
        }
      },
      "Seafood": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            },
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_2_8_listeria_spp_and_salmonella_spp",
          "timeHours": 1.67,
          "timeEstimated": false
        }
      }
    }
  },
  {
    "id": "V-SF98",
    "name": "Ampliora 3.11 WaterScan",
    "productLine": "Ampliora",
    "catalogCode": "V-SF98",
    "productKey": "ampliora_3_11_waterscan",
    "targets": [
      "escherichia_coli",
      "citrobacter_spp",
      "klebsiella_spp"
    ],
    "mainIndustries": [
      "Beverage"
    ],
    "technology": "Real-Time PCR - Mila",
    "sensitivity": "From 4 CFU/filter\n\nSensitivity depends on the target microorganism.",
    "keyAdvantages": [
      {
        "title": "3 water indicators",
        "subtitle": "one reaction"
      },
      {
        "title": "~67% fewer reactions",
        "subtitle": "one assay, not three"
      },
      {
        "title": "Faster water release",
        "subtitle": "speeds decisions"
      },
      {
        "title": "Open platform",
        "subtitle": "runs on your instruments"
      }
    ],
    "features": [
      "Detects E. coli, Citrobacter and Klebsiella in one reaction via Mila multiplex design.",
      "Three water indicators per test give a fuller process-water picture in one run.",
      "Three targets in one assay cut reagent and labor by two-thirds versus separate tests.",
      "Quick result speeds process-water release decisions.",
      "Ready-to-use SPID format with preloaded strips cuts handling and speeds the run."
    ],
    "stagesByIndustry": {
      "Beverage": {
        "sampling": {
          "options": []
        },
        "enrichment": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_11_waterscan",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      }
    }
  },
  {
    "id": "V-SF89",
    "name": "Ampliora 3.12 WaterScan",
    "productLine": "Ampliora",
    "catalogCode": "V-SF89",
    "productKey": "ampliora_3_12_waterscan",
    "targets": [
      "enterococcus_spp",
      "enterobacter_spp",
      "escherichia_spp"
    ],
    "mainIndustries": [
      "Beverage"
    ],
    "technology": "Real-Time PCR - Mila",
    "sensitivity": "From 4 CFU/filter\n\nSensitivity depends on the target microorganism.",
    "keyAdvantages": [
      {
        "title": "3 water indicators",
        "subtitle": "one reaction"
      },
      {
        "title": "~67% fewer reactions",
        "subtitle": "one assay, not three"
      },
      {
        "title": "Faster water release",
        "subtitle": "speeds decisions"
      },
      {
        "title": "Open platform",
        "subtitle": "runs on your instruments"
      }
    ],
    "features": [
      "Detects Enterococcus, Enterobacter and Escherichia spp. in one reaction via Mila multiplex.",
      "Three water indicators per test give a fuller process-water picture in one run.",
      "Three targets in one assay cut reagent and labor by two-thirds versus separate tests.",
      "Quick result speeds process-water release decisions.",
      "Ready-to-use SPID format with preloaded strips cuts handling and speeds the run."
    ],
    "stagesByIndustry": {
      "Beverage": {
        "sampling": {
          "options": []
        },
        "enrichment": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_12_waterscan",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      }
    }
  },
  {
    "id": "V-SF160",
    "name": "Ampliora 3.13 ACB, Guaiacol producing gene plus Zygosaccharomyces spp.",
    "productLine": "Ampliora",
    "catalogCode": "V-SF160",
    "productKey": "ampliora_3_13_acb_guaiacol_producing_gene_plus_zygosaccharomyces_spp",
    "targets": [
      "alicyclobacillus_spp",
      "zygosaccharomyces_spp",
      "guaiacol_producing_bacteria"
    ],
    "mainIndustries": [
      "Beverage",
      "Sauces and condiments"
    ],
    "technology": "Real-Time PCR - Mila",
    "sensitivity": "1 CFU or spore per sample",
    "keyAdvantages": [
      {
        "title": "3 spoilage targets",
        "subtitle": "ACB, Zygo, guaiacol gene"
      },
      {
        "title": "~67% fewer reactions",
        "subtitle": "one assay, not three"
      },
      {
        "title": "Detects guaiacol gene",
        "subtitle": "the taint marker"
      },
      {
        "title": "Prevents taint",
        "subtitle": "protects flavor"
      }
    ],
    "features": [
      "Detects Alicyclobacillus, Zygosaccharomyces and the guaiacol gene together in one reaction.",
      "Targets the guaiacol-producing gene — the molecular taint marker — not just the organism.",
      "Three targets in one assay cut reagent and labor by two-thirds versus separate tests.",
      "Early detection protects beverage flavor and shelf life.",
      "Internal control monitors each reaction and supports automated TxA interpretation."
    ],
    "stagesByIndustry": {
      "Beverage": {
        "sampling": {
          "options": []
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_6_ysg_broth",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_4_bacteria_yeast_and_molds_plus",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_13_acb_guaiacol_producing_gene_plus_zygosaccharomyces_spp",
          "timeHours": 1.58,
          "timeEstimated": false
        }
      },
      "Sauces and condiments": {
        "sampling": {
          "options": []
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_6_ysg_broth",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_4_bacteria_yeast_and_molds_plus",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_13_acb_guaiacol_producing_gene_plus_zygosaccharomyces_spp",
          "timeHours": 1.58,
          "timeEstimated": false
        }
      }
    }
  },
  {
    "id": "V-SF67",
    "name": "Ampliora 3.2 Salmonella spp., L. monocytogenes and E. coli O157:H7",
    "productLine": "Ampliora",
    "catalogCode": "V-SF67",
    "productKey": "ampliora_3_2_salmonella_spp_l_monocytogenes_and_e_coli_o157_h7",
    "targets": [
      "salmonella_spp",
      "listeria_monocytogenes",
      "e_coli_o157_h7"
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
    ],
    "technology": "Real-Time PCR - Mila",
    "sensitivity": "From 8 CFU per sample\n\nSensitivity depends on the target microorganism.",
    "keyAdvantages": [
      {
        "title": "3 pathogens, 1 reaction",
        "subtitle": "Salmonella, L. mono, O157:H7"
      },
      {
        "title": "~67% fewer reactions",
        "subtitle": "one assay, not three"
      },
      {
        "title": "Comprehensive safety",
        "subtitle": "three critical targets"
      },
      {
        "title": "Open platform",
        "subtitle": "runs on your instruments"
      }
    ],
    "features": [
      "Detects Salmonella, L. monocytogenes and E. coli O157:H7 in one reaction via Mila multiplex.",
      "Three pathogens in one assay cut reagent and labor by two-thirds versus separate tests.",
      "Broad pathogen coverage per sample lowers recall risk.",
      "Internal control monitors each reaction and supports automated TxA interpretation.",
      "Ready-to-use SPID format with preloaded strips cuts handling and speeds the run."
    ],
    "stagesByIndustry": {
      "Confectionery": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_2_salmonella_spp_l_monocytogenes_and_e_coli_o157_h7",
          "timeHours": 1.67,
          "timeEstimated": false
        }
      },
      "Dairy": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_2_salmonella_spp_l_monocytogenes_and_e_coli_o157_h7",
          "timeHours": 1.67,
          "timeEstimated": false
        }
      },
      "Egg Products": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_2_salmonella_spp_l_monocytogenes_and_e_coli_o157_h7",
          "timeHours": 1.67,
          "timeEstimated": false
        }
      },
      "Fresh & Processed Produce": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_2_salmonella_spp_l_monocytogenes_and_e_coli_o157_h7",
          "timeHours": 1.67,
          "timeEstimated": false
        }
      },
      "Meat and Poultry": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_2_salmonella_spp_l_monocytogenes_and_e_coli_o157_h7",
          "timeHours": 1.67,
          "timeEstimated": false
        }
      },
      "Nutraceutical": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_2_salmonella_spp_l_monocytogenes_and_e_coli_o157_h7",
          "timeHours": 1.67,
          "timeEstimated": false
        }
      },
      "Pet Food & Animal Feed": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_2_salmonella_spp_l_monocytogenes_and_e_coli_o157_h7",
          "timeHours": 1.67,
          "timeEstimated": false
        }
      },
      "Ready-to-eat": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_2_salmonella_spp_l_monocytogenes_and_e_coli_o157_h7",
          "timeHours": 1.67,
          "timeEstimated": false
        }
      },
      "Sauces and condiments": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_2_salmonella_spp_l_monocytogenes_and_e_coli_o157_h7",
          "timeHours": 1.67,
          "timeEstimated": false
        }
      },
      "Seafood": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_2_salmonella_spp_l_monocytogenes_and_e_coli_o157_h7",
          "timeHours": 1.67,
          "timeEstimated": false
        }
      }
    }
  },
  {
    "id": "V-SF59",
    "name": "Ampliora 3.5 Salmonella spp., L. monocytogenes and Listeria spp.",
    "productLine": "Ampliora",
    "catalogCode": "V-SF59",
    "productKey": "ampliora_3_5_salmonella_spp_l_monocytogenes_and_listeria_spp",
    "targets": [
      "salmonella_spp",
      "listeria_monocytogenes",
      "listeria_spp"
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
      "Seafood"
    ],
    "technology": "Real-Time PCR - Mila",
    "sensitivity": "Food sample: 1 CFU/25 g\nSurface sample: 1 CFU/100 cm2",
    "keyAdvantages": [
      {
        "title": "3 targets, 1 reaction",
        "subtitle": "Salmonella + full Listeria"
      },
      {
        "title": "~67% fewer reactions",
        "subtitle": "one assay, not three"
      },
      {
        "title": "Sharper decisions",
        "subtitle": "species-level Listeria"
      },
      {
        "title": "Open platform",
        "subtitle": "runs on your instruments"
      }
    ],
    "features": [
      "Detects Salmonella, L. monocytogenes and Listeria spp. in one reaction via Mila multiplex.",
      "Pathogen plus species-level Listeria in one test sharpens corrective-action decisions.",
      "Three targets in one assay cut reagent and labor by two-thirds versus separate tests.",
      "Internal control monitors each reaction and supports automated TxA interpretation.",
      "Ready-to-use SPID format with preloaded strips cuts handling and speeds the run."
    ],
    "stagesByIndustry": {
      "Confectionery": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            },
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_5_salmonella_spp_l_monocytogenes_and_listeria_spp",
          "timeHours": 1.67,
          "timeEstimated": false
        }
      },
      "Dairy": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            },
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_5_salmonella_spp_l_monocytogenes_and_listeria_spp",
          "timeHours": 1.67,
          "timeEstimated": false
        }
      },
      "Egg Products": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            },
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_5_salmonella_spp_l_monocytogenes_and_listeria_spp",
          "timeHours": 1.67,
          "timeEstimated": false
        }
      },
      "Fresh & Processed Produce": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            },
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_5_salmonella_spp_l_monocytogenes_and_listeria_spp",
          "timeHours": 1.67,
          "timeEstimated": false
        }
      },
      "Meat and Poultry": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            },
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_5_salmonella_spp_l_monocytogenes_and_listeria_spp",
          "timeHours": 1.67,
          "timeEstimated": false
        }
      },
      "Nutraceutical": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            },
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_5_salmonella_spp_l_monocytogenes_and_listeria_spp",
          "timeHours": 1.67,
          "timeEstimated": false
        }
      },
      "Pet Food & Animal Feed": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            },
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_5_salmonella_spp_l_monocytogenes_and_listeria_spp",
          "timeHours": 1.67,
          "timeEstimated": false
        }
      },
      "Ready-to-eat": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            },
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_5_salmonella_spp_l_monocytogenes_and_listeria_spp",
          "timeHours": 1.67,
          "timeEstimated": false
        }
      },
      "Seafood": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            },
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_5_salmonella_spp_l_monocytogenes_and_listeria_spp",
          "timeHours": 1.67,
          "timeEstimated": false
        }
      }
    }
  },
  {
    "id": "V-SF74",
    "name": "Ampliora 3.5R Salmonella spp., L. monocytogenes and Listeria spp.",
    "productLine": "Ampliora",
    "catalogCode": "V-SF74",
    "productKey": "ampliora_3_5r_salmonella_spp_l_monocytogenes_and_listeria_spp",
    "targets": [
      "salmonella_spp",
      "listeria_monocytogenes",
      "listeria_spp"
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
      "Seafood"
    ],
    "technology": "Real-Time PCR - Mila",
    "sensitivity": "Food sample: 1 CFU/25 g\nSurface sample: 1 CFU/100 cm2",
    "keyAdvantages": [
      {
        "title": "3 targets, 1 reaction",
        "subtitle": "Salmonella + full Listeria"
      },
      {
        "title": "~67% fewer reactions",
        "subtitle": "one assay, not three"
      },
      {
        "title": "Sharper decisions",
        "subtitle": "species-level Listeria"
      },
      {
        "title": "Open platform",
        "subtitle": "runs on your instruments"
      }
    ],
    "features": [
      "Detects Salmonella, L. monocytogenes and Listeria spp. in one reaction via Mila multiplex.",
      "Pathogen plus species-level Listeria in one test sharpens corrective-action decisions.",
      "Three targets in one assay cut reagent and labor by two-thirds versus separate tests.",
      "Internal control monitors each reaction and supports automated TxA interpretation.",
      "Ready-to-use SPID format with preloaded strips cuts handling and speeds the run."
    ],
    "stagesByIndustry": {
      "Confectionery": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            },
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_5r_salmonella_spp_l_monocytogenes_and_listeria_spp",
          "timeHours": 1.83,
          "timeEstimated": false
        }
      },
      "Dairy": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            },
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_5r_salmonella_spp_l_monocytogenes_and_listeria_spp",
          "timeHours": 1.83,
          "timeEstimated": false
        }
      },
      "Egg Products": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            },
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_5r_salmonella_spp_l_monocytogenes_and_listeria_spp",
          "timeHours": 1.83,
          "timeEstimated": false
        }
      },
      "Fresh & Processed Produce": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            },
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_5r_salmonella_spp_l_monocytogenes_and_listeria_spp",
          "timeHours": 1.83,
          "timeEstimated": false
        }
      },
      "Meat and Poultry": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            },
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_5r_salmonella_spp_l_monocytogenes_and_listeria_spp",
          "timeHours": 1.83,
          "timeEstimated": false
        }
      },
      "Nutraceutical": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            },
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_5r_salmonella_spp_l_monocytogenes_and_listeria_spp",
          "timeHours": 1.83,
          "timeEstimated": false
        }
      },
      "Pet Food & Animal Feed": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            },
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_5r_salmonella_spp_l_monocytogenes_and_listeria_spp",
          "timeHours": 1.83,
          "timeEstimated": false
        }
      },
      "Ready-to-eat": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            },
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_5r_salmonella_spp_l_monocytogenes_and_listeria_spp",
          "timeHours": 1.83,
          "timeEstimated": false
        }
      },
      "Seafood": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            },
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_5r_salmonella_spp_l_monocytogenes_and_listeria_spp",
          "timeHours": 1.83,
          "timeEstimated": false
        }
      }
    }
  },
  {
    "id": "V-SF68",
    "name": "Ampliora 3.9 E. coli STEC, E. coli O157:H7 and Salmonella spp.",
    "productLine": "Ampliora",
    "catalogCode": "V-SF68",
    "productKey": "ampliora_3_9_e_coli_stec_e_coli_o157_h7_and_salmonella_spp",
    "targets": [
      "e_coli_stec",
      "e_coli_o157_h7",
      "salmonella_spp"
    ],
    "mainIndustries": [
      "Confectionery",
      "Egg Products",
      "Fresh & Processed Produce",
      "Meat and Poultry",
      "Ready-to-eat"
    ],
    "technology": "Real-Time PCR - Mila",
    "sensitivity": "1 CFU/375 g",
    "keyAdvantages": [
      {
        "title": "Full STEC panel",
        "subtitle": "STEC, O157:H7, Salmonella"
      },
      {
        "title": "~67% fewer reactions",
        "subtitle": "one assay, not three"
      },
      {
        "title": "STEC strain ID",
        "subtitle": "beyond generic E. coli"
      },
      {
        "title": "Open platform",
        "subtitle": "runs on your instruments"
      }
    ],
    "features": [
      "Identifies STEC strains, E. coli O157:H7 and Salmonella in one reaction via Mila multiplex.",
      "Differentiates STEC strains rather than only generic E. coli.",
      "Covers the exact E. coli risks that drive meat and produce recalls.",
      "Three targets in one assay cut reagent and labor by two-thirds versus separate tests.",
      "Ready-to-use SPID format with preloaded strips cuts handling and speeds the run."
    ],
    "stagesByIndustry": {
      "Confectionery": {
        "sampling": {
          "options": []
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_9_e_coli_stec_e_coli_o157_h7_and_salmonella_spp",
          "timeHours": 1.67,
          "timeEstimated": false
        }
      },
      "Egg Products": {
        "sampling": {
          "options": []
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_9_e_coli_stec_e_coli_o157_h7_and_salmonella_spp",
          "timeHours": 1.67,
          "timeEstimated": false
        }
      },
      "Fresh & Processed Produce": {
        "sampling": {
          "options": []
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_9_e_coli_stec_e_coli_o157_h7_and_salmonella_spp",
          "timeHours": 1.67,
          "timeEstimated": false
        }
      },
      "Meat and Poultry": {
        "sampling": {
          "options": []
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_9_e_coli_stec_e_coli_o157_h7_and_salmonella_spp",
          "timeHours": 1.67,
          "timeEstimated": false
        }
      },
      "Ready-to-eat": {
        "sampling": {
          "options": []
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_9_e_coli_stec_e_coli_o157_h7_and_salmonella_spp",
          "timeHours": 1.67,
          "timeEstimated": false
        }
      }
    }
  },
  {
    "id": "V-SF100",
    "name": "Ampliora 4.3 Yeast",
    "productLine": "Ampliora",
    "catalogCode": "V-SF100",
    "productKey": "ampliora_4_3_yeast",
    "targets": [
      "saccharomyces_cerevisiae",
      "saccharomyces_spp",
      "zygosaccharomyces_bailii_parabailii",
      "zygosaccharomyces_group"
    ],
    "mainIndustries": [
      "Beer & Wine"
    ],
    "technology": "Real-Time PCR - Mila",
    "sensitivity": "Enriched Sample: From 6 CFU/mL\nDirect Sample: From 4x103 cells/mL\n\nSensitivity depends on the target microorganism.",
    "keyAdvantages": [
      {
        "title": "4 beer yeasts",
        "subtitle": "one reaction"
      },
      {
        "title": "~75% fewer reactions",
        "subtitle": "one assay, not four"
      },
      {
        "title": "~2.5 h screening",
        "subtitle": "direct beer workflow"
      },
      {
        "title": "Protects shelf life",
        "subtitle": "early detection"
      }
    ],
    "features": [
      "Detects four core beer-spoilage yeasts in one reaction via Mila multiplex design.",
      "Panel tuned specifically to the Saccharomyces and Zygosaccharomyces yeasts that spoil beer.",
      "Four targets in one assay cut reagent and labor by three-quarters versus separate tests.",
      "Direct ~2.5 h screening lets production release beer faster.",
      "Ready-to-use SPID format with preloaded strips cuts handling and speeds the run."
    ],
    "stagesByIndustry": {
      "Beer & Wine": {
        "sampling": {
          "options": []
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_2_wort",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": false,
              "timeHours": 68.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_4_bacteria_yeast_and_molds_plus",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_4_3_yeast",
          "timeHours": 1.75,
          "timeEstimated": false
        }
      }
    }
  },
  {
    "id": "V-SF101",
    "name": "Ampliora 4.4 Yeast",
    "productLine": "Ampliora",
    "catalogCode": "V-SF101",
    "productKey": "ampliora_4_4_yeast",
    "targets": [
      "brettanomyces_bruxellensis",
      "brettanomyces_spp",
      "pichia_spp",
      "saccharomyces_cerevisiae_var_diastaticus"
    ],
    "mainIndustries": [
      "Beer & Wine"
    ],
    "technology": "Real-Time PCR - Mila",
    "sensitivity": "Enriched Sample: From 10 CFU/mL\nDirect Sample: From 1x103 cells/mL\n\nSensitivity depends on the target microorganism.",
    "keyAdvantages": [
      {
        "title": "4 beer yeasts",
        "subtitle": "one reaction"
      },
      {
        "title": "~75% fewer reactions",
        "subtitle": "one assay, not four"
      },
      {
        "title": "~2.5 h screening",
        "subtitle": "direct beer workflow"
      },
      {
        "title": "Protects shelf life",
        "subtitle": "early detection"
      }
    ],
    "features": [
      "Detects four wild and diastatic beer-spoilage yeasts in one reaction via Mila multiplex.",
      "Panel tuned to the Brettanomyces, Pichia and S. diastaticus strains behind beer faults.",
      "Four targets in one assay cut reagent and labor by three-quarters versus separate tests.",
      "Direct ~2.5 h screening lets production release beer faster.",
      "Ready-to-use SPID format with preloaded strips cuts handling and speeds the run."
    ],
    "stagesByIndustry": {
      "Beer & Wine": {
        "sampling": {
          "options": []
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_2_wort",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": false,
              "timeHours": 68.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_4_bacteria_yeast_and_molds_plus",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_4_4_yeast",
          "timeHours": 1.75,
          "timeEstimated": false
        }
      }
    }
  },
  {
    "id": "V-SF102",
    "name": "Ampliora 4.5 Bacteria",
    "productLine": "Ampliora",
    "catalogCode": "V-SF102",
    "productKey": "ampliora_4_5_bacteria",
    "targets": [
      "lactobacillus_brevis",
      "lactobacillus_lindnerii",
      "lactobacillus_group",
      "pediococcus_spp"
    ],
    "mainIndustries": [
      "Beer & Wine"
    ],
    "technology": "Real-Time PCR - Mila",
    "sensitivity": "Enriched Sample: From 6 CFU/mL\nDirect Sample: From 2×102 cells/mL\n\nSensitivity depends on the target microorganism.",
    "keyAdvantages": [
      {
        "title": "4 beer bacteria",
        "subtitle": "one reaction"
      },
      {
        "title": "~75% fewer reactions",
        "subtitle": "one assay, not four"
      },
      {
        "title": "~2.5 h screening",
        "subtitle": "direct beer workflow"
      },
      {
        "title": "Protects shelf life",
        "subtitle": "early detection"
      }
    ],
    "features": [
      "Detects four dominant beer-spoilage bacteria in one reaction via Mila multiplex design.",
      "Panel tuned to the Lactobacillus and Pediococcus groups that spoil beer.",
      "Four targets in one assay cut reagent and labor by three-quarters versus separate tests.",
      "Direct ~2.5 h screening lets production release beer faster.",
      "Ready-to-use SPID format with preloaded strips cuts handling and speeds the run."
    ],
    "stagesByIndustry": {
      "Beer & Wine": {
        "sampling": {
          "options": []
        },
        "enrichment": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_4_bacteria_yeast_and_molds_plus",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_4_5_bacteria",
          "timeHours": 1.75,
          "timeEstimated": false
        }
      }
    }
  },
  {
    "id": "V-SF103",
    "name": "Ampliora 4.6 Bacteria",
    "productLine": "Ampliora",
    "catalogCode": "V-SF103",
    "productKey": "ampliora_4_6_bacteria",
    "targets": [
      "lactobacillus_backii",
      "lactobacillus_collinoides_paracollinoides",
      "megasphaera_spp",
      "pectinatus_spp"
    ],
    "mainIndustries": [
      "Beer & Wine"
    ],
    "technology": "Real-Time PCR - Mila",
    "sensitivity": "Enriched Sample: From 3 CFU/mL\nDirect Sample: From 6×103 cells/mL\n\nSensitivity depends on the target microorganism.",
    "keyAdvantages": [
      {
        "title": "4 anaerobe spoilers",
        "subtitle": "one reaction"
      },
      {
        "title": "~75% fewer reactions",
        "subtitle": "one assay, not four"
      },
      {
        "title": "Catches what culture misses",
        "subtitle": "strict anaerobes"
      },
      {
        "title": "~2.5 h screening",
        "subtitle": "direct beer workflow"
      }
    ],
    "features": [
      "Detects Pectinatus, Megasphaera and related strict-anaerobe beer spoilers in one reaction.",
      "Targets organisms that anaerobe culture often fails to recover.",
      "Four targets in one assay cut reagent and labor by three-quarters versus separate tests.",
      "Direct ~2.5 h screening lets production release beer faster.",
      "Ready-to-use SPID format with preloaded strips cuts handling and speeds the run."
    ],
    "stagesByIndustry": {
      "Beer & Wine": {
        "sampling": {
          "options": []
        },
        "enrichment": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_4_bacteria_yeast_and_molds_plus",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_4_6_bacteria",
          "timeHours": 1.75,
          "timeEstimated": false
        }
      }
    }
  },
  {
    "id": "V-SF169",
    "name": "Ampliora 4.7 Low-pH Microorganisms",
    "productLine": "Ampliora",
    "catalogCode": "V-SF169",
    "productKey": "ampliora_4_7_low_ph_microorganisms",
    "targets": [
      "acidophilic_bacteria",
      "brettanomyces_spp",
      "yeasts",
      "molds",
      "preservative_resistant_yeasts"
    ],
    "mainIndustries": [
      "Beverage",
      "Sauces and condiments"
    ],
    "technology": "Real-Time PCR - Mila",
    "sensitivity": "1 CFU per sample",
    "keyAdvantages": [
      {
        "title": "5 spoilage groups",
        "subtitle": "low-pH panel, one reaction"
      },
      {
        "title": "~80% fewer reactions",
        "subtitle": "one assay, not five"
      },
      {
        "title": "Built for low pH",
        "subtitle": "acidified products"
      },
      {
        "title": "Catches resistant spoilers",
        "subtitle": "PRY and more"
      }
    ],
    "features": [
      "Detects five acidophilic spoilage groups — Brettanomyces, acidophilic bacteria, PRY, yeasts and molds — in one reaction.",
      "Built for acidified products, targeting organisms that survive and spoil at low pH.",
      "Five groups in one assay cut reagent and labor by ~80% versus separate tests.",
      "Catches preservative-resistant spoilers that standard checks can miss.",
      "Ready-to-use SPID format with preloaded strips cuts handling and speeds the run."
    ],
    "stagesByIndustry": {
      "Beverage": {
        "sampling": {
          "options": []
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_4_spoilage_beverage",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": false,
              "timeHours": 48.0,
              "matrices": [
                "Carbonated soft drinks, Enhanced water, Ready-to-d",
                "Fruit juices with and without pulp, Fruit concentr"
              ]
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "magneus_3_bacteria_yeast_molds",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "nucleia_4_bacteria_yeast_and_molds_plus",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_4_7_low_ph_microorganisms",
          "timeHours": 1.33,
          "timeEstimated": false
        }
      },
      "Sauces and condiments": {
        "sampling": {
          "options": []
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_4_spoilage_beverage",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": false,
              "timeHours": 48.0,
              "matrices": [
                "Carbonated soft drinks, Enhanced water, Ready-to-d",
                "Fruit juices with and without pulp, Fruit concentr"
              ]
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "magneus_3_bacteria_yeast_molds",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "nucleia_4_bacteria_yeast_and_molds_plus",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_4_7_low_ph_microorganisms",
          "timeHours": 1.33,
          "timeEstimated": false
        }
      }
    }
  },
  {
    "id": "V-SF88",
    "name": "Ampliora 6.1 WaterScan Plus",
    "productLine": "Ampliora",
    "catalogCode": "V-SF88",
    "productKey": "ampliora_6_1_waterscan_plus",
    "targets": [
      "escherichia_coli",
      "citrobacter_spp",
      "klebsiella_spp",
      "enterococcus_spp",
      "enterobacter_spp",
      "escherichia_spp"
    ],
    "mainIndustries": [
      "Beverage"
    ],
    "technology": "Real-Time PCR - Mila",
    "sensitivity": "From 4 CFU/filter\n\nSensitivity depends on the target microorganism.",
    "keyAdvantages": [
      {
        "title": "6 water indicators",
        "subtitle": "extended panel, one reaction"
      },
      {
        "title": "~83% fewer reactions",
        "subtitle": "one assay, not six"
      },
      {
        "title": "Broadest coverage",
        "subtitle": "per water sample"
      },
      {
        "title": "Open platform",
        "subtitle": "runs on your instruments"
      }
    ],
    "features": [
      "Covers six water indicator organisms in a single reaction via Mila multiplex design.",
      "Broadest indicator coverage per sample for water programs in one assay.",
      "Six targets in one reaction cut reagent and labor by ~83% versus separate tests.",
      "One assay clears multiple indicators for faster process-water decisions.",
      "Ready-to-use SPID format with preloaded strips cuts handling and speeds the run."
    ],
    "stagesByIndustry": {
      "Beverage": {
        "sampling": {
          "options": []
        },
        "enrichment": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_6_1_waterscan_plus",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      }
    }
  },
  {
    "id": "V-SF64",
    "name": "Ampliora 8.1 Yeast Plus",
    "productLine": "Ampliora",
    "catalogCode": "V-SF64",
    "productKey": "ampliora_8_1_yeast_plus",
    "targets": [
      "brettanomyces_bruxellensis",
      "brettanomyces_spp",
      "pichia_spp",
      "saccharomyces_cerevisiae",
      "saccharomyces_cerevisiae_var_diastaticus",
      "saccharomyces_spp",
      "zygosaccharomyces_bailii_parabailii",
      "zygosaccharomyces_group"
    ],
    "mainIndustries": [
      "Beer & Wine"
    ],
    "technology": "Real-Time PCR - Mila",
    "sensitivity": "Enriched Sample: From 6 CFU/mL\nDirect Sample: From 1x103 cells/mL\n\nSensitivity depends on the target microorganism.",
    "keyAdvantages": [
      {
        "title": "8 beer yeasts",
        "subtitle": "comprehensive panel"
      },
      {
        "title": "~89% fewer reactions",
        "subtitle": "one assay, not eight"
      },
      {
        "title": "Full yeast coverage",
        "subtitle": "complete risk profile"
      },
      {
        "title": "~2.5 h screening",
        "subtitle": "direct beer workflow"
      }
    ],
    "features": [
      "Covers eight beer-spoilage yeasts in a single reaction — the full yeast risk profile.",
      "Mila-designed panel screens what would otherwise need several separate assays.",
      "Eight targets in one reaction cut reagent and labor by ~89% versus separate tests.",
      "Direct ~2.5 h screening lets production release beer faster.",
      "Ready-to-use SPID format with preloaded strips cuts handling and speeds the run."
    ],
    "stagesByIndustry": {
      "Beer & Wine": {
        "sampling": {
          "options": []
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_2_wort",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": false,
              "timeHours": 68.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_4_bacteria_yeast_and_molds_plus",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_8_1_yeast_plus",
          "timeHours": 1.75,
          "timeEstimated": false
        }
      }
    }
  },
  {
    "id": "V-SF99",
    "name": "Ampliora 8.2 Bacteria Plus",
    "productLine": "Ampliora",
    "catalogCode": "V-SF99",
    "productKey": "ampliora_8_2_bacteria_plus",
    "targets": [
      "lactobacillus_backii",
      "lactobacillus_brevis",
      "lactobacillus_collinoides_paracollinoides",
      "lactobacillus_lindnerii",
      "lactobacillus_group",
      "megasphaera_spp",
      "pediococcus_spp",
      "pectinatus_spp"
    ],
    "mainIndustries": [
      "Beer & Wine"
    ],
    "technology": "Real-Time PCR - Mila",
    "sensitivity": "Enriched Sample: From 3 CFU/mL\nDirect Sample: From 2×102 cells/mL\n\nSensitivity depends on the target microorganism.",
    "keyAdvantages": [
      {
        "title": "8 beer bacteria",
        "subtitle": "comprehensive panel"
      },
      {
        "title": "~89% fewer reactions",
        "subtitle": "one assay, not eight"
      },
      {
        "title": "Full bacterial coverage",
        "subtitle": "complete risk profile"
      },
      {
        "title": "~2.5 h screening",
        "subtitle": "direct beer workflow"
      }
    ],
    "features": [
      "Covers eight beer-spoilage bacteria in a single reaction, including hard-to-culture anaerobes.",
      "Mila-designed panel screens the full beer-bacteria risk profile in one assay.",
      "Eight targets in one reaction cut reagent and labor by ~89% versus separate tests.",
      "Direct ~2.5 h screening lets production release beer faster.",
      "Ready-to-use SPID format with preloaded strips cuts handling and speeds the run."
    ],
    "stagesByIndustry": {
      "Beer & Wine": {
        "sampling": {
          "options": []
        },
        "enrichment": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_4_bacteria_yeast_and_molds_plus",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_8_2_bacteria_plus",
          "timeHours": 1.75,
          "timeEstimated": false
        }
      }
    }
  },
  {
    "id": "V-PAT04",
    "name": "Elevia 1.1 Salmonella spp.",
    "productLine": "Elevia",
    "catalogCode": "V-PAT04",
    "productKey": "elevia_1_1_salmonella_spp",
    "targets": [
      "salmonella_spp"
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
    ],
    "technology": "RT-qPCR - AiGOR",
    "sensitivity": "Food sample: 1 CFU/375 g\nSurface sample: 1 CFU/100 cm2",
    "keyAdvantages": [
      {
        "title": "3 h on surfaces",
        "subtitle": "environmental results within one shift"
      },
      {
        "title": "9 h on finished product",
        "subtitle": "same-day release of product lots"
      },
      {
        "title": "10,000x sensitivity",
        "subtitle": "viable-cell RNA detection"
      },
      {
        "title": "Lower inventory cost",
        "subtitle": "shorter holds, faster turnover"
      }
    ],
    "features": [
      "AiGOR RNA chemistry detects only viable Salmonella, avoiding dead-cell false positives that trigger needless holds.",
      "Up to 10,000x more sensitive than standard PCR, catching contamination at very low loads.",
      "Environmental results in ~3 h and finished-product release in ~9 h — both same-day.",
      "Internal control monitors every reaction and supports automated TxA result calling.",
      "Ready-to-use SPID format with preloaded strips cuts handling and speeds the run."
    ],
    "stagesByIndustry": {
      "Confectionery": {
        "sampling": {
          "options": [
            {
              "productKey": "unlisted_captus_xpress_2",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "unlisted_augmentis_xpress_1",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 3.0,
              "matrices": [
                "Pre-sanitization stainless steel surface — sponge",
                "Pre-sanitization stainless steel surface — swab"
              ]
            },
            {
              "productKey": "unlisted_captus_xpress_1",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": false,
              "timeHours": 6.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "magneus_6_bacteria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "nucleia_8_ultra",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "magneus_1_bacteria",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "elevia_1_1_salmonella_spp",
          "timeHours": 1.58,
          "timeEstimated": false
        }
      },
      "Dairy": {
        "sampling": {
          "options": [
            {
              "productKey": "unlisted_captus_xpress_2",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "unlisted_augmentis_xpress_1",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 3.0,
              "matrices": [
                "Pre-sanitization stainless steel surface — sponge",
                "Pre-sanitization stainless steel surface — swab"
              ]
            },
            {
              "productKey": "unlisted_captus_xpress_1",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "magneus_6_bacteria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "nucleia_8_ultra",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "magneus_1_bacteria",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "elevia_1_1_salmonella_spp",
          "timeHours": 1.58,
          "timeEstimated": false
        }
      },
      "Egg Products": {
        "sampling": {
          "options": [
            {
              "productKey": "unlisted_captus_xpress_2",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "unlisted_augmentis_xpress_1",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 3.0,
              "matrices": [
                "Pre-sanitization stainless steel surface — sponge",
                "Pre-sanitization stainless steel surface — swab"
              ]
            },
            {
              "productKey": "unlisted_captus_xpress_1",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "magneus_6_bacteria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "nucleia_8_ultra",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "elevia_1_1_salmonella_spp",
          "timeHours": 1.58,
          "timeEstimated": false
        }
      },
      "Fresh & Processed Produce": {
        "sampling": {
          "options": [
            {
              "productKey": "unlisted_captus_xpress_2",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "unlisted_augmentis_xpress_1",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 3.0,
              "matrices": [
                "Pre-sanitization stainless steel surface — sponge",
                "Pre-sanitization stainless steel surface — swab"
              ]
            },
            {
              "productKey": "unlisted_captus_xpress_1",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "magneus_6_bacteria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "nucleia_8_ultra",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "elevia_1_1_salmonella_spp",
          "timeHours": 1.58,
          "timeEstimated": false
        }
      },
      "Meat and Poultry": {
        "sampling": {
          "options": [
            {
              "productKey": "unlisted_captus_xpress_2",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "unlisted_augmentis_xpress_1",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 3.0,
              "matrices": [
                "Pre-sanitization stainless steel surface — sponge",
                "Pre-sanitization stainless steel surface — swab"
              ]
            },
            {
              "productKey": "unlisted_captus_xpress_1",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": false,
              "timeHours": 6.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "magneus_6_bacteria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "nucleia_8_ultra",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "magneus_1_bacteria",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "elevia_1_1_salmonella_spp",
          "timeHours": 1.58,
          "timeEstimated": false
        }
      },
      "Pet Food & Animal Feed": {
        "sampling": {
          "options": [
            {
              "productKey": "unlisted_captus_xpress_2",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "unlisted_augmentis_xpress_1",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 3.0,
              "matrices": [
                "Pre-sanitization stainless steel surface — sponge",
                "Pre-sanitization stainless steel surface — swab"
              ]
            },
            {
              "productKey": "unlisted_captus_xpress_1",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": false,
              "timeHours": 6.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "magneus_6_bacteria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "nucleia_8_ultra",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "magneus_1_bacteria",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "elevia_1_1_salmonella_spp",
          "timeHours": 1.58,
          "timeEstimated": false
        }
      },
      "Ready-to-eat": {
        "sampling": {
          "options": [
            {
              "productKey": "unlisted_captus_xpress_2",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "unlisted_augmentis_xpress_1",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 3.0,
              "matrices": [
                "Pre-sanitization stainless steel surface — sponge",
                "Pre-sanitization stainless steel surface — swab"
              ]
            },
            {
              "productKey": "unlisted_captus_xpress_1",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": false,
              "timeHours": 6.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "magneus_6_bacteria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "nucleia_8_ultra",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "magneus_1_bacteria",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "elevia_1_1_salmonella_spp",
          "timeHours": 1.58,
          "timeEstimated": false
        }
      },
      "Seafood": {
        "sampling": {
          "options": [
            {
              "productKey": "unlisted_captus_xpress_2",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "unlisted_augmentis_xpress_1",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 3.0,
              "matrices": [
                "Pre-sanitization stainless steel surface — sponge",
                "Pre-sanitization stainless steel surface — swab"
              ]
            },
            {
              "productKey": "unlisted_captus_xpress_1",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "magneus_6_bacteria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "nucleia_8_ultra",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "elevia_1_1_salmonella_spp",
          "timeHours": 1.58,
          "timeEstimated": false
        }
      }
    }
  },
  {
    "id": "V-PAT07",
    "name": "Elevia 2.8 Salmonella spp. and Listeria spp.",
    "productLine": "Elevia",
    "catalogCode": "V-PAT07",
    "productKey": "elevia_2_8_salmonella_spp_and_listeria_spp",
    "targets": [
      "salmonella_spp",
      "listeria_spp"
    ],
    "mainIndustries": [
      "Confectionery",
      "Fresh & Processed Produce",
      "Meat and Poultry",
      "Pet Food & Animal Feed",
      "Ready-to-eat",
      "Seafood"
    ],
    "technology": "RT-qPCR - AiGOR",
    "sensitivity": "Food sample: 1 CFU/25 g\nSurface sample: 1 CFU/100 cm2",
    "keyAdvantages": [
      {
        "title": "4 h on surfaces",
        "subtitle": "environmental results within one shift"
      },
      {
        "title": "9 h on finished product",
        "subtitle": "same-day lot release"
      },
      {
        "title": "10,000x sensitivity",
        "subtitle": "viable-cell RNA detection"
      },
      {
        "title": "2 pathogens, 1 reaction",
        "subtitle": "Salmonella + Listeria together"
      }
    ],
    "features": [
      "AiGOR RNA chemistry detects only viable Salmonella and Listeria, avoiding dead-cell false positives.",
      "Up to 10,000x more sensitive than standard PCR across both targets.",
      "Environmental results in ~4 h and finished-product release in ~9 h — both same-day.",
      "Two pathogens in one reaction halves reagent and labor versus separate tests.",
      "Ready-to-use SPID format with preloaded strips cuts handling and speeds the run."
    ],
    "stagesByIndustry": {
      "Confectionery": {
        "sampling": {
          "options": [
            {
              "productKey": "unlisted_captus_xpress_2",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "unlisted_augmentis_xpress_1",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 3.0,
              "matrices": [
                "Cooked processed meat product",
                "Stainless steel\nsurface — sponge",
                "Stainless steel\nsurface — swab"
              ]
            },
            {
              "productKey": "unlisted_captus_xpress_1",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_8_ultra",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "elevia_2_8_salmonella_spp_and_listeria_spp",
          "timeHours": 1.67,
          "timeEstimated": false
        }
      },
      "Fresh & Processed Produce": {
        "sampling": {
          "options": [
            {
              "productKey": "unlisted_captus_xpress_2",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "unlisted_augmentis_xpress_1",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 3.0,
              "matrices": [
                "Cooked processed meat product",
                "Stainless steel\nsurface — sponge",
                "Stainless steel\nsurface — swab"
              ]
            },
            {
              "productKey": "unlisted_captus_xpress_1",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_8_ultra",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "elevia_2_8_salmonella_spp_and_listeria_spp",
          "timeHours": 1.67,
          "timeEstimated": false
        }
      },
      "Meat and Poultry": {
        "sampling": {
          "options": [
            {
              "productKey": "unlisted_captus_xpress_2",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "unlisted_augmentis_xpress_1",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 3.0,
              "matrices": [
                "Cooked processed meat product",
                "Stainless steel\nsurface — sponge",
                "Stainless steel\nsurface — swab"
              ]
            },
            {
              "productKey": "unlisted_captus_xpress_1",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_8_ultra",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "elevia_2_8_salmonella_spp_and_listeria_spp",
          "timeHours": 1.67,
          "timeEstimated": false
        }
      },
      "Pet Food & Animal Feed": {
        "sampling": {
          "options": [
            {
              "productKey": "unlisted_captus_xpress_2",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "unlisted_augmentis_xpress_1",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 3.0,
              "matrices": [
                "Cooked processed meat product",
                "Stainless steel\nsurface — sponge",
                "Stainless steel\nsurface — swab"
              ]
            },
            {
              "productKey": "unlisted_captus_xpress_1",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_8_ultra",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "elevia_2_8_salmonella_spp_and_listeria_spp",
          "timeHours": 1.67,
          "timeEstimated": false
        }
      },
      "Ready-to-eat": {
        "sampling": {
          "options": [
            {
              "productKey": "unlisted_captus_xpress_2",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "unlisted_augmentis_xpress_1",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 3.0,
              "matrices": [
                "Cooked processed meat product",
                "Stainless steel\nsurface — sponge",
                "Stainless steel\nsurface — swab"
              ]
            },
            {
              "productKey": "unlisted_captus_xpress_1",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_8_ultra",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "elevia_2_8_salmonella_spp_and_listeria_spp",
          "timeHours": 1.67,
          "timeEstimated": false
        }
      },
      "Seafood": {
        "sampling": {
          "options": [
            {
              "productKey": "unlisted_captus_xpress_2",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "unlisted_augmentis_xpress_1",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 3.0,
              "matrices": [
                "Cooked processed meat product",
                "Stainless steel\nsurface — sponge",
                "Stainless steel\nsurface — swab"
              ]
            },
            {
              "productKey": "unlisted_captus_xpress_1",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_8_ultra",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "elevia_2_8_salmonella_spp_and_listeria_spp",
          "timeHours": 1.67,
          "timeEstimated": false
        }
      }
    }
  },
  {
    "id": "V-PAT06",
    "name": "Elevia 2.9 Salmonella spp. and Enterobacteria",
    "productLine": "Elevia",
    "catalogCode": "V-PAT06",
    "productKey": "elevia_2_9_salmonella_spp_and_enterobacteria",
    "targets": [
      "salmonella_spp",
      "enterobacteria"
    ],
    "mainIndustries": [
      "Confectionery",
      "Egg Products",
      "Fresh & Processed Produce",
      "Meat and Poultry",
      "Pet Food & Animal Feed",
      "Ready-to-eat"
    ],
    "technology": "RT-qPCR - AiGOR",
    "sensitivity": "Surface sample: 1 CFU/100 cm2 for Salmonella spp. and 10 CFU/100 cm2 for Enterobacteria",
    "keyAdvantages": [
      {
        "title": "Pathogen + indicator",
        "subtitle": "Salmonella plus hygiene marker"
      },
      {
        "title": "3 h on surfaces",
        "subtitle": "environmental results within one shift"
      },
      {
        "title": "9 h on finished product",
        "subtitle": "same-day lot release"
      },
      {
        "title": "10,000x sensitivity",
        "subtitle": "viable-cell RNA detection"
      }
    ],
    "features": [
      "Detects Salmonella plus Enterobacteria as a process-hygiene indicator, flagging drift before it becomes a pathogen event.",
      "AiGOR RNA chemistry targets only viable cells, avoiding dead-cell false positives.",
      "Up to 10,000x more sensitive than standard PCR for early risk detection.",
      "Environmental results in ~3 h and finished-product release in ~9 h — both same-day.",
      "Ready-to-use SPID format with preloaded strips cuts handling and speeds the run."
    ],
    "stagesByIndustry": {
      "Confectionery": {
        "sampling": {
          "options": [
            {
              "productKey": "unlisted_captus_xpress_2",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "unlisted_augmentis_xpress_1",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "unlisted_captus_xpress_1",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "magneus_6_bacteria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "elevia_2_9_salmonella_spp_and_enterobacteria",
          "timeHours": 1.58,
          "timeEstimated": false
        }
      },
      "Egg Products": {
        "sampling": {
          "options": [
            {
              "productKey": "unlisted_captus_xpress_2",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "unlisted_augmentis_xpress_1",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "unlisted_captus_xpress_1",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "magneus_6_bacteria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "elevia_2_9_salmonella_spp_and_enterobacteria",
          "timeHours": 1.58,
          "timeEstimated": false
        }
      },
      "Fresh & Processed Produce": {
        "sampling": {
          "options": [
            {
              "productKey": "unlisted_captus_xpress_2",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "unlisted_augmentis_xpress_1",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "unlisted_captus_xpress_1",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "magneus_6_bacteria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "elevia_2_9_salmonella_spp_and_enterobacteria",
          "timeHours": 1.58,
          "timeEstimated": false
        }
      },
      "Meat and Poultry": {
        "sampling": {
          "options": [
            {
              "productKey": "unlisted_captus_xpress_2",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "unlisted_augmentis_xpress_1",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "unlisted_captus_xpress_1",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "magneus_6_bacteria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "elevia_2_9_salmonella_spp_and_enterobacteria",
          "timeHours": 1.58,
          "timeEstimated": false
        }
      },
      "Pet Food & Animal Feed": {
        "sampling": {
          "options": [
            {
              "productKey": "unlisted_captus_xpress_2",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "unlisted_augmentis_xpress_1",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "unlisted_captus_xpress_1",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "magneus_6_bacteria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "elevia_2_9_salmonella_spp_and_enterobacteria",
          "timeHours": 1.58,
          "timeEstimated": false
        }
      },
      "Ready-to-eat": {
        "sampling": {
          "options": [
            {
              "productKey": "unlisted_captus_xpress_2",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "unlisted_augmentis_xpress_1",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "unlisted_captus_xpress_1",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "magneus_6_bacteria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "elevia_2_9_salmonella_spp_and_enterobacteria",
          "timeHours": 1.58,
          "timeEstimated": false
        }
      }
    }
  },
  {
    "id": "V-SF14",
    "name": "Specio 00.1 Bacteria",
    "productLine": "Specio",
    "catalogCode": "V-SF14",
    "productKey": "specio_00_1_bacteria",
    "targets": [
      "over_80_spoilage_bacteria"
    ],
    "mainIndustries": [
      "Beer & Wine",
      "Beverage",
      "Confectionery",
      "Dairy",
      "Fresh & Processed Produce",
      "Nutraceutical",
      "Pet Food & Animal Feed",
      "Pharmaceutical",
      "Ready-to-eat",
      "Sauces and condiments",
      "Sterile products"
    ],
    "technology": "Real-time PCR with melting curve  - KAi",
    "sensitivity": "From 1 CFU per sample\n\nSensitivity depends on the target microorganism.",
    "keyAdvantages": [
      {
        "title": "80+ bacteria detected",
        "subtitle": "unmatched spoilage breadth"
      },
      {
        "title": "One reaction",
        "subtitle": "replaces entire panels"
      },
      {
        "title": "AI melting-curve",
        "subtitle": "FAM-only, simple setup"
      },
      {
        "title": "Protects shelf life",
        "subtitle": "broad early detection"
      }
    ],
    "features": [
      "Identifies 80+ spoilage bacteria in a single reaction via KAi melting-curve analysis — breadth no competitor matches.",
      "Single FAM channel keeps the setup simple while covering a huge organism range.",
      "One assay replaces whole panels of separate spoilage tests, cutting cost and labor.",
      "Internal control monitors each reaction and supports automated TxA interpretation.",
      "Broad early spoilage detection protects shelf life and prevents field complaints."
    ],
    "stagesByIndustry": {
      "Beer & Wine": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_11_universal_bacteria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            },
            {
              "productKey": "augmentis_51_lactobacillus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "magneus_1_bacteria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "magneus_2_bacteria_yeast_molds",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "nucleia_3_clean_q",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_00_1_bacteria",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Beverage": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_11_universal_bacteria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            },
            {
              "productKey": "augmentis_51_lactobacillus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "magneus_1_bacteria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "magneus_2_bacteria_yeast_molds",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "nucleia_3_clean_q",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_00_1_bacteria",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Confectionery": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_11_universal_bacteria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            },
            {
              "productKey": "augmentis_51_lactobacillus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "magneus_1_bacteria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "magneus_2_bacteria_yeast_molds",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "nucleia_3_clean_q",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_00_1_bacteria",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Dairy": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_11_universal_bacteria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            },
            {
              "productKey": "augmentis_51_lactobacillus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "magneus_1_bacteria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "magneus_2_bacteria_yeast_molds",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "nucleia_3_clean_q",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_00_1_bacteria",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Fresh & Processed Produce": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_11_universal_bacteria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            },
            {
              "productKey": "augmentis_51_lactobacillus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "magneus_1_bacteria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "magneus_2_bacteria_yeast_molds",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "nucleia_3_clean_q",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_00_1_bacteria",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Nutraceutical": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_11_universal_bacteria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            },
            {
              "productKey": "augmentis_51_lactobacillus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "magneus_1_bacteria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "magneus_2_bacteria_yeast_molds",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "nucleia_3_clean_q",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_00_1_bacteria",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Pet Food & Animal Feed": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_11_universal_bacteria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            },
            {
              "productKey": "augmentis_51_lactobacillus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "magneus_1_bacteria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "magneus_2_bacteria_yeast_molds",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "nucleia_3_clean_q",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_00_1_bacteria",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Pharmaceutical": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_11_universal_bacteria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            },
            {
              "productKey": "augmentis_51_lactobacillus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "magneus_1_bacteria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "magneus_2_bacteria_yeast_molds",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "nucleia_3_clean_q",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_00_1_bacteria",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Ready-to-eat": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_11_universal_bacteria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            },
            {
              "productKey": "augmentis_51_lactobacillus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "magneus_1_bacteria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "magneus_2_bacteria_yeast_molds",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "nucleia_3_clean_q",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_00_1_bacteria",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Sauces and condiments": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_11_universal_bacteria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            },
            {
              "productKey": "augmentis_51_lactobacillus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "magneus_1_bacteria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "magneus_2_bacteria_yeast_molds",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "nucleia_3_clean_q",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_00_1_bacteria",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Sterile products": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_11_universal_bacteria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            },
            {
              "productKey": "augmentis_51_lactobacillus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "magneus_1_bacteria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "magneus_2_bacteria_yeast_molds",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "nucleia_3_clean_q",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_00_1_bacteria",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      }
    }
  },
  {
    "id": "V-SF15",
    "name": "Specio 00.2 Yeast & Molds",
    "productLine": "Specio",
    "catalogCode": "V-SF15",
    "productKey": "specio_00_2_yeast_molds",
    "targets": [
      "over_50_spoilage_yeast",
      "molds"
    ],
    "mainIndustries": [
      "Beer & Wine",
      "Beverage",
      "Confectionery",
      "Dairy",
      "Nutraceutical",
      "Pet Food & Animal Feed",
      "Pharmaceutical",
      "Ready-to-eat",
      "Sauces and condiments"
    ],
    "technology": "Real-time PCR with melting curve  - KAi",
    "sensitivity": "From 1 CFU per sample\n\nSensitivity depends on the target microorganism.",
    "keyAdvantages": [
      {
        "title": "50+ yeasts & molds",
        "subtitle": "unmatched fungal breadth"
      },
      {
        "title": "One reaction",
        "subtitle": "replaces entire panels"
      },
      {
        "title": "Days faster than culture",
        "subtitle": "vs slow mold growth"
      },
      {
        "title": "AI melting-curve",
        "subtitle": "FAM-only, simple setup"
      }
    ],
    "features": [
      "Identifies 50+ spoilage yeasts and molds in one reaction via KAi melting-curve — breadth no competitor matches.",
      "Single FAM channel keeps setup simple while covering a huge fungal range.",
      "Molecular detection in hours versus the 5–7+ days fungal culture can require.",
      "One assay replaces whole panels of separate fungal tests, cutting cost and labor.",
      "Internal control monitors each reaction and supports automated TxA interpretation."
    ],
    "stagesByIndustry": {
      "Beer & Wine": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_21_yeast_molds",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 48.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "magneus_2_bacteria_yeast_molds",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "nucleia_3_clean_q",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_00_2_yeast_molds",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Beverage": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_21_yeast_molds",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 48.0
            },
            {
              "productKey": "augmentis_31_universal_surfaces",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "magneus_2_bacteria_yeast_molds",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "nucleia_3_clean_q",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_00_2_yeast_molds",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Confectionery": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_21_yeast_molds",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 48.0
            },
            {
              "productKey": "augmentis_31_universal_surfaces",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "magneus_2_bacteria_yeast_molds",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "nucleia_3_clean_q",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_00_2_yeast_molds",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Dairy": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_21_yeast_molds",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 48.0
            },
            {
              "productKey": "augmentis_31_universal_surfaces",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "magneus_2_bacteria_yeast_molds",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "nucleia_3_clean_q",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_00_2_yeast_molds",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Nutraceutical": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_21_yeast_molds",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 48.0
            },
            {
              "productKey": "augmentis_31_universal_surfaces",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "magneus_2_bacteria_yeast_molds",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "nucleia_3_clean_q",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_00_2_yeast_molds",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Pet Food & Animal Feed": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_21_yeast_molds",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 48.0
            },
            {
              "productKey": "augmentis_31_universal_surfaces",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "magneus_2_bacteria_yeast_molds",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "nucleia_3_clean_q",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_00_2_yeast_molds",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Pharmaceutical": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_21_yeast_molds",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 48.0
            },
            {
              "productKey": "augmentis_31_universal_surfaces",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "magneus_2_bacteria_yeast_molds",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "nucleia_3_clean_q",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_00_2_yeast_molds",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Ready-to-eat": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_21_yeast_molds",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 48.0
            },
            {
              "productKey": "augmentis_31_universal_surfaces",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "magneus_2_bacteria_yeast_molds",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "nucleia_3_clean_q",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_00_2_yeast_molds",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Sauces and condiments": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_21_yeast_molds",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 48.0
            },
            {
              "productKey": "augmentis_31_universal_surfaces",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "magneus_2_bacteria_yeast_molds",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "nucleia_3_clean_q",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_00_2_yeast_molds",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      }
    }
  },
  {
    "id": "V-SF31",
    "name": "Specio 1.1 Salmonella spp.",
    "productLine": "Specio",
    "catalogCode": "V-SF31",
    "productKey": "specio_1_1_salmonella_spp",
    "targets": [
      "salmonella_spp"
    ],
    "mainIndustries": [
      "Confectionery",
      "Egg Products",
      "Meat and Poultry",
      "Pet Food & Animal Feed",
      "Ready-to-eat"
    ],
    "technology": "Real-time PCR with melting curve  - KAi",
    "sensitivity": "Food sample: 1 CFU/25 g\nSurface sample: 1 CFU/100 cm2",
    "keyAdvantages": [
      {
        "title": "Specific Salmonella ID",
        "subtitle": "KAi melting-curve"
      },
      {
        "title": "FAM-only setup",
        "subtitle": "runs on open instruments"
      },
      {
        "title": "Faster than culture",
        "subtitle": "result before confirmation"
      },
      {
        "title": "Lower price",
        "subtitle": "below leading platforms"
      }
    ],
    "features": [
      "Specific Salmonella identification by KAi melting-curve analysis with AI calling.",
      "Single FAM channel runs on basic open thermocyclers — no proprietary instrument.",
      "Molecular result well before culture confirmation speeds lot release.",
      "Internal control monitors each reaction and supports automated TxA interpretation.",
      "Ready-to-use SPID format with preloaded strips cuts handling and speeds the run."
    ],
    "stagesByIndustry": {
      "Confectionery": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            },
            {
              "productKey": "augmentis_41_universal_pathogens",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_1_1_salmonella_spp",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Egg Products": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            },
            {
              "productKey": "augmentis_41_universal_pathogens",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_1_1_salmonella_spp",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Meat and Poultry": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            },
            {
              "productKey": "augmentis_41_universal_pathogens",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_1_1_salmonella_spp",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Pet Food & Animal Feed": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            },
            {
              "productKey": "augmentis_41_universal_pathogens",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_1_1_salmonella_spp",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Ready-to-eat": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            },
            {
              "productKey": "augmentis_41_universal_pathogens",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_1_1_salmonella_spp",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      }
    }
  },
  {
    "id": "V-SF39",
    "name": "Specio 1.2 S. aureus",
    "productLine": "Specio",
    "catalogCode": "V-SF39",
    "productKey": "specio_1_2_s_aureus",
    "targets": [
      "staphylococcus_aureus"
    ],
    "mainIndustries": [
      "Dairy",
      "Egg Products",
      "Meat and Poultry",
      "Ready-to-eat",
      "Seafood"
    ],
    "technology": "Real-time PCR with melting curve  - KAi",
    "sensitivity": "Food sample: 1 CFU/25 g\nSurface sample: 1 CFU/100 cm2",
    "keyAdvantages": [
      {
        "title": "Specific S. aureus ID",
        "subtitle": "KAi melting-curve"
      },
      {
        "title": "FAM-only setup",
        "subtitle": "runs on open instruments"
      },
      {
        "title": "Faster hygiene checks",
        "subtitle": "speeds sanitation"
      },
      {
        "title": "Lower price",
        "subtitle": "below leading platforms"
      }
    ],
    "features": [
      "Specific S. aureus identification by KAi melting-curve analysis with AI calling.",
      "Single FAM channel runs on basic open thermocyclers — no proprietary instrument.",
      "Quick result speeds hygiene verification and sanitation decisions.",
      "Internal control monitors each reaction and supports automated TxA interpretation.",
      "Ready-to-use SPID format with preloaded strips cuts handling and speeds the run."
    ],
    "stagesByIndustry": {
      "Dairy": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_41_universal_pathogens",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_1_2_s_aureus",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Egg Products": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_41_universal_pathogens",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_1_2_s_aureus",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Meat and Poultry": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_41_universal_pathogens",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_1_2_s_aureus",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Ready-to-eat": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_41_universal_pathogens",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_1_2_s_aureus",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Seafood": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_41_universal_pathogens",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_1_2_s_aureus",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      }
    }
  },
  {
    "id": "V-SF167",
    "name": "Specio 1.3 E. coli",
    "productLine": "Specio",
    "catalogCode": "V-SF167",
    "productKey": "specio_1_3_e_coli",
    "targets": [
      "escherichia_coli"
    ],
    "mainIndustries": [
      "Confectionery",
      "Fresh & Processed Produce",
      "Meat and Poultry",
      "Ready-to-eat",
      "Seafood"
    ],
    "technology": "Real-time PCR with melting curve  - KAi",
    "sensitivity": "Food sample: 1 CFU/25 g\nSurface sample: 1 CFU/100 cm2",
    "keyAdvantages": [
      {
        "title": "Specific E. coli ID",
        "subtitle": "KAi melting-curve"
      },
      {
        "title": "FAM-only setup",
        "subtitle": "runs on open instruments"
      },
      {
        "title": "Faster hygiene checks",
        "subtitle": "speeds sanitation"
      },
      {
        "title": "Lower price",
        "subtitle": "below leading platforms"
      }
    ],
    "features": [
      "Specific E. coli identification by KAi melting-curve analysis with AI calling.",
      "Single FAM channel runs on basic open thermocyclers — no proprietary instrument.",
      "Quick indicator result speeds hygiene verification and sanitation decisions.",
      "Internal control monitors each reaction and supports automated TxA interpretation.",
      "Ready-to-use SPID format with preloaded strips cuts handling and speeds the run."
    ],
    "stagesByIndustry": {
      "Confectionery": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            },
            {
              "productKey": "augmentis_41_universal_pathogens",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_1_3_e_coli",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Fresh & Processed Produce": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            },
            {
              "productKey": "augmentis_41_universal_pathogens",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_1_3_e_coli",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Meat and Poultry": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            },
            {
              "productKey": "augmentis_41_universal_pathogens",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_1_3_e_coli",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Ready-to-eat": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            },
            {
              "productKey": "augmentis_41_universal_pathogens",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_1_3_e_coli",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Seafood": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            },
            {
              "productKey": "augmentis_41_universal_pathogens",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_1_3_e_coli",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      }
    }
  },
  {
    "id": "V-SF28",
    "name": "Specio 1.4 L. monocytogenes",
    "productLine": "Specio",
    "catalogCode": "V-SF28",
    "productKey": "specio_1_4_l_monocytogenes",
    "targets": [
      "listeria_monocytogenes"
    ],
    "mainIndustries": [
      "Dairy",
      "Fresh & Processed Produce",
      "Meat and Poultry",
      "Ready-to-eat",
      "Seafood"
    ],
    "technology": "Real-time PCR with melting curve  - KAi",
    "sensitivity": "Food sample: 1 CFU/25 g\nSurface sample: 1 CFU/100 cm2",
    "keyAdvantages": [
      {
        "title": "Specific L. mono ID",
        "subtitle": "KAi melting-curve"
      },
      {
        "title": "FAM-only setup",
        "subtitle": "runs on open instruments"
      },
      {
        "title": "Fast EMP screening",
        "subtitle": "clears line for release"
      },
      {
        "title": "Lower price",
        "subtitle": "below leading platforms"
      }
    ],
    "features": [
      "Specific L. monocytogenes identification by KAi melting-curve analysis with AI calling.",
      "Single FAM channel runs on basic open thermocyclers — no proprietary instrument.",
      "Quick result clears Listeria status for line release in environmental monitoring.",
      "Internal control monitors each reaction and supports automated TxA interpretation.",
      "Ready-to-use SPID format with preloaded strips cuts handling and speeds the run."
    ],
    "stagesByIndustry": {
      "Dairy": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_3_listeria_monocytogenes",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_1_4_l_monocytogenes",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Fresh & Processed Produce": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_3_listeria_monocytogenes",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_1_4_l_monocytogenes",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Meat and Poultry": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_3_listeria_monocytogenes",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_1_4_l_monocytogenes",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Ready-to-eat": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_3_listeria_monocytogenes",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_1_4_l_monocytogenes",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Seafood": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_3_listeria_monocytogenes",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_1_4_l_monocytogenes",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      }
    }
  },
  {
    "id": "V-SF45",
    "name": "Specio 1.7 Zygosaccharomyces bailii and parabailii",
    "productLine": "Specio",
    "catalogCode": "V-SF45",
    "productKey": "specio_1_7_zygosaccharomyces_bailii_and_parabailii",
    "targets": [
      "zygosaccharomyces_bailii",
      "zygosaccharomyces_bailii_parabailii"
    ],
    "mainIndustries": [
      "Beverage",
      "Sauces and condiments"
    ],
    "technology": "Real-time PCR with melting curve  - KAi",
    "sensitivity": "<5 CFU/25 g",
    "keyAdvantages": [
      {
        "title": "Key spoilage yeast",
        "subtitle": "Z. bailii/parabailii"
      },
      {
        "title": "KAi melting-curve",
        "subtitle": "specific ID"
      },
      {
        "title": "Protects shelf life",
        "subtitle": "acidified products"
      },
      {
        "title": "FAM-only setup",
        "subtitle": "open instruments"
      }
    ],
    "features": [
      "Targets Zygosaccharomyces bailii/parabailii, a preservative-resistant yeast that spoils acidified products.",
      "Specific identification by KAi melting-curve analysis with AI calling.",
      "Single FAM channel runs on basic open thermocyclers — no proprietary instrument.",
      "Early detection of this resistant spoiler protects shelf life.",
      "Internal control monitors each reaction and supports automated TxA interpretation."
    ],
    "stagesByIndustry": {
      "Beverage": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_21_yeast_molds",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 48.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_3_clean_q",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_1_7_zygosaccharomyces_bailii_and_parabailii",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Sauces and condiments": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_21_yeast_molds",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 48.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_3_clean_q",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_1_7_zygosaccharomyces_bailii_and_parabailii",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      }
    }
  },
  {
    "id": "V-SF52",
    "name": "Specio 1.8 Listeria spp.",
    "productLine": "Specio",
    "catalogCode": "V-SF52",
    "productKey": "specio_1_8_listeria_spp",
    "targets": [
      "listeria_spp"
    ],
    "mainIndustries": [
      "Dairy",
      "Fresh & Processed Produce",
      "Meat and Poultry",
      "Ready-to-eat",
      "Seafood"
    ],
    "technology": "Real-time PCR with melting curve  - KAi",
    "sensitivity": "From 6 CFU/25 g\n\nSensitivity depends on the target microorganism.",
    "keyAdvantages": [
      {
        "title": "Specific Listeria ID",
        "subtitle": "KAi melting-curve"
      },
      {
        "title": "FAM-only setup",
        "subtitle": "runs on open instruments"
      },
      {
        "title": "Fast EMP screening",
        "subtitle": "speeds decisions"
      },
      {
        "title": "Lower price",
        "subtitle": "below leading platforms"
      }
    ],
    "features": [
      "Specific Listeria spp. identification by KAi melting-curve analysis with AI calling.",
      "Single FAM channel runs on basic open thermocyclers — no proprietary instrument.",
      "Result well before culture confirmation speeds environmental decisions.",
      "Internal control monitors each reaction and supports automated TxA interpretation.",
      "Ready-to-use SPID format with preloaded strips cuts handling and speeds the run."
    ],
    "stagesByIndustry": {
      "Dairy": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 27.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_1_8_listeria_spp",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Fresh & Processed Produce": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 27.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_1_8_listeria_spp",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Meat and Poultry": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 27.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_1_8_listeria_spp",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Ready-to-eat": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 27.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_1_8_listeria_spp",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Seafood": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 27.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_1_8_listeria_spp",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      }
    }
  },
  {
    "id": "V-SF07",
    "name": "Specio 2.2 S. aureus and E. coli",
    "productLine": "Specio",
    "catalogCode": "V-SF07",
    "productKey": "specio_2_2_s_aureus_and_e_coli",
    "targets": [
      "staphylococcus_aureus",
      "escherichia_coli"
    ],
    "mainIndustries": [
      "Dairy",
      "Meat and Poultry",
      "Ready-to-eat",
      "Seafood"
    ],
    "technology": "Real-time PCR with melting curve  - KAi",
    "sensitivity": "Food sample: 1 CFU/25 g\nSurface sample: 1 CFU/100 cm2",
    "keyAdvantages": [
      {
        "title": "2 indicators, 1 reaction",
        "subtitle": "S. aureus + E. coli"
      },
      {
        "title": "~50% fewer reactions",
        "subtitle": "one assay, not two"
      },
      {
        "title": "FAM-only setup",
        "subtitle": "open instruments"
      },
      {
        "title": "Lower price",
        "subtitle": "below leading platforms"
      }
    ],
    "features": [
      "Detects S. aureus and E. coli together in one reaction via KAi melting-curve.",
      "Two hygiene indicators in one assay halves reagent and labor versus separate tests.",
      "Single FAM channel runs on basic open thermocyclers — no proprietary instrument.",
      "Internal control monitors each reaction and supports automated TxA interpretation.",
      "Ready-to-use SPID format with preloaded strips cuts handling and speeds the run."
    ],
    "stagesByIndustry": {
      "Dairy": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_2_2_s_aureus_and_e_coli",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Meat and Poultry": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_2_2_s_aureus_and_e_coli",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Ready-to-eat": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_2_2_s_aureus_and_e_coli",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Seafood": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_2_2_s_aureus_and_e_coli",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      }
    }
  },
  {
    "id": "V-SF04",
    "name": "Specio 2.3 Listeria spp. and L. monocytogenes",
    "productLine": "Specio",
    "catalogCode": "V-SF04",
    "productKey": "specio_2_3_listeria_spp_and_l_monocytogenes",
    "targets": [
      "listeria_spp",
      "listeria_monocytogenes"
    ],
    "mainIndustries": [
      "Dairy",
      "Fresh & Processed Produce",
      "Meat and Poultry",
      "Ready-to-eat",
      "Seafood"
    ],
    "technology": "Real-time PCR with melting curve  - KAi",
    "sensitivity": "Food sample: 1 CFU/25 g",
    "keyAdvantages": [
      {
        "title": "Species + genus",
        "subtitle": "L. mono vs Listeria spp."
      },
      {
        "title": "~50% fewer reactions",
        "subtitle": "one assay, not two"
      },
      {
        "title": "Sharper decisions",
        "subtitle": "species-level result"
      },
      {
        "title": "FAM-only setup",
        "subtitle": "open instruments"
      }
    ],
    "features": [
      "Distinguishes L. monocytogenes from Listeria spp. in one reaction via KAi melting-curve.",
      "Species-level answer in one assay guides the right corrective action immediately.",
      "Single FAM channel runs on basic open thermocyclers — no proprietary instrument.",
      "Internal control monitors each reaction and supports automated TxA interpretation.",
      "Ready-to-use SPID format with preloaded strips cuts handling and speeds the run."
    ],
    "stagesByIndustry": {
      "Dairy": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 27.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_2_3_listeria_spp_and_l_monocytogenes",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Fresh & Processed Produce": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 27.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_2_3_listeria_spp_and_l_monocytogenes",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Meat and Poultry": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 27.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_2_3_listeria_spp_and_l_monocytogenes",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Ready-to-eat": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 27.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_2_3_listeria_spp_and_l_monocytogenes",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Seafood": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 27.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_2_3_listeria_spp_and_l_monocytogenes",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      }
    }
  },
  {
    "id": "V-SF05",
    "name": "Specio 2.4 E. coli and E. coli O157:H7",
    "productLine": "Specio",
    "catalogCode": "V-SF05",
    "productKey": "specio_2_4_e_coli_and_e_coli_o157_h7",
    "targets": [
      "escherichia_coli",
      "e_coli_o157_h7"
    ],
    "mainIndustries": [
      "Fresh & Processed Produce",
      "Meat and Poultry",
      "Ready-to-eat",
      "Seafood"
    ],
    "technology": "Real-time PCR with melting curve  - KAi",
    "sensitivity": "Food sample: 1 CFU/25 g\nSurface sample: 1 CFU/100 cm2",
    "keyAdvantages": [
      {
        "title": "E. coli + O157:H7",
        "subtitle": "indicator vs pathogen"
      },
      {
        "title": "~50% fewer reactions",
        "subtitle": "one assay, not two"
      },
      {
        "title": "Sharper decisions",
        "subtitle": "strain-level result"
      },
      {
        "title": "FAM-only setup",
        "subtitle": "open instruments"
      }
    ],
    "features": [
      "Separates generic E. coli from pathogenic O157:H7 in one reaction via KAi melting-curve.",
      "Distinguishing indicator from pathogen in one assay sharpens risk decisions.",
      "Single FAM channel runs on basic open thermocyclers — no proprietary instrument.",
      "Strong fit for meat and produce, where these E. coli risks drive recalls.",
      "Ready-to-use SPID format with preloaded strips cuts handling and speeds the run."
    ],
    "stagesByIndustry": {
      "Fresh & Processed Produce": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            },
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_2_4_e_coli_and_e_coli_o157_h7",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Meat and Poultry": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            },
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_2_4_e_coli_and_e_coli_o157_h7",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Ready-to-eat": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            },
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_2_4_e_coli_and_e_coli_o157_h7",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Seafood": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            },
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_2_4_e_coli_and_e_coli_o157_h7",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      }
    }
  },
  {
    "id": "V-SF29",
    "name": "Specio 2.5 Salmonella spp. and L. monocytogenes",
    "productLine": "Specio",
    "catalogCode": "V-SF29",
    "productKey": "specio_2_5_salmonella_spp_and_l_monocytogenes",
    "targets": [
      "salmonella_spp",
      "listeria_monocytogenes"
    ],
    "mainIndustries": [
      "Confectionery",
      "Egg Products",
      "Meat and Poultry",
      "Pet Food & Animal Feed",
      "Ready-to-eat",
      "Seafood"
    ],
    "technology": "Real-time PCR with melting curve  - KAi",
    "sensitivity": "Food sample: 1 CFU/25 g\nSurface sample: 1 CFU/100 cm2",
    "keyAdvantages": [
      {
        "title": "2 pathogens, 1 reaction",
        "subtitle": "Salmonella + L. mono"
      },
      {
        "title": "~50% fewer reactions",
        "subtitle": "one assay, not two"
      },
      {
        "title": "Faster release",
        "subtitle": "combined result"
      },
      {
        "title": "FAM-only setup",
        "subtitle": "open instruments"
      }
    ],
    "features": [
      "Detects Salmonella and L. monocytogenes together in one reaction via KAi melting-curve.",
      "Two pathogens in one assay halves reagent and labor versus separate tests.",
      "Single FAM channel runs on basic open thermocyclers — no proprietary instrument.",
      "Internal control monitors each reaction and supports automated TxA interpretation.",
      "Ready-to-use SPID format with preloaded strips cuts handling and speeds the run."
    ],
    "stagesByIndustry": {
      "Confectionery": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_41_universal_pathogens",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_2_5_salmonella_spp_and_l_monocytogenes",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Egg Products": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_41_universal_pathogens",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_2_5_salmonella_spp_and_l_monocytogenes",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Meat and Poultry": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_41_universal_pathogens",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_2_5_salmonella_spp_and_l_monocytogenes",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Pet Food & Animal Feed": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_41_universal_pathogens",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_2_5_salmonella_spp_and_l_monocytogenes",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Ready-to-eat": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_41_universal_pathogens",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_2_5_salmonella_spp_and_l_monocytogenes",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Seafood": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_41_universal_pathogens",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_2_5_salmonella_spp_and_l_monocytogenes",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      }
    }
  },
  {
    "id": "V-SF56",
    "name": "Specio 3.2 Salmonella spp., L. monocytogenes and E. coli O157:H7",
    "productLine": "Specio",
    "catalogCode": "V-SF56",
    "productKey": "specio_3_2_salmonella_spp_l_monocytogenes_and_e_coli_o157_h7",
    "targets": [
      "salmonella_spp",
      "listeria_monocytogenes",
      "e_coli_o157_h7"
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
    ],
    "technology": "Real-time PCR with melting curve  - KAi",
    "sensitivity": "From 8 CFU per sample\n\nSensitivity depends on the target microorganism.",
    "keyAdvantages": [
      {
        "title": "3 pathogens, 1 reaction",
        "subtitle": "Salmonella, L. mono, O157:H7"
      },
      {
        "title": "~67% fewer reactions",
        "subtitle": "one assay, not three"
      },
      {
        "title": "Comprehensive safety",
        "subtitle": "three critical targets"
      },
      {
        "title": "FAM-only setup",
        "subtitle": "open instruments"
      }
    ],
    "features": [
      "Detects Salmonella, L. monocytogenes and E. coli O157:H7 in one reaction via KAi melting-curve.",
      "Three pathogens in one assay cuts reagent and labor by two-thirds versus separate tests.",
      "Single FAM channel runs on basic open thermocyclers — no proprietary instrument.",
      "Broad pathogen coverage per sample lowers recall risk and protects the brand.",
      "Ready-to-use SPID format with preloaded strips cuts handling and speeds the run."
    ],
    "stagesByIndustry": {
      "Confectionery": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_3_2_salmonella_spp_l_monocytogenes_and_e_coli_o157_h7",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Dairy": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_3_2_salmonella_spp_l_monocytogenes_and_e_coli_o157_h7",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Egg Products": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_3_2_salmonella_spp_l_monocytogenes_and_e_coli_o157_h7",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Fresh & Processed Produce": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_3_2_salmonella_spp_l_monocytogenes_and_e_coli_o157_h7",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Meat and Poultry": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_3_2_salmonella_spp_l_monocytogenes_and_e_coli_o157_h7",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Pet Food & Animal Feed": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_3_2_salmonella_spp_l_monocytogenes_and_e_coli_o157_h7",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Ready-to-eat": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_3_2_salmonella_spp_l_monocytogenes_and_e_coli_o157_h7",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Seafood": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_3_2_salmonella_spp_l_monocytogenes_and_e_coli_o157_h7",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      }
    }
  },
  {
    "id": "V-SF95",
    "name": "Specio 4.1 Salmonella spp., L. monocytogenes, E. coli and S. aureus",
    "productLine": "Specio",
    "catalogCode": "V-SF95",
    "productKey": "specio_4_1_salmonella_spp_l_monocytogenes_e_coli_and_s_aureus",
    "targets": [
      "salmonella_spp",
      "staphylococcus_aureus",
      "escherichia_coli",
      "listeria_monocytogenes"
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
    ],
    "technology": "Real-time PCR with melting curve  - KAi",
    "sensitivity": "Food sample: 1 CFU/25 g\nSurface sample: 1 CFU/100 cm2",
    "keyAdvantages": [
      {
        "title": "4 pathogens, 1 reaction",
        "subtitle": "broadest single-assay panel"
      },
      {
        "title": "~75% fewer reactions",
        "subtitle": "one assay, not four"
      },
      {
        "title": "Broadest safety",
        "subtitle": "four key targets"
      },
      {
        "title": "FAM-only setup",
        "subtitle": "open instruments"
      }
    ],
    "features": [
      "Detects Salmonella, L. monocytogenes, E. coli and S. aureus in one reaction via KAi melting-curve.",
      "Four pathogens in one assay cuts reagent and labor by three-quarters versus separate tests.",
      "Single FAM channel runs on basic open thermocyclers — no proprietary instrument.",
      "Broadest pathogen coverage per sample speeds release and lowers recall risk.",
      "Ready-to-use SPID format with preloaded strips cuts handling and speeds the run."
    ],
    "stagesByIndustry": {
      "Confectionery": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0,
              "matrices": [
                "Environmental stainless-steel surfaces.",
                "Leafy green – Lettuce.",
                "Surface"
              ]
            },
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_3_listeria_monocytogenes",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_4_1_salmonella_spp_l_monocytogenes_e_coli_and_s_aureus",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Dairy": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0,
              "matrices": [
                "Environmental stainless-steel surfaces.",
                "Leafy green – Lettuce.",
                "Surface"
              ]
            },
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_3_listeria_monocytogenes",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_4_1_salmonella_spp_l_monocytogenes_e_coli_and_s_aureus",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Egg Products": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0,
              "matrices": [
                "Environmental stainless-steel surfaces.",
                "Leafy green – Lettuce.",
                "Surface"
              ]
            },
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_3_listeria_monocytogenes",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_4_1_salmonella_spp_l_monocytogenes_e_coli_and_s_aureus",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Fresh & Processed Produce": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0,
              "matrices": [
                "Environmental stainless-steel surfaces.",
                "Leafy green – Lettuce.",
                "Surface"
              ]
            },
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_3_listeria_monocytogenes",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_4_1_salmonella_spp_l_monocytogenes_e_coli_and_s_aureus",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Meat and Poultry": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0,
              "matrices": [
                "Environmental stainless-steel surfaces.",
                "Leafy green – Lettuce.",
                "Surface"
              ]
            },
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_3_listeria_monocytogenes",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_4_1_salmonella_spp_l_monocytogenes_e_coli_and_s_aureus",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Pet Food & Animal Feed": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0,
              "matrices": [
                "Environmental stainless-steel surfaces.",
                "Leafy green – Lettuce.",
                "Surface"
              ]
            },
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_3_listeria_monocytogenes",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_4_1_salmonella_spp_l_monocytogenes_e_coli_and_s_aureus",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Ready-to-eat": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0,
              "matrices": [
                "Environmental stainless-steel surfaces.",
                "Leafy green – Lettuce.",
                "Surface"
              ]
            },
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_3_listeria_monocytogenes",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_4_1_salmonella_spp_l_monocytogenes_e_coli_and_s_aureus",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Sauces and condiments": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0,
              "matrices": [
                "Environmental stainless-steel surfaces.",
                "Leafy green – Lettuce.",
                "Surface"
              ]
            },
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_3_listeria_monocytogenes",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_4_1_salmonella_spp_l_monocytogenes_e_coli_and_s_aureus",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Seafood": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0,
              "matrices": [
                "Environmental stainless-steel surfaces.",
                "Leafy green – Lettuce.",
                "Surface"
              ]
            },
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_3_listeria_monocytogenes",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_4_1_salmonella_spp_l_monocytogenes_e_coli_and_s_aureus",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      }
    }
  },
  {
    "id": "V-SF193",
    "name": "Specio 4.8 Pathogens + Hygiene Indicators",
    "productLine": "Specio",
    "catalogCode": "V-SF193",
    "productKey": "specio_4_8_pathogens_hygiene_indicators",
    "targets": [
      "salmonella_spp",
      "listeria_monocytogenes",
      "fecal_microorganism_indicator",
      "inadequate_gmp_indicator"
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
    ],
    "technology": "Real-time PCR with melting curve  - KAi",
    "sensitivity": "Food sample: 1 CFU/25 g\nSurface sample: 1 CFU/100 cm2",
    "keyAdvantages": [
      {
        "title": "Pathogens + indicators",
        "subtitle": "pioneering single reaction"
      },
      {
        "title": "~75% fewer reactions",
        "subtitle": "one assay, not four"
      },
      {
        "title": "Prevent, don't react",
        "subtitle": "hygiene early warning"
      },
      {
        "title": "FAM-only setup",
        "subtitle": "open instruments"
      }
    ],
    "features": [
      "Pioneering design pairs pathogen detection with hygiene indicators in a single reaction.",
      "Hygiene indicators flag process drift before it becomes a recall — prevention, not reaction.",
      "Four targets in one assay cuts reagent and labor by three-quarters versus separate tests.",
      "Single FAM channel runs on basic open thermocyclers — no proprietary instrument.",
      "Ready-to-use SPID format with preloaded strips cuts handling and speeds the run."
    ],
    "stagesByIndustry": {
      "Confectionery": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0,
              "matrices": [
                "Environmental stainless-steel surfaces.",
                "Surface"
              ]
            },
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_3_listeria_monocytogenes",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_4_8_pathogens_hygiene_indicators",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Dairy": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0,
              "matrices": [
                "Environmental stainless-steel surfaces.",
                "Surface"
              ]
            },
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_3_listeria_monocytogenes",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_4_8_pathogens_hygiene_indicators",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Egg Products": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0,
              "matrices": [
                "Environmental stainless-steel surfaces.",
                "Surface"
              ]
            },
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_3_listeria_monocytogenes",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_4_8_pathogens_hygiene_indicators",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Fresh & Processed Produce": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0,
              "matrices": [
                "Environmental stainless-steel surfaces.",
                "Surface"
              ]
            },
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_3_listeria_monocytogenes",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_4_8_pathogens_hygiene_indicators",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Meat and Poultry": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0,
              "matrices": [
                "Environmental stainless-steel surfaces.",
                "Surface"
              ]
            },
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_3_listeria_monocytogenes",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_4_8_pathogens_hygiene_indicators",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Pet Food & Animal Feed": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0,
              "matrices": [
                "Environmental stainless-steel surfaces.",
                "Surface"
              ]
            },
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_3_listeria_monocytogenes",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_4_8_pathogens_hygiene_indicators",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Ready-to-eat": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0,
              "matrices": [
                "Environmental stainless-steel surfaces.",
                "Surface"
              ]
            },
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_3_listeria_monocytogenes",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_4_8_pathogens_hygiene_indicators",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Sauces and condiments": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0,
              "matrices": [
                "Environmental stainless-steel surfaces.",
                "Surface"
              ]
            },
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_3_listeria_monocytogenes",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_4_8_pathogens_hygiene_indicators",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      },
      "Seafood": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeHours": 0.25
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24.0,
              "matrices": [
                "Environmental stainless-steel surfaces.",
                "Surface"
              ]
            },
            {
              "productKey": "augmentis_1_listeria",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_3_listeria_monocytogenes",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            },
            {
              "productKey": "augmentis_91_bpw",
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": true,
              "timeLabel": "X mins"
            }
          ]
        },
        "pcr": {
          "productKey": "specio_4_8_pathogens_hygiene_indicators",
          "timeHours": 2.0,
          "timeEstimated": false
        }
      }
    }
  }
];