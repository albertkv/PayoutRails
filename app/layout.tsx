import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import { SITE } from "@/lib/content";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${SITE.name} — ${SITE.tagline}`,
  description: SITE.description,
  openGraph: {
    title: `${SITE.name} — Stablecoin payroll, settled on Hedera`,
    description: SITE.description,
    type: "website",
  },
  metadataBase: new URL("https://payoutrails.example"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${space.variable}`}>
      <body className="bg-ink font-sans">
        {/* CSS scroll-driven progress bar */}
        <div
          aria-hidden
          className="scroll-progress-bar fixed left-0 top-0 z-[60] h-[3px] w-full bg-gradient-to-r from-iris via-aqua to-iris-300"
        />
        <SmoothScroll>
          <Navbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
