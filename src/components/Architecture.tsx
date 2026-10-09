import { useEffect, useRef, useState } from "react";
import { LAYERS } from "../lib/content";
import { IconCheck } from "./Icons";

export function SectionHead({
  n,
  kicker,
  title,
  lede,
  align = "left",
}: {
  n: string;
  kicker: string;
  title: React.ReactNode;
  lede?: string;
  align?: "left" | "split";
}) {
  return (
    <div className={align === "split" ? "grid gap-8 lg:grid-cols-12 lg:items-end" : "flex flex-col gap-6"}>
      <div className={align === "split" ? "lg:col-span-7" : ""}>
        <div data-reveal className="mb-5 flex items-center gap-4">
          <span className="label text-cobalt-500">{n}</span>
          <span className="h-px w-10 bg-soot-950/25" />
          <span className="label text-soot-400">{kicker}</span>
        </div>
        <h2
          data-reveal
          style={{ "--rd": "80ms" } as React.CSSProperties}
          className="font-display text-[clamp(2.1rem,4.6vw,3.9rem)] text-soot-950"
        >
          {title}
        </h2>
      </div>
      {lede && (
        <p
          data-reveal
          style={{ "--rd": "160ms" } as React.CSSProperties}
          className={`text-[15px] leading-[1.8] text-soot-600 ${
            align === "split" ? "lg:col-span-5 lg:pb-2" : "max-w-2xl"
          }`}
        >
          {lede}
        </p>
      )}
    </div>
  );
}

