"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Progress bar for long-form article pages, sitting just under the header. */
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scale = useSpring(scrollYProgress, { stiffness: 220, damping: 32, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX: scale }}
      className="fixed top-0 left-0 z-[95] h-1 w-full origin-left bg-leaf"
    />
  );
}
