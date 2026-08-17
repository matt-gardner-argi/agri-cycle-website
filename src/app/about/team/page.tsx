import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { TeamGrid } from "@/components/sections/TeamGrid";
import { CTASection } from "@/components/sections/CTASection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "The leadership team behind Agri-Cycle — from route drivers turned general managers to public policy specialists.",
};

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="Our team"
        title="The people behind the fleet"
        highlight={["fleet"]}
        image="/img/site/employee.jpg"
        objectPosition="center 25%"
        crumbs={[{ label: "About us", href: "/about" }, { label: "Our team" }]}
        intro="Decades of solid waste, trucking, policy and finance experience — much of it earned on the route before it was earned in the office."
      >
        <Button href="/careers" size="lg" withArrow>
          Join the team
        </Button>
      </PageHero>

      <section className="bg-paper py-20 lg:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="Leadership"
            title="Tap any face to read the full bio"
            align="center"
            className="mx-auto max-w-3xl"
          />
          <div className="mt-14">
            <TeamGrid />
          </div>

          <Reveal delay={0.15}>
            <div className="mt-16 rounded-3xl border border-leaf/25 bg-leaf/8 p-8 text-center sm:p-12">
              <h2 className="text-[clamp(1.5rem,1.2rem+1.4vw,2.25rem)]">
                We&apos;re hiring across the company
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[0.9375rem] leading-relaxed text-ink/70">
                Drivers, route supervisors, operations and sales roles across our service area. Take a
                look at the opportunities we have open right now.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Button href="/careers" size="lg" withArrow>
                  See open roles
                </Button>
                <Button href="/contact" size="lg" variant="outline">
                  Get in touch
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection image="/img/site/fredfield.jpg" />
    </>
  );
}
