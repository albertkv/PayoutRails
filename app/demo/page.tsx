"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import Footer from "@/components/Footer";
import {
  BATCH_TOTAL,
  CADENCES,
  CONTRACTORS,
  Cadence,
  Contractor,
  EMPLOYER,
  FEE_HCS_MESSAGE,
  FEE_HTS_TRANSFER,
  HCS_TOPIC,
  Receipt,
  STABLECOINS,
  Stablecoin,
  consensusTs,
  fakeBatchId,
  fakeTxId,
  localAmount,
  money,
} from "@/lib/demo-data";

type Stage = "batch" | "fund" | "settling" | "receipts" | "contractor";

const STEPS: { id: Stage; label: string }[] = [
  { id: "batch", label: "Build Batch" },
  { id: "fund", label: "Fund" },
  { id: "settling", label: "Settle" },
  { id: "receipts", label: "HCS Receipts" },
  { id: "contractor", label: "Contractor Portal" },
];

const stageIndex = (s: Stage) => STEPS.findIndex((x) => x.id === s);

/* ---------------- shared bits ---------------- */

function CodeChip({ code }: { code: string }) {
  return (
    <span className="inline-flex h-5 min-w-[26px] items-center justify-center rounded bg-white/10 px-1 font-mono text-[10px] font-bold tracking-wider text-white/70">
      {code}
    </span>
  );
}

