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
      className="relative scroll-mt-24 border-t border-soot-950/12 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1360px] px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* ------------------------------------------------------ left rail */}
          <div className="lg:col-span-4">
            <div data-reveal className="mb-5 flex items-center gap-4">
              <span className="label text-cobalt-500">02</span>
              <span className="h-px w-10 bg-soot-950/25" />
              <span className="label text-soot-400">omneel language</span>
            </div>
            <h2
              data-reveal
              style={{ "--rd": "70ms" } as React.CSSProperties}
              className="font-display text-[clamp(2.1rem,4.4vw,3.5rem)] text-soot-950"
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
              className="mt-6 max-w-md text-[15px] leading-[1.8] text-soot-600"
            >
              Omneel Language (
              <span className="bg-soot-950/[0.06] px-1.5 py-0.5 font-mono text-[13px] text-soot-900">
                .onl
              </span>
              ) is statically typed, AI-native, and designed so a human goal and an executable plan
              live in the same source file. Docstrings compile into agent contracts.
            </p>

            <div className="mt-10 border-t border-soot-950/12">
              {PILLARS.map((p, i) => (
                <div
                  key={p.n}
                  data-reveal="left"
                  style={{ "--rd": `${180 + i * 80}ms` } as React.CSSProperties}
                  className="group flex gap-4 border-b border-soot-950/12 py-5 transition-colors duration-400 hover:bg-soot-950/[0.03]"
                >
                  <span className="mt-1 text-soot-400 transition-colors duration-400 group-hover:text-cobalt-500">
                    <p.icon size={19} />
                  </span>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-3">
                      <span className="label-sm text-soot-400">{p.n}</span>
                      <h3 className="display-soft text-[17px] text-soot-950 transition-colors duration-300 group-hover:text-cobalt-600">
                        {p.t}
                      </h3>
                    </div>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-soot-500 transition-colors duration-300 group-hover:text-soot-700">
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
              <div className="flex items-stretch gap-px overflow-x-auto border-b border-white/[0.09] bg-white/[0.03]">
                {CODE_SAMPLES.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => switchTab(i)}
                    className={`group relative shrink-0 px-4 py-3 font-mono text-[12px] transition-colors duration-300 sm:px-5 ${
                      i === tab ? "text-mist-50" : "text-mist-500 hover:text-mist-300"
                    }`}
                  >
                    <span className={`mr-2 ${i === tab ? "text-brass-400" : "text-mist-700"}`}>
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
                <div className="ml-auto flex shrink-0 items-center gap-2 px-4">
                  <button
                    onClick={run}
                    className={`inline-flex items-center gap-2 border px-3 py-1.5 font-mono text-[11px] transition-all duration-300 ${
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

              <div className="grid-fine relative flex max-h-[520px] overflow-auto">
                <div
                  aria-hidden
                  className="sticky left-0 z-10 shrink-0 select-none border-r border-white/[0.07] bg-soot-950/95 px-3 py-5 text-right font-mono text-[11.5px] leading-[1.72] text-mist-700 sm:text-[12.5px]"
                >
                  {lines.map((_, i) => (
                    <div key={i}>{String(i + 1).padStart(2, "0")}</div>
                  ))}
                </div>
                <pre className="flex-1 overflow-x-auto px-4 py-5 font-mono text-[11.5px] leading-[1.72] sm:px-5 sm:text-[12.5px]">
                  <code dangerouslySetInnerHTML={{ __html: highlight(sample.code) }} />
                </pre>
              </div>

              <div
                className="grid border-t border-white/[0.09] bg-soot-950/70 transition-[grid-template-rows] duration-500"
                style={{ gridTemplateRows: phase === "idle" ? "0fr" : "1fr" }}
              >
                <div className="overflow-hidden">
                  <div className="px-4 py-3 font-mono text-[11.5px] leading-[1.9] sm:px-5">
                    {RUN_OUT.slice(0, outLines).map((l, i) => (
                      <div
                        key={i}
                        className={
                          i === RUN_OUT.length - 1 && outLines === RUN_OUT.length
                            ? "text-pine-300"
                            : "text-mist-500"
                        }
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

              <div className="flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-white/[0.09] bg-white/[0.03] px-4 py-2.5 font-mono text-[10.5px] text-mist-700 sm:px-5">
                <span className="text-aqua-400">omneelc 4.2.0</span>
                <span>utf-8</span>
                <span>caps: strict</span>
                <span className="ml-auto text-mist-500">{sample.note}</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden border border-soot-950/12 bg-soot-950/12 sm:grid-cols-4">
              {[
                ["0 lines", "boilerplate"],
                ["9 ms", "intent → plan"],
                ["100%", "replay coverage"],
                ["0", "capability leaks"],
              ].map(([v, k]) => (
                <div
                  key={k}
                  data-reveal
                  className="group bg-ivory-50 px-4 py-4 transition-colors duration-400 hover:bg-soot-950"
                >
                  <div className="font-display text-[22px] text-soot-950 transition-colors duration-400 group-hover:text-brass-400">
                    {v}
                  </div>
                  <div className="label-sm mt-1.5 text-soot-400 transition-colors duration-400 group-hover:text-mist-500">
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
