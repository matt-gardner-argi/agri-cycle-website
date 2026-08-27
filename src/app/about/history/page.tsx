import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Timeline } from "@/components/sections/Timeline";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { CTASection } from "@/components/sections/CTASection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "History",
  description:
    "From a fifth-generation dairy farm in Exeter, Maine to a national organics collection platform — the Agri-Cycle story.",
  alternates: { canonical: "/about/history" },
};

export default function HistoryPage() {
  return (
    <>
      <PageHero
        eyebrow="History"
        title="What began as a way to preserve a family farm"
        highlight={["farm"]}
        image="/img/site/history-family.jpg"
        objectPosition="center 30%"
        crumbs={[{ label: "About us", href: "/about" }, { label: "History" }]}
        intro="Agri-Cycle was established in 2013 to support sister company Exeter Agri-Energy, itself an offshoot of Stonyvale Farm, a fifth-generation dairy farm in Exeter, Maine."
        size="lg"
      />

      {/* Framing + compare */}
      <section className="bg-paper py-20 lg:py-28">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Then and now"
                title={
                  <>
                    The equipment has changed since the 1800s.{" "}
                    <span className="font-serif italic">The commitment hasn&apos;t.</span>
                  </>
                }
              />
              <Reveal delay={0.14}>
                <div className="mt-7 flex flex-col gap-4 text-[1rem] leading-relaxed text-ink/70">
                  <p>
                    In 2011 the anaerobic digesters were installed on the farm to help with manure
                    management and to help diversify revenue through manure conversion to biofuel.
                  </p>
                  <p>
                    What began as a way to preserve the viability of a family farm has blossomed into a
                    sustainable solution for businesses and organizations seeking a solution for wasted
                    food and other organic streams.
                  </p>
                  <p>
                    The fifth generation is as committed to making the best use of the farm as the
                    first. Now, in addition to the dairy, we&apos;re creating renewable power and setting
                    a national standard for others to follow.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.22}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href="/about/processing-partners" size="md" withArrow>
                    Exeter Agri-Energy today
                  </Button>
                  <Button href="/about/team" size="md" variant="outline">
                    Meet the team
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

      {/* Timeline */}
      <section className="bg-cream/50 py-20 lg:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="Milestones"
            title="Five generations, one piece of land"
            intro="The Fogler family has been working the land at the farm in Exeter since the late 1800s."
            align="center"
            className="mx-auto max-w-3xl"
          />
          <div className="mt-16 lg:mt-20">
            <Timeline />
          </div>
        </div>
      </section>

      <CTASection
        title="Food Full Circle — and we mean it"
        body="Agri-Cycle continues to work with Exeter Agri-Energy as a partner alongside a growing network of outlets across the nation."
        image="/img/hero/aerial.jpg"
      />
    </>
  );
}
