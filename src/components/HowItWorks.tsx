import type { ReactNode } from "react";

type Step = {
  number: string;
  title: string;
  body: ReactNode;
  badge: string;
};

const steps: Step[] = [
  {
    number: "01",
    title: "Assess",
    body: (
      <>
        Founders complete a free dual-track assessment measuring Business Readiness
        and Investment Readiness across five dimensions.
      </>
    ),
    badge: "~15 Minutes",
  },
  {
    number: "02",
    title: "Profile",
    body: (
      <>
        Your responses build a{" "}
        <span className="text-fire-400">capital-readiness profile</span> across five
        dimensions — a record that compounds every time you update it.
      </>
    ),
    badge: "Instant Results",
  },
  {
    number: "03",
    title: "Route",
    body: (
      <>
        Qualified founders are connected to{" "}
        <span className="text-fire-400">aligned capital sources</span> through
        systematic matching infrastructure.
      </>
    ),
    badge: "Systematic Routing",
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
              key={step.number}
              className="relative flex min-h-[280px] flex-col rounded-2xl border border-steel-700 bg-steel-800 p-8 transition-all duration-300 hover:-translate-y-0.5 hover:border-fire-400"
            >
              <div className="mb-6 font-display font-extrabold text-7xl leading-none text-steel-700">
                {step.number}
              </div>
              <h3 className="mb-3 font-display font-bold text-xl text-fire-400">
                {step.title}
              </h3>
              <p className="mb-6 text-base leading-relaxed text-steel-300">
                {step.body}
              </p>
              <div className="mt-auto">
                <span className="inline-block rounded-md bg-fire-500/10 px-3 py-1.5 font-display font-semibold text-xs uppercase tracking-wider text-fire-400">
                  {step.badge}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
