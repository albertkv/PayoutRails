"use client";

import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import TheatreBadge from "./TheatreBadge";
import BackgroundBeams from "./ui/BackgroundBeams";
import { HERO_STATS, NOTION_WHITEPAPER_URL } from "@/lib/content";

// R3F canvas is client-only and heavy — load it without SSR.
const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yText = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scaleCanvas = useTransform(scrollYProgress, [0, 1], [1, 1.25]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden pt-28"
    >
      {/* layered backgrounds */}
      <div className="absolute inset-0 grid-bg" />
      <BackgroundBeams />
      <motion.div style={{ scale: scaleCanvas }} className="absolute inset-0">
        <HeroCanvas />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-iris/20 blur-[120px]" />

      <motion.div
        style={{ y: yText, opacity }}
        className="relative z-10 mx-auto max-w-4xl px-5 text-center"
      >
        <TheatreBadge label="Built exclusively on Hedera Hashgraph" />

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.21, 0.61, 0.35, 1] }}
          className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl"
        >
          Stablecoin payroll,
          <br />
          <span className="text-gradient">settled in seconds.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg"
        >
          PayoutRails turns a payroll run into one atomic, instantly-final on-chain
          event. Pay remote contractors across Argentina, Nigeria, Vietnam and the
          Philippines for{" "}
          <span className="font-semibold text-white">~$0.001 a transfer</span> — with
          an immutable receipt for every payout.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <a
            href={NOTION_WHITEPAPER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-iris to-iris-700 px-7 py-3.5 text-sm font-semibold text-white glow-iris transition-transform hover:scale-[1.04]"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            Read the Whitepaper
          </a>
          <Link
            href="/documentation"
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-7 py-3.5 text-sm font-semibold text-white/85 backdrop-blur transition-colors hover:border-iris/40 hover:text-white"
          >
            View Documentation
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mx-auto mt-14 grid max-w-2xl grid-cols-3 gap-3"
        >
          {HERO_STATS.map((s) => (
            <div
              key={s.label}
              className="glass rounded-xl px-3 py-4 text-center"
            >
              <div className="font-display text-xl font-bold text-white sm:text-2xl">
                {s.prefix}
                {s.value}
                {s.suffix}
              </div>
              <div className="mt-1 text-[11px] leading-tight text-white/45">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

    </section>
  );
}
