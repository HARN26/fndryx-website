// How it works (plan section 4): three open columns joined by a thin line,
// then the record strip (G2) running the full width. The page's signature
// visual, as in the deck.

const STEPS = [
  {
    title: "Assess",
    body: "A structured readiness assessment covering financial reality, team execution, market validation, business model and funding strategy.",
  },
  {
    title: "Report",
    body: "A founder report built from your own answers, reviewed by our team before it reaches you.",
  },
  {
    title: "Check in",
    body: "With your consent, a short check-in every 21 days. You can stop at any time.",
  },
];

// G2: 17 bars, one per 21-day check-in across a year. Height grows from 38%
// to 100%; color runs from steel-700 (#334155) to fire-400 (#F97316), eased
// by t^0.8.
const BAR_COUNT = 17;
const FROM = [0x33, 0x41, 0x55];
const TO = [0xf9, 0x73, 0x16];

const BARS = Array.from({ length: BAR_COUNT }, (_, i) => {
  const t = i / (BAR_COUNT - 1);
  const e = Math.pow(t, 0.8);
  const [r, g, b] = FROM.map((c, k) => Math.round(c + (TO[k] - c) * e));
  return {
    height: `${(38 + 62 * t).toFixed(1)}%`,
    color: `rgb(${r}, ${g}, ${b})`,
  };
});

function RecordStrip() {
  return (
    <figure className="mt-16 md:mt-20">
      <div
        role="img"
        aria-label="Illustration: a record growing across a year of 21-day check-ins"
        className="flex h-24 items-end gap-1.5 sm:h-32 md:h-40 md:gap-3"
      >
        {BARS.map((bar, i) => (
          <span
            key={i}
            className="flex-1 rounded-[3px]"
            style={{ height: bar.height, backgroundColor: bar.color }}
          />
        ))}
      </div>
      <figcaption className="mt-3 flex items-start justify-between gap-4 font-body text-sm text-steel-400">
        <span>First assessment</span>
        <span className="text-right">One year of 21-day check-ins</span>
      </figcaption>
      <p className="mt-2 text-right font-body text-footnote text-steel-400">
        Illustration
      </p>
    </figure>
  );
}

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-heading"
      className="bg-steel-900 py-20 md:py-28"
    >
      <div className="mx-auto max-w-content px-4 md:px-6">
        <p className="section-label">How it works</p>
        <h2
          id="how-heading"
          className="mt-4 max-w-3xl font-display text-h2 font-bold text-steel-100"
        >
          Three steps, then a record.
        </h2>

        <ol className="relative mt-12 grid gap-10 md:mt-16 md:grid-cols-3 md:gap-8">
          {/* The thin line joining the three steps (tablet and up) */}
          <span
            aria-hidden="true"
            className="absolute left-0 right-0 top-4 hidden h-px bg-steel-700 md:block"
          />
          {STEPS.map((step, i) => (
            <li key={step.title} className="relative">
              <span
                aria-hidden="true"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-fire-400 bg-steel-900 font-body text-sm font-bold text-fire-400"
              >
                {i + 1}
              </span>
              <h3 className="mt-6 font-display text-h3 font-bold text-steel-100">
                <span className="sr-only">{`Step ${i + 1}: `}</span>
                {step.title}
              </h3>
              <p className="mt-3 max-w-sm font-body text-body text-steel-300">
                {step.body}
              </p>
            </li>
          ))}
        </ol>

        <RecordStrip />
      </div>
    </section>
  );
}
