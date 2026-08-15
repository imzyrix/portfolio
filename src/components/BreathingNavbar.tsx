"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import Shape from "@/components/Shape";

const links = [
  { href: "#work", label: "Work" },
  { href: "#studio", label: "Studio" },
  { href: "#vision", label: "Zyrix" },
  { href: "#services", label: "Services" },
];

export default function BreathingNavbar() {
  const [open, setOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        burgerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="bnav" data-hover="0.3">
      <div className="bnav-glow" aria-hidden="true" />
      <div className="bnav-bar">
        <Link href="/" className="bnav-logo" data-cur>
          <svg className="bnav-asterisk" width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9L4.9 19.1" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
          </svg>
          <b>ZYRIX</b>
        </Link>

        <nav className="bnav-links" aria-label="Primary">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="bnav-pill" data-cur data-cuelume-hover="tick">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="bnav-actions">
          <Link href="mailto:imzyrixx@gmail.com" className="bnav-cta" data-cur data-hover="0.5">
            <Shape kind="star" size={12} />
            Let&apos;s talk
          </Link>
          <button
            type="button"
            ref={burgerRef}
            className="bnav-burger"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="bnav-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ type: "spring", bounce: 0.18, duration: 0.55 }}
          >
            {links.map((l, i) => (
              <motion.div
                key={l.href}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i, type: "spring", bounce: 0.18, duration: 0.55 }}
              >
                <Link href={l.href} className="bnav-drawer-link" onClick={() => setOpen(false)}>
                  {l.label}
                </Link>
              </motion.div>
            ))}
            <Link href="mailto:imzyrixx@gmail.com" className="bnav-cta bnav-drawer-cta" onClick={() => setOpen(false)}>
              <Shape kind="star" size={12} />
              Let&apos;s talk
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}