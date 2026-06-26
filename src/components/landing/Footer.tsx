export function Footer() {
  return (
    <footer className="border-t border-border/60 mt-10">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-display text-lg font-bold">
            <svg width="22" height="22" viewBox="0 0 32 32" aria-hidden="true">
              <path d="M6 22 L16 4 L26 22 L20 22 L16 14 L12 22 Z" fill="oklch(0.72 0.21 295)" />
            </svg>
            Nexgrid
          </div>
          <p className="mt-3 text-sm text-muted-foreground max-w-xs">
            The AI data automation platform for teams that ship.
          </p>
        </div>
        {[
          { h: "Product", l: ["Features", "Pricing", "Changelog", "Roadmap"] },
          { h: "Developers", l: ["Docs", "API reference", "SDKs", "Status"] },
          { h: "Company", l: ["About", "Customers", "Careers", "Contact"] },
        ].map((c) => (
          <div key={c.h}>
            <h3 className="font-display text-sm font-semibold">{c.h}</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {c.l.map((i) => (
                <li key={i}>
                  <a href="#" className="hover:text-foreground transition-colors">{i}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Nexgrid Systems, Inc.</p>
          <p>Built for the Next-Gen AI Platform Speed Run.</p>
        </div>
      </div>
    </footer>
  );
}
