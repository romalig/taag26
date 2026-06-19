// comparisons.ts — EDIT BY HAND (rarely). Competitor tables keyed by protocol id.
// "Leading PCR Test" = best-in-class molecular competitor (generic, no named vendor).
// "Traditional" = culture-based microbiology. businessImpact = the operational "so what".
// "Time to Result" rows with taag:null are gap-filled at runtime with the resolved workflow time
// (comparisonRowsForBrief). Set taag to a string to freeze a curated value (then it is preserved).

export interface ComparisonRow { feature: string|null; taag: string|null; leadingPcr: string|null; traditional: string|null; businessImpact: string|null; }
export interface ProtocolComparison { rows: ComparisonRow[]; }

export const COMPARISONS: Record<string, ProtocolComparison> = {
  "V-SF97": {
    "rows": [
      {
        "feature": "Time to Result",
        "taag": "Molecular Salmonella result, ~26 h",
        "leadingPcr": "Comparable enriched PCR (~24 h)",
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
    "rows": [
      {
        "feature": "Time to Result",
        "taag": "Molecular E. coli result, ~26 h",
        "leadingPcr": "Comparable enriched PCR (~24 h)",
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
        "leadingPcr": "Slower enriched workflow (~24 h)",
        "traditional": "Multi-day selective culture (2–5 days)",
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
    "rows": [
      {
        "feature": "Time to Result",
        "taag": "~26 h",
        "leadingPcr": "~24 h enriched workflow",
        "traditional": "Multi-day culture (2–5 days)",
        "businessImpact": "Complete sample-to-result workflow time."
      },
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
    "rows": [
      {
        "feature": "Time to Result",
        "taag": "~26 h",
        "leadingPcr": "~24 h enriched workflow",
        "traditional": "Multi-day culture (2–5 days)",
        "businessImpact": "Complete sample-to-result workflow time."
      },
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
        "leadingPcr": "Slower enriched workflow (~24 h)",
        "traditional": "Multi-day culture (2–5 days)",
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
        "leadingPcr": "Slower enriched workflow (~24 h)",
        "traditional": "Multi-day culture (2–5 days)",
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
        "leadingPcr": "Slower enriched workflow (~48–72 h)",
        "traditional": "Multi-day selective culture (5–7 days)",
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
    "rows": [
      {
        "feature": "Time to Result",
        "taag": "~3 h environmental, ~26 h finished products",
        "leadingPcr": "~24 h enriched workflow",
        "traditional": "Multi-day culture (2–5 days)",
        "businessImpact": "Complete sample-to-result workflow time."
      },
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
    "rows": [
      {
        "feature": "Time to Result",
        "taag": "~26 h",
        "leadingPcr": "~24 h enriched workflow",
        "traditional": "Multi-day culture (2–5 days)",
        "businessImpact": "Complete sample-to-result workflow time."
      },
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
    "rows": [
      {
        "feature": "Time to Result",
        "taag": "~26 h",
        "leadingPcr": "~24 h enriched workflow",
        "traditional": "Multi-day culture (2–5 days)",
        "businessImpact": "Complete sample-to-result workflow time."
      },
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
    "rows": [
      {
        "feature": "Time to Result",
        "taag": "~26 h",
        "leadingPcr": "~24 h enriched workflow",
        "traditional": "Multi-day culture (2–5 days)",
        "businessImpact": "Complete sample-to-result workflow time."
      },
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
    "rows": [
      {
        "feature": "Time to Result",
        "taag": "~71 h",
        "leadingPcr": "~48–72 h enriched workflow",
        "traditional": "Multi-day culture (5–7 days)",
        "businessImpact": "Complete sample-to-result workflow time."
      },
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
    "rows": [
      {
        "feature": "Time to Result",
        "taag": "~71 h",
        "leadingPcr": "~48–72 h enriched workflow",
        "traditional": "Multi-day culture (5–7 days)",
        "businessImpact": "Complete sample-to-result workflow time."
      },
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
    "rows": [
      {
        "feature": "Time to Result",
        "taag": "~2.5 h",
        "leadingPcr": "~48–72 h enriched workflow",
        "traditional": "Multi-day culture (5–7 days)",
        "businessImpact": "Complete sample-to-result workflow time."
      },
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
    "rows": [
      {
        "feature": "Time to Result",
        "taag": "~2.5 h",
        "leadingPcr": "~48–72 h enriched workflow",
        "traditional": "Multi-day culture (5–7 days)",
        "businessImpact": "Complete sample-to-result workflow time."
      },
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
    "rows": [
      {
        "feature": "Low-pH Spoilage Panel",
        "taag": "4 acidophilic spoilage groups in one reaction",
        "leadingPcr": "Very limited coverage",
        "traditional": "Slow selective culture, easily missed",
        "businessImpact": "Covers the preservative-resistant organisms that survive acidified products — the spoilers most likely to slip through standard checks."
      },
      {
        "feature": "Time to Results",
        "taag": "52 hours",
        "leadingPcr": "72-96 hours",
        "traditional": "Slow, 5-7 days",
        "businessImpact": "Rapid results enable confident product release and fast corrective actions in the event of contamination, helping prevent cross-contamination."
      },
      {
        "feature": "Direct Savings",
        "taag": "4 targets in 1 reaction — ~75% fewer reactions",
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
        "leadingPcr": "Slower enriched workflow (~24 h)",
        "traditional": "Multi-day culture (2–5 days)",
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
    "rows": [
      {
        "feature": "Time to Result",
        "taag": "~71 h",
        "leadingPcr": "~48–72 h enriched workflow",
        "traditional": "Multi-day culture (5–7 days)",
        "businessImpact": "Complete sample-to-result workflow time."
      },
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
    "rows": [
      {
        "feature": "Time to Result",
        "taag": "~2.5 h",
        "leadingPcr": "~48–72 h enriched workflow",
        "traditional": "Multi-day culture (5–7 days)",
        "businessImpact": "Complete sample-to-result workflow time."
      },
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
    "rows": [
      {
        "feature": "Time to Result",
        "taag": "~3 h for environmental, ~9 h for finished products",
        "leadingPcr": "~24 h enriched workflow",
        "traditional": "Multi-day culture (2–5 days)",
        "businessImpact": "Same-day Salmonella clearance means finished product ships without waiting overnight on micro."
      },
      {
        "feature": "RNA detection",
        "taag": "RNA targets viable cells",
        "leadingPcr": "DNA-based can detect dead cells",
        "traditional": "Limited by culture recovery",
        "businessImpact": "Captures viable Salmonella, helping reduce potential false positives from non-viable cells or residual DNA."
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
    "rows": [
      {
        "feature": "Time to Result",
        "taag": "~4 h for environmental, ~9 h for finished products",
        "leadingPcr": "~24 h enriched workflow",
        "traditional": "Multi-day culture (2–5 days)",
        "businessImpact": "Two top pathogens cleared the same day — finished product ships without an overnight micro hold."
      },
      {
        "feature": "RNA detection",
        "taag": "RNA targets viable cells",
        "leadingPcr": "DNA-based can detect dead cells",
        "traditional": "Limited by culture recovery",
        "businessImpact": "Captures viable Salmonella, helping reduce potential false positives from non-viable cells or residual DNA."
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
    "rows": [
      {
        "feature": "Time to Result",
        "taag": "~3 h for environmental, ~9 h for finished products",
        "leadingPcr": "~24 h enriched workflow",
        "traditional": "Multi-day culture (2–5 days)",
        "businessImpact": "Two top pathogens cleared the same day — finished product ships without an overnight micro hold."
      },
      {
        "feature": "Prevention Indicator",
        "taag": "Pathogen + hygiene indicator in one RNA assay",
        "leadingPcr": "Pathogen detection only, no process indicator",
        "traditional": "A separate indicator test, days later",
        "businessImpact": "Enterobacteria flags hygiene drift before it becomes a Salmonella event — you prevent problems instead of reacting to recalls."
      },
      {
        "feature": "RNA detection",
        "taag": "RNA targets viable cells",
        "leadingPcr": "DNA-based can detect dead cells",
        "traditional": "Limited by culture recovery",
        "businessImpact": "Captures viable Salmonella, helping reduce potential false positives from non-viable cells or residual DNA."
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
        "leadingPcr": "Limited spoilage coverage (~24 h)",
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
        "taag": "~51 h",
        "leadingPcr": "Limited fungal coverage (~48–72 h)",
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
    "rows": [
      {
        "feature": "Time to Result",
        "taag": "Molecular Salmonella result, ~26 h",
        "leadingPcr": "Comparable enriched PCR (~24 h)",
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
    "rows": [
      {
        "feature": "Time to Result",
        "taag": "Molecular S. aureus result, ~26 h",
        "leadingPcr": "Comparable enriched PCR (~24 h)",
        "traditional": "Multi-day culture (2–5 days)",
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
    "rows": [
      {
        "feature": "Time to Result",
        "taag": "Molecular E. coli result, ~26 h",
        "leadingPcr": "Comparable enriched PCR (~24 h)",
        "traditional": "Multi-day culture (2–5 days)",
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
    "rows": [
      {
        "feature": "Time to Result",
        "taag": "L. monocytogenes result in ~25 h",
        "leadingPcr": "Slower enriched workflow (~25 h)",
        "traditional": "Multi-day culture (2–5 days)",
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
    "rows": [
      {
        "feature": "Time to Result",
        "taag": "~51 h",
        "leadingPcr": "~48–72 h enriched workflow",
        "traditional": "Multi-day culture (5–7 days)",
        "businessImpact": "Complete sample-to-result workflow time."
      },
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
    "rows": [
      {
        "feature": "Time to Result",
        "taag": "Molecular Listeria result, ~29 h",
        "leadingPcr": "Comparable enriched PCR (~24 h)",
        "traditional": "Multi-day culture (2–5 days)",
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
    "rows": [
      {
        "feature": "Time to Result",
        "taag": "~26 h",
        "leadingPcr": "~24 h enriched workflow",
        "traditional": "Multi-day culture (2–5 days)",
        "businessImpact": "Complete sample-to-result workflow time."
      },
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
    "rows": [
      {
        "feature": "Time to Result",
        "taag": "~26 h",
        "leadingPcr": "~24 h enriched workflow",
        "traditional": "Multi-day culture (2–5 days)",
        "businessImpact": "Complete sample-to-result workflow time."
      },
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
    "rows": [
      {
        "feature": "Time to Result",
        "taag": "~26 h",
        "leadingPcr": "~24 h enriched workflow",
        "traditional": "Multi-day culture (2–5 days)",
        "businessImpact": "Complete sample-to-result workflow time."
      },
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
    "rows": [
      {
        "feature": "Time to Result",
        "taag": "~26 h",
        "leadingPcr": "~24 h enriched workflow",
        "traditional": "Multi-day culture (2–5 days)",
        "businessImpact": "Complete sample-to-result workflow time."
      },
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
    "rows": [
      {
        "feature": "Time to Result",
        "taag": "~26 h",
        "leadingPcr": "~24 h enriched workflow",
        "traditional": "Multi-day culture (2–5 days)",
        "businessImpact": "Complete sample-to-result workflow time."
      },
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
    "rows": [
      {
        "feature": "Time to Result",
        "taag": null,
        "leadingPcr": "~24 h enriched workflow",
        "traditional": "Multi-day culture (2–5 days)",
        "businessImpact": "Complete sample-to-result workflow time."
      },
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
    "rows": [
      {
        "feature": "Time to Result",
        "taag": null,
        "leadingPcr": "~24 h enriched workflow",
        "traditional": "Multi-day culture (2–5 days)",
        "businessImpact": "Complete sample-to-result workflow time."
      },
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
    "rows": [
      {
        "feature": "Four Pathogens Together",
        "taag": "Salmonella, L. monocytogenes, E. coli + S. aureus in 1 reaction",
        "leadingPcr": "Split across four reactions",
        "traditional": "4 separate selective methods",
        "businessImpact": "Four key pathogens cleared in a single test — the broadest pathogen safety coverage per sample."
      },
      {
        "feature": "Time to Result",
        "taag": "Time-to-results: ~25 h",
        "leadingPcr": "Comparable PCR time (~26 h)",
        "traditional": "Multi-day culture (2–5 days)",
        "businessImpact": "Rapid and simultaneous detection of four key pathogens, supporting faster release decisions, investigations, and corrective actions."
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
    "rows": [
      {
        "feature": "Time to Result",
        "taag": "~26 h",
        "leadingPcr": "~24 h enriched workflow",
        "traditional": "Multi-day culture (2–5 days)",
        "businessImpact": "Complete sample-to-result workflow time."
      },
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
    "rows": [
      {
        "feature": "Prevention by Design",
        "taag": "Pathogens + hygiene indicators in one reaction",
        "leadingPcr": "Pathogen detection only, no indicators",
        "traditional": "Separate pathogen and indicator testing",
        "businessImpact": "A pioneering single-reaction design that pairs pathogen detection with process-hygiene indicators — you catch process drift before it becomes a recall."
      },
      {
        "feature": "Time to Result",
        "taag": "~25 h",
        "leadingPcr": "~26 h",
        "traditional": "Multi-day culture (2–5 days)",
        "businessImpact": "Two pathogens. Two indicators. One rapid workflow for preventive control and faster microbiological decisions."
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
    "rows": [
      {
        "feature": "Three Vibrio Together",
        "taag": "V. cholerae, V. vulnificus and V. parahaemolyticus in 1 workflow",
        "leadingPcr": "Often split across reactions",
        "traditional": "Separate selective methods (e.g. TCBS)",
        "businessImpact": "The three Vibrio species of seafood concern cleared in one test — comprehensive safety coverage per sample."
      },
      {
        "feature": "Direct Savings",
        "taag": "3 targets in 1 reaction — ~67% fewer reactions",
        "leadingPcr": "Pays for a reaction per target",
        "traditional": "A full method per target",
        "businessImpact": "Running one reaction instead of 3 cuts reagent and consumable spend by about 67% per sample."
      },
      {
        "feature": "Time to Result",
        "taag": "~25 h",
        "leadingPcr": "Comparable enriched PCR (~24 h)",
        "traditional": "Multi-day selective culture (2–5 days)",
        "businessImpact": "A molecular Vibrio answer well before culture confirmation keeps seafood lots moving and shortens holds."
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
  "V-SF179": {
    "rows": [
      {
        "feature": "Time to Result",
        "taag": "~50 h",
        "leadingPcr": "Comparable enriched PCR (~48–72 h)",
        "traditional": "Multi-day selective culture (5–7 days)",
        "businessImpact": "A molecular spoilage-yeast answer ahead of plating lets blends and lots release sooner with less risk of refermentation."
      },
      {
        "feature": "Three Yeasts Together",
        "taag": "Zygosaccharomyces, Saccharomyces spp. + S. cerevisiae in 1 reaction",
        "leadingPcr": "Often one yeast target per run",
        "traditional": "Days of selective culture",
        "businessImpact": "The core wine- and beer-spoilage yeasts cleared in one test — full spoilage coverage per sample."
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
  "V-EQ30": {
    "rows": [
      {
        "feature": "Low-pH Spoilage Panel",
        "taag": "4 acidophilic spoilage groups in one reaction",
        "leadingPcr": "Very limited coverage",
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
        "taag": "52 hours",
        "leadingPcr": "72-96 hours",
        "traditional": "Slow, 5-7 days",
        "businessImpact": "Rapid results enable confident product release and fast corrective actions in the event of contamination, helping prevent cross-contamination."
      },
      {
        "feature": "Direct Savings",
        "taag": "4 targets in 1 reaction — ~75% fewer reactions",
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
