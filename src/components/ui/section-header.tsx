"use client";

import { Badge } from "./badge";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  badge,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <Reveal direction="up" duration={700}>
      <div
        className={cn(
          "max-w-3xl mb-16",
          align === "center" && "mx-auto text-center",
          className
        )}
      >
        {badge && <Badge className="mb-4">{badge}</Badge>}
        <h2 className="font-[family-name:var(--font-syne)] text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-text-primary">
          {title}
        </h2>
        {subtitle && (
          <p className="text-text-secondary text-lg md:text-xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </Reveal>
  );
}
