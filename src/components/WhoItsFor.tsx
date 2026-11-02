// Who it's for (plan section 7): three open columns split by hairlines, no
// cards. The two data-promise sentences were cleared by counsel (Jake) on
// Nov 2, 2026.
//
// The program and capital links reload the page with ?role= so the join form
// opens on the right role (works without JavaScript).

const AUDIENCES = [
  {
    title: "Founders",
    body: "Your own report and, with consent, a record you build over time. Founders never pay for their own assessment.",
    link: { href: "#join", label: "Join the founder list" },
  },
  {
    title: "Programs and regions",
    body: "Accelerators, universities, event organizers and economic development groups. Get a combined view of founders in your ecosystem, never reported in groups smaller than five.",
    link: { href: "?role=operator#join", label: "Talk to us" },
  },
  {
    title: "Capital partners",
    body: "A clearer view of early-stage founders in the middle of the country. Today, investors see aggregates only, in groups of five or more.",
    link: { href: "?role=capital_provider#join", label: "Stay in touch" },
  },
];

export default function WhoItsFor() {
  return (
    <section
      id="who-its-for"
      aria-labelledby="who-heading"
      className="bg-steel-950 py-20 md:py-28"
    >
      <div className="mx-auto max-w-content px-4 md:px-6">
        <p className="section-label">Who it&apos;s for</p>
        <h2
          id="who-heading"
          className="mt-4 max-w-3xl font-display text-h2 font-bold text-steel-100"
        >
          One record, three audiences.
        </h2>

        <ul className="mt-12 grid divide-y divide-steel-800 border-t border-steel-800 md:mt-16 md:grid-cols-3 md:divide-x md:divide-y-0 md:border-t-0">
          {AUDIENCES.map((a) => (
            <li
              key={a.title}
              className="flex flex-col py-8 md:px-8 md:py-2 md:first:pl-0 md:last:pr-0"
            >
              <h3 className="font-display text-h3 font-bold text-steel-100">
                {a.title}
              </h3>
              <p className="mt-3 font-body text-body text-steel-300">{a.body}</p>
              <a
                href={a.link.href}
                className="text-link mt-6 self-start font-body text-base font-medium underline decoration-steel-600 hover:decoration-fire-400"
              >
                {a.link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
