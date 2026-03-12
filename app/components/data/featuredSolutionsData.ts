// data/featuredSolutionsData.ts

export const FEATURED_MODALS_DATA: Record<string, any> = {
  "zero-risk-emp": { 
    heroImage: "/env.png",
    title: "Zero-Risk and Ultra-Fast Internal EMP Pathogen Testing",
    subtitle: "Ultra-fast pathogen detection in environmental samples. Get accurate results for Salmonella, Listeria spp., and Listeria monocytogenes in as fast as 3 hours, with absolutely no enrichment required.",
    description: "Traditional environmental monitoring programs are reactive and slow. Thanks to the revolutionary AiGOR technology, we have transformed this paradigm. By integrating advanced RNA-based detection with AI-driven predictive analytics, our solution allows food production facilities to bypass biological limits, detecting pathogens with unprecedented speed and accuracy, and predicting contamination risks before they affect the final product.",
    hasAigorBanner: true, 
    
    eleviaProducts: {
      intro: "Elevia is our premium suite of diagnostic products based on AiGOR technology. By targeting RNA, Elevia bypasses traditional biological limits to deliver extreme sensitivity and ultra-fast results across your testing matrices.",
      main: [
        {
          title: "Elevia Salmonella",
          desc: "Ultra-fast Salmonella detection in as little as 3 hours, and 6 hours, for environmental and food samples, respectively.",
          image: "/Sal11.png"
        },
        {
          title: "Elevia Salmonella + EB",
          desc: "Simultaneous identification of Salmonella and Enterobacteria in a single reaction, in as little as 3 hours.",
          image: "/Sal_EB.png"
        }
      ],
      upcoming: [
        {
          title: "Elevia Salmonella + Listeria spp.",
          desc: "Simultaneous identification of Salmonella and Listeria spp in a single reaction, in as little as 3 hours.",
          launch: "Launch 2Q 2026"
        },
        {
          title: "Elevia Listeria spp + L. monocytogenes",
          desc: "Simultaneous identification of Listeria spp. and L. monocytogenes in a single reaction, in as little as 3 hours.",
          launch: "Launch 2Q 2026"
        },
        {
          title: "Elevia Salmonella + Listeria spp. + L. monocytogenes",
          desc: "Simultaneous identification of Salmonella + Listeria spp. and L. monocytogenes in a single reaction, in as little as 3 hours.",
          launch: "Launch 2Q 2026"
        }
      ]
    },

    advantages: [
      "Results in 3-6 hours: Immediate decision-making and same-day corrective actions.",
      "Operational Agility: Same-day corrective actions reduce production downtime.",
      "Enhanced Food Safety: Early detection of contamination hotspots prevents large-scale holds.",
      "Seamless Implementation: Effortless workflow that works on any open PCR platform.",
      "TxA Software Included: Preventive and dynamic environmental sampling powered by AI.",
      "Significant Cost Savings: Reduce warehousing times, product holds, and reliance on external laboratories."
    ],
    protocolsTable: [
      { feature: "Strategy", zero: "Ultrafast screening", xpress: "Routine monitoring with added flexibility" },
      { feature: "Enrichment time", zero: "No enrichment", xpress: "3 hours" },
      { feature: "Total Time to results", zero: "3 hours", xpress: "6 hours" },
      { feature: "Intended use", zero: "Post-sanitation Zone 1 and Zone 2", xpress: "Pre and post-sanitation Zone 1, 2, and 3" },
      { feature: "Sampling device", zero: "Swab", xpress: "Swabs and Sponges" },
      { feature: "Limit of detection", zero: "1 CFU/sample", xpress: "1 CFU/sample" },
      { feature: "Downstream applications", zero: "None, destructive method. The whole sample must be processed", xpress: "Yes. Additional sample for downstream applications, ie. confirmation, WGS, etc." }
    ],
    // --- NUEVA SECCIÓN TxA ---
    txaSection: {
      logo: "/LogoTxANB.png",
      title: "TAAG Xpert Assistant. Your AI-powered ecosystem.",
      // 1. Bajada de TxA actualizada con enfoque predictivo y Elevia
      desc: "Implement a dynamic and preventive microbiological program tailored specifically for EMP. TxA uses advanced predictive AI to optimize your sampling plan and pinpoint contamination sources, working seamlessly with Elevia kits to automate interpretation and analysis from beginning to end.",
      linkText: "Explore TxA",
      linkHref: "/TxA"
    }
  }
};