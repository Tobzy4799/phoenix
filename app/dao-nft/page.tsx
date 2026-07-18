"use client";

import { useState, useEffect } from "react";
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
  MessageCircle, Search, Send, Sparkles
} from "lucide-react";


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
  search: <Search size={22} className="text-ember" />

};

type Collab = {
  id: string;
  title: string;
  image_url: string;
  details: string;
  x_handle: string;
  x_link: string;
  post_link: string;
  winners_link: string;
  created_at: string;
};

/* ─── DATA ───────────────────────────────────────────────── */

const WHAT_WE_DO = [
  {
    icon: "gradcap",
    title: "NFT Education",
    desc: "Introductory and ongoing education for newcomers and collectors. No jargon, just clarity on how the NFT space actually works.",
  },
  {
    icon: "message",
    title: "NFT Discussions",
    desc: "A dedicated space inside Phoenix for NFT-focused conversations, updates, research, and ecosystem news.",
  },
  {
    icon: "handshake",
    title: "Community Collabs",
    desc: "Whitelists, raffles, giveaways, and co-promotions with NFT projects which gives Phoenix members real access to upcoming mints.",
  },
  {
    icon: "palette",
    title: "Creator Representation",
    desc: "Supporting artists, traders, and content creators operating at the intersection of NFTs, art, and Web3 culture.",
  },
  {
    icon: "globe",
    title: "Ecosystem Visibility",
    desc: "Phoenix DAO represents the broader Phoenix Ecosystem inside NFT spaces. We are credible, consistent, and community-first.",
  },
  {
    icon: "search",
    title: "Alpha & Research",
    desc: "Members share insights, research, and project updates. These keeps the community informed without the hype.",
  },
];

