"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Thin gradient bar pinned to the top of the viewport tracking page scroll. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const width = useSpring(scrollYProgress, { stiffness: 240, damping: 34, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX: width }}
      className="fixed top-0 left-0 z-[90] h-[3px] w-full origin-left bg-linear-90 from-leaf via-sky to-sun"
    />
  );
}
