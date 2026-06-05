import type { Metadata } from "next";
import Image from "next/image";

import { AgendaSection } from "./AgendaSection";

const DIRECTIONS_URL = "https://maps.google.com?daddr=39.9665981,-86.0080016";

export const metadata: Metadata = {
  title: "Raise Right — Today's Schedule · June 10, 2026",
  description:
    "Day-of event schedule for Raise Right: The Founder-Capital Ecosystem Summit at Launch Fishers, June 10, 2026.",
};

const secondaryCta =
  "inline-flex items-center justify-center rounded-lg font-body font-semibold text-sm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-fire-400 focus-visible:ring-offset-2 focus-visible:ring-offset-steel-900 border border-steel-600 text-steel-100 hover:border-fire-400 hover:text-fire-400 px-6 py-3";

const eyebrow =
  "font-display text-xs font-semibold uppercase tracking-[0.2em] text-fire-400";

type Speaker = {
  name: string;
  role: string;
  topic?: string;
  initials: string;
  headshot?: string;
};

const speakers: Speaker[] = [
  {
    name: "Chris Heivly",
    role: "Keynote — Co-founder, MapQuest · Author, Build the Fort",
    initials: "CH",
    headshot: "/images/raise-right/c_heivly.jpg",
  },
  {
    name: "Mayor Scott Fadness",
    role: "City of Fishers",
    topic: "Indiana's Innovation Infrastructure",
    initials: "SF",
    headshot: "/images/raise-right/s_fadness.jpg",
  },
  {
    name: "Steve Iskander",
    role: "Intrepid Finance",
    topic: "The New Cap Stack: The Right Investment at the Right Time",
    initials: "SI",
    headshot: "/images/raise-right/s_iskander.jpg",
  },
];

type FirmCard = {
  firm: string;
  person?: string;
  role?: string;
};

type Panel = {
  number: string;
  title: string;
  moderator?: string;
  firms: FirmCard[];
};

const panels: Panel[] = [
  {
    number: "Panel 1",
    title: "How to Build an Ecosystem that Attracts Capital",
    moderator: "John Wechsler, CEO, SpokeNote",
    firms: [
      { firm: "Elevate Ventures", person: 'Christopher "Toph" Day', role: "CEO" },
      { firm: "Nashville Entrepreneur Center", person: "Sam Davidson", role: "CEO" },
      { firm: "mHUB", person: "Ryan Fant", role: "Executive Director" },
    ],
  },
  {
    number: "Panel 2",
    title: "Navigating the Capital Stack: Finding the Right Funding",
    firms: [
      { firm: "Start Something Ventures", person: "Bob Carlson", role: "Partner" },
      { firm: "Orange.fund", person: "Joe Watkins", role: "Partner" },
      { firm: "JP Morgan", person: "Sadiki McCalla", role: "Commercial Banker" },
      {
        firm: "Generations Community Bank",
        person: "Kyle Middleton",
        role: "Chief Credit Officer",
      },
      { firm: "Yorktown Essex Fund", person: "Casey Bolsega", role: "Sr. Manager" },
    ],
  },
];

const reversePitch: FirmCard[] = [
  { firm: "Elevate Ventures" },
  { firm: "Crossroads Health Ventures" },
  { firm: "Plug and Play" },
  { firm: "Orange.fund" },
  { firm: "Generations Community Bank" },
  { firm: "Endeavor" },
  { firm: "Old National" },
  { firm: "JP Morgan" },
  { firm: "Yorktown Essex Fund" },
  { firm: "Rams Head Funding" },
];

function FirmGrid({ items }: { items: FirmCard[] }) {
  return (
    <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => (
        <article
          key={`${item.firm}-${i}`}
          className="flex flex-col rounded-2xl border border-steel-700 bg-steel-800 p-6"
        >
          <h3 className="font-display text-lg font-semibold text-steel-100">
            {item.firm}
          </h3>
          {item.person && (
            <p className="mt-2 text-base text-steel-200">{item.person}</p>
          )}
          {item.role && (
            <p className="mt-0.5 text-sm text-steel-400">{item.role}</p>
          )}
        </article>
      ))}
    </div>
  );
}

