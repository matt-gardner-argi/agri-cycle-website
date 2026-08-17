import type { NextConfig } from "next";

/**
 * Old WordPress paths -> new routes, so inbound links and bookmarks from
 * agricycleenergy.com keep working.
 */
const legacyRedirects: { source: string; destination: string }[] = [
  { source: "/divert-food-waste", destination: "/" },
  { source: "/food-waste-services", destination: "/services" },
  { source: "/food-waste-collection", destination: "/services/collection" },
  { source: "/frequently-asked-questions", destination: "/faq" },
  {
    source: "/reasons-to-work-with-agri-cycle-for-food-waste-management",
    destination: "/about/why-agri-cycle",
  },
  { source: "/about-us", destination: "/about" },
  { source: "/about-us/the-depackaging-machine", destination: "/about/depackaging" },
  { source: "/about-us/processing-partners", destination: "/about/processing-partners" },
  { source: "/about-us/history", destination: "/about/history" },
  { source: "/about-us/our-team", destination: "/about/team" },
  { source: "/about-us/what-is-anaerobic-digestion", destination: "/about/anaerobic-digestion" },
  { source: "/service-area-footprint", destination: "/service-area" },
  { source: "/agri-calculator", destination: "/calculator" },
  { source: "/employment", destination: "/careers" },
  { source: "/quote-request", destination: "/quote" },
  { source: "/services/quote-request", destination: "/quote" },
  { source: "/sms_pptos", destination: "/sms-policy" },
];

/**
 * Public hostname of the Cloudflare Tunnel that exposes the local dev server.
 * See ~/.cloudflared/config.yml for the tunnel's ingress rule.
 */
const TUNNEL_HOST = "website-dev.agricycleenergy.app";

const nextConfig: NextConfig = {
  // The dev server is reached over http://website.localhost:3000 locally, and
  // over the Cloudflare Tunnel hostname when sharing the dev site publicly.
  allowedDevOrigins: ["website.localhost", "localhost", "127.0.0.1", TUNNEL_HOST],
  images: {
    formats: ["image/avif", "image/webp"],
  },
  /**
   * The tunnel host is publicly reachable, so keep it out of search results.
   * Scoped to that host only, so the production domain is unaffected.
   *
   * Deliberately no robots.txt "Disallow" here: blocking the crawl would stop
   * crawlers from ever reading this header, which is the signal that actually
   * removes the host from an index.
   */
  async headers() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: TUNNEL_HOST }],
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive, nosnippet",
          },
        ],
      },
    ];
  },
  async redirects() {
    return legacyRedirects.map((r) => ({ ...r, permanent: true }));
  },
};

export default nextConfig;
