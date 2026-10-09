import { useState } from "react";
import { PROTOCOLS } from "../lib/content";
import { useInView } from "../lib/hooks";

type Node = {
  id: string;
  name: string;
  tier: string;
  x: number;
  y: number;
  c: string;
  cd: string;
  model: string;
  budget: string;
  duty: string;
};

const NODES: Node[] = [
  {
    id: "orchestrator",
    name: "orchestrator",
    tier: "principal",
    x: 50,
    y: 4,
    c: "#B8791A",
    cd: "#E0A21B",
    model: "omneel-reason-2",
    budget: "40k tok / run",
    duty: "Decomposes the compiled intent, delegates sub-goals, arbitrates between critics and re-plans when a step fails.",
  },
  {
    id: "planner",
    name: "planner",
    tier: "specialist",
    x: 16,
    y: 40,
    c: "#0F6B4F",
    cd: "#3FD9A8",
    model: "omneel-reason-2",
    budget: "12k tok",
    duty: "Turns a sub-goal into an ordered step graph with dependencies, tool requirements and success criteria.",
  },
  {
    id: "critic",
    name: "critic",
    tier: "adversary",
    x: 50,
    y: 40,
    c: "#C0392B",
    cd: "#E04B39",
    model: "omneel-reason-2",
    budget: "9k tok",
    duty: "Argues against the plan and the output. Below quorum 0.66 the work is sent back rather than shipped.",
  },
  {
    id: "executor",
    name: "executor",
    tier: "specialist",
    x: 84,
    y: 40,
    c: "#1F3CE0",
    cd: "#7C93FF",
    model: "omneel-act-1",
    budget: "15k tok",
    duty: "Holds the App Bridge session, performs side effects inside sandboxes and streams results back up the tree.",
  },
  { id: "analyst", name: "analyst", tier: "worker", x: 8, y: 78, c: "#0F6B4F", cd: "#3FD9A8", model: "omneel-reason-1", budget: "4k tok", duty: "Queries source systems and returns grounded, cited deltas." },
  { id: "designer", name: "designer", tier: "worker", x: 29, y: 78, c: "#0F6B4F", cd: "#3FD9A8", model: "omneel-vision-1", budget: "6k tok", duty: "Composes documents, decks and briefs against the bound brand context." },
  { id: "researcher", name: "researcher", tier: "worker", x: 50, y: 78, c: "#C0392B", cd: "#E04B39", model: "omneel-reason-1", budget: "5k tok", duty: "Retrieves from the knowledge graph and external sources with provenance." },
  { id: "reviewer", name: "reviewer", tier: "worker", x: 71, y: 78, c: "#C0392B", cd: "#E04B39", model: "omneel-reason-2", budget: "5k tok", duty: "Verifies every claim in an artefact against the system of record." },
  { id: "courier", name: "courier", tier: "worker", x: 92, y: 78, c: "#1F3CE0", cd: "#7C93FF", model: "omneel-act-1", budget: "1k tok", duty: "Delivers, notifies and requests human approval at the gated step." },
];

const EDGES: [string, string][] = [
  ["orchestrator", "planner"],
  ["orchestrator", "critic"],
  ["orchestrator", "executor"],
  ["planner", "analyst"],
  ["planner", "designer"],
  ["critic", "researcher"],
  ["critic", "reviewer"],
  ["executor", "courier"],
];

const byId = Object.fromEntries(NODES.map((n) => [n.id, n])) as Record<string, Node>;

function path(from: Node, to: Node) {
  const y1 = from.y + 9;
  const y2 = to.y;
  const my = (y1 + y2) / 2;
  return `M ${from.x} ${y1} C ${from.x} ${my}, ${to.x} ${my}, ${to.x} ${y2}`;
}