export default function RaiseRightPage() {
  return (
    <main id="main-content" className="bg-steel-900">
      {/* HERO */}
      <section
        aria-labelledby="rr-hero-heading"
        className="relative overflow-hidden bg-steel-900"
      >
        <div className="relative mx-auto flex max-w-4xl flex-col items-center px-6 pb-8 pt-12 text-center md:pb-[1.625rem] md:pt-[3.25rem]">
          <h1 id="rr-hero-heading" className="sr-only">
            Raise Right: The Founder-Capital Ecosystem Summit — Today&apos;s
            Schedule
          </h1>

          {/* a. eyebrow */}
          <p className="font-body text-xs font-medium uppercase tracking-[0.2em] text-steel-200 sm:text-sm">
            Launch Fishers &amp; Intrepid Present
          </p>

          {/* b. presenter logo row — lead sponsors, matched optical height (Launch slightly taller) */}
          <div className="mt-3 flex items-center justify-center gap-8 sm:gap-12 md:mt-4 md:gap-16">
            <Image
              src="/images/raise-right/Launch_Fishers_Logo_Full_Color.png"
              alt="Launch Fishers"
              width={861}
              height={295}
              priority
              className="h-11 w-auto sm:h-16 md:h-[5.5rem]"
            />
            <Image
              src="/images/raise-right/intrepid-logo.png"
              alt="Intrepid"
              width={500}
              height={117}
              priority
              className="h-[2.125rem] w-auto sm:h-[3.125rem] md:h-[4.25rem]"
            />
          </div>

          {/* c. title with fire glow */}
          <p
            aria-hidden="true"
            className="mt-16 font-display font-extrabold uppercase leading-none text-steel-100 md:mt-24"
            style={{
              fontSize: "clamp(1.5rem, calc((100vw - 3rem) / 10.8), 6rem)",
              letterSpacing: "-0.03em",
              whiteSpace: "nowrap",
              textShadow:
                "0 0 30px rgba(249, 115, 22, 0.45), 0 0 60px rgba(249, 115, 22, 0.28), 0 0 100px rgba(234, 88, 12, 0.2)",
            }}
          >
            Raise Right
          </p>

          {/* d. subtitle */}
          <p
            aria-hidden="true"
            className="mt-4 font-body text-sm uppercase tracking-[0.18em] text-steel-200 sm:text-base md:mt-5"
          >
            The Founder-Capital Ecosystem Summit
          </p>

          {/* e. divider */}
          <hr className="mt-6 w-48 border-0 border-t border-steel-700 sm:w-60 md:mt-8" />

          {/* f. powered by */}
          <p className="mt-6 font-body text-xs uppercase tracking-[0.2em] text-steel-400 md:mt-8">
            Powered by
          </p>

          {/* g. powered-by triangle — Data317 apex (lead position), Yorktown base-left + FNDRYx base-right.
                Matched optical weight: each logo gets its own px height to feel equal in presence.
                Data317 ships black-on-transparent, so it's forced white to match the white logo family. */}
          <div className="mt-5 flex flex-col items-center gap-4 sm:gap-5 md:mt-6 md:gap-6">
            {/* Data317 ships as one black-on-transparent lockup; split into green leaf
                + wordmark so only the wordmark is forced white (leaf keeps its brand color) */}
            <span className="flex items-center">
              <Image
                src="/images/raise-right/Data317_mark.png"
                alt=""
                aria-hidden="true"
                width={1158}
                height={1100}
                priority
                className="h-7 w-auto sm:h-[2.625rem] md:h-[3.5rem]"
              />
              <Image
                src="/images/raise-right/Data317_wordmark.png"
                alt="Data317"
                width={3442}
                height={1100}
                priority
                className="h-7 w-auto sm:h-[2.625rem] md:h-[3.5rem]"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </span>
            <div className="flex items-center justify-center gap-4 sm:gap-12 md:gap-16">
              <Image
                src="/images/raise-right/Yorktown_Logo_Horizontal_White.png"
                alt="Yorktown Essex Fund"
                width={320}
                height={132}
                className="h-[3.25rem] w-auto sm:h-[4.75rem] md:h-[6.5rem]"
              />
              <Image
                src="/images/raise-right/FNDRYx_logo_transparent.png"
                alt="FNDRYx"
                width={4094}
                height={472}
                className="h-5 w-auto sm:h-8 md:h-[2.625rem]"
              />
            </div>
          </div>

          {/* below hero */}
          <p className="mt-16 font-body text-base text-steel-200 md:mt-24">
            Today&apos;s Schedule · Launch Fishers
          </p>
          <p className="mt-2 font-body text-sm text-steel-400">
            9:00 AM – 4:30 PM
          </p>
        </div>
      </section>

      {/* AGENDA — the centerpiece */}
      <AgendaSection />

      {/* FEATURED SPEAKERS */}
      <section
        aria-labelledby="rr-speakers-heading"
        className="bg-steel-900 py-14 md:py-20"
      >
        <div className="mx-auto max-w-6xl px-6">
          <p className={eyebrow}>Featured Speakers</p>
          <h2
            id="rr-speakers-heading"
            className="mt-4 font-display text-3xl font-extrabold leading-tight text-steel-100 md:text-4xl"
          >
            Voices shaping the <span className="text-fire-400">ecosystem</span>.
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {speakers.map((s) => (
              <article
                key={s.name}
                className="flex flex-col items-center rounded-2xl border border-steel-700 bg-steel-800 p-8 text-center transition-all duration-300 hover:-translate-y-0.5 hover:border-fire-400"
              >
                {s.headshot ? (
                  <Image
                    src={s.headshot}
                    alt={s.name}
                    width={80}
                    height={80}
                    className="h-20 w-20 rounded-full border border-steel-600 object-cover"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="flex h-20 w-20 items-center justify-center rounded-full border border-steel-600 bg-steel-900 font-display text-2xl font-bold text-fire-400"
                  >
                    {s.initials}
                  </span>
                )}
                <h3 className="mt-5 font-display text-xl font-semibold text-steel-100">
                  {s.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-steel-300">
                  {s.role}
                </p>
                {s.topic && (
                  <p className="mt-3 font-display text-sm font-medium leading-relaxed text-fire-400">
                    {s.topic}
                  </p>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PANELS */}
      <section
        aria-labelledby="rr-panels-heading"
        className="bg-steel-900 py-14 md:py-20"
      >
        <div className="mx-auto max-w-6xl px-6">
          <p className={eyebrow}>Panels</p>
          <h2
            id="rr-panels-heading"
            className="mt-4 font-display text-[1.375rem] font-extrabold leading-tight text-steel-100 md:text-4xl"
          >
            Two panels, one{" "}
            <span className="whitespace-nowrap text-fire-400">capital stack</span>.
          </h2>

          <div className="mt-12 space-y-14">
            {panels.map((panel) => (
              <div key={panel.number}>
                <p className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-fire-400">
                  {panel.number}
                </p>
                <h3 className="mt-2 max-w-3xl font-display text-xl font-bold leading-snug text-steel-100 md:text-2xl">
                  {panel.title}
                </h3>
                {panel.moderator && (
                  <p className="mt-2 font-body text-sm text-steel-400">
                    Moderated by {panel.moderator}
                  </p>
                )}
                <FirmGrid items={panel.firms} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVERSE PITCH */}
      <section
        aria-labelledby="rr-reverse-heading"
        className="bg-steel-900 py-14 md:py-20"
      >
        <div className="mx-auto max-w-6xl px-6">
          <p className={eyebrow}>Reverse Pitch</p>
          <h2
            id="rr-reverse-heading"
            className="mt-4 font-display text-[1.375rem] font-extrabold leading-tight text-steel-100 md:text-4xl"
          >
            Reverse Pitch —{" "}
            <span className="whitespace-nowrap">
              <span className="text-fire-400">Investors</span> Pitch You
            </span>
          </h2>
          <p className="mt-4 max-w-3xl font-body text-lg leading-relaxed text-steel-200">
            Fast-Track Reverse Pitches — 10 capital investors. Strict 3-minute
            pitch + 1-minute transition.
          </p>
          <FirmGrid items={reversePitch} />
        </div>
      </section>

      {/* SPONSORS */}
      <section
        aria-label="Event sponsors and partners"
        className="bg-steel-900 pt-14 pb-16 md:pt-20 md:pb-24"
      >
        <div className="mx-auto flex max-w-5xl flex-col items-center px-6 text-center">
          {/* presented by — lead sponsors */}
          <p className="font-body text-xs uppercase tracking-[0.2em] text-steel-400">
            Presented by
          </p>
          <div className="mt-5 flex items-center justify-center gap-8 sm:gap-12">
            <Image
              src="/images/raise-right/Launch_Fishers_Logo_Full_Color.png"
              alt="Launch Fishers"
              width={861}
              height={295}
              className="h-10 w-auto md:h-14"
            />
            <Image
              src="/images/raise-right/intrepid-logo.png"
              alt="Intrepid"
              width={500}
              height={117}
              className="h-8 w-auto md:h-11"
            />
          </div>

          {/* powered by — a step smaller, same family */}
          <p className="mt-12 font-body text-xs uppercase tracking-[0.2em] text-steel-400">
            Powered by
          </p>
          <div className="mt-5 flex flex-col items-center gap-3 sm:gap-4">
            {/* split logo — green leaf + white wordmark (see hero note) */}
            <span className="flex items-center">
              <Image
                src="/images/raise-right/Data317_mark.png"
                alt=""
                aria-hidden="true"
                width={1158}
                height={1100}
                className="h-7 w-auto md:h-9"
              />
              <Image
                src="/images/raise-right/Data317_wordmark.png"
                alt="Data317"
                width={3442}
                height={1100}
                className="h-7 w-auto md:h-9"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </span>
            <div className="flex items-center justify-center gap-4 sm:gap-12">
              <Image
                src="/images/raise-right/Yorktown_Logo_Horizontal_White.png"
                alt="Yorktown Essex Fund"
                width={320}
                height={132}
                className="h-12 w-auto md:h-[4.25rem]"
              />
              <Image
                src="/images/raise-right/FNDRYx_logo_transparent.png"
                alt="FNDRYx"
                width={4094}
                height={472}
                className="h-5 w-auto md:h-7"
              />
            </div>
          </div>

          <p className="mt-12 font-body text-sm text-steel-400">
            In-Kind Partner · Brosmer Photography — Video &amp; Stills
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-steel-700 bg-steel-900 py-14 md:py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className={eyebrow}>Venue</p>
          <h2 className="mt-4 font-display text-2xl font-bold text-steel-100 md:text-3xl">
            Launch Fishers
          </h2>
          <p className="mt-3 font-body text-base text-steel-200">
            12175 Visionary Way, Fishers, IN 46038
          </p>

          <div className="mt-8 flex justify-center">
            <a
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={secondaryCta}
            >
              Get Directions
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
