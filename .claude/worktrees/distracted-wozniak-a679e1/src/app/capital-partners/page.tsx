import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "For Capital Providers",
  description:
    "Scored deal flow filtered against your stated thesis. Six-criterion match explanations. Deterministic scoring, no black box.",
};

const ctaLinkClass =
  "inline-flex items-center justify-center rounded-lg font-body font-semibold text-base transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-fire-400 focus-visible:ring-offset-2 focus-visible:ring-offset-steel-900 text-white bg-[linear-gradient(135deg,#ea580c_0%,#f97316_100%)] shadow-[0_4px_14px_rgba(249,115,22,0.4)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.5)] px-10 py-4";

const FORM_HREF = "/?role=capital_provider#founder-forge";

type Criterion = {
  number: string;
  name: string;
  body: string;
};

const criteria: Criterion[] = [
  {
    number: "01",
    name: "Stage fit",
    body:
      "How early or late is the founder relative to your typical investment stage?",
  },
  {
    number: "02",
    name: "Industry fit",
    body: "Does the founder operate in an industry your thesis covers?",
  },
  {
    number: "03",
    name: "Geography fit",
    body: "Is the founder in a region you actively deploy capital in?",
  },
  {
    number: "04",
    name: "Business model fit",
    body:
      "Does the founder's business model match the structures you back (B2B SaaS, marketplaces, hardware, etc.)?",
  },
  {
    number: "05",
    name: "Revenue model fit",
    body:
      "Does the founder's revenue model align with how you underwrite (subscription, transactional, licensing, etc.)?",
  },
  {
    number: "06",
    name: "Check size fit",
    body: "Is the founder raising in a range your check size supports?",
  },
];

type Capability = {
  title: string;
  body: string;
};

const capabilities: Capability[] = [
  {
    title: "Deal Flow Feed",
    body:
      "Scored matches against your stated thesis, ranked. Stage, industry, geography, business model, revenue model, and check-size filtering. Sort by score, by stage, by recency.",
  },
  {
    title: "Match Explanations",
    body:
      "Every match exposes its six-criterion breakdown. See exactly why a founder appears in your feed — and why the score is what it is. No opaque ranking, no proprietary recommendation engine to take on faith.",
  },
  {
    title: "Direct Meeting Requests",
    body:
      "Inline meeting request from each match card. Status tracking when founders accept, decline, or counter. Activity log of your own engagement. Thesis updates recompute matches.",
  },
];

