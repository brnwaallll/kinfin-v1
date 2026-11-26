"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { ProgressiveBlur } from "@/components/ui/progressiveblur";
import FaqsCenteredSection from "@/components/ui/faqs-3";
import type { FaqItem } from "@/components/ui/faqs-3-utils/faqs-data";

interface LoanFacility {
  id: string;
  title: string;
  tag: string;
  summary: string;
}

const LOAN_METRICS = [
  {
    value: "₹500+ Cr",
    label: "Debt facilitated",
    accent: "#2E89F1",
  },
  {
    value: "25+",
    label: "Partner lenders",
    accent: "#3AD23F",
  },
  {
    value: "11%",
    label: "Rates from",
    accent: "#FB771B",
  },
  {
    value: "15 yrs",
    label: "Max tenure",
    accent: "#2E89F1",
  },
];

const CURVE_CYCLES = [
  { name: "Green", color: "#3AD23F" },
  { name: "Blue", color: "#2E89F1" },
  { name: "Orange", color: "#FB771B" },
];

const P0 = { x: 0, y: 640 };
const P1 = { x: 740, y: 605 };
const P2 = { x: 1440, y: 0 };

const CURVE_PATH = `M ${P0.x} ${P0.y} Q ${P1.x} ${P1.y}, ${P2.x} ${P2.y}`;
const AREA_PATH = `M ${P0.x} ${P0.y} Q ${P1.x} ${P1.y}, ${P2.x} ${P2.y} L 1440 720 L 0 720 Z`;

function getQuadBezierYAtX(targetX: number): number {
  let low = 0;
  let high = 1;
  for (let i = 0; i < 24; i++) {
    const mid = (low + high) / 2;
    const inv = 1 - mid;
    const x = inv * inv * P0.x + 2 * inv * mid * P1.x + mid * mid * P2.x;
    if (x < targetX) {
      low = mid;
    } else {
      high = mid;
    }
  }
  const t = (low + high) / 2;
  const inv = 1 - t;
  return inv * inv * P0.y + 2 * inv * t * P1.y + t * t * P2.y;
}

const GRAPH_TICKS = Array.from({ length: 130 }, (_, idx) => {
  const x = Number((idx * 11.15).toFixed(2));
  const y = Number(getQuadBezierYAtX(x).toFixed(2));
  return { x, y };
});

const LOAN_FACILITIES: LoanFacility[] = [
  {
    id: "term-loans",
    title: "Term Loans",
    tag: "Capex & Expansion",
    summary:
      "Medium-to-long-term debt for machinery, plant upgrades, and operating cash flows.",
  },
  {
    id: "project-finance",
    title: "Project Finance",
    tag: "Greenfield & Brownfield",
    summary:
      "Milestone-linked funding sized to project DSCR, cost schedules, and phased drawdowns.",
  },
  {
    id: "lap",
    title: "Loan Against Property",
    tag: "Real Estate Backed",
    summary:
      "Long-tenure liquidity against commercial, industrial, or residential property.",
  },
  {
    id: "construction-finance",
    title: "Construction Finance",
    tag: "Build & Receivables",
    summary:
      "Stage-wise developer credit aligned with construction milestones and project cash flows.",
  },
  {
    id: "nbfc-private-credit",
    title: "NBFC & Private Credit",
    tag: "Flexible & Bridge",
    summary:
      "Tailored credit structures for growth, bridge, or specialized underwriting needs.",
  },
  {
    id: "restructuring",
    title: "Balance Sheet Restructuring",
    tag: "Refinancing",
    summary:
      "Consolidate high-cost debt, smooth maturities, and ease near-term cash pressure.",
  },
];

const CORPORATE_LOAN_FAQ_HEADER = {
  eyebrow: "Corporate Loans FAQs",
  title: "Direct answers on eligibility, fees, and approvals.",
  description:
    "How KinFin approaches term debt, structured loans, and lender underwriting.",
};

