import Link from "next/link";
import Logo from "./Logo";
import NavMenu from "./NavMenu";

// Server component: a solid background instead of a scroll listener. The only
// client code is NavMenu, which closes the phone menu after a tap.
//
// The plan's full nav is: How it works, Grand Rapids, Who it's for, Team,
// Journal. Links are added here only when their section exists on the
// homepage: Grand Rapids waits on Ted's OK (PR 5), Who it's for and Team ship
// in PR 6.
const NAV_LINKS = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/blog", label: "Journal" },
];

const linkClass =
  "font-body font-medium text-sm text-steel-300 transition-colors hover:text-steel-100 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fire-400";

function Chevron() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className="group-open:rotate-180"
    >
      <path
        d="M2.5 4.5 6 8l3.5-3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-steel-800 bg-steel-900">
      <div className="mx-auto flex h-16 max-w-content items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          aria-label="FNDRYx home"
          className="inline-flex items-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fire-400"
        >
          <Logo size="sm" variant="dark" />
        </Link>

        {/* Tablet and desktop */}
        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className={linkClass}>
              {l.label}
            </Link>
          ))}
          <Link href="/#join" className="btn-primary px-4 py-2.5 text-sm">
            Join the founder list
          </Link>
        </nav>

        {/* Phones: short button plus a menu (works without JavaScript; closes on tap with it) */}
        <div className="flex items-center gap-2 md:hidden">
          <Link href="/#join" className="btn-primary px-4 py-2 text-sm">
            Join
          </Link>
          <NavMenu>
            <summary className="flex cursor-pointer list-none items-center gap-1.5 rounded-sm px-2 py-2 font-body text-sm font-medium text-steel-300 hover:text-steel-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fire-400 [&::-webkit-details-marker]:hidden">
              Menu
              <Chevron />
            </summary>
            <nav
              aria-label="Main"
              className="absolute right-0 top-full mt-3 w-56 rounded-md border border-steel-700 bg-steel-900 py-2 shadow-lg shadow-black/40"
            >
              <ul>
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="block px-4 py-3 font-body text-base text-steel-200 hover:bg-steel-800 hover:text-steel-100 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-fire-400"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </NavMenu>
        </div>
      </div>
    </header>
  );
}
