// Why it holds (plan section 8, deck slide 11): three columns, each with a
// small diagram that carries information (G3 time, G4 consent, G5
// discipline), then a short, plain list of what FNDRYx doesn't do. The
// consent line was cleared by counsel (Jake) on Nov 2, 2026.

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

// G4: five dots merging into a block labeled "5+".
function ConsentMark() {
  const ys = [14, 32, 50, 68, 86];
  return (
    <svg
      viewBox="0 0 300 100"
      role="img"
      aria-label="Diagram: five individual founders merge into one combined block labeled 5 plus. Nothing is reported for groups smaller than five."
      className="h-auto w-full max-w-[300px]"
    >
      {ys.map((y) => (
        <g key={y}>
          <path
            d={`M24 ${y} C 110 ${y}, 120 50, 196 50`}
            fill="none"
            className="stroke-steel-600"
            strokeWidth={1.5}
          />
          <circle cx={18} cy={y} r={6} className="fill-steel-300" />
        </g>
      ))}
      <rect x={196} y={26} width={72} height={48} rx={6} className="fill-fire-400" />
      <text
        x={232}
        y={57}
        textAnchor="middle"
        className="fill-steel-900 font-display font-bold"
        style={{ fontSize: 22 }}
      >
        5+
      </text>
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
    body: "Founders opt in. We don't report any group smaller than five founders.",
    Mark: ConsentMark,
  },
  {
    title: "Discipline",
    body: "We make no predictive claims. Any future claim has to clear independent review first.",
    Mark: DisciplineMark,
  },
];

const DOESNT_DO = [
  "We don't guarantee meetings, introductions or capital.",
  "We don't rank founders.",
  "We're not a broker-dealer or investment adviser, and we don't arrange investments.",
];

export default function WhyItHolds() {
  return (
    <section
      id="why-it-holds"
      aria-labelledby="why-heading"
      className="bg-steel-900 py-20 md:py-28"
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

        <div className="mt-16 border-t border-steel-800 pt-10 md:mt-20">
          <h3 className="font-display text-h3 font-bold text-steel-100">
            What FNDRYx doesn&apos;t do
          </h3>
          <ul className="mt-4 max-w-3xl space-y-2 font-body text-body text-steel-300">
            {DOESNT_DO.map((line) => (
              <li key={line} className="flex gap-3">
                <span aria-hidden="true" className="mt-[0.7em] h-1 w-3 shrink-0 bg-steel-600" />
                {line}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
