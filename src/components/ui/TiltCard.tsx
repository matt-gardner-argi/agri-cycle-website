"use client";

import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import type { MouseEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Card that tilts toward the cursor and tracks a light source across its
 * surface. Pointer effects are disabled for touch and reduced-motion users.
 */
export function TiltCard({
  children,
  className,
  intensity = 8,
  glare = true,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
  glare?: boolean;
}) {
  const reduce = useReducedMotion();
  const rx = useSpring(0, { stiffness: 220, damping: 24 });
  const ry = useSpring(0, { stiffness: 220, damping: 24 });
  const mx = useMotionValue(50);
  const my = useMotionValue(50);

  const glareBg = useMotionTemplate`radial-gradient(22rem 22rem at ${mx}% ${my}%, rgba(255,255,255,0.28), transparent 65%)`;

  function onMove(e: MouseEvent<HTMLDivElement>) {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * intensity * 2);
    rx.set(-(py - 0.5) * intensity * 2);
    mx.set(px * 100);
    my.set(py * 100);
  }

  function onLeave() {
    rx.set(0);
    ry.set(0);
    mx.set(50);
    my.set(50);
  }

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d", perspective: 1200 }}
      className={cn("relative", className)}
    >
      {children}
      {glare && (
        <motion.span
          aria-hidden
          style={{ background: glareBg }}
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 hover:opacity-100 md:group-hover:opacity-100"
        />
      )}
    </motion.div>
  );
}
