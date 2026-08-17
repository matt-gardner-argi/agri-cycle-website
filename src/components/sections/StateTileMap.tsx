"use client";

import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { ExternalLink, Info, Search } from "lucide-react";
import { banLevels, banTypes, stateTiles, type BanLevel } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

const levelStyles: Record<BanLevel, { tile: string; text: string; badge: string }> = {
  universal: {
    tile: "bg-leaf-deep border-leaf-deep hover:bg-moss",
    text: "text-white",
    badge: "bg-leaf-deep text-white",
  },
  commercial: {
    tile: "bg-leaf border-leaf hover:bg-leaf-deep hover:text-white",
    text: "text-ink",
    badge: "bg-leaf text-ink",
  },
  local: {
    tile: "bg-sky/85 border-sky hover:bg-sky",
    text: "text-ink",
    badge: "bg-sky text-ink",
  },
  none: {
    tile: "bg-clay/70 border-clay hover:bg-clay",
    text: "text-ink/55",
    badge: "bg-clay text-ink/70",
  },
};

const ROWS = 8;
const COLS = 11;

export function StateTileMap({ heading = true }: { heading?: boolean }) {
  const [selected, setSelected] = useState<string | null>("VT");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<BanLevel | "all">("all");

  const byCode = useMemo(() => {
    const m = new Map(stateTiles.map((s) => [s.code, s]));
    return m;
  }, []);

  const grid = useMemo(() => {
    const g: (typeof stateTiles)[number][][] = Array.from({ length: ROWS }, () => []);
    for (const s of stateTiles) g[s.row - 1].push(s);
    return g;
  }, []);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    return new Set(
      stateTiles
        .filter((s) => s.name.toLowerCase().includes(q) || s.code.toLowerCase() === q)
        .map((s) => s.code)
    );
  }, [query]);

  const active = selected ? byCode.get(selected) : undefined;
  const counts = useMemo(() => {
    const c: Record<string, number> = { universal: 0, commercial: 0, local: 0, none: 0 };
    for (const s of stateTiles) c[s.level] += 1;
    return c;
  }, []);

  function isDimmed(code: string, level: BanLevel) {
    if (matches && !matches.has(code)) return true;
    if (filter !== "all" && level !== filter) return true;
    return false;
  }

  return (
    <section className="relative isolate overflow-hidden bg-sky-soft/45 py-20 lg:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-0 -z-10 size-[30rem] rounded-full bg-sky/18 blur-[120px]"
      />

      <div className="container-page">
        {heading && (
          <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
            <div>
              <Reveal>
                <Eyebrow tone="sky">Service area</Eyebrow>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="mt-5 text-[clamp(2rem,1.2rem+2.8vw,3.4rem)] leading-[1.05]">
                  Maine to <span className="font-serif italic">California</span>
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-ink/70">
                  Agri-Cycle provides services to all food waste producers throughout the United
                  States. Curious about how we can help you achieve your food waste recycling goals?
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.18}>
              <div className="rounded-2xl border border-ink/10 bg-white/70 p-6 backdrop-blur-sm lg:justify-self-end">
                <p className="font-display text-lg font-bold tracking-tight">
                  Does your state have a food-waste ban?
                </p>
                <p className="mt-2 text-[0.875rem] leading-relaxed text-ink/60">
                  Tap a state to find out. Regardless of your state&apos;s laws, diverting scraps from
                  landfill disposal reduces your trash and trash fees, cuts greenhouse gases, and
                  creates renewable energy and farm products.
                </p>
              </div>
            </Reveal>
          </div>
        )}

        {/* Controls */}
        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full max-w-xs">
              <Search
                aria-hidden
                className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-ink/35"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  const q = e.target.value.trim().toLowerCase();
                  const hit = stateTiles.find(
                    (s) => s.name.toLowerCase().startsWith(q) || s.code.toLowerCase() === q
                  );
                  if (q && hit) setSelected(hit.code);
                }}
                placeholder="Find your state"
                aria-label="Find your state"
                className="h-11 w-full rounded-full border border-ink/12 bg-white pr-4 pl-11 text-sm text-ink placeholder:text-ink/40 focus:border-leaf focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setFilter("all")}
                className={cn(
                  "cursor-pointer rounded-full border px-3.5 py-2 text-[0.75rem] font-semibold transition-colors focus-ring",
                  filter === "all"
                    ? "border-ink bg-ink text-white"
                    : "border-ink/15 bg-white/70 text-ink/65 hover:border-ink/35"
                )}
              >
                All 51 ({stateTiles.length})
              </button>
              {(Object.keys(banLevels) as BanLevel[]).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setFilter(filter === lvl ? "all" : lvl)}
                  aria-pressed={filter === lvl}
                  className={cn(
                    "flex cursor-pointer items-center gap-2 rounded-full border px-3.5 py-2 text-[0.75rem] font-semibold transition-colors focus-ring",
                    filter === lvl
                      ? "border-ink bg-ink text-white"
                      : "border-ink/15 bg-white/70 text-ink/65 hover:border-ink/35"
                  )}
                >
                  <span
                    aria-hidden
                    className="size-2.5 rounded-[3px]"
                    style={{ background: banLevels[lvl].color }}
                  />
                  {banLevels[lvl].label}
                  <span className="text-ink/35">{counts[lvl]}</span>
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-12">
          {/* Tile grid */}
          <Reveal delay={0.24}>
            <div
              className="w-full overflow-x-auto pb-2"
              role="group"
              aria-label="United States organics policy tile map"
            >
              <div className="grid min-w-[30rem] gap-1.5 sm:gap-2">
                {grid.map((row, ri) => (
                  <div
                    key={ri}
                    className="grid gap-1.5 sm:gap-2"
                    style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
                  >
                    {Array.from({ length: COLS }, (_, ci) => {
                      const tile = row.find((t) => t.col === ci + 1);
                      if (!tile) return <span key={ci} aria-hidden className="aspect-square" />;
                      const st = levelStyles[tile.level];
                      const isSel = selected === tile.code;
                      const dim = isDimmed(tile.code, tile.level);
                      return (
                        <motion.button
                          key={tile.code}
                          type="button"
                          onClick={() => setSelected(tile.code)}
                          onMouseEnter={() => setSelected(tile.code)}
                          onFocus={() => setSelected(tile.code)}
                          aria-label={`${tile.name}: ${banLevels[tile.level].label}`}
                          aria-pressed={isSel}
                          initial={{ opacity: 0, scale: 0.6 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.4,
                            delay: (ri * COLS + ci) * 0.006,
                            ease: [0.34, 1.56, 0.64, 1],
                          }}
                          whileHover={{ scale: 1.12, zIndex: 5 }}
                          className={cn(
                            "relative grid aspect-square cursor-pointer place-items-center rounded-[0.45rem] border text-[0.62rem] font-bold tracking-tight transition-all duration-300 focus-ring sm:rounded-lg sm:text-[0.72rem]",
                            st.tile,
                            st.text,
                            dim && "opacity-25 saturate-50",
                            isSel && !dim && "ring-2 ring-ink ring-offset-2 ring-offset-sky-soft/45"
                          )}
                        >
                          {tile.code}
                        </motion.button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Detail card */}
          <Reveal delay={0.28}>
            <div className="lg:sticky lg:top-28">
              <div className="rounded-3xl border border-ink/10 bg-white p-7 shadow-[0_28px_60px_-40px_rgba(7,23,17,0.45)]">
                <AnimatePresence mode="wait">
                  {active ? (
                    <motion.div
                      key={active.code}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-display text-[2rem] leading-none font-bold tracking-tight">
                            {active.name}
                          </p>
                          <span
                            className={cn(
                              "mt-3 inline-block rounded-full px-3 py-1 text-[0.7rem] font-semibold",
                              levelStyles[active.level].badge
                            )}
                          >
                            {banLevels[active.level].label}
                          </span>
                        </div>
                        <span
                          aria-hidden
                          className="grid size-14 shrink-0 place-items-center rounded-xl font-display text-lg font-bold"
                          style={{
                            background: banLevels[active.level].color,
                            color: active.level === "universal" ? "#fff" : "var(--color-ink)",
                          }}
                        >
                          {active.code}
                        </span>
                      </div>

                      <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink/70">
                        {active.note ?? banLevels[active.level].short + "."}
                      </p>

                      {active.level === "none" && (
                        <p className="mt-4 rounded-xl bg-cream/70 p-4 text-[0.8125rem] leading-relaxed text-ink/65">
                          No mandate doesn&apos;t mean no upside — diversion still cuts your trash
                          volume, your trash fees and your emissions. We serve producers here too.
                        </p>
                      )}

                      <div className="mt-6 flex flex-wrap gap-3">
                        <Button href="/quote" size="sm" withArrow>
                          Get a quote
                        </Button>
                        <Button href="/contact" size="sm" variant="outline">
                          Ask about {active.code}
                        </Button>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>

              <p className="mt-5 flex items-start gap-2.5 text-[0.75rem] leading-relaxed text-ink/50">
                <Info aria-hidden className="mt-0.5 size-3.5 shrink-0" />
                <span>
                  Tile positions are stylised, not geographic. Organics policy changes often and
                  thresholds vary by facility distance and generator size — confirm current rules with
                  your state, or check the{" "}
                  <a
                    href="https://policyfinder.refed.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-medium text-leaf-deep underline decoration-1 underline-offset-2 hover:text-sun"
                  >
                    ReFED Policy Finder
                    <ExternalLink aria-hidden className="size-3" />
                  </a>
                  , produced with the Food Law and Policy Clinic of Harvard University.
                </span>
              </p>
            </div>
          </Reveal>
        </div>

        {/* Ban types */}
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {banTypes.map((t, i) => (
            <Reveal key={t.title} delay={0.08 * i}>
              <div className="h-full rounded-2xl border border-ink/10 bg-white/60 p-6 backdrop-blur-sm transition-colors hover:border-sky/50 hover:bg-white">
                <p className="font-display text-[1.0625rem] leading-snug font-bold tracking-tight">
                  {t.title}
                </p>
                <p className="mt-3 text-[0.875rem] leading-relaxed text-ink/60">{t.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
