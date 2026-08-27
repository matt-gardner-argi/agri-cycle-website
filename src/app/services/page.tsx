import type { Metadata } from "next";
import Image from "next/image";
import { Truck } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { ServiceCards } from "@/components/sections/ServiceCards";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { StateTileMap } from "@/components/sections/StateTileMap";
import { CTASection } from "@/components/sections/CTASection";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Food Waste Collection Services",
  description:
    "Toter service, high-volume liquids, roll-off and emergency collection for grocers, restaurants, schools, hospitals, breweries and producers nationwide.",
  alternates: { canonical: "/services" },
};

const fleet = [
  {
    image: "/img/site/truck-rendering.png",
    alt: "Illustration of an orange and grey rear-loader with an enclosed body and hydraulic arms down each side.",
    name: "Rendering trucks",
    body: "Small rear-loaders with tipper buckets, made for city streets and tight loading docks.",
  },
  {
    image: "/img/site/truck-liquids.png",
    alt: "Illustration of a white tractor unit hauling a long pale blue cylindrical tank on a flatbed trailer.",
    name: "Liquid tankers",
    body: "Vacuum-pump tankers hauling up to 8,500 gallons of slurry, grease and liquid by-products.",
  },
  {
    image: "/img/site/truck-longhaul.png",
    alt: "Illustration of a white tractor unit with its ribbed green trailer tipped up at a steep angle to unload.",
    name: "Long-haul trailers",
    body: "Tractor-trailers moving up to 65 yards of solids between sites and processing partners.",
  },
  {
    image: "/img/site/truck-rolloff.png",
    alt: "Illustration of a white truck tilting an open-topped orange roll-off container down off its rails.",
    name: "Roll-off containers",
    body: "For mass loss, recalls and palletized packaged food waste — anywhere in the country.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Routine loss or one-off emergency — we have a solution"
        highlight={["solution"]}
        image="/img/site/containers.jpg"
        crumbs={[{ label: "Services" }]}
        intro="Whether you are experiencing routine loss or a one-off emergency, chances are we have the service for you. We run scheduled route collections in 14 states and build customized programs for producers nationally."
        size="lg"
      >
        <Button href="/quote" size="lg" withArrow>
          Request a Quote
        </Button>
        <Button href="/faq" size="lg" variant="light">
          Read the FAQ
        </Button>
      </PageHero>

      <StatsStrip />

      <section className="bg-paper py-20 lg:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="Three ways we collect"
            title="Pick the service that fits your operation"
            intro="We'll customise from here — most partners end up with a blend of these across their sites."
            align="center"
            className="mx-auto max-w-3xl"
          />
          <div className="mt-14">
            <ServiceCards />
          </div>
        </div>
      </section>

      {/* Fleet */}
      <section className="relative isolate overflow-hidden bg-ink py-20 text-white lg:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 right-0 -z-10 size-[30rem] rounded-full bg-sky/12 blur-[120px]"
        />
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-center lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Our fleet"
                tone="light"
                title={
                  <>
                    A diverse fleet, so your waste never travels{" "}
                    <span className="font-serif italic">further than it has to</span>
                  </>
                }
                intro="Our fleet includes rear-loading collection trucks for toter service and tractor-trailers for hauling up to 8,500 gallons of liquids and 65 yards of solids, as well as palletized waste materials."
              />
              <Reveal delay={0.18}>
                <p className="mt-6 max-w-xl text-[0.9375rem] leading-relaxed text-white/60">
                  We partner with a close-knit network of digesters throughout the country to create a
                  sustainable web of waste diversion. To do it any other way wouldn&apos;t make sense —
                  environmental or otherwise.
                </p>
              </Reveal>
            </div>

            <RevealGroup className="grid gap-4 sm:grid-cols-2" stagger={0.09}>
              {fleet.map((f) => (
                <RevealItem key={f.name}>
                  <div className="group h-full rounded-2xl border border-white/12 bg-white/5 p-6 transition-all duration-400 hover:-translate-y-1 hover:border-leaf/45 hover:bg-white/8">
                    <div className="relative h-24">
                      <Image
                        src={f.image}
                        alt={f.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, 22rem"
                        className="object-contain object-left transition-transform duration-700 group-hover:translate-x-1.5"
                      />
                    </div>
                    <p className="mt-4 inline-flex items-center gap-2 font-display text-[1rem] font-bold tracking-tight text-white">
                      <Truck aria-hidden className="size-4 text-leaf" />
                      {f.name}
                    </p>
                    <p className="mt-2 text-[0.8125rem] leading-relaxed text-white/60">{f.body}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-paper py-20 lg:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="How it works"
            title="From your kitchen to the digester"
            intro="Four steps, and only the first one is yours."
            align="center"
            className="mx-auto max-w-3xl"
          />
          <div className="mt-16">
            <HowItWorks />
          </div>
        </div>
      </section>

      <StateTileMap />
      <CTASection body="Call us today to discuss how we can customize an efficient collection service to meet your specific needs." />
    </>
  );
}
