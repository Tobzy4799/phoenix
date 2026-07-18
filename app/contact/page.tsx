"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EmberField from "@/components/EmberField";
import ScrollReveal, { revealItem } from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Clock,
  CalendarDays,
  CheckCircle,
  Timer,
  MessageSquare,
  Send,
  Users,
  Rocket,
  Target,
} from "lucide-react";

const CALENDLY_LINK = "https://calendly.com/phoenixxecosystem/30min";
const WHATSAPP_LINK = "https://wa.me/2349152681579";

function XIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  );
}

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function TelegramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

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

const WHO_ITS_FOR = [
  {
    icon: <Rocket size={18} className="text-ember shrink-0 mt-0.5" />,
    text: "Pre-launch, launch-phase and post-launch Web3 projects",
  },
  {
    icon: <Users size={18} className="text-ember shrink-0 mt-0.5" />,
    text: "Teams scaling community growth, KOL reach, and ecosystem adoption",
  },
  {
    icon: <Target size={18} className="text-ember shrink-0 mt-0.5" />,
    text: "Founders building long-term presence and narrative in Web3",
  },
];

const BEFORE_CALL = [
  "You'll get a calendar invite and reminders from Calendly after you pick a slot.",
  "Bring a clear sense of where your project stands and we'll handle the rest.",
  "We'll align on fit, scope, and clear next steps for how we can work together.",
];

