"use client";

import { motion } from "framer-motion";
import AuroraBackground from "@/components/AuroraBackground";
import NextExamBanner from "@/components/NextExamBanner";
import ExamCard from "@/components/ExamCard";
import { exams } from "@/data/exams";

const titleWords = ["Mid-Sem", "Exam", "Tracker"];

export default function Home() {
  return (
    <main className="relative min-h-screen px-6 py-14 md:px-12 md:py-20">
      <AuroraBackground />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4 leading-none">
            {titleWords.map((word, wi) => (
              <motion.span
                key={wi}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: wi * 0.12, duration: 0.55, ease: "easeOut" }}
                className="inline-block mr-3 last:mr-0"
                style={{
                  background:
                    "linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #f472b6 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
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
            className="text-slate-400 text-base"
          >
            Batch 13 &nbsp;·&nbsp; Good luck with your preparation!
          </motion.p>
        </header>

        {/* Next Exam Banner */}
        <NextExamBanner />

        {/* Exam Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exams.map((exam, i) => (
            <ExamCard key={exam.code} exam={exam} index={i} />
          ))}
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-center mt-16 text-slate-700 text-xs"
        >
          Study hard. Sleep enough. You&apos;ve got this.
        </motion.footer>
      </div>
    </main>
  );
}
