import Link from "next/link";
import Image from "next/image";

const LINKS = [
  ["Agency", "/agency"],
  ["Academy", "/academy"],
  ["Campus Network", "/campus-network"],
  ["Community", "/community"],
  ["DAO / NFT", "/dao-nft"],
];

export default function Footer() {
  return (
    <footer className="border-t border-card-line pt-13 pb-9">
      <div className="max-w-[1180px] mx-auto flex flex-wrap gap-8 justify-between items-start">
        <div className="flex items-center gap-2.5">
          <Image
            src="/PhoenixLogo.jpg"
            alt="Phoenix Ecosystem"
            width={28}
            height={28}
            className="rounded-full"
          />
          <span className="font-display text-[0.92rem]">PHOENIX</span>
        </div>

        <nav className="flex gap-6 flex-wrap">
          {LINKS.map(([label, href]) => (
            <Link key={href} href={href} className="text-[0.85rem] text-ash hover:text-ember transition-colors">
              {label}
            </Link>
          ))}
        </nav>

        <div className="font-mono text-[0.8rem] text-ash-dim">
          @phoenixxweb3 · x.com/phoenixxweb3
        </div>
      </div>
      <div className="max-w-[1180px] mx-auto px-7 mt-7 text-[0.78rem] text-ash-dim">
        © {new Date().getFullYear()} Phoenix Ecosystem. Built before we charged a cent.
      </div>
    </footer>
  );
}