const CORPORATE_LOAN_FAQS: FaqItem[] = [
  {
    id: "qualifying-loan-amount",
    title: "What loan amount can my business qualify for?",
    content:
      "Loan size depends on your cash-flow generation and Debt Service Coverage Ratio (DSCR), existing leverage, business vintage, purpose of funds, and collateral or security coverage. We assess realistic borrowing capacity first so you pursue terms your cash flows can comfortably support.",
  },
  {
    id: "upfront-fees-transparency",
    title: "How are fees and commercial terms structured?",
    content:
      "We keep commercial terms clear and agreed upfront before formal mandate execution—separating any advisory/structuring scope from standard lender processing, legal, or valuation charges. Specific scope and commercials are shared transparently once we understand your requirement.",
  },
  {
    id: "prior-bank-decline",
    title: "Can you help if a bank has already declined or stalled our request?",
    content:
      "Often, yes—provided the underlying business has sound fundamentals. A decline usually comes down to how cash flows, collateral, or ratios were presented or a mismatch with one bank's credit policy. We diagnose the bottleneck and reposition the case with lenders whose criteria fit better.",
  },
  {
    id: "banks-vs-nbfc-debt",
    title: "When does a term loan or LAP make sense versus NBFC or private credit?",
    content:
      "Banks typically offer sharper pricing and longer tenures for established cash flows and standard security, while NBFCs or specialized credit can offer faster turnaround or more flexible structuring for specific use cases. We compare the trade-offs clearly rather than forcing a single route.",
  },
  {
    id: "approval-and-timeline-expectations",
    title: "How long does sanction take, and is loan approval guaranteed?",
    content:
      "Timelines depend on loan complexity, valuation/legal checks, and lender credit committee pace, often spanning several weeks once documentation is complete. Credit sanction, interest rates, and final terms are always determined by the lending institution.",
  },
];

