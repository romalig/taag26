// industryHeroImages.ts — single source of truth for the Product Value Brief HERO image
// (used by both the modal, ProductBrief.tsx, and the PDF, ProductBriefDocument.tsx).
//
// Two layers:
//   1. KIT_PRIMARY_INDUSTRY — a CURATED per-kit assignment (keyed by catalogCode). For each PCR
//      kit we pick the single most representative industry from the target organism's canonical
//      matrix, instead of trusting mainIndustries ordering. Broad multi-pathogen panels, general
//      spoilage kits and surface-only kits map to HERO_GENERIC → /foods.png.
//   2. heroImageForIndustries — fallback rule (primary = industries[0]; >4 or none → /foods.png).
//      Used for non-PCR consumables and any kit not in the curated map.
//
// INDUSTRY_HERO_IMAGES keys MUST match the canonical industry names in data/industries.ts. Values
// are file names under /public.

export const INDUSTRY_HERO_IMAGES: Record<string, string> = {
  "Beer": "/beer.png",
  "Wine": "/wine.png",
  "Beverage": "/beverage.png",
  "Water": "/water.png",
  "Confectionery": "/confectionary.png",
  "Dairy": "/dairy.png",
  "Egg Products": "/egg.png",
  "Fresh & Processed Produce": "/produce.png",
  "Meat and Poultry": "/meat.png",
  "Nutraceutical": "/nutraceutical.png",
  "Pet Food & Animal Feed": "/pet.png",
  "Pharmaceutical": "/pharmaceutical.png",
  "Ready-to-eat": "/ready.png",
  "Sauces and condiments": "/sauces.png",
  "Seafood": "/sea.png",
  "Sterile products": "/sterile.png",
  "Coca": "/coca_cola.png",
};

export const HERO_FALLBACK_IMAGE = "/foods.png";
export const HERO_MAX_INDUSTRIES = 4;
// Sentinel for kits that have no single representative industry (broad / multi-pathogen / surface).
export const HERO_GENERIC = "__generic__";

