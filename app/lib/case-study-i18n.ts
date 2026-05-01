import type {CaseStudy} from "@/app/components/data/caseStudies";

/**
 * next-intl typing for CaseStudies namespace — supports dynamic keys under `cards.<slug>.*`.
 */
export type CaseStudiesTranslator = {
  has: (key: string) => boolean;
  raw: (key: string) => unknown;
  (key: string, values?: Record<string, string | number | Date>): string;
};

function cardKey(slug: string, field: string): string {
  return `cards.${slug}.${field}`;
}

export type LocalizedCaseStudy = {
  company: string;
  category: string;
  title: string;
  description: string;
  heroMetric: string;
  challenge: string;
  solution: string;
  results: string[];
};

/**
 * Resolves copy from messages (`CaseStudies.cards.<slug>.*`) with fallback to `study` (English source in code).
 * Optional `results` as string array in JSON via `t.raw` when present.
 */
export function getLocalizedCaseStudy(
  study: CaseStudy,
  t: CaseStudiesTranslator,
): LocalizedCaseStudy {
  const pick = (field: keyof CaseStudy | "results", fallback: string | string[]) => {
    const key = cardKey(study.slug, field);
    if (field === "results") {
      const raw = t.has(key) ? t.raw(key) : undefined;
      if (Array.isArray(raw) && raw.every((x) => typeof x === "string")) {
        return raw as string[];
      }
      return fallback as string[];
    }
    return t.has(key) ? t(key) : (fallback as string);
  };

  return {
    company: pick("company", study.company) as string,
    category: pick("category", study.category) as string,
    title: pick("title", study.title) as string,
    description: pick("description", study.description) as string,
    heroMetric: pick("heroMetric", study.heroMetric) as string,
    challenge: pick("challenge", study.challenge) as string,
    solution: pick("solution", study.solution) as string,
    results: pick("results", study.results) as string[],
  };
}
