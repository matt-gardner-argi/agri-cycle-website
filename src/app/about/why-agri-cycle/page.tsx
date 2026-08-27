import type { Metadata } from "next";
import Image from "next/image";
import { DollarSign, ShieldCheck, Zap } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Testimonials } from "@/components/sections/Testimonials";
import { ImpactCalculator } from "@/components/sections/ImpactCalculator";
import { CTASection } from "@/components/sections/CTASection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { wasteFacts, whyReasons } from "@/content/site";

export const metadata: Metadata = {
  title: "Why Agri-Cycle",
  description:
    "Reasons to keep wasted food out of the trash: renewable energy, soil amendment, animal feed, longer landfill lifespans and lower disposal costs.",
  alternates: { canonical: "/about/why-agri-cycle" },
};

const icons = { zap: Zap, shield: ShieldCheck, dollar: DollarSign } as const;

export default function WhyPage() {
  return (
    <>
      <PageHero
        eyebrow="Why Agri-Cycle"
        title="Why keep your wasted food out of the trash?"
        highlight={["trash?"]}
        image="/img/site/fossilfuel.jpg"
        crumbs={[{ label: "About us", href: "/about" }, { label: "Why Agri-Cycle" }]}
        intro="Because it's the right thing to do for our environment. And it can even lead to savings on your monthly trash bill."
      >
        <Button href="/quote" size="lg" withArrow>
          Request a Quote
        </Button>
        <Button href="/contact" size="lg" variant="light">
          Contact us
        </Button>
      </PageHero>

      {/* Facts */}
      <section className="relative isolate overflow-hidden bg-ink py-20 text-white lg:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 -left-32 -z-10 size-[32rem] rounded-full bg-sun/12 blur-[130px]"
        />
        <div className="container-page">
          <SectionHeading
            eyebrow="The scale of the problem"
            tone="light"
            title={
              <>
                If global food waste were a country, it would be the{" "}
                <span className="font-serif italic">third-largest emitter</span> of greenhouse gases
              </>
            }
            intro="Behind only the US and China. Nearly 40 percent of food produced in the U.S. is wasted each year — and the majority ends up in landfills, where it converts to methane, a potent greenhouse gas and major contributor to climate change."
            className="max-w-3xl"
          />

          <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.09}>
            {wasteFacts.map((f) => (
              <RevealItem key={f.stat}>
                <div className="group h-full rounded-2xl border border-white/12 bg-white/5 p-6 transition-all duration-400 hover:-translate-y-1.5 hover:border-sun/45 hover:bg-white/8">
                  <p className="font-display text-[clamp(2.4rem,1.8rem+2vw,3.2rem)] leading-none font-bold tracking-[-0.04em] text-sun-light">
                    {f.stat}
                  </p>
                  <p className="mt-2.5 font-display text-[0.875rem] font-semibold tracking-tight text-white/90">
                    {f.label}
                  </p>
                  <p className="mt-3 text-[0.8125rem] leading-relaxed text-white/55">{f.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.2}>
            <p className="mt-14 max-w-3xl border-l-2 border-leaf pl-6 font-serif text-[clamp(1.2rem,1rem+1vw,1.7rem)] leading-[1.4] text-white/85 italic">
              Unlike any other waste-management solution, anaerobic digestion captures and converts
              these gases into clean fuel and fertilizer. Think about that next time you are holding an
              apple core or spent coffee grounds and want to find a better way to manage them.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Three reasons */}
      <section className="bg-paper py-20 lg:py-28">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-center lg:gap-16">
            <Reveal direction="right">
              <div className="relative aspect-4/5 overflow-hidden rounded-[1.75rem] border border-ink/8 shadow-[0_36px_75px_-50px_rgba(7,23,17,0.55)]">
                <Image
                  src="/img/site/cows-narrow.jpg"
                  alt="The dairy herd whose manure co-digests with collected food waste"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <div>
              <SectionHeading
                eyebrow="Reasons to work with us"
                title="Anaerobic digestion is widely praised — and we make joining easy"
                intro="Here are a few great reasons to join us."
              />
              <RevealGroup className="mt-9 flex flex-col gap-4" stagger={0.1}>
                {whyReasons.map((r, i) => {
                  const Icon = icons[r.icon as keyof typeof icons];
                  return (
                    <RevealItem key={r.title}>
                      <div className="group flex items-start gap-5 rounded-2xl border border-ink/10 bg-cream/40 p-6 transition-all duration-400 hover:border-leaf/50 hover:bg-white">
                        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-leaf/20 text-leaf-deep transition-colors duration-400 group-hover:bg-leaf group-hover:text-ink">
                          <Icon aria-hidden className="size-5" />
                        </span>
                        <div>
                          <p className="font-display text-[1.0625rem] leading-snug font-bold tracking-tight">
                            <span className="mr-2 font-sans text-[0.75rem] font-bold text-leaf-deep">
                              0{i + 1}
                            </span>
                            {r.title}
                          </p>
                          <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink/65">{r.body}</p>
                        </div>
                      </div>
                    </RevealItem>
                  );
                })}
              </RevealGroup>

              <Reveal delay={0.3}>
                <p className="mt-8 text-[0.9375rem] leading-relaxed text-ink/65">
                  Interested in learning more about the benefits of working with Agri-Cycle? We run
                  scheduled route collections in 14 states and build customized programs nationally —
                  we&apos;d welcome the opportunity to talk with you more about our service.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <ImpactCalculator />
      <Testimonials />
      <CTASection image="/img/site/energy20.jpg" />
    </>
  );
}
