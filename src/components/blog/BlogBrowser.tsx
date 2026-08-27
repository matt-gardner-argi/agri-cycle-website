"use client";

import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { Search, SearchX } from "lucide-react";
import { categories, posts as allPosts, type Post } from "@/content/posts";
import { PostCard } from "./PostCard";
import { useServerRendered } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const PAGE = 9;

export function BlogBrowser({
  initialCategory = "all",
  headingLevel,
}: {
  initialCategory?: string;
  headingLevel?: 2 | 3;
}) {
  // Post cards are the page's content, so the server renders them rather than
  // an empty grid that fills in after hydration.
  const fromServer = useServerRendered();
  const [cat, setCat] = useState(initialCategory);
  const [query, setQuery] = useState("");
  const [shown, setShown] = useState(PAGE);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allPosts.filter((p) => {
      const inCat = cat === "all" || p.categories.some((c) => c.slug === cat);
      if (!inCat) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.categories.some((c) => c.name.toLowerCase().includes(q))
      );
    });
  }, [cat, query]);

  const visible: Post[] = filtered.slice(0, shown);

  function pick(next: string) {
    setCat(next);
    setShown(PAGE);
  }

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          <FilterChip active={cat === "all"} onClick={() => pick("all")} count={allPosts.length}>
            All posts
          </FilterChip>
          {categories.map((c) => (
            <FilterChip
              key={c.slug}
              active={cat === c.slug}
              onClick={() => pick(c.slug)}
              count={c.count}
            >
              {c.name}
            </FilterChip>
          ))}
        </div>

        <div className="relative w-full max-w-xs shrink-0">
          <Search
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-ink/35"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShown(PAGE);
            }}
            placeholder="Search articles"
            aria-label="Search articles"
            className="h-11 w-full rounded-full border border-ink/12 bg-white pr-4 pl-11 text-sm text-ink placeholder:text-ink/40 focus:border-leaf focus:outline-none"
          />
        </div>
      </div>

      <p className="mt-6 text-[0.8125rem] text-ink/45">
        Showing {visible.length} of {filtered.length} article{filtered.length === 1 ? "" : "s"}
        {cat !== "all" && ` in ${categories.find((c) => c.slug === cat)?.name}`}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="mt-14 flex flex-col items-center gap-4 rounded-3xl border border-dashed border-ink/15 py-20 text-center">
          <SearchX aria-hidden className="size-8 text-ink/25" />
          <p className="font-display text-lg font-semibold">No articles match that search</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              pick("all");
            }}
            className="cursor-pointer text-[0.875rem] font-semibold text-leaf-deep underline decoration-1 underline-offset-4 hover:text-sun focus-ring"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <motion.div layout className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((post, i) => (
              <motion.div
                key={post.slug}
                layout
                initial={fromServer ? false : { opacity: 0, y: 22, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{
                  duration: 0.45,
                  delay: Math.min(i, 8) * 0.04,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <PostCard post={post} priority={i < 3} headingLevel={headingLevel} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {shown < filtered.length && (
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={() => setShown((s) => s + PAGE)}
            className="cursor-pointer rounded-full border border-ink/15 px-7 py-3.5 text-[0.875rem] font-semibold text-ink transition-all duration-300 hover:border-leaf hover:bg-leaf/12 focus-ring"
          >
            Load {Math.min(PAGE, filtered.length - shown)} more
          </button>
        </div>
      )}
    </div>
  );
}

function FilterChip({
  children,
  active,
  onClick,
  count,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  count: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "relative cursor-pointer rounded-full border px-4 py-2.5 text-[0.8125rem] font-semibold transition-colors duration-300 focus-ring",
        active
          ? "border-ink bg-ink text-white"
          : "border-ink/12 bg-white/70 text-ink/65 hover:border-ink/35 hover:text-ink"
      )}
    >
      {children}
      <span className={cn("ml-2 text-[0.72rem]", active ? "text-white/50" : "text-ink/35")}>
        {count}
      </span>
    </button>
  );
}
