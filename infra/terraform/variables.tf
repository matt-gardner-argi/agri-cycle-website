variable "project_id" {
  description = "GCP project that owns the website infrastructure."
  type        = string
  default     = "argicycle"
}

variable "region" {
  description = "GCP region for the reserved external IP."
  type        = string
  default     = "us-central1"
}

variable "zone" {
  description = "GCP zone for the website VM."
  type        = string
  default     = "us-central1-c"
}

variable "instance_name" {
  description = "Compute Engine instance name."
  type        = string
  default     = "agri-cycle-website"
}

variable "machine_type" {
  description = "Compute Engine machine type. e2-medium is 2 vCPU and 4 GB RAM."
  type        = string
  default     = "e2-medium"
}

variable "boot_disk_size_gb" {
  description = "Boot disk size in GB."
  type        = number
  default     = 50
}

variable "hostname" {
  description = "Public hostname for the website."
  type        = string
  default     = "website.agricycleenergy.app"
}

variable "cloudflare_zone_id" {
  description = "Cloudflare zone ID for agricycleenergy.app."
  type        = string
  default     = "78edb99165e2502b1d56bba0c5bf1098"
}

variable "cloudflare_api_token" {
  description = "Cloudflare API token with DNS read/write access. Supply via TF_VAR_cloudflare_api_token."
  type        = string
  sensitive   = true
}

variable "app_repo" {
  description = "Public Git repository cloned by the VM startup script."
  type        = string
  default     = "https://github.com/matt-gardner-argi/agri-cycle-website.git"
}

variable "app_branch" {
  description = "Git branch deployed by the VM startup script."
  type        = string
  default     = "main"
}

variable "cloudflare_proxied" {
  description = "Whether Cloudflare should proxy the DNS record. Keep false while the origin is HTTP-only."
  type        = bool
  default     = false
}
