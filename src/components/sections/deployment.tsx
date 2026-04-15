"use client";

import {
  Container,
  Cloud,
  Monitor,
  ShieldCheck,
  Users,
  ScrollText,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/section-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Reveal, RevealStagger } from "@/components/ui/reveal";

interface DeploymentOption {
  icon: LucideIcon;
  label: string;
  title: string;
  description: string;
}

const deploymentOptions: DeploymentOption[] = [
  {
    icon: Container,
    label: "Self-Hosted",
    title: "Docker Compose",
    description:
      "Full control. One command: docker compose up. PostgreSQL, Gunicorn, Nginx \u2014 all orchestrated.",
  },
  {
    icon: Cloud,
    label: "Hybrid Cloud",
    title: "Vercel + VPS",
    description:
      "Frontend on Vercel CDN. Backend on your VPS. Auto-configured CORS and preview URLs.",
  },
  {
    icon: Monitor,
    label: "Development",
    title: "Local Dev",
    description:
      "npm run dev and python manage.py runserver. Hot reload on both ends.",
  },
];

const techStack = [
  "Django 6",
  "Next.js 16",
  "React 19",
  "TypeScript",
  "PostgreSQL 16",
  "Docker",
  "Nginx",
  "Tailwind CSS",
  "Python 3.12",
];

interface SecurityFeature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const securityFeatures: SecurityFeature[] = [
  {
    icon: ShieldCheck,
    title: "JWT Authentication",
    description: "Access + refresh tokens with auto-rotation",
  },
  {
    icon: Users,
    title: "Role-Based Access",
    description: "6 permission classes, 4 distinct roles",
  },
  {
    icon: ScrollText,
    title: "Audit Logging",
    description: "Every action tracked with IP, timestamp, entity",
  },
];

function DeploymentCard({
  option,
}: {
  option: DeploymentOption;
}) {
  const Icon = option.icon;

  return (
    <Card className="h-full group">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-teal/10 border border-accent-teal/20 transition-colors duration-300 group-hover:bg-accent-teal/15 group-hover:border-accent-teal/30">
            <Icon className="h-6 w-6 text-accent-teal-light" />
          </div>
          <div>
            <span className="block text-xs font-medium uppercase tracking-wider text-accent-teal-light font-[family-name:var(--font-jetbrains-mono)]">
              {option.label}
            </span>
            <h3 className="font-[family-name:var(--font-syne)] text-xl font-bold text-text-primary tracking-tight">
              {option.title}
            </h3>
          </div>
        </div>
        <p className="text-text-secondary text-sm leading-relaxed">
          {option.description}
        </p>
      </div>
    </Card>
  );
}

function TechStackRow() {
  return (
    <div className="mt-12">
      <Reveal direction="up" delay={200}>
        <p className="text-center text-text-tertiary text-sm font-[family-name:var(--font-jetbrains-mono)] uppercase tracking-wider mb-5">
          Built With
        </p>
      </Reveal>
      <RevealStagger direction="up" staggerMs={50} className="flex flex-wrap justify-center gap-2.5">
        {techStack.map((tech) => (
          <Badge key={tech} variant="neutral">{tech}</Badge>
        ))}
      </RevealStagger>
    </div>
  );
}

function SecurityCard({
  feature,
}: {
  feature: SecurityFeature;
}) {
  const Icon = feature.icon;

  return (
    <Card hover={false} className="h-full">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-amber/10">
          <Icon className="h-5 w-5 text-accent-amber" />
        </div>
        <div>
          <h3 className="font-[family-name:var(--font-syne)] text-lg font-semibold text-text-primary mb-1">
            {feature.title}
          </h3>
          <p className="text-text-secondary text-sm leading-relaxed">
            {feature.description}
          </p>
        </div>
      </div>
    </Card>
  );
}

export function Deployment() {
  return (
    <section
      id="deployment"
      className="relative py-24 md:py-32 lg:py-40 overflow-hidden"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader badge="Infrastructure" title="Deploy Your Way" />

        {/* Deployment options */}
        <RevealStagger direction="up" staggerMs={150} className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {deploymentOptions.map((option) => (
            <DeploymentCard key={option.title} option={option} />
          ))}
        </RevealStagger>

        {/* Tech stack badges */}
        <TechStackRow />

        {/* Security features */}
        <div className="mt-16">
          <RevealStagger direction="up" staggerMs={120} className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {securityFeatures.map((feature) => (
              <SecurityCard
                key={feature.title}
                feature={feature}
              />
            ))}
          </RevealStagger>
        </div>
      </div>
    </section>
  );
}
