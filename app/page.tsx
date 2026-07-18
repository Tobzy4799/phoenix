"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import EmberField from "@/components/EmberField";
import ScrollReveal, { revealItem } from "@/components/ScrollReveal";
import MotionCard from "@/components/MotionCard";
import { motion } from "framer-motion";
import Marquee from "@/components/Marquee";
import Image from "next/image"
import { Megaphone, Users, TrendingUp, GraduationCap, Palette, Globe, Zap, Gem, Handshake, House } from "lucide-react";


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
  house: <House size={22} className="text-ember" />

};
const PROBLEMS = [
  {
    title: "No Strategy",
    body: "Random posts and paid shills with zero narrative will result in noise without direction.",
    icon: "megaphone",
  },
  {
    title: "No Community",
    body: "Bought followers, empty Telegrams with no real people, and no real growth.",
    icon: "users",
  },
  {
    title: "No Execution",
    body: "Agencies that overpromise, ghost, or deliver vanity metrics that don't convert.",
    icon: "trendingup",
  },
];

const SOLUTION_POINTS = [
  "Real community infrastructure, not a vendor list",
  "African campus network spanning 40+ schools",
  "1M+ campaign views with Actual Proof of Work.",
  "27K+ X following that was built organically over 1+ year",
  "Transparent fees with no hidden markups.",
];

const ARMS = [
  { name: "Academy", desc: "Web3 education & paid certification", href: "/academy", icon: "gradcap" },
  { name: "Campus Network", desc: "40+ African campus activations", href: "/campus-network", icon: "house" },
  { name: "Community", desc: "Live talent pool feeding every arm", href: "/community", icon: "users" },
  { name: "DAO / NFT", desc: "Culture, whitelist & Web3 cooks", href: "/dao-nft", icon: "palette" },
];

const WHY = [
  { title: "Network, Not Just Services", desc: "Our community is the product with Real creators and real reach.", icon: "globe" },
  { title: "Full Transparency", desc: "KOL costs passed at cost + 25% mgmt fee which is always disclosed.", icon: "handshake" },
  { title: "African Campus Infrastructure", desc: "On-ground activations no agency can match.", icon: "zap" },
  { title: "One Year of Proof", desc: "Built before we charged a cent with existing receipts.", icon: "gem" },
];

const STEPS = [
  { n: "01", title: "Discovery Call", body: "We audit your project, goals, and community. We dont give generic proposals, you have everything is tailored." },
  { n: "02", title: "Strategy Sign-Off", body: "You approve the 30-day roadmap and deliverables before we start and you have the full scope in writing." },
  { n: "03", title: "Upfront Payment", body: "100% upfront before activation that Keeps both sides accountable with no surprises." },
  { n: "04", title: "Execution", body: "Our team activates content, KOLs, community, and campus channels as scoped." },
  { n: "05", title: "Reporting", body: "Regular performance reports with structured data. No room for ghosting, no excuses, you get your numbers and results." },
];

