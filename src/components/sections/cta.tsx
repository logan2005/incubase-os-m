"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GradientOrb } from "@/components/ui/gradient-orb";
import { GalaxyBackground } from "@/components/ui/galaxy-background";
import { useInView } from "@/hooks/use-in-view";

export function CTA() {
  const { ref, isInView } = useInView();

  return (
    <section className="relative py-24 md:py-32 lg:py-40 overflow-hidden">
      {/* Three.js galaxy/vortex particle background */}
      <GalaxyBackground />

      {/* Teal gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-teal/[0.04] to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent-teal/[0.03] to-transparent pointer-events-none" />

      {/* Background orbs */}
      <GradientOrb
        color="teal"
        size="lg"
        className="-top-20 -left-40 opacity-50"
      />
      <GradientOrb
        color="teal"
        size="lg"
        className="-bottom-20 -right-40 opacity-50"
      />
      <GradientOrb
        color="amber"
        size="sm"
        className="top-1/4 right-1/4 opacity-30"
      />
      <GradientOrb
        color="purple"
        size="sm"
        className="bottom-1/3 left-1/4 opacity-20"
      />

      <motion.div
        ref={ref}
        className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {/* Heading */}
        <h2 className="font-[family-name:var(--font-syne)] text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary mb-6">
          Ready to Transform
          <br />
          <span className="bg-gradient-to-r from-accent-teal-light to-accent-teal bg-clip-text text-transparent">
            Your Incubator?
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
          Join 50+ incubation centers already using IncubaseOS to streamline
          their operations.
        </p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.6,
            delay: 0.2,
            ease: "easeOut",
          }}
        >
          <Button variant="primary" size="lg" href="/get-started">
            Start Free Trial
            <ArrowRight className="w-5 h-5 ml-1" />
          </Button>
          <Button variant="secondary" size="lg" href="/demo">
            <Calendar className="w-4 h-4" />
            Schedule a Demo
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
