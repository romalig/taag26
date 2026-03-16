#!/bin/sh
set -e

# Shutdown graceful
_term() {
    echo "[start.sh] Deteniendo servicios..."
    nginx -s quit
    kill "$NODE_PID" 2>/dev/null
    exit 0
}
trap _term SIGTERM SIGINT

# Generar certificados SSL si no existen
/scripts/background.sh

# Iniciar Next.js en background
echo "[start.sh] Iniciando Next.js..."
node /app/server.js &
NODE_PID=$!

# Esperar a que Next.js esté listo
echo "[start.sh] Esperando Next.js en 127.0.0.1:3000..."
TIMEOUT=15
WAITED=0
while ! wget -q --spider http://127.0.0.1:3000/ 2>/dev/null; do
    if [ "$WAITED" -ge "$TIMEOUT" ]; then
        echo "[start.sh] ERROR: Next.js no respondio despues de ${TIMEOUT}s"
        exit 1
    fi
    sleep 1
    WAITED=$((WAITED + 1))
done
echo "[start.sh] Next.js listo."

# Iniciar nginx como proceso principal
echo "[start.sh] Iniciando nginx..."
exec nginx -g 'daemon off;'
