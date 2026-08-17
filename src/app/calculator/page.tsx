import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ImpactCalculator } from "@/components/sections/ImpactCalculator";
import { CTASection } from "@/components/sections/CTASection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Agri Calculator",
  description:
    "Estimate the greenhouse gas emissions you would avoid by sending your food waste to anaerobic digestion instead of a landfill.",
};

const notes = [
  {
    title: "Where the savings come from",
    body: "Two places: the methane a landfill would have released as your organics broke down, and the diesel burned hauling that material to the landfill in the first place.",
  },
  {
    title: "Why digestion beats composting",
    body: "Anaerobic digestion captures the gases produced during breakdown rather than letting them escape, then burns them for electricity and heat.",
  },
  {
    title: "What we can't model here",
    body: "Your exact waste composition, route density, and which processing partner receives your material. A real quote accounts for all three.",
  },
];

export default function CalculatorPage() {
  return (
    <>
      <PageHero
        eyebrow="Agri calculator"
        title="Calculate your impact"
        highlight={["impact"]}
        image="/img/hero/aerial.jpg"
        crumbs={[{ label: "Services", href: "/services" }, { label: "Calculator" }]}
        intro="Tell us roughly what you throw away and how far your trash currently travels. We'll estimate the greenhouse gases you'd avoid by diverting it to a digester instead."
      >
        <Button href="#calculator" size="lg" withArrow>
          Run the numbers
        </Button>
      </PageHero>

      <ImpactCalculator />

      <section className="bg-paper py-20 lg:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="Reading the results"
            title="What the numbers do and don't tell you"
            align="center"
            className="mx-auto max-w-3xl"
          />
          <RevealGroup className="mt-14 grid gap-5 md:grid-cols-3" stagger={0.1}>
            {notes.map((n, i) => (
              <RevealItem key={n.title}>
                <div className="h-full rounded-3xl border border-ink/10 bg-cream/40 p-7 transition-colors hover:border-leaf/50 hover:bg-white">
                  <p className="font-display text-[2rem] leading-none font-bold tracking-[-0.05em] text-leaf/40">
                    0{i + 1}
                  </p>
                  <h3 className="mt-4 font-display text-[1.0625rem] leading-snug font-bold tracking-tight">
                    {n.title}
                  </h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink/65">{n.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CTASection
        title="Turn the estimate into a plan"
        body="It is helpful for us to get familiar with your operation to determine your specific needs and goals — then we'll build a plan and an estimate that fits."
        image="/img/site/energy20.jpg"
      />
    </>
  );
}
