"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export default function PulsingRing({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex items-center justify-center">
      {/* Outer pulse rings */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-ember/20"
          style={{ width: "100%", height: "100%" }}
          animate={{
            scale: [1, 1.18 + i * 0.1],
            opacity: [0.5, 0],
          }}
          transition={{
            duration: 2.4,
            delay: i * 0.7,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
      {/* Slow rotating dashed ring */}
      <motion.div
        className="absolute w-[90%] h-[90%] rounded-full border border-dashed border-ember/25"
        animate={{ rotate: 360 }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
      />
      {/* Counter-rotating inner ring */}
      <motion.div
        className="absolute w-[75%] h-[75%] rounded-full border border-dashed border-flame/15"
        animate={{ rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />
      {children}
    </div>
  );
}