export default function ContactPage() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <EmberField count={28} />
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
            className="max-w-[680px]"
          >
            <Eyebrow><span className="text-lg">Contact</span></Eyebrow>
            <h1 className="font-display text-[clamp(2.6rem,5.5vw,4.2rem)] leading-[1.04] tracking-tight mt-4">
              Let&apos;s talk about{" "}
              <span className="flame-text">your project.</span>
            </h1>
            <p className="mt-5 text-[1.1rem] text-ash leading-relaxed">
              Phoenix works with Web3 founders at critical growth stages, where
              the right strategy and execution directly impact outcomes. If
              that&apos;s where you are, we want to hear from you.
            </p>
            <div className="flex gap-4 mt-8 flex-wrap">
              <motion.a
                href={CALENDLY_LINK}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-full grad-flame text-[#110603] font-bold text-[0.92rem] px-7 py-3.5 hover:shadow-[0_10px_30px_-8px_rgba(255,77,28,0.55)] transition-shadow"
              >
                <CalendarDays size={16} />
                Book a Discovery Call
              </motion.a>
              <motion.a
                href="mailto:Phoenixxecosystem@gmail.com"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-full border border-bone/20 text-bone font-bold text-[0.92rem] px-7 py-3.5 hover:border-ember hover:text-ember transition-colors"
              >
                <Mail size={16} />
                Send an Email
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      <hr className="border-card-line" />

      {/* WHO IT'S FOR + CONTACT INFO */}
      <section className="py-24">
        <div className="max-w-[1180px] mx-auto px-7 grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Who it's for */}
          <ScrollReveal>
            <Eyebrow><span className="text-lg">Who This Is For</span></Eyebrow>
            <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.6rem)] leading-[1.04] tracking-tight mt-4">
              We work with founders who are serious.
            </h2>
            <p className="mt-4 text-ash text-[1rem] leading-relaxed">
              Phoenix works with Crypto, Blockchain, and Web3 founders at
              critical growth stages, this is where the right strategy and community
              execution directly impacts outcomes.
            </p>
            <ul className="mt-6 flex flex-col gap-4 list-none">
              {WHO_ITS_FOR.map((item, i) => (
                <li key={i} className="flex gap-3 items-start">
                  {item.icon}
                  <span className="text-bone text-[0.95rem]">{item.text}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          {/* Contact details */}
          <ScrollReveal delay={0.15}>
            <Eyebrow><span className="text-lg">Talk to the Team</span></Eyebrow>
            <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.6rem)] leading-[1.04] tracking-tight mt-4">
              Prefer a quick message first?
            </h2>
            <p className="mt-4 text-ash text-[1rem] leading-relaxed">
              Email, WhatsApp, or Telegram, just reach out however works best for you.
            </p>

            <div className="mt-8 flex flex-col gap-5">
              {/* Email */}
              
               <a href="mailto:Hiswatadewale@gmail.com"
                className="flex items-center gap-4 bg-card border border-card-line rounded-[14px] px-5 py-4 hover:border-ember transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-ember/10 border border-ember/20 flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-ember" />
                </div>
                <div>
                  <p className="font-mono text-[0.68rem] uppercase tracking-wider text-ash-dim">Email</p>
                  <p className="text-bone text-[0.92rem] font-semibold group-hover:text-ember transition-colors">
                    Hiswatadewale@gmail.com
                  </p>
                </div>
              </a>

              {/* WhatsApp */}
              
              <a  href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 bg-card border border-card-line rounded-[14px] px-5 py-4 hover:border-[#25D366] transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-center shrink-0">
                  <WhatsAppIcon size={18} />
                </div>
                <div>
                  <p className="font-mono text-[0.68rem] uppercase tracking-wider text-ash-dim">WhatsApp</p>
                  <p className="text-bone text-[0.92rem] font-semibold group-hover:text-[#25D366] transition-colors">
                    Chat with us
                  </p>
                </div>
              </a>

              {/* Telegram */}
              
               <a href="https://t.me/Bighiswat"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 bg-card border border-card-line rounded-[14px] px-5 py-4 hover:border-[#229ED9] transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-[#229ED9]/10 border border-[#229ED9]/20 flex items-center justify-center shrink-0">
                  <TelegramIcon size={18} />
                </div>
                <div>
                  <p className="font-mono text-[0.68rem] uppercase tracking-wider text-ash-dim">Telegram</p>
                  <p className="text-bone text-[0.92rem] font-semibold group-hover:text-[#229ED9] transition-colors">
                    @Bighiswat
                  </p>
                </div>
              </a>

              {/* X */}
              
                <a href="https://x.com/Hiswat_"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 bg-card border border-card-line rounded-[14px] px-5 py-4 hover:border-bone transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-bone/5 border border-bone/10 flex items-center justify-center shrink-0">
                  <XIcon size={16} />
                </div>
                <div>
                  <p className="font-mono text-[0.68rem] uppercase tracking-wider text-ash-dim">X / Twitter</p>
                  <p className="text-bone text-[0.92rem] font-semibold group-hover:text-bone transition-colors">
                    @Hiswat_
                  </p>
                </div>
              </a>

              {/* Timezone */}
              <div className="flex items-center gap-4 bg-card border border-card-line rounded-[14px] px-5 py-4">
                <div className="w-10 h-10 rounded-full bg-ember/10 border border-ember/20 flex items-center justify-center shrink-0">
                  <Clock size={18} className="text-ember" />
                </div>
                <div>
                  <p className="font-mono text-[0.68rem] uppercase tracking-wider text-ash-dim">Response Time</p>
                  <p className="text-bone text-[0.92rem] font-semibold">Under 24 hours</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <hr className="border-card-line" />

      {/* BOOK A CALL */}
      <section className="py-24">
        <div className="max-w-[1180px] mx-auto px-7">
          <ScrollReveal className="text-center max-w-[640px] mx-auto mb-14">
            <Eyebrow center><span className="text-lg">Book a Discovery Call</span></Eyebrow>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] leading-[1.04] tracking-tight mt-4">
              Grab a slot before the week fills up.
            </h2>
            <p className="mt-4 text-ash text-[1rem] leading-relaxed">
              No pitch decks, no pressure. Just a focused 30-minute conversation
              about where your project is and how Phoenix can help move it forward.
            </p>
          </ScrollReveal>

          <ScrollReveal stagger className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

            {/* Before your call */}
            <motion.div
              variants={revealItem}
              className="bg-card border border-card-line rounded-[20px] p-8"
            >
              <h3 className="font-bold text-[1.1rem] mb-6 flex items-center gap-2.5">
                <CheckCircle size={20} className="text-ember" />
                Before your discovery call
              </h3>
              <ul className="flex flex-col gap-4 list-none">
                {BEFORE_CALL.map((item, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <span className="text-ember font-bold mt-0.5 shrink-0">✓</span>
                    <span className="text-ash text-[0.93rem] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Call details */}
            <motion.div variants={revealItem} className="flex flex-col gap-4">
              <div className="bg-card border border-card-line rounded-[16px] px-6 py-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-ember/10 border border-ember/20 flex items-center justify-center shrink-0">
                  <Timer size={18} className="text-ember" />
                </div>
                <div>
                  <p className="font-mono text-[0.68rem] uppercase tracking-wider text-ash-dim">Duration</p>
                  <p className="text-bone text-[0.95rem] font-semibold">~30 minutes</p>
                </div>
              </div>

              <div className="bg-card border border-card-line rounded-[16px] px-6 py-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-ember/10 border border-ember/20 flex items-center justify-center shrink-0">
                  <MessageSquare size={18} className="text-ember" />
                </div>
                <div>
                  <p className="font-mono text-[0.68rem] uppercase tracking-wider text-ash-dim">Response Time</p>
                  <p className="text-bone text-[0.95rem] font-semibold">Under 24 hours</p>
                </div>
              </div>

              <div className="bg-card border border-card-line rounded-[16px] px-6 py-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-ember/10 border border-ember/20 flex items-center justify-center shrink-0">
                  <Send size={18} className="text-ember" />
                </div>
                <div>
                  <p className="font-mono text-[0.68rem] uppercase tracking-wider text-ash-dim">Follow Up</p>
                  <p className="text-bone text-[0.95rem] font-semibold">Written summary & next steps</p>
                </div>
              </div>

              <motion.a
                href={CALENDLY_LINK}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="mt-2 flex items-center justify-center gap-2.5 rounded-full grad-flame text-[#110603] font-bold text-[1rem] py-4 px-8 hover:shadow-[0_10px_30px_-8px_rgba(255,77,28,0.55)] transition-shadow"
              >
                <CalendarDays size={18} />
                Book a Call Now
              </motion.a>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </>
  );
}