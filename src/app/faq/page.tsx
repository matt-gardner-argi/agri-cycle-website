import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Accordion } from "@/components/ui/Accordion";
import { CTASection } from "@/components/sections/CTASection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { faqs } from "@/content/site";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Costs, containers, odor, staff training, the depackager and what happens to your food scraps at the processing facility.",
};

const groups = ["Getting started", "What we accept", "Day to day", "Where it goes"] as const;

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Everything partners ask us before they start"
        highlight={["start"]}
        image="/img/hero/foodwaste.webp"
        crumbs={[{ label: "Services", href: "/services" }, { label: "FAQ" }]}
        intro="Costs, containers, odor, training and what actually happens to your scraps once our truck pulls away."
      >
        <Button href="/quote" size="lg" withArrow>
          Request a Quote
        </Button>
      </PageHero>

      <section className="bg-paper py-20 lg:py-28">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-16">
            {/* Jump list */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <p className="text-[0.7rem] font-semibold tracking-[0.2em] text-ink/40 uppercase">
                  Jump to
                </p>
                <ul className="mt-5 flex flex-wrap gap-2 lg:flex-col lg:gap-1">
                  {groups.map((g) => (
                    <li key={g}>
                      <a
                        href={`#${g.toLowerCase().replace(/\s+/g, "-")}`}
                        className="inline-block rounded-full px-3.5 py-2 text-[0.875rem] font-medium text-ink/65 transition-colors hover:bg-leaf/12 hover:text-leaf-deep focus-ring lg:px-3"
                      >
                        {g}
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 rounded-2xl border border-ink/10 bg-cream/45 p-5">
                  <p className="font-display text-[0.9375rem] font-bold tracking-tight">
                    Still stuck?
                  </p>
                  <p className="mt-2 text-[0.8125rem] leading-relaxed text-ink/60">
                    There are many variables to every circumstance, but it&apos;s fair to say
                    we&apos;ve seen it all.
                  </p>
                  <Link
                    href="/contact"
                    className="mt-4 inline-block text-[0.8125rem] font-semibold text-leaf-deep underline decoration-1 underline-offset-4 hover:text-sun focus-ring"
                  >
                    Ask us directly
                  </Link>
                </div>
              </Reveal>
            </aside>

            <div className="flex flex-col gap-14">
              {groups.map((group, gi) => {
                const items = faqs.filter((f) => f.group === group);
                if (!items.length) return null;
                return (
                  <div key={group} id={group.toLowerCase().replace(/\s+/g, "-")} className="scroll-mt-28">
                    <SectionHeading
                      eyebrow={`0${gi + 1}`}
                      title={group}
                      as="h2"
                      className="[&_h2]:text-[clamp(1.5rem,1.2rem+1.2vw,2.1rem)]"
                    />
                    <Accordion items={items} className="mt-7" defaultOpen={gi === 0 ? 0 : -1} />
                  </div>
                );
              })}

              <Reveal>
                <div className="rounded-3xl border border-leaf/25 bg-leaf/8 p-7 sm:p-9">
                  <h2 className="text-2xl">Want to see the cycle for yourself?</h2>
                  <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-ink/70">
                    All food scraps collected by Agri-Cycle are sustainably managed at partner
                    anaerobic digestion or composting facilities, and never go to landfills or
                    incinerators.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button href="/about/anaerobic-digestion" size="md" withArrow>
                      See the cycle
                    </Button>
                    <Button href="/about/depackaging" size="md" variant="outline">
                      Our depackaging solution
                    </Button>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to make a plan?"
        body="Our goal from day one has been to provide a service that is professional, reliable, friendly and cost-competitive while helping you meet your sustainability goals."
        image="/img/site/toters.jpg"
      />
    </>
  );
}
