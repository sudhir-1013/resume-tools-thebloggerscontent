/** Hero illustration — career lift, document stack, brand gradients. */
export function AboutHeroGraphic() {
  return (
    <div
      className="relative mx-auto aspect-[5/4] w-full max-w-md lg:max-w-none lg:aspect-[4/3]"
      aria-hidden
    >
      <svg
        viewBox="0 0 440 360"
        className="h-full w-full drop-shadow-[0_0_48px_rgba(34,211,238,0.12)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="ab-grad-v" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#4c1d95" stopOpacity="0.45" />
          </linearGradient>
          <linearGradient id="ab-grad-c" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0891b2" stopOpacity="0.35" />
          </linearGradient>
        </defs>
        <ellipse
          cx="220"
          cy="300"
          rx="160"
          ry="28"
          fill="url(#ab-grad-v)"
          opacity="0.15"
        />
        <path
          d="M120 260 L220 100 L320 260"
          stroke="url(#ab-grad-c)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.5"
        />
        <rect
          x="88"
          y="200"
          width="112"
          height="140"
          rx="12"
          fill="#1e293b"
          stroke="#334155"
          strokeWidth="1.5"
          transform="rotate(-8 144 270)"
        />
        <rect
          x="164"
          y="168"
          width="112"
          height="140"
          rx="12"
          fill="#1e293b"
          stroke="url(#ab-grad-v)"
          strokeWidth="1.5"
        />
        <rect
          x="240"
          y="200"
          width="112"
          height="140"
          rx="12"
          fill="#1e293b"
          stroke="#334155"
          strokeWidth="1.5"
          transform="rotate(8 296 270)"
        />
        <rect x="188" y="188" width="64" height="8" rx="4" fill="#475569" />
        <rect x="188" y="204" width="48" height="6" rx="3" fill="#64748b" />
        <rect x="188" y="218" width="72" height="6" rx="3" fill="#64748b" />
        <circle cx="290" cy="120" r="36" fill="url(#ab-grad-c)" opacity="0.25" />
        <circle cx="130" cy="88" r="22" fill="url(#ab-grad-v)" opacity="0.35" />
        <path
          d="M210 132 L218 148 L238 122"
          stroke="url(#ab-grad-c)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="224" cy="136" r="20" stroke="url(#ab-grad-c)" strokeWidth="2" />
      </svg>
      <div className="pointer-events-none absolute right-0 top-1/4 h-32 w-32 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-8 left-0 h-36 w-36 rounded-full bg-secondary/15 blur-3xl" />
    </div>
  );
}
