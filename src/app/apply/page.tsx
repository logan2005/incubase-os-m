"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket,
  GraduationCap,
  TrendingUp,
  Check,
  ChevronDown,
  ArrowLeft,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PageWrapper } from "@/components/page-wrapper";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { GradientOrb } from "@/components/ui/gradient-orb";
import { useInView } from "@/hooks/use-in-view";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ApplicationType = "startup" | "mentor" | "investor";

interface ApplicationCard {
  id: ApplicationType;
  title: string;
  description: string;
  icon: LucideIcon;
  accentColor: string;
  accentBorder: string;
  accentBg: string;
  accentText: string;
  requirements: string[];
  buttonLabel: string;
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const applicationCards: ApplicationCard[] = [
  {
    id: "startup",
    title: "Apply as a Startup",
    description:
      "Get incubated with mentorship, resources, facilities, and investor connections.",
    icon: Rocket,
    accentColor: "accent-teal",
    accentBorder: "border-accent-teal/40",
    accentBg: "bg-accent-teal/10",
    accentText: "text-accent-teal-light",
    requirements: [
      "Registered or ideation-stage startup",
      "Pitch deck ready",
      "Willing to commit to program",
    ],
    buttonLabel: "Apply as Startup",
  },
  {
    id: "mentor",
    title: "Apply as a Mentor",
    description:
      "Share your expertise with the next generation of startups.",
    icon: GraduationCap,
    accentColor: "accent-teal",
    accentBorder: "border-blue-500/40",
    accentBg: "bg-blue-500/10",
    accentText: "text-blue-400",
    requirements: [
      "5+ years industry experience",
      "Domain expertise in tech/business",
      "Available for regular sessions",
    ],
    buttonLabel: "Apply as Mentor",
  },
  {
    id: "investor",
    title: "Apply as an Investor",
    description:
      "Discover portfolio-ready startups vetted through our incubation pipeline.",
    icon: TrendingUp,
    accentColor: "accent-amber",
    accentBorder: "border-accent-amber/40",
    accentBg: "bg-accent-amber/10",
    accentText: "text-accent-amber",
    requirements: [
      "Active investment portfolio",
      "Interest in early-stage startups",
      "Min investment capacity",
    ],
    buttonLabel: "Apply as Investor",
  },
];

// ---------------------------------------------------------------------------
// Select component
// ---------------------------------------------------------------------------

function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium text-text-secondary font-[family-name:var(--font-dm-sans)]">
        {label}
      </span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "w-full appearance-none rounded-lg border border-border bg-bg-tertiary px-4 py-2.5 text-sm text-text-primary",
            "focus:outline-none focus:border-accent-teal/50 focus:ring-1 focus:ring-accent-teal/20",
            "font-[family-name:var(--font-dm-sans)] transition-colors duration-200",
            !value && "text-text-tertiary"
          )}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary pointer-events-none" />
      </div>
    </label>
  );
}

// ---------------------------------------------------------------------------
// Input & textarea primitives
// ---------------------------------------------------------------------------

function InputField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium text-text-secondary font-[family-name:var(--font-dm-sans)]">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "w-full rounded-lg border border-border bg-bg-tertiary px-4 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary",
          "focus:outline-none focus:border-accent-teal/50 focus:ring-1 focus:ring-accent-teal/20",
          "font-[family-name:var(--font-dm-sans)] transition-colors duration-200"
        )}
      />
    </label>
  );
}

function TextareaField({
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  rows?: number;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium text-text-secondary font-[family-name:var(--font-dm-sans)]">
        {label}
      </span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={cn(
          "w-full rounded-lg border border-border bg-bg-tertiary px-4 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary resize-none",
          "focus:outline-none focus:border-accent-teal/50 focus:ring-1 focus:ring-accent-teal/20",
          "font-[family-name:var(--font-dm-sans)] transition-colors duration-200"
        )}
      />
    </label>
  );
}

// ---------------------------------------------------------------------------
// Form: Startup
// ---------------------------------------------------------------------------

