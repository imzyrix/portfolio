import type { Metadata } from "next";
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
    <main className="page-content lt">
      <section className="lt-hero" data-rv="up">
        <Link href="/work" className="lt-back" data-cur data-cuelume-hover="tick">
          <svg viewBox="0 0 13 13" fill="none" aria-hidden="true">
            <path d="M12 1L1 12M1 3v9h9" stroke="currentColor" strokeWidth="1.3" />
          </svg>
          All work
        </Link>
        <p className="lt-eyebrow" data-rv="fade" style={{ marginTop: 48 }}>
          {p.num} — {p.tag} · {p.year}
        </p>
        <h1 className="lt-display" data-rv="up">
          <span className="mask-line">
            {p.title}
            <em>.</em>
          </span>
        </h1>
        <p className="lt-lede" data-rv="up" style={{ marginTop: 28 }}>
          {p.intro}
        </p>
      </section>

      <section className="lt-fig" data-rv="up">
        <div className="lt-fig-frame">
          <Image
            src={p.plate}
            alt={`${p.title} — ${p.tag} case study cover`}
            width={1122}
            height={1402}
            sizes="(max-width: 900px) 92vw, 820px"
          />
        </div>
        <div className="lt-fig-meta">
          <span>{p.role}</span>
          <span>{p.year}</span>
        </div>
      </section>

      <section className="lt-story" data-rv="up">
        {p.story.map((para, i) => (
          <p key={i} className="lt-body">
            {para}
          </p>
        ))}
      </section>

      <section className="lt-stats" data-rv="up" style={{ margin: "0 var(--pad)" }}>
        {p.stats.map((s) => (
          <div key={s.span}>
            <b>{s.b}</b>
            <span>{s.span}</span>
          </div>
        ))}
      </section>

      <Link href={`/work/${next.slug}`} className="lt-next" data-cur data-cuelume-hover="tick" data-rv="up">
        <p className="lt-eyebrow">Next case study</p>
        <h2 className="lt-h2">
          {next.title}
          <em>.</em>
        </h2>
        <span className="lt-next-go" aria-hidden="true">
          <svg viewBox="0 0 26 26" fill="none">
            <path d="M8 6h12v12M20 6L6 20" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </span>
      </Link>
    </main>
  );
}
