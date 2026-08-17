import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { Eyebrow } from "./SectionHeading";
import { Reveal, WordReveal } from "./Reveal";
import { cn } from "@/lib/utils";

export type Crumb = { label: string; href?: string };

/** Shared interior-page header: photo, gradient wash, breadcrumb, kinetic title. */
export function PageHero({
  eyebrow,
  title,
  highlight,
  intro,
  image,
  crumbs = [],
  align = "left",
  size = "md",
  children,
  objectPosition,
}: {
  eyebrow?: string;
  title: string;
  highlight?: string[];
  intro?: ReactNode;
  image: string;
  crumbs?: Crumb[];
  align?: "left" | "center";
  size?: "sm" | "md" | "lg";
  children?: ReactNode;
  objectPosition?: string;
}) {
  const heights = {
    sm: "min-h-[22rem] py-20",
    md: "min-h-[27rem] py-24",
    lg: "min-h-[34rem] py-28",
  };

  return (
    <section className={cn("relative isolate flex items-end overflow-hidden bg-ink", heights[size])}>
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        style={{ objectPosition }}
        className="-z-30 scale-105 object-cover"
      />
      {/* Two washes: a vertical one to seat the type at the bottom, and a soft
          radial that keeps the photograph legible top-right. */}
      <div aria-hidden className="absolute inset-0 -z-20 bg-linear-0 from-ink via-ink/72 to-ink/25" />
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-[radial-gradient(120%_100%_at_75%_5%,transparent,rgba(7,23,17,0.62))]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-0 -z-10 size-[26rem] rounded-full bg-leaf/18 blur-[110px]"
      />

      <div className="container-page relative">
        {crumbs.length > 0 && (
          <Reveal duration={0.5}>
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol
                className={cn(
                  "flex flex-wrap items-center gap-1.5 text-[0.75rem] text-white/45",
                  align === "center" && "justify-center"
                )}
              >
                <li>
                  <Link href="/" className="transition-colors hover:text-leaf-bright focus-ring">
                    Home
                  </Link>
                </li>
                {crumbs.map((c) => (
                  <li key={c.label} className="flex items-center gap-1.5">
                    <ChevronRight aria-hidden className="size-3 text-white/25" />
                    {c.href ? (
                      <Link href={c.href} className="transition-colors hover:text-leaf-bright focus-ring">
                        {c.label}
                      </Link>
                    ) : (
                      <span className="text-white/75">{c.label}</span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          </Reveal>
        )}

        <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
          {eyebrow && (
            <Reveal duration={0.55}>
              <Eyebrow tone="light">{eyebrow}</Eyebrow>
            </Reveal>
          )}
          <h1
            className={cn(
              "font-display font-bold tracking-[-0.05em] text-white",
              eyebrow && "mt-5",
              size === "lg"
                ? "text-[clamp(2.4rem,1.4rem+4.4vw,4.6rem)] leading-[0.98]"
                : "text-[clamp(2rem,1.3rem+3.4vw,3.8rem)] leading-[1.02]"
            )}
          >
            <WordReveal text={title} highlight={highlight} delay={0.1} />
          </h1>
          {intro && (
            <Reveal delay={0.28}>
              <div
                className={cn(
                  "mt-6 max-w-2xl text-[1.0625rem] leading-relaxed text-white/70",
                  align === "center" && "mx-auto"
                )}
              >
                {intro}
              </div>
            </Reveal>
          )}
          {children && (
            <Reveal delay={0.36}>
              <div className={cn("mt-9 flex flex-wrap gap-3.5", align === "center" && "justify-center")}>
                {children}
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
