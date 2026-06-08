// brochures.ts — sales-brochure copy per PCR kit, keyed by protocol id.
// HAND-WRITTEN sales copy (qualitative, no invented figures). EDIT HERE — the component only renders.
// plant = production benefits (shown first); lab = laboratory benefits.
// PCR_TECH_DETAILS = the shared "Technical Details" items for every PCR kit (edit once).
//   badge:"aoac" -> shows the AOAC logo only for kits listed in AOAC_KIT_IDS; ISO text otherwise.
//   icon:"datasheet" -> shows the datasheet icon (visual only for now).

export interface BrochureBlock { title: string; body: string; }
export interface TechDetailItem { label: string; note: string; badge?: string; icon?: string; }
export interface BrochureHighlight { icon: string; title: string; subtitle: string; pdfText?: string; }
export interface KitBrochure { plant: BrochureBlock[]; lab: BrochureBlock[]; highlights?: BrochureHighlight[]; pdfPlant?: BrochureBlock[]; pdfLab?: BrochureBlock[]; kitImage?: string; pdfDescription?: string; }

// Allowed icon names for highlights. Use ONLY these keys so both the web (lucide)
// and the PDF (PNG in /public/icons/<key>.png) can resolve the icon.
// web mapping lives in ProductBrief.tsx (HIGHLIGHT_ICONS); PDF uses /icons/<key>.png.
export const HIGHLIGHT_ICON_KEYS = [
  "timer", "target", "zap", "rna", "shield", "layers", "droplet",
  "thermometer", "activity", "check", "flask", "dna",
] as const;

// PCR kits whose "Extensive validation" item shows the AOAC logo.
export const AOAC_KIT_IDS: string[] = ["V-SF95", "V-SF193", "V-SF68", "V-PAT04"];

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
        "title": "Ultra-high sensitivity",
        "body": "AiGOR amplifies RNA from viable cells, detecting contamination at far lower loads than standard DNA PCR — catching risk that other methods miss."
      },
      {
        "title": "Fewer false positives",
        "body": "Targeting RNA from living cells avoids the dead-cell signals that cause false positives in DNA-based assays, reducing needless re-testing and holds in the lab."
      },
      {
        "title": "Two answers, one reaction",
        "body": "Pathogen and hygiene indicator are detected together, halving reactions, reagent use and hands-on time versus running them separately."
      },
      {
        "title": "Open platform, free interpretation",
        "body": "Runs on thermocyclers the lab already owns, with automated TxA result calling included — no proprietary instrument or interpretation subscription."
      }
    ],
    "highlights": [
      {
        "icon": "timer",
        "title": "Results in 3 h",
        "subtitle": "Skip long enrichments",
        "pdfText": "AiGOR™ amplifies RNA directly from the sample, with no overnight enrichment. Swabs return in ~3 h and finished product in ~9 h, both within one shift — a multi-day wait becomes a same-day decision."
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
        "pdfText": "Conventional PCR reads DNA, which lingers after cells die and can cause false positives. AiGOR™ reads RNA, which degrades fast once a cell dies — so results reflect live, active organisms and action follows real risk."
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
  }
};