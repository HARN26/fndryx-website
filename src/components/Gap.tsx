import Image from "next/image";

// The gap (plan section 2, deck slide 4): two large numbers on the left, the
// map on the right. One accent: the 9% venture-deal share.

const LEGEND = [
  { label: "Midwest, 12 states", swatch: "bg-[#F97316]" },
  { label: "16 more states in the group of 28", swatch: "bg-[#64748B]" },
  { label: "Rest of the US", swatch: "bg-[#1E293B] ring-1 ring-inset ring-steel-600" },
];

export default function Gap() {
  return (
    <section
      id="the-gap"
      aria-labelledby="gap-heading"
      className="bg-steel-900 py-20 md:py-28"
    >
      <div className="mx-auto max-w-content px-4 md:px-6">
        <p className="section-label">The gap</p>
        <h2
          id="gap-heading"
          className="mt-4 max-w-3xl font-display text-h2 font-bold text-steel-100"
        >
          The Midwest builds companies. Capital doesn&apos;t follow.
        </h2>

        <div className="mt-12 grid gap-12 md:mt-16 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="lg:col-span-5">
            <dl className="grid grid-cols-2 divide-x divide-steel-700">
              <div className="pr-6">
                <dt className="sr-only">Midwest share of US high-propensity business applications</dt>
                <dd className="font-display text-[clamp(3.5rem,8vw,5.5rem)] font-bold leading-none text-steel-100">
                  16%
                </dd>
                <dd className="mt-3 font-body text-base text-steel-300">
                  of US high-propensity business applications
                </dd>
              </div>
              <div className="pl-6">
                <dt className="sr-only">Midwest share of US venture deals</dt>
                <dd className="font-display text-[clamp(3.5rem,8vw,5.5rem)] font-bold leading-none text-fire-400">
                  9%
                </dd>
                <dd className="mt-3 font-body text-base text-steel-300">
                  of US venture deals
                </dd>
              </div>
            </dl>
            <p className="mt-10 border-t border-steel-800 pt-6 font-body text-body text-steel-200">
              Across 28 Midwest and Southern states, it&apos;s 60% of
              applications and 32% of venture deals.
            </p>
          </div>

          <figure className="lg:col-span-7">
            <Image
              src="/images/home/us-map-midwest.svg"
              alt="Map of the lower 48 US states. The 12 Midwest states are orange, 16 more Midwest and Southern states are slate, and the rest of the US is dark."
              width={920}
              height={580}
              sizes="(min-width: 1024px) 680px, 100vw"
              className="h-auto w-full"
            />
            <figcaption>
              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3 font-body text-sm text-steel-300">
                {LEGEND.map((l) => (
                  <li key={l.label} className="inline-flex items-center gap-2">
                    <span aria-hidden="true" className={`h-3 w-3 rounded-[2px] ${l.swatch}`} />
                    {l.label}
                  </li>
                ))}
              </ul>
            </figcaption>
          </figure>
        </div>

        <p className="mt-14 max-w-4xl font-body text-footnote text-steel-400">
          Sources: US Census Bureau, Business Formation Statistics
          (high-propensity business applications); NVCA 2026 Yearbook,
          PitchBook data (venture deals). Both 2025. Applications and deals are
          different measures, so the comparison is directional. Midwest: IL,
          IN, IA, KS, MI, MN, MO, NE, ND, OH, SD, WI. The 28 states add CO, PA,
          TX, OK, AR, LA, MS, AL, TN, KY, GA, FL, SC, NC, VA, WV.
        </p>
      </div>
    </section>
  );
}
