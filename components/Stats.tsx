"use client";

import { useEffect, useRef } from "react";
import { STATS } from "@/lib/content";

// velocity.js drives the count-up timing/easing for each stat once the band
// scrolls into view. We animate a dummy `tween` from 0 → 1 and read velocity's
// reliable `percentComplete` value in the progress callback, multiplying it by
// the real target — this avoids velocity v2's flaky `tweenValue` argument.
function formatValue(v: number) {
  if (!Number.isFinite(v)) return "0";
  if (v >= 1000) return Math.round(v).toLocaleString("en-US");
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

        import("velocity-animate").then((mod) => {
          const Velocity = (mod.default ?? mod) as (
            ...args: unknown[]
          ) => unknown;

          el.querySelectorAll<HTMLElement>("[data-target]").forEach((node) => {
            const target = Number(node.dataset.target);
            node.textContent = "0";
            Velocity(
              node,
              { tween: [1, 0] },
              {
                duration: 1900,
                easing: "easeOutExpo",
                progress: (_els: unknown, percentComplete: number) => {
                  node.textContent = formatValue(target * percentComplete);
                },
                complete: () => {
                  node.textContent = formatValue(target);
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
