import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/data/projects";
import LiquidGlass, { carouselItems } from "@/components/LiquidGlass";
import CounterRow from "@/components/CounterFX";
import Shape from "@/components/Shape";

export const metadata: Metadata = {
  title: "Work — Zyrix Dev",
  description: "Selected engagements from the Zyrix Dev studio.",
};

export default function WorkPage() {
  return (
    <main className="page-content lt">
      <section className="lt-hero" data-rv="up">
        <p className="lt-eyebrow" data-rv="fade">
          Selected engagements
        </p>
        <h1 className="lt-display" data-rv="up">
          <span className="mask-line">The work</span>
          <span className="mask-line">
            <em>speaks last.</em>
          </span>
        </h1>
        <p className="lt-lede" data-rv="up" style={{ marginTop: 28 }}>
          Three engagements that shaped how we work — each one strategy,
          design, and engineering under one roof.
        </p>
      </section>

      <section className="lt-carousel" data-rv="fade">
        <LiquidGlass items={carouselItems} />
      </section>

      <section className="lt-index" data-rv="up">
        <CounterRow />
      </section>

      <section className="lt-index">
        <p className="lt-eyebrow" data-rv="fade">
          The index
        </p>
        {projects.map((p) => (
          <Link
            key={p.slug}
            href={`/work/${p.slug}`}
            className="lt-index-row"
            data-cur
            data-cuelume-hover="tick"
            data-rv="up"
          >
            <span className="lt-ghost" aria-hidden="true">
              {p.num}
            </span>
            <span>
              <span className="lt-ix">{p.num} — {p.tag}</span>
              <span className="lt-ix-title">{p.title}</span>
              <span className="lt-ix-meta">
                <span>{p.role}</span>
                <span>{p.year}</span>
              </span>
            </span>
            <span className="lt-ix-go" aria-hidden="true">
              <svg viewBox="0 0 26 26" fill="none">
                <path d="M8 6h12v12M20 6L6 20" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </span>
          </Link>
        ))}
      </section>

      <section className="lt-section" data-rv="up">
        <p className="lt-eyebrow">Next chapter</p>
        <h2 className="lt-h2" style={{ margin: "22px 0 34px" }}>
          Yours could be <em>the fourth.</em>
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
