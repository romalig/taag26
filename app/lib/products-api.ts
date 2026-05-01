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
/** API row shape `{ uuid, nombre }` (industry-categories list and commercial category pivots) */
export interface IndustryCategory {
  uuid: string;
  nombre: string;
}

/** Same shape as {@link IndustryCategory}; used in `with-categories` payloads */
export type CommercialCategory = IndustryCategory;

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
  description?: string | null;
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
  sensitivity?: string | null;
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
    sensitivity?: string | null;
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
type ProductsLocale = "en" | "es";

function normalizeProductsLocale(locale?: string): ProductsLocale | undefined {
  return locale === "en" || locale === "es" ? locale : undefined;
}

function withLocale(path: string, locale?: string): string {
  const safeLocale = normalizeProductsLocale(locale);
  if (!safeLocale) return path;
  const separator = path.includes("?") ? "&" : "?";
  return `${path}${separator}locale=${safeLocale}`;
}

function productFallback(locale: string | undefined, key: "uncategorized" | "technicalDetails" | "productDatasheet" | "technicalInfo" | "foodIndustry" | "intendedUse" | "principle" | "limitations" | "advantages"): string {
  const es = normalizeProductsLocale(locale) === "es";
  const copy = {
    uncategorized: es ? "Todas las soluciones" : "All solutions",
    technicalDetails: es
      ? "Detalles técnicos disponibles en la hoja de datos del producto."
      : "Technical details available in the product datasheet.",
    productDatasheet: es ? "Hoja de datos del producto" : "Product datasheet",
    technicalInfo: es ? "Información técnica del producto." : "Technical product information.",
    foodIndustry: es ? "Industria alimentaria" : "Food industry",
    intendedUse: es ? "Consulta la hoja de datos para el uso previsto." : "Consult the datasheet for intended use.",
    principle: es ? "Consulta la hoja de datos para el principio del ensayo." : "Consult the datasheet for assay principle.",
    limitations: es ? "Consulta la hoja de datos para las limitaciones del producto." : "Consult the datasheet for product limitations.",
    advantages: es ? "Consulta la hoja de datos para las ventajas clave." : "Consult the datasheet for key advantages.",
  };
  return copy[key];
}