// Curated primary industry per kit (catalogCode). "__generic__" → /foods.png.
// Rationale lives next to each entry; beer/wine and beverage/sauces calls are the softest — review.
export const KIT_PRIMARY_INDUSTRY: Record<string, string> = {
  // --- Salmonella (single / Salmonella-led) → Meat and Poultry (flagship matrix) ---
  "V-SF97":  HERO_GENERIC,           // Ampliora 1.1 Salmonella spp.
  "V-SF31":  HERO_GENERIC,            // Specio 1.1 Salmonella spp.
  "V-PAT04": HERO_GENERIC,            // Elevia 1.1 Salmonella spp.
  // --- E. coli ---
  "V-SF69":  HERO_GENERIC,   // Ampliora 1.3 E. coli (generic / hygiene)
  "V-SF167": HERO_GENERIC,   // Specio 1.3 E. coli
  "V-SF68":  "Meat and Poultry",          // Ampliora 3.9 STEC + O157:H7 + Salmonella (O157 → beef)
  "V-SF05":  "Meat and Poultry",          // Specio 2.4 E. coli + O157:H7 (O157 → beef)
  // --- Listeria (single genus) → Dairy ---
  "V-SF46":  HERO_GENERIC,                      // Ampliora 2.3 Listeria spp. + L. mono
  "V-SF28":  HERO_GENERIC,                     // Specio 1.4 L. monocytogenes
  "V-SF52":  HERO_GENERIC,                      // Specio 1.8 Listeria spp.
  "V-SF04":  HERO_GENERIC,                      // Specio 2.3 Listeria spp. + L. mono
  // --- S. aureus → Dairy (cheese classic) ---
  "V-SF39":  HERO_GENERIC,                      // Specio 1.2 S. aureus
  "V-SF07":  HERO_GENERIC,                      // Specio 2.2 S. aureus + E. coli (S. aureus-led)
  // --- Vibrio → Seafood ---
  "V-SF109": "Seafood",                   // Ampliora 3.10 V. cholerae / vulnificus / parahaemolyticus
  // --- Beverage / water / low-pH spoilage → Beverage ---
  "V-SF161": "Beverage",                  // Ampliora 2.10 ACB + Guaiacol
  "V-SF160": "Beverage",                  // Ampliora 3.13 ACB + Guaiacol + Zygo
  "V-SF169": "Beverage",                  // Ampliora 4.7 Low-pH Microorganisms
  "V-EQ30":  "Coca",                        // Ampliora 4.7 Spoilage Beverage
  "V-SF98":  "Water"     ,                  // Ampliora 3.11 WaterScan
  "V-SF89":  "Water"     ,                  // Ampliora 3.12 WaterScan
  "V-SF88":  "Water"     ,                  // Ampliora 6.1 WaterScan Plus
  // --- Zygosaccharomyces (acidic sauces/dressings) → Sauces ---
  "V-SF45":  "Sauces and condiments",     // Specio 1.7 Zygosaccharomyces bailii / parabailii
  // --- Beer/Wine yeast & bacteria (brewing/wine spoilage) ---
  "V-SF102": "Beer",                      // Ampliora 4.5 Bacteria (LAB; Beer-only)
  "V-SF103": "Beer",                      // Ampliora 4.6 Bacteria (Megasphaera/Pectinatus; Beer-only)
  "V-SF99":  "Beer",                      // Ampliora 8.2 Bacteria Plus (Beer-only)
  "V-SF64":  "Beer",                      // Ampliora 8.1 Yeast Plus (Beer-only)
  "V-SF101": "Beer",                      // Ampliora 4.4 Yeast (S. diastaticus → beer; SOFT: Brett→wine)
  "V-SF100": "Wine",                      // Ampliora 4.3 Yeast (Saccharomyces+Zygo; SOFT: could be Beer)
  "V-SF179": "Wine",                      // Ampliora 3.15 Zygo group + Saccharomyces (SOFT: could be Beer)
  // --- Broad multi-pathogen / general spoilage / surface-only → /foods.png ---
  "V-SF44":  HERO_GENERIC,                // Ampliora 2.8 Listeria + Salmonella (8 ind)
  "V-SF67":  HERO_GENERIC,                // Ampliora 3.2 Salmonella + L.mono + O157 (10 ind)
  "V-SF59":  HERO_GENERIC,                // Ampliora 3.5 Salmonella + L.mono + Listeria (9 ind)
  "V-SF74":  HERO_GENERIC,                // Ampliora 3.5R (9 ind)
  "V-SF14":  HERO_GENERIC,                // Specio 00.1 Bacteria (general spoilage)
  "V-SF15":  HERO_GENERIC,                // Specio 00.2 Yeast & Molds (general spoilage)
  "V-SF29":  HERO_GENERIC,                // Specio 2.5 Salmonella + L.mono (6 ind, mixed genera)
  "V-SF25":  HERO_GENERIC,                // Specio 2.7 Salmonella + E. coli (5 ind, mixed genera)
  "V-SF56":  HERO_GENERIC,                // Specio 3.2 Salmonella + L.mono + O157 (8 ind)
  "V-SF42":  HERO_GENERIC,                // Specio 4.1 Salmonella + S.aureus + E.coli + L.mono (9 ind)
  "V-SF184": HERO_GENERIC,                // Specio 4.8 Pathogens + Hygiene Indicators (9 ind)
  "V-PAT07": HERO_GENERIC,                // Elevia 2.8 Salmonella + Listeria (surface-only)
  "V-PAT06": HERO_GENERIC,                // Elevia 2.9 Salmonella + Enterobacteria (surface-only)
};

/**
 * Fallback rule when a kit isn't curated (e.g. non-PCR consumables): primary industry =
 * industries[0]; >4 industries or none → /foods.png.
 */
export function heroImageForIndustries(industries: string[] | null | undefined): string {
  const list = industries ?? [];
  if (list.length === 0 || list.length > HERO_MAX_INDUSTRIES) return HERO_FALLBACK_IMAGE;
  return INDUSTRY_HERO_IMAGES[list[0]] ?? HERO_FALLBACK_IMAGE;
}

/**
 * Hero for the PROTOCOL SELECTOR: the image of the SELECTED industry (not the kit's). Falls back
 * to /foods.png when the industry has no image or none is selected.
 */
export function heroImageForIndustry(industry: string | null | undefined): string {
  return (industry && INDUSTRY_HERO_IMAGES[industry]) || HERO_FALLBACK_IMAGE;
}

/**
 * Hero image for a kit: curated per-kit industry first (by catalogCode), then the industry rule.
 */
export function heroImageForKit(kitId: string | null | undefined, industries: string[] | null | undefined): string {
  if (kitId) {
    const ind = KIT_PRIMARY_INDUSTRY[kitId];
    if (ind === HERO_GENERIC) return HERO_FALLBACK_IMAGE;
    if (ind && INDUSTRY_HERO_IMAGES[ind]) return INDUSTRY_HERO_IMAGES[ind];
  }
  return heroImageForIndustries(industries);
}