# ---- Stage 1: Dependencies ----
FROM node:22-alpine AS deps

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

# ---- Stage 2: Build ----
FROM node:22-alpine AS builder

WORKDIR /app

# NEXT_PUBLIC_* vars must be present at build time so Next.js inlines them
ARG NEXT_PUBLIC_APIWEBSITE_URL=""
ARG NEXT_PUBLIC_APIWEBSITE_SERVICE_KEY=""
ARG NEXT_PUBLIC_TXALAB_LOGIN_URL="https://txalab.taag-genetics.com"
# Public site URL (seo/site.ts, proxy hreflang). Override per env in CI / docker build.
ARG NEXT_PUBLIC_SITE_URL=""
ENV NEXT_PUBLIC_APIWEBSITE_URL=$NEXT_PUBLIC_APIWEBSITE_URL
ENV NEXT_PUBLIC_APIWEBSITE_SERVICE_KEY=$NEXT_PUBLIC_APIWEBSITE_SERVICE_KEY
ENV NEXT_PUBLIC_TXALAB_LOGIN_URL=$NEXT_PUBLIC_TXALAB_LOGIN_URL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
# Chat upstream — same as CI build-args; must exist at `next build` so server
# routes (e.g. /bff/chat) see a non-empty URL in the compiled bundle.
ARG CHAT_IA_WEBPAGE_API_URL=""
ARG CHAT_IA_WEBPAGE_SERVICE_KEY=""
ENV CHAT_IA_WEBPAGE_API_URL=$CHAT_IA_WEBPAGE_API_URL
ENV CHAT_IA_WEBPAGE_SERVICE_KEY=$CHAT_IA_WEBPAGE_SERVICE_KEY

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# ---- Stage 3: Production runner ----
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

# Instalar nginx, openssl y bash (para terminal en Portainer)
RUN apk add --no-cache nginx openssl

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiar configuracion de nginx y scripts
COPY .docker/nginx.conf /etc/nginx/http.d/default.conf
COPY .docker/background.sh /scripts/background.sh
COPY .docker/start.sh /scripts/start.sh
RUN chmod +x /scripts/background.sh /scripts/start.sh

# Crear directorio SSL, generar certificados autofirmados y asignar permisos
RUN mkdir -p /etc/nginx/ssl /var/log/nginx /var/lib/nginx/logs \
    && openssl req -x509 -nodes -days 365 \
        -newkey rsa:2048 \
        -keyout /etc/nginx/ssl/nginx.key \
        -out /etc/nginx/ssl/nginx.crt \
        -subj "/CN=taag-bio/O=TAAG/C=MX" \
    && chown -R nextjs:nodejs /etc/nginx/ssl /var/log/nginx /var/lib/nginx /run/nginx

# Copiar assets publicos
COPY --from=builder /app/public ./public

# Copiar standalone server y archivos estaticos
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Variables server-side (runtime) — se pueden sobreescribir en docker run / Portainer
# ARG CHAT_IA_WEBPAGE_API_URL=""
# ARG CHAT_IA_WEBPAGE_SERVICE_KEY=""
# ENV CHAT_IA_WEBPAGE_API_URL=$CHAT_IA_WEBPAGE_API_URL
# ENV CHAT_IA_WEBPAGE_SERVICE_KEY=$CHAT_IA_WEBPAGE_SERVICE_KEY

# Omitir validacion de certificados autofirmados en fetch de Node.js
ENV NODE_TLS_REJECT_UNAUTHORIZED=0

USER nextjs

EXPOSE 443 3000

CMD ["/scripts/start.sh"]
