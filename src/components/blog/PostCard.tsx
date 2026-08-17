import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { formatDate, type Post } from "@/content/posts";
import { cn } from "@/lib/utils";

export function PostCard({
  post,
  featured = false,
  priority = false,
}: {
  post: Post;
  featured?: boolean;
  priority?: boolean;
}) {
  return (
    <article className="h-full">
      <Link
        href={`/blog/${post.slug}`}
        className={cn(
          "group flex h-full flex-col overflow-hidden rounded-3xl border border-ink/10 bg-white transition-all duration-500 focus-ring",
          "hover:-translate-y-1.5 hover:border-leaf/50 hover:shadow-[0_36px_70px_-45px_rgba(7,23,17,0.5)]",
          featured && "md:grid md:grid-cols-2 md:items-stretch"
        )}
      >
        <div
          className={cn(
            "relative overflow-hidden bg-cream",
            featured ? "aspect-16/10 md:aspect-auto md:min-h-[22rem]" : "aspect-16/10"
          )}
        >
          <Image
            src={post.image}
            alt=""
            fill
            priority={priority}
            sizes={featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
            className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-106"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-linear-0 from-ink/45 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-25"
          />
          <div className="absolute inset-x-4 top-4 flex flex-wrap gap-1.5">
            {post.categories.slice(0, 2).map((c) => (
              <span
                key={c.slug}
                className="rounded-full bg-ink/65 px-2.5 py-1 text-[0.65rem] font-semibold tracking-wide text-white backdrop-blur-sm"
              >
                {c.name}
              </span>
            ))}
          </div>
        </div>

        <div className={cn("flex flex-1 flex-col p-6", featured && "md:justify-center md:p-9")}>
          <div className="flex items-center gap-3 text-[0.72rem] text-ink/45">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden className="size-1 rounded-full bg-ink/20" />
            <span className="inline-flex items-center gap-1">
              <Clock aria-hidden className="size-3" />
              {post.readingTime} min read
            </span>
          </div>

          <h3
            className={cn(
              "mt-3 leading-snug transition-colors duration-300 group-hover:text-leaf-deep",
              featured
                ? "text-[clamp(1.35rem,1.1rem+1.1vw,2rem)]"
                : "font-display text-[1.0625rem] font-semibold tracking-tight"
            )}
          >
            {post.title}
          </h3>

          <p
            className={cn(
              "mt-3 text-[0.875rem] leading-relaxed text-ink/60",
              featured ? "line-clamp-4 md:text-[0.9375rem]" : "line-clamp-3"
            )}
          >
            {post.excerpt}
          </p>

          <span className="mt-auto inline-flex items-center gap-2 pt-6 text-[0.8125rem] font-semibold text-ink/70 transition-colors group-hover:text-leaf-deep">
            Read the article
            <span className="grid size-6 place-items-center rounded-full bg-leaf/20 text-leaf-deep transition-all duration-300 group-hover:bg-leaf group-hover:text-ink">
              <ArrowUpRight aria-hidden className="size-3" />
            </span>
          </span>
        </div>
      </Link>
    </article>
  );
}
