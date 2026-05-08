import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "For Accelerators — FNDRYx",
  description:
    "Cohort-level impact measurement that holds up to LP scrutiny. Pre/post assessment with normalized delta scoring, multi-organization tenancy, and a defensible numerical answer to what the program did.",
};

const ctaLinkClass =
  "inline-flex items-center justify-center rounded-lg font-body font-semibold text-base transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-fire-400 focus-visible:ring-offset-2 focus-visible:ring-offset-steel-900 text-white bg-[linear-gradient(135deg,#ea580c_0%,#f97316_100%)] shadow-[0_4px_14px_rgba(249,115,22,0.4)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.5)] px-10 py-4";

const FORM_HREF = "/?role=operator#founder-forge";

type Step = {
  number: string;
  title: string;
  body: string;
  badge: string;
};

const steps: Step[] = [
  {
    number: "01",
    title: "Pre-program",
    body: "Founders enroll via program-specific invite codes. Each founder completes the standard 26-question Capital Readiness Assessment. Cohort baseline is set.",
    badge: "26 Questions",
  },
  {
    number: "02",
    title: "During Program",
    body: "Founders run through your program. FNDRYx stays out of the way — measurement is bracketed at the cohort boundaries, not embedded in your curriculum or workflow.",
    badge: "No Workflow Disruption",
  },
  {
    number: "03",
    title: "Post-program",
    body: "Batch send the post-program assessment from the operator portal. 22 core questions plus 6 reflection questions. Automated 7-day and 14-day reminders. As founders complete, deltas compute and the cohort impact score rolls up to your Impact Dashboard.",
    badge: "Impact Dashboard",
  },
];

type Capability = {
  title: string;
  body: string;
};

const capabilities: Capability[] = [
  {
    title: "Impact Dashboard",
    body: "Cohort-level pre/post movement. Quadrant change distributions across your founders. Dimension-level deltas — which capabilities improved, which didn't. Multi-cohort comparison when you've run more than one cohort on the platform.",
  },
  {
    title: "Multi-organization Tenancy",
    body: "Each accelerator's data is fully isolated from every other accelerator on the platform. Multiple programs and multiple cohorts under one organization. Strict data boundaries; PMs only see their own cohorts.",
  },
  {
    title: "Operator Portal",
    body: "Batch send post-program assessments from one screen. Automated 7-day and 14-day reminder cron handles laggards without your team chasing. Cohort analytics surface as founders complete — no manual rollup required.",
  },
];

