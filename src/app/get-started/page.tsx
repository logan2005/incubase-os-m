"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  ArrowRight,
  Mail,
  User,
  Building2,
  Users,
  ChevronDown,
  Sparkles,
  Quote,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PageWrapper } from "@/components/page-wrapper";
import { GradientOrb } from "@/components/ui/gradient-orb";

/* ──────────────────── animation helpers ──────────────────── */

const cubicEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const stagger = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.15 },
    },
  },
  item: {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: cubicEase },
    },
  },
};

/* ──────────────────── data ──────────────────── */

const benefits = [
  "All 16 modules included",
  "Up to 25 startups free",
  "Docker self-hosted deployment",
  "Community support",
];

const roles = [
  { value: "", label: "Select your role" },
  { value: "incubator-director", label: "Incubator Director" },
  { value: "program-manager", label: "Program Manager" },
  { value: "operations-head", label: "Operations Head" },
  { value: "other", label: "Other" },
];

const startupCounts = [
  { value: "", label: "Number of startups" },
  { value: "1-10", label: "1 - 10" },
  { value: "11-25", label: "11 - 25" },
  { value: "26-50", label: "26 - 50" },
  { value: "51-100", label: "51 - 100" },
  { value: "100+", label: "100+" },
];

/* ──────────────────── input styles ──────────────────── */

const inputBase = cn(
  "w-full rounded-xl border border-border bg-bg-tertiary px-4 py-3 pl-11",
  "text-text-primary placeholder:text-text-tertiary",
  "font-[family-name:var(--font-dm-sans)] text-sm",
  "outline-none transition-all duration-300",
  "focus:border-accent-teal focus:ring-1 focus:ring-accent-teal/30",
  "hover:border-accent-teal/40"
);

const selectBase = cn(
  "w-full rounded-xl border border-border bg-bg-tertiary px-4 py-3 pl-11 pr-10",
  "text-text-primary",
  "font-[family-name:var(--font-dm-sans)] text-sm",
  "outline-none transition-all duration-300 appearance-none cursor-pointer",
  "focus:border-accent-teal focus:ring-1 focus:ring-accent-teal/30",
  "hover:border-accent-teal/40"
);

/* ──────────────────── sub-components ──────────────────── */

function BenefitItem({ text, index }: { text: string; index: number }) {
  return (
    <motion.li
      className="flex items-center gap-3"
      variants={stagger.item}
      custom={index}
    >
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-teal/15 border border-accent-teal/30">
        <Check className="h-3.5 w-3.5 text-accent-teal-light" />
      </span>
      <span className="text-text-secondary font-[family-name:var(--font-dm-sans)] text-base">
        {text}
      </span>
    </motion.li>
  );
}

