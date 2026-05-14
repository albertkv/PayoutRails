"use client";

import { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import SectionHeading from "./ui/SectionHeading";
import SpotlightCard from "./ui/SpotlightCard";
import { FEATURES } from "@/lib/content";

// react-spring physics drives the 3D tilt on each Aceternity-style spotlight card.
function FeatureCard({
  feature,
}: {
  feature: (typeof FEATURES)[number];
}) {
  const [style, api] = useSpring(() => ({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    config: { mass: 1, tension: 320, friction: 26 },
  }));

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    api.start({ rotateX: -py * 10, rotateY: px * 12, scale: 1.03 });
  };
  const onLeave = () => api.start({ rotateX: 0, rotateY: 0, scale: 1 });

  return (
    <animated.div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        transform: "perspective(900px)",
        rotateX: style.rotateX,
        rotateY: style.rotateY,
        scale: style.scale,
      }}
    >
      <SpotlightCard className="h-full">
        <span className="relative inline-flex items-center px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-aqua-300">
          <span className="absolute left-0 top-0 h-2 w-2 border-l-2 border-t-2 border-aqua/70" />
          <span className="absolute bottom-0 right-0 h-2 w-2 border-b-2 border-r-2 border-aqua/70" />
          <span className="mr-1.5 h-1 w-1 rounded-full bg-aqua shadow-[0_0_8px_2px_rgba(34,211,238,0.6)]" />
          {feature.tag}
        </span>
        <h3 className="mt-4 font-display text-lg font-bold text-white">
          {feature.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-white/55">{feature.body}</p>
      </SpotlightCard>
    </animated.div>
  );
}

export default function Features() {
  return (
    <section id="features" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Features"
          title="Everything a payroll rail needs — nothing it doesn't"
          subtitle="Built for the three sides of the network: employers, contractors, and the wider Hedera ecosystem."
        />
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <FeatureCard key={f.title} feature={f} />
          ))}
        </div>
      </div>
    </section>
  );
}
