const LOGOS = ["Loomstack", "Helix", "Northwind", "Vantara", "Quill", "Mercato", "Orbit", "Forge"];

const TESTIMONIALS = [
  {
    quote:
      "We cut our data team's on-call pages by 86% in the first month. The agents fix what we used to wake up for.",
    name: "Priya Raman",
    role: "Head of Data, Loomstack",
  },
  {
    quote:
      "Migrating from our home-grown stack to Nexgrid was a weekend. Lineage alone paid for the contract.",
    name: "Marcus Hale",
    role: "Staff Engineer, Helix",
  },
  {
    quote:
      "The pricing matrix is honest. We modelled 5× our event volume and still came in under our previous bill.",
    name: "Sofia Albrecht",
    role: "VP Platform, Vantara",
  },
];

export function SocialProof() {
  return (
    <section id="customers" className="relative mx-auto max-w-7xl px-5 py-24">
      <p className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
        Trusted by data teams at
      </p>
      <div className="mt-6 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]">
        <div className="marquee-track">
          {[...LOGOS, ...LOGOS].map((name, i) => (
            <span
              key={i}
              className="font-display text-2xl font-semibold tracking-tight text-muted-foreground/80"
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-20 grid gap-5 md:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <figure key={t.name} className="card-surface p-7">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-accent">
              <path d="M9 7H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2v2a4 4 0 0 1-4 4M19 7h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2v2a4 4 0 0 1-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <blockquote className="mt-4 text-[15px] leading-relaxed text-foreground/90">
              "{t.quote}"
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              <span
                aria-hidden="true"
                className="grid h-9 w-9 place-items-center rounded-full font-display text-sm font-bold"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.72 0.21 295), oklch(0.84 0.17 165))",
                  color: "white",
                }}
              >
                {t.name.split(" ").map((n) => n[0]).join("")}
              </span>
              <span className="text-sm">
                <span className="block font-medium">{t.name}</span>
                <span className="block text-muted-foreground">{t.role}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
