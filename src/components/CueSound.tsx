"use client";

import { useEffect } from "react";

export default function CueSound() {
  useEffect(() => {
    let dispose: (() => void) | undefined;
    let cancelled = false;
    import("cuelume").then(({ bind }) => {
      if (cancelled) return;
      const cleanup = bind();
      dispose = typeof cleanup === "function" ? cleanup : undefined;
    });
    return () => {
      cancelled = true;
      dispose?.();
    };
  }, []);

  return null;
}
