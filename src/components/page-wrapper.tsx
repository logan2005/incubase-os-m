"use client";

import Navbar from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";

export function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">{children}</main>
      <Footer />
    </>
  );
}
