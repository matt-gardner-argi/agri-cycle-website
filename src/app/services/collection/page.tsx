import type { Metadata } from "next";
import Image from "next/image";
import { Ban, Check } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ImpactCalculator } from "@/components/sections/ImpactCalculator";
import { CTASection } from "@/components/sections/CTASection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "How Food Waste Collection Works",
  description:
    "What you do, what we do, and who we work with. Put your food waste in our designated container and we'll take it from there.",
};

const accepted = [
  "Vegetable and fruit trimmings",
  "Eggshells",
  "Breads and grains",
  "Meat and fish scraps",
  "Dairy products",
  "Soiled coffee filters and paper towels",
  "Produce, seafood and prepared food",
  "Brewery and industrial food waste",
  "Damaged or expired packaged food",
  "Food in metal cans, plastic jugs, cardboard",
];

const notAccepted = [
  "Anything packaged in glass",
  "Diapers",
  "Packaging with a low volume of waste",
  "A handful of other items — just ask",
];

const containers = [
  { size: "32 gal", name: "Totes", body: "For crowded spaces and small operations." },
  { size: "64 gal", name: "Containers", body: "For higher-volume kitchens and cafeterias." },
  { size: "Gaylord", name: "Boxes", body: "For palletized and packaged food waste." },
  { size: "Roll-off", name: "Containers", body: "For mass loss — a freezer clean-out, say." },
];

export default function CollectionPage() {
  return (
    <>
      <PageHero
        eyebrow="Food waste collection"
        title="Put it in our container. We'll take it from there."
        highlight={["there."]}
        image="/img/hero/aerial.jpg"
        crumbs={[{ label: "Services", href: "/services" }, { label: "How collection works" }]}
        intro="Agri-Cycle makes it easy for you to become part of a sustainable waste solution by working with you to customize a service based on your needs."
      >
        <Button href="/quote" size="lg" withArrow>
          Request a Quote
        </Button>
      </PageHero>

      <section className="bg-paper py-20 lg:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="The process"
            title="Four steps, start to finish"
            align="center"
            className="mx-auto max-w-3xl"
          />
          <div className="mt-16">
            <HowItWorks />
          </div>
        </div>
      </section>

      {/* Yes / no lists */}
      <section className="bg-cream/50 py-20 lg:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="What we accept"
            title={
              <>
                Everything you&apos;d put in your{" "}
                <span className="font-serif italic">backyard compost pile</span> — and more
              </>
            }
            intro="Thanks to our state-of-the-art de-packaging capabilities, we can also accept food products still in their packaging."
            className="max-w-3xl"
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
            <Reveal>
              <div className="h-full rounded-3xl border border-leaf/30 bg-white p-7 sm:p-9">
                <p className="inline-flex items-center gap-2.5 font-display text-lg font-bold tracking-tight">
                  <span className="grid size-8 place-items-center rounded-full bg-leaf text-ink">
                    <Check aria-hidden className="size-4.5" />
                  </span>
                  Yes please
                </p>
                <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {accepted.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-[0.9375rem] leading-snug text-ink/75"
                    >
                      <Check aria-hidden className="mt-1 size-3.5 shrink-0 text-leaf-deep" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="h-full rounded-3xl border border-sun/30 bg-white p-7 sm:p-9">
                <p className="inline-flex items-center gap-2.5 font-display text-lg font-bold tracking-tight">
                  <span className="grid size-8 place-items-center rounded-full bg-sun text-ink">
                    <Ban aria-hidden className="size-4.5" />
                  </span>
                  Not this
                </p>
                <ul className="mt-6 flex flex-col gap-3">
                  {notAccepted.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-[0.9375rem] leading-snug text-ink/75"
                    >
                      <Ban aria-hidden className="mt-1 size-3.5 shrink-0 text-sun" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 rounded-xl bg-cream/70 p-4 text-[0.8125rem] leading-relaxed text-ink/60">
                  Not sure about something specific? Call us — we&apos;ve seen it all, and we offer staff
                  training and clear signage on request.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Containers */}
      <section className="bg-paper py-20 lg:py-28">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center lg:gap-16">
            <Reveal direction="right">
              <div className="relative aspect-4/5 overflow-hidden rounded-[1.75rem] border border-ink/8 shadow-[0_36px_75px_-50px_rgba(7,23,17,0.55)]">
                <Image
                  src="/img/site/containers.jpg"
                  alt="Agri-Cycle food waste containers on site"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <div>
              <SectionHeading
                eyebrow="Containers"
                title="Large and small, whatever the space allows"
                intro="Agri-Cycle relies on a wide array of containers to keep food scraps out of the waste stream. A new liner goes in at every tote service to contain residue and keep odors — and pests — to a minimum."
              />
              <RevealGroup className="mt-9 grid gap-4 sm:grid-cols-2" stagger={0.08}>
                {containers.map((c) => (
                  <RevealItem key={c.size + c.name}>
                    <div className="h-full rounded-2xl border border-ink/10 bg-cream/45 p-5 transition-colors hover:border-leaf/50 hover:bg-white">
                      <p className="font-display text-xl leading-none font-bold tracking-tight text-leaf-deep">
                        {c.size}
                      </p>
                      <p className="mt-2 font-display text-[0.9375rem] font-semibold tracking-tight">
                        {c.name}
                      </p>
                      <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-ink/60">{c.body}</p>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        </div>
      </section>

      <ImpactCalculator tone="dark" />
      <CTASection image="/img/site/energy18.jpg" />
    </>
  );
}
