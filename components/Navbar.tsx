"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { NAV_LINKS, NOTION_WHITEPAPER_URL, SITE } from "@/lib/content";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => setSolid(v > 40));

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.21, 0.61, 0.35, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-3"
    >
      <nav
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between rounded-2xl border px-4 py-3 transition-all duration-300 sm:px-6",
          solid
            ? "border-white/10 bg-ink-800/80 backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        <Link href="/" className="flex items-center gap-2.5">
          <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-iris to-aqua">
            <span className="absolute inset-0 animate-pulse-ring rounded-lg bg-iris/40" />
            <span className="relative h-3 w-3 rounded-sm bg-ink" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-white">
            {SITE.name}
          </span>
        </Link>

        <ul className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm text-white/60 transition-colors hover:text-white"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/documentation"
            className="text-sm text-white/70 transition-colors hover:text-white"
          >
            Documentation
          </Link>
          <a
            href={NOTION_WHITEPAPER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-iris to-iris-700 px-4 py-2 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            Read Whitepaper
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="relative">
              <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 md:hidden"
        >
          <div className="space-y-1.5">
            <span className={cn("block h-0.5 w-5 bg-white transition", open && "translate-y-2 rotate-45")} />
            <span className={cn("block h-0.5 w-5 bg-white transition", open && "opacity-0")} />
            <span className={cn("block h-0.5 w-5 bg-white transition", open && "-translate-y-2 -rotate-45")} />
          </div>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="mx-auto mt-2 max-w-6xl rounded-2xl border border-white/10 bg-ink-800/95 p-4 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm text-white/70 hover:bg-white/5 hover:text-white"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  href="/documentation"
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm text-white/70 hover:bg-white/5 hover:text-white"
                >
                  Documentation
                </Link>
              </li>
            </ul>
            <a
              href={NOTION_WHITEPAPER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block rounded-xl bg-gradient-to-r from-iris to-iris-700 px-4 py-3 text-center text-sm font-semibold text-white"
            >
              Read Whitepaper
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
