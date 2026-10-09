import { useState } from "react";
import { IconArrow, IconCheck } from "./Icons";

const PERKS = [
  "Private beta of Omneel Language and the omneelc compiler",
  "A dedicated Omneel OS workspace with 25 bridged applications",
  "Weekly design session with the intent & knowledge team",
  "Founding pricing locked for 24 months after general availability",
];

const ROLES = ["Engineering", "Operations", "Finance", "Product", "Founder / Exec", "Research"];

const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

export default function Access() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState(ROLES[0]);
  const [goal, setGoal] = useState("");
  const [err, setErr] = useState<{ email?: string; name?: string }>({});
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: { email?: string; name?: string } = {};
    if (!EMAIL.test(email.trim())) next.email = "enter a valid work email";
    if (name.trim().length < 2) next.name = "tell us who you are";
    setErr(next);
    if (Object.keys(next).length === 0) setSent(true);
  };

  const ref = `omn-${Math.abs(
    Array.from(email + name).reduce((a, c) => (a * 31 + c.charCodeAt(0)) % 99991, 7),
  )
    .toString(16)
    .padStart(4, "0")}`;

  return (
    <section id="access" className="relative scroll-mt-24 border-t border-soot-950/12 py-24 sm:py-32">
      <div className="mx-auto max-w-[1360px] px-5 sm:px-8">
        <div className="panel-ink corner-ticks corner-ticks-ink relative overflow-hidden">
          <div aria-hidden className="grid-fine absolute inset-0 opacity-70" />
          <div
            aria-hidden
            className="anim-spin-slow absolute -bottom-56 -left-40 h-[520px] w-[520px] rounded-full border border-dashed border-white/[0.09]"
          />
          <div
            aria-hidden
            className="anim-breathe absolute -right-24 -top-32 h-[440px] w-[440px] rounded-full blur-[100px]"
            style={{ background: "#3D57F0", opacity: 0.22 }}
          />
          <div
            aria-hidden
            className="anim-breathe absolute -bottom-40 left-1/3 h-[380px] w-[380px] rounded-full blur-[110px]"
            style={{ background: "#B8791A", opacity: 0.14, animationDelay: "3s" }}
          />

          <div className="relative grid gap-12 p-7 sm:p-12 lg:grid-cols-12 lg:gap-14 lg:p-16">
            {/* ------------------------------------------------------- left */}
            <div className="lg:col-span-6">
              <div data-reveal className="mb-5 flex items-center gap-4">
                <span className="label text-brass-400">09</span>
                <span className="h-px w-10 bg-white/20" />
                <span className="label text-mist-500">early access</span>
              </div>
              <h2
                data-reveal
                style={{ "--rd": "70ms" } as React.CSSProperties}
                className="display-soft text-[clamp(2.2rem,5vw,4.2rem)] leading-[1.02] text-mist-50"
              >
                Bring us one goal
                <br />
                <span className="text-cobalt-300">you can't automate today.</span>
              </h2>
              <p
                data-reveal
                style={{ "--rd": "140ms" } as React.CSSProperties}
                className="mt-6 max-w-lg text-[15px] leading-[1.8] text-mist-300"
              >
                Cohort 04 opens to twenty teams. We onboard one intent from your organisation end
                to end — language source, agent hierarchy, permissions and all — and you watch it
                run inside Omneel OS.
              </p>

              <ul className="mt-9 border-t border-white/[0.1]">
                {PERKS.map((p, i) => (
                  <li
                    key={p}
                    data-reveal="left"
                    style={{ "--rd": `${200 + i * 70}ms` } as React.CSSProperties}
                    className="group flex items-start gap-3.5 border-b border-white/[0.1] py-4 transition-colors duration-400 hover:bg-white/[0.03]"
                  >
                    <span className="mt-[3px] text-pine-300 transition-transform duration-300 group-hover:scale-125">
                      <IconCheck size={14} />
                    </span>
                    <span className="text-[14px] leading-relaxed text-mist-300 transition-colors duration-300 group-hover:text-mist-50">
                      {p}
                    </span>
                    <span className="label-sm ml-auto pt-1 text-mist-700">0{i + 1}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
                {[
                  ["14", "seats left", "text-mist-50"],
                  ["20", "teams in cohort 04", "text-mist-50"],
                  ["Q2", "onboarding begins", "text-brass-400"],
                ].map(([n, l, c]) => (
                  <div key={l}>
                    <span className={`font-display text-[26px] ${c}`}>{n}</span>
                    <span className="label-sm ml-2 text-mist-500">{l}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ------------------------------------------------------ form */}
            <div className="lg:col-span-6">
              <div
                data-reveal="right"
                className="relative border border-white/[0.12] bg-soot-950/70 p-6 backdrop-blur-sm sm:p-8"
              >
                {sent ? (
                  <div className="anim-view flex min-h-[420px] flex-col justify-center">
                    <span className="flex h-12 w-12 items-center justify-center border border-pine-300/50 bg-pine-300/12 text-pine-300">
                      <IconCheck size={22} />
                    </span>
                    <h3 className="font-display mt-6 text-[30px] text-mist-50">Intent received.</h3>
                    <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-mist-300">
                      Thanks {name.split(" ")[0]} — your seat in cohort 04 is held for 72 hours.
                      We'll reply to <span className="text-pine-300">{email}</span> with the
                      onboarding brief.
                    </p>
                    <div className="mt-7 space-y-2 border-t border-white/[0.1] pt-5 font-mono text-[11.5px]">
                      {[
                        ["request", ref],
                        ["role", role.toLowerCase()],
                        ["status", "queued for review"],
                        ["first intent", goal.trim() ? "attached" : "to be scoped"],
                      ].map(([k, v]) => (
                        <div key={k} className="flex items-baseline gap-3">
                          <span className="text-mist-700">{k}</span>
                          <span className="h-px flex-1 bg-white/[0.09]" />
                          <span className="text-mist-300">{v}</span>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => {
                        setSent(false);
                        setEmail("");
                        setName("");
                        setGoal("");
                      }}
                      className="label-sm mt-7 self-start text-mist-500 transition-colors hover:text-brass-400"
                    >
                      ← submit another intent
                    </button>
                  </div>
                ) : (
                  <form onSubmit={submit} noValidate>
                    <span className="label-sm text-mist-700">design partner · cohort 04</span>
                    <h3 className="display-soft mt-3 text-[26px] text-mist-50">
                      Request early access
                    </h3>

                    <div className="mt-7 space-y-5">
                      <Field
                        id="name"
                        label="name"
                        value={name}
                        onChange={(v) => {
                          setName(v);
                          setErr((e) => ({ ...e, name: undefined }));
                        }}
                        placeholder="Ada Okonkwo"
                        error={err.name}
                      />
                      <Field
                        id="email"
                        label="work email"
                        type="email"
                        value={email}
                        onChange={(v) => {
                          setEmail(v);
                          setErr((e) => ({ ...e, email: undefined }));
                        }}
                        placeholder="ada@company.com"
                        error={err.email}
                      />

                      <div>
                        <span className="label-sm mb-2 block text-mist-500">role</span>
                        <div className="flex flex-wrap gap-2">
                          {ROLES.map((r) => (
                            <button
                              type="button"
                              key={r}
                              onClick={() => setRole(r)}
                              className={`border px-3 py-1.5 text-[12.5px] transition-all duration-300 ${
                                role === r
                                  ? "border-cobalt-300/70 bg-cobalt-400/20 text-cobalt-300"
                                  : "border-white/[0.14] text-mist-500 hover:border-white/35 hover:text-mist-100"
                              }`}
                            >
                              {r}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label htmlFor="goal" className="label-sm mb-2 block text-mist-500">
                          the first intent you'd hand omneel
                        </label>
                        <textarea
                          id="goal"
                          rows={3}
                          value={goal}
                          onChange={(e) => setGoal(e.target.value)}
                          placeholder="“Reconcile month-end across three ledgers and draft the variance memo.”"
                          className="w-full resize-none border border-white/[0.14] bg-white/[0.03] px-3.5 py-3 text-[13.5px] text-mist-100 outline-none transition-colors duration-300 placeholder:text-mist-700 focus:border-cobalt-300/70 focus:bg-cobalt-400/[0.07]"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn-cobalt group mt-7 flex w-full items-center justify-center gap-2.5 px-6 py-4 text-[14px] font-medium"
                    >
                      Submit intent
                      <IconArrow
                        size={16}
                        className="transition-transform duration-300 group-hover:translate-x-1.5"
                      />
                    </button>
                    <p className="label-sm mt-4 text-center leading-relaxed text-mist-700">
                      no newsletter. no spam. one reply from a human.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  error,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="label-sm mb-2 block text-mist-500">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full border bg-white/[0.03] px-3.5 py-3 text-[14px] text-mist-100 outline-none transition-colors duration-300 placeholder:text-mist-700 ${
          error
            ? "border-vermilion-400/80 bg-vermilion-400/[0.07]"
            : "border-white/[0.14] focus:border-cobalt-300/70 focus:bg-cobalt-400/[0.07]"
        }`}
      />
      {error && (
        <span className="mt-1.5 block font-mono text-[11px] text-vermilion-400">! {error}</span>
      )}
    </div>
  );
}
