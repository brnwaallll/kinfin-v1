"use client";

const metrics = [
  "98% IPO Success Rate",
  "150+ Businesses Advised",
  "40+ Bank & NBFC Partners",
  "₹500+ Cr Capital Facilitated",
];

export default function LogoCloudBlock() {
  return (
    <section
      aria-label="Key financial milestones"
      className="w-full border-y border-black/8 bg-[#FAFAFA] py-3 text-[#121212]"
    >
      <style>{`
        @keyframes logo-cloud-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .logo-cloud-track {
          animation: logo-cloud-marquee 42s linear infinite;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .logo-cloud-track {
            animation: logo-cloud-marquee 42s linear infinite;
          }
        }
      `}</style>

      <div className="logo-cloud-mask relative mx-auto w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="logo-cloud-track flex w-max items-center">
          {[...metrics, ...metrics, ...metrics].map((item, index) => (
            <div
              key={`${item}-${index}`}
              style={{ fontWeight: 500 }}
              className="flex shrink-0 items-center whitespace-nowrap text-[13px] font-medium tracking-[-0.01em] text-[#121212] sm:text-sm"
              aria-hidden={index >= metrics.length ? "true" : undefined}
            >
              <span className="px-6 sm:px-8">{item}</span>
              <span
                aria-hidden="true"
                className="text-black/30 select-none"
              >
                •
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}