import Image from "next/image";
import Link from "next/link";
import Logo from "./Logo";

// Footer links per the plan: How it works, Grand Rapids, Team, Journal,
// Privacy Policy, LinkedIn.
const LINKS = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#grand-rapids", label: "Grand Rapids" },
  { href: "/#team", label: "Team" },
  { href: "/blog", label: "Journal" },
  { href: "/privacy", label: "Privacy Policy" },
];

const LINKEDIN_URL = "https://www.linkedin.com/company/109594033";

const linkClass =
  "inline-flex items-center gap-2 font-body text-sm text-steel-300 transition-colors hover:text-steel-100 hover:underline underline-offset-4 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fire-400";

function LinkedinMark() {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.852 3.37-1.852 3.601 0 4.267 2.37 4.267 5.455v6.288zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.064 2.063 2.063 0 1 1 2.063 2.064zm1.778 13.019H3.555V9h3.56v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-steel-800 bg-steel-950">
      <div className="mx-auto grid max-w-content gap-10 px-4 py-14 md:grid-cols-12 md:px-6 md:py-16">
        <div className="md:col-span-6">
          <Link
            href="/"
            aria-label="FNDRYx home"
            className="inline-flex rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fire-400"
          >
            <Logo size="md" variant="dark" />
          </Link>
          <p className="mt-4 max-w-sm font-body text-base text-steel-300">
            The readiness record for early-stage capital.
          </p>
          {/* Partner mark: one-color gray, small (cleared by Kevin, Nov 2, 2026) */}
          <div className="mt-8 flex items-center gap-3">
            <span className="font-body text-xs font-bold uppercase tracking-[0.16em] text-steel-400">
              Partner
            </span>
            <Image
              src="/images/home/midwest-house-logo-gray.png"
              alt="Midwest House"
              width={480}
              height={221}
              sizes="80px"
              className="h-7 w-auto"
            />
          </div>
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <ul className="space-y-3">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                <LinkedinMark />
                LinkedIn
              </a>
            </li>
          </ul>
        </nav>

        <ul className="space-y-3 md:col-span-3">
          <li>
            <a href="mailto:kevin@fndryx.io" className={linkClass}>
              kevin@fndryx.io
            </a>
          </li>
          <li>
            <a href="mailto:privacy@fndryx.io" className={linkClass}>
              privacy@fndryx.io
            </a>
          </li>
        </ul>
      </div>

      <div className="border-t border-steel-800">
        <p className="mx-auto max-w-content px-4 py-6 font-body text-footnote text-steel-400 md:px-6">
          FNDRYx is not a broker-dealer or investment adviser. © 2026 FNDRYx,
          Inc. 727 Madison Ave, Suite 45, Covington, KY 41011.
        </p>
      </div>
    </footer>
  );
}
