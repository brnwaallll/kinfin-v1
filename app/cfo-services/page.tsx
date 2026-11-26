"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  FileSpreadsheet,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { ProgressiveBlur } from "@/components/ui/progressiveblur";
import FaqsCenteredSection from "@/components/ui/faqs-3";
import type { FaqItem } from "@/components/ui/faqs-3-utils/faqs-data";

const CFO_HIGHLIGHTS = [
  {
    title: "Board-ready MIS",
    description:
      "Monthly financial packs, margin bridges, and KPIs ready for leadership and investors.",
    Icon: BarChart3,
  },
  {
    title: "Cash & runway control",
    description:
      "Rolling liquidity forecasts and working capital tracking before tight spots build up.",
    Icon: Wallet,
  },
  {
    title: "Lender-grade models",
    description:
      "Defensible projections, DSCR views, and schedules built for credit and diligence reviews.",
    Icon: FileSpreadsheet,
  },
  {
    title: "CA & CS alignment",
    description:
      "Tight coordination with your tax, audit, and compliance teams under one operating rhythm.",
    Icon: ShieldCheck,
  },
];

const PROCESS_STEPS = [
  {
    id: "diagnostic-review",
    step: "STEP 01",
    accent: "#2E89F1",
    title: "Diagnostic Review",
    description:
      "We examine your current books, cash conversion cycle, compliance posture, and reporting gaps to surface immediate blind spots.",
  },
  {
    id: "engagement-blueprint",
    step: "STEP 02",
    accent: "#3AD23F",
    title: "Engagement Blueprint",
    description:
      "We define a clear monthly scope, reporting calendar, and ownership split across CFO strategy and CA/CS execution—tailored to your stage.",
  },
  {
    id: "embedded-advisory",
    step: "STEP 03",
    accent: "#FB771B",
    title: "Embedded Advisory",
    description:
      "Your CFO desk joins leadership reviews, challenges assumptions, and drives monthly discipline alongside your internal team.",
  },
  {
    id: "scale-and-review",
    step: "STEP 04",
    accent: "#2E89F1",
    title: "Scale & Review",
    description:
      "Each quarter we measure progress against your financial roadmap, recalibrate forecasts, and adapt scope as the business grows.",
  },
];

const CFO_FAQ_HEADER = {
  eyebrow: "CFO FAQs",
  title: "Answers on scope, cadence, and fit.",
  description:
    "Specific to how KinFin's CFO and Virtual CFO engagements run day to day.",
};

const CFO_FAQS: FaqItem[] = [
  {
    id: "cfo-vs-bookkeeper-ca",
    title:
      "How is KinFin's CFO service different from hiring a bookkeeper or CA?",
    content:
      "Bookkeeping and routine filings record what already happened; CFO advisory focuses on what happens next—cash forecasting, margin drivers, budgets, board reporting, and capital planning. Because KinFin brings CFOs, CAs, and CSs under one roof, your strategy and compliance stay connected.",
  },
  {
    id: "virtual-interim-outsourced-fit",
    title: "Should we choose Virtual, Interim, or Outsourced CFO support?",
    content:
      "Virtual CFO fits growing teams that need ongoing senior oversight and monthly MIS without a full-time executive hire. Interim or Outsourced CFO engagements work well during leadership transitions, rapid expansion, restructuring, or intensive fundraising and diligence prep.",
  },
  {
    id: "monthly-operating-cadence",
    title: "What does a typical monthly cadence look like once we onboard?",
    content:
      "After initial cleanup and baseline setup, most clients follow a steady monthly rhythm: closing books early, reviewing updated cash forecasts and variance reports, holding a leadership operating review, and tracking action items into the next cycle.",
  },
  {
    id: "internal-team-auditor-coordination",
    title:
      "Can you work alongside our existing accounts team or statutory auditors?",
    content:
      "Yes. We regularly partner with in-house accountants, external CAs, and Company Secretaries to clarify roles, tighten close timelines, standardize schedules, and keep audit or diligence requests organized.",
  },
  {
    id: "fundraising-debt-diligence",
    title: "How do you help with fundraising, debt, or due diligence?",
    content:
      "We help build clear financial models, organize historical records, anticipate diligence questions, and prepare management narratives for banks or investors. Our role is to sharpen preparation and financial rigor rather than guarantee funding outcomes.",
  },
];

