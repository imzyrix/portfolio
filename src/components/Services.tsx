import Link from "next/link";
import Shape from "@/components/Shape";
import { services } from "@/data/site";

export default function Services() {
  return (
    <section id="services" className="sec" data-cam>
      <div className="sec-head">
        <p className="k">
          <Shape size={14} />
          <b>05</b> — The services
        </p>
        <div className="rule" aria-hidden="true" />
      </div>

      <div className="cur-head">
        <h2 className="display h-sec">
          <span className="mask-line">Six ways</span>
          <span className="mask-line">we move brands.</span>
        </h2>
        <p className="body" data-rv="up">
          Everything a brand needs to be built and be seen — bots, worlds, and
          intelligence. Every engagement starts with strategy and ends with shipping.
        </p>
      </div>

      <div className="cur">
        {services.map((s) => (
          <Link key={s.k} href="#services" className="les les--big" data-cur data-focus={4} data-hover="0.7">
            <span className="k">{s.k}</span>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
            <span className="t">{s.t}</span>
            <span className="bar" aria-hidden="true" />
          </Link>
        ))}
      </div>

      <div className="fg" data-fg="services" aria-hidden="true">
        <span className="fg-el" data-fg-in="up">
          <img src="/assets/foreground/fg-hill.svg" alt="" loading="lazy" />
        </span>
        <span className="fg-el" data-fg-in="left">
          <img src="/assets/foreground/fg-ruins.svg" alt="" loading="lazy" />
        </span>
        <span className="fg-el" data-fg-in="right">
          <img src="/assets/foreground/fg-grass.svg" alt="" loading="lazy" />
        </span>
        <span className="fg-el fg-el--sway" data-fg-in="left">
          <img src="/assets/foreground/fg-sakura.svg" alt="" loading="lazy" />
        </span>
      </div>
    </section>
  );
}