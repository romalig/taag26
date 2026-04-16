variable "compartment_id" {
  description = "OCID del compartment donde se despliega el WAF (mismo que el Load Balancer)"
  type        = string
}

variable "load_balancer_id" {
  description = "OCID del OCI Load Balancer al que se adjunta el WAF"
  type        = string
}

variable "environment" {
  description = "Entorno de despliegue (production, staging)"
  type        = string
  default     = "production"

  validation {
    condition     = contains(["production", "staging"], var.environment)
    error_message = "environment debe ser 'production' o 'staging'."
  }
}

variable "display_name_prefix" {
  description = "Prefijo para los nombres de los recursos WAF en OCI"
  type        = string
  default     = "taag-bio"
}

# ── Límites de rate limiting ──────────────────────────────────────────────────
variable "chat_rate_limit_requests" {
  description = "Máximo de peticiones al endpoint /bff/chat por IP en la ventana de tiempo"
  type        = number
  default     = 20
}

variable "chat_rate_limit_window_seconds" {
  description = "Ventana de tiempo en segundos para el rate limit del chat"
  type        = number
  default     = 60
}

variable "chat_rate_limit_block_seconds" {
  description = "Duración del bloqueo tras superar el rate limit (segundos)"
  type        = number
  default     = 120
}

variable "global_rate_limit_requests" {
  description = "Máximo de peticiones globales por IP (todas las rutas)"
  type        = number
  default     = 300
}

variable "global_rate_limit_window_seconds" {
  description = "Ventana de tiempo para el rate limit global (segundos)"
  type        = number
  default     = 60
}
