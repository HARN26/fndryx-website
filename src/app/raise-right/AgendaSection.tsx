"use client";

import { useEffect, useState } from "react";

type AgendaRow = {
  time: string;
  /** 24h "HH:MM" wall-clock in Eastern Time on the event date. */
  start: string;
  end: string;
  room?: string;
  title: string;
  /** Secondary title line rendered just beneath the title (e.g. a keynote sub-theme). */
  subtitle?: string;
  /** When set, the title renders as an in-page anchor link (e.g. "#breakouts"). */
  titleHref?: string;
  body?: string;
};

type AgendaSession = {
  label: string;
  theme: string;
  mc?: string;
  rows: AgendaRow[];
};

// The schedule is fixed to June 10, 2026. That date falls during U.S. daylight
// saving time, so America/Indiana/Indianapolis (Eastern) is UTC-04:00. Anchoring
// each start/end to that offset yields an absolute instant we can compare against
// the device clock regardless of the visitor's local timezone.
const EVENT_DATE = "2026-06-10";
const ET_OFFSET = "-04:00";
const toMs = (t: string) =>
  new Date(`${EVENT_DATE}T${t}:00${ET_OFFSET}`).getTime();

const EVENT_START = toMs("09:00");
const EVENT_END = toMs("17:00");

type RowState = "normal" | "active" | "past";

function getRowState(row: AgendaRow, now: number | null): RowState {
  // SSR + pre-hydration: everything renders in its default, full-strength state.
  if (now === null) return "normal";
  // Before the event opens or after it wraps, nothing is highlighted or dimmed.
  if (now < EVENT_START || now >= EVENT_END) return "normal";

  const start = toMs(row.start);
  const end = toMs(row.end);
  if (now >= start && now < end) return "active";
  if (now >= end) return "past";
  return "normal";
}

const agenda: AgendaSession[] = [
  {
    label: "Morning Session:",
    theme: "Foundation & Vision",
    mc: "MC: David Bolling",
    rows: [
      {
        time: "9:00–10:00 AM",
        start: "09:00",
        end: "10:00",
        room: "Bistro",
        title: "VIP Fireside Chat & Breakfast",
        body: "Featuring Chris Heivly — MapQuest co-founder and author/CEO of Build the Fort. Moderated by Ashley Bryan. Open to the first 40 registrants + VIPs.",
      },
      {
        time: "9:00–10:00 AM",
        start: "09:00",
        end: "10:00",
        room: "Theater Entrance",
        title: "General Registration & Networking",
      },
      {
        time: "10:15–10:20 AM",
        start: "10:15",
        end: "10:20",
        room: "Theater",
        title: "Welcome Remarks",
        body: "David Bolling",
      },
      {
        time: "10:20–10:25 AM",
        start: "10:20",
        end: "10:25",
        room: "Theater",
        title: "Indiana's Innovation Infrastructure",
        body: "Mayor Scott Fadness",
      },
      {
        time: "10:25–11:15 AM",
        start: "10:25",
        end: "11:15",
        room: "Theater",
        title: "Panel 1: How to Build an Ecosystem that Attracts Capital",
        body: "Moderated by John Wechsler, CEO, SpokeNote",
      },
      {
        time: "11:15–11:25 AM",
        start: "11:15",
        end: "11:25",
        title: "Morning Networking Break",
      },
    ],
  },
  {
    label: "Mid-Day Session:",
    theme: "Strategy & The Capital Stack",
    mc: "MC: David Bolling",
    rows: [
      {
        time: "11:27–11:30 AM",
        start: "11:27",
        end: "11:30",
        room: "Theater",
        title: "Introduction of Chris Heivly",
        body: "Introduced by Casey Bolsega",
      },
      {
        time: "11:30 AM–12:10 PM",
        start: "11:30",
        end: "12:10",
        room: "Theater",
        title: 'Keynote: "Today\'s Startup Community Leadership"',
        subtitle: "Founders, Startups & Ecosystems",
        body: "Chris Heivly",
      },
      {
        time: "12:10–12:20 PM",
        start: "12:10",
        end: "12:20",
        room: "Theater",
        title: "The New Cap Stack: The Right Investment at the Right Time",
        body: "Steve Iskander, Intrepid Finance",
      },
      {
        time: "12:20–1:05 PM",
        start: "12:20",
        end: "13:05",
        room: "Theater",
        title: "Panel 2: Navigating the Capital Stack — Finding the Right Funding",
      },
      {
        time: "1:05–1:45 PM",
        start: "13:05",
        end: "13:45",
        room: "Bistro / Main Area",
        title: "Networking Lunch",
      },
    ],
  },
  {
    label: "Afternoon Session:",
    theme: "Execution & Action",
    rows: [
      {
        time: "1:45–2:00 PM",
        start: "13:45",
        end: "14:00",
        room: "Theater",
        title: "Dreamfuel: Mental Performance for Founders",
        body: "Quick, high-impact tactical wellness workshop for entrepreneurs.",
      },
      {
        time: "2:00–3:15 PM",
        start: "14:00",
        end: "15:15",
        title: "Breakout Sessions & Roundtables",
        titleHref: "#breakouts",
        body: "Five tracks across five rooms — see Breakouts section below for details and moderators.",
      },
      {
        time: "3:20–4:00 PM",
        start: "15:20",
        end: "16:00",
        room: "Theater",
        title: "Fast-Track Reverse Pitches",
        body: "11 capital investors. Strict 3-minute pitch + 1-minute transition.",
      },
      {
        time: "4:00–5:00 PM",
        start: "16:00",
        end: "17:00",
        room: "Rise Area",
        title: "Networking Happy Hour",
      },
    ],
  },
];

