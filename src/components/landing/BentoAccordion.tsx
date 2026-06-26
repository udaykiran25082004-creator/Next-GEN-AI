import { useEffect, useState, type ReactNode } from "react";

// Zero-dependency Bento ↔ Accordion. Native CSS only.
// State persists across breakpoint: the active index that was hovered on
// desktop is the panel that opens on mobile (and vice versa).

type Feature = {
  id: string;
  title: string;
  blurb: string;
  body: string;
  icon: (p: { className?: string }) => ReactNode;
  span?: string;
};

const Bolt = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
    <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);
const Brain = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
    <path d="M8 4a3 3 0 0 0-3 3v1a3 3 0 0 0-2 3 3 3 0 0 0 2 3v1a3 3 0 0 0 3 3h1V4H8Zm8 0a3 3 0 0 1 3 3v1a3 3 0 0 1 2 3 3 3 0 0 1-2 3v1a3 3 0 0 1-3 3h-1V4h1Z" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);
const Shield = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
    <path d="M12 3 4 6v6c0 4.5 3.4 8.4 8 9 4.6-.6 8-4.5 8-9V6l-8-3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const Graph = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
    <circle cx="6" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="18" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="18" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="m7.6 7.7 3 8.6M16.4 7.7l-3 8.6M8.5 6h7" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);
const Code = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
    <path d="m9 8-5 4 5 4m6-8 5 4-5 4M13 5l-2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const Stack = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
    <path d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

const FEATURES: Feature[] = [
  {
    id: "agents",
    title: "Self-healing agents",
    blurb: "Pipelines that repair themselves on schema drift.",
    body:
      "When upstream contracts shift, Nexgrid agents detect, isolate, and patch broken transforms in flight. Average MTTR drops from hours to seconds — no on-call required.",
    icon: Brain,
    span: "md:col-span-2 md:row-span-2",
  },
  {
    id: "speed",
    title: "Sub-50ms ingest",
    blurb: "Edge ingestion at wire speed.",
    body: "A globally distributed ingest plane batches and signs events at the edge, then streams them to your warehouse with end-to-end P95 under 50ms.",
    icon: Bolt,
  },
  {
    id: "lineage",
    title: "Living lineage",
    blurb: "Column-level lineage across every model.",
    body: "Trace any field back to its origin event. Diff lineage across deploys. Subscribe to upstream changes from a column you depend on.",
    icon: Graph,
  },
  {
    id: "governance",
    title: "Built-in governance",
    blurb: "PII vaulting, audit trails, SOC2.",
    body: "Role-scoped column masking, regional data residency, immutable audit log — shipped as defaults, not add-ons.",
    icon: Shield,
    span: "md:col-span-2",
  },
  {
    id: "sdk",
    title: "Typed SDKs",
    blurb: "Native TS, Python, Go, Rust.",
    body: "Generate fully-typed clients from your live schema. Zero drift between the warehouse and the application layer.",
    icon: Code,
  },
  {
    id: "stack",
    title: "Composable runtime",
    blurb: "Bring your warehouse, bring your model.",
    body: "Plug into Snowflake, BigQuery, Databricks or Postgres. Swap models per-step. Deploy on our cloud or self-host on Kubernetes.",
    icon: Stack,
  },
];

export function BentoAccordion() {
  const [active, setActive] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Track viewport via matchMedia — no listeners on every scroll/resize tick.
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    const apply = () => setIsMobile(mql.matches);
    apply();
    mql.addEventListener("change", apply);
    return () => mql.removeEventListener("change", apply);
  }, []);

  return (
    <section id="features" className="relative mx-auto max-w-7xl px-5 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <span className="chip">Platform</span>
        <h2 className="mt-4 font-display text-3xl md:text-5xl font-bold">
          One runtime. Every data surface.
        </h2>
        <p className="mt-4 text-muted-foreground">
          Hover a tile on desktop, or tap on mobile. The same context follows you across viewports.
        </p>
      </div>

      {isMobile ? (
        <AccordionView active={active} setActive={setActive} />
      ) : (
        <BentoView active={active} setActive={setActive} />
      )}
    </section>
  );
}

function BentoView({
  active,
  setActive,
}: {
  active: string | null;
  setActive: (id: string | null) => void;
}) {
  return (
    <div className="mt-12 grid grid-cols-1 md:grid-cols-4 md:auto-rows-[160px] gap-4">
      {FEATURES.map((f) => (
        <article
          key={f.id}
          className={`bento-card ${f.span ?? ""}`}
          data-active={active === f.id || undefined}
          onMouseEnter={() => setActive(f.id)}
          onMouseLeave={() => setActive(active === f.id ? null : active)}
          onFocus={() => setActive(f.id)}
          onMouseMove={(e) => {
            const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
            (e.currentTarget as HTMLElement).style.setProperty(
              "--mx",
              `${e.clientX - r.left}px`,
            );
            (e.currentTarget as HTMLElement).style.setProperty(
              "--my",
              `${e.clientY - r.top}px`,
            );
          }}
          tabIndex={0}
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-[oklch(0.22_0.03_270)]/60 text-accent">
                <f.icon className="h-5 w-5" />
              </span>
              <h3 className="font-display text-lg font-semibold">{f.title}</h3>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{f.blurb}</p>
            <p
              className="mt-auto text-sm text-foreground/80 transition-opacity duration-200"
              style={{ opacity: active === f.id ? 1 : 0.0 }}
            >
              {f.body}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}

function AccordionView({
  active,
  setActive,
}: {
  active: string | null;
  setActive: (id: string | null) => void;
}) {
  return (
    <div className="mt-10 divide-y divide-border rounded-2xl border border-border bg-[oklch(0.2_0.025_270)]/60 backdrop-blur">
      {FEATURES.map((f) => {
        const open = active === f.id;
        return (
          <div key={f.id}>
            <button
              type="button"
              aria-expanded={open}
              aria-controls={`panel-${f.id}`}
              onClick={() => setActive(open ? null : f.id)}
              className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-[oklch(0.24_0.03_270)]/40"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border text-accent">
                <f.icon className="h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-display font-semibold">{f.title}</span>
                <span className="block text-xs text-muted-foreground truncate">{f.blurb}</span>
              </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="shrink-0 transition-transform duration-200"
                style={{ transform: open ? "rotate(180deg)" : "rotate(0)" }}
              >
                <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div id={`panel-${f.id}`} role="region" className="acc-panel" data-open={open}>
              <div>
                <p className="px-5 pb-5 text-sm text-muted-foreground">{f.body}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
