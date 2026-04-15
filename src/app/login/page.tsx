"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { PageWrapper } from "@/components/page-wrapper";
import { Button } from "@/components/ui/button";
import { GradientOrb } from "@/components/ui/gradient-orb";
import { cn } from "@/lib/utils";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5 fill-current"
      aria-hidden="true"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function MicrosoftIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
      <path d="M0 0h11.5v11.5H0z" fill="#F25022" />
      <path d="M12.5 0H24v11.5H12.5z" fill="#7FBA00" />
      <path d="M0 12.5h11.5V24H0z" fill="#00A4EF" />
      <path d="M12.5 12.5H24V24H12.5z" fill="#FFB900" />
    </svg>
  );
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isLoading || isSuccess) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1500);
  }

  const inputClasses = cn(
    "w-full bg-bg-secondary border border-border rounded-xl px-4 py-3 pl-11",
    "text-text-primary placeholder:text-text-tertiary",
    "font-[family-name:var(--font-dm-sans)] text-sm",
    "outline-none transition-all duration-200",
    "focus:border-accent-teal focus:ring-1 focus:ring-accent-teal/30"
  );

  return (
    <PageWrapper>
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center py-16 px-4 overflow-hidden">
        {/* Background orbs */}
        <GradientOrb
          color="teal"
          size="lg"
          className="-top-40 -left-40 opacity-40"
        />
        <GradientOrb
          color="teal"
          size="lg"
          className="-bottom-40 -right-40 opacity-40"
        />
        <GradientOrb
          color="amber"
          size="sm"
          className="top-1/4 right-1/6 opacity-20"
        />
        <GradientOrb
          color="purple"
          size="sm"
          className="bottom-1/4 left-1/6 opacity-15"
        />

        {/* Card */}
        <motion.div
          className="relative z-10 w-full max-w-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div
            className={cn(
              "bg-bg-secondary/80 backdrop-blur-xl border border-border rounded-2xl",
              "p-8 sm:p-10 shadow-2xl shadow-black/20"
            )}
          >
            {/* Logo */}
            <motion.div
              className="flex items-center justify-center gap-3 mb-8"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
            >
              <div className="w-10 h-10 rounded-lg bg-accent-teal flex items-center justify-center glow-teal">
                <span className="font-[family-name:var(--font-syne)] text-white text-sm font-bold">
                  iO
                </span>
              </div>
              <span className="font-[family-name:var(--font-syne)] text-text-primary text-xl font-semibold">
                IncubaseOS
              </span>
            </motion.div>

            {/* Heading */}
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.5 }}
            >
              <h1 className="font-[family-name:var(--font-syne)] text-2xl sm:text-3xl font-bold text-text-primary mb-2">
                Welcome Back
              </h1>
              <p className="text-text-secondary text-sm font-[family-name:var(--font-dm-sans)]">
                Sign in to your IncubaseOS dashboard
              </p>
            </motion.div>

            {/* Success state */}
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  className="flex flex-col items-center justify-center py-10 gap-4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                      delay: 0.1,
                    }}
                  >
                    <CheckCircle2 className="w-12 h-12 text-accent-teal-light" />
                  </motion.div>
                  <p className="text-text-primary font-[family-name:var(--font-dm-sans)] font-medium">
                    Redirecting to dashboard...
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-text-secondary text-xs font-medium font-[family-name:var(--font-dm-sans)] mb-1.5 ml-1"
                      >
                        Email address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
                        <input
                          id="email"
                          type="email"
                          placeholder="you@company.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={inputClasses}
                          required
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div>
                      <label
                        htmlFor="password"
                        className="block text-text-secondary text-xs font-medium font-[family-name:var(--font-dm-sans)] mb-1.5 ml-1"
                      >
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
                        <input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className={cn(inputClasses, "pr-11")}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-secondary transition-colors"
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Remember me + Forgot password */}
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="sr-only peer"
                          />
                          <div
                            className={cn(
                              "w-4 h-4 rounded border border-border bg-bg-tertiary transition-all duration-200",
                              "peer-checked:bg-accent-teal peer-checked:border-accent-teal",
                              "peer-focus-visible:ring-2 peer-focus-visible:ring-accent-teal/30"
                            )}
                          />
                          <svg
                            className="absolute top-0.5 left-0.5 w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"
                            viewBox="0 0 12 12"
                            fill="none"
                          >
                            <path
                              d="M2.5 6L5 8.5L9.5 3.5"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <span className="text-text-secondary text-xs font-[family-name:var(--font-dm-sans)] group-hover:text-text-primary transition-colors">
                          Remember me
                        </span>
                      </label>
                      <a
                        href="#"
                        className="text-accent-teal-light text-xs font-[family-name:var(--font-dm-sans)] hover:text-accent-teal transition-colors"
                      >
                        Forgot password?
                      </a>
                    </div>

                    {/* Submit button */}
                    <Button
                      variant="primary"
                      size="md"
                      className="w-full"
                      onClick={undefined}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Signing in...
                        </>
                      ) : (
                        "Sign In"
                      )}
                    </Button>
                  </form>

                  {/* Divider */}
                  <div className="flex items-center gap-3 my-6">
                    <div className="flex-1 h-px bg-border" />
                    <span className="text-text-tertiary text-xs font-[family-name:var(--font-dm-sans)]">
                      Or continue with
                    </span>
                    <div className="flex-1 h-px bg-border" />
                  </div>

                  {/* Social login buttons */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { icon: <GoogleIcon />, label: "Google" },
                      { icon: <GitHubIcon />, label: "GitHub" },
                      { icon: <MicrosoftIcon />, label: "Microsoft" },
                    ].map((provider) => (
                      <motion.button
                        key={provider.label}
                        type="button"
                        className={cn(
                          "flex items-center justify-center py-2.5 rounded-xl",
                          "bg-bg-tertiary border border-border",
                          "hover:border-accent-teal/40 hover:bg-bg-tertiary/80",
                          "transition-all duration-200 cursor-pointer"
                        )}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        aria-label={`Sign in with ${provider.label}`}
                      >
                        {provider.icon}
                      </motion.button>
                    ))}
                  </div>

                  {/* Sign up link */}
                  <p className="text-center text-text-secondary text-sm font-[family-name:var(--font-dm-sans)] mt-8">
                    Don&apos;t have an account?{" "}
                    <a
                      href="/get-started"
                      className="text-accent-teal-light hover:text-accent-teal font-medium transition-colors"
                    >
                      Get Started
                    </a>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </section>
    </PageWrapper>
  );
}
