"use client";

import { useEffect, useRef } from "react";

export default function CornerCounter() {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const node = ref.current;
    let secs = 0;
    const t = setInterval(() => {
      secs += 1;
      if (node) node.textContent = String(secs).padStart(4, "0");
    }, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="corner-count" aria-hidden="true">
      <b ref={ref}>0000</b>
      <span>in the dark</span>
    </div>
  );
}
