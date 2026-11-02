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
          We don&apos;t guarantee meetings, introductions or capital. We
          don&apos;t rank founders or predict outcomes. We&apos;re not a
          broker-dealer or investment adviser, and we don&apos;t arrange
          investments. Founders never pay for their own assessment.
        </p>
      </div>
    </section>
  );
}
