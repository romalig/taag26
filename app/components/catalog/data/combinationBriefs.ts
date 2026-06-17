// combinationBriefs.ts — EDIT THIS FILE BY HAND.
// =============================================================================
// When two (or more) enrichment media run in PARALLEL (a "bundle"), the Product
// Value Brief shows a COMBINED brief instead of a single product's brief: one
// description + key features that explain how the media work together, plus the
// formats of every product in the bundle (grouped by product).
//
// Keyed by the sorted set of productKeys in the bundle, joined with "+".
// Example key: "augmentis_1_listeria+augmentis_91_bpw"
// (sort the productKeys alphabetically so the key is stable regardless of order.)
//
// `members` lists the productKeys whose formats should be shown, in display order
// (the order you want the format groups to appear).
//
// DRAFT NOTE: descriptions/features below were drafted from each product's own
// factual description and features. Review for commercial accuracy before publishing.
// =============================================================================

export interface CombinationBrief {
  name: string;            // title shown for the combined brief
  category: string | null; // header kicker (e.g. "Growth Media · Parallel enrichment")
  productLine: string | null;
  description: string;
  features: string[];
  members: string[];       // productKeys whose formats are shown, in display order
}

// Key = productKeys sorted alphabetically, joined with "+".
export const COMBINATION_BRIEFS: Record<string, CombinationBrief> = {
  // Augmentis 91 BPW (non-selective) + Augmentis 1 Listeria (selective)
  "augmentis_1_listeria+augmentis_91_bpw": {
    name: "Augmentis 91 BPW + Augmentis 1 Listeria",
    category: "Growth media · Parallel enrichment",
    productLine: "Augmentis",
    description:
      "A parallel enrichment workflow that pairs broad, non-selective recovery with targeted Listeria enrichment. Augmentis 91 BPW provides the nutrients and osmotic balance to revive and recover stressed microorganisms across the sample, while Augmentis 1 Listeria selectively promotes the growth of Listeria spp. and L. monocytogenes. Run together, they prepare a single sample for reliable downstream extraction and PCR — combining wide microbial recovery with the selective enrichment a Listeria workflow needs.",
    features: [
      "Parallel enrichment: non-selective BPW recovery runs alongside selective Listeria enrichment from the same sample.",
      "Broad recovery (BPW): provides nutrients and osmotic balance to revive stressed microorganisms across the matrix.",
      "Selective Listeria enrichment: nutrients and growth factors optimized for Listeria spp. and L. monocytogenes.",
      "PCR-ready samples: after incubation, both enrichments are prepared for DNA extraction and molecular detection.",
      "TAAG-compatible: designed to integrate with PCR kits targeting Listeria spp. and L. monocytogenes.",
      "Flexible formats: ready-to-use and dehydrated options for both media to suit lab storage and preparation needs.",
    ],
    members: ["augmentis_91_bpw", "augmentis_1_listeria"],
  },

  // Augmentis 91 BPW (non-selective) + Augmentis 3 Listeria monocytogenes (selective, Lm-specific)
  "augmentis_3_listeria_monocytogenes+augmentis_91_bpw": {
    name: "Augmentis 91 BPW + Augmentis 3 Listeria monocytogenes",
    category: "Growth media · Parallel enrichment",
    productLine: "Augmentis",
    description:
      "A parallel enrichment workflow that pairs broad, non-selective recovery with Listeria monocytogenes-targeted enrichment. Augmentis 91 BPW provides the nutrients and osmotic balance to revive and recover stressed microorganisms across the sample, while Augmentis 3 Listeria monocytogenes specifically promotes the growth of L. monocytogenes. Run together, they prepare a single sample for reliable downstream extraction and PCR — combining wide microbial recovery with the focused enrichment an L. monocytogenes workflow needs.",
    features: [
      "Parallel enrichment: non-selective BPW recovery runs alongside targeted L. monocytogenes enrichment from the same sample.",
      "Broad recovery (BPW): provides nutrients and osmotic balance to revive stressed microorganisms across the matrix.",
      "Targeted enrichment: Augmentis 3 is specifically aimed at Listeria monocytogenes.",
      "PCR-ready samples: after incubation, both enrichments are prepared for DNA extraction and molecular detection.",
      "Food safety application: suited to workflows requiring focused L. monocytogenes enrichment.",
      "Flexible formats: ready-to-use and dehydrated options to suit lab storage and preparation needs.",
    ],
    members: ["augmentis_91_bpw", "augmentis_3_listeria_monocytogenes"],
  },
};

// Build the lookup key for a set of productKeys (sorted + joined).
export function combinationKey(productKeys: string[]): string {
  return [...productKeys].sort().join("+");
}
