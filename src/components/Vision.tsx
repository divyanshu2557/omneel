import { METRICS } from "../lib/content";
import { useCountUp, useInView } from "../lib/hooks";
import { IconCheck, IconClose } from "./Icons";

function Metric({ m, i }: { m: (typeof METRICS)[number]; i: number }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.5);
  const v = useCountUp(m.value, inView, 1400 + i * 180);
  return (
    <div ref={ref} className="group px-5 py-7 transition-colors duration-500 hover:bg-soot-850 sm:px-7">
      <div className="font-display text-[clamp(2.4rem,5vw,3.6rem)] leading-none text-mist-50">
        <span className="tnum">{Math.round(v)}</span>
        <span className="text-brass-400">{m.suffix}</span>
      </div>
      <div className="label-sm mt-3 text-mist-300 transition-colors duration-500 group-hover:text-brass-400">
        {m.label}
      </div>
      <div className="mt-1.5 font-mono text-[11px] text-mist-700">{m.sub}</div>
    </div>
  );
}

const TODAY = [
  "Thirty tools, four of them talking to each other",
  "Every workflow re-assembled by hand, every week",
  "Automation that breaks the moment a UI changes",
  "Context trapped inside whoever remembers it",
  "AI bolted on as a sidebar, not as the substrate",
];

const OMNEEL = [
  "One intent, resolved across every system you own",
  "Workflows authored as source, versioned and replayed",
  "A typed App Bridge instead of brittle scraping",
  "Shared memory the whole agent mesh can reason over",
  "Agents as first-class citizens of the operating system",
];

export default function Vision() {
  return (
    <section id="vision" className="relative overflow-hidden bg-soot-950 py-24 sm:py-32">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(244,242,236,.05) 1px, transparent 1px)," +
            "linear-gradient(to bottom, rgba(244,242,236,.05) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div
        aria-hidden
        className="anim-breathe absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full blur-[110px]"
        style={{ background: "#1F3CE0", opacity: 0.3 }}
      />
      <div
        aria-hidden
        className="anim-breathe absolute -bottom-52 -left-32 h-[520px] w-[520px] rounded-full blur-[120px]"
        style={{ background: "#B8791A", opacity: 0.2, animationDelay: "2s" }}
      />

      <div className="relative mx-auto max-w-[1360px] px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <div data-reveal className="mb-6 flex items-center gap-4">
              <span className="label text-brass-400">07</span>
              <span className="h-px w-10 bg-white/25" />
              <span className="label text-mist-500">the long view</span>
            </div>
            <h2
              data-reveal
              style={{ "--rd": "80ms" } as React.CSSProperties}
              className="font-display text-[clamp(2.3rem,6vw,5.2rem)] leading-[0.94] text-mist-50"
            >
              Stop operating tools.
              <br />
              <span className="text-stroke-ink">Start stating outcomes.</span>
            </h2>
          </div>
          <p
            data-reveal
            style={{ "--rd": "160ms" } as React.CSSProperties}
            className="text-[15.5px] leading-[1.8] text-mist-300 lg:col-span-4 lg:pb-3"
          >
            The long-term vision of Omneel Tech is a new computing paradigm: you communicate
            intent, and the ecosystem coordinates the applications, agents, systems and resources
            required to fulfil it. No dashboards to babysit. No glue to maintain.
          </p>
        </div>

        {/* metrics */}
        <div
          data-reveal
          className="mt-16 grid grid-cols-2 gap-px overflow-hidden border border-white/[0.14] bg-white/[0.14] lg:grid-cols-4"
        >
          {METRICS.map((m, i) => (
            <div key={m.label} className="bg-soot-950">
              <Metric m={m} i={i} />
            </div>
          ))}
        </div>

        {/* comparison */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div
            data-reveal="left"
            className="relative overflow-hidden border border-white/[0.12] bg-soot-850 p-7 sm:p-9"
          >
            <span className="label-sm text-mist-700">today · the switchboard</span>
            <h3 className="display-soft mt-3 text-[26px] text-mist-500">
              Humans as the integration layer
            </h3>
            <ul className="mt-7 space-y-3.5">
              {TODAY.map((t) => (
                <li key={t} className="group flex items-start gap-3">
                  <span className="mt-[3px] text-mist-700 transition-colors group-hover:text-vermilion-400">
                    <IconClose size={14} />
                  </span>
                  <span className="text-[14px] leading-relaxed text-mist-500 transition-colors duration-300 group-hover:text-mist-300">
                    {t}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div
            data-reveal="right"
            style={{ "--rd": "100ms" } as React.CSSProperties}
            className="relative overflow-hidden bg-ivory-50 p-7 text-soot-900 sm:p-9"
          >
            <div aria-hidden className="grid-fine-ink absolute inset-0 opacity-70" />
            <div className="relative">
              <span className="label-sm text-cobalt-500">with omneel · the substrate</span>
              <h3 className="display-soft mt-3 text-[26px] text-soot-950">
                Intent as the integration layer
              </h3>
              <ul className="mt-7 space-y-3.5">
                {OMNEEL.map((t) => (
                  <li key={t} className="group flex items-start gap-3">
                    <span className="mt-[3px] text-pine-600 transition-transform duration-300 group-hover:scale-125">
                      <IconCheck size={14} />
                    </span>
                    <span className="text-[14px] leading-relaxed text-soot-600 transition-colors duration-300 group-hover:text-soot-950">
                      {t}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <p
          data-reveal
          className="display-soft mt-14 max-w-3xl text-[clamp(1.4rem,2.6vw,2.1rem)] leading-[1.35] text-mist-50"
        >
          In one line:{" "}
          <span className="relative inline-block">
            Omneel is an AI-native computing ecosystem where languages, operating systems, agents
            and applications converge around human intent.
            <svg
              aria-hidden
              viewBox="0 0 400 12"
              preserveAspectRatio="none"
              className="absolute -bottom-2 left-0 h-2.5 w-full text-brass-400"
            >
              <path
                d="M2 8C60 3 120 3 180 6s140 5 218-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </span>
        </p>
      </div>
    </section>
  );
}
