# PayoutRails — Landing Site

A full-fledged, animation-rich Next.js 14 (App Router) landing page for **PayoutRails** — stablecoin payroll for emerging-market freelancers, settled on Hedera.

## Run it

```bash
cd PayoutRails
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Pages

| Route | What it is |
|---|---|
| `/` | The landing page — hero, problem, solution, why-Hedera, features, flow, stats, tokenomics, CTA |
| `/documentation` | Documentation page summarizing the whitepaper, with a prominent button linking to the **Notion whitepaper** |

The **"Read Whitepaper" / "Documentation"** buttons in the navbar, hero, CTA and footer link to the Notion whitepaper URL defined in [`lib/content.ts`](./lib/content.ts) (`NOTION_WHITEPAPER_URL`).

## Animation libraries — where each one is used

| Library | Used in |
|---|---|
| **Motion (Framer Motion)** | `Navbar`, `Hero`, `AnimatedText`, `SectionHeading`, section reveals, `CTA`, `Footer` |
| **GSAP** (+ ScrollTrigger) | `Problem` (scrubbed card reveal), `HowItWorks` (pinned horizontal scroll) |
| **React Three Fiber** (+ drei, three) | `HeroCanvas` — animated 3D "rail" torus + drifting coin nodes |
| **Theatre.js** (`@theatre/core` + `@theatre/studio`) | `TheatreBadge` — real Theatre project/sheet/object driving the hero badge; studio loads in dev |
| **Lenis** | `SmoothScroll` — document-root smooth scrolling |
| **React Spring** | `Features` (physics tilt cards), `Tokenomics` (animated allocation bars) |
| **Lottie-react** | `Solution` — the `payout.json` pulse animation |
| **Anime.js** | `WhyHedera` — staggered grid reveal + number count |
| **Aceternity UI** (pattern) | `ui/SpotlightCard`, `ui/BackgroundBeams`, `ui/AnimatedText` |
| **Spline** (`@splinetool/react-spline`) | `SplineBackdrop` in `CTA` — set `NEXT_PUBLIC_SPLINE_SCENE` to a scene URL; falls back to a CSS orb otherwise |
| **CSS scroll-driven animations** | `globals.css` — top scroll-progress bar (`scroll()` timeline) + `.reveal-on-view` (`view()` timeline) |
| **velocity.js** (`velocity-animate`) | `Stats` — count-up tweens |
| **mo.js** (`@mojs/core`) | `CTA` — particle burst on button click |

## Notes

- The R3F canvas and Spline backdrop are client-only (`next/dynamic`, `ssr: false` where needed).
- `@theatre/studio` only initializes in development — it is dynamically imported and guarded by `NODE_ENV`.
- To enable a real Spline scene, create `.env.local` with `NEXT_PUBLIC_SPLINE_SCENE=https://prod.spline.design/your-scene/scene.splinecode`.
- Replace `lib/lottie/payout.json` with any exported Lottie file to swap the Solution-section animation.
