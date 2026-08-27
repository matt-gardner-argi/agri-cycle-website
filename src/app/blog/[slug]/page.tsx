import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { formatDate, getPost, posts, relatedPosts } from "@/content/posts";
import { PostCard } from "@/components/blog/PostCard";
import { CTASection } from "@/components/sections/CTASection";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { site } from "@/content/site";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Article not found" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      images: [{ url: post.image }],
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = relatedPosts(slug, 3);

  return (
    <>
      <ReadingProgress />

      {/* Header */}
      <article>
        <header className="relative isolate flex min-h-[26rem] items-end overflow-hidden bg-ink pt-24 pb-14 lg:min-h-[34rem]">
          <Image
            src={post.image}
            alt=""
            fill
            loading="eager"
            fetchPriority="high"
            sizes="100vw"
            className="-z-30 scale-105 object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-20 bg-linear-0 from-ink via-ink/85 to-ink/40"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 right-0 -z-10 size-[26rem] rounded-full bg-leaf/15 blur-[110px]"
          />

          <div className="container-page relative">
            <Reveal duration={0.5}>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-[0.8125rem] font-medium text-white/55 transition-colors hover:text-leaf-bright focus-ring"
              >
                <ArrowLeft aria-hidden className="size-3.5" />
                All articles
              </Link>
            </Reveal>

            <div className="mt-7 max-w-4xl">
              <Reveal duration={0.55}>
                <div className="flex flex-wrap items-center gap-2">
                  {post.categories.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/blog?category=${c.slug}`}
                      className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[0.7rem] font-semibold text-white/80 backdrop-blur-sm transition-colors hover:border-leaf hover:bg-leaf/25 focus-ring"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <h1 className="mt-6 font-display text-[clamp(1.9rem,1.2rem+3.4vw,3.8rem)] leading-[1.03] font-bold tracking-[-0.045em] text-white">
                  {post.title}
                </h1>
              </Reveal>

              <Reveal delay={0.16}>
                <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.8125rem] text-white/50">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span aria-hidden className="size-1 rounded-full bg-white/25" />
                  <span className="inline-flex items-center gap-1.5">
                    <Clock aria-hidden className="size-3.5" />
                    {post.readingTime} min read
                  </span>
                  <span aria-hidden className="size-1 rounded-full bg-white/25" />
                  <span>{site.name}</span>
                </div>
              </Reveal>
            </div>
          </div>
        </header>

        {/* Body */}
        <section className="bg-paper py-16 lg:py-24">
          <div className="container-page">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-16">
              <div className="mx-auto w-full max-w-[46rem] lg:mx-0">
                <Reveal>
                  <p className="border-l-2 border-leaf pl-6 font-serif text-[clamp(1.15rem,1rem+0.8vw,1.5rem)] leading-[1.45] text-ink/85 italic">
                    {post.excerpt}
                  </p>
                </Reveal>

                <div
                  className="prose-ac mt-10"
                  dangerouslySetInnerHTML={{ __html: post.html }}
                />

                <div className="mt-14 flex flex-wrap items-center justify-between gap-6 border-t border-ink/10 pt-8">
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-[0.875rem] font-semibold text-ink/70 transition-colors hover:text-leaf-deep focus-ring"
                  >
                    <ArrowLeft aria-hidden className="size-4" />
                    Back to all articles
                  </Link>
                  <Link
                    href="/quote"
                    className="rounded-full bg-leaf px-6 py-3 text-[0.875rem] font-semibold text-ink transition-transform duration-300 hover:scale-[1.03] focus-ring"
                  >
                    Request a Quote
                  </Link>
                </div>
              </div>

              {/* Sidebar */}
              <aside className="lg:sticky lg:top-28 lg:self-start">
                <Reveal direction="left">
                  <div className="rounded-2xl border border-ink/10 bg-cream/45 p-6">
                    <p className="text-[0.7rem] font-semibold tracking-[0.2em] text-ink/40 uppercase">
                      Filed under
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {post.categories.map((c) => (
                        <li key={c.slug}>
                          <Link
                            href={`/blog?category=${c.slug}`}
                            className="inline-block rounded-full border border-ink/12 bg-white px-3 py-1.5 text-[0.75rem] font-medium text-ink/70 transition-colors hover:border-leaf hover:text-leaf-deep focus-ring"
                          >
                            {c.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>

                <Reveal direction="left" delay={0.1}>
                  <div className="mt-5 rounded-2xl border border-ink/10 bg-ink p-6 text-white">
                    <p className="text-[0.7rem] font-semibold tracking-[0.2em] text-leaf-bright uppercase">
                      Talk to us
                    </p>
                    <p className="mt-3 text-[0.875rem] leading-relaxed text-white/65">
                      See how Agri-Cycle can turn your food waste into renewable energy and compost.
                    </p>
                    <a
                      href={site.phoneHref}
                      className="mt-4 inline-block font-display text-lg font-bold tracking-tight transition-colors hover:text-leaf-bright focus-ring"
                    >
                      {site.phone}
                    </a>
                  </div>
                </Reveal>
              </aside>
            </div>
          </div>
        </section>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-ink/8 bg-cream/45 py-20 lg:py-24">
          <div className="container-page">
            <Reveal>
              <Eyebrow>Keep reading</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-5 text-[clamp(1.6rem,1.2rem+1.6vw,2.4rem)]">Related articles</h2>
            </Reveal>
            <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
              {related.map((p) => (
                <RevealItem key={p.slug}>
                  <PostCard post={p} />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}

      <CTASection image="/img/site/energy20.jpg" />
    </>
  );
}
