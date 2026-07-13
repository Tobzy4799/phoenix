import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Phoenix Ecosystem",
  description:
    "Grow your Web3 project with Africa's most connected growth network. KOL campaigns, community management, campus activations & more.",

  // Open Graph — controls WhatsApp, Facebook, Telegram previews
  openGraph: {
    title: "Phoenix Ecosystem — Web3 Growth Agency",
    description:
      "Grow your Web3 project with Africa's most connected growth network. KOL campaigns, community management, campus activations & more.",
    url: "https://phoenix-pearl-seven.vercel.app/",
    siteName: "Phoenix Ecosystem",
    images: [
      {
        url: "https://phoenix-pearl-seven.vercel.app/PhoenixLogoalt.jpg",
        width: 1200,
        height: 630,
        alt: "Phoenix Ecosystem — Web3 Growth Agency",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter/X card
  twitter: {
    card: "summary_large_image",
    title: "Phoenix Ecosystem — Web3 Growth Agency",
    description:
      "Grow your Web3 project with Africa's most connected growth network. KOL campaigns, community management, campus activations & more.",
    images: ["https://phoenix-pearl-seven.vercel.app/PhoenixLogoalt.jpg"],
    creator: "@phoenixxweb3",
    site: "@phoenixxweb3",
  },

  // Favicon
  icons: {
    icon: "/PhoenixLogo.jpg",
    apple: "/PhoenixLogo.jpg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}