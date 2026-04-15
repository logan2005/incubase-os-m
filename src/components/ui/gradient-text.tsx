"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  from?: string;
  via?: string;
  to?: string;
  animate?: boolean;
}

export function GradientText({
  children,
  className,
  from = "from-accent-teal-light",
  via = "via-accent-teal",
  to = "to-emerald-400",
  animate = true,
}: GradientTextProps) {
  return (
    <motion.span
      className={cn(
        "text-transparent bg-clip-text bg-gradient-to-r bg-[length:200%_auto]",
        from,
        via,
        to,
        className
      )}
      animate={
        animate
          ? { backgroundPosition: ["0% center", "100% center", "0% center"] }
          : undefined
      }
      transition={
        animate
          ? { duration: 6, repeat: Infinity, ease: "linear" }
          : undefined
      }
    >
      {children}
    </motion.span>
  );
}
