import type { Metadata } from "next";
import Link from "next/link";
import Shape from "@/components/Shape";
import DrawOnScroll from "@/components/DrawOnScroll";

export const metadata: Metadata = {
  title: "Studio — Zyrix Dev",
  description: "Who we are — a small senior creative studio.",
};

const principles = [
  {
    k: "01",
    title: "Senior by default",
    desc: "No juniors learning on your budget, no account layers between you and the work. The people in the room are the people who build it.",
  },
  {
    k: "02",
    title: "One line of sight",
    desc: "Strategy, design, and engineering under one roof. Every decision traces to the same brief, from first sketch to ship.",
  },
  {
    k: "03",
    title: "Restraint is a feature",
    desc: "We build one breathtaking moment per page — not five competing ones. The work earns attention; it never demands it.",
  },
  {
    k: "04",
    title: "Measured, not vibes",
    desc: "Every engagement ships with numbers: performance budgets, conversion deltas, uptime. We stay after launch until the curve moves.",
  },
];

const stats = [
  { b: "Senior", span: "Team" },
  { b: "Direct", span: "Communication" },
  { b: "Owned", span: "End to end" },
  { b: "Measured", span: "Results" },
];

export default function StudioPage() {
  return (
    <main className="page-content lt">
      <section className="lt-hero" data-rv="up">
        <p className="lt-eyebrow" data-rv="fade">
          Who we are
        </p>
        <h1 className="lt-display" data-rv="up">
          <span className="mask-line">One studio,</span>
          <span className="mask-line">every frame earns</span>
          <span className="mask-line">
            <em>its place.</em>
          </span>
        </h1>
        <p className="lt-lede" data-rv="up" style={{ marginTop: 28 }}>
          Zyrix Dev is a small creative studio building digital products and
          brands in the dark — where the only light is the work itself.
        </p>
      </section>

      <section className="lt-story" data-rv="up">
        <p className="lt-body">
          We started with a rule: no hand-offs. Too many projects die in the
          gap between the people who promise and the people who build. So we
          built a studio where the strategist can open the codebase, the
          designer ships the motion, and the engineer argues about the kerning
          — because someone has to.
        </p>
        <p className="lt-body">
          The result is a small, senior team that stays in the room until the
          thing ships — and keeps working after it does. The site you are
          standing in is our own canvas: the city in the dark behind this text
          is rendered live, on your device, at 60 frames per second. We believe
          the craft should be visible in the thing we sell.
        </p>
      </section>

      <section className="lt-band lt-canvas" data-rv="fade">
        <p className="lt-eyebrow">The canvas</p>
        <h2 className="lt-display">
          <span className="mask-line">Rendered live,</span>
          <span className="mask-line">on your device,</span>
          <span className="mask-line">
            at <em>60 frames</em> a second.
          </span>
        </h2>
        <p className="lt-canvas-note" data-rv="fade">
          — the site you are standing in is our own canvas.
        </p>
        <DrawOnScroll
          paths={["M4 30 C 70 8, 140 6, 200 18 S 320 22, 420 10", "M10 38 C 90 22, 180 26, 250 34"]}
          viewBox="0 0 430 44"
          className="zy-draw"
        />
      </section>

      <section className="lt-stats lt-stats--4" data-rv="up" style={{ margin: "0 var(--pad)" }}>
        {stats.map((s) => (
          <div key={s.span}>
            <b>{s.b}</b>
            <span>{s.span}</span>
          </div>
        ))}
      </section>

      <section className="lt-section" data-rv="up">
        <p className="lt-eyebrow">How we work</p>
        <div className="lt-principles" style={{ marginTop: 24 }}>
          {principles.map((pr) => (
            <div key={pr.k} className="lt-principle" data-rv="up">
              <span className="lt-ghost" aria-hidden="true">
                {pr.k}
              </span>
              <h3>{pr.title}</h3>
              <p>{pr.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="lt-section" data-rv="up">
        <p className="lt-eyebrow">Work with us</p>
        <h2 className="lt-h2" style={{ margin: "22px 0 34px" }}>
          Small team, <em>senior output.</em>
        </h2>
        <Link href="/contact" className="lt-cta" data-cur data-magnetic="0.1" data-cuelume-hover="tick" data-cuelume-press>
          <Shape kind="star" size={13} />
          <span>Start a project</span>
          <svg viewBox="0 0 13 13" fill="none" aria-hidden="true">
            <path d="M1 12L12 1M12 1H3M12 1v9" stroke="currentColor" strokeWidth="1.3" />
          </svg>
        </Link>
      </section>
    </main>
  );
}
