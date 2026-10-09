import { useEffect, useState } from "react";
import { CONNECTORS } from "../lib/content";
import { IconOS, IconGrid, IconCpu, IconShield, IconKnowledge } from "./Icons";

/* ------------------------------------------------------------------ utils */
function useLive(base: number, spread: number, ms = 1700) {
  const [v, setV] = useState(base);
  useEffect(() => {
    const t = setInterval(() => {
      setV((prev) => {
        const next = prev + (Math.random() - 0.5) * spread;
        return Number(
          Math.min(base + spread * 1.4, Math.max(base - spread * 1.4, next)).toFixed(1),
        );
      });
    }, ms);
    return () => clearInterval(t);
  }, [base, spread, ms]);
  return v;
}

function useClock() {
  const [t, setT] = useState("--:--:--");
  useEffect(() => {
    const tick = () =>
      setT(new Date().toLocaleTimeString("en-GB", { hour12: false }));
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, []);
  return t;
}

const VIEWS = [
  { id: "session", label: "Agent Session", icon: IconGrid },
  { id: "bridge", label: "App Bridge", icon: IconOS },
  { id: "resources", label: "Governor", icon: IconCpu },
  { id: "sandbox", label: "Sandbox", icon: IconShield },
  { id: "audit", label: "Audit Ledger", icon: IconKnowledge },
];

const STEPS = [
  { agent: "orchestrator", task: "decompose intent → 6 steps", state: "done", ms: "9" },
  { agent: "analyst", task: "pull revenue deltas from ledger", state: "done", ms: "412" },
  { agent: "analyst", task: "attribute variance by region", state: "done", ms: "880" },
  { agent: "designer", task: "compose 14-slide deck · brand v4", state: "run", ms: "—" },
  { agent: "reviewer", task: "verify claims against source", state: "queue", ms: "—" },
  { agent: "courier", task: "deliver to board@omneel.tech", state: "gate", ms: "approval" },
];

const SANDBOXES = [
  { id: "sbx-9f21", image: "omneel/analyst:4.2", iso: "microVM", t: "00:04:12", net: "egress: allow-listed" },
  { id: "sbx-4c08", image: "omneel/designer:4.2", iso: "microVM", t: "00:01:47", net: "egress: none" },
  { id: "sbx-77ab", image: "bridge/ledger:1.9", iso: "wasm", t: "00:00:38", net: "egress: ledger.omneel" },
  { id: "sbx-1de4", image: "omneel/reviewer:4.2", iso: "microVM", t: "queued", net: "egress: none" },
];

const AUDIT = [
  { h: "0x4f2a…c91", who: "analyst", act: "read ledger.q3.regions", v: "granted", c: "text-aqua-400" },
  { h: "0x4f2b…1d0", who: "designer", act: "write drive/board/q3-deck", v: "granted", c: "text-aqua-400" },
  { h: "0x4f2c…7be", who: "orchestrator", act: "spawn worker(gpu-a)", v: "granted", c: "text-aqua-400" },
  { h: "0x4f2d…2a4", who: "analyst", act: "read payroll.salaries", v: "denied", c: "text-coral-400" },
  { h: "0x4f2e…f08", who: "courier", act: "transfer(amount > 25k)", v: "approval", c: "text-signal-400" },
];

const AGENTS = [
  { n: "orchestrator", tier: "principal", c: "#FFB454" },
  { n: "analyst", tier: "specialist", c: "#4FE3C1" },
  { n: "designer", tier: "specialist", c: "#8FB8FF" },
  { n: "reviewer", tier: "critic", c: "#FF6A5A" },
  { n: "courier", tier: "worker", c: "#4FE3C1" },
];

const StatePill = ({ s }: { s: string }) => {
  const map: Record<string, string> = {
    done: "border-aqua-400/40 bg-aqua-400/10 text-aqua-300",
    run: "border-signal-400/50 bg-signal-400/10 text-signal-400",
    queue: "border-white/12 bg-white/[0.03] text-mist-500",
    gate: "border-iris-400/40 bg-iris-400/10 text-iris-400",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 border px-2 py-[3px] font-mono text-[10px] uppercase tracking-[0.14em] ${map[s]}`}
    >
      {s === "run" && <i className="anim-meter h-1 w-1 rounded-full bg-signal-400" />}
      {s}
    </span>
  );
};

/* ------------------------------------------------------------------ views */
function SessionView() {
  return (
    <div>
      <div className="flex flex-wrap items-baseline gap-3 border-b border-white/[0.06] pb-4">
        <h4 className="font-display text-[22px] text-mist-50">close-the-quarter</h4>
        <span className="label-sm text-mist-700">plan #0x4f2a · 6 steps · 4 agents</span>
        <span className="ml-auto flex items-center gap-2">
          <span className="anim-meter h-1.5 w-1.5 rounded-full bg-signal-400" />
          <span className="label-sm text-signal-400">executing</span>
        </span>
      </div>
      <ul className="divide-y divide-white/[0.05]">
        {STEPS.map((s, i) => (
          <li
            key={i}
            className="group flex items-center gap-4 py-3 transition-colors duration-300 hover:bg-white/[0.025]"
          >
            <span className="label-sm w-5 text-mist-700">{String(i + 1).padStart(2, "0")}</span>
            <span className="w-24 shrink-0 font-mono text-[11.5px] text-iris-400">{s.agent}</span>
            <span className="flex-1 truncate text-[13.5px] text-mist-300 group-hover:text-mist-50">
              {s.task}
            </span>
            <span className="hidden w-14 text-right font-mono text-[11px] text-mist-700 sm:block">
              {s.ms}
              {s.ms !== "—" && s.ms !== "approval" ? "ms" : ""}
            </span>
            <StatePill s={s.state} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function BridgeView() {
  return (
    <div>
      <div className="flex flex-wrap items-baseline gap-3 border-b border-white/[0.06] pb-4">
        <h4 className="font-display text-[22px] text-mist-50">App Bridge</h4>
        <span className="label-sm text-mist-700">140+ connectors · one capability model</span>
        <span className="ml-auto label-sm text-aqua-400">all healthy</span>
      </div>
      <div className="grid grid-cols-2 gap-2 pt-4 sm:grid-cols-4">
        {CONNECTORS.map((c, i) => (
          <span
            key={c}
            className="group relative cursor-default overflow-hidden border border-white/[0.08] bg-white/[0.015] px-3 py-2.5 text-[12.5px] text-mist-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-aqua-400/45 hover:bg-aqua-400/[0.07] hover:text-mist-50"
            style={{ transitionDelay: `${i * 4}ms` }}
          >
            <span className="flex items-center gap-2">
              <i className="h-1 w-1 rounded-full bg-aqua-400/60 transition-all duration-300 group-hover:bg-aqua-400 group-hover:shadow-[0_0_8px_#4FE3C1]" />
              {c}
            </span>
          </span>
        ))}
      </div>
      <p className="pt-4 font-mono text-[11px] text-mist-700">
        every connector is typed: agents call capabilities, never raw APIs
      </p>
    </div>
  );
}

const METERS = [
  { k: "cpu pool", base: 38, spread: 7, c: "#4FE3C1" },
  { k: "memory", base: 61, spread: 5, c: "#8FB8FF" },
  { k: "token budget", base: 47, spread: 8, c: "#FFB454" },
  { k: "gpu-a pool", base: 72, spread: 9, c: "#FF6A5A" },
];

function Meter({ k, base, spread, c }: { k: string; base: number; spread: number; c: string }) {
  const v = useLive(base, spread);
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="label-sm text-mist-500">{k}</span>
        <span className="tnum font-mono text-[13px]" style={{ color: c }}>
          {v.toFixed(1)}%
        </span>
      </div>
      <div className="mt-2 h-[6px] w-full overflow-hidden bg-white/[0.06]">
        <div
          className="h-full transition-[width] duration-[1400ms] ease-out"
          style={{
            width: `${Math.min(100, v)}%`,
            background: `linear-gradient(90deg, ${c}55, ${c})`,
            boxShadow: `0 0 14px ${c}66`,
          }}
        />
      </div>
    </div>
  );
}

function GovernorView() {
  return (
    <div>
      <div className="flex flex-wrap items-baseline gap-3 border-b border-white/[0.06] pb-4">
        <h4 className="font-display text-[22px] text-mist-50">Resource Governor</h4>
        <span className="label-sm text-mist-700">cost ceiling $180/day · 62% consumed</span>
      </div>
      <div className="grid gap-4 pt-5 sm:grid-cols-2">
        {METERS.map((m) => (
          <Meter key={m.k} {...m} />
        ))}
      </div>
      <div className="mt-6 grid grid-cols-3 gap-px overflow-hidden border border-white/[0.07] bg-white/[0.07]">
        {[
          ["sandboxes", "7"],
          ["preempted", "0"],
          ["throttle", "none"],
        ].map(([k, v]) => (
          <div key={k} className="bg-soot-950/70 px-3 py-3">
            <div className="font-display text-[19px] text-mist-50">{v}</div>
            <div className="label-sm mt-1 text-mist-700">{k}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SandboxView() {
  return (
    <div>
      <div className="flex flex-wrap items-baseline gap-3 border-b border-white/[0.06] pb-4">
        <h4 className="font-display text-[22px] text-mist-50">Sandboxes</h4>
        <span className="label-sm text-mist-700">every action isolated & recorded</span>
      </div>
      <ul className="divide-y divide-white/[0.05] pt-1">
        {SANDBOXES.map((s) => (
          <li
            key={s.id}
            className="group flex flex-wrap items-center gap-x-5 gap-y-1 py-3 transition-colors hover:bg-white/[0.025]"
          >
            <span className="font-mono text-[12px] text-mist-50 group-hover:text-aqua-300">
              {s.id}
            </span>
            <span className="font-mono text-[11.5px] text-mist-500">{s.image}</span>
            <span className="border border-white/[0.1] px-2 py-[2px] font-mono text-[10px] text-mist-500">
              {s.iso}
            </span>
            <span className="hidden font-mono text-[11px] text-mist-700 md:block">{s.net}</span>
            <span className="ml-auto font-mono text-[11.5px] text-signal-400">{s.t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AuditView() {
  return (
    <div>
      <div className="flex flex-wrap items-baseline gap-3 border-b border-white/[0.06] pb-4">
        <h4 className="font-display text-[22px] text-mist-50">Audit Ledger</h4>
        <span className="label-sm text-mist-700">append-only · hash-chained</span>
      </div>
      <ul className="divide-y divide-white/[0.05] pt-1">
        {AUDIT.map((a) => (
          <li
            key={a.h}
            className="group flex flex-wrap items-center gap-x-4 gap-y-1 py-3 transition-colors hover:bg-white/[0.025]"
          >
            <span className="font-mono text-[11.5px] text-mist-700">{a.h}</span>
            <span className="font-mono text-[11.5px] text-iris-400">{a.who}</span>
            <span className="flex-1 truncate text-[13px] text-mist-300">{a.act}</span>
            <span className={`font-mono text-[11px] uppercase tracking-[0.14em] ${a.c}`}>
              {a.v}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------------------------------------------------------------- section */
export default function OS() {
  const [view, setView] = useState("session");
  const clock = useClock();

  return (
    <section
      id="os"
      className="relative scroll-mt-24 border-t border-soot-950/12 bg-ivory-200/70 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1360px] px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div data-reveal className="mb-5 flex items-center gap-4">
              <span className="label text-cobalt-500">03</span>
              <span className="h-px w-10 bg-soot-950/25" />
              <span className="label text-soot-400">omneel os</span>
            </div>
            <h2
              data-reveal
              style={{ "--rd": "80ms" } as React.CSSProperties}
              className="font-display text-[clamp(2.1rem,4.6vw,3.9rem)] text-soot-950"
            >
              The operating system
              <br />
              <span className="text-soot-400">agents live inside.</span>
            </h2>
          </div>
          <p
            data-reveal
            style={{ "--rd": "160ms" } as React.CSSProperties}
            className="text-[15px] leading-[1.8] text-soot-600 lg:col-span-5 lg:pb-2"
          >
            A meta-operating system: it understands tasks, governs resources, speaks to your
            applications through a typed bridge, and keeps every autonomous action inside a
            sandbox with a hash-chained trail behind it.
          </p>
        </div>

        {/* ---------------------------------------------------- the os frame */}
        <div
          data-reveal="scale"
          className="panel-ink corner-ticks corner-ticks-ink mt-14 overflow-hidden"
        >
          <div className="flex items-center gap-4 border-b border-white/[0.09] bg-white/[0.03] px-4 py-2.5 sm:px-5">
            <span className="flex gap-1.5">
              <i className="h-2 w-2 rounded-full bg-vermilion-400" />
              <i className="h-2 w-2 rounded-full bg-brass-400" />
              <i className="h-2 w-2 rounded-full bg-pine-300" />
            </span>
            <span className="label-sm text-mist-300">omneel os</span>
            <span className="hidden h-3 w-px bg-white/10 sm:block" />
            <span className="label-sm hidden text-mist-700 sm:block">workspace: atlas</span>
            <span className="ml-auto font-mono text-[11px] tabular-nums text-mist-500">{clock}</span>
          </div>

          <div className="grid lg:grid-cols-[190px_1fr_240px]">
            {/* rail */}
            <div className="flex gap-px overflow-x-auto border-b border-white/[0.07] bg-white/[0.012] lg:flex-col lg:overflow-visible lg:border-b-0 lg:border-r">
              {VIEWS.map((v) => {
                const on = v.id === view;
                return (
                  <button
                    key={v.id}
                    onClick={() => setView(v.id)}
                    className={`group relative flex shrink-0 items-center gap-3 px-4 py-3.5 text-left transition-colors duration-300 lg:shrink lg:w-full ${
                      on ? "bg-cobalt-400/[0.14] text-mist-50" : "text-mist-500 hover:bg-white/[0.04] hover:text-mist-100"
                    }`}
                  >
                    <span className={on ? "text-cobalt-300" : "text-mist-700 group-hover:text-mist-300"}>
                      <v.icon size={16} />
                    </span>
                    <span className="whitespace-nowrap text-[13px]">{v.label}</span>
                    <span
                      className={`absolute inset-y-0 left-0 w-[2px] bg-brass-400 transition-transform duration-400 ${
                        on ? "scale-y-100" : "scale-y-0"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* main */}
            <div className="min-h-[420px] px-4 py-5 sm:px-6 sm:py-6">
              <div key={view} className="anim-view">
                {view === "session" && <SessionView />}
                {view === "bridge" && <BridgeView />}
                {view === "resources" && <GovernorView />}
                {view === "sandbox" && <SandboxView />}
                {view === "audit" && <AuditView />}
              </div>
            </div>

            {/* side telemetry */}
            <div className="border-t border-white/[0.07] bg-white/[0.012] px-4 py-5 lg:border-l lg:border-t-0">
              <p className="label-sm mb-4 text-mist-700">active agents</p>
              <ul className="space-y-3">
                {AGENTS.map((a) => (
                  <li key={a.n} className="group flex items-center gap-2.5">
                    <span className="relative flex h-1.5 w-1.5 shrink-0">
                      <span
                        className="anim-ring absolute inline-flex h-full w-full rounded-full"
                        style={{ background: a.c }}
                      />
                      <span
                        className="relative inline-flex h-1.5 w-1.5 rounded-full"
                        style={{ background: a.c }}
                      />
                    </span>
                    <span className="font-mono text-[11.5px] text-mist-300 transition-colors group-hover:text-mist-50">
                      {a.n}
                    </span>
                    <span className="label-sm ml-auto text-mist-700">{a.tier}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 border-t border-white/[0.07] pt-5">
                <p className="label-sm mb-3 text-mist-700">kernel</p>
                {[
                  ["uptime", "41d 06h"],
                  ["scheduler", "fair-queue"],
                  ["isolation", "microVM"],
                  ["replay", "enabled"],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between py-1.5">
                    <span className="font-mono text-[11px] text-mist-700">{k}</span>
                    <span className="font-mono text-[11px] text-mist-300">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------- bento row */}
        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          <div
            data-reveal
            className="panel panel-hover group relative overflow-hidden p-7 lg:col-span-5"
          >
            <span className="label-sm text-pine-600">semantic filesystem</span>
            <h3 className="display-soft mt-3 text-[24px] text-soot-950">
              Files addressed by meaning
            </h3>
            <p className="mt-3 text-[13.5px] leading-relaxed text-soot-500">
              Paths stop being the only index. Ask for “contracts renewing this quarter” and Omneel
              OS resolves the set, its permissions and its provenance.
            </p>
            <div className="mt-5 space-y-1.5 bg-soot-950 p-4 font-mono text-[11.5px]">
              <p className="text-mist-700">$ find --meaning "contracts renewing q4"</p>
              {["atlas/msa-northwind.pdf", "atlas/msa-lumen.docx", "vendor/renewal-schedule.csv"].map(
                (f, i) => (
                  <p key={f} className="flex items-center gap-2 text-mist-300">
                    <span className="text-aqua-400">↳</span>
                    {f}
                    <span className="ml-auto text-mist-700">{["7d", "12d", "31d"][i]}</span>
                  </p>
                ),
              )}
            </div>
          </div>

          <div data-reveal style={{ "--rd": "90ms" } as React.CSSProperties} className="lg:col-span-3">
            <div className="panel-ink flex h-full flex-col p-7 transition-transform duration-500 hover:-translate-y-1">
              <span className="label-sm text-brass-400">microvm sandbox</span>
              <h3 className="display-soft mt-3 text-[24px] text-mist-50">Nothing runs loose</h3>
              <p className="mt-3 text-[13.5px] leading-relaxed text-mist-500">
                Agents execute in disposable micro-VMs with allow-listed egress. A misbehaving
                agent loses its sandbox, not your data.
              </p>
              <div className="mt-auto pt-6">
                <span className="font-display text-[46px] leading-none text-mist-50">120</span>
                <span className="label-sm mt-2 block text-mist-700">ms cold-start</span>
              </div>
            </div>
          </div>

          <div data-reveal style={{ "--rd": "170ms" } as React.CSSProperties} className="lg:col-span-4">
            <div className="panel panel-hover flex h-full flex-col p-7">
              <span className="label-sm text-cobalt-500">deterministic replay</span>
              <h3 className="display-soft mt-3 text-[24px] text-soot-950">Rewind any run</h3>
              <p className="mt-3 text-[13.5px] leading-relaxed text-soot-500">
                Every decision, tool call and delegation is recorded. Step backwards through an
                autonomous run the way you would a debugger.
              </p>
              <div className="relative mt-auto flex items-center gap-2 pt-7">
                <span className="h-px flex-1 bg-soot-950/15" />
                {[0, 1, 2, 3, 4].map((i) => (
                  <span
                    key={i}
                    className={`h-2 w-2 rotate-45 transition-all duration-500 ${
                      i === 3 ? "scale-150 bg-brass-500" : "bg-soot-950/18"
                    }`}
                    style={{ transitionDelay: `${i * 60}ms` }}
                  />
                ))}
                <span className="h-px flex-1 bg-soot-950/15" />
              </div>
              <p className="label-sm mt-3 text-soot-400">step 04 / 06 · agent: reviewer</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
