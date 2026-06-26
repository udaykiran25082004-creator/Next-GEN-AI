export function CTA() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-20">
      <div className="card-surface relative overflow-hidden px-8 py-14 md:px-16 md:py-20 text-center">
        <div
          className="absolute inset-0 opacity-70 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(600px 200px at 50% 0%, oklch(0.7 0.2 295 / 0.35), transparent 70%)",
          }}
        />
        <h2 className="relative font-display text-3xl md:text-5xl font-bold">
          Ship your first pipeline before your coffee gets cold.
        </h2>
        <p className="relative mx-auto mt-4 max-w-xl text-muted-foreground">
          Free tier, no credit card. Bring your warehouse, keep your code.
        </p>
        <div className="relative mt-8 flex flex-wrap justify-center gap-3">
          <a href="#start" className="btn-primary">Start free</a>
          <a href="#docs" className="btn-ghost">Read the docs</a>
        </div>
      </div>
    </section>
  );
}
