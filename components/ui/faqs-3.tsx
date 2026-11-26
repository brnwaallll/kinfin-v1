"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  motionStagger,
  motionViewport,
} from "@/components/ui/faqs-3-utils/motion-tokens";
import {
  faqCenteredHeader,
  faqItems,
  type FaqItem,
} from "@/components/ui/faqs-3-utils/faqs-data";
import { SectionShell } from "@/components/ui/faqs-3-utils/layout-contract";

export interface FaqsCenteredHeader {
  eyebrow: string;
  title: string;
  description: string;
}

export interface FaqsCenteredSectionProps {
  id?: string;
  header?: FaqsCenteredHeader;
  items?: FaqItem[];
}

const spring = { type: "spring" as const, duration: 0.3, bounce: 0 };

export function FaqsCenteredSection({
  id = "faqs",
  header = faqCenteredHeader,
  items = faqItems,
}: FaqsCenteredSectionProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, motionViewport);

  const itemVariants = reduceMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, filter: "blur(4px)", y: 8 },
        visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: spring },
      };

  return (
    <SectionShell id={id} spacingMode="section" ref={ref}>
      <motion.div
        animate={inView ? "visible" : "hidden"}
        className="mx-auto w-full max-w-2xl text-center"
        initial="hidden"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: motionStagger.item,
              delayChildren: 0.04,
            },
          },
        }}
      >
        <motion.p
          className="font-medium text-primary text-xs uppercase tracking-[0.22em]"
          variants={itemVariants}
        >
          {header.eyebrow}
        </motion.p>
        <motion.h2
          className="mt-3 text-balance font-medium text-2xl tracking-tight md:text-4xl"
          variants={itemVariants}
        >
          {header.title}
        </motion.h2>
        <motion.p
          className="mx-auto mt-4 max-w-lg text-pretty text-muted-foreground text-sm md:text-base"
          variants={itemVariants}
        >
          {header.description}
        </motion.p>
      </motion.div>

      <motion.div
        animate={inView ? "visible" : "hidden"}
        className="mx-auto mt-10 w-full max-w-2xl"
        initial="hidden"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: motionStagger.item,
              delayChildren: 0.1,
            },
          },
        }}
      >
        <Accordion className="text-left">
          {items.map((item) => (
            <motion.div key={item.id} variants={itemVariants}>
              <AccordionItem value={item.id}>
                <AccordionTrigger className="py-4 hover:no-underline">
                  {item.title}
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-muted-foreground text-sm leading-relaxed">
                  {item.content}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </motion.div>
    </SectionShell>
  );
}

export default FaqsCenteredSection;