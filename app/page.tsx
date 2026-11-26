"use client";

import * as React from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import TextLoop, { KINFIN_WORD_CYCLE } from "@/components/text-loop";
import { BackgroundBeams } from "@/components/ui/background-beams";
import LogoCloudBlock from "@/components/blocks/logo-cloud-3";
import { ProgressiveBlur } from "@/components/ui/progressiveblur";
import TechText from "@/components/TechText";
import FaqsCenteredSection from "@/components/ui/faqs-3";

const HERO_ROTATING_WORDS = [
  "compliance",
  "cashflow",
  "IPO",
  "capital",
  "growth",
];

const WORKFLOW_STEPS = [
  {
    step: "STEP 01",
    dotColor: "#2E89F1",
    hoverGradient:
      "linear-gradient(115deg, rgba(58, 210, 63, 0.24) 0%, rgba(58, 210, 63, 0.14) 55%, rgba(46, 137, 241, 0.16) 100%)",
    title: "Financial Clarity & Control",
    description:
      "We audit your historical books, uncover hidden margin leaks, and close every statutory compliance gap—giving you real-time visibility into cash flow, burn rate, and unit economics from day one.",
  },
  {
    step: "STEP 02",
    dotColor: "#3AD23F",
    hoverGradient:
      "linear-gradient(115deg, rgba(58, 210, 63, 0.10) 0%, rgba(46, 137, 241, 0.22) 55%, rgba(46, 137, 241, 0.14) 100%)",
    title: "Dedicated CFO, CA & CS Desk",
    description:
      "Your embedded finance team takes full ownership of monthly MIS, tax filings, and working capital—keeping you free from daily accounting chaos so you can stay focused on scaling your business.",
  },
  {
    step: "STEP 03",
    dotColor: "#FB771B",
    hoverGradient:
      "linear-gradient(115deg, rgba(46, 137, 241, 0.12) 0%, rgba(251, 119, 27, 0.18) 45%, rgba(251, 119, 27, 0.28) 100%)",
    title: "Capital Raise & IPO Readiness",
    description:
      "Whether raising institutional debt, closing an equity round, or drafting your DRHP, we prepare your balance sheet and governance to pass investor scrutiny and list with complete confidence.",
  },
];

const DIAGONAL_LINE_PATTERN =
  "repeating-linear-gradient(-60deg, rgba(255, 255, 255, 0.45) 0px, rgba(255, 255, 255, 0.45) 1px, rgba(18, 18, 18, 0.035) 1px, rgba(18, 18, 18, 0.035) 2px, transparent 2px, transparent 7px)";

