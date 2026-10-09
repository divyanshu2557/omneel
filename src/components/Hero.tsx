import { usePointer, useTypeSequence } from "../lib/hooks";
import { IconArrow, IconArrowUpRight, IconIntent } from "./Icons";
import { TICKER } from "../lib/content";

type Row = { g: string; t: string; c: string };

const LINES: Row[] = [
  { g: "$", t: "omneel run ./close-the-quarter.onl", c: "text-mist-50" },
  { g: "⟶", t: "intent parsed              9 ms", c: "text-aqua-400" },
  { g: "⟶", t: "context bound              knowledge://finance/q3", c: "text-mist-500" },
  { g: "⟶", t: "permissions checked        4 grants · 1 denial", c: "text-mist-500" },
  { g: "⟶", t: "plan compiled              6 steps · 4 agents", c: "text-aqua-400" },
  { g: "▸", t: "analyst    reconcile revenue by region", c: "text-iris-400" },
  { g: "▸", t: "designer   compose 14-slide deck · brand v4", c: "text-iris-400" },
  { g: "▸", t: "reviewer   verify claims against ledger", c: "text-iris-400" },
  { g: "!", t: "critic quorum 0.66 → re-planning slide 7", c: "text-signal-400" },
  { g: "✓", t: "delivered board@omneel.tech · audit sealed", c: "text-aqua-300" },
];

const STATS = [
  { n: "4", l: "converged layers" },
  { n: "140+", l: "bridged applications" },
  { n: "9ms", l: "intent → plan" },
  { n: "0", l: "lines of glue code" },
];

function Console() {
  const shown = useTypeSequence(LINES.length, 230);
  return (
    <div className="relative">
      <div
        aria-hidden
        className="anim-spin-slow absolute -right-16 -top-16 hidden h-48 w-48 rounded-full border border-dashed border-soot-950/20 sm:block"
      >
        <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-vermilion-500" />
      </div>

      <div className="panel-ink corner-ticks corner-ticks-ink relative overflow-hidden">
        <div className="flex items-center gap-3 border-b border-white/[0.08] bg-white/[0.03] px-4 py-2.5">
          <span className="flex gap-1.5">
            <i className="h-2 w-2 rounded-full bg-vermilion-400" />
            <i className="h-2 w-2 rounded-full bg-brass-400" />
            <i className="h-2 w-2 rounded-full bg-pine-300" />
          </span>
          <span className="label-sm text-mist-300">omneel console</span>
          <span className="label-sm ml-auto text-mist-700">session 0x4f2a</span>
        </div>

        <div className="grid-fine relative px-4 py-4 font-mono text-[11.5px] leading-[1.85] sm:text-[12.5px]">
          {LINES.map((l, i) => (
            <div
              key={i}
              className={`flex gap-3 whitespace-pre transition-all duration-500 ${
                i < shown ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0"
              }`}
            >
              <span className={`w-3 shrink-0 ${l.c} opacity-75`}>{l.g}</span>
              <span className={l.c}>{l.t}</span>
              {i === shown - 1 && shown < LINES.length && (
                <span className="anim-caret -ml-1 inline-block h-[13px] w-[7px] translate-y-[2px] bg-brass-400" />
              )}
            </div>
          ))}
        </div>

        <div className="border-t border-white/[0.08] px-4 py-3">
          <div className="relative h-[3px] w-full overflow-hidden bg-white/[0.09]">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-pine-400 to-aqua-300 transition-[width] duration-700 ease-out"
              style={{ width: `${(shown / LINES.length) * 100}%` }}
            />
            <div className="anim-shimmer absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          </div>
          <div className="mt-2.5 flex items-center justify-between">
            <span className="label-sm text-mist-700">
              {shown}/{LINES.length} steps · orchestrator engaged
            </span>
            <span className="label-sm text-brass-400">
              {shown === LINES.length ? "complete" : "running"}
            </span>
          </div>
        </div>
      </div>

      <div className="anim-float panel mt-4 flex items-center gap-3 px-4 py-3">
        <span className="text-brass-500">
          <IconIntent size={16} />
        </span>
        <p className="text-[12.5px] leading-snug text-soot-600">
          Intent resolved from a single sentence — no tickets, no scripts, no glue.
        </p>
      </div>
    </div>
  );
}

