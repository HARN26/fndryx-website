const cardClass =
  "group relative flex min-h-[500px] flex-col overflow-hidden rounded-2xl border border-steel-700 bg-steel-800 p-10 transition-all duration-300 hover:-translate-y-0.5 hover:border-fire-400";

const titleClass = "mb-6 font-display font-extrabold text-3xl";

const bodyClass = "text-base leading-relaxed text-steel-300";

const decoWrapperClass =
  "pointer-events-none mt-auto select-none text-center";

// Resting fill is steel-700 (visible against steel-800). On card hover, the
// stroke transitions in via `group-hover` while the fill flips to steel-800
// (matching the card bg) — yielding the familiar hollow orange-outlined glyph.
const fireOutlineClass =
  "inline-block leading-none text-steel-700 transition-all duration-300 ease-in-out [paint-order:stroke] [-webkit-text-stroke-color:#f97316] [-webkit-text-stroke-width:0] group-hover:text-steel-800 group-hover:[-webkit-text-stroke-width:2px]";

export default function Audiences() {
  return (
    <section id="audiences" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-lg">
          {/* Founders */}
          <article className={cardClass}>
            <h3 className={titleClass}>
              <span className="text-steel-100">For</span>{" "}
              <span className="text-fire-400">Founders</span>
            </h3>
            <p className={bodyClass}>
              Take the{" "}
              <span className="text-fire-400">Capital Readiness Assessment</span>{" "}
              — twenty-six questions across five dimensions, producing two
              scores:{" "}
              <span className="text-fire-400">Business Readiness</span> (what
              you&apos;ve built) and{" "}
              <span className="text-fire-400">Investment Readiness</span> (how you
              tell it). The gap between them is its own signal.{" "}
              <span className="text-fire-400">No warm intro required.</span> A
              14-day pulse keeps your readiness current; when your score crosses
              the <span className="text-fire-400">matching threshold</span>, you
              surface to capital providers whose stated thesis fits.
            </p>
            <div aria-hidden className={decoWrapperClass}>
              <span
                className={`${fireOutlineClass} font-display font-extrabold text-5xl`}
              >
                FNDRY
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
