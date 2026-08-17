import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Quote } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { PostCard } from "@/components/blog/PostCard";
import { CTASection } from "@/components/sections/CTASection";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { pressRelease } from "@/content/site";
import { postsInCategory } from "@/content/posts";

export const metadata: Metadata = {
  title: "News",
  description: pressRelease.standfirst,
};

export default function NewsPage() {
  const pressPosts = [
    ...postsInCategory("press"),
    ...postsInCategory("company-news"),
    ...postsInCategory("news"),
  ]
    .filter((p, i, arr) => arr.findIndex((x) => x.slug === p.slug) === i)
    .slice(0, 6);

  return (
    <>
      <PageHero
        eyebrow={`${pressRelease.eyebrow} · ${pressRelease.dateLabel}`}
        title={pressRelease.title}
        image="/img/site/truck-69.jpg"
        crumbs={[{ label: "News" }]}
        intro={pressRelease.standfirst}
        size="lg"
      >
        <Button href="/quote" size="lg" withArrow>
          Request a Quote
        </Button>
        <Button href="/contact" size="lg" variant="light">
          Contact us
        </Button>
      </PageHero>

      {/* Press release body */}
      <section className="bg-paper py-16 lg:py-24">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-16">
            <div className="mx-auto w-full max-w-[46rem] lg:mx-0">
              <Reveal>
                <p className="text-[0.8125rem] font-semibold tracking-[0.14em] text-ink/45 uppercase">
                  {pressRelease.dateLabel} · {pressRelease.location}
                </p>
              </Reveal>

              <div className="prose-ac mt-8">
                {pressRelease.body.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </div>

              {/* Quotes */}
              <RevealGroup className="mt-14 flex flex-col gap-5" stagger={0.09}>
                {pressRelease.quotes.map((q) => (
                  <RevealItem key={q.name}>
                    <figure className="m-0 rounded-3xl border border-ink/10 bg-cream/45 p-7">
                      <Quote aria-hidden className="size-6 text-leaf" />
                      <blockquote className="mt-4 font-serif text-[1.0625rem] leading-[1.55] text-ink italic sm:text-[1.15rem]">
                        &ldquo;{q.quote}&rdquo;
                      </blockquote>
                      <figcaption className="mt-5 border-t border-ink/10 pt-4">
                        <p className="font-display text-[0.9375rem] font-bold tracking-tight">
                          {q.name}
                        </p>
                        <p className="mt-0.5 text-[0.8125rem] text-ink/55">{q.title}</p>
                      </figcaption>
                    </figure>
                  </RevealItem>
                ))}
              </RevealGroup>

              {/* Abouts */}
              <div className="mt-14 flex flex-col gap-10">
                {pressRelease.about.map((a) => (
                  <Reveal key={a.heading}>
                    <div>
                      <h2 className="text-[clamp(1.3rem,1.1rem+0.9vw,1.75rem)]">{a.heading}</h2>
                      <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink/65">{a.body}</p>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal>
                <details className="group mt-12 rounded-2xl border border-ink/10 bg-cream/35 p-6">
                  <summary className="cursor-pointer list-none text-[0.8125rem] font-semibold tracking-tight text-ink/60 transition-colors hover:text-ink">
                    <span className="inline-flex items-center gap-2">
                      <span className="grid size-5 place-items-center rounded-full bg-ink/10 text-[0.7rem] transition-transform group-open:rotate-45">
                        +
                      </span>
                      Disclosure
                    </span>
                  </summary>
                  <p className="mt-4 text-[0.75rem] leading-relaxed text-ink/50">
                    {pressRelease.disclosure}
                  </p>
                </details>
              </Reveal>
            </div>

            {/* Sidebar */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <Reveal direction="left">
                <div className="rounded-2xl border border-ink/10 bg-white p-6">
                  <p className="text-[0.7rem] font-semibold tracking-[0.2em] text-ink/40 uppercase">
                    In partnership with
                  </p>
                  <div className="relative mt-5 h-14">
                    <Image
                      src="/img/partners/closed-loop.png"
                      alt="Closed Loop Partners"
                      fill
                      sizes="16rem"
                      className="object-contain object-left"
                    />
                  </div>
                  <a
                    href="https://www.closedlooppartners.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold text-leaf-deep underline decoration-1 underline-offset-4 transition-colors hover:text-sun focus-ring"
                  >
                    Closed Loop Partners
                    <ArrowUpRight aria-hidden className="size-3.5" />
                  </a>
                </div>
              </Reveal>

              <Reveal direction="left" delay={0.1}>
                <div className="mt-5 rounded-2xl border border-ink/10 bg-ink p-6 text-white">
                  <p className="text-[0.7rem] font-semibold tracking-[0.2em] text-leaf-bright uppercase">
                    Press enquiries
                  </p>
                  <p className="mt-3 text-[0.875rem] leading-relaxed text-white/65">
                    For media requests and interviews, reach us through the contact page.
                  </p>
                  <Link
                    href="/contact"
                    className="mt-4 inline-block text-[0.875rem] font-semibold text-leaf-bright underline decoration-1 underline-offset-4 hover:text-white focus-ring"
                  >
                    Contact Agri-Cycle
                  </Link>
                </div>
              </Reveal>
            </aside>
          </div>
        </div>
      </section>

      {/* Other news */}
      <section className="border-t border-ink/8 bg-cream/45 py-20 lg:py-24">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Reveal>
                <Eyebrow>Other news</Eyebrow>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="mt-5 text-[clamp(1.6rem,1.2rem+1.6vw,2.4rem)]">
                  Press and company updates
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.12}>
              <Link
                href="/blog"
                className="group inline-flex items-center gap-2.5 text-[0.875rem] font-semibold text-ink transition-colors hover:text-leaf-deep focus-ring"
              >
                All articles
                <span className="grid size-8 place-items-center rounded-full bg-leaf/20 text-leaf-deep transition-all duration-300 group-hover:bg-leaf group-hover:text-ink">
                  <ArrowUpRight aria-hidden className="size-4" />
                </span>
              </Link>
            </Reveal>
          </div>

          <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.09}>
            {pressPosts.map((p) => (
              <RevealItem key={p.slug}>
                <PostCard post={p} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CTASection image="/img/hero/eae-aerial.jpg" />
    </>
  );
}
