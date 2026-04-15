"use client";

import { motion } from "framer-motion";
import { Zap, ArrowRight, Play, TrendingUp, Users, Briefcase, IndianRupee } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GradientOrb } from "@/components/ui/gradient-orb";
import { GradientText } from "@/components/ui/gradient-text";
import { SplitText } from "@/components/ui/split-text";
import { FloatingParticles } from "@/components/ui/floating-particles";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { useEffect, useState } from "react";

/* ──────────────────── animation helpers ──────────────────── */

const cubicEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const stagger = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  },
  item: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: cubicEase },
    },
  },
};

const floatingBadge = (delay: number, driftDuration: number = 5) => ({
  initial: { opacity: 0, scale: 0.6 } as const,
  animate: {
    opacity: 1,
    scale: 1,
    y: [0, -12, 0],
  },
  transition: {
    opacity: { delay, duration: 0.7, ease: cubicEase },
    scale: { delay, duration: 0.7, ease: cubicEase },
    y: {
      delay: delay + 0.7,
      duration: driftDuration,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  },
});

/* bar heights for the mini chart (12 bars) */
const barHeights = [40, 65, 45, 80, 55, 72, 90, 60, 85, 75, 95, 88];

/* ──────────────────── stat cards data ──────────────────── */

const stats = [
  {
    label: "Active Startups",
    value: 142,
    icon: Briefcase,
    accent: "text-accent-teal-light",
    bgAccent: "bg-accent-teal/10",
    borderAccent: "border-accent-teal/20",
  },
  {
    label: "Mentors",
    value: 38,
    icon: Users,
    accent: "text-emerald-400",
    bgAccent: "bg-emerald-400/10",
    borderAccent: "border-emerald-400/20",
  },
  {
    label: "Investors",
    value: 67,
    icon: TrendingUp,
    accent: "text-accent-amber",
    bgAccent: "bg-accent-amber/10",
    borderAccent: "border-accent-amber/20",
  },
  {
    label: "Revenue",
    value: 2,
    suffix: ".4Cr",
    prefix: "\u20B9",
    icon: IndianRupee,
    accent: "text-violet-400",
    bgAccent: "bg-violet-400/10",
    borderAccent: "border-violet-400/20",
  },
];

/* ──────────────────── sub-components ──────────────────── */

function BrowserChrome() {
  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-bg-primary/80 border-b border-border rounded-t-2xl">
      <div className="flex gap-1.5">
        <span className="w-3 h-3 rounded-full bg-red-500/80" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <span className="w-3 h-3 rounded-full bg-green-500/80" />
      </div>
      <div className="flex-1 flex justify-center">
        <div className="flex items-center gap-2 bg-bg-tertiary/60 border border-border/60 rounded-lg px-4 py-1 text-xs text-text-tertiary font-[family-name:var(--font-jetbrains-mono)]">
          <svg
            className="w-3 h-3 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          edgyy.app/admin
        </div>
      </div>
      <div className="w-14" />
    </div>
  );
}

function StatCard({
  stat,
  index,
}: {
  stat: (typeof stats)[number];
  index: number;
}) {
  const Icon = stat.icon;
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            delay: 1.0 + index * 0.12,
            duration: 0.5,
            ease: cubicEase,
          },
        },
      }}
      initial="hidden"
      animate="visible"
      className={cn(
        "relative overflow-hidden rounded-xl border p-4",
        "bg-bg-secondary/60 backdrop-blur-sm",
        stat.borderAccent
      )}
    >
      {/* subtle corner glow */}
      <div
        className={cn(
          "absolute -top-4 -right-4 w-16 h-16 rounded-full blur-2xl opacity-30",
          stat.bgAccent
        )}
      />

      <div className="flex items-center justify-between mb-3">
        <div className={cn("p-2 rounded-lg", stat.bgAccent)}>
          <Icon className={cn("w-4 h-4", stat.accent)} />
        </div>
        <motion.div
          className="flex items-center gap-1 text-[10px] text-green-400 font-[family-name:var(--font-jetbrains-mono)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 + index * 0.1 }}
        >
          <TrendingUp className="w-3 h-3" />
          +{12 + index * 3}%
        </motion.div>
      </div>

      <div className={cn("text-2xl font-bold font-[family-name:var(--font-syne)]", stat.accent)}>
        <AnimatedCounter
          end={stat.value as number}
          prefix={stat.prefix}
          suffix={stat.suffix}
          duration={2000}
        />
      </div>

      <p className="text-xs text-text-tertiary mt-1 font-[family-name:var(--font-dm-sans)]">
        {stat.label}
      </p>
    </motion.div>
  );
}

