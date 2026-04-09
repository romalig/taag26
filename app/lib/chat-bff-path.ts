/**
 * Rutas del BFF de chat expuestas al navegador.
 * Van fuera de `/api/*` para que un balanceador pueda enviar solo `/api/v1/*`
 * al backend Laravel sin capturar estas llamadas.
 */
export const CHAT_BFF_PATH = "/bff/chat";
export const CHAT_BFF_HEALTH_PATH = `${CHAT_BFF_PATH}/health`;
