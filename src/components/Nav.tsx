"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "./Logo";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-200 ${
        scrolled
          ? "bg-steel-900/95 backdrop-blur-md border-b border-steel-800"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-6 md:px-10">
        <Link
          href="/"
          className="inline-flex items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fire-400 focus-visible:ring-offset-2 focus-visible:ring-offset-steel-900"
          aria-label="FNDRYx home"
        >
          <Logo size="sm" variant="dark" />
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/blog"
            className="hidden md:inline-block font-body font-medium text-sm text-steel-300 hover:text-fire-400 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fire-400 focus-visible:ring-offset-2 focus-visible:ring-offset-steel-900"
          >
            Journal
          </Link>
          <Link
            href="/capital-partners"
            className="hidden md:inline-block font-body font-medium text-sm text-steel-300 hover:text-fire-400 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fire-400 focus-visible:ring-offset-2 focus-visible:ring-offset-steel-900"
          >
            For Capital Providers
          </Link>
          <Link
            href="/accelerators"
            className="hidden md:inline-block font-body font-medium text-sm text-steel-300 hover:text-fire-400 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fire-400 focus-visible:ring-offset-2 focus-visible:ring-offset-steel-900"
          >
            For Accelerators
          </Link>
          <Link
            href="/#founder-forge"
            className="inline-flex items-center justify-center rounded-lg font-body font-semibold text-xs uppercase tracking-wider text-white bg-[linear-gradient(135deg,#ea580c_0%,#f97316_100%)] shadow-[0_4px_14px_rgba(249,115,22,0.4)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-fire-400 focus-visible:ring-offset-2 focus-visible:ring-offset-steel-900 px-7 py-3.5"
          >
            Request Access
          </Link>
        </div>
      </div>
    </header>
  );
}
