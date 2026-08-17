import { stats } from "@/content/site";
import { Counter } from "@/components/ui/Counter";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function StatsStrip({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <section
      className={cn(
        "relative isolate border-y",
        dark ? "border-white/10 bg-ink text-white" : "border-ink/8 bg-cream/55"
      )}
    >
      <div className="container-page">
        <RevealGroup className="grid divide-ink/8 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x" stagger={0.08}>
          {stats.map((s) => (
            <RevealItem
              key={s.label}
              className={cn(
                "group py-9 lg:px-8 lg:py-12 lg:first:pl-0 lg:last:pr-0",
                dark ? "border-white/10" : "border-ink/8",
                "max-lg:border-b max-lg:last:border-b-0 sm:max-lg:[&:nth-child(3)]:border-b-0"
              )}
            >
              <p
                className={cn(
                  "font-display text-[clamp(2.4rem,1.6rem+2.6vw,3.4rem)] leading-none font-bold tracking-[-0.04em] transition-colors duration-500",
                  dark ? "text-white group-hover:text-leaf-bright" : "text-ink group-hover:text-leaf-deep"
                )}
              >
                <Counter value={s.value} suffix={s.suffix} raw={"raw" in s ? (s.raw as boolean) : false} />
              </p>
              <p
                className={cn(
                  "mt-3 font-display text-[0.9375rem] font-semibold tracking-tight",
                  dark ? "text-white/85" : "text-ink/85"
                )}
              >
                {s.label}
              </p>
              <p className={cn("mt-1 text-[0.8125rem]", dark ? "text-white/45" : "text-ink/50")}>
                {s.sub}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
