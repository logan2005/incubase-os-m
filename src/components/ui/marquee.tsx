"use client";

import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
}

export function Marquee({
  children,
  className,
  speed = 40,
  direction = "left",
  pauseOnHover = true,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "group flex overflow-hidden [--gap:2rem] gap-[var(--gap)]",
        className
      )}
    >
      {[0, 1].map((i) => (
        <div
          key={i}
          className={cn(
            "flex shrink-0 gap-[var(--gap)] items-center",
            direction === "left" ? "animate-marquee-left" : "animate-marquee-right",
            pauseOnHover && "group-hover:[animation-play-state:paused]"
          )}
          style={{ animationDuration: `${speed}s` }}
          aria-hidden={i === 1}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
