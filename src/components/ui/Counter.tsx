"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { formatNumber } from "@/lib/utils";

/** Counts up to `value` the first time it scrolls into view. */
export function Counter({
  value,
  digits = 0,
  prefix = "",
  suffix = "",
  duration = 1.6,
  raw = false,
  className,
}: {
  value: number;
  digits?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  /** Skip thousands separators — used for year values. */
  raw?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const [animated, setAnimated] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: setAnimated,
    });
    return () => controls.stop();
  }, [inView, value, duration, reduce]);

  // With motion reduced we never animate, so read the target straight through
  // rather than syncing it into state.
  const display = reduce ? value : animated;
  const text = raw ? String(Math.round(display)) : formatNumber(display, digits);

  return (
    <span ref={ref} className={className}>
      {prefix}
      <span className="tabular-nums">{text}</span>
      {suffix}
    </span>
  );
}