function StartupForm({ onSubmit }: { onSubmit: () => void }) {
  const [founderName, setFounderName] = useState("");
  const [email, setEmail] = useState("");
  const [startupName, setStartupName] = useState("");
  const [sector, setSector] = useState("");
  const [stage, setStage] = useState("");
  const [pitchDeck, setPitchDeck] = useState("");
  const [description, setDescription] = useState("");

  const sectors = [
    "AI/ML",
    "FinTech",
    "HealthTech",
    "EdTech",
    "CleanTech",
    "AgriTech",
    "SaaS",
    "Other",
  ];
  const stages = [
    "Ideation",
    "Validation",
    "Early Traction",
    "Scaling",
    "Growth",
  ];

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="space-y-4"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField
          label="Founder Name"
          value={founderName}
          onChange={setFounderName}
          placeholder="Jane Doe"
        />
        <InputField
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="jane@startup.com"
        />
      </div>
      <InputField
        label="Startup Name"
        value={startupName}
        onChange={setStartupName}
        placeholder="Acme Inc."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SelectField
          label="Sector"
          value={sector}
          onChange={setSector}
          options={sectors}
          placeholder="Select sector"
        />
        <SelectField
          label="Stage"
          value={stage}
          onChange={setStage}
          options={stages}
          placeholder="Select stage"
        />
      </div>
      <InputField
        label="Pitch Deck Link"
        type="url"
        value={pitchDeck}
        onChange={setPitchDeck}
        placeholder="https://docs.google.com/..."
      />
      <TextareaField
        label="Brief Description"
        value={description}
        onChange={setDescription}
        placeholder="Tell us about your startup in a few sentences..."
        rows={4}
      />
      <div className="pt-2">
        <Button variant="primary" size="lg" className="w-full">
          Submit Application
        </Button>
      </div>
    </form>
  );
}

// ---------------------------------------------------------------------------
// Form: Mentor
// ---------------------------------------------------------------------------

function MentorForm({ onSubmit }: { onSubmit: () => void }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [years, setYears] = useState("");
  const [expertise, setExpertise] = useState("");
  const [availability, setAvailability] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="space-y-4"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField
          label="Full Name"
          value={fullName}
          onChange={setFullName}
          placeholder="Dr. John Smith"
        />
        <InputField
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="john@company.com"
        />
      </div>
      <InputField
        label="LinkedIn URL"
        type="url"
        value={linkedin}
        onChange={setLinkedin}
        placeholder="https://linkedin.com/in/..."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField
          label="Years of Experience"
          type="number"
          value={years}
          onChange={setYears}
          placeholder="10"
        />
        <SelectField
          label="Availability"
          value={availability}
          onChange={setAvailability}
          options={["Full-time", "Part-time"]}
          placeholder="Select availability"
        />
      </div>
      <TextareaField
        label="Areas of Expertise"
        value={expertise}
        onChange={setExpertise}
        placeholder="Product management, GTM strategy, fundraising..."
      />
      <div className="pt-2">
        <Button variant="primary" size="lg" className="w-full">
          Submit Application
        </Button>
      </div>
    </form>
  );
}

// ---------------------------------------------------------------------------
// Form: Investor
// ---------------------------------------------------------------------------

function InvestorForm({ onSubmit }: { onSubmit: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [fund, setFund] = useState("");
  const [thesis, setThesis] = useState("");
  const [minInvestment, setMinInvestment] = useState("");
  const [maxInvestment, setMaxInvestment] = useState("");
  const [sectors, setSectors] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="space-y-4"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField
          label="Name"
          value={name}
          onChange={setName}
          placeholder="Alex Chen"
        />
        <InputField
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="alex@ventures.com"
        />
      </div>
      <InputField
        label="Agency / Fund Name"
        value={fund}
        onChange={setFund}
        placeholder="Horizon Ventures"
      />
      <TextareaField
        label="Investment Thesis"
        value={thesis}
        onChange={setThesis}
        placeholder="We invest in early-stage deep-tech startups with..."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField
          label="Min Investment"
          value={minInvestment}
          onChange={setMinInvestment}
          placeholder="$50,000"
        />
        <InputField
          label="Max Investment"
          value={maxInvestment}
          onChange={setMaxInvestment}
          placeholder="$500,000"
        />
      </div>
      <TextareaField
        label="Sectors of Interest"
        value={sectors}
        onChange={setSectors}
        placeholder="AI/ML, FinTech, HealthTech, SaaS..."
      />
      <div className="pt-2">
        <Button variant="primary" size="lg" className="w-full">
          Submit Application
        </Button>
      </div>
    </form>
  );
}

// ---------------------------------------------------------------------------
// Success animation
// ---------------------------------------------------------------------------

function SuccessMessage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col items-center justify-center py-12 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", bounce: 0.5, delay: 0.15 }}
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent-teal/20 border border-accent-teal/30 mb-6">
          <CheckCircle2 className="h-10 w-10 text-accent-teal-light" />
        </div>
      </motion.div>
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="font-[family-name:var(--font-syne)] text-2xl font-bold text-text-primary mb-2"
      >
        Application Submitted!
      </motion.h3>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-text-secondary text-sm max-w-xs"
      >
        Thank you for your interest. Our team will review your application and
        get back to you within 5 business days.
      </motion.p>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Application Card Component
// ---------------------------------------------------------------------------

