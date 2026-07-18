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
   MessageCircle, Search, Clock, Send, Sparkles, Book, Flame, Target, Pencil, Sprout } from "lucide-react";

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
  pencil: <Pencil size={22} className="text-ember" />

};

/* ─── DATA ───────────────────────────────────────────────── */

const WHAT_WE_OFFER = [
  {
    icon: "clock",
    title: "Structured Onboarding",
    desc: "Every member enters through a defined path, no one gets thrown into the deep end alone.",
  },
  {
    icon: "book",
    title: "Education & Peer Learning",
    desc: "Learn alongside people who are a few steps ahead, a few steps behind, and right where you are.",
  },
  {
    icon: "globe",
    title: "Web3 Exposure",
    desc: "Campaigns, AMAs, activations, and opportunities across the ecosystem, you hear about them here first.",
  },
  {
    icon: "handshake",
    title: "A Real Network",
    desc: "Creators, traders, builders, students, the Phoenix community spans backgrounds, countries, and skill sets.",
  },
  {
    icon: "target",
    title: "Cross-Utility Connection",
    desc: "House of Phoenix connects every utility. Move between Academy, Campus, Agency, and NFT. The community is the thread.",
  },
  {
    icon: "flame",
    title: "Cultural Identity",
    desc: "Phoenix isn't just a platform. It's a shared identity, and House of Phoenix is where that identity lives.",
  },
];

const FLOWS = [
  {
    path: "Web2 Newcomer",
    steps: ["Phoenix Academy", "House of Phoenix", "Other Utilities"],
    icon: "sprout",
  },
  {
    path: "Campus Member",
    steps: ["Phoenix Academy", "House of Phoenix", "NFT or Trading Hub"],
    icon: "house",
  },
  {
    path: "Web3 Creator",
    steps: ["Creator's Onboarding", "House of Phoenix", "Utilities"],
    icon: "pencil",
  },
];

const VALUES = [
  {
    title: "Phoenix is a community, not a promise machine.",
    desc: "No utility guarantees income. Value emerges through learning and contribution.",
  },
  {
    title: "You are not meant to do everything.",
    desc: "Phoenix is modular by design. Find your place, build your skills, grow within the ecosystem.",
  },
  {
    title: "Participation is voluntary.",
    desc: "Engage where it is relevant. Outcomes depend on participation and consistency.",
  },
  {
    title: "Every utility has a distinct focus.",
    desc: "House of Phoenix binds them all, but each arm operates independently with its own expectations.",
  },
];

const SOCIALS = [
  {
    label: "Join on Telegram",
    href: "https://t.me/+fmvi1BeODZk4MGI0",
    icon: "send",
    desc: "Main community hub where discussions, announcements and opportunities takes place",
    cta: "Join Community",
    primary: true,
  },
  {
    label: "Follow on X",
    href: "https://x.com/phoenixxweb3",
    icon: "𝕏",
    desc: "Campaign updates, receipts, and ecosystem news in real time",
    cta: "Follow @phoenixxweb3",
    primary: false,
  },
];

/* ─── HELPERS ────────────────────────────────────────────── */

function Eyebrow({ children, center }: { children: React.ReactNode; center?: boolean }) {
  return (
    <span
      className={`font-mono text-xs tracking-[0.18em] uppercase text-ember font-semibold inline-flex items-center gap-2.5 ${
        center ? "justify-center" : ""
      }`}
    >
      <span className="w-4.5 h-px grad-flame inline-block" />
      {children}
    </span>
  );
}

/* ─── PAGE ───────────────────────────────────────────────── */

