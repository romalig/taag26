// app/components/data/caseStudies.ts

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
  // NUEVO CAMPO: Identificador de tecnología
  techKey: 'AiGOR' | 'Industrial' | 'MILA' | 'TxA' | 'Lab';
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "1",
    slug: "danone-precision-probiotics",
    company: "Danone",
    category: "MILA™ Custom Design",
    techKey: "MILA", // Asignamos MILA
    title: "Precision Probiotics.",
    description: "Developing a custom triplex qPCR kit to quantify proprietary strains in finished yogurt products.",
    image: "/danone.png",
    heroMetric: "3x Faster",
    challenge: "Danone needed a highly specific and rapid method to quantify proprietary probiotic strains in their finished yogurt products...",
    solution: "Using the MILA™ AI platform, we designed a custom triplex qPCR assay specifically tailored to Danone's proprietary genetic sequences...",
    results: [
      "Quantification time reduced from days to under 4 hours.",
      "100% strain specificity achieved in complex dairy matrices.",
      "Seamless integration into their existing laboratory workflows."
    ]
  },
  {
    id: "2",
    slug: "arca-continental-bottling-intelligence",
    company: "Arca Continental",
    category: "TxA™ Digital Transformation",
    techKey: "TxA", // Asignamos TxA
    title: "Bottling Intelligence.",
    description: "Standardizing microbiological control across 35 production plants with our AI-driven software.",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=800&auto=format&fit=crop",
    heroMetric: "35 Plants",
    challenge: "Managing microbiological data across 35 different bottling plants created information silos...",
    solution: "We implemented the TxA™ platform to digitize and map the microbiological ecosystem of all 35 facilities...",
    results: [
      "Standardized quality control metrics across all international facilities.",
      "Real-time alerts for contamination trends before they reach critical levels.",
      "Significant reduction in delayed product releases."
    ]
  },
  {
    id: "3",
    slug: "chocolate-leader-pathogen-safety",
    company: "Global Chocolate Leader",
    category: "AiGOR™ Pathogen Safety",
    techKey: "AiGOR", // Asignamos AiGOR
    title: "Safety at Speed.",
    description: "Ultra-fast Salmonella detection in chocolate matrices without complex enrichment.",
    image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?q=80&w=800&auto=format&fit=crop",
    heroMetric: "0 Enrichment",
    challenge: "Testing for Salmonella in complex, high-fat matrices like chocolate traditionally requires long enrichment steps...",
    solution: "We deployed our AiGOR™ RNA technology. Utilizing its 10,000x amplified sensitivity...",
    results: [
      "Eliminated the 24-48 hour enrichment phase.",
      "Reduced warehousing costs by enabling same-shift product release.",
      "Zero false positives thanks to RNA-based live-cell detection."
    ]
  }
];