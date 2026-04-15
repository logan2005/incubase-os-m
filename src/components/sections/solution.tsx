"use client";

import {
  ClipboardCheck,
  LineChart,
  Handshake,
  IndianRupee,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/section-header";
import { GradientOrb } from "@/components/ui/gradient-orb";
import { TiltCard } from "@/components/ui/tilt-card";
import { Reveal } from "@/components/ui/reveal";

interface Pillar {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
}

const pillars: Pillar[] = [
  {
    number: "01",
    icon: ClipboardCheck,
    title: "Streamlined Intake",
    description:
      "Structured application forms for startups, mentors, and investors. Stakeholder validation, admin review, and approval pipelines \u2014 all digitized.",
    features: ["3 Application Types", "Stakeholder Validation", "Auto-Status Tracking"],
  },
  {
    number: "02",
    icon: LineChart,
    title: "360\u00B0 Incubation",
    description:
      "Track KPIs, milestones, and tasks per startup with dual-approval workflows. Mentors and admins collaborate on every checkpoint.",
    features: ["Quarterly KPIs", "Dual-Approval Milestones", "Grievance System"],
  },
  {
    number: "03",
    icon: Handshake,
    title: "Stakeholder Hub",
    description:
      "Connect mentors to startups, investors to opportunities. Every session, every connection, every interaction \u2014 logged and validated.",
    features: ["Mentor Sessions", "Investor Pipeline", "In-App Messaging"],
  },
  {
    number: "04",
    icon: IndianRupee,
    title: "Revenue Intelligence",
    description:
      "Track every income stream \u2014 incubation fees, coworking, events, labs, success fees. Know exactly where your revenue comes from.",
    features: ["8 Revenue Streams", "Invoice Tracking", "Quarterly Reports"],
  },
];

function PillarCard({ pillar, index }: { pillar: Pillar; index: number }) {
  const Icon = pillar.icon;

  return (
    <Reveal direction="up" delay={index * 150}>
    <TiltCard tiltAmount={8} glare>
    <div
      className="group relative overflow-hidden rounded-2xl border border-border bg-bg-secondary/60 backdrop-blur-sm p-8 md:p-10 transition-colors duration-300 hover:border-accent-teal/30 hover:bg-bg-secondary"
    >
      {/* Number watermark */}
      <span
        className="absolute top-4 right-6 font-[family-name:var(--font-syne)] text-[7rem] md:text-[8rem] font-bold leading-none text-text-primary/[0.03] select-none pointer-events-none transition-colors duration-300 group-hover:text-accent-teal/[0.06]"
        aria-hidden="true"
      >
        {pillar.number}
      </span>

      {/* Icon */}
      <div className="relative z-10 mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-teal/10 border border-accent-teal/20 transition-colors duration-300 group-hover:bg-accent-teal/15 group-hover:border-accent-teal/30">
        <Icon className="h-6 w-6 text-accent-teal-light" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="font-[family-name:var(--font-syne)] text-xl md:text-2xl font-bold text-text-primary mb-3 tracking-tight">
          {pillar.title}
        </h3>
        <p className="text-text-secondary text-sm md:text-base leading-relaxed mb-6">
          {pillar.description}
        </p>

        {/* Feature tags */}
        <div className="flex flex-wrap gap-2">
          {pillar.features.map((feature) => (
            <span
              key={feature}
              className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-lg bg-accent-teal/5 text-accent-teal-light border border-accent-teal/10 font-[family-name:var(--font-jetbrains-mono)] tracking-wide"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>

      {/* Subtle bottom glow on hover */}
      <div
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 rounded-full bg-accent-teal/0 blur-2xl transition-all duration-500 group-hover:bg-accent-teal/10"
        aria-hidden="true"
      />
    </div>
    </TiltCard>
    </Reveal>
  );
}

export function Solution() {
  return (
    <section
      id="solution"
      className="relative py-24 md:py-32 lg:py-40 overflow-hidden"
    >
      {/* Background orbs */}
      <GradientOrb
        color="teal"
        size="lg"
        className="-top-40 -left-40 opacity-50"
      />
      <GradientOrb
        color="teal"
        size="md"
        className="-bottom-20 -right-20 opacity-40"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="The Solution"
          title="One Platform. Every Workflow."
        />

        {/* 2-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {pillars.map((pillar, index) => (
            <PillarCard key={pillar.number} pillar={pillar} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
