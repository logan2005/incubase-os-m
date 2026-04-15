import Navbar from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { PainPoints } from "@/components/sections/pain-points";
import { Solution } from "@/components/sections/solution";
import { Features } from "@/components/sections/features";
import { Roles } from "@/components/sections/roles";
import { Workflows } from "@/components/sections/workflows";
import { Stats } from "@/components/sections/stats";
import { Testimonials } from "@/components/sections/testimonials";
import { Deployment } from "@/components/sections/deployment";
import { Pricing } from "@/components/sections/pricing";
import { CTA } from "@/components/sections/cta";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <PainPoints />
      <Solution />
      <Features />
      <Roles />
      <Workflows />
      <Stats />
      <Testimonials />
      <Deployment />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  );
}
