"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Word-by-word reveal used for headlines.
export default function AnimatedText({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");
  return (
    <span className={cn("inline-block", className)}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="inline-block whitespace-pre"
          initial={{ y: "0.9em", opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{
            duration: 0.6,
            delay: delay + i * 0.06,
            ease: [0.21, 0.61, 0.35, 1],
          }}
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </span>
  );
}
