"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import {
  ClipboardList,
  Rocket,
  Users,
  Landmark,
  CalendarDays,
  Trophy,
  Lightbulb,
  Coins,
  Building2,
  GraduationCap,
  FileText,
  TrendingUp,
  MessageSquare,
  Bell,
  Award,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type { LucideIcon } from "lucide-react";

/* ─── Module Data ─── */
interface Module {
  icon: LucideIcon;
  title: string;
  description: string;
  tags: string[];
  color: string;
  number: string;
}

const modules: Module[] = [
  { icon: ClipboardList, title: "Applications & Onboarding", description: "Structured intake for startups, mentors, and investors with multi-stage review pipelines, stakeholder validation, and automated status tracking.", tags: ["Review Pipelines", "Auto-Routing", "Multi-Role"], color: "from-teal-500 to-emerald-500", number: "01" },
  { icon: Rocket, title: "Startup Management", description: "Track KPIs, milestones, tasks, and grievances per startup with dual-approval workflows and real-time progress dashboards.", tags: ["KPI Tracking", "Milestones", "Task Boards"], color: "from-blue-500 to-cyan-500", number: "02" },
  { icon: Users, title: "Mentor Management", description: "Manage mentor profiles, schedule sessions, handle assignments, collect feedback, and validate outcomes seamlessly.", tags: ["Session Scheduling", "Feedback Loops", "Assignments"], color: "from-violet-500 to-purple-500", number: "03" },
  { icon: Landmark, title: "Investor Management", description: "Maintain investor portfolios and admin-mediated connection pipeline with NOC grants and deal flow tracking.", tags: ["Portfolios", "Deal Pipeline", "NOC Grants"], color: "from-amber-500 to-orange-500", number: "04" },
  { icon: CalendarDays, title: "Events", description: "Run online, offline, and hybrid events with built-in ticketing, coupon management, and attendee tracking.", tags: ["Ticketing", "Hybrid Support", "Coupons"], color: "from-pink-500 to-rose-500", number: "05" },
  { icon: Trophy, title: "Hackathons", description: "End-to-end hackathon orchestration with multi-level rounds, weighted judging criteria, team formation, scoring rubrics, and admin override.", tags: ["Multi-Round", "Judging Criteria", "Team Management", "Scoring"], color: "from-yellow-500 to-amber-500", number: "06" },
  { icon: Lightbulb, title: "C.Pro Innovation Pipeline", description: "A 3-track innovation engine: Front Desk public showcase, IP Services for patent and trademark support, and Venture Studio for idea-to-launch acceleration.", tags: ["Front Desk", "IP Services", "Venture Studio", "3 Tracks"], color: "from-emerald-500 to-teal-500", number: "07" },
  { icon: Coins, title: "Funding Schemes", description: "Comprehensive directory of grants, loans, equity programs, and accelerator opportunities with eligibility matching.", tags: ["Grant Directory", "Eligibility Match"], color: "from-green-500 to-emerald-500", number: "08" },
  { icon: Building2, title: "Resources & Facilities", description: "Manage lab equipment, coworking seats, and meeting rooms with an integrated booking and inventory system.", tags: ["Booking System", "Inventory", "Lab Equipment"], color: "from-slate-500 to-zinc-500", number: "09" },
  { icon: GraduationCap, title: "Internships", description: "Post, manage, and track internship openings with application pipeline across your portfolio startups.", tags: ["Job Postings", "Applicant Tracking"], color: "from-indigo-500 to-blue-500", number: "10" },
  { icon: FileText, title: "Publications", description: "Track research papers, patents, case studies, and whitepapers produced across your incubator ecosystem.", tags: ["Papers", "Patents", "Case Studies"], color: "from-cyan-500 to-sky-500", number: "11" },
  { icon: TrendingUp, title: "Revenue Tracking", description: "Monitor 8 distinct income streams — incubation fees, coworking, events, labs, success fees — with invoice management.", tags: ["8 Streams", "Invoicing", "Reports"], color: "from-lime-500 to-green-500", number: "12" },
  { icon: MessageSquare, title: "Messaging", description: "In-app direct messaging between startups, mentors, investors, and administrators with conversation threading.", tags: ["Direct Messages", "Threaded"], color: "from-sky-500 to-blue-500", number: "13" },
  { icon: Bell, title: "Notifications", description: "10 notification types — payment reminders, event alerts, KPI submissions, application updates, and more.", tags: ["System Alerts", "Custom Triggers", "10 Types"], color: "from-orange-500 to-red-500", number: "14" },
  { icon: Award, title: "Success Stories", description: "Curate and publish alumni showcases with funding raised, exit types, and featured stories on your public site.", tags: ["Alumni Showcase", "Public Site"], color: "from-fuchsia-500 to-pink-500", number: "15" },
  { icon: ShieldCheck, title: "Audit & Compliance", description: "Complete action logging with IP tracking, 6 permission classes, Excel/PDF exports, and quarterly report generation.", tags: ["Action Logs", "Permissions", "Exports"], color: "from-red-500 to-rose-500", number: "16" },
];

