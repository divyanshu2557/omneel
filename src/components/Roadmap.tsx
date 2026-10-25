import { ROADMAP } from "../lib/content";
import { IconArrow } from "./Icons";

const STATE_STYLE: Record<string, { c: string; label: string }> = {
  shipped: { c: "#0F6B4F", label: "shipped" },
  "in flight": { c: "#B8791A", label: "in flight" },
  horizon: { c: "#1F3CE0", label: "horizon" },
};

const PRINCIPLES = [
  {
    n: "i",
    t: "No agent acts without a permission.",
    d: "Authority is declared in source and enforced by the kernel before execution, not reviewed afterwards.",
  },
  {
    n: "ii",
    t: "No output ships without grounding.",
    d: "Critic agents verify claims against systems of record. Unverified work is re-planned, never delivered.",
  },
  {
    n: "iii",
    t: "No workflow lives only in a UI.",
    d: "Anything Omneel does can be expressed as `.onl` source — versioned, diffed, reviewed and replayed.",
  },
];

export default function Roadmap() {
  return (
    <section
      id="roadmap"
      className="relative scroll-mt-20 border-t border-soot-950/12 py-16 sm:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-[1360px] px-4 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-7">
            <div data-reveal className="mb-4 flex items-center gap-3 sm:mb-5 sm:gap-4">
              <span className="label text-cobalt-500">08</span>
              <span className="h-px w-8 bg-soot-950/25 sm:w-10" />
              <span className="label text-soot-400">roadmap</span>
            </div>
            <h2
              data-reveal
              style={{ "--rd": "80ms" } as React.CSSProperties}
              className="font-display text-[clamp(1.85rem,4.4vw,3.9rem)] text-soot-950"
            >
              Built layer by layer,
              <br />
              <span className="text-soot-400">in the open.</span>
            </h2>
          </div>
          <div
            data-reveal
            style={{ "--rd": "150ms" } as React.CSSProperties}
            className="flex flex-wrap items-center gap-3 sm:gap-5 lg:justify-end lg:pb-3"
          >
            {Object.entries(STATE_STYLE).map(([k, v]) => (
              <span key={k} className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ background: v.c }} />
                <span className="label-sm text-soot-500">{k}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------- phase rail */}
      <div className="marquee-host relative mt-10 sm:mt-14">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-ivory-100 to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-ivory-100 to-transparent sm:w-24" />
        <div className="scroll-touch flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-6 sm:gap-5 sm:px-8">
          {ROADMAP.map((p, i) => {
            const s = STATE_STYLE[p.state];
            return (
              <article
                key={p.phase}
                data-reveal
                style={{ "--rd": `${i * 80}ms` } as React.CSSProperties}
                className="panel panel-hover group relative w-[82vw] max-w-[320px] shrink-0 snap-start p-5 sm:w-[340px] sm:p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="label text-soot-400">{p.phase}</span>
                  <span
                    className="label-sm border px-2 py-[2.5px]"
                    style={{ borderColor: `${s.c}55`, color: s.c, background: `${s.c}12` }}
                  >
                    {s.label}
                  </span>
                </div>
                <h3 className="display-soft mt-4 text-[21px] leading-tight text-soot-950 sm:mt-5 sm:text-[24px]">
                  {p.title}
                </h3>
                <ul className="mt-4 space-y-2 sm:mt-5 sm:space-y-2.5">
                  {p.items.map((it) => (
                    <li key={it} className="flex items-start gap-2.5">
                      <span
                        className="mt-[7px] h-1.5 w-1.5 shrink-0 rotate-45 transition-colors duration-300"
                        style={{ background: "#b3b7bd" }}
                      />
                      <span className="text-[12.5px] leading-relaxed text-soot-500 transition-colors duration-300 group-hover:text-soot-800 sm:text-[13px]">
                        {it}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 sm:mt-7">
                  <div className="flex items-baseline justify-between">
                    <span className="label-sm text-soot-400">completion</span>
                    <span className="tnum font-mono text-[11.5px] sm:text-[12px]" style={{ color: s.c }}>
                      {p.progress}%
                    </span>
                  </div>
                  <div className="mt-2 h-[5px] w-full overflow-hidden bg-soot-950/10">
                    <div
                      className="h-full transition-[width] duration-1000 ease-out"
                      style={{
                        width: `${p.progress}%`,
                        background: `linear-gradient(90deg, ${s.c}55, ${s.c})`,
                      }}
                    />
                  </div>
                </div>
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: `linear-gradient(90deg, transparent, ${s.c}, transparent)` }}
                />
              </article>
            );
          })}

          <div className="flex w-[220px] shrink-0 snap-start items-center justify-center border border-dashed border-soot-950/25 p-5 text-center transition-colors duration-400 hover:border-cobalt-500/60 hover:bg-cobalt-500/[0.05] sm:w-[280px] sm:p-6">
            <a href="#access" className="group">
              <span className="display-soft text-[18px] text-soot-700 transition-colors group-hover:text-cobalt-600 sm:text-[20px]">
                Shape what comes next
              </span>
              <span className="label-sm mt-2.5 flex items-center justify-center gap-2 text-soot-400 sm:mt-3">
                join cohort 04
                <IconArrow
                  size={14}
                  className="text-cobalt-500 transition-transform duration-300 group-hover:translate-x-1.5"
                />
              </span>
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1360px] px-4 sm:px-8">
        <p className="label-sm mb-5 text-soot-400 sm:mb-6">drag / scroll the rail →</p>

        <div className="grid gap-px overflow-hidden border border-soot-950/12 bg-soot-950/12 md:grid-cols-2 lg:grid-cols-3">
          {PRINCIPLES.map((p, i) => (
            <div
              key={p.n}
              data-reveal
              style={{ "--rd": `${i * 90}ms` } as React.CSSProperties}
              className={`group bg-ivory-50 p-5 transition-colors duration-500 hover:bg-ivory-200 sm:p-7 md:p-9 ${
                i === 2 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <span className="display-soft text-[12px] uppercase tracking-[0.3em] text-soot-400 transition-colors duration-500 group-hover:text-vermilion-500 sm:text-[13px]">
                {p.n}
              </span>
              <h3 className="display-soft mt-3.5 text-[19px] leading-snug text-soot-950 sm:mt-4 sm:text-[22px] lg:text-[23px]">
                {p.t}
              </h3>
              <p className="mt-2.5 text-[13px] leading-relaxed text-soot-500 transition-colors duration-400 group-hover:text-soot-700 sm:mt-3 sm:text-[13.5px]">
                {p.d}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
