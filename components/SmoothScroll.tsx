"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

// Lenis-powered smooth scrolling wrapped at the document root.
// GSAP's ScrollTrigger listens to native scroll events, which Lenis still
// dispatches — so pinned/scrubbed sections stay in sync automatically.
export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1,
      }}
    >
      {children}
    </ReactLenis>
  );
}
