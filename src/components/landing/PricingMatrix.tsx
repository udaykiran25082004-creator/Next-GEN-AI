import { useEffect, useLayoutEffect, useRef } from "react";

/**
 * Performance-isolated pricing matrix.
 *
 * Billing cycle and currency state live in refs — NOT React state — so no
 * component (parent or sibling) re-renders on toggle. On change we walk the
 * cached <span data-price /> refs and mutate textContent directly.
 *
 * Final price = baseUSD × currency.rate × currency.tariff × (annual ? 0.8 : 1)
 */

type Billing = "monthly" | "annual";
type CurrencyCode = "USD" | "EUR" | "INR";

const CURRENCIES: Record<
  CurrencyCode,
  { symbol: string; rate: number; tariff: number; label: string }
> = {
  USD: { symbol: "$", rate: 1, tariff: 1.0, label: "US Dollar" },
  EUR: { symbol: "€", rate: 0.92, tariff: 1.05, label: "Euro" },
  INR: { symbol: "₹", rate: 83, tariff: 0.85, label: "Indian Rupee" },
};

const ANNUAL_DISCOUNT = 0.8; // 20% off
const BILLINGS: Billing[] = ["monthly", "annual"];

type Tier = {
  id: string;
  name: string;
  baseUSD: number;
  tagline: string;
  features: string[];
  highlight?: boolean;
  cta: string;
};

const TIERS: Tier[] = [
  {
    id: "starter",
    name: "Starter",
    baseUSD: 29,
    tagline: "For solo builders shipping their first pipelines.",
    features: ["3 pipelines", "1M events / month", "Community support", "7-day lineage history"],
    cta: "Start free",
  },
  {
    id: "growth",
    name: "Growth",
    baseUSD: 99,
    tagline: "For product teams running real workloads.",
    features: [
      "Unlimited pipelines",
      "50M events / month",
      "AI copilot · 10k actions",
      "90-day lineage + audit",
      "Slack + email support",
    ],
    highlight: true,
    cta: "Start 14-day trial",
  },
  {
    id: "scale",
    name: "Scale",
    baseUSD: 299,
    tagline: "For data platforms with strict SLAs.",
    features: [
      "Multi-region runtime",
      "500M events / month",
      "Dedicated agents · 1M actions",
      "Forever lineage + SOC2",
      "Named TAM, 24/7 on-call",
    ],
    cta: "Talk to sales",
  },
];

function compute(baseUSD: number, currency: CurrencyCode, billing: Billing) {
  const c = CURRENCIES[currency];
  const monthly = baseUSD * c.rate * c.tariff;
  const final = billing === "annual" ? monthly * ANNUAL_DISCOUNT : monthly;
  const rounded =
    currency === "INR" ? Math.round(final / 10) * 10 : Math.round(final);
  return `${c.symbol}${rounded.toLocaleString()}`;
}

