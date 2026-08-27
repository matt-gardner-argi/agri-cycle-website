"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { MoveHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Drag-to-compare slider showing the farm then and now.
 *
 * The handle used to sit on top of a 48px-wide invisible `<input type="range">`
 * that swallowed the press. Grabbing the handle — the one obvious thing to do —
 * therefore mapped 48 pixels of travel onto the full 2–98% range, so the divider
 * leapt across the photo and the whole control felt broken. The range input is
 * now keyboard-only and out of the pointer's way; pointer handling belongs to
 * the frame, which supports press-anywhere-to-jump as well as drag.
 */
export function BeforeAfter({
  before = "/img/site/farm-then.png",
  after = "/img/site/farm-now.png",
  beforeLabel = "Then",
  afterLabel = "Now",
}: {
  before?: string;
  after?: string;
  beforeLabel?: string;
  afterLabel?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(52);
  const [dragging, setDragging] = useState(false);
  const [touched, setTouched] = useState(false);
  const reduce = useReducedMotion();

  const update = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const pct = ((clientX - r.left) / r.width) * 100;
    setPos(Math.min(98, Math.max(2, pct)));
  }, []);

  const nudge = useCallback((delta: number) => {
    setTouched(true);
    setPos((p) => Math.min(98, Math.max(2, p + delta)));
  }, []);

  // A one-off wiggle the first time the control scrolls into view, so the
  // "this is draggable" affordance does not depend on reading the caption.
  const [hinted, setHinted] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduce || touched) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHinted(true);
          io.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce, touched]);

  return (
    <figure className="m-0">
      <div
        ref={ref}
        onPointerDown={(e) => {
          setTouched(true);
          setDragging(true);
          e.currentTarget.setPointerCapture(e.pointerId);
          update(e.clientX);
        }}
        onPointerMove={(e) => dragging && update(e.clientX)}
        onPointerUp={() => setDragging(false)}
        onPointerCancel={() => setDragging(false)}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            nudge(e.shiftKey ? -10 : -4);
          }
          if (e.key === "ArrowRight") {
            e.preventDefault();
            nudge(e.shiftKey ? 10 : 4);
          }
          if (e.key === "Home") {
            e.preventDefault();
            setPos(2);
          }
          if (e.key === "End") {
            e.preventDefault();
            setPos(98);
          }
        }}
        role="slider"
        tabIndex={0}
        aria-valuemin={2}
        aria-valuemax={98}
        aria-valuenow={Math.round(pos)}
        aria-valuetext={`${Math.round(pos)}% of the way from the ${afterLabel.toLowerCase()} photograph to the ${beforeLabel.toLowerCase()} photograph`}
        aria-label="Compare the farm then and now"
        className={cn(
          "relative aspect-4/3 w-full touch-none overflow-hidden rounded-[1.5rem] border border-ink/10",
          "bg-ink shadow-[0_34px_70px_-45px_rgba(7,23,17,0.6)] select-none focus-ring",
          // The grab cursor is the affordance that says "this moves".
          dragging ? "cursor-grabbing" : "cursor-grab"
        )}
      >
        <Image
          src={after}
          alt="Stonyvale Farm in Exeter, Maine as it is today"
          fill
          sizes="(max-width: 1024px) 100vw, 45vw"
          className="pointer-events-none object-cover"
        />

        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <Image
            src={before}
            alt="Stonyvale Farm in Exeter, Maine in the early 1900s"
            fill
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover"
          />
        </div>

        {/* Labels */}
        <span className="pointer-events-none absolute top-4 left-4 rounded-full bg-ink/70 px-3 py-1.5 text-[0.7rem] font-bold tracking-[0.14em] text-white uppercase backdrop-blur-sm">
          {beforeLabel}
        </span>
        <span className="pointer-events-none absolute top-4 right-4 rounded-full bg-leaf px-3 py-1.5 text-[0.7rem] font-bold tracking-[0.14em] text-ink uppercase">
          {afterLabel}
        </span>

        {/* Handle */}
        <div
          className="pointer-events-none absolute inset-y-0 w-0.5 bg-white/90 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
          style={{ left: `${pos}%` }}
        >
          <motion.span
            animate={
              hinted && !touched && !reduce
                ? { x: [0, -13, 13, 0], scale: [1, 1.07, 1.07, 1] }
                : { x: 0, scale: 1 }
            }
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
            className="absolute top-1/2 left-1/2 grid size-12 -translate-1/2 place-items-center rounded-full border-2 border-white bg-ink/80 text-white backdrop-blur-sm"
          >
            <MoveHorizontal aria-hidden className="size-5" />
          </motion.span>
        </div>

      </div>

      <figcaption className="mt-4 text-[0.8125rem] leading-relaxed text-ink/55">
        Drag the handle — or press anywhere on the photograph — to move between the two. The Fogler
        family has worked the land in Exeter, Maine since the late 1800s. Today the farm carries over
        2,000 animals and feeds three anaerobic digesters.
      </figcaption>
    </figure>
  );
}
