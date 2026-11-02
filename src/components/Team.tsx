import Image from "next/image";

// Team (plan section 9): two founders side by side with square photos in
// natural color. Patrick approved his bio on Nov 2, 2026. Advisors, counsel
// and the measurement scientist stay off the site.
//
// The source photos are 280px (Kevin) and 220px (Patrick), so they show at
// 144px to stay sharp on high-density screens. Swap in larger files to go to
// the plan's 160px.

const PEOPLE = [
  {
    name: "Kevin Harnist",
    title: "CEO & Co-Founder",
    bio: "CME compliance and derivatives markets. The exchange-infrastructure background behind FNDRYx.",
    photo: { src: "/images/team/kevin-harnist.jpg", width: 280, height: 280 },
  },
  {
    name: "Patrick Tiettmeyer",
    title: "Co-Founder & COO",
    bio: "Leads partnerships and sales, working directly with founders, programs and ecosystem partners.",
    photo: { src: "/images/team/patrick-tiettmeyer.jpg", width: 220, height: 220 },
  },
];

export default function Team() {
  return (
    <section
      id="team"
      aria-labelledby="team-heading"
      className="bg-steel-950 py-20 md:py-28"
    >
      <div className="mx-auto max-w-content px-4 md:px-6">
        <p className="section-label">The team</p>
        <h2
          id="team-heading"
          className="mt-4 max-w-3xl font-display text-h2 font-bold text-steel-100"
        >
          Exchange discipline, applied to founder readiness.
        </h2>

        <ul className="mt-12 grid gap-12 md:mt-16 md:grid-cols-2 md:gap-10">
          {PEOPLE.map((p) => (
            <li key={p.name} className="flex flex-col gap-6 sm:flex-row sm:items-start">
              <Image
                src={p.photo.src}
                alt={`Portrait of ${p.name}`}
                width={p.photo.width}
                height={p.photo.height}
                sizes="144px"
                className="h-36 w-36 shrink-0 rounded-md object-cover"
              />
              <div>
                <h3 className="font-display text-h3 font-bold text-steel-100">
                  {p.name}
                </h3>
                <p className="mt-1 font-body text-sm font-bold uppercase tracking-[0.12em] text-fire-400">
                  {p.title}
                </p>
                <p className="mt-3 max-w-sm font-body text-body text-steel-300">
                  {p.bio}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-12 font-body text-base text-steel-400">
          Based in Covington, Kentucky.
        </p>
      </div>
    </section>
  );
}
