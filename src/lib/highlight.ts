/** Tiny single-pass tokeniser for the Omneel Language (`.onl`) samples. */

const KEYWORDS = new Set([
  "intent",
  "goal",
  "owner",
  "deadline",
  "context",
  "permissions",
  "flow",
  "agent",
  "agents",
  "delegates",
  "plan",
  "spawn",
  "await",
  "on",
  "emit",
  "memory",
  "retain",
  "forget",
  "redact",
  "allow",
  "deny",
  "require",
  "audit",
  "every",
  "consensus",
  "for",
  "in",
  "as",
  "retry",
  "delegate",
  "timeout",
  "escalate",
  "role",
  "action",
  "steps",
  "source",
  "knowledge",
  "date",
  "os",
  "max",
  "tier",
  "budget",
  "model",
  "critic",
  "to",
  "against",
  "template",
  "tone",
  "quorum",
  "reviewers",
  "amount",
  "external",
  "pii",
  "credentials",
  "append_only",
]);

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const RX =
  /(\/\/[^\n]*)|("(?:[^"\\]|\\.)*")|(\b\d[\d_]*(?:\.\d+)?\s*(?:ms|s|months|k|%)?\b)|([A-Za-z_]\w*)|([^\sA-Za-z0-9_]+)|(\s+)/g;

export function highlight(code: string): string {
  let out = "";
  let m: RegExpExecArray | null;
  RX.lastIndex = 0;
  while ((m = RX.exec(code))) {
    const [, com, str, num, ident, op, ws] = m;
    if (ws) {
      out += ws;
    } else if (com) {
      out += `<span class="tk-com">${esc(com)}</span>`;
    } else if (str) {
      out += `<span class="tk-str">${esc(str)}</span>`;
    } else if (num) {
      out += `<span class="tk-num">${esc(num)}</span>`;
    } else if (ident) {
      const cls = KEYWORDS.has(ident)
        ? "tk-kw"
        : /^[A-Z]/.test(ident)
          ? "tk-cap"
          : code[RX.lastIndex] === "("
            ? "tk-fn"
            : "";
      out += cls ? `<span class="${cls}">${esc(ident)}</span>` : esc(ident);
    } else if (op) {
      out += `<span class="tk-op">${esc(op)}</span>`;
    }
  }
  return out;
}
