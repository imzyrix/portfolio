import Link from "next/link";
import Shape from "@/components/Shape";

export default function NotFound() {
  return (
    <main className="page-content lt">
      <section className="lt-hero" data-rv="up">
        <p className="lt-eyebrow" data-rv="fade">
          404 — Lost in the dark
        </p>
        <h1 className="lt-display" data-rv="up">
          <span className="mask-line">This page</span>
          <span className="mask-line">
            doesn&apos;t <em>exist.</em>
          </span>
        </h1>
        <p className="lt-lede" data-rv="up" style={{ marginTop: 28 }}>
          The link is dead, the URL is wrong, or the page moved. Either way —
          the door back is right there.
        </p>
        <Link className="lt-cta" href="/" data-cur data-cuelume-hover="tick" style={{ marginTop: 36 }}>
          <Shape kind="star" size={13} />
          <span>Back to base</span>
          <svg viewBox="0 0 13 13" fill="none" aria-hidden="true">
            <path d="M1 12L12 1M12 1H3M12 1v9" stroke="currentColor" strokeWidth="1.3" />
          </svg>
        </Link>
      </section>
    </main>
  );
}
