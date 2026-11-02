import Link from "next/link";

// Slim bar above the nav (plan section 0). Cleared by Ted on Nov 2, 2026.
// Remove after the Summit (PR 8).
export default function SummitBar() {
  return (
    <div className="border-b border-steel-800 bg-steel-950">
      <p className="mx-auto max-w-content px-4 py-2 text-center font-body text-sm text-steel-200 md:px-6">
        <Link
          href="/#grand-rapids"
          className="rounded-sm hover:text-steel-100 hover:underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fire-400"
        >
          Now powering founder assessments for the Midwest House Summit Founder
          Track. Grand Rapids, Dec 2–3.
        </Link>
      </p>
    </div>
  );
}
