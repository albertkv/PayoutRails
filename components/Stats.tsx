"use client";

import { useEffect, useRef } from "react";
import { STATS } from "@/lib/content";

// velocity.js tweens a counter for each stat once the band scrolls into view.
function formatValue(v: number) {
  if (v >= 1000) return v.toLocaleString("en-US");
  if (v < 1) return v.toString();
  return Math.round(v).toString();
}

export default function Stats() {
  const root = useRef<HTMLDivElement>(null);
  const played = useRef(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || played.current) return;
        played.current = true;
        // velocity-animate touches `window` at import time — load it on demand.
        import("velocity-animate").then((mod) => {
          const Velocity = mod.default;
          el.querySelectorAll<HTMLElement>("[data-target]").forEach((node) => {
            const target = Number(node.dataset.target);
            Velocity(
              node,
              { tween: target },
              {
                duration: 1800,
                easing: "easeOutExpo",
                progress: (
                  _e: unknown,
                  _c: number,
                  _r: number,
                  _s: number,
                  tween: number,
                ) => {
                  node.textContent = formatValue(tween);
                },
              },
            );
          });
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={root} className="relative border-y border-white/10 bg-ink-800/50 py-16">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-5 md:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="text-center">
            <div className="font-display text-4xl font-bold text-white sm:text-5xl">
              <span className="text-iris-300">{s.prefix}</span>
              <span data-target={s.value}>0</span>
              <span className="text-aqua">{s.suffix}</span>
            </div>
            <p className="mx-auto mt-2 max-w-[14ch] text-xs leading-snug text-white/45">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
