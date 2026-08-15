import Shape from "@/components/Shape";
import { stats } from "@/data/site";

export default function Stats() {
  return (
    <section id="stats" className="sec stats-sec" data-cam>
      <div className="sec-head">
        <p className="k">
          <Shape size={14} />
          <b>06</b> — The numbers
        </p>
        <div className="rule" aria-hidden="true" />
      </div>
      <div className="stats">
        {stats.map((s) => (
          <div key={s.label} className="stat" data-rv="up">
            <b>{s.value === 4 ? "4.9" : `${s.value}${s.suffix}`}</b>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}