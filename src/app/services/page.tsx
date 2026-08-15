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
    <main className="page-content">
      <section className="pg-hero" data-rv="up">
        <p className="eyebrow" data-rv="fade">
          <Shape size={15} className="shp--spin" />
          The craft
        </p>
        <h1 className="display">
          <span className="mask-line"><span>Six ways</span></span>
          <span className="mask-line"><span>we move <em>brands.</em></span></span>
        </h1>
        <p className="body pg-lede" data-rv="up">
          Everything a brand needs to be built and be seen — bots, worlds, and
          intelligence. Every engagement starts with strategy, ends with shipping,
          and is measured in between.
        </p>
      </section>

      <section className="pg-svc">
        {disciplines.map((d) => (
          <div key={d.k} className="svc" data-rv="up">
            <span className="svc-ghost" aria-hidden="true">
              {d.k}
            </span>
            <div className="svc-head">
              <span className="k">{d.k}</span>
              <h3>{d.title}</h3>
            </div>
            <div className="svc-body">
              <p className="body">{d.desc}</p>
              <ul className="svc-what">
                {d.what.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
            </div>
            <div className="svc-side">
              <span className="t">{d.t}</span>
              <span className="svc-go" aria-hidden="true">
                <svg viewBox="0 0 26 26" fill="none">
                  <path d="M8 6h12v12M20 6L6 20" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </span>
            </div>
            <span className="bar" aria-hidden="true" />
          </div>
        ))}
      </section>

      <section className="pg-process" data-rv="up">
        <p className="eyebrow">How we work</p>
        <h2 className="display h-sec">
          <span className="mask-line">Strategy → Build →</span>
          <span className="mask-line">Measure.</span>
        </h2>
        <div className="steps">
          <div>
            <b>01 — Strategy</b>
            <p>One week, one room, one brief. We define what success looks like in numbers before anything is designed.</p>
          </div>
          <div>
            <b>02 — Build</b>
            <p>Design and engineering in the same loop. Weekly demos, no surprise phases, nothing handed off.</p>
          </div>
          <div>
            <b>03 — Measure</b>
            <p>Launch is the midpoint, not the end. We stay until the numbers move — that is part of the price.</p>
          </div>
        </div>
      </section>

      <section className="pg-cta" data-rv="up">
        <p className="eyebrow">The next chapter</p>
        <h2 className="display h-sec">
          <span className="mask-line">Tell us where</span>
          <span className="mask-line">you want to go.</span>
        </h2>
        <Link href="/contact" className="cta" data-cur data-magnetic="0.1" data-cuelume-hover="tick" data-cuelume-press>
          <i aria-hidden="true" />
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