export default function AcceleratorsPage() {
  return (
    <>
      <Nav />
      <main id="main-content" tabIndex={-1} className="bg-steel-900">
        {/* SECTION A — Hero */}
        <section
          aria-labelledby="acc-hero-heading"
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
              For Accelerators
            </p>
            <h1
              id="acc-hero-heading"
              className="max-w-4xl font-display font-extrabold text-3xl md:text-4xl lg:text-5xl leading-tight text-steel-100"
            >
              Measured impact,{" "}
              <span className="font-serif italic font-normal text-fire-400">
                not anecdote
              </span>
              .
            </h1>
            <p className="mt-8 max-w-3xl font-body text-lg leading-relaxed text-steel-200">
              FNDRYx gives accelerators and program operators what their LPs
              and stakeholders actually need: a{" "}
              <span className="text-fire-400">
                defensible numerical answer
              </span>{" "}
              to &ldquo;what did the program do.&rdquo;{" "}
              <span className="text-fire-400">Pre/post assessment</span>,{" "}
              <span className="text-fire-400">normalized delta scoring</span>,
              cohort impact rollup.{" "}
              <span className="text-fire-400">
                Measurement infrastructure
              </span>
              , not another LMS.
            </p>
            <div className="mt-10">
              <Link href={FORM_HREF} className={ctaLinkClass}>
                Start a Conversation
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION B — How impact measurement works */}
        <section
          aria-labelledby="acc-measurement-heading"
          className="bg-steel-900 py-24 md:py-32"
        >
          <div className="mx-auto max-w-6xl px-6">
            <p className="mb-4 font-display text-xs uppercase tracking-[0.2em] text-fire-400">
              How Impact Measurement Works
            </p>
            <h2
              id="acc-measurement-heading"
              className="mb-8 max-w-4xl font-display font-extrabold text-3xl md:text-5xl leading-tight text-steel-100"
            >
              Pre/post assessment.{" "}
              <span className="font-serif italic font-normal text-fire-400">
                Normalized delta
              </span>
              . Cohort rollup.
            </h2>
            <p className="max-w-3xl text-lg leading-relaxed text-steel-200">
              Each cohort runs through a structured measurement loop. Founders
              complete the{" "}
              <span className="text-fire-400">Capital Readiness Assessment</span>{" "}
              at the start of the program — twenty-six questions across five
              dimensions of capital readiness,{" "}
              <span className="text-fire-400">deterministically scored</span>.
              At the end of the program, founders complete a{" "}
              <span className="text-fire-400">
                22-core + 6-reflection instrument
              </span>{" "}
              that measures how their readiness moved. Deltas normalize across
              founders; the{" "}
              <span className="text-fire-400">cohort impact score</span> rolls
              up the movement at the program level.
            </p>

            <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
              {steps.map((step) => (
                <article
                  key={step.number}
                  className="relative flex min-h-[280px] flex-col rounded-2xl border border-steel-700 bg-steel-800 p-8 transition-all duration-300 hover:-translate-y-0.5 hover:border-fire-400"
                >
                  <div
                    aria-hidden="true"
                    className="mb-6 font-display font-extrabold text-7xl leading-none text-steel-700"
                  >
                    {step.number}
                  </div>
                  <h3 className="mb-3 font-display font-bold text-xl text-fire-400">
                    {step.title}
                  </h3>
                  <p className="mb-6 text-base leading-relaxed text-steel-300">
                    {step.body}
                  </p>
                  <div className="mt-auto">
                    <span className="inline-block rounded-md bg-fire-500/10 px-3 py-1.5 font-display font-semibold text-xs uppercase tracking-wider text-fire-400">
                      {step.badge}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION C — What you get on the platform */}
        <section
          aria-labelledby="acc-platform-heading"
          className="bg-steel-900 py-24 md:py-32"
        >
          <div className="mx-auto max-w-6xl px-6">
            <p className="mb-4 font-display text-xs uppercase tracking-[0.2em] text-fire-400">
              What You Get
            </p>
            <h2
              id="acc-platform-heading"
              className="mb-16 max-w-4xl font-display font-extrabold text-3xl md:text-5xl leading-tight text-steel-100"
            >
              <span className="font-serif italic font-normal text-fire-400">
                Operator-grade infrastructure
              </span>{" "}
              for measurement-coded programs.
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

        {/* SECTION D — LP-defensibility framing */}
        <section
          aria-labelledby="acc-lp-heading"
          className="bg-steel-900 py-24 md:py-32"
        >
          <div className="mx-auto max-w-6xl px-6">
            <p className="mb-4 font-display text-xs uppercase tracking-[0.2em] text-fire-400">
              LP-Defensibility
            </p>
            <h2
              id="acc-lp-heading"
              className="mb-10 max-w-4xl font-display font-extrabold text-3xl md:text-5xl leading-tight text-steel-100"
            >
              What you can{" "}
              <span className="font-serif italic font-normal text-fire-400">
                show your LPs
              </span>
              .
            </h2>

            <div className="max-w-3xl space-y-6 text-lg leading-relaxed text-steel-200">
              <p>
                When LPs ask &ldquo;what did the program do,&rdquo; the answer
                is usually{" "}
                <span className="font-serif italic text-steel-400">
                  anecdotes
                </span>{" "}
                — alumni testimonials, demo-day photos, hand-curated success
                stories. None of that is measurement. None of it survives a
                serious diligence conversation. FNDRYx gives you the
                alternative: a{" "}
                <span className="text-fire-400">
                  numerical answer that&rsquo;s structurally defensible
                </span>{" "}
                because the methodology is transparent and the deltas are
                normalized.
              </p>
              <p>
                <span className="text-fire-400">Cohort impact score</span>.{" "}
                <span className="text-fire-400">
                  Quadrant change distribution
                </span>
                .{" "}
                <span className="text-fire-400">Dimension-level deltas</span>.
                Comparable across cohorts because the instrument is
                standardized. Defensible to LPs because the scoring is{" "}
                <span className="text-fire-400">deterministic</span> and the
                methodology is documented.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION E — Pilot engagement (concept-only) */}
        <section
          aria-labelledby="acc-pilot-heading"
          className="bg-steel-900 py-24 md:py-32"
        >
          <div className="mx-auto max-w-6xl px-6">
            <p className="mb-4 font-display text-xs uppercase tracking-[0.2em] text-fire-400">
              Pilot Engagements
            </p>
            <h2
              id="acc-pilot-heading"
              className="mb-10 max-w-4xl font-display font-extrabold text-3xl md:text-5xl leading-tight text-steel-100"
            >
              Start with{" "}
              <span className="font-serif italic font-normal text-fire-400">
                one cohort
              </span>
              . Scale from there.
            </h2>

            <div className="max-w-3xl space-y-6 text-lg leading-relaxed text-steel-200">
              <p>
                FNDRYx works with accelerators and program operators through{" "}
                <span className="text-fire-400">pilot engagements</span> —{" "}
                <span className="text-fire-400">
                  single-cohort measurement programs
                </span>{" "}
                scoped to your specific program length and cohort size. The
                pilot is positioned as a{" "}
                <span className="text-fire-400">
                  measurement engagement, not a platform license
                </span>
                . You get the full Impact Dashboard, the pre/post instrument,
                the operator portal, and the multi-organization tenancy from
                day one.
              </p>
              <p>
                After a successful pilot, the typical paths are an annual
                multi-cohort retainer for operators running multiple programs
                per year, or per-cohort engagements at a reduced rate for
                operators continuing past the pilot. Multi-location and
                enterprise options are available for accelerators operating in
                multiple cities or regions.
              </p>
              <p>
                Specific pilot terms — engagement length, cohort scope,
                scheduling — are scoped in conversation. Reach out below to
                start one.
              </p>
            </div>

            <div className="mt-10">
              <Link href={FORM_HREF} className={ctaLinkClass}>
                Start a Conversation
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
