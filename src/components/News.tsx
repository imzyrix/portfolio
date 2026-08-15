import Shape from "@/components/Shape";

const notes = [
  {
    d: "2026.07",
    t: "Bot v3 — AI agents land in Discord",
    x: "Product",
    c: "The Nexus bot platform ships agent mode: chat, tickets, and ops from a single slash command.",
  },
  {
    d: "2026.06",
    t: "WebGL launch for a streetwear brand",
    x: "Build",
    c: "Cinematic scroll site — 60fps scene, custom shaders, zero jank on mobile.",
  },
  {
    d: "2026.05",
    t: "Automation pipeline cuts ops time 60%",
    x: "Automation",
    c: "An agent pipeline for a service business — invoices, follow-ups, and CRM run themselves.",
  },
  {
    d: "2026.04",
    t: "SaaS v1 ships — built end to end",
    x: "Product",
    c: "A subscription product from zero: auth, billing, dashboard, launch.",
  },
];

export default function News() {
  return (
    <section id="news" className="sec" data-cam>
      <div className="sec-head">
        <p className="k">
          <Shape size={14} />
          <b>00</b> — Field notes
        </p>
        <div className="rule" aria-hidden="true" />
      </div>

      <div className="nn-list">
        {notes.map((n) => (
          <article key={n.t} className="nn-row" data-rv="up" data-hover="0.4">
            <time className="nn-date">{n.d}</time>
            <h3 className="nn-title">{n.t}</h3>
            <span className="nn-tag">{n.x}</span>
            <p className="nn-note">{n.c}</p>
          </article>
        ))}
      </div>
    </section>
  );
}