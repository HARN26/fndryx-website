// G1, the signal timeline (rebuilt from deck slide 3). Inline SVG with real
// text so it stays sharp and readable by screen readers. From lg up it shows
// seven markers and faint speckles; below lg, four markers and no speckles.

const DESCRIPTION =
  "Illustration: a company timeline running from idea to pre-seed, seed and Series A. At the pre-seed stage there is no standard record, and this is where FNDRYx works. Data providers only see a company later, through signals such as a grant, a filing, a first hire, press, a seed round, team growth and a Series A.";

type Marker = { label: string; x: number; y: number };

// Desktop geometry (viewBox 1200 x 360). Positions are fixed, not random.
const AXIS_Y = 300;
const DESKTOP_MARKERS: Marker[] = [
  { label: "Grant", x: 480, y: 172 },
  { label: "Filing", x: 560, y: 228 },
  { label: "First hire", x: 660, y: 124 },
  { label: "Press", x: 762, y: 206 },
  { label: "Seed round", x: 868, y: 92 },
  { label: "Team growth", x: 976, y: 160 },
  { label: "Series A", x: 1100, y: 70 },
];

// Fixed-seed speckles, so the server and the browser draw the same pattern.
function speckles(count: number, x0: number, x1: number, y0: number, y1: number) {
  let seed = 7;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  return Array.from({ length: count }, () => ({
    x: x0 + rand() * (x1 - x0),
    y: y0 + rand() * (y1 - y0),
    r: 1 + rand() * 1.2,
    o: 0.18 + rand() * 0.35,
  }));
}
const SPECKLES = speckles(46, 430, 1170, 40, 285);

function MarkerMark({ m, axisY, labelSize }: { m: Marker; axisY: number; labelSize: number }) {
  return (
    <g>
      <line x1={m.x} y1={axisY} x2={m.x} y2={m.y} className="stroke-fire-400/60" strokeWidth={1.5} />
      <circle cx={m.x} cy={m.y} r={10} className="fill-fire-400/20" />
      <circle cx={m.x} cy={m.y} r={4.5} className="fill-fire-400" />
      <text
        x={m.x}
        y={m.y - 16}
        textAnchor="middle"
        className="fill-steel-200 font-body"
        style={{ fontSize: labelSize }}
      >
        {m.label}
      </text>
    </g>
  );
}

function Desktop() {
  return (
    <svg
      viewBox="0 0 1200 360"
      role="img"
      aria-labelledby="g1-title g1-desc"
      className="hidden h-auto w-full lg:block"
    >
      <title id="g1-title">Where the record is missing</title>
      <desc id="g1-desc">{DESCRIPTION}</desc>
      <defs>
        <radialGradient id="g1-glow" cx="70%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#F97316" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#F97316" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Lit zone: what data providers can see */}
      <rect x={410} y={16} width={774} height={330} rx={10} fill="url(#g1-glow)" />
      {SPECKLES.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r={s.r} className="fill-fire-400" opacity={s.o} />
      ))}

      {/* Dark zone: the pre-seed founder */}
      <rect
        x={16}
        y={16}
        width={376}
        height={330}
        rx={10}
        className="fill-[#070C18] stroke-steel-600"
        strokeDasharray="6 6"
        strokeWidth={1.5}
      />
      <text x={48} y={96} className="fill-steel-400 font-body font-bold" style={{ fontSize: 13, letterSpacing: "0.16em" }}>
        PRE-SEED FOUNDER
      </text>
      <text x={48} y={142} className="fill-steel-100 font-display font-bold" style={{ fontSize: 32 }}>
        No standard
      </text>
      <text x={48} y={178} className="fill-steel-100 font-display font-bold" style={{ fontSize: 32 }}>
        record
      </text>
      <circle cx={53} cy={213} r={4} className="fill-fire-400" />
      <text x={66} y={218} className="fill-fire-400 font-body font-bold" style={{ fontSize: 16 }}>
        This is where FNDRYx works
      </text>

      {/* Axis */}
      <line x1={36} y1={AXIS_Y} x2={1164} y2={AXIS_Y} className="stroke-steel-600" strokeWidth={1.5} />
      <path d={`M1164 ${AXIS_Y - 5} L1174 ${AXIS_Y} L1164 ${AXIS_Y + 5} Z`} className="fill-steel-600" />
      {[
        { label: "Idea", x: 80 },
        { label: "Pre-seed", x: 290 },
        { label: "Seed", x: 760 },
        { label: "Series A", x: 1100 },
      ].map((t) => (
        <g key={t.label}>
          <line x1={t.x} y1={AXIS_Y - 5} x2={t.x} y2={AXIS_Y + 5} className="stroke-steel-500" strokeWidth={1.5} />
          <text x={t.x} y={AXIS_Y + 30} textAnchor="middle" className="fill-steel-400 font-body" style={{ fontSize: 15 }}>
            {t.label}
          </text>
        </g>
      ))}

      {DESKTOP_MARKERS.map((m) => (
        <MarkerMark key={m.label} m={m} axisY={AXIS_Y} labelSize={16} />
      ))}
    </svg>
  );
}