export default function Hero() {
  const { ref, pos } = usePointer<HTMLDivElement>();

  return (
    <section id="top" ref={ref} className="relative pt-[68px]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-700"
        style={{
          opacity: pos.active ? 1 : 0,
          background: `radial-gradient(520px 380px at ${((pos.x + 1) / 2) * 100}% ${
            ((pos.y + 1) / 2) * 100
          }%, rgba(31,60,224,0.10), transparent 70%)`,
        }}
      />

      {/* black instrument strip */}
      <div className="relative bg-soot-950">
        <div className="mx-auto flex max-w-[1360px] items-center gap-4 px-5 py-2.5 sm:px-8">
          <span className="label-sm text-mist-100">omneel tech</span>
          <span className="hidden h-3 w-px bg-white/20 sm:block" />
          <span className="label-sm hidden text-mist-500 sm:block">ecosystem build 4.2.0</span>
          <span className="ml-auto flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="anim-ring absolute inline-flex h-full w-full rounded-full bg-pine-300" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-pine-300" />
            </span>
            <span className="label-sm text-mist-300">agent mesh nominal</span>
          </span>
          <span className="hidden h-3 w-px bg-white/20 md:block" />
          <span className="label-sm hidden text-mist-500 md:block">design partner cohort 03</span>
        </div>
      </div>

      <div className="relative mx-auto grid max-w-[1360px] items-center gap-14 px-5 pb-16 pt-14 sm:px-8 lg:grid-cols-12 lg:gap-10 lg:pb-24 lg:pt-20">
        <div className="lg:col-span-7">
          <div
            data-reveal
            className="mb-7 inline-flex items-center gap-3 border border-soot-950/15 bg-ivory-50 py-1.5 pl-2 pr-4 shadow-[0_1px_0_rgba(255,255,255,.8)_inset]"
          >
            <span className="bg-cobalt-500 px-2 py-1 text-[9.5px] font-semibold uppercase tracking-[0.18em] text-ivory-50">
              new
            </span>
            <span className="label-sm text-soot-600">the ai-native computing ecosystem</span>
          </div>

          <h1 className="font-display text-[clamp(2.9rem,7.6vw,6.6rem)] leading-[0.9]">
            <span data-reveal style={{ "--rd": "60ms" } as React.CSSProperties} className="block text-soot-950">
              State the intent.
            </span>
            <span
              data-reveal
              style={{ "--rd": "160ms" } as React.CSSProperties}
              className="text-stroke mt-1 block"
            >
              Ship the outcome.
            </span>
          </h1>

          <div
            data-reveal
            style={{ "--rd": "260ms" } as React.CSSProperties}
            className="mt-8 flex max-w-xl gap-4"
          >
            <span className="mt-2 h-[2px] w-10 shrink-0 bg-brass-500" />
            <p className="text-[15.5px] leading-[1.75] text-soot-600 sm:text-base">
              Omneel Tech is building the platform where a programming language, an operating
              system, a mesh of autonomous agents and your existing applications converge around
              one thing — <span className="font-medium text-soot-950">what you actually want done.</span>
            </p>
          </div>

          <div
            data-reveal
            style={{ "--rd": "340ms" } as React.CSSProperties}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <a
              href="#access"
              className="btn-primary group inline-flex items-center gap-2.5 px-6 py-3.5 text-[14px] font-medium"
            >
              Request early access
              <IconArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
            <a
              href="#architecture"
              className="btn-ghost group inline-flex items-center gap-2.5 px-6 py-3.5 text-[14px]"
            >
              Explore the architecture
              <IconArrow
                size={16}
                className="rotate-90 transition-transform duration-300 group-hover:translate-y-1"
              />
            </a>
          </div>

          <dl
            data-reveal
            style={{ "--rd": "420ms" } as React.CSSProperties}
            className="mt-14 grid grid-cols-2 gap-px overflow-hidden bg-white/12 sm:grid-cols-4"
          >
            {STATS.map((s) => (
              <div
                key={s.l}
                className="group bg-soot-950 px-4 py-4 transition-colors duration-500 hover:bg-soot-800"
              >
                <dt className="font-display text-[26px] text-ivory-50 transition-colors duration-300 group-hover:text-brass-400">
                  {s.n}
                </dt>
                <dd className="label-sm mt-1.5 text-mist-500 transition-colors duration-300 group-hover:text-mist-300">
                  {s.l}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div
          data-reveal="right"
          style={{ "--rd": "300ms" } as React.CSSProperties}
          className="lg:col-span-5"
        >
          <Console />
        </div>
      </div>

      <Ticker />
    </section>
  );
}

export function Ticker() {
  const row = [...TICKER, ...TICKER];
  return (
    <div className="marquee-host relative overflow-hidden bg-soot-950 py-3.5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-soot-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-soot-950 to-transparent" />
      <div className="anim-marquee flex w-max items-center gap-10">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="label-sm whitespace-nowrap text-mist-300">{t}</span>
            <span className="h-1.5 w-1.5 rotate-45 bg-brass-400" />
          </span>
        ))}
      </div>
    </div>
  );
}
