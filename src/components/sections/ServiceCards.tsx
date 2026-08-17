"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import Link from "next/link";
import { services } from "@/content/site";
import { TiltCard } from "@/components/ui/TiltCard";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const accents = {
  leaf: {
    ring: "group-hover:border-leaf/60",
    glow: "from-leaf/35",
    chip: "bg-leaf text-ink",
    dot: "text-leaf-deep",
  },
  sky: {
    ring: "group-hover:border-sky/60",
    glow: "from-sky/35",
    chip: "bg-sky text-ink",
    dot: "text-sky",
  },
  sun: {
    ring: "group-hover:border-sun/60",
    glow: "from-sun/35",
    chip: "bg-sun text-ink",
    dot: "text-sun",
  },
} as const;

export function ServiceCards({ compact = false }: { compact?: boolean }) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <RevealGroup className="grid gap-6 md:grid-cols-3" stagger={0.11}>
      {services.map((svc) => {
        const a = accents[svc.accent];
        const isHot = hovered === svc.slug;
        return (
          <RevealItem key={svc.slug} as="article">
            <TiltCard intensity={6} className="h-full">
              <div
                onMouseEnter={() => setHovered(svc.slug)}
                onMouseLeave={() => setHovered(null)}
                className={cn(
                  "group relative flex h-full flex-col overflow-hidden rounded-3xl border border-ink/10 bg-white transition-all duration-500",
                  "hover:-translate-y-1.5 hover:shadow-[0_36px_70px_-40px_rgba(7,23,17,0.5)]",
                  a.ring
                )}
              >
                {/* Photo header */}
                <div className={cn("relative overflow-hidden", compact ? "h-40" : "h-48")}>
                  <Image
                    src={svc.image}
                    alt={svc.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-linear-0 from-ink/80 via-ink/15 to-transparent" />
                  <div
                    aria-hidden
                    className={cn(
                      "absolute inset-0 bg-linear-160 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                      a.glow
                    )}
                  />
                  <h3 className="absolute inset-x-6 bottom-5 font-display text-[1.35rem] leading-tight font-bold tracking-tight text-white">
                    {svc.name}
                  </h3>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <p className="text-[0.9375rem] leading-relaxed text-ink/65">{svc.blurb}</p>

                  <ul className="mt-6 flex flex-wrap gap-2">
                    {svc.items.map((item, i) => (
                      <motion.li
                        key={item}
                        animate={isHot ? { y: 0, opacity: 1 } : { y: 0, opacity: 0.82 }}
                        transition={{ delay: isHot ? i * 0.03 : 0, duration: 0.3 }}
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-cream/60 px-3 py-1.5 text-[0.75rem] font-medium text-ink/75 transition-colors duration-300",
                          isHot && "border-ink/15 bg-cream"
                        )}
                      >
                        <Check aria-hidden className={cn("size-3", a.dot)} />
                        {item}
                      </motion.li>
                    ))}
                  </ul>

                  <Link
                    href="/quote"
                    className="mt-auto inline-flex items-center gap-2 pt-7 text-[0.8125rem] font-semibold text-ink transition-colors hover:text-leaf-deep focus-ring"
                  >
                    <span
                      className={cn(
                        "grid size-7 place-items-center rounded-full transition-transform duration-300 group-hover:scale-110",
                        a.chip
                      )}
                    >
                      <ArrowUpRight aria-hidden className="size-3.5" />
                    </span>
                    Get a quote for {svc.name.toLowerCase()}
                  </Link>
                </div>
              </div>
            </TiltCard>
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}
