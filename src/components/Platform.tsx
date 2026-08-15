import Link from "next/link";
import Shape from "@/components/Shape";

const stack = [
  {
    k: "01",
    name: "Nexus",
    role: "Discord bot platform",
    desc: "The engine behind every bot we ship — moderation, economy, music, tickets, and AI agents that run entire communities on one slash command.",
    tags: ["Discord API", "Node.js", "AI agents"],
  },
  {
    k: "02",
    name: "Forge",
    role: "3D & WebGL engine",
    desc: "Cinematic scroll systems, shader worlds, and post-processed scenes — the craft layer that makes a brand impossible to ignore.",
    tags: ["Three.js", "WebGL", "GSAP"],
  },
  {
    k: "03",
    name: "Cortex",
    role: "AI automation layer",
    desc: "LLM pipelines, agents, and workflows that run the busywork — CRM, invoices, follow-ups, and support handled while you sleep.",
    tags: ["LLMs", "Agents", "Workflows"],
  },
];

export default function Platform() {
  return (
    <section id="platform" className="sec" data-cam>
      <div className="sec-head">
        <p className="k">
          <Shape size={14} />
          <b>04</b> — The stack
        </p>
        <div className="rule" aria-hidden="true" />
      </div>

      <div className="cur-head">
        <h2 className="display h-sec">
          <span className="mask-line">Three layers,</span>
          <span className="mask-line">one system.</span>
        </h2>
        <p className="body" data-rv="up">
          Everything we build runs on the same internal stack — battle-tested
          on client work before it ever touches yours.
        </p>
      </div>

      <div className="pl">
        {stack.map((p) => (
          <Link key={p.k} href="#services" className="pl-row" data-cur data-hover="0.7">
            <span className="pl-k">{p.k}</span>
            <div className="pl-main">
              <h3 className="display">{p.name}</h3>
              <span className="pl-role">{p.role}</span>
            </div>
            <p className="pl-desc">{p.desc}</p>
            <span className="pl-tags">
              {p.tags.map((t) => (
                <i key={t}>{t}</i>
              ))}
            </span>
            <span className="pl-ar" aria-hidden="true">
              <svg viewBox="0 0 26 26" fill="none">
                <path d="M8 6h12v12M20 6L6 20" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}