import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Hero } from "@/components/sections/Hero";
import { NewsBanner } from "@/components/sections/NewsBanner";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { ServiceCards } from "@/components/sections/ServiceCards";
import { CycleDiagram } from "@/components/sections/CycleDiagram";
import { StateTileMap } from "@/components/sections/StateTileMap";
import { ImpactCalculator } from "@/components/sections/ImpactCalculator";
import { Testimonials } from "@/components/sections/Testimonials";
import { PartnerMarquee } from "@/components/sections/PartnerMarquee";
import { CTASection } from "@/components/sections/CTASection";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { PostCard } from "@/components/blog/PostCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { wasteFacts } from "@/content/site";
import { posts } from "@/content/posts";

// Declared explicitly rather than left to inherit the layout's fallback, so
// that fallback stays free to change without silently moving the home canonical.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const latest = posts.slice(0, 3);

  return (
    <>
      <Hero />
      <NewsBanner />
      <StatsStrip />

      {/* Services */}
      <section className="bg-paper py-20 lg:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="Our services"
            title={
              <>
                We have a solution for{" "}
                <span className="font-serif italic">everyone&apos;s</span> needs
              </>
            }
            intro="Whether you're a school, hospital, grocer, restaurant, brewery, or dairy — we have a food-waste management service to meet your needs."
            align="center"
            className="mx-auto max-w-3xl"
          />
          <div className="mt-14">
            <ServiceCards />
          </div>
          <Reveal delay={0.1}>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-3.5">
              <Button href="/services" size="lg" withArrow>
                See all collection services
              </Button>
              <Button href="/faq" size="lg" variant="outline">
                Read the FAQ
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <CycleDiagram />

      {/* Why divert — facts */}
      <section className="relative isolate overflow-hidden bg-cream/50 py-20 lg:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -left-28 -z-10 size-[26rem] rounded-full bg-sun/12 blur-[110px]"
        />
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Why divert"
                title={
                  <>
                    Why keep your wasted food{" "}
                    <span className="font-serif italic">out of the trash?</span>
                  </>
                }
                intro="Because it's the right thing to do for our environment. And it can even lead to savings on your monthly trash bill."
              />
              <Reveal delay={0.16}>
                <p className="mt-6 max-w-xl text-[0.9375rem] leading-relaxed text-ink/65">
                  Unlike any other waste-management solution, anaerobic digestion captures and converts
                  greenhouse gases into clean fuel and fertilizer. Think about that next time
                  you&apos;re holding an apple core or spent coffee grounds and want to find a better
                  way to manage them.
                </p>
              </Reveal>
              <Reveal delay={0.22}>
                <div className="mt-8">
                  <Button href="/about/why-agri-cycle" size="md" withArrow>
                    Reasons to work with Agri-Cycle
                  </Button>
                </div>
              </Reveal>
            </div>

            <RevealGroup className="grid gap-4 sm:grid-cols-2" stagger={0.09}>
              {wasteFacts.map((f) => (
                <RevealItem key={f.stat}>
                  <div className="group h-full rounded-2xl border border-ink/10 bg-white/80 p-6 backdrop-blur-sm transition-all duration-400 hover:-translate-y-1 hover:border-sun/50 hover:shadow-[0_26px_50px_-40px_rgba(7,23,17,0.5)]">
                    <p className="font-display text-[clamp(2.2rem,1.6rem+2vw,3rem)] leading-none font-bold tracking-[-0.04em] text-sun transition-colors group-hover:text-leaf-deep">
                      {f.stat}
                    </p>
                    <p className="mt-2 font-display text-[0.875rem] font-semibold tracking-tight text-ink/85">
                      {f.label}
                    </p>
                    <p className="mt-3 text-[0.8125rem] leading-relaxed text-ink/60">{f.body}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      <StateTileMap />
      <ImpactCalculator />

      {/* FAQ teaser over photo */}
      <section className="relative isolate flex min-h-[26rem] items-center overflow-hidden">
        <Image
          src="/img/hero/foodwaste.webp"
          alt=""
          fill
          sizes="100vw"
          className="-z-20 object-cover"
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-ink/72" />
        <div className="container-page py-20 text-center">
          <Reveal>
            <p className="mx-auto max-w-3xl font-serif text-[clamp(1.5rem,1.1rem+2vw,2.75rem)] leading-[1.25] text-white italic">
              &ldquo;What happens when the food scraps get to the processing facility?&rdquo;
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-[1.0625rem] text-white/65">
              Get answers to this and other frequently asked questions.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-8 flex justify-center">
              <Button href="/faq" size="lg" variant="light" withArrow>
                Read the FAQ
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <Testimonials />
      <PartnerMarquee />

      {/* Heritage / before-after */}
      <section className="bg-cream/55 py-20 lg:py-28">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Our history"
                title={
                  <>
                    The equipment has changed since the 1800s.{" "}
                    <span className="font-serif italic">The commitment hasn&apos;t.</span>
                  </>
                }
                intro="The fifth generation is as committed to making the best use of the farm as the first. Now, in addition to the dairy, we're creating renewable power and setting a national standard for others to follow."
              />
              <Reveal delay={0.2}>
                <div className="mt-8">
                  <Button href="/about/history" size="md" variant="outline" withArrow>
                    Read our history
                  </Button>
                </div>
              </Reveal>
            </div>
            <Reveal direction="left">
              <BeforeAfter />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Latest posts */}
      <section className="bg-paper py-20 lg:py-28">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="From the blog"
              title="Food waste, explained"
              intro="Practical guidance, policy updates and research on the true costs of wasted food."
            />
            <Reveal delay={0.14}>
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

          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
            {latest.map((post) => (
              <RevealItem key={post.slug}>
                <PostCard post={post} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CTASection />
    </>
  );
}