export default function Agents() {
  const [sel, setSel] = useState<string>("orchestrator");
  const { ref: diagramRef, inView } = useInView<HTMLDivElement>(0.18);
  const active = byId[sel];
  const related = EDGES.filter(([a, b]) => a === sel || b === sel);
  const isHot = (e: [string, string]) => related.some(([a, b]) => a === e[0] && b === e[1]);

  return (
    <section
      id="agents"
      className="relative scroll-mt-24 border-t border-soot-950/12 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1360px] px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div data-reveal className="mb-5 flex items-center gap-4">
              <span className="label text-cobalt-500">04</span>
              <span className="h-px w-10 bg-soot-950/25" />
              <span className="label text-soot-400">agentic ai layer</span>
            </div>
            <h2
              data-reveal
              style={{ "--rd": "80ms" } as React.CSSProperties}
              className="font-display text-[clamp(2.1rem,4.6vw,3.9rem)] text-soot-950"
            >
              A hierarchy that
              <br />
              <span className="text-vermilion-500">argues with itself.</span>
            </h2>
          </div>
          <p
            data-reveal
            style={{ "--rd": "160ms" } as React.CSSProperties}
            className="text-[15px] leading-[1.8] text-soot-600 lg:col-span-5 lg:pb-2"
          >
            Autonomous agents fail quietly when they work alone. Omneel runs them as a governed
            organisation — principals delegate, specialists execute, critics object, and everything
            escalates to a human gate when it should.
          </p>
        </div>

        {/* ------------------------------------------------------ the diagram */}
        <div data-reveal="scale" className="panel mt-14 hidden overflow-hidden p-6 lg:block">
          <div ref={diagramRef} className="relative h-[470px]">
            <svg
              aria-hidden
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full"
            >
              {EDGES.map(([a, b]) => {
                const hot = isHot([a, b]);
                return (
                  <path
                    key={`${a}-${b}`}
                    d={path(byId[a], byId[b])}
                    fill="none"
                    stroke={hot ? byId[a].c : "rgba(8,9,10,0.2)"}
                    strokeWidth={hot ? 1.7 : 1}
                    vectorEffect="non-scaling-stroke"
                    className={hot ? "anim-dash-fast" : "anim-dash"}
                    style={{ transition: "stroke .4s ease" }}
                  />
                );
              })}
            </svg>

            {NODES.map((n, i) => {
              const on = n.id === sel;
              return (
                <button
                  key={n.id}
                  onClick={() => setSel(n.id)}
                  onMouseEnter={() => setSel(n.id)}
                  style={{ left: `${n.x}%`, top: `${n.y}%`, transitionDelay: `${i * 55}ms` }}
                  className={`absolute -translate-x-1/2 outline-none transition-opacity duration-[900ms] ${
                    inView ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <span
                    className="relative flex items-center gap-2.5 whitespace-nowrap border px-3.5 py-2.5 transition-all duration-400"
                    style={{
                      borderColor: on ? "#0e0f12" : "rgba(8,9,10,0.16)",
                      background: on ? "#0e0f12" : "#fcfaf5",
                      transform: on ? "translateY(-2px)" : "none",
                      boxShadow: on ? `0 16px 32px -20px rgba(8,9,10,.9)` : "0 1px 0 rgba(255,255,255,.8) inset",
                    }}
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{
                        background: on ? n.cd : n.c,
                        boxShadow: on ? `0 0 10px ${n.cd}` : "none",
                      }}
                    />
                    <span
                      className={`font-mono text-[12px] ${on ? "text-ivory-50" : "text-soot-800"}`}
                    >
                      {n.name}
                    </span>
                    <span className="label-sm" style={{ color: on ? n.cd : "#8e939c" }}>
                      {n.tier}
                    </span>
                  </span>
                </button>
              );
            })}

            {[
              { y: 4, t: "tier 01 · principal" },
              { y: 40, t: "tier 02 · specialist" },
              { y: 78, t: "tier 03 · worker" },
            ].map((r) => (
              <span
                key={r.t}
                className="label-sm absolute left-0 hidden -translate-y-6 text-soot-400 xl:block"
                style={{ top: `${r.y}%` }}
              >
                {r.t}
              </span>
            ))}
          </div>
        </div>

        {/* ------------------------------------------------- mobile tier list */}
        <div className="mt-10 space-y-3 lg:hidden">
          {NODES.map((n) => (
            <button
              key={n.id}
              onClick={() => setSel(n.id)}
              className="flex w-full items-center gap-3 border px-4 py-3 text-left transition-colors"
              style={{
                borderColor: sel === n.id ? "#0e0f12" : "rgba(8,9,10,.14)",
                background: sel === n.id ? "#0e0f12" : "#fcfaf5",
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: sel === n.id ? n.cd : n.c }}
              />
              <span
                className={`font-mono text-[12.5px] ${sel === n.id ? "text-ivory-50" : "text-soot-800"}`}
              >
                {n.name}
              </span>
              <span className="label-sm ml-auto" style={{ color: sel === n.id ? n.cd : "#8e939c" }}>
                {n.tier}
              </span>
            </button>
          ))}
        </div>

        {/* ---------------------------------------------------- selected agent */}
        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          <div className="panel-ink corner-ticks corner-ticks-ink p-7 lg:col-span-7">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className="label-sm px-2.5 py-1"
                style={{ background: `${active.cd}22`, color: active.cd }}
              >
                {active.tier}
              </span>
              <h3 className="font-display text-[26px] text-mist-50">{active.name}</h3>
            </div>
            <p className="mt-4 max-w-xl text-[14.5px] leading-[1.8] text-mist-300">{active.duty}</p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {[
                ["model", active.model],
                ["budget", active.budget],
                ["delegations", String(related.length)],
              ].map(([k, v]) => (
                <span
                  key={k}
                  className="border border-white/[0.12] px-3 py-1.5 font-mono text-[11px] text-mist-300"
                >
                  <span className="text-mist-700">{k}</span>
                  <span className="mx-1.5 text-white/20">|</span>
                  {v}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-px overflow-hidden border border-soot-950/12 bg-soot-950/12 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            {PROTOCOLS.slice(0, 4).map((p, i) => (
              <div
                key={p.name}
                data-reveal
                style={{ "--rd": `${i * 70}ms` } as React.CSSProperties}
                className="group bg-ivory-50 p-5 transition-colors duration-400 hover:bg-ivory-200"
              >
                <div className="flex items-baseline gap-3">
                  <span className="label-sm text-soot-400 transition-colors group-hover:text-vermilion-500">
                    p{i + 1}
                  </span>
                  <h4 className="display-soft text-[17px] text-soot-950">{p.name}</h4>
                </div>
                <p className="mt-2 text-[13px] leading-relaxed text-soot-500 transition-colors duration-300 group-hover:text-soot-700">
                  {p.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
