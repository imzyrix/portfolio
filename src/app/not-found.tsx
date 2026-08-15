import Link from "next/link";
import Shape from "@/components/Shape";

export default function NotFound() {
  return (
    <main className="page-content">
      <section className="pg-hero fin" data-rv="up">
        <p className="eyebrow" data-rv="fade">
          <Shape size={15} className="shp--spin" />
          404 — Lost in the dark
        </p>
        <h1 className="display">
          <span className="mask-line">This page</span>
          <span className="mask-line">doesn&apos;t exist.</span>
        </h1>
        <p className="body pg-lede" data-rv="up">
          The link is dead, the URL is wrong, or the page moved. Either way —
          the door back is right there.
        </p>
        <Link className="cta" href="/" data-cur>
          <i aria-hidden="true" />
          <Shape kind="star" size={13} />
          <span>Back to base</span>
        </Link>
      </section>
    </main>
  );
}
