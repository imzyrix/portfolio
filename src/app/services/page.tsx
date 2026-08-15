import type { Metadata } from "next";
import Link from "next/link";
import Shape from "@/components/Shape";
import { services as disciplines } from "@/data/site";

export const metadata: Metadata = {
  title: "Services — Zyrix Dev",
  description: "Discord bots, 3D animated websites, AI tools, SaaS, and automations — built for brands and businesses.",
};

export default function ServicesPage() {
  return (
    <main className="page-content lt">
      <section className="lt-hero" data-rv="up">
        <p className="lt-eyebrow" data-rv="fade">
          The craft
        </p>
        <h1 className="lt-display" data-rv="up">
          <span className="mask-line">Six ways</span>
          <span className="mask-line">
            we move <em>brands.</em>
          </span>
        </h1>
        <p className="lt-lede" data-rv="up" style={{ marginTop: 28 }}>
          Everything a brand needs to be built and be seen — bots, worlds, and
          intelligence. Every engagement starts with strategy, ends with shipping,
          and is measured in between.
        </p>
      </section>

      <section className="lt-section" data-rv="up" style={{ paddingTop: 0, borderTop: "none" }}>
        {disciplines.map((d) => (
          <div key={d.k} className="lt-ledger-row" data-rv="up">
            <span className="lt-ghost" aria-hidden="true">
              {d.k}
            </span>
            <span className="lt-ledger-k">{d.k}</span>
            <h3 className="lt-ledger-title">{d.title}</h3>
            <div className="lt-ledger-desc-wrap">
              <p className="lt-ledger-desc">{d.desc}</p>
              <span>
                {d.what.map((w) => (
                  <span key={w} className="lt-chip">
                    {w}
                  </span>
                ))}
              </span>
            </div>
            <span className="lt-ledger-go" aria-hidden="true">
              <svg viewBox="0 0 26 26" fill="none">
                <path d="M8 6h12v12M20 6L6 20" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </span>
          </div>
        ))}
      </section>

      <section className="lt-section" data-rv="up">
        <p className="lt-eyebrow">How we work</p>
        <h2 className="lt-h2" style={{ margin: "22px 0 0" }}>
          Strategy → Build → <em>Measure.</em>
        </h2>
        <div className="lt-process">
          <div data-rv="up">
            <b>01 — Strategy</b>
            <p>One week, one room, one brief. We define what success looks like in numbers before anything is designed.</p>
          </div>
          <div data-rv="up">
            <b>02 — Build</b>
            <p>Design and engineering in the same loop. Weekly demos, no surprise phases, nothing handed off.</p>
          </div>
          <div data-rv="up">
            <b>03 — Measure</b>
            <p>Launch is the midpoint, not the end. We stay until the numbers move — that is part of the price.</p>
          </div>
        </div>
      </section>

      <section className="lt-section" data-rv="up">
        <p className="lt-eyebrow">The next chapter</p>
        <h2 className="lt-h2" style={{ margin: "22px 0 34px" }}>
          Tell us where you <em>want to go.</em>
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
