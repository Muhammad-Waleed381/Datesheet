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
        className="flex items-center gap-3 px-5 py-2.5 rounded-full text-sm font-medium"
        style={{
          background: "rgba(59,130,246,0.08)",
          border: "1px solid rgba(59,130,246,0.25)",
          backdropFilter: "blur(8px)",
        }}
      >
        {/* Pulsing dot */}
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-400" />
        </span>
        <span className="text-slate-400">Next exam:</span>
        <span className="text-white font-semibold">{next.course}</span>
        <span
          className="px-2.5 py-0.5 rounded-full text-xs font-bold"
          style={{
            background: "rgba(59,130,246,0.18)",
            color: "#93c5fd",
          }}
        >
          {label}
        </span>
      </div>
    </motion.div>
  );
}
