output "instance_name" {
  description = "Website Compute Engine instance name."
  value       = google_compute_instance.website.name
}

output "instance_zone" {
  description = "Website Compute Engine instance zone."
  value       = google_compute_instance.website.zone
}

output "public_ip" {
  description = "Reserved public IP attached to the website VM."
  value       = google_compute_address.website.address
}

output "hostname" {
  description = "DNS hostname managed by Cloudflare."
  value       = cloudflare_dns_record.website.name
}

output "website_url" {
  description = "HTTPS URL for the deployed website."
  value       = "https://${var.hostname}"
}
