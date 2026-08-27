import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { StateTileMap } from "@/components/sections/StateTileMap";
import { CTASection } from "@/components/sections/CTASection";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { serviceArea } from "@/content/site";

export const metadata: Metadata = {
  title: "Service Area",
  description: serviceArea.long,
  alternates: { canonical: "/service-area" },
};

export default function ServiceAreaPage() {
  return (
    <>
      <PageHero
        eyebrow="Service area"
        title="Scheduled routes in 14 states, custom programs nationally"
        highlight={["nationally"]}
        image="/img/site/toters.jpg"
        crumbs={[{ label: "Services", href: "/services" }, { label: "Service area" }]}
        intro={`${serviceArea.long} Curious about how we can help you achieve your food waste recycling goals? Reach out and learn more.`}
        size="lg"
      >
        <Button href="/quote" size="lg" withArrow>
          Request a Quote
        </Button>
      </PageHero>

      <StatsStrip />
      <StateTileMap />

      {/* How do we do it */}
      <section className="bg-paper py-20 lg:py-28">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="How do we do it?"
                title={
                  <>
                    A close-knit network of digesters, so nothing travels{" "}
                    <span className="font-serif italic">further than necessary</span>
                  </>
                }
              />
              <Reveal delay={0.14}>
                <div className="mt-7 flex flex-col gap-4 text-[1rem] leading-relaxed text-ink/70">
                  <p>
                    Agri-Cycle&apos;s diverse fleet and expertise makes it possible for us to service
                    your business or institution no matter where you are or how much waste you generate.
                  </p>
                  <p>
                    We partner with a close-knit network of digesters throughout the country to create a
                    sustainable web of waste diversion. This means that your waste never travels further
                    than necessary to reach its final destination. To do it any other way wouldn&apos;t
                    make sense — environmental or otherwise.
                  </p>
                  <p className="font-semibold text-ink">
                    Inside our 14 routed states, chances are we&apos;re already passing your
                    business, school or home — keep an eye out for the Agri-Cycle logo. Outside them,
                    we build the program around you rather than around a route.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.22}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href="/quote" size="md" withArrow>
                    Request a Quote
                  </Button>
                  <Button href="/about/processing-partners" size="md" variant="outline">
                    Our processing partners
                  </Button>
                </div>
              </Reveal>
            </div>

            <Reveal direction="left">
              <figure className="m-0">
                <div className="relative aspect-4/3 overflow-hidden rounded-[1.75rem] border border-ink/8 bg-white p-4 shadow-[0_36px_75px_-52px_rgba(7,23,17,0.55)]">
                  <Image
                    src="/img/site/service-areas.jpg"
                    alt="Map of Agri-Cycle's original New England service area, centred on Exeter, Maine"
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-contain p-3"
                  />
                </div>
                <figcaption className="mt-4 text-[0.8125rem] leading-relaxed text-ink/55">
                  Where it started: the original New England route network around Exeter, Maine. Routes
                  now reach across 14 states, with palletized and emergency service available
                  nationwide.
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      <CTASection
        title="Is your state missing from this page?"
        body="Regardless of your state laws about food scraps, diverting scraps from landfill disposal reduces your trash and trash fees, reduces greenhouse gases, and creates renewable energy and farm products. Reach out today."
        image="/img/hero/eae-aerial.jpg"
      />
    </>
  );
}
