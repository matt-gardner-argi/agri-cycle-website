import type { Metadata } from "next";
import { ExternalLink, HeartHandshake, Route, Wrench } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Employment",
  description:
    "Welcome to Agri-Cycle. Take a look at the exciting opportunities we have across drivers, operations and support roles.",
  alternates: { canonical: "/careers" },
};

const JOBS_URL =
  "https://recruiting.paylocity.com/recruiting/jobs/All/8619ed40-727c-4681-880b-b896e7ae67e1/Agri-Cycle-Energy-LLC";

const reasons = [
  {
    icon: Route,
    title: "Real routes, real impact",
    body: "Every load our drivers collect is a load that never reaches a landfill. Diversion is the job, not a side effect of it.",
  },
  {
    icon: Wrench,
    title: "Equipment worth learning",
    body: "Rear-loaders, vacuum tankers, long-haul trailers and the first depackaging machine in the Northeast.",
  },
  {
    icon: HeartHandshake,
    title: "Room to move up",
    body: "Our general manager started as a route driver. Several of our managers have been here a decade or more.",
  },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Employment"
        title="Employment opportunities"
        highlight={["opportunities"]}
        image="/img/site/employee.jpg"
        objectPosition="center 30%"
        crumbs={[{ label: "About us", href: "/about" }, { label: "Employment" }]}
        intro="Welcome to Agri-Cycle. Take a look at the exciting opportunities we have."
      >
        <Button href="#openings" size="lg" withArrow>
          See open roles
        </Button>
        <Button href="/about/team" size="lg" variant="light">
          Meet the team
        </Button>
      </PageHero>

      <section className="bg-paper py-20 lg:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Why work here"
            title="A growing company with a fifth-generation backbone"
            align="center"
            className="mx-auto max-w-3xl"
          />
          <RevealGroup className="mt-14 grid gap-5 md:grid-cols-3" stagger={0.1}>
            {reasons.map((r) => (
              <RevealItem key={r.title}>
                <div className="h-full rounded-3xl border border-ink/10 bg-cream/40 p-7 transition-all duration-400 hover:-translate-y-1.5 hover:border-leaf/50 hover:bg-white">
                  <span className="grid size-11 place-items-center rounded-xl bg-leaf/20 text-leaf-deep">
                    <r.icon aria-hidden className="size-5" />
                  </span>
                  <h3 className="mt-5 font-display text-[1.0625rem] leading-snug font-bold tracking-tight">
                    {r.title}
                  </h3>
                  <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink/65">{r.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Live listings */}
      <section id="openings" className="scroll-mt-24 bg-cream/50 py-20 lg:py-24">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Open roles" title="Current openings" />
            <Reveal delay={0.12}>
              <a
                href={JOBS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-5 py-3 text-[0.8125rem] font-semibold text-ink transition-all duration-300 hover:border-leaf hover:bg-leaf/12 focus-ring"
              >
                Open the full job board
                <ExternalLink aria-hidden className="size-3.5" />
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.16}>
            <div className="mt-10 overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-[0_30px_70px_-55px_rgba(7,23,17,0.5)]">
              <iframe
                src={JOBS_URL}
                title="Agri-Cycle job listings"
                loading="lazy"
                className="h-[70rem] w-full border-0"
              />
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-5 text-[0.8125rem] leading-relaxed text-ink/50">
              Listings are served live from our applicant tracking system. If the board doesn&apos;t load
              in your browser, open it directly using the link above or call us on 1-800-850-9560.
            </p>
          </Reveal>
        </div>
      </section>

      <CTASection
        title="Don't see your role listed?"
        body="We're growing quickly across the country. Tell us what you do and we'll keep you in mind."
        image="/img/site/ace14.jpg"
      />
    </>
  );
}
