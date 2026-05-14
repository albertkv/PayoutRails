"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { STEPS } from "@/lib/content";

// GSAP ScrollTrigger pins the section and scrubs the 5 steps horizontally.
export default function HowItWorks() {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const trackEl = track.current!;
      const scrollDist = trackEl.scrollWidth - window.innerWidth;

      const tween = gsap.to(trackEl, {
        x: -scrollDist,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${scrollDist + window.innerHeight * 0.6}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      gsap.utils.toArray<HTMLElement>(".step-card").forEach((card) => {
        gsap.from(card, {
          opacity: 0.25,
          scale: 0.92,
          scrollTrigger: {
            trigger: card,
            containerAnimation: tween,
            start: "left 80%",
            end: "left 40%",
            scrub: true,
          },
        });
      });

      gsap.to(".how-progress", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${scrollDist + window.innerHeight * 0.6}`,
          scrub: true,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="how-it-works" ref={root} className="relative overflow-hidden">
      <div className="flex h-[100svh] flex-col justify-center">
        <div className="mx-auto mb-10 w-full max-w-6xl px-5">
          <span className="flex items-center gap-3 font-mono text-xs font-semibold uppercase tracking-[0.32em] text-iris-300">
            <span className="h-1.5 w-1.5 rotate-45 bg-aqua shadow-[0_0_8px_1px_rgba(34,211,238,0.6)]" />
            The Flow
            <span className="h-px w-20 bg-gradient-to-r from-iris to-transparent" />
          </span>
          <h2 className="mt-5 font-display text-3xl font-bold text-white sm:text-5xl">
            Five steps, start to settled
          </h2>
          <div className="mt-6 h-[2px] w-full max-w-md overflow-hidden rounded-full bg-white/10">
            <div className="how-progress h-full w-full origin-left scale-x-0 bg-gradient-to-r from-iris to-aqua" />
          </div>
        </div>

        <div ref={track} className="flex w-max gap-6 px-5 sm:px-12">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className="step-card glass flex h-72 w-[80vw] flex-col justify-between rounded-3xl p-8 sm:w-[420px]"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-7xl font-bold text-iris/25">
                  {s.n}
                </span>
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/40">
                  Step {s.n} / 5
                </span>
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold text-white">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
