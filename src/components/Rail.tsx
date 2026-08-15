"use client";

import { useEffect } from "react";

const homeLabels = ["Threshold", "Notes", "Work", "Studio", "Vision", "Stack", "Services", "Numbers", "Contact", "Colophon"];
const zyrixLabels = ["Top", "Story", "Line", "Stack", "Contact", "Colophon"];

export default function Rail({ labels = homeLabels }: { labels?: string[] }) {
  useEffect(() => {
    const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>(".rail button"));
    let anchors: number[] = [];
    let maxScroll = 1;
    let active = 0;

    const measure = () => {
      maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const secs = Array.from(document.querySelectorAll<HTMLElement>("[data-cam]"));
      anchors = secs.map((el, i) => {
        if (i === 0) return 0;
        if (i === secs.length - 1) return maxScroll;
        return Math.min(Math.max(el.offsetTop + el.offsetHeight * 0.5 - window.innerHeight * 0.5, 0), maxScroll);
      });
      for (let i = 1; i < anchors.length; i++) anchors[i] = Math.max(anchors[i], anchors[i - 1] + 1);
    };

    const update = () => {
      const y = window.scrollY;
      let idx = 0;
      for (let i = 0; i < anchors.length - 1; i++) {
        if (y >= anchors[i]) idx = i;
      }
      if (y >= anchors[anchors.length - 1]) idx = anchors.length - 1;
      if (idx !== active) {
        active = idx;
        buttons.forEach((b, i) => b.classList.toggle("on", i === idx));
      }
    };

    measure();
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", () => {
      measure();
      update();
    });

    const onClick = (e: Event) => {
      const btn = e.currentTarget as HTMLButtonElement;
      const i = Number(btn.dataset.index);
      const secs = document.querySelectorAll<HTMLElement>("[data-cam]");
      secs[i]?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    };
    buttons.forEach((b) => b.addEventListener("click", onClick));

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      buttons.forEach((b) => b.removeEventListener("click", onClick));
    };
  }, []);

  return (
    <nav className="rail" aria-label="Chapter navigation">
      {labels.map((label, i) => (
        <button key={label} data-index={i} aria-label={label} title={label}>
          <i />
        </button>
      ))}
    </nav>
  );
}