function MiniBarChart() {
  return (
    <motion.div
      className="mt-2 px-5 pb-5"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { delay: 1.5, staggerChildren: 0.06 },
        },
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-text-secondary font-[family-name:var(--font-dm-sans)] font-medium">
          Monthly Growth
        </span>
        <span className="text-[10px] text-text-tertiary font-[family-name:var(--font-jetbrains-mono)]">
          Last 12 months
        </span>
      </div>
      <div className="flex items-end gap-[6px] h-24">
        {barHeights.map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t-sm relative group"
            style={{
              background:
                i >= 10
                  ? "linear-gradient(to top, #0D6B6E, #14B8A6)"
                  : i >= 7
                    ? "linear-gradient(to top, rgba(13,107,110,0.7), rgba(20,184,166,0.7))"
                    : "linear-gradient(to top, rgba(13,107,110,0.3), rgba(20,184,166,0.4))",
            }}
            variants={{
              hidden: { height: 0 },
              visible: {
                height: `${h}%`,
                transition: {
                  duration: 0.8,
                  ease: cubicEase,
                },
              },
            }}
          />
        ))}
      </div>
      {/* x-axis labels */}
      <div className="flex items-center gap-[6px] mt-1.5">
        {["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"].map(
          (m, i) => (
            <span
              key={i}
              className="flex-1 text-center text-[8px] text-text-tertiary font-[family-name:var(--font-jetbrains-mono)]"
            >
              {m}
            </span>
          )
        )}
      </div>
    </motion.div>
  );
}

