"use client";

import {
  FileSpreadsheet,
  MessageSquareOff,
  Clock,
  ShieldAlert,
  Workflow,
  DollarSign,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/section-header";
import { Card } from "@/components/ui/card";
import { RevealStagger } from "@/components/ui/reveal";

interface PainPoint {
  icon: LucideIcon;
  title: string;
  description: string;
}

const painPoints: PainPoint[] = [
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
      "Mentors, investors, and startups operate in silos. No unified view of who\u2019s doing what, when, or how well.",
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
      "When stakeholders ask \u2018who approved this?\u2019 or \u2018when was that milestone completed?\u2019 \u2014 you\u2019re digging through inboxes.",
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
      "Incubation fees, coworking charges, lab bookings, event revenue \u2014 tracked in separate systems with no unified view.",
  },
];

export function PainPoints() {
  return (
    <section id="pain-points" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="The Problem"
          title="Running an Incubator Shouldn't Feel Like This"
          subtitle="You're building the future of innovation, but your operations are held together by spreadsheets, WhatsApp threads, and tribal knowledge."
        />

        <RevealStagger direction="up" staggerMs={100} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {painPoints.map((point) => {
            const Icon = point.icon;

            return (
              <Card
                key={point.title}
                hover={false}
                className={cn(
                  "h-full border-red-500/10 bg-red-500/[0.02]",
                  "hover:border-red-500/25 hover:bg-red-500/[0.04]",
                  "transition-all duration-500"
                )}
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-500/10">
                    <Icon className="h-5 w-5 text-red-400" />
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-syne)] text-lg font-semibold text-text-primary mb-2">
                      {point.title}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </RevealStagger>
      </div>
    </section>
  );
}
