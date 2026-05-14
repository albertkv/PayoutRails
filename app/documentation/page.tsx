"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { DOC_SECTIONS, NOTION_WHITEPAPER_URL, SITE } from "@/lib/content";
import Footer from "@/components/Footer";
import BackgroundBeams from "@/components/ui/BackgroundBeams";

export default function DocumentationPage() {
  return (
    <main className="relative">
      {/* Hero band */}
      <section className="relative overflow-hidden px-5 pb-16 pt-36">
        <div className="absolute inset-0 grid-bg" />
        <BackgroundBeams />
        <div className="pointer-events-none absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-iris/20 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-4"
          >
            <span className="h-px w-10 bg-gradient-to-r from-transparent via-iris/40 to-iris" />
            <span className="flex items-center gap-2.5 font-mono text-xs font-semibold uppercase tracking-[0.32em] text-iris-300">
              <span className="h-1.5 w-1.5 rotate-45 bg-aqua shadow-[0_0_8px_1px_rgba(34,211,238,0.6)]" />
              Documentation
            </span>
            <span className="h-px w-10 bg-gradient-to-l from-transparent via-iris/40 to-iris" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-5 font-display text-4xl font-bold leading-tight text-white sm:text-6xl"
          >
            {SITE.name} <span className="text-gradient">Whitepaper</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/60"
          >
            A summary of the PayoutRails design. The complete, continuously-updated
            whitepaper lives on Notion — open it below.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <a
              href={NOTION_WHITEPAPER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-iris to-iris-700 px-7 py-3.5 text-sm font-semibold text-white glow-iris transition-transform hover:scale-[1.04]"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              Read Full Whitepaper on Notion
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="relative">
                <path
                  d="M7 17 17 7M9 7h8v8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-7 py-3.5 text-sm font-semibold text-white/85 backdrop-blur transition-colors hover:border-iris/40 hover:text-white"
            >
              Back to Home
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Doc body */}
      <section className="relative mx-auto max-w-5xl px-5 py-16">
        <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
          {/* sticky table of contents */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-1">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">
                On this page
              </p>
              {DOC_SECTIONS.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="block rounded-lg px-3 py-2 text-sm text-white/50 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {s.title}
                </a>
              ))}
              <a
                href={NOTION_WHITEPAPER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block rounded-lg border border-iris/30 bg-iris/10 px-3 py-2 text-sm text-iris-300 transition-colors hover:bg-iris/20"
              >
                Full Notion Whitepaper ↗
              </a>
            </div>
          </aside>

          {/* sections */}
          <div className="space-y-5">
            {DOC_SECTIONS.map((s, i) => (
              <motion.article
                key={s.id}
                id={s.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-12%" }}
                transition={{ duration: 0.55, delay: (i % 3) * 0.05 }}
                className="reveal-on-view scroll-mt-28 rounded-2xl border border-white/8 bg-white/[0.02] p-7"
              >
                <div className="flex items-center gap-3">
                  <span className="font-display text-sm font-bold text-iris">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
                    {s.title}
                  </h2>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{s.body}</p>
              </motion.article>
            ))}

            <div className="rounded-2xl border border-iris/25 bg-gradient-to-br from-iris/10 to-aqua/5 p-7 text-center">
              <h3 className="font-display text-xl font-bold text-white">
                Want the complete document?
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-white/55">
                The full whitepaper — architecture diagrams, the open receipt
                standard, tokenomics tables, risks and roadmap — is maintained on
                Notion.
              </p>
              <a
                href={NOTION_WHITEPAPER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-iris to-iris-700 px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.04]"
              >
                Open Whitepaper on Notion
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M7 17 17 7M9 7h8v8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
