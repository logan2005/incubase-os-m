"use client";

import { motion } from "framer-motion";
import {
  FileEdit,
  CheckCircle2,
  XCircle,
  UserCheck,
  ShieldCheck,
  Award,
  Globe,
  Trophy,
  Lightbulb,
  Boxes,
  Send,
  Eye,
  GitBranch,
  Scale,
  Building2,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/section-header";
import { useInView } from "@/hooks/use-in-view";

// ─── Types ────────────────────────────────────────────────────────────────

interface FlowNode {
  icon: LucideIcon;
  label: string;
  status?: "pending" | "approved" | "rejected" | "active";
}

interface TimelineStep {
  label: string;
  active?: boolean;
}

interface RoundCard {
  round: string;
  title: string;
  icon: LucideIcon;
}

interface BranchTrack {
  icon: LucideIcon;
  title: string;
  description: string;
  color: "teal" | "amber" | "purple";
}

// ─── Data ─────────────────────────────────────────────────────────────────

const dualApprovalNodes: FlowNode[] = [
  { icon: FileEdit, label: "Startup Creates", status: "active" },
  { icon: CheckCircle2, label: "Marks Complete", status: "active" },
  { icon: UserCheck, label: "Mentor Reviews", status: "approved" },
  { icon: CheckCircle2, label: "Mentor Decision", status: "approved" },
  { icon: ShieldCheck, label: "Admin Reviews", status: "approved" },
  { icon: CheckCircle2, label: "Admin Decision", status: "approved" },
  { icon: Award, label: "Approved", status: "approved" },
];

const hackathonSteps: TimelineStep[] = [
  { label: "Draft" },
  { label: "Pending Approval" },
  { label: "Approved", active: true },
  { label: "Published" },
  { label: "Registration Open" },
  { label: "In Progress" },
  { label: "Completed" },
];

const judgingRounds: RoundCard[] = [
  { round: "Round 1", title: "Idea Pitch", icon: Lightbulb },
  { round: "Round 2", title: "Prototype", icon: Boxes },
  { round: "Round 3", title: "Final Demo", icon: Trophy },
];

const cproBranches: BranchTrack[] = [
  {
    icon: Globe,
    title: "Front Desk",
    description: "Public showcase with engagement metrics",
    color: "teal",
  },
  {
    icon: Scale,
    title: "IP Services",
    description: "Patent & trademark assistance",
    color: "amber",
  },
  {
    icon: Building2,
    title: "Venture Studio",
    description: "Problem statement matching",
    color: "purple",
  },
];

// ─── Shared animation helpers ─────────────────────────────────────────────

const statusColors = {
  pending: {
    bg: "bg-white/5",
    border: "border-white/10",
    text: "text-text-tertiary",
    iconColor: "text-text-tertiary",
  },
  active: {
    bg: "bg-accent-teal/5",
    border: "border-accent-teal/30",
    text: "text-accent-teal-light",
    iconColor: "text-accent-teal-light",
  },
  approved: {
    bg: "bg-emerald-500/5",
    border: "border-emerald-500/30",
    text: "text-emerald-400",
    iconColor: "text-emerald-400",
  },
  rejected: {
    bg: "bg-red-500/5",
    border: "border-red-500/30",
    text: "text-red-400",
    iconColor: "text-red-400",
  },
};

const branchColors = {
  teal: {
    bg: "bg-accent-teal/5",
    border: "border-accent-teal/30",
    accent: "bg-accent-teal/20",
    text: "text-accent-teal-light",
    line: "bg-accent-teal/40",
  },
  amber: {
    bg: "bg-accent-amber/5",
    border: "border-accent-amber/30",
    accent: "bg-accent-amber/20",
    text: "text-accent-amber",
    line: "bg-accent-amber/40",
  },
  purple: {
    bg: "bg-purple-500/5",
    border: "border-purple-500/30",
    accent: "bg-purple-500/20",
    text: "text-purple-400",
    line: "bg-purple-500/40",
  },
};

// ─── Workflow card wrapper ────────────────────────────────────────────────

function WorkflowCard({
  number,
  title,
  description,
  children,
  isInView,
  delay = 0,
}: {
  number: string;
  title: string;
  description: string;
  children: React.ReactNode;
  isInView: boolean;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className="relative rounded-2xl border border-border bg-bg-secondary/60 backdrop-blur-sm p-8 md:p-10"
    >
      <div className="mb-8">
        <span className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-accent-teal/10 text-accent-teal-light text-sm font-bold font-[family-name:var(--font-jetbrains-mono)] mb-4">
          {number}
        </span>
        <h3 className="font-[family-name:var(--font-syne)] text-2xl md:text-3xl font-bold text-text-primary mb-2">
          {title}
        </h3>
        <p className="text-text-secondary text-sm md:text-base leading-relaxed max-w-2xl">
          {description}
        </p>
      </div>
      {children}
    </motion.div>
  );
}

// ─── Workflow 1: Dual-Approval Milestones ─────────────────────────────────

function DualApprovalDiagram({ isInView }: { isInView: boolean }) {
  return (
    <div className="overflow-x-auto pb-4 -mx-2 px-2">
      <div className="flex items-center gap-0 min-w-[800px]">
        {dualApprovalNodes.map((node, index) => {
          const colors = statusColors[node.status ?? "pending"];
          const Icon = node.icon;
          const isDecision = node.label === "Mentor Decision" || node.label === "Admin Decision";

          return (
            <div key={node.label} className="flex items-center">
              {/* Node */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  duration: 0.4,
                  delay: 0.3 + index * 0.12,
                  ease: "easeOut",
                }}
                className={cn(
                  "relative flex flex-col items-center gap-2",
                  isDecision ? "w-16" : "w-24"
                )}
              >
                {isDecision ? (
                  /* Decision diamond */
                  <div
                    className={cn(
                      "w-10 h-10 rotate-45 rounded-md border-2 flex items-center justify-center",
                      colors.border,
                      colors.bg
                    )}
                  >
                    <div className="-rotate-45">
                      {node.status === "approved" ? (
                        <CheckCircle2 className={cn("h-4 w-4", colors.iconColor)} />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-400" />
                      )}
                    </div>
                  </div>
                ) : (
                  /* Regular node */
                  <div
                    className={cn(
                      "w-14 h-14 rounded-xl border-2 flex items-center justify-center",
                      colors.border,
                      colors.bg
                    )}
                  >
                    <Icon className={cn("h-6 w-6", colors.iconColor)} />
                  </div>
                )}
                <span
                  className={cn(
                    "text-[11px] font-medium text-center leading-tight font-[family-name:var(--font-jetbrains-mono)]",
                    colors.text
                  )}
                >
                  {node.label}
                </span>
              </motion.div>

              {/* Connector arrow */}
              {index < dualApprovalNodes.length - 1 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{
                    duration: 0.3,
                    delay: 0.4 + index * 0.12,
                    ease: "easeOut",
                  }}
                  className="flex items-center origin-left mx-1"
                >
                  <div className="h-[2px] w-6 bg-border" />
                  <div className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[6px] border-l-border" />
                </motion.div>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="flex items-center gap-6 mt-6 pt-4 border-t border-border/50"
      >
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500/30 border border-emerald-500/50" />
          <span className="text-text-tertiary text-xs font-[family-name:var(--font-jetbrains-mono)]">
            Approved
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/30 border border-red-500/50" />
          <span className="text-text-tertiary text-xs font-[family-name:var(--font-jetbrains-mono)]">
            Rejected
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-white/10 border border-white/20" />
          <span className="text-text-tertiary text-xs font-[family-name:var(--font-jetbrains-mono)]">
            Pending
          </span>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Workflow 2: Hackathon Lifecycle ──────────────────────────────────────

function HackathonDiagram({ isInView }: { isInView: boolean }) {
  return (
    <div className="space-y-8">
      {/* Timeline */}
      <div className="overflow-x-auto pb-2 -mx-2 px-2">
        <div className="relative min-w-[700px]">
          {/* Horizontal line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="absolute top-5 left-4 right-4 h-[2px] bg-border origin-left"
          />

          {/* Steps */}
          <div className="relative flex items-start justify-between">
            {hackathonSteps.map((step, index) => {
              const isActive = step.active;
              const isPast = index < (hackathonSteps.findIndex((s) => s.active) ?? 0);
              const progressColor = isPast || isActive;

              return (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.4,
                    delay: 0.4 + index * 0.1,
                    ease: "easeOut",
                  }}
                  className="flex flex-col items-center flex-1"
                >
                  {/* Dot */}
                  <div
                    className={cn(
                      "relative z-10 w-10 h-10 rounded-full border-2 flex items-center justify-center mb-3 transition-colors",
                      isActive
                        ? "border-accent-teal bg-accent-teal/20"
                        : progressColor
                          ? "border-emerald-500/50 bg-emerald-500/10"
                          : "border-border bg-bg-tertiary"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-accent-teal"
                        animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      />
                    )}
                    <span
                      className={cn(
                        "text-xs font-bold font-[family-name:var(--font-jetbrains-mono)]",
                        isActive
                          ? "text-accent-teal-light"
                          : progressColor
                            ? "text-emerald-400"
                            : "text-text-tertiary"
                      )}
                    >
                      {index + 1}
                    </span>
                  </div>
                  {/* Label */}
                  <span
                    className={cn(
                      "text-[11px] font-medium text-center leading-tight max-w-[80px] font-[family-name:var(--font-jetbrains-mono)]",
                      isActive
                        ? "text-accent-teal-light"
                        : progressColor
                          ? "text-emerald-400/70"
                          : "text-text-tertiary"
                    )}
                  >
                    {step.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Judging rounds */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 1.0 }}
      >
        <p className="text-text-secondary text-sm mb-4 font-[family-name:var(--font-jetbrains-mono)]">
          Multi-level rounds with weighted judging criteria
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {judgingRounds.map((round, index) => {
            const RoundIcon = round.icon;
            return (
              <motion.div
                key={round.round}
                initial={{ opacity: 0, x: -16 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 1.1 + index * 0.12 }}
                className="flex items-center gap-3 rounded-xl border border-accent-teal/20 bg-accent-teal/[0.03] p-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-teal/10">
                  <RoundIcon className="h-5 w-5 text-accent-teal-light" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-accent-teal-light font-[family-name:var(--font-jetbrains-mono)]">
                    {round.round}
                  </span>
                  <p className="text-sm font-semibold text-text-primary font-[family-name:var(--font-syne)]">
                    {round.title}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

// ─── Workflow 3: C.Pro Innovation Pipeline ────────────────────────────────

function CProDiagram({ isInView }: { isInView: boolean }) {
  return (
    <div className="space-y-6">
      {/* Top row: Submission → Admin Reviews → Branch point */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
        {/* Submission node */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex items-center gap-3 rounded-xl border-2 border-accent-teal/30 bg-accent-teal/5 px-5 py-4 shrink-0"
        >
          <Send className="h-5 w-5 text-accent-teal-light" />
          <div>
            <span className="text-xs text-accent-teal-light font-[family-name:var(--font-jetbrains-mono)] uppercase tracking-wider">
              Intake
            </span>
            <p className="text-sm font-semibold text-text-primary font-[family-name:var(--font-syne)]">
              Submission
            </p>
          </div>
        </motion.div>

        {/* Arrow */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="hidden md:flex items-center origin-left"
        >
          <div className="h-[2px] w-10 bg-border" />
          <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[8px] border-l-border" />
        </motion.div>

        {/* Mobile vertical arrow */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="flex md:hidden items-center justify-center origin-top"
        >
          <div className="flex flex-col items-center">
            <div className="w-[2px] h-6 bg-border" />
            <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[8px] border-t-border" />
          </div>
        </motion.div>

        {/* Admin review node */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="flex items-center gap-3 rounded-xl border-2 border-accent-amber/30 bg-accent-amber/5 px-5 py-4 shrink-0"
        >
          <Eye className="h-5 w-5 text-accent-amber" />
          <div>
            <span className="text-xs text-accent-amber font-[family-name:var(--font-jetbrains-mono)] uppercase tracking-wider">
              Review
            </span>
            <p className="text-sm font-semibold text-text-primary font-[family-name:var(--font-syne)]">
              Admin Reviews
            </p>
          </div>
        </motion.div>

        {/* Arrow to branch */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.8 }}
          className="hidden md:flex items-center origin-left"
        >
          <div className="h-[2px] w-10 bg-border" />
          <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[8px] border-l-border" />
        </motion.div>

        {/* Mobile vertical arrow */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.8 }}
          className="flex md:hidden items-center justify-center origin-top"
        >
          <div className="flex flex-col items-center">
            <div className="w-[2px] h-6 bg-border" />
            <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[8px] border-t-border" />
          </div>
        </motion.div>

        {/* Branch point */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.9 }}
          className="flex items-center gap-3 shrink-0"
        >
          <div className="relative">
            <div className="w-12 h-12 rounded-full border-2 border-emerald-500/40 bg-emerald-500/10 flex items-center justify-center">
              <GitBranch className="h-5 w-5 text-emerald-400" />
            </div>
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-emerald-500/30"
              animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <span className="text-xs text-emerald-400 font-[family-name:var(--font-jetbrains-mono)] font-medium md:hidden">
            Approved — branches into 3 tracks
          </span>
        </motion.div>
      </div>

      {/* Branches */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:pl-[calc(100%-66%)]">
        {cproBranches.map((branch, index) => {
          const colors = branchColors[branch.color];
          const BranchIcon = branch.icon;

          return (
            <motion.div
              key={branch.title}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: 1.1 + index * 0.15,
                ease: "easeOut",
              }}
              className="relative"
            >
              {/* Connector line from branch point - desktop only */}
              <motion.div
                initial={{ scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : {}}
                transition={{ duration: 0.3, delay: 1.0 + index * 0.15 }}
                className={cn(
                  "hidden md:block absolute -top-4 left-1/2 -translate-x-1/2 w-[2px] h-4 origin-top",
                  colors.line
                )}
              />

              {/* Track card */}
              <div
                className={cn(
                  "rounded-xl border-2 p-5 transition-all duration-300",
                  colors.border,
                  colors.bg,
                  "hover:shadow-lg"
                )}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                      colors.accent
                    )}
                  >
                    <BranchIcon className={cn("h-5 w-5", colors.text)} />
                  </div>
                  <div>
                    <h4
                      className={cn(
                        "text-sm font-bold font-[family-name:var(--font-syne)]",
                        colors.text
                      )}
                    >
                      {branch.title}
                    </h4>
                    <p className="text-text-secondary text-xs leading-relaxed mt-1">
                      {branch.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────

export function Workflows() {
  const { ref: ref1, isInView: isInView1 } = useInView();
  const { ref: ref2, isInView: isInView2 } = useInView();
  const { ref: ref3, isInView: isInView3 } = useInView();

  return (
    <section id="workflows" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Workflows"
          title="Structured Processes. Zero Chaos."
          subtitle="From milestone approvals to hackathon judging, every workflow is visual, auditable, and automated."
        />

        <div className="space-y-8">
          {/* Workflow 1 */}
          <div ref={ref1}>
            <WorkflowCard
              number="01"
              title="Dual-Approval Milestones"
              description="Every startup milestone passes through a structured two-tier review. Mentors validate progress, admins authorize completion. Full audit trail, zero ambiguity."
              isInView={isInView1}
              delay={0}
            >
              <DualApprovalDiagram isInView={isInView1} />
            </WorkflowCard>
          </div>

          {/* Workflow 2 */}
          <div ref={ref2}>
            <WorkflowCard
              number="02"
              title="Hackathon Lifecycle"
              description="End-to-end hackathon management from draft to completion. Multi-round judging with weighted criteria ensures fair, transparent evaluation at every stage."
              isInView={isInView2}
              delay={0}
            >
              <HackathonDiagram isInView={isInView2} />
            </WorkflowCard>
          </div>

          {/* Workflow 3 */}
          <div ref={ref3}>
            <WorkflowCard
              number="03"
              title="C.Pro Innovation Pipeline"
              description="Innovation submissions flow through a structured review process and branch into specialized tracks — public showcase, IP protection, or venture matching."
              isInView={isInView3}
              delay={0}
            >
              <CProDiagram isInView={isInView3} />
            </WorkflowCard>
          </div>
        </div>
      </div>
    </section>
  );
}
