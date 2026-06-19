// brochures.ts — sales-brochure copy per PCR kit, keyed by protocol id.
// HAND-WRITTEN sales copy (qualitative, no invented figures). EDIT HERE — the component only renders.
// plant = production benefits (shown first); lab = laboratory benefits.
// PCR_TECH_DETAILS = the shared "Technical Details" items for every PCR kit (edit once).
//   badge:"aoac" -> shows the AOAC logo only for kits listed in AOAC_KIT_IDS; ISO text otherwise.
//   icon:"datasheet" -> shows the datasheet icon (visual only for now).

export interface BrochureBlock { title: string; body: string; }
export interface TechDetailItem { label: string; note: string; badge?: string; icon?: string; }
export interface BrochureHighlight { icon: string; title: string; subtitle: string; pdfText?: string; }
export interface KitBrochure { plant?: BrochureBlock[]; lab?: BrochureBlock[]; highlights?: BrochureHighlight[]; pdfPlant?: BrochureBlock[]; pdfLab?: BrochureBlock[]; kitImage?: string; pdfDescription?: string; detectedList?: string[]; description?: string; }

// Allowed icon names for highlights. Use ONLY these keys so both the web (lucide)
// and the PDF (PNG in /public/icons/<key>.png) can resolve the icon.
// web mapping lives in ProductBrief.tsx (HIGHLIGHT_ICONS); PDF uses /icons/<key>.png.
export const HIGHLIGHT_ICON_KEYS = [
  "timer", "target", "zap", "rna", "shield", "layers", "droplet",
  "thermometer", "activity", "check", "flask", "dna",
] as const;

// PCR kits whose "Extensive validation" item shows the AOAC logo.
export const AOAC_KIT_IDS: string[] = ["V-SF95", "V-SF193", "V-SF68", "V-PAT04", "V-SF42", "V-SF184"];

export const PCR_TECH_DETAILS: TechDetailItem[] = [
  {
    "label": "Automated interpretation",
    "note": "Results call automatically in the TxA platform — standardized reads, no analyst subjectivity"
  },
  {
    "label": "Ready-to-use format",
    "note": "Preloaded strips minimize handling, reduce pipetting errors and speed setup"
  },
  {
    "label": "AI primer/probe design",
    "note": "Mila-engineered assays for specific amplification with low cross-reactivity"
  },
  {
    "label": "Built-in internal control",
    "note": "Every reaction is monitored to confirm valid, confident results"
  },
  {
    "label": "Extensive validation",
    "note": "Validated following ISO 16140 guidelines and manufactured under ISO 13485, on real-world food and environmental samples",
    "badge": "aoac"
  },
  {
    "label": "Technical datasheet",
    "note": "Full specifications, validation data and protocol available on request",
    "icon": "datasheet"
  }
];

