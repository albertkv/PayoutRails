"use client";

import { useEffect, useRef } from "react";

// Hero badge with a code-driven intro tween (y / opacity / glow).
export default function TheatreBadge({ label }: { label: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let disposed = false;
    let raf = 0;

    const apply = (y: number, opacity: number, glow: number) => {
      const el = ref.current;
      if (!el) return;
      el.style.transform = `translateY(${y}px)`;
      el.style.opacity = String(opacity);
      el.style.boxShadow = `0 0 ${30 * glow}px -8px rgba(124,108,255,${0.7 * glow})`;
    };

    const start = performance.now();
    const dur = 1100;
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const e = ease(t);
      apply(24 * (1 - e), e, e);
      if (t < 1 && !disposed) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
    };
  }, []);

  // Angular notched-corner chip — opposite corners cut, no rounding.
  const chip =
    "polygon(11px 0, 100% 0, 100% calc(100% - 11px), calc(100% - 11px) 100%, 0 100%, 0 11px)";

  return (
    <div ref={ref} className="relative inline-block" style={{ opacity: 0 }}>
      {/* animated gradient edge */}
      <div
        className="bg-[linear-gradient(110deg,#6d5ef9,#22d3ee,#a78bfa,#6d5ef9)] bg-[length:200%_auto] p-[1.5px] animate-shimmer"
        style={{ clipPath: chip }}
      >
        <div
          className="flex items-center gap-3.5 bg-ink-800 px-5 py-2"
          style={{ clipPath: chip }}
        >
          {/* status diamond */}
          <span className="relative flex h-2.5 w-2.5 rotate-45 items-center justify-center">
            <span className="absolute h-full w-full bg-aqua/25" />
            <span className="absolute h-1.5 w-1.5 animate-ping bg-aqua/70" />
            <span className="relative h-1 w-1 bg-aqua shadow-[0_0_8px_2px_rgba(34,211,238,0.7)]" />
          </span>
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.26em] text-white/85">
            {label}
          </span>
          {/* trailing tick marks */}
          <span className="flex items-center gap-[3px]">
            <span className="h-2.5 w-px bg-white/20" />
            <span className="h-2.5 w-px bg-white/35" />
            <span className="h-2.5 w-px bg-iris" />
          </span>
        </div>
      </div>
    </div>
  );
}
