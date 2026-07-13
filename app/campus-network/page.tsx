"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EmberField from "@/components/EmberField";
import ScrollReveal, { revealItem } from "@/components/ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
   
   Gem, 
   Flame, Target, MapPin, Mic } from "lucide-react";

/* ─── DATA ───────────────────────────────────────────────── */

const EVENTS = [
  {
    id: "axioflow",
    name: "Blockchain & Web3 Adoption Summit",
    edition: "Lautech Edition",
    date: "May 9, 2026",
    time: "10:00 AM",
    location: "The Assembly By Ennovate Lab, Ogbomoso, Oyo State, Nigeria",
    theme: "Support systems for builders, founders, and projects looking to scale",
    sponsors: ["@phoenixxweb3", "@axioflo"],
    sponsorLinks: ["https://x.com/phoenixxweb3", "https://x.com/axioflo"],
    description:
      "A summit focused on empowering builders and accelerating the growth of Web3 projects, especially in emerging markets. Through strategic support, community-driven initiatives, and a focus on real-world impact, Phoenix and Axioflow brought together founders and builders to turn bold ideas into scalable solutions — creating opportunities, driving adoption, and building a future where innovation is accessible to all.",
    banner: "/events/axioflow-banner.jpg",
    galleryCount: 4,
    galleryPrefix: "/events/axioflow",
  },
  {
    id: "cwallet",
    name: "Web3 Startup with CwalletOfficial",
    edition: "Lautech Edition",
    date: "July 5, 2025",
    time: "10:00 AM",
    location: "SQI College of Technology, Ogbomoso, Oyo State, Nigeria",
    theme: "Navigating your career journey in Web3",
    sponsors: ["@phoenix_campus", "@CwalletOfficial", "@phoenixxweb3"],
    sponsorLinks: [
      "https://x.com/phoenixxweb3",
      "https://x.com/CwalletOfficial",
      "https://x.com/phoenixxweb3",
    ],
    description:
      "A campus-focused Web3 career event designed to help students understand what a career in Web3 actually looks like ranging from content creation and community building to trading, development, and founding. Phoenix Campus and CwalletOfficial brought real practitioners to the room, giving students a clear, honest map of how to enter and grow in the Web3 space from where they are right now.",
    banner: "/events/cwallet-banner.jpg",
    galleryCount: 11,
    galleryPrefix: "/events/cwallet",
  },
  {
    id: "nxk",
    name: "Nigeria × Kenya Campus Connect",
    edition: "",
    date: "July 8, 2025",
    time: "9:00 AM",
    location: "Kenya",
    theme: "Web3 onboarding and how to go about your career in Web3",
    sponsors: ["@phoenixxweb3"],
    sponsorLinks: ["https://x.com/phoenixxweb3"],
    description:
      "A cross-border campus connect bringing together students from Nigeria and Kenya around a shared goal, understanding Web3 and charting a real career path within it. The session focused on demystifying blockchain, walking through practical onboarding steps, and showing students across two countries how the Phoenix Ecosystem can serve as their launch point into Web3 regardless of where they're starting from.",
    banner: "/events/nxk-banner.jpg",
    galleryCount: 3,
    galleryPrefix: "/events/nxk",
  },
  {
    id: "akwa",
    name: "Web3 Campus Onboarding",
    edition: "Akwa Ibom State College of Nursing Sciences",
    date: "May 24, 2025",
    time: "10:00 AM - 12:00 PM",
    location: "School Auditorium, Akwa Ibom State College of Nursing Sciences Ikot Ekpene Campus ",
    theme: "Web3 onboarding",
    sponsors: ["@phoenixxweb3"],
    sponsorLinks: ["https://x.com/phoenixxweb3"],
    description:
      "A campus connect bringing together students in the school around a shared goal, understanding Web3 and charting a real career path within it. The session focused on what web3 is, how how to navigate everything about blockchain technology.",
    banner: "/events/akwa-banner.jpg",
    galleryCount: 4,
    galleryPrefix: "/events/akwa",
  },
];


const STATS = [
  { n: "40+", label: "Campus Partners" },
  { n: "3", label: "IRL Events" },
  { n: "2", label: "Countries" },
  { n: "Active", label: "Status" },
];