export const BROCHURES: Record<string, KitBrochure> = {
  "V-PAT06": {
    "plant": [
      {
        "title": "Prevent outbreaks before they spread",
        "body": "Because the Enterobacteria hygiene indicator flags process drift in the same run as the Salmonella result, your team sees a sanitation problem building before it turns into a positive lot — shifting the plant from reacting to contamination to preventing it."
      },
      {
        "title": "Avoid line stoppages",
        "body": "Ultra-fast RNA results mean a line rarely waits on micro. Environmental clearance in ~3 h lets a suspect area be re-cleaned and re-tested within the same shift instead of holding production overnight."
      },
      {
        "title": "Free up warehouse space",
        "body": "Finished-product release in ~9 h — same day — means lots leave quarantine far sooner. Less product sits tied up in hold inventory, freeing cold-storage and warehouse capacity for throughput."
      },
      {
        "title": "Protect the brand",
        "body": "Detecting only viable cells avoids dead-cell false positives that trigger needless holds, while the hygiene indicator catches risk early — together lowering the chance of a recall and the reputational damage that follows."
      }
    ],
    "lab": [
      {
        "title": "Two pathogens, one reaction",
        "body": "Salmonella spp. and Enterobacteria are detected together in a single AiGOR reaction — one assay instead of two separate assays, about 50% fewer reactions, more samples per shift and a lower cost per result."
      },
      {
        "title": "Same-day results",
        "body": "Environmental results in ~4 h and finished product in ~9 h — every sample is read inside the working day, with no overnight wait."
      },
      {
        "title": "TxA runs the bench",
        "body": "TxA calls both targets automatically and publishes the result without manual transcription — standardized reads, no analyst subjectivity and less hands-on time per sample."
      },
      {
        "title": "Fewer false positives",
        "body": "Targeting RNA from viable cells avoids the dead-cell signals that drive false positives in DNA assays, cutting needless re-testing in the lab."
      }
    ],
    "highlights": [
      {
        "icon": "timer",
        "title": "Results in 3 h",
        "subtitle": "Skip long enrichments",
        "pdfText": "AiGOR amplifies RNA directly from the sample, with no enrichment. Swabs return in ~3 h and finished product in ~9 h, both within one shift — a multi-day wait becomes a same-day decision."
      },
      {
        "icon": "target",
        "title": "1 CFU/sample",
        "subtitle": "Maximum precision",
        "pdfText": "Detects down to a single colony-forming unit per sample. Because AiGOR™ targets RNA from living cells, it flags the organisms that truly pose a risk and ignores residual DNA from dead ones — early detection without false alarms."
      },
      {
        "icon": "zap",
        "title": "10,000x sensitivity",
        "subtitle": "vs. real-time PCR",
        "pdfText": "By reading the many RNA copies a living cell carries instead of its single DNA genome, AiGOR™ reaches up to 10,000x the sensitivity of conventional PCR — contamination is caught at the earliest stage, before it spreads."
      },
      {
        "icon": "rna",
        "title": "RNA detection",
        "subtitle": "Targets active cells",
        "pdfText": "Conventional PCR reads DNA, which lingers after cells die and can cause false positives. AiGOR reads RNA, which degrades fast once a cell dies — so results reflect live, active organisms and action follows real risk."
      }
    ],
    "pdfPlant": [
      {
        "title": "Prevent outbreaks",
        "body": "The hygiene indicator flags process drift before it becomes a positive lot."
      },
      {
        "title": "Avoid line stoppages",
        "body": "Environmental clearance in ~3 h — re-clean and re-test within the same shift."
      },
      {
        "title": "Free warehouse space",
        "body": "Same-day finished-product release means less product tied up in quarantine."
      },
      {
        "title": "Protect the brand",
        "body": "Viable-cell detection plus early hygiene warning lower recall risk."
      }
    ],
    "pdfLab": [
      {
        "title": "Ultra-high sensitivity",
        "body": "AiGOR RNA detects contamination at far lower loads than DNA PCR."
      },
      {
        "title": "Fewer false positives",
        "body": "Targeting viable cells avoids dead-cell signals and needless re-tests."
      },
      {
        "title": "Two answers, one reaction",
        "body": "Pathogen plus hygiene indicator halve reagent and hands-on time."
      },
      {
        "title": "Open platform",
        "body": "Runs on your thermocyclers with free automated TxA interpretation."
      }
    ],
    "kitImage": "/Elevia_29.png"
  },
  "V-SF97": {
    "highlights": [
      {
        "icon": "target",
        "title": "Specific Salmonella ID",
        "subtitle": "Mila AI primer design",
        "pdfText": "Primers and probes are designed by Mila, TAAG's AI engine, for tight specificity to Salmonella spp. This reduces cross-reactivity and gives you confident, compliance-ready calls on the single pathogen that matters most for release."
      },
      {
        "icon": "timer",
        "title": "Faster than culture",
        "subtitle": "Result before confirmation",
        "pdfText": "A molecular result is available well before a traditional culture confirmation would be, shortening hold times and letting product move through the line instead of waiting days for the lab to clear it."
      },
      {
        "icon": "layers",
        "title": "Open platform",
        "subtitle": "Runs on your instruments",
        "pdfText": "The assay runs on the standard real-time PCR thermocyclers you already own, with no instrument lock-in or forced capital purchase, so you can deploy it across sites on existing equipment."
      },
      {
        "icon": "check",
        "title": "Lower cost per test",
        "subtitle": "Below leading platforms",
        "pdfText": "Open instruments and competitive reagent pricing keep the cost per result below the closed, proprietary systems competitors charge for, without compromising on detection performance."
      }
    ],
    "plant": [
      {
        "title": "Release ahead of culture",
        "body": "A molecular Salmonella result lands before a traditional culture confirmation ever could, so lots clear quarantine on a tighter schedule and less finished product sits tied up in hold inventory — freeing warehouse capacity and working capital for throughput."
      },
      {
        "title": "Catch contamination early",
        "body": "Screening directly for Salmonella rather than waiting on enrichment-and-plate lets the plant flag a problem lot or surface sooner, containing it before it moves downstream and turns into a far costlier event."
      },
      {
        "title": "Protect the brand",
        "body": "Reliable, specific Salmonella detection lowers the odds of a contaminated lot reaching customers — and with it the risk of a recall, regulatory action and the lasting reputational damage a single positive in market can cause."
      },
      {
        "title": "One method, every site",
        "body": "Because the assay runs on standard thermocyclers, every plant in the network runs the same validated Salmonella protocol on equipment it already owns — no capital project, no instrument lock-in, consistent results everywhere."
      }
    ],
    "lab": [
      {
        "title": "Specific by AI design",
        "body": "Mila-designed primers and probes target Salmonella spp. tightly, cutting cross-reactivity so analysts get unambiguous calls they can stand behind."
      },
      {
        "title": "Molecular, not culture",
        "body": "A molecular result is ready in hours instead of the 2–5 days a culture confirmation takes, freeing bench time and incubator space for other work."
      },
      {
        "title": "TxA runs the bench",
        "body": "TxA interprets every run automatically and publishes the result without manual transcription — standardized reads, no analyst subjectivity and less hands-on time per sample."
      },
      {
        "title": "Lower cost per result",
        "body": "Runs on the real-time PCR platforms the lab already owns — no proprietary hardware, no instrument lock-in — keeping cost per test below closed proprietary systems."
      }
    ]
  },
  "V-SF69": {
    "highlights": [
      {
        "icon": "target",
        "title": "Specific E. coli ID",
        "subtitle": "Mila AI primer design",
        "pdfText": "Mila, TAAG's AI primer-design engine, targets E. coli with high specificity, reducing cross-reactivity and giving you a dependable hygiene-indicator result you can act on with confidence."
      },
      {
        "icon": "timer",
        "title": "Faster hygiene checks",
        "subtitle": "Speeds sanitation",
        "pdfText": "Same-day molecular results let your team verify sanitation and re-clean surfaces within the shift, instead of waiting for slow culture confirmation that holds the line and the schedule."
      },
      {
        "icon": "layers",
        "title": "Open platform",
        "subtitle": "Runs on your instruments",
        "pdfText": "The assay runs on standard real-time PCR thermocyclers you already own, with no instrument lock-in or forced capital purchase, so you can deploy it across sites on existing equipment."
      },
      {
        "icon": "check",
        "title": "Lower cost per test",
        "subtitle": "Below leading platforms",
        "pdfText": "Open instruments and competitive reagent pricing keep the cost per result below the closed, proprietary systems competitors charge for, without compromising on detection performance."
      }
    ],
    "plant": [
      {
        "title": "Verify sanitation sooner",
        "body": "E. coli results arrive before culture confirmation would, so the plant learns whether a clean worked and can return surfaces to production on a tighter schedule instead of holding areas idle waiting on plates to grow."
      },
      {
        "title": "Catch hygiene drift early",
        "body": "Rapid hygiene-indicator screening surfaces sanitation problems before they compound, letting the team correct cleaning and re-test the area before contamination has any chance to reach product."
      },
      {
        "title": "Keep lines productive",
        "body": "Faster clearance than culture means suspect zones are re-cleaned and re-checked without parking production for a full incubation cycle, protecting plant throughput and the daily schedule."
      },
      {
        "title": "One method, every site",
        "body": "Running on standard thermocyclers, the same validated E. coli hygiene check deploys at every plant on existing equipment — no capital project and consistent monitoring across the network."
      }
    ],
    "lab": [
      {
        "title": "Specific by AI design",
        "body": "Mila-designed primers and probes target E. coli tightly, cutting cross-reactivity so analysts get unambiguous calls they can stand behind."
      },
      {
        "title": "Molecular, not culture",
        "body": "A molecular result is ready in hours instead of the 2–5 days a culture confirmation takes, freeing bench time and incubator space for other work."
      },
      {
        "title": "TxA runs the bench",
        "body": "TxA interprets every run automatically and publishes the result without manual transcription — standardized reads, no analyst subjectivity and less hands-on time per sample."
      },
      {
        "title": "Lower cost per result",
        "body": "Runs on the real-time PCR platforms the lab already owns — no proprietary hardware, no instrument lock-in — keeping cost per test below closed proprietary systems."
      }
    ]
  },
  "V-SF161": {
    "highlights": [
      {
        "icon": "activity",
        "title": "Detects the guaiacol gene",
        "subtitle": "The taint marker itself",
        "pdfText": "Rather than inferring risk indirectly, the assay detects the gene responsible for guaiacol production, the molecule behind medicinal off-flavors, so you target the actual cause of taint at its source."
      },
      {
        "icon": "zap",
        "title": "ACB + marker in one reaction",
        "subtitle": "One reaction",
        "pdfText": "Alicyclobacillus and the guaiacol-producing gene are screened together in a single reaction, cutting reagent and hands-on time versus running separate assays for organism and spoilage marker."
      },
      {
        "icon": "shield",
        "title": "Prevents taint",
        "subtitle": "Protects flavor",
        "pdfText": "Catching guaiacol-producing spoilage before filling protects the sensory quality of your product and helps you avoid the rejected batches and consumer complaints that medicinal off-flavors cause."
      },
      {
        "icon": "timer",
        "title": "~2 h screening",
        "subtitle": "Direct workflow",
        "pdfText": "A direct workflow returns a screening result in around two hours, fast enough to inform release decisions on the same day and keep acidified-beverage production moving without long holds."
      }
    ],
    "plant": [
      {
        "title": "Protect product flavor",
        "body": "Detecting guaiacol-producing spoilage before filling stops medicinal off-flavors from ever reaching finished product, protecting the sensory quality customers expect and heading off the rejected batches that taint complaints create."
      },
      {
        "title": "Screen in about two hours",
        "body": "A direct workflow returns a spoilage screen in roughly two hours — fast enough to inform release decisions the same day and keep acidified-beverage production moving without parking lots for long microbiological holds."
      },
      {
        "title": "Act on the true cause",
        "body": "By detecting the guaiacol gene itself rather than just an organism, the plant targets the actual source of taint risk, so corrective action addresses what genuinely threatens the batch instead of a proxy."
      },
      {
        "title": "Avoid costly recalls",
        "body": "Catching taint-forming spoilage before product ships cuts the risk of consumer complaints and recalls over medicinal off-flavors, protecting both margin and the brand's reputation for quality."
      }
    ],
    "lab": [
      {
        "title": "Two targets, one reaction",
        "body": "Alicyclobacillus spp. and Guaiacol producing bacteria are detected together in a single reaction — one assay instead of two separate assays, about 50% fewer reactions, more samples per shift and a lower cost per result."
      },
      {
        "title": "Molecular, not culture",
        "body": "A molecular result is ready in hours instead of the 2–5 days a culture confirmation takes, freeing bench time and incubator space for other work."
      },
      {
        "title": "TxA runs the bench",
        "body": "TxA calls both targets automatically and publishes the result without manual transcription — standardized reads, no analyst subjectivity and less hands-on time per sample."
      },
      {
        "title": "Lower cost per result",
        "body": "Runs on the real-time PCR platforms the lab already owns — no proprietary hardware, no instrument lock-in — keeping cost per test below closed proprietary systems."
      }
    ]
  },
  "V-SF46": {
    "highlights": [
      {
        "icon": "target",
        "title": "Species + genus",
        "subtitle": "L. mono vs Listeria spp.",
        "pdfText": "The assay distinguishes Listeria monocytogenes from the broader Listeria genus in one test, so you know not just that Listeria is present but whether it is the species that drives regulatory action."
      },
      {
        "icon": "zap",
        "title": "~50% fewer reactions",
        "subtitle": "One assay, not two",
        "pdfText": "Resolving species and genus in a single reaction halves the number of assays you would otherwise run, cutting reagent spend, hands-on time and thermocycler capacity per sample."
      },
      {
        "icon": "check",
        "title": "Sharper decisions",
        "subtitle": "Species-level result",
        "pdfText": "A species-level answer lets you calibrate your response precisely, escalating only when L. monocytogenes is confirmed and avoiding unnecessary holds when it is not, which protects both safety and throughput."
      },
      {
        "icon": "layers",
        "title": "Open platform",
        "subtitle": "Runs on your instruments",
        "pdfText": "The assay runs on standard real-time PCR thermocyclers you already own, with no instrument lock-in or forced capital purchase, so you can deploy it across sites on existing equipment."
      }
    ],
    "plant": [
      {
        "title": "Right-size every response",
        "body": "Knowing whether a positive is Listeria monocytogenes or another Listeria species lets the plant escalate only when the regulated pathogen is present and avoid full shutdowns over harmless species — calibrating the response to real risk, not a generic alarm."
      },
      {
        "title": "Decide faster, with fewer runs",
        "body": "Resolving species and genus in a single assay rather than two speeds both environmental and product decisions, so suspect areas are cleared or escalated on a tighter loop without doubling the lab's workload."
      },
      {
        "title": "Protect the brand",
        "body": "Confident species-level Listeria results lower the chance that an L. monocytogenes positive slips through or that a needless recall is triggered by a harmless species — protecting both safety and reputation."
      },
      {
        "title": "One method, every site",
        "body": "Running on standard thermocyclers, the same validated Listeria method deploys at every plant on existing equipment, with no capital project and consistent results across the network."
      }
    ],
    "lab": [
      {
        "title": "Two pathogens, one reaction",
        "body": "Listeria spp. and L. monocytogenes are detected together in a single reaction — one assay instead of two separate assays, about 50% fewer reactions, more samples per shift and a lower cost per result."
      },
      {
        "title": "Molecular, not culture",
        "body": "A molecular result is ready in hours instead of the 2–5 days a culture confirmation takes, freeing bench time and incubator space for other work."
      },
      {
        "title": "TxA runs the bench",
        "body": "TxA calls both targets automatically and publishes the result without manual transcription — standardized reads, no analyst subjectivity and less hands-on time per sample."
      },
      {
        "title": "Lower cost per result",
        "body": "Runs on the real-time PCR platforms the lab already owns — no proprietary hardware, no instrument lock-in — keeping cost per test below closed proprietary systems."
      }
    ]
  },
  "V-SF44": {
    "highlights": [
      {
        "icon": "target",
        "title": "2 pathogens, 1 reaction",
        "subtitle": "Salmonella + Listeria",
        "pdfText": "Salmonella spp. and Listeria spp., the two pathogens that dominate food-safety programs, are screened together in a single reaction, giving a combined safety read without running separate assays."
      },
      {
        "icon": "zap",
        "title": "~50% fewer reactions",
        "subtitle": "One assay, not two",
        "pdfText": "Combining both pathogens in one reaction halves the assays per sample, cutting reagent and consumable spend, freeing thermocycler capacity and reducing your team's hands-on time."
      },
      {
        "icon": "timer",
        "title": "Faster release",
        "subtitle": "Combined result",
        "pdfText": "A single combined result clears both pathogens at once, removing a sequential testing step and letting product reach release decisions sooner than running the two assays separately would allow."
      },
      {
        "icon": "layers",
        "title": "Open platform",
        "subtitle": "Runs on your instruments",
        "pdfText": "The assay runs on standard real-time PCR thermocyclers you already own, with no instrument lock-in or forced capital purchase, so you can deploy it across sites on existing equipment."
      }
    ],
    "plant": [
      {
        "title": "Clear two pathogens at once",
        "body": "Screening Salmonella and Listeria together returns both critical results in a single run, removing a sequential testing step so finished-product lots reach a release decision faster than running the two pathogens separately would allow."
      },
      {
        "title": "Cut cost per sample",
        "body": "Combining the two pathogens that dominate food-safety programs into one assay halves the reactions the lab runs per sample, and that lower cost and faster turnaround feed straight back to the plant's bottom line."
      },
      {
        "title": "Leave nothing unscreened",
        "body": "Covering both Salmonella and Listeria on every sample reduces the chance a critical pathogen goes unchecked on a given lot, tightening the plant's overall safety net without extra work."
      },
      {
        "title": "One method, every site",
        "body": "Running on standard thermocyclers, the same validated dual-pathogen assay deploys at every plant on existing equipment, with no capital project and consistent results across the network."
      }
    ],
    "lab": [
      {
        "title": "Two pathogens, one reaction",
        "body": "Listeria spp. and Salmonella spp. are detected together in a single reaction — one assay instead of two separate assays, about 50% fewer reactions, more samples per shift and a lower cost per result."
      },
      {
        "title": "Molecular, not culture",
        "body": "A molecular result is ready in hours instead of the 2–5 days a culture confirmation takes, freeing bench time and incubator space for other work."
      },
      {
        "title": "TxA runs the bench",
        "body": "TxA calls both targets automatically and publishes the result without manual transcription — standardized reads, no analyst subjectivity and less hands-on time per sample."
      },
      {
        "title": "Lower cost per result",
        "body": "Runs on the real-time PCR platforms the lab already owns — no proprietary hardware, no instrument lock-in — keeping cost per test below closed proprietary systems."
      }
    ]
  },
  "V-SF98": {
    "highlights": [
      {
        "icon": "layers",
        "title": "3 water indicators",
        "subtitle": "One reaction",
        "pdfText": "Three key water-quality indicators are screened together in a single reaction, giving a complete microbial read on process and product water without running separate tests for each indicator."
      },
      {
        "icon": "zap",
        "title": "~67% fewer reactions",
        "subtitle": "One assay, not three",
        "pdfText": "Combining three targets in one reaction cuts the assays per sample by roughly two-thirds, reducing reagent and consumable spend, freeing thermocycler capacity and saving hands-on time."
      },
      {
        "icon": "timer",
        "title": "Faster water release",
        "subtitle": "Speeds decisions",
        "pdfText": "A single same-day result clears the water-quality panel at once, letting you release process water and product sooner instead of waiting on sequential or culture-based testing."
      },
      {
        "icon": "layers",
        "title": "Open platform",
        "subtitle": "Runs on your instruments",
        "pdfText": "The assay runs on standard real-time PCR thermocyclers you already own, with no instrument lock-in or forced capital purchase, so you can deploy it across sites on existing equipment."
      }
    ],
    "plant": [
      {
        "title": "Clear water faster",
        "body": "Screening three water-quality indicators in a single run returns a complete read before culture confirmation would, so process and product water clear on a tighter schedule instead of holding operations while plates incubate."
      },
      {
        "title": "One run, full picture",
        "body": "Covering three indicators at once gives the plant a complete microbial picture of its water from a single sample, removing the gaps and delays of testing each indicator on its own."
      },
      {
        "title": "Cut testing cost",
        "body": "Combining three targets into one reaction cuts roughly two-thirds of the assays per sample, and that lower reagent and labor cost feeds straight back to the plant's water-monitoring budget."
      },
      {
        "title": "One method, every site",
        "body": "Running on standard thermocyclers, the same validated water panel deploys at every plant on existing equipment, with no capital project and consistent monitoring across the network."
      }
    ],
    "lab": [
      {
        "title": "Three pathogens, one reaction",
        "body": "E. coli, Citrobacter spp. and Klebsiella spp. are detected together in a single reaction — one assay instead of three separate assays, about 67% fewer reactions, more samples per shift and a lower cost per result."
      },
      {
        "title": "Molecular, not culture",
        "body": "A molecular result is ready in hours instead of the 2–5 days a culture confirmation takes, freeing bench time and incubator space for other work."
      },
      {
        "title": "TxA runs the bench",
        "body": "TxA calls all three targets automatically and publishes the result without manual transcription — standardized reads, no analyst subjectivity and less hands-on time per sample."
      },
      {
        "title": "Lower cost per result",
        "body": "Runs on the real-time PCR platforms the lab already owns — no proprietary hardware, no instrument lock-in — keeping cost per test below closed proprietary systems."
      }
    ]
  },
  "V-SF89": {
    "highlights": [
      {
        "icon": "layers",
        "title": "3 water indicators",
        "subtitle": "One reaction",
        "pdfText": "Three key water-quality indicators are screened together in a single reaction, giving a complete microbial read on process and product water without running separate tests for each indicator."
      },
      {
        "icon": "zap",
        "title": "~67% fewer reactions",
        "subtitle": "One assay, not three",
        "pdfText": "Combining three targets in one reaction cuts the assays per sample by roughly two-thirds, reducing reagent and consumable spend, freeing thermocycler capacity and saving hands-on time."
      },
      {
        "icon": "timer",
        "title": "Faster water release",
        "subtitle": "Speeds decisions",
        "pdfText": "A single same-day result clears the water-quality panel at once, letting you release process water and product sooner instead of waiting on sequential or culture-based testing."
      },
      {
        "icon": "layers",
        "title": "Open platform",
        "subtitle": "Runs on your instruments",
        "pdfText": "The assay runs on standard real-time PCR thermocyclers you already own, with no instrument lock-in or forced capital purchase, so you can deploy it across sites on existing equipment."
      }
    ],
    "plant": [
      {
        "title": "Clear water faster",
        "body": "Screening three water-quality indicators in a single run returns a complete read before culture confirmation would, so process and product water clear on a tighter schedule instead of holding operations while plates incubate."
      },
      {
        "title": "One run, full picture",
        "body": "Covering three indicators at once gives the plant a complete microbial picture of its water from a single sample, removing the gaps and delays of testing each indicator on its own."
      },
      {
        "title": "Cut testing cost",
        "body": "Combining three targets into one reaction cuts roughly two-thirds of the assays per sample, and that lower reagent and labor cost feeds straight back to the plant's water-monitoring budget."
      },
      {
        "title": "One method, every site",
        "body": "Running on standard thermocyclers, the same validated water panel deploys at every plant on existing equipment, with no capital project and consistent monitoring across the network."
      }
    ],
    "lab": [
      {
        "title": "Three targets, one reaction",
        "body": "Enterococcus spp., Enterobacter spp. and Escherichia spp. are detected together in a single reaction — one assay instead of three separate assays, about 67% fewer reactions, more samples per shift and a lower cost per result."
      },
      {
        "title": "Molecular, not culture",
        "body": "A molecular result is ready in hours instead of the 2–5 days a culture confirmation takes, freeing bench time and incubator space for other work."
      },
      {
        "title": "TxA runs the bench",
        "body": "TxA calls all three targets automatically and publishes the result without manual transcription — standardized reads, no analyst subjectivity and less hands-on time per sample."
      },
      {
        "title": "Lower cost per result",
        "body": "Runs on the real-time PCR platforms the lab already owns — no proprietary hardware, no instrument lock-in — keeping cost per test below closed proprietary systems."
      }
    ]
  },
  "V-SF160": {
    "highlights": [
      {
        "icon": "layers",
        "title": "3 spoilage targets",
        "subtitle": "ACB, Zygo, guaiacol gene",
        "pdfText": "Alicyclobacillus, Zygosaccharomyces and the guaiacol-producing gene are screened together in one reaction, covering the main spoilage threats to acidified beverages in a single test."
      },
      {
        "icon": "zap",
        "title": "~67% fewer reactions",
        "subtitle": "One assay, not three",
        "pdfText": "Running three spoilage targets in one reaction cuts the assays per sample by roughly two-thirds, reducing reagent and consumable spend, freeing thermocycler capacity and saving hands-on time."
      },
      {
        "icon": "activity",
        "title": "Detects the guaiacol gene",
        "subtitle": "The taint marker",
        "pdfText": "The assay detects the gene behind guaiacol production directly, targeting the molecular cause of medicinal off-flavors rather than inferring spoilage risk indirectly from organism presence alone."
      },
      {
        "icon": "shield",
        "title": "Prevents taint",
        "subtitle": "Protects flavor",
        "pdfText": "Catching guaiacol-producing spoilage before filling protects the sensory quality of your product and helps you avoid the rejected batches and consumer complaints that medicinal off-flavors cause."
      }
    ],
    "plant": [
      {
        "title": "Guard flavor on three fronts",
        "body": "Screening Alicyclobacillus, Zygosaccharomyces and the guaiacol gene together covers the main spoilage threats to acidified beverages in one run, so the plant protects sensory quality without juggling three separate spoilage tests."
      },
      {
        "title": "Act on the true cause",
        "body": "Detecting the guaiacol gene itself, not just an organism, points the team at the actual molecular source of taint, so corrective action addresses what genuinely threatens flavor rather than a proxy."
      },
      {
        "title": "Cut testing cost",
        "body": "Folding three spoilage targets into one reaction removes roughly two-thirds of the assays per sample, lowering reagent and labor cost on every acidified-beverage batch screened."
      },
      {
        "title": "Avoid costly recalls",
        "body": "Catching taint-forming spoilage before product ships reduces the risk of consumer complaints and recalls over off-flavors, protecting both margin and the brand's reputation for quality."
      }
    ],
    "lab": [
      {
        "title": "Three targets, one reaction",
        "body": "Alicyclobacillus spp., Zygosaccharomyces spp. and Guaiacol producing bacteria are detected together in a single reaction — one assay instead of three separate assays, about 67% fewer reactions, more samples per shift and a lower cost per result."
      },
      {
        "title": "Molecular, not culture",
        "body": "A molecular result is ready in hours instead of the 2–5 days a culture confirmation takes, freeing bench time and incubator space for other work."
      },
      {
        "title": "TxA runs the bench",
        "body": "TxA calls all three targets automatically and publishes the result without manual transcription — standardized reads, no analyst subjectivity and less hands-on time per sample."
      },
      {
        "title": "Lower cost per result",
        "body": "Runs on the real-time PCR platforms the lab already owns — no proprietary hardware, no instrument lock-in — keeping cost per test below closed proprietary systems."
      }
    ]
  },
  "V-SF67": {
    "highlights": [
      {
        "icon": "target",
        "title": "3 pathogens, 1 reaction",
        "subtitle": "Salmonella, L. mono, O157:H7",
        "pdfText": "The three pathogens most critical to food safety, Salmonella, Listeria monocytogenes and E. coli O157:H7, are screened together in a single reaction for a complete safety read."
      },
      {
        "icon": "zap",
        "title": "~67% fewer reactions",
        "subtitle": "One assay, not three",
        "pdfText": "Combining three pathogens in one reaction cuts the assays per sample by roughly two-thirds, reducing reagent and consumable spend, freeing thermocycler capacity and saving hands-on time."
      },
      {
        "icon": "shield",
        "title": "Comprehensive safety",
        "subtitle": "Three critical targets",
        "pdfText": "Covering three high-priority pathogens in one test gives a comprehensive safety read from a single sample, simplifying release decisions and reducing the chance a critical target goes unscreened."
      },
      {
        "icon": "layers",
        "title": "Open platform",
        "subtitle": "Runs on your instruments",
        "pdfText": "The assay runs on standard real-time PCR thermocyclers you already own, with no instrument lock-in or forced capital purchase, so you can deploy it across sites on existing equipment."
      }
    ],
    "plant": [
      {
        "title": "Screen three pathogens at once",
        "body": "Covering Salmonella, L. monocytogenes and E. coli O157:H7 in a single run gives the plant a comprehensive safety read on every sample, removing the gaps and delays of testing three critical pathogens separately."
      },
      {
        "title": "Release ahead of culture",
        "body": "Molecular results land before culture confirmation would, so lots reach a release decision on a tighter schedule and less finished product sits tied up in hold inventory waiting on the lab."
      },
      {
        "title": "Cut cost per sample",
        "body": "Combining three pathogens into one reaction removes roughly two-thirds of the assays per sample, and that lower reagent and labor cost feeds straight back to the plant's safety-testing budget."
      },
      {
        "title": "Leave nothing unscreened",
        "body": "Testing three high-priority pathogens together reduces the chance a critical target goes unchecked on a given lot, tightening the plant's safety net without tripling the workload."
      }
    ],
    "lab": [
      {
        "title": "Three pathogens, one reaction",
        "body": "Salmonella spp., L. monocytogenes and E. coli O157:H7 are detected together in a single reaction — one assay instead of three separate assays, about 67% fewer reactions, more samples per shift and a lower cost per result."
      },
      {
        "title": "Molecular, not culture",
        "body": "A molecular result is ready in hours instead of the 2–5 days a culture confirmation takes, freeing bench time and incubator space for other work."
      },
      {
        "title": "TxA runs the bench",
        "body": "TxA calls all three targets automatically and publishes the result without manual transcription — standardized reads, no analyst subjectivity and less hands-on time per sample."
      },
      {
        "title": "Lower cost per result",
        "body": "Runs on the real-time PCR platforms the lab already owns — no proprietary hardware, no instrument lock-in — keeping cost per test below closed proprietary systems."
      }
    ]
  },
  "V-SF59": {
    "highlights": [
      {
        "icon": "target",
        "title": "3 targets, 1 reaction",
        "subtitle": "Salmonella + full Listeria",
        "pdfText": "Salmonella spp. is screened alongside both Listeria monocytogenes and the broader Listeria genus in one reaction, combining pathogen detection with species-level Listeria resolution in a single test."
      },
      {
        "icon": "zap",
        "title": "~67% fewer reactions",
        "subtitle": "One assay, not three",
        "pdfText": "Running three targets in one reaction cuts the assays per sample by roughly two-thirds, reducing reagent and consumable spend, freeing thermocycler capacity and saving hands-on time."
      },
      {
        "icon": "check",
        "title": "Sharper decisions",
        "subtitle": "Species-level Listeria",
        "pdfText": "Distinguishing L. monocytogenes from the wider Listeria genus lets you escalate only when the species that drives regulatory action is confirmed, avoiding unnecessary holds when it is not."
      },
      {
        "icon": "layers",
        "title": "Open platform",
        "subtitle": "Runs on your instruments",
        "pdfText": "The assay runs on standard real-time PCR thermocyclers you already own, with no instrument lock-in or forced capital purchase, so you can deploy it across sites on existing equipment."
      }
    ],
    "plant": [
      {
        "title": "Pathogen plus full Listeria",
        "body": "Screening Salmonella alongside both L. monocytogenes and the broader Listeria genus in one run pairs pathogen detection with species-level Listeria clarity, giving the plant a sharper safety read from a single sample."
      },
      {
        "title": "Right-size the response",
        "body": "Species-level Listeria results let the plant escalate only when the regulated pathogen is confirmed and avoid needless shutdowns over harmless species, calibrating the response to real risk."
      },
      {
        "title": "Cut cost per sample",
        "body": "Folding three targets into one reaction removes roughly two-thirds of the assays per sample, and that lower reagent and labor cost feeds straight back to the plant's testing budget."
      },
      {
        "title": "One method, every site",
        "body": "Running on standard thermocyclers, the same validated assay deploys at every plant on existing equipment, with no capital project and consistent results across the network."
      }
    ],
    "lab": [
      {
        "title": "Three pathogens, one reaction",
        "body": "Salmonella spp., L. monocytogenes and Listeria spp. are detected together in a single reaction — one assay instead of three separate assays, about 67% fewer reactions, more samples per shift and a lower cost per result."
      },
      {
        "title": "Molecular, not culture",
        "body": "A molecular result is ready in hours instead of the 2–5 days a culture confirmation takes, freeing bench time and incubator space for other work."
      },
      {
        "title": "TxA runs the bench",
        "body": "TxA calls all three targets automatically and publishes the result without manual transcription — standardized reads, no analyst subjectivity and less hands-on time per sample."
      },
      {
        "title": "Lower cost per result",
        "body": "Runs on the real-time PCR platforms the lab already owns — no proprietary hardware, no instrument lock-in — keeping cost per test below closed proprietary systems."
      }
    ]
  },
  "V-SF74": {
    "highlights": [
      {
        "icon": "target",
        "title": "3 targets, 1 reaction",
        "subtitle": "Salmonella + full Listeria",
        "pdfText": "Salmonella spp. is screened alongside both Listeria monocytogenes and the broader Listeria genus in one reaction, combining pathogen detection with species-level Listeria resolution in a single test."
      },
      {
        "icon": "zap",
        "title": "~67% fewer reactions",
        "subtitle": "One assay, not three",
        "pdfText": "Running three targets in one reaction cuts the assays per sample by roughly two-thirds, reducing reagent and consumable spend, freeing thermocycler capacity and saving hands-on time."
      },
      {
        "icon": "check",
        "title": "Sharper decisions",
        "subtitle": "Species-level Listeria",
        "pdfText": "Distinguishing L. monocytogenes from the wider Listeria genus lets you escalate only when the species that drives regulatory action is confirmed, avoiding unnecessary holds when it is not."
      },
      {
        "icon": "layers",
        "title": "Open platform",
        "subtitle": "Runs on your instruments",
        "pdfText": "The assay runs on standard real-time PCR thermocyclers you already own, with no instrument lock-in or forced capital purchase, so you can deploy it across sites on existing equipment."
      }
    ],
    "plant": [
      {
        "title": "Pathogen plus full Listeria",
        "body": "Screening Salmonella alongside both L. monocytogenes and the broader Listeria genus in one run pairs pathogen detection with species-level Listeria clarity, giving the plant a sharper safety read from a single sample."
      },
      {
        "title": "Right-size the response",
        "body": "Species-level Listeria results let the plant escalate only when the regulated pathogen is confirmed and avoid needless shutdowns over harmless species, calibrating the response to real risk."
      },
      {
        "title": "Cut cost per sample",
        "body": "Folding three targets into one reaction removes roughly two-thirds of the assays per sample, and that lower reagent and labor cost feeds straight back to the plant's testing budget."
      },
      {
        "title": "One method, every site",
        "body": "Running on standard thermocyclers, the same validated assay deploys at every plant on existing equipment, with no capital project and consistent results across the network."
      }
    ],
    "lab": [
      {
        "title": "Three pathogens, one reaction",
        "body": "Salmonella spp., L. monocytogenes and Listeria spp. are detected together in a single reaction — one assay instead of three separate assays, about 67% fewer reactions, more samples per shift and a lower cost per result."
      },
      {
        "title": "Molecular, not culture",
        "body": "A molecular result is ready in hours instead of the 2–5 days a culture confirmation takes, freeing bench time and incubator space for other work."
      },
      {
        "title": "TxA runs the bench",
        "body": "TxA calls all three targets automatically and publishes the result without manual transcription — standardized reads, no analyst subjectivity and less hands-on time per sample."
      },
      {
        "title": "Lower cost per result",
        "body": "Runs on the real-time PCR platforms the lab already owns — no proprietary hardware, no instrument lock-in — keeping cost per test below closed proprietary systems."
      }
    ]
  },
  "V-SF68": {
    "highlights": [
      {
        "icon": "target",
        "title": "Full STEC panel",
        "subtitle": "STEC, O157:H7, Salmonella",
        "pdfText": "Shiga toxin-producing E. coli, the O157:H7 serotype and Salmonella spp. are screened together in one reaction, covering the core of a STEC monitoring program in a single test."
      },
      {
        "icon": "zap",
        "title": "~67% fewer reactions",
        "subtitle": "One assay, not three",
        "pdfText": "Combining three targets in one reaction cuts the assays per sample by roughly two-thirds, reducing reagent and consumable spend, freeing thermocycler capacity and saving hands-on time."
      },
      {
        "icon": "check",
        "title": "STEC strain ID",
        "subtitle": "Beyond generic E. coli",
        "pdfText": "The assay resolves Shiga toxin-producing strains specifically, going beyond a generic E. coli result so you can identify the pathogenic strains that carry real public-health and recall risk."
      },
      {
        "icon": "layers",
        "title": "Open platform",
        "subtitle": "Runs on your instruments",
        "pdfText": "The assay runs on standard real-time PCR thermocyclers you already own, with no instrument lock-in or forced capital purchase, so you can deploy it across sites on existing equipment."
      }
    ],
    "plant": [
      {
        "title": "Cover the STEC risk",
        "body": "Screening Shiga toxin-producing E. coli, O157:H7 and Salmonella together covers the core of a STEC monitoring program in one run, giving the plant a comprehensive read on the strains that carry real recall risk."
      },
      {
        "title": "Identify the dangerous strains",
        "body": "Resolving STEC specifically rather than reporting generic E. coli lets the plant act on the pathogenic strains that matter for public health, instead of treating all E. coli signals the same."
      },
      {
        "title": "Cut cost per sample",
        "body": "Folding three targets into one reaction removes roughly two-thirds of the assays per sample, and that lower reagent and labor cost feeds straight back to the plant's safety-testing budget."
      },
      {
        "title": "Leave nothing unscreened",
        "body": "Covering STEC, O157:H7 and Salmonella together reduces the chance a critical target goes unchecked on a given lot, tightening the safety net without tripling the workload."
      }
    ],
    "lab": [
      {
        "title": "Three pathogens, one reaction",
        "body": "E. coli STEC, E. coli O157:H7 and Salmonella spp. are detected together in a single reaction — one assay instead of three separate assays, about 67% fewer reactions, more samples per shift and a lower cost per result."
      },
      {
        "title": "Molecular, not culture",
        "body": "A molecular result is ready in hours instead of the 2–5 days a culture confirmation takes, freeing bench time and incubator space for other work."
      },
      {
        "title": "TxA runs the bench",
        "body": "TxA calls all three targets automatically and publishes the result without manual transcription — standardized reads, no analyst subjectivity and less hands-on time per sample."
      },
      {
        "title": "Lower cost per result",
        "body": "Runs on the real-time PCR platforms the lab already owns — no proprietary hardware, no instrument lock-in — keeping cost per test below closed proprietary systems."
      }
    ]
  },
  "V-SF100": {
    "highlights": [
      {
        "icon": "layers",
        "title": "4 beer yeasts",
        "subtitle": "One reaction",
        "pdfText": "Four of the yeasts most responsible for beer spoilage are screened together in a single reaction, covering the core fermentation and contamination risks in one test instead of four."
      },
      {
        "icon": "zap",
        "title": "~75% fewer reactions",
        "subtitle": "One assay, not four",
        "pdfText": "Running four targets in one reaction cuts the assays per sample by about three-quarters, reducing reagent and consumable spend, freeing thermocycler capacity and saving hands-on time."
      },
      {
        "icon": "timer",
        "title": "~2.5 h screening",
        "subtitle": "Direct beer workflow",
        "pdfText": "A direct beer workflow returns a result in around two and a half hours, fast enough to inform release and tank decisions on the same day without long microbiological holds."
      },
      {
        "icon": "shield",
        "title": "Protects shelf life",
        "subtitle": "Early detection",
        "pdfText": "Detecting spoilage yeast early lets you intervene before it compromises a batch, protecting product shelf life and reducing the risk of cloudy, off-flavored or gushing beer reaching the market."
      }
    ],
    "plant": [
      {
        "title": "Screen in about 2.5 hours",
        "body": "A direct beer workflow returns a four-yeast spoilage screen in roughly two and a half hours, fast enough to inform tank and release decisions the same day instead of parking product for a long microbiological hold."
      },
      {
        "title": "Protect shelf life",
        "body": "Detecting spoilage yeast early lets the brewery intervene before it compromises a batch, protecting product shelf life and heading off the cloudy, off-flavored or gushing beer that drives complaints and returns."
      },
      {
        "title": "One run, four threats",
        "body": "Covering the four yeasts most responsible for beer spoilage in a single reaction gives the plant a complete yeast-risk read per sample without juggling four separate tests."
      },
      {
        "title": "Cut testing cost",
        "body": "Folding four targets into one reaction removes about three-quarters of the assays per sample, lowering reagent and labor cost on every batch the brewery screens."
      }
    ],
    "lab": [
      {
        "title": "Five targets, one reaction",
        "body": "Five targets run together in a single reaction — one assay instead of five separate assays, about 80% fewer reactions, more samples per shift and a lower cost per result."
      },
      {
        "title": "Molecular, not culture",
        "body": "A molecular result is ready in hours instead of the 2–5 days a culture confirmation takes, freeing bench time and incubator space for other work."
      },
      {
        "title": "TxA runs the bench",
        "body": "TxA calls all five targets automatically and publishes the result without manual transcription — standardized reads, no analyst subjectivity and less hands-on time per sample."
      },
      {
        "title": "Lower cost per result",
        "body": "Runs on the real-time PCR platforms the lab already owns — no proprietary hardware, no instrument lock-in — keeping cost per test below closed proprietary systems."
      }
    ]
  },
  "V-SF101": {
    "highlights": [
      {
        "icon": "layers",
        "title": "4 beer yeasts",
        "subtitle": "One reaction",
        "pdfText": "Four of the yeasts most responsible for beer spoilage are screened together in a single reaction, covering the core fermentation and contamination risks in one test instead of four."
      },
      {
        "icon": "zap",
        "title": "~75% fewer reactions",
        "subtitle": "One assay, not four",
        "pdfText": "Running four targets in one reaction cuts the assays per sample by about three-quarters, reducing reagent and consumable spend, freeing thermocycler capacity and saving hands-on time."
      },
      {
        "icon": "timer",
        "title": "~2.5 h screening",
        "subtitle": "Direct beer workflow",
        "pdfText": "A direct beer workflow returns a result in around two and a half hours, fast enough to inform release and tank decisions on the same day without long microbiological holds."
      },
      {
        "icon": "shield",
        "title": "Protects shelf life",
        "subtitle": "Early detection",
        "pdfText": "Detecting spoilage yeast early lets you intervene before it compromises a batch, protecting product shelf life and reducing the risk of cloudy, off-flavored or gushing beer reaching the market."
      }
    ],
    "plant": [
      {
        "title": "Screen in about 2.5 hours",
        "body": "A direct beer workflow returns a four-yeast spoilage screen in roughly two and a half hours, fast enough to inform tank and release decisions the same day instead of parking product for a long microbiological hold."
      },
      {
        "title": "Protect shelf life",
        "body": "Detecting spoilage yeast early lets the brewery intervene before it compromises a batch, protecting product shelf life and heading off the cloudy, off-flavored or gushing beer that drives complaints and returns."
      },
      {
        "title": "One run, four threats",
        "body": "Covering the four yeasts most responsible for beer spoilage in a single reaction gives the plant a complete yeast-risk read per sample without juggling four separate tests."
      },
      {
        "title": "Cut testing cost",
        "body": "Folding four targets into one reaction removes about three-quarters of the assays per sample, lowering reagent and labor cost on every batch the brewery screens."
      }
    ],
    "lab": [
      {
        "title": "Four targets, one reaction",
        "body": "Four targets run together in a single reaction — one assay instead of four separate assays, about 75% fewer reactions, more samples per shift and a lower cost per result."
      },
      {
        "title": "Molecular, not culture",
        "body": "A molecular result is ready in hours instead of the 2–5 days a culture confirmation takes, freeing bench time and incubator space for other work."
      },
      {
        "title": "TxA runs the bench",
        "body": "TxA calls all four targets automatically and publishes the result without manual transcription — standardized reads, no analyst subjectivity and less hands-on time per sample."
      },
      {
        "title": "Lower cost per result",
        "body": "Runs on the real-time PCR platforms the lab already owns — no proprietary hardware, no instrument lock-in — keeping cost per test below closed proprietary systems."
      }
    ]
  },
  "V-SF102": {
    "highlights": [
      {
        "icon": "layers",
        "title": "4 beer bacteria",
        "subtitle": "One reaction",
        "pdfText": "Four of the bacteria most responsible for beer spoilage are screened together in a single reaction, covering the main bacterial contamination risks in one test instead of four."
      },
      {
        "icon": "zap",
        "title": "~75% fewer reactions",
        "subtitle": "One assay, not four",
        "pdfText": "Running four targets in one reaction cuts the assays per sample by about three-quarters, reducing reagent and consumable spend, freeing thermocycler capacity and saving hands-on time."
      },
      {
        "icon": "timer",
        "title": "~2.5 h screening",
        "subtitle": "Direct beer workflow",
        "pdfText": "A direct beer workflow returns a result in around two and a half hours, fast enough to inform release and tank decisions on the same day without long microbiological holds."
      },
      {
        "icon": "shield",
        "title": "Protects shelf life",
        "subtitle": "Early detection",
        "pdfText": "Detecting spoilage bacteria early lets you intervene before they compromise a batch, protecting product shelf life and reducing the risk of sour, turbid or off-flavored beer reaching the market."
      }
    ],
    "plant": [
      {
        "title": "Screen in about 2.5 hours",
        "body": "A direct beer workflow returns a four-bacteria spoilage screen in roughly two and a half hours, fast enough to inform tank and release decisions the same day instead of parking product for a long microbiological hold."
      },
      {
        "title": "Protect shelf life",
        "body": "Detecting spoilage bacteria early lets the brewery intervene before they compromise a batch, protecting product shelf life and heading off the sour, turbid or off-flavored beer that drives complaints and returns."
      },
      {
        "title": "One run, four threats",
        "body": "Covering the four bacteria most responsible for beer spoilage in a single reaction gives the plant a complete bacterial-risk read per sample without juggling four separate tests."
      },
      {
        "title": "Cut testing cost",
        "body": "Folding four targets into one reaction removes about three-quarters of the assays per sample, lowering reagent and labor cost on every batch the brewery screens."
      }
    ],
    "lab": [
      {
        "title": "Four targets, one reaction",
        "body": "Four targets run together in a single reaction — one assay instead of four separate assays, about 75% fewer reactions, more samples per shift and a lower cost per result."
      },
      {
        "title": "Molecular, not culture",
        "body": "A molecular result is ready in hours instead of the 2–5 days a culture confirmation takes, freeing bench time and incubator space for other work."
      },
      {
        "title": "TxA runs the bench",
        "body": "TxA calls all four targets automatically and publishes the result without manual transcription — standardized reads, no analyst subjectivity and less hands-on time per sample."
      },
      {
        "title": "Lower cost per result",
        "body": "Runs on the real-time PCR platforms the lab already owns — no proprietary hardware, no instrument lock-in — keeping cost per test below closed proprietary systems."
      }
    ]
  },
  "V-SF103": {
    "highlights": [
      {
        "icon": "layers",
        "title": "4 anaerobe spoilers",
        "subtitle": "One reaction",
        "pdfText": "Four strict-anaerobe beer spoilers are screened together in a single reaction, covering hard-to-detect contamination risks in one test instead of four separate assays."
      },
      {
        "icon": "zap",
        "title": "~75% fewer reactions",
        "subtitle": "One assay, not four",
        "pdfText": "Running four targets in one reaction cuts the assays per sample by about three-quarters, reducing reagent and consumable spend, freeing thermocycler capacity and saving hands-on time."
      },
      {
        "icon": "target",
        "title": "Catches what culture misses",
        "subtitle": "Strict anaerobes",
        "pdfText": "Strict anaerobes are notoriously difficult to recover on plates; molecular detection catches these spoilers that conventional culture frequently misses, closing a real gap in beer monitoring."
      },
      {
        "icon": "timer",
        "title": "~2.5 h screening",
        "subtitle": "Direct beer workflow",
        "pdfText": "A direct beer workflow returns a result in around two and a half hours, fast enough to inform release and tank decisions on the same day without long microbiological holds."
      }
    ],
    "plant": [
      {
        "title": "Catch what culture misses",
        "body": "Strict anaerobe spoilers are notoriously hard to recover on plates; molecular detection catches these organisms that conventional culture frequently misses, closing a real blind spot in the brewery's monitoring."
      },
      {
        "title": "Screen in about 2.5 hours",
        "body": "A direct beer workflow returns a four-target anaerobe screen in roughly two and a half hours, fast enough to inform tank and release decisions the same day instead of parking product for a long hold."
      },
      {
        "title": "One run, four threats",
        "body": "Covering four strict-anaerobe spoilers in a single reaction gives the plant a complete read on these hard-to-detect organisms per sample without juggling four separate tests."
      },
      {
        "title": "Cut testing cost",
        "body": "Folding four targets into one reaction removes about three-quarters of the assays per sample, lowering reagent and labor cost on every batch the brewery screens."
      }
    ],
    "lab": [
      {
        "title": "Five targets, one reaction",
        "body": "Five targets run together in a single reaction — one assay instead of five separate assays, about 80% fewer reactions, more samples per shift and a lower cost per result."
      },
      {
        "title": "Molecular, not culture",
        "body": "A molecular result is ready in hours instead of the 2–5 days a culture confirmation takes, freeing bench time and incubator space for other work."
      },
      {
        "title": "TxA runs the bench",
        "body": "TxA calls all five targets automatically and publishes the result without manual transcription — standardized reads, no analyst subjectivity and less hands-on time per sample."
      },
      {
        "title": "Lower cost per result",
        "body": "Runs on the real-time PCR platforms the lab already owns — no proprietary hardware, no instrument lock-in — keeping cost per test below closed proprietary systems."
      }
    ]
  },
  "V-SF169": {
    "highlights": [
      {
        "icon": "layers",
        "title": "Comprehensive coverage",
        "subtitle": "Detects 100+ acidophilic bacteria and 100+ yeasts and molds in one reaction.",
        "pdfText": "Detects 100+ acidophilic bacteria and 100+ yeasts and molds simultaneously, covering the four spoilage groups that threaten low-pH beverages in a single reaction."
      },
      {
        "icon": "zap",
        "title": "Rapid results (52 hrs.)",
        "subtitle": "Spoilage risk known in under 52 hours instead of 5-7 days of plating.",
        "pdfText": "Cuts time-to-result from 5-7 days of traditional plating to under 52 hours, so spoilage risk is known in time to act before product ships."
      },
      {
        "icon": "target",
        "title": "Multiplex efficiency",
        "subtitle": "Multiple culture-media tests consolidated into one streamlined PCR workflow.",
        "pdfText": "Consolidates multiple culture-media tests into one streamlined PCR workflow, cutting reagent use, hands-on time and the complexity of running separate assays."
      },
      {
        "icon": "shield",
        "title": "Built for low pH",
        "subtitle": "Targets the spoilage profile of acidified products, not a generic organism list.",
        "pdfText": "Designed specifically for the spoilage profile of acidified and low-pH products, targeting the organisms that genuinely threaten this category rather than a generic spoilage list."
      }
    ],
    "plant": [
      {
        "title": "Confident release",
        "body": "Results for the specific spoilage organisms that matter arrive fast enough to wait for them before release, so beverages leave the plant with verified microbial status instead of on a calculated risk."
      },
      {
        "title": "Stop holding good product",
        "body": "By detecting only the relevant spoilage organisms, the panel clears unaffected batches quickly, freeing product that traditional broad-spectrum holds would have kept waiting unnecessarily."
      },
      {
        "title": "Contain contamination early",
        "body": "Slow results delay corrective action and let contamination spread across batches. Results in under 52 hours enable fast corrective action that prevents cross-contamination before it compounds."
      },
      {
        "title": "Lower storage costs",
        "body": "Fewer products sitting in quarantine means less warehousing and refrigeration tied up in hold inventory, turning faster release directly into lower carrying cost."
      }
    ],
    "lab": [
      {
        "title": "Four targets, one reaction",
        "body": "Four targets run together in a single reaction — one assay instead of four separate assays, about 75% fewer reactions, more samples per shift and a lower cost per result."
      },
      {
        "title": "Molecular, not culture",
        "body": "A molecular result is ready in hours instead of the 2–5 days a culture confirmation takes, freeing bench time and incubator space for other work."
      },
      {
        "title": "TxA runs the bench",
        "body": "TxA calls all four targets automatically and publishes the result without manual transcription — standardized reads, no analyst subjectivity and less hands-on time per sample."
      },
      {
        "title": "Lower cost per result",
        "body": "Runs on the real-time PCR platforms the lab already owns — no proprietary hardware, no instrument lock-in — keeping cost per test below closed proprietary systems."
      }
    ],
    "detectedList": [
      "100+ Acidophilic bacteria",
      "Preservative resistant yeasts",
      "Brettanomyces spp.",
      "100+ Yeasts & Molds"
    ],
    "description": "Traditional plating methods for spoilage organisms can take up to 7 days, leaving your supply chain in limbo and your brand exposed to risk. The Ampliora 4.7 Low-pH Microorganisms kit uses high-capacity multiplex PCR to detect the most critical beverage spoilers in a single reaction. By identifying hundreds of spoilage microorganisms before they compromise product quality, you can protect shelf-life, prevent package swelling and off-flavors, and release your beverages to market with confidence."
  },
  "V-SF88": {
    "highlights": [
      {
        "icon": "layers",
        "title": "6 water indicators",
        "subtitle": "Extended panel, one reaction",
        "pdfText": "Six water-quality indicators are screened together in a single reaction, giving the broadest microbial read on process and product water available in one extended-panel test."
      },
      {
        "icon": "zap",
        "title": "~83% fewer reactions",
        "subtitle": "One assay, not six",
        "pdfText": "Running six targets in one reaction cuts the assays per sample by roughly five-sixths, reducing reagent and consumable spend, freeing thermocycler capacity and saving hands-on time."
      },
      {
        "icon": "shield",
        "title": "Broadest coverage",
        "subtitle": "Per water sample",
        "pdfText": "The extended panel delivers the widest indicator coverage per water sample, giving you the most complete microbial picture from a single test for high-assurance water monitoring."
      },
      {
        "icon": "layers",
        "title": "Open platform",
        "subtitle": "Runs on your instruments",
        "pdfText": "The assay runs on standard real-time PCR thermocyclers you already own, with no instrument lock-in or forced capital purchase, so you can deploy it across sites on existing equipment."
      }
    ],
    "plant": [
      {
        "title": "Broadest water coverage",
        "body": "The extended panel screens six water-quality indicators in one run, giving the plant the widest microbial picture of its process and product water available from a single sample for high-assurance monitoring."
      },
      {
        "title": "One run, full assurance",
        "body": "Covering six indicators at once removes the gaps and delays of testing each separately, so the plant gets a complete water read from one sample instead of stitching together multiple tests."
      },
      {
        "title": "Cut testing cost",
        "body": "Folding six targets into one reaction removes roughly five-sixths of the assays per sample, sharply lowering reagent and labor cost on every water sample screened."
      },
      {
        "title": "One method, every site",
        "body": "Running on standard thermocyclers, the same validated extended water panel deploys at every plant on existing equipment, with no capital project and consistent monitoring across the network."
      }
    ],
    "lab": [
      {
        "title": "Six pathogens, one reaction",
        "body": "Six pathogens run together in a single reaction — one assay instead of six separate assays, about 83% fewer reactions, more samples per shift and a lower cost per result."
      },
      {
        "title": "Molecular, not culture",
        "body": "A molecular result is ready in hours instead of the 2–5 days a culture confirmation takes, freeing bench time and incubator space for other work."
      },
      {
        "title": "TxA runs the bench",
        "body": "TxA calls all six targets automatically and publishes the result without manual transcription — standardized reads, no analyst subjectivity and less hands-on time per sample."
      },
      {
        "title": "Lower cost per result",
        "body": "Runs on the real-time PCR platforms the lab already owns — no proprietary hardware, no instrument lock-in — keeping cost per test below closed proprietary systems."
      }
    ]
  },
  "V-SF64": {
    "highlights": [
      {
        "icon": "layers",
        "title": "8 beer yeasts",
        "subtitle": "Comprehensive panel",
        "pdfText": "Eight beer-spoilage yeasts are screened together in a single reaction, giving a comprehensive yeast risk profile from one test rather than running eight separate assays."
      },
      {
        "icon": "zap",
        "title": "~89% fewer reactions",
        "subtitle": "One assay, not eight",
        "pdfText": "Running eight targets in one reaction cuts the assays per sample by nearly nine-tenths, dramatically reducing reagent and consumable spend, thermocycler load and hands-on time."
      },
      {
        "icon": "shield",
        "title": "Full yeast coverage",
        "subtitle": "Complete risk profile",
        "pdfText": "Covering eight spoilage yeasts in one assay gives a complete view of fermentation and contamination risk, leaving little chance that a relevant spoilage yeast goes unscreened."
      },
      {
        "icon": "timer",
        "title": "~2.5 h screening",
        "subtitle": "Direct beer workflow",
        "pdfText": "A direct beer workflow returns a result in around two and a half hours, fast enough to inform release and tank decisions on the same day without long microbiological holds."
      }
    ],
    "plant": [
      {
        "title": "Complete yeast risk profile",
        "body": "Covering eight beer-spoilage yeasts in a single run gives the brewery a comprehensive view of fermentation and contamination risk, leaving little chance a relevant spoilage yeast goes unscreened on any batch."
      },
      {
        "title": "Screen in about 2.5 hours",
        "body": "A direct beer workflow returns the full eight-yeast screen in roughly two and a half hours, fast enough to inform tank and release decisions the same day instead of parking product for a long hold."
      },
      {
        "title": "One run, eight threats",
        "body": "Folding eight targets into one reaction replaces what would otherwise be eight separate tests, giving the plant complete yeast coverage per sample with a single screen."
      },
      {
        "title": "Cut testing cost",
        "body": "Combining eight targets into one reaction removes nearly nine-tenths of the assays per sample, dramatically lowering reagent and labor cost on every batch screened."
      }
    ],
    "lab": [
      {
        "title": "Nine targets, one reaction",
        "body": "Nine targets run together in a single reaction — one assay instead of nine separate assays, about 89% fewer reactions, more samples per shift and a lower cost per result."
      },
      {
        "title": "Molecular, not culture",
        "body": "A molecular result is ready in hours instead of the 2–5 days a culture confirmation takes, freeing bench time and incubator space for other work."
      },
      {
        "title": "TxA runs the bench",
        "body": "TxA calls all nine targets automatically and publishes the result without manual transcription — standardized reads, no analyst subjectivity and less hands-on time per sample."
      },
      {
        "title": "Lower cost per result",
        "body": "Runs on the real-time PCR platforms the lab already owns — no proprietary hardware, no instrument lock-in — keeping cost per test below closed proprietary systems."
      }
    ]
  },
  "V-SF99": {
    "highlights": [
      {
        "icon": "layers",
        "title": "8 beer bacteria",
        "subtitle": "Comprehensive panel",
        "pdfText": "Eight beer-spoilage bacteria are screened together in a single reaction, giving a comprehensive bacterial risk profile from one test rather than running eight separate assays."
      },
      {
        "icon": "zap",
        "title": "~89% fewer reactions",
        "subtitle": "One assay, not eight",
        "pdfText": "Running eight targets in one reaction cuts the assays per sample by nearly nine-tenths, dramatically reducing reagent and consumable spend, thermocycler load and hands-on time."
      },
      {
        "icon": "shield",
        "title": "Full bacterial coverage",
        "subtitle": "Complete risk profile",
        "pdfText": "Covering eight spoilage bacteria in one assay gives a complete view of bacterial contamination risk, leaving little chance that a relevant spoilage organism goes unscreened."
      },
      {
        "icon": "timer",
        "title": "~2.5 h screening",
        "subtitle": "Direct beer workflow",
        "pdfText": "A direct beer workflow returns a result in around two and a half hours, fast enough to inform release and tank decisions on the same day without long microbiological holds."
      }
    ],
    "plant": [
      {
        "title": "Complete bacterial risk profile",
        "body": "Covering eight beer-spoilage bacteria in a single run gives the brewery a comprehensive view of bacterial contamination risk, leaving little chance a relevant spoiler goes unscreened on any batch."
      },
      {
        "title": "Screen in about 2.5 hours",
        "body": "A direct beer workflow returns the full eight-bacteria screen in roughly two and a half hours, fast enough to inform tank and release decisions the same day instead of parking product for a long hold."
      },
      {
        "title": "One run, eight threats",
        "body": "Folding eight targets into one reaction replaces what would otherwise be eight separate tests, giving the plant complete bacterial coverage per sample with a single screen."
      },
      {
        "title": "Cut testing cost",
        "body": "Combining eight targets into one reaction removes nearly nine-tenths of the assays per sample, dramatically lowering reagent and labor cost on every batch screened."
      }
    ],
    "lab": [
      {
        "title": "Nine targets, one reaction",
        "body": "Nine targets run together in a single reaction — one assay instead of nine separate assays, about 89% fewer reactions, more samples per shift and a lower cost per result."
      },
      {
        "title": "Molecular, not culture",
        "body": "A molecular result is ready in hours instead of the 2–5 days a culture confirmation takes, freeing bench time and incubator space for other work."
      },
      {
        "title": "TxA runs the bench",
        "body": "TxA calls all nine targets automatically and publishes the result without manual transcription — standardized reads, no analyst subjectivity and less hands-on time per sample."
      },
      {
        "title": "Lower cost per result",
        "body": "Runs on the real-time PCR platforms the lab already owns — no proprietary hardware, no instrument lock-in — keeping cost per test below closed proprietary systems."
      }
    ]
  },
  "V-SF14": {
    "highlights": [
      {
        "icon": "layers",
        "title": "80+ bacteria detected",
        "subtitle": "Unmatched spoilage breadth",
        "pdfText": "A single assay screens for more than eighty spoilage bacteria at once, a breadth no competing kit matches, giving you a true broad-spectrum view of bacterial risk from one reaction."
      },
      {
        "icon": "zap",
        "title": "One reaction",
        "subtitle": "Replaces entire panels",
        "pdfText": "Instead of running many targeted assays, one Specio reaction covers the whole spoilage panel, cutting reagent spend, hands-on time and the complexity of managing separate tests."
      },
      {
        "icon": "activity",
        "title": "AI melting-curve",
        "subtitle": "FAM-only, simple setup",
        "pdfText": "KAi reads a FAM-only melting curve interpreted by AI, so a single simple channel resolves many organisms, with no complex multi-dye setup and no manual curve reading for your analysts."
      },
      {
        "icon": "shield",
        "title": "Protects shelf life",
        "subtitle": "Broad early detection",
        "pdfText": "Catching a wide range of spoilage bacteria early lets you act before they compromise a batch, protecting product shelf life and reducing the risk of costly spoilage complaints."
      }
    ],
    "plant": [
      {
        "title": "One test, the whole picture",
        "body": "Screening more than eighty spoilage bacteria in a single reaction gives the plant a true broad-spectrum view of microbial risk from one sample — a breadth no targeted assay matches, catching threats a narrow panel would miss entirely."
      },
      {
        "title": "Protect shelf life",
        "body": "Catching a wide range of spoilage bacteria early lets the plant act before they compromise a batch, protecting product shelf life and heading off the costly spoilage complaints and returns that slip past narrow testing."
      },
      {
        "title": "Replace whole panels",
        "body": "Because one Specio reaction covers what would otherwise take an entire panel of separate assays, the plant simplifies its spoilage program dramatically while widening coverage at the same time."
      },
      {
        "title": "One method, every site",
        "body": "Running on standard thermocyclers with a simple FAM-only setup, the same broad spoilage screen deploys at every plant on existing equipment, with no capital project and consistent monitoring across the network."
      }
    ],
    "lab": [
      {
        "title": "Confirmed by melting curve",
        "body": "KAi melting-curve analysis confirms Spoilage Bacteria by its signature, giving analysts clean, unambiguous calls and fewer ambiguous repeats."
      },
      {
        "title": "Molecular, not culture",
        "body": "A molecular result is ready in hours instead of the 2–5 days a culture confirmation takes, freeing bench time and incubator space for other work."
      },
      {
        "title": "TxA runs the bench",
        "body": "TxA interprets every run automatically and publishes the result without manual transcription — standardized reads, no analyst subjectivity and less hands-on time per sample."
      },
      {
        "title": "Lower cost per result",
        "body": "Runs on the real-time PCR platforms the lab already owns — no proprietary hardware, no instrument lock-in — keeping cost per test below closed proprietary systems."
      }
    ]
  },
  "V-SF15": {
    "highlights": [
      {
        "icon": "layers",
        "title": "50+ yeasts & molds",
        "subtitle": "Unmatched fungal breadth",
        "pdfText": "A single assay screens for more than fifty spoilage yeasts and molds, a fungal breadth no competing kit matches, giving you a broad-spectrum view of contamination risk from one reaction."
      },
      {
        "icon": "zap",
        "title": "One reaction",
        "subtitle": "Replaces entire panels",
        "pdfText": "Instead of running many targeted assays, one Specio reaction covers the whole fungal spoilage panel, cutting reagent spend, hands-on time and the complexity of managing separate tests."
      },
      {
        "icon": "timer",
        "title": "Days faster than culture",
        "subtitle": "vs. slow mold growth",
        "pdfText": "Molds can take days to grow on plates; molecular detection returns a result in hours, removing the long incubation wait and letting you make release decisions days sooner."
      },
      {
        "icon": "activity",
        "title": "AI melting-curve",
        "subtitle": "FAM-only, simple setup",
        "pdfText": "KAi reads a FAM-only melting curve interpreted by AI, so a single simple channel resolves many organisms, with no complex multi-dye setup and no manual curve reading for your analysts."
      }
    ],
    "plant": [
      {
        "title": "Days faster than culture",
        "body": "Molds can take days to grow on plates; molecular detection returns a result in a fraction of that time, so the plant makes release decisions days sooner instead of waiting out slow fungal incubation."
      },
      {
        "title": "One test, the whole picture",
        "body": "Screening more than fifty spoilage yeasts and molds in a single reaction gives the plant a broad-spectrum fungal-risk view no targeted assay matches, catching contamination a narrow panel would miss."
      },
      {
        "title": "Protect shelf life",
        "body": "Catching a wide range of spoilage fungi early lets the plant act before they compromise a batch, protecting shelf life and heading off the visible spoilage and complaints that drive returns."
      },
      {
        "title": "Replace whole panels",
        "body": "Because one Specio reaction covers what would otherwise take an entire fungal panel, the plant simplifies its spoilage program while widening coverage at the same time."
      }
    ],
    "lab": [
      {
        "title": "Confirmed by melting curve",
        "body": "KAi melting-curve analysis confirms Yeasts and molds by its signature, giving analysts clean, unambiguous calls and fewer ambiguous repeats."
      },
      {
        "title": "Molecular, not culture",
        "body": "A molecular result is ready in hours instead of the 2–5 days a culture confirmation takes, freeing bench time and incubator space for other work."
      },
      {
        "title": "TxA runs the bench",
        "body": "TxA interprets every run automatically and publishes the result without manual transcription — standardized reads, no analyst subjectivity and less hands-on time per sample."
      },
      {
        "title": "Lower cost per result",
        "body": "Runs on the real-time PCR platforms the lab already owns — no proprietary hardware, no instrument lock-in — keeping cost per test below closed proprietary systems."
      }
    ]
  },
  "V-SF31": {
    "highlights": [
      {
        "icon": "target",
        "title": "Specific Salmonella ID",
        "subtitle": "KAi melting-curve",
        "pdfText": "KAi's AI-interpreted melting curve identifies Salmonella spp. with high specificity, giving you confident, compliance-ready calls on the pathogen that matters most for release."
      },
      {
        "icon": "layers",
        "title": "FAM-only setup",
        "subtitle": "Runs on open instruments",
        "pdfText": "A simple FAM-only configuration runs on the standard real-time PCR thermocyclers you already own, with no multi-dye complexity and no instrument lock-in across your sites."
      },
      {
        "icon": "timer",
        "title": "Faster than culture",
        "subtitle": "Result before confirmation",
        "pdfText": "A molecular result is available well before a traditional culture confirmation would be, shortening hold times and letting product move instead of waiting days for the lab."
      },
      {
        "icon": "check",
        "title": "Lower cost per test",
        "subtitle": "Below leading platforms",
        "pdfText": "Open instruments and competitive reagent pricing keep the cost per result below the closed, proprietary systems competitors charge for, without compromising detection performance."
      }
    ],
    "plant": [
      {
        "title": "Release ahead of culture",
        "body": "A molecular Salmonella result lands before culture confirmation would, so lots clear quarantine on a tighter schedule and less finished product sits tied up in hold inventory waiting on the lab."
      },
      {
        "title": "Catch contamination early",
        "body": "Screening directly for Salmonella rather than waiting on enrichment-and-plate lets the plant flag a problem lot or surface sooner, containing it before it moves downstream into a costlier event."
      },
      {
        "title": "Protect the brand",
        "body": "Specific, reliable Salmonella detection lowers the odds of a contaminated lot reaching customers, reducing the risk of recalls, regulatory action and the reputational damage a positive in market causes."
      },
      {
        "title": "One method, every site",
        "body": "Running on standard thermocyclers with a simple FAM-only setup, the same validated Salmonella method deploys at every plant on existing equipment with no capital project."
      }
    ],
    "lab": [
      {
        "title": "Confirmed by melting curve",
        "body": "KAi melting-curve analysis confirms Salmonella spp. by its signature, giving analysts clean, unambiguous calls and fewer ambiguous repeats."
      },
      {
        "title": "Molecular, not culture",
        "body": "A molecular result is ready in hours instead of the 2–5 days a culture confirmation takes, freeing bench time and incubator space for other work."
      },
      {
        "title": "TxA runs the bench",
        "body": "TxA interprets every run automatically and publishes the result without manual transcription — standardized reads, no analyst subjectivity and less hands-on time per sample."
      },
      {
        "title": "Lower cost per result",
        "body": "Runs on the real-time PCR platforms the lab already owns — no proprietary hardware, no instrument lock-in — keeping cost per test below closed proprietary systems."
      }
    ]
  },
  "V-SF39": {
    "highlights": [
      {
        "icon": "target",
        "title": "Specific S. aureus ID",
        "subtitle": "KAi melting-curve",
        "pdfText": "KAi's AI-interpreted melting curve identifies Staphylococcus aureus with high specificity, giving you a dependable hygiene and safety result you can act on with confidence."
      },
      {
        "icon": "layers",
        "title": "FAM-only setup",
        "subtitle": "Runs on open instruments",
        "pdfText": "A simple FAM-only configuration runs on the standard real-time PCR thermocyclers you already own, with no multi-dye complexity and no instrument lock-in across your sites."
      },
      {
        "icon": "timer",
        "title": "Faster hygiene checks",
        "subtitle": "Speeds sanitation",
        "pdfText": "Same-day results let your team verify sanitation and re-clean surfaces within the shift, instead of waiting for slow culture confirmation that holds the line and the schedule."
      },
      {
        "icon": "check",
        "title": "Lower cost per test",
        "subtitle": "Below leading platforms",
        "pdfText": "Open instruments and competitive reagent pricing keep the cost per result below the closed, proprietary systems competitors charge for, without compromising detection performance."
      }
    ],
    "plant": [
      {
        "title": "Verify hygiene sooner",
        "body": "S. aureus results arrive before culture confirmation would, so the plant learns whether sanitation worked and can return surfaces to production on a tighter schedule instead of holding areas idle waiting on plates."
      },
      {
        "title": "Catch hygiene drift early",
        "body": "Rapid hygiene-indicator screening surfaces sanitation problems before they compound, letting the team correct cleaning and re-test before contamination has a chance to reach product."
      },
      {
        "title": "Protect the brand",
        "body": "Reliable S. aureus detection helps the plant keep hygiene under control, lowering the chance that a sanitation lapse becomes a product-safety or reputational problem."
      },
      {
        "title": "One method, every site",
        "body": "Running on standard thermocyclers with a simple FAM-only setup, the same validated S. aureus check deploys at every plant on existing equipment with no capital project."
      }
    ],
    "lab": [
      {
        "title": "Confirmed by melting curve",
        "body": "KAi melting-curve analysis confirms S. aureus by its signature, giving analysts clean, unambiguous calls and fewer ambiguous repeats."
      },
      {
        "title": "Molecular, not culture",
        "body": "A molecular result is ready in hours instead of the 2–5 days a culture confirmation takes, freeing bench time and incubator space for other work."
      },
      {
        "title": "TxA runs the bench",
        "body": "TxA interprets every run automatically and publishes the result without manual transcription — standardized reads, no analyst subjectivity and less hands-on time per sample."
      },
      {
        "title": "Lower cost per result",
        "body": "Runs on the real-time PCR platforms the lab already owns — no proprietary hardware, no instrument lock-in — keeping cost per test below closed proprietary systems."
      }
    ]
  },
  "V-SF167": {
    "highlights": [
      {
        "icon": "target",
        "title": "Specific E. coli ID",
        "subtitle": "KAi melting-curve",
        "pdfText": "KAi's AI-interpreted melting curve identifies E. coli with high specificity, giving you a dependable hygiene-indicator result you can act on with confidence."
      },
      {
        "icon": "layers",
        "title": "FAM-only setup",
        "subtitle": "Runs on open instruments",
        "pdfText": "A simple FAM-only configuration runs on the standard real-time PCR thermocyclers you already own, with no multi-dye complexity and no instrument lock-in across your sites."
      },
      {
        "icon": "timer",
        "title": "Faster hygiene checks",
        "subtitle": "Speeds sanitation",
        "pdfText": "Same-day results let your team verify sanitation and re-clean surfaces within the shift, instead of waiting for slow culture confirmation that holds the line and the schedule."
      },
      {
        "icon": "check",
        "title": "Lower cost per test",
        "subtitle": "Below leading platforms",
        "pdfText": "Open instruments and competitive reagent pricing keep the cost per result below the closed, proprietary systems competitors charge for, without compromising detection performance."
      }
    ],
    "plant": [
      {
        "title": "Verify hygiene sooner",
        "body": "E. coli results arrive before culture confirmation would, so the plant learns whether sanitation worked and can return surfaces to production on a tighter schedule instead of holding areas idle waiting on plates."
      },
      {
        "title": "Catch hygiene drift early",
        "body": "Rapid hygiene-indicator screening surfaces sanitation problems before they compound, letting the team correct cleaning and re-test before contamination has a chance to reach product."
      },
      {
        "title": "Protect the brand",
        "body": "Reliable E. coli detection helps the plant keep hygiene under control, lowering the chance that a sanitation lapse becomes a product-safety or reputational problem."
      },
      {
        "title": "One method, every site",
        "body": "Running on standard thermocyclers with a simple FAM-only setup, the same validated E. coli check deploys at every plant on existing equipment with no capital project."
      }
    ],
    "lab": [
      {
        "title": "Confirmed by melting curve",
        "body": "KAi melting-curve analysis confirms E. coli by its signature, giving analysts clean, unambiguous calls and fewer ambiguous repeats."
      },
      {
        "title": "Molecular, not culture",
        "body": "A molecular result is ready in hours instead of the 2–5 days a culture confirmation takes, freeing bench time and incubator space for other work."
      },
      {
        "title": "TxA runs the bench",
        "body": "TxA interprets every run automatically and publishes the result without manual transcription — standardized reads, no analyst subjectivity and less hands-on time per sample."
      },
      {
        "title": "Lower cost per result",
        "body": "Runs on the real-time PCR platforms the lab already owns — no proprietary hardware, no instrument lock-in — keeping cost per test below closed proprietary systems."
      }
    ]
  },
  "V-SF28": {
    "highlights": [
      {
        "icon": "target",
        "title": "Specific L. mono ID",
        "subtitle": "KAi melting-curve",
        "pdfText": "KAi's AI-interpreted melting curve identifies Listeria monocytogenes with high specificity, giving you confident calls on the species that drives regulatory action."
      },
      {
        "icon": "layers",
        "title": "FAM-only setup",
        "subtitle": "Runs on open instruments",
        "pdfText": "A simple FAM-only configuration runs on the standard real-time PCR thermocyclers you already own, with no multi-dye complexity and no instrument lock-in across your sites."
      },
      {
        "icon": "timer",
        "title": "Fast EMP screening",
        "subtitle": "Clears line for release",
        "pdfText": "Rapid environmental monitoring results let you screen surfaces and clear the line for release within the shift, keeping your EMP program fast and your production schedule on track."
      },
      {
        "icon": "check",
        "title": "Lower cost per test",
        "subtitle": "Below leading platforms",
        "pdfText": "Open instruments and competitive reagent pricing keep the cost per result below the closed, proprietary systems competitors charge for, without compromising detection performance."
      }
    ],
    "plant": [
      {
        "title": "Clear lines for release",
        "body": "Fast L. monocytogenes environmental screening lets the plant clear a line or zone for release before culture confirmation would allow, keeping the EMP program moving and production on schedule."
      },
      {
        "title": "Catch the regulated pathogen",
        "body": "Specific detection of L. monocytogenes targets the species that drives regulatory action, so the plant focuses its response on genuine risk rather than generic Listeria signals."
      },
      {
        "title": "Protect the brand",
        "body": "Reliable L. mono detection in environmental monitoring lowers the chance the regulated pathogen establishes itself unnoticed, reducing the risk of a recall and the damage that follows."
      },
      {
        "title": "One method, every site",
        "body": "Running on standard thermocyclers with a simple FAM-only setup, the same validated L. mono screen deploys at every plant on existing equipment with no capital project."
      }
    ],
    "lab": [
      {
        "title": "Confirmed by melting curve",
        "body": "KAi melting-curve analysis confirms L. monocytogenes by its signature, giving analysts clean, unambiguous calls and fewer ambiguous repeats."
      },
      {
        "title": "Molecular, not culture",
        "body": "A molecular result is ready in hours instead of the 2–5 days a culture confirmation takes, freeing bench time and incubator space for other work."
      },
      {
        "title": "TxA runs the bench",
        "body": "TxA interprets every run automatically and publishes the result without manual transcription — standardized reads, no analyst subjectivity and less hands-on time per sample."
      },
      {
        "title": "Lower cost per result",
        "body": "Runs on the real-time PCR platforms the lab already owns — no proprietary hardware, no instrument lock-in — keeping cost per test below closed proprietary systems."
      }
    ]
  },
  "V-SF45": {
    "highlights": [
      {
        "icon": "target",
        "title": "Key spoilage yeast",
        "subtitle": "Z. bailii / parabailii",
        "pdfText": "The assay targets Zygosaccharomyces bailii and parabailii, the preservative-resistant yeasts most responsible for spoilage in acidified products, focusing on the real threat to this category."
      },
      {
        "icon": "activity",
        "title": "KAi melting-curve",
        "subtitle": "Specific ID",
        "pdfText": "KAi's AI-interpreted melting curve resolves these spoilage yeasts specifically, with automated calling that removes analyst subjectivity and manual curve interpretation."
      },
      {
        "icon": "shield",
        "title": "Protects shelf life",
        "subtitle": "Acidified products",
        "pdfText": "Catching these resistant yeasts early protects the shelf life of acidified products and helps you avoid the fermentation, off-flavors and spoilage complaints they cause."
      },
      {
        "icon": "layers",
        "title": "FAM-only setup",
        "subtitle": "Open instruments",
        "pdfText": "A simple FAM-only configuration runs on the standard real-time PCR thermocyclers you already own, with no multi-dye complexity and no instrument lock-in across your sites."
      }
    ],
    "plant": [
      {
        "title": "Protect acidified products",
        "body": "Targeting Zygosaccharomyces bailii and parabailii — the preservative-resistant yeasts most responsible for spoiling acidified products — lets the plant guard the exact threat this category faces rather than a generic spoilage list."
      },
      {
        "title": "Catch resistant spoilers early",
        "body": "These yeasts survive acidic, preserved conditions that stop most organisms; detecting them early lets the plant act before they ferment or cloud a batch and trigger complaints and returns."
      },
      {
        "title": "Protect shelf life",
        "body": "Early, specific detection of these resistant spoilage yeasts protects the shelf life of acidified products and the sensory quality customers expect from them."
      },
      {
        "title": "One method, every site",
        "body": "Running on standard thermocyclers with a simple FAM-only setup, the same validated spoilage-yeast screen deploys at every plant on existing equipment with no capital project."
      }
    ],
    "lab": [
      {
        "title": "Two targets, one reaction",
        "body": "Zygosaccharomyces bailii and Zygosaccharomyces parabailii are detected together in a single reaction — one assay instead of two separate assays, about 50% fewer reactions, more samples per shift and a lower cost per result."
      },
      {
        "title": "Molecular, not culture",
        "body": "A molecular result is ready in hours instead of the 2–5 days a culture confirmation takes, freeing bench time and incubator space for other work."
      },
      {
        "title": "TxA runs the bench",
        "body": "TxA calls both targets automatically and publishes the result without manual transcription — standardized reads, no analyst subjectivity and less hands-on time per sample."
      },
      {
        "title": "Lower cost per result",
        "body": "Runs on the real-time PCR platforms the lab already owns — no proprietary hardware, no instrument lock-in — keeping cost per test below closed proprietary systems."
      }
    ]
  },
  "V-SF52": {
    "highlights": [
      {
        "icon": "target",
        "title": "Specific Listeria ID",
        "subtitle": "KAi melting-curve",
        "pdfText": "KAi's AI-interpreted melting curve identifies the Listeria genus with high specificity, giving you a dependable environmental-monitoring result you can act on with confidence."
      },
      {
        "icon": "layers",
        "title": "FAM-only setup",
        "subtitle": "Runs on open instruments",
        "pdfText": "A simple FAM-only configuration runs on the standard real-time PCR thermocyclers you already own, with no multi-dye complexity and no instrument lock-in across your sites."
      },
      {
        "icon": "timer",
        "title": "Fast EMP screening",
        "subtitle": "Speeds decisions",
        "pdfText": "Rapid environmental monitoring results let you screen surfaces and make release decisions within the shift, keeping your EMP program fast and your production schedule on track."
      },
      {
        "icon": "check",
        "title": "Lower cost per test",
        "subtitle": "Below leading platforms",
        "pdfText": "Open instruments and competitive reagent pricing keep the cost per result below the closed, proprietary systems competitors charge for, without compromising detection performance."
      }
    ],
    "plant": [
      {
        "title": "Speed EMP decisions",
        "body": "Fast Listeria environmental screening lets the plant make monitoring and release decisions before culture confirmation would allow, keeping the EMP program moving and production on schedule."
      },
      {
        "title": "Catch hygiene risk early",
        "body": "Detecting the Listeria genus in environmental samples surfaces hygiene risk before it establishes, letting the team act on a contaminated zone before it threatens product."
      },
      {
        "title": "Protect the brand",
        "body": "Reliable Listeria detection in monitoring lowers the chance the organism establishes itself unnoticed, reducing the risk of a recall and the reputational damage that follows."
      },
      {
        "title": "One method, every site",
        "body": "Running on standard thermocyclers with a simple FAM-only setup, the same validated Listeria screen deploys at every plant on existing equipment with no capital project."
      }
    ],
    "lab": [
      {
        "title": "Confirmed by melting curve",
        "body": "KAi melting-curve analysis confirms Listeria spp. by its signature, giving analysts clean, unambiguous calls and fewer ambiguous repeats."
      },
      {
        "title": "Molecular, not culture",
        "body": "A molecular result is ready in hours instead of the 2–5 days a culture confirmation takes, freeing bench time and incubator space for other work."
      },
      {
        "title": "TxA runs the bench",
        "body": "TxA interprets every run automatically and publishes the result without manual transcription — standardized reads, no analyst subjectivity and less hands-on time per sample."
      },
      {
        "title": "Lower cost per result",
        "body": "Runs on the real-time PCR platforms the lab already owns — no proprietary hardware, no instrument lock-in — keeping cost per test below closed proprietary systems."
      }
    ]
  },
  "V-SF07": {
    "highlights": [
      {
        "icon": "target",
        "title": "2 indicators, 1 reaction",
        "subtitle": "S. aureus + E. coli",
        "pdfText": "Staphylococcus aureus and E. coli, two core hygiene indicators, are screened together in a single reaction, giving a combined sanitation read without running separate assays."
      },
      {
        "icon": "zap",
        "title": "~50% fewer reactions",
        "subtitle": "One assay, not two",
        "pdfText": "Combining both indicators in one reaction halves the assays per sample, cutting reagent and consumable spend, freeing thermocycler capacity and reducing your team's hands-on time."
      },
      {
        "icon": "layers",
        "title": "FAM-only setup",
        "subtitle": "Open instruments",
        "pdfText": "A simple FAM-only configuration runs on the standard real-time PCR thermocyclers you already own, with no multi-dye complexity and no instrument lock-in across your sites."
      },
      {
        "icon": "check",
        "title": "Lower cost per test",
        "subtitle": "Below leading platforms",
        "pdfText": "Open instruments and competitive reagent pricing keep the cost per result below the closed, proprietary systems competitors charge for, without compromising detection performance."
      }
    ],
    "plant": [
      {
        "title": "Two indicators, one read",
        "body": "Screening S. aureus and E. coli together gives the plant a combined hygiene picture from a single sample, covering two core sanitation indicators at once instead of running them as separate checks."
      },
      {
        "title": "Verify hygiene sooner",
        "body": "Combined indicator results arrive before culture confirmation would, so the plant verifies sanitation and returns surfaces to production on a tighter schedule instead of holding zones idle."
      },
      {
        "title": "Cut testing cost",
        "body": "Folding two indicators into one reaction halves the assays per sample, and that lower reagent and labor cost feeds straight back to the plant's hygiene-monitoring budget."
      },
      {
        "title": "One method, every site",
        "body": "Running on standard thermocyclers with a simple FAM-only setup, the same validated hygiene check deploys at every plant on existing equipment with no capital project."
      }
    ],
    "lab": [
      {
        "title": "Two pathogens, one reaction",
        "body": "S. aureus and E. coli are detected together in a single reaction — one assay instead of two separate assays, about 50% fewer reactions, more samples per shift and a lower cost per result."
      },
      {
        "title": "Molecular, not culture",
        "body": "A molecular result is ready in hours instead of the 2–5 days a culture confirmation takes, freeing bench time and incubator space for other work."
      },
      {
        "title": "TxA runs the bench",
        "body": "TxA calls both targets automatically and publishes the result without manual transcription — standardized reads, no analyst subjectivity and less hands-on time per sample."
      },
      {
        "title": "Lower cost per result",
        "body": "Runs on the real-time PCR platforms the lab already owns — no proprietary hardware, no instrument lock-in — keeping cost per test below closed proprietary systems."
      }
    ]
  },
  "V-SF04": {
    "highlights": [
      {
        "icon": "target",
        "title": "Species + genus",
        "subtitle": "L. mono vs Listeria spp.",
        "pdfText": "The assay distinguishes Listeria monocytogenes from the broader Listeria genus in one reaction, so you know not just that Listeria is present but whether it is the species that drives action."
      },
      {
        "icon": "zap",
        "title": "~50% fewer reactions",
        "subtitle": "One assay, not two",
        "pdfText": "Resolving species and genus in a single reaction halves the assays you would otherwise run, cutting reagent spend, hands-on time and thermocycler capacity per sample."
      },
      {
        "icon": "check",
        "title": "Sharper decisions",
        "subtitle": "Species-level result",
        "pdfText": "A species-level answer lets you escalate only when L. monocytogenes is confirmed and avoid unnecessary holds when it is not, protecting both safety and throughput."
      },
      {
        "icon": "layers",
        "title": "FAM-only setup",
        "subtitle": "Open instruments",
        "pdfText": "A simple FAM-only configuration runs on the standard real-time PCR thermocyclers you already own, with no multi-dye complexity and no instrument lock-in across your sites."
      }
    ],
    "plant": [
      {
        "title": "Right-size every response",
        "body": "Knowing whether a positive is L. monocytogenes or another Listeria species lets the plant escalate only when the regulated pathogen is present and avoid full shutdowns over harmless species, calibrating the response to real risk."
      },
      {
        "title": "Decide with fewer runs",
        "body": "Resolving species and genus in one assay rather than two speeds environmental and product decisions, so suspect areas are cleared or escalated without doubling the lab's workload."
      },
      {
        "title": "Protect the brand",
        "body": "Confident species-level Listeria results lower the chance an L. monocytogenes positive slips through or a needless recall is triggered by a harmless species, protecting safety and reputation alike."
      },
      {
        "title": "One method, every site",
        "body": "Running on standard thermocyclers with a simple FAM-only setup, the same validated Listeria method deploys at every plant on existing equipment with no capital project."
      }
    ],
    "lab": [
      {
        "title": "Two pathogens, one reaction",
        "body": "Listeria spp. and L. monocytogenes are detected together in a single reaction — one assay instead of two separate assays, about 50% fewer reactions, more samples per shift and a lower cost per result."
      },
      {
        "title": "Molecular, not culture",
        "body": "A molecular result is ready in hours instead of the 2–5 days a culture confirmation takes, freeing bench time and incubator space for other work."
      },
      {
        "title": "TxA runs the bench",
        "body": "TxA calls both targets automatically and publishes the result without manual transcription — standardized reads, no analyst subjectivity and less hands-on time per sample."
      },
      {
        "title": "Lower cost per result",
        "body": "Runs on the real-time PCR platforms the lab already owns — no proprietary hardware, no instrument lock-in — keeping cost per test below closed proprietary systems."
      }
    ]
  },
  "V-SF05": {
    "highlights": [
      {
        "icon": "target",
        "title": "E. coli + O157:H7",
        "subtitle": "Indicator vs pathogen",
        "pdfText": "The assay resolves generic E. coli from the pathogenic O157:H7 serotype in one reaction, separating a hygiene indicator from a recall-level pathogen in a single test."
      },
      {
        "icon": "zap",
        "title": "~50% fewer reactions",
        "subtitle": "One assay, not two",
        "pdfText": "Resolving both targets in a single reaction halves the assays you would otherwise run, cutting reagent spend, hands-on time and thermocycler capacity per sample."
      },
      {
        "icon": "check",
        "title": "Sharper decisions",
        "subtitle": "Strain-level result",
        "pdfText": "A strain-level answer lets you escalate only when the pathogenic O157:H7 serotype is confirmed, avoiding unnecessary holds triggered by a generic E. coli signal alone."
      },
      {
        "icon": "layers",
        "title": "FAM-only setup",
        "subtitle": "Open instruments",
        "pdfText": "A simple FAM-only configuration runs on the standard real-time PCR thermocyclers you already own, with no multi-dye complexity and no instrument lock-in across your sites."
      }
    ],
    "plant": [
      {
        "title": "Indicator and pathogen apart",
        "body": "Resolving generic E. coli from the pathogenic O157:H7 serotype in one run lets the plant tell a routine hygiene signal from a recall-level pathogen, so the response matches the actual threat on each sample."
      },
      {
        "title": "Decide with fewer runs",
        "body": "Covering both targets in one assay rather than two speeds decisions and keeps the lab's workload down while still separating indicator from pathogen on every sample."
      },
      {
        "title": "Protect the brand",
        "body": "Strain-level clarity lowers the chance a dangerous O157:H7 positive is treated as routine, or that a harmless E. coli signal triggers a needless hold, protecting both safety and throughput."
      },
      {
        "title": "One method, every site",
        "body": "Running on standard thermocyclers with a simple FAM-only setup, the same validated assay deploys at every plant on existing equipment with no capital project."
      }
    ],
    "lab": [
      {
        "title": "Two pathogens, one reaction",
        "body": "E. coli and E. coli O157:H7 are detected together in a single reaction — one assay instead of two separate assays, about 50% fewer reactions, more samples per shift and a lower cost per result."
      },
      {
        "title": "Molecular, not culture",
        "body": "A molecular result is ready in hours instead of the 2–5 days a culture confirmation takes, freeing bench time and incubator space for other work."
      },
      {
        "title": "TxA runs the bench",
        "body": "TxA calls both targets automatically and publishes the result without manual transcription — standardized reads, no analyst subjectivity and less hands-on time per sample."
      },
      {
        "title": "Lower cost per result",
        "body": "Runs on the real-time PCR platforms the lab already owns — no proprietary hardware, no instrument lock-in — keeping cost per test below closed proprietary systems."
      }
    ]
  },
  "V-SF29": {
    "highlights": [
      {
        "icon": "target",
        "title": "2 pathogens, 1 reaction",
        "subtitle": "Salmonella + L. mono",
        "pdfText": "Salmonella spp. and Listeria monocytogenes, two of the most critical food-safety pathogens, are screened together in a single reaction for a combined safety read from one test."
      },
      {
        "icon": "zap",
        "title": "~50% fewer reactions",
        "subtitle": "One assay, not two",
        "pdfText": "Combining both pathogens in one reaction halves the assays per sample, cutting reagent and consumable spend, freeing thermocycler capacity and reducing your team's hands-on time."
      },
      {
        "icon": "timer",
        "title": "Faster release",
        "subtitle": "Combined result",
        "pdfText": "A single combined result clears both pathogens at once, removing a sequential testing step and letting product reach release decisions sooner than two separate assays would allow."
      },
      {
        "icon": "layers",
        "title": "FAM-only setup",
        "subtitle": "Open instruments",
        "pdfText": "A simple FAM-only configuration runs on the standard real-time PCR thermocyclers you already own, with no multi-dye complexity and no instrument lock-in across your sites."
      }
    ],
    "plant": [
      {
        "title": "Clear two pathogens at once",
        "body": "Screening Salmonella and L. monocytogenes together returns both critical results in one run, removing a sequential testing step so lots reach a release decision faster than running the two pathogens separately would allow."
      },
      {
        "title": "Cut cost per sample",
        "body": "Combining two of the most critical food-safety pathogens into one assay halves the reactions per sample, and that lower cost and faster turnaround feed straight back to the plant's bottom line."
      },
      {
        "title": "Leave nothing unscreened",
        "body": "Covering both Salmonella and L. monocytogenes on every sample reduces the chance a critical pathogen goes unchecked on a given lot, tightening the plant's safety net without extra work."
      },
      {
        "title": "One method, every site",
        "body": "Running on standard thermocyclers with a simple FAM-only setup, the same validated dual-pathogen assay deploys at every plant on existing equipment with no capital project."
      }
    ],
    "lab": [
      {
        "title": "Two pathogens, one reaction",
        "body": "Salmonella spp. and L. monocytogenes are detected together in a single reaction — one assay instead of two separate assays, about 50% fewer reactions, more samples per shift and a lower cost per result."
      },
      {
        "title": "Molecular, not culture",
        "body": "A molecular result is ready in hours instead of the 2–5 days a culture confirmation takes, freeing bench time and incubator space for other work."
      },
      {
        "title": "TxA runs the bench",
        "body": "TxA calls both targets automatically and publishes the result without manual transcription — standardized reads, no analyst subjectivity and less hands-on time per sample."
      },
      {
        "title": "Lower cost per result",
        "body": "Runs on the real-time PCR platforms the lab already owns — no proprietary hardware, no instrument lock-in — keeping cost per test below closed proprietary systems."
      }
    ]
  },
  "V-SF56": {
    "highlights": [
      {
        "icon": "target",
        "title": "3 pathogens, 1 reaction",
        "subtitle": "Salmonella, L. mono, O157:H7",
        "pdfText": "The three pathogens most critical to food safety, Salmonella, Listeria monocytogenes and E. coli O157:H7, are screened together in a single reaction for a complete safety read."
      },
      {
        "icon": "zap",
        "title": "~67% fewer reactions",
        "subtitle": "One assay, not three",
        "pdfText": "Combining three pathogens in one reaction cuts the assays per sample by roughly two-thirds, reducing reagent and consumable spend, freeing thermocycler capacity and saving hands-on time."
      },
      {
        "icon": "shield",
        "title": "Comprehensive safety",
        "subtitle": "Three critical targets",
        "pdfText": "Covering three high-priority pathogens in one test gives a comprehensive safety read from a single sample, simplifying release decisions and reducing the chance a critical target goes unscreened."
      },
      {
        "icon": "layers",
        "title": "FAM-only setup",
        "subtitle": "Open instruments",
        "pdfText": "A simple FAM-only configuration runs on the standard real-time PCR thermocyclers you already own, with no multi-dye complexity and no instrument lock-in across your sites."
      }
    ],
    "plant": [
      {
        "title": "Screen three pathogens at once",
        "body": "Covering Salmonella, L. monocytogenes and E. coli O157:H7 in one run gives the plant a comprehensive safety read on every sample, removing the gaps and delays of testing three critical pathogens separately."
      },
      {
        "title": "Cut cost per sample",
        "body": "Combining three pathogens into one reaction removes roughly two-thirds of the assays per sample, and that lower reagent and labor cost feeds straight back to the plant's safety-testing budget."
      },
      {
        "title": "Leave nothing unscreened",
        "body": "Testing three high-priority pathogens together reduces the chance a critical target goes unchecked on a given lot, tightening the plant's safety net without tripling the workload."
      },
      {
        "title": "One method, every site",
        "body": "Running on standard thermocyclers with a simple FAM-only setup, the same validated three-pathogen assay deploys at every plant on existing equipment with no capital project."
      }
    ],
    "lab": [
      {
        "title": "Three pathogens, one reaction",
        "body": "Salmonella spp., L. monocytogenes and E. coli O157:H7 are detected together in a single reaction — one assay instead of three separate assays, about 67% fewer reactions, more samples per shift and a lower cost per result."
      },
      {
        "title": "Molecular, not culture",
        "body": "A molecular result is ready in hours instead of the 2–5 days a culture confirmation takes, freeing bench time and incubator space for other work."
      },
      {
        "title": "TxA runs the bench",
        "body": "TxA calls all three targets automatically and publishes the result without manual transcription — standardized reads, no analyst subjectivity and less hands-on time per sample."
      },
      {
        "title": "Lower cost per result",
        "body": "Runs on the real-time PCR platforms the lab already owns — no proprietary hardware, no instrument lock-in — keeping cost per test below closed proprietary systems."
      }
    ]
  },
  "V-SF95": {
    "highlights": [
      {
        "icon": "target",
        "title": "4 pathogens, 1 reaction",
        "subtitle": "Broadest single-assay panel",
        "pdfText": "Salmonella, Listeria monocytogenes, E. coli and S. aureus are screened together in one reaction, the broadest single-assay pathogen panel TAAG offers for comprehensive safety screening."
      },
      {
        "icon": "zap",
        "title": "~75% fewer reactions",
        "subtitle": "One assay, not four",
        "pdfText": "Running four pathogens in one reaction cuts the assays per sample by about three-quarters, reducing reagent and consumable spend, freeing thermocycler capacity and saving hands-on time."
      },
      {
        "icon": "shield",
        "title": "Broadest safety",
        "subtitle": "Four key targets",
        "pdfText": "Covering four key pathogens in a single test gives the most comprehensive safety read available from one sample, minimizing the chance that a critical target goes unscreened."
      },
      {
        "icon": "layers",
        "title": "FAM-only setup",
        "subtitle": "Open instruments",
        "pdfText": "A simple FAM-only configuration runs on the standard real-time PCR thermocyclers you already own, with no multi-dye complexity and no instrument lock-in across your sites."
      }
    ],
    "plant": [
      {
        "title": "Broadest single-assay safety",
        "body": "Screening Salmonella, L. monocytogenes, E. coli and S. aureus together gives the plant the most comprehensive safety read available from a single sample, covering four key targets in one run."
      },
      {
        "title": "Cut cost per sample",
        "body": "Combining four pathogens into one reaction removes about three-quarters of the assays per sample, and that lower reagent and labor cost feeds straight back to the plant's safety-testing budget."
      },
      {
        "title": "Leave nothing unscreened",
        "body": "Testing four key pathogens together minimizes the chance a critical target goes unchecked on a given lot, giving the plant the widest safety net from a single screen."
      },
      {
        "title": "One method, every site",
        "body": "Running on standard thermocyclers with a simple FAM-only setup, the same validated four-pathogen assay deploys at every plant on existing equipment with no capital project."
      }
    ],
    "lab": [
      {
        "title": "Four pathogens, one reaction",
        "body": "Four pathogens run together in a single reaction — one assay instead of four separate assays, about 75% fewer reactions, more samples per shift and a lower cost per result."
      },
      {
        "title": "Molecular, not culture",
        "body": "A molecular result is ready in hours instead of the 2–5 days a culture confirmation takes, freeing bench time and incubator space for other work."
      },
      {
        "title": "TxA runs the bench",
        "body": "TxA calls all four targets automatically and publishes the result without manual transcription — standardized reads, no analyst subjectivity and less hands-on time per sample."
      },
      {
        "title": "Lower cost per result",
        "body": "Runs on the real-time PCR platforms the lab already owns — no proprietary hardware, no instrument lock-in — keeping cost per test below closed proprietary systems."
      }
    ]
  },
  "V-SF193": {
    "highlights": [
      {
        "icon": "target",
        "title": "Pathogens + indicators",
        "subtitle": "Pioneering single reaction",
        "pdfText": "In a pioneering single reaction, the assay screens critical pathogens alongside hygiene indicators, uniting safety testing and process monitoring in one test rather than two separate workflows."
      },
      {
        "icon": "zap",
        "title": "~75% fewer reactions",
        "subtitle": "One assay, not four",
        "pdfText": "Running four targets in one reaction cuts the assays per sample by about three-quarters, reducing reagent and consumable spend, freeing thermocycler capacity and saving hands-on time."
      },
      {
        "icon": "shield",
        "title": "Prevent, don't react",
        "subtitle": "Hygiene early warning",
        "pdfText": "The hygiene indicators flag process drift before it becomes a pathogen event, shifting your program from reacting to contamination toward preventing it before product is affected."
      },
      {
        "icon": "layers",
        "title": "FAM-only setup",
        "subtitle": "Open instruments",
        "pdfText": "A simple FAM-only configuration runs on the standard real-time PCR thermocyclers you already own, with no multi-dye complexity and no instrument lock-in across your sites."
      }
    ],
    "plant": [
      {
        "title": "Prevent, don't just react",
        "body": "Pairing pathogen detection with hygiene indicators in one run lets the plant see process drift building before it becomes a pathogen event, shifting the program from reacting to contamination toward preventing it."
      },
      {
        "title": "Safety and monitoring together",
        "body": "Screening critical pathogens and hygiene indicators in a single reaction unites two workflows the plant would otherwise run separately, giving safety and process insight from one sample."
      },
      {
        "title": "Cut cost per sample",
        "body": "Folding four targets into one reaction removes about three-quarters of the assays per sample, and that lower reagent and labor cost feeds straight back to the plant's testing budget."
      },
      {
        "title": "One method, every site",
        "body": "Running on standard thermocyclers with a simple FAM-only setup, this pioneering combined assay deploys at every plant on existing equipment with no capital project."
      }
    ],
    "lab": [
      {
        "title": "Pathogens plus indicators",
        "body": "Critical pathogens are screened alongside hygiene indicators in a single reaction — one assay instead of four separate runs, about 75% fewer reactions, more samples per shift and a lower cost per result."
      },
      {
        "title": "Molecular, not culture",
        "body": "A molecular result is ready in hours instead of the 2–5 days a culture confirmation takes, freeing bench time and incubator space for other work."
      },
      {
        "title": "TxA runs the bench",
        "body": "TxA calls all four targets automatically and publishes the result without manual transcription — standardized reads, no analyst subjectivity and less hands-on time per sample."
      },
      {
        "title": "Lower cost per result",
        "body": "Runs on the real-time PCR platforms the lab already owns — no proprietary hardware, no instrument lock-in — keeping cost per test below closed proprietary systems."
      }
    ]
  },
  "V-PAT04": {
    "highlights": [
      {
        "icon": "timer",
        "title": "Results in 3 h",
        "subtitle": "Surfaces, one shift",
        "pdfText": "AiGOR amplifies RNA directly from the sample with no enrichment, so environmental swabs return in about three hours, giving your team an answer within a single working shift."
      },
      {
        "icon": "timer",
        "title": "9 h on finished product",
        "subtitle": "Same-day release",
        "pdfText": "Finished product results are available in roughly nine hours, fast enough for same-day release of lots instead of holding inventory overnight while waiting on culture confirmation."
      },
      {
        "icon": "zap",
        "title": "10,000x sensitivity",
        "subtitle": "Viable-cell RNA detection",
        "pdfText": "By reading the many RNA copies a living cell carries rather than its single DNA genome, AiGOR reaches up to ten thousand times the sensitivity of conventional real-time PCR, flagging contamination at the earliest stage."
      },
      {
        "icon": "check",
        "title": "Lower inventory cost",
        "subtitle": "Shorter holds, faster turnover",
        "pdfText": "Same-day results shorten product holds and speed inventory turnover, freeing warehouse space and working capital that would otherwise sit idle waiting for slower microbiological clearance."
      }
    ],
    "plant": [
      {
        "title": "Same-day lot release",
        "body": "AiGOR returns finished-product results in about nine hours and environmental results in roughly three, both within a single working day, so lots clear quarantine the same day instead of being held overnight while culture confirms."
      },
      {
        "title": "Re-clean within the shift",
        "body": "Environmental clearance in about three hours lets a suspect area be re-cleaned and re-tested within the same shift, so a sanitation issue is resolved without parking production overnight."
      },
      {
        "title": "Free up warehouse space",
        "body": "Same-day finished-product release means lots leave quarantine far sooner, so less product sits tied up in hold inventory and cold-storage and warehouse capacity is freed for throughput."
      },
      {
        "title": "Protect the brand",
        "body": "Detecting only viable cells avoids dead-cell false positives that trigger needless holds, while ultra-fast turnaround catches Salmonella risk early — together lowering the chance of a recall and the damage it brings."
      }
    ],
    "lab": [
      {
        "title": "Ultra-high sensitivity",
        "body": "AiGOR amplifies RNA from viable cells, detecting Salmonella spp. at far lower loads than standard DNA PCR and giving the lab a confident call from one reaction."
      },
      {
        "title": "Same-day results",
        "body": "Environmental results in ~3 h and finished product in ~9 h — every sample is read inside the working day, with no overnight wait."
      },
      {
        "title": "TxA runs the bench",
        "body": "TxA interprets every run automatically and publishes the result without manual transcription — standardized reads, no analyst subjectivity and less hands-on time per sample."
      },
      {
        "title": "Fewer false positives",
        "body": "Targeting RNA from viable cells avoids the dead-cell signals that drive false positives in DNA assays, cutting needless re-testing in the lab."
      }
    ]
  },
  "V-PAT07": {
    "highlights": [
      {
        "icon": "timer",
        "title": "Results in 4 h",
        "subtitle": "Surfaces, one shift",
        "pdfText": "AiGOR amplifies RNA directly from the sample with no enrichment, so environmental swabs return in about four hours, giving your team an answer within a single working shift."
      },
      {
        "icon": "timer",
        "title": "9 h on finished product",
        "subtitle": "Same-day release",
        "pdfText": "Finished product results are available in roughly nine hours, fast enough for same-day release of lots instead of holding inventory overnight while waiting on culture confirmation."
      },
      {
        "icon": "zap",
        "title": "10,000x sensitivity",
        "subtitle": "Viable-cell RNA detection",
        "pdfText": "By reading the many RNA copies a living cell carries rather than its single DNA genome, AiGOR reaches up to ten thousand times the sensitivity of conventional real-time PCR, flagging contamination at the earliest stage."
      },
      {
        "icon": "target",
        "title": "2 pathogens, 1 reaction",
        "subtitle": "Salmonella + Listeria",
        "pdfText": "Salmonella spp. and Listeria spp., the two pathogens that dominate food-safety programs, are screened together in one AiGOR reaction, combining ultra-fast detection with a complete safety read."
      }
    ],
    "plant": [
      {
        "title": "Two pathogens, same day",
        "body": "AiGOR screens Salmonella and Listeria together and returns finished-product results in about nine hours and environmental results in roughly four, both within a working day, so lots clear quarantine the same day."
      },
      {
        "title": "Re-clean within the shift",
        "body": "Environmental clearance in about four hours lets a suspect area be re-cleaned and re-tested within the same shift, so a sanitation issue is resolved without parking production overnight."
      },
      {
        "title": "Free up warehouse space",
        "body": "Same-day finished-product release means lots leave quarantine far sooner, so less product sits tied up in hold inventory and cold-storage and warehouse capacity is freed for throughput."
      },
      {
        "title": "Protect the brand",
        "body": "Covering the two pathogens that dominate food-safety programs in one fast, viable-cell assay catches risk early and lowers the chance of a recall and the reputational damage that follows one."
      }
    ],
    "lab": [
      {
        "title": "Two pathogens, one reaction",
        "body": "Salmonella spp. and Listeria spp. are detected together in a single AiGOR reaction — one assay instead of two separate assays, about 50% fewer reactions, more samples per shift and a lower cost per result."
      },
      {
        "title": "Same-day results",
        "body": "Environmental results in ~4 h and finished product in ~9 h — every sample is read inside the working day, with no overnight wait."
      },
      {
        "title": "TxA runs the bench",
        "body": "TxA calls both targets automatically and publishes the result without manual transcription — standardized reads, no analyst subjectivity and less hands-on time per sample."
      },
      {
        "title": "Fewer false positives",
        "body": "Targeting RNA from viable cells avoids the dead-cell signals that drive false positives in DNA assays, cutting needless re-testing in the lab."
      }
    ]
  },
  "V-SF42": {
    "highlights": [
      {
        "icon": "target",
        "title": "4 pathogens, 1 reaction",
        "subtitle": "Broadest single-assay panel",
        "pdfText": "Salmonella, L. monocytogenes, E. coli and S. aureus are screened together in one reaction, the broadest single-assay pathogen panel offered for comprehensive safety screening."
      },
      {
        "icon": "zap",
        "title": "~75% fewer reactions",
        "subtitle": "One assay, not four",
        "pdfText": "Running four pathogens in one reaction cuts the assays per sample by about three-quarters, reducing reagent and consumable spend, freeing thermocycler capacity and saving hands-on time."
      },
      {
        "icon": "shield",
        "title": "Broadest safety",
        "subtitle": "Four key targets",
        "pdfText": "Covering four key pathogens in a single test gives the most comprehensive safety read available from one sample, minimizing the chance that a critical target goes unscreened."
      },
      {
        "icon": "layers",
        "title": "FAM-only setup",
        "subtitle": "Open instruments",
        "pdfText": "A simple FAM-only configuration runs on the standard real-time PCR thermocyclers you already own, with no multi-dye complexity and no instrument lock-in across your sites."
      }
    ],
    "plant": [
      {
        "title": "Broadest single-assay safety",
        "body": "Salmonella, L. monocytogenes, E. coli and S. aureus are detected together in a single assay — the broadest single-run pathogen panel."
      },
      {
        "title": "Cut cost per sample",
        "body": "Combining four pathogens into one reaction removes about three-quarters of the assays per sample, and that lower reagent and labor cost feeds straight back to the plant's safety-testing budget."
      },
      {
        "title": "Leave nothing unscreened",
        "body": "Testing four key pathogens together minimizes the chance a critical target goes unchecked on a given lot, giving the plant the widest safety net from a single screen."
      },
      {
        "title": "One method, every site",
        "body": "Running on standard thermocyclers with a simple FAM-only setup, the same validated four-pathogen assay deploys at every plant on existing equipment with no capital project."
      }
    ],
    "lab": [
      {
        "title": "Four pathogens, one reaction",
        "body": "Four pathogens run together in a single reaction — one assay instead of four separate assays, about 75% fewer reactions, more samples per shift and a lower cost per result."
      },
      {
        "title": "Molecular, not culture",
        "body": "A molecular result is ready in hours instead of the 2–5 days a culture confirmation takes, freeing bench time and incubator space for other work."
      },
      {
        "title": "TxA runs the bench",
        "body": "TxA calls all four targets automatically and publishes the result without manual transcription — standardized reads, no analyst subjectivity and less hands-on time per sample."
      },
      {
        "title": "Lower cost per result",
        "body": "Runs on the real-time PCR platforms the lab already owns — no proprietary hardware, no instrument lock-in — keeping cost per test below closed proprietary systems."
      }
    ]
  },
  "V-SF184": {
    "detectedList": ["Salmonella spp.", "Listeria monocytogenes", "Fecal microorganism indicator", "Inadequate GMP indicator"],
    "highlights": [
      {
        "icon": "target",
        "title": "Pathogens + indicators",
        "subtitle": "Pioneering single reaction",
        "pdfText": "In a pioneering single reaction, the assay screens critical pathogens alongside hygiene indicators, uniting safety testing and process monitoring in one test rather than two separate workflows."
      },
      {
        "icon": "zap",
        "title": "~75% fewer reactions",
        "subtitle": "One assay, not four",
        "pdfText": "Running four targets in one reaction cuts the assays per sample by about three-quarters, reducing reagent and consumable spend, freeing thermocycler capacity and saving hands-on time."
      },
      {
        "icon": "shield",
        "title": "Prevent, don't react",
        "subtitle": "Hygiene early warning",
        "pdfText": "The hygiene indicators flag process drift before it becomes a pathogen event, shifting your program from reacting to contamination toward preventing it before product is affected."
      },
      {
        "icon": "layers",
        "title": "FAM-only setup",
        "subtitle": "Open instruments",
        "pdfText": "A simple FAM-only configuration runs on the standard real-time PCR thermocyclers you already own, with no multi-dye complexity and no instrument lock-in across your sites."
      }
    ],
    "plant": [
      {
        "title": "Prevent, don't just react",
        "body": "Pairing pathogen detection with hygiene indicators in one run lets the plant see process drift building before it becomes a pathogen event, shifting the program from reacting to contamination toward preventing it."
      },
      {
        "title": "Safety and monitoring together",
        "body": "Screening critical pathogens and hygiene indicators in a single reaction unites two workflows the plant would otherwise run separately, giving safety and process insight from one sample."
      },
      {
        "title": "Cut cost per sample",
        "body": "Folding four targets into one reaction removes about three-quarters of the assays per sample, and that lower reagent and labor cost feeds straight back to the plant's testing budget."
      },
      {
        "title": "One method, every site",
        "body": "Running on standard thermocyclers with a simple FAM-only setup, this combined assay deploys at every plant on existing equipment with no capital project."
      }
    ],
    "lab": [
      {
        "title": "Four pathogens, one reaction",
        "body": "Four pathogens run together in a single reaction — one assay instead of four separate assays, about 75% fewer reactions, more samples per shift and a lower cost per result."
      },
      {
        "title": "Molecular, not culture",
        "body": "A molecular result is ready in hours instead of the 2–5 days a culture confirmation takes, freeing bench time and incubator space for other work."
      },
      {
        "title": "TxA runs the bench",
        "body": "TxA calls all four targets automatically and publishes the result without manual transcription — standardized reads, no analyst subjectivity and less hands-on time per sample."
      },
      {
        "title": "Lower cost per result",
        "body": "Runs on the real-time PCR platforms the lab already owns — no proprietary hardware, no instrument lock-in — keeping cost per test below closed proprietary systems."
      }
    ]
  },
  "V-SF25": {
    "highlights": [
      {
        "icon": "target",
        "title": "2 targets, 1 reaction",
        "subtitle": "Salmonella + E. coli",
        "pdfText": "Salmonella and E. coli are screened together in a single reaction, pairing a key pathogen with a core hygiene indicator in one test instead of running them separately."
      },
      {
        "icon": "zap",
        "title": "~50% fewer reactions",
        "subtitle": "One assay, not two",
        "pdfText": "Combining both targets in one reaction halves the assays per sample, cutting reagent and consumable spend, freeing thermocycler capacity and reducing your team's hands-on time."
      },
      {
        "icon": "layers",
        "title": "FAM-only setup",
        "subtitle": "Open instruments",
        "pdfText": "A simple FAM-only configuration runs on the standard real-time PCR thermocyclers you already own, with no multi-dye complexity and no instrument lock-in across your sites."
      },
      {
        "icon": "check",
        "title": "Lower cost per test",
        "subtitle": "Below leading platforms",
        "pdfText": "Open instruments and competitive reagent pricing keep the cost per result below the closed, proprietary systems competitors charge for, without compromising detection performance."
      }
    ],
    "plant": [
      {
        "title": "Pathogen plus indicator",
        "body": "Screening Salmonella alongside E. coli in one run pairs a key pathogen with a core hygiene indicator, giving the plant both a safety and a sanitation read from a single sample."
      },
      {
        "title": "Decide with fewer runs",
        "body": "Covering both targets in one assay rather than two speeds decisions and keeps the lab's workload down while still screening pathogen and indicator on every sample."
      },
      {
        "title": "Cut cost per sample",
        "body": "Folding two targets into one reaction halves the assays per sample, and that lower reagent and labor cost feeds straight back to the plant's testing budget."
      },
      {
        "title": "One method, every site",
        "body": "Running on standard thermocyclers with a simple FAM-only setup, the same validated assay deploys at every plant on existing equipment with no capital project."
      }
    ],
    "lab": [
      {
        "title": "Two pathogens, one reaction",
        "body": "E. coli and Salmonella spp. are detected together in a single reaction — one assay instead of two separate assays, about 50% fewer reactions, more samples per shift and a lower cost per result."
      },
      {
        "title": "Molecular, not culture",
        "body": "A molecular result is ready in hours instead of the 2–5 days a culture confirmation takes, freeing bench time and incubator space for other work."
      },
      {
        "title": "TxA runs the bench",
        "body": "TxA calls both targets automatically and publishes the result without manual transcription — standardized reads, no analyst subjectivity and less hands-on time per sample."
      },
      {
        "title": "Lower cost per result",
        "body": "Runs on the real-time PCR platforms the lab already owns — no proprietary hardware, no instrument lock-in — keeping cost per test below closed proprietary systems."
      }
    ]
  },
  "V-SF109": {
    "highlights": [
      {
        "icon": "target",
        "title": "3 Vibrio species, 1 reaction",
        "subtitle": "cholerae, vulnificus, parahaemolyticus",
        "pdfText": "The three Vibrio species most relevant to seafood safety — V. cholerae, V. vulnificus and V. parahaemolyticus — are screened together in one reaction, covering the key Vibrio risks in a single test."
      },
      {
        "icon": "zap",
        "title": "~67% fewer reactions",
        "subtitle": "One assay, not three",
        "pdfText": "Running three Vibrio targets in one reaction cuts the assays per sample by roughly two-thirds, reducing reagent and consumable spend, freeing thermocycler capacity and saving hands-on time."
      },
      {
        "icon": "check",
        "title": "Lower cost per result",
        "subtitle": "Fewer runs, lower cost",
        "pdfText": "Folding three species into one reaction means fewer runs per sample, and open instruments with competitive reagent pricing keep the cost per result below closed proprietary systems."
      },
      {
        "icon": "layers",
        "title": "Open platform",
        "subtitle": "Runs on your instruments",
        "pdfText": "The assay runs on standard real-time PCR thermocyclers you already own, with no instrument lock-in or forced capital purchase, so you can deploy it across sites on existing equipment."
      }
    ],
    "plant": [
      {
        "title": "Cover the Vibrio risk",
        "body": "Screening V. cholerae, V. vulnificus and V. parahaemolyticus together covers the main Vibrio threats to seafood in one run, giving the plant a comprehensive read on the species that carry real safety risk."
      },
      {
        "title": "Cut cost per sample",
        "body": "Folding three Vibrio species into one reaction removes roughly two-thirds of the assays per sample, and that lower reagent and labor cost feeds straight back to the plant's safety-testing budget."
      },
      {
        "title": "Leave nothing unscreened",
        "body": "Covering the three key Vibrio species together reduces the chance a critical target goes unchecked on a given lot, tightening the plant's seafood safety net without tripling the workload."
      },
      {
        "title": "One method, every site",
        "body": "Running on standard thermocyclers, the same validated Vibrio panel deploys at every plant on existing equipment, with no capital project and consistent results across the network."
      }
    ],
    "lab": [
      {
        "title": "Three pathogens, one reaction",
        "body": "Vibrio cholerae, Vibrio parahaemolyticus and Vibrio vulnificus are detected together in a single reaction — one assay instead of three separate assays, about 67% fewer reactions, more samples per shift and a lower cost per result."
      },
      {
        "title": "Molecular, not culture",
        "body": "A molecular result is ready in hours instead of the 2–5 days a culture confirmation takes, freeing bench time and incubator space for other work."
      },
      {
        "title": "TxA runs the bench",
        "body": "TxA calls all three targets automatically and publishes the result without manual transcription — standardized reads, no analyst subjectivity and less hands-on time per sample."
      },
      {
        "title": "Lower cost per result",
        "body": "Runs on the real-time PCR platforms the lab already owns — no proprietary hardware, no instrument lock-in — keeping cost per test below closed proprietary systems."
      }
    ]
  },
  "V-SF179": {
    "highlights": [
      {
        "icon": "layers",
        "title": "Wine yeast panel, 1 reaction",
        "subtitle": "Zygosaccharomyces + Saccharomyces",
        "pdfText": "The Zygosaccharomyces group, Saccharomyces spp. and S. cerevisiae are screened together in one reaction, covering the key wine and beverage spoilage yeasts in a single test."
      },
      {
        "icon": "zap",
        "title": "~67% fewer reactions",
        "subtitle": "One assay, not three",
        "pdfText": "Running three yeast targets in one reaction cuts the assays per sample by roughly two-thirds, reducing reagent and consumable spend, freeing thermocycler capacity and saving hands-on time."
      },
      {
        "icon": "shield",
        "title": "Protect against spoilage",
        "subtitle": "Yeast-focused coverage",
        "pdfText": "Catching the main wine and beverage spoilage yeasts early lets you act before they ferment or cloud a batch, protecting product quality and heading off the spoilage that drives complaints."
      },
      {
        "icon": "check",
        "title": "Lower cost per result",
        "subtitle": "Fewer runs, lower cost",
        "pdfText": "Folding three yeast targets into one reaction means fewer runs per sample, and open instruments with competitive reagent pricing keep the cost per result below closed proprietary systems."
      }
    ],
    "plant": [
      {
        "title": "Guard against spoilage yeast",
        "body": "Screening the Zygosaccharomyces group with Saccharomyces spp. and S. cerevisiae covers the key wine and beverage spoilage yeasts in one run, so the plant protects product quality without juggling separate tests."
      },
      {
        "title": "Cut cost per sample",
        "body": "Folding three yeast targets into one reaction removes roughly two-thirds of the assays per sample, lowering reagent and labor cost on every batch the plant screens."
      },
      {
        "title": "Protect product quality",
        "body": "Catching these spoilage yeasts early lets the plant act before they ferment, cloud or off-flavor a batch, protecting quality and heading off the complaints and returns spoilage causes."
      },
      {
        "title": "One method, every site",
        "body": "Running on standard thermocyclers, the same validated yeast panel deploys at every plant on existing equipment, with no capital project and consistent results across the network."
      }
    ],
    "lab": [
      {
        "title": "Three targets, one reaction",
        "body": "Zygosaccharomyces group Zygosaccharomyces bailii Zygosaccharomyces parabailii Zygosaccharomyces rouxii, Saccharomyces cerevisiae and Saccharomyces spp. are detected together in a single reaction — one assay instead of three separate assays, about 67% fewer reactions, more samples per shift and a lower cost per result."
      },
      {
        "title": "Molecular, not culture",
        "body": "A molecular result is ready in hours instead of the 2–5 days a culture confirmation takes, freeing bench time and incubator space for other work."
      },
      {
        "title": "TxA runs the bench",
        "body": "TxA calls all three targets automatically and publishes the result without manual transcription — standardized reads, no analyst subjectivity and less hands-on time per sample."
      },
      {
        "title": "Lower cost per result",
        "body": "Runs on the real-time PCR platforms the lab already owns — no proprietary hardware, no instrument lock-in — keeping cost per test below closed proprietary systems."
      }
    ]
  },
  "V-EQ30": {
    "highlights": [
      {
        "icon": "layers",
        "title": "Comprehensive coverage",
        "subtitle": "Detects 100+ acidophilic bacteria and 100+ yeasts and molds in one reaction.",
        "pdfText": "Detects 100+ acidophilic bacteria and 100+ yeasts and molds simultaneously, covering the four spoilage groups that threaten low-pH beverages in a single reaction."
      },
      {
        "icon": "zap",
        "title": "Rapid results (52 hrs.)",
        "subtitle": "Spoilage risk known in under 52 hours instead of 5-7 days of plating.",
        "pdfText": "Cuts time-to-result from 5-7 days of traditional plating to under 52 hours, so spoilage risk is known in time to act before product ships."
      },
      {
        "icon": "shield",
        "title": "Validated by Coca-Cola Company",
        "subtitle": "Validated by Coca-Cola to deliver reliable, matrix-proven performance for high-throughput beverage quality control",
        "pdfText": "Designed and validated by Coca-Cola Company, in collaboration with TAAG Technologies, to empower every bottler."
      },
      {
        "icon": "target",
        "title": "Built for low pH",
        "subtitle": "Targets the spoilage profile of acidified products, not a generic organism list.",
        "pdfText": "Designed specifically for the spoilage profile of acidified and low-pH products, targeting the organisms that genuinely threaten this category rather than a generic spoilage list."
      }
    ],
    "plant": [
      {
        "title": "Confident release",
        "body": "Results for the specific spoilage organisms that matter arrive fast enough to wait for them before release, so beverages leave the plant with verified microbial status instead of on a calculated risk."
      },
      {
        "title": "Stop holding good product",
        "body": "By detecting only the relevant spoilage organisms, the panel clears unaffected batches quickly, freeing product that traditional broad-spectrum holds would have kept waiting unnecessarily."
      },
      {
        "title": "Contain contamination early",
        "body": "Slow results delay corrective action and let contamination spread across batches. Results in under 52 hours enable fast corrective action that prevents cross-contamination before it compounds."
      },
      {
        "title": "Lower storage costs",
        "body": "Fewer products sitting in quarantine means less warehousing and refrigeration tied up in hold inventory, turning faster release directly into lower carrying cost."
      }
    ],
    "lab": [
      {
        "title": "Four targets, one reaction",
        "body": "Four targets run together in a single reaction — one assay instead of four separate assays, about 75% fewer reactions, more samples per shift and a lower cost per result."
      },
      {
        "title": "Molecular, not culture",
        "body": "A molecular result is ready in hours instead of the 2–5 days a culture confirmation takes, freeing bench time and incubator space for other work."
      },
      {
        "title": "TxA runs the bench",
        "body": "TxA calls all four targets automatically and publishes the result without manual transcription — standardized reads, no analyst subjectivity and less hands-on time per sample."
      },
      {
        "title": "Lower cost per result",
        "body": "Runs on the real-time PCR platforms the lab already owns — no proprietary hardware, no instrument lock-in — keeping cost per test below closed proprietary systems."
      }
    ],
    "detectedList": [
      "100+ Acidophilic bacteria",
      "Preservative resistant yeasts",
      "Brettanomyces spp.",
      "100+ Yeasts & Molds"
    ],
    "description": "Ampliora 4.7 Spoilage Beverage Kit is the first molecular solution for rapid, simultaneous detection and identification of all key spoilage microorganisms in The Coca-Cola Company products. Designed and validated in collaboration with The Coca-Cola Company, it enables faster quality decisions, improved operational efficiency, lower testing costs, and greater confidence across bottling operations."
  }
};