export default function CapitalPartnersPage() {
  return (
    <>
      <Nav />
      <main id="main-content" tabIndex={-1} className="bg-steel-900">
        {/* SECTION A — Hero */}
        <section
          aria-labelledby="cp-hero-heading"
          className="relative overflow-hidden bg-steel-900"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(249, 115, 22, 0.15), transparent)",
            }}
          />
          <div className="relative mx-auto max-w-5xl px-6 pb-20 pt-24 md:pt-28">
            <p className="mb-4 font-display text-xs uppercase tracking-[0.2em] text-fire-400">
              For Capital Providers
            </p>
            <h1
              id="cp-hero-heading"
              className="max-w-4xl font-display font-extrabold text-3xl md:text-4xl lg:text-5xl leading-tight text-steel-100"
            >
              <span className="font-serif italic font-normal text-fire-400">
                Scored deal flow
              </span>{" "}
              filtered against{" "}
              <span className="font-serif italic font-normal text-fire-400">
                your stated thesis
              </span>
              .
            </h1>
            <p className="mt-8 max-w-3xl font-body text-lg leading-relaxed text-steel-200">
              Each match shows its full{" "}
              <span className="text-fire-400">six-criterion breakdown</span>.
              Scoring is{" "}
              <span className="text-fire-400">deterministic</span> — no{" "}
              <span className="text-fire-400">black box</span>, no
              pattern-matching, no warm-intro dependency. The platform is
              infrastructure for capital providers who want to operate on
              signal, not noise.
            </p>
            <div className="mt-10">
              <Link href={FORM_HREF} className={ctaLinkClass}>
                Request Access
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION B — How matching works */}
        <section
          aria-labelledby="cp-matching-heading"
          className="bg-steel-900 py-24 md:py-32"
        >
          <div className="mx-auto max-w-6xl px-6">
            <p className="mb-4 font-display text-xs uppercase tracking-[0.2em] text-fire-400">
              How Matching Works
            </p>
            <h2
              id="cp-matching-heading"
              className="mb-8 max-w-4xl font-display font-extrabold text-3xl md:text-5xl leading-tight text-steel-100"
            >
              <span className="font-serif italic font-normal text-fire-400">
                Six criteria
              </span>
              . Threshold-driven. Fully explainable.
            </h2>
            <p className="max-w-3xl text-lg leading-relaxed text-steel-200">
              When a founder completes the{" "}
              <span className="text-fire-400">Capital Readiness Assessment</span>
              , <span className="text-fire-400">deterministic scoring</span>{" "}
              places them on the readiness map. The matching engine then
              compares each founder against your stated thesis along six
              criteria. When the composite match score crosses the threshold,
              that founder surfaces in your feed — with the full{" "}
              <span className="text-fire-400">criterion-level breakdown</span>{" "}
              attached, not buried.
            </p>

            <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {criteria.map((c) => (
                <article
                  key={c.number}
                  className="flex flex-col rounded-2xl border border-steel-700 bg-steel-800 p-7"
                >
                  <span
                    aria-hidden="true"
                    className="font-display font-semibold text-xs uppercase tracking-[0.2em] text-fire-400"
                  >
                    {c.number}
                  </span>
                  <h3 className="mt-3 font-display font-semibold text-xl text-steel-100">
                    {c.name}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-steel-300">
                    {c.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION C — What you get */}
        <section
          aria-labelledby="cp-platform-heading"
          className="bg-steel-900 py-24 md:py-32"
        >
          <div className="mx-auto max-w-6xl px-6">
            <p className="mb-4 font-display text-xs uppercase tracking-[0.2em] text-fire-400">
              What You Get
            </p>
            <h2
              id="cp-platform-heading"
              className="mb-16 max-w-4xl font-display font-extrabold text-3xl md:text-5xl leading-tight text-steel-100"
            >
              <span className="font-serif italic font-normal text-fire-400">
                Operational concreteness
              </span>
              , not marketing fluff.
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {capabilities.map((cap) => (
                <article
                  key={cap.title}
                  className="flex flex-col rounded-2xl border border-steel-700 bg-steel-800 p-8 transition-all duration-300 hover:-translate-y-0.5 hover:border-fire-400"
                >
                  <h3 className="font-display font-semibold text-xl text-steel-100">
                    {cap.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-steel-300">
                    {cap.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION D — Founding Cohort */}
        <section
          aria-labelledby="cp-cohort-heading"
          className="bg-steel-900 py-24 md:py-32"
        >
          <div className="mx-auto max-w-6xl px-6">
            <p className="mb-4 font-display text-xs uppercase tracking-[0.2em] text-fire-400">
              Founding Cohort
            </p>
            <h2
              id="cp-cohort-heading"
              className="mb-10 max-w-4xl font-display font-extrabold text-3xl md:text-5xl leading-tight text-steel-100"
            >
              A{" "}
              <span className="font-serif italic font-normal text-fire-400">
                time-limited cohort
              </span>{" "}
              for the first wave of capital providers.
            </h2>

            <div className="max-w-3xl space-y-6 text-lg leading-relaxed text-steel-200">
              <p>
                FNDRYx is enrolling its first capital providers through a{" "}
                <span className="text-fire-400">Founding Cohort program</span> —
                a capped, time-limited entry path with structurally distinct
                terms from standard tier subscriptions. Members in the cohort
                receive multi-year platform access plus a path to permanent{" "}
                <span className="text-fire-400">Founding Member status</span>,
                earned through measurable engagement across{" "}
                <span className="text-fire-400">three pillars</span>: founder
                engagement (depth of profile review), meeting activity
                (requests, acceptance, attendance), and platform participation
                (login cadence, thesis updates, response time).
              </p>
              <p>
                Engagement is measured cumulatively over the founding window.
                Members who clear the engagement threshold earn a{" "}
                <span className="text-fire-400">
                  permanent Founding Member designation
                </span>{" "}
                plus lifetime discount on all post-cohort enrollment. Members
                who don&apos;t clear the threshold remain on platform at base
                discount terms —{" "}
                <span className="text-fire-400">graceful non-retention</span>,
                not exit.
              </p>
              <p>
                Specific terms — pricing, cohort cap, engagement threshold —
                will be published when the cohort opens. To be notified at
                launch, request access below.
              </p>
            </div>

            <div className="mt-10">
              <Link href={FORM_HREF} className={ctaLinkClass}>
                Be Notified at Launch
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION E — Methodology */}
        <section
          aria-labelledby="cp-methodology-heading"
          className="bg-steel-900 py-24 md:py-32"
        >
          <div className="mx-auto max-w-6xl px-6">
            <p className="mb-4 font-display text-xs uppercase tracking-[0.2em] text-fire-400">
              Methodology
            </p>
            <h2
              id="cp-methodology-heading"
              className="mb-10 max-w-4xl font-display font-extrabold text-3xl md:text-5xl leading-tight text-steel-100"
            >
              Deterministic scoring. Explainable matches.{" "}
              <span className="font-serif italic font-normal text-fire-400">
                No black box
              </span>
              .
            </h2>
            <p className="max-w-3xl text-lg leading-relaxed text-steel-200">
              The Capital Readiness Assessment scores founders{" "}
              <span className="text-fire-400">deterministically</span> —
              JavaScript-based scoring, no LLM in the score-computation path.{" "}
              <span className="text-fire-400">Threshold indicators</span>{" "}
              (Exceptional, Solid, Developing, Foundational, Early) describe
              where each score falls.{" "}
              <span className="text-fire-400">Quadrant placement</span>{" "}
              (Forged, Tempering, Hot Iron, Ore) maps the founder onto the
              BR/IR plane. Reports are anchored to the same underlying score
              data — narrative generation runs separately from scoring, and
              that distinction is structural. What you see in your feed is{" "}
              <span className="text-fire-400">signal, not interpretation</span>.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
