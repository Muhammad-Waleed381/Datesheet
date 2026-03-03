"use client";

import { useEffect, useRef } from "react";
import { animate } from "framer-motion";

interface FlipUnitProps {
  value: number;
  label: string;
  accentColor: string;
}

export default function FlipUnit({ value, label, accentColor }: FlipUnitProps) {
  const displayRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLDivElement>(null);
  const prevValue = useRef(value);

  useEffect(() => {
    if (prevValue.current === value) return;

    const el = displayRef.current;
    const prevEl = prevRef.current;
    if (!el || !prevEl) return;

    // Set previous value visually
    prevEl.textContent = String(prevValue.current).padStart(2, "0");
    prevValue.current = value;
    el.textContent = String(value).padStart(2, "0");

    // Flip animation: top half falls down, new value rises up
    animate(prevEl, { y: [0, 20], opacity: [1, 0] }, { duration: 0.25, ease: "easeIn" });
    animate(el, { y: [-20, 0], opacity: [0, 1] }, { duration: 0.25, ease: "easeOut" });
  }, [value]);

  const padded = String(value).padStart(2, "0");

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative w-14 h-16 flex items-center justify-center">
        {/* Card background */}
        <div
          className="absolute inset-0 rounded-lg"
          style={{
            background: "rgba(15, 23, 42, 0.8)",
            border: "1px solid rgba(255,255,255,0.07)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
          }}
        />
        {/* Horizontal divider line (flip clock style) */}
        <div
          className="absolute left-0 right-0 top-1/2 -translate-y-px h-px z-10"
          style={{ background: "rgba(0,0,0,0.5)" }}
        />
        {/* Previous value (animates out) */}
        <div
          ref={prevRef}
          className="absolute inset-0 flex items-center justify-center text-3xl font-mono font-bold z-20 pointer-events-none"
          style={{ color: "transparent" }}
        >
          {padded}
        </div>
        {/* Current value */}
        <div
          ref={displayRef}
          className="relative flex items-center justify-center text-3xl font-mono font-bold z-30"
          style={{ color: "inherit" }}
        >
          {padded}
        </div>
      </div>
      <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-500">
        {label}
      </span>
    </div>
  );
}
