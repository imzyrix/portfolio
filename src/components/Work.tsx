import { projects } from "@/data/projects";
import Shape from "@/components/Shape";

export default function Work() {
  return (
    <section id="work" className="sec" data-cam>
      <div className="sec-head">
        <p className="k">
          <Shape size={14} />
          <b>01</b> — The work
        </p>
        <div className="rule" aria-hidden="true" />
      </div>

      <div className="w-list">
        {projects.map((card) => (
          <div
            key={card.slug}
            className="w-row"
            data-cur
            data-focus={card.focus}
            data-hover="0.85"
          >
            <span className="w-idx" aria-hidden="true">
              {card.num}
            </span>
            <h3 className="display">
              <span className="mask-line">{card.title}.</span>
            </h3>
            <span className="w-tags">
              <i>{card.tag}</i>
              <i>{card.role}</i>
              <i>{card.year}</i>
            </span>
            <span className="w-ar" aria-hidden="true">
              <svg viewBox="0 0 26 26" fill="none">
                <path d="M8 6h12v12M20 6L6 20" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </span>
          </div>
        ))}
      </div>

      <a href="#work" className="w-more" data-cur data-hover="0.5">
        <span>All work</span>
        <Shape kind="star" size={13} className="shp--muted" />
        <svg viewBox="0 0 26 26" fill="none" aria-hidden="true">
          <path d="M8 6h12v12M20 6L6 20" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      </a>

      <div className="fg" data-fg="work" aria-hidden="true">
        <span className="fg-el fg-el--sway" data-fg-in="left">
          <img src="/assets/foreground/fg-sakura.svg" alt="" loading="lazy" />
        </span>
        <span className="fg-el fg-el--sway" data-fg-in="right">
          <img src="/assets/foreground/fg-leaves.svg" alt="" loading="lazy" />
        </span>
        <span className="fg-el" data-fg-in="up">
          <img src="/assets/foreground/fg-lantern.svg" alt="" loading="lazy" />
        </span>
        <span className="fg-el" data-fg-in="up">
          <img src="/assets/foreground/fg-bush.svg" alt="" loading="lazy" />
        </span>
      </div>
    </section>
  );
}