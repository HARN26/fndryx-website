// Why it holds (plan section 8, deck slide 11): three columns, each with a
// small diagram that carries information (G3 time, G4 consent, G5
// discipline). Moved up to follow "How it works" when the founder report
// section was removed (Kevin, Nov 2, 2026). The consent column was reworked the
// same day: it no longer mentions groups of five, and its line restates what
// the Privacy Policy already promises (named sharing is opt-in; founders can
// see who follows them). "What FNDRYx doesn't do" was removed.

const SLATE = [0x33, 0x41, 0x55];
const FIRE = [0xf9, 0x73, 0x16];
const mix = (t: number) => {
  const e = Math.pow(t, 0.8);
  const [r, g, b] = SLATE.map((c, k) => Math.round(c + (FIRE[k] - c) * e));
  return `rgb(${r}, ${g}, ${b})`;
};

// G3: two rows of 17 ticks (Year 1, Year 2), warming left to right.
function TimeMark() {
  const rows = [
    { label: "Year 1", y: 26 },
    { label: "Year 2", y: 70 },
  ];
  return (
    <svg
      viewBox="0 0 300 100"
      role="img"
      aria-label="Diagram: two rows of 17 check-ins, Year 1 and Year 2, warming in color as the record grows."
      className="h-auto w-full max-w-[300px]"
    >
      {rows.map((row, r) =>
        Array.from({ length: 17 }, (_, i) => (
          <rect
            key={`${r}-${i}`}
            x={62 + i * 13.5}
            y={row.y - 12}
            width={7}
            height={24}
            rx={1.5}
            fill={mix((r * 17 + i) / 33)}
          />
        )),
      )}
      {rows.map((row) => (
        <text
          key={row.label}
          x={0}
          y={row.y + 5}
          className="fill-steel-400 font-body"
          style={{ fontSize: 13 }}
        >
          {row.label}
        </text>
      ))}
    </svg>
  );
}

// G4: one founder (left) with lines to four organizations (right). Only the
// two the founder has opted in to are lit and connected; the others stay dim
// and unconnected. A small eye on the founder marks "can see who's following".
function ConsentMark() {
  const orgs = [
    { y: 14, on: true },
    { y: 38, on: false },
    { y: 62, on: true },
    { y: 86, on: false },
  ];
  return (
    <svg
      viewBox="0 0 300 100"
      role="img"
      aria-label="Diagram: one founder connected only to the organizations they opted in to. The others stay unconnected."
      className="h-auto w-full max-w-[300px]"
    >
      {orgs.map(({ y, on }) =>
        on ? (
          <path
            key={y}
            d={`M44 50 C 120 50, 150 ${y}, 236 ${y}`}
            fill="none"
            className="stroke-fire-400"
            strokeWidth={2}
          />
        ) : (
          <path
            key={y}
            d={`M44 50 C 120 50, 150 ${y}, 196 ${y}`}
            fill="none"
            className="stroke-steel-700"
            strokeWidth={1.5}
            strokeDasharray="3 5"
          />
        ),
      )}
      {orgs.map(({ y, on }) => (
        <rect
          key={`o${y}`}
          x={240}
          y={y - 9}
          width={52}
          height={18}
          rx={4}
          className={on ? "fill-fire-400" : "fill-steel-800 stroke-steel-700"}
          strokeWidth={on ? 0 : 1}
        />
      ))}
      <circle cx={26} cy={50} r={18} className="fill-steel-200" />
      <circle cx={26} cy={44} r={6} className="fill-steel-900" />
      <path d="M14 61 C 16 52, 36 52, 38 61 Z" className="fill-steel-900" />
    </svg>
  );
}

// G5: three stepped bars, narrowest (and the accent) at the top.
function DisciplineMark() {
  const bars = [
    { label: "Claims: independent review", width: 190, fill: "fill-fire-400", text: "fill-steel-900" },
    { label: "Product decisions", width: 240, fill: "fill-steel-700", text: "fill-steel-100" },
    { label: "Fixes: automated tests", width: 290, fill: "fill-steel-800", text: "fill-steel-200" },
  ];
  return (
    <svg
      viewBox="0 0 300 100"
      role="img"
      aria-label="Diagram: three levels of review. Fixes go through automated tests, product decisions are reviewed, and claims need independent review."
      className="h-auto w-full max-w-[300px]"
    >
      {bars.map((bar, i) => {
        const x = (300 - bar.width) / 2;
        const y = 4 + i * 33;
        return (
          <g key={bar.label}>
            <rect x={x} y={y} width={bar.width} height={27} rx={4} className={bar.fill} />
            <text
              x={150}
              y={y + 18}
              textAnchor="middle"
              className={`${bar.text} font-body font-bold`}
              style={{ fontSize: 12.5 }}
            >
              {bar.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

const PILLARS = [
  {
    title: "Time",
    body: "Every month of founder check-ins is a month no one else can recreate.",
    Mark: TimeMark,
  },
  {
    title: "Consent",
    body: "Founders decide who sees their record. Nothing with their name on it is shared until they opt in, and they can always see who's following.",
    Mark: ConsentMark,
  },
  {
    title: "Discipline",
    body: "We make no predictive claims. Any future claim has to clear independent review first.",
    Mark: DisciplineMark,
  },
];

export default function WhyItHolds() {
  return (
    <section
      id="why-it-holds"
      aria-labelledby="why-heading"
      className="bg-steel-950 py-20 md:py-28"
    >
      <div className="mx-auto max-w-content px-4 md:px-6">
        <h2
          id="why-heading"
          className="max-w-3xl font-display text-h2 font-bold text-steel-100"
        >
          Software can be copied. Time, consent, and discipline can&apos;t.
        </h2>

        <div className="mt-12 grid gap-12 md:mt-16 md:grid-cols-3 md:gap-0 md:divide-x md:divide-steel-800">
          {PILLARS.map(({ title, body, Mark }) => (
            <div key={title} className="md:px-8 md:first:pl-0 md:last:pr-0">
              <div className="flex h-28 items-center">
                <Mark />
              </div>
              <h3 className="mt-6 font-display text-h3 font-bold text-steel-100">
                {title}
              </h3>
              <p className="mt-3 font-body text-body text-steel-300">{body}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
