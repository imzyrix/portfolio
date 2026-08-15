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
  title: "Zyrix Dev — Creative Studio",
  description:
    "An interactive night walk through a digital landscape. Strategy, design, and engineering for brands that refuse to be quiet.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}>
      <head>
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