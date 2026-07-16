"use client";

import { useState } from "react";
import Button from "@/components/Button";

type Status = "idle" | "loading" | "success" | "error";

const CONTACT_EMAIL = "kevin@fndryx.io";

export default function UnsubscribeForm({ token }: { token: string | null }) {
  const [status, setStatus] = useState<Status>("idle");

  if (token === null) {
    return (
      <div aria-live="polite">
        <h1 className="mb-6 font-display font-extrabold text-4xl md:text-5xl text-steel-100">
          This link is incomplete.
        </h1>
        <p className="mx-auto max-w-md text-base md:text-lg leading-relaxed text-steel-400">
          The unsubscribe link is missing its token, so we can&apos;t tell which
          address to remove. Email{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-fire-400">
            {CONTACT_EMAIL}
          </a>{" "}
          and we&apos;ll unsubscribe you manually.
        </p>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div aria-live="polite">
        <h1 className="mb-6 font-display font-extrabold text-4xl md:text-5xl text-steel-100">
          You&apos;re unsubscribed.
        </h1>
        <p className="mx-auto max-w-md text-base md:text-lg leading-relaxed text-steel-400">
          FNDRYx will stop sending you pulse checks and reassessment reminders.
          Nothing else to do.
        </p>
      </div>
    );
  }

  const handleUnsubscribe = async () => {
    setStatus("loading");
    try {
      const res = await fetch(`/unsubscribe?t=${encodeURIComponent(token)}`, {
        method: "POST",
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      // Surface the failure: without this the button stays disabled forever and
      // the fallback address becomes unreachable.
      setStatus("error");
    }
  };

  return (
    <div>
      <h1 className="mb-6 font-display font-extrabold text-4xl md:text-5xl text-steel-100">
        Unsubscribe from FNDRYx?
      </h1>
      <p className="mx-auto mb-10 max-w-md text-base md:text-lg leading-relaxed text-steel-400">
        FNDRYx will stop sending you pulse checks and reassessment reminders.
      </p>
      <Button
        variant="primary"
        className="px-10 py-4 text-base"
        disabled={status === "loading"}
        onClick={handleUnsubscribe}
      >
        {status === "loading" ? "Unsubscribing..." : "Confirm unsubscribe"}
      </Button>
      {status === "error" && (
        <p
          role="alert"
          className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-red-400"
        >
          We couldn&apos;t process that unsubscribe. Email{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-fire-400">
            {CONTACT_EMAIL}
          </a>{" "}
          and we&apos;ll unsubscribe you manually.
        </p>
      )}
    </div>
  );
}
