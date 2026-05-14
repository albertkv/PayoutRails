import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import WhyHedera from "@/components/WhyHedera";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Stats from "@/components/Stats";
import Tokenomics from "@/components/Tokenomics";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <Marquee />
      <Problem />
      <Solution />
      <WhyHedera />
      <Features />
      <HowItWorks />
      <Stats />
      <Tokenomics />
      <CTA />
      <Footer />
    </main>
  );
}
