"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { Apple, Leaf, Package, Sprout, Truck, Waves, Zap } from "lucide-react";
import { cycle } from "@/content/site";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { useServerRendered, Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const icons = {
  apple: Apple,
  truck: Truck,
  package: Package,
  digester: Waves,
  zap: Zap,
  sprout: Sprout,
  leaf: Leaf,
} as const;

const R = 158; // node orbit radius within the 420x420 viewBox
const CENTER = 210;

/**
 * Interactive "Food Full Circle" wheel. Nodes sit on a ring; hovering or
 * tapping one shows its detail in the middle. The ring also auto-advances so
 * the section is alive before any interaction.
 */
export function CycleDiagram() {
  // The wheel's readout and side panel carry the seven-stage explanation; they
  // belong in the server HTML, not only after hydration.
  const fromServer = useServerRendered();
  const [active, setActive] = useState(0);
  const [locked, setLocked] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (locked || reduce) return;
    const t = setInterval(() => setActive((a) => (a + 1) % cycle.length), 3600);
    return () => clearInterval(t);
  }, [locked, reduce]);

  const positions = cycle.map((_, i) => {
    const angle = (i / cycle.length) * Math.PI * 2 - Math.PI / 2;
    return { x: CENTER + Math.cos(angle) * R, y: CENTER + Math.sin(angle) * R };
  });

  const current = cycle[active];
  const CurrentIcon = icons[current.icon as keyof typeof icons];

  return (
    <section className="relative isolate overflow-hidden bg-ink py-20 text-white lg:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -z-10 size-[46rem] -translate-1/2 rounded-full bg-leaf/10 blur-[130px]"
      />

      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Eyebrow tone="light">The Agri-Cycle loop</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-5 text-[clamp(2rem,1.2rem+2.8vw,3.5rem)] leading-[1.05] text-white">
              Food, <span className="font-serif italic">full circle</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-white/65">
              Nothing we collect goes to a landfill or an incinerator. Follow a load of scraps around
              the loop — tap any stage to see what happens.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid items-center gap-12 lg:mt-20 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16">
          {/* The wheel */}
          <div className="relative mx-auto w-full max-w-[34rem]">
            <svg viewBox="0 0 420 420" className="w-full overflow-visible" role="img" aria-hidden>
              <defs>
                <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="var(--color-leaf)" />
                  <stop offset="50%" stopColor="var(--color-sky)" />
                  <stop offset="100%" stopColor="var(--color-sun)" />
                </linearGradient>
              </defs>

              <circle cx={CENTER} cy={CENTER} r={R} fill="none" stroke="rgba(255,255,255,0.09)" strokeWidth="1.5" />
              <circle
                cx={CENTER}
                cy={CENTER}
                r={R}
                fill="none"
                stroke="url(#ringGrad)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="22 14"
                className="motion-safe:[animation:dash-flow_26s_linear_infinite]"
                opacity="0.85"
              />
              <circle
                cx={CENTER}
                cy={CENTER}
                r={R - 26}
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="1"
                strokeDasharray="3 9"
              />

              {/* Connector from the active node to the centre. Motion needs the
                  animated SVG attributes declared in `initial` as well, or the
                  first frame renders them undefined. */}
              <motion.line
                x1={CENTER}
                y1={CENTER}
                stroke="var(--color-leaf)"
                strokeWidth="1.5"
                strokeDasharray="4 6"
                initial={{ x2: positions[0].x, y2: positions[0].y }}
                animate={{ x2: positions[active].x, y2: positions[active].y }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                opacity="0.5"
              />
            </svg>

            {/* Node buttons layered over the svg */}
            {cycle.map((node, i) => {
              const Icon = icons[node.icon as keyof typeof icons];
              const isActive = i === active;
              const pos = positions[i];
              return (
                <button
                  key={node.key}
                  type="button"
                  onMouseEnter={() => {
                    setActive(i);
                    setLocked(true);
                  }}
                  onMouseLeave={() => setLocked(false)}
                  onFocus={() => {
                    setActive(i);
                    setLocked(true);
                  }}
                  onClick={() => {
                    setActive(i);
                    setLocked(true);
                  }}
                  aria-label={node.label}
                  aria-pressed={isActive}
                  className="absolute -translate-1/2 cursor-pointer focus-ring"
                  style={{ left: `${(pos.x / 420) * 100}%`, top: `${(pos.y / 420) * 100}%` }}
                >
                  <span className="relative grid place-items-center">
                    {isActive && (
                      <span
                        aria-hidden
                        className="absolute size-11 rounded-full bg-leaf/45 motion-safe:animate-pulse-ring sm:size-13"
                      />
                    )}
                    <span
                      className={cn(
                        "relative grid size-11 place-items-center rounded-full border transition-all duration-400 sm:size-13",
                        isActive
                          ? "scale-110 border-leaf bg-leaf text-ink shadow-[0_0_34px_-4px_rgba(141,198,63,0.9)]"
                          : "border-white/18 bg-ink/70 text-white/60 backdrop-blur-sm hover:border-leaf/60 hover:text-leaf-bright"
                      )}
                    >
                      <Icon aria-hidden className="size-5 sm:size-5.5" />
                    </span>
                  </span>
                  <span
                    className={cn(
                      "pointer-events-none absolute top-full left-1/2 mt-2 w-28 -translate-x-1/2 text-center text-[0.65rem] leading-tight font-semibold tracking-wide transition-colors sm:w-32 sm:text-[0.7rem]",
                      isActive ? "text-leaf-bright" : "text-white/40"
                    )}
                  >
                    {node.label}
                  </span>
                </button>
              );
            })}

            {/* Centre readout */}
            <div className="pointer-events-none absolute top-1/2 left-1/2 w-[min(15rem,52%)] -translate-1/2 text-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.key}
                  initial={fromServer ? false : { opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="mx-auto mb-3 grid size-10 place-items-center rounded-full bg-white/10 text-leaf-bright">
                    <CurrentIcon aria-hidden className="size-5" />
                  </span>
                  <p className="font-display text-lg leading-tight font-bold tracking-tight text-white sm:text-xl">
                    {current.label}
                  </p>
                  <p className="mt-1 text-[0.7rem] tracking-[0.2em] text-white/35 uppercase">
                    Stage {active + 1} / {cycle.length}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Detail panel */}
          <div className="lg:min-h-[19rem]">
            <div className="rounded-3xl border border-white/12 bg-white/5 p-7 backdrop-blur-md lg:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.key}
                  initial={fromServer ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="text-[0.7rem] font-semibold tracking-[0.2em] text-leaf-bright uppercase">
                    Stage {String(active + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 text-2xl leading-tight text-white">{current.label}</h3>
                  <p className="mt-4 text-[0.9375rem] leading-relaxed text-white/65">{current.body}</p>
                </motion.div>
              </AnimatePresence>

              {/* Progress pips. A 4px-tall button is an unhittable target on a
                  phone, so the button is a 44px touch target pulled back out of
                  the flow with negative margins — the row still measures 4px and
                  the bar paints exactly where it did. */}
              <div className="mt-7 flex gap-1.5">
                {cycle.map((n, i) => (
                  <button
                    key={n.key}
                    type="button"
                    aria-label={`Show ${n.label}`}
                    onClick={() => {
                      setActive(i);
                      setLocked(true);
                    }}
                    className="group -my-5 flex h-11 flex-1 cursor-pointer items-center focus-visible:outline-none"
                  >
                    {/* The focus ring belongs on the bar, not on the invisible
                        44px box it sits inside — hence outline-none above. */}
                    <span
                      className={cn(
                        "h-1 w-full rounded-full transition-colors duration-300 group-focus-visible:outline-2 group-focus-visible:outline-offset-3 group-focus-visible:outline-leaf",
                        i === active ? "bg-leaf" : "bg-white/15 hover:bg-white/30"
                      )}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
