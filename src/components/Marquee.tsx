const items = [
  "Discord Bots",
  "3D Animated Websites",
  "AI Tools",
  "SaaS Products",
  "AI Automations",
  "Brand & Business Systems",
];

export default function Marquee() {
  const row = [...items, ...items];
  return (
    <div className="mq" aria-hidden="true">
      <div className="mq-track">
        {row.map((t, i) => (
          <span key={i} className="mq-item">
            {t}
            <i>✦</i>
          </span>
        ))}
      </div>
    </div>
  );
}