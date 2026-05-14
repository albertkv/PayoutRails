"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { NOTION_WHITEPAPER_URL } from "@/lib/content";

// Spline touches `window` on import — load it client-only.
const SplineBackdrop = dynamic(() => import("./SplineBackdrop"), { ssr: false });

// mo.js fires a particle burst from the pointer each time the primary CTA is clicked.
export default function CTA() {
  const burstRef = useRef<any>(null);

  useEffect(() => {
    let cancelled = false;
    // mo.js references `window` at import time — load it dynamically on the client.
    import("@mojs/core").then((mod) => {
      if (cancelled) return;
      const mojs = mod.default;
      burstRef.current = new mojs.Burst({
        radius: { 0: 90 },
        count: 12,
        children: {
          shape: "circle",
          fill: ["#7c6cff", "#22d3ee", "#a78bfa"],
          radius: { 8: 0 },
          duration: 900,
          easing: "cubic.out",
        },
      });
    });
    return () => {
      cancelled = true;
      burstRef.current = null;
    };
  }, []);

  const fireBurst = (e: React.MouseEvent) => {
    const b = burstRef.current;
    if (!b) return;
    b.tune({ x: e.clientX, y: e.clientY });
    b.replay();
  };

  return (
    <section className="relative overflow-hidden py-32">
      <SplineBackdrop />
      <div className="pointer-events-none absolute inset-0 bg-ink/60" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-iris/15 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-3xl px-5 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-display text-4xl font-bold leading-tight text-white sm:text-6xl"
        >
          The default payroll rail
          <br />
          <span className="text-gradient">of the Hedera ecosystem.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mx-auto mt-5 max-w-xl text-white/60"
        >
          Stablecoins that settle in seconds across continents — that is Hedera's
          stated 2026 priority, and it is exactly what PayoutRails ships.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <a
            href={NOTION_WHITEPAPER_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={fireBurst}
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-iris to-iris-700 px-8 py-4 text-sm font-semibold text-white glow-iris transition-transform hover:scale-[1.04]"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            Read the Full Whitepaper
          </a>
          <button
            onClick={fireBurst}
            className="rounded-xl border border-white/15 bg-white/[0.03] px-8 py-4 text-sm font-semibold text-white/85 backdrop-blur transition-colors hover:border-iris/40 hover:text-white"
          >
            Request Early Access
          </button>
        </motion.div>
        <p className="mt-4 text-xs text-white/35">Tip: click a button — that burst is mo.js.</p>
      </div>
    </section>
  );
}
