export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0 grid-bg pointer-events-none" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 pt-20 pb-24 md:pt-28 md:pb-32 text-center">
        <span className="chip rise">
          <span className="h-1.5 w-1.5 rounded-full glow-dot" />
          New · Realtime Agent Orchestration v3
        </span>

        <h1 className="rise rise-1 mx-auto mt-6 max-w-4xl font-display text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.05]">
          Data automation,{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(120deg, oklch(0.84 0.17 165), oklch(0.72 0.21 295) 60%, oklch(0.78 0.18 30))",
            }}
          >
            engineered by agents.
          </span>
        </h1>

        <p className="rise rise-2 mx-auto mt-6 max-w-2xl text-base md:text-lg text-muted-foreground">
          Nexgrid turns raw event streams into governed, query-ready models in minutes —
          with self-healing pipelines, lineage, and an AI copilot trained on your schema.
        </p>

        <div className="rise rise-3 mt-9 flex flex-wrap items-center justify-center gap-3">
          <a href="#start" className="btn-primary">
            Start building free
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="#demo" className="btn-ghost">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
            Watch 90s demo
          </a>
        </div>

        <div className="rise rise-4 mx-auto mt-16 max-w-5xl">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="card-surface relative p-3 md:p-4 shadow-[0_40px_120px_-30px_oklch(0.5_0.2_295/0.5)]">
      <div className="flex items-center gap-1.5 px-2 pb-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.7_0.15_25)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.78_0.15_85)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.78_0.17_150)]" />
        <span className="ml-3 text-xs text-muted-foreground font-mono">nexgrid › pipelines › orders_clean</span>
      </div>
      <div className="grid md:grid-cols-[1fr_1.4fr] gap-3 rounded-2xl bg-[oklch(0.14_0.02_270)] p-3">
        <pre className="text-[11px] md:text-xs leading-relaxed font-mono text-muted-foreground overflow-hidden rounded-xl bg-[oklch(0.18_0.025_270)] p-4">
{`pipeline "orders_clean" {
  source  = stream.kafka("orders.raw")
  agent   = ai.copilot("normalize:v3")

  step "dedupe"  { key = ["order_id"] }
  step "enrich"  { join = "users on user_id" }
  step "score"   { model = "fraud.lgbm@4" }

  sink    = warehouse.snowflake("orders")
  on_drift -> agent.repair()
}`}
        </pre>
        <div className="rounded-xl bg-[oklch(0.18_0.025_270)] p-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Throughput</span>
            <span className="text-foreground font-mono">128.4k <span className="text-accent">ev/s</span></span>
          </div>
          <div className="mt-3 grid grid-cols-12 gap-1 h-32 items-end">
            {[42, 58, 71, 65, 80, 92, 76, 88, 95, 83, 99, 90].map((h, i) => (
              <div
                key={i}
                className="rounded-t-md"
                style={{
                  height: `${h}%`,
                  background: `linear-gradient(180deg, oklch(0.72 0.21 295), oklch(0.84 0.17 165))`,
                  opacity: 0.4 + (i / 24),
                }}
              />
            ))}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3 text-center">
            {[
              { k: "P95", v: "42ms" },
              { k: "Uptime", v: "99.99%" },
              { k: "Models", v: "12" },
            ].map((s) => (
              <div key={s.k} className="rounded-lg border border-border bg-[oklch(0.22_0.03_270)]/60 py-2">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.k}</div>
                <div className="font-mono text-sm">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
