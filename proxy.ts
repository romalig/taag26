import createMiddleware from 'next-intl/middleware';
import {siteUrl} from '@/app/seo/site';
import {routing} from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

function hreflangLinkHeader(): string {
  const base = siteUrl.replace(/\/$/, '');
  const segments = routing.locales.map(
    (locale) => `<${base}/${locale}>; rel="alternate"; hreflang="${locale}"`,
  );
  segments.push(
    `<${base}/${routing.defaultLocale}>; rel="alternate"; hreflang="x-default"`,
  );
  return segments.join(', ');
}

export default function proxy(request: Parameters<typeof intlMiddleware>[0]) {
  const response = intlMiddleware(request);
  response.headers.set('Link', hreflangLinkHeader());
  return response;
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