export function PricingMatrix() {
  // —— refs hold the canonical state. NO React re-render on toggle. ——
  const billingRef = useRef<Billing>("monthly");
  const currencyRef = useRef<CurrencyCode>("USD");

  // Cached DOM nodes we'll mutate directly.
  const priceRefs = useRef<Map<string, HTMLSpanElement>>(new Map());
  const periodRefs = useRef<HTMLSpanElement[]>([]);
  const saveBadgeRef = useRef<HTMLSpanElement | null>(null);

  // Segmented-control DOM (billing toggle).
  const billingTrackRef = useRef<HTMLDivElement | null>(null);
  const billingThumbRef = useRef<HTMLDivElement | null>(null);
  const billingBtnRefs = useRef<Record<Billing, HTMLButtonElement | null>>({
    monthly: null,
    annual: null,
  });

  // Currency select.
  const currencySelectRef = useRef<HTMLSelectElement | null>(null);

  const repaintPrices = () => {
    priceRefs.current.forEach((el, tierId) => {
      const tier = TIERS.find((t) => t.id === tierId);
      if (!tier) return;
      el.textContent = compute(tier.baseUSD, currencyRef.current, billingRef.current);
    });
    const period = billingRef.current === "annual" ? "/mo · billed yearly" : "/month";
    periodRefs.current.forEach((el) => {
      if (el) el.textContent = period;
    });
    if (saveBadgeRef.current) {
      saveBadgeRef.current.style.opacity = billingRef.current === "annual" ? "1" : "0";
    }
  };

  const moveThumb = () => {
    const btn = billingBtnRefs.current[billingRef.current];
    const track = billingTrackRef.current;
    const thumb = billingThumbRef.current;
    if (!btn || !track || !thumb) return;
    const tr = track.getBoundingClientRect();
    const br = btn.getBoundingClientRect();
    thumb.style.width = `${br.width}px`;
    thumb.style.transform = `translateX(${br.left - tr.left - 4}px)`;
  };

  const setBilling = (next: Billing) => {
    if (billingRef.current === next) return;
    billingRef.current = next;
    BILLINGS.forEach((b) => {
      const el = billingBtnRefs.current[b];
      if (el) el.setAttribute("data-active", String(b === next));
    });
    moveThumb();
    repaintPrices();
  };

  const setCurrency = (next: CurrencyCode) => {
    if (currencyRef.current === next) return;
    currencyRef.current = next;
    repaintPrices();
  };

  // Initialize positions / values on mount (no re-render).
  useLayoutEffect(() => {
    moveThumb();
    repaintPrices();
  }, []);

  useEffect(() => {
    const onResize = () => moveThumb();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <section id="pricing" className="relative mx-auto max-w-7xl px-5 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <span className="chip">Pricing</span>
        <h2 className="mt-4 font-display text-3xl md:text-5xl font-bold">
          Predictable pricing. No data-volume surprises.
        </h2>
        <p className="mt-4 text-muted-foreground">
          Switch billing cycle and currency live — the matrix recomputes from a single
          configuration source. Nothing on this page re-renders except the prices.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        {/* Billing segmented control */}
        <div ref={billingTrackRef} className="seg" role="tablist" aria-label="Billing cycle">
          <div ref={billingThumbRef} className="seg-thumb" aria-hidden="true" />
          {BILLINGS.map((b) => (
            <button
              key={b}
              ref={(el) => {
                billingBtnRefs.current[b] = el;
              }}
              type="button"
              role="tab"
              aria-selected={b === "monthly"}
              data-active={b === "monthly"}
              className="seg-btn capitalize"
              onClick={() => setBilling(b)}
            >
              {b}
            </button>
          ))}
        </div>

        <span
          ref={saveBadgeRef}
          className="chip transition-opacity duration-200"
          style={{ opacity: 0, color: "var(--color-accent)" }}
        >
          Save 20% annually
        </span>

        {/* Currency select */}
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="sr-only">Currency</span>
          <div className="relative">
            <select
              ref={currencySelectRef}
              defaultValue="USD"
              onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
              className="appearance-none rounded-full border border-border bg-[oklch(0.2_0.025_270)]/60 px-4 py-2 pr-9 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label="Display currency"
            >
              {(Object.keys(CURRENCIES) as CurrencyCode[]).map((c) => (
                <option key={c} value={c} className="bg-background">
                  {c} — {CURRENCIES[c].label}
                </option>
              ))}
            </select>
            <svg
              width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </label>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {TIERS.map((tier) => (
          <article
            key={tier.id}
            className="card-surface relative flex flex-col p-7"
            style={
              tier.highlight
                ? {
                    borderColor: "oklch(0.7 0.2 295 / 0.7)",
                    boxShadow:
                      "0 30px 80px -30px oklch(0.6 0.2 295 / 0.5), inset 0 1px 0 oklch(1 0 0 / 0.06)",
                  }
                : undefined
            }
          >
            {tier.highlight && (
              <span
                className="absolute -top-3 left-1/2 -translate-x-1/2 chip"
                style={{ background: "oklch(0.7 0.2 295)", color: "white", borderColor: "transparent" }}
              >
                Most popular
              </span>
            )}
            <header>
              <h3 className="font-display text-xl font-semibold">{tier.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{tier.tagline}</p>
            </header>

            <div className="mt-6 flex items-baseline gap-2">
              <span
                ref={(el) => {
                  if (el) priceRefs.current.set(tier.id, el);
                }}
                data-price={tier.id}
                className="font-display text-5xl font-bold tracking-tight"
                style={{
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {compute(tier.baseUSD, "USD", "monthly")}
              </span>
              <span
                ref={(el) => {
                  if (el) periodRefs.current.push(el);
                }}
                className="text-sm text-muted-foreground"
              >
                /month
              </span>
            </div>

            <ul className="mt-6 space-y-3 text-sm">
              {tier.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="mt-0.5 shrink-0 text-accent">
                    <path d="m5 12 5 5L20 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <a
              href="#start"
              className={`mt-8 ${tier.highlight ? "btn-primary" : "btn-ghost"} w-full justify-center`}
            >
              {tier.cta}
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
