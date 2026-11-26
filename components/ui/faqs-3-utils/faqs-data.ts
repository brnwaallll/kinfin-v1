export interface FaqItem {
  id: string;
  title: string;
  content: string;
}

export const faqCenteredHeader = {
  eyebrow: "FAQs",
  title: "Common questions before we begin.",
  description:
    "Everything you need to know about how KinFin works alongside your business from day one.",
};

export const faqItems: FaqItem[] = [
  {
    id: "under-one-roof",
    title: "What does KinFin actually do under one roof?",
    content:
      "KinFin brings CFO leadership, Chartered Accountants, Company Secretaries, and capital advisory together in one place so growing businesses don't have to coordinate fragmented vendors across cashflow, compliance, and fundraising.",
  },
  {
    id: "three-step-progression",
    title: "How does the three-step progression work as we grow?",
    content:
      "You start with foundational clarity and compliance controls, move into ongoing CFO/CA/CS execution as operations scale, and tap into capital-raise and IPO readiness support when preparing for institutional funding or public markets.",
  },
  {
    id: "who-its-built-for",
    title: "Who is KinFin built for—early startups, SMEs, or larger corporates?",
    content:
      "It is built for ambitious businesses across stages—from startups and MSMEs to growth-stage companies and corporates—that want senior financial discipline without the cost or distance of a rigid, impersonal corporate firm.",
  },
  {
    id: "clarity-in-the-family",
    title: 'What does "Clarity runs in the family" mean in how you work?',
    content:
      '"Kin" reflects a partnership model rooted in trust, plain-spoken guidance, and long-term continuity—acting like a dependable, embedded part of your leadership team rather than a transactional consultant.',
  },
  {
    id: "getting-started",
    title: "How do we get started from the homepage?",
    content:
      'Drop your work email or reach out via "Talk to us" to start with a quick conversation around your business priorities, define a tailored scope, and set up structured support.',
  },
];