function Eyebrow({ children, center }: { children: React.ReactNode; center?: boolean }) {
  return (
    <span
      className={`font-mono text-xs tracking-[0.18em] uppercase text-ember font-semibold inline-flex items-center gap-2.5 ${center ? "justify-center" : ""
        }`}
    >
      <span className="w-4.5 h-px grad-flame inline-block" />
      {children}
    </span>
  );
}

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Marquee />

      <hr className="border-card-line" />
      {/* PROBLEM */}
      <section className="py-25">
        <div className="max-w-[1180px] mx-auto px-7">
          <ScrollReveal className="text-center max-w-[680px] mx-auto mb-14">
            <Eyebrow  center><span className="text-lg">The Problem</span></Eyebrow>
            <h2 className="font-display text-[clamp(2rem,4.2vw,3.1rem)] leading-[1.04] tracking-tight mt-4">
              Most Web3 projects launch loud, then disappear.
            </h2>
          </ScrollReveal>

          <ScrollReveal stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5.5">
            {PROBLEMS.map((p) => (
              <MotionCard key={p.title}>
                <div className="text-2xl mb-4">{ICON_MAP[p.icon]}</div>
                <h3 className="font-bold text-[1.15rem]">{p.title}</h3>
                <p className="mt-2.5 text-ash text-[1.02rem] leading-relaxed">{p.body}</p>
              </MotionCard>
            ))}
          </ScrollReveal>
        </div>
      </section>

      <hr className="border-card-line" />

      {/* SOLUTION */}
      <section className="py-25">
        <div className="max-w-[1180px] mx-auto px-7 grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          <ScrollReveal>
            <Eyebrow><span className="text-lg">The Solution</span></Eyebrow>
            <h2 className="font-display text-[clamp(2rem,4.2vw,3.1rem)] leading-[1.04] tracking-tight mt-4">
              Phoenix Ecosystem
            </h2>
            <p className="mt-4.5 text-[1.04rem] text-ash leading-relaxed">
              A Web3 growth agency with a live talent network, creator community, training academy,
              and campus infrastructure across Africa.
            </p>
            <motion.ul
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }}
              className="mt-7 flex flex-col gap-4 list-none"
            >
              {SOLUTION_POINTS.map((pt) => (
                <motion.li key={pt} variants={revealItem} className="flex gap-3 items-start">
                  <span className="text-ember font-bold mt-0.5">✓</span>
                  <span className="text-bone text-[0.97rem]">{pt}</span>
                </motion.li>
              ))}
            </motion.ul>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <MotionCard className="text-center !p-12">
              <div className="flex justify-center mb-6">
                {/* LOGO SLOT */}
                <Image
                  src="/PhoenixLogoalt.jpg"
                  alt="Phoenix Ecosystem"
                  width={110}
                  height={110}
                  className="rounded-full"
                />
              </div>
              <div className="h-0.5 w-15 grad-flame mx-auto mb-5 rounded" />
              <h3 className="text-[1.3rem] font-bold">Create. Earn. Grow.</h3>
              <p className="mt-3.5 text-[0.92rem] text-ash">
                Phoenix is not a marketing agency that outsources your campaign. We are your growth team.
              </p>
            </MotionCard>
          </ScrollReveal>
        </div>
      </section>

      <hr className="border-card-line" />

      {/* WHAT WE DO */}
      <section className="py-25">
        <div className="max-w-[1180px] mx-auto px-7">
          <ScrollReveal className="text-center max-w-[680px] mx-auto mb-14">
            <Eyebrow center><span className="text-lg">What We Do</span></Eyebrow>
            <h2 className="font-display text-[clamp(2rem,4.2vw,3.1rem)] leading-[1.04] tracking-tight mt-4">
              Five Arms. One Growth Engine.
            </h2>
          </ScrollReveal>

          <ScrollReveal className="max-w-[420px] mx-auto mb-7">
            <Link href="/agency" className="block">
              <MotionCard className="text-center !border-flame shadow-[0_0_0_1px_var(--flame),0_20px_50px_-20px_rgba(255,77,28,0.4)]">
                <span className="font-mono text-[0.75rem] text-ember tracking-[0.1em]">CORE ENGINE</span>
                <h3 className="text-[1.5rem] font-bold mt-2 text-ember">Agency</h3>
              </MotionCard>
            </Link>
          </ScrollReveal>

          <ScrollReveal stagger className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {ARMS.map((a) => (
              <Link href={a.href} key={a.name} className="block">
                <MotionCard>
                  <div className="text-2xl mb-3.5">{ICON_MAP[a.icon]}</div>
                  <h3 className="font-bold text-[1.05rem]">{a.name}</h3>
                  <p className="mt-2 text-[0.92rem] text-ash">{a.desc}</p>
                </MotionCard>
              </Link>
            ))}
          </ScrollReveal>

          <p className="text-center mt-10 font-mono text-[0.82rem] text-ash-dim">
           <Eyebrow>Community → Academy → Campus → Agency </Eyebrow>
          </p>
        </div>
      </section>

      <hr className="border-card-line" />

      {/* WHY PHOENIX */}
      <section className="py-25">
        <div className="max-w-[1180px] mx-auto px-7">
          <ScrollReveal className="text-center max-w-[680px] mx-auto mb-14">
            <Eyebrow center><span className="text-lg">This is Phoenix</span></Eyebrow>
            <h2 className="font-display text-[clamp(2rem,4.2vw,3.1rem)] leading-[1.04] tracking-tight mt-4">
              We don&apos;t pitch. We prove.
            </h2>
          </ScrollReveal>

          <ScrollReveal stagger className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
            <MotionCard className="text-center !border-flame/30">
              <div className="font-mono font-bold text-[2.4rem] text-bone">27K+</div>
              <h3 className="font-bold mt-1.5">Organic X Followers</h3>
              <p className="mt-1.5 text-[0.86rem] text-ash">@phoenixxweb3, built, not bought</p>
            </MotionCard>
            <MotionCard className="text-center !border-flame/30">
              <div className="font-mono font-bold text-[2.4rem] text-bone">1M+</div>
              <h3 className="font-bold mt-1.5">Campaign Views</h3>
              <p className="mt-1.5 text-[0.86rem] text-ash">Real reach. Documented receipts.</p>
            </MotionCard>
            <MotionCard className="text-center !border-flame/30">
              <div className="font-mono font-bold text-[2.4rem] text-bone">40+</div>
              <h3 className="font-bold mt-1.5">Campus Partners</h3>
              <p className="mt-1.5 text-[0.86rem] text-ash">Active on-ground presence across Africa</p>
            </MotionCard>
          </ScrollReveal>

          <ScrollReveal stagger className="grid grid-cols-1 sm:grid-cols-2 gap-7">
            {WHY.map((w) => (
              <motion.div key={w.title} variants={revealItem} className="flex gap-4">
                <span className="">{ICON_MAP[w.icon]}</span>
                <div>
                  <h3 className="font-bold">{w.title}</h3>
                  <p className="mt-1.5 text-[0.92rem] text-ash">{w.desc}</p>
                </div>
              </motion.div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      <hr className="border-card-line" />

      {/* HOW IT WORKS */}
      <section className="py-25">
        <div className="max-w-[1180px] mx-auto px-7">
          <ScrollReveal className="text-center max-w-[680px] mx-auto mb-14">
            <Eyebrow center><span className="text-lg">How it Works</span></Eyebrow>
            <h2 className="font-display text-[clamp(2rem,4.2vw,3.1rem)] leading-[1.04] tracking-tight mt-4">
              Simple, Structured, and Accountable.
            </h2>
          </ScrollReveal>

          <ScrollReveal stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4.5">
            {STEPS.map((s) => (
              <MotionCard
                key={s.n}
                className={s.n === "03" ? "!border-flame bg-gradient-to-b from-flame/10 to-card" : ""}
              >
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center font-mono font-bold text-[0.95rem] mb-4.5 ${s.n === "03" ? "grad-flame text-[#110603]" : "bg-white/5 text-ember"
                    }`}
                >
                  {s.n}
                </div>
                <h3 className="text-[1rem] font-bold">{s.title}</h3>
                <p className="mt-2 text-[0.86rem] text-ash">{s.body}</p>
              </MotionCard>
            ))}
          </ScrollReveal>
        </div>
      </section>

      <hr className="border-card-line" />

      {/* CTA */}
      <section className="py-25 relative">
        <EmberField count={25} />
        <ScrollReveal className="max-w-[1180px] mx-auto px-7 relative z-10 text-center" y={20}>
          <div className="max-w-[620px] mx-auto">
            <Image
              src="/PhoenixLogoalt.jpg"
              alt="Phoenix Ecosystem"
              width={300}
              height={300}
              className="rounded-full mx-auto"
            />
            <h2 className="font-display text-[clamp(2rem,4.2vw,3.1rem)] leading-[1.04] tracking-tight mt-7">
              Ready to grow?
            </h2>
            <p className="mt-4 text-[1.05rem] text-ash leading-relaxed">
              Let&apos;s talk about your project. No pitch, no pressure, you get clarity on how Phoenix can
              grow your community.
            </p>
            <div className="flex gap-3.5 justify-center mt-8 flex-wrap">
             
                         <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
             
                           <a href="https://calendly.com/phoenixxecosystem/30min"
                             target="_blank"
                             rel="noreferrer"
                             className="inline-flex items-center gap-2 rounded-full grad-flame text-[#110603] font-bold text-[0.92rem] px-6.5 py-3.5 hover:shadow-[0_10px_30px_-8px_rgba(255,77,28,0.55)] transition-shadow"
                           >
                             Book a Discovery Call
                           </a>
                         </motion.div>
             
                       
              
            </div>
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </>
  );
}