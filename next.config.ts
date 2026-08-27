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

  /**
   * The dev-mode indicator is a fixed-position button. On a phone it lands on
   * top of the navigation drawer and swallows taps meant for the links beneath
   * it, which made a reviewer think a nav link was broken. Nothing on the page
   * should intercept a tap, so it is off.
   */
  devIndicators: false,

  images: {
    formats: ["image/avif", "image/webp"],
    /**
     * The optimizer's cache key is the source URL plus width and quality, and
     * our sources are static files that change only on deploy. The 4-hour
     * default meant a returning visitor on a phone re-fetched every photograph
     * on the page; 30 days is the useful lifetime without pinning a replaced
     * image forever.
     */
    minimumCacheTTL: 2_592_000,
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
      {
        /**
         * Files under `public/` are served with `max-age=0` by default, so the
         * ~120 photographs in the media library were revalidated on every visit.
         * Not `immutable`: these paths are stable names, not content hashes, so
         * a replaced image has to be able to propagate — `stale-while-revalidate`
         * lets it, without making anyone wait for it.
         */
        source: "/img/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, stale-while-revalidate=86400",
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
