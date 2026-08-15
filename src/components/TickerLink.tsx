"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import Shape from "@/components/Shape";

const items = [
  { title: "Discord Bots", image: "/assets/image/zyrix-work-1.webp", href: "/services" },
  { title: "3D Worlds", image: "/assets/image/zyrix-work-2.webp", href: "/work" },
  { title: "AI & SaaS", image: "/assets/image/zyrix-work-3.webp", href: "/services" },
];

export default function TickerLink() {
  const [active, setActive] = useState<number | null>(null);
  const row = [...items, ...items];

  return (
    <section className="tick" data-hover="0.4" aria-label="Services">
      <div className="tick-stage">
        <AnimatePresence>
          {active !== null && (
            <motion.div
              key={active}
              className="tick-veil"
              role="presentation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <img src={items[active].image} alt="" />
              <p className="tick-title">
                {items[active].title}
                <Link href={items[active].href} className="tick-go" data-cur>
                  View
                </Link>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="tick-track" aria-hidden="true">
        {row.map((it, i) => (
          <Link
            key={i}
            href={it.href}
            className="tick-item"
            data-cur
            onMouseEnter={() => setActive(i % items.length)}
            onFocus={() => setActive(i % items.length)}
            onMouseLeave={() => setActive(null)}
            onBlur={() => setActive(null)}
          >
            <Shape kind="star" size={12} className="shp--muted" />
            {it.title}
            <span className="tick-arrow">&#8599;</span>
          </Link>
        ))}
      </div>
    </section>
  );
}