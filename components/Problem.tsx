"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "./ui/SectionHeading";
import { PROBLEMS } from "@/lib/content";

// GSAP ScrollTrigger pins the heading and reveals each problem card on scrub.
export default function Problem() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".problem-card");
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 80, opacity: 0, rotateX: -12 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 50%",
              scrub: 1,
            },
            delay: i * 0.05,
          },
        );
      });
      gsap.to(".problem-glow", {
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
        yPercent: 40,
        ease: "none",
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="problem" ref={root} className="relative py-28 sm:py-36">
      <div className="problem-glow pointer-events-none absolute -top-20 right-1/4 h-80 w-80 rounded-full bg-iris/15 blur-[120px]" />
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="The Problem"
          title="Paying remote freelancers is slow, costly, and unverifiable"
          subtitle="Cross-border freelancer payments fail on three compounding axes — and every freelancer in an emerging market feels all three at once."
        />

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {PROBLEMS.map((p) => (
            <div
              key={p.k}
              className="problem-card glass rounded-2xl p-7"
              style={{ perspective: "800px" }}
            >
              <div className="font-display text-5xl font-bold text-iris/30">{p.k}</div>
              <h3 className="mt-4 font-display text-xl font-bold text-white">
                {p.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/55">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
