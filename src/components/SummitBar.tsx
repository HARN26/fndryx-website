import Image from "next/image";
import Link from "next/link";

// Slim bar above the nav (plan section 0). Cleared by Ted on Nov 2, 2026.
// The stacked Midwest House logo sits beside the sentence at a readable size
// (Kevin, Nov 2, 2026), standing in for the words "Midwest House" so the name
// doesn't repeat. The link's aria-label keeps the full sentence for screen
// readers. Remove after the Summit (PR 8).
const SENTENCE =
  "Now powering founder assessments for the Midwest House Summit Founder Track. Grand Rapids, Dec 2–3.";

export default function SummitBar() {
  return (
    <div className="border-b border-steel-800 bg-steel-950">
      <Link
        href="/#grand-rapids"
        aria-label={SENTENCE}
        className="group mx-auto flex max-w-content items-center justify-center gap-3 px-4 py-2 font-body text-[13px] text-steel-200 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-fire-400 sm:gap-4 sm:text-sm md:px-6"
      >
        <Image
          src="/images/home/midwest-house-logo-gray.png"
          alt=""
          width={480}
          height={221}
          sizes="72px"
          className="h-7 w-auto shrink-0 sm:h-8"
        />
        <span aria-hidden="true" className="h-6 w-px shrink-0 bg-steel-700" />
        <span className="group-hover:text-steel-100 group-hover:underline underline-offset-4">
          Now powering founder assessments for the Summit Founder Track. Grand
          Rapids, Dec 2–3.
        </span>
      </Link>
    </div>
  );
}
