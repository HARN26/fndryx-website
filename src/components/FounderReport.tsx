import Image from "next/image";

// What you get (plan section 5, deck slide 6): the two report images overlap
// on the left, three numbered notes on the right. The report images are a
// synthetic sample, never a real founder, and the tag saying so stays visible
// at every screen size.

const NOTES = [
  {
    title: "Plain about what it is",
    body: "No scores shown, no ranking, no prediction claims.",
  },
  {
    title: "What to work on next",
    body: "Up to three priorities, picked by a fixed rule from your own answers.",
  },
  {
    title: "Why it applies",
    body: "Concrete steps, each tied to a specific answer you gave.",
  },
];

export default function FounderReport() {
  return (
    <section
      id="founder-report"
      aria-labelledby="report-heading"
      className="bg-steel-950 py-20 md:py-28"
    >
      <div className="mx-auto max-w-content px-4 md:px-6">
        <p className="section-label">The founder report</p>
        <h2
          id="report-heading"
          className="mt-4 max-w-3xl font-display text-h2 font-bold text-steel-100"
        >
          Plain about what it is. Useful about what&apos;s next.
        </h2>

        <div className="mt-12 grid gap-14 md:mt-16 lg:grid-cols-12 lg:items-center lg:gap-10">
          <figure className="lg:col-span-7">
            <div className="relative pb-[34%] pr-[14%]">
              <Image
                src="/images/home/report-sample-read-this-first.png"
                alt="Synthetic sample of a FNDRYx founder report, labeled 'Synthetic sample, not a real founder'. The 'Read this first' box says the report describes the founder's own answers, does not predict fundraising or business outcomes, does not rank founders and does not show scores."
                width={2040}
                height={1560}
                sizes="(min-width: 1024px) 560px, 86vw"
                className="h-auto w-full"
              />
              <Image
                src="/images/home/report-sample-priorities.png"
                alt="Synthetic sample of the report's 'Development priorities' section: up to three practices chosen from the founder's own answers by a fixed rule, starting with 'Testing your price with real customers', the answer it is based on, and concrete steps."
                width={2040}
                height={1440}
                sizes="(min-width: 1024px) 500px, 76vw"
                className="absolute bottom-0 right-0 h-auto w-[78%]"
              />
              <p className="absolute -top-3 left-3 rounded-[4px] bg-fire-400 px-2.5 py-1 font-body text-label font-bold uppercase tracking-[0.12em] text-steel-900 sm:left-6">
                Synthetic example, not a real founder
              </p>
            </div>
          </figure>

          <ol className="space-y-8 lg:col-span-5">
            {NOTES.map((note, i) => (
              <li key={note.title} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-fire-400 font-body text-sm font-bold text-fire-400"
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-display text-h3 font-bold text-steel-100">
                    {note.title}
                  </h3>
                  <p className="mt-2 font-body text-body text-steel-300">
                    {note.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
