"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { exams } from "@/data/exams";

function getNextExam() {
  const now = Date.now();
  return exams
    .map((e) => ({ ...e, ms: new Date(e.datetime).getTime() - now }))
    .filter((e) => e.ms > 0)
    .sort((a, b) => a.ms - b.ms)[0] ?? null;
}

export default function NextExamBanner() {
  const [next, setNext] = useState(() => getNextExam());

  useEffect(() => {
    const id = setInterval(() => setNext(getNextExam()), 30000);
    return () => clearInterval(id);
  }, []);

  if (!next) return null;

  const days = Math.floor(next.ms / 86400000);
  const hours = Math.floor((next.ms % 86400000) / 3600000);

  const label =
    days === 0
      ? hours === 0
        ? "Less than an hour away!"
        : `${hours}h away`
      : days === 1
        ? "Tomorrow"
        : `${days} days away`;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="flex justify-center mb-10"
    >
      <div
        className="flex flex-wrap items-center gap-3 px-5 py-3 text-sm font-semibold border-[3px] border-black bg-white shadow-[6px_6px_0_0_#080808]"
        style={{
          outline: "3px solid #00e5ff",
          outlineOffset: "-7px",
        }}
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full bg-[#00e5ff] opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 bg-[#00e5ff]" />
        </span>
        <span className="text-black/70 uppercase tracking-wider text-xs">Next exam</span>
        <span className="text-black">{next.course}</span>
        {next.seating && (
          <span className="text-black/60 italic text-xs">@ {next.seating.venue}</span>
        )}
        <span
          className="px-2.5 py-1 text-xs font-extrabold border-2 border-black bg-[#00e5ff] text-black uppercase tracking-wide"
          style={{
            boxShadow: "2px 2px 0 #080808",
          }}
        >
          {label}
        </span>
      </div>
    </motion.div>
  );
}
