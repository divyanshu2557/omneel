export type Layer = {
  id: string;
  index: string;
  name: string;
  tagline: string;
  body: string;
  accent: string;
  accentOnDark: string;
  capabilities: string[];
  specs: { k: string; v: string }[];
};

export const LAYERS: Layer[] = [
  {
    id: "intent",
    index: "L4",
    name: "Intent & Knowledge",
    tagline: "Where human goals become executable actions",
    body: "The top of the stack. Omneel reads what you actually meant — ambiguous, partial, spoken mid-meeting — and compiles it into a grounded plan bound to your knowledge, your permissions and your memory.",
    accent: "#B8791A",
    accentOnDark: "#E0A21B",
    capabilities: [
      "Intent compiler with ambiguity resolution",
      "Enterprise knowledge graph with citations",
      "Permission ledger — allow, deny, require-approval",
      "Episodic + semantic memory with redaction",
    ],
    specs: [
      { k: "grounding", v: "citation-first" },
      { k: "memory", v: "18 mo retention" },
      { k: "latency", v: "9 ms parse" },
    ],
  },
  {
    id: "agents",
    index: "L3",
    name: "Agentic AI Layer",
    tagline: "A hierarchy that plans, delegates and self-corrects",
    body: "Principal orchestrators decompose work, delegate to specialist agents, argue with critics, and re-plan when reality disagrees. Every delegation is typed, budgeted and auditable.",
    accent: "#C0392B",
    accentOnDark: "#E04B39",
    capabilities: [
      "Orchestrator → specialist → worker tree",
      "Consensus & adversarial critique",
      "Self-healing retries with escalation",
      "Per-agent token and cost governors",
    ],
    specs: [
      { k: "tiers", v: "3 deep" },
      { k: "quorum", v: "0.66" },
      { k: "recovery", v: "automatic" },
    ],
  },
  {
    id: "os",
    index: "L2",
    name: "Omneel OS",
    tagline: "A meta-operating system for agents",
    body: "Not an app that runs on an OS — an OS that runs agents. Omneel OS schedules work, governs resources, bridges third-party applications, and sandboxes every action an agent takes.",
    accent: "#0F6B4F",
    accentOnDark: "#3FD9A8",
    capabilities: [
      "Agent scheduler & resource governor",
      "App Bridge — 140+ first-party connectors",
      "Sandboxed, replayable execution",
      "Semantic filesystem indexed by meaning",
    ],
    specs: [
      { k: "connectors", v: "140+" },
      { k: "sandboxes", v: "microVM" },
      { k: "replay", v: "deterministic" },
    ],
  },
  {
    id: "language",
    index: "L1",
    name: "Omneel Language",
    tagline: "Programming expressed as intent",
    body: "A statically-typed, AI-native language where `intent`, `agent`, `flow` and `permissions` are primitives rather than libraries. Natural-language docstrings compile into agent contracts.",
    accent: "#1F3CE0",
    accentOnDark: "#7C93FF",
    capabilities: [
      "Intent-first syntax — `.onl` sources",
      "Typed capabilities & permission scopes",
      "First-class agent spawn / delegate primitives",
      "Deterministic replay of any run",
    ],
    specs: [
      { k: "extension", v: ".onl" },
      { k: "typing", v: "static + caps" },
      { k: "runtime", v: "omneelc" },
    ],
  },
];

export const TICKER = [
  "INTENT ENGINE",
  "AGENT MESH",
  "OMNEEL OS",
  "ZERO-GLUE WORKFLOWS",
  "MEMORY FABRIC",
  "PERMISSION LEDGER",
  "APP BRIDGE 140+",
  "DETERMINISTIC REPLAY",
  "CONSENSUS CRITICS",
  "COST GOVERNOR",
];

export const CODE_SAMPLES: { id: string; file: string; title: string; note: string; code: string }[] = [
  {
    id: "intent",
    file: "close-the-quarter.onl",
    title: "Intent-first program",
    note: "A whole quarter-end workflow in one declarative source file.",
    code: `// one file, one business outcome — no glue code
intent "close the quarter" as CloseQuarter
  goal        := "Reconcile Q3 revenue and ship the board deck"
  owner       := agent("orchestrator", tier: principal)
  deadline    := date.friday(17, 00)
  context     := knowledge.bind(["finance/q3", "brand/v4"])
  permissions := allow(read: ledger, write: drive, deny: payroll)

flow {
  ledger    <- source.connect("omneel-ledger")
  deltas    <- ledger.query("revenue by region, q3 vs q2")
  narrative <- agent("analyst").draft(deltas, tone: "board-ready")
  deck      <- agent("designer").compose(narrative, template: brand.v4)
  verdict   <- agent("reviewer").verify(deck, against: ledger)

  on verdict.rejected -> delegate("editor", verdict.notes) & retry(max: 2)
  emit deliver(deck, to: "board@omneel.tech")
}`,
  },
  {
    id: "agents",
    file: "orchestrator.onl",
    title: "Agent hierarchy",
    note: "Declare a tree of agents with budgets, models and quorum rules.",
    code: `agent orchestrator(tier: principal, budget: 40_000 tokens) {
  delegates {
    analyst  = agent("analyst",  model: "omneel-reason-2")
    designer = agent("designer", model: "omneel-vision-1")
    reviewer = agent("reviewer", model: "omneel-reason-2", critic: true)
  }

  plan task -> steps {
    for step in steps:
      spawn worker(step) on os.pool("gpu-a")
      await worker.result | timeout(120s) | escalate(orchestrator)
  }

  consensus(reviewers: 3, quorum: 0.66) -> verdict
  audit every action -> ledger.append_only
}`,
  },
  {
    id: "policy",
    file: "policy.atlas.onl",
    title: "Memory & permissions",
    note: "Policy as source: retention, redaction and approval gates.",
    code: `memory "project-atlas" {
  retain := 18 months
  forget := pii, credentials, raw.transcripts
  redact := on.export(external: true)
}

permissions role "finance-lead" {
  allow   read:  ledger.*, invoices.*
  allow   write: drive/board/*
  deny    write: payroll.*
  require approval: transfer(amount > 25_000)
  audit   every action -> ledger.append_only
}`,
  },
];

