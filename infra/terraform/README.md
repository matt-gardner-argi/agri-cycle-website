# Agri-Cycle website infrastructure

This Terraform stack manages the public website VM, its reserved IP, the web/IAP firewall rules, the VM startup deployment, and the Cloudflare DNS A record for `website.agricycleenergy.app`.

The VM clones the public GitHub repository and builds the Next.js site during first boot. The local `.env` file is intentionally not copied to the VM; Terraform receives only the Cloudflare token needed to manage DNS.

## Apply

From this directory, provide credentials through environment variables and run:

```sh
export GOOGLE_OAUTH_ACCESS_TOKEN="$(gcloud auth print-access-token)"
export TF_VAR_cloudflare_api_token="<Cloudflare DNS token>"

terraform init
terraform fmt -check
terraform validate
terraform plan
terraform apply
```

The Cloudflare token must have DNS read/write access to `agricycleenergy.app`. The GCP identity must be able to manage Compute Engine resources in project `argicycle`.

The record is intentionally DNS-only (`cloudflare_proxied = false`). The VM obtains and renews a Let's Encrypt certificate through Nginx, and redirects HTTP to HTTPS. Set `letsencrypt_email` to receive renewal notices; it defaults to Certbot's no-email registration mode.

## Validation

After apply, check the outputs and confirm:

```sh
terraform output
dig +short website.agricycleenergy.app
curl --fail --head https://website.agricycleenergy.app/
```