export default function HomePage() {
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const [techFontSize, setTechFontSize] = React.useState(150);
  const [activeState, setActiveState] = React.useState<{
    step: number;
    color: string;
  }>({
    step: 0,
    color: KINFIN_WORD_CYCLE[0],
  });

  React.useEffect(() => {
    function updateSize() {
      if (window.innerWidth < 640) {
        setTechFontSize(52);
      } else if (window.innerWidth < 1024) {
        setTechFontSize(96);
      } else {
        setTechFontSize(150);
      }
    }
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const handleWordChange = React.useCallback(
    ({ step, color }: { step: number; color: string }) => {
      setActiveState({ step, color });
    },
    [],
  );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail("");
  }

  return (
    <div className="relative flex flex-1 flex-col font-sans">
      {/* Section 1: Hero + Marquee */}
      <div className="relative flex min-h-[calc(100vh-5.25rem)] w-full flex-col justify-between pb-0">
        <div className="relative flex w-full flex-1 flex-col justify-center py-10 sm:py-14">
          <BackgroundBeams activeColor={activeState.color} />

          <main className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center justify-center px-6 text-center">
            {/* Unfilled Pill with Synced Slow Fade-In / Fade-Out Dot */}
            <div className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-[#FAFAFA]/85 px-4 py-1.5 backdrop-blur-[2px]">
              <motion.span
                key={`beacon-${activeState.step}`}
                aria-hidden="true"
                className="h-2 w-2 rounded-full"
                initial={{ opacity: 0.1, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0.1, scale: 0.8 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                style={{
                  backgroundColor: activeState.color,
                  boxShadow: `0 0 9px ${activeState.color}99`,
                }}
              />
              <span className="text-[11px] font-semibold tracking-[0.08em] text-[#121212] uppercase">
                Zero Missed Filings
              </span>
            </div>

            {/* Headline */}
            <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-[-0.03em] text-[#121212] sm:text-6xl sm:leading-[1.08]">
              <span className="block">
                <span>Your </span>
                <TextLoop
                  inline
                  rotatingTexts={HERO_ROTATING_WORDS}
                  typingSpeed={140}
                  holdDuration={2400}
                  eraseSpeed={85}
                  pauseBetweenWords={450}
                  rotatingTextClassName="font-semibold tracking-[-0.03em]"
                  onWordChange={handleWordChange}
                />
                <span>,</span>
              </span>
              <span className="block">our financial kinship.</span>
            </h1>

            {/* Subcopy */}
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#666666] sm:text-[17px]">
              Dedicated CFOs, CAs, and CSs handling your cashflow, compliance,
              and capital under one roof.
            </p>

            {/* Email Capture Form */}
            <form
              onSubmit={handleSubmit}
              className="mt-8 flex w-full max-w-md items-center justify-between gap-2 rounded-xl border border-black/10 bg-white p-1.5 pl-4 focus-within:border-black/25"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (submitted) setSubmitted(false);
                }}
                placeholder="What's your work email?"
                aria-label="What's your work email?"
                className="w-full min-w-0 bg-transparent text-sm text-[#121212] placeholder:text-[#8E8E8E] focus:outline-none"
              />
              <button
                type="submit"
                className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg bg-[#121212] px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#000000]"
              >
                <span>{submitted ? "Sent" : "Get Started"}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </form>

            {submitted && (
              <p className="mt-3 text-xs font-medium text-[#2E89F1]">
                We've noted your work email and will reach out shortly.
              </p>
            )}
          </main>
        </div>

        <div className="w-full [&_span]:font-medium! [&_p]:font-medium!">
          <LogoCloudBlock />
        </div>
      </div>

      {/* Section 2: Philosophy Statement */}
      <section
        aria-label="KinFin philosophy"
        className="w-full border-b border-black/10 px-6 py-20 text-center sm:py-24"
      >
        <div className="mx-auto max-w-3xl">
          <p className="text-lg leading-[1.45] font-medium tracking-[-0.02em] text-[#737373] sm:text-2xl sm:leading-[1.4]">
            <span className="font-medium text-[#121212]">
              Financial discipline built on lasting kinship.
            </span>{" "}
            One embedded team of senior CFOs, CAs, and CSs working alongside your
            leadership—owning your daily cash flow, governance, and IPO readiness
            under one roof.
          </p>
        </div>
      </section>

      {/* Section 3: Workflow */}
      <section
        id="workflow"
        aria-label="How KinFin works"
        className="w-full border-b border-black/10"
      >
        <div className="grid w-full grid-cols-1 divide-y divide-black/10 md:grid-cols-3 md:divide-x md:divide-y-0">
          {WORKFLOW_STEPS.map((item) => (
            <div
              key={item.step}
              className="group relative flex min-h-[560px] flex-col justify-end overflow-hidden bg-transparent px-8 pt-28 pb-12 sm:min-h-[680px] sm:px-10 sm:pb-14"
            >
              {/* Hover-only gradient wash */}
              <div
                aria-hidden="true"
                style={{ background: item.hoverGradient }}
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
              />

              {/* Hover-only diagonal line texture */}
              <div
                aria-hidden="true"
                style={{ backgroundImage: DIAGONAL_LINE_PATTERN }}
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
              />

              {/* Bottom-anchored content */}
              <div className="relative z-10 flex flex-col">
                <div className="inline-flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: item.dotColor }}
                  />
                  <span className="text-[11px] font-semibold tracking-[0.12em] text-[#737373] uppercase">
                    {item.step}
                  </span>
                </div>

                <h3 className="mt-5 text-[19px] font-medium tracking-[-0.02em] text-[#121212] sm:text-[20px] md:whitespace-nowrap">
                  {item.title}
                </h3>

                <p className="mt-3 max-w-[42ch] text-[13.5px] leading-[1.55] font-normal text-[#666666] sm:text-[14px]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Tagline Section */}
      <section
        aria-label="KinFin tagline"
        className="w-full border-b border-black/10 px-4 sm:px-8"
      >
        <div className="relative mx-auto flex h-[320px] w-full max-w-6xl items-center justify-center overflow-hidden sm:h-[480px]">
          <TechText
            text="Clarity runs in the family."
            fontWeight={500}
            fontSize={techFontSize}
            reveal="letter"
            dashLength={4}
            dashGap={2}
            specks={15}
            intro="none"
            introDuration={2}
            loop
            loopDuration={18}
            speed={0.35}
            clickKick
            guides={false}
            style={{}}
          />
        </div>
      </section>

      {/* Section 5: FAQs */}
      <FaqsCenteredSection />

      <ProgressiveBlur
        position="bottom"
        height="6rem"
        blurLevels={[0.5, 1, 2, 4, 8, 12, 18, 24]}
        className="fixed! inset-x-0! bottom-0! z-40!"
      />
    </div>
  );
}