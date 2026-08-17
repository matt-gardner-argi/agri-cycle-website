"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Plus, X } from "lucide-react";
import { team } from "@/content/site";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function TeamGrid() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <>
      <RevealGroup
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        stagger={0.07}
      >
        {team.map((person, i) => (
          <RevealItem key={person.name} as="article">
            <button
              type="button"
              onClick={() => setOpen(person.name)}
              className="group relative block w-full cursor-pointer overflow-hidden rounded-3xl border border-ink/8 bg-ink text-left focus-ring"
            >
              <div className="relative aspect-4/5 overflow-hidden">
                <Image
                  src={person.image}
                  alt={person.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  priority={i < 4}
                  className="object-cover object-top transition-all duration-[900ms] ease-out group-hover:scale-107 group-hover:brightness-110"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-linear-0 from-ink via-ink/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-95"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-linear-0 from-leaf/45 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="font-display text-[1.0625rem] leading-tight font-bold tracking-tight text-white">
                  {person.name}
                </p>
                <p className="mt-1 text-[0.8125rem] leading-snug text-leaf-bright">{person.role}</p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-[0.72rem] font-semibold text-white/55 transition-colors group-hover:text-white">
                  <span className="grid size-5 place-items-center rounded-full bg-white/15 transition-colors group-hover:bg-leaf group-hover:text-ink">
                    <Plus aria-hidden className="size-3" />
                  </span>
                  Read bio
                </span>
              </div>
            </button>
          </RevealItem>
        ))}
      </RevealGroup>

      <AnimatePresence>
        {open && (
          <BioModal
            person={team.find((p) => p.name === open)!}
            onClose={() => setOpen(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function BioModal({
  person,
  onClose,
}: {
  person: (typeof team)[number];
  onClose: () => void;
}) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[80] bg-ink/70 backdrop-blur-sm"
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`${person.name}, ${person.role}`}
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-4 top-[8svh] z-[85] mx-auto max-h-[84svh] w-[min(46rem,calc(100vw-2rem))] overflow-y-auto overscroll-contain rounded-3xl bg-paper shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 grid size-10 cursor-pointer place-items-center rounded-full bg-ink/70 text-white backdrop-blur-sm transition-colors hover:bg-ink focus-ring"
        >
          <X aria-hidden className="size-4.5" />
        </button>

        <div className="grid sm:grid-cols-[13rem_minmax(0,1fr)]">
          <div className="relative aspect-4/5 sm:aspect-auto">
            <Image
              src={person.image}
              alt={person.name}
              fill
              sizes="(max-width: 640px) 100vw, 13rem"
              className="object-cover object-top"
            />
          </div>
          <div className="p-7 sm:p-8">
            <p className="font-display text-[clamp(1.5rem,1.2rem+1vw,2rem)] leading-tight font-bold tracking-tight">
              {person.name}
            </p>
            <p className="mt-1.5 text-[0.9375rem] font-semibold text-leaf-deep">{person.role}</p>
            <p className={cn("mt-5 text-[0.9375rem] leading-relaxed text-ink/70")}>{person.bio}</p>
          </div>
        </div>
      </motion.div>
    </>
  );
}
