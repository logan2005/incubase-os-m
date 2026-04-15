"use client";

import { cn } from "@/lib/utils";

interface AnimatedBorderProps {
  children: React.ReactNode;
  className?: string;
  borderClassName?: string;
  speed?: number;
}

export function AnimatedBorder({
  children,
  className,
  borderClassName,
  speed = 4,
}: AnimatedBorderProps) {
  return (
    <div className={cn("relative rounded-2xl p-px overflow-hidden group", className)}>
      {/* Spinning gradient border */}
      <div
        className={cn(
          "absolute inset-0 rounded-2xl",
          "bg-[conic-gradient(from_0deg,transparent_0%,rgba(13,107,110,0.4)_25%,transparent_50%,rgba(20,184,166,0.3)_75%,transparent_100%)]",
          "animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity duration-500",
          borderClassName
        )}
        style={{ animationDuration: `${speed}s` }}
      />
      {/* Inner content */}
      <div className="relative rounded-2xl bg-bg-secondary/90 backdrop-blur-sm">
        {children}
      </div>
    </div>
  );
}
