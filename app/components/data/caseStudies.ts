// Define la estructura exacta que debe tener cada caso de estudio
export interface CaseStudy {
  id: string;
  slug: string;          // La URL de la página (ej: /cases/danone-precision)
  company: string;       // Nombre del cliente
  category: string;      // Tecnología usada (ej: MILA™, AiGOR™)
  title: string;         // Título principal corto
  description: string;   // Resumen para la tarjeta del carrusel
  image: string;         // Imagen de fondo
  
  // --- CONTENIDO DE LA PÁGINA INTERNA DEL CASO ---
  heroMetric: string;    // El "gran número" a destacar (ej: "3x Faster")
  challenge: string;     // El dolor o problema del cliente
  solution: string;      // Cómo TAAG resolvió el problema
  results: string[];     // Lista de 3 o 4 resultados de impacto directo
}

// Aquí centralizamos toda la información
export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "1",
    slug: "danone-precision-probiotics",
    company: "Danone",
    category: "MILA™ Custom Design",
    title: "Precision Probiotics.",
    description: "Developing a custom triplex qPCR kit to quantify proprietary strains in finished yogurt products.",
    image: "/danone.png",
    
    // Info extendida para la página del caso
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
    id: "2",
    slug: "arca-continental-bottling-intelligence",
    company: "Arca Continental",
    category: "TxA™ Digital Transformation",
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
    id: "3",
    slug: "chocolate-leader-pathogen-safety",
    company: "Global Chocolate Leader",
    category: "AiGOR™ Pathogen Safety",
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
  }
];