function ApplicationCardComponent({
  card,
  index,
  isActive,
  isSubmitted,
  onActivate,
  onBack,
  onSubmit,
}: {
  card: ApplicationCard;
  index: number;
  isActive: boolean;
  isSubmitted: boolean;
  onActivate: () => void;
  onBack: () => void;
  onSubmit: () => void;
}) {
  const { ref, isInView } = useInView();
  const Icon = card.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      layout
      className={cn(
        "relative flex flex-col rounded-2xl border backdrop-blur-sm transition-all duration-500",
        isActive
          ? cn("border-opacity-100 p-6 md:p-8", card.accentBorder, "col-span-1 md:col-span-3")
          : "border-border bg-bg-secondary/60 hover:border-accent-teal/20 p-6 md:p-8"
      )}
    >
      {/* Accent line at top */}
      <div
        className={cn(
          "absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-40",
          card.accentText
        )}
      />

      <AnimatePresence mode="wait">
        {isSubmitted ? (
          <SuccessMessage key="success" />
        ) : isActive ? (
          // Expanded form view
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Form header */}
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={onBack}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-bg-tertiary border border-border hover:border-accent-teal/30 transition-colors duration-200"
              >
                <ArrowLeft className="h-4 w-4 text-text-secondary" />
              </button>
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-xl border",
                  card.accentBg,
                  card.accentBorder
                )}
              >
                <Icon className={cn("h-5 w-5", card.accentText)} />
              </div>
              <h3 className="font-[family-name:var(--font-syne)] text-xl font-bold text-text-primary">
                {card.title}
              </h3>
            </div>

            {/* Render the appropriate form */}
            <div className="max-w-2xl mx-auto">
              {card.id === "startup" && <StartupForm onSubmit={onSubmit} />}
              {card.id === "mentor" && <MentorForm onSubmit={onSubmit} />}
              {card.id === "investor" && <InvestorForm onSubmit={onSubmit} />}
            </div>
          </motion.div>
        ) : (
          // Collapsed card view
          <motion.div
            key="card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col h-full"
          >
            {/* Icon */}
            <div
              className={cn(
                "flex h-14 w-14 items-center justify-center rounded-xl border mb-6",
                card.accentBg,
                card.accentBorder
              )}
            >
              <Icon className={cn("h-7 w-7", card.accentText)} />
            </div>

            {/* Title & description */}
            <h3 className="font-[family-name:var(--font-syne)] text-2xl font-bold text-text-primary mb-3">
              {card.title}
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed mb-6">
              {card.description}
            </p>

            {/* Requirements */}
            <div className="flex-1">
              <p className="text-xs uppercase tracking-wider text-text-tertiary font-[family-name:var(--font-dm-sans)] font-medium mb-3">
                Requirements
              </p>
              <ul className="space-y-2.5 mb-8">
                {card.requirements.map((req) => (
                  <li key={req} className="flex items-start gap-2.5">
                    <div
                      className={cn(
                        "flex h-5 w-5 shrink-0 items-center justify-center rounded-full mt-0.5",
                        card.accentBg
                      )}
                    >
                      <Check className={cn("h-3 w-3", card.accentText)} />
                    </div>
                    <span className="text-text-secondary text-sm">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA button */}
            <Button
              variant="secondary"
              size="lg"
              className={cn(
                "w-full",
                "hover:border-accent-teal/50"
              )}
              onClick={onActivate}
            >
              {card.buttonLabel}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function ApplyPage() {
  const [activeCard, setActiveCard] = useState<ApplicationType | null>(null);
  const [submittedCard, setSubmittedCard] = useState<ApplicationType | null>(null);

  function handleActivate(id: ApplicationType) {
    setActiveCard(id);
    setSubmittedCard(null);
  }

  function handleBack() {
    setActiveCard(null);
    setSubmittedCard(null);
  }

  function handleSubmit(id: ApplicationType) {
    setSubmittedCard(id);
  }

  return (
    <PageWrapper>
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Background orbs */}
        <GradientOrb
          color="teal"
          size="lg"
          className="top-0 -left-40 opacity-50"
        />
        <GradientOrb
          color="amber"
          size="md"
          className="bottom-0 -right-32 opacity-40"
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <SectionHeader
            badge="Apply Now"
            title="Join the Incubation Ecosystem"
            subtitle="Whether you're a startup seeking growth, a mentor ready to guide, or an investor looking for opportunities — there's a place for you here."
          />

          {/* Cards Grid */}
          <motion.div
            layout
            className={cn(
              "grid gap-6 lg:gap-8",
              activeCard
                ? "grid-cols-1"
                : "grid-cols-1 md:grid-cols-3"
            )}
          >
            {applicationCards.map((card, index) => {
              const isActive = activeCard === card.id;
              const isSubmitted = submittedCard === card.id;

              // When a card is active, only render that card
              if (activeCard && !isActive) return null;

              return (
                <ApplicationCardComponent
                  key={card.id}
                  card={card}
                  index={index}
                  isActive={isActive}
                  isSubmitted={isSubmitted}
                  onActivate={() => handleActivate(card.id)}
                  onBack={handleBack}
                  onSubmit={() => handleSubmit(card.id)}
                />
              );
            })}
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}
