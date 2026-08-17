"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { MoveHorizontal } from "lucide-react";

/**
 * Drag-to-compare slider showing the farm then and now. Works with mouse,
 * touch and the arrow keys.
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

  const update = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const pct = ((clientX - r.left) / r.width) * 100;
    setPos(Math.min(98, Math.max(2, pct)));
  }, []);

  return (
    <figure className="m-0">
      <div
        ref={ref}
        onPointerDown={(e) => {
          setDragging(true);
          e.currentTarget.setPointerCapture(e.pointerId);
          update(e.clientX);
        }}
        onPointerMove={(e) => dragging && update(e.clientX)}
        onPointerUp={() => setDragging(false)}
        onPointerCancel={() => setDragging(false)}
        className="relative aspect-4/3 w-full touch-none overflow-hidden rounded-[1.5rem] border border-ink/10 bg-ink shadow-[0_34px_70px_-45px_rgba(7,23,17,0.6)] select-none"
      >
        <Image
          src={after}
          alt="The farm today"
          fill
          sizes="(max-width: 1024px) 100vw, 45vw"
          className="object-cover"
        />

        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <Image
            src={before}
            alt="The farm in the early 1900s"
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
          <div className="absolute top-1/2 left-1/2 -translate-1/2">
            <input
              type="range"
              min={2}
              max={98}
              value={Math.round(pos)}
              onChange={(e) => setPos(Number(e.target.value))}
              aria-label="Compare the farm then and now"
              className="pointer-events-auto absolute inset-0 size-12 cursor-ew-resize opacity-0"
            />
            <span className="grid size-12 place-items-center rounded-full border-2 border-white bg-ink/80 text-white backdrop-blur-sm">
              <MoveHorizontal aria-hidden className="size-5" />
            </span>
          </div>
        </div>
      </div>
      <figcaption className="mt-4 text-[0.8125rem] leading-relaxed text-ink/55">
        Drag the handle: the Fogler family has worked the land in Exeter, Maine since the late 1800s.
        Today the farm carries over 2,000 animals and feeds three anaerobic digesters.
      </figcaption>
    </figure>
  );
}
