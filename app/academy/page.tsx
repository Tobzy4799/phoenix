"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EmberField from "@/components/EmberField";
import ScrollReveal, { revealItem } from "@/components/ScrollReveal";
import MotionCard from "@/components/MotionCard";
import { motion } from "framer-motion";
import {
   Megaphone,
   Users, 
   TrendingUp, 
   GraduationCap, 
   Palette, 
   Globe, 
   Zap, 
   Gem, 
   Handshake, 
   House, 
   MessageCircle, Search, Clock, Send, Sparkles, Book, Flame, Target, Pencil, Sprout, Radio, Medal, Home,Star } from "lucide-react";

   const ICON_MAP: Record<string, React.ReactNode> = {
  handshake: <Handshake size={22} className="text-ember" />,
  megaphone: < Megaphone size={22} className="text-ember" />,
  users: <Users size={22} className="text-ember" />,
  trendingup: <TrendingUp size={22} className="text-ember" />,
  gradcap: <GraduationCap size={22} className="text-ember" />,
  palette: <Palette size={22} className="text-ember" />,
  globe: <Globe size={22} className="text-ember" />,
  zap: <Zap size={22} className="text-ember" />,
  gem: <Gem size={22} className="text-ember" />,
  house: <House size={22} className="text-ember" />,
  message: <MessageCircle size={22} className="text-ember" />,
  search: <Search size={22} className="text-ember" />,
  clock: <Clock size={22} className="text-ember" />,
  book: <Book size={22} className="text-ember" />,
  flame: <Flame size={22} className="text-ember" />,
  target: <Target size={22} className="text-ember" />,
  send: <Send size={22} className="text-ember" />,
  sprout: <Sprout size={22} className="text-ember" />,
  pencil: <Pencil size={22} className="text-ember" />,
 radio: <Radio size={22} className="text-ember" />,
medal: <Medal size={22} className="text-ember" />,
home: <Home size={22} className="text-ember" />,
star: <Star size={22} className="text-ember" />

};

const OFFERINGS = [
  {
    icon: "clock",
    title: "Structured Onboarding Programs",
    desc: "Step-by-step programs that take you from zero to oriented with no assumptions about prior knowledge.",
  },
  {
    icon: "globe",
    title: "Web2 → Web3 Education Pathway",
    desc: "A clear, guided path from your current world into blockchain, wallets, culture, and participation.",
  },
  {
    icon: "palette",
    title: "Creator-Focused Onboarding",
    desc: "Built for people who want to create, contribute, and earn in Web3 and not just consume it.",
  },
  {
    icon: "house",
    title: "Phoenix Ecosystem Orientation",
    desc: "Learn how Phoenix works, what each utility does, and exactly where you fit inside the ecosystem.",
  },
  {
    icon: "radio",
    title: "Campus Network Guidance",
    desc: "Academy serves as the educational backbone for all campus network members across Africa.",
  },
  {
    icon: "medal",
    title: "Certification Pathways",
    desc: "Paid certification tracks are in development. Graduates will earn recognised credentials for their work.",
  },
];

const PHASES = [
  {
    tag: "Phase 1",
    title: "Newbie Onboarding",
    sub: "Web2 → Web3",
    duration: "30 days",
    audience: "For people entering Web3 for the first time",
    steps: [
      "Introduction to Web3 concepts, culture, and basics",
      "Guided onboarding into blockchain fundamentals",
      "Completion progresses into Creator's Onboarding",
      "Phoenix Orientation covering ecosystem structure",
    ],
    highlight: false,
  },
  {
    tag: "Phase 2",
    title: "Creator's Onboarding",
    sub: "Web3 → Phoenix",
    duration: "Adaptive",
    audience: "For Web3 participants new to Phoenix",
    steps: [
      "Designed for those already familiar with Web3",
      "Phoenix Orientation tailored to experience level",
      "Focus on integration into Phoenix, not Web3 basics",
      "Direct pathway into active utility participation",
    ],
    highlight: true,
  },
];

const INTEGRATIONS = [
  { name: "Phoenix Ecosystem", desc: "Messaging, orientation alignment, ecosystem clarity", icon: "flame" },
  { name: "Campus Network", desc: "Academy serves as the primary onboarding path for campus members", icon: "house" },
  { name: "House of Phoenix", desc: "Graduates transition into the broader community", icon: "home" },
  { name: "NFT / Trading Hub", desc: "Members proceed into specialised utilities after Academy onboarding", icon: "star" },
];

