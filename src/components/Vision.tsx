import Shape from "@/components/Shape";

export default function Vision() {
  return (
    <section id="vision" className="sec vis" data-cam>
      <div className="sec-head">
        <p className="k">
          <Shape size={14} />
          <b>03</b> — The vision
        </p>
        <div className="rule" aria-hidden="true" />
      </div>

      <div className="vis-head">
        <h2 className="display" data-rv="up">
          <span className="mask-line">From server to screen,</span>
          <span className="mask-line">we craft worlds that</span>
          <span className="mask-line">
            <em>move people.</em>
          </span>
        </h2>
        <p className="body-lg" data-rv="up">
          Zyrix Dev builds the full digital stack for brands and businesses —
          custom Discord bots that run communities, animated 3D websites that
          stop the scroll, and AI tools that do the heavy lifting. One team,
          one line of sight, from first sketch to shipped.
        </p>
      </div>
    </section>
  );
}