export default function CorporateLoansPage() {
  const [cycleIndex, setCycleIndex] = React.useState<number>(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCycleIndex((prev) => (prev + 1) % CURVE_CYCLES.length);
    }, 5200);

    return () => clearInterval(interval);
  }, []);

  const activeCurve = CURVE_CYCLES[cycleIndex];

  return (
    <div className="relative flex flex-1 flex-col font-sans">
      {/* Section 1: Centered Hero */}
      <section
        aria-labelledby="loans-hero-heading"
        className="flex min-h-[calc(100vh-5.25rem)] w-full flex-col justify-center border-b border-black/10 px-6 py-24 sm:px-10 sm:py-32"
      >
        <div className="mx-auto w-full max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <h1
              id="loans-hero-heading"
              className="text-4xl font-semibold tracking-[-0.03em] text-[#121212] sm:text-6xl sm:leading-[1.06]"
            >
              Structured debt, matched to real cash flows.
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#666666] sm:text-[17px]">
              Term loans, project finance, loan against property, construction
              finance, NBFC credit, and balance sheet restructuring—arranged
              with lender-grade preparation from term sheet to disbursement.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-lg bg-[#121212] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#000000]"
              >
                <span>Discuss your loan requirement</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#loan-structures"
                className="inline-flex items-center justify-center rounded-lg border border-black/12 bg-white px-4 py-2.5 text-sm font-medium text-[#121212] transition-colors hover:border-black/25 hover:text-[#000000]"
              >
                Compare loan structures
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Metrics on Left + Edge-to-Edge Curve Across Main Section */}
      <section
        aria-labelledby="loan-scale-heading"
        className="relative flex min-h-[calc(100vh-8.5rem)] w-full flex-col overflow-hidden border-b border-black/10 px-6 py-16 sm:px-10 sm:py-24"
      >
        {/* Full-bleed curve spanning bottom-left to top-right of this section */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
        >
          <svg
            viewBox="0 0 1440 720"
            preserveAspectRatio="none"
            fill="none"
            className="h-full w-full"
          >
            <defs>
              <clipPath id="corporate-curve-ticks-clip">
                <path d={AREA_PATH} />
              </clipPath>
              <linearGradient
                id="corporate-fullbleed-area"
                x1="0%"
                y1="100%"
                x2="0%"
                y2="0%"
              >
                <stop
                  offset="0%"
                  stopColor={activeCurve.color}
                  stopOpacity="0.14"
                />
                <stop
                  offset="100%"
                  stopColor={activeCurve.color}
                  stopOpacity="0.01"
                />
              </linearGradient>
            </defs>

            <g clipPath="url(#corporate-curve-ticks-clip)">
              {GRAPH_TICKS.map((tick) => (
                <line
                  key={tick.x}
                  x1={tick.x}
                  y1={720}
                  x2={tick.x}
                  y2={tick.y}
                  stroke="rgba(18, 18, 18, 0.055)"
                  strokeWidth="1"
                />
              ))}
            </g>

            <motion.path
              key={`area-${cycleIndex}`}
              d={AREA_PATH}
              fill="url(#corporate-fullbleed-area)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.9, 0.9, 0] }}
              transition={{
                duration: 5.2,
                times: [0, 0.45, 0.78, 1],
                ease: "easeInOut",
              }}
            />

            <motion.path
              key={`stroke-${cycleIndex}`}
              d={CURVE_PATH}
              stroke={activeCurve.color}
              strokeWidth="2.5"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0, pathOffset: 0, opacity: 0.4 }}
              animate={{
                pathLength: [0, 1, 1, 0],
                pathOffset: [0, 0, 0, 1],
                opacity: [0.4, 1, 1, 0.25],
              }}
              transition={{
                duration: 5.2,
                times: [0, 0.48, 0.76, 1],
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </svg>
        </div>

        {/* Left-aligned content centered vertically over the full-width canvas */}
        <div className="relative z-10 mx-auto my-auto w-full max-w-6xl">
          <div className="max-w-lg">
            <h2
              id="loan-scale-heading"
              className="-translate-y-7 text-3xl font-medium tracking-[-0.03em] text-[#121212] sm:-translate-y-9 sm:text-4xl sm:leading-[1.15]"
            >
              <span className="block">Built for scale,</span>
              <span className="block text-[#737373]">across every cycle.</span>
            </h2>

            <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-7">
              {LOAN_METRICS.map((metric) => (
                <div
                  key={metric.label}
                  className="border-l-2 border-black/15 pl-4"
                >
                  <div className="text-2xl font-medium tracking-[-0.03em] text-[#121212] sm:text-3xl">
                    {metric.value}
                  </div>
                  <p className="mt-1 text-sm whitespace-nowrap text-[#666666]">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Compact Hairline Loan Grid */}
      <section
        id="loan-structures"
        aria-labelledby="loan-structures-heading"
        className="w-full border-b border-black/10 px-6 py-20 sm:px-10 sm:py-24"
      >
        <div className="mx-auto max-w-6xl">
          <div className="max-w-xl">
            <h2
              id="loan-structures-heading"
              className="text-3xl font-medium tracking-[-0.03em] text-[#121212] sm:text-4xl sm:leading-[1.15]"
            >
              <span className="block">Capital structured around,</span>
              <span className="block text-[#737373]">
                how your business earns.
              </span>
            </h2>
          </div>

          <div className="mt-14 grid grid-cols-1 border-t border-l border-black/10 bg-white sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
            {LOAN_FACILITIES.map((facility) => (
              <div
                key={facility.id}
                className="flex flex-col justify-between border-r border-b border-black/10 p-6 transition-colors hover:bg-[#FAFAFA]"
              >
                <div>
                  <span className="text-[11px] font-medium tracking-[0.06em] text-[#737373] uppercase">
                    {facility.tag}
                  </span>
                  <h3 className="mt-2 text-lg font-medium tracking-[-0.02em] text-[#121212]">
                    {facility.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#666666]">
                    {facility.summary}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Corporate Loans FAQs */}
      <FaqsCenteredSection
        id="corporate-loans-faqs"
        header={CORPORATE_LOAN_FAQ_HEADER}
        items={CORPORATE_LOAN_FAQS}
      />

      {/* Section 5: Bottom CTA */}
      <section
        aria-labelledby="loans-cta-heading"
        className="w-full px-6 py-20 sm:px-10 sm:py-24"
      >
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 rounded-xl border border-black/10 bg-[#F7F7F7] p-8 sm:flex-row sm:items-center sm:p-10">
          <div className="max-w-xl">
            <span className="text-[11px] font-semibold tracking-[0.12em] text-[#737373] uppercase">
              Corporate Debt Desk
            </span>
            <h2
              id="loans-cta-heading"
              className="mt-2 text-2xl font-medium tracking-[-0.03em] text-[#121212] sm:text-3xl"
            >
              Structure the right debt facility for your next phase.
            </h2>
            <p className="mt-2.5 text-sm leading-relaxed text-[#666666]">
              Share your capital purpose, target tenor, and existing debt
              profile—we'll map a practical lending path.
            </p>
          </div>

          <Link
            href="/#contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#121212] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#000000]"
          >
            <span>Talk to us</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <ProgressiveBlur
        position="bottom"
        height="6rem"
        blurLevels={[0.5, 1, 2, 4, 8, 12, 18, 24]}
        className="fixed! inset-x-0! bottom-0! z-40!"
      />
    </div>
  );
}