function TestimonialQuote() {
  return (
    <motion.div
      className="relative mt-10 rounded-2xl border border-border bg-bg-secondary/40 backdrop-blur-sm p-6"
      variants={stagger.item}
    >
      <Quote className="h-6 w-6 text-accent-teal/20 mb-3" />
      <p className="text-text-secondary text-sm leading-relaxed italic">
        &ldquo;We replaced 12 different tools with edgyy. Our team saves
        20+ hours every week and the onboarding took less than a day.&rdquo;
      </p>
      <div className="mt-4 flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-teal">
          <span className="font-[family-name:var(--font-syne)] text-xs font-bold text-white">
            PS
          </span>
        </div>
        <div>
          <p className="font-[family-name:var(--font-syne)] text-sm font-semibold text-text-primary">
            Dr. Priya Sharma
          </p>
          <p className="text-text-tertiary text-xs">
            Director, IITM Incubation Cell
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function SuccessState() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center text-center py-12 px-6"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: cubicEase }}
    >
      {/* Animated checkmark circle */}
      <motion.div
        className="relative mb-8"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, duration: 0.5, type: "spring", stiffness: 200 }}
      >
        {/* Outer glow ring */}
        <motion.div
          className="absolute inset-0 rounded-full bg-accent-teal/20"
          initial={{ scale: 1 }}
          animate={{ scale: 1.8, opacity: 0 }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeOut",
          }}
          style={{ width: 80, height: 80 }}
        />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-accent-teal glow-teal">
          <motion.div
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5, ease: cubicEase }}
          >
            <Check className="h-9 w-9 text-white" strokeWidth={3} />
          </motion.div>
        </div>
      </motion.div>

      {/* Success text */}
      <motion.h3
        className="font-[family-name:var(--font-syne)] text-2xl md:text-3xl font-bold text-text-primary mb-3"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5, ease: cubicEase }}
      >
        You&apos;re all set!
      </motion.h3>

      <motion.p
        className="text-text-secondary font-[family-name:var(--font-dm-sans)] text-base mb-2"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5, ease: cubicEase }}
      >
        Check your email for login credentials.
      </motion.p>

      <motion.p
        className="text-text-tertiary font-[family-name:var(--font-dm-sans)] text-sm mb-8"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5, ease: cubicEase }}
      >
        We&apos;ve sent setup instructions to your inbox.
      </motion.p>

      {/* Dashboard button */}
      <motion.a
        href="/dashboard"
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-xl px-8 py-3.5",
          "bg-accent-teal text-white font-medium font-[family-name:var(--font-dm-sans)]",
          "glow-teal transition-all duration-300",
          "hover:bg-accent-teal-light hover:shadow-[0_0_80px_rgba(13,107,110,0.4)]"
        )}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5, ease: cubicEase }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Go to Dashboard
        <ArrowRight className="h-4 w-4" />
      </motion.a>
    </motion.div>
  );
}

/* ──────────────────── MAIN PAGE ──────────────────── */

