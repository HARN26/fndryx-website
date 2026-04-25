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
              Request access to{" "}
              <span className="text-fire-400">Founder Forge</span> — FNDRYx&apos;s
              dual-track assessment that builds your capital-readiness profile
              across the five dimensions that drive capital decisions.{" "}
              <span className="text-fire-400">No warm intro required.</span> Your
              profile compounds every time you update it, and qualified founders
              are routed directly to aligned capital sources via{" "}
              <span className="text-fire-400">systematic matching</span>.
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
              Join the{" "}
              <span className="text-fire-400">FNDRYx capital ecosystem</span> and
              access pre-qualified deal flow from founders with compounding
              readiness profiles. As a capital member, you receive structured
              founder data, systematic matching to aligned opportunities, and the
              ability to refer founders directly into the Founder Forge assessment
              — delivering <span className="text-fire-400">better signal</span>{" "}
              with less noise.
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
