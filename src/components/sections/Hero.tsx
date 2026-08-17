"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowDown, Recycle } from "lucide-react";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { WordReveal } from "@/components/ui/Reveal";

/** Decorative organic shapes that drift behind the headline. */
const blobs = [
  { size: 460, top: "-8%", left: "-6%", color: "var(--color-leaf)", delay: 0 },
  { size: 380, top: "44%", right: "-8%", color: "var(--color-sky)", delay: 1.4 },
  { size: 300, bottom: "-12%", left: "34%", color: "var(--color-sun)", delay: 2.6 },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const bgY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "22%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.06, 1.22]);
  const contentY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 110]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[min(92svh,54rem)] items-center overflow-hidden bg-ink pt-14 pb-24 sm:pt-20 lg:min-h-[min(94svh,58rem)]"
    >
      {/* Photographic base layer */}
      <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0 -z-30">
        <Image
          src="/img/hero/apple-core.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Tint + vignette so the type always has contrast */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-linear-160 from-ink/92 via-ink/75 to-moss/60"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-[radial-gradient(120%_80%_at_20%_20%,transparent,rgba(7,23,17,0.82))]"
      />

      {/* Colour blobs */}
      {blobs.map((b, i) => (
        <motion.span
          key={i}
          aria-hidden
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 1.6, delay: 0.2 + i * 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: b.size,
            height: b.size,
            top: b.top,
            left: b.left,
            right: b.right,
            bottom: b.bottom,
            background: b.color,
            animationDelay: `${b.delay}s`,
          }}
          className="pointer-events-none absolute -z-10 rounded-full blur-[110px] motion-safe:animate-float"
        />
      ))}

      {/* Fine grid to add engineered texture */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.07] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:5.5rem_5.5rem] [mask-image:radial-gradient(70%_60%_at_50%_40%,black,transparent)]"
      />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="container-page relative grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]"
      >
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/18 bg-white/8 py-2 pr-4 pl-2 text-[0.75rem] font-medium text-white/80 backdrop-blur-md"
          >
            <span className="grid size-6 place-items-center rounded-full bg-leaf text-ink">
              <Recycle aria-hidden className="size-3.5" />
            </span>
            The premier organics recycling service in the U.S.
          </motion.div>

          <h1 className="font-display text-[clamp(2.9rem,1.4rem+7.4vw,6.5rem)] leading-[0.94] font-bold tracking-[-0.055em] text-white">
            <WordReveal text="You've got" delay={0.15} />
            <br />
            <WordReveal text="the power." delay={0.34} highlight={["power"]} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.62, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-white/72 sm:text-lg"
          >
            {site.description} Our priority is to support our partners in reducing and donating food
            before collection — when we say{" "}
            <span className="font-semibold text-leaf-bright">&ldquo;Food Full Circle&rdquo;</span> we
            mean it.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.76, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex flex-wrap items-center gap-3.5"
          >
            <Button href="/services" size="lg" withArrow>
              Explore services
            </Button>
            <Button href="/quote" size="lg" variant="light">
              Request a Quote
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-9 text-[0.8125rem] text-white/45"
          >
            Join the thousands of businesses who look to Agri-Cycle to achieve their sustainability
            goals.
          </motion.p>
        </div>

        {/* Floating stat cards — hidden on small screens to keep the hero tight */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="relative hidden lg:block"
        >
          <div className="relative aspect-4/5 w-full max-w-md justify-self-end overflow-hidden rounded-[2rem] border border-white/15 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.8)]">
            <Image
              src="/img/site/truck-69.jpg"
              alt="An Agri-Cycle collection truck on route"
              fill
              sizes="(min-width: 1024px) 28rem, 100vw"
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-0 from-ink/85 via-transparent to-transparent" />
            <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/15 bg-ink/55 p-5 backdrop-blur-lg">
              <p className="font-display text-4xl font-bold tracking-tight text-white">2,400+</p>
              <p className="mt-1 text-[0.8125rem] text-white/65">
                collection locations across 14 states
              </p>
            </div>
          </div>

          <motion.div
            animate={reduce ? {} : { y: [0, -14, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-8 -left-6 w-56 rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-xl"
          >
            <p className="font-display text-3xl font-bold text-leaf-bright">70,000</p>
            <p className="mt-1 text-[0.75rem] leading-snug text-white/70">
              kWh generated daily at our sister facility in Exeter, Maine
            </p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.8 }}
        className="absolute inset-x-0 bottom-6 flex justify-center"
      >
        <Link
          href="#news"
          aria-label="Scroll to content"
          className="group flex flex-col items-center gap-2 text-[0.65rem] font-semibold tracking-[0.22em] text-white/45 uppercase transition-colors hover:text-leaf-bright focus-ring"
        >
          Scroll
          <motion.span
            animate={reduce ? {} : { y: [0, 7, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown aria-hidden className="size-4" />
          </motion.span>
        </Link>
      </motion.div>
    </section>
  );
}
