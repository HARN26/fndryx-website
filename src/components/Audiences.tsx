import Link from "next/link";

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

// Same outline mechanic as fireOutlineClass, but the fill stays at steel-700
// — only the stroke transitions in, in steel-300, layered on top via
// paint-order:stroke. Result: filled letter with a bright grey outline at hover.
const greyOutlineKeepFillClass =
  "inline-block leading-none text-steel-700 transition-all duration-300 ease-in-out [paint-order:stroke] [-webkit-text-stroke-color:#cbd5e1] [-webkit-text-stroke-width:0] group-hover:[-webkit-text-stroke-width:2px]";

export default function Audiences() {
  return (
    <section id="audiences" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
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
              <span className="text-fire-400">Building Readiness</span> (what
              you&apos;ve built) and{" "}
              <span className="text-fire-400">Investor Readiness</span> (how you
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

          {/* Capital Providers */}
          <article className={cardClass}>
            <h3 className={titleClass}>
              <span className="text-steel-100">For</span>{" "}
              <span className="text-fire-400">Capital Providers</span>
            </h3>
            <p className={bodyClass}>
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
            <div aria-hidden className={decoWrapperClass}>
              <span
                className={`${fireOutlineClass} font-serif italic text-9xl`}
              >
                x
              </span>
            </div>
          </article>

          {/* Accelerators */}
          <article className={cardClass}>
            <h3 className={titleClass}>
              <span className="text-steel-100">For</span>{" "}
              <span className="text-fire-400">Accelerators</span>
            </h3>
            <p className={bodyClass}>
              Run{" "}
              <span className="text-fire-400">cohort-level impact measurement</span>{" "}
              that holds up to{" "}
              <span className="text-fire-400">LP scrutiny</span>. Pre/post
              assessment with normalized delta scoring, quadrant change
              distributions across your cohort, and a defensible numerical
              answer to &ldquo;what did the program do.&rdquo;{" "}
              <span className="text-fire-400">Multi-organization tenancy</span>{" "}
              with full data isolation between accelerators on the same
              platform.
            </p>
            <Link
              href="/accelerators"
              className="mt-6 self-start font-display font-semibold text-xs uppercase tracking-[0.2em] text-fire-400 hover:text-fire-300 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fire-400 focus-visible:ring-offset-2 focus-visible:ring-offset-steel-800"
            >
              Learn more →
            </Link>
            <div aria-hidden className={decoWrapperClass}>
              <span className="inline-flex items-baseline justify-center">
                <span
                  className={`${greyOutlineKeepFillClass} font-display font-semibold text-[7rem] tracking-[-0.02em]`}
                >
                  A
                </span>
                <span
                  className={`${fireOutlineClass} font-serif italic text-[7rem] -ml-[0.05em] relative top-[0.05em]`}
                >
                  x
                </span>
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
