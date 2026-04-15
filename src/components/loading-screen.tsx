"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Accelerate toward end
        const increment = prev < 70 ? Math.random() * 15 + 5 : Math.random() * 8 + 2;
        return Math.min(prev + increment, 100);
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const timeout = setTimeout(() => setLoading(false), 400);
      return () => clearTimeout(timeout);
    }
  }, [progress]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-bg-primary"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Logo animation */}
          <motion.div
            className="flex flex-col items-center gap-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Animated logo */}
            <div className="relative">
              {/* Outer glow ring */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(13,107,110,0.2)",
                    "0 0 60px rgba(13,107,110,0.4)",
                    "0 0 20px rgba(13,107,110,0.2)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Logo box */}
              <motion.div
                className="relative w-16 h-16 rounded-2xl bg-accent-teal flex items-center justify-center overflow-hidden"
                animate={{ rotate: [0, 0, 0] }}
              >
                {/* Shimmer sweep */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5, ease: "easeInOut" }}
                />

                <span className="relative font-[family-name:var(--font-syne)] text-2xl font-bold text-white">
                  e.
                </span>
              </motion.div>
            </div>

            {/* Brand name with staggered reveal */}
            <motion.div
              className="flex items-center gap-0.5 overflow-hidden"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.04, delayChildren: 0.3 } },
              }}
            >
              {"edgyy".split("").map((char, i) => (
                <motion.span
                  key={i}
                  className="font-[family-name:var(--font-syne)] text-2xl font-bold text-text-primary inline-block"
                  variants={{
                    hidden: { y: 30, opacity: 0 },
                    visible: { y: 0, opacity: 1 },
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.div>

            {/* Progress bar */}
            <div className="w-48 mt-4">
              <div className="h-0.5 w-full rounded-full bg-border overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-accent-teal to-accent-teal-light"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1, ease: "linear" }}
                />
              </div>
              <motion.p
                className="mt-2 text-center text-xs text-text-tertiary font-[family-name:var(--font-jetbrains-mono)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {Math.round(progress)}%
              </motion.p>
            </div>
          </motion.div>

          {/* Decorative corner accents */}
          <div className="absolute top-8 left-8 w-8 h-8 border-l-2 border-t-2 border-accent-teal/20 rounded-tl-lg" />
          <div className="absolute top-8 right-8 w-8 h-8 border-r-2 border-t-2 border-accent-teal/20 rounded-tr-lg" />
          <div className="absolute bottom-8 left-8 w-8 h-8 border-l-2 border-b-2 border-accent-teal/20 rounded-bl-lg" />
          <div className="absolute bottom-8 right-8 w-8 h-8 border-r-2 border-b-2 border-accent-teal/20 rounded-br-lg" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
