import Shape from "@/components/Shape";

const stats = [
  { b: "Senior", span: "Team" },
  { b: "Direct", span: "Communication" },
  { b: "Owned", span: "End to end" },
  { b: "Measured", span: "Results" },
];

export default function Studio() {
  return (
    <section id="studio" className="sec" data-cam>
      <div className="sec-head">
        <p className="k">
          <Shape size={14} />
          <b>02</b> — The studio
        </p>
        <div className="rule" aria-hidden="true" />
      </div>

      <div className="story-grid">
        <h2 className="display h-sec">
          <span className="mask-line">One studio,</span>
          <span className="mask-line">every frame earns its place.</span>
        </h2>
        <div className="story-copy">
          <p className="lead" data-rv="up">
            Zyrix Dev is a small digital studio building bots, worlds, and
            intelligence — where the only light is the work itself.
          </p>
          <p className="body" data-rv="up">
            Discord engineering, 3D and WebGL craft, AI product work, and SaaS
            builds under one roof. No hand-offs, no account managers, no noise —
            just a senior team that stays in the room until the thing ships and
            keeps working after it does.
          </p>
          <a className="arrowlink" href="#services" data-cur>
            <span className="ar" aria-hidden="true">
              <svg viewBox="0 0 13 13" fill="none">
                <path d="M1 12L12 1M12 1H3M12 1v9" stroke="currentColor" strokeWidth="1.3" />
              </svg>
            </span>
            Explore the craft
          </a>
        </div>
      </div>

      <div className="story-stats">
        {stats.map((s, i) => (
          <div key={s.span} data-rv="up">
            <b>{s.b}</b>
            <span>{s.span}</span>
          </div>
        ))}
      </div>

      <div className="fg" data-fg="studio" aria-hidden="true">
        <span className="fg-el fg-el--sway" data-fg-in="right">
          <img src="/assets/foreground/fg-wall.svg" alt="" loading="lazy" />
        </span>
        <span className="fg-el" data-fg-in="left">
          <img src="/assets/foreground/fg-stones.svg" alt="" loading="lazy" />
        </span>
        <span className="fg-el" data-fg-in="up">
          <img src="/assets/foreground/fg-grass.svg" alt="" loading="lazy" />
        </span>
      </div>
    </section>
  );
}