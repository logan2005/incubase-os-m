# IncubaseOS Marketing Website — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a stunning, pixel-perfect marketing website that showcases IncubaseOS — a full-stack SaaS platform for startup incubation centers — and converts visitors into buyers on first visit.

**Architecture:** Single-page marketing site with smooth scroll sections, built as a Next.js 16 App Router project. Static site (no backend needed). Each section is a self-contained React component with Framer Motion animations, organized under `src/components/sections/`. Shared UI primitives live in `src/components/ui/`. The page composes all sections sequentially in `src/app/page.tsx`.

**Tech Stack:** Next.js 16 (App Router, static export), React 19, TypeScript, Tailwind CSS v4, Framer Motion 12, Lucide React icons, Google Fonts (Clash Display + Satoshi via next/font)

---

## Design Direction

**Aesthetic:** Premium dark-mode SaaS — think Linear meets Stripe. Deep charcoal/navy backgrounds (#0A0A0F base) with the product's signature teal (#0D6B6E) as primary accent. Warm amber (#F59E0B) as secondary highlight. No generic gradients — use noise textures, subtle grid patterns, and glow effects for depth.

**Typography:**
- Headings: `Space Grotesk` — geometric, bold, tech-forward (available on Google Fonts, loaded via next/font)
- Body: `DM Sans` — clean, readable, matches the product's own font
- Monospace accents: `JetBrains Mono` for code/stats/metrics

**UPDATE — Per frontend-design skill guidelines:** We must NOT use Space Grotesk (it's flagged as overused). Instead:
- Headings: `Syne` — bold, geometric, distinctive, tech-forward
- Body: `DM Sans` — clean, matches product
- Mono: `JetBrains Mono` for stats/code

**Color System (CSS Variables):**
```css
--bg-primary: #0A0A0F;       /* Near-black base */
--bg-secondary: #111118;     /* Card backgrounds */
--bg-tertiary: #1A1A24;      /* Elevated surfaces */
--accent-teal: #0D6B6E;      /* Primary CTA, highlights */
--accent-teal-light: #14B8A6; /* Hover states, glows */
--accent-amber: #F59E0B;     /* Secondary accent, badges */
--text-primary: #F5F5F7;     /* Main text */
--text-secondary: #A1A1AA;   /* Muted text */
--text-tertiary: #52525B;    /* Very muted */
--border: #27272A;            /* Subtle borders */
--glow-teal: rgba(13,107,110,0.15); /* Teal glow effects */
```

**Motion Strategy:** Scroll-triggered reveals using Framer Motion's `useInView`. Staggered children animations. Floating gradient orbs. Counter animations for stats. Smooth section transitions. No excessive micro-interactions — focus on high-impact moments (hero entry, feature card reveals, stats counting up).

**Layout:** Full-viewport sections. Generous whitespace. Asymmetric feature layouts (alternating left-right). Overlapping elements for depth. Sticky navigation with backdrop blur.

---

## File Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout: fonts, metadata, dark mode
│   ├── page.tsx                # Main page: composes all sections
│   └── globals.css             # Tailwind config, CSS variables, noise texture
├── components/
│   ├── ui/
│   │   ├── button.tsx          # CTA button with glow effect
│   │   ├── badge.tsx           # Feature/role badges
│   │   ├── card.tsx            # Glassmorphic card component
│   │   ├── section-header.tsx  # Reusable section title + subtitle
│   │   ├── animated-counter.tsx # Number counter animation
│   │   └── gradient-orb.tsx    # Floating gradient background element
│   └── sections/
│       ├── navbar.tsx          # Sticky top navigation
│       ├── hero.tsx            # Hero with tagline + CTA + product preview
│       ├── pain-points.tsx     # Problem statement section
│       ├── solution.tsx        # Solution overview with key pillars
│       ├── features.tsx        # 16-module feature grid with expandable cards
│       ├── roles.tsx           # 4 role tabs showing per-role benefits
│       ├── workflows.tsx       # Dual-approval + hackathon workflow visuals
│       ├── stats.tsx           # Animated platform statistics
│       ├── testimonials.tsx    # Success stories / social proof
│       ├── deployment.tsx      # Deployment flexibility section
│       ├── pricing.tsx         # Pricing tiers
│       ├── cta.tsx             # Final call-to-action
│       └── footer.tsx          # Links, contact, legal
├── lib/
│   └── utils.ts                # cn() utility
└── hooks/
    └── use-in-view.ts          # Scroll-triggered animation hook (wraps framer)
```

---

## Task Breakdown

### Task 1: Project Scaffolding & Configuration

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `tailwind.config.ts` (if needed beyond v4 CSS config)
- Create: `postcss.config.mjs`
- Create: `src/app/globals.css`
- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx` (placeholder)
- Create: `src/lib/utils.ts`

- [ ] **Step 1: Initialize Next.js project**

Run:
```bash
cd D:/shilog-projects/incubase_os_marketing
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --yes
```

Expected: Project scaffolded with Next.js 16, TypeScript, Tailwind, App Router, src directory.

- [ ] **Step 2: Install additional dependencies**

Run:
```bash
npm install framer-motion lucide-react clsx tailwind-merge
```

Expected: Dependencies added to package.json.

- [ ] **Step 3: Create utility file `src/lib/utils.ts`**

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 4: Configure `src/app/globals.css` with design system**

Replace the default globals.css with our complete design system:

```css
@import "tailwindcss";

@theme {
  --color-bg-primary: #0A0A0F;
  --color-bg-secondary: #111118;
  --color-bg-tertiary: #1A1A24;
  --color-accent-teal: #0D6B6E;
  --color-accent-teal-light: #14B8A6;
  --color-accent-amber: #F59E0B;
  --color-text-primary: #F5F5F7;
  --color-text-secondary: #A1A1AA;
  --color-text-tertiary: #52525B;
  --color-border: #27272A;
  --color-glow-teal: rgba(13, 107, 110, 0.15);

  --font-heading: "Syne", sans-serif;
  --font-body: "DM Sans", sans-serif;
  --font-mono: "JetBrains Mono", monospace;
}

body {
  background-color: var(--color-bg-primary);
  color: var(--color-text-primary);
  font-family: var(--font-body);
  overflow-x: hidden;
}

/* Noise texture overlay */
.noise-bg::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 0;
}

/* Subtle grid pattern */
.grid-bg {
  background-image:
    linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
  background-size: 64px 64px;
}

/* Glow effects */
.glow-teal {
  box-shadow: 0 0 60px rgba(13, 107, 110, 0.3), 0 0 120px rgba(13, 107, 110, 0.1);
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: var(--color-bg-primary);
}
::-webkit-scrollbar-thumb {
  background: var(--color-border);
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: var(--color-text-tertiary);
}
```

- [ ] **Step 5: Configure `src/app/layout.tsx` with fonts and metadata**

```tsx
import type { Metadata } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "IncubaseOS — The Operating System for Modern Startup Incubators",
  description:
    "End-to-end incubation management. Startups, mentors, investors, hackathons, facilities, revenue — all in one platform.",
  keywords: [
    "startup incubator software",
    "incubation management platform",
    "startup management system",
    "mentor management",
    "hackathon management",
    "incubator CRM",
  ],
  openGraph: {
    title: "IncubaseOS — The Operating System for Modern Startup Incubators",
    description:
      "End-to-end incubation management. Startups, mentors, investors, hackathons, facilities, revenue — all in one platform.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="noise-bg antialiased">{children}</body>
    </html>
  );
}
```

- [ ] **Step 6: Create placeholder `src/app/page.tsx`**

```tsx
export default function Home() {
  return (
    <main className="min-h-screen">
      <h1 className="font-heading text-4xl text-center pt-20">IncubaseOS</h1>
    </main>
  );
}
```

- [ ] **Step 7: Verify dev server starts**

Run: `npm run dev`
Expected: Server starts on localhost:3000, page renders with "IncubaseOS" heading in Syne font on dark background.

- [ ] **Step 8: Commit**

```bash
git init
git add -A
git commit -m "feat: scaffold Next.js marketing site with design system"
```

---

### Task 2: Shared UI Primitives

**Files:**
- Create: `src/components/ui/button.tsx`
- Create: `src/components/ui/badge.tsx`
- Create: `src/components/ui/card.tsx`
- Create: `src/components/ui/section-header.tsx`
- Create: `src/components/ui/animated-counter.tsx`
- Create: `src/components/ui/gradient-orb.tsx`
- Create: `src/hooks/use-in-view.ts`

- [ ] **Step 1: Create `src/hooks/use-in-view.ts`**

```typescript
"use client";

import { useRef } from "react";
import { useInView as useFramerInView } from "framer-motion";

export function useInView(options?: { once?: boolean; margin?: string }) {
  const ref = useRef(null);
  const isInView = useFramerInView(ref, {
    once: options?.once ?? true,
    margin: options?.margin ?? "-100px",
  });
  return { ref, isInView };
}
```

- [ ] **Step 2: Create `src/components/ui/button.tsx`**

Primary CTA button with teal glow effect and hover animation:

```tsx
"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  href?: string;
  onClick?: () => void;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  href,
  onClick,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 cursor-pointer font-body";

  const variants = {
    primary:
      "bg-accent-teal text-white hover:bg-accent-teal-light glow-teal hover:shadow-[0_0_80px_rgba(13,107,110,0.4)]",
    secondary:
      "bg-bg-tertiary text-text-primary border border-border hover:border-accent-teal/50 hover:bg-bg-tertiary/80",
    ghost:
      "text-text-secondary hover:text-text-primary hover:bg-white/5",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm gap-1.5",
    md: "px-6 py-3 text-base gap-2",
    lg: "px-8 py-4 text-lg gap-2.5",
  };

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      href={href}
      onClick={onClick}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </Component>
  );
}
```

- [ ] **Step 3: Create `src/components/ui/badge.tsx`**

```tsx
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "teal" | "amber" | "neutral";
  className?: string;
}

export function Badge({ children, variant = "teal", className }: BadgeProps) {
  const variants = {
    teal: "bg-accent-teal/10 text-accent-teal-light border-accent-teal/20",
    amber: "bg-accent-amber/10 text-accent-amber border-accent-amber/20",
    neutral: "bg-white/5 text-text-secondary border-white/10",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 text-xs font-medium rounded-full border font-mono uppercase tracking-wider",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
```

- [ ] **Step 4: Create `src/components/ui/card.tsx`**

Glassmorphic card with subtle border and hover glow:

```tsx
"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = true }: CardProps) {
  return (
    <motion.div
      className={cn(
        "relative rounded-2xl border border-border bg-bg-secondary/60 backdrop-blur-sm p-6",
        hover &&
          "hover:border-accent-teal/30 hover:shadow-[0_0_40px_rgba(13,107,110,0.08)] transition-all duration-500",
        className
      )}
      whileHover={hover ? { y: -2 } : undefined}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 5: Create `src/components/ui/section-header.tsx`**

```tsx
"use client";

import { Badge } from "./badge";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  badge,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeaderProps) {
  const { ref, isInView } = useInView();

  return (
    <motion.div
      ref={ref}
      className={cn(
        "max-w-3xl mb-16",
        align === "center" && "mx-auto text-center",
        className
      )}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {badge && <Badge className="mb-4">{badge}</Badge>}
      <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-text-secondary text-lg md:text-xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
```

- [ ] **Step 6: Create `src/components/ui/animated-counter.tsx`**

```tsx
"use client";

import { useEffect, useState } from "react";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({
  end,
  suffix = "",
  prefix = "",
  duration = 2000,
  className,
}: AnimatedCounterProps) {
  const { ref, isInView } = useInView();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className={cn("font-mono tabular-nums", className)}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}
```

- [ ] **Step 7: Create `src/components/ui/gradient-orb.tsx`**

```tsx
import { cn } from "@/lib/utils";

interface GradientOrbProps {
  className?: string;
  color?: "teal" | "amber" | "purple";
  size?: "sm" | "md" | "lg";
}

export function GradientOrb({
  className,
  color = "teal",
  size = "md",
}: GradientOrbProps) {
  const colors = {
    teal: "from-accent-teal/20 to-transparent",
    amber: "from-accent-amber/20 to-transparent",
    purple: "from-purple-500/20 to-transparent",
  };

  const sizes = {
    sm: "w-[300px] h-[300px]",
    md: "w-[500px] h-[500px]",
    lg: "w-[700px] h-[700px]",
  };

  return (
    <div
      className={cn(
        "absolute rounded-full bg-gradient-radial blur-3xl pointer-events-none",
        colors[color],
        sizes[size],
        className
      )}
      aria-hidden="true"
    />
  );
}
```

- [ ] **Step 8: Verify all primitives render**

Create a temporary test page that imports and renders each component. Run dev server. Verify visually.

- [ ] **Step 9: Commit**

```bash
git add src/components/ui/ src/hooks/
git commit -m "feat: add shared UI primitives (button, card, badge, counter, orbs)"
```

---

### Task 3: Navbar Component

**Files:**
- Create: `src/components/sections/navbar.tsx`
- Modify: `src/app/page.tsx` — add Navbar import

- [ ] **Step 1: Create `src/components/sections/navbar.tsx`**

Sticky navigation bar with backdrop blur, logo, nav links, and CTA button. Transparent at top, solid on scroll.

```tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Roles", href: "#roles" },
  { label: "Workflows", href: "#workflows" },
  { label: "Pricing", href: "#pricing" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-bg-primary/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-accent-teal flex items-center justify-center">
            <span className="font-heading font-bold text-white text-sm">iO</span>
          </div>
          <span className="font-heading font-bold text-xl text-text-primary">
            IncubaseOS
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-text-secondary hover:text-text-primary transition-colors text-sm font-medium"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm">
            Log In
          </Button>
          <Button size="sm">Get Started</Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-text-primary"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden bg-bg-secondary/95 backdrop-blur-xl border-b border-border"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-text-secondary hover:text-text-primary transition-colors text-base font-medium"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex gap-3 pt-2">
                <Button variant="secondary" size="sm" className="flex-1">
                  Log In
                </Button>
                <Button size="sm" className="flex-1">
                  Get Started
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
```

- [ ] **Step 2: Add Navbar to `src/app/page.tsx`**

```tsx
import { Navbar } from "@/components/sections/navbar";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      {/* Sections will be added here */}
      <div className="h-[200vh]" /> {/* Temporary scroll space */}
    </main>
  );
}
```

- [ ] **Step 3: Verify navbar behavior**

Run dev server. Verify: transparent at top, solid on scroll, mobile menu toggle works, backdrop blur visible.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/navbar.tsx src/app/page.tsx
git commit -m "feat: add sticky navbar with blur and mobile menu"
```

---

### Task 4: Hero Section

**Files:**
- Create: `src/components/sections/hero.tsx`
- Modify: `src/app/page.tsx` — add Hero import

This is the most critical section — first impression. Bold headline, compelling subtitle, dual CTAs, and a glowing product preview mockup.

- [ ] **Step 1: Create `src/components/sections/hero.tsx`**

Full-viewport hero with staggered text animation, floating gradient orbs, and a product dashboard preview rendered as a styled div (not an image — we'll build a mini-mockup with code).

```tsx
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GradientOrb } from "@/components/ui/gradient-orb";
import {
  ArrowRight,
  Rocket,
  Users,
  BarChart3,
  Shield,
  Zap,
  Building2,
  GraduationCap,
  Briefcase,
  TrendingUp,
} from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Effects */}
      <GradientOrb className="-top-40 -left-40" color="teal" size="lg" />
      <GradientOrb className="-bottom-60 -right-40" color="amber" size="md" />
      <div className="absolute inset-0 grid-bg" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 md:py-32">
        <motion.div
          className="text-center max-w-5xl mx-auto"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Badge */}
          <motion.div variants={item}>
            <Badge variant="teal" className="mb-6">
              <Zap className="w-3 h-3 mr-1" />
              The Future of Incubation Management
            </Badge>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-6"
            variants={item}
          >
            The Operating System
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-teal-light via-accent-teal to-emerald-400">
              for Modern Incubators
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-text-secondary text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-10 leading-relaxed"
            variants={item}
          >
            Manage startups, mentors, investors, hackathons, facilities, and
            revenue — all in one platform. From application to graduation, every
            step is covered.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
            variants={item}
          >
            <Button size="lg">
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="secondary" size="lg">
              Watch Demo
            </Button>
          </motion.div>

          {/* Product Preview — Mini Dashboard Mockup */}
          <motion.div
            className="relative mx-auto max-w-5xl"
            variants={item}
          >
            {/* Glow behind the mockup */}
            <div className="absolute inset-0 rounded-2xl bg-accent-teal/5 blur-3xl scale-105" />

            <div className="relative rounded-2xl border border-border bg-bg-secondary/80 backdrop-blur-sm overflow-hidden shadow-2xl">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-bg-tertiary/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <div className="flex-1 text-center">
                  <span className="text-text-tertiary text-xs font-mono">
                    incubaseos.app/admin
                  </span>
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: Rocket, label: "Active Startups", value: "142", color: "text-accent-teal-light" },
                  { icon: Users, label: "Mentors", value: "38", color: "text-blue-400" },
                  { icon: Briefcase, label: "Investors", value: "67", color: "text-accent-amber" },
                  { icon: TrendingUp, label: "Revenue (INR)", value: "₹2.4Cr", color: "text-emerald-400" },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    className="p-4 rounded-xl bg-bg-primary/50 border border-border"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 + i * 0.1 }}
                  >
                    <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
                    <div className="font-mono text-2xl font-bold text-text-primary">
                      {stat.value}
                    </div>
                    <div className="text-text-tertiary text-xs mt-1">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Mini chart bars */}
              <div className="px-6 md:px-8 pb-6 md:pb-8">
                <div className="rounded-xl bg-bg-primary/50 border border-border p-4">
                  <div className="flex items-end gap-1.5 h-20">
                    {[40, 65, 50, 80, 60, 90, 75, 85, 55, 70, 95, 88].map(
                      (h, i) => (
                        <motion.div
                          key={i}
                          className="flex-1 rounded-t bg-gradient-to-t from-accent-teal to-accent-teal-light/60"
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ delay: 1.5 + i * 0.05, duration: 0.5, ease: "easeOut" }}
                        />
                      )
                    )}
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-text-tertiary text-[10px] font-mono">Jan</span>
                    <span className="text-text-tertiary text-[10px] font-mono">Dec</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Floating role indicators */}
        <div className="hidden lg:block">
          {[
            { icon: Building2, label: "Admin", pos: "top-1/4 -left-4", delay: 2 },
            { icon: Rocket, label: "Startups", pos: "top-1/3 -right-4", delay: 2.2 },
            { icon: GraduationCap, label: "Mentors", pos: "bottom-1/3 -left-8", delay: 2.4 },
            { icon: Shield, label: "Investors", pos: "bottom-1/4 -right-8", delay: 2.6 },
          ].map((role) => (
            <motion.div
              key={role.label}
              className={`absolute ${role.pos} flex items-center gap-2 px-3 py-2 rounded-full bg-bg-secondary/80 border border-border backdrop-blur-sm`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: role.delay, duration: 0.5 }}
            >
              <role.icon className="w-4 h-4 text-accent-teal-light" />
              <span className="text-xs font-medium text-text-secondary">
                {role.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add Hero to page.tsx**

```tsx
import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
    </main>
  );
}
```

- [ ] **Step 3: Verify hero renders**

Run dev server. Verify: animations fire on load, gradient text renders, stat cards animate in, chart bars grow, floating role badges appear on desktop.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/hero.tsx src/app/page.tsx
git commit -m "feat: add hero section with animated dashboard mockup"
```

---

### Task 5: Pain Points Section

**Files:**
- Create: `src/components/sections/pain-points.tsx`
- Modify: `src/app/page.tsx` — add import

- [ ] **Step 1: Create `src/components/sections/pain-points.tsx`**

Shows the problems incubators face today — spreadsheet chaos, scattered tools, manual workflows. Uses a "before IncubaseOS" visual metaphor.

```tsx
"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/section-header";
import { Card } from "@/components/ui/card";
import { useInView } from "@/hooks/use-in-view";
import {
  FileSpreadsheet,
  MessageSquareOff,
  Clock,
  ShieldAlert,
  Workflow,
  DollarSign,
} from "lucide-react";

const painPoints = [
  {
    icon: FileSpreadsheet,
    title: "Spreadsheet Chaos",
    description:
      "Tracking 100+ startups across Excel sheets, emails, and WhatsApp groups. Data gets lost, duplicated, or outdated daily.",
  },
  {
    icon: MessageSquareOff,
    title: "Disconnected Stakeholders",
    description:
      "Mentors, investors, and startups operate in silos. No unified view of who's doing what, when, or how well.",
  },
  {
    icon: Clock,
    title: "Manual Approval Bottlenecks",
    description:
      "Milestone reviews, application approvals, and session validations happen over email. Things fall through the cracks.",
  },
  {
    icon: ShieldAlert,
    title: "Zero Audit Trail",
    description:
      "When stakeholders ask 'who approved this?' or 'when was that milestone completed?' — you're digging through inboxes.",
  },
  {
    icon: Workflow,
    title: "No Standardized Process",
    description:
      "Every cohort runs differently. No consistent onboarding pipeline, KPI tracking, or graduation criteria.",
  },
  {
    icon: DollarSign,
    title: "Revenue Black Holes",
    description:
      "Incubation fees, coworking charges, lab bookings, event revenue — tracked in separate systems with no unified view.",
  },
];

export function PainPoints() {
  const { ref, isInView } = useInView();

  return (
    <section className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          badge="The Problem"
          title="Running an Incubator Shouldn't Feel Like This"
          subtitle="Most incubation centers are held together with duct tape — spreadsheets, WhatsApp groups, and prayer. Sound familiar?"
        />

        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {painPoints.map((pain) => (
            <motion.div
              key={pain.title}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
            >
              <Card className="h-full border-red-500/10 hover:border-red-500/20 bg-red-500/[0.02]">
                <div className="p-2">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center mb-4">
                    <pain.icon className="w-5 h-5 text-red-400" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold mb-2 text-text-primary">
                    {pain.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {pain.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add to page.tsx, verify, commit**

```bash
git add src/components/sections/pain-points.tsx src/app/page.tsx
git commit -m "feat: add pain points section"
```

---

### Task 6: Solution Overview Section

**Files:**
- Create: `src/components/sections/solution.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create `src/components/sections/solution.tsx`**

Four pillars showing what IncubaseOS solves: Intake, Incubation, Connection, Revenue. Each pillar has an icon, title, and description, rendered as large feature cards with subtle animations.

The section should have a visual "from chaos → order" transition feel. Use the teal accent to signal the solution.

```tsx
"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/section-header";
import { GradientOrb } from "@/components/ui/gradient-orb";
import { useInView } from "@/hooks/use-in-view";
import {
  ClipboardCheck,
  LineChart,
  Handshake,
  IndianRupee,
} from "lucide-react";

const pillars = [
  {
    icon: ClipboardCheck,
    title: "Streamlined Intake",
    description:
      "Structured application forms for startups, mentors, and investors. Stakeholder validation, admin review, and approval pipelines — all digitized.",
    features: ["3 Application Types", "Stakeholder Validation", "Auto-Status Tracking"],
  },
  {
    icon: LineChart,
    title: "360° Incubation",
    description:
      "Track KPIs, milestones, and tasks per startup with dual-approval workflows. Mentors and admins collaborate on every checkpoint.",
    features: ["Quarterly KPIs", "Dual-Approval Milestones", "Grievance System"],
  },
  {
    icon: Handshake,
    title: "Stakeholder Hub",
    description:
      "Connect mentors to startups, investors to opportunities. Every session, every connection, every interaction — logged and validated.",
    features: ["Mentor Sessions", "Investor Pipeline", "In-App Messaging"],
  },
  {
    icon: IndianRupee,
    title: "Revenue Intelligence",
    description:
      "Track every income stream — incubation fees, coworking, events, labs, success fees. Know exactly where your revenue comes from.",
    features: ["8 Revenue Streams", "Invoice Tracking", "Quarterly Reports"],
  },
];

export function Solution() {
  const { ref, isInView } = useInView();

  return (
    <section id="solution" className="relative py-24 md:py-32 overflow-hidden">
      <GradientOrb className="top-0 left-1/2 -translate-x-1/2" color="teal" size="lg" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <SectionHeader
          badge="The Solution"
          title="One Platform. Every Workflow."
          subtitle="IncubaseOS replaces your scattered tools with a single, purpose-built operating system for incubation."
        />

        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.15 } },
          }}
        >
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              className="group relative rounded-2xl border border-border bg-bg-secondary/60 backdrop-blur-sm p-8 hover:border-accent-teal/30 transition-all duration-500"
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
            >
              {/* Number watermark */}
              <span className="absolute top-4 right-6 font-heading text-7xl font-bold text-white/[0.03] select-none">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="w-12 h-12 rounded-xl bg-accent-teal/10 flex items-center justify-center mb-5 group-hover:bg-accent-teal/20 transition-colors">
                <pillar.icon className="w-6 h-6 text-accent-teal-light" />
              </div>

              <h3 className="font-heading text-2xl font-bold mb-3">
                {pillar.title}
              </h3>

              <p className="text-text-secondary leading-relaxed mb-5">
                {pillar.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {pillar.features.map((feat) => (
                  <span
                    key={feat}
                    className="px-3 py-1 text-xs font-mono text-accent-teal-light bg-accent-teal/5 rounded-full border border-accent-teal/10"
                  >
                    {feat}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add to page.tsx, verify, commit**

```bash
git add src/components/sections/solution.tsx src/app/page.tsx
git commit -m "feat: add solution overview section with 4 pillars"
```

---

### Task 7: Features Grid Section

**Files:**
- Create: `src/components/sections/features.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create `src/components/sections/features.tsx`**

Showcase all 16 modules in a beautiful grid. Each module is a card with icon, title, description, and key capabilities. Grouped by category.

This section should convey the sheer breadth and depth of the platform. Use a mix of card sizes — 2 large "hero" features (Hackathons and C.Pro as they're the most complex/unique), and smaller cards for the rest.

The component should be a comprehensive grid displaying all modules with icons, descriptions, and 2-3 bullet features each. Group them visually.

- [ ] **Step 2: Add to page.tsx, verify, commit**

```bash
git add src/components/sections/features.tsx src/app/page.tsx
git commit -m "feat: add 16-module features grid section"
```

---

### Task 8: Roles Section (Tabbed)

**Files:**
- Create: `src/components/sections/roles.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create `src/components/sections/roles.tsx`**

Interactive tabbed section showing what each of the 4 user roles (Admin, Startup, Mentor, Investor) sees and can do. Each tab shows:
- Role description
- Key dashboard features (3-4 items)
- A mini mockup of their dashboard sidebar navigation
- Count of pages/features available

Use tab animation with `AnimatePresence` for smooth content transitions. Highlight the currently active role with teal accent.

- [ ] **Step 2: Add to page.tsx, verify, commit**

```bash
git add src/components/sections/roles.tsx src/app/page.tsx
git commit -m "feat: add role-based tabbed benefits section"
```

---

### Task 9: Workflows Showcase Section

**Files:**
- Create: `src/components/sections/workflows.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create `src/components/sections/workflows.tsx`**

Visual showcase of the two most impressive workflow systems:

1. **Dual-Approval Milestones**: Visual flowchart showing Startup → Mentor Approval → Admin Approval, with status badges at each step.

2. **Hackathon Lifecycle**: Visual timeline from Draft → Published → Registration → In Progress → Completed, showing the multi-level round system with judges and scoring.

3. **C.Pro Innovation Pipeline**: 3-track diagram showing Front Desk, IP Services, and Venture Studio paths from submission.

These should be rendered as animated diagrams/flowcharts, NOT just text. Use connected nodes, arrows, and step indicators.

- [ ] **Step 2: Add to page.tsx, verify, commit**

```bash
git add src/components/sections/workflows.tsx src/app/page.tsx
git commit -m "feat: add workflow visualization section"
```

---

### Task 10: Stats Section

**Files:**
- Create: `src/components/sections/stats.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create `src/components/sections/stats.tsx`**

Full-width section with animated counters showcasing platform capabilities:
- 16 Modules
- 50+ Data Models
- 75+ Pages
- 4 User Roles
- 60+ API Endpoints
- 8 Revenue Streams

Use `AnimatedCounter` component. Big, bold numbers in mono font with labels below. Background: subtle teal gradient with grid overlay.

- [ ] **Step 2: Add to page.tsx, verify, commit**

```bash
git add src/components/sections/stats.tsx src/app/page.tsx
git commit -m "feat: add animated stats section"
```

---

### Task 11: Testimonials / Social Proof Section

**Files:**
- Create: `src/components/sections/testimonials.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create `src/components/sections/testimonials.tsx`**

Social proof section with:
- 3 testimonial cards from fictional incubator directors/managers
- Each card: avatar (initial-based), name, title, organization, quote
- Auto-rotating carousel on mobile, static grid on desktop
- Logo strip of "Trusted by" organizations at the bottom

- [ ] **Step 2: Add to page.tsx, verify, commit**

```bash
git add src/components/sections/testimonials.tsx src/app/page.tsx
git commit -m "feat: add testimonials and social proof section"
```

---

### Task 12: Deployment & Tech Section

**Files:**
- Create: `src/components/sections/deployment.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create `src/components/sections/deployment.tsx`**

Show deployment flexibility:
- 3 deployment options as cards: Docker Compose (self-hosted), Vercel + VPS (hybrid), Local Dev
- Tech stack badges: Django, Next.js 16, PostgreSQL, Docker, Nginx, React 19, TypeScript
- Security features: JWT auth, role-based access, audit logging, rate limiting

- [ ] **Step 2: Add to page.tsx, verify, commit**

```bash
git add src/components/sections/deployment.tsx src/app/page.tsx
git commit -m "feat: add deployment and tech stack section"
```

---

### Task 13: Pricing Section

**Files:**
- Create: `src/components/sections/pricing.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create `src/components/sections/pricing.tsx`**

Three pricing tiers:

1. **Starter** (Free / Self-hosted): Open source, Docker deployment, community support, up to 25 startups
2. **Professional** (₹24,999/mo): Managed hosting, priority support, up to 100 startups, custom branding, email integrations
3. **Enterprise** (Custom): Unlimited startups, SSO, custom integrations, dedicated support, SLA, white-label

Professional tier should be "recommended" with teal border/glow highlight. Each tier shows feature list with checkmarks.

- [ ] **Step 2: Add to page.tsx, verify, commit**

```bash
git add src/components/sections/pricing.tsx src/app/page.tsx
git commit -m "feat: add pricing section with 3 tiers"
```

---

### Task 14: CTA & Footer

**Files:**
- Create: `src/components/sections/cta.tsx`
- Create: `src/components/sections/footer.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create `src/components/sections/cta.tsx`**

Full-width final CTA section. Bold headline: "Ready to Transform Your Incubator?". Large teal CTA button with glow. Subtle background gradient.

- [ ] **Step 2: Create `src/components/sections/footer.tsx`**

Footer with:
- Logo + tagline
- Link columns: Product, Company, Resources, Legal
- Social links
- "Built for Indian Incubators" badge
- Copyright

- [ ] **Step 3: Compose final page.tsx with ALL sections**

```tsx
import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { PainPoints } from "@/components/sections/pain-points";
import { Solution } from "@/components/sections/solution";
import { Features } from "@/components/sections/features";
import { Roles } from "@/components/sections/roles";
import { Workflows } from "@/components/sections/workflows";
import { Stats } from "@/components/sections/stats";
import { Testimonials } from "@/components/sections/testimonials";
import { Deployment } from "@/components/sections/deployment";
import { Pricing } from "@/components/sections/pricing";
import { CTA } from "@/components/sections/cta";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <PainPoints />
      <Solution />
      <Features />
      <Roles />
      <Workflows />
      <Stats />
      <Testimonials />
      <Deployment />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 4: Verify full page flow, commit**

```bash
git add src/components/sections/cta.tsx src/components/sections/footer.tsx src/app/page.tsx
git commit -m "feat: add CTA, footer, and compose final page"
```

---

### Task 15: Polish & Responsive Pass

**Files:**
- Modify: All section components as needed
- Modify: `src/app/globals.css`

- [ ] **Step 1: Mobile responsive audit**

Check every section at 375px, 768px, 1024px, 1280px viewports. Fix any layout breaks, text overflow, or touch-unfriendly targets.

- [ ] **Step 2: Performance optimization**

- Add `loading="lazy"` to any images
- Verify Framer Motion animations use `will-change` properly
- Check bundle size with `npm run build`

- [ ] **Step 3: Accessibility pass**

- Verify all interactive elements have focus styles
- Check color contrast ratios
- Add aria-labels where needed
- Verify keyboard navigation through navbar and tabs

- [ ] **Step 4: Final visual polish**

- Ensure section spacing is consistent (py-24 md:py-32)
- Verify all gradient orbs don't cause horizontal scroll
- Check that noise texture renders correctly
- Fine-tune animation timing/easing

- [ ] **Step 5: Build verification**

Run: `npm run build`
Expected: Build succeeds with no errors.

- [ ] **Step 6: Final commit**

```bash
git add -A
git commit -m "feat: responsive polish, accessibility, and performance optimization"
```

---

## Summary

| Task | Component | Priority |
|------|-----------|----------|
| 1 | Project Scaffolding | Must have |
| 2 | UI Primitives | Must have |
| 3 | Navbar | Must have |
| 4 | Hero Section | Must have |
| 5 | Pain Points | Must have |
| 6 | Solution Overview | Must have |
| 7 | Features Grid | Must have |
| 8 | Roles (Tabbed) | Must have |
| 9 | Workflows Showcase | Must have |
| 10 | Stats Section | Must have |
| 11 | Testimonials | Must have |
| 12 | Deployment & Tech | Must have |
| 13 | Pricing | Must have |
| 14 | CTA & Footer | Must have |
| 15 | Polish & Responsive | Must have |

**Parallelization strategy:** Tasks 1-4 must be sequential (dependencies). Tasks 5-13 can be built in parallel by separate subagents once Tasks 1-4 are complete (they all depend on the same UI primitives and share no state). Task 14 depends on all sections existing. Task 15 is the final sequential pass.

**Execution recommendation:** Use subagent-driven-development. Run Tasks 1-4 sequentially, then dispatch Tasks 5-13 in parallel batches (3-4 at a time), then Task 14, then Task 15.
