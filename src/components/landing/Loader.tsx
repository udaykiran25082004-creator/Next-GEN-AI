// Pure CSS loader. ≤ 500ms total (220ms hold + 280ms fade).
// Pointer-events: none after fade so it never blocks TTI.
export function Loader() {
  return (
    <div className="loader-overlay" aria-hidden="true" style={{ pointerEvents: "none" }}>
      <svg width="56" height="56" viewBox="0 0 32 32" aria-hidden="true">
        <defs>
          <linearGradient id="loadg" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.72 0.21 295)" />
            <stop offset="100%" stopColor="oklch(0.84 0.17 165)" />
          </linearGradient>
        </defs>
        <path d="M6 22 L16 4 L26 22 L20 22 L16 14 L12 22 Z" fill="url(#loadg)">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="0.8s" repeatCount="indefinite" />
        </path>
      </svg>
    </div>
  );
}
