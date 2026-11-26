"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { ProgressiveBlur } from "@/components/ui/progressiveblur";
import FaqsCenteredSection from "@/components/ui/faqs-3";
import type { FaqItem } from "@/components/ui/faqs-3-utils/faqs-data";

const LISTING_TRACKS = [
  {
    badge: "TRACK 01 · SME PLATFORMS",
    accent: "#FB771B",
    title: "SME IPO Advisory (BSE SME & NSE Emerge)",
    description:
      "Structured end-to-end preparation for profitable, scaling enterprises transitioning from private ownership to public SME exchanges.",
    highlights: [
      "Eligibility, net-worth & track-record diagnostic",
      "3-year financial restatement & accounting policy alignment",
      "Secretarial audit, board reconstitution & KMP onboarding",
      "Coordination with Merchant Bankers, Peer-Review Auditors & Legal Counsel",
    ],
  },
  {
    badge: "TRACK 02 · MAINBOARD & PRE-IPO",
    accent: "#2E89F1",
    title: "Mainboard IPO & Pre-IPO Readiness",
    description:
      "Multi-quarter governance, reporting, and capital-structure maturation for mid-market companies preparing for mainboard filings or institutional pre-IPO rounds.",
    highlights: [
      "Multi-year governance, internal controls & MIS upgrade",
      "Pre-IPO / PE / VC institutional round readiness",
      "DRHP financial disclosures, KPI definitions & peer benchmarking",
      "Ongoing post-listing compliance & investor reporting rhythm",
    ],
  },
];

const IPO_FAQ_HEADER = {
  eyebrow: "IPO Advisory FAQs",
  title: "Clear answers before you start your listing journey.",
  description:
    "Practical guidance on eligibility, timelines, costs, and how KinFin works alongside Merchant Bankers.",
};

const IPO_FAQS: FaqItem[] = [
  {
    id: "sme-ipo-eligibility",
    title: "How do I know if my company is ready for an SME IPO?",
    content:
      "Beyond exchange thresholds on post-issue paid-up capital, net worth, and operating profit track record, true readiness comes down to clean 3-year financials, resolved tax or ROC matters, transparent related-party dealings, and governance maturity. We begin with a diagnostic review to verify both formal eligibility and practical readiness.",
  },
  {
    id: "sme-ipo-timeline",
    title: "How long does an SME IPO typically take from start to listing?",
    content:
      "For a company with reasonably clean books, the end-to-end journey typically spans around 6 to 9 months—covering financial restatement, board and secretarial restructuring, due diligence, DRHP filing, exchange review, and issue marketing. Starting cleanup early prevents last-minute delays during diligence.",
  },
  {
    id: "ipo-cost-structure",
    title: "What are the major cost components of going public?",
    content:
      "Total IPO expenses include intermediary fees (Merchant Banker, Legal Counsel, Peer-Review Auditor, Registrar, Market Maker), exchange and regulatory filing fees, marketing/roadshow costs, and advisory fees. We map expected outlays upfront and align commercials transparently before engagement.",
  },
  {
    id: "kinfin-vs-merchant-banker",
    title: "How does KinFin work alongside SEBI-registered Merchant Bankers?",
    content:
      "Merchant Bankers lead statutory issue management and regulatory filings, while KinFin acts as the company's internal preparation and execution backbone—bringing CFO, CA, and CS bandwidth under one roof to restate books, organize diligence, tighten governance, and keep every workstream moving on schedule.",
  },
  {
    id: "regulatory-and-subscription-expectations",
    title: "Are exchange approval and IPO subscription guaranteed?",
    content:
      "No advisor can guarantee regulatory clearance, valuation multiples, or market subscription—those depend on exchange/SEBI scrutiny, business fundamentals, and market conditions at launch. Our role is to make sure your numbers, disclosures, and governance withstand rigorous institutional review.",
  },
];

export default function IpoAdvisoryPage() {
  return (
    <div className="relative flex flex-1 flex-col font-sans">
      {/* Section 1: Editorial Hero */}
      <section
        aria-labelledby="ipo-hero-heading"
        className="flex min-h-[calc(100vh-5.25rem)] w-full flex-col justify-center border-b border-black/10 px-6 py-24 sm:px-10 sm:py-32"
      >
        <div className="mx-auto w-full max-w-6xl">
          <div className="max-w-3xl">
            <h1
              id="ipo-hero-heading"
              className="text-4xl font-semibold tracking-[-0.03em] text-[#121212] sm:text-6xl sm:leading-[1.06]"
            >
              From private scale to public-market readiness.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#666666] sm:text-[17px]">
              End-to-end IPO preparation, financial restatement, governance
              structuring, and multi-advisor diligence—combining CFO, CA, and CS
              execution under one roof for SME and Mainboard aspirants.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-lg bg-[#121212] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#000000]"
              >
                <span>Request an IPO readiness review</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#listing-tracks"
                className="inline-flex items-center justify-center rounded-lg border border-black/12 bg-white px-4 py-2.5 text-sm font-medium text-[#121212] transition-colors hover:border-black/25 hover:text-[#000000]"
              >
                Compare SME & Mainboard tracks
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Listing Tracks Comparison */}
      <section
        id="listing-tracks"
        aria-labelledby="listing-tracks-heading"
        className="w-full border-b border-black/10 px-6 py-20 sm:px-10 sm:py-28"
      >
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <h2
              id="listing-tracks-heading"
              className="text-3xl font-medium tracking-[-0.03em] text-[#121212] sm:text-4xl sm:leading-[1.15]"
            >
              Structured support for SME listings and Mainboard preparation.
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {LISTING_TRACKS.map((track) => (
              <div
                key={track.title}
                className="flex flex-col justify-between rounded-xl border border-black/10 bg-white p-7 sm:p-8"
              >
                <div>
                  <div className="inline-flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: track.accent }}
                    />
                    <span className="text-[11px] font-semibold tracking-[0.12em] text-[#737373] uppercase">
                      {track.badge}
                    </span>
                  </div>

                  <h3 className="mt-3.5 text-xl font-medium tracking-[-0.02em] text-[#121212] sm:text-2xl">
                    {track.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-[#666666]">
                    {track.description}
                  </p>

                  <ul className="mt-6 space-y-2.5 border-t border-black/10 pt-5">
                    {track.highlights.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2.5 text-sm text-[#121212]"
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#121212]" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: IPO Advisory FAQs */}
      <FaqsCenteredSection
        id="ipo-advisory-faqs"
        header={IPO_FAQ_HEADER}
        items={IPO_FAQS}
      />

      {/* Section 4: Bottom CTA */}
      <section
        aria-labelledby="ipo-cta-heading"
        className="w-full px-6 py-20 sm:px-10 sm:py-24"
      >
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 rounded-xl border border-black/10 bg-[#F7F7F7] p-8 sm:flex-row sm:items-center sm:p-10">
          <div className="max-w-xl">
            <span className="text-[11px] font-semibold tracking-[0.12em] text-[#737373] uppercase">
              IPO Readiness Desk
            </span>
            <h2
              id="ipo-cta-heading"
              className="mt-2 text-2xl font-medium tracking-[-0.03em] text-[#121212] sm:text-3xl"
            >
              Assess your listing readiness before committing to a timeline.
            </h2>
            <p className="mt-2.5 text-sm leading-relaxed text-[#666666]">
              Book a confidential diagnostic conversation with our CFO, CA, and
              CS team to map gaps, restatement needs, and realistic milestones.
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