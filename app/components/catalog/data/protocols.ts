// protocols.ts - EDIT BY HAND. Main data file, regenerated from the source workbook.
// One entry per PCR kit (only kits that have protocol rows in the source are included).
// Products (and their presentations/catalog codes) live in products.ts; stages reference a
// product by `productKey`.
//
// NORMALIZATION RULES:
//   1. Sample type: always `sampleTypes` (array), inferred from each row's matrix text.
//   2. Time: option has flat `timeHours` (constant) - enrichment times come from the source;
//      sampling times are an invented 0.25h placeholder (timeEstimated: true).
//   3. mainIndustries = industries the kit DECLARES (source main_industries), mapped to the
//      canonical industry names; used to filter which kits appear for a chosen industry.

export type StageKey = "sampling" | "enrichment" | "mediumSupplement" | "extractionSupplement" | "extraction" | "pcr";
export type SampleType = "Environmental" | "Finished";
export type ExecMode = "Manual" | "Automated";
// How options within a group relate:
//  - "parallel": ALL media in the group are used together.
//  - "alternative": the user picks ONE medium from the group.
export type GroupMode = "parallel" | "alternative";
// A group bundles enrichment media that share a mode, scoped to a sample type. A stage's
// final workflow for a given sample type = the union of its groups for that sample type:
// every "parallel" group contributes ALL its media; every "alternative" group contributes ONE.
// Media are referenced by productKey (they live in the stage's `options` list). If a stage has
// no `groups`, every option is treated as a standalone alternative (safe default = pick one).
export interface EnrichmentGroup {
  id: string;
  sampleType: SampleType;
  mode: GroupMode;
  productKeys: string[];
}

