import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { CycleDiagram } from "@/components/sections/CycleDiagram";
import { CTASection } from "@/components/sections/CTASection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { anaerobic } from "@/content/site";

export const metadata: Metadata = {
  title: "What Is Anaerobic Digestion?",
  description:
    "A biological process in which microorganisms break down organic material in the absence of oxygen, capturing methane for electricity, heat and fertilizer.",
};

const outputs = [
  {
    name: "Electricity",
    body: "Captured biogas is combusted in combined heat and power units. Surplus power is distributed through the grid.",
    image: "/img/site/digester.jpg",
  },
  {
    name: "Heat",
    body: "Waste heat from generation warms farm buildings and digester vessels — displacing thousands of gallons of heating oil.",
    image: "/img/site/eae-map.jpg",
  },
  {
    name: "Fertilizer & bedding",
    body: "Bio-separators recover liquid and solid digestate for use as rich fertilizer, soil amendment and animal bedding.",
    image: "/img/site/digestate.jpg",
  },
  {
    name: "Renewable fuels",
    body: "Biogas can also be upgraded into renewable natural gas and transportation fuels.",
    image: "/img/site/tanker-truck.jpg",
  },
];

export default function AnaerobicPage() {
  return (
    <>
      <PageHero
        eyebrow="The science"
        title="What is anaerobic digestion?"
        highlight={["digestion?"]}
        image="/img/site/digester.jpg"
        crumbs={[{ label: "About us", href: "/about" }, { label: "Anaerobic digestion" }]}
        intro={anaerobic.summary}
        size="lg"
      >
        <Button href="/faq" size="lg" withArrow>
          Read the FAQ
        </Button>
      </PageHero>

      {/* Kicker + infographic */}
      <section className="bg-paper py-20 lg:py-28">
        <div className="container-page">
          <Reveal>
            <p className="mx-auto max-w-4xl text-center font-serif text-[clamp(1.4rem,1.1rem+1.8vw,2.5rem)] leading-[1.3] text-ink italic">
              {anaerobic.kicker}
            </p>
          </Reveal>

          <Reveal delay={0.14}>
            <figure className="mx-auto mt-16 max-w-3xl">
              <div className="relative overflow-hidden rounded-[1.5rem] border border-ink/10 bg-white p-4 shadow-[0_32px_70px_-50px_rgba(7,23,17,0.5)] sm:p-8">
                <Image
                  src="/img/site/anaerobic-digestion.jpg"
                  alt="Infographic outlining the anaerobic digestion process and cycle"
                  width={1000}
                  height={1094}
                  sizes="(max-width: 768px) 100vw, 48rem"
                  className="h-auto w-full rounded-xl"
                />
              </div>
              <figcaption className="mt-4 text-center text-[0.8125rem] text-ink/50">
                The Agri-Cycle cycle: organic waste in, renewable products out.
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      <CycleDiagram />

      {/* Outputs */}
      <section className="bg-cream/50 py-20 lg:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="What comes out"
            title="Four useful products from one biological process"
            align="center"
            className="mx-auto max-w-3xl"
          />

          <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.09}>
            {outputs.map((o) => (
              <RevealItem key={o.name}>
                <div className="group h-full overflow-hidden rounded-3xl border border-ink/10 bg-white transition-all duration-500 hover:-translate-y-1.5 hover:border-leaf/50 hover:shadow-[0_32px_60px_-45px_rgba(7,23,17,0.5)]">
                  <div className="relative h-36 overflow-hidden">
                    <Image
                      src={o.image}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, 25vw"
                      className="object-cover transition-transform duration-[1000ms] group-hover:scale-108"
                    />
                    <div aria-hidden className="absolute inset-0 bg-ink/25" />
                  </div>
                  <div className="p-6">
                    <p className="font-display text-[1.0625rem] font-bold tracking-tight">{o.name}</p>
                    <p className="mt-2.5 text-[0.875rem] leading-relaxed text-ink/60">{o.body}</p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.2}>
            <div className="mt-14 flex flex-wrap justify-center gap-3.5">
              <Button href="/about/processing-partners" size="lg" withArrow>
                Meet our processing partners
              </Button>
              <Button href="/about/depackaging" size="lg" variant="outline">
                Our depackaging solution
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection image="/img/hero/eae-aerial.jpg" />
    </>
  );
}
