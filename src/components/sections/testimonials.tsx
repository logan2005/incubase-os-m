"use client";

import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/section-header";
import { Marquee } from "@/components/ui/marquee";
import { Reveal, RevealStagger } from "@/components/ui/reveal";
import { Quote } from "lucide-react";

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  org: string;
  initials: string;
  color: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "We replaced 12 different tools with IncubaseOS. Applications, milestone tracking, mentor sessions, revenue reports \u2014 everything lives in one place now. Our team saves 20+ hours every week.",
    name: "Dr. Priya Sharma",
    title: "Director",
    org: "IITM Incubation Cell",
    initials: "PS",
    color: "bg-accent-teal",
  },
  {
    quote:
      "The dual-approval milestone system alone was worth the switch. Every checkpoint is reviewed by both the mentor and admin before it\u2019s marked complete. Our audit headaches have completely disappeared.",
    name: "Rajesh Kumar",
    title: "CEO",
    org: "T-Hub Accelerator",
    initials: "RK",
    color: "bg-accent-amber",
  },
  {
    quote:
      "Hackathon management was a game-changer for us. From registrations to team formation to judging \u2014 the entire flow is digitized. We ran our last event with half the coordination effort.",
    name: "Ananya Patel",
    title: "Manager",
    org: "NASSCOM CoE",
    initials: "AP",
    color: "bg-purple-500",
  },
];

const trustedOrgs = [
  "IIT Hyderabad",
  "NASSCOM",
  "T-Hub",
  "SINE IIT Bombay",
  "KIIT-TBI",
  "AIC-RAISE",
];

function TestimonialCard({
  testimonial,
}: {
  testimonial: Testimonial;
}) {
  return (
    <div
      className={cn(
        "relative rounded-2xl border border-border bg-bg-secondary/60 backdrop-blur-sm p-8",
        "border-l-4 border-l-accent-teal/60",
        "transition-all duration-500",
        "hover:border-border hover:border-l-accent-teal hover:bg-bg-secondary"
      )}
    >
      {/* Quote icon */}
      <Quote className="h-8 w-8 text-accent-teal/20 mb-4" />

      {/* Quote text */}
      <p className="text-text-primary text-base md:text-lg leading-relaxed mb-8">
        {testimonial.quote}
      </p>

      {/* Author info */}
      <div className="flex items-center gap-4">
        {/* Avatar circle with initials */}
        <div
          className={cn(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-full",
            testimonial.color
          )}
        >
          <span className="font-[family-name:var(--font-syne)] text-sm font-bold text-white">
            {testimonial.initials}
          </span>
        </div>

        <div>
          <p className="font-[family-name:var(--font-syne)] text-sm font-semibold text-text-primary">
            {testimonial.name}
          </p>
          <p className="text-text-secondary text-sm">
            {testimonial.title}, {testimonial.org}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 md:py-32 lg:py-40 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Testimonials"
          title="Trusted by India's Best Incubators"
        />

        {/* Testimonial cards */}
        <RevealStagger direction="up" staggerMs={150} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.name}
              testimonial={testimonial}
            />
          ))}
        </RevealStagger>

        {/* Trusted by section */}
        <Reveal direction="up" className="text-center">
          <p className="text-text-secondary text-sm md:text-base font-medium tracking-wide mb-8">
            Trusted by 50+ Incubators Across India
          </p>

          <Marquee speed={30} pauseOnHover>
            {trustedOrgs.map((org) => (
              <div
                key={org}
                className={cn(
                  "inline-flex items-center px-5 py-2.5 rounded-lg",
                  "bg-bg-secondary/80 border border-border",
                  "text-text-tertiary text-sm font-[family-name:var(--font-jetbrains-mono)] tracking-wide",
                  "transition-colors duration-300",
                  "hover:text-text-secondary hover:border-accent-teal/20"
                )}
              >
                {org}
              </div>
            ))}
          </Marquee>
        </Reveal>
      </div>
    </section>
  );
}
