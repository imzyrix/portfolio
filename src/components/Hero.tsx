import Link from "next/link";
import Shape from "@/components/Shape";

const chapters = [
  { num: "01", title: "Work", desc: "Selected builds", focus: 1, href: "#work" },
  { num: "02", title: "Studio", desc: "Who we are", focus: 2, href: "#studio" },
  { num: "03", title: "Services", desc: "Bots · 3D · AI · SaaS", focus: 3, href: "#services" },
  { num: "04", title: "Contact", desc: "Start a project", focus: 4, href: "#contact" },
];

export default function Hero() {
  return (
    <section id="hero" className="hero" data-cam>
      <div className="hero-top">
        <p className="eyebrow" data-rv="fade">
          <Shape size={15} className="shp--spin" />
          Zyrix Dev — digital craft studio
        </p>
        <h1 className="display h-hero">
          <span className="mask-line">We build digital worlds</span>
          <span className="mask-line">that move brands.</span>
        </h1>
        <p className="hero-sub body-lg" data-rv="up">
          Discord bots. Animated 3D websites. AI tools, SaaS products, and
          automations — engineered for brands that refuse to be quiet.
        </p>
      </div>

      <Shape size={128} color="rgba(230,233,226,0.08)" className="spk spk-hero spk--turn" />

      <Link className="peek" href="#work" data-cur>
        <span className="peek-fr" />
        <span className="peek-play" aria-hidden="true">
          <svg viewBox="0 0 46 46" fill="none">
            <circle cx="23" cy="23" r="22.5" stroke="currentColor" strokeOpacity="0.6" />
            <path d="M18 15.5v15l12.5-7.5L18 15.5z" fill="#e6e9e2" />
          </svg>
        </span>
        <span className="peek-cap">
          <b>ZYRIX</b>
          <i>Chapter 01 — The threshold</i>
        </span>
        <Shape kind="star" size={18} className="shp--float" />
      </Link>

      <div className="hero-side" aria-hidden="true">
        <span className="v">Digital after dark</span>
      </div>

      <div className="hero-spacer" />

      <div className="hero-foot">
        <div className="hero-cue" aria-hidden="true">
          <span>Scroll</span>
          <span className="track">
            <i />
          </span>
        </div>
        <div className="chapters">
          {chapters.map((c) => (
            <Link key={c.title} href={c.href} className="chip" data-cur data-focus={c.focus} data-magnetic="0.06">
              <span className="num">{c.num}</span>
              <span className="tx">
                <b>{c.title}</b>
                <p>{c.desc}</p>
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="fg" data-fg="hero" aria-hidden="true">
        <span className="fg-el fg-el--sway" data-fg-in="left">
          <img src="/assets/foreground/fg-arch.svg" alt="" loading="lazy" />
        </span>
        <span className="fg-el fg-el--sway" data-fg-in="right">
          <img src="/assets/foreground/fg-pines.svg" alt="" loading="lazy" />
        </span>
        <span className="fg-el" data-fg-in="up">
          <img src="/assets/foreground/fg-grass.svg" alt="" loading="lazy" />
        </span>
      </div>
    </section>
  );
}