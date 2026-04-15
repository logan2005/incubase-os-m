"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Monitor,
  LayoutDashboard,
  Rocket,
  Plug,
  Calendar,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";
import { PageWrapper } from "@/components/page-wrapper";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GradientOrb } from "@/components/ui/gradient-orb";
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/use-in-view";

const demoHighlights = [
  {
    icon: Monitor,
    title: "Complete platform demo",
    description: "End-to-end walkthrough of every core module",
  },
  {
    icon: LayoutDashboard,
    title: "Role-based dashboard walkthrough",
    description: "See views for admins, mentors, and startups",
  },
  {
    icon: Rocket,
    title: "Hackathon & C.Pro pipeline setup",
    description: "Launch programs and track cohort progress",
  },
  {
    icon: Plug,
    title: "Integration & deployment options",
    description: "Connect tools and choose your hosting path",
  },
];

const roleOptions = [
  "Incubator Director",
  "Program Manager",
  "Startup Founder",
  "Mentor / Advisor",
  "Government Official",
  "Investor",
  "Other",
];

export default function DemoPage() {
  const [submitted, setSubmitted] = useState(false);
  const { ref: leftRef, isInView: leftInView } = useInView();
  const { ref: rightRef, isInView: rightInView } = useInView();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <PageWrapper>
      <section className="relative py-20 md:py-28 lg:py-36 overflow-hidden">
        {/* Background gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-teal/[0.03] to-transparent pointer-events-none" />

        {/* Background orbs */}
        <GradientOrb
          color="teal"
          size="lg"
          className="-top-40 -left-40 opacity-40"
        />
        <GradientOrb
          color="amber"
          size="sm"
          className="top-1/4 right-0 opacity-25"
        />
        <GradientOrb
          color="teal"
          size="md"
          className="-bottom-40 -right-20 opacity-30"
        />
        <GradientOrb
          color="purple"
          size="sm"
          className="bottom-1/4 left-1/6 opacity-20"
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left side - Copy */}
            <motion.div
              ref={leftRef}
              initial={{ opacity: 0, x: -40 }}
              animate={leftInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="flex flex-col gap-8"
            >
              <div>
                <Badge variant="teal" className="mb-6">
                  Live Demo
                </Badge>

                <h1 className="font-[family-name:var(--font-syne)] text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary mb-5">
                  See IncubaseOS{" "}
                  <span className="bg-gradient-to-r from-accent-teal-light to-accent-teal bg-clip-text text-transparent">
                    in Action
                  </span>
                </h1>

                <p className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-lg font-[family-name:var(--font-dm-sans)]">
                  Get a personalized walkthrough of the platform tailored to
                  your incubator&apos;s needs.
                </p>
              </div>

              {/* What you'll see */}
              <div>
                <h3 className="font-[family-name:var(--font-syne)] text-sm uppercase tracking-widest text-accent-teal-light mb-5 font-semibold">
                  What you&apos;ll see
                </h3>

                <div className="flex flex-col gap-4">
                  {demoHighlights.map((item, i) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={leftInView ? { opacity: 1, x: 0 } : {}}
                      transition={{
                        duration: 0.5,
                        delay: 0.2 + i * 0.1,
                        ease: "easeOut",
                      }}
                      className="flex items-start gap-4 group"
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent-teal/10 border border-accent-teal/20 flex items-center justify-center group-hover:bg-accent-teal/20 transition-colors duration-300">
                        <item.icon className="w-5 h-5 text-accent-teal-light" />
                      </div>
                      <div>
                        <p className="text-text-primary font-medium font-[family-name:var(--font-dm-sans)]">
                          {item.title}
                        </p>
                        <p className="text-text-tertiary text-sm font-[family-name:var(--font-dm-sans)]">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Bottom badges */}
              <motion.div
                className="flex flex-wrap gap-3 pt-2"
                initial={{ opacity: 0, y: 10 }}
                animate={leftInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.7, ease: "easeOut" }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-text-secondary text-sm font-[family-name:var(--font-dm-sans)]">
                  <Clock className="w-4 h-4 text-accent-teal-light" />
                  30-minute session
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-text-secondary text-sm font-[family-name:var(--font-dm-sans)]">
                  <ShieldCheck className="w-4 h-4 text-accent-teal-light" />
                  No commitment required
                </span>
              </motion.div>
            </motion.div>

            {/* Right side - Form Card */}
            <motion.div
              ref={rightRef}
              initial={{ opacity: 0, x: 40 }}
              animate={rightInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            >
              <div className="relative rounded-2xl bg-bg-secondary/60 backdrop-blur-xl border border-border p-6 md:p-8">
                {/* Subtle glow at top of card */}
                <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-accent-teal/50 to-transparent" />

                <AnimatePresence mode="wait">
                  {!submitted ? (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col gap-5"
                    >
                      <h2 className="font-[family-name:var(--font-syne)] text-xl font-semibold text-text-primary mb-1">
                        Book Your Demo
                      </h2>

                      {/* Full Name */}
                      <div className="flex flex-col gap-1.5">
                        <label
                          htmlFor="fullName"
                          className="text-sm text-text-secondary font-[family-name:var(--font-dm-sans)]"
                        >
                          Full Name
                        </label>
                        <input
                          id="fullName"
                          type="text"
                          required
                          placeholder="John Doe"
                          className={cn(
                            "w-full px-4 py-2.5 rounded-xl bg-bg-tertiary border border-border text-text-primary placeholder:text-text-tertiary text-sm",
                            "focus:outline-none focus:ring-1 focus:ring-accent-teal/50 focus:border-accent-teal/50 transition-all duration-200",
                            "font-[family-name:var(--font-dm-sans)]"
                          )}
                        />
                      </div>

                      {/* Email */}
                      <div className="flex flex-col gap-1.5">
                        <label
                          htmlFor="email"
                          className="text-sm text-text-secondary font-[family-name:var(--font-dm-sans)]"
                        >
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          required
                          placeholder="john@incubator.com"
                          className={cn(
                            "w-full px-4 py-2.5 rounded-xl bg-bg-tertiary border border-border text-text-primary placeholder:text-text-tertiary text-sm",
                            "focus:outline-none focus:ring-1 focus:ring-accent-teal/50 focus:border-accent-teal/50 transition-all duration-200",
                            "font-[family-name:var(--font-dm-sans)]"
                          )}
                        />
                      </div>

                      {/* Organization */}
                      <div className="flex flex-col gap-1.5">
                        <label
                          htmlFor="organization"
                          className="text-sm text-text-secondary font-[family-name:var(--font-dm-sans)]"
                        >
                          Organization
                        </label>
                        <input
                          id="organization"
                          type="text"
                          required
                          placeholder="Your incubator or organization"
                          className={cn(
                            "w-full px-4 py-2.5 rounded-xl bg-bg-tertiary border border-border text-text-primary placeholder:text-text-tertiary text-sm",
                            "focus:outline-none focus:ring-1 focus:ring-accent-teal/50 focus:border-accent-teal/50 transition-all duration-200",
                            "font-[family-name:var(--font-dm-sans)]"
                          )}
                        />
                      </div>

                      {/* Role + Phone row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* Role */}
                        <div className="flex flex-col gap-1.5">
                          <label
                            htmlFor="role"
                            className="text-sm text-text-secondary font-[family-name:var(--font-dm-sans)]"
                          >
                            Role
                          </label>
                          <div className="relative">
                            <select
                              id="role"
                              required
                              defaultValue=""
                              className={cn(
                                "w-full px-4 py-2.5 rounded-xl bg-bg-tertiary border border-border text-text-primary text-sm appearance-none",
                                "focus:outline-none focus:ring-1 focus:ring-accent-teal/50 focus:border-accent-teal/50 transition-all duration-200",
                                "font-[family-name:var(--font-dm-sans)]"
                              )}
                            >
                              <option value="" disabled className="text-text-tertiary">
                                Select your role
                              </option>
                              {roleOptions.map((role) => (
                                <option key={role} value={role}>
                                  {role}
                                </option>
                              ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary pointer-events-none" />
                          </div>
                        </div>

                        {/* Phone */}
                        <div className="flex flex-col gap-1.5">
                          <label
                            htmlFor="phone"
                            className="text-sm text-text-secondary font-[family-name:var(--font-dm-sans)]"
                          >
                            Phone Number
                          </label>
                          <input
                            id="phone"
                            type="tel"
                            placeholder="+1 (555) 000-0000"
                            className={cn(
                              "w-full px-4 py-2.5 rounded-xl bg-bg-tertiary border border-border text-text-primary placeholder:text-text-tertiary text-sm",
                              "focus:outline-none focus:ring-1 focus:ring-accent-teal/50 focus:border-accent-teal/50 transition-all duration-200",
                              "font-[family-name:var(--font-dm-sans)]"
                            )}
                          />
                        </div>
                      </div>

                      {/* Challenge textarea */}
                      <div className="flex flex-col gap-1.5">
                        <label
                          htmlFor="challenge"
                          className="text-sm text-text-secondary font-[family-name:var(--font-dm-sans)]"
                        >
                          What&apos;s your biggest incubation challenge?
                        </label>
                        <textarea
                          id="challenge"
                          rows={3}
                          placeholder="Tell us about your current workflow pain points..."
                          className={cn(
                            "w-full px-4 py-2.5 rounded-xl bg-bg-tertiary border border-border text-text-primary placeholder:text-text-tertiary text-sm resize-none",
                            "focus:outline-none focus:ring-1 focus:ring-accent-teal/50 focus:border-accent-teal/50 transition-all duration-200",
                            "font-[family-name:var(--font-dm-sans)]"
                          )}
                        />
                      </div>

                      {/* Preferred Demo Date */}
                      <div className="flex flex-col gap-1.5">
                        <label
                          htmlFor="demoDate"
                          className="text-sm text-text-secondary font-[family-name:var(--font-dm-sans)]"
                        >
                          Preferred Demo Date
                        </label>
                        <input
                          id="demoDate"
                          type="date"
                          className={cn(
                            "w-full px-4 py-2.5 rounded-xl bg-bg-tertiary border border-border text-text-primary text-sm",
                            "focus:outline-none focus:ring-1 focus:ring-accent-teal/50 focus:border-accent-teal/50 transition-all duration-200",
                            "font-[family-name:var(--font-dm-sans)]",
                            "[color-scheme:dark]"
                          )}
                        />
                      </div>

                      {/* Submit button */}
                      <Button
                        variant="primary"
                        size="lg"
                        className="w-full mt-2"
                      >
                        <Calendar className="w-5 h-5" />
                        Schedule My Demo
                      </Button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="flex flex-col items-center justify-center text-center py-16 gap-5"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 15,
                          delay: 0.15,
                        }}
                        className="w-20 h-20 rounded-full bg-accent-teal/15 border border-accent-teal/30 flex items-center justify-center"
                      >
                        <Calendar className="w-9 h-9 text-accent-teal-light" />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35, duration: 0.4 }}
                      >
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <CheckCircle2 className="w-5 h-5 text-accent-teal-light" />
                          <h3 className="font-[family-name:var(--font-syne)] text-2xl font-bold text-text-primary">
                            Demo Scheduled!
                          </h3>
                        </div>
                        <p className="text-text-secondary font-[family-name:var(--font-dm-sans)] text-base">
                          We&apos;ll send you a calendar invite shortly.
                        </p>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
