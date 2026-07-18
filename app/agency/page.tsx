"use client";

import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal, { revealItem } from "@/components/ScrollReveal";
import MotionCard from "@/components/MotionCard";
import EmberField from "@/components/EmberField";
import { motion } from "framer-motion";
import {
   TrendingUp,  
   Palette, 
   Globe, 
   Zap, 
   Gem, 
   Handshake, 
   House, 
   MessageCircle, Clock, Send, Sparkles, Book, Flame, Target, Pencil, Sprout,  Mic, Mic2, Rocket } from "lucide-react";

   const ICON_MAP: Record<string, React.ReactNode> = {
  handshake: <Handshake size={22} className="text-ember" />,
  trendingup: <TrendingUp size={22} className="text-ember" />,
  palette: <Palette size={22} className="text-ember" />,
  globe: <Globe size={22} className="text-ember" />,
  zap: <Zap size={22} className="text-ember" />,
  gem: <Gem size={22} className="text-ember" />,
  house: <House size={22} className="text-ember" />,
  message: <MessageCircle size={22} className="text-ember" />,
  clock: <Clock size={22} className="text-ember" />,
  book: <Book size={22} className="text-ember" />,
  flame: <Flame size={22} className="text-ember" />,
  target: <Target size={22} className="text-ember" />,
  send: <Send size={22} className="text-ember" />,
  sprout: <Sprout size={22} className="text-ember" />,
  pencil: <Pencil size={22} className="text-ember" />,
  mic: <Mic size={22} className="text-ember" />,
  mic2: <Mic2 size={22} className="text-ember" />,
  rocket: <Rocket size={22} className="text-ember" />

};

const SERVICES = [
  {
    icon: "mic2",
    title: "KOL Activations",
    desc: "We tap into a vetted network of Web3 key opinion leaders who actually move audiences and not accounts with bought followers. Every activation is documented with receipts.",
  },
  {
    icon: "pencil",
    title: "Content & Narrative Strategy",
    desc: "Consistent, on-brand X content, threads, and long-form that builds a project's voice over time, not just for launch week.",
  },
  {
    icon: "message",
    title: "Community Management",
    desc: "Discord and Telegram setup, moderation, and ongoing engagement. Real community ops, not just pinned announcements.",
  },
  {
    icon: "house",
    title: "Campus Activations",
    desc: "On-ground events and ambassador programs across 40+ African universities. The kind of grassroots reach no ad budget can replicate.",
  },
  {
    icon: "mic",
    title: "Spaces & AMAs",
    desc: "Hosted and co-hosted X Spaces and AMAs with real attendees, structured Q&A, and post-session recap content.",
  },
  {
    icon: "trendingup",
    title: "Performance Reporting",
    desc: "Every campaign closes with a transparent report on  views, reach, wallet signups, community growth. Data you can actually show your investors.",
  },
];

const TIERS = [
  {
    name: "Discovery",
    price: "$500",
    period: "one-time",
    tag: null,
    features: [
      "7-day community audit",
      "1 KOL post activation",
      "1 Space or AMA",
      "Strategy & recommendations report",
    ],
  },
  {
    name: "Spark",
    price: "$1,500",
    period: "/month",
    tag: null,
    features: [
      "X content (3×/week)",
      "Telegram/Discord setup",
      "3 KOL activations/mo",
      "1 Space or AMA/mo",
      "Monthly performance report",
    ],
  },
  {
    name: "Blaze",
    price: "$3,000",
    period: "/month",
    tag: "Most Popular",
    features: [
      "Everything in Spark",
      "8 KOL activations/mo",
      "Creator activations",
      "2 Spaces or AMAs/mo",
      "Bi-weekly strategy call",
    ],
  },
  {
    name: "Inferno",
    price: "$5,000",
    period: "/month",
    tag: null,
    features: [
      "Everything in Blaze",
      "15 KOL activations/mo",
      "Full ambassador program",
      "Dedicated growth manager",
      "Weekly strategy sessions",
    ],
  },
];

