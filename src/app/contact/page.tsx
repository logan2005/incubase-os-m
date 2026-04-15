"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Clock, CheckCircle, Send } from "lucide-react";
import { PageWrapper } from "@/components/page-wrapper";
import { Button } from "@/components/ui/button";
import { GradientOrb } from "@/components/ui/gradient-orb";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@edgyy.com",
    color: "text-accent-teal-light",
    bg: "bg-accent-teal/10",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 80 1234 5678",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Bangalore, India",
    color: "text-accent-amber",
    bg: "bg-accent-amber/10",
  },
];

const inputStyles =
  "w-full rounded-xl border border-border bg-bg-tertiary px-4 py-3 text-text-primary placeholder:text-text-tertiary focus:border-accent-teal focus:outline-none focus:ring-1 focus:ring-accent-teal/30 transition-colors font-[family-name:var(--font-dm-sans)]";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <PageWrapper>
      <section className="relative py-20 md:py-28 overflow-hidden">
        <GradientOrb className="-top-40 -right-40" color="teal" size="lg" />
        <GradientOrb className="bottom-0 -left-40" color="amber" size="md" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left: Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h1 className="font-[family-name:var(--font-syne)] text-4xl md:text-5xl font-bold tracking-tight mb-4">
                  Get in Touch
                </h1>
                <p className="text-text-secondary text-lg leading-relaxed">
                  Have questions about edgyy? We&apos;d love to hear from
                  you. Our team is ready to help you transform your incubation
                  center.
                </p>
              </div>

              <div className="space-y-4">
                {contactInfo.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-4 p-4 rounded-xl border border-border bg-bg-secondary/60"
                  >
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg ${item.bg}`}
                    >
                      <item.icon className={`h-5 w-5 ${item.color}`} />
                    </div>
                    <div>
                      <div className="text-text-tertiary text-xs uppercase tracking-wider font-[family-name:var(--font-jetbrains-mono)]">
                        {item.label}
                      </div>
                      <div className="text-text-primary font-medium">
                        {item.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 text-text-secondary text-sm">
                <Clock className="h-4 w-4" />
                Monday - Friday, 9:00 AM - 6:00 PM IST
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <div className="rounded-2xl border border-border bg-bg-secondary/60 backdrop-blur-sm p-8">
                <AnimatePresence mode="wait">
                  {!submitted ? (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      className="space-y-5"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="font-[family-name:var(--font-syne)] text-2xl font-bold mb-6">
                        Send a Message
                      </h2>

                      <div>
                        <label className="block text-sm text-text-secondary mb-1.5">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Your name"
                          className={inputStyles}
                          value={form.name}
                          onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                          }
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-text-secondary mb-1.5">
                          Email
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="you@example.com"
                          className={inputStyles}
                          value={form.email}
                          onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                          }
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-text-secondary mb-1.5">
                          Subject
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="How can we help?"
                          className={inputStyles}
                          value={form.subject}
                          onChange={(e) =>
                            setForm({ ...form, subject: e.target.value })
                          }
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-text-secondary mb-1.5">
                          Message
                        </label>
                        <textarea
                          required
                          rows={4}
                          placeholder="Tell us more..."
                          className={inputStyles + " resize-none"}
                          value={form.message}
                          onChange={(e) =>
                            setForm({ ...form, message: e.target.value })
                          }
                        />
                      </div>

                      <Button
                        variant="primary"
                        size="lg"
                        className="w-full"
                      >
                        <Send className="w-4 h-4 mr-1" />
                        Send Message
                      </Button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="text-center py-12"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          delay: 0.2,
                        }}
                        className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent-teal/10"
                      >
                        <CheckCircle className="h-8 w-8 text-accent-teal-light" />
                      </motion.div>
                      <h3 className="font-[family-name:var(--font-syne)] text-2xl font-bold mb-2">
                        Message Sent!
                      </h3>
                      <p className="text-text-secondary mb-6">
                        We&apos;ll get back to you within 24 hours.
                      </p>
                      <Button
                        variant="secondary"
                        onClick={() => {
                          setSubmitted(false);
                          setForm({
                            name: "",
                            email: "",
                            subject: "",
                            message: "",
                          });
                        }}
                      >
                        Send Another
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
