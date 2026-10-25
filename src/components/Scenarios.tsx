import { useState } from "react";
import { IconArrow } from "./Icons";

type Scenario = {
  tag: string;
  c: string;
  quote: string;
  plan: string[];
  before: string;
  after: string;
  metric: string;
};

const SCENARIOS: Scenario[] = [
  {
    tag: "finance",
    c: "#0F6B4F",
    quote: "Close the quarter and brief the board.",
    plan: [
      "bind finance/q3 context",
      "pull ledger deltas by region",
      "draft board narrative",
      "compose deck · brand v4",
      "critic verifies every claim",
      "gated delivery to board@",
    ],
    before: "3 days · 6 people · 4 spreadsheets",
    after: "41 minutes · 1 approval",
    metric: "−97%",
  },
  {
    tag: "operations",
    c: "#B8791A",
    quote: "Onboard the new enterprise customer. No checklist.",
    plan: [
      "parse signed MSA",
      "provision OS workspace",
      "assign CSM + escalation path",
      "schedule kickoff across 3 timezones",
      "draft welcome pack",
      "write onboarding memory",
    ],
    before: "11 handoffs · 2 weeks",
    after: "0 handoffs · 2 days",
    metric: "11→0",
  },
  {
    tag: "sales",
    c: "#C0392B",
    quote: "Chase every renewal landing in the next thirty days.",
    plan: [
      "query CRM renewals ≤ 30d",
      "score churn risk from usage",
      "draft tailored outreach",
      "approval gate on tone + pricing",
      "send via Mail bridge",
      "track replies into memory",
    ],
    before: "62% of renewals touched",
    after: "100% coverage · +38% replies",
    metric: "+38%",
  },
  {
    tag: "engineering",
    c: "#1F3CE0",
    quote: "Find out why checkout latency regressed.",
    plan: [
      "diff p95 traces vs baseline",
      "correlate with last 14 deploys",
      "form hypotheses · rank",
      "reproduce in sandbox",
      "propose patch + rollback plan",
      "hand to human for merge",
    ],
    before: "MTTR 6.2 hours",
    after: "MTTR 47 minutes",
    metric: "−87%",
  },
  {
    tag: "executive",
    c: "#2C2F36",
    quote: "Get me ready for the margin question on Thursday.",
    plan: [
      "retrieve prior board minutes",
      "cohort margin analysis",
      "model 3 scenarios",
      "critic stress-tests assumptions",
      "compose one-page brief",
      "calendar hold + pre-read",
    ],
    before: "a delegated week of analysis",
    after: "brief ready in 12 minutes",
    metric: "12 min",
  },
];