const ADDONS = [
  { name: "Campus Activation", unit: "per school", price: "$$" },
  { name: "KOL Campaign (5 KOLs)", unit: "standalone", price: "$$" },
  { name: "Community Setup", unit: "one-time", price: "$$" },
  { name: "Single Space or AMA", unit: "one-time", price: "$$" },
  { name: "Talent Placement", unit: "per role", price: "$$" },
  { name: "Creator Campaign", unit: "per campaign", price: "$$" },
];


const CASE_STUDIES = [
  {
    id: "blindboy",
    project: "BlindBoy",
    date: "May 30, 2025",
    xHandle: "",
    xLink: "",
    postLink: "https://x.com/_lexkhalifa/status/1928526992615301553",
    contribution:
      "Hosted an AMA for BlindBoy with organic listeners, 1.4K people tuned in within a one-hour session.",
    stats: [
      { label: "Post Views", value: "7.9K" },
      { label: "Comments", value: "155" },
      { label: "Live Listeners", value: "1.4K" },
    ],
    image: "/Blindboy.jpg",
  },
  {
    id: "prizmoai",
    project: "PrizmoAI",
    date: "August 16, 2025",
    xHandle: "",
    xLink: "",
    postLink: "",
    contribution:
      "Ran an affiliate program for PrizmoAI and achieved over 570 referrals.",
    stats: [
      { label: "Post Views", value: "16K" },
      { label: "Comments", value: "121" },
      { label: "Referrals", value: "570+" },
    ],
    image:"/Prizmo.jpg",
  },
  {
    id: "coincola",
    project: "CoinCola",
    date: "May 14, 2025",
    xHandle: "",
    xLink: "",
    postLink: "",
    contribution:
      "Onboarded 780 new members to the CoinCola Telegram community with over 4K signups total.",
    stats: [
      { label: "Post Views", value: "182.2K" },
      { label: "Comments", value: "1.8K" },
      { label: "TG Members", value: "780+" },
      { label: "Signups", value: "4K+" },
    ],
    image: "/Coincola.jpg",
  },
  {
    id: "bybit",
    project: "Bybit",
    date: "May 21, 2025",
    xHandle: "",
    xLink: "",
    postLink: "",
    contribution:
      "Referred members, grew their trading volume, and created a post that went viral.",
    stats: [
      { label: "Post Views", value: "27.7K" },
      { label: "Comments", value: "177" },
    ],
    image: "/Bybit.jpg",
  },
  {
    id: "minibags",
    project: "MiniBags",
    date: "May 11, 2025",
    xHandle: "",
    xLink: "",
    postLink: "",
    contribution:
      "Hosted an AMA for MiniBags with 809 scheduled listeners, 271 live attendees, and 2.5K total tuned in within a one-hour session.",
    stats: [
      { label: "Post Views", value: "12K" },
      { label: "Comments", value: "221" },
      { label: "Scheduled", value: "809" },
      { label: "Total Tuned In", value: "2.5K" },
    ],
    image: "/Minibags.jpg",
  },
];

const SPACES = [
  {
    id: "interstableai",
    topic: "AMA with Interstable_Ai",
    image: "/events/interstableaiAMA.jpg",
    link: "https://x.com/phoenixxweb3/status/1943575913452421309",
  },
  {
    id: "ileafrica",
    topic: "AMA with ILE AFRICA",
    image: "/events/ileafricaAMA.jpg",
    link: "https://x.com/phoenixxweb3/status/1942128209023119468",
  },
  {
    id: "middlemint",
    topic: "AMA with @Middlemint0",
    image: "/events/middlemintAMA.jpg",
    link: "https://x.com/phoenixxweb3/status/1942831157076275643",
  },
  {
    id: "inductionspace",
    topic: "HOUSE WARS || KEEPERS & MANAGER INDUCTION 🐦‍🔥",
    image: "/events/inductionspace.jpg",
    link: "https://x.com/phoenixxweb3/status/1936863255688839186",
  },
  {
    id: "housewars1",
    topic: "HOUSE WARS || DAY 1: HOW WELL DO YOU KNOW WEB3?",
    image: "/events/housewars1.jpg",
    link: "https://x.com/phoenixxweb3/status/1937219360344420516",
  },
  {
    id: "housewars2",
    topic: "HOUSE WARS || DAY 1: HOW WELL DO YOU KNOW WEB3? CONT'D",
    image: "/events/housewars2.jpg",
    link: "https://x.com/phoenixxweb3/status/1937240055413887378",
  },
];


