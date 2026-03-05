FROM nginx:alpine

RUN apk add --no-cache openssl

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy certs from build context if provided (place real certs in .docker/nginx/certs/
# before building). Falls back to a self-signed cert when the directory is empty.
RUN mkdir -p /etc/nginx/certs
COPY certs/ /tmp/certs/
RUN if [ -f /tmp/certs/cert.pem ] && [ -f /tmp/certs/key.pem ]; then \
      cp /tmp/certs/cert.pem /etc/nginx/certs/cert.pem && \
      cp /tmp/certs/key.pem  /etc/nginx/certs/key.pem; \
    else \
      openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
        -keyout /etc/nginx/certs/key.pem \
        -out    /etc/nginx/certs/cert.pem \
        -subj "/C=US/ST=Local/L=Local/O=Dev/CN=localhost"; \
    fi && \
    rm -rf /tmp/certs

EXPOSE 80 443
