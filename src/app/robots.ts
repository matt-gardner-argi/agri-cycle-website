import type { MetadataRoute } from "next";
import { IS_PRODUCTION_HOST, SITE_URL } from "@/content/site";

/**
 * Crawl rules. Only the production domain invites crawlers; staging and preview
 * hosts serve a blanket disallow so they can never compete with the real site
 * in an index. See `IS_PRODUCTION_HOST` in `src/content/site.ts`.
 */
export default function robots(): MetadataRoute.Robots {
  if (!IS_PRODUCTION_HOST) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Next's build output and image optimiser have nothing to index.
        disallow: ["/_next/", "/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
