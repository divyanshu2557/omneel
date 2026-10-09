import { Mark, IconArrow } from "./Icons";

const COLS: { title: string; links: { l: string; h: string }[] }[] = [
  {
    title: "Platform",
    links: [
      { l: "Omneel Language", h: "#language" },
      { l: "Omneel OS", h: "#os" },
      { l: "Agent Mesh", h: "#agents" },
      { l: "Intent & Knowledge", h: "#intent" },
    ],
  },
  {
    title: "Ecosystem",
    links: [
      { l: "App Bridge", h: "#os" },
      { l: ".onl Reference", h: "#language" },
      { l: "Permission Ledger", h: "#intent" },
      { l: "Deterministic Replay", h: "#os" },
    ],
  },
  {
    title: "Company",
    links: [
      { l: "The Vision", h: "#vision" },
      { l: "Architecture", h: "#architecture" },
      { l: "Roadmap", h: "#roadmap" },
      { l: "Cohort 04", h: "#access" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative z-10 overflow-hidden bg-soot-950">
      <div aria-hidden className="grid-fine absolute inset-0 opacity-60" />
      <div
        aria-hidden
        className="anim-breathe absolute -left-32 top-0 h-[380px] w-[380px] rounded-full blur-[110px]"
        style={{ background: "#1F3CE0", opacity: 0.18 }}
      />

      <div className="relative mx-auto max-w-[1360px] px-5 sm:px-8">
        <div className="grid gap-12 py-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <a href="#top" className="group inline-flex items-center gap-3 text-mist-50">
              <span className="transition-transform duration-700 group-hover:rotate-[135deg]">
                <Mark size={32} />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-[20px] text-mist-50">OMNEEL</span>
                <span className="label-sm mt-[3px] text-mist-500 transition-colors group-hover:text-brass-400">
                  TECH
                </span>
              </span>
            </a>
            <p className="mt-6 max-w-xs text-[14px] leading-[1.8] text-mist-500">
              An AI-native computing ecosystem where programming languages, operating systems,
              autonomous agents and applications converge around human intent.
            </p>
            <div className="mt-7 inline-flex items-center gap-2.5 border border-white/[0.14] px-3 py-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="anim-ring absolute inline-flex h-full w-full rounded-full bg-pine-300" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-pine-300" />
              </span>
              <span className="label-sm text-mist-500">all systems nominal · 41d uptime</span>
            </div>
          </div>

          {COLS.map((c) => (
            <nav key={c.title} className="lg:col-span-2">
              <p className="label-sm text-mist-700">{c.title}</p>
              <ul className="mt-5 space-y-3">
                {c.links.map((x) => (
                  <li key={x.l}>
                    <a
                      href={x.h}
                      className="group inline-flex items-center gap-2 text-[13.5px] text-mist-300 transition-colors duration-300 hover:text-brass-400"
                    >
                      <span className="h-px w-0 bg-brass-400 transition-all duration-400 group-hover:w-3" />
                      {x.l}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="lg:col-span-2">
            <p className="label-sm text-mist-700">Signal</p>
            <p className="mt-5 text-[13.5px] leading-relaxed text-mist-500">
              Engineering notes on languages, kernels and agent governance. Roughly monthly.
            </p>
            <a
              href="#access"
              className="btn-ghost-ink group mt-5 inline-flex items-center gap-2 px-4 py-2.5 text-[13px]"
            >
              Join the list
              <IconArrow
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </div>
        </div>

        {/* giant wordmark */}
        <div className="group relative select-none overflow-hidden">
          <span className="text-stroke-ink block font-display text-[clamp(3.4rem,17.5vw,15rem)] leading-[0.82]">
            OMNEEL
          </span>
          <span
            aria-hidden
            className="absolute left-0 top-0 block font-display text-[clamp(3.4rem,17.5vw,15rem)] leading-[0.82] text-ivory-50 [clip-path:inset(0_100%_0_0)] transition-[clip-path] duration-[900ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:[clip-path:inset(0_0_0_0)]"
          >
            OMNEEL
          </span>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/[0.1] py-7 sm:flex-row sm:items-center">
          <span className="label-sm text-mist-700">© 2026 omneel tech · state the intent</span>
          <div className="flex flex-wrap items-center gap-6 sm:ml-auto">
            {["privacy", "terms", "security", "status"].map((x) => (
              <a
                key={x}
                href="#access"
                className="label-sm text-mist-700 transition-colors duration-300 hover:text-mist-100"
              >
                {x}
              </a>
            ))}
            <a
              href="#top"
              className="group inline-flex items-center gap-2 text-mist-500 transition-colors hover:text-brass-400"
            >
              <span className="label-sm">back to top</span>
              <IconArrow
                size={14}
                className="-rotate-90 transition-transform duration-300 group-hover:-translate-y-1"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
