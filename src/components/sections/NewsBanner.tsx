import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { pressRelease } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";

/** Featured company-news band, currently the Closed Loop Partners acquisition. */
export function NewsBanner() {
  return (
    <section id="news" className="relative isolate scroll-mt-24 bg-paper py-16 lg:py-20">
      <div className="container-page">
        <Reveal>
          <Link
            href="/news"
            className="group relative block overflow-hidden rounded-[1.75rem] border border-ink/10 bg-white transition-all duration-500 hover:border-leaf/50 hover:shadow-[0_40px_80px_-50px_rgba(7,23,17,0.5)] focus-ring"
          >
            <div className="grid lg:grid-cols-[1fr_auto]">
              <div className="p-7 sm:p-10 lg:p-12">
                <span className="inline-flex items-center gap-2 rounded-full bg-sun/15 px-3 py-1.5 text-[0.68rem] font-bold tracking-[0.16em] text-sun uppercase">
                  <span className="relative flex size-1.5">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-sun opacity-70" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-sun" />
                  </span>
                  {pressRelease.eyebrow}
                  <span className="font-medium text-sun/70 normal-case">
                    · {pressRelease.dateLabel}
                  </span>
                </span>

                <h2 className="mt-5 max-w-3xl text-[clamp(1.4rem,1.05rem+1.5vw,2.35rem)] leading-[1.12]">
                  {pressRelease.title}
                </h2>

                <p className="mt-4 max-w-2xl text-[0.9375rem] leading-relaxed text-ink/65 sm:text-base">
                  {pressRelease.standfirst}
                </p>

                <span className="mt-7 inline-flex items-center gap-2.5 text-[0.875rem] font-semibold text-leaf-deep">
                  Read the press release
                  <span className="grid size-7 place-items-center rounded-full bg-leaf text-ink transition-transform duration-400 group-hover:translate-x-1 group-hover:rotate-45">
                    <ArrowUpRight aria-hidden className="size-3.5" />
                  </span>
                </span>
              </div>

              <div className="relative hidden w-72 shrink-0 items-center justify-center border-l border-ink/8 bg-cream/40 p-10 lg:flex">
                <Image
                  src="/img/partners/closed-loop.png"
                  alt="Closed Loop Partners"
                  width={220}
                  height={70}
                  className="h-auto w-full object-contain transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

            {/* accent underline that draws on hover */}
            <span
              aria-hidden
              className="absolute bottom-0 left-0 h-1 w-0 bg-linear-90 from-leaf via-sky to-sun transition-all duration-700 group-hover:w-full"
            />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
