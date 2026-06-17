// industries.ts — EDIT THIS FILE BY HAND.
// Canonical list (and display order) of the industries the app supports. The names here MUST
// match the industry names referenced by protocols.ts (the `stagesByIndustry` keys and the
// kits' `mainIndustries`). This single list drives both:
//   • Step 1 of the WorkflowBuilder (the industry picker), and
//   • the industry filter in the Product Explorer (ProductCatalog).
//
// NOTE: the per-industry `microorganisms` arrays that used to live here were REMOVED — they were
// dead. getMicroorganismsForIndustry() (see workflowData.ts) derives the selectable organisms
// from the REAL targets of the kits in each industry, so a hand-maintained list here drove
// nothing and only risked drifting from the catalog.

export interface IndustryDef {
  name: string;
}

export const INDUSTRIES: IndustryDef[] = [
  { "name": "Beer" },
  { "name": "Beverage" },
  { "name": "Confectionery" },
  { "name": "Dairy" },
  { "name": "Egg Products" },
  { "name": "Fresh & Processed Produce" },
  { "name": "Meat and Poultry" },
  { "name": "Nutraceutical" },
  { "name": "Pet Food & Animal Feed" },
  { "name": "Pharmaceutical" },
  { "name": "Ready-to-eat" },
  { "name": "Sauces and condiments" },
  { "name": "Seafood" },
  { "name": "Sterile products" },
  { "name": "Wine" },
];