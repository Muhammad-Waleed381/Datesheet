# 📅 Mid-Sem Exam Tracker — Batch 13

A sleek, animated exam datesheet and countdown tracker built for **NUST SEECS – Batch 13** mid-semester exams. Know exactly when your next exam is, where you're seated, and how much time you have left — all at a glance.

> **Live site:** [Deploy on Vercel](#deploy-on-vercel)

---

## ✨ Features

- **Live Countdown Timers** — Every exam card shows a real-time `DD · HH · MM · SS` countdown that ticks every second.
- **Next Exam Banner** — A pinned banner at the top always highlights the upcoming exam with a pulsing indicator and human-readable time label (e.g. *"Tomorrow"*, *"2 days away"*, *"Today – 3h away"*).
- **Seating Info** — Each card displays the exam venue, column, and row number so you know exactly where to sit.
- **Neobrutalist UI** — Bold black borders, cyan (`#00e5ff`) accents, hard box-shadows, and uppercase typography give the site a premium, editorial feel.
- **Aurora Background** — Subtle animated blobs and a dot-grid overlay create a dynamic, alive background.
- **Smooth Animations** — Powered by [Framer Motion](https://www.framer.com/motion/) for staggered card entrances, digit flip transitions, and hover lift effects.
- **Responsive Layout** — 1-column on mobile, 2-column on tablet, 3-column on desktop.
- **"Exam Day!" State** — Once countdown reaches zero, the card flips to a pulsing *Exam Day!* badge.

---

## 🖼️ UI Overview

| Section | Description |
|---|---|
| **Header** | Animated word-by-word title: `MID-SEM · EXAM · TRACKER` |
| **Next Exam Banner** | Live pill showing the nearest upcoming exam + venue + time-until label |
| **Exam Cards Grid** | One card per exam — course, code, instructor, date/time, seating, and countdown |
| **Footer** | Motivational tagline at the bottom |

---

## 🗂️ Project Structure

```
Datesheet/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout — fonts (Space Grotesk, JetBrains Mono), metadata
│   │   ├── page.tsx            # Home page — header, banner, grid, footer
│   │   ├── globals.css         # Global base styles
│   │   └── favicon.ico
│   ├── components/
│   │   ├── AuroraBackground.tsx  # Fixed animated background (blobs + dot grid + noise)
│   │   ├── ExamCard.tsx          # Individual exam card with live Countdown component
│   │   ├── FlipUnit.tsx          # (Digit flip utility component)
│   │   └── NextExamBanner.tsx    # Top banner that tracks the nearest upcoming exam
│   └── data/
│       └── exams.ts              # All exam data — course, code, faculty, date, seating, accent colours
├── public/                       # Static SVG assets
├── package.json
├── next.config.ts
├── tsconfig.json
└── tailwindcss / postcss config
```

---

## 🧩 Key Components

### `ExamCard`
Renders a single exam entry. Internally hosts a `Countdown` component that calls `setInterval` every second to recompute remaining time. When the countdown finishes it renders a pulsing **Exam Day!** badge.

### `NextExamBanner`
Filters `exams` to find the one with the smallest positive millisecond difference from `Date.now()`, then refreshes every 30 seconds. Displays venue info if seating data is available.

### `AuroraBackground`
A `position: fixed` layer behind all content with:
- A light grey base (`#f7f7f7`)
- An SVG dot-grid overlay
- Two slowly oscillating coloured blocks (animated with Framer Motion)
- A subtle noise texture via an inline SVG `feTurbulence` filter

---

## 📋 Exam Schedule (Batch 13 — Mid-Sem 2026)

| # | Course | Code | Faculty | Date | Time | Venue | Col | Row |
|---|--------|------|---------|------|------|-------|-----|-----|
| 1 | Compiler Construction | CS-346 | Yusra Arshad | 09-03-2026 | 09:30–11:30 | SEECS Computing-1 | 3 | 3 |
| 2 | Parallel & Distributed Computing | CS-347 | Shah Khalid | 10-03-2026 | 12:15–14:15 | SEECS Class Room 05 | 8 | 1 |
| 3 | Deep Learning | CS-419 | Mehwish Awan | 11-03-2026 | 09:30–11:30 | SEECS Class Room 13 | 4 | 2 |
| 4 | Cyber Security / Big Data | CS-360 | Madiha Khalid | 12-03-2026 | 12:15–14:15 | IAEC-20 | 6 | 4 |
| 5 | Software Engineering | SE-200 | Hirra Anwar | 16-03-2026 | 09:30–11:30 | SEECS Class Room 04 | 9 | 4 |

---

## 🛠️ Tech Stack

| Technology | Version | Role |
|---|---|---|
| [Next.js](https://nextjs.org) | 16.1.6 | React framework (App Router) |
| [React](https://react.dev) | 19.x | UI library |
| [TypeScript](https://www.typescriptlang.org) | 5.9.x | Type safety |
| [Tailwind CSS](https://tailwindcss.com) | 4.x | Utility-first styling |
| [Framer Motion](https://www.framer.com/motion/) | 12.x | Animations & transitions |
| [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) | – | Primary sans-serif font |
| [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) | – | Monospace font for countdown digits |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18 or later
- **npm** (or yarn / pnpm / bun)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Muhammad-Waleed381/Datesheet.git
cd Datesheet

# 2. Install dependencies
npm install
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The page hot-reloads on every save.

### Other Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server (Webpack mode) |
| `npm run build` | Build optimized production bundle |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint checks |

---

## ✏️ Adding or Updating Exams

All exam data lives in a single file: [`src/data/exams.ts`](src/data/exams.ts).

Each entry follows this shape:

```ts
{
  course: "Course Name",
  code: "XX-000",
  faculty: "Instructor Name",
  date: "DD-MM-YYYY",          // Display string
  timeStr: "HH:MM – HH:MM",   // Display string
  datetime: "YYYY-MM-DDTHH:MM:SS", // ISO 8601 — used for actual countdown
  seating: {                   // Optional — remove if not available
    venue: "Building_Room",
    column: 1,
    row: 1,
  },
  accent: {                    // Tailwind colour classes for the card theme
    border: "hover:border-blue-500/60",
    glow: "hover:shadow-blue-500/20",
    badge: "bg-blue-500/15 border border-blue-500/30",
    badgeText: "text-blue-300",
    bar: "from-blue-500 to-blue-400",
    countdown: "text-blue-400",
  },
}
```

> **Tip:** Change the `datetime` field to the actual exam start time in ISO 8601 format. The countdown component reads this field to compute remaining time.

---

## 🌐 Deploy on Vercel

The easiest way to deploy is via [Vercel](https://vercel.com):

1. Push your repo to GitHub.
2. Import the project on [vercel.com/new](https://vercel.com/new).
3. Vercel auto-detects Next.js — click **Deploy**.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

---

## 📁 GitHub Repository

[https://github.com/Muhammad-Waleed381/Datesheet](https://github.com/Muhammad-Waleed381/Datesheet)

---

*Study hard. Sleep enough. You've got this. 🎯*
