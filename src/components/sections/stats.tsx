"use client";

import { cn } from "@/lib/utils";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { AuroraBackground } from "@/components/ui/aurora-bg";
import { RevealStagger } from "@/components/ui/reveal";

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  { value: 16, suffix: "+", label: "Modules" },
  { value: 50, suffix: "+", label: "Data Models" },
  { value: 75, suffix: "+", label: "Pages" },
  { value: 4, suffix: "", label: "User Roles" },
  { value: 60, suffix: "+", label: "API Endpoints" },
  { value: 8, suffix: "", label: "Revenue Streams" },
];

export function Stats() {
  return (
    <AuroraBackground className="py-24 md:py-32">
      <div className="absolute inset-0 grid-bg" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealStagger
          direction="up"
          staggerMs={100}
          duration={500}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center group"
            >
              <div className="relative">
                <AnimatedCounter
                  end={stat.value}
                  suffix={stat.suffix}
                  className={cn(
                    "text-4xl md:text-5xl lg:text-6xl font-bold",
                    "text-text-primary",
                    "mb-2 transition-transform duration-300 group-hover:scale-110"
                  )}
                />
                <div className="absolute inset-0 rounded-full bg-accent-teal/0 blur-2xl transition-all duration-500 group-hover:bg-accent-teal/10" />
              </div>
              <span className="text-text-secondary text-sm md:text-base font-medium tracking-wide">
                {stat.label}
              </span>
            </div>
          ))}
        </RevealStagger>
      </div>
    </AuroraBackground>
  );
}
