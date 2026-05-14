"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { NAV_LINKS, NOTION_WHITEPAPER_URL, SITE } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-ink-800/60">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-iris to-aqua">
                <span className="h-3 w-3 rounded-sm bg-ink" />
              </span>
              <span className="font-display text-lg font-bold text-white">
                {SITE.name}
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/45">
              {SITE.tagline}
            </p>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold text-white">Explore</h4>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-white/45 transition-colors hover:text-white"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold text-white">Resources</h4>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link
                  href="/documentation"
                  className="text-sm text-white/45 transition-colors hover:text-white"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <a
                  href={NOTION_WHITEPAPER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/45 transition-colors hover:text-white"
                >
                  Whitepaper
                </a>
              </li>
              <li>
                <a
                  href="https://hedera.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/45 transition-colors hover:text-white"
                >
                  Hedera Hashgraph
                </a>
              </li>
            </ul>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-14 flex flex-col items-center justify-center gap-4 border-t border-white/10 pt-6"
        >
          <p className="text-xs text-white/35">
            © {new Date().getFullYear()} {SITE.name}. Built on Hedera Hashgraph.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
