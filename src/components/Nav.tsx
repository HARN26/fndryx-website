import Link from "next/link";
import Logo from "./Logo";
import NavMenu from "./NavMenu";

// Server component: a solid background instead of a scroll listener. The only
// client code is NavMenu, which closes the phone menu after a tap.
//
// Nav: How it works, Grand Rapids, Who it's for, Journal. Team is off the site
// until the advisors are added (Kevin, Nov 2, 2026); the Summit bar was removed
// the same day. Remove Grand Rapids after the Summit (PR 8). The inline nav
// starts at lg; below that, the Menu holds the links.
const NAV_LINKS = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#grand-rapids", label: "Grand Rapids" },
  { href: "/#who-its-for", label: "Who it’s for" },
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
    <>
      <header className="sticky top-0 z-50 border-b border-steel-800 bg-steel-900">
        <div className="mx-auto flex h-16 max-w-content items-center justify-between px-4 md:px-6">
          <Link
            href="/"
            aria-label="FNDRYx home"
            className="inline-flex items-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fire-400"
          >
            <Logo variant="dark" sizeClassName="text-[1.75rem] min-[380px]:text-[2rem]" />
          </Link>

          {/* Desktop */}
          <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className={linkClass}>
                {l.label}
              </Link>
            ))}
            <Link href="/#join" className="btn-primary px-4 py-2.5 text-sm">
              Join the founder list
            </Link>
          </nav>

          {/* Phones and tablets: short button plus a menu (works without JavaScript; closes on tap with it) */}
          <div className="flex items-center gap-2 lg:hidden">
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
    </>
  );
}
