#!/bin/sh
set -e

SSL_DIR="/etc/nginx/ssl"

# Generar certificados autofirmados solo si no existen
# (permite montar certificados reales via volumen si se desea)
if [ ! -f "$SSL_DIR/nginx.crt" ] || [ ! -f "$SSL_DIR/nginx.key" ]; then
    echo "[background.sh] Generando certificados SSL autofirmados..."
    mkdir -p "$SSL_DIR"
    openssl req -x509 -nodes -days 365 \
        -newkey rsa:2048 \
        -keyout "$SSL_DIR/nginx.key" \
        -out "$SSL_DIR/nginx.crt" \
        -subj "/CN=taag-bio/O=TAAG/C=MX"
    echo "[background.sh] Certificados generados en $SSL_DIR"
else
    echo "[background.sh] Certificados SSL existentes encontrados, usando esos."
fi
