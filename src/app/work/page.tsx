import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import LiquidGlass, { carouselItems } from "@/components/LiquidGlass";
import CounterRow from "@/components/CounterFX";
import TextWheel from "@/components/TextWheel";
import Shape from "@/components/Shape";

export const metadata: Metadata = {
  title: "Work — Zyrix Dev",
  description: "Selected engagements from the Zyrix Dev studio.",
};

export default function WorkPage() {
  return (
    <main className="page-content">
      <section className="pg-hero" data-rv="up">
        <p className="eyebrow" data-rv="fade">
          <Shape size={15} className="shp--spin" />
          Selected engagements
        </p>
        <h1 className="display">
          <span className="mask-line"><span>The work</span></span>
          <span className="mask-line"><span><em>speaks last.</em></span></span>
        </h1>
        <p className="body pg-lede" data-rv="up">
          Three engagements that shaped how we work — each one strategy,
          design, and engineering under one roof.
        </p>
      </section>

      <LiquidGlass items={carouselItems} />

      <section className="pg-mid">
        <CounterRow />
      </section>

      <section className="pg-index" data-rv="up">
        <p className="eyebrow">
          <span className="dot" aria-hidden="true" />
          The index
        </p>
        <TextWheel />
      </section>

      <section className="cards">
        {projects.map((p) => (
          <Link key={p.slug} href={`/work/${p.slug}`} className="card" data-cur data-cuelume-hover="tick">
            <span className="card-ghost" aria-hidden="true">
              {p.num}
            </span>
            <div className="card-fr">
              <Image
                className="plate"
                src={p.plate}
                alt={`${p.title} — ${p.tag} case study`}
                width={1122}
                height={1402}
                sizes="(max-width: 820px) 92vw, (max-width: 1080px) 44vw, 30vw"
              />
              <span
                className="glow"
                aria-hidden="true"
                style={
                  {
                    "--gx": p.glow.gx,
                    "--gy": p.glow.gy,
                    "--gr": p.glow.gr,
                    "--gc1": p.glow.gc1,
                    "--gc2": p.glow.gc2,
                    "--gt": p.glow.gt,
                    "--gt2": p.glow.gt2,
                  } as CSSProperties
                }
              />
              <span className="card-num" aria-hidden="true">
                {p.num}
              </span>
              {/* ORIGINAL (preserved, not deleted — disabled by comment): */}
              {/* <span className="card-lab">
                <b>{p.title}</b>
                <span className="tag">{p.tag}</span>
              </span> */}
              <span className="card-lab">
                <b>{p.title}</b>
                <span className="tag">{p.tag}</span>
              </span>
              <span className="card-ar" aria-hidden="true">
                <svg viewBox="0 0 26 26" fill="none">
                  <path d="M8 6h12v12M20 6L6 20" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </span>
            </div>
            <div className="card-meta">
              <span>{p.role}</span>
              {/* ORIGINAL (preserved, not deleted — disabled by comment): <span>{p.num}</span> */}
              <span>{p.year}</span>
            </div>
          </Link>
        ))}
      </section>

      <section className="pg-cta" data-rv="up">
        <p className="eyebrow">Next chapter</p>
        <h2 className="display h-sec">
          <span className="mask-line">Yours could be</span>
          <span className="mask-line">the fourth.</span>
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