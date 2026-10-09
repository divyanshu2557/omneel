/** Page-wide ambient field: ivory paper, ink grid, warm light wells, sweep, grain. */
export function Ambient() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-ivory-100" />

      {/* warm + cool wells, kept low so the page stays paper-like */}
      <div
        className="anim-breathe absolute inset-0"
        style={{
          background:
            "radial-gradient(1000px 620px at 8% -8%, rgba(31,60,224,0.10), transparent 62%)," +
            "radial-gradient(820px 540px at 96% 4%, rgba(224,162,27,0.13), transparent 60%)," +
            "radial-gradient(900px 640px at 62% 104%, rgba(15,107,79,0.09), transparent 62%)",
        }}
      />

      {/* drifting ink grid */}
      <div className="grid-field absolute inset-0 mask-radial" />

      {/* column rules */}
      <div className="absolute inset-0 hidden lg:block">
        {[16.66, 33.33, 50, 66.66, 83.33].map((l) => (
          <div
            key={l}
            className="absolute top-0 bottom-0 w-px bg-soot-950/[0.05]"
            style={{ left: `${l}%` }}
          />
        ))}
      </div>

      {/* slow sweep */}
      <div className="anim-sweep absolute inset-x-0 top-0 h-[46vh]">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-soot-900/25 to-transparent" />
        <div className="h-28 w-full bg-gradient-to-b from-soot-900/[0.035] to-transparent" />
      </div>

      {/* paper grain */}
      <div className="noise-layer absolute inset-0" />
      <div
        className="absolute inset-0"
        style={{ boxShadow: "inset 0 0 240px 40px rgba(80,70,50,0.14)" }}
      />
    </div>
  );
}
