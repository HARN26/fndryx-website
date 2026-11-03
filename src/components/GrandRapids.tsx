import Image, { getImageProps } from "next/image";

// Grand Rapids (plan section 6, deck slide 14). Cleared by Ted on Nov 2, 2026.
// Midwest House logo cleared by Kevin the same day: one-color gray, small,
// never dominant.
//
// Photo (Nov 2, 2026): The Theater at Bamboo, the Summit venue, supplied by
// Kevin, with the event details placed on the projection screen (Grand Rapids,
// Dec 2–3 / Midwest House Summit / Founder Track / Powered by FNDRYx). Cropped
// to drop the stairway and the side door (Kevin).
// From xl up the full photo fills the section with a navy fade on the left;
// below xl a closer crop of the stage sits as a band above the text, so the
// screen stays readable. No deadline is printed here: the code dates live in
// the invitation emails and may change. Rewrite in past tense after the
// Summit (PR 8); the screen text will need a past-tense version too.

const ALT =
  "The Theater at Bamboo in Grand Rapids: rows of seats face a screen that reads Grand Rapids, Dec 2–3. Midwest House Summit, Founder Track. Powered by FNDRYx.";

const {
  props: { srcSet: wideSrcSet },
} = getImageProps({
  alt: ALT,
  src: "/images/home/grand-rapids-theater.jpg",
  width: 1700,
  height: 860,
  sizes: "100vw",
});
const {
  props: { srcSet: stageSrcSet, ...stageProps },
} = getImageProps({
  alt: ALT,
  src: "/images/home/grand-rapids-theater-stage.jpg",
  width: 800,
  height: 475,
  sizes: "100vw",
});

export default function GrandRapids() {
  return (
    <section
      id="grand-rapids"
      aria-labelledby="gr-heading"
      className="relative overflow-hidden bg-steel-900"
    >
      <div className="relative h-56 sm:h-80 lg:h-96 xl:absolute xl:inset-0 xl:h-auto">
        <picture>
          <source media="(min-width: 1280px)" srcSet={wideSrcSet} sizes="100vw" />
          <img
            {...stageProps}
            srcSet={stageSrcSet}
            alt={ALT}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover object-center xl:object-[100%_40%]"
          />
        </picture>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-steel-900 via-transparent via-35% to-transparent xl:bg-linear-to-r xl:via-steel-900/90 xl:via-42% xl:to-transparent xl:to-62%"
        />
      </div>

      <div className="relative mx-auto max-w-content px-4 pb-20 pt-6 md:px-6 xl:py-32">
        <div className="max-w-xl">
          <div className="flex items-center gap-4">
            <p className="section-label">Live now</p>
            <span aria-hidden="true" className="h-6 w-px bg-steel-600" />
            <Image
              src="/images/home/midwest-house-logo-gray.png"
              alt="Midwest House"
              width={480}
              height={221}
              sizes="80px"
              className="h-8 w-auto"
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
