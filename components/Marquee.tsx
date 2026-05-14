"use client";

import { motion } from "framer-motion";

const ITEMS = [
  "Hedera Token Service",
  "Consensus Service receipts",
  "aBFT finality · 3–5s",
  "~$0.001 per transfer",
  "Mirror Node verification",
  "Non-custodial by design",
  "HSCS milestone escrow",
  "Open receipt standard",
];

export default function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-ink-800/60 py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink-800 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink-800 to-transparent" />
      <motion.div
        className="flex w-max gap-10"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
      >
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-3 whitespace-nowrap font-display text-sm font-medium uppercase tracking-wider text-white/40"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-iris" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
