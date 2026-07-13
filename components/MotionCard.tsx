"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { revealItem } from "./ScrollReveal";

type MotionCardProps = {
  children: ReactNode;
  className?: string;
};

export default function MotionCard({ children, className = "" }: MotionCardProps) {
  return (
    <motion.div
      variants={revealItem}
      whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
      className={`bg-card border border-card-line rounded-[18px] p-7 relative overflow-hidden group ${className}`}
    >
      <div className="absolute inset-0 grad-flame-soft opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <div className="relative">{children}</div>
    </motion.div>
  );
}