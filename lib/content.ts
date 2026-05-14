// Central content + constants for the PayoutRails landing site.

export const NOTION_WHITEPAPER_URL =
  "https://www.notion.so/PayoutRails-Whitepaper-3608e5d9347f804daedafa5a7ceb8d07?source=copy_link";

export const SITE = {
  name: "PayoutRails",
  tagline: "Stablecoin payroll for emerging-market freelancers — settled in seconds on Hedera.",
  description:
    "PayoutRails turns a payroll run into one atomic, instantly-final on-chain event. Pay remote contractors across Argentina, Nigeria, Vietnam and the Philippines for ~$0.001 a transfer, with an immutable receipt for every payout.",
};

export const NAV_LINKS = [
  { label: "Problem", href: "#problem" },
  { label: "Solution", href: "#solution" },
  { label: "Why Hedera", href: "#why-hedera" },
  { label: "Features", href: "#features" },
  { label: "Flow", href: "#how-it-works" },
  { label: "Token", href: "#tokenomics" },
];

export const HERO_STATS = [
  { value: 0.001, prefix: "$", suffix: "", label: "Network cost per transfer" },
  { value: 4, prefix: "", suffix: "s", label: "aBFT settlement finality" },
  { value: 8, prefix: "", suffix: "%", label: "TradFi fee leak removed" },
];

export const PROBLEMS = [
  {
    k: "01",
    title: "The fee leak",
    body: "FX margin + transfer fee + local cash-out fee runs 4–8% of every USD payout. On a $1,000 invoice, that is $40–80 lost — every contractor, every month.",
  },
  {
    k: "02",
    title: "The settlement delay",
    body: "Correspondent-bank rails take 3–7 business days to clear. Contractors finance their own cash-flow gap; weekly or milestone pay is impossible without drowning in fees.",
  },
  {
    k: "03",
    title: "The reconciliation burden",
    body: "Neither side has a shared record. Employers rebuild payroll from bank statements for auditors; contractors reconstruct income from screenshots for tax filings.",
  },
];

export const FEATURES = [
  {
    title: "One-click batch payroll",
    body: "Upload a contractor list, fund once, settle the whole batch atomically through Hedera Token Service. All-or-nothing — never a half-finished run.",
    tag: "Employers",
  },
  {
    title: "Weekly & milestone cadence",
    body: "Because a payout costs ~$0.001, paying weekly or per-milestone costs essentially the same as paying monthly.",
    tag: "Employers",
  },
  {
    title: "Audit-ready receipts",
    body: "Every payout writes a consensus-timestamped message to the employer's HCS topic. Export a tamper-evident payroll history for any period.",
    tag: "Compliance",
  },
  {
    title: "Paid in seconds, non-custodial",
    body: "Contractors hold their own keys. Funds are spendable on arrival — not in 3–7 days — and PayoutRails never holds contractor capital.",
    tag: "Contractors",
  },
  {
    title: "Independently verifiable",
    body: "The contractor portal reads straight from Hedera Mirror Nodes. Payment history is provable without trusting PayoutRails' servers.",
    tag: "Contractors",
  },
  {
    title: "Open receipt standard",
    body: "The payoutrails.receipt.v1 HCS schema is published openly so any Hedera payments project can read and write the same format.",
    tag: "Ecosystem",
  },
];

export const STEPS = [
  {
    n: "1",
    title: "Fund a batch",
    body: "The employer uploads a contractor list and funds the run in a regulated stablecoin — USDC.h, AUDD, or a Stablecoin Studio partner stable.",
  },
  {
    n: "2",
    title: "Settle atomically",
    body: "A single HTS transaction pays every contractor at once. If any leg is invalid, the whole batch fails cleanly.",
  },
  {
    n: "3",
    title: "Write the receipt",
    body: "Each payout appends a structured, consensus-timestamped receipt to the employer's dedicated HCS topic.",
  },
  {
    n: "4",
    title: "Pay & verify",
    body: "Contractors receive funds in a non-custodial wallet and verify full history against the public Mirror Node REST API.",
  },
  {
    n: "5",
    title: "Cash out locally",
    body: "Integrated, licensed off-ramp partners convert stablecoin to local fiat inside each corridor.",
  },
];

