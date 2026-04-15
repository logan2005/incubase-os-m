import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "teal" | "amber" | "neutral";
  className?: string;
}

export function Badge({ children, variant = "teal", className }: BadgeProps) {
  const variants = {
    teal: "bg-accent-teal/10 text-accent-teal-light border-accent-teal/20",
    amber: "bg-accent-amber/10 text-accent-amber border-accent-amber/20",
    neutral: "bg-white/5 text-text-secondary border-white/10",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 text-xs font-medium rounded-full border font-[family-name:var(--font-jetbrains-mono)] uppercase tracking-wider",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