async function fetchProductsApi<T>(path: string, locale?: string): Promise<T> {
  if (!API.apiwebsite.baseUrl) {
    throw new Error("NEXT_PUBLIC_APIWEBSITE_URL is not configured");
  }

  const response = await fetch(`${API.apiwebsite.baseUrl}${withLocale(path, locale)}`, {
    headers: API.apiwebsite.headers(),
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

function getCatalogDescription(detail: PcrKitFoodDetail, locale?: string): string {
  return (
    detail.producto?.description?.trim() ||
    detail.technical_principle?.trim() ||
    detail.sensitivity?.trim() ||
    productFallback(locale, "technicalDetails")
  );
}

// ---------------------------------------------------------------------------
// Public API functions — called directly from components
// ---------------------------------------------------------------------------
export async function getIndustryCategories(locale?: string): Promise<IndustryCategory[]> {
  return fetchProductsApi<IndustryCategory[]>("/products/industry-categories", locale);
}

// ---------------------------------------------------------------------------
// Shape returned by GET /products/pcr-kit-food/with-categories (see OpenAPI / api-endpoints-frontend.md)
// ---------------------------------------------------------------------------
interface PcrKitFoodWithCategories {
  uuid: string;
  title: string;
  description: string | null;
  targets: string | null;
  technology: string | null;
  /** Laravel: producto.commercialCategories → JSON key commercial_categories */
  commercial_categories?: CommercialCategory[] | null;
  commercialCategories?: CommercialCategory[] | null;
  /** Legacy / alternate relation name (same `{ uuid, nombre }[]` shape) */
  industry_categories?: CommercialCategory[] | null;
}

function wireCommercialCategories(kit: PcrKitFoodWithCategories): CommercialCategory[] {
  const snake = kit.commercial_categories;
  const camel = kit.commercialCategories;
  const legacy = kit.industry_categories;
  if (Array.isArray(snake)) return snake;
  if (Array.isArray(camel)) return camel;
  if (Array.isArray(legacy)) return legacy;
  return [];
}

/** When commercial_categories is [] (empty pivot / no seed), still list kits under one tab */
const UNCATEGORIZED_TAB_ID = "uncategorized";

export interface AllProductsResult {
  byCategory: Record<string, IndustrialCatalogItem[]>;
  categoryNames: Record<string, string>; // category uuid → label
}

/**
 * Single-call fetch of ALL products with their commercial categories (`commercial_categories` on each kit).
 * Returns products grouped by category UUID + a lookup of category names.
 */
export async function getAllProductsByCategory(locale?: string): Promise<AllProductsResult> {
  const raw = await fetchProductsApi<unknown>("/products/pcr-kit-food/with-categories", locale);
  if (!Array.isArray(raw)) {
    throw new Error("Products API: with-categories expected `data` to be a JSON array of kits");
  }
  const kits = raw as PcrKitFoodWithCategories[];

  const byCategory: Record<string, IndustrialCatalogItem[]> = {};
  const categoryNames: Record<string, string> = {};

  for (const kit of kits) {
    if (!kit || typeof kit !== "object") continue;

    const rawDesc = kit.description?.trim() || "";
    const shortDesc = rawDesc
      ? rawDesc.split(/\n/)[0].slice(0, 200) + (rawDesc.length > 200 ? "…" : "")
      : productFallback(locale, "technicalDetails");

    const item: IndustrialCatalogItem = {
      uuid: kit.uuid,
      title: kit.title,
      description: shortDesc,
      targets: kit.targets || "N/A",
      technology: kit.technology || "N/A",
    };

    const wired = wireCommercialCategories(kit);
    const categoriesForGrouping: CommercialCategory[] =
      wired.length > 0
        ? wired
        : [{ uuid: UNCATEGORIZED_TAB_ID, nombre: productFallback(locale, "uncategorized") }];

    for (const cat of categoriesForGrouping) {
      if (!byCategory[cat.uuid]) byCategory[cat.uuid] = [];
      byCategory[cat.uuid].push(item);
      if (!categoryNames[cat.uuid]) categoryNames[cat.uuid] = cat.nombre;
    }
  }

  return { byCategory, categoryNames };
}

export async function getCategoryCatalogItems(categoryUuid: string, locale?: string): Promise<IndustrialCatalogItem[]> {
  const kits = await fetchProductsApi<PcrKitFoodSimple[]>(
    `/products/industry-categories/${categoryUuid}/pcr-kit-food`,
    locale
  );

  const enriched = await Promise.all(
    kits.map(async (kit) => {
      try {
        const detail = await fetchProductsApi<PcrKitFoodDetail>(`/products/pcr-kit-food/${kit.uuid}`, locale);
        return {
          uuid: kit.uuid,
          title: kit.title,
          description: getCatalogDescription(detail, locale),
          targets: kit.targets || detail.microorganisms || "N/A",
          technology: kit.technology || detail.technology || detail.chip_technology || "N/A",
        };
      } catch {
        return {
          uuid: kit.uuid,
          title: kit.title,
          description: productFallback(locale, "technicalDetails"),
          targets: kit.targets || "N/A",
          technology: kit.technology || "N/A",
        };
      }
    })
  );

  return enriched;
}

/**
 * Resolves a product by its exact `title` string (as returned by the catalog),
 * then fetches its full solution datasheet. Resilient to UUID changes after
 * seeders because the lookup key is the stable product name.
 */
export async function getKitSolutionByTitle(title: string, locale?: string): Promise<SolutionContent | null> {
  const result = await getAllProductsByCategory(locale);
  const all = Object.values(result.byCategory).flat();
  const match = all.find(
    (item) => item.title.trim().toLowerCase() === title.trim().toLowerCase()
  );
  if (!match) return null;
  return getKitSolution(match.uuid, locale);
}

/** Rows for “Kits & Protocols” tables — GET /products/protocolos */
export interface ProtocolMatrixRow {
  uuid: string;
  kit: string | null;
  matrix: string | null;
  quantity: string | null;
  enrichmentTime: string | null;
  protocolRef?: string | null;
}

/**
 * Validated enrichment protocols from the Protocolos catalog.
 *
 * @param search Optional filter on related product nombre or code (substring).
 */
export async function getProtocols(search?: string, locale?: string): Promise<ProtocolMatrixRow[]> {
  const qs = search !== undefined && search.trim() !== "" ? `?search=${encodeURIComponent(search.trim())}` : "";

  return fetchProductsApi<ProtocolMatrixRow[]>(`/products/protocolos${qs}`, locale);
}

export async function getKitSolution(uuid: string, locale?: string): Promise<SolutionContent> {
  const solution = await fetchProductsApi<PcrKitFoodSolution>(`/products/pcr-kit-food/${uuid}/solution`, locale);

  return {
    title: toText(solution.title, productFallback(locale, "productDatasheet")),
    targetType:
      solution.targetType?.trim() ||
      solution.target_type?.trim() ||
      solution.type_of_analysis?.trim() ||
      undefined,
    version: solution.version?.trim() || undefined,
    chips: solution.chips?.length ? solution.chips : ["PCR Kit Food"],
    description: toSentenceList(solution.description, productFallback(locale, "technicalInfo")),
    mainIndustries: toSentenceList(solution.mainIndustries, productFallback(locale, "foodIndustry")),
    intendedUse: toSentenceList(solution.intendedUse, productFallback(locale, "intendedUse")),
    principle: toSentenceList(solution.principle, productFallback(locale, "principle")),
    limitations: toSentenceList(solution.limitations, productFallback(locale, "limitations")),
    techSpecs: {
      targets: toText(solution.techSpecs?.targets),
      sensitivity: toText(solution.techSpecs?.sensitivity),
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
    advantages: toSentenceList(solution.advantages, productFallback(locale, "advantages")),
    pcrKits: toItems(solution.pcrKits),
    supplies: toItems(solution.supplies),
  };
}
