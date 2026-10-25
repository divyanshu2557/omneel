import { useState } from "react";
import { CODE_SAMPLES } from "../lib/content";
import { highlight } from "../lib/highlight";
import { IconTerminal, IconCheck, IconCode, IconShield, IconClock } from "./Icons";

const PILLARS = [
  {
    icon: IconCode,
    n: "01",
    t: "Intent is a primitive",
    d: "`intent`, `goal`, `flow` and `permissions` are language keywords, not libraries you bolt on.",
  },
  {
    icon: IconShield,
    n: "02",
    t: "Typed capabilities",
    d: "Every value an agent can touch carries a scope. Grants, denials and approvals are checked at compile time.",
  },
  {
    icon: IconTerminal,
    n: "03",
    t: "Agents as first-class values",
    d: "Spawn, delegate, await and critic agents inline. Concurrency reads like a sentence, not a state machine.",
  },
  {
    icon: IconClock,
    n: "04",
    t: "Deterministic replay",
    d: "Any run — including a failure at 3am — can be replayed step by step with its full decision trace.",
  },
];

const RUN_OUT = [
  "omneelc 4.2.0 · target: omneel-os/arm64",
  "type-check ......... ok   (0 errors, 0 warnings)",
  "capability scan .... ok   (4 grants · 1 denial · 1 approval gate)",
  "plan emit .......... ok   6 steps · 4 agents · budget 40k tokens",
  "sealed → ./dist/close-the-quarter.oplan",
];

