"use client";

import { useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/use-in-view";

interface TextScrambleProps {
  text: string;
  className?: string;
  speed?: number;
  scrambleChars?: string;
}

export function TextScramble({
  text,
  className,
  speed = 30,
  scrambleChars = "!<>-_\\/[]{}—=+*^?#_",
}: TextScrambleProps) {
  const { ref, isInView } = useInView();
  const [display, setDisplay] = useState("");
  const [started, setStarted] = useState(false);

  const scramble = useCallback(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((char, i) => {
            if (i < iteration) return text[i];
            return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          })
          .join("")
      );
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 2;
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, scrambleChars]);

  useEffect(() => {
    if (isInView && !started) {
      setStarted(true);
      scramble();
    }
  }, [isInView, started, scramble]);

  return (
    <span ref={ref} className={cn("font-[family-name:var(--font-jetbrains-mono)]", className)}>
      {display || text}
    </span>
  );
}
