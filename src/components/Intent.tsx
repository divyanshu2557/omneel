import { useEffect, useState } from "react";
import { FLOW } from "../lib/content";
import { IconArrow, IconIntent, IconShield, IconKnowledge } from "./Icons";

const INTENTS = [
  {
    q: "“get the board ready for q3”",
    tokens: [
      ["goal", "board readiness"],
      ["domain", "finance"],
      ["deadline", "fri 17:00"],
      ["artefact", "deck + narrative"],
    ],
  },
  {
    q: "“chase every contract renewing this month”",
    tokens: [
      ["goal", "renewal follow-up"],
      ["domain", "sales"],
      ["window", "30 days"],
      ["artefact", "outreach run"],
    ],
  },
  {
    q: "“make onboarding take a day, not two weeks”",
    tokens: [
      ["goal", "process compression"],
      ["domain", "operations"],
      ["target", "≤ 1 day"],
      ["artefact", "workflow draft"],
    ],
  },
];

function IntentCompiler() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % INTENTS.length), 4200);
    return () => clearInterval(t);
  }, []);
  const cur = INTENTS[i];
  return (
    <div className="panel-ink corner-ticks corner-ticks-ink mt-7 overflow-hidden sm:mt-9">
      <div className="flex items-center gap-2.5 border-b border-white/[0.09] bg-white/[0.03] px-3.5 py-2.5 sm:px-4">
        <span className="text-brass-400">
          <IconIntent size={14} />
        </span>
        <span className="label-sm text-mist-300">intent compiler · live</span>
        <span className="ml-auto flex gap-1">
          {INTENTS.map((_, k) => (
            <button
              key={k}
              onClick={() => setI(k)}
              aria-label={`intent ${k + 1}`}
              className={`h-1 transition-all duration-400 ${
                k === i ? "w-6 bg-brass-400" : "w-2.5 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </span>
      </div>
      <div key={i} className="anim-view px-3.5 py-3.5 sm:px-5 sm:py-4">
        <p className="display-soft text-[17px] leading-snug text-mist-50 sm:text-[21px]">
          {cur.q}
        </p>
        <div className="mt-3.5 flex flex-wrap gap-1.5 sm:mt-4 sm:gap-2">
          {cur.tokens.map(([k, v], n) => (
            <span
              key={k}
              className="anim-view border border-white/[0.12] bg-soot-950/70 px-2 py-1 font-mono text-[10px] sm:px-2.5 sm:py-1.5 sm:text-[10.5px]"
              style={{ animationDelay: `${n * 70}ms`, animationFillMode: "backwards" }}
            >
              <span className="text-mist-700">{k}</span>
              <span className="mx-1 text-white/20 sm:mx-1.5">=</span>
              <span className="text-pine-300">{v}</span>
            </span>
          ))}
        </div>
        <div className="mt-3.5 flex items-center gap-3 border-t border-white/[0.08] pt-2.5 sm:mt-4 sm:pt-3">
          <span className="label-sm text-mist-700">compiled in 9 ms</span>
          <span className="relative h-[2px] flex-1 overflow-hidden bg-white/[0.09]">
            <span className="anim-shimmer absolute inset-y-0 w-14 bg-gradient-to-r from-transparent via-brass-400 to-transparent" />
          </span>
          <span className="label-sm text-aqua-400">grounded</span>
        </div>
      </div>
    </div>
  );
}

export default function Intent() {
  return (
    <section
      id="intent"
      className="relative scroll-mt-20 border-t border-soot-950/12 bg-ivory-200/70 py-16 sm:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-[1360px] px-4 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* sticky column */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <div data-reveal className="mb-4 flex items-center gap-3 sm:mb-5 sm:gap-4">
                <span className="label text-cobalt-500">05</span>
                <span className="h-px w-8 bg-soot-950/25 sm:w-10" />
                <span className="label text-soot-400">intent &amp; knowledge layer</span>
              </div>
              <h2
                data-reveal
                style={{ "--rd": "80ms" } as React.CSSProperties}
                className="font-display text-[clamp(1.85rem,4.4vw,3.6rem)] text-soot-950"
              >
                Meaning in.
                <br />
                <span className="text-brass-600">Actions out.</span>
              </h2>
              <p
                data-reveal
                style={{ "--rd": "150ms" } as React.CSSProperties}
                className="mt-5 max-w-md text-[14.5px] leading-[1.75] text-soot-600 sm:mt-6 sm:text-[15px] sm:leading-[1.8]"
              >
                The layer that makes the rest trustworthy. It converts ambiguous human goals into
                typed actions, binds them to your knowledge graph, checks them against the
                permission ledger, and writes what it learned back into memory.
              </p>

              <IntentCompiler />

              <a
                href="#access"
                className="group mt-6 inline-flex items-center gap-2.5 text-[14px] text-soot-900 sm:mt-8"
              >
                <span className="underline-slide">See intent resolution end-to-end</span>
                <IconArrow
                  size={16}
                  className="text-cobalt-500 transition-transform duration-300 group-hover:translate-x-1.5"
                />
              </a>
            </div>
          </div>

          {/* flow rail */}
          <div className="lg:col-span-7">
            <div className="relative">
              <span
                aria-hidden
                className="absolute left-[22px] top-3 bottom-3 w-px bg-gradient-to-b from-brass-500/70 via-soot-950/15 to-cobalt-500/50 sm:left-[31px]"
              />
              {FLOW.map((f, i) => (
                <div
                  key={f.k}
                  data-reveal="right"
                  style={{ "--rd": `${i * 90}ms` } as React.CSSProperties}
                  className="group relative flex gap-4 py-4 sm:gap-8 sm:py-5"
                >
                  <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center border border-soot-950/15 bg-ivory-50 font-mono text-[12px] text-soot-500 transition-all duration-500 group-hover:border-cobalt-500 group-hover:text-cobalt-500 sm:h-16 sm:w-16 sm:text-[15px]">
                    {f.k}
                    <span className="absolute inset-0 -z-10 scale-0 bg-cobalt-500/10 transition-transform duration-500 group-hover:scale-100" />
                  </span>
                  <div className="flex-1 border-b border-soot-950/12 pb-5 transition-colors duration-400 group-hover:border-soot-950/35 sm:pb-6">
                    <h3 className="display-soft text-[18px] text-soot-950 transition-transform duration-500 group-hover:translate-x-1 sm:text-[23px] lg:text-[25px]">
                      {f.t}
                    </h3>
                    <p className="mt-1.5 max-w-lg text-[13px] leading-[1.7] text-soot-500 transition-colors duration-400 group-hover:text-soot-700 sm:mt-2.5 sm:text-[14px] sm:leading-[1.75]">
                      {f.d}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ------------------------------------------- instrument strip */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-12">
          <div data-reveal className="panel panel-hover relative overflow-hidden p-5 sm:p-7 md:col-span-2 lg:col-span-5">
            <div className="flex items-center gap-3">
              <span className="text-pine-600">
                <IconKnowledge size={18} />
              </span>
              <span className="label-sm text-pine-600">knowledge graph</span>
            </div>
            <h3 className="display-soft mt-3.5 text-[21px] text-soot-950 sm:mt-4 sm:text-[24px]">Grounded, not guessed</h3>
            <p className="mt-2.5 text-[13px] leading-relaxed text-soot-500 sm:mt-3 sm:text-[13.5px]">
              Every claim an agent makes carries a citation back to a source system. Ungrounded
              output is flagged before it reaches a human.
            </p>
            <svg viewBox="0 0 300 96" className="mt-5 w-full sm:mt-6" aria-hidden>
              {[
                [104, 18],
                [178, 48],
              ].map(([x1, y1], i) => (
                <line
                  key={`a${i}`}
                  x1={x1}
                  y1={y1}
                  x2={252}
                  y2={i === 0 ? 26 : 70}
                  stroke="rgba(15,107,79,.35)"
                  strokeWidth="1"
                  className="anim-dash"
                />
              ))}
              <line x1="30" y1="48" x2="104" y2="18" stroke="rgba(31,60,224,.35)" strokeWidth="1" className="anim-dash" />
              <line x1="30" y1="48" x2="104" y2="78" stroke="rgba(31,60,224,.35)" strokeWidth="1" className="anim-dash" />
              <line x1="104" y1="18" x2="178" y2="48" stroke="rgba(15,107,79,.35)" strokeWidth="1" className="anim-dash" />
              <line x1="104" y1="78" x2="178" y2="48" stroke="rgba(15,107,79,.35)" strokeWidth="1" className="anim-dash" />
              {[
                [30, 48],
                [104, 18],
                [104, 78],
                [178, 48],
                [252, 26],
                [252, 70],
              ].map(([x, y], i) => (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r={i === 3 ? 5.5 : 3.6}
                  fill={i === 3 ? "#0F6B4F" : "#FCFAF5"}
                  stroke={i === 3 ? "#0F6B4F" : "#1F3CE0"}
                  strokeWidth="1.2"
                  className={i === 3 ? "anim-meter" : ""}
                />
              ))}
            </svg>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 sm:gap-x-6">
              {[
                ["entities", "2.4M"],
                ["relations", "11.8M"],
                ["citations", "100%"],
              ].map(([k, v]) => (
                <span key={k} className="font-mono text-[10.5px] text-soot-500 sm:text-[11px]">
                  {k} <span className="text-soot-950">{v}</span>
                </span>
              ))}
            </div>
          </div>

          <div
            data-reveal
            style={{ "--rd": "90ms" } as React.CSSProperties}
            className="panel panel-hover flex flex-col p-5 sm:p-7 md:col-span-1 lg:col-span-3"
          >
            <div className="flex items-center gap-3">
              <span className="text-vermilion-500">
                <IconShield size={18} />
              </span>
              <span className="label-sm text-vermilion-500">permission ledger</span>
            </div>
            <h3 className="display-soft mt-3.5 text-[21px] text-soot-950 sm:mt-4 sm:text-[24px]">Authority, in writing</h3>
            <p className="mt-2.5 text-[13px] leading-relaxed text-soot-500 sm:mt-3 sm:text-[13.5px]">
              Grants, denials and approval gates are evaluated before execution — never after.
            </p>
            <div className="mt-auto space-y-2.5 pt-5 font-mono text-[11px] sm:pt-7 sm:text-[11.5px]">
              {[
                ["granted", "4", "#0F6B4F"],
                ["denied", "1", "#C0392B"],
                ["gated", "1", "#B8791A"],
              ].map(([k, v, c]) => (
                <div
                  key={k}
                  className="flex items-center justify-between border-b border-soot-950/10 pb-2"
                >
                  <span className="text-soot-500">{k}</span>
                  <span style={{ color: c as string }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          <div
            data-reveal
            style={{ "--rd": "170ms" } as React.CSSProperties}
            className="panel panel-hover p-5 sm:p-7 md:col-span-1 lg:col-span-4"
          >
            <div className="flex items-center gap-3">
              <span className="text-brass-600">
                <IconIntent size={18} />
              </span>
              <span className="label-sm text-brass-600">memory fabric</span>
            </div>
            <h3 className="display-soft mt-3.5 text-[21px] text-soot-950 sm:mt-4 sm:text-[24px]">It compounds</h3>
            <p className="mt-2.5 text-[13px] leading-relaxed text-soot-500 sm:mt-3 sm:text-[13.5px]">
              Outcomes, corrections and preferences become context for the next intent — with
              retention and redaction expressed as source, not settings.
            </p>
            <div className="mt-5 sm:mt-7">
              <div className="flex items-end gap-1.5">
                {[22, 34, 28, 46, 58, 49, 72, 84, 76, 92].map((h, i) => (
                  <span
                    key={i}
                    className="flex-1 bg-gradient-to-t from-brass-400/35 to-soot-900 transition-all duration-700 hover:from-brass-500"
                    style={{ height: `${h * 0.55}px`, transitionDelay: `${i * 40}ms` }}
                  />
                ))}
              </div>
              <div className="mt-3 flex justify-between text-[9.5px] sm:text-[10px]">
                <span className="label-sm text-soot-400">week 01</span>
                <span className="label-sm text-soot-400">context reuse ↑ 318%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
