FROM nginx:alpine

RUN apk add --no-cache openssl

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Generate self-signed cert for local/dev use.
# In production, mount real certs at /etc/nginx/certs/ via a volume or secret.
RUN mkdir -p /etc/nginx/certs && \
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
      -keyout /etc/nginx/certs/key.pem \
      -out    /etc/nginx/certs/cert.pem \
      -subj "/C=US/ST=Local/L=Local/O=Dev/CN=localhost"

EXPOSE 80 443
