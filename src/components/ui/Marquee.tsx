import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Infinite horizontal scroller. Children are rendered twice so the CSS
 * translate of -50% loops seamlessly.
 *
 * The second copy is `inert` as well as `aria-hidden`: hiding it from the
 * accessibility tree alone would leave any links or buttons inside it in the
 * tab order, so a keyboard user would hit every control twice with the second
 * set unannounced.
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
          // Stop for the pointer and for the keyboard: a control that slides
          // away mid-reach is worse than no animation at all.
          pauseOnHover &&
            "group-hover/marquee:[animation-play-state:paused] group-focus-within/marquee:[animation-play-state:paused]"
        )}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div aria-hidden inert className="flex shrink-0 items-center">
          {children}
        </div>
      </div>
    </div>
  );
}