export const HEDERA_REASONS = [
  {
    title: "USD-denominated fixed fees",
    body: "An HTS transfer costs ~$0.001 regardless of congestion. On an EVM chain a percentage-of-gas fee makes the $50-payout segment structurally unprofitable.",
  },
  {
    title: "Native HCS consensus timestamps",
    body: "Receipts are a first-class network service, not a contract-emitted log. That is what removes the bookkeeping intermediary.",
  },
  {
    title: "aBFT finality in 3–5 seconds",
    body: "Funded → settled → receipt written completes before the employer closes the tab. Finality is the product promise.",
  },
  {
    title: "Atomic HTS batching",
    body: "A payroll run is all-or-nothing by nature. HTS multi-party transfers express that natively — no orphaned transfers.",
  },
];

export const TOKEN_ALLOCATION = [
  { label: "Community & Adoption Incentives", pct: 35, color: "#7c6cff" },
  { label: "Ecosystem & Off-Ramp Partnerships", pct: 20, color: "#a78bfa" },
  { label: "Team & Advisors", pct: 18, color: "#22d3ee" },
  { label: "Treasury & Operations", pct: 15, color: "#67e8f9" },
  { label: "Liquidity & Market Operations", pct: 7, color: "#a3e635" },
  { label: "Hedera / Thrive Strategic", pct: 5, color: "#f0abfc" },
];

export const STATS = [
  { value: 15, prefix: "$", suffix: "T", label: "Digital payments market by 2027" },
  { value: 50000, prefix: "", suffix: "+", label: "Target monthly on-chain transactions" },
  { value: 400, prefix: "", suffix: "", label: "Target active contractor wallets" },
  { value: 4, prefix: "", suffix: "", label: "Launch corridors at go-live" },
];

// Documentation page sections — mirrors the whitepaper.
export const DOC_SECTIONS = [
  {
    id: "abstract",
    title: "Abstract",
    body: "PayoutRails is payroll infrastructure for companies paying remote freelancers in emerging markets. An employer funds a batch in a regulated stablecoin; PayoutRails settles every payout atomically on Hedera in 3–5 seconds at ~$0.001 per transfer, and writes an immutable consensus-timestamped receipt for each one. It is the only payroll rail on which a $50 cross-border payout is economically profitable to process.",
  },
  {
    id: "problem",
    title: "Market Opportunity",
    body: "Cross-border freelancer payments lose 4–8% to the FX + transfer + cash-out stack and take 3–7 days to clear, with no shared record for either side. The digital payments market is projected to surpass $15T by 2027, and the Hedera Foundation's stated 2026 priority names this lane directly: stablecoins that settle in seconds across continents.",
  },
  {
    id: "solution",
    title: "The Solution",
    body: "PayoutRails turns a payroll run into one signed, atomic on-chain event: fund a batch, settle atomically via HTS, write a receipt to HCS, let contractors verify against Mirror Nodes, and cash out through licensed off-ramp partners. Milestone contracts add an HSCS escrow that releases per-milestone on sign-off.",
  },
  {
    id: "why-hedera",
    title: "Why Hedera",
    body: "Fixed USD-denominated fees make small payouts viable. Native HCS consensus timestamping makes the receipt a network fact. aBFT finality in 3–5 seconds matches the payroll UX. Atomic HTS batching matches the all-or-nothing payroll primitive. These four properties do not exist together on Ethereum, Base, or Solana.",
  },
  {
    id: "architecture",
    title: "Technical Architecture",
    body: "Next.js + TypeScript front end, Node service layer with Prisma over Postgres for off-chain coordination only. On-chain: HTS for transfers and atomic batches, HCS for per-employer receipt topics, HSCS for milestone escrow, Mirror Node REST API for all trustless read paths. WalletConnect for HashPack, plus KYC/KYB and corridor-specific off-ramp integrations.",
  },
  {
    id: "tokenomics",
    title: "Tokenomics",
    body: "PayoutRails works fully without a token — payouts and revenue settle in stablecoins. The RAILS token (1,000,000,000 fixed supply) aligns incentives across employers, contractors, and ecosystem partners, with a programmatic buyback funded by real platform revenue. Fee rebates, staking for premium features, contractor loyalty rewards, and governance are its core utilities.",
  },
  {
    id: "roadmap",
    title: "Roadmap",
    body: "Q3 2026: testnet MVP and mainnet launch with an audited HSCS escrow. Q4 2026: 25 employers, 400 active contractor wallets, 50,000 monthly transactions, first off-ramp corridor live. Q1 2027: 3–4 corridors and the open receipt standard adopted. Q2 2027: RAILS token launch into a network with real payroll volume.",
  },
];
