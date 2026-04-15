import type { Metadata } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { LoadingScreen } from "@/components/loading-screen";
import { PageTransition } from "@/components/page-transition";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "IncubaseOS — The Operating System for Modern Startup Incubators",
  description:
    "End-to-end incubation management. Startups, mentors, investors, hackathons, facilities, revenue — all in one platform. 16 modules. 75+ pages. 4 user roles.",
  keywords: [
    "startup incubator software",
    "incubation management platform",
    "startup management system",
    "mentor management",
    "hackathon management",
    "incubator CRM",
    "IncubaseOS",
  ],
  openGraph: {
    title: "IncubaseOS — The Operating System for Modern Startup Incubators",
    description:
      "End-to-end incubation management. Startups, mentors, investors, hackathons, facilities, revenue — all in one platform.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="noise-bg antialiased">
        <ThemeProvider>
          <LoadingScreen />
          <PageTransition>{children}</PageTransition>
        </ThemeProvider>
      </body>
    </html>
  );
}
