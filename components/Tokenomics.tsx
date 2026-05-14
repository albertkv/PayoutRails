"use client";

import { useEffect, useRef, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import SectionHeading from "./ui/SectionHeading";
import { TOKEN_ALLOCATION } from "@/lib/content";

// react-spring animates each allocation bar from 0 → its share when in view.
function AllocationBar({
  item,
  active,
  delay,
}: {
  item: (typeof TOKEN_ALLOCATION)[number];
  active: boolean;
  delay: number;
}) {
  const spring = useSpring({
    width: active ? `${item.pct}%` : "0%",
    number: active ? item.pct : 0,
    delay,
    config: { mass: 1, tension: 180, friction: 24 },
  });

  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-white/75">{item.label}</span>
        <animated.span className="font-display font-bold text-white">
          {spring.number.to((n) => `${n.toFixed(0)}%`)}
        </animated.span>
      </div>
      <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-white/[0.06]">
        <animated.div
          style={{
            width: spring.width,
            background: `linear-gradient(90deg, ${item.color}, ${item.color}aa)`,
          }}
          className="h-full rounded-full"
        />
      </div>
    </div>
  );
}

export default function Tokenomics() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setActive(true),
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="tokenomics" className="relative py-28 sm:py-36">
      <div className="pointer-events-none absolute left-1/4 top-10 h-72 w-72 rounded-full bg-aqua/10 blur-[120px]" />
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Tokenomics"
          title="RAILS — a token funded by real payroll volume"
          subtitle="PayoutRails works fully without a token. RAILS aligns incentives across the network, with a programmatic buyback funded by real platform revenue."
        />

        <div ref={ref} className="mt-16 grid gap-10 lg:grid-cols-2">
          <div className="glass rounded-3xl p-8">
            <div className="flex items-baseline justify-between">
              <h3 className="font-display text-xl font-bold text-white">
                Token Allocation
              </h3>
              <span className="text-xs text-white/40">
                1,000,000,000 RAILS · fixed supply
              </span>
            </div>
            <div className="mt-7 space-y-5">
              {TOKEN_ALLOCATION.map((item, i) => (
                <AllocationBar
                  key={item.label}
                  item={item}
                  active={active}
                  delay={i * 120}
                />
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {[
              {
                t: "Fee rebates",
                d: "Employers paying platform fees in RAILS get a reduced effective rate — demand tied directly to real payroll volume.",
              },
              {
                t: "Staking for premium",
                d: "Stake RAILS to unlock branded payment pages, merchant API access, higher batch limits and advanced reconciliation.",
              },
              {
                t: "Contractor loyalty",
                d: "Contractors paid through PayoutRails accrue RAILS rewards, redeemable for off-ramp fee discounts.",
              },
              {
                t: "Governance & buyback",
                d: "Holders steer fee schedules and corridor priority. A defined share of revenue funds a transparent on-chain buyback.",
              },
            ].map((u) => (
              <div
                key={u.t}
                className="rounded-2xl border border-white/8 bg-white/[0.02] p-5"
              >
                <h4 className="font-display font-semibold text-white">{u.t}</h4>
                <p className="mt-1 text-sm leading-relaxed text-white/55">{u.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