function DashboardMockup() {
  return (
    <motion.div
      className="relative w-full max-w-4xl mx-auto mt-16 md:mt-20"
      initial={{ opacity: 0, y: 60, rotateX: 8 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ delay: 0.8, duration: 1, ease: cubicEase }}
      style={{ perspective: 1200 }}
    >
      {/* glow beneath */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-40 bg-accent-teal/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative rounded-2xl border border-border/60 bg-bg-secondary/40 backdrop-blur-xl overflow-hidden shadow-2xl shadow-black/40">
        <BrowserChrome />

        {/* dashboard body */}
        <div className="p-5">
          {/* header bar inside dashboard */}
          <motion.div
            className="flex items-center justify-between mb-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.5 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-accent-teal/20 border border-accent-teal/30 flex items-center justify-center">
                <span className="text-accent-teal-light text-sm font-bold font-[family-name:var(--font-syne)]">
                  I
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold text-text-primary font-[family-name:var(--font-dm-sans)]">
                  Dashboard
                </p>
                <p className="text-[10px] text-text-tertiary font-[family-name:var(--font-jetbrains-mono)]">
                  Admin Overview
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[10px] text-green-400 font-[family-name:var(--font-jetbrains-mono)]">
                Live
              </span>
            </div>
          </motion.div>

          {/* stat cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {stats.map((stat, i) => (
              <StatCard key={stat.label} stat={stat} index={i} />
            ))}
          </div>

          {/* chart */}
          <MiniBarChart />
        </div>
      </div>
    </motion.div>
  );
}

function RoleBadge({
  label,
  className,
  delay,
  icon,
}: {
  label: string;
  className: string;
  delay: number;
  icon: string;
}) {
  return (
    <motion.div
      className={cn(
        "hidden lg:flex items-center gap-2 px-4 py-2 rounded-full",
        "bg-bg-secondary/60 backdrop-blur-md border border-border/50",
        "text-sm font-[family-name:var(--font-dm-sans)] text-text-secondary",
        "shadow-lg shadow-black/20",
        className
      )}
      {...floatingBadge(delay, 4 + delay)}
    >
      <span>{icon}</span>
      {label}
    </motion.div>
  );
}

/* ──────────────────── HERO SECTION ──────────────────── */

export function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* background layers */}
      <div className="absolute inset-0 grid-bg" />
      <FloatingParticles className="z-0" />

      {/* gradient orbs */}
      <GradientOrb
        color="teal"
        size="lg"
        className="-top-40 -left-40 opacity-60"
      />
      <GradientOrb
        color="amber"
        size="md"
        className="-top-20 right-0 opacity-40"
      />
      <GradientOrb
        color="purple"
        size="md"
        className="bottom-20 -left-20 opacity-30"
      />
      <GradientOrb
        color="teal"
        size="lg"
        className="-bottom-40 -right-40 opacity-40"
      />

      {/* top radial fade */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-bg-primary to-transparent pointer-events-none z-[1]" />

      {/* content */}
      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 flex flex-col items-center text-center"
        variants={stagger.container}
        initial="hidden"
        animate={mounted ? "visible" : "hidden"}
      >
        {/* badge */}
        <motion.div variants={stagger.item}>
          <Badge variant="teal" className="gap-1.5 mb-8">
            <Zap className="w-3 h-3 fill-current" />
            The Future of Incubation Management
          </Badge>
        </motion.div>

        {/* headline */}
        <motion.h1
          className="font-[family-name:var(--font-syne)] font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight"
          variants={stagger.item}
        >
          <SplitText text="The Operating System" className="justify-center" delay={0.3} />
          <br />
          <GradientText className="mt-2 inline-block">
            <SplitText text="for Modern Incubators" className="justify-center" delay={0.6} />
          </GradientText>
        </motion.h1>

        {/* subtitle */}
        <motion.p
          className="mt-8 max-w-2xl text-lg sm:text-xl text-text-secondary font-[family-name:var(--font-dm-sans)] leading-relaxed"
          variants={stagger.item}
        >
          Manage startups, mentors, investors, hackathons, facilities, and
          revenue — all in one platform. From application to graduation, every
          step is covered.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4 mt-10"
          variants={stagger.item}
        >
          <MagneticButton strength={0.2}>
            <Button variant="primary" size="lg" href="/get-started">
              Start Free Trial
              <ArrowRight className="w-5 h-5 ml-1 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </MagneticButton>
          <MagneticButton strength={0.2}>
            <Button variant="secondary" size="lg" href="/demo">
              <Play className="w-4 h-4 fill-current" />
              Watch Demo
            </Button>
          </MagneticButton>
        </motion.div>

        {/* dashboard mockup */}
        <DashboardMockup />
      </motion.div>

      {/* floating role badges (large screens) */}
      <RoleBadge
        label="Admin"
        icon="🛡️"
        className="absolute top-1/4 left-8 xl:left-16"
        delay={1.8}
      />
      <RoleBadge
        label="Startups"
        icon="🚀"
        className="absolute top-1/3 right-8 xl:right-16"
        delay={2.0}
      />
      <RoleBadge
        label="Mentors"
        icon="🎯"
        className="absolute bottom-[38%] left-8 xl:left-20"
        delay={2.2}
      />
      <RoleBadge
        label="Investors"
        icon="💰"
        className="absolute bottom-[42%] right-8 xl:right-20"
        delay={2.4}
      />

      {/* bottom gradient fade */}
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-bg-primary to-transparent pointer-events-none z-[1]" />
    </section>
  );
}