const VALUE_POINTS = [
  "Creates an early-stage talent pipeline directly from African universities",
  "Anchors Phoenix within student culture before members enter the workforce",
  "Introduces Web3 concepts in familiar, campus-native environments",
  "Routes students into Phoenix Academy and broader ecosystem utilities",
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

function EventGallery({
  prefix,
  count,
  eventId,
}: {
  prefix: string;
  count: number;
  eventId: string;
}) {
  const images = Array.from({ length: count }, (_, i) => ({
    src: `${prefix}-${i + 1}.jpeg`,
    alt: `${eventId} event photo ${i + 1}`,
  }));

  if (count <= 3) {
    return (
      <div className="grid grid-cols-3 gap-3 mt-6">
        {images.map((img, i) => (
          <div key={i} className="relative rounded-[12px] overflow-hidden aspect-square">
            <Image src={img.src} alt={img.alt} fill className="object-cover" />
          </div>
        ))}
      </div>
    );
  }

  if (count === 4) {
    return (
      <div className="grid grid-cols-2 gap-3 mt-6">
        {images.map((img, i) => (
          <div key={i} className="relative rounded-[12px] overflow-hidden aspect-video">
            <Image src={img.src} alt={img.alt} fill className="object-cover" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-6 flex flex-col gap-3">
      <div className="relative rounded-[12px] overflow-hidden w-full aspect-video">
        <Image src={images[0].src} alt={images[0].alt} fill className="object-cover" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {images.slice(1).map((img, i) => (
          <div key={i} className="relative rounded-[12px] overflow-hidden aspect-square">
            <Image src={img.src} alt={img.alt} fill className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}

function EventCard({ event }: { event: (typeof EVENTS)[0] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      variants={revealItem}
      className="bg-card border border-card-line rounded-[20px] overflow-hidden"
    >
      <div className="relative w-full aspect-[16/6] overflow-hidden bg-[#1a0f08]">
        <Image
          src={event.banner}
          alt={`${event.name} banner`}
          fill
          className="object-fill"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent pointer-events-none" />
        <div className="absolute bottom-1 left-0">
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.1em] text-ember bg-ink/70 backdrop-blur-sm px-3 py-1.5 rounded-full border border-ember/20">
            {event.date} · {event.time}
          </span>
        </div>
      </div>

      <div className="p-6 md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div>
            <h3 className="font-display text-[1.4rem] leading-tight">{event.name}</h3>
            {event.edition && (
              <p className="text-ember font-mono text-[0.78rem] mt-1">{event.edition}</p>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {event.sponsors.map((s, i) => (

              <a key={String(i)}
                href={event.sponsorLinks[i]}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-[0.72rem] text-ash border border-card-line rounded-full px-2.5 py-1 hover:border-ember hover:text-ember transition-colors"
              >
                {s}
              </a>
            ))}
          </div>
        </div>

        <div className="flex items-start gap-2 mb-3">
          <span className="text-ember shrink-0 mt-0.5"><MapPin size={16}/></span>
          <span className="text-ash text-[0.88rem]">{event.location}</span>
        </div>

        <div className="flex items-start gap-2 mb-5">
          <span className="text-ember shrink-0 mt-0.5"><Target size={16} /></span>
          <span className="text-ash text-[0.88rem] italic">
            &quot;{event.theme}&quot;
          </span>
        </div>

        <p className="text-ash text-[0.93rem] leading-relaxed">{event.description}</p>

        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-6 flex items-center gap-2 font-mono text-[0.76rem] uppercase tracking-wider text-ember hover:text-bone transition-colors"
        >
          {expanded ? "Hide" : "View"} Event Photos ({event.galleryCount})
          <span
            className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""
              }`}
          >
            ↓
          </span>
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <EventGallery
                prefix={event.galleryPrefix}
                count={event.galleryCount}
                eventId={event.id}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}


/* ─── PAGE ───────────────────────────────────────────────── */

export default function CampusNetwork() {
  return (
    <>
      <Navbar />

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

        <section className="relative pt-16 pb-0">
          <div className="max-w-[1180px] mx-auto px-7 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="mb-10"
            >
              <Eyebrow><span className="text-lg">Campus Network</span></Eyebrow>
              <h1 className="font-display text-[clamp(2.6rem,5.5vw,4.2rem)] leading-[1.04] tracking-tight mt-4">
                Phoenix on campus.{" "}
                <span className="flame-text">Africa in the room.</span>
              </h1>
              <p className="mt-5 text-[1.1rem] text-ash leading-relaxed md:max-w-none max-w-[580px]">
                Phoenix Campus Network is the early-stage talent layer of the Phoenix
                Ecosystem that connect students across African universities to Web3, to
                each other, and to real opportunities within the ecosystem.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="max-w-[1180px] mx-auto px-7 relative z-10"
          >
            <div className="rounded-[20px] overflow-hidden border border-card-line shadow-[0_24px_80px_-24px_rgba(255,77,28,0.25)] md:max-w-[72%] mx-auto">
              <Image
                src="/PCNS.jpg"
                alt="Phoenix Campus Network"
                width={1400}
                height={400}
                className="w-full object-cover md:max-h-[220px]"
                priority
              />
            </div>
          </motion.div>
        </section>

        <section className="py-16 relative z-10">
          <div className="max-w-[1180px] mx-auto px-7">
            <ScrollReveal stagger className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {STATS.map((s) => (
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

      <section className="py-24">
        <div className="max-w-[1180px] mx-auto px-7 grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          <ScrollReveal>
            <Eyebrow><span className="text-lg">Our Mandate</span></Eyebrow>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] leading-[1.04] tracking-tight mt-4">
              A pipeline, not a subgroup.
            </h2>
            <p className="mt-4 text-ash text-[1.02rem] leading-relaxed">
              Phoenix Campus Network isn&apos;t a student club, it&apos;s a structured
              intake layer that connects universities to the Phoenix Ecosystem. Every campus
              member is a future contributor, creator, or builder. The network exists to
              find them early and route them into meaningful participation.
            </p>
            <p className="mt-3 text-ash text-[1.02rem] leading-relaxed">
              Empowering students across Africa&apos;s campuses through learning,
              opportunity, and community.
            </p>
            <ul className="mt-6 flex flex-col gap-3 list-none">
              {VALUE_POINTS.map((pt) => (
                <li key={pt} className="flex gap-3 items-start">
                  <span className="text-ember font-bold mt-0.5 shrink-0">✓</span>
                  <span className="text-bone text-[0.95rem]">{pt}</span>
                </li>
              ))}
            </ul>
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
                src="/PCNR.jpg"
                alt="Phoenix Campus Network Crest"
                width={360}
                height={360}
                className="rounded-full relative z-10 border border-card-line"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <hr className="border-card-line" />

      <section className="py-24">
        <div className="max-w-[1180px] mx-auto px-7">
          <ScrollReveal className="max-w-[640px] mb-14">
            <Eyebrow><span className="text-lg">IRL Events</span></Eyebrow>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] leading-[1.04] tracking-tight mt-4">
              We don&apos;t just post about Web3.
              <br />
              We show up for it.
            </h2>
            <p className="mt-4 text-ash text-[1.02rem] leading-relaxed">
              Phoenix Campus Network has hosted and co-hosted on-ground events across
              Nigeria and Kenya, bringing Web3 education, career pathways, and real
              industry connections directly to students on campus.
            </p>
          </ScrollReveal>

          <ScrollReveal stagger className="flex flex-col gap-8">
            {EVENTS.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </ScrollReveal>
        </div>
      </section>

      <hr className="border-card-line" />

      <section className="py-24 relative">
        <EmberField count={25} />
        <ScrollReveal
          className="max-w-[1180px] mx-auto px-7 relative z-10 text-center"
          y={20}
        >
          <div className="max-w-[580px] mx-auto">
            <Image
              src="/PCNR.jpg"
              alt="Phoenix Campus Network"
              width={300}
              height={300}
              className="rounded-full mx-auto border border-card-line mb-6"
            />
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] leading-[1.04] tracking-tight">
              Want Phoenix on your campus?
            </h2>
            <p className="mt-4 text-ash text-[1.02rem] leading-relaxed">
              Whether you&apos;re a student who wants to bring Phoenix to your university,
              or a project looking to reach Africa&apos;s campus communities, let&apos;s
              talk.
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
                  href="/agency/hire"
                  className="inline-flex items-center gap-2 rounded-full border border-bone/20 text-bone font-bold text-[0.92rem] px-7 py-3.5 hover:border-ember hover:text-ember transition-colors"
                >
                  <Gem size={16}/> Work With Us
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