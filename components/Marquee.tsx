"use client";

import { motion } from "framer-motion";

const ITEMS = [
  "27K+ Organic X Followers",
  "122,900+ Campaign Views",
  "40+ Campus Partners",
  "153K+ Total Reach",
  "1 Year of Proof",
  "Transparent Fees. Always.",
  "Real Creators. Real Reach.",
  "Built Before We Charged a Cent.",
];

function MarqueeTrack({ reverse = false }: { reverse?: boolean }) {
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <div className="flex overflow-hidden">
      <motion.div
        className="flex shrink-0 gap-0"
        animate={{ x: reverse ? ["0%", "50%"] : ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-3 px-6 whitespace-nowrap font-mono text-[0.78rem] uppercase tracking-[0.12em]"
            style={{ color: i % 2 === 0 ? "var(--ember)" : "var(--ash-dim)" }}
          >
            {item}
            <span style={{ color: "var(--flame)", opacity: 0.5 }}>✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function Marquee() {
  return (
    <div
      className="relative py-4 overflow-hidden border-y border-card-line"
      style={{
        background:
          "linear-gradient(90deg, var(--ink) 0%, transparent 8%, transparent 92%, var(--ink) 100%)",
      }}
    >
      <MarqueeTrack />
    </div>
  );
}