import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";
import { categories, posts } from "@/content/posts";

/**
 * Every indexable route: the 24 static pages, the 49 blog posts, and the
 * category-filtered blog views. Legacy WordPress paths are deliberately absent —
 * they 301 to their new homes (see `legacyRedirects` in next.config.ts) and a
 * sitemap should only list canonical destinations.
 */

type Entry = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
};

const pages: Entry[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services/collection", priority: 0.8, changeFrequency: "monthly" },
  { path: "/service-area", priority: 0.8, changeFrequency: "monthly" },
  { path: "/calculator", priority: 0.8, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
  { path: "/quote", priority: 0.9, changeFrequency: "yearly" },
  { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/about/why-agri-cycle", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about/anaerobic-digestion", priority: 0.7, changeFrequency: "yearly" },
  { path: "/about/depackaging", priority: 0.7, changeFrequency: "yearly" },
  { path: "/about/processing-partners", priority: 0.6, changeFrequency: "monthly" },
  { path: "/about/history", priority: 0.6, changeFrequency: "yearly" },
  { path: "/about/team", priority: 0.6, changeFrequency: "monthly" },
  { path: "/careers", priority: 0.7, changeFrequency: "weekly" },
  { path: "/news", priority: 0.7, changeFrequency: "weekly" },
  { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
  { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms-of-use", priority: 0.3, changeFrequency: "yearly" },
  { path: "/sms-policy", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const newestPost = posts.reduce(
    (latest, p) => (p.date > latest ? p.date : latest),
    posts[0]?.date ?? new Date().toISOString()
  );

  const staticEntries = pages.map((p) => ({
    url: `${SITE_URL}${p.path}`,
    // Content-driven pages move when the blog moves; the rest are edited by hand.
    lastModified: p.path === "/" || p.path === "/blog" ? new Date(newestPost) : undefined,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));

  const postEntries = posts.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  const categoryEntries = categories.map((c) => ({
    url: `${SITE_URL}/blog?category=${c.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.4,
  }));

  return [...staticEntries, ...postEntries, ...categoryEntries];
}
