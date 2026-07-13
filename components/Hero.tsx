"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import EmberField from "./EmberField";
import CountUp from "./CountUp";
import PulsingRing from "./PulsingRing";
import Image from "next/image";

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.16, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

const headlineLine: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

const markVariants: Variants = {
  hidden: { opacity: 0, scale: 0.7, rotate: -18 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
};

function StatBlock({
  to,
  suffix,
  label,
}: {
  to: number;
  suffix: string;
  label: string;
}) {
  return (
    <motion.div variants={item}>
      <div className="font-mono font-bold text-[clamp(2rem,3.4vw,2.7rem)] text-bone tracking-tight">
        <CountUp to={to} suffix={suffix} />
      </div>
      <div className="font-mono text-[0.78rem] text-ash-dim uppercase tracking-wider mt-1">
        {label}
      </div>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section className="relative pt-16 md:pt-21 pb-20 overflow-hidden">
      <EmberField count={36} />

      {/* Ambient fire glow at top */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "70%",
          height: "260px",
          background:
            "radial-gradient(ellipse 60% 100% at 50% 0%, rgba(255,77,28,0.09) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="max-w-[1180px] mx-auto px-7 relative z-10 grid grid-cols-1 md:grid-cols-[1.15fr_0.85fr] gap-12 items-center">
        <motion.div initial="hidden" animate="visible" variants={container}>
          <motion.span
            variants={item}
            className="font-mono text-lg tracking-[0.18em] uppercase text-ember font-semibold inline-flex items-center gap-2.5"
          >
            <span className="w-4.5 h-px grad-flame inline-block" />
            Web3 Growth Agency
          </motion.span>

          <h1 className="font-display text-[clamp(2.6rem,6vw,4.6rem)] leading-[1.04] tracking-tight mt-4.5">
            <motion.span variants={headlineLine} className="flame-text block">
              PHOENIX
            </motion.span>
            <motion.span variants={headlineLine} className="block">
              ECOSYSTEM
            </motion.span>
          </h1>

          <motion.p
            variants={item}
            className="mt-5.5 text-[1.12rem] max-w-[480px] text-ash leading-relaxed"
          >
            Grow your Web3 project with Africa&apos;s most connected growth
            network.
          </motion.p>

          <motion.div variants={item} className="flex gap-3.5 mt-8.5 flex-wrap">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>

              <a href="https://calendly.com/phoenixxecosystem/30min"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full grad-flame text-[#110603] font-bold text-[0.92rem] px-6.5 py-3.5 hover:shadow-[0_10px_30px_-8px_rgba(255,77,28,0.55)] transition-shadow"
              >
                Book a Discovery Call
              </a>
            </motion.div>

          </motion.div>

          <motion.div variants={item} className="flex gap-11 mt-13 flex-wrap">
            <StatBlock to={27} suffix="K+" label="X Followers" />
            <StatBlock to={1} suffix="M+" label="Campaign Views" />
            <StatBlock to={40} suffix="+" label="Campus Reach" />
          </motion.div>
        </motion.div>

        {/* Logo mark with pulsing rings */}
        <div className="flex justify-center relative">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={markVariants}
            className="w-[min(380px,80vw)] aspect-square rounded-full grad-flame-soft border border-card-line flex items-center justify-center"
          >
            <PulsingRing>
              <motion.div
                className="relative z-10"
                // Float up and down continuously
                animate={{
                  y: [0, -12, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* Glow that pulses behind the image */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    boxShadow: [
                      "0 0 20px 4px rgba(255,77,28,0.2)",
                      "0 0 50px 16px rgba(255,166,43,0.45)",
                      "0 0 20px 4px rgba(255,77,28,0.2)",
                    ],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                {/* Entrance: spin once then settle */}
                <motion.div
                  initial={{ rotate: -20, scale: 0.8, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Image
                    src="/PhoenixLogoalt.jpg"
                    alt="Phoenix Ecosystem"
                    width={200}
                    height={200}
                    className="rounded-full"
                    priority
                  />
                </motion.div>
              </motion.div>
            </PulsingRing>
          </motion.div>
        </div>
      </div>
    </section>
  );
}