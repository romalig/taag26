// comparisons.ts — EDIT BY HAND (rarely). Competitor tables keyed by protocol id.
// "Leading PCR Test" = best-in-class molecular competitor (generic, no named vendor).
// "Traditional" = culture-based microbiology. businessImpact = the operational "so what".
// top_cards: 4 per protocol — 2 category:"technical" + 2 category:"operational".

export interface TopCard { category: "technical"|"operational"; title: string|null; subtitle: string|null; }
export interface ComparisonRow { feature: string|null; taag: string|null; leadingPcr: string|null; traditional: string|null; businessImpact: string|null; }
export interface ProtocolComparison { template: string|null; top_cards: TopCard[]; rows: ComparisonRow[]; needsReview?: boolean; }

export const COMPARISONS: Record<string, ProtocolComparison> = {
  "V-SF97": {
    "template": "Ampliora_Monoplex",
    "top_cards": [
      {
        "category": "technical",
        "title": "Mila AI primer design",
        "subtitle": "AI-designed primers for specific, reliable Salmonella amplification"
      },
      {
        "category": "technical",
        "title": "Internal reaction control",
        "subtitle": "Monitors every run and supports automated TxA calling"
      },
      {
        "category": "operational",
        "title": "Faster lot release",
        "subtitle": "Molecular result ready well before culture confirmation"
      },
      {
        "category": "operational",
        "title": "Lower price, open platform",
        "subtitle": "Below leading systems, runs on instruments you own"
      }
    ],
    "rows": [
      {
        "feature": "Time to Result",
        "taag": "Molecular Salmonella result, ~26 h",
        "leadingPcr": "Comparable enriched PCR",
        "traditional": "Multi-day culture (2–5 days)",
        "businessImpact": "Salmonella answer in about a day instead of culture's 2–5, releasing product and freeing warehouse space sooner."
      },
      {
        "feature": "Detection Technology",
        "taag": "Mila AI-designed primers",
        "leadingPcr": "Standard primer design",
        "traditional": "No molecular specificity",
        "businessImpact": "AI-optimized primer design gives specific, reliable Salmonella calls with low cross-reactivity."
      },
      {
        "feature": "Cost per Result",
        "taag": "Lower price, open instruments",
        "leadingPcr": "Typically higher cost per target",
        "traditional": "High labor-driven cost",
        "businessImpact": "Priced below leading platforms and runs on thermocyclers you already own — no proprietary equipment or interpretation-software fees."
      },
      {
        "feature": "Open Platform",
        "taag": "Runs on thermocyclers you already own",
        "leadingPcr": "Often a closed, proprietary ecosystem",
        "traditional": "Dedicated lab infrastructure",
        "businessImpact": "No instrument lock-in or forced capital purchase — deploy on existing equipment across sites."
      },
      {
        "feature": "Free AI Interpretation",
        "taag": "Automated result calling, included",
        "leadingPcr": "Interpretation often behind a paid subscription",
        "traditional": "Manual reading, analyst-dependent",
        "businessImpact": "Removes analyst subjectivity and a recurring software fee that competitors typically charge."
      }
    ]
  },
  "V-SF69": {
    "template": "Ampliora_Monoplex",
    "top_cards": [
      {
        "category": "technical",
        "title": "Mila AI primer design",
        "subtitle": "AI-designed primers for specific, reliable E. coli amplification"
      },
      {
        "category": "technical",
        "title": "Internal reaction control",
        "subtitle": "Monitors every run and supports automated TxA calling"
      },
      {
        "category": "operational",
        "title": "Faster hygiene verification",
        "subtitle": "Quick E. coli result speeds sanitation decisions"
      },
      {
        "category": "operational",
        "title": "Lower price, open platform",
        "subtitle": "Below leading systems, runs on instruments you own"
      }
    ],
    "rows": [
      {
        "feature": "Time to Result",
        "taag": "Molecular E. coli result, ~26 h",
        "leadingPcr": "Comparable enriched PCR",
        "traditional": "Multi-day culture (2–5 days)",
        "businessImpact": "Quick indicator answer speeds sanitation and release decisions versus multi-day culture."
      },
      {
        "feature": "Detection Technology",
        "taag": "Mila AI-designed primers",
        "leadingPcr": "Standard primer design",
        "traditional": "No molecular specificity",
        "businessImpact": "AI-optimized design gives specific, reliable E. coli detection with low cross-reactivity."
      },
      {
        "feature": "Cost per Result",
        "taag": "Lower price, open instruments",
        "leadingPcr": "Typically higher cost per target",
        "traditional": "High labor-driven cost",
        "businessImpact": "Priced below leading platforms and runs on thermocyclers you already own — no proprietary equipment or interpretation-software fees."
      },
      {
        "feature": "Open Platform",
        "taag": "Runs on thermocyclers you already own",
        "leadingPcr": "Often a closed, proprietary ecosystem",
        "traditional": "Dedicated lab infrastructure",
        "businessImpact": "No instrument lock-in or forced capital purchase — deploy on existing equipment across sites."
      },
      {
        "feature": "Free AI Interpretation",
        "taag": "Automated result calling, included",
        "leadingPcr": "Interpretation often behind a paid subscription",
        "traditional": "Manual reading, analyst-dependent",
        "businessImpact": "Removes analyst subjectivity and a recurring software fee that competitors typically charge."
      }
    ]
  },
  "V-SF161": {
    "template": "Ampliora_Spoilage",
    "top_cards": [
      {
        "category": "technical",
        "title": "Detects the guaiacol gene",
        "subtitle": "Targets the molecular marker of taint, not just the organism"
      },
      {
        "category": "technical",
        "title": "ACB + marker, one reaction",
        "subtitle": "Alicyclobacillus and guaiacol gene multiplexed together"
      },
      {
        "category": "operational",
        "title": "Prevents flavor taint",
        "subtitle": "Early guaiacol-risk detection protects flavor and brand"
      },
      {
        "category": "operational",
        "title": "Targeted beverage screening",
        "subtitle": "Built for the specific spoilage risk in juices"
      }
    ],
    "rows": [
      {
        "feature": "Spoilage Marker Detection",
        "taag": "Detects the guaiacol-producing gene itself",
        "leadingPcr": "Detects the organism, not the taint gene",
        "traditional": "Detected only after off-flavor appears",
        "businessImpact": "Targeting the taint gene — not just the organism — flags guaiacol risk before it ruins a batch's flavor."
      },
      {
        "feature": "Direct Savings",
        "taag": "2 targets in 1 reaction — ~50% fewer reactions",
        "leadingPcr": "Pays for a reaction per target",
        "traditional": "A full method per target",
        "businessImpact": "Running one reaction instead of 2 cuts reagent and consumable spend by about 50% per sample."
      },
      {
        "feature": "Operational Savings",
        "taag": "Less labor, equipment time & bench space",
        "leadingPcr": "More runs, more hands-on time",
        "traditional": "Heavy labor and incubator capacity",
        "businessImpact": "Fewer runs free up analyst hours, thermocycler capacity and bench space — letting the same team process more samples."
      },
      {
        "feature": "Time to Result",
        "taag": "~2 h direct screening",
        "leadingPcr": "Slower enriched workflow",
        "traditional": "Multi-day selective culture",
        "businessImpact": "Rapid ACB clearance keeps juice and concentrate lines moving without long holds."
      },
      {
        "feature": "Cost per Result",
        "taag": "Lowest total cost of ownership",
        "leadingPcr": "Typically higher cost per target",
        "traditional": "High labor-driven cost",
        "businessImpact": "Beyond reagents, open instruments and free interpretation remove the equipment lock-in and software fees competitors charge."
      },
      {
        "feature": "Open Platform",
        "taag": "Runs on thermocyclers you already own",
        "leadingPcr": "Often a closed, proprietary ecosystem",
        "traditional": "Dedicated lab infrastructure",
        "businessImpact": "No instrument lock-in or forced capital purchase — deploy on existing equipment across sites."
      },
      {
        "feature": "Free AI Interpretation",
        "taag": "Automated result calling, included",
        "leadingPcr": "Interpretation often behind a paid subscription",
        "traditional": "Manual reading, analyst-dependent",
        "businessImpact": "Removes analyst subjectivity and a recurring software fee that competitors typically charge."
      }
    ]
  },
  "V-SF46": {
    "template": "Ampliora_Multiplex",
    "top_cards": [
      {
        "category": "technical",
        "title": "Species + genus in one reaction",
        "subtitle": "L. monocytogenes vs Listeria spp. via Mila multiplex"
      },
      {
        "category": "technical",
        "title": "Internal reaction control",
        "subtitle": "Monitors every run and supports automated TxA calling"
      },
      {
        "category": "operational",
        "title": "Sharper risk decisions",
        "subtitle": "Species-level result guides the right corrective action"
      },
      {
        "category": "operational",
        "title": "Fewer runs, lower cost",
        "subtitle": "One assay clears Listeria status"
      }
    ],
    "rows": [
      {
        "feature": "Species + Genus Together",
        "taag": "L. monocytogenes vs Listeria spp. in 1 reaction",
        "leadingPcr": "Often two separate reactions",
        "traditional": "Days of selective culture",
        "businessImpact": "Knowing whether it's the pathogen or the genus in one test guides the right corrective action immediately."
      },
      {
        "feature": "Direct Savings",
        "taag": "2 targets in 1 reaction — ~50% fewer reactions",
        "leadingPcr": "Pays for a reaction per target",
        "traditional": "A full method per target",
        "businessImpact": "Running one reaction instead of 2 cuts reagent and consumable spend by about 50% per sample."
      },
      {
        "feature": "Operational Savings",
        "taag": "Less labor, equipment time & bench space",
        "leadingPcr": "More runs, more hands-on time",
        "traditional": "Heavy labor and incubator capacity",
        "businessImpact": "Fewer runs free up analyst hours, thermocycler capacity and bench space — letting the same team process more samples."
      },
      {
        "feature": "Cost per Result",
        "taag": "Lowest total cost of ownership",
        "leadingPcr": "Typically higher cost per target",
        "traditional": "High labor-driven cost",
        "businessImpact": "Beyond reagents, open instruments and free interpretation remove the equipment lock-in and software fees competitors charge."
      },
      {
        "feature": "Open Platform",
        "taag": "Runs on thermocyclers you already own",
        "leadingPcr": "Often a closed, proprietary ecosystem",
        "traditional": "Dedicated lab infrastructure",
        "businessImpact": "No instrument lock-in or forced capital purchase — deploy on existing equipment across sites."
      },
      {
        "feature": "Free AI Interpretation",
        "taag": "Automated result calling, included",
        "leadingPcr": "Interpretation often behind a paid subscription",
        "traditional": "Manual reading, analyst-dependent",
        "businessImpact": "Removes analyst subjectivity and a recurring software fee that competitors typically charge."
      }
    ]
  },
  "V-SF44": {
    "template": "Ampliora_Multiplex",
    "top_cards": [
      {
        "category": "technical",
        "title": "Two pathogens, one reaction",
        "subtitle": "Salmonella and Listeria via Mila multiplex design"
      },
      {
        "category": "technical",
        "title": "Internal reaction control",
        "subtitle": "Monitors every run and supports automated TxA calling"
      },
      {
        "category": "operational",
        "title": "Broader safety per test",
        "subtitle": "Two key pathogens cleared in one workflow"
      },
      {
        "category": "operational",
        "title": "Faster lot release",
        "subtitle": "Combined result speeds the production decision"
      }
    ],
    "rows": [
      {
        "feature": "Two Pathogens Together",
        "taag": "Salmonella + Listeria in 1 reaction",
        "leadingPcr": "Often one target per reaction",
        "traditional": "2 separate selective methods",
        "businessImpact": "Two top pathogens cleared in a single test, broadening safety coverage per sample."
      },
      {
        "feature": "Direct Savings",
        "taag": "2 targets in 1 reaction — ~50% fewer reactions",
        "leadingPcr": "Pays for a reaction per target",
        "traditional": "A full method per target",
        "businessImpact": "Running one reaction instead of 2 cuts reagent and consumable spend by about 50% per sample."
      },
      {
        "feature": "Operational Savings",
        "taag": "Less labor, equipment time & bench space",
        "leadingPcr": "More runs, more hands-on time",
        "traditional": "Heavy labor and incubator capacity",
        "businessImpact": "Fewer runs free up analyst hours, thermocycler capacity and bench space — letting the same team process more samples."
      },
      {
        "feature": "Cost per Result",
        "taag": "Lowest total cost of ownership",
        "leadingPcr": "Typically higher cost per target",
        "traditional": "High labor-driven cost",
        "businessImpact": "Beyond reagents, open instruments and free interpretation remove the equipment lock-in and software fees competitors charge."
      },
      {
        "feature": "Open Platform",
        "taag": "Runs on thermocyclers you already own",
        "leadingPcr": "Often a closed, proprietary ecosystem",
        "traditional": "Dedicated lab infrastructure",
        "businessImpact": "No instrument lock-in or forced capital purchase — deploy on existing equipment across sites."
      },
      {
        "feature": "Free AI Interpretation",
        "taag": "Automated result calling, included",
        "leadingPcr": "Interpretation often behind a paid subscription",
        "traditional": "Manual reading, analyst-dependent",
        "businessImpact": "Removes analyst subjectivity and a recurring software fee that competitors typically charge."
      }
    ]
  },
  "V-SF98": {
    "template": "Ampliora_Multiplex",
    "top_cards": [
      {
        "category": "technical",
        "title": "Three water indicators, one reaction",
        "subtitle": "E. coli, Citrobacter and Klebsiella via Mila multiplex"
      },
      {
        "category": "technical",
        "title": "Mila AI primer design",
        "subtitle": "AI-designed primers for reliable water testing"
      },
      {
        "category": "operational",
        "title": "Faster water release",
        "subtitle": "Quick indicator result speeds process-water decisions"
      },
      {
        "category": "operational",
        "title": "Fewer runs, lower cost",
        "subtitle": "Three indicators per assay cuts cost per sample"
      }
    ],
    "rows": [
      {
        "feature": "Water Indicator Panel",
        "taag": "E. coli, Citrobacter + Klebsiella in 1 reaction",
        "leadingPcr": "A single indicator per reaction",
        "traditional": "Separate culture per indicator",
        "businessImpact": "Three water indicators per test gives a fuller process-water picture in one run."
      },
      {
        "feature": "Direct Savings",
        "taag": "3 targets in 1 reaction — ~67% fewer reactions",
        "leadingPcr": "Pays for a reaction per target",
        "traditional": "A full method per target",
        "businessImpact": "Running one reaction instead of 3 cuts reagent and consumable spend by about 67% per sample."
      },
      {
        "feature": "Operational Savings",
        "taag": "Less labor, equipment time & bench space",
        "leadingPcr": "More runs, more hands-on time",
        "traditional": "Heavy labor and incubator capacity",
        "businessImpact": "Fewer runs free up analyst hours, thermocycler capacity and bench space — letting the same team process more samples."
      },
      {
        "feature": "Time to Result",
        "taag": "~2 h direct screening",
        "leadingPcr": "Slower enriched workflow",
        "traditional": "Multi-day culture",
        "businessImpact": "Rapid water clearance speeds process-water release decisions."
      },
      {
        "feature": "Cost per Result",
        "taag": "Lowest total cost of ownership",
        "leadingPcr": "Typically higher cost per target",
        "traditional": "High labor-driven cost",
        "businessImpact": "Beyond reagents, open instruments and free interpretation remove the equipment lock-in and software fees competitors charge."
      },
      {
        "feature": "Open Platform",
        "taag": "Runs on thermocyclers you already own",
        "leadingPcr": "Often a closed, proprietary ecosystem",
        "traditional": "Dedicated lab infrastructure",
        "businessImpact": "No instrument lock-in or forced capital purchase — deploy on existing equipment across sites."
      },
      {
        "feature": "Free AI Interpretation",
        "taag": "Automated result calling, included",
        "leadingPcr": "Interpretation often behind a paid subscription",
        "traditional": "Manual reading, analyst-dependent",
        "businessImpact": "Removes analyst subjectivity and a recurring software fee that competitors typically charge."
      }
    ]
  },
  "V-SF89": {
    "template": "Ampliora_Multiplex",
    "top_cards": [
      {
        "category": "technical",
        "title": "Three water indicators, one reaction",
        "subtitle": "Enterococcus, Enterobacter and Escherichia via Mila multiplex"
      },
      {
        "category": "technical",
        "title": "Mila AI primer design",
        "subtitle": "AI-designed primers for reliable water testing"
      },
      {
        "category": "operational",
        "title": "Faster water release",
        "subtitle": "Quick indicator result speeds process-water decisions"
      },
      {
        "category": "operational",
        "title": "Fewer runs, lower cost",
        "subtitle": "Three indicators per assay cuts cost per sample"
      }
    ],
    "rows": [
      {
        "feature": "Water Indicator Panel",
        "taag": "Enterococcus, Enterobacter + Escherichia in 1 reaction",
        "leadingPcr": "A single indicator per reaction",
        "traditional": "Separate culture per indicator",
        "businessImpact": "Three water indicators per test gives a fuller process-water picture in one run."
      },
      {
        "feature": "Direct Savings",
        "taag": "3 targets in 1 reaction — ~67% fewer reactions",
        "leadingPcr": "Pays for a reaction per target",
        "traditional": "A full method per target",
        "businessImpact": "Running one reaction instead of 3 cuts reagent and consumable spend by about 67% per sample."
      },
      {
        "feature": "Operational Savings",
        "taag": "Less labor, equipment time & bench space",
        "leadingPcr": "More runs, more hands-on time",
        "traditional": "Heavy labor and incubator capacity",
        "businessImpact": "Fewer runs free up analyst hours, thermocycler capacity and bench space — letting the same team process more samples."
      },
      {
        "feature": "Time to Result",
        "taag": "~2 h direct screening",
        "leadingPcr": "Slower enriched workflow",
        "traditional": "Multi-day culture",
        "businessImpact": "Rapid water clearance speeds process-water release decisions."
      },
      {
        "feature": "Cost per Result",
        "taag": "Lowest total cost of ownership",
        "leadingPcr": "Typically higher cost per target",
        "traditional": "High labor-driven cost",
        "businessImpact": "Beyond reagents, open instruments and free interpretation remove the equipment lock-in and software fees competitors charge."
      },
      {
        "feature": "Open Platform",
        "taag": "Runs on thermocyclers you already own",
        "leadingPcr": "Often a closed, proprietary ecosystem",
        "traditional": "Dedicated lab infrastructure",
        "businessImpact": "No instrument lock-in or forced capital purchase — deploy on existing equipment across sites."
      },
      {
        "feature": "Free AI Interpretation",
        "taag": "Automated result calling, included",
        "leadingPcr": "Interpretation often behind a paid subscription",
        "traditional": "Manual reading, analyst-dependent",
        "businessImpact": "Removes analyst subjectivity and a recurring software fee that competitors typically charge."
      }
    ]
  },
  "V-SF160": {
    "template": "Ampliora_Spoilage",
    "top_cards": [
      {
        "category": "technical",
        "title": "Three spoilage targets, one reaction",
        "subtitle": "Alicyclobacillus, Zygosaccharomyces and the guaiacol gene"
      },
      {
        "category": "technical",
        "title": "Detects the guaiacol gene",
        "subtitle": "Targets the molecular marker of taint, not just the organism"
      },
      {
        "category": "operational",
        "title": "Prevents flavor taint",
        "subtitle": "Early detection protects flavor and shelf life"
      },
      {
        "category": "operational",
        "title": "Fewer runs, lower cost",
        "subtitle": "Broad spoilage panel in one assay"
      }
    ],
    "rows": [
      {
        "feature": "Spoilage Marker Detection",
        "taag": "ACB, Zygosaccharomyces + guaiacol gene in 1 reaction",
        "leadingPcr": "Separate assays per risk",
        "traditional": "Multiple selective cultures over days",
        "businessImpact": "Covers the organism, a key spoilage yeast and the taint gene together — the full beverage spoilage picture in one test."
      },
      {
        "feature": "Direct Savings",
        "taag": "3 targets in 1 reaction — ~67% fewer reactions",
        "leadingPcr": "Pays for a reaction per target",
        "traditional": "A full method per target",
        "businessImpact": "Running one reaction instead of 3 cuts reagent and consumable spend by about 67% per sample."
      },
      {
        "feature": "Operational Savings",
        "taag": "Less labor, equipment time & bench space",
        "leadingPcr": "More runs, more hands-on time",
        "traditional": "Heavy labor and incubator capacity",
        "businessImpact": "Fewer runs free up analyst hours, thermocycler capacity and bench space — letting the same team process more samples."
      },
      {
        "feature": "Time to Result",
        "taag": "~1.6 h direct screening",
        "leadingPcr": "Slower enriched workflow",
        "traditional": "Multi-day selective culture",
        "businessImpact": "Fast, broad spoilage clearance keeps beverage lines moving."
      },
      {
        "feature": "Cost per Result",
        "taag": "Lowest total cost of ownership",
        "leadingPcr": "Typically higher cost per target",
        "traditional": "High labor-driven cost",
        "businessImpact": "Beyond reagents, open instruments and free interpretation remove the equipment lock-in and software fees competitors charge."
      },
      {
        "feature": "Open Platform",
        "taag": "Runs on thermocyclers you already own",
        "leadingPcr": "Often a closed, proprietary ecosystem",
        "traditional": "Dedicated lab infrastructure",
        "businessImpact": "No instrument lock-in or forced capital purchase — deploy on existing equipment across sites."
      },
      {
        "feature": "Free AI Interpretation",
        "taag": "Automated result calling, included",
        "leadingPcr": "Interpretation often behind a paid subscription",
        "traditional": "Manual reading, analyst-dependent",
        "businessImpact": "Removes analyst subjectivity and a recurring software fee that competitors typically charge."
      }
    ]
  },
  "V-SF67": {
    "template": "Ampliora_Multiplex",
    "top_cards": [
      {
        "category": "technical",
        "title": "Three pathogens, one reaction",
        "subtitle": "Salmonella, L. monocytogenes and O157:H7 via Mila multiplex"
      },
      {
        "category": "technical",
        "title": "Internal reaction control",
        "subtitle": "Monitors every run and supports automated TxA calling"
      },
      {
        "category": "operational",
        "title": "Comprehensive safety per test",
        "subtitle": "Three critical pathogens cleared in one workflow"
      },
      {
        "category": "operational",
        "title": "Protects the brand",
        "subtitle": "Broad coverage per sample lowers recall risk"
      }
    ],
    "rows": [
      {
        "feature": "Three Pathogens Together",
        "taag": "Salmonella, L. monocytogenes + O157:H7 in 1 reaction",
        "leadingPcr": "Often split across reactions",
        "traditional": "3 separate selective methods",
        "businessImpact": "Three critical pathogens cleared in one test — comprehensive safety coverage per sample."
      },
      {
        "feature": "Direct Savings",
        "taag": "3 targets in 1 reaction — ~67% fewer reactions",
        "leadingPcr": "Pays for a reaction per target",
        "traditional": "A full method per target",
        "businessImpact": "Running one reaction instead of 3 cuts reagent and consumable spend by about 67% per sample."
      },
      {
        "feature": "Operational Savings",
        "taag": "Less labor, equipment time & bench space",
        "leadingPcr": "More runs, more hands-on time",
        "traditional": "Heavy labor and incubator capacity",
        "businessImpact": "Fewer runs free up analyst hours, thermocycler capacity and bench space — letting the same team process more samples."
      },
      {
        "feature": "Cost per Result",
        "taag": "Lowest total cost of ownership",
        "leadingPcr": "Typically higher cost per target",
        "traditional": "High labor-driven cost",
        "businessImpact": "Beyond reagents, open instruments and free interpretation remove the equipment lock-in and software fees competitors charge."
      },
      {
        "feature": "Open Platform",
        "taag": "Runs on thermocyclers you already own",
        "leadingPcr": "Often a closed, proprietary ecosystem",
        "traditional": "Dedicated lab infrastructure",
        "businessImpact": "No instrument lock-in or forced capital purchase — deploy on existing equipment across sites."
      },
      {
        "feature": "Free AI Interpretation",
        "taag": "Automated result calling, included",
        "leadingPcr": "Interpretation often behind a paid subscription",
        "traditional": "Manual reading, analyst-dependent",
        "businessImpact": "Removes analyst subjectivity and a recurring software fee that competitors typically charge."
      }
    ]
  },
  "V-SF59": {
    "template": "Ampliora_Multiplex",
    "top_cards": [
      {
        "category": "technical",
        "title": "Salmonella + full Listeria picture",
        "subtitle": "Salmonella, L. monocytogenes and Listeria spp. in one reaction"
      },
      {
        "category": "technical",
        "title": "Internal reaction control",
        "subtitle": "Monitors every run and supports automated TxA calling"
      },
      {
        "category": "operational",
        "title": "Sharper risk decisions",
        "subtitle": "Pathogen plus species-level Listeria guides action"
      },
      {
        "category": "operational",
        "title": "Faster lot release",
        "subtitle": "Broad coverage per run speeds decisions"
      }
    ],
    "rows": [
      {
        "feature": "Salmonella + Full Listeria Picture",
        "taag": "Salmonella, L. monocytogenes + Listeria spp. in 1 reaction",
        "leadingPcr": "Often split across reactions",
        "traditional": "3 separate selective methods",
        "businessImpact": "Pathogen plus species-level Listeria in one test sharpens corrective-action decisions."
      },
      {
        "feature": "Direct Savings",
        "taag": "3 targets in 1 reaction — ~67% fewer reactions",
        "leadingPcr": "Pays for a reaction per target",
        "traditional": "A full method per target",
        "businessImpact": "Running one reaction instead of 3 cuts reagent and consumable spend by about 67% per sample."
      },
      {
        "feature": "Operational Savings",
        "taag": "Less labor, equipment time & bench space",
        "leadingPcr": "More runs, more hands-on time",
        "traditional": "Heavy labor and incubator capacity",
        "businessImpact": "Fewer runs free up analyst hours, thermocycler capacity and bench space — letting the same team process more samples."
      },
      {
        "feature": "Cost per Result",
        "taag": "Lowest total cost of ownership",
        "leadingPcr": "Typically higher cost per target",
        "traditional": "High labor-driven cost",
        "businessImpact": "Beyond reagents, open instruments and free interpretation remove the equipment lock-in and software fees competitors charge."
      },
      {
        "feature": "Open Platform",
        "taag": "Runs on thermocyclers you already own",
        "leadingPcr": "Often a closed, proprietary ecosystem",
        "traditional": "Dedicated lab infrastructure",
        "businessImpact": "No instrument lock-in or forced capital purchase — deploy on existing equipment across sites."
      },
      {
        "feature": "Free AI Interpretation",
        "taag": "Automated result calling, included",
        "leadingPcr": "Interpretation often behind a paid subscription",
        "traditional": "Manual reading, analyst-dependent",
        "businessImpact": "Removes analyst subjectivity and a recurring software fee that competitors typically charge."
      }
    ]
  },
  "V-SF74": {
    "template": "Ampliora_Multiplex",
    "top_cards": [
      {
        "category": "technical",
        "title": "Salmonella + full Listeria picture",
        "subtitle": "Salmonella, L. monocytogenes and Listeria spp. in one reaction"
      },
      {
        "category": "technical",
        "title": "Internal reaction control",
        "subtitle": "Monitors every run and supports automated TxA calling"
      },
      {
        "category": "operational",
        "title": "Sharper risk decisions",
        "subtitle": "Pathogen plus species-level Listeria guides action"
      },
      {
        "category": "operational",
        "title": "Faster lot release",
        "subtitle": "Broad coverage per run speeds decisions"
      }
    ],
    "rows": [
      {
        "feature": "Salmonella + Full Listeria Picture",
        "taag": "Salmonella, L. monocytogenes + Listeria spp. in 1 reaction",
        "leadingPcr": "Often split across reactions",
        "traditional": "3 separate selective methods",
        "businessImpact": "Pathogen plus species-level Listeria in one test sharpens corrective-action decisions."
      },
      {
        "feature": "Direct Savings",
        "taag": "3 targets in 1 reaction — ~67% fewer reactions",
        "leadingPcr": "Pays for a reaction per target",
        "traditional": "A full method per target",
        "businessImpact": "Running one reaction instead of 3 cuts reagent and consumable spend by about 67% per sample."
      },
      {
        "feature": "Operational Savings",
        "taag": "Less labor, equipment time & bench space",
        "leadingPcr": "More runs, more hands-on time",
        "traditional": "Heavy labor and incubator capacity",
        "businessImpact": "Fewer runs free up analyst hours, thermocycler capacity and bench space — letting the same team process more samples."
      },
      {
        "feature": "Cost per Result",
        "taag": "Lowest total cost of ownership",
        "leadingPcr": "Typically higher cost per target",
        "traditional": "High labor-driven cost",
        "businessImpact": "Beyond reagents, open instruments and free interpretation remove the equipment lock-in and software fees competitors charge."
      },
      {
        "feature": "Open Platform",
        "taag": "Runs on thermocyclers you already own",
        "leadingPcr": "Often a closed, proprietary ecosystem",
        "traditional": "Dedicated lab infrastructure",
        "businessImpact": "No instrument lock-in or forced capital purchase — deploy on existing equipment across sites."
      },
      {
        "feature": "Free AI Interpretation",
        "taag": "Automated result calling, included",
        "leadingPcr": "Interpretation often behind a paid subscription",
        "traditional": "Manual reading, analyst-dependent",
        "businessImpact": "Removes analyst subjectivity and a recurring software fee that competitors typically charge."
      }
    ]
  },
  "V-SF68": {
    "template": "Ampliora_Multiplex",
    "top_cards": [
      {
        "category": "technical",
        "title": "Complete pathogenic E. coli panel",
        "subtitle": "STEC, O157:H7 and Salmonella in one reaction"
      },
      {
        "category": "technical",
        "title": "STEC strain identification",
        "subtitle": "Differentiates STEC strains, not just generic E. coli"
      },
      {
        "category": "operational",
        "title": "Strong meat & produce safety",
        "subtitle": "Covers the E. coli risks that drive recalls"
      },
      {
        "category": "operational",
        "title": "Fewer runs, lower cost",
        "subtitle": "Three critical targets in one assay"
      }
    ],
    "rows": [
      {
        "feature": "Complete STEC Panel",
        "taag": "STEC, O157:H7 + Salmonella in one reaction",
        "leadingPcr": "Often split across separate STEC reactions",
        "traditional": "Multiple selective methods over days",
        "businessImpact": "The full pathogenic-E. coli picture plus Salmonella in a single test — covers the exact risks that drive meat and produce recalls."
      },
      {
        "feature": "Direct Savings",
        "taag": "3 targets in 1 reaction — ~67% fewer reactions",
        "leadingPcr": "Pays for a reaction per target",
        "traditional": "A full method per target",
        "businessImpact": "Running one reaction instead of 3 cuts reagent and consumable spend by about 67% per sample."
      },
      {
        "feature": "Operational Savings",
        "taag": "Less labor, equipment time & bench space",
        "leadingPcr": "More runs, more hands-on time",
        "traditional": "Heavy labor and incubator capacity",
        "businessImpact": "Fewer runs free up analyst hours, thermocycler capacity and bench space — letting the same team process more samples."
      },
      {
        "feature": "Cost per Result",
        "taag": "Lowest total cost of ownership",
        "leadingPcr": "Typically higher cost per target",
        "traditional": "High labor-driven cost",
        "businessImpact": "Beyond reagents, open instruments and free interpretation remove the equipment lock-in and software fees competitors charge."
      },
      {
        "feature": "Open Platform",
        "taag": "Runs on thermocyclers you already own",
        "leadingPcr": "Often a closed, proprietary ecosystem",
        "traditional": "Dedicated lab infrastructure",
        "businessImpact": "No instrument lock-in or forced capital purchase — deploy on existing equipment across sites."
      },
      {
        "feature": "Free AI Interpretation",
        "taag": "Automated result calling, included",
        "leadingPcr": "Interpretation often behind a paid subscription",
        "traditional": "Manual reading, analyst-dependent",
        "businessImpact": "Removes analyst subjectivity and a recurring software fee that competitors typically charge."
      }
    ]
  },
  "V-SF100": {
    "template": "Ampliora_Beer",
    "top_cards": [
      {
        "category": "technical",
        "title": "Four beer yeasts, one reaction",
        "subtitle": "Saccharomyces, Zygosaccharomyces and related yeasts together"
      },
      {
        "category": "technical",
        "title": "Beer-specific panel design",
        "subtitle": "Mila design tuned to the yeasts that spoil beer"
      },
      {
        "category": "operational",
        "title": "Beer screening in ~2.5 h",
        "subtitle": "Direct workflow lets production release faster"
      },
      {
        "category": "operational",
        "title": "Protects shelf life",
        "subtitle": "Early yeast detection prevents spoilage"
      }
    ],
    "rows": [
      {
        "feature": "Beer Yeast Panel",
        "taag": "4 Saccharomyces/Zygosaccharomyces yeasts in 1 reaction",
        "leadingPcr": "A couple of yeasts per reaction",
        "traditional": "Slow selective yeast culture",
        "businessImpact": "Covers the core beer-spoilage yeasts in one test, protecting product quality before release."
      },
      {
        "feature": "Direct Savings",
        "taag": "4 targets in 1 reaction — ~75% fewer reactions",
        "leadingPcr": "Pays for a reaction per target",
        "traditional": "A full method per target",
        "businessImpact": "Running one reaction instead of 4 cuts reagent and consumable spend by about 75% per sample."
      },
      {
        "feature": "Operational Savings",
        "taag": "Less labor, equipment time & bench space",
        "leadingPcr": "More runs, more hands-on time",
        "traditional": "Heavy labor and incubator capacity",
        "businessImpact": "Fewer runs free up analyst hours, thermocycler capacity and bench space — letting the same team process more samples."
      },
      {
        "feature": "Cost per Result",
        "taag": "Lowest total cost of ownership",
        "leadingPcr": "Typically higher cost per target",
        "traditional": "High labor-driven cost",
        "businessImpact": "Beyond reagents, open instruments and free interpretation remove the equipment lock-in and software fees competitors charge."
      },
      {
        "feature": "Open Platform",
        "taag": "Runs on thermocyclers you already own",
        "leadingPcr": "Often a closed, proprietary ecosystem",
        "traditional": "Dedicated lab infrastructure",
        "businessImpact": "No instrument lock-in or forced capital purchase — deploy on existing equipment across sites."
      },
      {
        "feature": "Free AI Interpretation",
        "taag": "Automated result calling, included",
        "leadingPcr": "Interpretation often behind a paid subscription",
        "traditional": "Manual reading, analyst-dependent",
        "businessImpact": "Removes analyst subjectivity and a recurring software fee that competitors typically charge."
      }
    ]
  },
  "V-SF101": {
    "template": "Ampliora_Beer",
    "top_cards": [
      {
        "category": "technical",
        "title": "Four beer yeasts, one reaction",
        "subtitle": "Brettanomyces, Pichia and diastaticus strains together"
      },
      {
        "category": "technical",
        "title": "Beer-specific panel design",
        "subtitle": "Mila design tuned to wild and diastatic beer yeasts"
      },
      {
        "category": "operational",
        "title": "Beer screening in ~2.5 h",
        "subtitle": "Direct workflow lets production release faster"
      },
      {
        "category": "operational",
        "title": "Protects shelf life",
        "subtitle": "Early yeast detection prevents spoilage"
      }
    ],
    "rows": [
      {
        "feature": "Beer Yeast Panel",
        "taag": "4 Brettanomyces/Pichia/diastaticus yeasts in 1 reaction",
        "leadingPcr": "A couple of yeasts per reaction",
        "traditional": "Slow selective yeast culture",
        "businessImpact": "Covers the wild and diastatic yeasts behind beer faults in one test."
      },
      {
        "feature": "Direct Savings",
        "taag": "4 targets in 1 reaction — ~75% fewer reactions",
        "leadingPcr": "Pays for a reaction per target",
        "traditional": "A full method per target",
        "businessImpact": "Running one reaction instead of 4 cuts reagent and consumable spend by about 75% per sample."
      },
      {
        "feature": "Operational Savings",
        "taag": "Less labor, equipment time & bench space",
        "leadingPcr": "More runs, more hands-on time",
        "traditional": "Heavy labor and incubator capacity",
        "businessImpact": "Fewer runs free up analyst hours, thermocycler capacity and bench space — letting the same team process more samples."
      },
      {
        "feature": "Cost per Result",
        "taag": "Lowest total cost of ownership",
        "leadingPcr": "Typically higher cost per target",
        "traditional": "High labor-driven cost",
        "businessImpact": "Beyond reagents, open instruments and free interpretation remove the equipment lock-in and software fees competitors charge."
      },
      {
        "feature": "Open Platform",
        "taag": "Runs on thermocyclers you already own",
        "leadingPcr": "Often a closed, proprietary ecosystem",
        "traditional": "Dedicated lab infrastructure",
        "businessImpact": "No instrument lock-in or forced capital purchase — deploy on existing equipment across sites."
      },
      {
        "feature": "Free AI Interpretation",
        "taag": "Automated result calling, included",
        "leadingPcr": "Interpretation often behind a paid subscription",
        "traditional": "Manual reading, analyst-dependent",
        "businessImpact": "Removes analyst subjectivity and a recurring software fee that competitors typically charge."
      }
    ]
  },
  "V-SF102": {
    "template": "Ampliora_Beer",
    "top_cards": [
      {
        "category": "technical",
        "title": "Four beer bacteria, one reaction",
        "subtitle": "Lactobacillus and Pediococcus spoilage bacteria together"
      },
      {
        "category": "technical",
        "title": "Beer-specific panel design",
        "subtitle": "Mila design tuned to the bacteria that spoil beer"
      },
      {
        "category": "operational",
        "title": "Beer screening in ~2.5 h",
        "subtitle": "Direct workflow lets production release faster"
      },
      {
        "category": "operational",
        "title": "Protects shelf life",
        "subtitle": "Early bacterial detection prevents spoilage"
      }
    ],
    "rows": [
      {
        "feature": "Beer Bacteria Panel",
        "taag": "4 Lactobacillus/Pediococcus bacteria in 1 reaction",
        "leadingPcr": "A couple of targets per reaction",
        "traditional": "Slow selective culture",
        "businessImpact": "Covers the dominant beer-spoilage bacteria in one test, protecting batches before release."
      },
      {
        "feature": "Direct Savings",
        "taag": "4 targets in 1 reaction — ~75% fewer reactions",
        "leadingPcr": "Pays for a reaction per target",
        "traditional": "A full method per target",
        "businessImpact": "Running one reaction instead of 4 cuts reagent and consumable spend by about 75% per sample."
      },
      {
        "feature": "Operational Savings",
        "taag": "Less labor, equipment time & bench space",
        "leadingPcr": "More runs, more hands-on time",
        "traditional": "Heavy labor and incubator capacity",
        "businessImpact": "Fewer runs free up analyst hours, thermocycler capacity and bench space — letting the same team process more samples."
      },
      {
        "feature": "Cost per Result",
        "taag": "Lowest total cost of ownership",
        "leadingPcr": "Typically higher cost per target",
        "traditional": "High labor-driven cost",
        "businessImpact": "Beyond reagents, open instruments and free interpretation remove the equipment lock-in and software fees competitors charge."
      },
      {
        "feature": "Open Platform",
        "taag": "Runs on thermocyclers you already own",
        "leadingPcr": "Often a closed, proprietary ecosystem",
        "traditional": "Dedicated lab infrastructure",
        "businessImpact": "No instrument lock-in or forced capital purchase — deploy on existing equipment across sites."
      },
      {
        "feature": "Free AI Interpretation",
        "taag": "Automated result calling, included",
        "leadingPcr": "Interpretation often behind a paid subscription",
        "traditional": "Manual reading, analyst-dependent",
        "businessImpact": "Removes analyst subjectivity and a recurring software fee that competitors typically charge."
      }
    ]
  },
  "V-SF103": {
    "template": "Ampliora_Beer",
    "top_cards": [
      {
        "category": "technical",
        "title": "Strict-anaerobe spoilage panel",
        "subtitle": "Pectinatus, Megasphaera and relatives culture often misses"
      },
      {
        "category": "technical",
        "title": "Beer-specific panel design",
        "subtitle": "Mila design for hard-to-culture beer spoilers"
      },
      {
        "category": "operational",
        "title": "Catches what culture misses",
        "subtitle": "Detects anaerobes traditional methods often fail on"
      },
      {
        "category": "operational",
        "title": "Beer screening in ~2.5 h",
        "subtitle": "Direct workflow lets production release faster"
      }
    ],
    "rows": [
      {
        "feature": "Anaerobe Spoilage Panel",
        "taag": "Pectinatus, Megasphaera + relatives in 1 reaction",
        "leadingPcr": "A couple of targets per reaction",
        "traditional": "Anaerobe culture often fails",
        "businessImpact": "Targets the strict-anaerobe spoilers that culture often misses entirely — catching risk competitors' methods overlook."
      },
      {
        "feature": "Direct Savings",
        "taag": "4 targets in 1 reaction — ~75% fewer reactions",
        "leadingPcr": "Pays for a reaction per target",
        "traditional": "A full method per target",
        "businessImpact": "Running one reaction instead of 4 cuts reagent and consumable spend by about 75% per sample."
      },
      {
        "feature": "Operational Savings",
        "taag": "Less labor, equipment time & bench space",
        "leadingPcr": "More runs, more hands-on time",
        "traditional": "Heavy labor and incubator capacity",
        "businessImpact": "Fewer runs free up analyst hours, thermocycler capacity and bench space — letting the same team process more samples."
      },
      {
        "feature": "Cost per Result",
        "taag": "Lowest total cost of ownership",
        "leadingPcr": "Typically higher cost per target",
        "traditional": "High labor-driven cost",
        "businessImpact": "Beyond reagents, open instruments and free interpretation remove the equipment lock-in and software fees competitors charge."
      },
      {
        "feature": "Open Platform",
        "taag": "Runs on thermocyclers you already own",
        "leadingPcr": "Often a closed, proprietary ecosystem",
        "traditional": "Dedicated lab infrastructure",
        "businessImpact": "No instrument lock-in or forced capital purchase — deploy on existing equipment across sites."
      },
      {
        "feature": "Free AI Interpretation",
        "taag": "Automated result calling, included",
        "leadingPcr": "Interpretation often behind a paid subscription",
        "traditional": "Manual reading, analyst-dependent",
        "businessImpact": "Removes analyst subjectivity and a recurring software fee that competitors typically charge."
      }
    ]
  },
  "V-SF169": {
    "template": "Ampliora_Spoilage",
    "top_cards": [
      {
        "category": "technical",
        "title": "Four low-pH spoilage groups, one reaction",
        "subtitle": "Brettanomyces, acidophilic bacteria, PRY, yeasts and molds"
      },
      {
        "category": "technical",
        "title": "Built for acidified products",
        "subtitle": "Targets organisms that survive and spoil at low pH"
      },
      {
        "category": "operational",
        "title": "Protects shelf life",
        "subtitle": "Catches preservative-resistant spoilers early"
      },
      {
        "category": "operational",
        "title": "Fewer runs, lower cost",
        "subtitle": "Four spoilage groups in one assay"
      }
    ],
    "rows": [
      {
        "feature": "Low-pH Spoilage Panel",
        "taag": "4 acidophilic spoilage groups in one reaction",
        "leadingPcr": "Limited low-pH coverage",
        "traditional": "Slow selective culture, easily missed",
        "businessImpact": "Covers the preservative-resistant organisms that survive acidified products — the spoilers most likely to slip through standard checks."
      },
      {
        "feature": "Time to Results",
        "taag": "Fast, 52 hours",
        "leadingPcr": "72-96 hours",
        "traditional": "Slow, 5-7 days",
        "businessImpact": "Rapid results enable confident product release and fast corrective actions in the event of contamination, helping prevent cross-contamination."
      },
      {
        "feature": "Direct Savings",
        "taag": "4 targets in 1 reaction — ~80% fewer reactions",
        "leadingPcr": "Pays for a reaction per target",
        "traditional": "A full method per target",
        "businessImpact": "Running one reaction instead of 4 cuts reagent and consumable spend by about 80% per sample."
      },
      {
        "feature": "Operational Savings",
        "taag": "Less labor, equipment time & bench space",
        "leadingPcr": "More runs, more hands-on time",
        "traditional": "Heavy labor and incubator capacity",
        "businessImpact": "Fewer runs free up analyst hours, thermocycler capacity and bench space — letting the same team process more samples."
      },
      {
        "feature": "Cost per Result",
        "taag": "Lowest total cost of ownership",
        "leadingPcr": "Typically higher cost per target",
        "traditional": "High labor-driven cost",
        "businessImpact": "Beyond reagents, open instruments and free interpretation remove the equipment lock-in and software fees competitors charge."
      },
      {
        "feature": "Open Platform",
        "taag": "Runs on thermocyclers you already own",
        "leadingPcr": "Often a closed, proprietary ecosystem",
        "traditional": "Dedicated lab infrastructure",
        "businessImpact": "No instrument lock-in or forced capital purchase — deploy on existing equipment across sites."
      },
      {
        "feature": "Free AI Interpretation",
        "taag": "Automated result calling, included",
        "leadingPcr": "Interpretation often behind a paid subscription",
        "traditional": "Manual reading, analyst-dependent",
        "businessImpact": "Removes analyst subjectivity and a recurring software fee that competitors typically charge."
      }
    ]
  },
  "V-SF88": {
    "template": "Ampliora_Multiplex",
    "top_cards": [
      {
        "category": "technical",
        "title": "Six water indicators, one reaction",
        "subtitle": "Extended panel covering six indicator organisms together"
      },
      {
        "category": "technical",
        "title": "Mila AI primer design",
        "subtitle": "AI-designed primers for reliable water testing"
      },
      {
        "category": "operational",
        "title": "Comprehensive water control",
        "subtitle": "Broadest indicator coverage per sample"
      },
      {
        "category": "operational",
        "title": "Faster water release",
        "subtitle": "One assay clears multiple indicators"
      }
    ],
    "rows": [
      {
        "feature": "Broadest Water Panel",
        "taag": "6 water indicators in one reaction",
        "leadingPcr": "A few indicators per reaction",
        "traditional": "Separate culture per indicator",
        "businessImpact": "The widest indicator coverage per sample for water programs — one assay replaces up to six separate tests."
      },
      {
        "feature": "Direct Savings",
        "taag": "6 targets in 1 reaction — ~83% fewer reactions",
        "leadingPcr": "Pays for a reaction per target",
        "traditional": "A full method per target",
        "businessImpact": "Running one reaction instead of 6 cuts reagent and consumable spend by about 83% per sample."
      },
      {
        "feature": "Operational Savings",
        "taag": "Less labor, equipment time & bench space",
        "leadingPcr": "More runs, more hands-on time",
        "traditional": "Heavy labor and incubator capacity",
        "businessImpact": "Fewer runs free up analyst hours, thermocycler capacity and bench space — letting the same team process more samples."
      },
      {
        "feature": "Time to Result",
        "taag": "~2 h direct screening",
        "leadingPcr": "Slower enriched workflow",
        "traditional": "Multi-day culture",
        "businessImpact": "Rapid, comprehensive water clearance speeds process-water release decisions."
      },
      {
        "feature": "Cost per Result",
        "taag": "Lowest total cost of ownership",
        "leadingPcr": "Typically higher cost per target",
        "traditional": "High labor-driven cost",
        "businessImpact": "Beyond reagents, open instruments and free interpretation remove the equipment lock-in and software fees competitors charge."
      },
      {
        "feature": "Open Platform",
        "taag": "Runs on thermocyclers you already own",
        "leadingPcr": "Often a closed, proprietary ecosystem",
        "traditional": "Dedicated lab infrastructure",
        "businessImpact": "No instrument lock-in or forced capital purchase — deploy on existing equipment across sites."
      },
      {
        "feature": "Free AI Interpretation",
        "taag": "Automated result calling, included",
        "leadingPcr": "Interpretation often behind a paid subscription",
        "traditional": "Manual reading, analyst-dependent",
        "businessImpact": "Removes analyst subjectivity and a recurring software fee that competitors typically charge."
      }
    ]
  },
  "V-SF64": {
    "template": "Ampliora_Beer",
    "top_cards": [
      {
        "category": "technical",
        "title": "Eight beer yeasts, one reaction",
        "subtitle": "Comprehensive yeast panel in a single assay"
      },
      {
        "category": "technical",
        "title": "Beer-specific panel design",
        "subtitle": "Mila design covering the full beer-yeast risk profile"
      },
      {
        "category": "operational",
        "title": "Complete yeast coverage",
        "subtitle": "One assay where you'd otherwise run several"
      },
      {
        "category": "operational",
        "title": "Beer screening in ~2.5 h",
        "subtitle": "Direct workflow speeds release"
      }
    ],
    "rows": [
      {
        "feature": "Complete Yeast Panel",
        "taag": "8 beer-spoilage yeasts in one reaction",
        "leadingPcr": "A few yeasts per reaction",
        "traditional": "Slow selective yeast culture",
        "businessImpact": "The full beer-yeast risk profile in a single test — one assay where you'd otherwise run several."
      },
      {
        "feature": "Direct Savings",
        "taag": "8 targets in 1 reaction — ~89% fewer reactions",
        "leadingPcr": "Pays for a reaction per target",
        "traditional": "A full method per target",
        "businessImpact": "Running one reaction instead of 8 cuts reagent and consumable spend by about 89% per sample."
      },
      {
        "feature": "Operational Savings",
        "taag": "Less labor, equipment time & bench space",
        "leadingPcr": "More runs, more hands-on time",
        "traditional": "Heavy labor and incubator capacity",
        "businessImpact": "Fewer runs free up analyst hours, thermocycler capacity and bench space — letting the same team process more samples."
      },
      {
        "feature": "Cost per Result",
        "taag": "Lowest total cost of ownership",
        "leadingPcr": "Typically higher cost per target",
        "traditional": "High labor-driven cost",
        "businessImpact": "Beyond reagents, open instruments and free interpretation remove the equipment lock-in and software fees competitors charge."
      },
      {
        "feature": "Open Platform",
        "taag": "Runs on thermocyclers you already own",
        "leadingPcr": "Often a closed, proprietary ecosystem",
        "traditional": "Dedicated lab infrastructure",
        "businessImpact": "No instrument lock-in or forced capital purchase — deploy on existing equipment across sites."
      },
      {
        "feature": "Free AI Interpretation",
        "taag": "Automated result calling, included",
        "leadingPcr": "Interpretation often behind a paid subscription",
        "traditional": "Manual reading, analyst-dependent",
        "businessImpact": "Removes analyst subjectivity and a recurring software fee that competitors typically charge."
      }
    ]
  },
  "V-SF99": {
    "template": "Ampliora_Beer",
    "top_cards": [
      {
        "category": "technical",
        "title": "Eight beer bacteria, one reaction",
        "subtitle": "Comprehensive bacterial panel including hard-to-culture anaerobes"
      },
      {
        "category": "technical",
        "title": "Beer-specific panel design",
        "subtitle": "Mila design covering the full beer-bacteria risk profile"
      },
      {
        "category": "operational",
        "title": "Complete bacterial coverage",
        "subtitle": "One assay where you'd otherwise run several"
      },
      {
        "category": "operational",
        "title": "Beer screening in ~2.5 h",
        "subtitle": "Direct workflow speeds release"
      }
    ],
    "rows": [
      {
        "feature": "Complete Bacteria Panel",
        "taag": "8 beer-spoilage bacteria in one reaction",
        "leadingPcr": "A few targets per reaction",
        "traditional": "Slow, often-failing anaerobe culture",
        "businessImpact": "The full beer-bacteria risk profile in a single test, including hard-to-culture anaerobes — one assay replaces many."
      },
      {
        "feature": "Direct Savings",
        "taag": "8 targets in 1 reaction — ~89% fewer reactions",
        "leadingPcr": "Pays for a reaction per target",
        "traditional": "A full method per target",
        "businessImpact": "Running one reaction instead of 8 cuts reagent and consumable spend by about 89% per sample."
      },
      {
        "feature": "Operational Savings",
        "taag": "Less labor, equipment time & bench space",
        "leadingPcr": "More runs, more hands-on time",
        "traditional": "Heavy labor and incubator capacity",
        "businessImpact": "Fewer runs free up analyst hours, thermocycler capacity and bench space — letting the same team process more samples."
      },
      {
        "feature": "Cost per Result",
        "taag": "Lowest total cost of ownership",
        "leadingPcr": "Typically higher cost per target",
        "traditional": "High labor-driven cost",
        "businessImpact": "Beyond reagents, open instruments and free interpretation remove the equipment lock-in and software fees competitors charge."
      },
      {
        "feature": "Open Platform",
        "taag": "Runs on thermocyclers you already own",
        "leadingPcr": "Often a closed, proprietary ecosystem",
        "traditional": "Dedicated lab infrastructure",
        "businessImpact": "No instrument lock-in or forced capital purchase — deploy on existing equipment across sites."
      },
      {
        "feature": "Free AI Interpretation",
        "taag": "Automated result calling, included",
        "leadingPcr": "Interpretation often behind a paid subscription",
        "traditional": "Manual reading, analyst-dependent",
        "businessImpact": "Removes analyst subjectivity and a recurring software fee that competitors typically charge."
      }
    ]
  },
  "V-PAT04": {
    "template": "Elevia_Monoplex",
    "top_cards": [
      {
        "category": "technical",
        "title": "RNA targets viable cells",
        "subtitle": "AiGOR amplifies RNA from living Salmonella only — dead cells don't trigger false positives"
      },
      {
        "category": "technical",
        "title": "10,000x more sensitive",
        "subtitle": "Detects Salmonella at far lower loads than standard DNA PCR"
      },
      {
        "category": "operational",
        "title": "Same-day release",
        "subtitle": "~3 h on surfaces, ~9 h on finished product — both within one shift"
      },
      {
        "category": "operational",
        "title": "Frees held inventory",
        "subtitle": "Less product sits in quarantine waiting on micro results"
      }
    ],
    "rows": [
      {
        "feature": "Speed (AiGOR RNA)",
        "taag": "Salmonella result in ~3 h, same-day release",
        "leadingPcr": "~24 h enriched workflow",
        "traditional": "Multi-day culture (2–5 days)",
        "businessImpact": "Same-day Salmonella clearance means finished product ships without waiting overnight on micro."
      },
      {
        "feature": "Sensitivity",
        "taag": "RNA targets viable cells, 10,000x sensitivity",
        "leadingPcr": "DNA-based: can detect dead cells",
        "traditional": "Limited by culture recovery",
        "businessImpact": "Catches living Salmonella at far lower loads and avoids dead-cell false positives that cause costly holds."
      },
      {
        "feature": "Cost per Result",
        "taag": "Lower price + less inventory held",
        "leadingPcr": "Typically higher cost per target",
        "traditional": "High labor-driven cost",
        "businessImpact": "Priced below leading platforms and runs on open instruments — and because results land in ~3 h, far less finished product sits in costly quarantine."
      },
      {
        "feature": "Open Platform",
        "taag": "Runs on thermocyclers you already own",
        "leadingPcr": "Often a closed, proprietary ecosystem",
        "traditional": "Dedicated lab infrastructure",
        "businessImpact": "No instrument lock-in or forced capital purchase — deploy on existing equipment across sites."
      },
      {
        "feature": "Free AI Interpretation",
        "taag": "Automated result calling, included",
        "leadingPcr": "Interpretation often behind a paid subscription",
        "traditional": "Manual reading, analyst-dependent",
        "businessImpact": "Removes analyst subjectivity and a recurring software fee that competitors typically charge."
      }
    ]
  },
  "V-PAT07": {
    "template": "Elevia_Multiplex",
    "top_cards": [
      {
        "category": "technical",
        "title": "RNA targets viable cells",
        "subtitle": "AiGOR detects living Salmonella and Listeria — dead cells don't cause false positives"
      },
      {
        "category": "technical",
        "title": "Two pathogens, 10,000x sensitivity",
        "subtitle": "Both targets at ultra-low loads in one RNA reaction"
      },
      {
        "category": "operational",
        "title": "Same-day release",
        "subtitle": "~4 h on surfaces, ~9 h on finished product — within one shift"
      },
      {
        "category": "operational",
        "title": "Two pathogens, one fast assay",
        "subtitle": "Salmonella and Listeria cleared together to speed release"
      }
    ],
    "rows": [
      {
        "feature": "Speed (AiGOR RNA)",
        "taag": "Salmonella + Listeria in ~4 h, same-day release",
        "leadingPcr": "~24 h enriched workflow",
        "traditional": "Multi-day culture (2–5 days)",
        "businessImpact": "Two top pathogens cleared the same day — finished product ships without an overnight micro hold."
      },
      {
        "feature": "Sensitivity",
        "taag": "RNA targets viable cells, 10,000x sensitivity",
        "leadingPcr": "DNA-based: can detect dead cells",
        "traditional": "Limited by culture recovery",
        "businessImpact": "Detects living contamination earlier and avoids dead-cell false positives that trigger needless holds."
      },
      {
        "feature": "Direct Savings",
        "taag": "2 targets in 1 reaction — ~50% fewer reactions",
        "leadingPcr": "Pays for a reaction per target",
        "traditional": "A full method per target",
        "businessImpact": "Running one reaction instead of 2 cuts reagent and consumable spend by about 50% per sample."
      },
      {
        "feature": "Operational Savings",
        "taag": "Less labor, equipment time & bench space",
        "leadingPcr": "More runs, more hands-on time",
        "traditional": "Heavy labor and incubator capacity",
        "businessImpact": "Fewer runs free up analyst hours, thermocycler capacity and bench space — letting the same team process more samples."
      },
      {
        "feature": "Cost per Result",
        "taag": "Lowest total cost of ownership",
        "leadingPcr": "Typically higher cost per target",
        "traditional": "High labor-driven cost",
        "businessImpact": "Beyond reagents, open instruments and free interpretation remove the equipment lock-in and software fees competitors charge."
      },
      {
        "feature": "Open Platform",
        "taag": "Runs on thermocyclers you already own",
        "leadingPcr": "Often a closed, proprietary ecosystem",
        "traditional": "Dedicated lab infrastructure",
        "businessImpact": "No instrument lock-in or forced capital purchase — deploy on existing equipment across sites."
      },
      {
        "feature": "Free AI Interpretation",
        "taag": "Automated result calling, included",
        "leadingPcr": "Interpretation often behind a paid subscription",
        "traditional": "Manual reading, analyst-dependent",
        "businessImpact": "Removes analyst subjectivity and a recurring software fee that competitors typically charge."
      }
    ]
  },
  "V-PAT06": {
    "template": "Elevia_Multiplex",
    "top_cards": [
      {
        "category": "technical",
        "title": "Pathogen + hygiene indicator",
        "subtitle": "Salmonella plus Enterobacteria as a process-hygiene indicator in one RNA assay"
      },
      {
        "category": "technical",
        "title": "RNA, 10,000x sensitivity",
        "subtitle": "AiGOR targets viable cells for ultra-sensitive detection"
      },
      {
        "category": "operational",
        "title": "Prevent, don't react",
        "subtitle": "Enterobacteria flags hygiene drift before it becomes a Salmonella event"
      },
      {
        "category": "operational",
        "title": "Same-day release",
        "subtitle": "~3 h on surfaces, ~9 h on finished product — within one shift"
      }
    ],
    "rows": [
      {
        "feature": "Prevention Indicator",
        "taag": "Pathogen + hygiene indicator in one RNA assay",
        "leadingPcr": "Pathogen detection only, no process indicator",
        "traditional": "A separate indicator test, days later",
        "businessImpact": "Enterobacteria flags hygiene drift before it becomes a Salmonella event — you prevent problems instead of reacting to recalls."
      },
      {
        "feature": "Speed (AiGOR RNA)",
        "taag": "Result in ~3 h, same-day release",
        "leadingPcr": "~24 h enriched workflow",
        "traditional": "Multi-day culture (2–5 days)",
        "businessImpact": "Finished product cleared and shipped the same day — inventory barely pauses for micro."
      },
      {
        "feature": "Sensitivity",
        "taag": "RNA targets viable cells, 10,000x sensitivity",
        "leadingPcr": "DNA-based: can detect dead cells",
        "traditional": "Limited by culture recovery",
        "businessImpact": "Detects living contamination far earlier and avoids dead-cell false positives that trigger needless holds."
      },
      {
        "feature": "Direct Savings",
        "taag": "2 targets in 1 reaction — ~50% fewer reactions",
        "leadingPcr": "Pays for a reaction per target",
        "traditional": "A full method per target",
        "businessImpact": "Running one reaction instead of two cuts reagent and consumable spend by about half per sample."
      },
      {
        "feature": "Operational Savings",
        "taag": "Less labor, equipment time & bench space",
        "leadingPcr": "More runs, more hands-on time",
        "traditional": "Heavy labor and incubator capacity",
        "businessImpact": "Fewer runs free up analyst hours, thermocycler capacity and bench space — letting the same team process more samples."
      },
      {
        "feature": "Cost per Result",
        "taag": "Lowest total cost of ownership",
        "leadingPcr": "Typically higher cost per target",
        "traditional": "High labor-driven cost",
        "businessImpact": "Beyond reagents, open instruments and free interpretation remove the equipment lock-in and software fees competitors charge."
      },
      {
        "feature": "Open Platform",
        "taag": "Runs on thermocyclers you already own",
        "leadingPcr": "Often a closed, proprietary ecosystem",
        "traditional": "Dedicated lab infrastructure",
        "businessImpact": "No instrument lock-in or forced capital purchase — deploy on existing equipment across sites."
      },
      {
        "feature": "Free AI Interpretation",
        "taag": "Automated result calling, included",
        "leadingPcr": "Interpretation often behind a paid subscription",
        "traditional": "Manual reading, analyst-dependent",
        "businessImpact": "Removes analyst subjectivity and a recurring software fee that competitors typically charge."
      }
    ]
  },
  "V-SF14": {
    "template": "Specio_Spoilage",
    "top_cards": [
      {
        "category": "technical",
        "title": "80+ bacteria in one reaction",
        "subtitle": "KAi melting-curve identifies a vast spoilage-bacteria range no competitor matches"
      },
      {
        "category": "technical",
        "title": "AI melting-curve engine",
        "subtitle": "Single-channel analysis is what makes 80+ targets per tube possible"
      },
      {
        "category": "operational",
        "title": "Replaces whole panels",
        "subtitle": "One assay covers what would take many separate spoilage tests"
      },
      {
        "category": "operational",
        "title": "Protects shelf life",
        "subtitle": "Broad early detection prevents spoilage losses and complaints"
      }
    ],
    "rows": [
      {
        "feature": "Simultaneous Coverage",
        "taag": "80+ spoilage bacteria in one reaction",
        "leadingPcr": "A handful of targets per reaction",
        "traditional": "One organism per plate, days of work",
        "businessImpact": "One test screens your entire bacterial spoilage risk — no competitor matches this breadth, so you replace whole panels of separate assays."
      },
      {
        "feature": "Detection Technology",
        "taag": "KAi melting-curve analysis with AI",
        "leadingPcr": "Probe-based, capped at a few targets",
        "traditional": "Phenotypic ID, slow and subjective",
        "businessImpact": "AI melting-curve calling is what makes 80+ organisms in one tube possible — the engine behind the coverage."
      },
      {
        "feature": "Time to Result",
        "taag": "~26 h vs days of culture",
        "leadingPcr": "Limited spoilage coverage",
        "traditional": "Multi-day culture (3–7 days)",
        "businessImpact": "Spoilage answer in about a day instead of a week frees product and warehouse space far sooner."
      },
      {
        "feature": "Direct Savings",
        "taag": "80+ organisms in 1 reaction",
        "leadingPcr": "Pays for many separate reactions",
        "traditional": "A culture method per organism",
        "businessImpact": "Screening 80+ bacterial spoilers in one reaction replaces whole panels of assays — a step-change drop in reagent and consumable spend per sample."
      },
      {
        "feature": "Operational Savings",
        "taag": "Far less labor, equipment time & bench space",
        "leadingPcr": "Many runs, heavy hands-on time",
        "traditional": "Massive labor and incubator capacity",
        "businessImpact": "Collapsing a bacterial spoilage panel into one run frees major analyst time, instrument capacity and bench space."
      },
      {
        "feature": "Cost per Result",
        "taag": "Lowest total cost of ownership",
        "leadingPcr": "Typically higher cost per target",
        "traditional": "High labor-driven cost",
        "businessImpact": "Beyond reagents, open instruments and free interpretation remove the equipment lock-in and software fees competitors charge."
      },
      {
        "feature": "Open Platform",
        "taag": "Runs on thermocyclers you already own",
        "leadingPcr": "Often a closed, proprietary ecosystem",
        "traditional": "Dedicated lab infrastructure",
        "businessImpact": "No instrument lock-in or forced capital purchase — deploy on existing equipment across sites."
      },
      {
        "feature": "Free AI Interpretation",
        "taag": "Automated result calling, included",
        "leadingPcr": "Interpretation often behind a paid subscription",
        "traditional": "Manual reading, analyst-dependent",
        "businessImpact": "Removes analyst subjectivity and a recurring software fee that competitors typically charge."
      }
    ]
  },
  "V-SF15": {
    "template": "Specio_Spoilage",
    "top_cards": [
      {
        "category": "technical",
        "title": "50+ yeasts & molds in one reaction",
        "subtitle": "KAi melting-curve covers a fungal range no competitor matches"
      },
      {
        "category": "technical",
        "title": "AI melting-curve engine",
        "subtitle": "Single-channel analysis enables 50+ fungal targets per tube"
      },
      {
        "category": "operational",
        "title": "Replaces whole panels",
        "subtitle": "One assay covers what would take many separate fungal tests"
      },
      {
        "category": "operational",
        "title": "Days faster than culture",
        "subtitle": "Molds can take a week to grow; this answers in hours"
      }
    ],
    "rows": [
      {
        "feature": "Simultaneous Coverage",
        "taag": "50+ spoilage yeasts & molds in one reaction",
        "leadingPcr": "A handful of targets per reaction",
        "traditional": "One organism per plate, days of work",
        "businessImpact": "One test screens your entire fungal spoilage risk — no competitor offers this breadth, replacing multiple separate assays."
      },
      {
        "feature": "Detection Technology",
        "taag": "KAi melting-curve analysis with AI",
        "leadingPcr": "Probe-based, capped at a few targets",
        "traditional": "Slow fungal culture and morphology ID",
        "businessImpact": "AI melting-curve calling is what enables 50+ fungi in one tube — the engine behind the coverage."
      },
      {
        "feature": "Time to Result",
        "taag": "Days faster than fungal culture",
        "leadingPcr": "Limited fungal coverage",
        "traditional": "Fungal culture (5–7+ days)",
        "businessImpact": "Molds can take a week to grow; a molecular answer slashes that wait and frees product sooner."
      },
      {
        "feature": "Direct Savings",
        "taag": "50+ organisms in 1 reaction",
        "leadingPcr": "Pays for many separate reactions",
        "traditional": "A culture method per organism",
        "businessImpact": "Screening 50+ fungal spoilers in one reaction replaces whole panels of assays — a step-change drop in reagent and consumable spend per sample."
      },
      {
        "feature": "Operational Savings",
        "taag": "Far less labor, equipment time & bench space",
        "leadingPcr": "Many runs, heavy hands-on time",
        "traditional": "Massive labor and incubator capacity",
        "businessImpact": "Collapsing a fungal spoilage panel into one run frees major analyst time, instrument capacity and bench space."
      },
      {
        "feature": "Cost per Result",
        "taag": "Lowest total cost of ownership",
        "leadingPcr": "Typically higher cost per target",
        "traditional": "High labor-driven cost",
        "businessImpact": "Beyond reagents, open instruments and free interpretation remove the equipment lock-in and software fees competitors charge."
      },
      {
        "feature": "Open Platform",
        "taag": "Runs on thermocyclers you already own",
        "leadingPcr": "Often a closed, proprietary ecosystem",
        "traditional": "Dedicated lab infrastructure",
        "businessImpact": "No instrument lock-in or forced capital purchase — deploy on existing equipment across sites."
      },
      {
        "feature": "Free AI Interpretation",
        "taag": "Automated result calling, included",
        "leadingPcr": "Interpretation often behind a paid subscription",
        "traditional": "Manual reading, analyst-dependent",
        "businessImpact": "Removes analyst subjectivity and a recurring software fee that competitors typically charge."
      }
    ]
  },
  "V-SF31": {
    "template": "Specio_Pathogens",
    "top_cards": [
      {
        "category": "technical",
        "title": "KAi melting-curve detection",
        "subtitle": "Specific Salmonella identification by AI melting-curve analysis"
      },
      {
        "category": "technical",
        "title": "FAM-only simplicity",
        "subtitle": "Single-channel detection runs on basic open thermocyclers"
      },
      {
        "category": "operational",
        "title": "Faster lot release",
        "subtitle": "Molecular result ready well before culture confirmation"
      },
      {
        "category": "operational",
        "title": "Lower price, open platform",
        "subtitle": "Below leading systems, no proprietary instrument"
      }
    ],
    "rows": [
      {
        "feature": "Time to Result",
        "taag": "Molecular Salmonella result, ~26 h",
        "leadingPcr": "Comparable enriched PCR",
        "traditional": "Multi-day culture (2–5 days)",
        "businessImpact": "Salmonella answer in about a day versus culture's 2–5, releasing product sooner."
      },
      {
        "feature": "Detection Technology",
        "taag": "KAi melting-curve analysis",
        "leadingPcr": "Probe-based detection",
        "traditional": "Phenotypic ID, slow",
        "businessImpact": "Melting-curve identification gives specific Salmonella calls on a simple single-channel setup."
      },
      {
        "feature": "Cost per Result",
        "taag": "Lower price, open instruments",
        "leadingPcr": "Typically higher cost per target",
        "traditional": "High labor-driven cost",
        "businessImpact": "Priced below leading platforms and runs on thermocyclers you already own — no proprietary equipment or interpretation-software fees."
      },
      {
        "feature": "Open Platform",
        "taag": "Runs on thermocyclers you already own",
        "leadingPcr": "Often a closed, proprietary ecosystem",
        "traditional": "Dedicated lab infrastructure",
        "businessImpact": "No instrument lock-in or forced capital purchase — deploy on existing equipment across sites."
      },
      {
        "feature": "Free AI Interpretation",
        "taag": "Automated result calling, included",
        "leadingPcr": "Interpretation often behind a paid subscription",
        "traditional": "Manual reading, analyst-dependent",
        "businessImpact": "Removes analyst subjectivity and a recurring software fee that competitors typically charge."
      }
    ]
  },
  "V-SF39": {
    "template": "Specio_Pathogens",
    "top_cards": [
      {
        "category": "technical",
        "title": "KAi melting-curve detection",
        "subtitle": "Specific S. aureus identification by AI melting-curve analysis"
      },
      {
        "category": "technical",
        "title": "FAM-only simplicity",
        "subtitle": "Single-channel detection runs on basic open thermocyclers"
      },
      {
        "category": "operational",
        "title": "Faster hygiene verification",
        "subtitle": "Quick result speeds sanitation decisions"
      },
      {
        "category": "operational",
        "title": "Lower price, open platform",
        "subtitle": "Below leading systems, no proprietary instrument"
      }
    ],
    "rows": [
      {
        "feature": "Time to Result",
        "taag": "Molecular S. aureus result, ~26 h",
        "leadingPcr": "Comparable enriched PCR",
        "traditional": "Multi-day culture",
        "businessImpact": "Rapid S. aureus answer speeds hygiene and release decisions versus multi-day culture."
      },
      {
        "feature": "Detection Technology",
        "taag": "KAi melting-curve analysis",
        "leadingPcr": "Probe-based detection",
        "traditional": "Phenotypic ID, slow",
        "businessImpact": "Melting-curve identification gives specific calls on a simple single-channel setup."
      },
      {
        "feature": "Cost per Result",
        "taag": "Lower price, open instruments",
        "leadingPcr": "Typically higher cost per target",
        "traditional": "High labor-driven cost",
        "businessImpact": "Priced below leading platforms and runs on thermocyclers you already own — no proprietary equipment or interpretation-software fees."
      },
      {
        "feature": "Open Platform",
        "taag": "Runs on thermocyclers you already own",
        "leadingPcr": "Often a closed, proprietary ecosystem",
        "traditional": "Dedicated lab infrastructure",
        "businessImpact": "No instrument lock-in or forced capital purchase — deploy on existing equipment across sites."
      },
      {
        "feature": "Free AI Interpretation",
        "taag": "Automated result calling, included",
        "leadingPcr": "Interpretation often behind a paid subscription",
        "traditional": "Manual reading, analyst-dependent",
        "businessImpact": "Removes analyst subjectivity and a recurring software fee that competitors typically charge."
      }
    ]
  },
  "V-SF167": {
    "template": "Specio_Pathogens",
    "top_cards": [
      {
        "category": "technical",
        "title": "KAi melting-curve detection",
        "subtitle": "Specific E. coli identification by AI melting-curve analysis"
      },
      {
        "category": "technical",
        "title": "FAM-only simplicity",
        "subtitle": "Single-channel detection runs on basic open thermocyclers"
      },
      {
        "category": "operational",
        "title": "Faster hygiene verification",
        "subtitle": "Quick indicator result speeds sanitation decisions"
      },
      {
        "category": "operational",
        "title": "Lower price, open platform",
        "subtitle": "Below leading systems, no proprietary instrument"
      }
    ],
    "rows": [
      {
        "feature": "Time to Result",
        "taag": "Molecular E. coli result, ~26 h",
        "leadingPcr": "Comparable enriched PCR",
        "traditional": "Multi-day culture",
        "businessImpact": "Quick indicator answer speeds sanitation decisions versus multi-day culture."
      },
      {
        "feature": "Detection Technology",
        "taag": "KAi melting-curve analysis",
        "leadingPcr": "Probe-based detection",
        "traditional": "Phenotypic ID, slow",
        "businessImpact": "Melting-curve identification gives specific E. coli calls on a simple single-channel setup."
      },
      {
        "feature": "Cost per Result",
        "taag": "Lower price, open instruments",
        "leadingPcr": "Typically higher cost per target",
        "traditional": "High labor-driven cost",
        "businessImpact": "Priced below leading platforms and runs on thermocyclers you already own — no proprietary equipment or interpretation-software fees."
      },
      {
        "feature": "Open Platform",
        "taag": "Runs on thermocyclers you already own",
        "leadingPcr": "Often a closed, proprietary ecosystem",
        "traditional": "Dedicated lab infrastructure",
        "businessImpact": "No instrument lock-in or forced capital purchase — deploy on existing equipment across sites."
      },
      {
        "feature": "Free AI Interpretation",
        "taag": "Automated result calling, included",
        "leadingPcr": "Interpretation often behind a paid subscription",
        "traditional": "Manual reading, analyst-dependent",
        "businessImpact": "Removes analyst subjectivity and a recurring software fee that competitors typically charge."
      }
    ]
  },
  "V-SF28": {
    "template": "Specio_Pathogens",
    "top_cards": [
      {
        "category": "technical",
        "title": "KAi melting-curve detection",
        "subtitle": "Specific L. monocytogenes identification by AI melting-curve"
      },
      {
        "category": "technical",
        "title": "FAM-only simplicity",
        "subtitle": "Single-channel detection runs on basic open thermocyclers"
      },
      {
        "category": "operational",
        "title": "Faster environmental monitoring",
        "subtitle": "Quick result clears Listeria status for line release"
      },
      {
        "category": "operational",
        "title": "Protects the brand",
        "subtitle": "Reliable pathogen control lowers recall risk"
      }
    ],
    "rows": [
      {
        "feature": "Time to Result",
        "taag": "L. monocytogenes result in ~2 h",
        "leadingPcr": "Slower enriched workflow",
        "traditional": "Multi-day culture",
        "businessImpact": "Fast pathogen clearance speeds line release and environmental monitoring decisions."
      },
      {
        "feature": "Detection Technology",
        "taag": "KAi melting-curve analysis",
        "leadingPcr": "Probe-based detection",
        "traditional": "Phenotypic ID, slow",
        "businessImpact": "Melting-curve identification gives specific L. monocytogenes calls on a simple setup."
      },
      {
        "feature": "Cost per Result",
        "taag": "Lower price, open instruments",
        "leadingPcr": "Typically higher cost per target",
        "traditional": "High labor-driven cost",
        "businessImpact": "Priced below leading platforms and runs on thermocyclers you already own — no proprietary equipment or interpretation-software fees."
      },
      {
        "feature": "Open Platform",
        "taag": "Runs on thermocyclers you already own",
        "leadingPcr": "Often a closed, proprietary ecosystem",
        "traditional": "Dedicated lab infrastructure",
        "businessImpact": "No instrument lock-in or forced capital purchase — deploy on existing equipment across sites."
      },
      {
        "feature": "Free AI Interpretation",
        "taag": "Automated result calling, included",
        "leadingPcr": "Interpretation often behind a paid subscription",
        "traditional": "Manual reading, analyst-dependent",
        "businessImpact": "Removes analyst subjectivity and a recurring software fee that competitors typically charge."
      }
    ]
  },
  "V-SF45": {
    "template": "Specio_Spoilage",
    "top_cards": [
      {
        "category": "technical",
        "title": "Targets a key spoilage yeast",
        "subtitle": "Z. bailii/parabailii — a major preservative-resistant spoiler"
      },
      {
        "category": "technical",
        "title": "KAi melting-curve detection",
        "subtitle": "Specific identification by AI melting-curve analysis"
      },
      {
        "category": "operational",
        "title": "Protects shelf life",
        "subtitle": "Early detection prevents spoilage in acidified products"
      },
      {
        "category": "operational",
        "title": "Lower price, open platform",
        "subtitle": "Below leading systems, no proprietary instrument"
      }
    ],
    "rows": [
      {
        "feature": "Key Spoilage Yeast",
        "taag": "Z. bailii / parabailii detection",
        "leadingPcr": "Often not specifically covered",
        "traditional": "Slow selective culture",
        "businessImpact": "Targets the preservative-resistant yeast most likely to spoil acidified products and slip past standard checks."
      },
      {
        "feature": "Detection Technology",
        "taag": "KAi melting-curve analysis",
        "leadingPcr": "Probe-based detection",
        "traditional": "Phenotypic ID, slow",
        "businessImpact": "Melting-curve identification gives specific yeast calls on a simple single-channel setup."
      },
      {
        "feature": "Cost per Result",
        "taag": "Lower price, open instruments",
        "leadingPcr": "Typically higher cost per target",
        "traditional": "High labor-driven cost",
        "businessImpact": "Priced below leading platforms and runs on thermocyclers you already own — no proprietary equipment or interpretation-software fees."
      },
      {
        "feature": "Open Platform",
        "taag": "Runs on thermocyclers you already own",
        "leadingPcr": "Often a closed, proprietary ecosystem",
        "traditional": "Dedicated lab infrastructure",
        "businessImpact": "No instrument lock-in or forced capital purchase — deploy on existing equipment across sites."
      },
      {
        "feature": "Free AI Interpretation",
        "taag": "Automated result calling, included",
        "leadingPcr": "Interpretation often behind a paid subscription",
        "traditional": "Manual reading, analyst-dependent",
        "businessImpact": "Removes analyst subjectivity and a recurring software fee that competitors typically charge."
      }
    ]
  },
  "V-SF52": {
    "template": "Specio_Pathogens",
    "top_cards": [
      {
        "category": "technical",
        "title": "KAi melting-curve detection",
        "subtitle": "Specific Listeria spp. identification by AI melting-curve"
      },
      {
        "category": "technical",
        "title": "FAM-only simplicity",
        "subtitle": "Single-channel detection runs on basic open thermocyclers"
      },
      {
        "category": "operational",
        "title": "Faster environmental monitoring",
        "subtitle": "Result before culture confirmation speeds decisions"
      },
      {
        "category": "operational",
        "title": "Lower price, open platform",
        "subtitle": "Below leading systems, no proprietary instrument"
      }
    ],
    "rows": [
      {
        "feature": "Time to Result",
        "taag": "Molecular Listeria result, ~29 h",
        "leadingPcr": "Comparable enriched PCR",
        "traditional": "Multi-day culture",
        "businessImpact": "Listeria answer well before culture confirmation speeds environmental decisions."
      },
      {
        "feature": "Detection Technology",
        "taag": "KAi melting-curve analysis",
        "leadingPcr": "Probe-based detection",
        "traditional": "Phenotypic ID, slow",
        "businessImpact": "Melting-curve identification gives specific Listeria calls on a simple single-channel setup."
      },
      {
        "feature": "Cost per Result",
        "taag": "Lower price, open instruments",
        "leadingPcr": "Typically higher cost per target",
        "traditional": "High labor-driven cost",
        "businessImpact": "Priced below leading platforms and runs on thermocyclers you already own — no proprietary equipment or interpretation-software fees."
      },
      {
        "feature": "Open Platform",
        "taag": "Runs on thermocyclers you already own",
        "leadingPcr": "Often a closed, proprietary ecosystem",
        "traditional": "Dedicated lab infrastructure",
        "businessImpact": "No instrument lock-in or forced capital purchase — deploy on existing equipment across sites."
      },
      {
        "feature": "Free AI Interpretation",
        "taag": "Automated result calling, included",
        "leadingPcr": "Interpretation often behind a paid subscription",
        "traditional": "Manual reading, analyst-dependent",
        "businessImpact": "Removes analyst subjectivity and a recurring software fee that competitors typically charge."
      }
    ]
  },
  "V-SF07": {
    "template": "Specio_Pathogens",
    "top_cards": [
      {
        "category": "technical",
        "title": "Two indicators, one reaction",
        "subtitle": "S. aureus and E. coli detected together via KAi melting-curve"
      },
      {
        "category": "technical",
        "title": "FAM-only simplicity",
        "subtitle": "Single-channel detection runs on basic open thermocyclers"
      },
      {
        "category": "operational",
        "title": "Broader hygiene per test",
        "subtitle": "Two key indicators cleared in one workflow"
      },
      {
        "category": "operational",
        "title": "Fewer runs, lower cost",
        "subtitle": "One assay instead of two per sample"
      }
    ],
    "rows": [
      {
        "feature": "Two Indicators Together",
        "taag": "S. aureus + E. coli in 1 reaction",
        "leadingPcr": "Often one target per reaction",
        "traditional": "2 separate methods",
        "businessImpact": "Two key hygiene indicators in one test broadens monitoring per sample."
      },
      {
        "feature": "Direct Savings",
        "taag": "2 targets in 1 reaction — ~50% fewer reactions",
        "leadingPcr": "Pays for a reaction per target",
        "traditional": "A full method per target",
        "businessImpact": "Running one reaction instead of 2 cuts reagent and consumable spend by about 50% per sample."
      },
      {
        "feature": "Operational Savings",
        "taag": "Less labor, equipment time & bench space",
        "leadingPcr": "More runs, more hands-on time",
        "traditional": "Heavy labor and incubator capacity",
        "businessImpact": "Fewer runs free up analyst hours, thermocycler capacity and bench space — letting the same team process more samples."
      },
      {
        "feature": "Cost per Result",
        "taag": "Lowest total cost of ownership",
        "leadingPcr": "Typically higher cost per target",
        "traditional": "High labor-driven cost",
        "businessImpact": "Beyond reagents, open instruments and free interpretation remove the equipment lock-in and software fees competitors charge."
      },
      {
        "feature": "Open Platform",
        "taag": "Runs on thermocyclers you already own",
        "leadingPcr": "Often a closed, proprietary ecosystem",
        "traditional": "Dedicated lab infrastructure",
        "businessImpact": "No instrument lock-in or forced capital purchase — deploy on existing equipment across sites."
      },
      {
        "feature": "Free AI Interpretation",
        "taag": "Automated result calling, included",
        "leadingPcr": "Interpretation often behind a paid subscription",
        "traditional": "Manual reading, analyst-dependent",
        "businessImpact": "Removes analyst subjectivity and a recurring software fee that competitors typically charge."
      }
    ]
  },
  "V-SF04": {
    "template": "Specio_Pathogens",
    "top_cards": [
      {
        "category": "technical",
        "title": "Species + genus in one reaction",
        "subtitle": "L. monocytogenes vs Listeria spp. distinguished via melting-curve"
      },
      {
        "category": "technical",
        "title": "FAM-only simplicity",
        "subtitle": "Single-channel detection runs on basic open thermocyclers"
      },
      {
        "category": "operational",
        "title": "Sharper risk decisions",
        "subtitle": "Species-level result guides the right corrective action"
      },
      {
        "category": "operational",
        "title": "Fewer runs, lower cost",
        "subtitle": "One assay clears Listeria status"
      }
    ],
    "rows": [
      {
        "feature": "Species + Genus Together",
        "taag": "L. monocytogenes vs Listeria spp. in 1 reaction",
        "leadingPcr": "Often two separate reactions",
        "traditional": "Days of selective culture",
        "businessImpact": "Pathogen-vs-genus answer in one test guides the right corrective action immediately."
      },
      {
        "feature": "Direct Savings",
        "taag": "2 targets in 1 reaction — ~50% fewer reactions",
        "leadingPcr": "Pays for a reaction per target",
        "traditional": "A full method per target",
        "businessImpact": "Running one reaction instead of 2 cuts reagent and consumable spend by about 50% per sample."
      },
      {
        "feature": "Operational Savings",
        "taag": "Less labor, equipment time & bench space",
        "leadingPcr": "More runs, more hands-on time",
        "traditional": "Heavy labor and incubator capacity",
        "businessImpact": "Fewer runs free up analyst hours, thermocycler capacity and bench space — letting the same team process more samples."
      },
      {
        "feature": "Cost per Result",
        "taag": "Lowest total cost of ownership",
        "leadingPcr": "Typically higher cost per target",
        "traditional": "High labor-driven cost",
        "businessImpact": "Beyond reagents, open instruments and free interpretation remove the equipment lock-in and software fees competitors charge."
      },
      {
        "feature": "Open Platform",
        "taag": "Runs on thermocyclers you already own",
        "leadingPcr": "Often a closed, proprietary ecosystem",
        "traditional": "Dedicated lab infrastructure",
        "businessImpact": "No instrument lock-in or forced capital purchase — deploy on existing equipment across sites."
      },
      {
        "feature": "Free AI Interpretation",
        "taag": "Automated result calling, included",
        "leadingPcr": "Interpretation often behind a paid subscription",
        "traditional": "Manual reading, analyst-dependent",
        "businessImpact": "Removes analyst subjectivity and a recurring software fee that competitors typically charge."
      }
    ]
  },
  "V-SF05": {
    "template": "Specio_Pathogens",
    "top_cards": [
      {
        "category": "technical",
        "title": "Indicator + pathogen distinguished",
        "subtitle": "E. coli and O157:H7 separated in one melting-curve reaction"
      },
      {
        "category": "technical",
        "title": "FAM-only simplicity",
        "subtitle": "Single-channel detection runs on basic open thermocyclers"
      },
      {
        "category": "operational",
        "title": "Sharper risk decisions",
        "subtitle": "Separates hygiene indicator from pathogenic strain"
      },
      {
        "category": "operational",
        "title": "Strong meat & produce fit",
        "subtitle": "Covers the E. coli risks that drive recalls"
      }
    ],
    "rows": [
      {
        "feature": "Pathogen vs Indicator",
        "taag": "E. coli + O157:H7 distinguished in 1 reaction",
        "leadingPcr": "Often two separate reactions",
        "traditional": "Multiple selective methods",
        "businessImpact": "Separates the hygiene indicator from the pathogenic strain in one test — sharper risk decisions for meat and produce."
      },
      {
        "feature": "Direct Savings",
        "taag": "2 targets in 1 reaction — ~50% fewer reactions",
        "leadingPcr": "Pays for a reaction per target",
        "traditional": "A full method per target",
        "businessImpact": "Running one reaction instead of 2 cuts reagent and consumable spend by about 50% per sample."
      },
      {
        "feature": "Operational Savings",
        "taag": "Less labor, equipment time & bench space",
        "leadingPcr": "More runs, more hands-on time",
        "traditional": "Heavy labor and incubator capacity",
        "businessImpact": "Fewer runs free up analyst hours, thermocycler capacity and bench space — letting the same team process more samples."
      },
      {
        "feature": "Cost per Result",
        "taag": "Lowest total cost of ownership",
        "leadingPcr": "Typically higher cost per target",
        "traditional": "High labor-driven cost",
        "businessImpact": "Beyond reagents, open instruments and free interpretation remove the equipment lock-in and software fees competitors charge."
      },
      {
        "feature": "Open Platform",
        "taag": "Runs on thermocyclers you already own",
        "leadingPcr": "Often a closed, proprietary ecosystem",
        "traditional": "Dedicated lab infrastructure",
        "businessImpact": "No instrument lock-in or forced capital purchase — deploy on existing equipment across sites."
      },
      {
        "feature": "Free AI Interpretation",
        "taag": "Automated result calling, included",
        "leadingPcr": "Interpretation often behind a paid subscription",
        "traditional": "Manual reading, analyst-dependent",
        "businessImpact": "Removes analyst subjectivity and a recurring software fee that competitors typically charge."
      }
    ]
  },
  "V-SF29": {
    "template": "Specio_Pathogens",
    "top_cards": [
      {
        "category": "technical",
        "title": "Two pathogens, one reaction",
        "subtitle": "Salmonella and L. monocytogenes via KAi melting-curve"
      },
      {
        "category": "technical",
        "title": "FAM-only simplicity",
        "subtitle": "Single-channel detection runs on basic open thermocyclers"
      },
      {
        "category": "operational",
        "title": "Broader safety per test",
        "subtitle": "Two key pathogens cleared in one workflow"
      },
      {
        "category": "operational",
        "title": "Faster lot release",
        "subtitle": "Combined result speeds the production decision"
      }
    ],
    "rows": [
      {
        "feature": "Two Pathogens Together",
        "taag": "Salmonella + L. monocytogenes in 1 reaction",
        "leadingPcr": "Often one target per reaction",
        "traditional": "2 separate selective methods",
        "businessImpact": "Two top pathogens cleared in one test, broadening safety coverage per sample."
      },
      {
        "feature": "Direct Savings",
        "taag": "2 targets in 1 reaction — ~50% fewer reactions",
        "leadingPcr": "Pays for a reaction per target",
        "traditional": "A full method per target",
        "businessImpact": "Running one reaction instead of 2 cuts reagent and consumable spend by about 50% per sample."
      },
      {
        "feature": "Operational Savings",
        "taag": "Less labor, equipment time & bench space",
        "leadingPcr": "More runs, more hands-on time",
        "traditional": "Heavy labor and incubator capacity",
        "businessImpact": "Fewer runs free up analyst hours, thermocycler capacity and bench space — letting the same team process more samples."
      },
      {
        "feature": "Cost per Result",
        "taag": "Lowest total cost of ownership",
        "leadingPcr": "Typically higher cost per target",
        "traditional": "High labor-driven cost",
        "businessImpact": "Beyond reagents, open instruments and free interpretation remove the equipment lock-in and software fees competitors charge."
      },
      {
        "feature": "Open Platform",
        "taag": "Runs on thermocyclers you already own",
        "leadingPcr": "Often a closed, proprietary ecosystem",
        "traditional": "Dedicated lab infrastructure",
        "businessImpact": "No instrument lock-in or forced capital purchase — deploy on existing equipment across sites."
      },
      {
        "feature": "Free AI Interpretation",
        "taag": "Automated result calling, included",
        "leadingPcr": "Interpretation often behind a paid subscription",
        "traditional": "Manual reading, analyst-dependent",
        "businessImpact": "Removes analyst subjectivity and a recurring software fee that competitors typically charge."
      }
    ]
  },
  "V-SF56": {
    "template": "Specio_Pathogens",
    "top_cards": [
      {
        "category": "technical",
        "title": "Three pathogens, one reaction",
        "subtitle": "Salmonella, L. monocytogenes and O157:H7 via melting-curve"
      },
      {
        "category": "technical",
        "title": "FAM-only simplicity",
        "subtitle": "Single-channel detection runs on basic open thermocyclers"
      },
      {
        "category": "operational",
        "title": "Comprehensive safety per test",
        "subtitle": "Three critical pathogens cleared in one workflow"
      },
      {
        "category": "operational",
        "title": "Protects the brand",
        "subtitle": "Broad coverage per sample lowers recall risk"
      }
    ],
    "rows": [
      {
        "feature": "Three Pathogens Together",
        "taag": "Salmonella, L. monocytogenes + O157:H7 in 1 reaction",
        "leadingPcr": "Often split across reactions",
        "traditional": "3 separate selective methods",
        "businessImpact": "Three critical pathogens cleared in one test — comprehensive safety per sample."
      },
      {
        "feature": "Direct Savings",
        "taag": "3 targets in 1 reaction — ~67% fewer reactions",
        "leadingPcr": "Pays for a reaction per target",
        "traditional": "A full method per target",
        "businessImpact": "Running one reaction instead of 3 cuts reagent and consumable spend by about 67% per sample."
      },
      {
        "feature": "Operational Savings",
        "taag": "Less labor, equipment time & bench space",
        "leadingPcr": "More runs, more hands-on time",
        "traditional": "Heavy labor and incubator capacity",
        "businessImpact": "Fewer runs free up analyst hours, thermocycler capacity and bench space — letting the same team process more samples."
      },
      {
        "feature": "Cost per Result",
        "taag": "Lowest total cost of ownership",
        "leadingPcr": "Typically higher cost per target",
        "traditional": "High labor-driven cost",
        "businessImpact": "Beyond reagents, open instruments and free interpretation remove the equipment lock-in and software fees competitors charge."
      },
      {
        "feature": "Open Platform",
        "taag": "Runs on thermocyclers you already own",
        "leadingPcr": "Often a closed, proprietary ecosystem",
        "traditional": "Dedicated lab infrastructure",
        "businessImpact": "No instrument lock-in or forced capital purchase — deploy on existing equipment across sites."
      },
      {
        "feature": "Free AI Interpretation",
        "taag": "Automated result calling, included",
        "leadingPcr": "Interpretation often behind a paid subscription",
        "traditional": "Manual reading, analyst-dependent",
        "businessImpact": "Removes analyst subjectivity and a recurring software fee that competitors typically charge."
      }
    ]
  },
  "V-SF95": {
    "template": "Specio_Pathogens",
    "top_cards": [
      {
        "category": "technical",
        "title": "Four pathogens, one reaction",
        "subtitle": "Salmonella, L. mono, E. coli and S. aureus via melting-curve"
      },
      {
        "category": "technical",
        "title": "FAM-only simplicity",
        "subtitle": "Single-channel detection runs on basic open thermocyclers"
      },
      {
        "category": "operational",
        "title": "Broadest safety per test",
        "subtitle": "Four key pathogens cleared in one workflow"
      },
      {
        "category": "operational",
        "title": "Faster lot release",
        "subtitle": "Wide coverage per run speeds decisions"
      }
    ],
    "rows": [
      {
        "feature": "Four Pathogens Together",
        "taag": "Salmonella, L. monocytogenes, E. coli + S. aureus in 1 reaction",
        "leadingPcr": "Often split across reactions",
        "traditional": "4 separate selective methods",
        "businessImpact": "Four key pathogens cleared in a single test — the broadest pathogen safety coverage per sample."
      },
      {
        "feature": "Direct Savings",
        "taag": "4 targets in 1 reaction — ~75% fewer reactions",
        "leadingPcr": "Pays for a reaction per target",
        "traditional": "A full method per target",
        "businessImpact": "Running one reaction instead of 4 cuts reagent and consumable spend by about 75% per sample."
      },
      {
        "feature": "Operational Savings",
        "taag": "Less labor, equipment time & bench space",
        "leadingPcr": "More runs, more hands-on time",
        "traditional": "Heavy labor and incubator capacity",
        "businessImpact": "Fewer runs free up analyst hours, thermocycler capacity and bench space — letting the same team process more samples."
      },
      {
        "feature": "Cost per Result",
        "taag": "Lowest total cost of ownership",
        "leadingPcr": "Typically higher cost per target",
        "traditional": "High labor-driven cost",
        "businessImpact": "Beyond reagents, open instruments and free interpretation remove the equipment lock-in and software fees competitors charge."
      },
      {
        "feature": "Open Platform",
        "taag": "Runs on thermocyclers you already own",
        "leadingPcr": "Often a closed, proprietary ecosystem",
        "traditional": "Dedicated lab infrastructure",
        "businessImpact": "No instrument lock-in or forced capital purchase — deploy on existing equipment across sites."
      },
      {
        "feature": "Free AI Interpretation",
        "taag": "Automated result calling, included",
        "leadingPcr": "Interpretation often behind a paid subscription",
        "traditional": "Manual reading, analyst-dependent",
        "businessImpact": "Removes analyst subjectivity and a recurring software fee that competitors typically charge."
      }
    ]
  },
  "V-SF193": {
    "template": "Specio_Path+Indicator",
    "top_cards": [
      {
        "category": "technical",
        "title": "Pathogens + indicators together",
        "subtitle": "Pioneering single-reaction design pairing pathogens with hygiene indicators"
      },
      {
        "category": "technical",
        "title": "FAM-only, ~75% fewer reactions",
        "subtitle": "One assay replaces several on a simple single channel"
      },
      {
        "category": "operational",
        "title": "Prevent, don't react",
        "subtitle": "Hygiene indicators flag process risk before it becomes a recall"
      },
      {
        "category": "operational",
        "title": "Safety + hygiene in one test",
        "subtitle": "Production gets both from a single assay"
      }
    ],
    "rows": [
      {
        "feature": "Prevention by Design",
        "taag": "Pathogens + hygiene indicators in one reaction",
        "leadingPcr": "Pathogen detection only, no indicators",
        "traditional": "Separate pathogen and indicator testing",
        "businessImpact": "A pioneering single-reaction design that pairs pathogen detection with process-hygiene indicators — you catch process drift before it becomes a recall."
      },
      {
        "feature": "Direct Savings",
        "taag": "4 targets in 1 reaction — ~75% fewer reactions",
        "leadingPcr": "Pays for a reaction per target",
        "traditional": "A full method per target",
        "businessImpact": "Running one reaction instead of 4 cuts reagent and consumable spend by about 75% per sample."
      },
      {
        "feature": "Operational Savings",
        "taag": "Less labor, equipment time & bench space",
        "leadingPcr": "More runs, more hands-on time",
        "traditional": "Heavy labor and incubator capacity",
        "businessImpact": "Fewer runs free up analyst hours, thermocycler capacity and bench space — letting the same team process more samples."
      },
      {
        "feature": "Cost per Result",
        "taag": "Lowest total cost of ownership",
        "leadingPcr": "Typically higher cost per target",
        "traditional": "High labor-driven cost",
        "businessImpact": "Beyond reagents, open instruments and free interpretation remove the equipment lock-in and software fees competitors charge."
      },
      {
        "feature": "Open Platform",
        "taag": "Runs on thermocyclers you already own",
        "leadingPcr": "Often a closed, proprietary ecosystem",
        "traditional": "Dedicated lab infrastructure",
        "businessImpact": "No instrument lock-in or forced capital purchase — deploy on existing equipment across sites."
      },
      {
        "feature": "Free AI Interpretation",
        "taag": "Automated result calling, included",
        "leadingPcr": "Interpretation often behind a paid subscription",
        "traditional": "Manual reading, analyst-dependent",
        "businessImpact": "Removes analyst subjectivity and a recurring software fee that competitors typically charge."
      }
    ]
  },
  "V-SF42": {
    "template": "Specio_Pathogens",
    "top_cards": [
      {
        "category": "technical",
        "title": "Four pathogens, one reaction",
        "subtitle": "Salmonella, L. mono, E. coli and S. aureus via melting-curve"
      },
      {
        "category": "technical",
        "title": "FAM-only simplicity",
        "subtitle": "Single-channel detection runs on basic open thermocyclers"
      },
      {
        "category": "operational",
        "title": "Broadest safety per test",
        "subtitle": "Four key pathogens cleared in one workflow"
      },
      {
        "category": "operational",
        "title": "Faster lot release",
        "subtitle": "Wide coverage per run speeds decisions"
      }
    ],
    "rows": [
      {
        "feature": "Four Pathogens Together",
        "taag": "Salmonella, L. monocytogenes, E. coli + S. aureus in 1 reaction",
        "leadingPcr": "Often split across reactions",
        "traditional": "4 separate selective methods",
        "businessImpact": "Four key pathogens cleared in a single test — the broadest pathogen safety coverage per sample."
      },
      {
        "feature": "Direct Savings",
        "taag": "4 targets in 1 reaction — ~75% fewer reactions",
        "leadingPcr": "Pays for a reaction per target",
        "traditional": "A full method per target",
        "businessImpact": "Running one reaction instead of 4 cuts reagent and consumable spend by about 75% per sample."
      },
      {
        "feature": "Operational Savings",
        "taag": "Less labor, equipment time & bench space",
        "leadingPcr": "More runs, more hands-on time",
        "traditional": "Heavy labor and incubator capacity",
        "businessImpact": "Fewer runs free up analyst hours, thermocycler capacity and bench space — letting the same team process more samples."
      },
      {
        "feature": "Cost per Result",
        "taag": "Lowest total cost of ownership",
        "leadingPcr": "Typically higher cost per target",
        "traditional": "High labor-driven cost",
        "businessImpact": "Beyond reagents, open instruments and free interpretation remove the equipment lock-in and software fees competitors charge."
      },
      {
        "feature": "Open Platform",
        "taag": "Runs on thermocyclers you already own",
        "leadingPcr": "Often a closed, proprietary ecosystem",
        "traditional": "Dedicated lab infrastructure",
        "businessImpact": "No instrument lock-in or forced capital purchase — deploy on existing equipment across sites."
      },
      {
        "feature": "Free AI Interpretation",
        "taag": "Automated result calling, included",
        "leadingPcr": "Interpretation often behind a paid subscription",
        "traditional": "Manual reading, analyst-dependent",
        "businessImpact": "Removes analyst subjectivity and a recurring software fee that competitors typically charge."
      }
    ]
  },
  "V-SF25": {
    "template": "Specio_Pathogens",
    "top_cards": [
      {
        "category": "technical",
        "title": "Two indicators, one reaction",
        "subtitle": "S. aureus and E. coli detected together via KAi melting-curve"
      },
      {
        "category": "technical",
        "title": "FAM-only simplicity",
        "subtitle": "Single-channel detection runs on basic open thermocyclers"
      },
      {
        "category": "operational",
        "title": "Broader hygiene per test",
        "subtitle": "Two key indicators cleared in one workflow"
      },
      {
        "category": "operational",
        "title": "Fewer runs, lower cost",
        "subtitle": "One assay instead of two per sample"
      }
    ],
    "rows": [
      {
        "feature": "Two Indicators Together",
        "taag": "S. aureus + E. coli in 1 reaction",
        "leadingPcr": "Often one target per reaction",
        "traditional": "2 separate methods",
        "businessImpact": "Two key hygiene indicators in one test broadens monitoring per sample."
      },
      {
        "feature": "Direct Savings",
        "taag": "2 targets in 1 reaction — ~50% fewer reactions",
        "leadingPcr": "Pays for a reaction per target",
        "traditional": "A full method per target",
        "businessImpact": "Running one reaction instead of 2 cuts reagent and consumable spend by about 50% per sample."
      },
      {
        "feature": "Operational Savings",
        "taag": "Less labor, equipment time & bench space",
        "leadingPcr": "More runs, more hands-on time",
        "traditional": "Heavy labor and incubator capacity",
        "businessImpact": "Fewer runs free up analyst hours, thermocycler capacity and bench space — letting the same team process more samples."
      },
      {
        "feature": "Cost per Result",
        "taag": "Lowest total cost of ownership",
        "leadingPcr": "Typically higher cost per target",
        "traditional": "High labor-driven cost",
        "businessImpact": "Beyond reagents, open instruments and free interpretation remove the equipment lock-in and software fees competitors charge."
      },
      {
        "feature": "Open Platform",
        "taag": "Runs on thermocyclers you already own",
        "leadingPcr": "Often a closed, proprietary ecosystem",
        "traditional": "Dedicated lab infrastructure",
        "businessImpact": "No instrument lock-in or forced capital purchase — deploy on existing equipment across sites."
      },
      {
        "feature": "Free AI Interpretation",
        "taag": "Automated result calling, included",
        "leadingPcr": "Interpretation often behind a paid subscription",
        "traditional": "Manual reading, analyst-dependent",
        "businessImpact": "Removes analyst subjectivity and a recurring software fee that competitors typically charge."
      }
    ]
  },
  "V-SF184": {
    "template": "Specio_Path+Indicator",
    "top_cards": [
      {
        "category": "technical",
        "title": "Pathogens + indicators together",
        "subtitle": "Pioneering single-reaction design pairing pathogens with hygiene indicators"
      },
      {
        "category": "technical",
        "title": "FAM-only, ~75% fewer reactions",
        "subtitle": "One assay replaces several on a simple single channel"
      },
      {
        "category": "operational",
        "title": "Prevent, don't react",
        "subtitle": "Hygiene indicators flag process risk before it becomes a recall"
      },
      {
        "category": "operational",
        "title": "Safety + hygiene in one test",
        "subtitle": "Production gets both from a single assay"
      }
    ],
    "rows": [
      {
        "feature": "Prevention by Design",
        "taag": "Pathogens + hygiene indicators in one reaction",
        "leadingPcr": "Pathogen detection only, no indicators",
        "traditional": "Separate pathogen and indicator testing",
        "businessImpact": "A pioneering single-reaction design that pairs pathogen detection with process-hygiene indicators — you catch process drift before it becomes a recall."
      },
      {
        "feature": "Direct Savings",
        "taag": "4 targets in 1 reaction — ~75% fewer reactions",
        "leadingPcr": "Pays for a reaction per target",
        "traditional": "A full method per target",
        "businessImpact": "Running one reaction instead of 4 cuts reagent and consumable spend by about 75% per sample."
      },
      {
        "feature": "Operational Savings",
        "taag": "Less labor, equipment time & bench space",
        "leadingPcr": "More runs, more hands-on time",
        "traditional": "Heavy labor and incubator capacity",
        "businessImpact": "Fewer runs free up analyst hours, thermocycler capacity and bench space — letting the same team process more samples."
      },
      {
        "feature": "Cost per Result",
        "taag": "Lowest total cost of ownership",
        "leadingPcr": "Typically higher cost per target",
        "traditional": "High labor-driven cost",
        "businessImpact": "Beyond reagents, open instruments and free interpretation remove the equipment lock-in and software fees competitors charge."
      },
      {
        "feature": "Open Platform",
        "taag": "Runs on thermocyclers you already own",
        "leadingPcr": "Often a closed, proprietary ecosystem",
        "traditional": "Dedicated lab infrastructure",
        "businessImpact": "No instrument lock-in or forced capital purchase — deploy on existing equipment across sites."
      },
      {
        "feature": "Free AI Interpretation",
        "taag": "Automated result calling, included",
        "leadingPcr": "Interpretation often behind a paid subscription",
        "traditional": "Manual reading, analyst-dependent",
        "businessImpact": "Removes analyst subjectivity and a recurring software fee that competitors typically charge."
      }
    ]
  },
  "V-SF109": {
    "template": "Ampliora_Multiplex",
    "top_cards": [
      {
        "category": "technical",
        "title": "Three Vibrio species, one reaction",
        "subtitle": "V. cholerae, V. vulnificus and V. parahaemolyticus via Mila multiplex"
      },
      {
        "category": "technical",
        "title": "Internal reaction control",
        "subtitle": "Monitors every run and supports automated TxA calling"
      },
      {
        "category": "operational",
        "title": "Seafood safety per test",
        "subtitle": "Three key Vibrio pathogens cleared in one workflow"
      },
      {
        "category": "operational",
        "title": "Lower price, open platform",
        "subtitle": "Below leading systems, runs on instruments you own"
      }
    ],
    "rows": [
      {
        "feature": "Three Vibrio Together",
        "taag": "V. cholerae, V. vulnificus + V. parahaemolyticus in 1 reaction",
        "leadingPcr": "Often split across reactions",
        "traditional": "Separate selective methods (e.g. TCBS)",
        "businessImpact": "The three Vibrio species of seafood concern cleared in one test \u2014 comprehensive safety coverage per sample."
      },
      {
        "feature": "Direct Savings",
        "taag": "3 targets in 1 reaction \u2014 ~67% fewer reactions",
        "leadingPcr": "Pays for a reaction per target",
        "traditional": "A full method per target",
        "businessImpact": "Running one reaction instead of 3 cuts reagent and consumable spend by about 67% per sample."
      },
      {
        "feature": "Operational Savings",
        "taag": "Less labor, equipment time & bench space",
        "leadingPcr": "More runs, more hands-on time",
        "traditional": "Heavy labor and incubator capacity",
        "businessImpact": "Fewer runs free up analyst hours, thermocycler capacity and bench space \u2014 letting the same team process more samples."
      },
      {
        "feature": "Time to Result",
        "taag": "Enriched molecular result",
        "leadingPcr": "Comparable enriched PCR",
        "traditional": "Multi-day selective culture",
        "businessImpact": "A molecular Vibrio answer well before culture confirmation keeps seafood lots moving and shortens holds."
      },
      {
        "feature": "Cost per Result",
        "taag": "Lowest total cost of ownership",
        "leadingPcr": "Typically higher cost per target",
        "traditional": "High labor-driven cost",
        "businessImpact": "Beyond reagents, open instruments and free interpretation remove the equipment lock-in and software fees competitors charge."
      },
      {
        "feature": "Open Platform",
        "taag": "Runs on thermocyclers you already own",
        "leadingPcr": "Often a closed, proprietary ecosystem",
        "traditional": "Dedicated lab infrastructure",
        "businessImpact": "No instrument lock-in or forced capital purchase \u2014 deploy on existing equipment across sites."
      },
      {
        "feature": "Free AI Interpretation",
        "taag": "Automated result calling, included",
        "leadingPcr": "Interpretation often behind a paid subscription",
        "traditional": "Manual reading, analyst-dependent",
        "businessImpact": "Removes analyst subjectivity and a recurring software fee that competitors typically charge."
      }
    ]
  },
  "V-SF179": {
    "template": "Ampliora_Multiplex",
    "top_cards": [
      {
        "category": "technical",
        "title": "Three spoilage yeasts, one reaction",
        "subtitle": "Zygosaccharomyces group, Saccharomyces spp. and S. cerevisiae via Mila multiplex"
      },
      {
        "category": "technical",
        "title": "Internal reaction control",
        "subtitle": "Monitors every run and supports automated TxA calling"
      },
      {
        "category": "operational",
        "title": "Protects wine & beer quality",
        "subtitle": "Early spoilage-yeast detection prevents refermentation and off-flavors"
      },
      {
        "category": "operational",
        "title": "Lower price, open platform",
        "subtitle": "Below leading systems, runs on instruments you own"
      }
    ],
    "rows": [
      {
        "feature": "Three Yeasts Together",
        "taag": "Zygosaccharomyces, Saccharomyces spp. + S. cerevisiae in 1 reaction",
        "leadingPcr": "Often one yeast target per run",
        "traditional": "Days of selective culture",
        "businessImpact": "The core wine- and beer-spoilage yeasts cleared in one test \u2014 full spoilage coverage per sample."
      },
      {
        "feature": "Direct Savings",
        "taag": "3 targets in 1 reaction \u2014 ~67% fewer reactions",
        "leadingPcr": "Pays for a reaction per target",
        "traditional": "A full method per target",
        "businessImpact": "Running one reaction instead of 3 cuts reagent and consumable spend by about 67% per sample."
      },
      {
        "feature": "Operational Savings",
        "taag": "Less labor, equipment time & bench space",
        "leadingPcr": "More runs, more hands-on time",
        "traditional": "Heavy labor and incubator capacity",
        "businessImpact": "Fewer runs free up analyst hours, thermocycler capacity and bench space \u2014 letting the same team process more samples."
      },
      {
        "feature": "Time to Result",
        "taag": "Enriched molecular result",
        "leadingPcr": "Comparable enriched PCR",
        "traditional": "Multi-day selective culture",
        "businessImpact": "A molecular spoilage-yeast answer ahead of plating lets blends and lots release sooner with less risk of refermentation."
      },
      {
        "feature": "Cost per Result",
        "taag": "Lowest total cost of ownership",
        "leadingPcr": "Typically higher cost per target",
        "traditional": "High labor-driven cost",
        "businessImpact": "Beyond reagents, open instruments and free interpretation remove the equipment lock-in and software fees competitors charge."
      },
      {
        "feature": "Open Platform",
        "taag": "Runs on thermocyclers you already own",
        "leadingPcr": "Often a closed, proprietary ecosystem",
        "traditional": "Dedicated lab infrastructure",
        "businessImpact": "No instrument lock-in or forced capital purchase \u2014 deploy on existing equipment across sites."
      },
      {
        "feature": "Free AI Interpretation",
        "taag": "Automated result calling, included",
        "leadingPcr": "Interpretation often behind a paid subscription",
        "traditional": "Manual reading, analyst-dependent",
        "businessImpact": "Removes analyst subjectivity and a recurring software fee that competitors typically charge."
      }
    ]
  },
  "V-EQ30": {
    "template": "Ampliora_Spoilage",
    "top_cards": [
      {
        "category": "technical",
        "title": "Four low-pH spoilage groups, one reaction",
        "subtitle": "Brettanomyces, acidophilic bacteria, PRY, yeasts and molds"
      },
      {
        "category": "technical",
        "title": "Built for acidified products",
        "subtitle": "Targets organisms that survive and spoil at low pH"
      },
      {
        "category": "operational",
        "title": "Protects shelf life",
        "subtitle": "Catches preservative-resistant spoilers early"
      },
      {
        "category": "operational",
        "title": "Fewer runs, lower cost",
        "subtitle": "Four spoilage groups in one assay"
      }
    ],
    "rows": [
      {
        "feature": "Low-pH Spoilage Panel",
        "taag": "4 acidophilic spoilage groups in one reaction",
        "leadingPcr": "Limited low-pH coverage",
        "traditional": "Slow selective culture, easily missed",
        "businessImpact": "Covers the preservative-resistant organisms that survive acidified products — the spoilers most likely to slip through standard checks."
      },
      {
        "feature": "Validated by Coca-Cola Company",
        "taag": "Yes — validated with hundreds of samples across multiple matrices, achieving 99.55% accuracy.",
        "leadingPcr": "Not validated by Coca-Cola Company",
        "traditional": "Yes, slow traditional methods",
        "businessImpact": "Coca-Cola validation demonstrates real-world industrial performance, enabling faster product release, reduced contamination risk, and greater confidence in beverage quality decisions."
      },
      {
        "feature": "Time to Results",
        "taag": "Fast, 52 hours",
        "leadingPcr": "72-96 hours",
        "traditional": "Slow, 5-7 days",
        "businessImpact": "Rapid results enable confident product release and fast corrective actions in the event of contamination, helping prevent cross-contamination."
      },
      {
        "feature": "Direct Savings",
        "taag": "4 targets in 1 reaction — ~80% fewer reactions",
        "leadingPcr": "Pays for a reaction per target",
        "traditional": "A full method per target",
        "businessImpact": "Running one reaction instead of 4 cuts reagent and consumable spend by about 80% per sample."
      },
      {
        "feature": "Operational Savings",
        "taag": "Less labor, equipment time & bench space",
        "leadingPcr": "More runs, more hands-on time",
        "traditional": "Heavy labor and incubator capacity",
        "businessImpact": "Fewer runs free up analyst hours, thermocycler capacity and bench space — letting the same team process more samples."
      },
      {
        "feature": "Cost per Result",
        "taag": "Lowest total cost of ownership",
        "leadingPcr": "Typically higher cost per target",
        "traditional": "High labor-driven cost",
        "businessImpact": "Beyond reagents, open instruments and free interpretation remove the equipment lock-in and software fees competitors charge."
      },
      {
        "feature": "Open Platform",
        "taag": "Runs on thermocyclers you already own",
        "leadingPcr": "Often a closed, proprietary ecosystem",
        "traditional": "Dedicated lab infrastructure",
        "businessImpact": "No instrument lock-in or forced capital purchase — deploy on existing equipment across sites."
      },
      {
        "feature": "Free AI Interpretation",
        "taag": "Automated result calling, included",
        "leadingPcr": "Interpretation often behind a paid subscription",
        "traditional": "Manual reading, analyst-dependent",
        "businessImpact": "Removes analyst subjectivity and a recurring software fee that competitors typically charge."
      }
    ]
  }
};