const STATIC_COLLABS = [
  {
    id: "auraonhypernft",
    title: "PHOENIX 🤝 AURA",
    image_url: "/nfts/auraonhypernft.jpg",
    details: "NFT collab with @AuraOnHyperNFT with whitelist raffle for the community.",
    x_handle: "@AuraOnHyperNFT",
    x_link: "https://x.com/AuraOnHyperNFT",
    post_link: "https://x.com/phoenixxweb3/status/1936432850678792642",
    winners_link: "",
    created_at: "",
  },
  {
    id: "jpegsdotcats",
    title: "PHOENIX 🤝 JPEG O' CATS",
    image_url: "/nfts/jpegsdotcats.jpg",
    details: "NFT collab with @jpegsdotcats with 5 WL spots for their upcoming mint.",
    x_handle: "@jpegsdotcats",
    x_link: "https://x.com/jpegsdotcats",
    post_link: "https://x.com/phoenixxweb3/status/1935796542918869065",
    winners_link: "https://x.com/phoenixxweb3/status/1936482336121491776",
    created_at: "",
  },
  {
    id: "ramenrumble",
    title: "PHOENIX 🤝 RAMEN RUMBLE",
    image_url: "/nfts/Ramenrumble.jpg",
    details: "NFT collab with @RamenRumblegame with WL spots for the community.",
    x_handle: "@RamenRumblegame",
    x_link: "https://x.com/RamenRumblegame",
    post_link: "https://x.com/phoenixxweb3/status/1937538101410226485",
    winners_link: "",
    created_at: "",
  },
  {
    id: "hypercubs",
    title: "PHOENIX 🤝 HYPERCUBS",
    image_url: "/nfts/hypercubs.jpg",
    details: "NFT collab with @hypercubs with WL spots for their upcoming mint.",
    x_handle: "@hypercubs",
    x_link: "https://x.com/hypercubs",
    post_link: "https://x.com/phoenixxdao/status/1937916839046078890",
    winners_link: "",
    created_at: "",
  },
  {
    id: "megaeth",
    title: "PHOENIX 🤝 MEGAETH_INTEL",
    image_url: "/nfts/megaeth.jpg",
    details: "NFT collab with @megaeth_intel with 3 GTD spots for the community.",
    x_handle: "@megaeth_intel",
    x_link: "https://x.com/megaeth_intel",
    post_link: "https://x.com/phoenixxweb3/status/1940037789405655158",
    winners_link: "",
    created_at: "",
  },
  {
    id: "nozra",
    title: "PHOENIX 🤝 NOZRA",
    image_url: "/nfts/nozra.jpg",
    details: "NFT collab with @NozraZK with 2 FCFS spots for their upcoming mint on Anoma.",
    x_handle: "@NozraZK",
    x_link: "https://x.com/NozraZK",
    post_link: "https://x.com/phoenixxweb3/status/1939771683793248361",
    winners_link: "https://x.com/phoenixxweb3/status/1940284840051696036",
    created_at: "",
  },
  {
    id: "liquidonhl",
    title: "PHOENIX 🤝 LIQUIDONHL",
    image_url: "/nfts/liquidonhl.jpg",
    details: "NFT collab with @LiquidsOnHL with 7 WL spots for their upcoming mint.",
    x_handle: "@LiquidsOnHL",
    x_link: "https://x.com/LiquidsOnHL",
    post_link: "https://x.com/phoenixxweb3/status/1940311259167261081",
    winners_link: "https://x.com/phoenixxweb3/status/1940491642919964819",
    created_at: "",
  },
  {
    id: "pawpalz",
    title: "PHOENIX 🤝 PAWPALZ",
    image_url: "/nfts/pawpalz.jpg",
    details: "NFT collab with @PawPalzHL with 15 FCFS spots for their upcoming free mint.",
    x_handle: "@PawPalzHL",
    x_link: "https://x.com/PawPalzHL",
    post_link: "https://x.com/phoenixxweb3/status/1942292884692038135",
    winners_link: "https://x.com/phoenixxweb3/status/1943007118472172025",
    created_at: "",
  },
  {
    id: "capybros",
    title: "PHOENIX 🤝 CAPYBROS",
    image_url: "/nfts/capybros1.jpg",
    details: "NFT collab with @capybros1 with 2 GTD spots for their upcoming free mint.",
    x_handle: "@capybros1",
    x_link: "https://x.com/capybros1",
    post_link: "https://x.com/phoenixxweb3/status/1943768846013272284",
    winners_link: "",
    created_at: "",
  },
  {
    id: "lucky45",
    title: "PHOENIX 🤝 LUCKY45",
    image_url: "/nfts/lucky45.jpg",
    details: "NFT collab with @Lucky45Protocol with WL spots for their upcoming mint.",
    x_handle: "@Lucky45Protocol",
    x_link: "https://x.com/Lucky45Protocol",
    post_link: "https://x.com/phoenixxweb3/status/1943965290901254426",
    winners_link: "",
    created_at: "",
  },
  {
    id: "remiko",
    title: "PHOENIX 🤝 REMIKO",
    image_url: "/nfts/remiko.jpg",
    details: "NFT collab with @RemikoNFT with 5 OG spots for their upcoming mint, a derivative of @miladymaker333.",
    x_handle: "@RemikoNFT",
    x_link: "https://x.com/RemikoNFT",
    post_link: "https://x.com/phoenixxweb3/status/1945176820434731010",
    winners_link: "",
    created_at: "",
  },
  {
    id: "gaib",
    title: "PHOENIX 🤝 GAIB",
    image_url: "/nfts/gaib.jpg",
    details: "NFT collab with @gaib_ai with 2 WL spots for their upcoming mint.",
    x_handle: "@gaib_ai",
    x_link: "https://x.com/gaib_ai",
    post_link: "https://x.com/phoenixxweb3/status/1944511531699339710",
    winners_link: "https://x.com/phoenixxweb3/status/1945563352270295546",
    created_at: "",
  },
  {
    id: "bitcoincousins",
    title: "PHOENIX 🤝 BITCOIN COUSINS",
    image_url: "/nfts/bitcoincousins.jpg",
    details: "NFT collab with @BitcoinCousins with WL raffled spots for their upcoming mint.",
    x_handle: "@BitcoinCousins",
    x_link: "https://x.com/BitcoinCousins",
    post_link: "https://x.com/phoenixxdao/status/1949569037673062655",
    winners_link: "",
    created_at: "",
  },
  {
    id: "boogaverse",
    title: "PHOENIX 🤝 BOOGAVERSE",
    image_url: "/nfts/boogaverse.jpg",
    details: "NFT collab with @Boogaversee with WL spots for their upcoming mint.",
    x_handle: "@Boogaversee",
    x_link: "https://x.com/Boogaversee",
    post_link: "https://x.com/phoenixxweb3/status/1948376199169716317",
    winners_link: "",
    created_at: "",
  },
  {
    id: "addinfofi",
    title: "PHOENIX 🤝 ADDINFOFI",
    image_url: "/nfts/bitcoincousins.jpg",
    details: "NFT collab with @add_infofi with 2 Paddy NFT GTD Whitelist Spots for their upcoming mint.",
    x_handle: "@add_infofi",
    x_link: "https://x.com/add_infofi",
    post_link: "https://x.com/phoenixxweb3/status/1952021225762415039",
    winners_link: "https://x.com/phoenixxweb3/status/1952382835873943847",
    created_at: "",
  },
  {
    id: "yuzo",
    title: "PHOENIX 🤝 YUZO",
    image_url: "/nfts/yuzo.jpg",
    details: "Teamed up with @yuzodotxyz for the Yuna Revelation pre-BRC2.0 mint which is a programmable pixel collection powered by Ordinals-staking, BRC2.0 token logic & provenance linked to the 100M inscription.",
    x_handle: "@yuzodotxyz",
    x_link: "https://x.com/yuzodotxyz",
    post_link: "https://x.com/phoenixxweb3/status/1951610717393584603",
    winners_link: "",
    created_at: "",
  },
  {
    id: "miloonchain",
    title: "PHOENIX 🤝 MiloOnChain",
    image_url: "/nfts/miloonchain.jpg",
    details: "NFT collab with @MiloOnChains with WL raffled spots for their upcoming mint.",
    x_handle: "@MiloOnChains",
    x_link: "https://x.com/MiloOnChains",
    post_link: "https://x.com/phoenixxweb3/status/1957999472757060084",
    winners_link: "",
    created_at: "",
  },
  {
    id: "blockstranding",
    title: "PHOENIX 🤝 BLOCKSTRANDING",
    image_url: "/nfts/blockstranding.jpg",
    details: "NFT collab with @blockstranding with WL raffled spots for their upcoming mint.",
    x_handle: "@blockstranding",
    x_link: "https://x.com/blockstranding",
    post_link: "https://x.com/phoenixxweb3/status/1957792513311289389",
    winners_link: "",
    created_at: "",
  },
];

