import { useEffect, useState } from "react";
import { Mark, IconArrowUpRight, IconMenu, IconClose } from "./Icons";
import { useScrollProgress } from "../lib/hooks";

const LINKS = [
  { href: "#architecture", label: "Architecture" },
  { href: "#language", label: "Language" },
  { href: "#os", label: "Omneel OS" },
  { href: "#agents", label: "Agent Mesh" },
  { href: "#roadmap", label: "Roadmap" },
];

export default function Nav() {
  const { progress, scrollY } = useScrollProgress();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const ids = LINKS.map((l) => l.href.slice(1));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const solid = scrollY > 40;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-all duration-500 ${
          solid
            ? "border-b border-soot-950/12 bg-ivory-100/88 shadow-[0_10px_40px_-32px_rgba(8,9,10,.9)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-[68px] max-w-[1360px] items-center gap-6 px-5 sm:px-8">
          <a href="#top" className="group flex items-center gap-3 text-soot-900">
            <span className="transition-transform duration-700 group-hover:rotate-[135deg]">
              <Mark size={30} />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-[19px] tracking-[-0.02em] text-soot-950">
                OMNEEL
              </span>
              <span className="label-sm mt-[3px] text-soot-400 transition-colors group-hover:text-cobalt-500">
                TECH
              </span>
            </span>
          </a>

          <div className="ml-auto hidden items-center gap-1 lg:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`relative px-3.5 py-2 text-[13.5px] transition-colors duration-300 ${
                  active === l.href.slice(1) ? "text-soot-950" : "text-soot-500 hover:text-soot-900"
                }`}
              >
                {l.label}
                <span
                  className={`absolute inset-x-3 -bottom-px h-[1.5px] origin-left bg-cobalt-500 transition-transform duration-500 ${
                    active === l.href.slice(1) ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </a>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-3 lg:ml-0">
            <span className="hidden items-center gap-2 border border-soot-950/15 bg-ivory-50 px-3 py-1.5 xl:inline-flex">
              <span className="relative flex h-1.5 w-1.5">
                <span className="anim-ring absolute inline-flex h-full w-full rounded-full bg-pine-500" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-pine-500" />
              </span>
              <span className="label-sm text-soot-500">mesh nominal</span>
            </span>
            <a
              href="#access"
              className="btn-primary group hidden items-center gap-2 px-4 py-2.5 text-[13px] font-medium sm:inline-flex"
            >
              Request access
              <IconArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle navigation"
              className="inline-flex h-10 w-10 items-center justify-center border border-soot-950/20 text-soot-700 transition-colors hover:border-cobalt-500 hover:text-cobalt-500 lg:hidden"
            >
              {open ? <IconClose size={18} /> : <IconMenu size={18} />}
            </button>
          </div>
        </nav>

        <div className="relative h-[2px] w-full bg-soot-950/[0.07]">
          <div
            className="absolute left-0 top-0 h-[2px] bg-gradient-to-r from-cobalt-500 via-brass-400 to-vermilion-500"
            style={{ width: `${Math.max(progress * 100, 0.4)}%` }}
          />
        </div>
      </div>

      <div
        className={`overflow-hidden border-b border-soot-950/12 bg-ivory-50/97 backdrop-blur-xl transition-[max-height,opacity] duration-500 lg:hidden ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col px-5 py-3 sm:px-8">
          {LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex items-baseline gap-4 border-b border-soot-950/[0.08] py-3.5 last:border-0"
            >
              <span className="label-sm text-soot-400">0{i + 1}</span>
              <span className="font-display text-xl text-soot-950">{l.label}</span>
            </a>
          ))}
          <a
            href="#access"
            onClick={() => setOpen(false)}
            className="btn-primary mt-4 mb-2 px-4 py-3 text-center text-sm font-medium"
          >
            Request early access
          </a>
        </div>
      </div>
    </header>
  );
}
