import Image from "next/image";
import { partnerLogos, partnerNames } from "@/content/site";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/Reveal";

export function PartnerMarquee() {
  return (
    <section className="border-y border-ink/8 bg-paper py-14 lg:py-16">
      <Reveal>
        <p className="container-page text-center text-[0.7rem] font-semibold tracking-[0.22em] text-ink/40 uppercase">
          We collect from business partners throughout the region — from small restaurants to large
          grocery retailers
        </p>
      </Reveal>

      <div className="mt-10 space-y-6">
        <Marquee>
          {partnerLogos.map((logo) => (
            <div
              key={logo.name}
              className="flex h-16 w-40 shrink-0 items-center justify-center px-5 sm:w-52"
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={180}
                height={60}
                className="max-h-12 w-auto object-contain opacity-45 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0"
              />
            </div>
          ))}
        </Marquee>

        <Marquee reverse slow>
          {partnerNames.map((name) => (
            <span
              key={name}
              className="mx-1.5 shrink-0 rounded-full border border-ink/10 bg-cream/60 px-5 py-2.5 text-[0.8125rem] font-medium whitespace-nowrap text-ink/60"
            >
              {name}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
