"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right" | "none";

/**
 * Side-entering reveals sit outside the viewport until they animate in. The
 * `container-page` utility applies `overflow-x: clip` so that pre-animation
 * offset never becomes phantom horizontal scroll.
 *
 * These animate `opacity` and `transform` only. An earlier version also
 * animated `filter: blur(6px) -> blur(0px)`, which the compositor cannot run on
 * its own: every frame re-rasterised the subtree on the main thread, and
 * because the reveals fire on scroll it did that for most of the page. It also
 * left body copy illegible for the first few hundred milliseconds — bad for
 * readers on a slow phone, and worse for crawlers and agents that screenshot.
 */
/**
 * The horizontal offsets are 18px, not the 28px their vertical siblings use,
 * and that ceiling is deliberate: `container-page` clips at its padding edge,
 * which is 20px below 768px and 32px below 1280px. At the old 34px a
 * side-entering block hung past that edge for the length of its animation and
 * the clip sliced a word in half — "…thousands o | f partner locations…" — at
 * every width under 1280px. 18px stays inside the tightest padding, so the
 * slide-in still reads as one and nothing is ever amputated mid-flight.
 */
const offsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 28 },
  down: { x: 0, y: -28 },
  left: { x: 18, y: 0 },
  right: { x: -18, y: 0 },
  none: { x: 0, y: 0 },
};

/**
 * The hidden half of a reveal is a client-only subtraction from the finished
 * page — it is never rendered by the server. Shipping `opacity: 0` in the HTML
 * meant most routes carried almost none of their body copy until an
 * IntersectionObserver fired, and none of it at all without JavaScript, so
 * crawlers, assistants and anything screenshotting above the fold saw a blank
 * page. `initial={false}` mounts an element at its animate/whileInView target,
 * which is the fully revealed state, so that is what the first paint shows.
 */
let hydrated = false;

/**
 * True for the server render and for the hydration render that has to match it.
 * A mount that happens later — a soft navigation, a section that appears on
 * interaction — has no server HTML to contradict, so it can start hidden and
 * play its entrance in full, exactly as every reveal used to.
 *
 * Exported because several sections animate their own entrances instead of
 * wrapping in `Reveal`, and they need the same gate or their copy goes missing
 * from the server HTML too. Pass the result straight into `initial`:
 * `initial={fromServer ? false : { opacity: 0, y: 16 }}`.
 */
export function useServerRendered() {
  const [fromServer] = useState(() => !hydrated);

  useEffect(() => {
    hydrated = true;
  }, []);

  return fromServer;
}

/**
 * Puts an element back into its hidden state once the client is running, but
 * only while it is entirely outside the viewport. Anything already painted —
 * even a sliver of it — stays put: visible -> hidden -> visible reads as a
 * flash, and losing one entrance animation is the cheaper trade.
 */
function useOffscreenArm(enabled: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el) return;

    const box = el.getBoundingClientRect();
    if (
      box.bottom <= 0 ||
      box.right <= 0 ||
      box.top >= window.innerHeight ||
      box.left >= window.innerWidth
    ) {
      setArmed(true);
    }
  }, [enabled]);

  return [ref, armed] as const;
}

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
  // Used as a JSX tag, the `motion[as]` union makes TS intersect every element's
  // props, so a `ref` would have to satisfy all six element types at once. Only
  // the prop types are narrowed here; the rendered tag is still `as`.
  const Comp = motion[as] as typeof motion.div;
  const fromServer = useServerRendered();
  const [ref, armed] = useOffscreenArm(!reduce);
  const hidden = { opacity: 0, x: off.x, y: off.y };

  return (
    <Comp
      ref={ref}
      className={className}
      initial={fromServer || reduce ? false : hidden}
      // Arming happens off-screen, so it is a state change rather than
      // something to watch: a real duration here could be caught mid-fade by a
      // reader who scrolls the moment the page becomes interactive.
      animate={armed ? { ...hidden, transition: { duration: 0 } } : undefined}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
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
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
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
  const reduce = useReducedMotion();
  const fromServer = useServerRendered();
  const [ref, armed] = useOffscreenArm(!reduce);

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: 0.05 } },
      }}
      // The gate has to be applied by name here, because `RevealItem` inherits
      // both of these through the variant tree: `false` keeps the children out
      // of the server HTML's hidden state too, and arming the parent is what
      // hides them again before they are ever scrolled to.
      initial={fromServer || reduce ? false : "hidden"}
      animate={armed ? "hidden" : undefined}
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
  const fromServer = useServerRendered();
  const words = text.split(" ");
  const keys = new Set((highlight ?? []).map((w) => w.toLowerCase()));
  // Headlines animate on mount rather than on scroll, so there is nothing to
  // arm later: a server-rendered one is already on the page and stays there.
  const rise = fromServer || reduce ? false : { y: "108%", opacity: 0 };

  return (
    <span className={cn("inline-block", className)}>
      {words.map((word, i) => {
        const bare = word.replace(/[^\w'’-]/g, "").toLowerCase();
        return (
          <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <motion.span
              className={cn("inline-block", keys.has(bare) && "text-gradient", wordClassName)}
              initial={rise}
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