export default function Community() {
  return (
    <>
      <Navbar />

      {/* ── HERO ── */}
      <div className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-full pointer-events-none z-0"
        >
          <EmberField count={35} />
        </div>

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
              "radial-gradient(ellipse 60% 100% at 50% 0%, rgba(255,77,28,0.07) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <section className="relative pt-16 pb-0">
          <div className="max-w-[1180px] mx-auto px-7 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="mb-10"
            >
              <Eyebrow><span className="text-lg">Community</span></Eyebrow>
              <h1 className="font-display text-[clamp(2.6rem,5.5vw,4.2rem)] leading-[1.04] tracking-tight mt-4">
                One ecosystem.{" "}
                <span className="flame-text">One house.</span>
              </h1>
              <p className="mt-5 text-[1.1rem] text-ash leading-relaxed md:max-w-none max-w-[580px]">
                House of Phoenix is the central social and cultural layer of the Phoenix
                Ecosystem, the horizontal thread that connects every utility, every
                member, and every milestone into one shared identity.
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
                src="/PECO.jpg"
                alt="Phoenix Ecosystem Community"
                width={1400}
                height={400}
                className="w-full object-cover md:max-h-[220px]"
                priority
              />
            </div>
          </motion.div>
        </section>

        {/* Stats strip */}
        <section className="py-16 relative z-10">
          <div className="max-w-[1180px] mx-auto px-7">
            <ScrollReveal stagger className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {[
                { n: "27K+", label: "X Followers" },
                { n: "1M+", label: "Campaign Views" },
                { n: "Active", label: "Status" },
                { n: "∞", label: "Room to Grow" },
              ].map((s) => (
                <motion.div
                  key={s.label}
                  variants={revealItem}
                  className="bg-card border border-card-line rounded-[14px] p-5 text-center"
                >
                  <div className="font-mono font-bold text-[2rem] text-bone tracking-tight">
                    {s.n}
                  </div>
                  <div className="font-mono text-[0.75rem] text-ash-dim uppercase tracking-wider mt-1">
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </ScrollReveal>
          </div>
        </section>

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

      {/* ── WHAT HOUSE OF PHOENIX IS ── */}
      <section className="py-24">
        <div className="max-w-[1180px] mx-auto px-7 grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          <ScrollReveal>
            <Eyebrow><span className="text-lg">House of Phoenix</span></Eyebrow>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] leading-[1.04] tracking-tight mt-4">
              Not a feature. The foundation.
            </h2>
            <p className="mt-4 text-ash text-[1.02rem] leading-relaxed">
              House of Phoenix is the horizontal layer that binds all Phoenix utilities
              together. Without it, Phoenix risks becoming a collection of isolated tools.
              With it, every member regardless of their domain stays connected,
              supported, and are part of something larger than any one utility.
            </p>
            <p className="mt-3 text-ash text-[1.02rem] leading-relaxed">
              It&apos;s where relationships are built, culture is maintained, and
              long-term engagement becomes natural rather than forced.
            </p>
            <div className="flex gap-4 mt-8 flex-wrap">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                
                 <a href="https://t.me/+fmvi1BeODZk4MGI0"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full grad-flame text-[#110603] font-bold text-[0.92rem] px-6 py-3 hover:shadow-[0_10px_30px_-8px_rgba(255,77,28,0.55)] transition-shadow"
                >
                  <Send size={16}/>
                   Join on Telegram
                </a>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                
                 <a href="https://x.com/phoenixxweb3"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-bone/20 text-bone font-bold text-[0.92rem] px-6 py-3 hover:border-ember hover:text-ember transition-colors"
                >
                  Follow on 𝕏
                </a>
              </motion.div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15} className="flex justify-center">
            <div className="relative">
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255,77,28,0.15) 0%, transparent 70%)",
                }}
              />
              <Image
                src="/PhoenixLogoalt.jpg"
                alt="Phoenix Ecosystem"
                width={340}
                height={340}
                className="rounded-full relative z-10 border border-card-line"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <hr className="border-card-line" />

      {/* ── WHAT WE OFFER ── */}
      <section className="py-24">
        <div className="max-w-[1180px] mx-auto px-7">
          <ScrollReveal className="text-center max-w-[640px] mx-auto mb-14">
            <Eyebrow center><span className="text-lg">What Phoenix Offers you</span></Eyebrow>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] leading-[1.04] tracking-tight mt-4">
              Real people. Real support. Real moves.
            </h2>
            <p className="mt-4 text-ash text-[1rem] leading-relaxed">
              The community isn&apos;t a holding room. It&apos;s where things actually happen, connections get made, skills get built, and opportunities get taken.
            </p>
          </ScrollReveal>

          <ScrollReveal stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHAT_WE_OFFER.map((item) => (
              <MotionCard key={item.title}>
                <div className="text-2xl mb-4">{ICON_MAP[item.icon]}</div>
                <h3 className="font-bold text-[1.05rem]">{item.title}</h3>
                <p className="mt-2.5 text-ash text-[0.92rem] leading-relaxed">{item.desc}</p>
              </MotionCard>
            ))}
          </ScrollReveal>
        </div>
      </section>

      <hr className="border-card-line" />

      {/* ── HOW YOU MOVE THROUGH PHOENIX ── */}
      <section className="py-24">
        <div className="max-w-[1180px] mx-auto px-7">
          <ScrollReveal className="text-center max-w-[640px] mx-auto mb-14">
            <Eyebrow center><span className="text-lg">How You Move Through Phoenix</span></Eyebrow>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] leading-[1.04] tracking-tight mt-4">
              No single path. Every path leads here.
            </h2>
            <p className="mt-4 text-ash text-[1rem]">
              There is no one way into Phoenix. But every path, regardless of where it
              starts passes through the community.
            </p>
          </ScrollReveal>

          <ScrollReveal stagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FLOWS.map((f) => (
              <motion.div
                key={f.path}
                variants={revealItem}
                className="bg-card border border-card-line rounded-[18px] p-7"
              >
                <div className="text-2xl mb-4">{ICON_MAP[f.icon]}</div>
                <p className="font-mono text-[0.72rem] uppercase tracking-[0.1em] text-ember mb-4">
                  {f.path}
                </p>
                <div className="flex flex-col gap-2">
                  {f.steps.map((step, i) => (
                    <div key={step} className="flex items-center gap-2.5">
                      {i > 0 && (
                        <div className="w-full h-px bg-card-line ml-4 relative">
                          <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-ember text-[0.7rem]">
                            ↓
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                  <div className="flex flex-col gap-1.5 mt-1">
                    {f.steps.map((step, i) => (
                      <div key={step} className="flex items-center gap-2.5">
                        <span
                          className={`w-2 h-2 rounded-full shrink-0 ${
                            step === "House of Phoenix"
                              ? "bg-ember shadow-[0_0_8px_2px_rgba(255,166,43,0.5)]"
                              : "bg-ash-dim"
                          }`}
                        />
                        <span
                          className={`text-[0.88rem] ${
                            step === "House of Phoenix"
                              ? "text-ember font-semibold"
                              : "text-bone"
                          }`}
                        >
                          {step}
                        </span>
                        {i < f.steps.length - 1 && (
                          <span className="text-ash-dim text-[0.7rem] ml-auto">→</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </ScrollReveal>

          <ScrollReveal className="mt-10">
            <div className="bg-card border border-card-line rounded-[16px] p-5 flex flex-wrap items-center justify-center gap-3 text-center">
              {[
                "Any Entry Point",
                "→",
                "Phoenix Academy",
                "→",
                "House of Phoenix",
                "→",
                "Your Utility",
                "→",
                "Ecosystem Impact",
              ].map((item, i) => (
                <span
                  key={i}
                  className={
                    item === "→"
                      ? "text-ember font-bold"
                      : item === "House of Phoenix"
                      ? "font-mono text-[0.76rem] uppercase tracking-wider text-ember bg-ember/10 border border-ember/30 rounded-full px-3 py-1.5"
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

      {/* ── IMPORTANT NOTES ── */}
      <section className="py-24">
        <div className="max-w-[1180px] mx-auto px-7">
          <ScrollReveal className="text-center max-w-[640px] mx-auto mb-14">
            <Eyebrow center><span className="text-lg">Keep It Real</span></Eyebrow>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] leading-[1.04] tracking-tight mt-4">
              We don&apos;t do hype. We do work.
            </h2>
          </ScrollReveal>

          <ScrollReveal stagger className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {VALUES.map((v) => (
              <MotionCard key={v.title}>
                <h3 className="font-bold text-[1.02rem] text-ember">{v.title}</h3>
                <p className="mt-2.5 text-ash text-[0.92rem] leading-relaxed">{v.desc}</p>
              </MotionCard>
            ))}
          </ScrollReveal>
        </div>
      </section>

      <hr className="border-card-line" />

      {/* ── JOIN ── */}
      <section className="py-24 relative">
        <EmberField count={25} />
        <div className="max-w-[1180px] mx-auto px-7 relative z-10">
          <ScrollReveal className="text-center max-w-[600px] mx-auto mb-14" y={20}>
            <Image
              src="/PECO.jpg"
              alt="Phoenix Ecosystem"
              width={300}
              height={300}
              className="rounded-full mx-auto border border-card-line mb-6 object-cover"
            />
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] leading-[1.04] tracking-tight">
              Find your place in Phoenix.
            </h2>
            <p className="mt-4 text-ash text-[1.02rem] leading-relaxed">
              You don&apos;t need to have everything figured out. You just need to show up,
              stay consistent, and engage where it matters to you and the rest follows.
            </p>
          </ScrollReveal>

          <ScrollReveal stagger className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-[700px] mx-auto">
            {SOCIALS.map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                variants={revealItem}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`block bg-card rounded-[18px] p-7 border transition-all group ${
                  s.primary
                    ? "border-flame shadow-[0_0_0_1px_var(--flame),0_20px_50px_-20px_rgba(255,77,28,0.4)]"
                    : "border-card-line hover:border-ember/50"
                }`}
              >
                <div className="text-2xl mb-3">{ICON_MAP[s.icon]}</div>
                <h3 className="font-bold text-[1.05rem]">{s.label}</h3>
                <p className="mt-2 text-ash text-[0.88rem] leading-relaxed">{s.desc}</p>
                <span
                  className={`mt-5 inline-flex items-center gap-1.5 font-mono text-[0.76rem] uppercase tracking-wider font-bold transition-colors ${
                    s.primary
                      ? "text-ember"
                      : "text-ash group-hover:text-ember"
                  }`}
                >
                  {s.cta} →
                </span>
              </motion.a>
            ))}
          </ScrollReveal>

          <ScrollReveal className="mt-10 text-center">
            <p className="text-ash-dim text-[0.88rem] max-w-[480px] mx-auto">
              Already in the ecosystem?{" "}
              <Link href="/agency/join" className="text-ember hover:text-bone transition-colors">
                Apply to work with Phoenix as a creator or KOL
              </Link>{" "}
              or{" "}
              <Link href="/agency/hire" className="text-ember hover:text-bone transition-colors">
                hire Phoenix for your next campaign
              </Link>
              .
            </p>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </>
  );
}