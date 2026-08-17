"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { testimonials } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setDir(1);
      setI((v) => (v + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(t);
  }, [paused]);

  function go(step: number) {
    setDir(step);
    setI((v) => (v + step + testimonials.length) % testimonials.length);
  }

  const t = testimonials[i];

  return (
    <section
      className="relative isolate overflow-hidden bg-sky-soft/40 py-20 lg:py-28"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-24 -z-10 size-[26rem] rounded-full bg-sky/20 blur-[110px]"
      />

      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-16">
          <div>
            <Reveal>
              <Eyebrow tone="sky">Testimonials</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-5 text-[clamp(1.8rem,1.2rem+2vw,2.75rem)] leading-[1.08]">
                What partners{" "}
                <span className="font-serif italic">actually say</span>
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink/60">
                Read the full partner profiles for the detail behind these quotes.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-8 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous testimonial"
                  className="grid size-11 cursor-pointer place-items-center rounded-full border border-ink/15 bg-white/70 text-ink transition-all duration-300 hover:border-sky hover:bg-sky/15 focus-ring"
                >
                  <ArrowLeft aria-hidden className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next testimonial"
                  className="grid size-11 cursor-pointer place-items-center rounded-full border border-ink/15 bg-white/70 text-ink transition-all duration-300 hover:border-sky hover:bg-sky/15 focus-ring"
                >
                  <ArrowRight aria-hidden className="size-4" />
                </button>
                <div className="ml-2 flex gap-1.5">
                  {testimonials.map((item, idx) => (
                    <button
                      key={item.name}
                      type="button"
                      aria-label={`Show testimonial from ${item.name}`}
                      onClick={() => {
                        setDir(idx > i ? 1 : -1);
                        setI(idx);
                      }}
                      className={cn(
                        "h-1.5 cursor-pointer rounded-full transition-all duration-400 focus-ring",
                        idx === i ? "w-7 bg-ink" : "w-1.5 bg-ink/25 hover:bg-ink/45"
                      )}
                    />
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} direction="left">
            <div className="relative min-h-[24rem] sm:min-h-[21rem] lg:min-h-[19rem]">
              <AnimatePresence mode="wait" custom={dir}>
                <motion.figure
                  key={t.name}
                  custom={dir}
                  initial={{ opacity: 0, x: dir * 48, filter: "blur(6px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: dir * -48, filter: "blur(6px)" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-3xl border border-ink/10 bg-white p-8 shadow-[0_30px_70px_-50px_rgba(7,23,17,0.5)] sm:p-10"
                >
                  <Quote aria-hidden className="size-8 text-leaf" />
                  <blockquote className="mt-5 font-serif text-[clamp(1.15rem,0.95rem+0.9vw,1.6rem)] leading-[1.45] text-ink">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-7 flex flex-wrap items-end justify-between gap-4 border-t border-ink/8 pt-6">
                    <div>
                      <p className="font-display text-[1.0625rem] font-bold tracking-tight">{t.name}</p>
                      <p className="mt-0.5 text-[0.8125rem] text-ink/55">{t.title}</p>
                      <p className="text-[0.8125rem] font-medium text-leaf-deep">{t.org}</p>
                    </div>
                    <Link
                      href={t.href}
                      className="inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold text-ink/60 underline decoration-1 underline-offset-4 transition-colors hover:text-leaf-deep focus-ring"
                    >
                      Read the partner profile
                      <ArrowRight aria-hidden className="size-3.5" />
                    </Link>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
