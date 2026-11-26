"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { motion } from "framer-motion";
import { ProgressiveBlur } from "@/components/ui/progressiveblur";
import FaqsCenteredSection from "@/components/ui/faqs-3";
import type { FaqItem } from "@/components/ui/faqs-3-utils/faqs-data";

interface WorkingCapitalFacility {
  id: string;
  accent: string;
  title: string;
  navLabel: string;
  description: string;
  keyElements: string[];
}

const LIQUIDITY_CARDS = [
  {
    id: "capital-facilitated",
    value: "₹500+ Cr",
    title: "Capital facilitated",
    description:
      "Structured credit lines and liquidity support arranged across growing businesses.",
    tag: "TRACK RECORD",
    accent: "#2E89F1",
  },
  {
    id: "lending-network",
    value: "40+",
    title: "Banking & NBFC network",
    description:
      "Active lender relationships matched to your sector, ticket size, and collateral profile.",
    tag: "LENDER ACCESS",
    accent: "#3AD23F",
  },
  {
    id: "sanction-pace",
    value: "21 days",
    title: "Typical sanction pace",
    description:
      "Disciplined application and underwriting preparation from requirement map to sanction.",
    tag: "TURNAROUND",
    accent: "#FB771B",
  },
  {
    id: "sanction-success",
    value: "98%",
    title: "Sanction success rate",
    description:
      "High conversion on structured cases backed by clean numbers and credit-ready packs.",
    tag: "EXECUTION",
    accent: "#2E89F1",
  },
];

const FACILITIES: WorkingCapitalFacility[] = [
  {
    id: "cc-od",
    accent: "#3AD23F",
    title: "Cash Credit & Overdraft Limits",
    navLabel: "CC / OD Limits",
    description:
      "Fund-based revolving lines that let you draw as cash needs arise and pay interest only on utilized balances—smoothing day-to-day collections, payroll, and raw material purchases.",
    keyElements: [
      "Drawing power (DP) & stock/book-debt alignment",
      "Secured OD, dropline OD, and working capital demand loans",
      "Interest cost & utilization efficiency review",
    ],
  },
  {
    id: "trade-finance",
    accent: "#2E89F1",
    title: "Trade & Invoice Finance",
    navLabel: "Trade Finance",
    description:
      "Short-term trade structures—including invoice/bill discounting, supplier finance, and buyer's credit—that accelerate cash conversion without locking up long-term capital.",
    keyElements: [
      "Receivables & invoice discounting structures",
      "Vendor/supplier bill payment support",
      "Alignment with customer credit terms",
    ],
  },
  {
    id: "lc-bg",
    accent: "#FB771B",
    title: "Letters of Credit & Bank Guarantees",
    navLabel: "LC / BG",
    description:
      "Arrange domestic or import Letters of Credit and performance, financial, or advance Bank Guarantees with structured margin money and clean covenant alignment.",
    keyElements: [
      "Performance, financial & tender bank guarantees",
      "Inland and import LC structuring",
      "Margin money & commission optimization",
    ],
  },
  {
    id: "export-import",
    accent: "#3AD23F",
    title: "Export & Import Credit",
    navLabel: "Export / Import",
    description:
      "Support pre-shipment and post-shipment export credit alongside import financing so cross-border order books can scale without straining domestic cash reserves.",
    keyElements: [
      "Packing credit (pre-shipment) & bill discounting (post-shipment)",
      "Import financing & trade documentation alignment",
      "Cash-flow matching against export realization cycles",
    ],
  },
  {
    id: "multi-bank",
    accent: "#2E89F1",
    title: "Multi-Bank & Structured Facilities",
    navLabel: "Multi-Bank",
    description:
      "When a single bank limit becomes a bottleneck, we structure multiple banking or consortium/parallel arrangements with clear security sharing and reporting discipline.",
    keyElements: [
      "Multi-lender allocation & parallel limit structuring",
      "Covenant mapping & security coordination",
      "Unified lender reporting & CMA pack",
    ],
  },
  {
    id: "renewals",
    accent: "#FB771B",
    title: "Limit Enhancements & Renewals",
    navLabel: "Enhancements",
    description:
      "Proactive annual renewals, ad-hoc or permanent limit enhancements, and facility rebalancing—preparing lender-ready numbers well ahead of maturity dates.",
    keyElements: [
      "Annual renewal & limit step-up packages",
      "Stock/debtor statement & variance readiness",
      "Lender negotiation & sanction follow-through",
    ],
  },
];

const WORKING_CAPITAL_FAQ_HEADER = {
  eyebrow: "Working Capital FAQs",
  title: "Common questions on limits and lenders.",
  description:
    "Practical answers on sizing facilities, working with existing banks, and preparing credit-ready numbers.",
};

