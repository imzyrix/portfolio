import type { Metadata } from "next";
import Link from "next/link";
import ZOrb from "@/components/ZOrb";
import HStrip from "@/components/HStrip";
import Scramble from "@/components/Scramble";
import TextReveal from "@/components/TextReveal";
import FXSlider from "@/components/FXSlider";
import DrawOnScroll from "@/components/DrawOnScroll";
import Shape from "@/components/Shape";

export const metadata: Metadata = {
  title: "Zyrix — Founder, Zyrix Dev",
  description: "Zyrix — founder and lead builder at Zyrix Dev. Discord bots, 3D websites, AI tools, and SaaS for brands.",
};

const line = [
  { y: "2026 01.01", t: "Zyrix Dev — Studio goes live", tags: ["studio", "3d", "ai"] },
  { y: "2025 06.10", t: "3D Animated Websites", tags: ["webgl", "motion", "next.js"] },
  { y: "2024 09.02", t: "AI Automations", tags: ["agents", "llm"] },
  { y: "2023 03.14", t: "Discord Bots", tags: ["bots", "communities"] },
];

const services = [
  { n: "01", t: "Discord Bots", d: "Communities, commerce and games — bots that run the server like a product." },
  { n: "02", t: "Animated 3D Websites", d: "WebGL, shaders and scroll choreography. Sites that stop the scroll." },
  { n: "03", t: "AI Tools", d: "LLMs and agents packaged into tools people actually use." },
  { n: "04", t: "SaaS Products", d: "From idea to shipped product. Design, code, infra, launch." },
  { n: "05", t: "AI Automations", d: "The busywork clients hated — now handled by agents." },
  { n: "06", t: "Brand & Business Systems", d: "Identity, motion and systems that make a brand feel inevitable." },
];

const footCols = [
  { h: "Studio", links: ["Work", "Studio", "Services"] },
  { h: "Socials", links: ["Discord", "Instagram", "GitHub"] },
];

