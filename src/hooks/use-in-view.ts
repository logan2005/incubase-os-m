"use client";

import { useRef } from "react";
import { useInView as useFramerInView, type UseInViewOptions } from "framer-motion";

export function useInView(options?: { once?: boolean; margin?: UseInViewOptions["margin"] }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useFramerInView(ref, {
    once: options?.once ?? true,
    margin: options?.margin ?? ("-100px" as UseInViewOptions["margin"]),
  });
  return { ref, isInView };
}