export default function Scenarios() {
  const [open, setOpen] = useState(0);

  return (
    <section className="relative border-t border-soot-950/12 py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-7">
            <div data-reveal className="mb-4 flex items-center gap-3 sm:mb-5 sm:gap-4">
              <span className="label text-cobalt-500">06</span>
              <span className="h-px w-8 bg-soot-950/25 sm:w-10" />
              <span className="label text-soot-400">intents, resolved</span>
            </div>
            <h2
              data-reveal
              style={{ "--rd": "80ms" } as React.CSSProperties}
              className="font-display text-[clamp(1.85rem,4.4vw,3.9rem)] text-soot-950"
            >
              Five sentences that
              <br />
              <span className="text-soot-400">used to be five projects.</span>
            </h2>
          </div>
          <p
            data-reveal
            style={{ "--rd": "150ms" } as React.CSSProperties}
            className="text-[14.5px] leading-[1.75] text-soot-600 sm:text-[15px] sm:leading-[1.8] lg:col-span-5 lg:pb-2"
          >
            Each of these is a single intent handed to Omneel. The plan underneath was compiled,
            permission-checked and executed by the agent mesh — not assembled by a human in a
            project tool.
          </p>
        </div>

        <div className="mt-10 border-t border-soot-950/15 sm:mt-14">
          {SCENARIOS.map((s, i) => {
            const on = i === open;
            return (
              <div
                key={s.tag}
                data-reveal
                style={{ "--rd": `${i * 70}ms` } as React.CSSProperties}
                className="border-b border-soot-950/15"
              >
                <button
                  onClick={() => setOpen(on ? -1 : i)}
                  aria-expanded={on}
                  className="group flex w-full items-center gap-3 py-4.5 text-left transition-colors duration-400 hover:bg-soot-950/[0.03] sm:gap-6 sm:py-6 lg:gap-8 lg:py-7"
                >
                  <span
                    className="label-sm w-5 shrink-0 transition-colors duration-400 sm:w-6"
                    style={{ color: on ? s.c : "#8e939c" }}
                  >
                    0{i + 1}
                  </span>
                  <span
                    className="label-sm shrink-0 border px-1.5 py-0.5 text-center text-[9px] uppercase tracking-wider transition-colors duration-400 sm:w-24 sm:px-2 sm:py-1 sm:text-[9.5px]"
                    style={{
                      borderColor: on ? `${s.c}66` : "rgba(8,9,10,.14)",
                      color: on ? s.c : "#6a6f79",
                      background: on ? `${s.c}12` : "transparent",
                    }}
                  >
                    {s.tag}
                  </span>
                  <span
                    className={`display-soft min-w-0 flex-1 text-[clamp(1.05rem,2.4vw,1.9rem)] leading-tight transition-colors duration-400 ${
                      on ? "text-soot-950" : "text-soot-600 group-hover:text-soot-900"
                    }`}
                  >
                    {s.quote}
                  </span>
                  <span
                    className="shrink-0 font-display text-[15px] font-bold transition-colors duration-400 sm:text-[20px] md:text-[26px]"
                    style={{ color: on ? s.c : "#b3b7bd" }}
                  >
                    {s.metric}
                  </span>
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center border transition-all duration-500 sm:h-8 sm:w-8 ${
                      on
                        ? "border-soot-950 bg-soot-950 text-ivory-50"
                        : "border-soot-950/20 text-soot-600 group-hover:border-soot-950/50"
                    }`}
                  >
                    <IconArrow
                      size={13}
                      className={`transition-transform duration-500 ${
                        on ? "rotate-90" : "group-hover:translate-x-0.5"
                      }`}
                    />
                  </span>
                </button>

                <div
                  className="grid transition-[grid-template-rows,opacity] duration-[600ms] ease-[cubic-bezier(.16,1,.3,1)]"
                  style={{ gridTemplateRows: on ? "1fr" : "0fr", opacity: on ? 1 : 0 }}
                >
                  <div className="overflow-hidden">
                    <div className="grid gap-6 pb-6 pl-2 pr-1 sm:gap-8 sm:pb-9 sm:pl-10 sm:pr-0 md:grid-cols-12">
                      <div className="min-w-0 md:col-span-7">
                        <p className="label-sm mb-3 text-soot-400 sm:mb-4">compiled plan</p>
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                          {s.plan.map((p, k) => (
                            <span key={p} className="flex items-center gap-1.5 sm:gap-2">
                              <span
                                className="border bg-ivory-50 px-2.5 py-1 font-mono text-[10.5px] text-soot-700 transition-colors duration-300 hover:bg-soot-950 hover:text-ivory-50 sm:px-3 sm:py-1.5 sm:text-[11px]"
                                style={{ borderColor: on ? `${s.c}44` : "rgba(8,9,10,.14)" }}
                              >
                                <span className="mr-1.5 text-soot-400">
                                  {String(k + 1).padStart(2, "0")}
                                </span>
                                {p}
                              </span>
                              {k < s.plan.length - 1 && (
                                <span className="text-[11px]" style={{ color: `${s.c}99` }}>→</span>
                              )}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="md:col-span-5">
                        <p className="label-sm mb-3 text-soot-400 sm:mb-4">outcome</p>
                        <div className="border border-soot-950/12 bg-ivory-50 p-4 sm:p-5">
                          <div className="flex items-baseline justify-between gap-3 border-b border-soot-950/10 pb-2.5 sm:gap-4 sm:pb-3">
                            <span className="label-sm text-soot-400">before</span>
                            <span className="text-right text-[12.5px] text-soot-500 line-through decoration-vermilion-500/70 sm:text-[13px]">
                              {s.before}
                            </span>
                          </div>
                          <div className="flex items-baseline justify-between gap-3 pt-2.5 sm:gap-4 sm:pt-3">
                            <span className="label-sm" style={{ color: s.c }}>
                              after
                            </span>
                            <span className="display-soft text-right text-[17px] text-soot-950 sm:text-[19px]">
                              {s.after}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
