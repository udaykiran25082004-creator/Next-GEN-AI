export function Nav() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/60 border-b border-border/60">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4"
      >
        <a href="#top" className="flex items-center gap-2 font-display text-lg font-bold tracking-tight">
          <svg width="26" height="26" viewBox="0 0 32 32" aria-hidden="true">
            <defs>
              <linearGradient id="lg" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.72 0.21 295)" />
                <stop offset="100%" stopColor="oklch(0.84 0.17 165)" />
              </linearGradient>
            </defs>
            <path
              d="M6 22 L16 4 L26 22 L20 22 L16 14 L12 22 Z"
              fill="url(#lg)"
            />
            <circle cx="16" cy="26" r="2.4" fill="oklch(0.84 0.17 165)" />
          </svg>
          <span>Nexgrid</span>
        </a>
        <ul className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
          <li><a className="hover:text-foreground transition-colors" href="#features">Features</a></li>
          <li><a className="hover:text-foreground transition-colors" href="#pricing">Pricing</a></li>
          <li><a className="hover:text-foreground transition-colors" href="#customers">Customers</a></li>
          <li><a className="hover:text-foreground transition-colors" href="#docs">Docs</a></li>
        </ul>
        <div className="flex items-center gap-2">
          <a href="#signin" className="btn-ghost text-sm">Sign in</a>
          <a href="#start" className="btn-primary text-sm">Start free</a>
        </div>
      </nav>
    </header>
  );
}
