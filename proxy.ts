import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: Parameters<typeof intlMiddleware>[0]) {
  const response = intlMiddleware(request);
  const origin = request.nextUrl.origin;

  response.headers.set(
    'Link',
    `<${origin}/en>; rel="alternate"; hreflang="en", ` +
      `<${origin}/es>; rel="alternate"; hreflang="es", ` +
      `<${origin}/en>; rel="alternate"; hreflang="x-default"`,
  );

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
};
