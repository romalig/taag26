import { API } from "@/app/lib/api-config";
import type { SolutionContent } from "@/app/components/industrial/modals/types";

// ---------------------------------------------------------------------------
// Response envelope returned by the Laravel API
// ---------------------------------------------------------------------------
interface Envelope<T> {
  data: T;
  status: number;
  success: boolean;
}

// ---------------------------------------------------------------------------
// Public domain types
// ---------------------------------------------------------------------------
export interface IndustryCategory {
  uuid: string;
  nombre: string;
}

export interface IndustrialCatalogItem {
  uuid: string;
  title: string;
  description: string;
  targets: string;
  technology: string;
}

// ---------------------------------------------------------------------------
// Internal API shapes
// ---------------------------------------------------------------------------
interface PcrKitFoodSimple {
  uuid: string;
  title: string;
  targets: string | null;
  technology: string | null;
}

interface ProductNested {
  description_eng?: string | null;
  description_esp?: string | null;
}

interface PcrKitFoodDetail {
  uuid: string;
  product_name: string;
  technical_principle?: string | null;
  microorganisms?: string | null;
  main_industries?: string | null;
  intended_environment?: string | null;
  performance?: string | null;
  validated_matrices?: string | null;
  detection_channel?: string | null;
  thermocycler?: string | null;
  certification?: string | null;
  key_advantages?: string | null;
  revision_eng?: string | null;
  revision_date_eng?: string | null;
  technology?: string | null;
  type_of_analysis?: string | null;
  detection_chemistry?: string | null;
  target_type?: string | null;
  chip_technology?: string | null;
  producto?: ProductNested | null;
}

interface SolutionItemRef {
  cat?: string | null;
  name?: string | null;
  size?: string | null;
  format?: string | null;
  desc?: string | null;
}

interface PcrKitFoodSolution {
  uuid: string;
  title?: string | null;
  version?: string | null;
  type_of_analysis?: string | null;
  target_type?: string | null;
  targetType?: string | null;
  chips?: string[];
  description?: string[];
  mainIndustries?: string[];
  intendedUse?: string[];
  principle?: string[];
  limitations?: string[];
  advantages?: string[];
  techSpecs?: {
    targets?: string | null;
    performance?: string | null;
    matrices?: string | null;
    time?: string | null;
    technology?: string | null;
    chemistry?: string | null;
    channels?: string | null;
    thermocyclers?: string | null;
    storage?: string | null;
    shelfLife?: string | null;
    certifications?: string | null;
  } | null;
  pcrKits?: SolutionItemRef[];
  supplies?: SolutionItemRef[];
}

