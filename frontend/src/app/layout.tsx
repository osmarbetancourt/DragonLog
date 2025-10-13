
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";


import { Providers } from "./providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  metadataBase: new URL("https://dragonlog.vercel.app"),
  title: {
    default: "DragonLog — Vigilant Telemetry Grimoire",
    template: "%s | DragonLog",
  },
  description:
    "DragonLog keeps every shard under watch, weaving observability, alerting, and integrations into a living spellbook for your infrastructure.",
  icons: {
    icon: "/images/DragonLog_icon_WBG.svg",
    shortcut: "/images/DragonLog_icon_WBG.svg",
    apple: "/images/DragonLog_icon_WBG.svg",
  },
  openGraph: {
    title: "DragonLog — Vigilant Telemetry Grimoire",
    description:
      "Summon sentry daemons, chart anomalies, and unify pipelines inside the DragonLog observability keep.",
    url: "https://dragonlog.vercel.app",
    siteName: "DragonLog",
    type: "website",
    images: [
      {
        url: "/images/DragonLog_icon_WBG.svg",
        alt: "DragonLog crest sigil",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DragonLog — Vigilant Telemetry Grimoire",
    description:
      "Keep vigilant watch over logs, metrics, and integrations with the DragonLog observability spellbook.",
    images: ["/images/DragonLog_icon_WBG.svg"],
  },
  keywords: [
    "DragonLog",
    "observability",
    "telemetry",
    "monitoring",
    "Kafka",
    "Next.js",
    "devops",
  ],
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
