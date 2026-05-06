export default function AntiClaim() {
  return (
    <section
      id="anti-claim"
      aria-labelledby="anti-claim-heading"
      className="bg-steel-900 py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-4 font-display text-xs uppercase tracking-[0.2em] text-fire-400">
          What FNDRYx Is Not
        </p>

        <h2
          id="anti-claim-heading"
          className="mb-12 max-w-4xl font-display font-extrabold text-3xl md:text-5xl leading-tight text-steel-100"
        >
          FNDRYx is{" "}
          <span className="font-serif italic text-fire-400">
            not a placement service
          </span>
          .
        </h2>

        <p className="max-w-3xl text-lg leading-relaxed text-steel-200">
          FNDRYx does not guarantee meetings, introductions, or capital. It is{" "}
          <span className="text-fire-400">measurement infrastructure</span>{" "}
          that gives you a defensible readout of where you stand and what
          closes the gap. The{" "}
          <span className="text-fire-400">Capital Readiness Assessment</span>{" "}
          scores your readiness across{" "}
          <span className="text-fire-400">five dimensions of capital readiness</span>
          ; a 14-day pulse keeps that score current. When you cross the{" "}
          <span className="text-fire-400">matching threshold</span>, you surface
          to capital providers whose stated thesis fits — but the introduction
          is theirs to make, not ours to promise. And the assessment is{" "}
          <span className="text-fire-400">free for founders</span> — structural
          to how the exchange works, not a promotion.
        </p>
      </div>
    </section>
  );
}
