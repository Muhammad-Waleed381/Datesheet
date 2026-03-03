"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Exam } from "@/data/exams";

interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  finished: boolean;
}

function getCountdown(datetime: string): CountdownState {
  const distance = new Date(datetime).getTime() - Date.now();
  if (distance <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, finished: true };
  return {
    days: Math.floor(distance / 86400000),
    hours: Math.floor((distance % 86400000) / 3600000),
    minutes: Math.floor((distance % 3600000) / 60000),
    seconds: Math.floor((distance % 60000) / 1000),
    finished: false,
  };
}

function Digit({ value, color }: { value: number; color: string }) {
  const padded = String(value).padStart(2, "0");
  return (
    <AnimatePresence mode="popLayout">
      <motion.span
        key={padded}
        initial={{ y: -14, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 14, opacity: 0 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className={`font-mono font-bold text-2xl tabular-nums ${color}`}
      >
        {padded}
      </motion.span>
    </AnimatePresence>
  );
}

interface CountdownProps {
  datetime: string;
  color: string;
}

function Countdown({ datetime, color }: CountdownProps) {
  const [cd, setCd] = useState<CountdownState>(() => getCountdown(datetime));

  useEffect(() => {
    const id = setInterval(() => setCd(getCountdown(datetime)), 1000);
    return () => clearInterval(id);
  }, [datetime]);

  if (cd.finished) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex items-center justify-center gap-2 py-1"
      >
        <motion.span
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-emerald-400 font-bold text-sm tracking-wide"
        >
          Exam Day!
        </motion.span>
      </motion.div>
    );
  }

  const units = [
    { label: "d", value: cd.days },
    { label: "h", value: cd.hours },
    { label: "m", value: cd.minutes },
    { label: "s", value: cd.seconds },
  ];

  return (
    <div className="flex items-end gap-3">
      {units.map((u, i) => (
        <div key={u.label} className="flex flex-col items-center gap-0.5">
          <div
            className="w-14 h-12 rounded-lg flex items-center justify-center overflow-hidden relative"
            style={{
              background: "rgba(2,6,23,0.7)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {/* Shine line */}
            <div
              className="absolute left-0 right-0 top-1/2 h-px"
              style={{ background: "rgba(0,0,0,0.5)" }}
            />
            <Digit value={u.value} color={color} />
          </div>
          <span className="text-[9px] font-semibold uppercase tracking-widest text-slate-600">
            {u.label}
          </span>
        </div>
      ))}
    </div>
  );
}

interface ExamCardProps {
  exam: Exam;
  index: number;
}

export default function ExamCard({ exam, index }: ExamCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -6, scale: 1.02 }}
      className={`relative rounded-2xl overflow-hidden cursor-default group transition-shadow duration-300 hover:shadow-2xl ${exam.accent.glow}`}
      style={{
        background: "rgba(15, 23, 42, 0.6)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Accent left bar */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${exam.accent.bar} opacity-80`}
      />

      {/* Top glow on hover */}
      <div
        className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${exam.accent.bar} opacity-0 group-hover:opacity-60 transition-opacity duration-500`}
      />

      <div className="p-6 pl-7">
        {/* Badge */}
        <span
          className={`inline-block px-3 py-1 text-xs font-bold rounded-full mb-3 ${exam.accent.badge} ${exam.accent.badgeText} tracking-wider`}
        >
          {exam.code}
        </span>

        {/* Course title */}
        <h2 className="text-lg font-bold text-white mb-1 leading-snug">{exam.course}</h2>

        {/* Faculty */}
        <p className="text-slate-500 text-xs mb-5">
          Instructor:{" "}
          <span className="text-slate-300 font-medium">{exam.faculty}</span>
        </p>

        {/* Date & time row */}
        <div className="flex items-center gap-4 text-xs text-slate-400 mb-6">
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {exam.date}
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {exam.timeStr}
          </span>
        </div>

        {/* Countdown */}
        <div
          className="rounded-xl p-4 flex flex-col items-center gap-2"
          style={{
            background: "rgba(2,6,23,0.5)",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600 mb-1">
            Time Remaining
          </p>
          <Countdown datetime={exam.datetime} color={exam.accent.countdown} />
        </div>
      </div>
    </motion.div>
  );
}