export interface StageOption {
  productKey: string;
  catalogCode?: string[] | null;
  sampleTypes: SampleType[];
  mode?: ExecMode | null;
  timeHours?: number | null;
  timeLabel?: string;        // shown instead of a formatted time when set (e.g. "X mins" = TODO)
  timeEstimated: boolean;
  // Sampling-gated enrichment: if set, this (enrichment) option only applies when the chosen
  // sampling product is one of these productKeys. Lets a sampling choice drive whether enrichment
  // is part of the protocol (e.g. captus_zero_1 = direct/no-enrichment vs captus_xpress = with it).
  requiresSampling?: string[];
  // In-device enrichment: the enrichment is performed inside the sampling device (same tube). When
  // true, this option is NOT a separate stage — it is folded into the sampling stage, which becomes
  // "Sampling & Enrichment" and takes this option's time. Pair with `requiresSampling`.
  inDevice?: boolean;
}
export interface PcrUse {
  productKey: string;
  catalogCode: string;
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
  keyAdvantages: KeyAdvantage[];   // top "value brief" cards (PCR value brief)
  // Stages depend on the (kit, industry) pair: the same kit can use different enrichment
  // media and extraction kits per industry. Keyed by canonical industry name.
  stagesByIndustry: Record<string, {
    sampling: { options: StageOption[] };
    enrichment: { options: StageOption[]; groups?: EnrichmentGroup[] };
    mediumSupplement: { options: StageOption[] };
    extractionSupplement: { options: StageOption[] };
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
      "Salmonella_spp."
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
    "stagesByIndustry": {
      "Confectionery": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "catalogCode": [
                "V-FP27"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "catalogCode": [
                "V-FL46",
                "V-FP27"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_1_1_salmonella_spp",
          "catalogCode": "V-SF97",
          "timeHours": 1.666666667,
          "timeEstimated": false
        }
      },
      "Egg Products": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "catalogCode": [
                "V-FP27"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "catalogCode": [
                "V-FL46",
                "V-FP27"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_1_1_salmonella_spp",
          "catalogCode": "V-SF97",
          "timeHours": 1.666666667,
          "timeEstimated": false
        }
      },
      "Fresh & Processed Produce": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "catalogCode": [
                "V-FP27"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "catalogCode": [
                "V-FL46",
                "V-FP27"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_1_1_salmonella_spp",
          "catalogCode": "V-SF97",
          "timeHours": 1.666666667,
          "timeEstimated": false
        }
      },
      "Meat and Poultry": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "catalogCode": [
                "V-FP27"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "catalogCode": [
                "V-FL46",
                "V-FP27"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_1_1_salmonella_spp",
          "catalogCode": "V-SF97",
          "timeHours": 1.666666667,
          "timeEstimated": false
        }
      },
      "Nutraceutical": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "catalogCode": [
                "V-FP27"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "catalogCode": [
                "V-FL46",
                "V-FP27"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_1_1_salmonella_spp",
          "catalogCode": "V-SF97",
          "timeHours": 1.666666667,
          "timeEstimated": false
        }
      },
      "Pet Food & Animal Feed": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "catalogCode": [
                "V-FP27"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "catalogCode": [
                "V-FL46",
                "V-FP27"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_1_1_salmonella_spp",
          "catalogCode": "V-SF97",
          "timeHours": 1.666666667,
          "timeEstimated": false
        }
      },
      "Ready-to-eat": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "catalogCode": [
                "V-FP27"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "catalogCode": [
                "V-FL46",
                "V-FP27"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_1_1_salmonella_spp",
          "catalogCode": "V-SF97",
          "timeHours": 1.666666667,
          "timeEstimated": false
        }
      },
      "Sauces and condiments": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "catalogCode": [
                "V-FP27"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "catalogCode": [
                "V-FL46",
                "V-FP27"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_1_1_salmonella_spp",
          "catalogCode": "V-SF97",
          "timeHours": 1.666666667,
          "timeEstimated": false
        }
      },
      "Seafood": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "catalogCode": [
                "V-FP27"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "catalogCode": [
                "V-FL46",
                "V-FP27"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_1_1_salmonella_spp",
          "catalogCode": "V-SF97",
          "timeHours": 1.666666667,
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
      "Escherichia_coli"
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
    "stagesByIndustry": {
      "Confectionery": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL45",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL06",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_1_3_e_coli",
          "catalogCode": "V-SF69",
          "timeHours": 1.666666667,
          "timeEstimated": false
        }
      },
      "Fresh & Processed Produce": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL45",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL06",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_1_3_e_coli",
          "catalogCode": "V-SF69",
          "timeHours": 1.666666667,
          "timeEstimated": false
        }
      },
      "Meat and Poultry": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL45",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL06",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_1_3_e_coli",
          "catalogCode": "V-SF69",
          "timeHours": 1.666666667,
          "timeEstimated": false
        }
      },
      "Nutraceutical": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL45",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL06",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_1_3_e_coli",
          "catalogCode": "V-SF69",
          "timeHours": 1.666666667,
          "timeEstimated": false
        }
      },
      "Pet Food & Animal Feed": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL45",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL06",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_1_3_e_coli",
          "catalogCode": "V-SF69",
          "timeHours": 1.666666667,
          "timeEstimated": false
        }
      },
      "Ready-to-eat": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL45",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL06",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_1_3_e_coli",
          "catalogCode": "V-SF69",
          "timeHours": 1.666666667,
          "timeEstimated": false
        }
      },
      "Seafood": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL45",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL06",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_1_3_e_coli",
          "catalogCode": "V-SF69",
          "timeHours": 1.666666667,
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
      "Alicyclobacillus_spp.",
      "Guaiacol_producing_bacteria"
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
    "stagesByIndustry": {
      "Beverage": {
        "sampling": {
          "options": []
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "catalogCode": [
                "V-FL18",
                "V-FP08"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_6_ysg_broth",
              "catalogCode": [
                "V-FL49"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": [
            {
              "productKey": "clarixa_1",
              "catalogCode": [
                "V-PET02"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_4_bacteria_yeast_and_molds_plus",
              "catalogCode": [
                "V-EQ46"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_2_10_acb_plus_guaiacol_producing_gene",
          "catalogCode": "V-SF161",
          "timeHours": 2,
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
              "productKey": "augmentis_31_universal_surfaces",
              "catalogCode": [
                "V-FL18",
                "V-FP08"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_6_ysg_broth",
              "catalogCode": [
                "V-FL49"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": [
            {
              "productKey": "clarixa_1",
              "catalogCode": [
                "V-PET02"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_4_bacteria_yeast_and_molds_plus",
              "catalogCode": [
                "V-EQ46"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_2_10_acb_plus_guaiacol_producing_gene",
          "catalogCode": "V-SF161",
          "timeHours": 2,
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
      "Listeria_spp.",
      "Listeria_monocytogenes"
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
    "stagesByIndustry": {
      "Dairy": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FL23",
                "V-FL40",
                "V-FP26"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_2_3_listeria_spp_and_l_monocytogenes",
          "catalogCode": "V-SF46",
          "timeHours": 1.583333333,
          "timeEstimated": false
        }
      },
      "Fresh & Processed Produce": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FL23",
                "V-FL40",
                "V-FP26"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_2_3_listeria_spp_and_l_monocytogenes",
          "catalogCode": "V-SF46",
          "timeHours": 1.583333333,
          "timeEstimated": false
        }
      },
      "Meat and Poultry": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FL23",
                "V-FL40",
                "V-FP26"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_2_3_listeria_spp_and_l_monocytogenes",
          "catalogCode": "V-SF46",
          "timeHours": 1.583333333,
          "timeEstimated": false
        }
      },
      "Ready-to-eat": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FL23",
                "V-FL40",
                "V-FP26"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_2_3_listeria_spp_and_l_monocytogenes",
          "catalogCode": "V-SF46",
          "timeHours": 1.583333333,
          "timeEstimated": false
        }
      },
      "Seafood": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FL23",
                "V-FL40",
                "V-FP26"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_2_3_listeria_spp_and_l_monocytogenes",
          "catalogCode": "V-SF46",
          "timeHours": 1.583333333,
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
      "Listeria_spp.",
      "Salmonella_spp."
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
    "stagesByIndustry": {
      "Confectionery": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FL23",
                "V-FL40",
                "V-FP26"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL45",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL06",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ],
          "groups": [
            {
              "id": "env-par",
              "sampleType": "Environmental",
              "mode": "parallel",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_91_bpw"
              ]
            },
            {
              "id": "fin-par",
              "sampleType": "Finished",
              "mode": "parallel",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_91_bpw"
              ]
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_2_8_listeria_spp_and_salmonella_spp",
          "catalogCode": "V-SF44",
          "timeHours": 1.666666667,
          "timeEstimated": false
        }
      },
      "Dairy": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FL23",
                "V-FL40",
                "V-FP26"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL45",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL06",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ],
          "groups": [
            {
              "id": "env-par",
              "sampleType": "Environmental",
              "mode": "parallel",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_91_bpw"
              ]
            },
            {
              "id": "fin-par",
              "sampleType": "Finished",
              "mode": "parallel",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_91_bpw"
              ]
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_2_8_listeria_spp_and_salmonella_spp",
          "catalogCode": "V-SF44",
          "timeHours": 1.666666667,
          "timeEstimated": false
        }
      },
      "Fresh & Processed Produce": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FL23",
                "V-FL40",
                "V-FP26"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL45",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL06",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ],
          "groups": [
            {
              "id": "env-par",
              "sampleType": "Environmental",
              "mode": "parallel",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_91_bpw"
              ]
            },
            {
              "id": "fin-par",
              "sampleType": "Finished",
              "mode": "parallel",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_91_bpw"
              ]
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_2_8_listeria_spp_and_salmonella_spp",
          "catalogCode": "V-SF44",
          "timeHours": 1.666666667,
          "timeEstimated": false
        }
      },
      "Meat and Poultry": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FL23",
                "V-FL40",
                "V-FP26"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL45",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL06",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ],
          "groups": [
            {
              "id": "env-par",
              "sampleType": "Environmental",
              "mode": "parallel",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_91_bpw"
              ]
            },
            {
              "id": "fin-par",
              "sampleType": "Finished",
              "mode": "parallel",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_91_bpw"
              ]
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_2_8_listeria_spp_and_salmonella_spp",
          "catalogCode": "V-SF44",
          "timeHours": 1.666666667,
          "timeEstimated": false
        }
      },
      "Nutraceutical": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FL23",
                "V-FL40",
                "V-FP26"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL45",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL06",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ],
          "groups": [
            {
              "id": "env-par",
              "sampleType": "Environmental",
              "mode": "parallel",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_91_bpw"
              ]
            },
            {
              "id": "fin-par",
              "sampleType": "Finished",
              "mode": "parallel",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_91_bpw"
              ]
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_2_8_listeria_spp_and_salmonella_spp",
          "catalogCode": "V-SF44",
          "timeHours": 1.666666667,
          "timeEstimated": false
        }
      },
      "Pet Food & Animal Feed": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FL23",
                "V-FL40",
                "V-FP26"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL45",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL06",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ],
          "groups": [
            {
              "id": "env-par",
              "sampleType": "Environmental",
              "mode": "parallel",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_91_bpw"
              ]
            },
            {
              "id": "fin-par",
              "sampleType": "Finished",
              "mode": "parallel",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_91_bpw"
              ]
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_2_8_listeria_spp_and_salmonella_spp",
          "catalogCode": "V-SF44",
          "timeHours": 1.666666667,
          "timeEstimated": false
        }
      },
      "Ready-to-eat": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FL23",
                "V-FL40",
                "V-FP26"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL45",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL06",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ],
          "groups": [
            {
              "id": "env-par",
              "sampleType": "Environmental",
              "mode": "parallel",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_91_bpw"
              ]
            },
            {
              "id": "fin-par",
              "sampleType": "Finished",
              "mode": "parallel",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_91_bpw"
              ]
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_2_8_listeria_spp_and_salmonella_spp",
          "catalogCode": "V-SF44",
          "timeHours": 1.666666667,
          "timeEstimated": false
        }
      },
      "Seafood": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FL23",
                "V-FL40",
                "V-FP26"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL45",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL06",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ],
          "groups": [
            {
              "id": "env-par",
              "sampleType": "Environmental",
              "mode": "parallel",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_91_bpw"
              ]
            },
            {
              "id": "fin-par",
              "sampleType": "Finished",
              "mode": "parallel",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_91_bpw"
              ]
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_2_8_listeria_spp_and_salmonella_spp",
          "catalogCode": "V-SF44",
          "timeHours": 1.666666667,
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
      "Escherichia_coli",
      "Citrobacter_spp.",
      "Klebsiella_spp."
    ],
    "mainIndustries": [
      "Water"
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
    "stagesByIndustry": {
      "Water": {
        "sampling": {
          "options": []
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "catalogCode": [
                "V-FL18",
                "V-FP08"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_11_waterscan",
          "catalogCode": "V-SF98",
          "timeHours": 2,
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
      "Enterococcus_spp.",
      "Enterobacter_spp.",
      "Escherichia_spp."
    ],
    "mainIndustries": [
      "Water"
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
    "stagesByIndustry": {
      "Water": {
        "sampling": {
          "options": []
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "catalogCode": [
                "V-FL18",
                "V-FP08"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_12_waterscan",
          "catalogCode": "V-SF89",
          "timeHours": 2,
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
      "Alicyclobacillus_spp.",
      "Zygosaccharomyces_spp.",
      "Guaiacol_producing_bacteria"
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
    "stagesByIndustry": {
      "Beverage": {
        "sampling": {
          "options": []
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_21_yeast_molds",
              "catalogCode": [
                "V-FL12",
                "V-FP18"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 48,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_6_ysg_broth",
              "catalogCode": [
                "V-FL49"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 48,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_4_bacteria_yeast_and_molds_plus",
              "catalogCode": [
                "V-EQ46"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_13_acb_guaiacol_producing_gene_plus_zygosaccharomyces_spp",
          "catalogCode": "V-SF160",
          "timeHours": 1.583333333,
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
              "productKey": "augmentis_21_yeast_molds",
              "catalogCode": [
                "V-FL12",
                "V-FP18"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 48,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_6_ysg_broth",
              "catalogCode": [
                "V-FL49"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 48,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_4_bacteria_yeast_and_molds_plus",
              "catalogCode": [
                "V-EQ46"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_13_acb_guaiacol_producing_gene_plus_zygosaccharomyces_spp",
          "catalogCode": "V-SF160",
          "timeHours": 1.583333333,
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
      "Salmonella_spp.",
      "Listeria_monocytogenes",
      "Escherichia_coli_O157_H7"
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
    "stagesByIndustry": {
      "Confectionery": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "catalogCode": [
                "V-FL18",
                "V-FP08"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL06",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ],
          "groups": [
            {
              "id": "env-surf",
              "sampleType": "Environmental",
              "mode": "alternative",
              "productKeys": [
                "augmentis_31_universal_surfaces"
              ]
            },
            {
              "id": "fin-par",
              "sampleType": "Finished",
              "mode": "parallel",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_91_bpw"
              ]
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_2_salmonella_spp_l_monocytogenes_and_e_coli_o157_h7",
          "catalogCode": "V-SF67",
          "timeHours": 1.666666667,
          "timeEstimated": false
        }
      },
      "Dairy": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "catalogCode": [
                "V-FL18",
                "V-FP08"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL06",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ],
          "groups": [
            {
              "id": "env-surf",
              "sampleType": "Environmental",
              "mode": "alternative",
              "productKeys": [
                "augmentis_31_universal_surfaces"
              ]
            },
            {
              "id": "fin-par",
              "sampleType": "Finished",
              "mode": "parallel",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_91_bpw"
              ]
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_2_salmonella_spp_l_monocytogenes_and_e_coli_o157_h7",
          "catalogCode": "V-SF67",
          "timeHours": 1.666666667,
          "timeEstimated": false
        }
      },
      "Egg Products": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "catalogCode": [
                "V-FL18",
                "V-FP08"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL06",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ],
          "groups": [
            {
              "id": "env-surf",
              "sampleType": "Environmental",
              "mode": "alternative",
              "productKeys": [
                "augmentis_31_universal_surfaces"
              ]
            },
            {
              "id": "fin-par",
              "sampleType": "Finished",
              "mode": "parallel",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_91_bpw"
              ]
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_2_salmonella_spp_l_monocytogenes_and_e_coli_o157_h7",
          "catalogCode": "V-SF67",
          "timeHours": 1.666666667,
          "timeEstimated": false
        }
      },
      "Fresh & Processed Produce": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "catalogCode": [
                "V-FL18",
                "V-FP08"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL06",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ],
          "groups": [
            {
              "id": "env-surf",
              "sampleType": "Environmental",
              "mode": "alternative",
              "productKeys": [
                "augmentis_31_universal_surfaces"
              ]
            },
            {
              "id": "fin-par",
              "sampleType": "Finished",
              "mode": "parallel",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_91_bpw"
              ]
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_2_salmonella_spp_l_monocytogenes_and_e_coli_o157_h7",
          "catalogCode": "V-SF67",
          "timeHours": 1.666666667,
          "timeEstimated": false
        }
      },
      "Meat and Poultry": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "catalogCode": [
                "V-FL18",
                "V-FP08"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL06",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ],
          "groups": [
            {
              "id": "env-surf",
              "sampleType": "Environmental",
              "mode": "alternative",
              "productKeys": [
                "augmentis_31_universal_surfaces"
              ]
            },
            {
              "id": "fin-par",
              "sampleType": "Finished",
              "mode": "parallel",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_91_bpw"
              ]
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_2_salmonella_spp_l_monocytogenes_and_e_coli_o157_h7",
          "catalogCode": "V-SF67",
          "timeHours": 1.666666667,
          "timeEstimated": false
        }
      },
      "Nutraceutical": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "catalogCode": [
                "V-FL18",
                "V-FP08"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL06",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ],
          "groups": [
            {
              "id": "env-surf",
              "sampleType": "Environmental",
              "mode": "alternative",
              "productKeys": [
                "augmentis_31_universal_surfaces"
              ]
            },
            {
              "id": "fin-par",
              "sampleType": "Finished",
              "mode": "parallel",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_91_bpw"
              ]
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_2_salmonella_spp_l_monocytogenes_and_e_coli_o157_h7",
          "catalogCode": "V-SF67",
          "timeHours": 1.666666667,
          "timeEstimated": false
        }
      },
      "Pet Food & Animal Feed": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "catalogCode": [
                "V-FL18",
                "V-FP08"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL06",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ],
          "groups": [
            {
              "id": "env-surf",
              "sampleType": "Environmental",
              "mode": "alternative",
              "productKeys": [
                "augmentis_31_universal_surfaces"
              ]
            },
            {
              "id": "fin-par",
              "sampleType": "Finished",
              "mode": "parallel",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_91_bpw"
              ]
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_2_salmonella_spp_l_monocytogenes_and_e_coli_o157_h7",
          "catalogCode": "V-SF67",
          "timeHours": 1.666666667,
          "timeEstimated": false
        }
      },
      "Ready-to-eat": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "catalogCode": [
                "V-FL18",
                "V-FP08"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL06",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ],
          "groups": [
            {
              "id": "env-surf",
              "sampleType": "Environmental",
              "mode": "alternative",
              "productKeys": [
                "augmentis_31_universal_surfaces"
              ]
            },
            {
              "id": "fin-par",
              "sampleType": "Finished",
              "mode": "parallel",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_91_bpw"
              ]
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_2_salmonella_spp_l_monocytogenes_and_e_coli_o157_h7",
          "catalogCode": "V-SF67",
          "timeHours": 1.666666667,
          "timeEstimated": false
        }
      },
      "Sauces and condiments": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "catalogCode": [
                "V-FL18",
                "V-FP08"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL06",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ],
          "groups": [
            {
              "id": "env-surf",
              "sampleType": "Environmental",
              "mode": "alternative",
              "productKeys": [
                "augmentis_31_universal_surfaces"
              ]
            },
            {
              "id": "fin-par",
              "sampleType": "Finished",
              "mode": "parallel",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_91_bpw"
              ]
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_2_salmonella_spp_l_monocytogenes_and_e_coli_o157_h7",
          "catalogCode": "V-SF67",
          "timeHours": 1.666666667,
          "timeEstimated": false
        }
      },
      "Seafood": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "catalogCode": [
                "V-FL18",
                "V-FP08"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeEstimated": false,
              "timeHours": 24
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL06",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ],
          "groups": [
            {
              "id": "env-surf",
              "sampleType": "Environmental",
              "mode": "alternative",
              "productKeys": [
                "augmentis_31_universal_surfaces"
              ]
            },
            {
              "id": "fin-par",
              "sampleType": "Finished",
              "mode": "parallel",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_91_bpw"
              ]
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_2_salmonella_spp_l_monocytogenes_and_e_coli_o157_h7",
          "catalogCode": "V-SF67",
          "timeHours": 1.666666667,
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
      "Salmonella_spp.",
      "Listeria_monocytogenes",
      "Listeria_spp."
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
    "stagesByIndustry": {
      "Confectionery": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FL23",
                "V-FL40",
                "V-FP26"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL45",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL06",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ],
          "groups": [
            {
              "id": "env-par",
              "sampleType": "Environmental",
              "mode": "parallel",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_91_bpw"
              ]
            },
            {
              "id": "fin-par",
              "sampleType": "Finished",
              "mode": "parallel",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_91_bpw"
              ]
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_5_salmonella_spp_l_monocytogenes_and_listeria_spp",
          "catalogCode": "V-SF59",
          "timeHours": 1.666666667,
          "timeEstimated": false
        }
      },
      "Dairy": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FL23",
                "V-FL40",
                "V-FP26"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL45",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL06",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ],
          "groups": [
            {
              "id": "env-par",
              "sampleType": "Environmental",
              "mode": "parallel",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_91_bpw"
              ]
            },
            {
              "id": "fin-par",
              "sampleType": "Finished",
              "mode": "parallel",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_91_bpw"
              ]
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_5_salmonella_spp_l_monocytogenes_and_listeria_spp",
          "catalogCode": "V-SF59",
          "timeHours": 1.666666667,
          "timeEstimated": false
        }
      },
      "Egg Products": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FL23",
                "V-FL40",
                "V-FP26"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL45",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL06",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ],
          "groups": [
            {
              "id": "env-par",
              "sampleType": "Environmental",
              "mode": "parallel",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_91_bpw"
              ]
            },
            {
              "id": "fin-par",
              "sampleType": "Finished",
              "mode": "parallel",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_91_bpw"
              ]
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_5_salmonella_spp_l_monocytogenes_and_listeria_spp",
          "catalogCode": "V-SF59",
          "timeHours": 1.666666667,
          "timeEstimated": false
        }
      },
      "Fresh & Processed Produce": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FL23",
                "V-FL40",
                "V-FP26"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL45",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL06",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ],
          "groups": [
            {
              "id": "env-par",
              "sampleType": "Environmental",
              "mode": "parallel",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_91_bpw"
              ]
            },
            {
              "id": "fin-par",
              "sampleType": "Finished",
              "mode": "parallel",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_91_bpw"
              ]
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_5_salmonella_spp_l_monocytogenes_and_listeria_spp",
          "catalogCode": "V-SF59",
          "timeHours": 1.666666667,
          "timeEstimated": false
        }
      },
      "Meat and Poultry": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FL23",
                "V-FL40",
                "V-FP26"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL45",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL06",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ],
          "groups": [
            {
              "id": "env-par",
              "sampleType": "Environmental",
              "mode": "parallel",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_91_bpw"
              ]
            },
            {
              "id": "fin-par",
              "sampleType": "Finished",
              "mode": "parallel",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_91_bpw"
              ]
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_5_salmonella_spp_l_monocytogenes_and_listeria_spp",
          "catalogCode": "V-SF59",
          "timeHours": 1.666666667,
          "timeEstimated": false
        }
      },
      "Nutraceutical": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FL23",
                "V-FL40",
                "V-FP26"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL45",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL06",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ],
          "groups": [
            {
              "id": "env-par",
              "sampleType": "Environmental",
              "mode": "parallel",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_91_bpw"
              ]
            },
            {
              "id": "fin-par",
              "sampleType": "Finished",
              "mode": "parallel",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_91_bpw"
              ]
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_5_salmonella_spp_l_monocytogenes_and_listeria_spp",
          "catalogCode": "V-SF59",
          "timeHours": 1.666666667,
          "timeEstimated": false
        }
      },
      "Pet Food & Animal Feed": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FL23",
                "V-FL40",
                "V-FP26"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL45",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL06",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ],
          "groups": [
            {
              "id": "env-par",
              "sampleType": "Environmental",
              "mode": "parallel",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_91_bpw"
              ]
            },
            {
              "id": "fin-par",
              "sampleType": "Finished",
              "mode": "parallel",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_91_bpw"
              ]
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_5_salmonella_spp_l_monocytogenes_and_listeria_spp",
          "catalogCode": "V-SF59",
          "timeHours": 1.666666667,
          "timeEstimated": false
        }
      },
      "Ready-to-eat": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FL23",
                "V-FL40",
                "V-FP26"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL45",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL06",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ],
          "groups": [
            {
              "id": "env-par",
              "sampleType": "Environmental",
              "mode": "parallel",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_91_bpw"
              ]
            },
            {
              "id": "fin-par",
              "sampleType": "Finished",
              "mode": "parallel",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_91_bpw"
              ]
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_5_salmonella_spp_l_monocytogenes_and_listeria_spp",
          "catalogCode": "V-SF59",
          "timeHours": 1.666666667,
          "timeEstimated": false
        }
      },
      "Seafood": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FL23",
                "V-FL40",
                "V-FP26"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL45",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL06",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ],
          "groups": [
            {
              "id": "env-par",
              "sampleType": "Environmental",
              "mode": "parallel",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_91_bpw"
              ]
            },
            {
              "id": "fin-par",
              "sampleType": "Finished",
              "mode": "parallel",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_91_bpw"
              ]
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_5_salmonella_spp_l_monocytogenes_and_listeria_spp",
          "catalogCode": "V-SF59",
          "timeHours": 1.666666667,
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
      "Salmonella_spp.",
      "Listeria_monocytogenes",
      "Listeria_spp."
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
    "stagesByIndustry": {
      "Confectionery": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FL23",
                "V-FL40",
                "V-FP26"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL45",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL06",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ],
          "groups": [
            {
              "id": "env-par",
              "sampleType": "Environmental",
              "mode": "parallel",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_91_bpw"
              ]
            },
            {
              "id": "fin-par",
              "sampleType": "Finished",
              "mode": "parallel",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_91_bpw"
              ]
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_5r_salmonella_spp_l_monocytogenes_and_listeria_spp",
          "catalogCode": "V-SF74",
          "timeHours": 1.833333333,
          "timeEstimated": false
        }
      },
      "Dairy": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FL23",
                "V-FL40",
                "V-FP26"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL45",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL06",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ],
          "groups": [
            {
              "id": "env-par",
              "sampleType": "Environmental",
              "mode": "parallel",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_91_bpw"
              ]
            },
            {
              "id": "fin-par",
              "sampleType": "Finished",
              "mode": "parallel",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_91_bpw"
              ]
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_5r_salmonella_spp_l_monocytogenes_and_listeria_spp",
          "catalogCode": "V-SF74",
          "timeHours": 1.833333333,
          "timeEstimated": false
        }
      },
      "Egg Products": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FL23",
                "V-FL40",
                "V-FP26"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL45",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL06",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ],
          "groups": [
            {
              "id": "env-par",
              "sampleType": "Environmental",
              "mode": "parallel",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_91_bpw"
              ]
            },
            {
              "id": "fin-par",
              "sampleType": "Finished",
              "mode": "parallel",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_91_bpw"
              ]
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_5r_salmonella_spp_l_monocytogenes_and_listeria_spp",
          "catalogCode": "V-SF74",
          "timeHours": 1.833333333,
          "timeEstimated": false
        }
      },
      "Fresh & Processed Produce": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FL23",
                "V-FL40",
                "V-FP26"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL45",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL06",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ],
          "groups": [
            {
              "id": "env-par",
              "sampleType": "Environmental",
              "mode": "parallel",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_91_bpw"
              ]
            },
            {
              "id": "fin-par",
              "sampleType": "Finished",
              "mode": "parallel",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_91_bpw"
              ]
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_5r_salmonella_spp_l_monocytogenes_and_listeria_spp",
          "catalogCode": "V-SF74",
          "timeHours": 1.833333333,
          "timeEstimated": false
        }
      },
      "Meat and Poultry": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FL23",
                "V-FL40",
                "V-FP26"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL45",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL06",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ],
          "groups": [
            {
              "id": "env-par",
              "sampleType": "Environmental",
              "mode": "parallel",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_91_bpw"
              ]
            },
            {
              "id": "fin-par",
              "sampleType": "Finished",
              "mode": "parallel",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_91_bpw"
              ]
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_5r_salmonella_spp_l_monocytogenes_and_listeria_spp",
          "catalogCode": "V-SF74",
          "timeHours": 1.833333333,
          "timeEstimated": false
        }
      },
      "Nutraceutical": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FL23",
                "V-FL40",
                "V-FP26"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL45",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL06",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ],
          "groups": [
            {
              "id": "env-par",
              "sampleType": "Environmental",
              "mode": "parallel",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_91_bpw"
              ]
            },
            {
              "id": "fin-par",
              "sampleType": "Finished",
              "mode": "parallel",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_91_bpw"
              ]
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_5r_salmonella_spp_l_monocytogenes_and_listeria_spp",
          "catalogCode": "V-SF74",
          "timeHours": 1.833333333,
          "timeEstimated": false
        }
      },
      "Pet Food & Animal Feed": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FL23",
                "V-FL40",
                "V-FP26"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL45",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL06",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ],
          "groups": [
            {
              "id": "env-par",
              "sampleType": "Environmental",
              "mode": "parallel",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_91_bpw"
              ]
            },
            {
              "id": "fin-par",
              "sampleType": "Finished",
              "mode": "parallel",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_91_bpw"
              ]
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_5r_salmonella_spp_l_monocytogenes_and_listeria_spp",
          "catalogCode": "V-SF74",
          "timeHours": 1.833333333,
          "timeEstimated": false
        }
      },
      "Ready-to-eat": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FL23",
                "V-FL40",
                "V-FP26"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL45",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL06",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ],
          "groups": [
            {
              "id": "env-par",
              "sampleType": "Environmental",
              "mode": "parallel",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_91_bpw"
              ]
            },
            {
              "id": "fin-par",
              "sampleType": "Finished",
              "mode": "parallel",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_91_bpw"
              ]
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_5r_salmonella_spp_l_monocytogenes_and_listeria_spp",
          "catalogCode": "V-SF74",
          "timeHours": 1.833333333,
          "timeEstimated": false
        }
      },
      "Seafood": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FL23",
                "V-FL40",
                "V-FP26"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL45",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL06",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ],
          "groups": [
            {
              "id": "env-par",
              "sampleType": "Environmental",
              "mode": "parallel",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_91_bpw"
              ]
            },
            {
              "id": "fin-par",
              "sampleType": "Finished",
              "mode": "parallel",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_91_bpw"
              ]
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_5r_salmonella_spp_l_monocytogenes_and_listeria_spp",
          "catalogCode": "V-SF74",
          "timeHours": 1.833333333,
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
      "Escherichia_coli_STEC",
      "Escherichia_coli_O157_H7",
      "Salmonella_spp."
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
    "stagesByIndustry": {
      "Confectionery": {
        "sampling": {
          "options": []
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "catalogCode": [
                "V-FL18",
                "V-FP08"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_9_e_coli_stec_e_coli_o157_h7_and_salmonella_spp",
          "catalogCode": "V-SF68",
          "timeHours": 1.666666667,
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
              "productKey": "augmentis_31_universal_surfaces",
              "catalogCode": [
                "V-FL18",
                "V-FP08"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_9_e_coli_stec_e_coli_o157_h7_and_salmonella_spp",
          "catalogCode": "V-SF68",
          "timeHours": 1.666666667,
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
              "productKey": "augmentis_31_universal_surfaces",
              "catalogCode": [
                "V-FL18",
                "V-FP08"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_9_e_coli_stec_e_coli_o157_h7_and_salmonella_spp",
          "catalogCode": "V-SF68",
          "timeHours": 1.666666667,
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
              "productKey": "augmentis_31_universal_surfaces",
              "catalogCode": [
                "V-FL18",
                "V-FP08"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_9_e_coli_stec_e_coli_o157_h7_and_salmonella_spp",
          "catalogCode": "V-SF68",
          "timeHours": 1.666666667,
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
              "productKey": "augmentis_31_universal_surfaces",
              "catalogCode": [
                "V-FL18",
                "V-FP08"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_9_e_coli_stec_e_coli_o157_h7_and_salmonella_spp",
          "catalogCode": "V-SF68",
          "timeHours": 1.666666667,
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
      "Saccharomyces_cerevisiae",
      "Saccharomyces_spp.",
      "Zygosaccharomyces_bailii",
      "Zygosaccharomyces_parabailii",
      "Zygosaccharomyces_group_Zygosaccharomyces_bailii_Zygosaccharomyces_parabailii_Zygosaccharomyces_rouxii"
    ],
    "mainIndustries": [
      "Beer",
      "Wine"
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
    "stagesByIndustry": {
      "Beer": {
        "sampling": {
          "options": []
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_21_yeast_molds",
              "catalogCode": [
                "V-FL12",
                "V-FP18"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 48,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_2_wort",
              "catalogCode": [
                "V-FL34"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 68,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_4_bacteria_yeast_and_molds_plus",
              "catalogCode": [
                "V-EQ46"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_4_3_yeast",
          "catalogCode": "V-SF100",
          "timeHours": 1.75,
          "timeEstimated": false
        }
      },
      "Wine": {
        "sampling": {
          "options": []
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_21_yeast_molds",
              "catalogCode": [
                "V-FL12",
                "V-FP18"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 48,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_2_wort",
              "catalogCode": [
                "V-FL34"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 68,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_4_bacteria_yeast_and_molds_plus",
              "catalogCode": [
                "V-EQ46"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_4_3_yeast",
          "catalogCode": "V-SF100",
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
      "Brettanomyces_bruxellensis",
      "Brettanomyces_spp.",
      "Pichia_spp.",
      "Saccharomyces_cerevisiae_var_diastaticus"
    ],
    "mainIndustries": [
      "Beer",
      "Wine"
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
    "stagesByIndustry": {
      "Beer": {
        "sampling": {
          "options": []
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_21_yeast_molds",
              "catalogCode": [
                "V-FL12",
                "V-FP18"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 48,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_2_wort",
              "catalogCode": [
                "V-FL34"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 68,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_4_bacteria_yeast_and_molds_plus",
              "catalogCode": [
                "V-EQ46"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_4_4_yeast",
          "catalogCode": "V-SF101",
          "timeHours": 1.75,
          "timeEstimated": false
        }
      },
      "Wine": {
        "sampling": {
          "options": []
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_21_yeast_molds",
              "catalogCode": [
                "V-FL12",
                "V-FP18"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 48,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_2_wort",
              "catalogCode": [
                "V-FL34"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 68,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_4_bacteria_yeast_and_molds_plus",
              "catalogCode": [
                "V-EQ46"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_4_4_yeast",
          "catalogCode": "V-SF101",
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
      "Levilactobacillus_brevis",
      "Fructilactobacillus_lindneri",
      "Lactobacillus_group_Furfurilactobacillus_rossiae_Lacticaseibacillus_casei_Lacticaseibacillus_paracasei_Lactiplantibacillus_plantarum_Lentilactobacillus_buchneri_and_Lentilactobacillus_parabuchneri",
      "Pediococcus_spp."
    ],
    "mainIndustries": [
      "Beer"
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
    "stagesByIndustry": {
      "Beer": {
        "sampling": {
          "options": []
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "catalogCode": [
                "V-FL18",
                "V-FP08"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_4_bacteria_yeast_and_molds_plus",
              "catalogCode": [
                "V-EQ46"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_4_5_bacteria",
          "catalogCode": "V-SF102",
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
      "Loigolactobacillus_backii",
      "Secundilactobacillus_collinoides",
      "Secundilactobacillus_paracollinoides",
      "Megasphaera_spp.",
      "Pectinatus_spp."
    ],
    "mainIndustries": [
      "Beer"
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
    "stagesByIndustry": {
      "Beer": {
        "sampling": {
          "options": []
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "catalogCode": [
                "V-FL18",
                "V-FP08"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_4_bacteria_yeast_and_molds_plus",
              "catalogCode": [
                "V-EQ46"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_4_6_bacteria",
          "catalogCode": "V-SF103",
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
      "Acidophilic_bacteria",
      "Brettanomyces_spp.",
      "Yeasts_and_molds",
      "Preservative_resistant_yeasts_PRY"
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
    "stagesByIndustry": {
      "Beverage": {
        "sampling": {
          "options": []
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_21_yeast_molds",
              "catalogCode": [
                "V-FL12",
                "V-FP18"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 48,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_4_spoilage_beverage",
              "catalogCode": [
                "V-FL41"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 48,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "magneus_3_bacteria_yeast_molds",
              "catalogCode": [
                "V-MA01"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 1,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_4_bacteria_yeast_and_molds_plus",
              "catalogCode": [
                "V-EQ46"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.6,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_4_7_low_ph_microorganisms",
          "catalogCode": "V-SF169",
          "timeHours": 1.333333333,
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
              "productKey": "augmentis_21_yeast_molds",
              "catalogCode": [
                "V-FL12",
                "V-FP18"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 48,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_4_spoilage_beverage",
              "catalogCode": [
                "V-FL41"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 48,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "magneus_3_bacteria_yeast_molds",
              "catalogCode": [
                "V-MA01"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 1,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_4_bacteria_yeast_and_molds_plus",
              "catalogCode": [
                "V-EQ46"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.6,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_4_7_low_ph_microorganisms",
          "catalogCode": "V-SF169",
          "timeHours": 1.333333333,
          "timeEstimated": false
        }
      }
    }
  },
  {
    "id": "V-EQ30",
    "name": "Ampliora 4.7 Spoilage Beverage",
    "productLine": "Ampliora",
    "catalogCode": "V-EQ30",
    "productKey": "ampliora_4_7_spoilage_beverage",
    "targets": [
      "Acidophilic_bacteria",
      "Brettanomyces_spp.",
      "Yeasts_and_molds",
      "Preservative_resistant_yeasts_PRY"
    ],
    "mainIndustries": [
      "Beverage"
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
    "stagesByIndustry": {
      "Beverage": {
        "sampling": {
          "options": []
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_21_yeast_molds",
              "catalogCode": [
                "V-FL12",
                "V-FP18"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 48,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_4_spoilage_beverage",
              "catalogCode": [
                "V-FL41"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 48,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "magneus_3_bacteria_yeast_molds",
              "catalogCode": [
                "V-MA01"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 1,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_4_bacteria_yeast_and_molds_plus",
              "catalogCode": [
                "V-EQ46"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.6,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_4_7_spoilage_beverage",
          "catalogCode": "V-EQ30",
          "timeHours": 1.333333333,
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
      "Escherichia_coli",
      "Citrobacter_spp.",
      "Klebsiella_spp.",
      "Enterococcus_spp.",
      "Enterobacter_spp.",
      "Escherichia_spp."
    ],
    "mainIndustries": [
      "Water"
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
    "stagesByIndustry": {
      "Water": {
        "sampling": {
          "options": []
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "catalogCode": [
                "V-FL18",
                "V-FP08"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_6_1_waterscan_plus",
          "catalogCode": "V-SF88",
          "timeHours": 2,
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
      "Brettanomyces_bruxellensis",
      "Brettanomyces_spp.",
      "Pichia_spp.",
      "Saccharomyces_cerevisiae",
      "Saccharomyces_cerevisiae_var_diastaticus",
      "Saccharomyces_spp.",
      "Zygosaccharomyces_bailii",
      "Zygosaccharomyces_parabailii",
      "Zygosaccharomyces_group_Zygosaccharomyces_bailii_Zygosaccharomyces_parabailii_Zygosaccharomyces_rouxii"
    ],
    "mainIndustries": [
      "Beer"
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
    "stagesByIndustry": {
      "Beer": {
        "sampling": {
          "options": []
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_21_yeast_molds",
              "catalogCode": [
                "V-FL12",
                "V-FP18"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 48,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_2_wort",
              "catalogCode": [
                "V-FL34"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 68,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_4_bacteria_yeast_and_molds_plus",
              "catalogCode": [
                "V-EQ46"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_8_1_yeast_plus",
          "catalogCode": "V-SF64",
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
      "Loigolactobacillus_backii",
      "Levilactobacillus_brevis",
      "Secundilactobacillus_collinoides",
      "Secundilactobacillus_paracollinoides",
      "Fructilactobacillus_lindneri",
      "Lactobacillus_group_Furfurilactobacillus_rossiae_Lacticaseibacillus_casei_Lacticaseibacillus_paracasei_Lactiplantibacillus_plantarum_Lentilactobacillus_buchneri_and_Lentilactobacillus_parabuchneri",
      "Megasphaera_spp.",
      "Pediococcus_spp.",
      "Pectinatus_spp."
    ],
    "mainIndustries": [
      "Beer"
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
    "stagesByIndustry": {
      "Beer": {
        "sampling": {
          "options": []
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "catalogCode": [
                "V-FL18",
                "V-FP08"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_4_bacteria_yeast_and_molds_plus",
              "catalogCode": [
                "V-EQ46"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_8_2_bacteria_plus",
          "catalogCode": "V-SF99",
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
      "Salmonella_spp."
    ],
    "mainIndustries": [
      "Confectionery",
      "Meat and Poultry",
      "Dairy",
      "Pet Food & Animal Feed"
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
    "stagesByIndustry": {
      "Confectionery": {
        "sampling": {
          "options": [
            {
              "productKey": "captus_zero_1",
              "catalogCode": [
                "V-TB36"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            },
            {
              "productKey": "captus_xpress_2",
              "catalogCode": [
                "V-FL48"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            },
            {
              "productKey": "captus_xpress_1",
              "catalogCode": [
                "V-TB37"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_xpress_1",
              "catalogCode": [
                "V-TB32"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 3,
              "timeEstimated": false,
              "requiresSampling": [
                "captus_xpress_1",
                "captus_xpress_2"
              ],
              "inDevice": true
            },
            {
              "productKey": "augmentis_xpress_1",
              "catalogCode": [
                "V-FL47"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 3,
              "timeEstimated": false,
              "requiresSampling": [
                "captus_xpress_1",
                "captus_xpress_2"
              ],
              "inDevice": true
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 8,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": [
            {
              "productKey": "potentia_1_salmonella_spp",
              "catalogCode": [
                "V-PET06"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true
            }
          ]
        },
        "extractionSupplement": {
          "options": [
            {
              "productKey": "clarixa_1",
              "catalogCode": [
                "V-PET02"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "magneus_6_bacteria",
              "catalogCode": [
                "V-MA19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_8_ultra",
              "catalogCode": [
                "V-EE03"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            },
            {
              "productKey": "magneus_1_bacteria",
              "catalogCode": [
                "V-EQ40"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.666666667,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "elevia_1_1_salmonella_spp",
          "catalogCode": "V-PAT04",
          "timeHours": 1.583333333,
          "timeEstimated": false
        }
      },
      "Dairy": {
        "sampling": {
          "options": [
            {
              "productKey": "captus_zero_1",
              "catalogCode": [
                "V-TB36"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            },
            {
              "productKey": "captus_xpress_2",
              "catalogCode": [
                "V-FL48"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            },
            {
              "productKey": "captus_xpress_1",
              "catalogCode": [
                "V-TB37"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_xpress_1",
              "catalogCode": [
                "V-TB32"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 3,
              "timeEstimated": false,
              "requiresSampling": [
                "captus_xpress_1",
                "captus_xpress_2"
              ],
              "inDevice": true
            },
            {
              "productKey": "augmentis_xpress_1",
              "catalogCode": [
                "V-FL47"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 3,
              "timeEstimated": false,
              "requiresSampling": [
                "captus_xpress_1",
                "captus_xpress_2"
              ],
              "inDevice": true
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": [
            {
              "productKey": "clarixa_1",
              "catalogCode": [
                "V-PET02"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true
            }
          ]
        },
        "extraction": {
          "options": [
            {
              "productKey": "magneus_6_bacteria",
              "catalogCode": [
                "V-MA19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_8_ultra",
              "catalogCode": [
                "V-EE03"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            },
            {
              "productKey": "magneus_1_bacteria",
              "catalogCode": [
                "V-EQ40"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.666666667,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "elevia_1_1_salmonella_spp",
          "catalogCode": "V-PAT04",
          "timeHours": 1.583333333,
          "timeEstimated": false
        }
      },
      "Egg Products": {
        "sampling": {
          "options": [
            {
              "productKey": "captus_zero_1",
              "catalogCode": [
                "V-TB36"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            },
            {
              "productKey": "captus_xpress_2",
              "catalogCode": [
                "V-FL48"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            },
            {
              "productKey": "captus_xpress_1",
              "catalogCode": [
                "V-TB37"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_xpress_1",
              "catalogCode": [
                "V-TB32"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 3,
              "timeEstimated": false,
              "requiresSampling": [
                "captus_xpress_1",
                "captus_xpress_2"
              ],
              "inDevice": true
            },
            {
              "productKey": "augmentis_xpress_1",
              "catalogCode": [
                "V-FL47"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 3,
              "timeEstimated": false,
              "requiresSampling": [
                "captus_xpress_1",
                "captus_xpress_2"
              ],
              "inDevice": true
            },
            {
              "productKey": "augmentis_xpress_1",
              "catalogCode": [
                "V-FP34"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 6,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "magneus_6_bacteria",
              "catalogCode": [
                "V-MA19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_8_ultra",
              "catalogCode": [
                "V-EE03"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            },
            {
              "productKey": "magneus_6_bacteria",
              "catalogCode": [
                "V-MA19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "elevia_1_1_salmonella_spp",
          "catalogCode": "V-PAT04",
          "timeHours": 1.583333333,
          "timeEstimated": false
        }
      },
      "Fresh & Processed Produce": {
        "sampling": {
          "options": [
            {
              "productKey": "captus_zero_1",
              "catalogCode": [
                "V-TB36"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            },
            {
              "productKey": "captus_xpress_2",
              "catalogCode": [
                "V-FL48"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            },
            {
              "productKey": "captus_xpress_1",
              "catalogCode": [
                "V-TB37"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_xpress_1",
              "catalogCode": [
                "V-TB32"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 3,
              "timeEstimated": false,
              "requiresSampling": [
                "captus_xpress_1",
                "captus_xpress_2"
              ],
              "inDevice": true
            },
            {
              "productKey": "augmentis_xpress_1",
              "catalogCode": [
                "V-FL47"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 3,
              "timeEstimated": false,
              "requiresSampling": [
                "captus_xpress_1",
                "captus_xpress_2"
              ],
              "inDevice": true
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "magneus_6_bacteria",
              "catalogCode": [
                "V-MA19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_8_ultra",
              "catalogCode": [
                "V-EE03"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "elevia_1_1_salmonella_spp",
          "catalogCode": "V-PAT04",
          "timeHours": 1.583333333,
          "timeEstimated": false
        }
      },
      "Meat and Poultry": {
        "sampling": {
          "options": [
            {
              "productKey": "captus_zero_1",
              "catalogCode": [
                "V-TB36"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            },
            {
              "productKey": "captus_xpress_2",
              "catalogCode": [
                "V-FL48"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            },
            {
              "productKey": "captus_xpress_1",
              "catalogCode": [
                "V-TB37"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_xpress_1",
              "catalogCode": [
                "V-TB32"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 3,
              "timeEstimated": false,
              "requiresSampling": [
                "captus_xpress_1",
                "captus_xpress_2"
              ],
              "inDevice": true
            },
            {
              "productKey": "augmentis_xpress_1",
              "catalogCode": [
                "V-FL47"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 3,
              "timeEstimated": false,
              "requiresSampling": [
                "captus_xpress_1",
                "captus_xpress_2"
              ],
              "inDevice": true
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 6,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "magneus_6_bacteria",
              "catalogCode": [
                "V-MA19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_8_ultra",
              "catalogCode": [
                "V-EE03"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            },
            {
              "productKey": "magneus_1_bacteria",
              "catalogCode": [
                "V-EQ40"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.666666667,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "elevia_1_1_salmonella_spp",
          "catalogCode": "V-PAT04",
          "timeHours": 1.583333333,
          "timeEstimated": false
        }
      },
      "Pet Food & Animal Feed": {
        "sampling": {
          "options": [
            {
              "productKey": "captus_zero_1",
              "catalogCode": [
                "V-TB36"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            },
            {
              "productKey": "captus_xpress_2",
              "catalogCode": [
                "V-FL48"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            },
            {
              "productKey": "captus_xpress_1",
              "catalogCode": [
                "V-TB37"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_xpress_1",
              "catalogCode": [
                "V-TB32"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 3,
              "timeEstimated": false,
              "requiresSampling": [
                "captus_xpress_1",
                "captus_xpress_2"
              ],
              "inDevice": true
            },
            {
              "productKey": "augmentis_xpress_1",
              "catalogCode": [
                "V-FL47"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 3,
              "timeEstimated": false,
              "requiresSampling": [
                "captus_xpress_1",
                "captus_xpress_2"
              ],
              "inDevice": true
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 6,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "magneus_6_bacteria",
              "catalogCode": [
                "V-MA19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_8_ultra",
              "catalogCode": [
                "V-EE03"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            },
            {
              "productKey": "magneus_1_bacteria",
              "catalogCode": [
                "V-EQ40"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.666666667,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "elevia_1_1_salmonella_spp",
          "catalogCode": "V-PAT04",
          "timeHours": 1.583333333,
          "timeEstimated": false
        }
      },
      "Ready-to-eat": {
        "sampling": {
          "options": [
            {
              "productKey": "captus_zero_1",
              "catalogCode": [
                "V-TB36"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            },
            {
              "productKey": "captus_xpress_2",
              "catalogCode": [
                "V-FL48"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            },
            {
              "productKey": "captus_xpress_1",
              "catalogCode": [
                "V-TB37"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_xpress_1",
              "catalogCode": [
                "V-TB32"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 3,
              "timeEstimated": false,
              "requiresSampling": [
                "captus_xpress_1",
                "captus_xpress_2"
              ],
              "inDevice": true
            },
            {
              "productKey": "augmentis_xpress_1",
              "catalogCode": [
                "V-FL47"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 3,
              "timeEstimated": false,
              "requiresSampling": [
                "captus_xpress_1",
                "captus_xpress_2"
              ],
              "inDevice": true
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 6,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "magneus_6_bacteria",
              "catalogCode": [
                "V-MA19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_8_ultra",
              "catalogCode": [
                "V-EE03"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            },
            {
              "productKey": "magneus_1_bacteria",
              "catalogCode": [
                "V-EQ40"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.666666667,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "elevia_1_1_salmonella_spp",
          "catalogCode": "V-PAT04",
          "timeHours": 1.583333333,
          "timeEstimated": false
        }
      },
      "Seafood": {
        "sampling": {
          "options": [
            {
              "productKey": "captus_zero_1",
              "catalogCode": [
                "V-TB36"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            },
            {
              "productKey": "captus_xpress_2",
              "catalogCode": [
                "V-FL48"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            },
            {
              "productKey": "captus_xpress_1",
              "catalogCode": [
                "V-TB37"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_xpress_1",
              "catalogCode": [
                "V-TB32"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 3,
              "timeEstimated": false,
              "requiresSampling": [
                "captus_xpress_1",
                "captus_xpress_2"
              ],
              "inDevice": true
            },
            {
              "productKey": "augmentis_xpress_1",
              "catalogCode": [
                "V-FL47"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 3,
              "timeEstimated": false,
              "requiresSampling": [
                "captus_xpress_1",
                "captus_xpress_2"
              ],
              "inDevice": true
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "magneus_6_bacteria",
              "catalogCode": [
                "V-MA19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_8_ultra",
              "catalogCode": [
                "V-EE03"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "elevia_1_1_salmonella_spp",
          "catalogCode": "V-PAT04",
          "timeHours": 1.583333333,
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
      "Salmonella_spp.",
      "Listeria_spp."
    ],
    "mainIndustries": [],
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
    "stagesByIndustry": {
      "Confectionery": {
        "sampling": {
          "options": [
            {
              "productKey": "captus_zero_1",
              "catalogCode": [
                "V-TB36"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            },
            {
              "productKey": "captus_xpress_2",
              "catalogCode": [
                "V-FL48"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            },
            {
              "productKey": "captus_xpress_1",
              "catalogCode": [
                "V-TB37"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_xpress_1",
              "catalogCode": [
                "V-TB32"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 4,
              "timeEstimated": false,
              "requiresSampling": [
                "captus_xpress_1",
                "captus_xpress_2"
              ],
              "inDevice": true
            },
            {
              "productKey": "augmentis_xpress_1",
              "catalogCode": [
                "V-FL47"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 4,
              "timeEstimated": false,
              "requiresSampling": [
                "captus_xpress_1",
                "captus_xpress_2"
              ],
              "inDevice": true
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_8_ultra",
              "catalogCode": [
                "V-EE03"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "elevia_2_8_salmonella_spp_and_listeria_spp",
          "catalogCode": "V-PAT07",
          "timeHours": 1.666666667,
          "timeEstimated": false
        }
      },
      "Fresh & Processed Produce": {
        "sampling": {
          "options": [
            {
              "productKey": "captus_zero_1",
              "catalogCode": [
                "V-TB36"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            },
            {
              "productKey": "captus_xpress_2",
              "catalogCode": [
                "V-FL48"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            },
            {
              "productKey": "captus_xpress_1",
              "catalogCode": [
                "V-TB37"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_xpress_1",
              "catalogCode": [
                "V-TB32"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 4,
              "timeEstimated": false,
              "requiresSampling": [
                "captus_xpress_1",
                "captus_xpress_2"
              ],
              "inDevice": true
            },
            {
              "productKey": "augmentis_xpress_1",
              "catalogCode": [
                "V-FL47"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 4,
              "timeEstimated": false,
              "requiresSampling": [
                "captus_xpress_1",
                "captus_xpress_2"
              ],
              "inDevice": true
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_8_ultra",
              "catalogCode": [
                "V-EE03"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "elevia_2_8_salmonella_spp_and_listeria_spp",
          "catalogCode": "V-PAT07",
          "timeHours": 1.666666667,
          "timeEstimated": false
        }
      },
      "Meat and Poultry": {
        "sampling": {
          "options": [
            {
              "productKey": "captus_zero_1",
              "catalogCode": [
                "V-TB36"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            },
            {
              "productKey": "captus_xpress_2",
              "catalogCode": [
                "V-FL48"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            },
            {
              "productKey": "captus_xpress_1",
              "catalogCode": [
                "V-TB37"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_xpress_1",
              "catalogCode": [
                "V-TB32"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 4,
              "timeEstimated": false,
              "requiresSampling": [
                "captus_xpress_1",
                "captus_xpress_2"
              ],
              "inDevice": true
            },
            {
              "productKey": "augmentis_xpress_1",
              "catalogCode": [
                "V-FL47"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 4,
              "timeEstimated": false,
              "requiresSampling": [
                "captus_xpress_1",
                "captus_xpress_2"
              ],
              "inDevice": true
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_8_ultra",
              "catalogCode": [
                "V-EE03"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "elevia_2_8_salmonella_spp_and_listeria_spp",
          "catalogCode": "V-PAT07",
          "timeHours": 1.666666667,
          "timeEstimated": false
        }
      },
      "Pet Food & Animal Feed": {
        "sampling": {
          "options": [
            {
              "productKey": "captus_zero_1",
              "catalogCode": [
                "V-TB36"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            },
            {
              "productKey": "captus_xpress_2",
              "catalogCode": [
                "V-FL48"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            },
            {
              "productKey": "captus_xpress_1",
              "catalogCode": [
                "V-TB37"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_xpress_1",
              "catalogCode": [
                "V-TB32"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 4,
              "timeEstimated": false,
              "requiresSampling": [
                "captus_xpress_1",
                "captus_xpress_2"
              ],
              "inDevice": true
            },
            {
              "productKey": "augmentis_xpress_1",
              "catalogCode": [
                "V-FL47"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 4,
              "timeEstimated": false,
              "requiresSampling": [
                "captus_xpress_1",
                "captus_xpress_2"
              ],
              "inDevice": true
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_8_ultra",
              "catalogCode": [
                "V-EE03"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "elevia_2_8_salmonella_spp_and_listeria_spp",
          "catalogCode": "V-PAT07",
          "timeHours": 1.666666667,
          "timeEstimated": false
        }
      },
      "Ready-to-eat": {
        "sampling": {
          "options": [
            {
              "productKey": "captus_zero_1",
              "catalogCode": [
                "V-TB36"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            },
            {
              "productKey": "captus_xpress_2",
              "catalogCode": [
                "V-FL48"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            },
            {
              "productKey": "captus_xpress_1",
              "catalogCode": [
                "V-TB37"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_xpress_1",
              "catalogCode": [
                "V-TB32"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 4,
              "timeEstimated": false,
              "requiresSampling": [
                "captus_xpress_1",
                "captus_xpress_2"
              ],
              "inDevice": true
            },
            {
              "productKey": "augmentis_xpress_1",
              "catalogCode": [
                "V-FL47"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 4,
              "timeEstimated": false,
              "requiresSampling": [
                "captus_xpress_1",
                "captus_xpress_2"
              ],
              "inDevice": true
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_8_ultra",
              "catalogCode": [
                "V-EE03"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "elevia_2_8_salmonella_spp_and_listeria_spp",
          "catalogCode": "V-PAT07",
          "timeHours": 1.666666667,
          "timeEstimated": false
        }
      },
      "Seafood": {
        "sampling": {
          "options": [
            {
              "productKey": "captus_zero_1",
              "catalogCode": [
                "V-TB36"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            },
            {
              "productKey": "captus_xpress_2",
              "catalogCode": [
                "V-FL48"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            },
            {
              "productKey": "captus_xpress_1",
              "catalogCode": [
                "V-TB37"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_xpress_1",
              "catalogCode": [
                "V-TB32"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 4,
              "timeEstimated": false,
              "requiresSampling": [
                "captus_xpress_1",
                "captus_xpress_2"
              ],
              "inDevice": true
            },
            {
              "productKey": "augmentis_xpress_1",
              "catalogCode": [
                "V-FL47"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 4,
              "timeEstimated": false,
              "requiresSampling": [
                "captus_xpress_1",
                "captus_xpress_2"
              ],
              "inDevice": true
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_8_ultra",
              "catalogCode": [
                "V-EE03"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "elevia_2_8_salmonella_spp_and_listeria_spp",
          "catalogCode": "V-PAT07",
          "timeHours": 1.666666667,
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
      "Salmonella_spp.",
      "Enterobacteria"
    ],
    "mainIndustries": [],
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
    "stagesByIndustry": {
      "Confectionery": {
        "sampling": {
          "options": [
            {
              "productKey": "captus_zero_1",
              "catalogCode": [
                "V-TB36"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            },
            {
              "productKey": "captus_xpress_2",
              "catalogCode": [
                "V-FL48"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            },
            {
              "productKey": "captus_xpress_1",
              "catalogCode": [
                "V-TB37"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_xpress_1",
              "catalogCode": [
                "V-TB32"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 3,
              "timeEstimated": false,
              "requiresSampling": [
                "captus_xpress_1",
                "captus_xpress_2"
              ],
              "inDevice": true
            },
            {
              "productKey": "augmentis_xpress_1",
              "catalogCode": [
                "V-FL47"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 3,
              "timeEstimated": false,
              "requiresSampling": [
                "captus_xpress_1",
                "captus_xpress_2"
              ],
              "inDevice": true
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "magneus_6_bacteria",
              "catalogCode": [
                "V-MA19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_8_ultra",
              "catalogCode": [
                "V-EE03"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "elevia_2_9_salmonella_spp_and_enterobacteria",
          "catalogCode": "V-PAT06",
          "timeHours": 1.583333333,
          "timeEstimated": false
        }
      },
      "Egg Products": {
        "sampling": {
          "options": [
            {
              "productKey": "captus_zero_1",
              "catalogCode": [
                "V-TB36"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            },
            {
              "productKey": "captus_xpress_2",
              "catalogCode": [
                "V-FL48"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            },
            {
              "productKey": "captus_xpress_1",
              "catalogCode": [
                "V-TB37"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_xpress_1",
              "catalogCode": [
                "V-TB32"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 3,
              "timeEstimated": false,
              "requiresSampling": [
                "captus_xpress_1",
                "captus_xpress_2"
              ],
              "inDevice": true
            },
            {
              "productKey": "augmentis_xpress_1",
              "catalogCode": [
                "V-FL47"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 3,
              "timeEstimated": false,
              "requiresSampling": [
                "captus_xpress_1",
                "captus_xpress_2"
              ],
              "inDevice": true
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "magneus_6_bacteria",
              "catalogCode": [
                "V-MA19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_8_ultra",
              "catalogCode": [
                "V-EE03"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "elevia_2_9_salmonella_spp_and_enterobacteria",
          "catalogCode": "V-PAT06",
          "timeHours": 1.583333333,
          "timeEstimated": false
        }
      },
      "Fresh & Processed Produce": {
        "sampling": {
          "options": [
            {
              "productKey": "captus_zero_1",
              "catalogCode": [
                "V-TB36"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            },
            {
              "productKey": "captus_xpress_2",
              "catalogCode": [
                "V-FL48"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            },
            {
              "productKey": "captus_xpress_1",
              "catalogCode": [
                "V-TB37"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_xpress_1",
              "catalogCode": [
                "V-TB32"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 3,
              "timeEstimated": false,
              "requiresSampling": [
                "captus_xpress_1",
                "captus_xpress_2"
              ],
              "inDevice": true
            },
            {
              "productKey": "augmentis_xpress_1",
              "catalogCode": [
                "V-FL47"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 3,
              "timeEstimated": false,
              "requiresSampling": [
                "captus_xpress_1",
                "captus_xpress_2"
              ],
              "inDevice": true
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "magneus_6_bacteria",
              "catalogCode": [
                "V-MA19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_8_ultra",
              "catalogCode": [
                "V-EE03"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "elevia_2_9_salmonella_spp_and_enterobacteria",
          "catalogCode": "V-PAT06",
          "timeHours": 1.583333333,
          "timeEstimated": false
        }
      },
      "Meat and Poultry": {
        "sampling": {
          "options": [
            {
              "productKey": "captus_zero_1",
              "catalogCode": [
                "V-TB36"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            },
            {
              "productKey": "captus_xpress_2",
              "catalogCode": [
                "V-FL48"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            },
            {
              "productKey": "captus_xpress_1",
              "catalogCode": [
                "V-TB37"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_xpress_1",
              "catalogCode": [
                "V-TB32"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 3,
              "timeEstimated": false,
              "requiresSampling": [
                "captus_xpress_1",
                "captus_xpress_2"
              ],
              "inDevice": true
            },
            {
              "productKey": "augmentis_xpress_1",
              "catalogCode": [
                "V-FL47"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 3,
              "timeEstimated": false,
              "requiresSampling": [
                "captus_xpress_1",
                "captus_xpress_2"
              ],
              "inDevice": true
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "magneus_6_bacteria",
              "catalogCode": [
                "V-MA19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_8_ultra",
              "catalogCode": [
                "V-EE03"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "elevia_2_9_salmonella_spp_and_enterobacteria",
          "catalogCode": "V-PAT06",
          "timeHours": 1.583333333,
          "timeEstimated": false
        }
      },
      "Pet Food & Animal Feed": {
        "sampling": {
          "options": [
            {
              "productKey": "captus_zero_1",
              "catalogCode": [
                "V-TB36"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            },
            {
              "productKey": "captus_xpress_2",
              "catalogCode": [
                "V-FL48"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            },
            {
              "productKey": "captus_xpress_1",
              "catalogCode": [
                "V-TB37"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_xpress_1",
              "catalogCode": [
                "V-TB32"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 3,
              "timeEstimated": false,
              "requiresSampling": [
                "captus_xpress_1",
                "captus_xpress_2"
              ],
              "inDevice": true
            },
            {
              "productKey": "augmentis_xpress_1",
              "catalogCode": [
                "V-FL47"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 3,
              "timeEstimated": false,
              "requiresSampling": [
                "captus_xpress_1",
                "captus_xpress_2"
              ],
              "inDevice": true
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "magneus_6_bacteria",
              "catalogCode": [
                "V-MA19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_8_ultra",
              "catalogCode": [
                "V-EE03"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "elevia_2_9_salmonella_spp_and_enterobacteria",
          "catalogCode": "V-PAT06",
          "timeHours": 1.583333333,
          "timeEstimated": false
        }
      },
      "Ready-to-eat": {
        "sampling": {
          "options": [
            {
              "productKey": "captus_zero_1",
              "catalogCode": [
                "V-TB36"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            },
            {
              "productKey": "captus_xpress_2",
              "catalogCode": [
                "V-FL48"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            },
            {
              "productKey": "captus_xpress_1",
              "catalogCode": [
                "V-TB37"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_xpress_1",
              "catalogCode": [
                "V-TB32"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 3,
              "timeEstimated": false,
              "requiresSampling": [
                "captus_xpress_1",
                "captus_xpress_2"
              ],
              "inDevice": true
            },
            {
              "productKey": "augmentis_xpress_1",
              "catalogCode": [
                "V-FL47"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 3,
              "timeEstimated": false,
              "requiresSampling": [
                "captus_xpress_1",
                "captus_xpress_2"
              ],
              "inDevice": true
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "magneus_6_bacteria",
              "catalogCode": [
                "V-MA19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_8_ultra",
              "catalogCode": [
                "V-EE03"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "elevia_2_9_salmonella_spp_and_enterobacteria",
          "catalogCode": "V-PAT06",
          "timeHours": 1.583333333,
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
      "Spoilage_Bacteria"
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
      "Beer"
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
    "stagesByIndustry": {
      "Beverage": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_11_universal_bacteria",
              "catalogCode": [
                "V-FL11",
                "V-FP02"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_51_lactobacillus",
              "catalogCode": [
                "V-FP13"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_11_universal_bacteria",
              "catalogCode": [
                "V-FL11",
                "V-FP02"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_51_lactobacillus",
              "catalogCode": [
                "V-FL10",
                "V-FL32",
                "V-FP13"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "magneus_1_bacteria",
              "catalogCode": [
                "V-EQ40"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.666666667,
              "timeEstimated": false
            },
            {
              "productKey": "magneus_2_bacteria_yeast_molds",
              "catalogCode": [
                "V-MA10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_3_clean_q",
              "catalogCode": [
                "V-EQ18"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "magneus_1_bacteria",
              "catalogCode": [
                "V-EQ40"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.666666667,
              "timeEstimated": false
            },
            {
              "productKey": "magneus_2_bacteria_yeast_molds",
              "catalogCode": [
                "V-MA10"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_3_clean_q",
              "catalogCode": [
                "V-EQ18"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_00_1_bacteria",
          "catalogCode": "V-SF14",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Confectionery": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_11_universal_bacteria",
              "catalogCode": [
                "V-FL11",
                "V-FP02"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_51_lactobacillus",
              "catalogCode": [
                "V-FP13"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_11_universal_bacteria",
              "catalogCode": [
                "V-FL11",
                "V-FP02"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_51_lactobacillus",
              "catalogCode": [
                "V-FL10",
                "V-FL32",
                "V-FP13"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "magneus_1_bacteria",
              "catalogCode": [
                "V-EQ40"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.666666667,
              "timeEstimated": false
            },
            {
              "productKey": "magneus_2_bacteria_yeast_molds",
              "catalogCode": [
                "V-MA10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_3_clean_q",
              "catalogCode": [
                "V-EQ18"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "magneus_1_bacteria",
              "catalogCode": [
                "V-EQ40"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.666666667,
              "timeEstimated": false
            },
            {
              "productKey": "magneus_2_bacteria_yeast_molds",
              "catalogCode": [
                "V-MA10"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_3_clean_q",
              "catalogCode": [
                "V-EQ18"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_00_1_bacteria",
          "catalogCode": "V-SF14",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Dairy": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_11_universal_bacteria",
              "catalogCode": [
                "V-FL11",
                "V-FP02"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_51_lactobacillus",
              "catalogCode": [
                "V-FP13"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_11_universal_bacteria",
              "catalogCode": [
                "V-FL11",
                "V-FP02"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_51_lactobacillus",
              "catalogCode": [
                "V-FL10",
                "V-FL32",
                "V-FP13"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "magneus_1_bacteria",
              "catalogCode": [
                "V-EQ40"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.666666667,
              "timeEstimated": false
            },
            {
              "productKey": "magneus_2_bacteria_yeast_molds",
              "catalogCode": [
                "V-MA10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_3_clean_q",
              "catalogCode": [
                "V-EQ18"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "magneus_1_bacteria",
              "catalogCode": [
                "V-EQ40"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.666666667,
              "timeEstimated": false
            },
            {
              "productKey": "magneus_2_bacteria_yeast_molds",
              "catalogCode": [
                "V-MA10"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_3_clean_q",
              "catalogCode": [
                "V-EQ18"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_00_1_bacteria",
          "catalogCode": "V-SF14",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Fresh & Processed Produce": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_11_universal_bacteria",
              "catalogCode": [
                "V-FL11",
                "V-FP02"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_51_lactobacillus",
              "catalogCode": [
                "V-FP13"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_11_universal_bacteria",
              "catalogCode": [
                "V-FL11",
                "V-FP02"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_51_lactobacillus",
              "catalogCode": [
                "V-FL10",
                "V-FL32",
                "V-FP13"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "magneus_1_bacteria",
              "catalogCode": [
                "V-EQ40"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.666666667,
              "timeEstimated": false
            },
            {
              "productKey": "magneus_2_bacteria_yeast_molds",
              "catalogCode": [
                "V-MA10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_3_clean_q",
              "catalogCode": [
                "V-EQ18"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "magneus_1_bacteria",
              "catalogCode": [
                "V-EQ40"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.666666667,
              "timeEstimated": false
            },
            {
              "productKey": "magneus_2_bacteria_yeast_molds",
              "catalogCode": [
                "V-MA10"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_3_clean_q",
              "catalogCode": [
                "V-EQ18"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_00_1_bacteria",
          "catalogCode": "V-SF14",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Nutraceutical": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_11_universal_bacteria",
              "catalogCode": [
                "V-FL11",
                "V-FP02"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_51_lactobacillus",
              "catalogCode": [
                "V-FP13"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_11_universal_bacteria",
              "catalogCode": [
                "V-FL11",
                "V-FP02"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_51_lactobacillus",
              "catalogCode": [
                "V-FL10",
                "V-FL32",
                "V-FP13"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "magneus_1_bacteria",
              "catalogCode": [
                "V-EQ40"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.666666667,
              "timeEstimated": false
            },
            {
              "productKey": "magneus_2_bacteria_yeast_molds",
              "catalogCode": [
                "V-MA10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_3_clean_q",
              "catalogCode": [
                "V-EQ18"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "magneus_1_bacteria",
              "catalogCode": [
                "V-EQ40"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.666666667,
              "timeEstimated": false
            },
            {
              "productKey": "magneus_2_bacteria_yeast_molds",
              "catalogCode": [
                "V-MA10"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_3_clean_q",
              "catalogCode": [
                "V-EQ18"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_00_1_bacteria",
          "catalogCode": "V-SF14",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Pet Food & Animal Feed": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_11_universal_bacteria",
              "catalogCode": [
                "V-FL11",
                "V-FP02"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_51_lactobacillus",
              "catalogCode": [
                "V-FP13"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_11_universal_bacteria",
              "catalogCode": [
                "V-FL11",
                "V-FP02"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_51_lactobacillus",
              "catalogCode": [
                "V-FL10",
                "V-FL32",
                "V-FP13"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "magneus_1_bacteria",
              "catalogCode": [
                "V-EQ40"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.666666667,
              "timeEstimated": false
            },
            {
              "productKey": "magneus_2_bacteria_yeast_molds",
              "catalogCode": [
                "V-MA10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_3_clean_q",
              "catalogCode": [
                "V-EQ18"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "magneus_1_bacteria",
              "catalogCode": [
                "V-EQ40"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.666666667,
              "timeEstimated": false
            },
            {
              "productKey": "magneus_2_bacteria_yeast_molds",
              "catalogCode": [
                "V-MA10"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_3_clean_q",
              "catalogCode": [
                "V-EQ18"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_00_1_bacteria",
          "catalogCode": "V-SF14",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Pharmaceutical": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_11_universal_bacteria",
              "catalogCode": [
                "V-FL11",
                "V-FP02"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_51_lactobacillus",
              "catalogCode": [
                "V-FP13"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_11_universal_bacteria",
              "catalogCode": [
                "V-FL11",
                "V-FP02"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_51_lactobacillus",
              "catalogCode": [
                "V-FL10",
                "V-FL32",
                "V-FP13"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "magneus_1_bacteria",
              "catalogCode": [
                "V-EQ40"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.666666667,
              "timeEstimated": false
            },
            {
              "productKey": "magneus_2_bacteria_yeast_molds",
              "catalogCode": [
                "V-MA10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_3_clean_q",
              "catalogCode": [
                "V-EQ18"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "magneus_1_bacteria",
              "catalogCode": [
                "V-EQ40"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.666666667,
              "timeEstimated": false
            },
            {
              "productKey": "magneus_2_bacteria_yeast_molds",
              "catalogCode": [
                "V-MA10"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_3_clean_q",
              "catalogCode": [
                "V-EQ18"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_00_1_bacteria",
          "catalogCode": "V-SF14",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Ready-to-eat": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_11_universal_bacteria",
              "catalogCode": [
                "V-FL11",
                "V-FP02"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_51_lactobacillus",
              "catalogCode": [
                "V-FP13"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_11_universal_bacteria",
              "catalogCode": [
                "V-FL11",
                "V-FP02"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_51_lactobacillus",
              "catalogCode": [
                "V-FL10",
                "V-FL32",
                "V-FP13"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "magneus_1_bacteria",
              "catalogCode": [
                "V-EQ40"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.666666667,
              "timeEstimated": false
            },
            {
              "productKey": "magneus_2_bacteria_yeast_molds",
              "catalogCode": [
                "V-MA10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_3_clean_q",
              "catalogCode": [
                "V-EQ18"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "magneus_1_bacteria",
              "catalogCode": [
                "V-EQ40"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.666666667,
              "timeEstimated": false
            },
            {
              "productKey": "magneus_2_bacteria_yeast_molds",
              "catalogCode": [
                "V-MA10"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_3_clean_q",
              "catalogCode": [
                "V-EQ18"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_00_1_bacteria",
          "catalogCode": "V-SF14",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Sauces and condiments": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_11_universal_bacteria",
              "catalogCode": [
                "V-FL11",
                "V-FP02"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_51_lactobacillus",
              "catalogCode": [
                "V-FP13"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_11_universal_bacteria",
              "catalogCode": [
                "V-FL11",
                "V-FP02"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_51_lactobacillus",
              "catalogCode": [
                "V-FL10",
                "V-FL32",
                "V-FP13"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "magneus_1_bacteria",
              "catalogCode": [
                "V-EQ40"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.666666667,
              "timeEstimated": false
            },
            {
              "productKey": "magneus_2_bacteria_yeast_molds",
              "catalogCode": [
                "V-MA10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_3_clean_q",
              "catalogCode": [
                "V-EQ18"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "magneus_1_bacteria",
              "catalogCode": [
                "V-EQ40"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.666666667,
              "timeEstimated": false
            },
            {
              "productKey": "magneus_2_bacteria_yeast_molds",
              "catalogCode": [
                "V-MA10"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_3_clean_q",
              "catalogCode": [
                "V-EQ18"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_00_1_bacteria",
          "catalogCode": "V-SF14",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Sterile products": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_11_universal_bacteria",
              "catalogCode": [
                "V-FL11",
                "V-FP02"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_51_lactobacillus",
              "catalogCode": [
                "V-FP13"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_11_universal_bacteria",
              "catalogCode": [
                "V-FL11",
                "V-FP02"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_51_lactobacillus",
              "catalogCode": [
                "V-FL10",
                "V-FL32",
                "V-FP13"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "magneus_1_bacteria",
              "catalogCode": [
                "V-EQ40"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.666666667,
              "timeEstimated": false
            },
            {
              "productKey": "magneus_2_bacteria_yeast_molds",
              "catalogCode": [
                "V-MA10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_3_clean_q",
              "catalogCode": [
                "V-EQ18"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "magneus_1_bacteria",
              "catalogCode": [
                "V-EQ40"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.666666667,
              "timeEstimated": false
            },
            {
              "productKey": "magneus_2_bacteria_yeast_molds",
              "catalogCode": [
                "V-MA10"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_3_clean_q",
              "catalogCode": [
                "V-EQ18"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_00_1_bacteria",
          "catalogCode": "V-SF14",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Beer": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_11_universal_bacteria",
              "catalogCode": [
                "V-FP02",
                "V-FL11"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_51_lactobacillus",
              "catalogCode": [
                "V-FP13"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "magneus_1_bacteria",
              "catalogCode": [
                "V-EQ40"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.666666667,
              "timeEstimated": false
            },
            {
              "productKey": "magneus_2_bacteria_yeast_molds",
              "catalogCode": [
                "V-MA10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_3_clean_q",
              "catalogCode": [
                "V-EQ18"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_00_1_bacteria",
          "catalogCode": "V-SF14",
          "timeHours": 2,
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
      "Yeasts_and_molds"
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
    "stagesByIndustry": {
      "Beverage": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_21_yeast_molds",
              "catalogCode": [
                "V-FL12",
                "V-FP18"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 48,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_21_yeast_molds",
              "catalogCode": [
                "V-FL12",
                "V-FP18"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 48,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "magneus_2_bacteria_yeast_molds",
              "catalogCode": [
                "V-MA10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_3_clean_q",
              "catalogCode": [
                "V-EQ18"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "magneus_2_bacteria_yeast_molds",
              "catalogCode": [
                "V-MA10"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_3_clean_q",
              "catalogCode": [
                "V-EQ18"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_00_2_yeast_molds",
          "catalogCode": "V-SF15",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Confectionery": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_21_yeast_molds",
              "catalogCode": [
                "V-FL12",
                "V-FP18"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 48,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_21_yeast_molds",
              "catalogCode": [
                "V-FL12",
                "V-FP18"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 48,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "magneus_2_bacteria_yeast_molds",
              "catalogCode": [
                "V-MA10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_3_clean_q",
              "catalogCode": [
                "V-EQ18"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "magneus_2_bacteria_yeast_molds",
              "catalogCode": [
                "V-MA10"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_3_clean_q",
              "catalogCode": [
                "V-EQ18"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_00_2_yeast_molds",
          "catalogCode": "V-SF15",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Dairy": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_21_yeast_molds",
              "catalogCode": [
                "V-FL12",
                "V-FP18"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 48,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_21_yeast_molds",
              "catalogCode": [
                "V-FL12",
                "V-FP18"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 48,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "magneus_2_bacteria_yeast_molds",
              "catalogCode": [
                "V-MA10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_3_clean_q",
              "catalogCode": [
                "V-EQ18"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "magneus_2_bacteria_yeast_molds",
              "catalogCode": [
                "V-MA10"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_3_clean_q",
              "catalogCode": [
                "V-EQ18"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_00_2_yeast_molds",
          "catalogCode": "V-SF15",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Nutraceutical": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_21_yeast_molds",
              "catalogCode": [
                "V-FL12",
                "V-FP18"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 48,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_21_yeast_molds",
              "catalogCode": [
                "V-FL12",
                "V-FP18"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 48,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "magneus_2_bacteria_yeast_molds",
              "catalogCode": [
                "V-MA10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_3_clean_q",
              "catalogCode": [
                "V-EQ18"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "magneus_2_bacteria_yeast_molds",
              "catalogCode": [
                "V-MA10"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_3_clean_q",
              "catalogCode": [
                "V-EQ18"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_00_2_yeast_molds",
          "catalogCode": "V-SF15",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Pet Food & Animal Feed": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_21_yeast_molds",
              "catalogCode": [
                "V-FL12",
                "V-FP18"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 48,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_21_yeast_molds",
              "catalogCode": [
                "V-FL12",
                "V-FP18"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 48,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "magneus_2_bacteria_yeast_molds",
              "catalogCode": [
                "V-MA10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_3_clean_q",
              "catalogCode": [
                "V-EQ18"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "magneus_2_bacteria_yeast_molds",
              "catalogCode": [
                "V-MA10"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_3_clean_q",
              "catalogCode": [
                "V-EQ18"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_00_2_yeast_molds",
          "catalogCode": "V-SF15",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Pharmaceutical": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_21_yeast_molds",
              "catalogCode": [
                "V-FL12",
                "V-FP18"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 48,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_21_yeast_molds",
              "catalogCode": [
                "V-FL12",
                "V-FP18"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 48,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "magneus_2_bacteria_yeast_molds",
              "catalogCode": [
                "V-MA10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_3_clean_q",
              "catalogCode": [
                "V-EQ18"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "magneus_2_bacteria_yeast_molds",
              "catalogCode": [
                "V-MA10"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_3_clean_q",
              "catalogCode": [
                "V-EQ18"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_00_2_yeast_molds",
          "catalogCode": "V-SF15",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Ready-to-eat": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_21_yeast_molds",
              "catalogCode": [
                "V-FL12",
                "V-FP18"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 48,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_21_yeast_molds",
              "catalogCode": [
                "V-FL12",
                "V-FP18"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 48,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "magneus_2_bacteria_yeast_molds",
              "catalogCode": [
                "V-MA10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_3_clean_q",
              "catalogCode": [
                "V-EQ18"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "magneus_2_bacteria_yeast_molds",
              "catalogCode": [
                "V-MA10"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_3_clean_q",
              "catalogCode": [
                "V-EQ18"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_00_2_yeast_molds",
          "catalogCode": "V-SF15",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Sauces and condiments": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_21_yeast_molds",
              "catalogCode": [
                "V-FL12",
                "V-FP18"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 48,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_21_yeast_molds",
              "catalogCode": [
                "V-FL12",
                "V-FP18"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 48,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "magneus_2_bacteria_yeast_molds",
              "catalogCode": [
                "V-MA10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_3_clean_q",
              "catalogCode": [
                "V-EQ18"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "magneus_2_bacteria_yeast_molds",
              "catalogCode": [
                "V-MA10"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_3_clean_q",
              "catalogCode": [
                "V-EQ18"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_00_2_yeast_molds",
          "catalogCode": "V-SF15",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Beer": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_21_yeast_molds",
              "catalogCode": [
                "V-FL12",
                "V-FP18"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 48,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "magneus_2_bacteria_yeast_molds",
              "catalogCode": [
                "V-MA10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_3_clean_q",
              "catalogCode": [
                "V-EQ18"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_00_2_yeast_molds",
          "catalogCode": "V-SF15",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Wine": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_21_yeast_molds",
              "catalogCode": [
                "V-FL12",
                "V-FP18"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 48,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "magneus_2_bacteria_yeast_molds",
              "catalogCode": [
                "V-MA10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_3_clean_q",
              "catalogCode": [
                "V-EQ18"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_00_2_yeast_molds",
          "catalogCode": "V-SF15",
          "timeHours": 2,
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
      "Salmonella_spp."
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
    "stagesByIndustry": {
      "Confectionery": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "catalogCode": [
                "V-FP27"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_41_universal_pathogens",
              "catalogCode": [
                "V-FP09",
                "V-FP19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "catalogCode": [
                "V-FL46",
                "V-FP27"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_41_universal_pathogens",
              "catalogCode": [
                "V-FP09",
                "V-FP19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_1_1_salmonella_spp",
          "catalogCode": "V-SF31",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Egg Products": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "catalogCode": [
                "V-FP27"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_41_universal_pathogens",
              "catalogCode": [
                "V-FP09",
                "V-FP19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "catalogCode": [
                "V-FL46",
                "V-FP27"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_41_universal_pathogens",
              "catalogCode": [
                "V-FP09",
                "V-FP19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_1_1_salmonella_spp",
          "catalogCode": "V-SF31",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Meat and Poultry": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "catalogCode": [
                "V-FP27"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_41_universal_pathogens",
              "catalogCode": [
                "V-FP09",
                "V-FP19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "catalogCode": [
                "V-FL46",
                "V-FP27"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_41_universal_pathogens",
              "catalogCode": [
                "V-FP09",
                "V-FP19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_1_1_salmonella_spp",
          "catalogCode": "V-SF31",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Pet Food & Animal Feed": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "catalogCode": [
                "V-FP27"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_41_universal_pathogens",
              "catalogCode": [
                "V-FP09",
                "V-FP19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "catalogCode": [
                "V-FL46",
                "V-FP27"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_41_universal_pathogens",
              "catalogCode": [
                "V-FP09",
                "V-FP19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_1_1_salmonella_spp",
          "catalogCode": "V-SF31",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Ready-to-eat": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "catalogCode": [
                "V-FP27"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_41_universal_pathogens",
              "catalogCode": [
                "V-FP09",
                "V-FP19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "catalogCode": [
                "V-FL46",
                "V-FP27"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_41_universal_pathogens",
              "catalogCode": [
                "V-FP09",
                "V-FP19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_1_1_salmonella_spp",
          "catalogCode": "V-SF31",
          "timeHours": 2,
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
      "Staphylococcus_aureus"
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
    "stagesByIndustry": {
      "Dairy": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_41_universal_pathogens",
              "catalogCode": [
                "V-FP09",
                "V-FP19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_41_universal_pathogens",
              "catalogCode": [
                "V-FP09",
                "V-FP19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_1_2_s_aureus",
          "catalogCode": "V-SF39",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Egg Products": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_41_universal_pathogens",
              "catalogCode": [
                "V-FP09",
                "V-FP19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_41_universal_pathogens",
              "catalogCode": [
                "V-FP09",
                "V-FP19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_1_2_s_aureus",
          "catalogCode": "V-SF39",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Meat and Poultry": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_41_universal_pathogens",
              "catalogCode": [
                "V-FP09",
                "V-FP19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_41_universal_pathogens",
              "catalogCode": [
                "V-FP09",
                "V-FP19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_1_2_s_aureus",
          "catalogCode": "V-SF39",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Ready-to-eat": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_41_universal_pathogens",
              "catalogCode": [
                "V-FP09",
                "V-FP19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_41_universal_pathogens",
              "catalogCode": [
                "V-FP09",
                "V-FP19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_1_2_s_aureus",
          "catalogCode": "V-SF39",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Seafood": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_41_universal_pathogens",
              "catalogCode": [
                "V-FP09",
                "V-FP19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_41_universal_pathogens",
              "catalogCode": [
                "V-FP09",
                "V-FP19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_1_2_s_aureus",
          "catalogCode": "V-SF39",
          "timeHours": 2,
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
      "Escherichia_coli"
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
    "stagesByIndustry": {
      "Confectionery": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "catalogCode": [
                "V-FP27"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_41_universal_pathogens",
              "catalogCode": [
                "V-FP09",
                "V-FP19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "catalogCode": [
                "V-FL46",
                "V-FP27"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_41_universal_pathogens",
              "catalogCode": [
                "V-FP09",
                "V-FP19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_1_3_e_coli",
          "catalogCode": "V-SF167",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Fresh & Processed Produce": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "catalogCode": [
                "V-FP27"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_41_universal_pathogens",
              "catalogCode": [
                "V-FP09",
                "V-FP19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "catalogCode": [
                "V-FL46",
                "V-FP27"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_41_universal_pathogens",
              "catalogCode": [
                "V-FP09",
                "V-FP19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_1_3_e_coli",
          "catalogCode": "V-SF167",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Meat and Poultry": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "catalogCode": [
                "V-FP27"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_41_universal_pathogens",
              "catalogCode": [
                "V-FP09",
                "V-FP19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "catalogCode": [
                "V-FL46",
                "V-FP27"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_41_universal_pathogens",
              "catalogCode": [
                "V-FP09",
                "V-FP19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_1_3_e_coli",
          "catalogCode": "V-SF167",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Ready-to-eat": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "catalogCode": [
                "V-FP27"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_41_universal_pathogens",
              "catalogCode": [
                "V-FP09",
                "V-FP19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "catalogCode": [
                "V-FL46",
                "V-FP27"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_41_universal_pathogens",
              "catalogCode": [
                "V-FP09",
                "V-FP19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_1_3_e_coli",
          "catalogCode": "V-SF167",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Seafood": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "catalogCode": [
                "V-FP27"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_41_universal_pathogens",
              "catalogCode": [
                "V-FP09",
                "V-FP19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "catalogCode": [
                "V-FL46",
                "V-FP27"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_41_universal_pathogens",
              "catalogCode": [
                "V-FP09",
                "V-FP19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_1_3_e_coli",
          "catalogCode": "V-SF167",
          "timeHours": 2,
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
      "Listeria_monocytogenes"
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
    "stagesByIndustry": {
      "Dairy": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FL23",
                "V-FL40",
                "V-FP26"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_3_listeria_monocytogenes",
              "catalogCode": [
                "V-FP32",
                "V-FP33"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": [
            {
              "productKey": "potentia_2_listeria",
              "catalogCode": [
                "V-PET05"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true
            }
          ]
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_1_4_l_monocytogenes",
          "catalogCode": "V-SF28",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Fresh & Processed Produce": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FL23",
                "V-FL40",
                "V-FP26"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_3_listeria_monocytogenes",
              "catalogCode": [
                "V-FP32",
                "V-FP33"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": [
            {
              "productKey": "potentia_2_listeria",
              "catalogCode": [
                "V-PET05"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true
            }
          ]
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_1_4_l_monocytogenes",
          "catalogCode": "V-SF28",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Meat and Poultry": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FL23",
                "V-FL40",
                "V-FP26"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_3_listeria_monocytogenes",
              "catalogCode": [
                "V-FP32",
                "V-FP33"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": [
            {
              "productKey": "potentia_2_listeria",
              "catalogCode": [
                "V-PET05"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true
            }
          ]
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_1_4_l_monocytogenes",
          "catalogCode": "V-SF28",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Ready-to-eat": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FL23",
                "V-FL40",
                "V-FP26"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_3_listeria_monocytogenes",
              "catalogCode": [
                "V-FP32",
                "V-FP33"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": [
            {
              "productKey": "potentia_2_listeria",
              "catalogCode": [
                "V-PET05"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true
            }
          ]
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_1_4_l_monocytogenes",
          "catalogCode": "V-SF28",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Seafood": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FL23",
                "V-FL40",
                "V-FP26"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_3_listeria_monocytogenes",
              "catalogCode": [
                "V-FP32",
                "V-FP33"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": [
            {
              "productKey": "potentia_2_listeria",
              "catalogCode": [
                "V-PET05"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true
            }
          ]
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_1_4_l_monocytogenes",
          "catalogCode": "V-SF28",
          "timeHours": 2,
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
      "Zygosaccharomyces_bailii",
      "Zygosaccharomyces_parabailii"
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
    "stagesByIndustry": {
      "Beverage": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_21_yeast_molds",
              "catalogCode": [
                "V-FP18"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 48,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_21_yeast_molds",
              "catalogCode": [
                "V-FP18"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 48,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_3_clean_q",
              "catalogCode": [
                "V-EQ18"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_3_clean_q",
              "catalogCode": [
                "V-EQ18"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_1_7_zygosaccharomyces_bailii_and_parabailii",
          "catalogCode": "V-SF45",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Sauces and condiments": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_21_yeast_molds",
              "catalogCode": [
                "V-FP18"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 48,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_21_yeast_molds",
              "catalogCode": [
                "V-FP18"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 48,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_3_clean_q",
              "catalogCode": [
                "V-EQ18"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_3_clean_q",
              "catalogCode": [
                "V-EQ18"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_1_7_zygosaccharomyces_bailii_and_parabailii",
          "catalogCode": "V-SF45",
          "timeHours": 2,
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
      "Listeria_spp."
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
    "stagesByIndustry": {
      "Dairy": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FL23",
                "V-FL40",
                "V-FP26"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_1_8_listeria_spp",
          "catalogCode": "V-SF52",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Fresh & Processed Produce": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FL23",
                "V-FL40",
                "V-FP26"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_1_8_listeria_spp",
          "catalogCode": "V-SF52",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Meat and Poultry": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FL23",
                "V-FL40",
                "V-FP26"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_1_8_listeria_spp",
          "catalogCode": "V-SF52",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Ready-to-eat": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FL23",
                "V-FL40",
                "V-FP26"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_1_8_listeria_spp",
          "catalogCode": "V-SF52",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Seafood": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FL23",
                "V-FL40",
                "V-FP26"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_1_8_listeria_spp",
          "catalogCode": "V-SF52",
          "timeHours": 2,
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
      "Staphylococcus_aureus",
      "Escherichia_coli"
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
    "stagesByIndustry": {
      "Dairy": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL45",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL06",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_2_2_s_aureus_and_e_coli",
          "catalogCode": "V-SF07",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Meat and Poultry": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL45",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL06",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_2_2_s_aureus_and_e_coli",
          "catalogCode": "V-SF07",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Ready-to-eat": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL45",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL06",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_2_2_s_aureus_and_e_coli",
          "catalogCode": "V-SF07",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Seafood": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL45",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL06",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_2_2_s_aureus_and_e_coli",
          "catalogCode": "V-SF07",
          "timeHours": 2,
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
      "Listeria_spp.",
      "Listeria_monocytogenes"
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
    "stagesByIndustry": {
      "Dairy": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FL23",
                "V-FL40",
                "V-FP26"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_2_3_listeria_spp_and_l_monocytogenes",
          "catalogCode": "V-SF04",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Fresh & Processed Produce": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FL23",
                "V-FL40",
                "V-FP26"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_2_3_listeria_spp_and_l_monocytogenes",
          "catalogCode": "V-SF04",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Meat and Poultry": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FL23",
                "V-FL40",
                "V-FP26"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_2_3_listeria_spp_and_l_monocytogenes",
          "catalogCode": "V-SF04",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Ready-to-eat": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FL23",
                "V-FL40",
                "V-FP26"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_2_3_listeria_spp_and_l_monocytogenes",
          "catalogCode": "V-SF04",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Seafood": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FL23",
                "V-FL40",
                "V-FP26"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_2_3_listeria_spp_and_l_monocytogenes",
          "catalogCode": "V-SF04",
          "timeHours": 2,
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
      "Escherichia_coli",
      "Escherichia_coli_O157_H7"
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
    "stagesByIndustry": {
      "Fresh & Processed Produce": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "catalogCode": [
                "V-FP27"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL06",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "catalogCode": [
                "V-FP27",
                "V-FL46"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL45",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_2_4_e_coli_and_e_coli_o157_h7",
          "catalogCode": "V-SF05",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Meat and Poultry": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "catalogCode": [
                "V-FP27"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL06",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "catalogCode": [
                "V-FP27",
                "V-FL46"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL45",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_2_4_e_coli_and_e_coli_o157_h7",
          "catalogCode": "V-SF05",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Ready-to-eat": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "catalogCode": [
                "V-FP27"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL06",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "catalogCode": [
                "V-FP27",
                "V-FL46"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL45",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_2_4_e_coli_and_e_coli_o157_h7",
          "catalogCode": "V-SF05",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Seafood": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "catalogCode": [
                "V-FP27"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL06",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "catalogCode": [
                "V-FP27",
                "V-FL46"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL45",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_2_4_e_coli_and_e_coli_o157_h7",
          "catalogCode": "V-SF05",
          "timeHours": 2,
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
      "Salmonella_spp.",
      "Listeria_monocytogenes"
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
    "stagesByIndustry": {
      "Confectionery": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_41_universal_pathogens",
              "catalogCode": [
                "V-FP09",
                "V-FP19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_41_universal_pathogens",
              "catalogCode": [
                "V-FP09",
                "V-FP19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_2_5_salmonella_spp_and_l_monocytogenes",
          "catalogCode": "V-SF29",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Egg Products": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_41_universal_pathogens",
              "catalogCode": [
                "V-FP09",
                "V-FP19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_41_universal_pathogens",
              "catalogCode": [
                "V-FP09",
                "V-FP19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_2_5_salmonella_spp_and_l_monocytogenes",
          "catalogCode": "V-SF29",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Meat and Poultry": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_41_universal_pathogens",
              "catalogCode": [
                "V-FP09",
                "V-FP19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_41_universal_pathogens",
              "catalogCode": [
                "V-FP09",
                "V-FP19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_2_5_salmonella_spp_and_l_monocytogenes",
          "catalogCode": "V-SF29",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Pet Food & Animal Feed": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_41_universal_pathogens",
              "catalogCode": [
                "V-FP09",
                "V-FP19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_41_universal_pathogens",
              "catalogCode": [
                "V-FP09",
                "V-FP19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_2_5_salmonella_spp_and_l_monocytogenes",
          "catalogCode": "V-SF29",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Ready-to-eat": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_41_universal_pathogens",
              "catalogCode": [
                "V-FP09",
                "V-FP19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_41_universal_pathogens",
              "catalogCode": [
                "V-FP09",
                "V-FP19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_2_5_salmonella_spp_and_l_monocytogenes",
          "catalogCode": "V-SF29",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Seafood": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_41_universal_pathogens",
              "catalogCode": [
                "V-FP09",
                "V-FP19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_41_universal_pathogens",
              "catalogCode": [
                "V-FP09",
                "V-FP19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_2_5_salmonella_spp_and_l_monocytogenes",
          "catalogCode": "V-SF29",
          "timeHours": 2,
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
      "Salmonella_spp.",
      "Listeria_monocytogenes",
      "Escherichia_coli_O157_H7"
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
    "stagesByIndustry": {
      "Confectionery": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "catalogCode": [
                "V-FL18",
                "V-FP08"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL06",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ],
          "groups": [
            {
              "id": "env-surf",
              "sampleType": "Environmental",
              "mode": "alternative",
              "productKeys": [
                "augmentis_31_universal_surfaces"
              ]
            },
            {
              "id": "fin-par",
              "sampleType": "Finished",
              "mode": "parallel",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_91_bpw"
              ]
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_3_2_salmonella_spp_l_monocytogenes_and_e_coli_o157_h7",
          "catalogCode": "V-SF56",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Dairy": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "catalogCode": [
                "V-FL18",
                "V-FP08"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL06",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ],
          "groups": [
            {
              "id": "env-surf",
              "sampleType": "Environmental",
              "mode": "alternative",
              "productKeys": [
                "augmentis_31_universal_surfaces"
              ]
            },
            {
              "id": "fin-par",
              "sampleType": "Finished",
              "mode": "parallel",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_91_bpw"
              ]
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_3_2_salmonella_spp_l_monocytogenes_and_e_coli_o157_h7",
          "catalogCode": "V-SF56",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Egg Products": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "catalogCode": [
                "V-FL18",
                "V-FP08"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL06",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ],
          "groups": [
            {
              "id": "env-surf",
              "sampleType": "Environmental",
              "mode": "alternative",
              "productKeys": [
                "augmentis_31_universal_surfaces"
              ]
            },
            {
              "id": "fin-par",
              "sampleType": "Finished",
              "mode": "parallel",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_91_bpw"
              ]
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_3_2_salmonella_spp_l_monocytogenes_and_e_coli_o157_h7",
          "catalogCode": "V-SF56",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Fresh & Processed Produce": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "catalogCode": [
                "V-FL18",
                "V-FP08"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL06",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ],
          "groups": [
            {
              "id": "env-surf",
              "sampleType": "Environmental",
              "mode": "alternative",
              "productKeys": [
                "augmentis_31_universal_surfaces"
              ]
            },
            {
              "id": "fin-par",
              "sampleType": "Finished",
              "mode": "parallel",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_91_bpw"
              ]
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_3_2_salmonella_spp_l_monocytogenes_and_e_coli_o157_h7",
          "catalogCode": "V-SF56",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Meat and Poultry": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "catalogCode": [
                "V-FL18",
                "V-FP08"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL06",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ],
          "groups": [
            {
              "id": "env-surf",
              "sampleType": "Environmental",
              "mode": "alternative",
              "productKeys": [
                "augmentis_31_universal_surfaces"
              ]
            },
            {
              "id": "fin-par",
              "sampleType": "Finished",
              "mode": "parallel",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_91_bpw"
              ]
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_3_2_salmonella_spp_l_monocytogenes_and_e_coli_o157_h7",
          "catalogCode": "V-SF56",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Pet Food & Animal Feed": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "catalogCode": [
                "V-FL18",
                "V-FP08"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL06",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ],
          "groups": [
            {
              "id": "env-surf",
              "sampleType": "Environmental",
              "mode": "alternative",
              "productKeys": [
                "augmentis_31_universal_surfaces"
              ]
            },
            {
              "id": "fin-par",
              "sampleType": "Finished",
              "mode": "parallel",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_91_bpw"
              ]
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_3_2_salmonella_spp_l_monocytogenes_and_e_coli_o157_h7",
          "catalogCode": "V-SF56",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Ready-to-eat": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "catalogCode": [
                "V-FL18",
                "V-FP08"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL06",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ],
          "groups": [
            {
              "id": "env-surf",
              "sampleType": "Environmental",
              "mode": "alternative",
              "productKeys": [
                "augmentis_31_universal_surfaces"
              ]
            },
            {
              "id": "fin-par",
              "sampleType": "Finished",
              "mode": "parallel",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_91_bpw"
              ]
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_3_2_salmonella_spp_l_monocytogenes_and_e_coli_o157_h7",
          "catalogCode": "V-SF56",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Seafood": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "catalogCode": [
                "V-FL18",
                "V-FP08"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL06",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ],
          "groups": [
            {
              "id": "env-surf",
              "sampleType": "Environmental",
              "mode": "alternative",
              "productKeys": [
                "augmentis_31_universal_surfaces"
              ]
            },
            {
              "id": "fin-par",
              "sampleType": "Finished",
              "mode": "parallel",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_91_bpw"
              ]
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_3_2_salmonella_spp_l_monocytogenes_and_e_coli_o157_h7",
          "catalogCode": "V-SF56",
          "timeHours": 2,
          "timeEstimated": false
        }
      }
    }
  },
  {
    "id": "V-SF42",
    "name": "Specio 4.1 Salmonella spp., L. monocytogenes, E. coli and S. aureus",
    "productLine": "Specio",
    "catalogCode": "V-SF42",
    "productKey": "specio_4_1_salmonella_spp_l_monocytogenes_e_coli_and_s_aureus",
    "targets": [
      "Salmonella_spp.",
      "Staphylococcus_aureus",
      "Escherichia_coli",
      "Listeria_monocytogenes"
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
    "stagesByIndustry": {
      "Confectionery": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "catalogCode": [
                "V-FL18",
                "V-FP08"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_3_listeria_monocytogenes",
              "catalogCode": [
                "V-FP32",
                "V-FP33"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL45",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ],
          "groups": [
            {
              "id": "env-surf",
              "sampleType": "Environmental",
              "mode": "alternative",
              "productKeys": [
                "augmentis_31_universal_surfaces"
              ]
            },
            {
              "id": "fin-bpw",
              "sampleType": "Finished",
              "mode": "parallel",
              "productKeys": [
                "augmentis_91_bpw"
              ]
            },
            {
              "id": "fin-list",
              "sampleType": "Finished",
              "mode": "alternative",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_3_listeria_monocytogenes"
              ]
            }
          ]
        },
        "mediumSupplement": {
          "options": [
            {
              "productKey": "potentia_2_listeria",
              "catalogCode": [
                "V-PET05"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true
            }
          ]
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_4_1_salmonella_spp_l_monocytogenes_e_coli_and_s_aureus",
          "catalogCode": "V-SF42",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Dairy": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "catalogCode": [
                "V-FL18",
                "V-FP08"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_3_listeria_monocytogenes",
              "catalogCode": [
                "V-FP32",
                "V-FP33"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL45",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ],
          "groups": [
            {
              "id": "env-surf",
              "sampleType": "Environmental",
              "mode": "alternative",
              "productKeys": [
                "augmentis_31_universal_surfaces"
              ]
            },
            {
              "id": "fin-bpw",
              "sampleType": "Finished",
              "mode": "parallel",
              "productKeys": [
                "augmentis_91_bpw"
              ]
            },
            {
              "id": "fin-list",
              "sampleType": "Finished",
              "mode": "alternative",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_3_listeria_monocytogenes"
              ]
            }
          ]
        },
        "mediumSupplement": {
          "options": [
            {
              "productKey": "potentia_2_listeria",
              "catalogCode": [
                "V-PET05"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true
            }
          ]
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_4_1_salmonella_spp_l_monocytogenes_e_coli_and_s_aureus",
          "catalogCode": "V-SF42",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Egg Products": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "catalogCode": [
                "V-FL18",
                "V-FP08"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_3_listeria_monocytogenes",
              "catalogCode": [
                "V-FP32",
                "V-FP33"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL45",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ],
          "groups": [
            {
              "id": "env-surf",
              "sampleType": "Environmental",
              "mode": "alternative",
              "productKeys": [
                "augmentis_31_universal_surfaces"
              ]
            },
            {
              "id": "fin-bpw",
              "sampleType": "Finished",
              "mode": "parallel",
              "productKeys": [
                "augmentis_91_bpw"
              ]
            },
            {
              "id": "fin-list",
              "sampleType": "Finished",
              "mode": "alternative",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_3_listeria_monocytogenes"
              ]
            }
          ]
        },
        "mediumSupplement": {
          "options": [
            {
              "productKey": "potentia_2_listeria",
              "catalogCode": [
                "V-PET05"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true
            }
          ]
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_4_1_salmonella_spp_l_monocytogenes_e_coli_and_s_aureus",
          "catalogCode": "V-SF42",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Fresh & Processed Produce": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "catalogCode": [
                "V-FL18",
                "V-FP08"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_3_listeria_monocytogenes",
              "catalogCode": [
                "V-FP32",
                "V-FP33"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL45",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ],
          "groups": [
            {
              "id": "env-surf",
              "sampleType": "Environmental",
              "mode": "alternative",
              "productKeys": [
                "augmentis_31_universal_surfaces"
              ]
            },
            {
              "id": "fin-bpw",
              "sampleType": "Finished",
              "mode": "parallel",
              "productKeys": [
                "augmentis_91_bpw"
              ]
            },
            {
              "id": "fin-list",
              "sampleType": "Finished",
              "mode": "alternative",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_3_listeria_monocytogenes"
              ]
            }
          ]
        },
        "mediumSupplement": {
          "options": [
            {
              "productKey": "potentia_2_listeria",
              "catalogCode": [
                "V-PET05"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true
            }
          ]
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_4_1_salmonella_spp_l_monocytogenes_e_coli_and_s_aureus",
          "catalogCode": "V-SF42",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Meat and Poultry": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "catalogCode": [
                "V-FL18",
                "V-FP08"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_3_listeria_monocytogenes",
              "catalogCode": [
                "V-FP32",
                "V-FP33"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL45",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ],
          "groups": [
            {
              "id": "env-surf",
              "sampleType": "Environmental",
              "mode": "alternative",
              "productKeys": [
                "augmentis_31_universal_surfaces"
              ]
            },
            {
              "id": "fin-bpw",
              "sampleType": "Finished",
              "mode": "parallel",
              "productKeys": [
                "augmentis_91_bpw"
              ]
            },
            {
              "id": "fin-list",
              "sampleType": "Finished",
              "mode": "alternative",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_3_listeria_monocytogenes"
              ]
            }
          ]
        },
        "mediumSupplement": {
          "options": [
            {
              "productKey": "potentia_2_listeria",
              "catalogCode": [
                "V-PET05"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true
            }
          ]
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_4_1_salmonella_spp_l_monocytogenes_e_coli_and_s_aureus",
          "catalogCode": "V-SF42",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Pet Food & Animal Feed": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "catalogCode": [
                "V-FL18",
                "V-FP08"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_3_listeria_monocytogenes",
              "catalogCode": [
                "V-FP32",
                "V-FP33"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL45",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ],
          "groups": [
            {
              "id": "env-surf",
              "sampleType": "Environmental",
              "mode": "alternative",
              "productKeys": [
                "augmentis_31_universal_surfaces"
              ]
            },
            {
              "id": "fin-bpw",
              "sampleType": "Finished",
              "mode": "parallel",
              "productKeys": [
                "augmentis_91_bpw"
              ]
            },
            {
              "id": "fin-list",
              "sampleType": "Finished",
              "mode": "alternative",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_3_listeria_monocytogenes"
              ]
            }
          ]
        },
        "mediumSupplement": {
          "options": [
            {
              "productKey": "potentia_2_listeria",
              "catalogCode": [
                "V-PET05"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true
            }
          ]
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_4_1_salmonella_spp_l_monocytogenes_e_coli_and_s_aureus",
          "catalogCode": "V-SF42",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Ready-to-eat": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "catalogCode": [
                "V-FL18",
                "V-FP08"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_3_listeria_monocytogenes",
              "catalogCode": [
                "V-FP32",
                "V-FP33"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL45",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ],
          "groups": [
            {
              "id": "env-surf",
              "sampleType": "Environmental",
              "mode": "alternative",
              "productKeys": [
                "augmentis_31_universal_surfaces"
              ]
            },
            {
              "id": "fin-bpw",
              "sampleType": "Finished",
              "mode": "parallel",
              "productKeys": [
                "augmentis_91_bpw"
              ]
            },
            {
              "id": "fin-list",
              "sampleType": "Finished",
              "mode": "alternative",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_3_listeria_monocytogenes"
              ]
            }
          ]
        },
        "mediumSupplement": {
          "options": [
            {
              "productKey": "potentia_2_listeria",
              "catalogCode": [
                "V-PET05"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true
            }
          ]
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_4_1_salmonella_spp_l_monocytogenes_e_coli_and_s_aureus",
          "catalogCode": "V-SF42",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Sauces and condiments": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "catalogCode": [
                "V-FL18",
                "V-FP08"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_3_listeria_monocytogenes",
              "catalogCode": [
                "V-FP32",
                "V-FP33"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL45",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ],
          "groups": [
            {
              "id": "env-surf",
              "sampleType": "Environmental",
              "mode": "alternative",
              "productKeys": [
                "augmentis_31_universal_surfaces"
              ]
            },
            {
              "id": "fin-bpw",
              "sampleType": "Finished",
              "mode": "parallel",
              "productKeys": [
                "augmentis_91_bpw"
              ]
            },
            {
              "id": "fin-list",
              "sampleType": "Finished",
              "mode": "alternative",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_3_listeria_monocytogenes"
              ]
            }
          ]
        },
        "mediumSupplement": {
          "options": [
            {
              "productKey": "potentia_2_listeria",
              "catalogCode": [
                "V-PET05"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true
            }
          ]
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_4_1_salmonella_spp_l_monocytogenes_e_coli_and_s_aureus",
          "catalogCode": "V-SF42",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Seafood": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "catalogCode": [
                "V-FL18",
                "V-FP08"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_3_listeria_monocytogenes",
              "catalogCode": [
                "V-FP32",
                "V-FP33"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL45",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ],
          "groups": [
            {
              "id": "env-surf",
              "sampleType": "Environmental",
              "mode": "alternative",
              "productKeys": [
                "augmentis_31_universal_surfaces"
              ]
            },
            {
              "id": "fin-bpw",
              "sampleType": "Finished",
              "mode": "parallel",
              "productKeys": [
                "augmentis_91_bpw"
              ]
            },
            {
              "id": "fin-list",
              "sampleType": "Finished",
              "mode": "alternative",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_3_listeria_monocytogenes"
              ]
            }
          ]
        },
        "mediumSupplement": {
          "options": [
            {
              "productKey": "potentia_2_listeria",
              "catalogCode": [
                "V-PET05"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true
            }
          ]
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_4_1_salmonella_spp_l_monocytogenes_e_coli_and_s_aureus",
          "catalogCode": "V-SF42",
          "timeHours": 2,
          "timeEstimated": false
        }
      }
    }
  },
  {
    "id": "V-SF184",
    "name": "Specio 4.8 Pathogens + Hygiene Indicators",
    "productLine": "Specio",
    "catalogCode": "V-SF184",
    "productKey": "specio_4_8_pathogens_hygiene_indicators",
    "targets": [
      "Salmonella_spp.",
      "Listeria_monocytogenes",
      "Fecal_microorganism_indicator",
      "Inadequate_GMP_indicator"
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
    "stagesByIndustry": {
      "Confectionery": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "catalogCode": [
                "V-FL18",
                "V-FP08"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_3_listeria_monocytogenes",
              "catalogCode": [
                "V-FP32",
                "V-FP33"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL45",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ],
          "groups": [
            {
              "id": "env-surf",
              "sampleType": "Environmental",
              "mode": "alternative",
              "productKeys": [
                "augmentis_31_universal_surfaces"
              ]
            },
            {
              "id": "fin-bpw",
              "sampleType": "Finished",
              "mode": "parallel",
              "productKeys": [
                "augmentis_91_bpw"
              ]
            },
            {
              "id": "fin-list",
              "sampleType": "Finished",
              "mode": "alternative",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_3_listeria_monocytogenes"
              ]
            }
          ]
        },
        "mediumSupplement": {
          "options": [
            {
              "productKey": "potentia_2_listeria",
              "catalogCode": [
                "V-PET05"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true
            }
          ]
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_4_8_pathogens_hygiene_indicators",
          "catalogCode": "V-SF184",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Dairy": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "catalogCode": [
                "V-FL18",
                "V-FP08"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_3_listeria_monocytogenes",
              "catalogCode": [
                "V-FP32",
                "V-FP33"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL45",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ],
          "groups": [
            {
              "id": "env-surf",
              "sampleType": "Environmental",
              "mode": "alternative",
              "productKeys": [
                "augmentis_31_universal_surfaces"
              ]
            },
            {
              "id": "fin-bpw",
              "sampleType": "Finished",
              "mode": "parallel",
              "productKeys": [
                "augmentis_91_bpw"
              ]
            },
            {
              "id": "fin-list",
              "sampleType": "Finished",
              "mode": "alternative",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_3_listeria_monocytogenes"
              ]
            }
          ]
        },
        "mediumSupplement": {
          "options": [
            {
              "productKey": "potentia_2_listeria",
              "catalogCode": [
                "V-PET05"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true
            }
          ]
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_4_8_pathogens_hygiene_indicators",
          "catalogCode": "V-SF184",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Egg Products": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "catalogCode": [
                "V-FL18",
                "V-FP08"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_3_listeria_monocytogenes",
              "catalogCode": [
                "V-FP32",
                "V-FP33"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL45",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ],
          "groups": [
            {
              "id": "env-surf",
              "sampleType": "Environmental",
              "mode": "alternative",
              "productKeys": [
                "augmentis_31_universal_surfaces"
              ]
            },
            {
              "id": "fin-bpw",
              "sampleType": "Finished",
              "mode": "parallel",
              "productKeys": [
                "augmentis_91_bpw"
              ]
            },
            {
              "id": "fin-list",
              "sampleType": "Finished",
              "mode": "alternative",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_3_listeria_monocytogenes"
              ]
            }
          ]
        },
        "mediumSupplement": {
          "options": [
            {
              "productKey": "potentia_2_listeria",
              "catalogCode": [
                "V-PET05"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true
            }
          ]
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_4_8_pathogens_hygiene_indicators",
          "catalogCode": "V-SF184",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Fresh & Processed Produce": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "catalogCode": [
                "V-FL18",
                "V-FP08"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_3_listeria_monocytogenes",
              "catalogCode": [
                "V-FP32",
                "V-FP33"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL45",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ],
          "groups": [
            {
              "id": "env-surf",
              "sampleType": "Environmental",
              "mode": "alternative",
              "productKeys": [
                "augmentis_31_universal_surfaces"
              ]
            },
            {
              "id": "fin-bpw",
              "sampleType": "Finished",
              "mode": "parallel",
              "productKeys": [
                "augmentis_91_bpw"
              ]
            },
            {
              "id": "fin-list",
              "sampleType": "Finished",
              "mode": "alternative",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_3_listeria_monocytogenes"
              ]
            }
          ]
        },
        "mediumSupplement": {
          "options": [
            {
              "productKey": "potentia_2_listeria",
              "catalogCode": [
                "V-PET05"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true
            }
          ]
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_4_8_pathogens_hygiene_indicators",
          "catalogCode": "V-SF184",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Meat and Poultry": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "catalogCode": [
                "V-FL18",
                "V-FP08"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_3_listeria_monocytogenes",
              "catalogCode": [
                "V-FP32",
                "V-FP33"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL45",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ],
          "groups": [
            {
              "id": "env-surf",
              "sampleType": "Environmental",
              "mode": "alternative",
              "productKeys": [
                "augmentis_31_universal_surfaces"
              ]
            },
            {
              "id": "fin-bpw",
              "sampleType": "Finished",
              "mode": "parallel",
              "productKeys": [
                "augmentis_91_bpw"
              ]
            },
            {
              "id": "fin-list",
              "sampleType": "Finished",
              "mode": "alternative",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_3_listeria_monocytogenes"
              ]
            }
          ]
        },
        "mediumSupplement": {
          "options": [
            {
              "productKey": "potentia_2_listeria",
              "catalogCode": [
                "V-PET05"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true
            }
          ]
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_4_8_pathogens_hygiene_indicators",
          "catalogCode": "V-SF184",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Pet Food & Animal Feed": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "catalogCode": [
                "V-FL18",
                "V-FP08"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_3_listeria_monocytogenes",
              "catalogCode": [
                "V-FP32",
                "V-FP33"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL45",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ],
          "groups": [
            {
              "id": "env-surf",
              "sampleType": "Environmental",
              "mode": "alternative",
              "productKeys": [
                "augmentis_31_universal_surfaces"
              ]
            },
            {
              "id": "fin-bpw",
              "sampleType": "Finished",
              "mode": "parallel",
              "productKeys": [
                "augmentis_91_bpw"
              ]
            },
            {
              "id": "fin-list",
              "sampleType": "Finished",
              "mode": "alternative",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_3_listeria_monocytogenes"
              ]
            }
          ]
        },
        "mediumSupplement": {
          "options": [
            {
              "productKey": "potentia_2_listeria",
              "catalogCode": [
                "V-PET05"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true
            }
          ]
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_4_8_pathogens_hygiene_indicators",
          "catalogCode": "V-SF184",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Ready-to-eat": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "catalogCode": [
                "V-FL18",
                "V-FP08"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_3_listeria_monocytogenes",
              "catalogCode": [
                "V-FP32",
                "V-FP33"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL45",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ],
          "groups": [
            {
              "id": "env-surf",
              "sampleType": "Environmental",
              "mode": "alternative",
              "productKeys": [
                "augmentis_31_universal_surfaces"
              ]
            },
            {
              "id": "fin-bpw",
              "sampleType": "Finished",
              "mode": "parallel",
              "productKeys": [
                "augmentis_91_bpw"
              ]
            },
            {
              "id": "fin-list",
              "sampleType": "Finished",
              "mode": "alternative",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_3_listeria_monocytogenes"
              ]
            }
          ]
        },
        "mediumSupplement": {
          "options": [
            {
              "productKey": "potentia_2_listeria",
              "catalogCode": [
                "V-PET05"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true
            }
          ]
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_4_8_pathogens_hygiene_indicators",
          "catalogCode": "V-SF184",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Sauces and condiments": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "catalogCode": [
                "V-FL18",
                "V-FP08"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_3_listeria_monocytogenes",
              "catalogCode": [
                "V-FP32",
                "V-FP33"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL45",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ],
          "groups": [
            {
              "id": "env-surf",
              "sampleType": "Environmental",
              "mode": "alternative",
              "productKeys": [
                "augmentis_31_universal_surfaces"
              ]
            },
            {
              "id": "fin-bpw",
              "sampleType": "Finished",
              "mode": "parallel",
              "productKeys": [
                "augmentis_91_bpw"
              ]
            },
            {
              "id": "fin-list",
              "sampleType": "Finished",
              "mode": "alternative",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_3_listeria_monocytogenes"
              ]
            }
          ]
        },
        "mediumSupplement": {
          "options": [
            {
              "productKey": "potentia_2_listeria",
              "catalogCode": [
                "V-PET05"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true
            }
          ]
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_4_8_pathogens_hygiene_indicators",
          "catalogCode": "V-SF184",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Seafood": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "catalogCode": [
                "V-FL18",
                "V-FP08"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_1_listeria",
              "catalogCode": [
                "V-FP26"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_3_listeria_monocytogenes",
              "catalogCode": [
                "V-FP32",
                "V-FP33"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL45",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ],
          "groups": [
            {
              "id": "env-surf",
              "sampleType": "Environmental",
              "mode": "alternative",
              "productKeys": [
                "augmentis_31_universal_surfaces"
              ]
            },
            {
              "id": "fin-bpw",
              "sampleType": "Finished",
              "mode": "parallel",
              "productKeys": [
                "augmentis_91_bpw"
              ]
            },
            {
              "id": "fin-list",
              "sampleType": "Finished",
              "mode": "alternative",
              "productKeys": [
                "augmentis_1_listeria",
                "augmentis_3_listeria_monocytogenes"
              ]
            }
          ]
        },
        "mediumSupplement": {
          "options": [
            {
              "productKey": "potentia_2_listeria",
              "catalogCode": [
                "V-PET05"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeEstimated": true
            }
          ]
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_4_8_pathogens_hygiene_indicators",
          "catalogCode": "V-SF184",
          "timeHours": 2,
          "timeEstimated": false
        }
      }
    }
  },
  {
    "id": "V-SF109",
    "name": "Ampliora 3.10 V. cholerae, V. vulnificus and V. parahaemolyticus",
    "productLine": "Ampliora",
    "catalogCode": "V-SF109",
    "productKey": "ampliora_3_10_v_cholerae_v_vulnificus_and_v_parahaemolyticus",
    "targets": [
      "Vibrio_cholerae",
      "Vibrio_parahaemolyticus",
      "Vibrio_vulnificus"
    ],
    "mainIndustries": [
      "Seafood"
    ],
    "technology": "Real-Time PCR - Mila",
    "sensitivity": "Vibrio parahaemolyticus. 1x102 CFU/25g and Vibrio vulnificus 1x101 CFU/25g.",
    "keyAdvantages": [
      {
        "title": "Multiplex efficiency",
        "subtitle": "more targets per run"
      },
      {
        "title": "Cost per result",
        "subtitle": "fewer runs, lower cost"
      },
      {
        "title": "Reaction savings",
        "subtitle": "~67% reaction savings"
      }
    ],
    "stagesByIndustry": {
      "Seafood": {
        "sampling": {
          "options": []
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_31_universal_surfaces",
              "catalogCode": [
                "V-FL18",
                "V-FP08"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_10_v_cholerae_v_vulnificus_and_v_parahaemolyticus",
          "catalogCode": "V-SF109",
          "timeHours": 1.666666667,
          "timeEstimated": false
        }
      }
    }
  },
  {
    "id": "V-SF179",
    "name": "Ampliora 3.15 Zygosaccharomyces group, Saccharomyces spp. and Saccharomyces cerevisiae",
    "productLine": "Ampliora",
    "catalogCode": "V-SF179",
    "productKey": "ampliora_3_15_zygosaccharomyces_group_saccharomyces_spp_and_saccharomyces_cerevisiae",
    "targets": [
      "Zygosaccharomyces_group_Zygosaccharomyces_bailii_Zygosaccharomyces_parabailii_Zygosaccharomyces_rouxii",
      "Saccharomyces_cerevisiae",
      "Saccharomyces_spp."
    ],
    "mainIndustries": [
      "Beer",
      "Wine"
    ],
    "technology": "Real-Time PCR - Mila",
    "sensitivity": null,
    "keyAdvantages": [
      {
        "title": "Multiplex efficiency",
        "subtitle": "more targets per run"
      },
      {
        "title": "Cost per result",
        "subtitle": "fewer runs, lower cost"
      },
      {
        "title": "Wine spoilage coverage",
        "subtitle": "yeast-focused panel"
      }
    ],
    "stagesByIndustry": {
      "Beer": {
        "sampling": {
          "options": []
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_21_yeast_molds",
              "catalogCode": [
                "V-FL12",
                "V-FP18"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 48,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_5_pdb",
              "catalogCode": [
                "V-FL43"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 48,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_4_bacteria_yeast_and_molds_plus",
              "catalogCode": [
                "V-EQ46"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_15_zygosaccharomyces_group_saccharomyces_spp_and_saccharomyces_cerevisiae",
          "catalogCode": "V-SF179",
          "timeHours": 1.583333333,
          "timeEstimated": false
        }
      },
      "Wine": {
        "sampling": {
          "options": []
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_21_yeast_molds",
              "catalogCode": [
                "V-FL12",
                "V-FP18"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 48,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_5_pdb",
              "catalogCode": [
                "V-FL43"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 48,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_4_bacteria_yeast_and_molds_plus",
              "catalogCode": [
                "V-EQ46"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.75,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "ampliora_3_15_zygosaccharomyces_group_saccharomyces_spp_and_saccharomyces_cerevisiae",
          "catalogCode": "V-SF179",
          "timeHours": 1.583333333,
          "timeEstimated": false
        }
      }
    }
  },
  {
    "id": "V-SF25",
    "name": "Specio 2.7 Salmonella spp. and E. coli",
    "productLine": "Specio",
    "catalogCode": "V-SF25",
    "productKey": "specio_2_7_salmonella_spp_and_e_coli",
    "targets": [
      "Escherichia_coli",
      "Salmonella_spp."
    ],
    "mainIndustries": [
      "Confectionery",
      "Fresh & Processed Produce",
      "Meat and Poultry",
      "Pet Food & Animal Feed",
      "Ready-to-eat"
    ],
    "technology": "Real-time PCR with melting curve  - KAi",
    "sensitivity": null,
    "keyAdvantages": [
      {
        "title": "Simple setup",
        "subtitle": "FAM-only simplicity"
      },
      {
        "title": "Multiplex efficiency",
        "subtitle": "more targets per run"
      },
      {
        "title": "Reaction savings",
        "subtitle": "~50% reaction savings"
      }
    ],
    "stagesByIndustry": {
      "Confectionery": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            },
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "catalogCode": [
                "V-FP27"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL06",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "catalogCode": [
                "V-FP27",
                "V-FL46"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL45",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_2_7_salmonella_spp_and_e_coli",
          "catalogCode": "V-SF25",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Fresh & Processed Produce": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "catalogCode": [
                "V-FP27"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL06",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "catalogCode": [
                "V-FP27",
                "V-FL46"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL45",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_2_7_salmonella_spp_and_e_coli",
          "catalogCode": "V-SF25",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Meat and Poultry": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "catalogCode": [
                "V-FP27"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL06",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "catalogCode": [
                "V-FP27",
                "V-FL46"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL45",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_2_7_salmonella_spp_and_e_coli",
          "catalogCode": "V-SF25",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Pet Food & Animal Feed": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "catalogCode": [
                "V-FP27"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL06",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "catalogCode": [
                "V-FP27",
                "V-FL46"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL45",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_2_7_salmonella_spp_and_e_coli",
          "catalogCode": "V-SF25",
          "timeHours": 2,
          "timeEstimated": false
        }
      },
      "Ready-to-eat": {
        "sampling": {
          "options": [
            {
              "productKey": "collectio_1_neutrosampling",
              "catalogCode": [
                "V-FP16",
                "V-TB09",
                "V-TB10"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.25,
              "timeEstimated": true
            }
          ]
        },
        "enrichment": {
          "options": [
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "catalogCode": [
                "V-FP27"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL06",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_14_universal_gram_negative",
              "catalogCode": [
                "V-FP27",
                "V-FL46"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            },
            {
              "productKey": "augmentis_91_bpw",
              "catalogCode": [
                "V-FL45",
                "V-FP25",
                "V-FP31"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 24,
              "timeEstimated": false
            }
          ]
        },
        "mediumSupplement": {
          "options": []
        },
        "extractionSupplement": {
          "options": []
        },
        "extraction": {
          "options": [
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Environmental"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            },
            {
              "productKey": "nucleia_2_tez_q_plus",
              "catalogCode": [
                "V-EQ19"
              ],
              "sampleTypes": [
                "Finished"
              ],
              "timeHours": 0.833333333,
              "timeEstimated": false
            }
          ]
        },
        "pcr": {
          "productKey": "specio_2_7_salmonella_spp_and_e_coli",
          "catalogCode": "V-SF25",
          "timeHours": 2,
          "timeEstimated": false
        }
      }
    }
  }
];