const WORKING_CAPITAL_FAQS: FaqItem[] = [
  {
    id: "how-much-working-capital",
    title: "How much working capital limit can my business qualify for?",
    content:
      "Eligibility depends on your operating cycle, receivable and inventory days, historical turnover, audited financials, debt-service capacity, and lender credit policy. We start by quantifying your actual liquidity gap rather than pushing an arbitrary number.",
  },
  {
    id: "existing-banking-relationships",
    title: "Do you work with businesses that already have existing bank limits?",
    content:
      "Yes. Many clients come to us for limit enhancements, annual renewals, adding a second or third bank/NBFC, or restructuring existing CC/OD, LC, and trade lines so facilities match current operating scale.",
  },
  {
    id: "documents-and-preparation",
    title: "What financials and documents are typically needed to get started?",
    content:
      "Lenders generally look for recent audited or provisional financials, bank statements, GST and statutory filings, debtor/creditor aging, inventory schedules, and projected CMA data and cash-flow assumptions. We help organize and structure the package cleanly.",
  },
  {
    id: "banks-vs-nbfcs",
    title: "How do you decide between banks, NBFCs, or a multi-lender mix?",
    content:
      "We match your facility type, collateral profile, ticket size, and urgency to lenders whose credit appetite fits your sector—combining traditional bank limits with specialized NBFC or trade structures where appropriate.",
  },
  {
    id: "sanction-timelines-and-outcomes",
    title: "How fast does sanction happen, and is approval guaranteed?",
    content:
      "Timelines vary by lender, collateral or documentation complexity, and credit committee turnaround, though structured cases often move in around a few weeks once complete information is ready. Final credit sanction and pricing always rest with the lending institution.",
  },
];

