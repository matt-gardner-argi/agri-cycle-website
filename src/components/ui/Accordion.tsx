"use client";

import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export type AccordionItem = { q: string; a: string; group?: string };

export function Accordion({
  items,
  className,
  defaultOpen = -1,
}: {
  items: AccordionItem[];
  className?: string;
  defaultOpen?: number;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={cn("divide-y divide-ink/10 border-y border-ink/10", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className="group">
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                className="flex w-full cursor-pointer items-start gap-5 py-6 text-left focus-ring"
              >
                <span
                  className={cn(
                    "mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border transition-all duration-400",
                    isOpen
                      ? "rotate-45 border-leaf bg-leaf text-ink"
                      : "border-ink/15 text-ink/50 group-hover:border-leaf group-hover:text-leaf-deep"
                  )}
                >
                  <Plus aria-hidden className="size-4" />
                </span>
                <span
                  className={cn(
                    "flex-1 font-display text-[1.0625rem] leading-snug font-semibold tracking-tight transition-colors sm:text-lg",
                    isOpen ? "text-leaf-deep" : "text-ink group-hover:text-leaf-deep"
                  )}
                >
                  {item.q}
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-3xl pb-7 pl-13 text-[0.975rem] leading-relaxed text-ink/70">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
