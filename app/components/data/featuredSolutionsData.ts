// data/featuredSolutionsData.ts

export const FEATURED_MODALS_DATA: Record<string, any> = {
  
  // ==========================================
  // 1. MODAL EMP (ZERO-RISK)
  // ==========================================
  "zero-risk-emp": { 
    heroImage: "/env.png",
    title: "Zero-Risk and Ultra-Fast Internal EMP Pathogen Testing",
    subtitle: "Ultra-fast pathogen detection in environmental samples. Get accurate results for Salmonella, Listeria spp., and Listeria monocytogenes in as fast as 3 hours, with absolutely no enrichment required.",
    description: "Traditional environmental monitoring programs are reactive and slow. Thanks to the revolutionary AiGOR technology, we have transformed this paradigm. By integrating advanced RNA-based detection with AI-driven predictive analytics, our solution allows food production facilities to bypass biological limits, detecting pathogens with unprecedented speed and accuracy, and predicting contamination risks before they affect the final product.",
    hasAigorBanner: true, 
    eleviaProducts: {
      intro: "Elevia is our premium suite of diagnostic products based on AiGOR technology. By targeting RNA, Elevia bypasses traditional biological limits to deliver extreme sensitivity and ultra-fast results across your testing matrices.",
      main: [
        { title: "Elevia Salmonella", desc: "Ultra-fast Salmonella detection in as little as 3 hours, and 7 hours, for environmental and food samples, respectively.", image: "/Sal11.png"},
        { title: "Elevia Salmonella + Listeria spp.", desc: "Simultaneous identification of Salmonella and Listeria spp. in a single reaction, in as little as 3 hours, and 7 hours, for environmental and food samples, respectively.", image: "/Sal_EB.png" }
      ],
      upcoming: [
        { title: "Elevia Salmonella + Enterobacteria", desc: "Simultaneous identification of Salmonella and Enterobacteria in a single reaction, in as little as 3 hours."},
        { title: "Elevia Listeria spp + L. monocytogenes", desc: "Simultaneous identification of Listeria spp. and L. monocytogenes in a single reaction, in as little as 3 hours.", launch: "Launch 2Q 2026" },
        { title: "Elevia Salmonella + Listeria spp. + L. monocytogenes", desc: "Simultaneous identification of Salmonella + Listeria spp. and L. monocytogenes in a single reaction, in as little as 3 hours.", launch: "Launch 2Q 2026" }
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
    matrices: [
      "Environmental samples (1 CFU/swab)",
      "Liquid samples (1 CFU/mL)",
      "Facility surfaces"
    ],
    aoacLogo: "/AOAC.png", // <--- LOGO AOAC AÑADIDO AQUÍ
    table: {
      title: "Protocol zero vs. Protocol xpress: the right strategy for every situation",
      col1: { title: "PROTOCOL ZERO", image: "/zero_logo.png" },
      col2: { title: "PROTOCOL XPRESS", image: "/xpress_logo.png" },
      rows: [
        { feature: "Strategy", col1: "Ultrafast screening", col2: "Routine monitoring with added flexibility" },
        { feature: "Enrichment time", col1: "No enrichment", col2: "3 hours" },
        { feature: "Total Time to results", col1: "3 hours", col2: "6 hours" },
        { feature: "Intended use", col1: "Post-sanitation Zone 1 and Zone 2", col2: "Pre and post-sanitation Zone 1, 2, and 3" },
        { feature: "Sampling device", col1: "Swab", col2: "Swabs and Sponges" },
        { feature: "Limit of detection", col1: "1 CFU/sample", col2: "1 CFU/sample" },
        { feature: "Downstream applications", col1: "None, destructive method. The whole sample must be processed", col2: "Yes. Additional sample for downstream applications, ie. confirmation, WGS, etc." }
      ]
    },
    orderingInfo: [
      { catNo: "V-FE01-1", product: "Elevia Salmonella", size: "96 reactions", format: "PCR Tubes", description: "Ultra-fast RNA-based detection of Salmonella spp." },
      { catNo: "V-FE02-1", product: "Elevia Salmonella + EB", size: "96 reactions", format: "PCR Tubes", description: "Multiplex detection of Salmonella and Enterobacteria." },
      { catNo: "V-NC01-1", product: "Nucleia Bacteria", size: "100 extractions", format: "Reagent Kit", description: "Fast RNA/DNA extraction protocol for environmental samples." },
      { catNo: "V-CP01-1", product: "Captus 1", size: "100 units", format: "Swabs", description: "Sampling kit for 3-hour enrichment testing." },
      { catNo: "V-CP02-1", product: "Captus 2", size: "100 units", format: "Swabs", description: "Sampling kit for fast, enrichment-free testing." }
    ],
    txaSection: {
      logo: "/LogoTxANB.png",
      title: "TAAG Xpert Assistant. Your AI-powered ecosystem.",
      desc: "Implement a dynamic and preventive microbiological program tailored specifically for EMP. TxA uses advanced predictive AI to optimize your sampling plan and pinpoint contamination sources, working seamlessly with Elevia kits to automate interpretation and analysis from beginning to end.",
      linkText: "Explore TxA",
      linkHref: "/TxA"
    }
  },

  // ==========================================
  // 2. MODAL FOOD (SALMONELLA)
  // ==========================================
  "fast-salmonella-food": { 
    heroImage: "/Elevia_food5.png",
    title: "Fast control of Salmonella in the food industry",
    subtitle: "Protect your brand and consumers with ultra-fast, highly sensitive Salmonella detection in food matrices. Achieve actionable results and product release in just 6 hours.",
    description: "Traditional food testing for Salmonella can take up to 24 to 48 hours, causing massive warehousing bottlenecks, delaying product release, and reducing shelf life. Powered by our revolutionary AiGOR technology, this solution targets metabolically active RNA to detect Salmonella in complex food matrices in a fraction of the time. Achieve same-day positive release, avoid false positives from dead cells, and minimize the risk of expensive product recalls.",
    hasAigorBanner: true, 
    eleviaProducts: {
      intro: "Elevia is our premium suite of diagnostic products based on AiGOR technology. By targeting RNA, Elevia bypasses traditional biological limits to deliver extreme sensitivity and ultra-fast results across your testing matrices.",
      main: [
        { title: "Elevia Salmonella", desc: "Ultra-fast Salmonella detection in as little as 3 hours, and 6 hours, for environmental and food samples, respectively.", image: "/Sal11.png" },
        { title: "Elevia Salmonella + EB", desc: "Simultaneous identification of Salmonella and Enterobacteria in a single reaction, in as little as 3 hours.", image: "/Sal_EB.png" }
      ]
    },
    advantages: [
      "Same-Day Positive Release: Cut holding times drastically and ship products faster with results in just 6 hours.",
      "Live Cell Differentiation: RNA-based detection avoids costly false positives caused by dead cells after thermal or chemical interventions.",
      "Complex Matrix Ready: Highly robust against inhibitors commonly found in dairy, meats, and highly processed foods.",
      "Maximum Sensitivity: Consistently detect down to 1 CFU/sample, even in the presence of high background flora.",
      "Brand Protection: Prevent costly product recalls and ensure absolute consumer safety with lab-grade precision.",
      "Operational Savings: Reduce warehousing costs, optimize inventory turnover, and maximize product shelf life."
    ],
    matrices: [
      "62% cocoa Chocolate (25g, 375g)", "Cocoa liquor (375g)", "Cocoa mass (375g)", "Nuts (25g, 375g)",
      "Non-fat dry milk (25g, 375g)", "Chocolate bar with nougat, caramel, and peanuts (25g)", "Sweet hazelnut cocoa spread (25g)",
      "Chocolate with hazelnut filling (375g)", "Cream-filled milk chocolate (375g)", "Animal feed pellet (25g)",
      "Raw ground beef, 90% lean (25g)", "Whole muscle meat (25g)"
    ],
    aoacLogo: "/AOAC.png", 
    table: {
      title: "Traditional PCR vs. AiGOR Elevia: Redefining positive release",
      col1: { title: "TRADITIONAL PCR", image: "" }, 
      col2: { title: "ELEVIA SALMONELLA", image: "" },
      rows: [
        { feature: "Time to result", col1: "24 - 48 hours", col2: "6 hours" },
        { feature: "Target", col1: "DNA (Detects living and dead cells)", col2: "RNA (Detects only living, active cells)" },
        { feature: "False Positives", col1: "High risk after processing interventions", col2: "Zero risk from residual dead DNA" },
        { feature: "Product Release", col1: "Delayed (Requires expensive warehousing)", col2: "Same-shift positive release" },
        { feature: "Sensitivity", col1: "1 CFU/sample", col2: "1 CFU/sample" }
      ]
    },
    orderingInfo: [
      { catNo: "V-FE01-1", product: "Elevia Salmonella", size: "96 reactions", format: "PCR Tubes", description: "Ultra-fast RNA-based detection of Salmonella spp." },
      { catNo: "V-FE02-1", product: "Elevia Salmonella + EB", size: "96 reactions", format: "PCR Tubes", description: "Multiplex detection of Salmonella and Enterobacteria." },
      { catNo: "V-NC02-1", product: "Nucleia Food", size: "100 extractions", format: "Reagent Kit", description: "RNA/DNA extraction protocol optimized for food matrices." }
    ],
    txaSection: {
      logo: "/LogoTxANB.png",
      title: "TAAG Xpert Assistant. Your AI-powered ecosystem.",
      desc: "TxA is a complete ecosystem built to manage your entire microbiology operation. From digital field sampling and real-time result analysis, to automated compliance reporting and product release.",
      linkText: "Explore TxA",
      linkHref: "/TxA"
    }
  },

  // ==========================================
  // 3. MODAL PREVENTIVE CONTROL (MULTIPLEX)
  // ==========================================
  "full-preventive-control": { 
    heroImage: "/F41_bacterias.png", 
    title: "Full and Preventive Microbiological Control",
    subtitle: "The world's only multiplex PCR solution that detects both pathogens and indicator microorganisms in a single reaction. Shift from reactive testing to a truly preventive quality control program.",
    description: "Current PCR kits on the market are strictly reactive—they only alert you to a pathogen once the contamination has already occurred. We are shifting the paradigm. Our high-capacity multiplex PCR solutions are the only ones capable of simultaneously detecting dangerous pathogens and key indicator microorganisms in the exact same reaction tube. By tracking indicator trends alongside pathogen screening, your facility can map hygiene levels, anticipate risks, and stop outbreaks before they happen, all while drastically reducing your laboratory costs and simplifying your workflow.",
    hasAigorBanner: false, 
    preventiveProduct: {
      title: "Multiplex Pathogens & Indicators Kit",
      desc: "The ultimate all-in-one assay. Detect both critical foodborne pathogens and key hygiene indicators simultaneously from a single enriched sample in one PCR tube.",
      list1Title: "Pathogens Detected",
      list1: ["Salmonella spp.", "Listeria monocytogenes"],
      list2Title: "Indicators Detected",
      list2: ["Fecal contamination indicator (gram negative)", "GMP indicator (gram positive)"]
    },
    advantages: [
      "Pathogens + Indicators: The unique ability to detect both types of targets simultaneously in one single PCR tube.",
      "Preventive Paradigm: Use indicator data to predict hygiene failures and prevent pathogen contamination proactively.",
      "Cost Reduction: Consolidate testing to lower reagent, plasticware, and labor costs by up to 70%.",
      "Simplified Workflow: Utilize a universal enrichment protocol for multiple targets, minimizing human error and hands-on time.",
      "High Throughput: Process more samples per shift seamlessly and release safe products faster.",
      "Robust Design: Powered by our MILA AI technology to design perfectly non-interacting multiplex primers."
    ],
    matrices: [
      "Dairy & Egg Products", "Raw & Processed Meat", "Poultry & Seafood", "Fresh Produce & Agriculture", 
      "Ready-to-Eat (RTE) Foods", "Beverages & Juices", "Infant Formula", "Pet Food & Animal Feed", 
      "Environmental Surfaces (Stainless, plastics)", "Facility Water & Drains"
    ],
    aoacLogo: "/AOAC.png", 
    table: {
      title: "Reactive vs. Preventive: The Power of Consolidation",
      col1: { title: "TRADITIONAL SINGLEPLEX", image: "" }, 
      col2: { title: "TAAG MULTIPLEX PCR", image: "" },
      rows: [
        { feature: "Testing Approach", col1: "Reactive (Pathogen only)", col2: "Preventive (Pathogens + Indicators)" },
        { feature: "Reactions per Sample", col1: "3 to 4 separate tubes", col2: "1 single tube" },
        { feature: "Enrichment Protocols", col1: "Multiple, specific enrichments", col2: "Universal, single enrichment" },
        { feature: "Reagent & Plastic Waste", col1: "High", col2: "Reduced by up to 75%" },
        { feature: "Cost per Target", col1: "High", col2: "Extremely cost-effective" }
      ]
    },
    orderingInfo: [
      { catNo: "V-FP04-1", product: "Multiplex Pathogens & Indicators Kit", size: "96 reactions", format: "PCR Tubes", description: "Simultaneous detection of Salmonella, L. mono, Gram-, and Gram+ indicators." },
      { catNo: "V-NC03-1", product: "Nucleia Universal", size: "100 extractions", format: "Reagent Kit", description: "Universal DNA extraction protocol for food and environmental samples." },
      { catNo: "V-BP01-1", product: "Universal Enrichment Broth", size: "500 g", format: "Dehydrated Powder", description: "Optimized broth for simultaneous growth of multiple targets." }
    ],
    txaSection: {
      logo: "/LogoTxANB.png",
      title: "TAAG Xpert Assistant. Your AI-powered ecosystem.",
      desc: "TxA is a complete ecosystem built to manage your entire microbiology operation. From digital field sampling and real-time multiplex result analysis, to automated compliance reporting and workflow optimization.",
      linkText: "Explore TxA",
      linkHref: "/TxA"
    }
  },

  // ==========================================
  // 4. MODAL BROAD-SPECTRUM SPOILAGE
  // ==========================================
  "broad-spectrum-spoilage": {
    heroImage: "/coca.png", 
    title: "Broad-Spectrum Spoilage Defense",
    subtitle: "Screen for spoilage yeast, mold, and bacteria in a single PCR run. Secure shelf-life with absolute molecular precision.",
    description: "Traditional plating methods for spoilage organisms can take up to 7 days, leaving your supply chain in limbo and your brand exposed to risks. Our Broad-Spectrum Spoilage Defense solution utilizes high-capacity multiplex PCR to detect the most critical beverage spoilers in a single reaction. By identifying hundreds of spoilage microorganisms before they compromise product quality, you can guarantee shelf-life, prevent package swelling or off-flavors, and release your beverages to the market with absolute confidence.",
    hasAigorBanner: false, 
    preventiveProduct: {
      title: "Beverage Spoilage Multiplex Kit",
      desc: "A powerful all-in-one molecular assay designed specifically for the beverage industry. Screen for hundreds of spoilage organisms in one single reaction to ensure absolute product stability.",
      list1Title: "Bacterial Targets",
      list1: ["100+ Acidophilic bacteria"],
      list2Title: "Yeast & Mold Targets",
      list2: ["100+ Yeasts & Molds", "Preservative resistant yeasts", "Brettanomyces spp."]
    },
    advantages: [
      "Comprehensive Coverage: Detects 100+ acidophilic bacteria and 100+ yeasts and molds simultaneously.",
      "Brand Protection: Prevent off-flavors, turbidity, and package swelling before products reach consumers.",
      "Rapid Release: Cut wait times from 5-7 days (traditional plating) to under 24 hours.",
      "Preservative Resistance: Specifically identifies yeast strains capable of surviving standard chemical preservatives.",
      "Multiplex Efficiency: Consolidate multiple culture media tests into one single, streamlined PCR workflow.",
      "High Matrix Compatibility: Validated for complex, high-sugar, low-pH, and high-pulp beverage matrices."
    ],
    matrices: [
      "Carbonated Beverages", "Bottled Waters", "Juices with pulp", "Juices without pulp",
      "Iced Teas", "Energy Drinks", "Sports Drinks", "Flavored Waters"
    ],
    table: {
      title: "Traditional Plating vs. TAAG Multiplex PCR",
      col1: { title: "TRADITIONAL PLATING", image: "" }, 
      col2: { title: "TAAG MULTIPLEX PCR", image: "" },
      rows: [
        { feature: "Time to Result", col1: "5 to 7 Days", col2: "Under 24 hours" },
        { feature: "Detection Scope", col1: "Limited by specific culture media", col2: "Over 200+ spoilers in a single run" },
        { feature: "VBNC Detection", col1: "Cannot detect (Viable But Non-Culturable)", col2: "Detects all target DNA perfectly" },
        { feature: "Specificity", col1: "Low (Visual/Morphological identification)", col2: "High (Molecular precision)" },
        { feature: "Workflow", col1: "Labor-intensive, multiple plates required", col2: "Streamlined, single tube reaction" }
      ]
    },
    orderingInfo: [
      { catNo: "V-FS01-1", product: "Beverage Spoilage Multiplex Kit", size: "96 reactions", format: "PCR Tubes", description: "Multiplex detection of acidophilic bacteria, yeasts, and molds." },
      { catNo: "V-NC04-1", product: "Nucleia Beverages", size: "100 extractions", format: "Reagent Kit", description: "DNA extraction protocol optimized for high-sugar and complex beverages." },
      { catNo: "V-MB01-1", product: "Spoilage Enrichment Media", size: "500 g", format: "Dehydrated Powder", description: "Specialized media for optimal recovery of stressed beverage spoilers." }
    ],
    txaSection: {
      logo: "/LogoTxANB.png",
      title: "TAAG Xpert Assistant. Your AI-powered ecosystem.",
      desc: "TxA is a complete ecosystem built to manage your entire microbiology operation. Track spoilage trends across your facility, predict contamination risks, and release your beverage batches digitally and securely.",
      linkText: "Explore TxA",
      linkHref: "/TxA"
    }
  },

  // ==========================================
  // 5. MODAL SALMONELLA & E.COLI PROTECTION
  // ==========================================
  "salmonella-ecoli-protection": {
    heroImage: "/lechuga.png", 
    title: "Protection against Salmonella and Pathogenic E. coli",
    subtitle: "Safeguard your fresh produce, poultry, and meat with simultaneous multiplex detection of Salmonella, E. coli O157:H7, and STEC in a single reaction.",
    description: "Fresh produce (like leafy greens), poultry, and raw meats are highly susceptible to contamination by severe foodborne pathogens. Running separate testing protocols for Salmonella, E. coli O157:H7, and STEC is time-consuming, expensive, and delays product release. Our multiplex PCR solution allows you to detect all three critical targets simultaneously from a single enriched sample. Ensure absolute consumer safety, accelerate your positive release, and drastically reduce your laboratory footprint.",
    hasAigorBanner: false, 
    preventiveProduct: {
      title: "Multiplex Salmonella & Pathogenic E. coli Kit",
      desc: "A highly robust multiplex assay engineered specifically for the poultry, meat, and fresh produce industries. Detect the most dangerous foodborne pathogens in one streamlined workflow.",
      list1Title: "Pathogens Detected",
      list1: ["Salmonella spp.", "E. coli O157:H7", "E. coli STEC"],
      list2Title: "Assay Benefits",
      list2: ["Universal enrichment protocol", "Simultaneous amplification in one tube", "Validated workflow accuracy"]
    },
    advantages: [
      "Simultaneous Detection: Identify Salmonella, E. coli O157:H7, and STEC in exactly the same PCR tube.",
      "Universal Enrichment: One single sample preparation and enrichment broth for all three pathogens, saving hours of hands-on time.",
      "Rapid Product Release: Get accurate results under 24 hours, preventing inventory bottlenecks for highly perishable goods.",
      "Cost Efficiency: Slash your reagent, plastics, and labor costs by consolidating three individual pathogen tests into one.",
      "Industry Specific: Optimized and validated for challenging matrices in the poultry, meat, and leafy-green sectors.",
      "Brand Protection: Prevent devastating multi-pathogen outbreaks and costly product recalls with reliable molecular precision."
    ],
    matrices: [
      "Lettuce",
      "Cabbage",
      "Spinach",
      "Leafy greens",
      "Poultry",
      "Meat"
    ],
    aoacLogo: "/AOAC.png", 
    table: {
      title: "Triple Threat Defense: Singleplex vs. TAAG Multiplex PCR",
      col1: { title: "TRADITIONAL SINGLEPLEX", image: "" }, 
      col2: { title: "TAAG MULTIPLEX PCR", image: "" },
      rows: [
        { feature: "Pathogens Screened", col1: "One per reaction", col2: "Salmonella, E. coli O157:H7, STEC" },
        { feature: "Reactions per Sample", col1: "3 separate tubes", col2: "1 single tube" },
        { feature: "Enrichment Media", col1: "Multiple specific broths", col2: "Universal enrichment broth" },
        { feature: "Hands-on Time", col1: "High (Multiple pipetting steps)", col2: "Low (Streamlined prep)" },
        { feature: "Overall Cost", col1: "High", col2: "Reduced by up to 66%" }
      ]
    },
    orderingInfo: [
      { catNo: "V-FP05-1", product: "Multiplex Salmonella & E. coli Kit", size: "96 reactions", format: "PCR Tubes", description: "Simultaneous detection of Salmonella spp., E. coli O157:H7, and STEC." },
      { catNo: "V-NC03-1", product: "Nucleia Universal", size: "100 extractions", format: "Reagent Kit", description: "Universal DNA extraction protocol for complex food matrices." },
      { catNo: "V-BP02-1", product: "Universal Pathogen Broth", size: "500 g", format: "Dehydrated Powder", description: "Optimized broth for simultaneous growth of Salmonella and E. coli strains." }
    ],
    txaSection: {
      logo: "/LogoTxANB.png",
      title: "TAAG Xpert Assistant. Your AI-powered ecosystem.",
      desc: "TxA is a complete ecosystem built to manage your entire microbiology operation. From digital field sampling and multiplex result tracking, to automated compliance reporting specifically for fresh produce and meat processors.",
      linkText: "Explore TxA",
      linkHref: "/TxA"
    }
  }
};