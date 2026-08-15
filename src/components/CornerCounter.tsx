"use client";

import { useEffect, useState } from "react";

export default function CornerCounter() {
  const [secs, setSecs] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const label = String(secs).padStart(4, "0");

  return (
    <div className="corner-count" aria-hidden="true">
      <b>{label}</b>
      <span>in the dark</span>
    </div>
  );
}