export default function CfoServicesPage() {
  const [activeStepId, setActiveStepId] = React.useState<string>(
    PROCESS_STEPS[0].id
  );
  const stepRefs = React.useRef<Record<string, HTMLDivElement | null>>({});

  React.useEffect(() => {
    const updateActiveStep = () => {
      const triggerY = window.innerHeight * 0.36;
      let currentId = PROCESS_STEPS[0].id;

      for (const item of PROCESS_STEPS) {
        const el = stepRefs.current[item.id];
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= triggerY) {
          currentId = item.id;
        }
      }

      setActiveStepId(currentId);
    };

    updateActiveStep();
    window.addEventListener("scroll", updateActiveStep, { passive: true });
    window.addEventListener("resize", updateActiveStep);

    return () => {
      window.removeEventListener("scroll", updateActiveStep);
      window.removeEventListener("resize", updateActiveStep);
    };
  }, []);

  return (
    <div className="relative flex flex-1 flex-col font-sans">
      {/* Section 1: CFO Hero */}
      <section
        aria-labelledby="cfo-hero-heading"
        className="flex min-h-[calc(100vh-5.25rem)] w-full flex-col justify-center border-b border-black/10 px-6 py-24 sm:px-10 sm:py-32"
      >
        <div className="mx-auto w-full max-w-6xl">
          <div className="max-w-3xl">
            <h1
              id="cfo-hero-heading"
              className="text-4xl font-semibold tracking-[-0.03em] text-[#121212] sm:text-6xl sm:leading-[1.06]"
            >
              Senior financial leadership, without the full-time cost.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#666666] sm:text-[17px]">
              Virtual, interim, and outsourced CFO support for growing
              businesses—bringing cash flow control, board-grade MIS,
              budgeting, and governance together with CA and CS coordination
              under one roof.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-lg bg-[#121212] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#000000]"
              >
                <span>Discuss your CFO scope</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: 4-Column Feature Row */}
      <section
        id="cfo-highlights"
        aria-label="CFO operating pillars"
        className="w-full border-b border-black/10 px-6 py-20 sm:px-10 sm:py-24"
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {CFO_HIGHLIGHTS.map(({ title, description, Icon }) => (
              <div key={title}>
                <div className="flex items-center gap-2.5 text-[#121212]">
                  <Icon className="h-4 w-4 shrink-0" />
                  <h2 className="text-base font-medium tracking-[-0.02em]">
                    {title}
                  </h2>
                </div>
                <p className="mt-2.5 text-sm leading-relaxed text-[#666666]">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Sticky Left Rail + Scrolling Right Step Blocks */}
      <section
        id="process"
        aria-labelledby="process-heading"
        className="w-full border-b border-black/10 pt-20 sm:pt-28"
      >
        <div className="mx-auto max-w-6xl px-6 sm:px-10">
          <div className="max-w-xl pb-14">
            <h2
              id="process-heading"
              className="text-3xl font-medium tracking-[-0.03em] text-[#121212] sm:text-4xl sm:leading-[1.15]"
            >
              <span className="block">Four steps from ground truth,</span>
              <span className="block text-[#737373]">
                to steady financial command.
              </span>
            </h2>
          </div>
        </div>

        <div className="w-full border-t border-black/10">
          <div className="mx-auto grid max-w-6xl grid-cols-1 px-6 sm:px-10 lg:grid-cols-12">
            {/* Left Sticky Rail */}
            <aside className="border-b border-black/10 py-6 lg:col-span-4 lg:border-r lg:border-b-0 lg:py-12 lg:pr-8">
              <nav
                aria-label="CFO operating steps"
                className="flex flex-wrap gap-4 lg:sticky lg:top-28 lg:flex-col lg:gap-3"
              >
                {PROCESS_STEPS.map((item) => {
                  const isActive = activeStepId === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`group relative flex items-center gap-3 pl-3.5 text-sm transition-colors hover:text-[#000000] lg:text-[15px] ${
                        isActive
                          ? "font-medium text-[#121212]"
                          : "font-normal text-[#A3A3A3]"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className="h-3.5 w-[2px] shrink-0 rounded-full transition-colors"
                        style={{
                          backgroundColor: isActive
                            ? item.accent
                            : "transparent",
                        }}
                      />
                      <span>{item.title}</span>
                    </a>
                  );
                })}
              </nav>
            </aside>

            {/* Right Continuous Step Blocks */}
            <div className="divide-y divide-black/10 lg:col-span-8 lg:pl-12">
              {PROCESS_STEPS.map((item) => {
                const isActive = activeStepId === item.id;
                return (
                  <div
                    key={item.id}
                    id={item.id}
                    ref={(el) => {
                      stepRefs.current[item.id] = el;
                    }}
                    className={`scroll-mt-28 py-9 transition-colors first:pt-12 last:pb-12 sm:py-11 ${
                      isActive ? "opacity-100" : "opacity-85"
                    }`}
                  >
                    <div className="inline-flex items-center gap-2">
                      <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: item.accent }}
                      />
                      <span className="text-[11px] font-semibold tracking-[0.12em] text-[#737373] uppercase">
                        {item.step}
                      </span>
                    </div>

                    <h3 className="mt-3 text-xl font-medium tracking-[-0.02em] text-[#121212] sm:text-2xl">
                      {item.title}
                    </h3>

                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#666666] sm:text-[15px]">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: CFO Services FAQs */}
      <FaqsCenteredSection
        id="cfo-faqs"
        header={CFO_FAQ_HEADER}
        items={CFO_FAQS}
      />

      {/* Section 5: Bottom CTA */}
      <section
        aria-labelledby="cfo-cta-heading"
        className="w-full px-6 py-20 sm:px-10 sm:py-24"
      >
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 rounded-xl border border-black/10 bg-[#F7F7F7] p-8 sm:flex-row sm:items-center sm:p-10">
          <div className="max-w-xl">
            <span className="text-[11px] font-semibold tracking-[0.12em] text-[#737373] uppercase">
              Next Step
            </span>
            <h2
              id="cfo-cta-heading"
              className="mt-2 text-2xl font-medium tracking-[-0.03em] text-[#121212] sm:text-3xl"
            >
              Build a stronger financial foundation.
            </h2>
            <p className="mt-2.5 text-sm leading-relaxed text-[#666666]">
              Share where your business stands today and we'll outline a
              practical CFO scope around your priorities.
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