"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Droplets, Handshake, Milk, Sprout, Truck, Zap } from "lucide-react";
import { timeline, type TimelineEntry } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/**
 * The story rail. It used to be a hairline, a dot and a paragraph per entry,
 * which read as a wall of text with dates in it. Each milestone now has a
 * chapter name, a colour, an icon and the one figure worth remembering, and the
 * years sit in a jump-to strip above so the whole arc is legible before you
 * read a word of it.
 */

const icons = { sprout: Sprout, milk: Milk, zap: Zap, truck: Truck, droplets: Droplets, handshake: Handshake };

const accents: Record<
  TimelineEntry["accent"],
  { chip: string; marker: string; bar: string; text: string; card: string }
> = {
  moss: {
    chip: "bg-moss/12 text-moss",
    marker: "border-moss/30 bg-moss text-white",
    bar: "bg-moss",
    text: "text-moss",
    card: "hover:border-moss/35",
  },
  leaf: {
    chip: "bg-leaf/18 text-leaf-deep",
    marker: "border-leaf-deep/30 bg-leaf text-ink",
    bar: "bg-leaf",
    text: "text-leaf-deep",
    card: "hover:border-leaf/50",
  },
  sun: {
    chip: "bg-sun/16 text-sun",
    marker: "border-sun/30 bg-sun text-ink",
    bar: "bg-sun",
    text: "text-sun",
    card: "hover:border-sun/50",
  },
  sky: {
    chip: "bg-sky/16 text-sky",
    marker: "border-sky/30 bg-sky text-ink",
    bar: "bg-sky",
    text: "text-sky",
    card: "hover:border-sky/50",
  },
};

function slug(year: string) {
  return `milestone-${year.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
}

export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 80%"] });
  const height = useTransform(scrollYProgress, [0, 1], reduce ? ["100%", "100%"] : ["0%", "100%"]);

  return (
    <div>
      {/* Jump-to strip: the whole arc at a glance, and a way into the middle of
          it without scrolling past everything before it. */}
      <nav aria-label="Jump to a milestone" className="mb-14">
        <ol className="flex flex-wrap justify-center gap-2">
          {timeline.map((item) => {
            const a = accents[item.accent];
            return (
              <li key={item.year}>
                <a
                  href={`#${slug(item.year)}`}
                  className={cn(
                    "inline-flex items-baseline gap-2 rounded-full px-4 py-2 text-[0.8125rem] font-semibold transition-all duration-300 hover:-translate-y-0.5 focus-ring",
                    a.chip
                  )}
                >
                  {item.year}
                  <span className="text-ink/40">{item.chapter}</span>
                </a>
              </li>
            );
          })}
        </ol>
      </nav>

      <div ref={ref} className="relative">
        {/* Rail */}
        <div
          aria-hidden
          className="absolute top-2 bottom-2 left-[1.375rem] w-0.5 rounded-full bg-ink/10 sm:left-[1.875rem]"
        >
          <motion.div
            style={{ height }}
            className="w-full rounded-full bg-linear-180 from-moss via-leaf to-sun"
          />
        </div>

        <ol className="flex flex-col gap-12 sm:gap-14">
          {timeline.map((item, i) => {
            const a = accents[item.accent];
            const Icon = icons[item.icon];
            return (
              <li
                key={item.year}
                id={slug(item.year)}
                className="relative scroll-mt-28 pl-14 sm:pl-20"
              >
                <motion.span
                  aria-hidden
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.7 }}
                  transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                  className={cn(
                    "absolute top-1.5 left-0 grid size-11 place-items-center rounded-full border-4 border-paper shadow-[0_6px_18px_-8px_rgba(7,23,17,0.45)] sm:size-15",
                    a.marker
                  )}
                >
                  <Icon aria-hidden className="size-5 sm:size-6" />
                </motion.span>

                <Reveal direction="up" delay={0.05}>
                  <article
                    className={cn(
                      "grid gap-6 overflow-hidden rounded-3xl border border-ink/8 bg-white/80 p-6 transition-colors duration-500 md:grid-cols-[minmax(0,1fr)_17rem] md:items-center md:gap-9 md:p-7",
                      a.card
                    )}
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <span
                          className={cn(
                            "inline-flex rounded-full px-3 py-1 font-display text-[0.8125rem] font-bold tracking-[0.1em] uppercase",
                            a.chip
                          )}
                        >
                          {item.year}
                        </span>
                        <span className="text-[0.8125rem] font-medium text-ink/40">
                          {item.chapter}
                        </span>
                      </div>

                      <h3 className="mt-3.5 text-[clamp(1.25rem,1rem+1vw,1.85rem)] leading-tight">
                        {item.title}
                      </h3>
                      <p className="mt-3.5 max-w-2xl text-[0.9375rem] leading-relaxed text-ink/65">
                        {item.body}
                      </p>

                      {item.marker && (
                        <p className="mt-5 flex items-center gap-3">
                          <span aria-hidden className={cn("h-9 w-1 rounded-full", a.bar)} />
                          <span className="flex items-baseline gap-2">
                            <span
                              className={cn(
                                "font-display text-2xl leading-none font-bold tracking-tight",
                                a.text
                              )}
                            >
                              {item.marker.value}
                            </span>
                            <span className="text-[0.8125rem] text-ink/55">
                              {item.marker.label}
                            </span>
                          </span>
                        </p>
                      )}
                    </div>

                    <div
                      className={cn(
                        "relative aspect-4/3 overflow-hidden rounded-2xl border border-ink/8",
                        item.contain ? "bg-white p-6" : "shadow-[0_24px_50px_-35px_rgba(7,23,17,0.5)]"
                      )}
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 17rem"
                        loading={i === 0 ? "eager" : "lazy"}
                        className={cn(
                          "transition-transform duration-[1100ms] ease-out",
                          item.contain ? "object-contain p-5" : "object-cover"
                        )}
                      />
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
