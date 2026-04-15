"use client";

import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type RevealDirection = "up" | "down" | "left" | "right" | "none";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  once?: boolean;
  threshold?: number;
}

/**
 * CSS-only scroll reveal. Uses IntersectionObserver + CSS transitions.
 * No Framer Motion = no React re-renders on scroll = buttery smooth 60fps.
 */
export function Reveal({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 600,
  once = true,
  threshold = 0.15,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold, rootMargin: "-40px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, threshold]);

  const transforms: Record<RevealDirection, string> = {
    up: "translate-y-8",
    down: "-translate-y-8",
    left: "translate-x-8",
    right: "-translate-x-8",
    none: "",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "transition-[transform,opacity] will-change-[transform,opacity]",
        visible
          ? "opacity-100 translate-x-0 translate-y-0"
          : `opacity-0 ${transforms[direction]}`,
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }}
    >
      {children}
    </div>
  );
}

/**
 * Staggered reveal container — each direct child gets a progressive delay.
 */
export function RevealStagger({
  children,
  className,
  direction = "up",
  staggerMs = 80,
  duration = 600,
  threshold = 0.1,
}: {
  children: React.ReactNode;
  className?: string;
  direction?: RevealDirection;
  staggerMs?: number;
  duration?: number;
  threshold?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: "-40px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const transforms: Record<RevealDirection, string> = {
    up: "translate-y-6",
    down: "-translate-y-6",
    left: "translate-x-6",
    right: "-translate-x-6",
    none: "",
  };

  return (
    <div ref={ref} className={className}>
      {Array.isArray(children)
        ? children.map((child, i) => (
            <div
              key={i}
              className={cn(
                "transition-[transform,opacity] will-change-[transform,opacity]",
                visible
                  ? "opacity-100 translate-x-0 translate-y-0"
                  : `opacity-0 ${transforms[direction]}`
              )}
              style={{
                transitionDuration: `${duration}ms`,
                transitionDelay: visible ? `${i * staggerMs}ms` : "0ms",
                transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              }}
            >
              {child}
            </div>
          ))
        : children}
    </div>
  );
}
