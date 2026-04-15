"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Rocket,
  GraduationCap,
  TrendingUp,
  LayoutDashboard,
  Users,
  FileText,
  Calendar,
  Trophy,
  Briefcase,
  BarChart3,
  ClipboardList,
  User,
  Target,
  CheckSquare,
  BookOpen,
  DoorOpen,
  MessageSquare,
  ShieldCheck,
  Share2,
  PieChart,
  Handshake,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/section-header";
import { Badge } from "@/components/ui/badge";
import { useInView } from "@/hooks/use-in-view";

interface SidebarItem {
  label: string;
  icon: LucideIcon;
}

interface DashboardFeature {
  title: string;
  description: string;
}

interface Role {
  id: string;
  name: string;
  icon: LucideIcon;
  badge: string;
  description: string;
  features: DashboardFeature[];
  sidebar: SidebarItem[];
}

const roles: Role[] = [
  {
    id: "admin",
    name: "Admin",
    icon: Building2,
    badge: "Full Control",
    description:
      "Complete platform oversight. Manage all startups, approve applications, assign mentors, track revenue, configure hackathons.",
    features: [
      {
        title: "20+ Management Pages",
        description: "Comprehensive dashboard covering every aspect of incubator operations.",
      },
      {
        title: "Application Review Pipeline",
        description: "Structured intake with multi-stage review, scoring, and approval workflows.",
      },
      {
        title: "Revenue Analytics & Reports",
        description: "Unified financials across incubation fees, facility bookings, and event revenue.",
      },
      {
        title: "User Approval System",
        description: "Role-based access with admin-controlled onboarding for all stakeholders.",
      },
    ],
    sidebar: [
      { label: "Dashboard", icon: LayoutDashboard },
      { label: "Startups", icon: Rocket },
      { label: "Applications", icon: FileText },
      { label: "Mentors", icon: GraduationCap },
      { label: "Investors", icon: TrendingUp },
      { label: "Events", icon: Calendar },
      { label: "Hackathons", icon: Trophy },
      { label: "C.Pro", icon: Briefcase },
      { label: "Revenue", icon: BarChart3 },
      { label: "Reports", icon: ClipboardList },
    ],
  },
  {
    id: "startup",
    name: "Startup",
    icon: Rocket,
    badge: "Growth Tools",
    description:
      "Your incubation command center. Track KPIs, submit milestones, book facilities, connect with mentors and investors.",
    features: [
      {
        title: "18 Dedicated Pages",
        description: "Purpose-built tools for every stage of the startup incubation journey.",
      },
      {
        title: "KPI & Milestone Tracking",
        description: "Set targets, submit evidence, and get structured feedback from mentors.",
      },
      {
        title: "Mentor Session Booking",
        description: "Browse available mentors, schedule sessions, and track your mentorship history.",
      },
      {
        title: "Facility Reservations",
        description: "Book labs, meeting rooms, and coworking spaces with real-time availability.",
      },
    ],
    sidebar: [
      { label: "Dashboard", icon: LayoutDashboard },
      { label: "Profile", icon: User },
      { label: "Milestones", icon: Target },
      { label: "KPIs", icon: BarChart3 },
      { label: "Tasks", icon: CheckSquare },
      { label: "Mentors", icon: GraduationCap },
      { label: "Facilities", icon: DoorOpen },
      { label: "Internships", icon: Users },
      { label: "Events", icon: Calendar },
    ],
  },
  {
    id: "mentor",
    name: "Mentor",
    icon: GraduationCap,
    badge: "Guide & Validate",
    description:
      "Manage your startup portfolio. Conduct sessions, validate applications, approve milestones with structured feedback.",
    features: [
      {
        title: "12 Mentor Pages",
        description: "Focused toolkit for mentorship management and startup validation.",
      },
      {
        title: "Session Management",
        description: "Accept or reschedule bookings, log session notes, and track outcomes.",
      },
      {
        title: "Dual-Approval Milestones",
        description: "Review startup evidence and co-sign milestone completions with admin oversight.",
      },
      {
        title: "Startup Referral System",
        description: "Refer promising startups directly into the incubator application pipeline.",
      },
    ],
    sidebar: [
      { label: "Dashboard", icon: LayoutDashboard },
      { label: "Startups", icon: Rocket },
      { label: "Sessions", icon: MessageSquare },
      { label: "Validations", icon: ShieldCheck },
      { label: "Resources", icon: BookOpen },
      { label: "Refer Startup", icon: Share2 },
    ],
  },
  {
    id: "investor",
    name: "Investor",
    icon: TrendingUp,
    badge: "Deal Flow",
    description:
      "Discover portfolio-ready startups. Request connections, manage deals, and track investments through an admin-mediated pipeline.",
    features: [
      {
        title: "10 Investor Pages",
        description: "Streamlined interface for discovering and evaluating startup opportunities.",
      },
      {
        title: "Startup Browsing & Filtering",
        description: "Search by sector, stage, traction metrics, and investment readiness score.",
      },
      {
        title: "Connection Requests",
        description: "Express interest in startups through admin-mediated warm introductions.",
      },
      {
        title: "Portfolio Tracker",
        description: "Monitor invested startups with KPI dashboards and milestone updates.",
      },
    ],
    sidebar: [
      { label: "Dashboard", icon: LayoutDashboard },
      { label: "Portfolio", icon: PieChart },
      { label: "Startups", icon: Rocket },
      { label: "Deals", icon: Handshake },
      { label: "Events", icon: Calendar },
    ],
  },
];

const contentVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
};

export function Roles() {
  const [activeTab, setActiveTab] = useState(0);
  const { ref, isInView } = useInView();

  const activeRole = roles[activeTab];

  return (
    <section id="roles" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Role-Based Access"
          title="One Platform, Four Perspectives"
          subtitle="Every stakeholder gets a tailored dashboard designed for their workflow. No clutter, no confusion — just the tools they need."
        />

        {/* Tab Bar */}
        <motion.div
          ref={ref}
          className="mb-12 flex items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="inline-flex rounded-xl border border-border bg-bg-secondary/60 backdrop-blur-sm p-1.5 gap-1">
            {roles.map((role, index) => {
              const Icon = role.icon;
              const isActive = activeTab === index;

              return (
                <button
                  key={role.id}
                  onClick={() => setActiveTab(index)}
                  className={cn(
                    "relative flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-300",
                    "font-[family-name:var(--font-syne)]",
                    isActive
                      ? "text-accent-teal-light"
                      : "text-text-tertiary hover:text-text-secondary"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeRoleTab"
                      className="absolute inset-0 rounded-lg bg-accent-teal/10 border border-accent-teal/20"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <Icon className="relative z-10 h-4 w-4" />
                  <span className="relative z-10 hidden sm:inline">{role.name}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeRole.id}
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column: Role Info + Feature Grid */}
              <div className="lg:col-span-2 space-y-8">
                {/* Role Header */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-teal/10 border border-accent-teal/20">
                      <activeRole.icon className="h-6 w-6 text-accent-teal" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="font-[family-name:var(--font-syne)] text-2xl font-bold text-text-primary">
                          {activeRole.name}
                        </h3>
                        <Badge>{activeRole.badge}</Badge>
                      </div>
                    </div>
                  </div>
                  <p className="text-text-secondary text-base leading-relaxed max-w-2xl">
                    {activeRole.description}
                  </p>
                </div>

                {/* Feature Cards 2x2 Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activeRole.features.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.08 }}
                      className={cn(
                        "rounded-xl border border-border bg-bg-secondary/60 backdrop-blur-sm p-5",
                        "hover:border-accent-teal/20 transition-all duration-500"
                      )}
                    >
                      <h4 className="font-[family-name:var(--font-syne)] text-sm font-semibold text-text-primary mb-1.5">
                        {feature.title}
                      </h4>
                      <p className="text-text-tertiary text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right Column: Mock Sidebar Nav */}
              <div className="lg:col-span-1">
                <div className="rounded-xl border border-border bg-bg-secondary/60 backdrop-blur-sm p-4 sticky top-8">
                  <div className="flex items-center gap-2 px-3 pb-4 mb-3 border-b border-border">
                    <div className="h-2 w-2 rounded-full bg-accent-teal" />
                    <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-text-tertiary uppercase tracking-wider">
                      {activeRole.name} Panel
                    </span>
                  </div>
                  <nav className="space-y-0.5">
                    {activeRole.sidebar.map((item, index) => {
                      const ItemIcon = item.icon;
                      const isFirst = index === 0;

                      return (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.25, delay: index * 0.04 }}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors duration-200",
                            isFirst
                              ? "bg-accent-teal/10 text-accent-teal-light"
                              : "text-text-tertiary hover:text-text-secondary hover:bg-white/[0.03]"
                          )}
                        >
                          <ItemIcon className="h-4 w-4 shrink-0" />
                          <span className="font-[family-name:var(--font-syne)] font-medium">
                            {item.label}
                          </span>
                        </motion.div>
                      );
                    })}
                  </nav>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
