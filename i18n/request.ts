import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';

type Messages = Record<string, unknown>;

/**
 * Merge Spanish-only case study card copy (long-form) without duplicating EN in JSON.
 * EN locale uses messages + fallback from `caseStudies.ts` via `getLocalizedCaseStudy`.
 */
function mergeCaseStudiesOverlay(base: Messages, overlay: Messages): Messages {
  const ovCs = overlay.CaseStudies as Record<string, unknown> | undefined;
  if (!ovCs) {
    return base;
  }
  const baseCs = (base.CaseStudies as Record<string, unknown>) || {};
  const mergedCards = {
    ...((baseCs.cards as Record<string, unknown>) || {}),
    ...((ovCs.cards as Record<string, unknown>) || {}),
  };
  return {
    ...base,
    CaseStudies: {
      ...baseCs,
      ...ovCs,
      cards: mergedCards,
    },
  };
}

export default getRequestConfig(async ({requestLocale}) => {
  let locale = await requestLocale;

  // Strict allowlist — fallback to defaultLocale for any unknown value
  if (!locale || !(routing.locales as readonly string[]).includes(locale)) {
    locale = routing.defaultLocale;
  }

  const base = (await import(`../messages/${locale}.json`)).default as Messages;

  let messages = base;
  if (locale === 'es') {
    const overlay = (await import('../messages/case-studies-overlay.es.json')).default as Messages;
    messages = mergeCaseStudiesOverlay(base, overlay);
  }

  return {
    locale,
    messages,
  };
});
