"use client";

import React, { useEffect, useRef, useState } from "react";
import { LazyMotion, domAnimation, m } from "motion/react";
import { cn } from "@/lib/utils";

export const KINFIN_WORD_CYCLE = ["#3AD23F", "#2E89F1", "#FB771B"] as const;

export interface TextLoopProps {
  rotatingTexts?: string[];
  className?: string;
  typingSpeed?: number;
  holdDuration?: number;
  eraseSpeed?: number;
  pauseBetweenWords?: number;
  rotatingTextClassName?: string;
  colorCycle?: readonly string[];
  inline?: boolean;
  onWordChange?: (payload: {
    step: number;
    wordIndex: number;
    word: string;
    color: string;
  }) => void;
}

export default function TextLoop({
  rotatingTexts = ["compliance", "cashflow", "IPO", "capital", "growth"],
  className,
  typingSpeed = 140,
  holdDuration = 2400,
  eraseSpeed = 85,
  pauseBetweenWords = 450,
  rotatingTextClassName,
  colorCycle = KINFIN_WORD_CYCLE,
  inline = false,
  onWordChange,
}: TextLoopProps) {
  const [step, setStep] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [phase, setPhase] = useState<"typing" | "holding" | "erasing" | "pausing">(
    "typing",
  );

  const onWordChangeRef = useRef(onWordChange);
  onWordChangeRef.current = onWordChange;

  const wordIndex = rotatingTexts.length > 0 ? step % rotatingTexts.length : 0;
  const currentWord = rotatingTexts[wordIndex] ?? "";
  const activeColor =
    colorCycle.length > 0
      ? colorCycle[step % colorCycle.length] ?? "#3AD23F"
      : "#3AD23F";

  useEffect(() => {
    onWordChangeRef.current?.({
      step,
      wordIndex,
      word: currentWord,
      color: activeColor,
    });
  }, [step, wordIndex, currentWord, activeColor]);

  useEffect(() => {
    if (!currentWord) return;

    let timer: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (charCount < currentWord.length) {
        timer = setTimeout(() => {
          setCharCount((c) => c + 1);
        }, typingSpeed);
      } else {
        timer = setTimeout(() => {
          setPhase("holding");
        }, holdDuration);
      }
    } else if (phase === "holding") {
      timer = setTimeout(() => {
        setPhase("erasing");
      }, 200);
    } else if (phase === "erasing") {
      if (charCount > 0) {
        timer = setTimeout(() => {
          setCharCount((c) => c - 1);
        }, eraseSpeed);
      } else {
        timer = setTimeout(() => {
          setPhase("pausing");
        }, pauseBetweenWords);
      }
    } else if (phase === "pausing") {
      setStep((s) => s + 1);
      setCharCount(0);
      setPhase("typing");
    }

    return () => clearTimeout(timer);
  }, [
    phase,
    charCount,
    currentWord,
    typingSpeed,
    holdDuration,
    eraseSpeed,
    pauseBetweenWords,
  ]);

  const visibleText = currentWord.slice(0, charCount);

  return (
    <LazyMotion features={domAnimation}>
      <span
        className={cn(
          inline
            ? "inline-flex items-baseline align-baseline"
            : "flex flex-row items-center justify-start w-fit text-4xl md:text-7xl font-medium tracking-tight",
          className,
        )}
      >
        <m.span
          key={`word-color-${step}`}
          initial={{ opacity: 0.35 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className={cn("inline-block whitespace-nowrap", rotatingTextClassName)}
          style={{ color: activeColor }}
        >
          {visibleText}
        </m.span>
      </span>
    </LazyMotion>
  );
}