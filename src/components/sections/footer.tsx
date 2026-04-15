"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";

const linkColumns = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "Pricing", href: "/#pricing" },
      { label: "Demo", href: "/demo" },
      { label: "Apply", href: "/apply" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/#solution" },
      { label: "Blog", href: "/#features" },
      { label: "Careers", href: "/contact" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "/#features" },
      { label: "API Reference", href: "/#features" },
      { label: "Community", href: "/contact" },
      { label: "Status", href: "/#stats" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/contact" },
      { label: "Terms", href: "/contact" },
      { label: "Security", href: "/contact" },
    ],
  },
];

export function Footer() {
  const { ref, isInView } = useInView();

  return (
    <footer className="relative border-t border-border bg-bg-primary">
      <motion.div
        ref={ref}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Top area: Logo + Link columns */}
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-10 md:gap-8">
          {/* Logo & Tagline */}
          <div className="md:col-span-2 lg:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              {/* Logo mark */}
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-teal border border-accent-teal/30">
                <span className="font-[family-name:var(--font-syne)] text-white font-bold text-sm">
                  e.
                </span>
              </div>
              <span className="font-[family-name:var(--font-syne)] text-xl font-bold text-text-primary">
                edgyy
              </span>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
              The Operating System for Modern Startup Incubators
            </p>
          </div>

          {/* Link Columns */}
          {linkColumns.map((column) => (
            <div key={column.title} className="lg:col-span-2">
              <h4 className="font-[family-name:var(--font-syne)] text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider">
                {column.title}
              </h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-text-secondary text-sm hover:text-accent-teal-light transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Made in India badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-bg-tertiary/60 border border-border/50">
            <span className="text-sm">
              {"\uD83C\uDDEE\uD83C\uDDF3"}
            </span>
            <span className="text-text-secondary text-xs font-[family-name:var(--font-jetbrains-mono)]">
              Made in India for Indian Incubators
            </span>
          </div>

          {/* Copyright */}
          <p className="text-text-tertiary text-xs font-[family-name:var(--font-jetbrains-mono)]">
            &copy; 2026 edgyy. All rights reserved.
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
