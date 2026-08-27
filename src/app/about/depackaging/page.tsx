import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { depackaging } from "@/content/site";

export const metadata: Metadata = {
  title: "Our Depackaging Solution",
  description:
    "Our de-packaging technology separates organic content from plastic, metal and cardboard packaging, so materials can be composted or recycled rather than wasted.",
  alternates: { canonical: "/about/depackaging" },
};

export default function DepackagingPage() {
  return (
    <>
      <PageHero
        eyebrow="Technology"
        title="What does it mean to de-pack?"
        highlight={["de-pack?"]}
        image="/img/site/depackager.jpg"
        crumbs={[{ label: "About us", href: "/about" }, { label: "Depackaging" }]}
        intro={depackaging.intro}
        size="lg"
      >
        <Button href="/quote" size="lg" withArrow>
          Talk to us about volumes
        </Button>
      </PageHero>

      {/* Steps */}
      <section className="bg-paper py-20 lg:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="How it works"
            title="Paddles, blades and screens, working in unison"
            intro="The de-pack was the first of its kind in the Northeast. Now many of our partner farm-based digesters use the same technology."
            align="center"
            className="mx-auto max-w-3xl"
          />

          <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
            {depackaging.steps.map((s, i) => (
              <RevealItem key={s.n}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-ink/10 bg-cream/40 p-6 transition-all duration-400 hover:-translate-y-1.5 hover:border-sun/50 hover:bg-white">
                  <p className="font-display text-[2.5rem] leading-none font-bold tracking-[-0.05em] text-ink/12 transition-colors duration-400 group-hover:text-sun/35">
                    {s.n}
                  </p>
                  <p className="mt-3 font-display text-[1.0625rem] leading-snug font-bold tracking-tight">
                    {s.title}
                  </p>
                  <p className="mt-2.5 text-[0.875rem] leading-relaxed text-ink/60">{s.body}</p>
                  {i < depackaging.steps.length - 1 && (
                    <span
                      aria-hidden
                      className="absolute top-9 -right-2 hidden h-px w-4 bg-ink/15 lg:block"
                    />
                  )}
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Photos + prose */}
      <section className="bg-cream/50 py-20 lg:py-28">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
            <Reveal direction="right">
              <div className="flex flex-col gap-5">
                <figure className="m-0">
                  <div className="relative aspect-4/3 overflow-hidden rounded-[1.5rem] border border-ink/8 shadow-[0_30px_65px_-48px_rgba(7,23,17,0.55)]">
                    <Image
                      src="/img/site/depackager.jpg"
                      alt="The depackager: intake trough on the left, separator mechanism on the right"
                      fill
                      loading="eager"
                      fetchPriority="high"
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="mt-3 text-[0.8125rem] leading-relaxed text-ink/55">
                    The depackager consists of the intake trough (left) and the separator mechanism
                    (right).
                  </figcaption>
                </figure>

                <figure className="m-0">
                  <div className="relative aspect-4/3 overflow-hidden rounded-[1.5rem] border border-ink/8 shadow-[0_30px_65px_-48px_rgba(7,23,17,0.55)]">
                    <Image
                      src="/img/site/depackager-loading.jpg"
                      alt="A loader moving food waste from the tipping floor into the depackaging machine"
                      fill
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="mt-3 text-[0.8125rem] leading-relaxed text-ink/55">
                    A loader is used to move the food waste from the tipping floor into the depackaging
                    machine.
                  </figcaption>
                </figure>
              </div>
            </Reveal>

            <div className="lg:pt-6">
              <Reveal>
                <div className="prose-ac">
                  {depackaging.body.map((p) => (
                    <p key={p.slice(0, 40)}>{p}</p>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.12}>
                <div className="mt-10 rounded-3xl border border-leaf/25 bg-leaf/8 p-7">
                  <h2 className="text-xl">When to reach for the de-pack</h2>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink/70">
                    It is often the best option for large grocers and food distributors experiencing
                    significant volumes of organics otherwise destined for a landfill or incinerator. In
                    all other situations, we encourage source separation for a clean organic stream.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button href="/faq" size="sm" withArrow>
                      Depackager FAQ
                    </Button>
                    <Button href="/services" size="sm" variant="outline">
                      Collection services
                    </Button>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Significant volumes of packaged organics?"
        body="We accept all damaged or expired packaged foods, including items in metal cans, plastic jugs and cardboard boxes — nationwide, on palletized routes."
        image="/img/site/depackager-loading.jpg"
      />
    </>
  );
}