function Stepper({ stage }: { stage: Stage }) {
  const active = stageIndex(stage);
  return (
    <div className="flex items-center">
      {STEPS.map((step, i) => {
        const done = i < active;
        const current = i === active;
        return (
          <div key={step.id} className="flex flex-1 items-center last:flex-none">
            <div className="flex items-center gap-2.5">
              <div
                className={[
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border font-mono text-xs font-bold transition-colors",
                  done
                    ? "border-aqua/50 bg-aqua/15 text-aqua"
                    : current
                      ? "border-iris bg-iris/20 text-white"
                      : "border-white/10 bg-white/[0.02] text-white/30",
                ].join(" ")}
              >
                {done ? "✓" : i + 1}
              </div>
              <span
                className={[
                  "hidden whitespace-nowrap text-xs font-medium sm:block",
                  current ? "text-white" : done ? "text-white/55" : "text-white/30",
                ].join(" ")}
              >
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className="mx-3 h-px flex-1 bg-white/10">
                <div
                  className="h-full bg-gradient-to-r from-aqua to-iris transition-all duration-500"
                  style={{ width: done ? "100%" : "0%" }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.4, ease: [0.21, 0.61, 0.35, 1] }}
      className="glass rounded-3xl p-6 sm:p-8"
    >
      {children}
    </motion.div>
  );
}

/* ---------------- page ---------------- */

export default function DemoPage() {
  const [stage, setStage] = useState<Stage>("batch");
  const [cadence, setCadence] = useState<Cadence>("Weekly");
  const [stablecoin, setStablecoin] = useState<Stablecoin>("USDC.h");
  const [batchId, setBatchId] = useState<string>(fakeBatchId());

  const [settledIds, setSettledIds] = useState<string[]>([]);
  const [txById, setTxById] = useState<Record<string, string>>({});
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [finality, setFinality] = useState(0);
  const [cost, setCost] = useState(0);

  const [selected, setSelected] = useState<Contractor>(CONTRACTORS[0]);
  const [cashedOut, setCashedOut] = useState(false);

  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const intervals = useRef<ReturnType<typeof setInterval>[]>([]);

  const clearAll = useCallback(() => {
    timers.current.forEach(clearTimeout);
    intervals.current.forEach(clearInterval);
    timers.current = [];
    intervals.current = [];
  }, []);

  const reset = useCallback(() => {
    clearAll();
    setStage("batch");
    setCadence("Weekly");
    setStablecoin("USDC.h");
    setBatchId(fakeBatchId());
    setSettledIds([]);
    setTxById({});
    setReceipts([]);
    setFinality(0);
    setCost(0);
    setSelected(CONTRACTORS[0]);
    setCashedOut(false);
  }, [clearAll]);

  useEffect(() => () => clearAll(), [clearAll]);

  // Settlement simulation: runs once when the stage becomes "settling".
  useEffect(() => {
    if (stage !== "settling") return;
    setSettledIds([]);
    setTxById({});
    setReceipts([]);
    setFinality(0);
    setCost(0);

    // finality clock ticks 0 → ~3.8s
    const startedAt = Date.now();
    const clock = setInterval(() => {
      const elapsed = (Date.now() - startedAt) / 1000;
      setFinality(Math.min(elapsed, 3.8));
      if (elapsed >= 3.8) clearInterval(clock);
    }, 60);
    intervals.current.push(clock);

    CONTRACTORS.forEach((c, i) => {
      const t = setTimeout(
        () => {
          const tx = fakeTxId();
          setTxById((prev) => ({ ...prev, [c.id]: tx }));
          setSettledIds((prev) => [...prev, c.id]);
          setCost((prev) => prev + FEE_HTS_TRANSFER + FEE_HCS_MESSAGE);
          setReceipts((prev) => [
            ...prev,
            {
              schema: "payoutrails.receipt.v1",
              batch_id: batchId,
              sequence: i + 1,
              employer: EMPLOYER.wallet,
              contractor: c.wallet,
              amount: money(c.amount),
              stablecoin,
              payout_type: "instant",
              consensus_timestamp: consensusTs(),
              tx_id: tx,
            },
          ]);
        },
        700 + i * 620,
      );
      timers.current.push(t);
    });
  }, [stage, batchId, stablecoin]);

  const allSettled = settledIds.length === CONTRACTORS.length;

  return (
    <main className="relative min-h-screen">
      <div className="absolute inset-0 grid-bg" />
      <div className="pointer-events-none absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-iris/15 blur-[120px]" />

      <section className="relative z-10 mx-auto max-w-4xl px-5 pb-24 pt-32">
        {/* header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="font-display text-2xl font-bold text-white sm:text-3xl">
                Interactive Prototype
              </h1>
              <span className="rounded-md border border-amber-400/30 bg-amber-400/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-amber-300">
                Simulated
              </span>
            </div>
            <p className="mt-1.5 text-sm text-white/50">
              A clickable walkthrough of the PayoutRails flow — no real funds, no
              live network.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={reset}
              className="rounded-lg border border-white/12 bg-white/[0.03] px-4 py-2 text-xs font-semibold text-white/70 transition-colors hover:border-iris/40 hover:text-white"
            >
              ↺ Reset
            </button>
            <Link
              href="/"
              className="rounded-lg border border-white/12 bg-white/[0.03] px-4 py-2 text-xs font-semibold text-white/70 transition-colors hover:border-iris/40 hover:text-white"
            >
              Home
            </Link>
          </div>
        </div>

        {/* stepper */}
        <div className="mt-8 rounded-2xl border border-white/8 bg-white/[0.02] p-5">
          <Stepper stage={stage} />
        </div>

        {/* stages */}
        <div className="mt-6">
          <AnimatePresence mode="wait">
            {/* ---------- STAGE 1: BUILD BATCH ---------- */}
            {stage === "batch" && (
              <Panel key="batch">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="font-display text-xl font-bold text-white">
                      Payroll batch · May 2026
                    </h2>
                    <p className="mt-1 font-mono text-xs text-white/40">
                      {EMPLOYER.org} · employer wallet {EMPLOYER.wallet}
                    </p>
                  </div>
                  <div className="flex gap-1.5">
                    {CADENCES.map((c) => (
                      <button
                        key={c}
                        onClick={() => setCadence(c)}
                        className={[
                          "rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors",
                          cadence === c
                            ? "bg-iris text-white"
                            : "border border-white/10 bg-white/[0.02] text-white/50 hover:text-white",
                        ].join(" ")}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-6 overflow-hidden rounded-xl border border-white/8">
                  <div className="grid grid-cols-[1.6fr_1fr_0.9fr] gap-2 bg-white/[0.03] px-4 py-2.5 font-mono text-[10px] uppercase tracking-wider text-white/40 sm:grid-cols-[1.6fr_1fr_1fr_0.9fr]">
                    <span>Contractor</span>
                    <span className="hidden sm:block">Country</span>
                    <span>Wallet</span>
                    <span className="text-right">Amount</span>
                  </div>
                  {CONTRACTORS.map((c) => (
                    <div
                      key={c.id}
                      className="grid grid-cols-[1.6fr_1fr_0.9fr] items-center gap-2 border-t border-white/6 px-4 py-3 sm:grid-cols-[1.6fr_1fr_1fr_0.9fr]"
                    >
                      <div>
                        <div className="text-sm font-medium text-white">{c.name}</div>
                        <div className="text-xs text-white/40">{c.role}</div>
                      </div>
                      <div className="hidden items-center gap-2 sm:flex">
                        <CodeChip code={c.code} />
                        <span className="text-xs text-white/55">{c.country}</span>
                      </div>
                      <span className="font-mono text-xs text-white/55">
                        {c.wallet}
                      </span>
                      <span className="text-right font-mono text-sm text-white">
                        ${money(c.amount)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex gap-6">
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-wider text-white/40">
                        Contractors
                      </div>
                      <div className="font-display text-xl font-bold text-white">
                        {CONTRACTORS.length}
                      </div>
                    </div>
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-wider text-white/40">
                        Batch total
                      </div>
                      <div className="font-display text-xl font-bold text-white">
                        ${money(BATCH_TOTAL)}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setStage("fund")}
                    className="rounded-xl bg-gradient-to-r from-iris to-iris-700 px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
                  >
                    Continue to funding →
                  </button>
                </div>
              </Panel>
            )}

            {/* ---------- STAGE 2: FUND ---------- */}
            {stage === "fund" && (
              <Panel key="fund">
                <h2 className="font-display text-xl font-bold text-white">
                  Fund &amp; authorize the batch
                </h2>
                <p className="mt-1 text-sm text-white/50">
                  One signed Hedera Token Service transaction — {CONTRACTORS.length}{" "}
                  atomic transfers. All-or-nothing.
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-white/8 bg-white/[0.02] p-5">
                    <div className="font-mono text-[10px] uppercase tracking-wider text-white/40">
                      Employer balance
                    </div>
                    <div className="mt-1 font-display text-2xl font-bold text-white">
                      ${money(EMPLOYER.balance)}
                    </div>
                    <div className="mt-3 flex gap-1.5">
                      {STABLECOINS.map((s) => (
                        <button
                          key={s}
                          onClick={() => setStablecoin(s)}
                          className={[
                            "rounded-lg px-3 py-1.5 font-mono text-xs transition-colors",
                            stablecoin === s
                              ? "bg-aqua/15 text-aqua ring-1 ring-aqua/40"
                              : "border border-white/10 text-white/45 hover:text-white",
                          ].join(" ")}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl border border-iris/25 bg-iris/[0.06] p-5">
                    <div className="font-mono text-[10px] uppercase tracking-wider text-white/40">
                      Batch total · {cadence.toLowerCase()} run
                    </div>
                    <div className="mt-1 font-display text-2xl font-bold text-white">
                      ${money(BATCH_TOTAL)}{" "}
                      <span className="text-sm text-white/45">{stablecoin}</span>
                    </div>
                    <div className="mt-3 space-y-1 font-mono text-xs text-white/45">
                      <div className="flex justify-between">
                        <span>Network cost (est.)</span>
                        <span className="text-white/70">
                          ~$
                          {(
                            CONTRACTORS.length *
                            (FEE_HTS_TRANSFER + FEE_HCS_MESSAGE)
                          ).toFixed(4)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Balance after</span>
                        <span className="text-white/70">
                          ${money(EMPLOYER.balance - BATCH_TOTAL)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                  <button
                    onClick={() => setStage("batch")}
                    className="text-sm text-white/45 transition-colors hover:text-white"
                  >
                    ← Back to batch
                  </button>
                  <button
                    onClick={() => setStage("settling")}
                    className="rounded-xl bg-gradient-to-r from-iris to-iris-700 px-6 py-3 text-sm font-semibold text-white glow-iris transition-transform hover:scale-[1.03]"
                  >
                    Sign &amp; settle batch →
                  </button>
                </div>
              </Panel>
            )}

            {/* ---------- STAGE 3: SETTLING ---------- */}
            {stage === "settling" && (
              <Panel key="settling">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="font-display text-xl font-bold text-white">
                      {allSettled ? "Batch settled" : "Settling on Hedera…"}
                    </h2>
                    <p className="mt-1 font-mono text-xs text-white/40">
                      atomic HTS transfer · batch {batchId}
                    </p>
                  </div>
                  <div className="flex gap-5 text-right">
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-wider text-white/40">
                        Finality
                      </div>
                      <div className="font-display text-lg font-bold text-aqua">
                        {finality.toFixed(1)}s
                      </div>
                    </div>
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-wider text-white/40">
                        Network cost
                      </div>
                      <div className="font-display text-lg font-bold text-white">
                        ${cost.toFixed(4)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  {CONTRACTORS.map((c) => {
                    const settled = settledIds.includes(c.id);
                    return (
                      <div
                        key={c.id}
                        className={[
                          "flex items-center justify-between rounded-xl border px-4 py-3 transition-colors duration-300",
                          settled
                            ? "border-aqua/30 bg-aqua/[0.05]"
                            : "border-white/8 bg-white/[0.02]",
                        ].join(" ")}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={[
                              "flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold transition-colors",
                              settled
                                ? "bg-aqua/20 text-aqua"
                                : "bg-white/5 text-white/30",
                            ].join(" ")}
                          >
                            {settled ? "✓" : "•"}
                          </span>
                          <div>
                            <div className="text-sm font-medium text-white">
                              {c.name}
                            </div>
                            <div className="font-mono text-[11px] text-white/40">
                              {settled
                                ? txById[c.id]
                                : "pending atomic settlement…"}
                            </div>
                          </div>
                        </div>
                        <span
                          className={[
                            "font-mono text-sm transition-colors",
                            settled ? "text-aqua" : "text-white/30",
                          ].join(" ")}
                        >
                          ${money(c.amount)}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                  <span className="font-mono text-xs text-white/40">
                    {settledIds.length}/{CONTRACTORS.length} transfers ·{" "}
                    {allSettled ? "atomic batch committed" : "all-or-nothing"}
                  </span>
                  <button
                    disabled={!allSettled}
                    onClick={() => setStage("receipts")}
                    className={[
                      "rounded-xl px-6 py-3 text-sm font-semibold transition-all",
                      allSettled
                        ? "bg-gradient-to-r from-iris to-iris-700 text-white hover:scale-[1.03]"
                        : "cursor-not-allowed border border-white/10 bg-white/[0.02] text-white/30",
                    ].join(" ")}
                  >
                    View HCS receipts →
                  </button>
                </div>
              </Panel>
            )}

            {/* ---------- STAGE 4: RECEIPTS ---------- */}
            {stage === "receipts" && (
              <Panel key="receipts">
                <h2 className="font-display text-xl font-bold text-white">
                  Consensus-timestamped receipts
                </h2>
                <p className="mt-1 text-sm text-white/50">
                  Each payout appended an immutable message to the employer&apos;s
                  HCS topic{" "}
                  <span className="font-mono text-white/70">{HCS_TOPIC}</span>.
                </p>

                <div className="mt-6 overflow-hidden rounded-xl border border-white/10 bg-ink/80">
                  <div className="flex items-center gap-1.5 border-b border-white/8 px-4 py-2.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                    <span className="ml-2 font-mono text-[11px] text-white/40">
                      topic://{HCS_TOPIC} — message stream
                    </span>
                  </div>
                  <div className="max-h-[340px] space-y-3 overflow-y-auto p-4 font-mono text-[11px] leading-relaxed">
                    {receipts.map((r, i) => (
                      <motion.pre
                        key={r.tx_id}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.12 }}
                        className="whitespace-pre-wrap rounded-lg border border-white/6 bg-white/[0.02] p-3 text-white/60"
                      >
                        <span className="text-aqua">seq {r.sequence}</span>{" "}
                        <span className="text-white/30">
                          @ {r.consensus_timestamp}
                        </span>
                        {"\n"}
                        {JSON.stringify(
                          {
                            schema: r.schema,
                            batch_id: r.batch_id,
                            employer: r.employer,
                            contractor: r.contractor,
                            amount: r.amount,
                            stablecoin: r.stablecoin,
                            payout_type: r.payout_type,
                            tx_id: r.tx_id,
                          },
                          null,
                          2,
                        )}
                      </motion.pre>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                  <span className="font-mono text-xs text-white/40">
                    {receipts.length} receipts · schema payoutrails.receipt.v1
                  </span>
                  <button
                    onClick={() => setStage("contractor")}
                    className="rounded-xl bg-gradient-to-r from-iris to-iris-700 px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
                  >
                    Open contractor portal →
                  </button>
                </div>
              </Panel>
            )}

            {/* ---------- STAGE 5: CONTRACTOR PORTAL ---------- */}
            {stage === "contractor" && (
              <Panel key="contractor">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="font-display text-xl font-bold text-white">
                      Contractor portal
                    </h2>
                    <p className="mt-1 text-sm text-white/50">
                      Non-custodial — payment history verified against the public
                      Mirror Node.
                    </p>
                  </div>
                  <select
                    value={selected.id}
                    onChange={(e) => {
                      const c = CONTRACTORS.find((x) => x.id === e.target.value);
                      if (c) {
                        setSelected(c);
                        setCashedOut(false);
                      }
                    }}
                    className="rounded-lg border border-white/12 bg-ink-800 px-3 py-2 text-sm text-white outline-none"
                  >
                    {CONTRACTORS.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-[1.1fr_1fr]">
                  {/* identity + balance */}
                  <div className="rounded-xl border border-white/8 bg-white/[0.02] p-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-iris to-aqua font-display text-lg font-bold text-ink">
                        {selected.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-white">{selected.name}</div>
                        <div className="flex items-center gap-2 text-xs text-white/40">
                          <CodeChip code={selected.code} />
                          {selected.role} · {selected.country}
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 font-mono text-[10px] uppercase tracking-wider text-white/40">
                      Wallet {selected.wallet}
                    </div>
                    <div className="mt-1 font-display text-3xl font-bold text-white">
                      {cashedOut ? "$0.00" : `$${money(selected.amount)}`}
                      <span className="ml-1 text-sm text-white/40">
                        {stablecoin}
                      </span>
                    </div>
                    {cashedOut ? (
                      <div className="mt-4 rounded-lg border border-aqua/25 bg-aqua/[0.06] px-3 py-2.5 text-xs text-aqua">
                        ✓ Cashed out — {selected.localCcy}{" "}
                        {localAmount(selected)} delivered via off-ramp partner.
                      </div>
                    ) : (
                      <button
                        onClick={() => setCashedOut(true)}
                        className="mt-4 w-full rounded-lg bg-gradient-to-r from-aqua/90 to-iris/90 px-4 py-2.5 text-sm font-semibold text-ink transition-transform hover:scale-[1.02]"
                      >
                        Cash out to {selected.localCcy} →
                      </button>
                    )}
                  </div>

                  {/* payment history */}
                  <div className="rounded-xl border border-white/8 bg-white/[0.02] p-5">
                    <div className="font-mono text-[10px] uppercase tracking-wider text-white/40">
                      Payment history
                    </div>
                    <div className="mt-3 space-y-2.5">
                      {[
                        { when: "Just now", amt: selected.amount, fresh: true },
                        { when: "Last week", amt: selected.amount, fresh: false },
                        { when: "2 weeks ago", amt: selected.amount, fresh: false },
                      ].map((p, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between rounded-lg border border-white/6 bg-white/[0.02] px-3 py-2.5"
                        >
                          <div>
                            <div className="text-sm text-white">
                              ${money(p.amt)}{" "}
                              <span className="text-xs text-white/35">
                                {stablecoin}
                              </span>
                            </div>
                            <div className="text-[11px] text-white/35">{p.when}</div>
                          </div>
                          <span className="flex items-center gap-1 font-mono text-[10px] text-aqua">
                            <span className="h-1.5 w-1.5 rounded-full bg-aqua" />
                            Mirror Node ✓
                          </span>
                        </div>
                      ))}
                    </div>
                    <p className="mt-3 text-[11px] leading-relaxed text-white/35">
                      Every entry is independently verifiable against Hedera Mirror
                      Nodes — no need to trust PayoutRails&apos; servers.
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                  <span className="font-mono text-xs text-white/40">
                    end of simulated flow
                  </span>
                  <button
                    onClick={reset}
                    className="rounded-xl border border-white/12 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-white/80 transition-colors hover:border-iris/40 hover:text-white"
                  >
                    ↺ Run the demo again
                  </button>
                </div>
              </Panel>
            )}
          </AnimatePresence>
        </div>

        {/* footnote */}
        <p className="mt-8 text-center font-mono text-[11px] text-white/30">
          Prototype only — wallet IDs, transaction IDs, balances and timestamps are
          generated for demonstration.
        </p>
      </section>

      <Footer />
    </main>
  );
}