export default function Architecture() {
  const [sel, setSel] = useState(0);
  const locked = useRef(false);
  const layer = LAYERS[sel];

  useEffect(() => {
    if (locked.current) return;
    const t = setInterval(() => setSel((s) => (s + 1) % LAYERS.length), 5200);
    return () => clearInterval(t);
  }, [sel]);

  const pick = (i: number) => {
    locked.current = true;
    setSel(i);
  };

  return (
    <section id="architecture" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-[1360px] px-5 sm:px-8">
        <SectionHead
          n="01"
          kicker="the architecture"
          align="split"
          title={
            <>
              Four layers,
              <br />
              <span className="text-soot-400">one substrate.</span>
            </>
          }
          lede="Most AI products sit on top of an operating system and talk to apps through fragile glue. Omneel replaces the glue. Language, OS, agents and intent are designed as a single stack — each layer aware of the ones above and below it."
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-14">
          {/* ---------------------------------------------------- the stack */}
          <div className="lg:col-span-5">
            <div data-reveal="left" className="relative" style={{ perspective: "1400px" }}>
              <div
                aria-hidden
                className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.16] blur-[80px] transition-colors duration-700"
                style={{ background: layer.accent }}
              />
              <div className="relative flex flex-col gap-3 lg:[transform-style:preserve-3d] lg:[transform:rotateX(13deg)_rotateZ(-1deg)]">
                {LAYERS.map((l, i) => {
                  const on = i === sel;
                  return (
                    <button
                      key={l.id}
                      onClick={() => pick(i)}
                      onMouseEnter={() => pick(i)}
                      aria-pressed={on}
                      className="group relative text-left outline-none"
                      style={{
                        transform: on ? "translateZ(34px)" : "translateZ(0px)",
                        transition: "transform .65s cubic-bezier(.2,.8,.2,1)",
                        transformStyle: "preserve-3d",
                      }}
                    >
                      <div
                        className="relative overflow-hidden border px-5 py-4 transition-all duration-500 sm:px-6 sm:py-5"
                        style={{
                          borderColor: on ? "#0e0f12" : "rgba(8,9,10,0.14)",
                          background: on
                            ? "#0e0f12"
                            : "linear-gradient(180deg,#fdfbf7,#f1eee4)",
                          boxShadow: on
                            ? `0 22px 44px -26px rgba(8,9,10,.75), inset 0 0 0 1px ${l.accent}55`
                            : "0 1px 0 rgba(255,255,255,.75) inset",
                        }}
                      >
                        <div className="flex items-center gap-4">
                          <span
                            className="label-sm transition-colors duration-500"
                            style={{ color: on ? l.accentOnDark : "#8e939c" }}
                          >
                            {l.index}
                          </span>
                          <span
                            className={`font-display text-[19px] transition-colors duration-500 sm:text-[22px] ${
                              on ? "text-ivory-50" : "text-soot-500 group-hover:text-soot-900"
                            }`}
                          >
                            {l.name}
                          </span>
                          <span
                            className="ml-auto h-2 w-2 rounded-full transition-all duration-500"
                            style={{
                              background: on ? l.accentOnDark : "transparent",
                              boxShadow: on ? `0 0 14px ${l.accentOnDark}` : "none",
                              border: on ? "none" : "1.5px solid rgba(8,9,10,.22)",
                            }}
                          />
                        </div>
                        <div
                          className="grid transition-[grid-template-rows,opacity] duration-500"
                          style={{ gridTemplateRows: on ? "1fr" : "0fr", opacity: on ? 1 : 0 }}
                        >
                          <div className="overflow-hidden">
                            <p className="pt-2 text-[13px] text-mist-300">{l.tagline}</p>
                          </div>
                        </div>
                        <span
                          className="absolute inset-y-0 left-0 w-[3px] transition-opacity duration-500"
                          style={{ background: l.accentOnDark, opacity: on ? 1 : 0 }}
                        />
                      </div>
                      {/* slab thickness */}
                      <div
                        className="mx-2 h-[7px] border-x border-b transition-all duration-500 lg:mx-3"
                        style={{
                          borderColor: on ? "rgba(8,9,10,.85)" : "rgba(8,9,10,.12)",
                          background: on ? "#08090a" : "rgba(8,9,10,.055)",
                        }}
                      />
                    </button>
                  );
                })}
              </div>
              <p className="label-sm mt-6 text-center text-soot-400 lg:text-left">
                select a layer — l4 intent sits on l1 language
              </p>
            </div>
          </div>

          {/* ------------------------------------------------- detail panel */}
          <div className="lg:col-span-7">
            <div data-reveal="right" className="panel-ink corner-ticks corner-ticks-ink relative h-full overflow-hidden">
              <span
                aria-hidden
                className="pointer-events-none absolute -right-6 -top-14 select-none font-display text-[190px] leading-none opacity-[0.09] transition-all duration-700"
                style={{ color: layer.accentOnDark }}
              >
                {layer.index.replace("L", "")}
              </span>

              <div
                className="h-[3px] w-full transition-colors duration-700"
                style={{ background: `linear-gradient(90deg, ${layer.accentOnDark}, transparent)` }}
              />

              <div key={layer.id} className="anim-view relative p-7 sm:p-10">
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className="label-sm px-2.5 py-1"
                    style={{ background: `${layer.accentOnDark}22`, color: layer.accentOnDark }}
                  >
                    layer {layer.index}
                  </span>
                  <span className="label-sm text-mist-700">
                    {String(sel + 1).padStart(2, "0")} / 0{LAYERS.length}
                  </span>
                </div>

                <h3 className="display-soft mt-6 text-[clamp(1.9rem,3.4vw,2.9rem)] text-mist-50">
                  {layer.name}
                </h3>
                <p
                  className="display-soft mt-2 text-[17px] font-normal sm:text-[19px]"
                  style={{ color: layer.accentOnDark }}
                >
                  {layer.tagline}
                </p>
                <p className="mt-6 max-w-xl text-[15px] leading-[1.8] text-mist-300">{layer.body}</p>

                <ul className="mt-8 grid gap-px overflow-hidden border border-white/[0.09] bg-white/[0.09] sm:grid-cols-2">
                  {layer.capabilities.map((c) => (
                    <li
                      key={c}
                      className="group flex items-start gap-3 bg-soot-900 px-4 py-3.5 transition-colors duration-300 hover:bg-soot-800"
                    >
                      <span
                        className="mt-[3px] shrink-0 transition-transform duration-300 group-hover:scale-125"
                        style={{ color: layer.accentOnDark }}
                      >
                        <IconCheck size={14} />
                      </span>
                      <span className="text-[13.5px] leading-snug text-mist-300 transition-colors duration-300 group-hover:text-mist-50">
                        {c}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-wrap gap-2.5">
                  {layer.specs.map((s) => (
                    <span
                      key={s.k}
                      className="border border-white/[0.12] px-3 py-1.5 font-mono text-[11px] text-mist-300 transition-colors duration-300 hover:border-white/30 hover:text-mist-50"
                    >
                      <span className="text-mist-700">{s.k}</span>
                      <span className="mx-1.5 text-white/20">|</span>
                      {s.v}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 border-t border-white/[0.09] bg-white/[0.02] px-7 py-4 sm:px-10">
                <span className="label-sm mr-2 text-mist-700">stack position</span>
                {LAYERS.map((l, i) => (
                  <span
                    key={l.id}
                    className="h-1.5 flex-1 transition-all duration-500"
                    style={{
                      background: i === sel ? l.accentOnDark : "rgba(255,255,255,0.12)",
                      transform: i === sel ? "scaleY(2.2)" : "scaleY(1)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
