import type { Metadata } from "next";
import { Clock, MapPin, Phone, Sparkles } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { site, quoteIntro } from "@/content/site";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Complete the form to give us some initial information about your operation. We will get back to you within three business days.",
};

const expectations = [
  {
    icon: Clock,
    title: "Three business days",
    body: "That's our commitment for getting back to you with next steps.",
  },
  {
    icon: MapPin,
    title: "A site visit first",
    body: "We customize our collection strategy by getting familiar with your specific needs and constraints.",
  },
  {
    icon: Sparkles,
    title: "Usually cheaper",
    body: "Our fees are typically competitive — if not cheaper — than your current disposal costs.",
  },
];

export default function QuotePage() {
  return (
    <>
      <PageHero
        eyebrow="Request a quote"
        title="Let's build a plan that fits your operation"
        highlight={["operation"]}
        image="/img/site/truck-69.jpg"
        crumbs={[{ label: "Request a quote" }]}
        intro={quoteIntro}
      />

      <section className="bg-paper py-20 lg:py-28">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-16">
            <Reveal>
              <EnquiryForm kind="quote" />
            </Reveal>

            <aside className="lg:pt-2">
              <SectionHeading eyebrow="What happens next" title="How we handle a new enquiry" />
              <RevealGroup className="mt-8 flex flex-col gap-4" stagger={0.1}>
                {expectations.map((e) => (
                  <RevealItem key={e.title}>
                    <div className="flex items-start gap-4 rounded-2xl border border-ink/10 bg-cream/40 p-6">
                      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-leaf/20 text-leaf-deep">
                        <e.icon aria-hidden className="size-4.5" />
                      </span>
                      <div>
                        <p className="font-display text-[0.9375rem] font-bold tracking-tight">
                          {e.title}
                        </p>
                        <p className="mt-1.5 text-[0.875rem] leading-relaxed text-ink/60">{e.body}</p>
                      </div>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>

              <Reveal delay={0.36}>
                <div className="mt-8 rounded-2xl border border-ink/10 bg-ink p-7 text-white">
                  <p className="text-[0.7rem] font-semibold tracking-[0.2em] text-leaf-bright uppercase">
                    Prefer to talk?
                  </p>
                  <a
                    href={site.phoneHref}
                    className="mt-3 inline-flex items-center gap-2.5 font-display text-2xl font-bold tracking-tight transition-colors hover:text-leaf-bright focus-ring"
                  >
                    <Phone aria-hidden className="size-5 text-leaf" />
                    {site.phone}
                  </a>
                  <p className="mt-4 text-[0.8125rem] leading-relaxed text-white/55">
                    {site.address.street}
                    <br />
                    {site.address.city}, {site.address.state} {site.address.zip}
                  </p>
                </div>
              </Reveal>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
