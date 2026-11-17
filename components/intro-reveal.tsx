"use client";

import { useEffect, useRef, useState } from "react";

const FADE_MS = 1000;
const HOLD_MS = 3750;

const LOGO_MASK = {
  maskImage: "url(/KFVector.svg)",
  WebkitMaskImage: "url(/KFVector.svg)",
  maskSize: "contain",
  WebkitMaskSize: "contain",
  maskPosition: "center",
  WebkitMaskPosition: "center",
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
} as const;

export default function IntroReveal() {
  const [fading, setFading] = useState(false);
  const [done, setDone] = useState(false);
  const fadingRef = useRef(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      fadingRef.current = true;
      setFading(true);
    }, HOLD_MS);
    const doneTimer = setTimeout(() => setDone(true), HOLD_MS + FADE_MS + 100);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (done) return null;

  return (
    <div
      aria-hidden={fading}
      onTransitionEnd={(e) => {
        if (fadingRef.current && e.propertyName === "opacity") setDone(true);
      }}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-1000 ease-out ${
        fading ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="kf-intro-logo relative isolate h-44 w-44">
        {/* eslint-disable-next-line @next/next/no-img-element -- exact markup requested for the intro logo */}
        <img
          src="/KFVector.svg"
          alt="KinFin Capital"
          className="h-44 w-44 object-contain"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.5),transparent_50%)] mix-blend-screen motion-reduce:hidden"
          style={LOGO_MASK}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 animate-[kf-shimmer_2.4s_ease-in-out_infinite] bg-[linear-gradient(115deg,transparent_30%,rgba(255,255,255,0.95)_50%,transparent_70%)] bg-[length:250%_250%] mix-blend-screen motion-reduce:animate-none"
          style={LOGO_MASK}
        />
      </div>
    </div>
  );
}
