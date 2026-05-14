"use client";

import { motion } from "framer-motion";
import Lottie from "lottie-react";
import payoutAnim from "@/lib/lottie/payout.json";
import SectionHeading from "./ui/SectionHeading";

const POINTS = [
  {
    t: "One signed event",
    d: "Fund a batch, and a single HTS transaction settles every contractor at once — atomic, all-or-nothing.",
  },
  {
    t: "Receipt as a network fact",
    d: "Each payout appends a consensus-timestamped message to the employer's HCS topic. No bookkeeping intermediary.",
  },
  {
    t: "Trustless verification",
    d: "Contractors confirm full payment history straight from the public Mirror Node REST API.",
  },
];

export default function Solution() {
  return (
    <section id="solution" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="The Solution"
          title="A payroll run becomes one atomic on-chain event"
        />

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
          {/* Lottie-driven visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative mx-auto flex aspect-square w-full max-w-md items-center justify-center"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-iris/20 via-transparent to-aqua/20 blur-2xl" />
            <div className="glass relative flex h-full w-full items-center justify-center rounded-3xl">
              <Lottie
                animationData={payoutAnim}
                loop
                className="h-3/4 w-3/4"
              />
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-ink/80 px-4 py-1.5 text-xs text-white/60">
                Funded → Settled → Receipt
              </div>
            </div>
          </motion.div>

          {/* steps */}
          <div className="space-y-5">
            {POINTS.map((p, i) => (
              <motion.div
                key={p.t}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.12 }}
                className="flex gap-4 rounded-2xl border border-white/8 bg-white/[0.02] p-5"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-iris to-iris-700 font-display font-bold text-white">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-white">
                    {p.t}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/55">{p.d}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
