resource "google_compute_address" "website" {
  name         = "agri-cycle-website-ip"
  region       = var.region
  network_tier = "PREMIUM"
  description  = "Reserved public IP for the Agri-Cycle website."
}

resource "google_compute_firewall" "website_web" {
  name        = "agri-cycle-website-allow-web"
  network     = "default"
  description = "Public HTTP and HTTPS for the Agri-Cycle website."

  allow {
    protocol = "tcp"
    ports    = ["80", "443"]
  }

  source_ranges = ["0.0.0.0/0"]
  target_tags   = ["agri-cycle-website"]
}

resource "google_compute_firewall" "website_iap_ssh" {
  name        = "agri-cycle-website-allow-iap-ssh"
  network     = "default"
  description = "IAP TCP forwarding SSH access for the Agri-Cycle website VM."

  allow {
    protocol = "tcp"
    ports    = ["22"]
  }

  source_ranges = ["35.235.240.0/20"]
  target_tags   = ["agri-cycle-website"]
}

resource "google_compute_instance" "website" {
  name                      = var.instance_name
  zone                      = var.zone
  machine_type              = var.machine_type
  allow_stopping_for_update = true
  deletion_protection       = false
  tags                      = ["agri-cycle-website"]

  labels = {
    app         = "agri-cycle-website"
    environment = "dev"
    managed_by  = "terraform"
  }

  boot_disk {
    auto_delete = true
    device_name = "agri-cycle-website-boot"

    initialize_params {
      image = "projects/ubuntu-os-cloud/global/images/family/ubuntu-2404-lts-amd64"
      size  = var.boot_disk_size_gb
      type  = "pd-balanced"
    }
  }

  network_interface {
    network = "default"

    access_config {
      nat_ip       = google_compute_address.website.address
      network_tier = "PREMIUM"
    }
  }

  metadata_startup_script = templatefile("${path.module}/startup.sh.tftpl", {
    app_branch = var.app_branch
    app_repo   = var.app_repo
    hostname   = var.hostname
  })
}

resource "cloudflare_dns_record" "website" {
  zone_id = var.cloudflare_zone_id
  name    = var.hostname
  type    = "A"
  content = google_compute_address.website.address
  ttl     = 1
  proxied = var.cloudflare_proxied
  comment = "Managed by Terraform; origin is the Agri-Cycle website VM."

  depends_on = [google_compute_instance.website]
}
