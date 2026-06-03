export interface BrochureBlock { title: string; body: string; }
export interface TechDetailItem { label: string; note: string; badge?: string; icon?: string; }
export interface KitBrochure { plant: BrochureBlock[]; lab: BrochureBlock[]; }

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
    ]
  }
};