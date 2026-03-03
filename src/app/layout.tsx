import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mid-Sem Exam Tracker – Batch 13",
  description: "Countdown timers for mid-semester exams, Batch 13.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.tailwindcss.com" async={false} />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=JetBrains+Mono:wght@500;700&display=swap"
          rel="stylesheet"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              body { font-family: 'Space Grotesk', sans-serif; }
              .font-mono { font-family: 'JetBrains Mono', monospace; }
              @keyframes ping {
                75%, 100% { transform: scale(2); opacity: 0; }
              }
              .animate-ping {
                animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
              }
            `,
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