export const OS_VIEWS = [
  {
    id: "session",
    label: "Agent Session",
    hint: "Live view of an orchestrated run",
  },
  { id: "bridge", label: "App Bridge", hint: "140+ connectors under one capability model" },
  { id: "resources", label: "Governor", hint: "CPU, memory, tokens and cost ceilings" },
  { id: "sandbox", label: "Sandbox", hint: "Every action isolated, recorded, replayable" },
  { id: "audit", label: "Audit Ledger", hint: "Append-only trail of who did what and why" },
] as const;

export const METRICS = [
  { value: 4, suffix: "", label: "Converged layers", sub: "language · OS · agents · intent" },
  { value: 140, suffix: "+", label: "Bridged applications", sub: "one capability model" },
  { value: 9, suffix: "ms", label: "Intent → plan", sub: "median compile time" },
  { value: 63, suffix: "%", label: "Manual tool-switching removed", sub: "measured in design partners" },
];

export const ROADMAP = [
  {
    phase: "Phase 01",
    state: "shipped",
    progress: 100,
    title: "Omneel Language core",
    items: ["`.onl` compiler & type system", "Intent primitives", "Deterministic replay runtime"],
  },
  {
    phase: "Phase 02",
    state: "shipped",
    progress: 100,
    title: "OS kernel & App Bridge",
    items: ["Agent scheduler", "microVM sandboxing", "First 40 connectors"],
  },
  {
    phase: "Phase 03",
    state: "in flight",
    progress: 68,
    title: "Agentic mesh at scale",
    items: ["Principal ↔ specialist delegation", "Consensus critics", "Cost & token governors"],
  },
  {
    phase: "Phase 04",
    state: "in flight",
    progress: 41,
    title: "Intent & knowledge fabric",
    items: ["Enterprise knowledge graph", "Permission ledger", "Long-horizon memory"],
  },
  {
    phase: "Phase 05",
    state: "horizon",
    progress: 12,
    title: "The converged workspace",
    items: ["Zero-app default surface", "Spoken intent everywhere", "Self-authoring workflows"],
  },
];

export const CONNECTORS = [
  "Ledger",
  "Drive",
  "Mail",
  "Calendar",
  "Warehouse",
  "CRM",
  "Relay",
  "Browser",
  "Terminal",
  "Design Studio",
  "Ticket Desk",
  "Codebase",
  "Contracts",
  "Support Desk",
  "Analytics",
  "HR Core",
];

export const PROTOCOLS = [
  {
    name: "Delegation",
    detail: "A principal agent hands a typed sub-goal to a specialist, with budget, deadline and success criteria attached.",
  },
  {
    name: "Consensus",
    detail: "Three critics score an output. Below quorum 0.66 the work is re-planned rather than shipped.",
  },
  {
    name: "Escalation",
    detail: "Timeouts and refusals bubble up the tree until a human approval gate or a higher-tier agent resolves them.",
  },
  {
    name: "Self-healing",
    detail: "Failed steps are diffed against the plan; the orchestrator patches the plan instead of restarting it.",
  },
];

export const FLOW = [
  { k: "01", t: "You state a goal", d: "Plain language, a document, a screenshot, a voice note. No forms, no ticket templates." },
  { k: "02", t: "Intent is compiled", d: "Omneel resolves ambiguity, binds context from your knowledge graph, and types the goal." },
  { k: "03", t: "Permissions are checked", d: "The ledger decides what the run may read, write, spend and approve — before anything executes." },
  { k: "04", t: "Agents are dispatched", d: "Omneel OS schedules a hierarchy of agents across sandboxes, pools and bridged applications." },
  { k: "05", t: "Work is verified", d: "Critic agents re-check claims against source systems. Rejected work is re-planned, not delivered." },
  { k: "06", t: "Memory is written back", d: "Outcomes, decisions and corrections become context for the next intent. The system compounds." },
];
