import Image from "next/image";

// One fact under the hero (Kevin, Nov 2, 2026): the Grand Rapids line with the
// stacked gray Midwest House logo beside it. The first two facts ("About 40
// founders..." and "v2 rebuilt...") were removed. Ted cleared the line on
// Nov 2, 2026. Change it to past tense after the Summit (PR 8).

const SUMMIT_URL = "https://luma.com/qgst3fc7";

export default function FactsRow() {
  return (
    <section aria-label="Live now" className="bg-steel-900">
      <div className="mx-auto max-w-content px-4 md:px-6">
        <div className="flex items-center gap-4 border-y border-steel-800 py-5">
          <Image
            src="/images/home/midwest-house-logo-gray.png"
            alt=""
            width={480}
            height={221}
            sizes="80px"
            className="h-8 w-auto shrink-0"
          />
          <span aria-hidden="true" className="h-6 w-px shrink-0 bg-steel-700" />
          <a
            href={SUMMIT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link font-body text-base text-steel-200 underline decoration-steel-600 hover:decoration-fire-400"
          >
            Live now with the Midwest House Grand Rapids Summit
            <span className="sr-only"> (opens the event page in a new tab)</span>
          </a>
        </div>
      </div>
    </section>
  );
}
