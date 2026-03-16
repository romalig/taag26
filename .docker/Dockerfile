# ---- Stage 1: Dependencies ----
FROM node:22-alpine AS deps

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

# ---- Stage 2: Build ----
FROM node:22-alpine AS builder

WORKDIR /app

# NEXT_PUBLIC_* vars must be present at build time so Next.js inlines them
ARG NEXT_PUBLIC_PRODUCTS_API_URL=""
ARG NEXT_PUBLIC_PRODUCTS_SERVICE_KEY=""

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# ---- Stage 3: Production runner ----
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

# Instalar nginx y openssl para TLS en transito
RUN apk add --no-cache nginx openssl

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiar configuracion de nginx y scripts
COPY .docker/nginx.conf /etc/nginx/http.d/default.conf
COPY .docker/background.sh /scripts/background.sh
COPY .docker/start.sh /scripts/start.sh
RUN chmod +x /scripts/background.sh /scripts/start.sh

# Crear directorio SSL y asignar permisos
RUN mkdir -p /etc/nginx/ssl /var/log/nginx /var/lib/nginx/logs \
    && chown -R nextjs:nodejs /etc/nginx/ssl /var/log/nginx /var/lib/nginx /run/nginx

# Copiar assets publicos
COPY --from=builder /app/public ./public

# Copiar standalone server y archivos estaticos
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 443 3000

CMD ["/scripts/start.sh"]
