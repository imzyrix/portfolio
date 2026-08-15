import { gsap } from "gsap";

export function initSiteMotion(): () => void {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const grainEl = document.getElementById("grain");
  if (grainEl) {
    const c = document.createElement("canvas");
    c.width = c.height = 180;
    const g = c.getContext("2d")!;
    const img = g.createImageData(180, 180);
    for (let i = 0; i < img.data.length; i += 4) {
      const v = Math.floor(Math.random() * 255);
      img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
      img.data[i + 3] = 255;
    }
    g.putImageData(img, 0, 0);
    grainEl.style.backgroundImage = `url(${c.toDataURL()})`;
  }

  function splitHeadingWords() {
    if (reduceMotion) return;
    document.querySelectorAll("h1.display, h2.display").forEach((heading) => {
      const lines = heading.querySelectorAll<HTMLElement>(".mask-line");
      const targets = lines.length ? Array.from(lines) : [heading as HTMLElement];
      targets.forEach((target) => {
        if (target.dataset.wordReady === "true") return;
        const phrase = target.textContent!.replace(/\s+/g, " ").trim();
        if (!phrase) return;
        target.dataset.wordReady = "true";
        target.classList.add("word-reveal");
        target.setAttribute("aria-label", phrase);
        target.textContent = "";
        phrase.split(" ").forEach((word, i) => {
          if (i) target.appendChild(document.createTextNode(" "));
          const mask = document.createElement("span");
          const inner = document.createElement("span");
          mask.className = "word-mask";
          mask.setAttribute("aria-hidden", "true");
          inner.className = "word";
          inner.textContent = word;
          inner.style.setProperty("--word-delay", String(i * 72) + "ms");
          mask.appendChild(inner);
          target.appendChild(mask);
        });
      });
    });
  }

  splitHeadingWords();

  const groups = new Map<HTMLElement, HTMLElement[]>();
  const items = Array.from(document.querySelectorAll<HTMLElement>("[data-rv], .mask-line"));
  items.forEach((el) => {
    const key = el.parentElement!;
    const arr = groups.get(key) || [];
    arr.push(el);
    groups.set(key, arr);
  });
  groups.forEach((arr) => {
    arr.forEach((el, i) => {
      el.dataset.rvd = String(i * 85);
    });
  });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        io.unobserve(entry.target);
        const d = parseFloat((entry.target as HTMLElement).dataset.rvd || "0");
        setTimeout(() => (entry.target as HTMLElement).classList.add("rv-in"), reduceMotion ? 0 : d);
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.04 }
  );
  items.forEach((el) => {
    if (!el.closest("#hero")) io.observe(el);
  });

  const cleanups: Array<() => void> = [];
  const gsapTargets: Array<Element> = [];

  if (fine && !reduceMotion) {
    const dot = document.getElementById("cur-dot");
    if (dot) {
      gsapTargets.push(dot);
      const xTo = gsap.quickTo(dot, "x", { duration: 0.35, ease: "power3.out" });
      const yTo = gsap.quickTo(dot, "y", { duration: 0.35, ease: "power3.out" });
      const onMove = (e: PointerEvent) => {
        xTo(e.clientX);
        yTo(e.clientY);
      };
      const onOver = (e: PointerEvent) => {
        if ((e.target as HTMLElement).closest("[data-cur], a, button, .chip, .card, .les, .cta")) {
          dot.classList.add("act");
        }
      };
      const onOut = (e: PointerEvent) => {
        if ((e.target as HTMLElement).closest("[data-cur], a, button, .chip, .card, .les, .cta")) {
          dot.classList.remove("act");
        }
      };
      document.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerover", onOver, { passive: true });
      document.addEventListener("pointerout", onOut, { passive: true });
      cleanups.push(() => {
        document.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerover", onOver);
        document.removeEventListener("pointerout", onOut);
      });
    }

    document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
      gsapTargets.push(el);
      const strength = Number(el.dataset.magnetic || 0.12);
      const xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" });
      const onMove = (e: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        xTo((e.clientX - rect.left - rect.width / 2) * strength);
        yTo((e.clientY - rect.top - rect.height / 2) * strength);
      };
      const onLeave = () => {
        xTo(0);
        yTo(0);
      };
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
      cleanups.push(() => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
      });
    });
  }

  const sky = document.getElementById("fg-sky");
  const stages = Array.from(document.querySelectorAll<HTMLElement>(".sec .fg, .foot .fg"))
    .map((stage) => ({ section: stage.closest(".sec, .foot") as HTMLElement | null, stage }))
    .filter((p) => p.section);

  if (sky && stages.length) {
    const homes = new WeakMap<HTMLElement, HTMLElement>();
    stages.forEach(({ stage, section }) => homes.set(stage, section!));
    let active: HTMLElement | null = null;

    const lift = (stage: HTMLElement) => {
      if (stage.parentNode === sky) return;
      sky.appendChild(stage);
      void stage.offsetWidth;
      stage.classList.add("fg-active");
      active = stage;
    };
    const retire = (stage: HTMLElement, section: HTMLElement) => {
      if (stage !== active) return;
      active = null;
      stage.classList.remove("fg-active");
      stage.classList.add("fg-retiring");
      setTimeout(() => {
        stage.classList.remove("fg-retiring");
        section.appendChild(stage);
      }, reduceMotion ? 0 : 820);
    };

    const fgIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const stage = stages.find((s) => s.section === entry.target)?.stage;
          if (!stage) return;
          if (entry.isIntersecting) {
            if (active && active !== stage) retire(active, homes.get(active)!);
            lift(stage);
          } else if (active === stage) {
            retire(stage, homes.get(stage)!);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0 }
    );
    stages.forEach(({ section }) => fgIo.observe(section!));
    cleanups.push(() => fgIo.disconnect());
  }

  return () => {
    io.disconnect();
    cleanups.forEach((fn) => fn());
    gsapTargets.forEach((t) => gsap.killTweensOf(t));
  };
}