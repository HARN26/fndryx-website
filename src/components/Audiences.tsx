export default function Audiences() {
  return (
    <section id="audiences" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <article className="relative flex min-h-[500px] flex-col overflow-hidden rounded-2xl border border-steel-700 bg-steel-800 p-10 transition-all duration-300 hover:-translate-y-0.5 hover:border-fire-400">
            <h3 className="mb-6 font-display font-extrabold text-3xl md:text-4xl">
              <span className="text-steel-100">For</span>{" "}
              <span className="text-fire-400">Founders</span>
            </h3>
            <p className="flex-1 text-base leading-relaxed text-steel-300">
              Take the{" "}
              <span className="text-fire-400">Capital Readiness Assessment</span>{" "}
              — twenty-six questions across five dimensions, producing two
              scores:{" "}
              <span className="text-fire-400">Building Readiness</span> (what
              you&apos;ve built) and{" "}
              <span className="text-fire-400">Investor Readiness</span> (how you
              tell it). The gap between them is its own signal.{" "}
              <span className="text-fire-400">No warm intro required.</span> A
              14-day pulse keeps your readiness current; when your score crosses
              the <span className="text-fire-400">matching threshold</span>, you
              surface to capital providers whose stated thesis fits.
            </p>
            <div
              aria-hidden
              className="pointer-events-none mt-8 select-none text-center"
            >
              <span className="pointer-events-auto inline-block font-display font-extrabold text-6xl leading-none text-steel-700 transition-all duration-300 ease-in-out [paint-order:stroke] [-webkit-text-stroke-color:#f97316] [-webkit-text-stroke-width:0] hover:text-steel-800 hover:[-webkit-text-stroke-width:2px]">
                FNDRY
              </span>
            </div>
          </article>

          <article className="relative flex min-h-[500px] flex-col overflow-hidden rounded-2xl border border-steel-700 bg-steel-800 p-10 transition-all duration-300 hover:-translate-y-0.5 hover:border-fire-400">
            <h3 className="mb-6 font-display font-extrabold text-3xl md:text-4xl">
              <span className="text-steel-100">For</span>{" "}
              <span className="text-fire-400">Capital Providers</span>
            </h3>
            <p className="flex-1 text-base leading-relaxed text-steel-300">
              Get{" "}
              <span className="text-fire-400">scored deal flow</span> filtered
              against your stated thesis — not curated lists, not warm intros,
              not pattern-matching. Each match shows its full{" "}
              <span className="text-fire-400">six-criterion breakdown</span>{" "}
              (stage fit, industry, geography, business model, revenue model,
              check size) with{" "}
              <span className="text-fire-400">deterministic scoring</span>.
              Refer founders directly into the{" "}
              <span className="text-fire-400">Capital Readiness Assessment</span>;
              those whose scores cross the threshold against your thesis surface
              in your feed. Structured signal,{" "}
              <span className="text-fire-400">no black box</span>.
            </p>
            <div
              aria-hidden
              className="pointer-events-none mt-8 select-none text-center"
            >
              <span className="pointer-events-auto inline-block font-serif italic text-7xl leading-none text-steel-700 transition-all duration-300 ease-in-out [paint-order:stroke] [-webkit-text-stroke-color:#f97316] [-webkit-text-stroke-width:0] hover:text-steel-800 hover:[-webkit-text-stroke-width:2px]">
                x
              </span>
            </div>
          </article>
        </div>

        <div className="mt-16 text-center">
          <a
            href="#founder-forge"
            className="font-display font-semibold text-xs uppercase tracking-[0.2em] text-fire-400 hover:text-fire-300 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fire-400 focus-visible:ring-offset-2 focus-visible:ring-offset-steel-900"
          >
            Request Access ↓
          </a>
        </div>
      </div>
    </section>
  );
}
