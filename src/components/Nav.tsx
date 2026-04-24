"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import Button from "./Button";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleRequestAccess = () => {
    const el = document.getElementById("founder-forge");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-200 ${
        scrolled
          ? "bg-steel-900/95 backdrop-blur-md border-b border-steel-800"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-6 md:px-10">
        <Link href="/" className="inline-flex items-center" aria-label="FNDRYx home">
          <Logo size="sm" variant="dark" />
        </Link>
        <Button
          variant="primary"
          onClick={handleRequestAccess}
          className="uppercase tracking-wider text-xs"
        >
          Request Access to Founder Forge
        </Button>
      </div>
    </header>
  );
}
