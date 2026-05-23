// Mock data + fake-id helpers for the interactive /demo prototype.
// Nothing here touches a real network — every value is simulated.

export type Contractor = {
  id: string;
  name: string;
  role: string;
  country: string;
  code: string; // 2-letter country code (rendered as a chip)
  wallet: string;
  amount: number; // USD-denominated stablecoin amount
  localCcy: string;
  localRate: number; // 1 USD = localRate units of localCcy
};

export const EMPLOYER = {
  org: "Northwind Studio",
  wallet: "0.0.447120",
  balance: 14250,
};

export const HCS_TOPIC = "0.0.609142";

export const STABLECOINS = ["USDC.h", "AUDD"] as const;
export type Stablecoin = (typeof STABLECOINS)[number];

export const CADENCES = ["Weekly", "Monthly", "Per-milestone"] as const;
export type Cadence = (typeof CADENCES)[number];

export const CONTRACTORS: Contractor[] = [
  {
    id: "c1",
    name: "Sofía Herrera",
    role: "Product Designer",
    country: "Argentina",
    code: "AR",
    wallet: "0.0.481923",
    amount: 1200,
    localCcy: "ARS",
    localRate: 1015,
  },
  {
    id: "c2",
    name: "Chidi Okeke",
    role: "Backend Engineer",
    country: "Nigeria",
    code: "NG",
    wallet: "0.0.502881",
    amount: 1850,
    localCcy: "NGN",
    localRate: 1580,
  },
  {
    id: "c3",
    name: "Linh Tran",
    role: "QA Engineer",
    country: "Vietnam",
    code: "VN",
    wallet: "0.0.517340",
    amount: 950,
    localCcy: "VND",
    localRate: 25400,
  },
  {
    id: "c4",
    name: "Mateo Santos",
    role: "Frontend Engineer",
    country: "Brazil",
    code: "BR",
    wallet: "0.0.529114",
    amount: 1400,
    localCcy: "BRL",
    localRate: 5.6,
  },
  {
    id: "c5",
    name: "Andrea Cruz",
    role: "Content Writer",
    country: "Philippines",
    code: "PH",
    wallet: "0.0.534077",
    amount: 600,
    localCcy: "PHP",
    localRate: 58,
  },
];

export const BATCH_TOTAL = CONTRACTORS.reduce((s, c) => s + c.amount, 0);

// Per-payout on-chain footprint used for the simulated cost meter.
export const FEE_HTS_TRANSFER = 0.001;
export const FEE_HCS_MESSAGE = 0.0008;

export type Receipt = {
  schema: "payoutrails.receipt.v1";
  batch_id: string;
  sequence: number;
  employer: string;
  contractor: string;
  amount: string;
  stablecoin: string;
  payout_type: string;
  consensus_timestamp: string;
  tx_id: string;
};

let txCounter = 0;

export function fakeTxId(): string {
  txCounter += 1;
  const secs = Math.floor(Date.now() / 1000) + txCounter;
  const nanos = String(100000000 + Math.floor(Math.random() * 899999999));
  return `${EMPLOYER.wallet}@${secs}.${nanos}`;
}

export function fakeBatchId(): string {
  const hex = () =>
    Math.floor(Math.random() * 0xffff)
      .toString(16)
      .padStart(4, "0");
  return `batch_${hex()}${hex()}-${hex()}`;
}

export function consensusTs(): string {
  const d = new Date();
  return d.toISOString().replace("T", " ").replace("Z", " UTC");
}

export function money(n: number): string {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function localAmount(c: Contractor): string {
  const v = c.amount * c.localRate;
  return v.toLocaleString("en-US", { maximumFractionDigits: 0 });
}
