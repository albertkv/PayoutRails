"use client";

import { motion } from "framer-motion";
import AnimatedText from "./AnimatedText";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center gap-4"
      >
        <span className="h-px w-10 bg-gradient-to-r from-transparent via-iris/40 to-iris" />
        <span className="flex items-center gap-2.5 font-mono text-xs font-semibold uppercase tracking-[0.32em] text-iris-300">
          <span className="h-1.5 w-1.5 rotate-45 bg-aqua shadow-[0_0_8px_1px_rgba(34,211,238,0.6)]" />
          {eyebrow}
        </span>
        <span className="h-px w-10 bg-gradient-to-l from-transparent via-iris/40 to-iris" />
      </motion.div>
      <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
        <AnimatedText text={title} />
      </h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-4 text-base leading-relaxed text-white/55"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
