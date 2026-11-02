// Facts row (plan, just under the hero): one thin row of three facts
// separated by hairlines. The third was cleared by Ted on Nov 2, 2026, with
// Kevin's wording and a link to the event page. Change it to past tense after
// the Summit (PR 8).

const SUMMIT_URL = "https://luma.com/qgst3fc7";

export default function FactsRow() {
  return (
    <section aria-label="FNDRYx at a glance" className="bg-steel-900">
      <ul className="mx-auto grid max-w-content divide-y divide-steel-800 border-y border-steel-800 px-4 md:grid-cols-3 md:divide-x md:divide-y-0 md:px-6">
        <li className="py-5 font-body text-base text-steel-200 md:pr-6">
          About 40 founders through our first version
        </li>
        <li className="py-5 font-body text-base text-steel-200 md:px-6">
          v2 rebuilt under a written measurement standard
        </li>
        <li className="py-5 font-body text-base text-steel-200 md:pl-6">
          <a
            href={SUMMIT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link underline decoration-steel-600 hover:decoration-fire-400"
          >
            Live now with the Midwest House Grand Rapids Summit
            <span className="sr-only"> (opens the event page in a new tab)</span>
          </a>
        </li>
      </ul>
    </section>
  );
}
