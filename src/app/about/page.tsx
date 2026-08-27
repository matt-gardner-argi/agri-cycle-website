import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { CycleDiagram } from "@/components/sections/CycleDiagram";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { CTASection } from "@/components/sections/CTASection";
import { Testimonials } from "@/components/sections/Testimonials";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { nav } from "@/content/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Agri-Cycle was established in 2013 to support sister company Exeter Agri-Energy, an offshoot of Stonyvale Farm, a fifth-generation dairy farm in Exeter, Maine.",
  alternates: { canonical: "/about" },
};

const cards = [
  { ...nav[1].children![0], image: "/img/site/fossilfuel.jpg" },
  { ...nav[1].children![1], image: "/img/site/anaerobic-digestion.jpg" },
  { ...nav[1].children![2], image: "/img/site/depackager.jpg" },
  { ...nav[1].children![3], image: "/img/hero/eae-aerial.jpg" },
  { ...nav[1].children![4], image: "/img/site/history-family.jpg" },
  { ...nav[1].children![5], image: "/img/site/employee.jpg" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="A fusion of Maine's farming tradition and energy innovation"
        highlight={["innovation"]}
        image="/img/site/cows.jpg"
        crumbs={[{ label: "About us" }]}
        intro="Agri-Cycle was established in 2013 to support sister company Exeter Agri-Energy, itself an offshoot of Stonyvale Farm — a fifth-generation dairy farm in Exeter, Maine. What began as a way to preserve the viability of a family farm has blossomed into a sustainable solution for businesses and organizations nationwide."
        size="lg"
      >
        <Button href="/about/history" size="lg" withArrow>
          Read our history
        </Button>
        <Button href="/about/team" size="lg" variant="light">
          Meet the team
        </Button>
      </PageHero>

      <StatsStrip />

      {/* Intro two-column */}
      <section className="bg-paper py-20 lg:py-28">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Who we are"
                title={
                  <>
                    Waste collection is a critical component:{" "}
                    <span className="font-serif italic">Agri-Cycle brings food full circle.</span>
                  </>
                }
              />
              <Reveal delay={0.14}>
                <div className="mt-7 flex flex-col gap-4 text-[1rem] leading-relaxed text-ink/70">
                  <p>
                    Agri-Cycle is the premier food-waste-collection service in the Northeast, and we
                    are growing rapidly across the US. We recycle organic waste via anaerobic digestion
                    and composting, turning it into renewable energy and healthy soil.
                  </p>
                  <p>
                    Our partners include supermarkets, restaurants, universities, distribution centers,
                    food processing plants, corporate cafeterias, school districts, municipalities, and
                    hospitals.
                  </p>
                  <p>
                    Agri-Cycle works in conjunction with sister companies Stonyvale Farm and Exeter
                    Agri-Energy, as well as a growing network of anaerobic digesters that convert food
                    waste into electricity, fuel, fertilizer, and other beneficial products.
                  </p>
                  <p>
                    In 2025, Agri-Cycle was purchased by Closed Loop Partners, a New York-based private
                    equity firm specializing in the circular economy and sustainable materials
                    management.
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal direction="left">
              <div className="grid grid-cols-2 gap-4">
                <div className="relative aspect-3/4 overflow-hidden rounded-2xl border border-ink/8">
                  <Image
                    src="/img/site/energy21.jpg"
                    alt="Agri-Cycle operations"
                    fill
                    sizes="(max-width: 1024px) 50vw, 22vw"
                    className="object-cover"
                  />
                </div>
                <div className="mt-8 flex flex-col gap-4">
                  <div className="relative aspect-square overflow-hidden rounded-2xl border border-ink/8">
                    <Image
                      src="/img/site/cows-today.jpeg"
                      alt="The dairy herd at Stonyvale Farm"
                      fill
                      sizes="(max-width: 1024px) 50vw, 22vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="relative aspect-square overflow-hidden rounded-2xl border border-ink/8">
                    <Image
                      src="/img/site/digestate.jpg"
                      alt="Digestate, the fertilizer product of anaerobic digestion"
                      fill
                      sizes="(max-width: 1024px) 50vw, 22vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CycleDiagram />

      {/* Sub-page cards */}
      <section className="bg-cream/50 py-20 lg:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="Explore"
            title="Dig deeper"
            intro="Six routes into how Agri-Cycle works, where it came from and who runs it."
            align="center"
            className="mx-auto max-w-3xl"
          />

          <RevealGroup
            className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            stagger={0.08}
          >
            {cards.map((c) => (
              <RevealItem key={c.href}>
                <Link
                  href={c.href}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-ink/10 bg-white transition-all duration-500 hover:-translate-y-1.5 hover:border-leaf/50 hover:shadow-[0_34px_65px_-45px_rgba(7,23,17,0.5)] focus-ring"
                >
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={c.image}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-107"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-linear-0 from-ink/70 to-transparent"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-[1.0625rem] leading-snug font-semibold tracking-tight transition-colors group-hover:text-leaf-deep">
                      {c.label}
                    </h3>
                    <p className="mt-2.5 text-[0.875rem] leading-relaxed text-ink/60">
                      {c.description}
                    </p>
                    <span className="mt-auto grid size-8 place-items-center self-start rounded-full bg-leaf/18 text-leaf-deep transition-all duration-300 group-hover:translate-x-1 group-hover:bg-leaf group-hover:text-ink">
                      <ArrowUpRight aria-hidden className="size-4" />
                    </span>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <Testimonials />
      <CTASection image="/img/hero/eae-aerial.jpg" />
    </>
  );
}
