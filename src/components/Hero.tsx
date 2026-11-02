import Image from "next/image";

// Hero (plan section 1): left-aligned text over navy. From lg up the foundry
// photo bleeds off the right edge with a navy fade on its left side; below lg
// it becomes a shorter band under the text. No second logo.
//
// The text link points at the Grand Rapids section (cleared by Ted). After the
// Summit (PR 8) it goes back to "How it works".

export const HERO_IMAGE = {
  src: "/images/home/hero-foundry-pour.jpg",
  alt: "Three people in protective gear pour molten iron from a furnace at a night pour in Milwaukee, sparks scattering across the ground.",
};

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-steel-900"
    >
      <div className="relative z-10 mx-auto grid max-w-content px-4 pb-14 pt-14 md:px-6 md:pb-20 md:pt-20 lg:grid-cols-12 lg:pb-28 lg:pt-28">
        <div className="lg:col-span-7">
          <h1
            id="hero-heading"
            className="font-display text-h1 font-bold text-steel-100"
          >
            The readiness record for early-stage capital.
          </h1>
          <p className="mt-6 max-w-xl font-body text-body text-steel-300 md:mt-8">
            Founders take a structured assessment, get a report built from
            their own answers, and can check in every 21 days. Those check-ins
            build a record that only time can create.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 md:mt-10">
            <a href="#join" className="btn-primary px-6 py-3.5 text-base">
              Join the founder list
            </a>
            <a href="#grand-rapids" className="text-link font-body text-base font-medium">
              Going to Grand Rapids?
            </a>
          </div>
        </div>
      </div>

      {/* Phones and tablets: a band under the text. Desktop: bleeds off the right. */}
      <div className="relative h-64 w-full sm:h-80 lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[44%]">
        <Image
          src={HERO_IMAGE.src}
          alt={HERO_IMAGE.alt}
          fill
          fetchPriority="high"
          loading="eager"
          sizes="(min-width: 1024px) 44vw, 100vw"
          className="object-cover object-[50%_55%]"
        />
        {/* Navy fade: top edge on the band, left edge on desktop */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-b from-steel-900 via-transparent via-30% to-transparent lg:bg-linear-to-r lg:via-20%"
        />
      </div>
    </section>
  );
}
