import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import SiteChrome from "@/components/SiteChrome";
import BreathingNavbar from "@/components/BreathingNavbar";
import CornerCounter from "@/components/CornerCounter";
import CueSound from "@/components/CueSound";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zyrix.qzz.io"),
  title: {
    default: "Zyrix Dev — Digital Craft Studio",
    template: "%s — Zyrix Dev",
  },
  description:
    "Zyrix Dev is a digital craft studio for brands that refuse to blend in. Discord bots, 3D animated websites, AI tools, SaaS products, automations and brand systems — crafted in the dark, built to be seen.",
  keywords: [
    "Zyrix Dev",
    "digital craft studio",
    "Discord bot developer",
    "3D website design",
    "WebGL websites",
    "AI tools",
    "AI automation",
    "SaaS development",
    "brand identity",
    "Next.js developer",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://zyrix.qzz.io",
    siteName: "Zyrix Dev",
    title: "Zyrix Dev — Digital Craft Studio",
    description:
      "Discord bots, 3D animated websites, AI tools, SaaS and brand systems. Work that speaks last, crafted in the dark, built to be seen.",
    images: [{ url: "/zyrix-banner.png", width: 1280, height: 640, alt: "Zyrix Dev — digital craft studio" }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zyrix Dev — Digital Craft Studio",
    description:
      "Discord bots, 3D animated websites, AI tools, SaaS and brand systems. Crafted in the dark, built to be seen.",
    images: ["/zyrix-banner.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Zyrix Dev",
              url: "https://zyrix.qzz.io",
              logo: "https://zyrix.qzz.io/brand/zyrix-logo.svg",
              description:
                "Digital craft studio — Discord bots, 3D animated websites, AI tools, SaaS products and brand systems.",
              email: "imzyrixx@gmail.com",
              sameAs: [
                "https://github.com/imzyrix",
                "https://instagram.com/imzyrix",
                "https://youtube.com/@zyrix-dev",
                "https://discord.com/users/imzyrixx",
              ],
            }),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var last=0;document.addEventListener("click",function(e){if(e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;var a=e.target&&e.target.closest?e.target.closest("a[href]"):null;if(!a||a.hasAttribute("download"))return;if(a.href.indexOf(location.origin)!==0)return;var href=a.href,path=a.pathname,fired=Date.now();last=fired;setTimeout(function(){if(last!==fired)return;if(location.pathname===path)return;location.href=href;},900);},true);})();`,
          }}
        />
      </head>
      <body className="min-h-full bg-ink text-bone">
        <MotionConfig reducedMotion="user">
          <SiteChrome />
          <BreathingNavbar />
          <div id="grain" aria-hidden="true" />
          <div id="vignette" aria-hidden="true" />
          <div id="fg-sky" aria-hidden="true" />
          <div className="cur-dot" id="cur-dot" aria-hidden="true" />
          <div className="page">
            {children}
          </div>
          <CueSound />
          <CornerCounter />
        </MotionConfig>
      </body>
    </html>
  );
}