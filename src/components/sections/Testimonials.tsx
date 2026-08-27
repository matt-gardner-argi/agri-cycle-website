"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { ArrowRight, Quote, X } from "lucide-react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { testimonials, type Testimonial } from "@/content/site";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Testimonials as a continuous scrolling strip rather than a one-at-a-time
 * carousel: every partner is on screen within a few seconds instead of behind
 * an eight-second timer, which is what makes the cross-section read as a
 * cross-section.
 *
 * Cards carry a verbatim excerpt; the full quote opens in a dialog. The strip
 * pauses on hover and on keyboard focus, so nothing moves while it is being
 * read.
 */
export function Testimonials() {
  const [open, setOpen] = useState<Testimonial | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);

  /**
   * `aria-modal="true"` is a promise: while this is open, nothing behind it
   * exists. Keep the promise — Escape closes, the page behind goes `inert`, and
   * focus returns to the card button that opened it.
   */
  useEffect(() => {
    if (!open) return;

    const dialog = dialogRef.current;
    // The scrim is deliberately spared: `inert` blocks pointer events too, and
    // marking it would kill click-outside-to-close.
    const backdrop = Array.from(dialog?.parentElement?.children ?? []).filter(
      (el): el is HTMLElement =>
        el instanceof HTMLElement && !el.contains(dialog) && el !== scrimRef.current && !el.inert,
    );
    backdrop.forEach((el) => (el.inert = true));

    const previouslyFocused = openerRef.current;
    const bodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(null);
    }
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      backdrop.forEach((el) => (el.inert = false));
      document.body.style.overflow = bodyOverflow;
      previouslyFocused?.focus({ preventScroll: true });
    };
  }, [open]);

  // Wrap Tab at the dialog's edges so focus cannot walk out into the strip.
  function trapTab(e: ReactKeyboardEvent<HTMLDivElement>) {
    if (e.key !== "Tab" || !dialogRef.current) return;
    const stops = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
    if (!stops.length) return;
    const [first] = stops;
    const last = stops[stops.length - 1];
    if (document.activeElement !== (e.shiftKey ? first : last)) return;
    e.preventDefault();
    (e.shiftKey ? last : first).focus();
  }

  return (
    <section className="relative isolate overflow-hidden bg-sky-soft/40 py-20 lg:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-24 -z-10 size-[26rem] rounded-full bg-sky/20 blur-[110px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-0 -z-10 size-[24rem] rounded-full bg-sun/12 blur-[120px]"
      />

      <div className="container-page">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow tone="sky">Testimonials</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-5 text-[clamp(1.8rem,1.2rem+2vw,2.75rem)] leading-[1.08]">
              What partners <span className="font-serif italic">actually say</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink/60">
              Grocers, colleges, hotels and food banks. Every quote below links to the partner
              profile it came from.
            </p>
          </Reveal>
        </div>
      </div>

      <Reveal delay={0.16}>
        <div className="mt-12 [--marquee-gap:1.25rem]">
          <Marquee slow>
            {testimonials.map((t) => (
              <QuoteCard
                key={t.name}
                t={t}
                onOpen={(btn) => {
                  openerRef.current = btn;
                  setOpen(t);
                }}
              />
            ))}
          </Marquee>
        </div>
      </Reveal>

      <div className="container-page mt-10">
        <p className="text-[0.8125rem] text-ink/45">
          The strip pauses when you hover it. Select a quote to read it in full.
        </p>
      </div>

      {/*
        Portalled to <body> on purpose. The section sets `isolate`, which makes
        a stacking context — inside it the overlay's z-[80] is scoped to the
        section, and the sticky header (z-50 at the root) painted straight over
        the dialog and swallowed clicks meant for the scrim. At the body it also
        sits alongside <header>/<main>/<footer>, which is what the `inert` sweep
        above needs in order to reach them.
      */}
      {open &&
        createPortal(
          <AnimatePresence>
            {open && (
              <>
                <motion.div
                  ref={scrimRef}
                  aria-hidden
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setOpen(null)}
                  className="fixed inset-0 z-[80] bg-ink/70 backdrop-blur-sm"
                />
                <motion.div
                  ref={dialogRef}
                  onKeyDown={trapTab}
                  role="dialog"
                  aria-modal="true"
                  aria-label={`Testimonial from ${open.name}, ${open.org}`}
                  initial={{ opacity: 0, y: 18, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.98 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="fixed inset-x-4 top-[10svh] z-[85] mx-auto max-h-[80svh] w-[min(42rem,calc(100vw-2rem))] overflow-y-auto overscroll-contain rounded-3xl bg-paper p-8 shadow-2xl sm:p-10"
                >
                  <div className="flex items-start justify-between gap-6">
                    <Quote aria-hidden className="size-8 shrink-0 text-leaf" />
                    <button
                      type="button"
                      onClick={() => setOpen(null)}
                      aria-label="Close"
                      autoFocus
                      className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-full border border-ink/12 transition-colors hover:bg-ink/5 focus-ring"
                    >
                      <X aria-hidden className="size-5" />
                    </button>
                  </div>
                  <blockquote className="mt-5 font-serif text-[clamp(1.1rem,0.95rem+0.7vw,1.45rem)] leading-[1.5] text-ink">
                    &ldquo;{open.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-7 flex flex-wrap items-end justify-between gap-4 border-t border-ink/8 pt-6">
                    <div>
                      <p className="font-display text-[1.0625rem] font-bold tracking-tight">
                        {open.name}
                      </p>
                      <p className="mt-0.5 text-[0.8125rem] text-ink/55">{open.title}</p>
                      <p className="text-[0.8125rem] font-medium text-leaf-deep">{open.org}</p>
                    </div>
                    <Link
                      href={open.href}
                      className="inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold text-ink/60 underline decoration-1 underline-offset-4 transition-colors hover:text-leaf-deep focus-ring"
                    >
                      Read the partner profile
                      <ArrowRight aria-hidden className="size-3.5" />
                    </Link>
                  </figcaption>
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </section>
  );
}

function QuoteCard({ t, onOpen }: { t: Testimonial; onOpen: (opener: HTMLButtonElement) => void }) {
  return (
    <figure className="mx-2.5 flex w-[19rem] shrink-0 flex-col rounded-3xl border border-ink/10 bg-white p-7 shadow-[0_24px_60px_-48px_rgba(7,23,17,0.5)] sm:w-[24rem]">
      <Quote aria-hidden className="size-6 shrink-0 text-leaf" />
      <blockquote className="mt-4 flex-1 font-serif text-[1.0625rem] leading-[1.5] text-ink sm:text-[1.15rem]">
        &ldquo;{t.pull}&rdquo;
      </blockquote>
      <figcaption className="mt-6 border-t border-ink/8 pt-5">
        <p className="font-display text-[0.9375rem] font-bold tracking-tight">{t.name}</p>
        <p className="mt-0.5 text-[0.8125rem] text-ink/55">{t.title}</p>
        <p className="text-[0.8125rem] font-medium text-leaf-deep">{t.orgShort}</p>
        <button
          type="button"
          onClick={(e) => onOpen(e.currentTarget)}
          className="mt-4 inline-flex cursor-pointer items-center gap-1.5 text-[0.8125rem] font-semibold text-ink/60 underline decoration-1 underline-offset-4 transition-colors hover:text-leaf-deep focus-ring"
        >
          Read the full quote
          <ArrowRight aria-hidden className="size-3.5" />
        </button>
      </figcaption>
    </figure>
  );
}