const WHY_PROJECTS = [
  "We don't outsource your campaign to a random freelancer network. Our community IS the execution team.",
  "Every KOL cost is passed at cost + a transparent 25% management fee. You always know what you're paying for.",
  "We've been building in public for over a year before charging a cent. The receipts exist.",
  "Upfront payment structure keeps both sides accountable therefore no ghosting and no scope creep.",
];

const WHY_CREATORS = [
  "Get matched with real paid campaigns from vetted Web3 projects, not unpaid exposure gigs.",
  "Training through Phoenix Academy means you get better briefs, better rates, and repeat work.",
  "Join a community of 27K+ organic followers and hundreds of active creators across Africa.",
  "Campus Leads, Community Managers, Content Writers, KOLs, there's a role that fits your strengths.",
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


function CaseStudyCard({ cs }: { cs: (typeof CASE_STUDIES)[0] }) {
  return (
    <motion.div
      variants={revealItem}
      whileHover={{ y: -5, transition: { duration: 0.22 } }}
      className="bg-card border border-card-line rounded-[18px] overflow-hidden group relative"
    >
      <div className="absolute inset-0 grad-flame-soft opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="relative w-full aspect-video overflow-hidden">
        <Image
          src={cs.image}
          alt={`${cs.project} case study`}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-6 relative">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <h3 className="font-display text-[1.2rem]">{cs.project}</h3>
            <p className="font-mono text-[0.72rem] text-ash-dim mt-0.5">{cs.date}</p>
          </div>

          <a href={cs.xLink !== "" ? cs.xLink : "https://x.com"}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[0.72rem] text-ash border border-card-line rounded-full px-2.5 py-1 hover:border-ember hover:text-ember transition-colors shrink-0"
          >
            {cs.xHandle}
          </a>
        </div>

        <p className="text-ash text-[0.9rem] leading-relaxed mb-5">{cs.contribution}</p>

        <div className="grid grid-cols-2 gap-2.5">
          {cs.stats.map((s) => (
            <div
              key={s.label}
              className="bg-ink/60 border border-card-line rounded-[10px] px-3 py-2.5 text-center"
            >
              <div className="font-mono font-bold text-[1.1rem] text-bone">{s.value}</div>
              <div className="font-mono text-[0.65rem] text-ash-dim uppercase tracking-wider mt-0.5">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {cs.postLink !== "" && (

          <a href={cs.postLink}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 font-mono text-[0.74rem] text-ember hover:text-bone transition-colors"
          >
            View Post ↗
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function Agency() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="relative pt-20 pb-24 overflow-hidden">
        <EmberField count={35} />
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
        <div className="max-w-[1180px] mx-auto px-7 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            
          >
            <Eyebrow><span className="text-lg">Agency</span></Eyebrow>
            <h1 className="font-display text-[clamp(2.6rem,5.5vw,4.2rem)] leading-[1.04] tracking-tight mt-4">
              Your project deserves a{" "}
              <span className="flame-text">growth team</span>,
              <br />
              not a vendor list.
            </h1>
            <p className="mt-6 text-[1.1rem] text-ash leading-relaxed max-w-[600px]">
              Phoenix Agency is the operational core of the Phoenix Ecosystem with a full-service
              Web3 growth engine combining KOL campaigns, community infrastructure, campus
              reach, and content strategy into one accountable, upfront-paid package.
            </p>
            <div className="flex gap-4 mt-10 flex-wrap">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/agency/hire"
                  className="inline-flex items-center gap-2 rounded-full grad-flame text-[#110603] font-bold text-[0.92rem] px-7 py-3.5 hover:shadow-[0_10px_30px_-8px_rgba(255,77,28,0.55)] transition-shadow"
                >
                  <Rocket size={16}/> Hire Phoenix for Your Campaign
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/agency/join"
                  className="inline-flex items-center gap-2 rounded-full border border-bone/20 text-bone font-bold text-[0.92rem] px-7 py-3.5 hover:border-ember hover:text-ember transition-colors"
                >
                  <Sparkles size={16}/> Join as a Creator / KOL
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Banner image */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="mt-12"
          >
            <div className="rounded-[20px] overflow-hidden border border-card-line shadow-[0_24px_80px_-24px_rgba(255,77,28,0.25)] md:max-w-[72%] mx-auto">
              <Image
                src="/PAGS.jpg"
                alt="Phoenix Agency"
                width={1400}
                height={400}
                className="w-full object-cover md:max-h-[220px]"
                priority
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="flex gap-10 mt-16 flex-wrap"
          >
            {[
              { n: "27K+", l: "Organic X Followers" },
              { n: "1M+", l: "Campaign Views" },
              { n: "40+", l: "Campus Partners" },
              { n: "100%", l: "Upfront. Always." },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-mono font-bold text-[1.9rem] text-bone tracking-tight">{s.n}</div>
                <div className="font-mono text-[0.75rem] text-ash-dim uppercase tracking-wider mt-1">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <hr className="border-card-line" />

      {/* WHAT WE DO */}
      <section className="py-24">
        <div className="max-w-[1180px] mx-auto px-7">
          <ScrollReveal className="max-w-[640px] mb-14">
            <Eyebrow><span className="text-lg">What We Do</span></Eyebrow>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] leading-[1.04] tracking-tight mt-4">
              Six services. One coordinated push.
            </h2>
            <p className="mt-4 text-ash text-[1.02rem] leading-relaxed">
              Most agencies pick one lane. Phoenix runs all of them in parallel, because
              sustainable Web3 growth does not come from a single tweet thread or one AMA.
            </p>
          </ScrollReveal>

          <ScrollReveal stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s) => (
              <MotionCard key={s.title}>
                <div className="text-2xl mb-4">{ICON_MAP[s.icon]}</div>
                <h3 className="font-bold text-[1.05rem]">{s.title}</h3>
                <p className="mt-2.5 text-ash text-[0.93rem] leading-relaxed">{s.desc}</p>
              </MotionCard>
            ))}
          </ScrollReveal>
        </div>
      </section>

      <hr className="border-card-line" />

      {/* WHO IT'S FOR */}
      <section className="py-24">
        <div className="max-w-[1180px] mx-auto px-7">
          <ScrollReveal className="text-center max-w-[640px] mx-auto mb-14">
            <Eyebrow center><span className="text-lg">Who It&apos;s For</span></Eyebrow>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] leading-[1.04] tracking-tight mt-4">
              Two doors. Both lead somewhere real.
            </h2>
          </ScrollReveal>

          <ScrollReveal stagger className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              variants={revealItem}
              className="bg-card border border-card-line rounded-[20px] p-8 relative overflow-hidden group"
            >
              <div className="absolute inset-0 grad-flame-soft opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-flame/30 text-flame font-mono text-[0.7rem] tracking-wider uppercase mb-5">
                  <Rocket size={16}/> For Projects
                </div>
                <h3 className="font-display text-[1.5rem] leading-tight">
                  You&apos;re building something real. We help the world see it.
                </h3>
                <p className="mt-4 text-ash text-[0.95rem] leading-relaxed">
                  Whether you&apos;re pre-launch, post-TGE, or trying to reignite momentum, Phoenix
                  Agency plugs in as your dedicated growth team. There is neither recycled playbooks nor vanity
                  metrics. Just a documented, accountable campaign built around where your project
                  actually is right now.
                </p>
                <ul className="mt-6 flex flex-col gap-3 list-none">
                  {WHY_PROJECTS.map((pt) => (
                    <li key={pt} className="flex gap-3 items-start text-[0.9rem]">
                      <span className="text-ember font-bold mt-0.5 shrink-0">✓</span>
                      <span className="text-bone">{pt}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/agency/hire"
                  className="inline-flex items-center gap-2 mt-8 rounded-full grad-flame text-[#110603] font-bold text-[0.88rem] px-6 py-3 hover:shadow-[0_10px_30px_-8px_rgba(255,77,28,0.55)] transition-shadow"
                >
                  Hire Phoenix for Your Campaign →
                </Link>
              </div>
            </motion.div>

            <motion.div
              variants={revealItem}
              className="bg-card border border-card-line rounded-[20px] p-8 relative overflow-hidden group"
            >
              <div className="absolute inset-0 grad-flame-soft opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-ember/30 text-ember font-mono text-[0.7rem] tracking-wider uppercase mb-5">
                  <Sparkles size={16}/> For Creators & KOLs
                </div>
                <h3 className="font-display text-[1.5rem] leading-tight">
                  You have an audience. We&apos;ll help you monetise it in Web3.
                </h3>
                <p className="mt-4 text-ash text-[0.95rem] leading-relaxed">
                  Phoenix isn&apos;t looking for people with the biggest numbers, we&apos;re looking for
                  people with real communities. If you can write, present, manage, or show up
                  consistently, there&apos;s paid work in this ecosystem with your name on it.
                </p>
                <ul className="mt-6 flex flex-col gap-3 list-none">
                  {WHY_CREATORS.map((pt) => (
                    <li key={pt} className="flex gap-3 items-start text-[0.9rem]">
                      <span className="text-ember font-bold mt-0.5 shrink-0">✓</span>
                      <span className="text-bone">{pt}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/agency/join"
                  className="inline-flex items-center gap-2 mt-8 rounded-full border border-ember/40 text-ember font-bold text-[0.88rem] px-6 py-3 hover:border-ember hover:bg-ember/5 transition-all"
                >
                  Join as a Creator / KOL →
                </Link>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      <hr className="border-card-line" />

      {/* PRICING */}
      <section className="">
        <div className="max-w-[1180px] mx-auto px-7">
       

          {/* Add-ons */}
          <ScrollReveal className="mt-16">
            <div className="text-center mb-8">
              <Eyebrow center>Add-On Services</Eyebrow>
              <p className="mt-3 text-ash text-[0.95rem]">
                Standalone power-ups for any campaign.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ADDONS.map((a) => (
                <div
                  key={a.name}
                  className="bg-card border border-card-line rounded-[14px] px-6 py-4 flex items-center justify-between"
                >
                  <div>
                    <p className="font-semibold text-[0.95rem] text-bone">{a.name}</p>
                    <p className="text-[0.78rem] text-ash-dim mt-0.5">{a.unit}</p>
                  </div>
                  <span className="font-mono font-bold text-[1.2rem] text-ember">{a.price}</span>
                </div>
              ))}
            </div>
            <p className="text-center mt-6 text-[0.84rem] text-ash-dim">
              All campaigns include a transparent 25% management fee on KOL costs with no hidden
              markups, ever.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <hr className="border-card-line" />

  <section className="py-24">
        <div className="max-w-[1180px] mx-auto px-7">
          <ScrollReveal className="text-center max-w-[640px] mx-auto mb-14">
            <Eyebrow center><span className="text-lg">Campaign Receipts</span></Eyebrow>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] leading-[1.04] tracking-tight mt-4">
              Real work. Documented results.
            </h2>
            <p className="mt-4 text-ash text-[1rem] leading-relaxed">
              These aren&apos;t pitches, they&apos;re receipts. Here&apos;s a selection of
              campaigns and contributions Phoenix has delivered for partner projects.
            </p>
          </ScrollReveal>

          <ScrollReveal
            stagger
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {CASE_STUDIES.map((cs) => (
              <CaseStudyCard key={cs.id} cs={cs} />
            ))}
          </ScrollReveal>

          <ScrollReveal className="mt-14">
            <div className="bg-card border border-card-line rounded-[18px] p-8">
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-ember mb-6 text-center">
                Across all campaigns
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5 text-center">
                {[
                  { n: "600K+", label: "Total Post Views" },
                  { n: "2.5K+", label: "Total Comments" },
                  { n: "5K+", label: "Members Onboarded" },
                  { n: "570+", label: "Referrals Generated" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="font-mono font-bold text-[1.9rem] tracking-tight flame-text">
                      {s.n}
                    </div>
                    <div className="font-mono text-[0.72rem] text-ash-dim uppercase tracking-wider mt-1">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <hr className="border-card-line" />


      {/* ── SPACES HOSTED ── */}
      <section className="py-24">
        <div className="max-w-[1180px] mx-auto px-7">
          <ScrollReveal className="text-center max-w-[640px] mx-auto mb-14">
            <Eyebrow center><span className="text-lg">Spaces Hosted</span></Eyebrow>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] leading-[1.04] tracking-tight mt-4">
              In the room. On the mic.
            </h2>
            <p className="mt-4 text-ash text-[1rem] leading-relaxed">
              From AMAs with partner projects to internal community events. Phoenix
              shows up consistently on X Spaces, bringing real conversations to real
              audiences.
            </p>
          </ScrollReveal>

          <ScrollReveal
            stagger
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {SPACES.map((space) => (
              <motion.a
                key={space.id}
                href={space.link}
                target="_blank"
                rel="noreferrer"
                variants={revealItem}
                whileHover={{ y: -5, transition: { duration: 0.22 } }}
                className="block bg-card border border-card-line rounded-[18px] overflow-hidden group relative"
              >
                <div className="absolute inset-0 grad-flame-soft opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Image */}
                <div className="relative w-full aspect-video overflow-hidden">
                  <Image
                    src={space.image}
                    alt={space.topic}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-fill transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-5 relative">
                  <div className="flex items-start gap-2 mb-3">
                    <span className="text-ember shrink-0 mt-0.5"><Mic size={16}/></span>
                    <h3 className="font-bold text-[0.95rem] text-bone leading-snug">
                      {space.topic}
                    </h3>
                  </div>
                  <span className="font-mono text-[0.72rem] text-ember hover:text-bone transition-colors inline-flex items-center gap-1">
                    View Space ↗
                  </span>
                </div>
              </motion.a>
            ))}
          </ScrollReveal>
        </div>
      </section>

   <hr className="border-card-line" />

      {/* BOTTOM CTA */}
      <section className="py-24 relative">
        <EmberField count={26} />
        <ScrollReveal
          className="max-w-[1180px] mx-auto px-7 relative z-10 text-center"
          y={20}
        >
          <div className="max-w-[600px] mx-auto">
            <Image
              src="/PhoenixLogoalt.jpg"
              alt="Phoenix Ecosystem"
              width={300}
              height={300}
              className="rounded-full mx-auto"
            />
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] leading-[1.04] tracking-tight mt-6">
              Ready to make some noise?
            </h2>
            <p className="mt-4 text-ash text-[1.02rem] leading-relaxed">
              Tell us about your project or your audience and we&apos;ll figure out exactly where
              you fit.
            </p>
            <div className="flex gap-4 justify-center mt-8 flex-wrap">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/agency/hire"
                  className="inline-flex items-center gap-2 rounded-full grad-flame text-[#110603] font-bold text-[0.92rem] px-7 py-3.5 hover:shadow-[0_10px_30px_-8px_rgba(255,77,28,0.55)] transition-shadow"
                >
                  <Rocket size={16}/> Hire Phoenix for Your Campaign
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/agency/join"
                  className="inline-flex items-center gap-2 rounded-full border border-bone/20 text-bone font-bold text-[0.92rem] px-7 py-3.5 hover:border-ember hover:text-ember transition-colors"
                >
                  <Sparkles size={16}/> Join as a Creator / KOL
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