"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AuroraBackground from "@/components/AuroraBackground";
import NextExamBanner from "@/components/NextExamBanner";
import ExamCard from "@/components/ExamCard";
import {
  StudentId,
  resolveExamsForStudent,
  students,
} from "@/data/exams";

const titleWords = ["Mid-Sem", "Exam", "Tracker"];
const STORAGE_KEY = "selected-student";

export default function Home() {
  const [selectedStudent, setSelectedStudent] = useState<StudentId>(() => {
    if (typeof window === "undefined") return "waleed";
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "waleed" || stored === "ahmed_ibrahim" ? stored : "waleed";
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, selectedStudent);
  }, [selectedStudent]);

  const exams = resolveExamsForStudent(selectedStudent);

  return (
    <main className="relative min-h-screen px-6 py-14 md:px-12 md:py-20">
      <AuroraBackground />

      <div className="max-w-6xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4 leading-none uppercase">
            {titleWords.map((word, wi) => (
              <motion.span
                key={wi}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: wi * 0.12, duration: 0.55, ease: "easeOut" }}
                className="inline-block mr-3 last:mr-0 border-[3px] border-black bg-white px-3 py-1 shadow-[5px_5px_0_0_#080808]"
                style={{
                  color: wi === 1 ? "#00e5ff" : "#080808",
                }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.45 }}
            className="text-black/80 text-base font-medium uppercase tracking-[0.16em]"
          >
            Batch 13 &nbsp;·&nbsp; Good luck with your preparation!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.58, duration: 0.35 }}
            className="mt-5 flex items-center justify-center gap-3"
          >
            <label
              htmlFor="student-filter"
              className="text-black/75 text-xs font-bold uppercase tracking-[0.12em]"
            >
              Student
            </label>
            <select
              id="student-filter"
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value as StudentId)}
              className="border-[3px] border-black bg-white px-3 py-2 text-sm font-bold uppercase tracking-wide shadow-[4px_4px_0_0_#080808] focus:outline-none focus:ring-0"
            >
              {Object.entries(students).map(([id, label]) => (
                <option key={id} value={id}>
                  {label}
                </option>
              ))}
            </select>
          </motion.div>
        </header>

        <NextExamBanner exams={exams} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exams.map((exam, i) => (
            <ExamCard key={exam.code} exam={exam} index={i} />
          ))}
        </div>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-center mt-16 text-black/70 text-xs font-semibold tracking-[0.1em] uppercase"
        >
          Study hard. Sleep enough. You&apos;ve got this.
        </motion.footer>
      </div>
    </main>
  );
}
