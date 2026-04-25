import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-steel-900 py-20">
      <div className="flex flex-col items-center gap-10 px-6 text-center">
        <Logo size="md" variant="dark" />

        <div className="w-3/5 border-t border-steel-800" />

        <p className="max-w-2xl font-body text-xs uppercase tracking-widest text-steel-400">
          The capital-readiness exchange — where every founder signal compounds over time.
        </p>

        <Link
          href="/blog"
          className="text-sm text-steel-400 underline underline-offset-4 hover:text-steel-200 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fire-400 focus-visible:ring-offset-2 focus-visible:ring-offset-steel-900"
        >
          Journal
        </Link>

        <a
          href="https://fndryx.io"
          className="text-sm text-steel-400 underline underline-offset-4 hover:text-steel-200 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fire-400 focus-visible:ring-offset-2 focus-visible:ring-offset-steel-900"
        >
          fndryx.io
        </a>

        <p className="text-xs text-steel-400">
          © 2026 FNDRYx. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
