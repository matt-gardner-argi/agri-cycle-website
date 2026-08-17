"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "sun" | "outline" | "ghost" | "light";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-leaf text-ink shadow-[0_10px_30px_-10px_rgba(141,198,63,0.75)] hover:shadow-[0_16px_40px_-12px_rgba(141,198,63,0.9)]",
  sun: "bg-sun text-ink shadow-[0_10px_30px_-10px_rgba(237,142,32,0.75)] hover:shadow-[0_16px_40px_-12px_rgba(237,142,32,0.9)]",
  outline: "border border-ink/20 text-ink hover:border-leaf hover:bg-leaf/10",
  ghost: "text-ink hover:bg-ink/5",
  light:
    "bg-white/12 text-white border border-white/25 backdrop-blur-md hover:bg-white/20 hover:border-white/45",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-[0.8125rem]",
  md: "h-12 px-6 text-sm",
  lg: "h-14 px-8 text-[0.95rem]",
};

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className,
  withArrow = false,
  type = "button",
  disabled,
  external,
  ariaLabel,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  size?: Size;
  className?: string;
  withArrow?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  external?: boolean;
  ariaLabel?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [shift, setShift] = useState({ x: 0, y: 0 });

  // Gentle magnetic pull toward the cursor — pointer devices only.
  function handleMove(e: MouseEvent) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    setShift({ x: dx * 0.14, y: dy * 0.22 });
  }

  const inner = (
    <motion.span
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => setShift({ x: 0, y: 0 })}
      animate={shift}
      transition={{ type: "spring", stiffness: 320, damping: 22, mass: 0.5 }}
      className={cn(
        "group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold tracking-tight transition-[box-shadow,background-color,border-color,color] duration-300 focus-ring",
        "max-md:!translate-x-0 max-md:!translate-y-0",
        variants[variant],
        sizes[size],
        disabled && "pointer-events-none opacity-50",
        className
      )}
    >
      {/* sheen sweep on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-100 from-transparent via-white/35 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full"
      />
      <span className="relative z-10 whitespace-nowrap">{children}</span>
      {withArrow && (
        <ArrowRight
          aria-hidden
          className="relative z-10 size-4 shrink-0 transition-transform duration-300 group-hover/btn:translate-x-1"
        />
      )}
    </motion.span>
  );

  if (href) {
    if (external || /^(https?:|tel:|mailto:)/.test(href)) {
      return (
        <a
          href={href}
          aria-label={ariaLabel}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          className="inline-flex focus-ring rounded-full"
        >
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} aria-label={ariaLabel} className="inline-flex focus-ring rounded-full">
        {inner}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className="inline-flex focus-ring rounded-full"
    >
      {inner}
    </button>
  );
}
