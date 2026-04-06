export interface CaseStudy {
  id: string;
  slug: string;
  company: string;
  category: string;
  title: string;
  description: string;
  image: string;
  heroMetric: string;
  challenge: string;
  solution: string;
  results: string[];
  techKey: 'AiGOR' | 'Industrial' | 'MILA' | 'TxA' | 'Lab';
}

export const CASE_STUDIES: CaseStudy[] = [
  // ==========================================
  // CASOS ORIGINALES (NO BORRADOS)
  // ==========================================
  {
    id: "danone",
    slug: "danone-precision-probiotics",
    company: "Danone",
    category: "MILA™ Custom Design",
    techKey: "MILA",
    title: "Precision Probiotics.",
    description: "Developing a custom triplex qPCR kit to quantify proprietary strains in finished yogurt products.",
    image: "/danone.png",
    heroMetric: "3x Faster",
    challenge: "Danone needed a highly specific and rapid method to quantify proprietary probiotic strains in their finished yogurt products. Traditional plating methods were too slow and lacked the necessary precision to differentiate closely related strains, slowing down release times.",
    solution: "Using the MILA™ AI platform, we designed a custom triplex qPCR assay specifically tailored to Danone's proprietary genetic sequences. This allowed for multiplexed detection in a single reaction.",
    results: [
      "Quantification time reduced from days to under 4 hours.",
      "100% strain specificity achieved in complex dairy matrices.",
      "Seamless integration into their existing laboratory workflows."
    ]
  },
  {
    id: "arca",
    slug: "arca-continental-bottling-intelligence",
    company: "Arca Continental",
    category: "TxA™ Digital Transformation",
    techKey: "TxA",
    title: "Bottling Intelligence.",
    description: "Standardizing microbiological control across 35 production plants with our AI-driven software.",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=800&auto=format&fit=crop",
    heroMetric: "35 Plants",
    challenge: "Managing microbiological data across 35 different bottling plants created information silos. Quality managers lacked real-time visibility to trace contamination sources and predict risk across the entire supply chain efficiently.",
    solution: "We implemented the TxA™ platform to digitize and map the microbiological ecosystem of all 35 facilities. This centralized the data and deployed AI algorithms for predictive risk assessment and plant mapping.",
    results: [
      "Standardized quality control metrics across all international facilities.",
      "Real-time alerts for contamination trends before they reach critical levels.",
      "Significant reduction in delayed product releases."
    ]
  },
  {
    id: "chocolate",
    slug: "chocolate-leader-pathogen-safety",
    company: "Global Chocolate Leader",
    category: "AiGOR™ Pathogen Safety",
    techKey: "AiGOR",
    title: "Safety at Speed.",
    description: "Ultra-fast Salmonella detection in chocolate matrices without complex enrichment.",
    image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?q=80&w=800&auto=format&fit=crop",
    heroMetric: "0 Enrichment",
    challenge: "Testing for Salmonella in complex, high-fat matrices like chocolate traditionally requires long and complex enrichment steps. This delayed product release times and drastically increased warehousing costs for finished goods.",
    solution: "We deployed our AiGOR™ RNA technology. Utilizing its 10,000x amplified sensitivity, the client can now detect metabolically active Salmonella directly from the sample, bypassing traditional enrichment protocols entirely.",
    results: [
      "Eliminated the 24-48 hour enrichment phase.",
      "Reduced warehousing costs by enabling same-shift product release.",
      "Zero false positives thanks to RNA-based live-cell detection."
    ]
  },

  // ==========================================
  // NUEVOS CASOS INDUSTRIALES
  // ==========================================
  {
    id: "ind-1",
    slug: "fast-salmonella-food",
    company: "Food Industry",
    category: "Food Safety",
    techKey: "AiGOR",
    title: "Fast control of Salmonella in the food industry",
    description: "Achieve actionable results and product release in just 6 hours, bypassing 24-48h enrichments.",
    image: "/Elevia_food5.png",
    heroMetric: "6 Hours",
    challenge: "Traditional food testing for Salmonella can take up to 24 to 48 hours, causing massive warehousing bottlenecks, delaying product release, and reducing shelf life. Furthermore, thermal or chemical interventions often leave dead cells that cause costly false positives in standard DNA tests.",
    solution: "Powered by our revolutionary AiGOR technology, this solution targets metabolically active RNA to detect Salmonella in complex food matrices in a fraction of the time. It differentiates live cells from dead ones seamlessly.",
    results: [
      "Same-Day Positive Release: Cut holding times drastically with results in just 6 hours.",
      "Live Cell Differentiation: RNA-based detection avoids false positives caused by dead cells.",
      "Complex Matrix Ready: Highly robust against inhibitors in dairy, meats, and processed foods.",
      "Maximum Sensitivity: Consistently detect down to 1 CFU/sample."
    ]
  },
  {
    id: "ind-2",
    slug: "full-preventive-control",
    company: "Quality Control",
    category: "Preventive Control",
    techKey: "MILA",
    title: "Full and Preventive Microbiological Control",
    description: "Detect pathogens and indicator microorganisms simultaneously in a single reaction.",
    image: "/F41_bacterias.png",
    heroMetric: "All-in-One",
    challenge: "Current PCR kits are strictly reactive—they only alert you to a pathogen once the contamination has already occurred. Running separate tests for hygiene indicators and pathogens is expensive, labor-intensive, and delays preventive action.",
    solution: "Our high-capacity multiplex PCR solutions simultaneously detect dangerous pathogens (Salmonella, L. mono) and key indicator microorganisms in the exact same reaction tube, shifting the paradigm from reactive to truly preventive.",
    results: [
      "Pathogens + Indicators: Detect both types simultaneously in one single PCR tube.",
      "Preventive Paradigm: Use indicator data to predict hygiene failures proactively.",
      "Cost Reduction: Lower reagent, plasticware, and labor costs by up to 70%.",
      "Simplified Workflow: Utilize a universal enrichment protocol for multiple targets."
    ]
  },
  {
    id: "ind-3",
    slug: "broad-spectrum-spoilage",
    company: "Beverage Industry",
    category: "Spoilage Defense",
    techKey: "Industrial",
    title: "Broad-Spectrum Spoilage Defense",
    description: "Screen for spoilage yeast, mold, and bacteria in a single PCR run.",
    image: "/coca.png",
    heroMetric: "< 24 Hrs",
    challenge: "Traditional plating methods for spoilage organisms can take up to 7 days, leaving your supply chain in limbo and your brand exposed to severe risks like package swelling, turbidity, and off-flavors.",
    solution: "Utilizes high-capacity multiplex PCR to detect the most critical beverage spoilers in a single reaction. By identifying hundreds of spoilage microorganisms before they compromise product quality, you guarantee shelf-life with molecular precision.",
    results: [
      "Comprehensive Coverage: Detects 100+ acidophilic bacteria and 100+ yeasts and molds.",
      "Rapid Release: Cut wait times from 5-7 days (plating) to under 24 hours.",
      "Preservative Resistance: Identifies yeast strains capable of surviving chemical preservatives.",
      "Multiplex Efficiency: Consolidate multiple culture media tests into one single workflow."
    ]
  },
  {
    id: "ind-4",
    slug: "salmonella-ecoli-protection",
    company: "Fresh Produce & Meat",
    category: "Pathogen Protection",
    techKey: "MILA",
    title: "Protection against Salmonella and Pathogenic E. coli",
    description: "Simultaneous multiplex detection of Salmonella, E. coli O157:H7, and STEC.",
    image: "/lechuga.png",
    heroMetric: "3-in-1",
    challenge: "Running separate testing protocols for Salmonella, E. coli O157:H7, and STEC is time-consuming, expensive, and delays product release for highly perishable goods like leafy greens, poultry, and raw meats.",
    solution: "A customized multiplex PCR solution that detects all three critical targets simultaneously from a single enriched sample. Ensure absolute consumer safety while accelerating positive release and drastically reducing your laboratory footprint.",
    results: [
      "Simultaneous Detection: Identify Salmonella, E. coli O157:H7, and STEC in the same tube.",
      "Universal Enrichment: One single sample preparation and enrichment broth for all pathogens.",
      "Rapid Product Release: Get accurate results under 24 hours, preventing inventory bottlenecks.",
      "Cost Efficiency: Slash costs by consolidating three individual pathogen tests into one."
    ]
  }
];