"use client";

import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { Car, Flame, Home, Info, Leaf, RotateCcw, TreePine, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------------------
   Emission factors. Sources are surfaced to the reader in the assumptions
   panel so the numbers can be checked rather than taken on faith.
--------------------------------------------------------------------------- */
const FACTORS = {
  /** Net MTCO2e avoided per short ton of food waste digested instead of landfilled (EPA WARM). */
  perTonDiverted: 0.53,
  /** Diesel collection vehicle fuel economy, miles per gallon. */
  truckMpg: 6,
  /** kg CO2e per gallon of diesel burned (EPA). */
  kgPerGalDiesel: 10.18,
  /** Electricity generated per short ton of food waste through anaerobic digestion, kWh. */
  kwhPerTon: 130,
  /** MTCO2e per passenger vehicle driven one year (EPA equivalencies). */
  carYear: 4.6,
  /** MTCO2e per US home's annual electricity use (EPA equivalencies). */
  homeElectricityYear: 5.505,
  /** MTCO2e sequestered by one tree seedling grown for 10 years (EPA equivalencies). */
  treeTenYears: 0.06,
  /** kg CO2e per gallon of gasoline burned (EPA). */
  kgPerGalGasoline: 8.887,
  /** Average US household annual electricity consumption, kWh (EIA). */
  kwhPerHomeYear: 10500,
};

type Mode = "regular" | "event";
type Unit = "tons" | "pounds";

export function ImpactCalculator({ tone = "leaf" }: { tone?: "leaf" | "dark" }) {
  const [mode, setMode] = useState<Mode>("regular");
  const [unit, setUnit] = useState<Unit>("tons");
  const [amount, setAmount] = useState(4);
  const [days, setDays] = useState(3);
  const [miles, setMiles] = useState(60);
  const [showAssumptions, setShowAssumptions] = useState(false);

  const results = useMemo(() => {
    const tonsPerPickup = unit === "tons" ? amount : amount / 2000;
    // Regular service is priced as a weekly pickup; an event is a fixed number of days.
    const pickups = mode === "regular" ? 52 : Math.max(1, days);
    const tons = tonsPerPickup * pickups;

    const fromDiversion = tons * FACTORS.perTonDiverted;
    const gallonsSaved = (miles * pickups) / FACTORS.truckMpg;
    const fromTransport = (gallonsSaved * FACTORS.kgPerGalDiesel) / 1000;
    const co2e = fromDiversion + fromTransport;
    const kwh = tons * FACTORS.kwhPerTon;

    return {
      tons,
      pickups,
      co2e,
      fromDiversion,
      fromTransport,
      kwh,
      cars: co2e / FACTORS.carYear,
      homes: kwh / FACTORS.kwhPerHomeYear,
      trees: co2e / FACTORS.treeTenYears,
      gasGallons: (co2e * 1000) / FACTORS.kgPerGalGasoline,
    };
  }, [mode, unit, amount, days, miles]);

  const dark = tone === "dark";
  const period = mode === "regular" ? "per year" : `over ${results.pickups} day${results.pickups === 1 ? "" : "s"}`;

  function reset() {
    setMode("regular");
    setUnit("tons");
    setAmount(4);
    setDays(3);
    setMiles(60);
  }

  const cards = [
    {
      icon: Car,
      value: results.cars,
      digits: results.cars < 10 ? 1 : 0,
      label: "gasoline cars off the road",
      sub: "for a full year",
      accent: "text-sun",
    },
    {
      icon: Home,
      value: results.homes,
      digits: results.homes < 10 ? 1 : 0,
      label: "homes powered",
      sub: "with the electricity generated",
      accent: "text-sky",
    },
    {
      icon: TreePine,
      value: results.trees,
      digits: 0,
      label: "tree seedlings grown",
      sub: "for ten years",
      accent: "text-leaf-bright",
    },
    {
      icon: Flame,
      value: results.gasGallons,
      digits: 0,
      label: "gallons of gasoline",
      sub: "never burned",
      accent: "text-sun-light",
    },
  ];

  return (
    <section
      id="calculator"
      className={cn(
        "relative isolate overflow-hidden py-20 lg:py-28",
        dark ? "bg-ink text-white" : "bg-linear-160 from-leaf-deep via-leaf to-leaf-bright"
      )}
    >
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 -z-10 opacity-[0.09]",
          "[background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:1.6rem_1.6rem]"
        )}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-32 -z-10 size-[34rem] rounded-full bg-white/12 blur-[120px]"
      />

      <div className="container-page">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow tone={dark ? "light" : "light"}>Agri calculator</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h2
              className={cn(
                "mt-5 text-[clamp(2rem,1.2rem+2.8vw,3.4rem)] leading-[1.05]",
                dark ? "text-white" : "text-ink"
              )}
            >
              Calculate your impact
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p
              className={cn(
                "mt-5 text-[1.0625rem] leading-relaxed",
                dark ? "text-white/65" : "text-ink/75"
              )}
            >
              Tell us roughly what you throw away and how far your trash currently travels. We&apos;ll
              show the greenhouse gases you&apos;d avoid by sending it to a digester instead.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-8">
          {/* Inputs */}
          <Reveal delay={0.16}>
            <div
              className={cn(
                "rounded-3xl border p-7 backdrop-blur-md lg:p-8",
                dark ? "border-white/12 bg-white/5" : "border-ink/10 bg-white/85"
              )}
            >
              <p
                className={cn(
                  "font-display text-lg font-bold tracking-tight",
                  dark ? "text-white" : "text-ink"
                )}
              >
                If you used Agri-Cycle for…
              </p>

              <div className="mt-5 grid grid-cols-2 gap-2">
                {(
                  [
                    ["regular", "Regular collection"],
                    ["event", "A one-time event"],
                  ] as [Mode, string][]
                ).map(([m, label]) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMode(m)}
                    aria-pressed={mode === m}
                    className={cn(
                      "relative cursor-pointer rounded-xl border px-4 py-3 text-[0.8125rem] font-semibold transition-colors focus-ring",
                      mode === m
                        ? "border-ink bg-ink text-white"
                        : dark
                          ? "border-white/15 text-white/70 hover:border-white/40"
                          : "border-ink/12 text-ink/65 hover:border-ink/35"
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="mt-7 space-y-7">
                <AnimatePresence initial={false}>
                  {mode === "event" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <Slider
                        label="Duration of event"
                        unit={days === 1 ? "day" : "days"}
                        value={days}
                        min={1}
                        max={30}
                        step={1}
                        onChange={setDays}
                        dark={dark}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div>
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <label
                      htmlFor="amount"
                      className={cn(
                        "text-[0.8125rem] font-semibold",
                        dark ? "text-white/80" : "text-ink/75"
                      )}
                    >
                      Amount collected {mode === "regular" ? "each week" : "each day"}
                    </label>
                    <div
                      className={cn(
                        "flex rounded-full border p-0.5",
                        dark ? "border-white/15" : "border-ink/12"
                      )}
                    >
                      {(["tons", "pounds"] as Unit[]).map((u) => (
                        <button
                          key={u}
                          type="button"
                          onClick={() => {
                            if (u === unit) return;
                            setUnit(u);
                            setAmount(u === "pounds" ? Math.round(amount * 2000) : Math.max(0.5, Math.round((amount / 2000) * 10) / 10));
                          }}
                          aria-pressed={unit === u}
                          className={cn(
                            "cursor-pointer rounded-full px-3 py-1 text-[0.7rem] font-semibold transition-colors focus-ring",
                            unit === u
                              ? dark
                                ? "bg-white text-ink"
                                : "bg-ink text-white"
                              : dark
                                ? "text-white/55"
                                : "text-ink/50"
                          )}
                        >
                          {u}
                        </button>
                      ))}
                    </div>
                  </div>
                  <Slider
                    id="amount"
                    label=""
                    unit={unit}
                    value={amount}
                    min={unit === "tons" ? 0.5 : 100}
                    max={unit === "tons" ? 40 : 60000}
                    step={unit === "tons" ? 0.5 : 100}
                    onChange={setAmount}
                    dark={dark}
                    compact
                  />
                </div>

                <Slider
                  label="Round-trip to your landfill"
                  unit="miles"
                  value={miles}
                  min={5}
                  max={300}
                  step={5}
                  onChange={setMiles}
                  dark={dark}
                />
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button href="/quote" size="md" variant={dark ? "primary" : "sun"} withArrow>
                  Turn this into a quote
                </Button>
                <button
                  type="button"
                  onClick={reset}
                  className={cn(
                    "inline-flex cursor-pointer items-center gap-2 rounded-full px-3 py-2 text-[0.8125rem] font-medium transition-colors focus-ring",
                    dark ? "text-white/55 hover:text-white" : "text-ink/55 hover:text-ink"
                  )}
                >
                  <RotateCcw aria-hidden className="size-3.5" />
                  Reset
                </button>
              </div>
            </div>
          </Reveal>

          {/* Results */}
          <Reveal delay={0.22}>
            <div className="flex h-full flex-col gap-4">
              <div
                className={cn(
                  "rounded-3xl border p-7 lg:p-8",
                  dark ? "border-white/12 bg-white/5" : "border-ink/12 bg-ink text-white"
                )}
              >
                <p className="text-[0.7rem] font-semibold tracking-[0.2em] text-leaf-bright uppercase">
                  You would avoid, {period}
                </p>
                <p className="mt-4 font-display text-[clamp(3rem,2rem+5vw,5.5rem)] leading-[0.9] font-bold tracking-[-0.05em] text-white">
                  <Counter value={results.co2e} digits={results.co2e < 100 ? 1 : 0} />
                  <span className="ml-2 align-top font-sans text-base font-semibold tracking-normal text-leaf-bright sm:text-lg">
                    MT CO₂e
                  </span>
                </p>
                <p className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.8125rem] text-white/55">
                  <span className="inline-flex items-center gap-1.5">
                    <Leaf aria-hidden className="size-3.5 text-leaf" />
                    <Counter value={results.tons} digits={results.tons < 100 ? 1 : 0} /> tons diverted
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Zap aria-hidden className="size-3.5 text-sun" />
                    <Counter value={results.kwh} digits={0} /> kWh generated
                  </span>
                </p>
              </div>

              <div className="grid flex-1 grid-cols-2 gap-4">
                {cards.map((c) => (
                  <div
                    key={c.label}
                    className={cn(
                      "flex flex-col justify-between rounded-2xl border p-5 transition-transform duration-400 hover:-translate-y-1",
                      dark ? "border-white/12 bg-white/5" : "border-ink/10 bg-white/85 backdrop-blur-md"
                    )}
                  >
                    <c.icon aria-hidden className={cn("size-5", dark ? c.accent : "text-leaf-deep")} />
                    <div className="mt-4">
                      <p
                        className={cn(
                          "font-display text-[clamp(1.4rem,1rem+1.6vw,2rem)] leading-none font-bold tracking-tight",
                          dark ? "text-white" : "text-ink"
                        )}
                      >
                        <Counter value={c.value} digits={c.digits} />
                      </p>
                      <p
                        className={cn(
                          "mt-1.5 text-[0.8125rem] leading-snug font-semibold",
                          dark ? "text-white/80" : "text-ink/80"
                        )}
                      >
                        {c.label}
                      </p>
                      <p className={cn("text-[0.75rem]", dark ? "text-white/45" : "text-ink/50")}>
                        {c.sub}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setShowAssumptions((s) => !s)}
                aria-expanded={showAssumptions}
                className={cn(
                  "inline-flex cursor-pointer items-center gap-2 self-start rounded-full px-1 text-[0.75rem] font-medium underline decoration-1 underline-offset-3 transition-colors focus-ring",
                  dark ? "text-white/50 hover:text-white" : "text-ink/55 hover:text-ink"
                )}
              >
                <Info aria-hidden className="size-3.5" />
                {showAssumptions ? "Hide" : "Show"} the assumptions behind these numbers
              </button>

              <AnimatePresence initial={false}>
                {showAssumptions && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div
                      className={cn(
                        "rounded-2xl border p-5 text-[0.75rem] leading-relaxed",
                        dark ? "border-white/12 bg-white/5 text-white/60" : "border-ink/10 bg-white/70 text-ink/60"
                      )}
                    >
                      <p>
                        This is an estimate, not a guarantee. Diversion avoids{" "}
                        <strong>{FACTORS.perTonDiverted} MTCO₂e per short ton</strong> (EPA WARM
                        comparison of landfilling vs. anaerobic digestion of food waste), and avoided
                        landfill hauling saves fuel at{" "}
                        <strong>{FACTORS.truckMpg} mpg</strong> and{" "}
                        <strong>{FACTORS.kgPerGalDiesel} kg CO₂e per gallon</strong> of diesel.
                        Generation is modelled at <strong>{FACTORS.kwhPerTon} kWh per ton</strong>.
                      </p>
                      <p className="mt-3">
                        Equivalencies use EPA&apos;s Greenhouse Gas Equivalencies factors:{" "}
                        {FACTORS.carYear} MTCO₂e per car-year, {FACTORS.treeTenYears} MTCO₂e per tree
                        seedling grown ten years, {FACTORS.kgPerGalGasoline} kg CO₂e per gallon of
                        gasoline, and {FACTORS.kwhPerHomeYear.toLocaleString()} kWh of annual household
                        electricity use. Your actual results depend on your waste composition, route
                        distances and the processing facility used.
                      </p>
                      <p className="mt-3">
                        Contribution split for the current inputs:{" "}
                        <strong>{results.fromDiversion.toFixed(1)} MTCO₂e</strong> from diversion,{" "}
                        <strong>{results.fromTransport.toFixed(2)} MTCO₂e</strong> from avoided landfill
                        hauling.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Slider({
  id,
  label,
  unit,
  value,
  min,
  max,
  step,
  onChange,
  dark,
  compact = false,
}: {
  id?: string;
  label: string;
  unit: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  dark: boolean;
  compact?: boolean;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      {!compact && (
        <div className="mb-3 flex items-baseline justify-between gap-3">
          <label
            htmlFor={id ?? label}
            className={cn("text-[0.8125rem] font-semibold", dark ? "text-white/80" : "text-ink/75")}
          >
            {label}
          </label>
        </div>
      )}
      <div className="flex items-center gap-4">
        <input
          id={id ?? label}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label={label || unit}
          className={cn(
            "h-1.5 flex-1 cursor-pointer appearance-none rounded-full focus-ring",
            "[&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-ink [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-transform hover:[&::-webkit-slider-thumb]:scale-115",
            "[&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-ink [&::-moz-range-thumb]:bg-white"
          )}
          style={{
            background: `linear-gradient(to right, var(--color-ink) ${pct}%, ${
              dark ? "rgba(255,255,255,0.15)" : "rgba(7,23,17,0.14)"
            } ${pct}%)`,
          }}
        />
        <output
          htmlFor={id ?? label}
          className={cn(
            "min-w-[6.5rem] shrink-0 text-right font-display text-[1.0625rem] font-bold tabular-nums tracking-tight",
            dark ? "text-white" : "text-ink"
          )}
        >
          {value.toLocaleString()}{" "}
          <span className={cn("text-[0.75rem] font-medium", dark ? "text-white/50" : "text-ink/50")}>
            {unit}
          </span>
        </output>
      </div>
    </div>
  );
}
