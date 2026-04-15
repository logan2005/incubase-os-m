"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type { ReactNode, MouseEventHandler } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  href?: string;
  onClick?: MouseEventHandler;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  href,
  onClick,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 cursor-pointer font-[family-name:var(--font-dm-sans)]";

  const variants = {
    primary:
      "bg-accent-teal text-white hover:bg-accent-teal-light glow-teal hover:shadow-[0_0_80px_rgba(13,107,110,0.4)]",
    secondary:
      "bg-bg-tertiary text-text-primary border border-border hover:border-accent-teal/50 hover:bg-bg-tertiary/80",
    ghost: "text-text-secondary hover:text-text-primary hover:bg-white/5",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm gap-1.5",
    md: "px-6 py-3 text-base gap-2",
    lg: "px-8 py-4 text-lg gap-2.5",
  };

  const props = {
    className: cn(base, variants[variant], sizes[size], className),
    onClick,
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
  };

  if (href) {
    return (
      <motion.a href={href} {...props}>
        {children}
      </motion.a>
    );
  }

  return <motion.button {...props}>{children}</motion.button>;
}
