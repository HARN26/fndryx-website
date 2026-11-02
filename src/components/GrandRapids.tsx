import Image from "next/image";

// Grand Rapids (plan section 6, deck slide 14). Cleared by Ted on Nov 2, 2026.
// Midwest House logo cleared by Kevin the same day: one-color gray, small,
// never dominant.
// Full-bleed road photo with a navy fade on the left (desktop); on phones the
// photo is a band above the text. No deadline is printed here: the code dates
// live in the invitation emails and may change. Rewrite in past tense after
// the Summit (PR 8).

export default function GrandRapids() {
  return (
    <section
      id="grand-rapids"
      aria-labelledby="gr-heading"
      className="relative overflow-hidden bg-steel-900"
    >
      <div className="relative h-56 sm:h-72 lg:absolute lg:inset-0 lg:h-auto">
        <Image
          src="/images/home/midwest-road.jpg"
          alt="A two-lane country road runs toward the setting sun past grain bins and power lines in the Midwest."
          fill
          sizes="100vw"
          className="object-cover object-[70%_60%] lg:object-[100%_60%]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-steel-900 via-transparent via-40% to-transparent lg:bg-linear-to-r lg:via-steel-900/90 lg:via-55% lg:to-transparent lg:to-90% xl:via-steel-900/85 xl:via-40% xl:to-80%"
        />
      </div>

      <div className="relative mx-auto max-w-content px-4 pb-20 pt-4 md:px-6 lg:py-32">
        <div className="max-w-xl">
          <div className="flex items-center gap-4">
            <p className="section-label">Live now</p>
            <span aria-hidden="true" className="h-5 w-px bg-steel-600" />
            <Image
              src="/images/home/midwest-house-logo-gray.png"
              alt="Midwest House"
              width={480}
              height={221}
              sizes="80px"
              className="h-7 w-auto"
            />
          </div>
          <h2
            id="gr-heading"
            className="mt-4 font-display text-h2 font-bold text-steel-100"
          >
            The best front door to a founder is a program they already trust.
          </h2>
          <p className="mt-6 font-body text-body text-steel-200">
            At Midwest House Summit in Grand Rapids, Dec 2–3, Midwest House
            invites its founders and FNDRYx runs the assessment. Each founder
            gets their own report. The group&apos;s combined results shape the
            Founder Track breakout sessions.
          </p>
          <p className="mt-8 border-l-2 border-fire-400 pl-4 font-body text-base text-steel-200">
            <strong className="font-bold text-steel-100">Attending?</strong>{" "}
            Your personal link is in your invitation email from FNDRYx.
            Can&apos;t find it? Email{" "}
            <a href="mailto:kevin@fndryx.io" className="text-link underline">
              kevin@fndryx.io
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
