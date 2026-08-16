<div align="center">

<img src="./zyrix-banner.png" alt="Zyrix Dev — digital craft studio" width="100%" />

# ⚡ ZYRIX DEV

**Digital craft studio — work that speaks last, crafted in the dark, built to be seen.**

Discord bots · 3D animated websites · AI tools · SaaS · Automations · Brand systems

</div>

---

## Table of contents

- [Who we are](#-who-we-are)
- [The philosophy](#-the-philosophy)
- [Featured work](#-featured-work)
- [What we build](#-what-we-build)
- [By the numbers](#-by-the-numbers)
- [Tech we craft with](#-tech-we-craft-with)
- [Design system](#-design-system)
- [The site](#-the-site)
- [Project structure](#-project-structure)
- [Run it locally](#-run-it-locally)
- [Deployment](#-deployment)
- [Get in touch](#-get-in-touch)
- [License](#-license)

---

## ✨ Who we are

**Zyrix** is a one-man digital studio for brands and communities that refuse to blend in.
We ship products and experiences that *work* first — then make them impossible to ignore.

Everything that leaves the studio is:

- **Crafted in the dark** — the default state is black. Light is a spotlight, not a background.
- **Built to be seen** — cinematic motion, sharp engineering, design that holds up at 60fps.
- **Engineered, not decorated** — every flourish earns its place in the performance budget.
- **Shipped, not handed over** — we build, deploy, and stay on the line until it runs.

The studio runs on one principle: *the work speaks last.* No noise, no filler — the product
carries the conversation. That's why Zyrix ships bots, platforms, and websites that look like
they cost ten times more than they did.

---

## 🧭 The philosophy

1. **Dark first.** `#05070a` ink, bone type, one lime accent. If it doesn't work in the dark, it doesn't ship.
2. **Motion with meaning.** Animation is never decorative — it explains state, directs attention, and rewards patience.
3. **One craft per build.** One glyph, one accent, one metaphor. Constraints are the brand.
4. **Performance is a feature.** Shaders, not image soup. 60fps or it goes back to the drawing board.
5. **Lasting systems.** Identity and code built to survive years — not launch-week hype.

---

## 🚀 Featured work

### 01 — Orbit · Fintech
**UX · UI · Engineering · 2026**

> A dark, precise fintech platform where every trade feels like it happens in the same room as the market.

The system is built on a single luminous object: the ring. Every portfolio state renders as a
position on the orbit — balance at the core, allocations as satellites, movement as light trails.
Engineered as a server-rendered Next.js app with a WebGL portfolio surface, shipped in seven weeks.

| | |
| --- | --- |
| 🕐 | 7 weeks to ship |
| 🔢 | Order ticket: 11 fields → 4 |
| ⬆️ | 99.9% uptime since launch |

### 02 — Lumen · E-commerce
**UX · UI · Motion · 2026**

> A brand storefront for a lighting house — warm, editorial, and fast enough to feel like a showroom.

The catalog was rebuilt as a scrolling editorial: product pages read like features, the cart is a
sidebar that never interrupts browsing, and motion follows the light — reveals feel like lamps
turning on. Served via Next.js edge rendering with AVIF imagery at three breakpoints.

| | |
| --- | --- |
| 📈 | +38% conversion rate |
| 🪶 | 61% lighter pages |
| ⚡ | 1.2s median LCP |

### 03 — Aster · Brand system
**Identity · Art direction · 2025**

> A complete identity for a research lab — one glyph, one accent, and a typographic system built to survive forty years.

One monolith letterform (the *a*), one accent color, a strict dark palette, and a rulebook small
enough to memorize. Delivered as identity, a working web system, and templates for slides,
signage, and lab notebooks — re-marking the campus within a quarter.

| | |
| --- | --- |
| ✦ | 1 glyph, not a logo |
| ⏳ | Built to last 40 years |
| 🧩 | 12 touchpoints shipped |

---

## 🛠 What we build

| Service | What you get |
| --- | --- |
| 🤖 **Discord Bots** | Moderation, economy, music, leveling & AI agents that live in your server |
| 🌌 **3D Animated Websites** | WebGL scenes, scroll-driven storytelling, custom shaders & post-processing |
| 🧠 **AI Tools** | LLM integrations, agents, chatbots & copilots with RAG pipelines |
| 📦 **SaaS Products** | Full-stack platforms: strategy, builds, auth, billing & growth loops |
| ⚙️ **AI Automations** | Workflows, agents & pipelines that run the busywork for you |
| 🏷️ **Brand & Business Systems** | Identity, design tokens, strategy & launch systems |

---

## 📊 By the numbers

| Metric | Value |
| --- | --- |
| 🤖 Bots shipped | 120+ |
| 🌍 3D worlds built | 24 |
| 🧠 AI agents deployed | 40+ |
| ⭐ Average client rating | 4.9 / 5 |

---

## 💻 Tech we craft with

`Next.js` · `TypeScript` · `React` · `Three.js` · `React Three Fiber` · `GSAP` · `WebGL` · `Tailwind` · `Node.js` · `Python` · `OpenAI` & `LLM APIs` · `PostgreSQL` · `Redis`

---

## 🎨 Design system

The entire site runs on a small set of hand-picked tokens — no frameworks, no bloat:

| Token | Value | Role |
| --- | --- | --- |
| `--ink` | `#05070a` | Page background — near-black |
| `--bone` | `#e6e9e2` | Primary type — warm off-white |
| `--lime` | `#d7ff3f` | Single accent — the spotlight |
| `--muted` | `#8a948d` | Secondary type |
| `--lime-dim` | `#7d8a1f` | Hover & glow states |
| Type | Space Grotesk + Inter | Display + body |

Micro-interactions include a session-seconds counter (*"NNNN in the dark"*), a loading screen
with a lime-bar intro, a scroll cue, a custom cursor, and a giant outline **ZYRIX** wordmark in
the footer.

---

## 🌐 The site

This repository is the home page of Zyrix Dev — a single-page, fully static experience:

```
zyrix-banner.png    Repository banner
zyrix-logo.png      Brand logo
```

---

## 📁 Project structure

```
src/
├── app/                    Next.js App Router
│   ├── page.tsx            Home page (single-page site)
│   ├── layout.tsx          Global layout, loader + nav chrome
│   ├── not-found.tsx       404 page
│   └── globals.css         Design tokens & all styles
├── components/             UI & experience components
│   ├── Hero.tsx            Hero with peek play-card
│   ├── Work.tsx            Featured work grid
│   ├── Services.tsx        Services list
│   ├── Studio.tsx / Vision.tsx / News.tsx / Platform.tsx
│   ├── Stats.tsx           Animated counters
│   ├── Contact.tsx         Contact section
│   ├── Footer.tsx          Footer with polaroid marquee + ZYRIX wordmark
│   ├── Experience.tsx      Loading screen
│   ├── CornerCounter.tsx   Session-seconds counter
│   ├── CueSound.tsx        Cue & sound
│   ├── SiteChrome.tsx      Cursor, scroll cue, chrome
│   └── Shape.tsx           Sparkle ✦ shape
├── data/                   site copy & projects data
└── lib/                    motion + WebGL helpers
public/assets/
├── image/                  Work shots
├── foreground/             SVG scenery layers
└── generated/              Generated artwork
```

---

## 🏃 Run it locally

```bash
npm install
npm run dev        # development — http://localhost:3000
npm run build      # production build
npm start          # serve production build
```

Requires **Node 18.17+** and npm.

---

## 🚢 Deployment

The site is fully static and deployable anywhere:

- **Vercel** — `npx vercel --prod` (zero config)
- **Cloudflare Pages** — set `output: "export"` in `next.config.ts`, then `wrangler pages deploy out`
- **Any static host** — copy the `out/` directory after `next build`

---

## 📬 Get in touch

- **Email** — [imzyrixx@gmail.com](mailto:imzyrixx@gmail.com)
- **Discord** — `imzyrixx`
- **Instagram** — [@imzyrix](https://instagram.com/imzyrix)
- **GitHub** — [imzyrix](https://github.com/imzyrix)
- **YouTube** — [@imzyrix](https://youtube.com/@imzyrix)

Open for new projects — *available worldwide, remote-first.*

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE).

<div align="center">

*Digital after dark — © 2026 Zyrix Dev. All rights reserved.*

</div>
