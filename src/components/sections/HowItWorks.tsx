"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { howItWorks } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/**
 * Four alternating steps with a scroll-linked spine that fills as the reader
 * moves through the section.
 */
export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 65%", "end 65%"],
  });
  const height = useTransform(scrollYProgress, [0, 1], reduce ? ["100%", "100%"] : ["0%", "100%"]);

  return (
    <div ref={ref} className="relative">
      {/* Spine — desktop only */}
      <div
        aria-hidden
        className="absolute top-0 bottom-0 left-1/2 hidden w-px -translate-x-1/2 bg-ink/10 lg:block"
      >
        <motion.div style={{ height }} className="w-full bg-linear-180 from-leaf via-sky to-sun" />
      </div>

      <div className="flex flex-col gap-16 lg:gap-24">
        {howItWorks.map((step, i) => {
          const flip = i % 2 === 1;
          return (
            <div
              key={step.step}
              className="relative grid items-center gap-8 lg:grid-cols-2 lg:gap-16"
            >
              {/* Spine node */}
              <div
                aria-hidden
                className="absolute top-1/2 left-1/2 hidden -translate-1/2 lg:block"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                  className="grid size-14 place-items-center rounded-full border border-ink/10 bg-paper font-display text-sm font-bold text-leaf-deep shadow-[0_8px_24px_-12px_rgba(7,23,17,0.4)]"
                >
                  {step.step}
                </motion.span>
              </div>

              <Reveal
                direction={flip ? "left" : "right"}
                className={cn(flip && "lg:order-2 lg:pl-14", !flip && "lg:pr-14")}
              >
                <div className="relative aspect-16/11 overflow-hidden rounded-[1.5rem] border border-ink/8 shadow-[0_30px_70px_-45px_rgba(7,23,17,0.55)]">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    priority={i === 0}
                    className="object-cover transition-transform duration-[1200ms] ease-out hover:scale-105"
                  />
                  <span
                    aria-hidden
                    className="absolute top-5 left-5 rounded-full bg-ink/70 px-3.5 py-1.5 font-display text-[0.75rem] font-bold tracking-wider text-leaf-bright backdrop-blur-sm lg:hidden"
                  >
                    {step.step}
                  </span>
                </div>
              </Reveal>

              <Reveal
                direction={flip ? "right" : "left"}
                delay={0.08}
                className={cn(flip ? "lg:order-1 lg:pr-14 lg:text-right" : "lg:pl-14")}
              >
                <div>
                  <h3 className="text-[clamp(1.5rem,1.1rem+1.4vw,2.25rem)] leading-tight">
                    {step.title}
                  </h3>
                  <p className="mt-5 text-[1rem] leading-relaxed text-ink/65">{step.body}</p>
                </div>
              </Reveal>
            </div>
          );
        })}
      </div>
    </div>
  );
}
