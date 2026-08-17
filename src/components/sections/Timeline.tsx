"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { timeline } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 80%"] });
  const height = useTransform(scrollYProgress, [0, 1], reduce ? ["100%", "100%"] : ["0%", "100%"]);

  return (
    <div ref={ref} className="relative">
      {/* Rail */}
      <div
        aria-hidden
        className="absolute top-2 bottom-2 left-[1.375rem] w-px bg-ink/12 sm:left-[1.875rem]"
      >
        <motion.div style={{ height }} className="w-full bg-linear-180 from-leaf via-sun to-sky" />
      </div>

      <ol className="flex flex-col gap-12 sm:gap-16">
        {timeline.map((item, i) => (
          <li key={item.year} className="relative pl-14 sm:pl-20">
            <motion.span
              aria-hidden
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              className="absolute top-1.5 left-0 grid size-11 place-items-center rounded-full border border-ink/10 bg-paper sm:size-15"
            >
              <span className="size-3.5 rounded-full bg-leaf sm:size-4" />
            </motion.span>

            <Reveal direction="up" delay={0.05}>
              <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_16rem] md:items-start md:gap-10">
                <div>
                  <p className="font-display text-[0.8125rem] font-bold tracking-[0.16em] text-sun uppercase">
                    {item.year}
                  </p>
                  <h3 className="mt-2.5 text-[clamp(1.25rem,1rem+1vw,1.85rem)] leading-tight">
                    {item.title}
                  </h3>
                  <p className="mt-4 max-w-2xl text-[0.9375rem] leading-relaxed text-ink/65">
                    {item.body}
                  </p>
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
                    sizes="(max-width: 768px) 100vw, 16rem"
                    priority={i === 0}
                    className={cn(
                      "transition-transform duration-[1100ms] ease-out",
                      item.contain ? "object-contain p-5" : "object-cover hover:scale-106"
                    )}
                  />
                </div>
              </div>
            </Reveal>

            {i < timeline.length - 1 && <span aria-hidden className="sr-only">next</span>}
          </li>
        ))}
      </ol>
    </div>
  );
}