// Phone geometry (viewBox 360 x 400): the dark zone on top, then the lit
// timeline with four markers. No speckles.
const M_AXIS_Y = 360;
const MOBILE_MARKERS: Marker[] = [
  { label: "Grant", x: 70, y: 262 },
  { label: "First hire", x: 150, y: 214 },
  { label: "Seed round", x: 236, y: 250 },
  { label: "Series A", x: 316, y: 196 },
];

function Mobile() {
  return (
    <svg
      viewBox="0 0 360 400"
      role="img"
      aria-labelledby="g1m-title g1m-desc"
      className="mx-auto h-auto w-full max-w-md lg:hidden"
    >
      <title id="g1m-title">Where the record is missing</title>
      <desc id="g1m-desc">{DESCRIPTION}</desc>
      <defs>
        <radialGradient id="g1m-glow" cx="60%" cy="45%" r="70%">
          <stop offset="0%" stopColor="#F97316" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#F97316" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect
        x={2}
        y={2}
        width={356}
        height={128}
        rx={8}
        className="fill-[#070C18] stroke-steel-600"
        strokeDasharray="5 5"
        strokeWidth={1.5}
      />
      <text x={20} y={34} className="fill-steel-400 font-body font-bold" style={{ fontSize: 11, letterSpacing: "0.16em" }}>
        PRE-SEED FOUNDER
      </text>
      <text x={20} y={70} className="fill-steel-100 font-display font-bold" style={{ fontSize: 24 }}>
        No standard record
      </text>
      <circle cx={24} cy={99} r={3.5} className="fill-fire-400" />
      <text x={35} y={104} className="fill-fire-400 font-body font-bold" style={{ fontSize: 13 }}>
        This is where FNDRYx works
      </text>

      <rect x={2} y={146} width={356} height={252} rx={8} fill="url(#g1m-glow)" />
      <line x1={14} y1={M_AXIS_Y} x2={340} y2={M_AXIS_Y} className="stroke-steel-600" strokeWidth={1.5} />
      <path d={`M340 ${M_AXIS_Y - 4} L348 ${M_AXIS_Y} L340 ${M_AXIS_Y + 4} Z`} className="fill-steel-600" />
      {MOBILE_MARKERS.map((m) => (
        <MarkerMark key={m.label} m={m} axisY={M_AXIS_Y} labelSize={13} />
      ))}
      {[
        { label: "Pre-seed", x: 28, anchor: "start" as const },
        { label: "Seed", x: 194, anchor: "middle" as const },
        { label: "Series A", x: 340, anchor: "end" as const },
      ].map((t) => (
        <text key={t.label} x={t.x} y={M_AXIS_Y + 26} textAnchor={t.anchor} className="fill-steel-400 font-body" style={{ fontSize: 12 }}>
          {t.label}
        </text>
      ))}
    </svg>
  );
}

export default function SignalTimeline() {
  return (
    <figure>
      <Desktop />
      <Mobile />
      <figcaption className="mt-3 text-right font-body text-footnote text-steel-400">
        Illustrative.
      </figcaption>
    </figure>
  );
}
