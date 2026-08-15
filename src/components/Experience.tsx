"use client";

import { useEffect, useRef } from "react";
import { initSiteMotion } from "@/lib/motion";
import { initScene } from "@/lib/zyrix-scene";

export default function Experience({ variant = "home" }: { variant?: "home" | "page" }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let handle: ReturnType<typeof initScene> | null = null;
    let fallback = false;
    try {
      handle = initScene(canvas, { pageMode: variant === "page" });
    } catch (err) {
      fallback = true;
      console.error("[zyrix] scene failed", err);
    }

    const cleanMotion = initSiteMotion();

    const focusEls = Array.from(document.querySelectorAll<HTMLElement>("[data-focus]"));
    const onEnter = (e: Event) => handle?.setFocus(Number((e.currentTarget as HTMLElement).dataset.focus));
    const onLeave = () => handle?.setFocus(-1);
    focusEls.forEach((el) => {
      el.addEventListener("pointerenter", onEnter);
      el.addEventListener("pointerleave", onLeave);
    });

    const hoverEls = Array.from(document.querySelectorAll<HTMLElement>("[data-hover]"));
    const onHover = (e: Event) => handle?.setHover(Number((e.currentTarget as HTMLElement).dataset.hover ?? 1));
    const onHoverOff = () => handle?.setHover(0);
    hoverEls.forEach((el) => {
      el.addEventListener("pointerenter", onHover);
      el.addEventListener("pointerleave", onHoverOff);
    });

    if (fallback) {
      document.documentElement.classList.add("no-webgl");
      document.body.classList.add("no-webgl");
    }

    handle?.start();

    if (variant !== "home") {
      document.body.classList.remove("is-locked");
      return () => {
        cleanMotion();
        handle?.destroy();
        focusEls.forEach((el) => {
          el.removeEventListener("pointerenter", onEnter);
          el.removeEventListener("pointerleave", onLeave);
        });
        hoverEls.forEach((el) => {
          el.removeEventListener("pointerenter", onHover);
          el.removeEventListener("pointerleave", onHoverOff);
        });
      };
    }

    document.body.classList.add("is-locked");
    let progress = 0;
    handle?.onPreload((p) => {
      progress = Math.max(progress, p);
    });

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pre = document.getElementById("pre");
    const fill = document.getElementById("pre-fill");
    const pct = document.getElementById("pre-pct");
    const t0 = performance.now();
    const MIN = 900;

    const step = () => {
      const t = (performance.now() - t0) / 1000;
      const p = Math.min(1, Math.max(progress, t / (MIN / 1000)));
      if (fill) fill.style.right = `${(1 - p) * 100}%`;
      if (pct) pct.textContent = `${Math.round(p * 100)}`;
      if (p < 1) {
        requestAnimationFrame(step);
        return;
      }
      pre?.classList.add("done");
      document.body.classList.remove("is-locked");
      const heroItems = Array.from(document.querySelectorAll("#hero [data-rv], #hero .mask-line"));
      heroItems.forEach((el, i) => {
        setTimeout(() => el.classList.add("rv-in"), reduceMotion ? 0 : 120 + i * 95);
      });
    };
    requestAnimationFrame(step);

    return () => {
      document.body.classList.remove("is-locked");
      cleanMotion();
      handle?.destroy();
      focusEls.forEach((el) => {
        el.removeEventListener("pointerenter", onEnter);
        el.removeEventListener("pointerleave", onLeave);
      });
      hoverEls.forEach((el) => {
        el.removeEventListener("pointerenter", onHover);
        el.removeEventListener("pointerleave", onHoverOff);
      });
    };
  }, [variant]);

  return (
    <>
      <canvas id="gl" ref={canvasRef} aria-hidden="true" />
      {variant === "home" && (
        <div id="pre">
          <div className="pre-in">
            <div className="pre-mark">Z</div>
            <div className="pre-jp">ZYRIX DEV</div>
            <div className="pre-bar">
              <i id="pre-fill" />
            </div>
            <div className="pre-meta">
              <span>Loading scene</span>
              <b id="pre-pct">0</b>
            </div>
          </div>
        </div>
      )}
    </>
  );
}