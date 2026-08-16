import Link from "next/link";
import Shape from "@/components/Shape";
import { socials } from "@/data/site";

const socialLinks = socials.filter((s) => s.label !== "Email");

export default function Footer() {
  return (
    <footer className="foot" data-cam>
      <div className="foot-grid">
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

      <div className="foot-wordmark" aria-hidden="true">
        <Shape size={150} color="rgba(215,255,63,0.4)" className="spk spk-foot spk--float" />
        ZYRIX
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