// ---------------------------------------------------------------------------
// Generic fetch helper — calls Laravel directly
// ---------------------------------------------------------------------------
async function fetchProductsApi<T>(path: string): Promise<T> {
  if (!API.products.baseUrl) {
    throw new Error("NEXT_PUBLIC_PRODUCTS_API_URL is not configured");
  }

  const response = await fetch(`${API.products.baseUrl}${path}`, {
    headers: API.products.headers(),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Products API error: ${response.status} ${response.statusText}`);
  }

  const json = (await response.json()) as Envelope<T>;
  return json.data;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function toSentenceList(value?: string[] | null, fallback?: string): string[] {
  if (Array.isArray(value) && value.length > 0) return value.filter(Boolean);
  if (!fallback) return [];
  return [fallback];
}

function toText(value?: string | null, fallback = "N/A"): string {
  return value?.trim() || fallback;
}

function toItems(items?: SolutionItemRef[] | null): SolutionContent["pcrKits"] {
  return (items || []).map((item) => ({
    cat: toText(item.cat),
    name: toText(item.name),
    size: toText(item.size),
    format: toText(item.format),
    desc: toText(item.desc),
  }));
}

function getCatalogDescription(detail: PcrKitFoodDetail): string {
  return (
    detail.producto?.description_eng?.trim() ||
    detail.producto?.description_esp?.trim() ||
    detail.technical_principle?.trim() ||
    detail.performance?.trim() ||
    "Technical details available in the product datasheet."
  );
}

// ---------------------------------------------------------------------------
// Public API functions — called directly from components
// ---------------------------------------------------------------------------
export async function getIndustryCategories(): Promise<IndustryCategory[]> {
  return fetchProductsApi<IndustryCategory[]>("/products/industry-categories");
}

// ---------------------------------------------------------------------------
// Shape returned by /pcr-kit-food/with-categories
// ---------------------------------------------------------------------------
interface CommercialCategory {
  uuid: string;
  nombre: string;
}

interface PcrKitFoodWithCategories {
  uuid: string;
  title: string;
  description: string | null;
  targets: string | null;
  technology: string | null;
  commercial_categories: CommercialCategory[];
}

export interface AllProductsResult {
  byCategory: Record<string, IndustrialCatalogItem[]>;
  categoryNames: Record<string, string>; // category uuid → label
}

/**
 * Fetches ALL products with their commercial categories and groups them.
 * Returns products grouped by commercial category + a lookup of category names.
 */
export async function getAllProductsByCategory(): Promise<AllProductsResult> {
  const kits = await fetchProductsApi<PcrKitFoodWithCategories[]>(
    "/products/pcr-kit-food/with-categories"
  );

  const byCategory: Record<string, IndustrialCatalogItem[]> = {};
  const categoryNames: Record<string, string> = {};

  for (const kit of kits) {
    const rawDesc = kit.description?.trim() || "";
    const shortDesc = rawDesc
      ? rawDesc.split(/\n/)[0].slice(0, 200) + (rawDesc.length > 200 ? "…" : "")
      : "Technical details available in the product datasheet.";

    const item: IndustrialCatalogItem = {
      uuid: kit.uuid,
      title: kit.title,
      description: shortDesc,
      targets: kit.targets || "N/A",
      technology: kit.technology || "N/A",
    };

    const cats = kit.commercial_categories;
    if (!cats || cats.length === 0) {
      // Products without categories go into "Other"
      if (!byCategory["other"]) byCategory["other"] = [];
      byCategory["other"].push(item);
      if (!categoryNames["other"]) categoryNames["other"] = "Other";
    } else {
      for (const cat of cats) {
        const key = cat.uuid;
        if (!byCategory[key]) byCategory[key] = [];
        byCategory[key].push(item);
        if (!categoryNames[key]) categoryNames[key] = cat.nombre;
      }
    }
  }

  return { byCategory, categoryNames };
}

export async function getCategoryCatalogItems(categoryUuid: string): Promise<IndustrialCatalogItem[]> {
  const kits = await fetchProductsApi<PcrKitFoodSimple[]>(
    `/products/industry-categories/${categoryUuid}/pcr-kit-food`
  );

  const enriched = await Promise.all(
    kits.map(async (kit) => {
      try {
        const detail = await fetchProductsApi<PcrKitFoodDetail>(`/products/pcr-kit-food/${kit.uuid}`);
        return {
          uuid: kit.uuid,
          title: kit.title,
          description: getCatalogDescription(detail),
          targets: kit.targets || detail.microorganisms || "N/A",
          technology: kit.technology || detail.technology || detail.chip_technology || "N/A",
        };
      } catch {
        return {
          uuid: kit.uuid,
          title: kit.title,
          description: "Technical details available in the product datasheet.",
          targets: kit.targets || "N/A",
          technology: kit.technology || "N/A",
        };
      }
    })
  );

  return enriched;
}

export async function getKitSolution(uuid: string): Promise<SolutionContent> {
  const solution = await fetchProductsApi<PcrKitFoodSolution>(`/products/pcr-kit-food/${uuid}/solution`);

  return {
    title: toText(solution.title, "Product datasheet"),
    targetType:
      solution.targetType?.trim() ||
      solution.target_type?.trim() ||
      solution.type_of_analysis?.trim() ||
      undefined,
    version: solution.version?.trim() || undefined,
    chips: solution.chips?.length ? solution.chips : ["PCR Kit Food"],
    description: toSentenceList(solution.description, "Technical product information."),
    mainIndustries: toSentenceList(solution.mainIndustries, "Food industry"),
    intendedUse: toSentenceList(solution.intendedUse, "Consult the datasheet for intended use."),
    principle: toSentenceList(solution.principle, "Consult the datasheet for assay principle."),
    limitations: toSentenceList(solution.limitations, "Consult the datasheet for product limitations."),
    techSpecs: {
      targets: toText(solution.techSpecs?.targets),
      performance: toText(solution.techSpecs?.performance),
      matrices: toText(solution.techSpecs?.matrices),
      time: toText(solution.techSpecs?.time),
      technology: toText(solution.techSpecs?.technology),
      chemistry: toText(solution.techSpecs?.chemistry),
      channels: toText(solution.techSpecs?.channels),
      thermocyclers: toText(solution.techSpecs?.thermocyclers),
      storage: toText(solution.techSpecs?.storage),
      shelfLife: toText(solution.techSpecs?.shelfLife),
      certifications: toText(solution.techSpecs?.certifications),
    },
    advantages: toSentenceList(solution.advantages, "Consult the datasheet for key advantages."),
    pcrKits: toItems(solution.pcrKits),
    supplies: toItems(solution.supplies),
  };
}
