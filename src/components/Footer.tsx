import Link from "next/link";
import Logo from "./Logo";

function LinkedinIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
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
    <footer className="bg-steel-900 py-20">
      <div className="flex flex-col items-center gap-10 px-6 text-center">
        <Logo size="md" variant="dark" />

        <div className="w-3/5 border-t border-steel-800" />

        <p className="max-w-2xl font-body text-xs uppercase tracking-widest text-steel-400">
          The capital-readiness exchange — where every founder signal compounds over time.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          <Link
            href="/blog"
            className="text-sm text-steel-400 underline underline-offset-4 hover:text-steel-200 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fire-400 focus-visible:ring-offset-2 focus-visible:ring-offset-steel-900"
          >
            Journal
          </Link>

          <Link
            href="/capital-partners"
            className="text-sm text-steel-400 underline underline-offset-4 hover:text-steel-200 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fire-400 focus-visible:ring-offset-2 focus-visible:ring-offset-steel-900"
          >
            For Capital Providers
          </Link>

          <a
            href="https://fndryx.io"
            className="text-sm text-steel-400 underline underline-offset-4 hover:text-steel-200 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fire-400 focus-visible:ring-offset-2 focus-visible:ring-offset-steel-900"
          >
            fndryx.io
          </a>

          <a
            href="https://www.linkedin.com/company/109594033"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="FNDRYx on LinkedIn"
            className="inline-flex items-center text-steel-400 transition-colors hover:text-fire-400 rounded-sm focus-visible:outline-none focus-visible:outline-2 focus-visible:outline-fire-400 focus-visible:outline-offset-2"
          >
            <LinkedinIcon size={20} />
          </a>
        </div>

        <p className="text-xs text-steel-400">
          © 2026 FNDRYx. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
