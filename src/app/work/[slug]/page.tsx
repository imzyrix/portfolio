import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: `${p.title} — Zyrix Dev`,
    description: p.intro,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const idx = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <main className="page-content">
      <section className="pg-hero" data-rv="up">
        <Link href="/work" className="backlink" data-cur data-cuelume-hover="tick">
          <svg viewBox="0 0 13 13" fill="none" aria-hidden="true">
            <path d="M12 1L1 12M1 3v9h9" stroke="#a9b2aa" strokeWidth="1.3" />
          </svg>
          All work
        </Link>
        <p className="eyebrow" data-rv="fade">
          <span className="dot" aria-hidden="true" />
          {p.num} — {p.tag} · {p.year}
        </p>
        <h1 className="display">
          <span className="mask-line"><span>{p.title}<em>.</em></span></span>
        </h1>
        <p className="body pg-lede" data-rv="up">
          {p.intro}
        </p>
      </section>

      <section className="pg-fig" data-rv="up">
        <div className="fig-frame">
          <Image
            src={p.plate}
            alt={`${p.title} — ${p.tag} case study cover`}
            width={1122}
            height={1402}
            sizes="(max-width: 900px) 92vw, 820px"
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
        </div>
        <div className="fig-meta">
          <span>{p.role}</span>
          <span>{p.year}</span>
        </div>
      </section>

      <section className="pg-story">
        {p.story.map((para, i) => (
          <p key={i} className="body-lg" data-rv="up">
            {para}
          </p>
        ))}
      </section>

      <section className="story-stats" data-rv="up">
        {p.stats.map((s) => (
          <div key={s.span}>
            <b>{s.b}</b>
            <span>{s.span}</span>
          </div>
        ))}
      </section>

      <section className="pg-next" data-rv="up">
        <p className="eyebrow">Next case study</p>
        <Link href={`/work/${next.slug}`} className="next-link" data-cur>
          <span className="display">{next.title}</span>
          <svg viewBox="0 0 26 26" fill="none" aria-hidden="true">
            <path d="M8 6h12v12M20 6L6 20" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </Link>
      </section>
    </main>
  );
}