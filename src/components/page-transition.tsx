"use client";

import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const variants = {
  initial: {
    opacity: 0,
    y: 20,
    filter: "blur(4px)",
  },
  enter: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
      staggerChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    filter: "blur(4px)",
    transition: {
      duration: 0.3,
      ease: "easeOut" as const,
    },
  },
};

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionStage, setTransitionStage] = useState<"enter" | "exit">("enter");

  useEffect(() => {
    if (children !== displayChildren) {
      setTransitionStage("exit");
    }
  }, [children, displayChildren]);

  return (
    <>
      {/* Slide-in curtain overlay */}
      <AnimatePresence mode="wait">
        {transitionStage === "exit" && (
          <motion.div
            key="curtain"
            className="fixed inset-0 z-[100] pointer-events-none"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            style={{ transformOrigin: "top" }}
            onAnimationComplete={() => {
              if (transitionStage === "exit") {
                setDisplayChildren(children);
                setTransitionStage("enter");
              }
            }}
          >
            <div className="w-full h-full bg-accent-teal/5 backdrop-blur-sm" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page content */}
      <motion.div
        key={pathname}
        variants={variants}
        initial="initial"
        animate="enter"
        className="will-change-transform"
      >
        {displayChildren}
      </motion.div>
    </>
  );
}
