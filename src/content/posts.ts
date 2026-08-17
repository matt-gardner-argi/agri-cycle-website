import raw from "./posts.json";
import cats from "./categories.json";

export type PostCategory = { slug: string; name: string };

export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  categories: PostCategory[];
  image: string;
  html: string;
  readingTime: number;
};

export const posts = raw as Post[];

export const categories = (cats as { slug: string; name: string; count: number }[]).sort(
  (a, b) => b.count - a.count
);

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function postsInCategory(slug: string) {
  if (!slug || slug === "all") return posts;
  return posts.filter((p) => p.categories.some((c) => c.slug === slug));
}

/** Posts closest in subject matter to the given one, by shared category. */
export function relatedPosts(slug: string, limit = 3) {
  const post = getPost(slug);
  if (!post) return posts.slice(0, limit);
  const keys = new Set(post.categories.map((c) => c.slug));
  const scored = posts
    .filter((p) => p.slug !== slug)
    .map((p) => ({ p, score: p.categories.filter((c) => keys.has(c.slug)).length }))
    .sort((a, b) => b.score - a.score || (a.p.date < b.p.date ? 1 : -1));
  return scored.slice(0, limit).map((s) => s.p);
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
