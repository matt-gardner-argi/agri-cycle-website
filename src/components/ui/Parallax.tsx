"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Image that drifts slowly against the scroll direction inside its frame. */
export function ParallaxImage({
  src,
  alt,
  className,
  imgClassName,
  distance = 70,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  overlay,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  distance?: number;
  priority?: boolean;
  sizes?: string;
  overlay?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-distance / 2, distance / 2]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div style={{ y }} className="absolute -inset-y-[12%] inset-x-0">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn("object-cover", imgClassName)}
        />
      </motion.div>
      {overlay}
    </div>
  );
}

/** Generic scroll-linked vertical drift for any content. */
export function ParallaxLayer({
  children,
  distance = 90,
  className,
}: {
  children: ReactNode;
  distance?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [distance / 2, -distance / 2]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
