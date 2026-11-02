type Step = {
  title: string;
  body: string;
};

const steps: Step[] = [
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

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-4 font-display text-xs uppercase tracking-[0.2em] text-fire-400">
          How It Works
        </p>

        <h2 className="mb-16 max-w-4xl font-display font-extrabold text-4xl md:text-5xl leading-tight text-steel-100">
          How It Works
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <article
              key={step.title}
              className="relative flex flex-col rounded-2xl border border-steel-700 bg-steel-800 p-8 transition-all duration-300 hover:-translate-y-0.5 hover:border-fire-400"
            >
              <h3 className="mb-3 font-display font-bold text-xl text-fire-400">
                {step.title}
              </h3>
              <p className="text-base leading-relaxed text-steel-300">
                {step.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
