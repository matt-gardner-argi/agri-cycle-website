import { Phone } from "lucide-react";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ParallaxImage } from "@/components/ui/Parallax";

export function CTASection({
  title = "You've got the power.",
  body = "Call us today to discuss how we can customize an efficient collection service to meet your specific needs.",
  image = "/img/hero/tanker.jpg",
}: {
  title?: string;
  body?: string;
  image?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden">
      <ParallaxImage
        src={image}
        alt=""
        className="absolute inset-0 -z-20"
        sizes="100vw"
        distance={110}
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-ink/78" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-160 from-moss/55 via-ink/30 to-sky/25"
      />

      <div className="container-page py-24 text-center lg:py-32">
        <Reveal>
          <h2 className="mx-auto max-w-3xl text-[clamp(2rem,1.2rem+3.2vw,3.8rem)] leading-[1.04] text-white">
            {title}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mx-auto mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-white/70">
            {body}
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3.5">
            <Button href="/quote" size="lg" withArrow>
              Request a Quote
            </Button>
            <Button href={site.phoneHref} size="lg" variant="light">
              <span className="inline-flex items-center gap-2">
                <Phone aria-hidden className="size-4" />
                {site.phone}
              </span>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