const roomPill =
  "inline-flex items-center rounded-full bg-fire-700 px-2.5 py-1 font-display text-[0.65rem] font-semibold uppercase tracking-wider text-white";

function RoomPill({ room }: { room: string }) {
  return <span className={roomPill}>{room}</span>;
}

function AgendaRowItem({ row, state }: { row: AgendaRow; state: RowState }) {
  const isActive = state === "active";
  const isPast = state === "past";

  const container = [
    "relative rounded-xl border border-steel-700/60 bg-steel-800/30 p-5 transition-all duration-300 md:p-6",
    isActive
      ? "border-l-[3px] border-l-fire-400 bg-steel-800 shadow-[0_0_24px_rgba(249,115,22,0.18)]"
      : "border-l-2 border-l-steel-700",
    isPast ? "opacity-45" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const timeColor = isPast ? "text-steel-400" : "text-fire-400";
  const titleColor = isPast ? "text-steel-400" : "text-steel-100";
  const bodyColor = isPast ? "text-steel-400" : "text-steel-200";

  return (
    <li className={container}>
      {isActive && (
        <span className="absolute -top-3 left-5 inline-flex animate-pulse items-center rounded-full bg-fire-500 px-3 py-1 font-display text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white shadow-[0_0_16px_rgba(249,115,22,0.5)]">
          Happening Now
        </span>
      )}

      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span
          className={`font-display text-lg font-bold tracking-wide ${timeColor}`}
        >
          {row.time}
        </span>
        {row.room && <RoomPill room={row.room} />}
      </div>

      <h4
        className={`mt-2 font-display text-xl font-semibold leading-snug ${titleColor}`}
      >
        {row.titleHref ? (
          <a
            href={row.titleHref}
            className="underline decoration-fire-400/50 decoration-1 underline-offset-4 transition-colors hover:text-fire-400 hover:decoration-fire-400 focus:outline-none focus-visible:text-fire-400"
          >
            {row.title}
          </a>
        ) : (
          row.title
        )}
      </h4>

      {row.subtitle && (
        <p
          className={`mt-1 font-display text-base font-medium leading-snug ${titleColor}`}
        >
          {row.subtitle}
        </p>
      )}

      {row.body && (
        <p className={`mt-2 text-base leading-relaxed ${bodyColor}`}>
          {row.body}
        </p>
      )}
    </li>
  );
}

export function AgendaSection() {
  // `null` until the client mounts, so the server render and first client render
  // match (all rows "normal") — then the tick drives highlight/dimming.
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      aria-labelledby="rr-agenda-heading"
      className="bg-steel-900 py-10 md:pb-16 md:pt-6"
    >
      <div className="mx-auto max-w-4xl px-6">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-fire-400">
          Agenda
        </p>
        <h2
          id="rr-agenda-heading"
          className="mt-3 font-display text-3xl font-extrabold leading-tight text-steel-100 md:text-4xl"
        >
          One day, <span className="text-fire-400">end</span> to{" "}
          <span className="text-fire-400">end</span>.
        </h2>

        <div className="mt-10 space-y-12">
          {agenda.map((session) => (
            <div key={session.label}>
              <div className="border-b border-steel-700 pb-3">
                <h3 className="font-display text-lg font-bold uppercase tracking-wide text-steel-100 md:text-xl">
                  {session.label}{" "}
                  <span className="text-fire-400">{session.theme}</span>
                </h3>
                {session.mc && (
                  <p className="mt-1 font-body text-sm text-steel-400">
                    {session.mc}
                  </p>
                )}
              </div>

              <ol className="mt-5 space-y-4">
                {session.rows.map((row, i) => (
                  <AgendaRowItem
                    key={i}
                    row={row}
                    state={getRowState(row, now)}
                  />
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