export default function WorkingCapitalPage() {
  const [activeFacilityId, setActiveFacilityId] = React.useState<string>(
    FACILITIES[0].id,
  );
  const blockRefs = React.useRef<Record<string, HTMLDivElement | null>>({});

  const activeFacility =
    FACILITIES.find((item) => item.id === activeFacilityId) ?? FACILITIES[0];

  React.useEffect(() => {
    const elements = FACILITIES.map((f) => blockRefs.current[f.id]).filter(
      (el): el is HTMLDivElement => Boolean(el),
    );

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          const id = visible[0].target.getAttribute("data-facility-id");
          if (id) setActiveFacilityId(id);
        }
      },
      {
        rootMargin: "-25% 0px -55% 0px",
        threshold: 0.1,
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  function handleSelectFacility(id: string) {
    setActiveFacilityId(id);
    const target = blockRefs.current[id];
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  return (
    <div className="relative flex flex-1 flex-col font-sans">
      {/* Section 1: Full-Height Spaced Hero */}
      <section
        aria-labelledby="wc-hero-heading"
        className="flex min-h-[calc(100vh-5.25rem)] w-full flex-col justify-center border-b border-black/10 px-6 py-24 sm:px-10 sm:py-32"
      >
        <div className="mx-auto w-full max-w-6xl">
          <div className="max-w-3xl">
            <h1
              id="wc-hero-heading"
              className="text-4xl font-semibold tracking-[-0.03em] text-[#121212] sm:text-6xl sm:leading-[1.06] lg:text-[64px]"
            >
              Liquidity engineered for how your business moves.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#666666] sm:text-lg">
              Structure CC/OD limits, trade finance, LC/BG facilities, export
              credit, and multi-bank renewals across banks and NBFCs—backed by
              clear numbers and hands-on execution.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3.5">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-lg bg-[#121212] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#000000]"
              >
                <span>Discuss your requirement</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#facilities"
                className="inline-flex items-center gap-1.5 rounded-lg border border-black/12 bg-white px-5 py-3 text-sm font-medium text-[#121212] transition-colors hover:border-black/25 hover:text-[#000000]"
              >
                <span>Explore facilities</span>
                <ArrowUpRight className="h-4 w-4 text-[#525252]" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Brex-Style Depth Cards for the 4 Key Pointers */}
      <section
        id="proof"
        aria-labelledby="proof-heading"
        className="w-full border-b border-black/10 px-6 py-20 sm:px-10 sm:py-28"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2
              id="proof-heading"
              className="text-3xl font-medium tracking-[-0.03em] text-[#121212] sm:text-4xl sm:leading-[1.15]"
            >
              Structured credit, built on real track record.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#666666] sm:text-base">
              Practical lender access, clean credit packs, and disciplined
              follow-through across operating cycles.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {LIQUIDITY_CARDS.map((card) => (
              <div
                key={card.id}
                className="group flex flex-col justify-between rounded-2xl border border-black/8 bg-[#F7F7F7] p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-black/15 hover:bg-white hover:shadow-[0_18px_36px_-14px_rgba(18,18,18,0.12)]"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-semibold tracking-[0.14em] text-[#737373] uppercase">
                      {card.tag}
                    </span>
                    <span
                      aria-hidden="true"
                      className="h-2 w-2 rounded-full transition-transform duration-300 group-hover:scale-125"
                      style={{ backgroundColor: card.accent }}
                    />
                  </div>

                  <div className="mt-6 text-3xl font-semibold tracking-[-0.03em] text-[#121212] sm:text-[34px]">
                    {card.value}
                  </div>

                  <h3 className="mt-2 text-base font-medium tracking-[-0.02em] text-[#121212]">
                    {card.title}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-[#666666] sm:text-sm">
                    {card.description}
                  </p>
                </div>

                <div className="mt-6 rounded-xl border border-black/6 bg-white/80 px-3.5 py-2.5 transition-colors duration-300 group-hover:bg-[#F7F7F7]">
                  <div className="flex items-center justify-between text-[11px] text-[#525252]">
                    <span>Working Capital Desk</span>
                    <span className="font-medium text-[#121212]">Verified</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Attio-Style Sticky Left Rail + Scrolling Right Facility Blocks */}
      <section
        id="facilities"
        aria-labelledby="facilities-heading"
        className="w-full border-b border-black/10"
      >
        <div className="mx-auto max-w-6xl px-6 pt-24 pb-12 sm:px-10 sm:pt-32 sm:pb-14">
          <h2
            id="facilities-heading"
            className="max-w-xl text-3xl font-medium tracking-[-0.03em] text-[#121212] sm:text-4xl sm:leading-[1.15]"
          >
            The right facility for every cash bottleneck.
          </h2>
        </div>

        {/* Horizontal divider below heading + vertical divider between left index & right content */}
        <div className="border-t border-black/10">
          <div className="mx-auto grid max-w-6xl grid-cols-1 px-6 sm:px-10 lg:grid-cols-12">
            {/* Left Sticky Index */}
            <aside
              aria-label="Working capital facility index"
              className="border-b border-black/10 py-8 lg:col-span-4 lg:border-r lg:border-b-0 lg:py-16 lg:pr-10"
            >
              <ul className="relative flex flex-wrap gap-2 lg:sticky lg:top-28 lg:flex-col lg:gap-1">
                {FACILITIES.map((facility) => {
                  const isActive = activeFacilityId === facility.id;
                  return (
                    <li key={facility.id} className="relative">
                      <button
                        type="button"
                        onClick={() => handleSelectFacility(facility.id)}
                        className={`relative flex w-full cursor-pointer items-center gap-3 rounded-lg px-3.5 py-2.5 text-left text-sm transition-colors focus:outline-none ${
                          isActive
                            ? "font-medium text-[#121212]"
                            : "font-normal text-[#8E8E8E] hover:text-[#121212]"
                        }`}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="wc-active-facility-bar"
                            aria-hidden="true"
                            transition={{
                              type: "spring",
                              stiffness: 380,
                              damping: 32,
                            }}
                            style={{ backgroundColor: activeFacility.accent }}
                            className="hidden h-4 w-0.5 shrink-0 rounded-full lg:block"
                          />
                        )}
                        <span className="truncate">{facility.navLabel}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </aside>

            {/* Right Continuous Scrolling Facility Blocks */}
            <div className="divide-y divide-black/10 lg:col-span-8 lg:pl-14">
              {FACILITIES.map((facility) => (
                <div
                  key={facility.id}
                  data-facility-id={facility.id}
                  ref={(el) => {
                    blockRefs.current[facility.id] = el;
                  }}
                  className="py-12 first:pt-12 last:pb-16 sm:py-16 sm:first:pt-16 sm:last:pb-24"
                >
                  <h3 className="text-2xl font-medium tracking-[-0.025em] text-[#121212] sm:text-3xl">
                    {facility.title}
                  </h3>

                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#666666] sm:text-base">
                    {facility.description}
                  </p>

                  <div className="mt-6 rounded-xl border border-black/10 bg-[#F7F7F7]/80 p-5 sm:p-6">
                    <span className="text-[11px] font-semibold tracking-[0.12em] text-[#737373] uppercase">
                      What we structure
                    </span>
                    <ul className="mt-3.5 space-y-2.5">
                      {facility.keyElements.map((element) => (
                        <li
                          key={element}
                          className="flex items-start gap-2.5 text-sm leading-relaxed text-[#121212]"
                        >
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#121212]" />
                          <span>{element}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Working Capital FAQs */}
      <FaqsCenteredSection
        id="working-capital-faqs"
        header={WORKING_CAPITAL_FAQ_HEADER}
        items={WORKING_CAPITAL_FAQS}
      />

      {/* Section 5: Bottom Action Banner */}
      <section
        aria-labelledby="wc-cta-heading"
        className="w-full px-6 py-20 sm:px-10 sm:py-24"
      >
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 rounded-xl border border-black/10 bg-[#F7F7F7] p-8 sm:flex-row sm:items-center sm:p-10">
          <div className="max-w-xl">
            <span className="text-[11px] font-semibold tracking-[0.12em] text-[#737373] uppercase">
              Working Capital Desk
            </span>
            <h2
              id="wc-cta-heading"
              className="mt-2 text-2xl font-medium tracking-[-0.03em] text-[#121212] sm:text-3xl"
            >
              Map your working capital gap with clarity.
            </h2>
            <p className="mt-2.5 text-sm leading-relaxed text-[#666666]">
              Share your current cycle, existing limits, and growth plans—we'll
              help structure the right banking approach.
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