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

/**
 * WordPress gives us naive datetimes — `2023-08-04T20:30:00`, no `Z` and no
 * offset — and JavaScript parses those as *local* time. The resulting instant
 * therefore depends on the machine doing the parsing, so a post published after
 * about 19:00 UTC landed on one day when Node rendered it on a UTC server and
 * on the next day when the browser re-rendered it in the Americas. That is both
 * a wrong date for most readers and a hydration mismatch (React error #418).
 *
 * Pinning the input to UTC is what makes the two agree; `timeZone: "UTC"` on the
 * formatter only controls the output and cannot fix an instant that was already
 * parsed differently on each side.
 */
export function parsePostDate(iso: string) {
  const hasZone = /(?:Z|[+-]\d{2}:?\d{2})$/.test(iso);
  return new Date(hasZone ? iso : `${iso}Z`);
}

export function formatDate(iso: string) {
  return parsePostDate(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
