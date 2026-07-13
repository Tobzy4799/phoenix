"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** stagger child elements that use `revealItem` variant */
  stagger?: boolean;
  staggerDelay?: number;
};

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  y = 28,
  stagger = false,
  staggerDelay = 0.12,
}: ScrollRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  const variants: Variants = stagger
    ? {
        hidden: {},
        visible: {
          transition: {
            staggerChildren: prefersReducedMotion ? 0 : staggerDelay,
            delayChildren: delay,
          },
        },
      }
    : {
        hidden: { opacity: 0, y: prefersReducedMotion ? 0 : y },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] },
        },
      };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

/** Use as a direct child of a ScrollReveal with stagger=true */
export const revealItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};