"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = true }: CardProps) {
  return (
    <motion.div
      className={cn(
        "relative rounded-2xl border border-border bg-bg-secondary/60 backdrop-blur-sm p-6 transition-all duration-500",
        hover && "hover:border-accent-teal/30 hover:shadow-[0_0_40px_rgba(13,107,110,0.08)]",
        className
      )}
      whileHover={hover ? { y: -4 } : undefined}
    >
      {children}
    </motion.div>
  );
}
