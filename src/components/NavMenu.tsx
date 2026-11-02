"use client";

import { useRef, type ReactNode } from "react";

// Phone menu. Plain <details>, so it opens and closes without JavaScript;
// when JavaScript is available it also closes after a link is tapped and on
// Escape, so it doesn't sit over the section the visitor just jumped to.
export default function NavMenu({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDetailsElement>(null);

  const close = () => {
    if (ref.current?.open) ref.current.open = false;
  };

  return (
    <details
      ref={ref}
      className="group relative"
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("a")) close();
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape" && ref.current?.open) {
          close();
          ref.current.querySelector("summary")?.focus();
        }
      }}
    >
      {children}
    </details>
  );
}
