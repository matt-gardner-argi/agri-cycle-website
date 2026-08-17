import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Infinite horizontal scroller. Children are rendered twice so the CSS
 * translate of -50% loops seamlessly.
 */
export function Marquee({
  children,
  className,
  slow = false,
  reverse = false,
  fade = true,
  pauseOnHover = true,
}: {
  children: ReactNode;
  className?: string;
  slow?: boolean;
  reverse?: boolean;
  fade?: boolean;
  pauseOnHover?: boolean;
}) {
  return (
    <div
      className={cn(
        "group/marquee relative flex w-full overflow-hidden",
        fade &&
          "[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className
      )}
    >
      <div
        className={cn(
          "flex w-max shrink-0 items-center",
          slow ? "animate-marquee-slow" : "animate-marquee",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover/marquee:[animation-play-state:paused]"
        )}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div aria-hidden className="flex shrink-0 items-center">
          {children}
        </div>
      </div>
    </div>
  );
}
