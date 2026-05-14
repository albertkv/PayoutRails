"use client";

import { useEffect, useRef } from "react";
import anime from "animejs";
import SectionHeading from "./ui/SectionHeading";
import { HEDERA_REASONS } from "@/lib/content";

// anime.js drives the staggered grid reveal once the section enters the viewport.
export default function WhyHedera() {
  const root = useRef<HTMLDivElement>(null);
  const played = useRef(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !played.current) {
            played.current = true;
            anime({
              targets: el.querySelectorAll(".hedera-card"),
              translateY: [60, 0],
              opacity: [0, 1],
              scale: [0.94, 1],
              delay: anime.stagger(110),
              duration: 760,
              easing: "cubicBezier(.2,.7,.3,1)",
            });
            anime({
              targets: el.querySelectorAll(".hedera-num"),
              innerHTML: [0, (_: Element, i: number) => i + 1],
              round: 1,
              delay: anime.stagger(110, { start: 200 }),
              duration: 700,
              easing: "easeOutExpo",
            });
          }
        });
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="why-hedera" className="relative py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-iris/40 to-transparent" />
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Why Hedera"
          title="This could not be built on any other chain"
          subtitle="Four Hedera-native properties — and PayoutRails is load-bearing on all of them."
        />

        <div ref={root} className="mt-16 grid gap-5 sm:grid-cols-2">
          {HEDERA_REASONS.map((r) => (
            <div
              key={r.title}
              className="hedera-card glass relative overflow-hidden rounded-2xl p-7 opacity-0"
            >
              <div className="absolute -right-6 -top-8 font-display text-[120px] font-bold leading-none text-white/[0.03]">
                H
              </div>
              <div className="hedera-num font-display text-3xl font-bold text-iris">
                0
              </div>
              <h3 className="mt-3 font-display text-xl font-bold text-white">
                {r.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">{r.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