/* ─── Module Card — uses CSS transitions (no Framer per-frame) ─── */
function ModuleCard({ module, isActive }: { module: Module; isActive: boolean }) {
  const Icon = module.icon;

  return (
    <div
      className={cn(
        "absolute inset-0 flex items-center justify-center px-6 md:px-16 transition-all duration-500 ease-out will-change-[transform,opacity]",
        isActive
          ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
          : "opacity-0 translate-y-8 scale-[0.97] pointer-events-none"
      )}
    >
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-10 lg:gap-16 items-center">
        {/* Left: Icon */}
        <div className="flex flex-col items-center lg:items-start">
          <div
            className={cn(
              "w-24 h-24 md:w-28 md:h-28 rounded-3xl flex items-center justify-center shadow-2xl bg-gradient-to-br transition-transform duration-700",
              module.color,
              isActive && "animate-float"
            )}
          >
            <Icon className="w-12 h-12 md:w-14 md:h-14 text-white drop-shadow-lg" />
          </div>
        </div>

        {/* Right: Content */}
        <div className="text-center lg:text-left">
          <div className="flex items-center gap-3 mb-3 justify-center lg:justify-start">
            <span className="font-[family-name:var(--font-jetbrains-mono)] text-sm text-accent-teal-light font-medium">
              Module {module.number}
            </span>
            <div className="h-px w-12 bg-border" />
          </div>

          <h3 className="font-[family-name:var(--font-syne)] text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-4 tracking-tight leading-tight">
            {module.title}
          </h3>

          <p className="text-text-secondary text-base md:text-lg leading-relaxed mb-6 max-w-2xl">
            {module.description}
          </p>

          <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
            {module.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-accent-teal/5 text-accent-teal-light border border-accent-teal/10 font-[family-name:var(--font-jetbrains-mono)] tracking-wide"
              >
                <ChevronRight className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Progress Rail ─── */
function ProgressRail({
  activeIndex,
  onSelect,
}: {
  activeIndex: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-center gap-1">
      {modules.map((mod, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          className={cn(
            "group relative flex items-center gap-2 py-1 transition-all duration-300",
            i === activeIndex ? "opacity-100" : "opacity-30 hover:opacity-60"
          )}
          aria-label={`Module ${mod.number}: ${mod.title}`}
        >
          <div
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              i === activeIndex
                ? "bg-accent-teal-light scale-150 shadow-[0_0_8px_rgba(20,184,166,0.5)]"
                : "bg-text-tertiary"
            )}
          />
          <span className="absolute right-6 whitespace-nowrap text-xs font-medium text-text-secondary bg-bg-secondary/90 backdrop-blur-sm border border-border px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {mod.title}
          </span>
        </button>
      ))}
    </div>
  );
}

/* ─── Main Features Section ─── */
export function Features() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Debounced index update — only update state when index actually changes
  const lastIndex = useRef(0);
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const index = Math.min(
      Math.floor(latest * modules.length),
      modules.length - 1
    );
    if (index !== lastIndex.current) {
      lastIndex.current = index;
      setActiveIndex(index);
    }
  });

  const handleSelect = useCallback((i: number) => {
    if (!containerRef.current) return;
    const totalScrollable = containerRef.current.scrollHeight - window.innerHeight;
    const targetScroll = containerRef.current.offsetTop + (i / modules.length) * totalScrollable;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  }, []);

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="features"
      ref={containerRef}
      style={{ height: `${modules.length * 55}vh` }}
      className="relative"
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Subtle background */}
        <div className="absolute inset-0 grid-bg" />

        {/* Top progress bar */}
        <div className="absolute top-0 left-0 right-0 h-0.5 z-30 bg-border/30">
          <motion.div
            className="h-full bg-gradient-to-r from-accent-teal to-accent-teal-light"
            style={{ width: progressWidth }}
          />
        </div>

        {/* Header */}
        <div className="absolute top-20 md:top-24 left-0 right-0 z-20 px-6 md:px-12">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Badge variant="teal">Platform</Badge>
              <h2 className="font-[family-name:var(--font-syne)] text-xl md:text-2xl font-bold text-text-primary">
                16 Modules. Zero Gaps.
              </h2>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <span className="font-[family-name:var(--font-jetbrains-mono)] text-3xl font-bold text-accent-teal-light tabular-nums">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              <span className="text-text-tertiary text-sm">/</span>
              <span className="font-[family-name:var(--font-jetbrains-mono)] text-sm text-text-tertiary">
                {modules.length}
              </span>
            </div>
          </div>
        </div>

        {/* Module cards — only render active ± 1 for performance */}
        <div className="absolute inset-0 pt-36 md:pt-44 pb-20">
          {modules.map((module, i) => {
            // Only mount nearby modules to reduce DOM nodes
            if (Math.abs(i - activeIndex) > 1) return null;
            return (
              <ModuleCard key={i} module={module} isActive={i === activeIndex} />
            );
          })}
        </div>

        {/* Progress rail */}
        <ProgressRail activeIndex={activeIndex} onSelect={handleSelect} />

        {/* Mobile counter */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 md:hidden">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-bg-secondary/80 backdrop-blur-sm border border-border">
            <span className="font-[family-name:var(--font-jetbrains-mono)] text-sm text-accent-teal-light font-bold tabular-nums">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <div className="w-12 h-1 rounded-full bg-border overflow-hidden">
              <div
                className="h-full bg-accent-teal-light rounded-full transition-all duration-300"
                style={{ width: `${((activeIndex + 1) / modules.length) * 100}%` }}
              />
            </div>
            <span className="font-[family-name:var(--font-jetbrains-mono)] text-sm text-text-tertiary">
              {modules.length}
            </span>
          </div>
        </div>

        {/* Scroll hint */}
        {activeIndex === 0 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2 animate-pulse">
            <span className="text-text-tertiary text-xs font-[family-name:var(--font-jetbrains-mono)]">
              Scroll to explore
            </span>
            <div className="w-5 h-8 rounded-full border-2 border-text-tertiary/30 flex items-start justify-center pt-1.5">
              <div className="w-1 h-1.5 rounded-full bg-accent-teal-light animate-bounce" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