export default function ZyrixPage() {
  return (
    <main className="page-content zy">
      <section className="zy-kv" id="z-top" data-cam>
        <div className="zy-kv-orb" data-rv="fade">
          <ZOrb />
        </div>
        <div className="zy-kv-lock" data-rv="fade">
          <h1 className="zy-kv-name">ZYRIX</h1>
          <p className="zy-kv-role">Founder &amp; Lead Builder</p>
        </div>
        <p className="zy-scroll" aria-hidden="true">
          scroll to explore
          <i>→</i>
        </p>
      </section>

      <section className="zy-sec lt" id="z-line" data-cam>
        <div className="zy-sec-head">
          <p className="lt-eyebrow" data-rv="fade">
            The line — 01
          </p>
          <h2 className="zy-stmt">
            <TextReveal>
              The work, in <em>reverse.</em>
            </TextReveal>
          </h2>
        </div>

        <div className="hstrip-wrap" data-rv="fade">
          <HStrip />
        </div>

        <div className="zy-line">
          {line.map((l) => (
            <div key={l.y} className="zy-row" data-rv="up">
              <span className="zy-date">{l.y}</span>
              <h3 className="zy-title">
                <span className="mask-line">{l.t}</span>
              </h3>
              <span className="zy-tags">
                {l.tags.map((t) => (
                  <i key={t}>{t}</i>
                ))}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="zy-sec lt" id="z-story" data-cam>
        <div className="zy-sec-head">
          <p className="lt-eyebrow" data-rv="fade">
            The story — 02
          </p>
        </div>
        <div className="zy-story-band" data-rv="fade">
          <FXSlider />
        </div>
      </section>

      <section className="zy-sec lt zy-center" id="z-mission" data-cam>
        <h2 className="zy-stmt zy-stmt--giant">
          <TextReveal>
            Nothing handed off. <em>Everything in-house.</em>
          </TextReveal>
        </h2>
        <p className="zy-en" data-rv="fade">
          One builder, every craft — bots, worlds and intelligence, shipped end to end.
        </p>
      </section>

      <section className="zy-sec lt zy-center" id="z-vision" data-cam>
        <h2 className="zy-stmt zy-stmt--giant">
          <TextReveal>
            Architect worlds that <em>move hearts</em> and <em>spark hope.</em>
          </TextReveal>
        </h2>
        <p className="zy-en" data-rv="fade">
          The studio builds. The name builds worlds.
        </p>
        <DrawOnScroll paths={["M4 30 C 70 8, 140 6, 200 18 S 320 22, 420 10", "M10 38 C 90 22, 180 26, 250 34"]} viewBox="0 0 430 44" className="zy-draw" />
      </section>

      <section className="zy-sec lt" id="z-service" data-cam>
        <p className="lt-eyebrow" data-rv="fade">
          Service — 03
        </p>
        <div className="zy-svc-lt">
          {services.map((s) => (
            <div key={s.n} className="zy-svc-lt-row" data-rv="up">
              <span className="zy-svc-lt-n">{s.n}</span>
              <h3 className="zy-svc-lt-t">{s.t}</h3>
              <p className="zy-svc-lt-d">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="zy-sec zy-contact" id="z-contact" data-cam>
        <p className="eyebrow" data-rv="fade">
          <Shape size={14} />
          Contact — 04
        </p>
        <h2 className="zy-stmt">
          <TextReveal>
            Got an idea? <em>Let&apos;s build it.</em>
          </TextReveal>
        </h2>
        <div className="zy-foot" data-rv="fade">
          <div className="zy-foot-cols">
            <div className="zy-foot-col">
              <h4>{footCols[0].h}</h4>
              {footCols[0].links.map((l) => (
                <Link key={l} href={l === "Work" ? "/work" : `/${l.toLowerCase()}`}>
                  <Scramble text={l} />
                </Link>
              ))}
            </div>
            <div className="zy-foot-col">
              <h4>{footCols[1].h}</h4>
              <a href="https://discord.com/users/imzyrixx" target="_blank" rel="noreferrer">
                <Scramble text="Discord" />
              </a>
              <a href="https://instagram.com/imzyrix" target="_blank" rel="noreferrer">
                <Scramble text="Instagram" />
              </a>
              <a href="https://github.com/imzyrix" target="_blank" rel="noreferrer">
                <Scramble text="GitHub" />
              </a>
            </div>
            <div className="zy-foot-col">
              <h4>Contact</h4>
              <a href="mailto:imzyrixx@gmail.com">
                <Scramble text="Email" />
              </a>
            </div>
          </div>
          <Link href="/contact" className="zy-cta" data-cur data-hover="0.5" data-cuelume-hover="tick" data-cuelume-press>
            <Shape kind="star" size={13} />
            <span>Contact</span>
            <i aria-hidden="true">
              <svg viewBox="0 0 14 14" fill="none">
                <path d="M1.57516 13.1495L11.8192 2.91846C11.7272 3.54646 11.6712 4.34046 11.6712 5.13446C11.6712 5.87346 11.7082 6.61246 11.8192 7.29546L12.9472 7.01846C12.8552 6.33546 12.8182 5.61446 12.8182 4.87646C12.8182 3.41746 12.9842 1.90346 13.2612 0.647461C12.0042 0.924461 10.4882 1.09046 9.02716 1.09046C8.28816 1.09046 7.56616 1.05346 6.88216 0.961461L6.60516 2.08746C7.28916 2.19846 8.02916 2.23546 8.76816 2.23546C9.56316 2.23546 10.3582 2.18046 10.9872 2.08746L0.743164 12.3185L1.57516 13.1495Z" fill="currentColor" />
              </svg>
            </i>
          </Link>
        </div>
        <p className="zy-copy" data-rv="fade">
          ©2026 Zyrix Dev — Digital after dark
        </p>
      </section>
    </main>
  );
}