const OUTCOMES = [
  "Foundational Web3 understanding on wallets, chains, culture, participation",
  "Full orientation into Phoenix Ecosystem and how to navigate its utilities",
  "Readiness to contribute, collaborate, and earn within the ecosystem",
  "Priority access to paid opportunities as they open up",
];

const KPIS = [
  { n: "2", label: "Onboarding Phases" },
  { n: "30", label: "Day Newbie Program" },
  { n: "Current", label: "Est. Year" },
  { n: "Active", label: "Current Status" },
];

function Eyebrow({ children, center }: { children: React.ReactNode; center?: boolean }) {
  return (
    <span
      className={`font-mono text-xs tracking-[0.18em] uppercase text-ember font-semibold inline-flex items-center gap-2.5 ${center ? "justify-center" : ""}`}
    >
      <span className="w-4.5 h-px grad-flame inline-block" />
      {children}
    </span>
  );
}

export default function Academy() {
  return (
    <>
      <Navbar />

      {/* ── HERO ── */}
      {/* ── HERO + STATS wrapper — embers rise from the bottom hr upward ── */}
      <div className="relative overflow-hidden">

        {/* Single ember field anchored at the bottom of this whole block */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-full pointer-events-none z-0"
        >
          <EmberField count={35} />
        </div>

        {/* Top ambient glow */}
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
              "radial-gradient(ellipse 60% 100% at 50% 0%, rgba(255,77,28,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* ── HERO ── */}
        <section className="relative pt-16 pb-0">
          <div className="max-w-[1180px] mx-auto px-7 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="mb-10"
            >
              <Eyebrow><span className="text-lg">Academy</span></Eyebrow>
              <h1 className="font-display text-[clamp(2.6rem,5.5vw,4.2rem)] leading-[1.04] tracking-tight mt-4">
                Not just an academy.{" "}
                <span className="flame-text">A new order.</span>
              </h1>
              <p className="mt-5 text-[1.1rem] text-ash leading-relaxed max-w-[580px] md:max-w-none">
                Phoenix Academy is the education and onboarding arm of the Phoenix Ecosystem,
                the structured gateway every member passes through before entering the broader
                utility network.
              </p>
            </motion.div>
          </div>

          {/* Banner image */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="max-w-[1180px] mx-auto px-7 relative z-10"
          >
            <div className="rounded-[20px] overflow-hidden border border-card-line shadow-[0_24px_80px_-24px_rgba(255,77,28,0.25)] md:max-w-[72%] mx-auto">
              <Image
                src="/PACAS.jpg"
                alt="Phoenix Academy — Not Just an Academy, A New Order"
                width={1400}
                height={400}
                className="w-full object-cover md:max-h-[220px]"
                priority
              />
            </div>
          </motion.div>
        </section>

        {/* ── STATS STRIP ── */}
        <section className="py-16 relative z-10">
          <div className="max-w-[1180px] mx-auto px-7">
            <ScrollReveal stagger className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {KPIS.map((k) => (
                <motion.div
                  key={k.label}
                  variants={revealItem}
                  className="bg-card border border-card-line rounded-[14px] p-5 text-center"
                >
                  <div className="font-mono font-bold text-[2rem] text-bone tracking-tight">{k.n}</div>
                  <div className="font-mono text-[0.75rem] text-ash-dim uppercase tracking-wider mt-1">{k.label}</div>
                </motion.div>
              ))}
            </ScrollReveal>
          </div>
        </section>

        {/* Bottom glow at the hr — fire base effect */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            height: "180px",
            background:
              "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(255,77,28,0.12) 0%, rgba(255,166,43,0.06) 40%, transparent 75%)",
            pointerEvents: "none",
          }}
        />
      </div>

      <hr className="border-card-line" />

      {/* ── WHAT ACADEMY IS ── */}
      <section className="py-24">
        <div className="max-w-[1180px] mx-auto px-7 grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-12 items-center">

          {/* Text — left */}
          <ScrollReveal>
            <Eyebrow><span className="text-lg">Our Mandate</span></Eyebrow>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] leading-[1.04] tracking-tight mt-4">
              The entry point. The quality filter. The foundation.
            </h2>
            <p className="mt-4 text-ash text-[1.02rem] leading-relaxed">
              Phoenix Academy exists to onboard new members, educate on Web3 fundamentals
              and creator skills, and prepare every participant for meaningful contribution
              across all Phoenix utilities.
            </p>
            <p className="mt-3 text-ash text-[1.02rem] leading-relaxed">
              Without Academy, the ecosystem is fragmented. With it, every member arrives
              oriented, informed, and ready.
            </p>
            <ul className="mt-6 flex flex-col gap-3 list-none">
              {OUTCOMES.map((o) => (
                <li key={o} className="flex gap-3 items-start">
                  <span className="text-ember font-bold mt-0.5 shrink-0">✓</span>
                  <span className="text-bone text-[0.95rem]">{o}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          {/* Image — right */}
          <ScrollReveal delay={0.15} className="flex justify-center">
            <div className="relative">
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(255,77,28,0.15) 0%, transparent 70%)",
                }}
              />
              <Image
                src="/PACAR.jpg"
                alt="Phoenix Academy Crest"
                width={360}
                height={360}
                className="rounded-full relative z-10 border border-card-line"
              />
            </div>
          </ScrollReveal>

        </div>
      </section>

      <hr className="border-card-line" />

      {/* ── OFFERINGS ── */}
      <section className="py-24">
        <div className="max-w-[1180px] mx-auto px-7">
          <ScrollReveal className="text-center max-w-[640px] mx-auto mb-14">
            <Eyebrow center><span className="text-lg">What We Offer</span></Eyebrow>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] leading-[1.04] tracking-tight mt-4">
              Active offerings. More in development.
            </h2>
            <p className="mt-4 text-ash text-[1rem] leading-relaxed">
              The Academy is operational and evolving. Core onboarding is live.
              Modular tracks and paid certifications are coming.
            </p>
          </ScrollReveal>

          <ScrollReveal stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {OFFERINGS.map((o) => (
              <MotionCard key={o.title}>
                <div className="text-2xl mb-4">{ICON_MAP[o.icon]}</div>
                <h3 className="font-bold text-[1.05rem]">{o.title}</h3>
                <p className="mt-2.5 text-ash text-[0.92rem] leading-relaxed">{o.desc}</p>
              </MotionCard>
            ))}
          </ScrollReveal>
        </div>
      </section>

      <hr className="border-card-line" />

      {/* ── ONBOARDING PHASES ── */}
      <section className="py-24">
        <div className="max-w-[1180px] mx-auto px-7">
          <ScrollReveal className="text-center max-w-[640px] mx-auto mb-14">
            <Eyebrow center><span className="text-lg">Member Journey</span></Eyebrow>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] leading-[1.04] tracking-tight mt-4">
              Two phases. One destination.
            </h2>
            <p className="mt-4 text-ash text-[1rem]">
              Your onboarding path depends on where you&apos;re starting from, not where
              everyone else is.
            </p>
          </ScrollReveal>

          <ScrollReveal stagger className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PHASES.map((p) => (
              <motion.div
                key={p.tag}
                variants={revealItem}
                className={`bg-card rounded-[20px] p-8 border relative overflow-hidden group ${p.highlight
                    ? "border-flame shadow-[0_0_0_1px_var(--flame),0_24px_60px_-24px_rgba(255,77,28,0.4)]"
                    : "border-card-line"
                  }`}
              >
                {p.highlight && (
                  <span className="absolute top-0 left-0 right-0 grad-flame text-[#110603] font-mono text-[0.65rem] font-bold tracking-[0.1em] text-center py-1.5 rounded-t-[20px]">
                    FOR WEB3 PARTICIPANTS
                  </span>
                )}
                <div className={p.highlight ? "pt-5" : ""}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-ember border border-ember/30 rounded-full px-2.5 py-1">
                      {p.tag}
                    </span>
                    <span className="font-mono text-[0.72rem] text-ash-dim">{p.duration}</span>
                  </div>
                  <h3 className="font-display text-[1.5rem] leading-tight">{p.title}</h3>
                  <p className="text-[0.85rem] text-ember mt-1 font-mono">{p.sub}</p>
                  <p className="mt-3 text-ash text-[0.9rem]">{p.audience}</p>
                  <hr className="border-card-line my-5" />
                  <ul className="flex flex-col gap-3 list-none">
                    {p.steps.map((s) => (
                      <li key={s} className="flex gap-2.5 items-start text-[0.88rem]">
                        <span className="text-ember shrink-0 mt-0.5">✓</span>
                        <span className="text-bone">{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </ScrollReveal>

          {/* Flow diagram */}
          <ScrollReveal className="mt-10">
            <div className="bg-card border border-card-line rounded-[16px] p-6 flex flex-wrap items-center justify-center gap-3 text-center">
              {[
                "Campus Network / Community",
                "→",
                "Newbie Onboarding (30 days)",
                "→",
                "Creator's Onboarding",
                "→",
                "Phoenix Orientation",
                "→",
                "Full Ecosystem Access",
              ].map((item, i) => (
                <span
                  key={i}
                  className={
                    item === "→"
                      ? "text-ember font-bold"
                      : "font-mono text-[0.76rem] uppercase tracking-wider text-bone bg-ink/60 border border-card-line rounded-full px-3 py-1.5"
                  }
                >
                  {item}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <hr className="border-card-line" />

      {/* ── INTEGRATIONS ── */}
      <section className="py-24">
        <div className="max-w-[1180px] mx-auto px-7">
          <ScrollReveal className="text-center max-w-[640px] mx-auto mb-14">
            <Eyebrow center><span className="text-lg">Ecosystem Integration</span></Eyebrow>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] leading-[1.04] tracking-tight mt-4">
              Academy connects to everything.
            </h2>
            <p className="mt-4 text-ash text-[1rem]">
              It&apos;s not a standalone product. It&apos;s the gateway every Phoenix utility
              references before deeper engagement begins.
            </p>
          </ScrollReveal>

          <ScrollReveal stagger className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {INTEGRATIONS.map((item) => (
              <MotionCard key={item.name}>
                <div className="flex gap-4 items-start">
                  <span className="text-2xl">{ICON_MAP[item.icon]}</span>
                  <div>
                    <h3 className="font-bold text-[1.05rem]">{item.name}</h3>
                    <p className="mt-1.5 text-ash text-[0.92rem] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </MotionCard>
            ))}
          </ScrollReveal>
        </div>
      </section>

      <hr className="border-card-line" />

      {/* ── IN DEVELOPMENT ── */}
      <section className="py-24">
        <div className="max-w-[1180px] mx-auto px-7">
          <ScrollReveal className="max-w-[680px] mx-auto text-center">
            <Eyebrow center><span className="text-lg">Coming Soon</span></Eyebrow>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] leading-[1.04] tracking-tight mt-4">
              Certifications & paid tracks are in development.
            </h2>
            <p className="mt-5 text-ash text-[1.02rem] leading-relaxed">
              Modular learning tracks, skill-based progression paths, and standardised
              certification programs are actively being built. When they launch, Academy
              graduates will have recognised credentials and direct pathways into paid
              work across the ecosystem.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {[
                "Modular Learning Tracks",
                "Skill-Based Progression",
                "Paid Certifications",
                "Partner Programs",
                "Standardised Materials",
              ].map((item) => (
                <span
                  key={item}
                  className="font-mono text-[0.76rem] uppercase tracking-wider text-ash border border-card-line rounded-full px-4 py-2"
                >
                  {item}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <hr className="border-card-line" />

      {/* ── CTA ── */}
      <section className="py-24 relative">
        <EmberField count={25} />
        <ScrollReveal
          className="max-w-[1180px] mx-auto px-7 relative z-10 text-center"
          y={20}
        >
          <div className="max-w-[580px] mx-auto">
            <Image
              src="/PACAR.jpg"
              alt="Phoenix Academy"
              width={300}
              height={300}
              className="rounded-full mx-auto border border-card-line"
            />
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] leading-[1.04] tracking-tight mt-6">
              Ready to enter the ecosystem?
            </h2>
            <p className="mt-4 text-ash text-[1.02rem] leading-relaxed">
              Academy is your starting point, whether you&apos;re brand new to Web3 or
              just new to Phoenix. Join the community and get notified when the next
              onboarding cohort opens.
            </p>
            <div className="flex gap-4 justify-center mt-8 flex-wrap">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/community"
                  className="inline-flex items-center gap-2 rounded-full grad-flame text-[#110603] font-bold text-[0.92rem] px-7 py-3.5 hover:shadow-[0_10px_30px_-8px_rgba(255,77,28,0.55)] transition-shadow"
                >
                  <Flame size={16}/> Join the Community
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/agency"
                  className="inline-flex items-center gap-2 rounded-full border border-bone/20 text-bone font-bold text-[0.92rem] px-7 py-3.5 hover:border-ember hover:text-ember transition-colors"
                >
                  <Sparkles size={16}/> Explore the Ecosystem
                </Link>
              </motion.div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </>
  );
}