import SignalTimeline from "./SignalTimeline";

// The problem (plan section 3): text, then the full-width signal timeline
// (G1), on the second background color.
export default function Problem() {
  return (
    <section
      id="problem"
      aria-labelledby="problem-heading"
      className="bg-steel-950 py-20 md:py-28"
    >
      <div className="mx-auto max-w-content px-4 md:px-6">
        <p className="section-label">The problem</p>
        <h2
          id="problem-heading"
          className="mt-4 max-w-3xl font-display text-h2 font-bold text-steel-100"
        >
          Early-stage capital decides on a record that doesn&apos;t exist.
        </h2>
        <p className="mt-6 max-w-2xl font-body text-body text-steel-300">
          Data providers see companies after they emit signal: a round, a
          filing, a hire. A pre-seed founder emits almost none. Investors fall
          back on networks, and founders outside them fall through.
        </p>
        <div className="mt-12 md:mt-16">
          <SignalTimeline />
        </div>
      </div>
    </section>
  );
}
