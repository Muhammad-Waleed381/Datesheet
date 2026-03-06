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
        className={`font-mono font-bold text-2xl tabular-nums ${color} leading-none`}
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
          className="text-black bg-[#00e5ff] border-2 border-black px-2 py-1 font-bold text-sm tracking-wide uppercase"
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
            className="w-14 h-12 flex items-center justify-center overflow-hidden relative border-2 border-black bg-white shadow-[2px_2px_0_0_#080808]"
            style={{
              transform: `translate(${i % 2 === 0 ? "-1px" : "1px"}, 0)`,
            }}
          >
            <div
              className="absolute left-0 right-0 top-1/2 h-px"
              style={{ background: "rgba(0,0,0,0.25)" }}
            />
            <Digit value={u.value} color={color} />
          </div>
          <span className="text-[9px] font-bold uppercase tracking-widest text-black/70">
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
      whileHover={{ x: -3, y: -3 }}
      className="relative overflow-hidden cursor-default group border-[3px] border-black bg-white shadow-[8px_8px_0_0_#080808] transition-all duration-150"
      style={{
        outline: "3px solid transparent",
      }}
    >
      <div
        className="absolute left-0 top-0 bottom-0 w-2 bg-[#00e5ff]"
      />

      <div
        className="absolute top-0 left-0 right-0 h-1 bg-black opacity-85"
      />

      <div className="p-6 pl-7">
        <span
          className="inline-block px-3 py-1 text-xs font-extrabold mb-3 tracking-wider border-2 border-black bg-[#00e5ff] text-black"
          style={{ boxShadow: "2px 2px 0 #080808" }}
        >
          {exam.code}
        </span>

        <h2 className="text-lg font-bold text-black mb-1 leading-snug uppercase">{exam.course}</h2>

        <p className="text-black/70 text-xs mb-5 font-medium">
          Instructor:{" "}
          <span className="text-black font-bold">{exam.faculty}</span>
        </p>

        <div className="flex flex-col gap-3 text-xs text-black/75 mb-6 font-semibold">
          <div className="flex items-center gap-4">
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

          {exam.seating && (
            <div className="pt-3 border-t-2 border-dashed border-black/10">
              <div className="flex flex-col gap-2">
                <span className="flex items-start gap-1.5">
                  <svg className="w-3.5 h-3.5 mt-0.5 opacity-60 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="break-all">{exam.seating.venue}</span>
                </span>
                <div className="flex gap-4 pl-5">
                  <span className="flex items-center gap-1">
                    <span className="text-black/50 uppercase text-[10px]">Col:</span>
                    <span className="bg-black text-[10px] text-white px-1.5 py-0.5 rounded-sm">{exam.seating.column}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="text-black/50 uppercase text-[10px]">Row:</span>
                    <span className="bg-black text-[10px] text-white px-1.5 py-0.5 rounded-sm">{exam.seating.row}</span>
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div
          className="p-4 flex flex-col items-center gap-2 border-[3px] border-black bg-[#f8f8f8]"
          style={{
            boxShadow: "4px 4px 0 #080808",
          }}
        >
          <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-black/70 mb-1">
            Time Remaining
          </p>
          <Countdown datetime={exam.datetime} color="text-black" />
        </div>
      </div>
    </motion.div>
  );
}
