import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function Eyebrow({
  children,
  className,
  tone = "leaf",
}: {
  children: ReactNode;
  className?: string;
  tone?: "leaf" | "sun" | "sky" | "light";
}) {
  const tones = {
    leaf: "text-leaf-deep before:bg-leaf",
    sun: "text-sun before:bg-sun",
    sky: "text-sky before:bg-sky",
    light: "text-leaf-bright before:bg-leaf-bright",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 text-[0.7rem] font-semibold tracking-[0.22em] uppercase",
        "before:h-px before:w-8 before:content-['']",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "dark",
  className,
  children,
  as: As = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
  children?: ReactNode;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow && (
        <Reveal direction="up" duration={0.6}>
          <Eyebrow tone={tone === "light" ? "light" : "leaf"}>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <Reveal direction="up" delay={0.06}>
        <As
          className={cn(
            "text-[clamp(1.9rem,1.1rem+2.6vw,3.4rem)] leading-[1.06]",
            tone === "light" ? "text-white" : "text-ink"
          )}
        >
          {title}
        </As>
      </Reveal>
      {intro && (
        <Reveal direction="up" delay={0.12}>
          <div
            className={cn(
              "max-w-2xl text-[1.0625rem] leading-relaxed",
              align === "center" && "mx-auto",
              tone === "light" ? "text-white/72" : "text-ink/70"
            )}
          >
            {intro}
          </div>
        </Reveal>
      )}
      {children}
    </div>
  );
}
