"use client";

import { Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/section-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TiltCard } from "@/components/ui/tilt-card";
import { Reveal } from "@/components/ui/reveal";

interface Tier {
  name: string;
  badge: string;
  badgeVariant: "teal" | "amber" | "neutral";
  price: string;
  period?: string;
  description: string;
  features: string[];
  cta: string;
  href: string;
  recommended?: boolean;
}

const tiers: Tier[] = [
  {
    name: "Starter",
    badge: "Open Source",
    badgeVariant: "neutral",
    price: "Free",
    period: "Self-hosted",
    description:
      "Everything you need to get started. Deploy on your own infrastructure with full access to the platform.",
    features: [
      "Docker deployment",
      "Community support",
      "Up to 25 startups",
      "All 16 modules included",
      "Basic email notifications",
    ],
    cta: "Get Started Free",
    href: "/get-started",
  },
  {
    name: "Professional",
    badge: "Most Popular",
    badgeVariant: "teal",
    price: "\u20B924,999",
    period: "/mo",
    description:
      "Managed infrastructure with premium support, advanced analytics, and custom branding for growing incubators.",
    features: [
      "Managed cloud hosting",
      "Priority email & chat support",
      "Up to 100 startups",
      "Custom branding & white-label",
      "SMTP email integration",
      "Advanced analytics dashboard",
      "Full API access",
    ],
    cta: "Start Free Trial",
    href: "/get-started",
    recommended: true,
  },
  {
    name: "Enterprise",
    badge: "Custom",
    badgeVariant: "amber",
    price: "Custom",
    description:
      "Tailored solutions for large incubation networks with dedicated support, compliance, and custom integrations.",
    features: [
      "Unlimited startups",
      "SSO / SAML authentication",
      "Custom integrations",
      "Dedicated account manager",
      "99.9% uptime SLA",
      "White-label solution",
      "On-site training & onboarding",
    ],
    cta: "Contact Sales",
    href: "/contact",
  },
];

function TierCard({ tier, index }: { tier: Tier; index: number }) {
  return (
    <Reveal direction="up" delay={index * 150}>
    <TiltCard tiltAmount={6} glare>
    <div
      className={cn(
        "relative flex flex-col rounded-2xl border p-8 md:p-10 backdrop-blur-sm transition-all duration-500",
        tier.recommended
          ? "border-accent-teal/40 bg-bg-secondary/80 glow-teal"
          : "border-border bg-bg-secondary/60 hover:border-accent-teal/20"
      )}
    >
      {/* Recommended accent line */}
      {tier.recommended && (
        <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-accent-teal-light/60 to-transparent" />
      )}

      {/* Badge */}
      <div className="mb-6">
        <Badge variant={tier.badgeVariant}>{tier.badge}</Badge>
      </div>

      {/* Name & Price */}
      <h3 className="font-[family-name:var(--font-syne)] text-2xl font-bold text-text-primary mb-2">
        {tier.name}
      </h3>
      <div className="flex items-baseline gap-1 mb-4">
        <span className="font-[family-name:var(--font-syne)] text-4xl md:text-5xl font-bold text-text-primary">
          {tier.price}
        </span>
        {tier.period && (
          <span className="text-text-tertiary text-base font-[family-name:var(--font-jetbrains-mono)]">
            {tier.period}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-text-secondary text-sm leading-relaxed mb-8">
        {tier.description}
      </p>

      {/* Features */}
      <ul className="flex-1 space-y-3 mb-10">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <div
              className={cn(
                "flex h-5 w-5 shrink-0 items-center justify-center rounded-full mt-0.5",
                tier.recommended
                  ? "bg-accent-teal/20 text-accent-teal-light"
                  : "bg-accent-teal/10 text-accent-teal-light"
              )}
            >
              <Check className="h-3 w-3" />
            </div>
            <span className="text-text-secondary text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Button
        variant={tier.recommended ? "primary" : "secondary"}
        size="lg"
        className="w-full"
        href={tier.href}
      >
        {tier.cta}
        <ArrowRight className="w-4 h-4 ml-1" />
      </Button>
    </div>
    </TiltCard>
    </Reveal>
  );
}

export function Pricing() {
  return (
    <section id="pricing" className="relative py-24 md:py-32 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-teal/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Pricing"
          title="Simple, Transparent Pricing"
          subtitle="Start free with our open-source edition. Scale to managed hosting when you're ready."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {tiers.map((tier, index) => (
            <TierCard key={tier.name} tier={tier} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
