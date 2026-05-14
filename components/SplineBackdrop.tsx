"use client";

import { Suspense } from "react";
import Spline from "@splinetool/react-spline";

// Spline 3D backdrop. Drop a scene URL into NEXT_PUBLIC_SPLINE_SCENE to enable it;
// otherwise an animated CSS-only orb stands in so the build never depends on a
// remote asset.
const SCENE = process.env.NEXT_PUBLIC_SPLINE_SCENE;

export default function SplineBackdrop() {
  if (!SCENE) {
    return (
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="relative h-[460px] w-[460px]">
          <div className="absolute inset-0 animate-spin-slow rounded-full border border-iris/20" />
          <div className="absolute inset-8 animate-spin-slow rounded-full border border-aqua/20 [animation-direction:reverse]" />
          <div className="absolute inset-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 animate-float rounded-full bg-gradient-to-br from-iris/40 to-aqua/30 blur-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0">
      <Suspense fallback={null}>
        <Spline scene={SCENE} />
      </Suspense>
    </div>
  );
}