export default function GetStartedPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    organization: "",
    role: "",
    startupCount: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <PageWrapper>
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 grid-bg" />

        {/* Gradient orbs */}
        <GradientOrb
          color="teal"
          size="lg"
          className="-top-40 -left-40 opacity-50"
        />
        <GradientOrb
          color="amber"
          size="md"
          className="-top-20 right-0 opacity-30"
        />
        <GradientOrb
          color="teal"
          size="lg"
          className="-bottom-40 -right-40 opacity-40"
        />
        <GradientOrb
          color="purple"
          size="sm"
          className="bottom-1/4 left-1/4 opacity-20"
        />

        {/* Top fade */}
        <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-bg-primary to-transparent pointer-events-none z-[1]" />

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">
            {/* ── Left side: Copy ── */}
            <motion.div
              variants={stagger.container}
              initial="hidden"
              animate="visible"
            >
              {/* Badge */}
              <motion.div variants={stagger.item}>
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium",
                    "bg-accent-teal/10 text-accent-teal-light border border-accent-teal/20",
                    "font-[family-name:var(--font-dm-sans)]"
                  )}
                >
                  <Sparkles className="h-3 w-3" />
                  Free to get started
                </span>
              </motion.div>

              {/* Heading */}
              <motion.h1
                className="mt-6 font-[family-name:var(--font-syne)] text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-text-primary leading-[1.1]"
                variants={stagger.item}
              >
                Start Your{" "}
                <span className="bg-gradient-to-r from-accent-teal-light to-accent-teal bg-clip-text text-transparent">
                  Free Trial
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                className="mt-5 text-text-secondary text-lg leading-relaxed font-[family-name:var(--font-dm-sans)] max-w-lg"
                variants={stagger.item}
              >
                Get your incubator up and running in minutes. No credit card
                required, no setup fees — just powerful incubation management
                from day one.
              </motion.p>

              {/* Benefits */}
              <motion.ul
                className="mt-8 flex flex-col gap-4"
                variants={stagger.container}
              >
                {benefits.map((benefit, i) => (
                  <BenefitItem key={benefit} text={benefit} index={i} />
                ))}
              </motion.ul>

              {/* Testimonial */}
              <TestimonialQuote />
            </motion.div>

            {/* ── Right side: Form Card ── */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: cubicEase }}
            >
              {/* Card glow behind */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-b from-accent-teal/10 via-transparent to-accent-teal/5 blur-xl pointer-events-none" />

              <div
                className={cn(
                  "relative rounded-2xl border border-border",
                  "bg-bg-secondary/70 backdrop-blur-xl",
                  "shadow-2xl shadow-black/20",
                  "overflow-hidden"
                )}
              >
                {/* Card header accent line */}
                <div className="h-1 w-full bg-gradient-to-r from-accent-teal via-accent-teal-light to-accent-teal" />

                <div className="p-6 sm:p-8">
                  <AnimatePresence mode="wait">
                    {submitted ? (
                      <SuccessState key="success" />
                    ) : (
                      <motion.div
                        key="form"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Form header */}
                        <div className="mb-8">
                          <h2 className="font-[family-name:var(--font-syne)] text-2xl font-bold text-text-primary">
                            Create your account
                          </h2>
                          <p className="mt-2 text-text-secondary text-sm font-[family-name:var(--font-dm-sans)]">
                            Fill in your details to get started with edgyy.
                          </p>
                        </div>

                        {/* Form */}
                        <form
                          onSubmit={handleSubmit}
                          className="flex flex-col gap-5"
                        >
                          {/* Full Name */}
                          <div className="relative">
                            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary pointer-events-none" />
                            <input
                              type="text"
                              name="fullName"
                              placeholder="Full Name"
                              value={formData.fullName}
                              onChange={handleChange}
                              required
                              className={inputBase}
                            />
                          </div>

                          {/* Email */}
                          <div className="relative">
                            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary pointer-events-none" />
                            <input
                              type="email"
                              name="email"
                              placeholder="Work Email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              className={inputBase}
                            />
                          </div>

                          {/* Organization Name */}
                          <div className="relative">
                            <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary pointer-events-none" />
                            <input
                              type="text"
                              name="organization"
                              placeholder="Organization Name"
                              value={formData.organization}
                              onChange={handleChange}
                              required
                              className={inputBase}
                            />
                          </div>

                          {/* Role Dropdown */}
                          <div className="relative">
                            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary pointer-events-none" />
                            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary pointer-events-none" />
                            <select
                              name="role"
                              value={formData.role}
                              onChange={handleChange}
                              required
                              className={cn(
                                selectBase,
                                formData.role === "" && "text-text-tertiary"
                              )}
                            >
                              {roles.map((role) => (
                                <option
                                  key={role.value}
                                  value={role.value}
                                  disabled={role.value === ""}
                                >
                                  {role.label}
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* Number of Startups Dropdown */}
                          <div className="relative">
                            <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary pointer-events-none" />
                            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary pointer-events-none" />
                            <select
                              name="startupCount"
                              value={formData.startupCount}
                              onChange={handleChange}
                              required
                              className={cn(
                                selectBase,
                                formData.startupCount === "" &&
                                  "text-text-tertiary"
                              )}
                            >
                              {startupCounts.map((count) => (
                                <option
                                  key={count.value}
                                  value={count.value}
                                  disabled={count.value === ""}
                                >
                                  {count.label}
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* Submit Button */}
                          <motion.button
                            type="submit"
                            className={cn(
                              "w-full flex items-center justify-center gap-2 rounded-xl px-6 py-3.5",
                              "bg-accent-teal text-white font-semibold text-base",
                              "font-[family-name:var(--font-dm-sans)]",
                              "glow-teal cursor-pointer",
                              "transition-all duration-300",
                              "hover:bg-accent-teal-light hover:shadow-[0_0_80px_rgba(13,107,110,0.4)]"
                            )}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            Get Started Free
                            <ArrowRight className="h-4 w-4" />
                          </motion.button>
                        </form>

                        {/* Login link */}
                        <p className="mt-6 text-center text-sm text-text-tertiary font-[family-name:var(--font-dm-sans)]">
                          Already have an account?{" "}
                          <a
                            href="/login"
                            className="text-accent-teal-light hover:text-accent-teal transition-colors duration-200 font-medium"
                          >
                            Log in
                          </a>
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-bg-primary to-transparent pointer-events-none z-[1]" />
      </section>
    </PageWrapper>
  );
}
