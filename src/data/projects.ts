export type Project = {
  slug: string;
  num: string;
  title: string;
  tag: string;
  role: string;
  year: string;
  plate: string;
  intro: string;
  story: string[];
  stats: { b: string; span: string }[];
  focus: number;
  glow: { gx: string; gy: string; gr: string; gc1: string; gc2: string; gt: string; gt2: string };
};

export const projects: Project[] = [
  {
    slug: "orbit",
    num: "01",
    title: "Orbit",
    tag: "Fintech",
    role: "UX · UI · Engineering",
    year: "2026",
    plate: "/assets/image/zyrix-work-1.webp",
    intro:
      "A dark, precise fintech platform where every trade feels like it happens in the same room as the market.",
    story: [
      "Orbit needed to feel trustworthy at scale: real-time balances, portfolio intelligence, and a clean mental model for people who think in orders, not dashboards. We started with the moment of maximum anxiety — the order ticket — and designed backward.",
      "The system is built on a single luminous object: the ring. Every state of the portfolio renders as a position on the orbit — balance at the core, allocations as satellites, movement as light trails. Numbers stay numbers; the metaphor carries the narrative.",
      "Engineered as a server-rendered Next.js app with a WebGL portfolio surface, shipped in seven weeks. The order ticket went from an industry-average 11 fields to four.",
    ],
    stats: [
      { b: "7", span: "Weeks to ship" },
      { b: "11 → 4", span: "Order fields" },
      { b: "99.9%", span: "Uptime since launch" },
    ],
    focus: 1,
    glow: { gx: '16%', gy: '62%', gr: '26%', gc1: 'rgba(215,255,63,0.8)', gc2: 'rgba(150,180,40,0.22)', gt: '7s', gt2: '9s' },
  },
  {
    slug: "lumen",
    num: "02",
    title: "Lumen",
    tag: "E-commerce",
    role: "UX · UI · Motion",
    year: "2026",
    plate: "/assets/image/zyrix-work-2.webp",
    intro:
      "A brand storefront for a lighting house — warm, editorial, and fast enough to feel like a showroom.",
    story: [
      "Lumen sells light, which meant the store itself had to behave like a gallery: dark walls, one warm source per product, and copy that knows the difference between a pendant and a scandal.",
      "We rebuilt the catalog as a scrolling editorial: product pages read like features, the cart is a sidebar that never interrupts the browse, and checkout is a single focused column. Motion follows the light — reveals feel like lamps turning on.",
      "The build ships on a headless storefront with Next.js edge rendering; product images are served as AVIF at three breakpoints. Median page weight dropped 61%.",
    ],
    stats: [
      { b: "+38%", span: "Conversion rate" },
      { b: "61%", span: "Lighter pages" },
      { b: "1.2s", span: "Median LCP" },
    ],
    focus: 2,
    glow: { gx: '84%', gy: '38%', gr: '20%', gc1: 'rgba(255,158,61,0.75)', gc2: 'rgba(200,110,30,0.2)', gt: '6s', gt2: '8s' },
  },
  {
    slug: "aster",
    num: "03",
    title: "Aster",
    tag: "Brand system",
    role: "Identity · Art direction",
    year: "2025",
    plate: "/assets/image/zyrix-work-3.webp",
    intro:
      "A complete identity for a research lab — one glyph, one accent, and a typographic system built to survive forty years.",
    story: [
      "Aster is a materials research collective. Their old identity was a gradient and a font they'd stopped trusting. We gave them a single monolithic letterform and a rulebook small enough to memorize.",
      "The system runs on one glyph (the a), one accent color, and a strict dark palette — designed so the lab's own imagery, not our decoration, carries the brand. Everything scales from a favicon to a building facade.",
      "We delivered the identity, a working web system, and templates for slides, signage, and lab notebooks. The lab re-marked their campus with it within a quarter.",
    ],
    stats: [
      { b: "1", span: "Glyph, not a logo" },
      { b: "40yr", span: "Built to last" },
      { b: "12", span: "Touchpoints shipped" },
    ],
    focus: 3,
    glow: { gx: '50%', gy: '70%', gr: '30%', gc1: 'rgba(233,242,201,0.7)', gc2: 'rgba(170,190,140,0.18)', gt: '8s', gt2: '11s' },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}