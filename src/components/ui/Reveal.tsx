"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right" | "none";

/**
 * Side-entering reveals sit outside the viewport until they animate in. The
 * `container-page` utility applies `overflow-x: clip` so that pre-animation
 * offset never becomes phantom horizontal scroll.
 */
const offsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 28 },
  down: { x: 0, y: -28 },
  left: { x: 34, y: 0 },
  right: { x: -34, y: 0 },
  none: { x: 0, y: 0 },
};

export function Reveal({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.7,
  once = true,
  as = "div",
  amount = 0.25,
}: {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
  duration?: number;
  once?: boolean;
  as?: "div" | "section" | "li" | "span" | "header" | "article";
  amount?: number;
}) {
  const reduce = useReducedMotion();
  const off = reduce ? offsets.none : offsets[direction];
  const Comp = motion[as];

  return (
    <Comp
      className={className}
      initial={{ opacity: 0, x: off.x, y: off.y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
      viewport={{ once, amount }}
      transition={{
        duration: reduce ? 0 : duration,
        delay: reduce ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </Comp>
  );
}

/** Wraps a group so children with `RevealItem` stagger in together. */
const groupVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(5px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

export function RevealGroup({
  children,
  className,
  amount = 0.15,
  stagger = 0.09,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
  stagger?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: 0.05 } },
      }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article" | "span";
}) {
  const Comp = motion[as];
  return (
    <Comp className={className} variants={itemVariants}>
      {children}
    </Comp>
  );
}

export { groupVariants, itemVariants };

/** Headline that reveals word by word. */
export function WordReveal({
  text,
  className,
  wordClassName,
  delay = 0,
  highlight,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  /** Words (case-insensitive, punctuation-trimmed) rendered in the accent colour. */
  highlight?: string[];
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const keys = new Set((highlight ?? []).map((w) => w.toLowerCase()));

  return (
    <span className={cn("inline-block", className)}>
      {words.map((word, i) => {
        const bare = word.replace(/[^\w'’-]/g, "").toLowerCase();
        return (
          <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <motion.span
              className={cn("inline-block", keys.has(bare) && "text-gradient", wordClassName)}
              initial={{ y: reduce ? 0 : "108%", opacity: reduce ? 1 : 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: reduce ? 0 : 0.85,
                delay: reduce ? 0 : delay + i * 0.075,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {word}
            </motion.span>
            {i < words.length - 1 && <span className="inline-block">&nbsp;</span>}
          </span>
        );
      })}
    </span>
  );
}
