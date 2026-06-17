// supplementRules.ts — EDIT THIS FILE BY HAND.
// =============================================================================
// Conditional supplement rules: a supplement (medium or extraction) only appears
// when a specific enrichment MEDIUM was selected. This lets the workflow react to
// the user's choice in the enrichment step.
//
// How it works:
//   - For each kit, list rules that gate a supplement on the chosen enrichment medium.
//   - When the chosen enrichment medium's productKey is in `whenMediumIs`, the
//     supplement option (`supplementKey`) is KEPT; otherwise it is removed.
//   - A supplement option NOT mentioned in any rule for the kit is always kept
//     (subject to the normal sample-type filter). So rules only RESTRICT.
//   - If, after applying rules, a supplement stage has no remaining options, the
//     stage is omitted entirely (no empty step).
//
// Scope filters are optional: `industries` and `sampleTypes` narrow when the rule
// applies. Omit them (or use null) to apply in every industry / sample type.
//
// productKeys must match those in products.ts / protocols.ts.
// =============================================================================

export type SupplementStage = "mediumSupplement" | "extractionSupplement";

export interface SupplementRule {
  stage: SupplementStage;        // which supplement stage this rule gates
  supplementKey: string;         // the supplement productKey that is gated
  whenMediumIs: string[];        // keep the supplement only if the chosen enrichment medium is one of these
  industries?: string[] | null;  // optional: only in these industries (null/omit = all)
  sampleTypes?: string[] | null; // optional: only for these sample types (null/omit = all)
}

// Keyed by PCR kit id (protocol id).
export const SUPPLEMENT_RULES: Record<string, SupplementRule[]> = {
  // Specio 4.1 — Potentia 2 Listeria only when Augmentis 3 Listeria monocytogenes is chosen.
  "V-SF42": [
    {
      stage: "mediumSupplement",
      supplementKey: "potentia_2_listeria",
      whenMediumIs: ["augmentis_3_listeria_monocytogenes"],
    },
  ],
  // Specio 4.8 — same rule as 4.1.
  "V-SF184": [
    {
      stage: "mediumSupplement",
      supplementKey: "potentia_2_listeria",
      whenMediumIs: ["augmentis_3_listeria_monocytogenes"],
    },
  ],
  // Elevia 1.1 Salmonella spp.
  //  - Potentia 1 Salmonella: Confectionery, Finished, when BPW is the medium.
  //  - Clarixa 1 (extraction): Confectionery & Dairy, Finished. Not gated on a specific
  //    medium, but scoped to those industries/sample type. whenMediumIs left broad
  //    (matches any of the kit's media) so it stays whenever the scope applies.
  "V-PAT04": [
    {
      stage: "mediumSupplement",
      supplementKey: "potentia_1_salmonella_spp",
      whenMediumIs: ["augmentis_91_bpw"],
      industries: ["Confectionery"],
      sampleTypes: ["Finished"],
    },
    {
      stage: "extractionSupplement",
      supplementKey: "clarixa_1",
      whenMediumIs: ["augmentis_91_bpw", "augmentis_xpress_1", "captus_xpress_1"],
      industries: ["Confectionery", "Dairy"],
      sampleTypes: ["Finished"],
    },
  ],
};
