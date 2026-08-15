import Shape from "@/components/Shape";
import { socials } from "@/data/site";

export default function Contact() {
  return (
    <section id="contact" className="sec fin" data-cam>
      <p className="eyebrow" data-rv="fade">
        <Shape size={15} className="shp--spin" />
        07 — The afterlight
      </p>
      <h2 className="display">
        <span className="mask-line">Let&apos;s build</span>
        <span className="mask-line">something.</span>
      </h2>
      <p className="body" data-rv="up">
        Tell us where you want to go. We&apos;ll bring the bots, the worlds,
        and the intelligence — one senior team, no hand-offs.
      </p>
      <a className="cta" href="mailto:imzyrixx@gmail.com" data-cur data-magnetic="0.1">
        <i aria-hidden="true" />
        <Shape kind="star" size={13} />
        <span>imzyrixx@gmail.com</span>
        <svg viewBox="0 0 13 13" fill="none" aria-hidden="true">
          <path d="M1 12L12 1M12 1H3M12 1v9" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      </a>

      <div className="socs" data-rv="up">
        {socials.map((s) => (
          <a key={s.label} href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined} rel={s.href.startsWith("http") ? "noreferrer" : undefined} className="soc" data-cur data-hover="0.5">
            <span>{s.label}</span>
            <b>{s.value}</b>
          </a>
        ))}
      </div>
    </section>
  );
}