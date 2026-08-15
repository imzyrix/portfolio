import type { Metadata } from "next";
import Shape from "@/components/Shape";
import ContactForm from "@/components/ContactForm";
import { socials } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact — Zyrix Dev",
  description: "Start a project with Zyrix Dev — strategy, design, and engineering under one roof.",
};

const faqs = [
  {
    q: "What does an engagement cost?",
    a: "Depends on scope, not hours. Brand systems start around $15k, full web builds from $25k. You get a fixed number up front — the number we agree on is the number you pay.",
  },
  {
    q: "How long does a project take?",
    a: "Strategy takes a week, most builds take four to eight. We work in weekly demo cycles, so you see the thing moving from week one — no black boxes.",
  },
  {
    q: "Do you work with startups or only big brands?",
    a: "Both — the fit is about the brief, not the logo. If you can decide in one room and you care about craft, we can work.",
  },
  {
    q: "What happens after launch?",
    a: "We stay for measurement: performance, conversion, uptime. Most clients keep us on a monthly retainer for iteration. Launch is the midpoint, not the end.",
  },
];

export default function ContactPage() {
  return (
    <main className="page-content">
      <section className="pg-hero fin" data-rv="up">
        <p className="eyebrow" data-rv="fade">
          <Shape size={15} className="shp--spin" />
          07 — The afterlight
        </p>
        <h1 className="display">
          <span className="mask-line"><span>Let&apos;s build</span></span>
          <span className="mask-line"><span><em>something.</em></span></span>
        </h1>
        <p className="body pg-lede" data-rv="up">
          Tell us where you want to go. We&apos;ll bring the strategy, the
          design, and the build — one senior team, no hand-offs.
        </p>
        <a className="cta" href="mailto:imzyrixx@gmail.com" data-cur data-magnetic="0.1" data-cuelume-hover="tick" data-cuelume-press>
          <i aria-hidden="true" />
          <Shape kind="star" size={13} />
          <span>imzyrixx@gmail.com</span>
          <svg viewBox="0 0 13 13" fill="none" aria-hidden="true">
            <path d="M1 12L12 1M12 1H3M12 1v9" stroke="currentColor" strokeWidth="1.3" />
          </svg>
        </a>
      </section>

      <section className="pg-contact-rs" data-rv="up">
        <div className="pc-left">
          <p className="pc-promise">
            The number we agree on is the number you pay — fixed up front, no hours,
            no surprise phases.
          </p>
          <div className="pc-ch">
            <div>
              <h3>Studio</h3>
              <p>
                Remote-first, worldwide.
                <br />
                Available for new engagements.
              </p>
            </div>
            <div>
              <h3>Reach</h3>
              <p>
                <a href="mailto:imzyrixx@gmail.com" className="underline-link" data-cur data-cuelume-hover="tick">
                  imzyrixx@gmail.com
                </a>
                <br />
                Replies within 24 hours.
              </p>
            </div>
            <div>
              <h3>Socials</h3>
              <p>
                {socials
                  .filter((s) => s.label !== "Email")
                  .map((s, i) => (
                    <span key={s.label}>
                      {i > 0 && " · "}
                      <a href={s.href} target="_blank" rel="noreferrer" className="underline-link" data-cur data-cuelume-hover="tick">
                        {s.label}
                      </a>
                    </span>
                  ))}
              </p>
            </div>
          </div>
        </div>
        <div className="pc-right">
          <ContactForm />
        </div>
      </section>

      <section className="pg-faq">
        <p className="eyebrow">Before you write</p>
        <div className="faq">
          {faqs.map((f) => (
            <details key={f.q} className="faq-item">
              <summary data-cur>
                <span>{f.q}</span>
                <i aria-hidden="true" />
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}