import type { Metadata } from "next";
import Image from "next/image";
import { MapPin, Zap } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Counter } from "@/components/ui/Counter";
import { processingPartners } from "@/content/site";

export const metadata: Metadata = {
  title: "Processing Partners",
  description:
    "Agri-Cycle works with a growing network of processing partners who turn your waste into energy — starting with sister company Exeter Agri-Energy.",
  alternates: { canonical: "/about/processing-partners" },
};

const featured = processingPartners[0];
const others = processingPartners.slice(1);

const eaeStats = [
  { value: 3, suffix: "", label: "digestion vessels" },
  { value: 3.2, suffix: "M", label: "gallons of capacity", digits: 1 },
  { value: 70000, suffix: "", label: "kWh daily" },
  { value: 2500, suffix: "", label: "households powered" },
];

export default function ProcessingPartnersPage() {
  return (
    <>
      <PageHero
        eyebrow="Processing partners"
        title="A growing network that turns your waste into energy"
        highlight={["energy"]}
        image="/img/hero/eae-aerial.jpg"
        crumbs={[{ label: "About us", href: "/about" }, { label: "Processing partners" }]}
        intro="Agri-Cycle is a hauling company that partners with a robust network of anaerobic digesters, composters and animal feed outlets across the country — so your waste never travels further than necessary."
      />

      {/* Featured: Exeter Agri-Energy */}
      <section className="bg-paper py-20 lg:py-28">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
            <div>
              <SectionHeading eyebrow="Sister company" title={featured.name} />
              <Reveal delay={0.12}>
                <p className="mt-3 inline-flex items-center gap-2 text-[0.875rem] font-medium text-leaf-deep">
                  <MapPin aria-hidden className="size-4" />
                  {featured.location}
                </p>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mt-6 text-[1rem] leading-relaxed text-ink/70">{featured.body}</p>
              </Reveal>
              <Reveal delay={0.22}>
                <p className="mt-4 text-[1rem] leading-relaxed text-ink/70">
                  The facility operates a 3-MW anaerobic co-digestion system. The amount of heat produced
                  on a daily basis is enough to replace 2,100 gallons of heating oil, which on an annual
                  basis is sufficient to heat 900 homes.
                </p>
              </Reveal>

              <RevealGroup className="mt-9 grid grid-cols-2 gap-4 sm:grid-cols-4" stagger={0.08}>
                {eaeStats.map((s) => (
                  <RevealItem key={s.label}>
                    <div className="rounded-2xl border border-ink/10 bg-cream/45 p-5">
                      <p className="font-display text-[1.6rem] leading-none font-bold tracking-[-0.04em] text-leaf-deep">
                        <Counter value={s.value} digits={s.digits ?? 0} suffix={s.suffix} />
                      </p>
                      <p className="mt-2 text-[0.75rem] leading-snug text-ink/60">{s.label}</p>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>

            <Reveal direction="left">
              <div className="relative aspect-4/3 overflow-hidden rounded-[1.75rem] border border-ink/8 shadow-[0_40px_80px_-52px_rgba(7,23,17,0.6)]">
                <Image
                  src={featured.image!}
                  alt="Aerial view of the Exeter Agri-Energy facility"
                  fill
                  loading="eager"
                  fetchPriority="high"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-linear-0 from-ink/50 to-transparent"
                />
                <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/15 bg-ink/55 p-5 backdrop-blur-md">
                  <p className="inline-flex items-center gap-2 text-[0.7rem] font-semibold tracking-[0.16em] text-leaf-bright uppercase">
                    <Zap aria-hidden className="size-3.5" />
                    Co-digestion with 2,000 dairy cows
                  </p>
                  <p className="mt-2 text-[0.8125rem] leading-relaxed text-white/70">
                    Manure from Stonyvale Farm is combined with collected food waste for efficient
                    conversion into biofuel and fertilizer.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Additional partners */}
      <section className="bg-cream/50 py-20 lg:py-28">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-16">
            <div>
              <SectionHeading eyebrow="The network" title="Additional partners" />

              <RevealGroup className="mt-10 flex flex-col gap-4" stagger={0.09}>
                {others.map((p, i) => (
                  <RevealItem key={p.name}>
                    <article className="group rounded-3xl border border-ink/10 bg-white p-7 transition-all duration-400 hover:-translate-y-1 hover:border-sky/50 hover:shadow-[0_30px_60px_-45px_rgba(7,23,17,0.45)]">
                      <div className="flex flex-wrap items-baseline justify-between gap-3">
                        <h3 className="font-display text-[1.125rem] leading-snug font-bold tracking-tight transition-colors group-hover:text-sky">
                          <span className="mr-2.5 font-sans text-[0.75rem] font-bold text-ink/25">
                            0{i + 1}
                          </span>
                          {p.name}
                        </h3>
                        <p className="inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-ink/50">
                          <MapPin aria-hidden className="size-3.5" />
                          {p.location}
                        </p>
                      </div>
                      <p className="mt-3.5 text-[0.9375rem] leading-relaxed text-ink/65">{p.body}</p>
                    </article>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>

            <aside className="lg:pt-24">
              <Reveal direction="left">
                <div className="rounded-3xl border border-sun/30 bg-sun/8 p-7">
                  <h2 className="text-2xl">Calling all digesters</h2>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink/70">
                    If you&apos;re an anaerobic digestion facility and you&apos;re interested in
                    partnering with Agri-Cycle, we&apos;d love to hear from you.
                  </p>
                </div>
              </Reveal>
              <Reveal direction="left" delay={0.1}>
                <div className="mt-5">
                  <EnquiryForm kind="digester" />
                </div>
              </Reveal>
            </aside>
          </div>
        </div>
      </section>

      <CTASection
        title="Your waste never travels further than necessary"
        body="We partner with a close-knit network of digesters throughout the country to create a sustainable web of waste diversion."
        image="/img/site/digester.jpg"
      />
    </>
  );
}
