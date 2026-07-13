"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const LINKS = [
  { href: "/agency", label: "Agency" },
  { href: "/academy", label: "Academy" },
  { href: "/campus-network", label: "Campus Network" },
  { href: "/community", label: "Community" },
  { href: "/dao-nft", label: "DAO / NFT" },
];

const WHATSAPP_NUMBER = "2348000000000";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;
const CALENDLY_LINK = "https://calendly.com/phoenixxecosystem/discovery-call";

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  
  function isActive(href: string) {
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`sticky top-0 z-[100] transition-all duration-300 ${
        scrolled
          ? "bg-ink/85 backdrop-blur-md border-b border-card-line"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-[1180px] mx-auto px-5 h-[68px] flex items-center justify-between gap-4">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 shrink-0"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/PhoenixLogo.jpg"
            alt="Phoenix Ecosystem"
            width={32}
            height={32}
            className="rounded-full"
          />
          <span className="font-display text-[0.95rem] tracking-tight flame-text ">
            PHOENIX
          </span>
        </Link>

        {/* Desktop nav — only show on lg and above */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
          {LINKS.map((l) => {
            const active = isActive(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative text-[0.82rem] xl:text-[0.88rem] font-semibold transition-colors group whitespace-nowrap ${
                  active ? "text-ember" : "text-ash hover:text-ember"
                }`}
              >
                {l.label}
                <span
                  className={`absolute left-0 -bottom-1 h-px grad-flame transition-all duration-300 ${
                    active ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
          <Link
            href="/contact"
            className={`relative text-[0.82rem] xl:text-[0.88rem] font-semibold transition-colors group whitespace-nowrap ${
              isActive("/contact") ? "text-ember" : "text-ash hover:text-ember"
            }`}
          >
            Contact
            <span
              className={`absolute left-0 -bottom-1 h-px grad-flame transition-all duration-300 ${
                isActive("/contact") ? "w-full" : "w-0 group-hover:w-full"
              }`}
            />
          </Link>
        </nav>

        {/* Desktop right actions — only on lg+ */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <motion.a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Chat on WhatsApp"
            className="text-ash hover:text-[#25D366] transition-colors"
          >
            <WhatsAppIcon size={19} />
          </motion.a>
          <motion.a
            href={CALENDLY_LINK}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2 rounded-full grad-flame text-[#110603] font-bold text-[0.82rem] px-4 py-2.5 hover:shadow-[0_10px_30px_-8px_rgba(255,77,28,0.55)] transition-shadow whitespace-nowrap"
          >
            Book a Call
          </motion.a>
        </div>

        {/* Hamburger — shows on anything below lg */}
        <button
          className="lg:hidden text-bone text-2xl shrink-0"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile/tablet menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden border-t border-card-line"
          >
            <div className="flex flex-col gap-1 px-5 pb-6 pt-2 max-h-[80vh] overflow-y-auto">
              {LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`py-3 text-[0.95rem] font-semibold border-b border-card-line/50 ${
                    isActive(l.href) ? "text-ember" : "text-bone"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className={`py-3 text-[0.95rem] font-semibold border-b border-card-line/50 ${
                  isActive("/contact") ? "text-ember" : "text-bone"
                }`}
              >
                Contact
              </Link>

              
              <a  href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="py-3 text-[0.95rem] font-semibold text-bone flex items-center gap-2.5 hover:text-[#25D366] transition-colors border-b border-card-line/50"
              >
                <WhatsAppIcon size={18} />
                Chat on WhatsApp
              </a>

              
               <a href={CALENDLY_LINK}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-full grad-flame text-[#110603] font-bold text-sm px-5 py-3"
              >
                Book a Call
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}