import Link from "next/link";
import Shape from "@/components/Shape";
import { socials } from "@/data/site";

const socialLinks = socials.filter((s) => s.label !== "Email");

export default function Footer() {
  return (
    <footer className="foot" data-cam>
      <div className="mq polaroid-mq" aria-hidden="true">
        <div className="mq-track polaroid-track">
          {[0, 1].map((dup) =>
            [
              { t: "Orbit — 2026", img: "/assets/image/zyrix-work-1.webp", r: "-4deg" },
              { t: "Lumen — 2026", img: "/assets/image/zyrix-work-2.webp", r: "3deg" },
              { t: "Aster — 2025", img: "/assets/image/zyrix-work-3.webp", r: "-2deg" },
              { t: "Zyrix Dev", img: "/assets/image/zyrix-peek.webp", r: "4deg" },
            ].map((p, j) => (
              <figure key={`${dup}-${j}`} className="polaroid" style={{ rotate: p.r }}>
                <img src={p.img} alt="" loading="lazy" />
                <figcaption>{p.t}</figcaption>
              </figure>
            ))
          )}
        </div>
      </div>

      <div className="foot-grid">
        <div className="foot-brand">
          <span className="brand-mark" aria-hidden="true">
            Z
          </span>
          <Shape kind="star" size={14} className="shp--float" />
          <p>
            Work that speaks last — crafted in the dark, built to be seen.
          </p>
        </div>
        <div>
          <h4>Chapters</h4>
          <ul>
            <li>
              <Link href="#work">Work</Link>
            </li>
            <li>
              <Link href="#studio">Studio</Link>
            </li>
            <li>
              <Link href="#services">Services</Link>
            </li>
            <li>
              <Link href="#contact">Contact</Link>
            </li>
            <li>
              <Link href="#vision">The founder</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li>
              <a href={socials[0].href}>{socials[0].value}</a>
            </li>
            {socialLinks.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer">
                  {s.label} — {s.value}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Studio</h4>
          <ul>
            <li>
              <a href="mailto:imzyrixx@gmail.com">Available worldwide</a>
            </li>
            <li>
              <a href="#studio">Remote-first</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="foot-base">
        <span>© {new Date().getFullYear()} Zyrix Dev</span>
        <span>All rights reserved</span>
        <span>Digital after dark</span>
      </div>

      <div className="fg" data-fg="foot" aria-hidden="true">
        <span className="fg-el" data-fg-in="left">
          <img src="/assets/foreground/fg-bush.svg" alt="" loading="lazy" />
        </span>
        <span className="fg-el" data-fg-in="right">
          <img src="/assets/foreground/fg-grass.svg" alt="" loading="lazy" />
        </span>
        <span className="fg-el" data-fg-in="up">
          <img src="/assets/foreground/fg-stones.svg" alt="" loading="lazy" />
        </span>
      </div>
    </footer>
  );
}