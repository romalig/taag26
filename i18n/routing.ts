import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'es', 'fr'],
  defaultLocale: 'en',
  localePrefix: 'always',
  // hreflang Link header is set in proxy.ts using NEXT_PUBLIC_SITE_URL (same source as SEO).
  alternateLinks: false,
});