export default function Language() {
  const [tab, setTab] = useState(0);
  const [phase, setPhase] = useState<"idle" | "running" | "done">("idle");
  const [outLines, setOutLines] = useState(0);

  const sample = CODE_SAMPLES[tab];
  const lines = sample.code.split("\n");

  const run = () => {
    if (phase === "running") return;
    setPhase("running");
    setOutLines(0);
    RUN_OUT.forEach((_, i) => {
      window.setTimeout(() => {
        setOutLines(i + 1);
        if (i === RUN_OUT.length - 1) setPhase("done");
      }, 340 * (i + 1));
    });
  };

  const switchTab = (i: number) => {
    setTab(i);
    setPhase("idle");
    setOutLines(0);
  };

  return (
    <section
      id="language"
      className="relative scroll-mt-20 border-t border-soot-950/12 py-16 sm:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-[1360px] px-4 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* ------------------------------------------------------ left rail */}
          <div className="lg:col-span-4">
            <div data-reveal className="mb-4 flex items-center gap-3 sm:mb-5 sm:gap-4">
              <span className="label text-cobalt-500">02</span>
              <span className="h-px w-8 bg-soot-950/25 sm:w-10" />
              <span className="label text-soot-400">omneel language</span>
            </div>
            <h2
              data-reveal
              style={{ "--rd": "70ms" } as React.CSSProperties}
              className="font-display text-[clamp(1.85rem,4.2vw,3.5rem)] text-soot-950"
            >
              A language
              <br />
              written for
              <br />
              <span className="text-cobalt-500">what you mean.</span>
            </h2>
            <p
              data-reveal
              style={{ "--rd": "140ms" } as React.CSSProperties}
              className="mt-5 max-w-md text-[14.5px] leading-[1.75] text-soot-600 sm:mt-6 sm:text-[15px] sm:leading-[1.8]"
            >
              Omneel Language (
              <span className="bg-soot-950/[0.06] px-1.5 py-0.5 font-mono text-[12.5px] text-soot-900 sm:text-[13px]">
                .onl
              </span>
              ) is statically typed, AI-native, and designed so a human goal and an executable plan
              live in the same source file. Docstrings compile into agent contracts.
            </p>

            <div className="mt-8 border-t border-soot-950/12 sm:mt-10">
              {PILLARS.map((p, i) => (
                <div
                  key={p.n}
                  data-reveal="left"
                  style={{ "--rd": `${180 + i * 80}ms` } as React.CSSProperties}
                  className="group flex gap-3.5 border-b border-soot-950/12 py-4 transition-colors duration-400 hover:bg-soot-950/[0.03] sm:gap-4 sm:py-5"
                >
                  <span className="mt-1 shrink-0 text-soot-400 transition-colors duration-400 group-hover:text-cobalt-500">
                    <p.icon size={18} />
                  </span>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2.5 sm:gap-3">
                      <span className="label-sm text-soot-400">{p.n}</span>
                      <h3 className="display-soft text-[16px] text-soot-950 transition-colors duration-300 group-hover:text-cobalt-600 sm:text-[17px]">
                        {p.t}
                      </h3>
                    </div>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-soot-500 transition-colors duration-300 group-hover:text-soot-700 sm:mt-2 sm:text-[13.5px]">
                      {p.d}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* --------------------------------------------------------- editor */}
          <div className="lg:col-span-8">
            <div data-reveal="right" className="panel-ink corner-ticks corner-ticks-ink overflow-hidden">
              <div className="flex items-stretch border-b border-white/[0.09] bg-white/[0.03]">
                <div className="scroll-touch flex flex-1 items-stretch gap-px overflow-x-auto">
                  {CODE_SAMPLES.map((s, i) => (
                    <button
                      key={s.id}
                      onClick={() => switchTab(i)}
                      className={`group relative shrink-0 px-3.5 py-3 font-mono text-[11.5px] transition-colors duration-300 sm:px-5 sm:text-[12px] ${
                        i === tab ? "text-mist-50" : "text-mist-500 hover:text-mist-300"
                      }`}
                    >
                      <span className={`mr-1.5 sm:mr-2 ${i === tab ? "text-brass-400" : "text-mist-700"}`}>
                        {i === tab ? "●" : "○"}
                      </span>
                      {s.file}
                      <span
                        className={`absolute inset-x-0 bottom-0 h-[2px] origin-left bg-cobalt-300 transition-transform duration-400 ${
                          i === tab ? "scale-x-100" : "scale-x-0 group-hover:scale-x-50"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <div className="flex shrink-0 items-center border-l border-white/[0.09] bg-white/[0.02] px-3 sm:px-4">
                  <button
                    onClick={run}
                    className={`inline-flex items-center gap-1.5 border px-2.5 py-1 font-mono text-[10.5px] transition-all duration-300 sm:gap-2 sm:px-3 sm:py-1.5 sm:text-[11px] ${
                      phase === "done"
                        ? "border-pine-300/60 bg-pine-300/12 text-pine-300"
                        : "border-white/20 text-mist-300 hover:border-brass-400/70 hover:bg-brass-400/10 hover:text-brass-400"
                    }`}
                  >
                    {phase === "done" ? <IconCheck size={13} /> : <span>▶</span>}
                    {phase === "running" ? "compiling" : phase === "done" ? "compiled" : "run"}
                  </button>
                </div>
              </div>

              <div className="grid-fine scroll-touch relative flex max-h-[460px] overflow-auto sm:max-h-[520px]">
                <div
                  aria-hidden
                  className="sticky left-0 z-10 shrink-0 select-none border-r border-white/[0.07] bg-soot-950/95 px-2.5 py-4 text-right font-mono text-[11px] leading-[1.72] text-mist-700 sm:px-3 sm:py-5 sm:text-[12.5px]"
                >
                  {lines.map((_, i) => (
                    <div key={i}>{String(i + 1).padStart(2, "0")}</div>
                  ))}
                </div>
                <pre className="scroll-touch flex-1 overflow-x-auto px-3.5 py-4 font-mono text-[11px] leading-[1.72] sm:px-5 sm:py-5 sm:text-[12.5px]">
                  <code dangerouslySetInnerHTML={{ __html: highlight(sample.code) }} />
                </pre>
              </div>

              <div
                className="grid border-t border-white/[0.09] bg-soot-950/70 transition-[grid-template-rows] duration-500"
                style={{ gridTemplateRows: phase === "idle" ? "0fr" : "1fr" }}
              >
                <div className="overflow-hidden">
                  <div className="scroll-touch overflow-x-auto px-3.5 py-2.5 font-mono text-[10.5px] leading-[1.8] sm:px-5 sm:py-3 sm:text-[11.5px] sm:leading-[1.9]">
                    {RUN_OUT.slice(0, outLines).map((l, i) => (
                      <div
                        key={i}
                        className={`whitespace-nowrap ${
                          i === RUN_OUT.length - 1 && outLines === RUN_OUT.length
                            ? "text-pine-300"
                            : "text-mist-500"
                        }`}
                      >
                        {l}
                      </div>
                    ))}
                    {phase === "running" && (
                      <span className="anim-caret inline-block h-[12px] w-[7px] translate-y-[2px] bg-brass-400" />
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-white/[0.09] bg-white/[0.03] px-3.5 py-2 font-mono text-[10px] text-mist-700 sm:gap-x-5 sm:px-5 sm:py-2.5 sm:text-[10.5px]">
                <span className="text-aqua-400">omneelc 4.2.0</span>
                <span>utf-8</span>
                <span>caps: strict</span>
                <span className="ml-auto text-mist-500">{sample.note}</span>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden border border-soot-950/12 bg-soot-950/12 sm:mt-6 sm:grid-cols-4">
              {[
                ["0 lines", "boilerplate"],
                ["9 ms", "intent → plan"],
                ["100%", "replay coverage"],
                ["0", "capability leaks"],
              ].map(([v, k]) => (
                <div
                  key={k}
                  data-reveal
                  className="group bg-ivory-50 px-3.5 py-3 transition-colors duration-400 hover:bg-soot-950 sm:px-4 sm:py-4"
                >
                  <div className="font-display text-[20px] text-soot-950 transition-colors duration-400 group-hover:text-brass-400 sm:text-[22px]">
                    {v}
                  </div>
                  <div className="label-sm mt-1 text-soot-400 transition-colors duration-400 group-hover:text-mist-500">
                    {k}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