/* ─── HELPERS ────────────────────────────────────────────── */

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


function CollabCard({ collab }: { collab: Collab }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
      whileHover={{ y: -5, transition: { duration: 0.22 } }}
      className="bg-card border border-card-line rounded-[18px] overflow-hidden group relative"
    >
      <div className="absolute inset-0 grad-flame-soft opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="relative w-full aspect-square overflow-hidden">
        <Image
          src={collab.image_url}
          alt={collab.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-fill transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/20 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="font-display text-[0.95rem] leading-tight text-bone">
            {collab.title}
          </h3>
        </div>
      </div>

      <div className="p-5 relative">
        <p className="text-ash text-[0.86rem] leading-relaxed mb-4">{collab.details}</p>
        <div className="flex flex-wrap items-center gap-2">

          <a href={collab.x_link}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[0.68rem] text-ash border border-card-line rounded-full px-2 py-0.5 hover:border-ember hover:text-ember transition-colors"
          >
            {collab.x_handle}
          </a>

          <a href={collab.post_link}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[0.68rem] text-ember hover:text-bone transition-colors inline-flex items-center gap-1"
          >
            View Post ↗
          </a>
          {collab.winners_link && (

            <a href={collab.winners_link}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[0.68rem] text-ash-dim hover:text-ember transition-colors inline-flex items-center gap-1"
            >
              Winners ↗
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function DiscordIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.031.056a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 13.963 13.963 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}
/* ─── PAGE ───────────────────────────────────────────────── */

export default function DaoNft() {

  const [collabs, setCollabs] = useState<Collab[]>(STATIC_COLLABS);

  useEffect(() => {
    fetch("/api/collabs")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setCollabs([...data, ...STATIC_COLLABS]);
        }
      })
      .catch(() => { });
  }, []);

  return (
    <>
      <Navbar />

      {/* ── HERO + STATS with embers rising from bottom ── */}
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
              <Eyebrow><span className="text-lg">DAO / NFT</span></Eyebrow>
              <h1 className="font-display text-[clamp(2.6rem,5.5vw,4.2rem)] leading-[1.04] tracking-tight mt-4">
                Phoenix in the{" "}
                <span className="flame-text">NFT space.</span>
              </h1>
              <p className="mt-5 text-[1.1rem] text-ash leading-relaxed md:max-w-none max-w-[580px]">
                Phoenix DAO is the NFT-focused wing of the Phoenix Ecosystem serving as a community
                hub for collectors, artists, traders, and creators operating at the
                intersection of NFTs, culture, and Web3.
              </p>
              <p className="mt-3 text-[1rem] text-ash leading-relaxed md:max-w-none max-w-[580px]">
                We don&apos;t hype projects. We educate, connect, collaborate and
                bring real access to the community through whitelist collabs and partnerships.
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
                src="/PDAOS.jpg"
                alt="Phoenix NFT"
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
              {[
                { n: `${collabs.length}+`, label: "NFT Collabs" },
                { n: "Active", label: "Status" },
                { n: "WL,OG & GTD", label: "Access for Community" },
                { n: "0", label: "Proprietary Collection" },
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

        {/* Bottom fire glow */}
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

      {/* ── WHAT WE ARE ── */}
      <section className="py-24">
        <div className="max-w-[1180px] mx-auto px-7 grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          {/* Text left */}
          <ScrollReveal>
            <Eyebrow><span className="text-lg">What Phoenix DAO Is</span></Eyebrow>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] leading-[1.04] tracking-tight mt-4">
              Community. Education. Access.
            </h2>
            <p className="mt-4 text-ash text-[1.02rem] leading-relaxed">
              Phoenix DAO is not a collection, it&apos;s a presence and a credible,
              non-speculative foothold in the NFT space that delivers real value to
              the community through education, conversation, and genuine partnerships.
            </p>
            <p className="mt-3 text-ash text-[1.02rem] leading-relaxed">
              We welcome NFT newcomers, connect collectors and artists, and give the
              Phoenix community real access to upcoming mints through whitelist collabs
              and giveaways with documented receipts for every one.
            </p>
          </ScrollReveal>

          {/* Icon right */}
          <ScrollReveal delay={0.15} className="flex justify-center">
            <div className="relative">
              <div
                className="absolute inset-0 rounded-[24px]"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255,77,28,0.15) 0%, transparent 70%)",
                }}
              />
              <Image
                src="/PNFTR.jpg"
                alt="Phoenix NFT Icon"
                width={320}
                height={320}
                className="rounded-[24px] relative z-10 border border-card-line"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <hr className="border-card-line" />

      {/* ── WHAT WE DO ── */}
      <section className="py-24">
        <div className="max-w-[1180px] mx-auto px-7">
          <ScrollReveal className="text-center max-w-[640px] mx-auto mb-14">
            <Eyebrow center><span className="text-lg">What Phoenix DAO Does</span></Eyebrow>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] leading-[1.04] tracking-tight mt-4">
              Six ways we show up in the NFT space.
            </h2>
          </ScrollReveal>

          <ScrollReveal stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHAT_WE_DO.map((item) => (
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

      {/* ── NFT COLLABS ── */}
      <section className="py-24">
        <div className="max-w-[1180px] mx-auto px-7">
          <ScrollReveal className="text-center max-w-[640px] mx-auto mb-6">
            <Eyebrow center><span className="text-lg">NFT Collabs</span></Eyebrow>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] leading-[1.04] tracking-tight mt-4">
              {collabs.length}+ collabs and counting.
            </h2>
            <p className="mt-4 text-ash text-[1rem] leading-relaxed">
              Every collab is a real partnership, from whitelists to raffle spots, and
              access delivered directly to the Phoenix community. No fake giveaways, and
              no bot farms.
            </p>
          </ScrollReveal>

          <ScrollReveal className="flex justify-center mb-12">
            <div className="inline-flex items-center gap-3 bg-card border border-ember/30 rounded-full px-5 py-2.5">
              <span className="w-2 h-2 rounded-full bg-ember shadow-[0_0_8px_2px_rgba(255,166,43,0.5)]" />
              <span className="font-mono text-[0.76rem] uppercase tracking-wider text-ember">
                {collabs.length} documented collabs which are updated as new ones land
              </span>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {collabs.map((collab) => (
              <CollabCard key={collab.id} collab={collab} />
            ))}
          </div>
        </div>
      </section>

      <hr className="border-card-line" />

      {/* ── IMPORTANT DISCLAIMER ── */}
      <section className="py-16">
        <div className="max-w-[1180px] mx-auto px-7">
          <ScrollReveal>
            <div className="bg-card border border-card-line rounded-[18px] p-8 max-w-[800px] mx-auto">
              <h3 className="font-bold text-[1.05rem] text-ember mb-4">
                Important: What Phoenix DAO Is Not
              </h3>
              <div className="flex flex-col gap-3">
                {[
                  "Phoenix DAO does not operate as an NFT collection and does not currently launch or manage a proprietary NFT project.",
                  "No Phoenix DAO collection or proprietary NFT product is live or confirmed.",
                  "Phoenix DAO contributes cultural depth, not financial speculation.",
                  "Any future NFT initiative will be clearly labeled as exploratory before any announcement.",
                ].map((note) => (
                  <div key={note} className="flex gap-3 items-start">
                    <span className="text-ember font-bold mt-0.5 shrink-0">→</span>
                    <span className="text-ash text-[0.92rem] leading-relaxed">{note}</span>
                  </div>
                ))}
              </div>
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
              src="/PNFTR.jpg"
              alt="Phoenix NFT"
              width={300}
              height={300}
              className="rounded-[16px] mx-auto border border-card-line mb-6"
            />
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] leading-[1.04] tracking-tight">
              Want in on the next collab?
            </h2>
            <p className="mt-4 text-ash text-[1.02rem] leading-relaxed">
              Every whitelist, raffle, and NFT opportunity goes to the community first.
              Join Phoenix to be in the room when they drop.
            </p>
            <div className="flex gap-4 justify-center mt-8 flex-wrap">
               <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>

                <a href="https://discord.gg/J9BPKHAHp"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full grad-flame text-[#110603] font-bold text-[0.92rem] px-7 py-3.5 hover:shadow-[0_10px_30px_-8px_rgba(255,77,28,0.55)] transition-shadow"
                >
                  <DiscordIcon size={18} />
                  Join  Discord 
                </a>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>

                <a href="https://t.me/+fmvi1BeODZk4MGI0"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full grad-flame text-[#110603] font-bold text-[0.92rem] px-7 py-3.5 hover:shadow-[0_10px_30px_-8px_rgba(255,77,28,0.55)] transition-shadow"
                >
                  <Send size={16} />
                  Join the Community
                </a>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/community"
                  className="inline-flex items-center gap-2 rounded-full border border-bone/20 text-bone font-bold text-[0.92rem] px-7 py-3.5 hover:border-ember hover:text-ember transition-colors"
                >
                  <Sparkles size={16} />
                  Explore the Ecosystem
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