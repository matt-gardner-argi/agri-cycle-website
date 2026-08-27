import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { contactIntro, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "We are excited to hear from you. Whether it's a service quote, a social media collaboration, or you're simply curious about what we do — get in touch.",
  alternates: { canonical: "/contact" },
};

const quickLinks = [
  { label: "Request a service quote", href: "/quote" },
  { label: "Employment opportunities", href: "/careers" },
  { label: "Digester partnerships", href: "/about/processing-partners" },
  { label: "Frequently asked questions", href: "/faq" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="We are excited to hear from you"
        highlight={["you"]}
        image="/img/site/fredfield.jpg"
        crumbs={[{ label: "Contact" }]}
        intro={contactIntro}
      />

      <section className="bg-paper py-20 lg:py-28">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-16">
            <Reveal>
              <EnquiryForm kind="contact" />
            </Reveal>

            <aside className="lg:pt-2">
              <SectionHeading eyebrow="Reach us" title="Direct lines" />

              <Reveal delay={0.12}>
                <ul className="mt-8 flex flex-col gap-4">
                  <li>
                    <a
                      href={site.phoneHref}
                      className="group flex items-start gap-4 rounded-2xl border border-ink/10 bg-cream/40 p-6 transition-all duration-400 hover:-translate-y-1 hover:border-leaf/50 hover:bg-white focus-ring"
                    >
                      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-leaf/20 text-leaf-deep transition-colors group-hover:bg-leaf group-hover:text-ink">
                        <Phone aria-hidden className="size-4.5" />
                      </span>
                      <span>
                        <span className="block text-[0.75rem] font-semibold tracking-[0.14em] text-ink/45 uppercase">
                          Call us
                        </span>
                        <span className="mt-1 block font-display text-xl font-bold tracking-tight">
                          {site.phone}
                        </span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${site.email}`}
                      className="group flex items-start gap-4 rounded-2xl border border-ink/10 bg-cream/40 p-6 transition-all duration-400 hover:-translate-y-1 hover:border-leaf/50 hover:bg-white focus-ring"
                    >
                      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-leaf/20 text-leaf-deep transition-colors group-hover:bg-leaf group-hover:text-ink">
                        <Mail aria-hidden className="size-4.5" />
                      </span>
                      <span>
                        <span className="block text-[0.75rem] font-semibold tracking-[0.14em] text-ink/45 uppercase">
                          Email us
                        </span>
                        <span className="mt-1 block font-display text-[1.0625rem] font-bold tracking-tight break-all">
                          {site.email}
                        </span>
                      </span>
                    </a>
                  </li>
                  <li className="flex items-start gap-4 rounded-2xl border border-ink/10 bg-cream/40 p-6">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-leaf/20 text-leaf-deep">
                      <MapPin aria-hidden className="size-4.5" />
                    </span>
                    <span>
                      <span className="block text-[0.75rem] font-semibold tracking-[0.14em] text-ink/45 uppercase">
                        Head office
                      </span>
                      <span className="mt-1 block text-[0.9375rem] leading-relaxed text-ink/75">
                        {site.address.street}
                        <br />
                        {site.address.city}, {site.address.state} {site.address.zip}
                      </span>
                    </span>
                  </li>
                </ul>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="mt-8">
                  <p className="text-[0.7rem] font-semibold tracking-[0.2em] text-ink/40 uppercase">
                    Looking for something specific?
                  </p>
                  <ul className="mt-4 flex flex-col gap-1">
                    {quickLinks.map((l) => (
                      <li key={l.href}>
                        <Link
                          href={l.href}
                          className="group inline-flex items-center gap-2 py-2 text-[0.9375rem] text-ink/70 transition-colors hover:text-leaf-deep focus-ring"
                        >
                          <span className="h-px w-3 bg-leaf transition-all duration-300 group-hover:w-6" />
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={0.28}>
                <div className="mt-8 flex flex-wrap gap-2">
                  {site.social.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-ink/12 px-4 py-2 text-[0.8rem] font-medium text-ink/65 transition-all duration-300 hover:border-leaf hover:bg-leaf/12 hover:text-ink focus-ring"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </Reveal>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
