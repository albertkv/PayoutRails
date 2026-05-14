"use client";

import { motion } from "framer-motion";

// Aceternity-style animated background beams rendered as SVG gradient strokes.
export default function BackgroundBeams({ className = "" }: { className?: string }) {
  const paths = [
    "M-100 200 C 200 100, 400 400, 800 250 S 1300 0, 1600 220",
    "M-100 360 C 250 280, 500 520, 900 360 S 1300 180, 1600 380",
    "M-100 520 C 300 460, 520 660, 950 520 S 1350 360, 1600 540",
  ];

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <svg className="h-full w-full" viewBox="0 0 1500 700" fill="none" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="beam" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
            <stop offset="50%" stopColor="#7c6cff" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
          </linearGradient>
        </defs>
        {paths.map((d, i) => (
          <motion.path
            key={i}
            d={d}
            stroke="url(#beam)"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 1, 0.4] }}
            transition={{
              duration: 6 + i * 1.5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
              delay: i * 1.2,
            }}
          />
        ))}
      </svg>
    </div>
  );
}
