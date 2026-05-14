"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

// Aceternity-style spotlight card: a cursor-tracking radial glow over a glass panel.
export default function SpotlightCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-colors duration-300 hover:border-iris/40",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(360px circle at var(--x,50%) var(--y,50%), rgba(124,108,255,0.18), transparent 65%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
