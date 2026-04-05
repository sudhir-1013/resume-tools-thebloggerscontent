/** Decorative hero illustration — brand gradients, no external assets. */
export function ContactHeroGraphic() {
  return (
    <div
      className="relative mx-auto aspect-[4/3] w-full max-w-lg lg:max-w-none"
      aria-hidden
    >
      <svg
        viewBox="0 0 480 360"
        className="h-full w-full drop-shadow-[0_0_40px_rgba(109,40,217,0.25)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id="contact-ch-cyan"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0891b2" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient
            id="contact-ch-violet"
            x1="100%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#4c1d95" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <rect
          x="48"
          y="40"
          width="384"
          height="280"
          rx="20"
          fill="#1e293b"
          stroke="url(#contact-ch-violet)"
          strokeWidth="1.5"
          opacity="0.95"
        />
        <rect
          x="72"
          y="72"
          width="336"
          height="48"
          rx="10"
          fill="#0f172a"
          stroke="#334155"
          strokeWidth="1"
        />
        <circle cx="96" cy="96" r="10" fill="url(#contact-ch-cyan)" />
        <rect
          x="118"
          y="88"
          width="200"
          height="8"
          rx="4"
          fill="#334155"
        />
        <rect
          x="118"
          y="104"
          width="140"
          height="6"
          rx="3"
          fill="#475569"
          opacity="0.8"
        />
        <rect
          x="72"
          y="140"
          width="200"
          height="12"
          rx="6"
          fill="#334155"
        />
        <rect
          x="72"
          y="164"
          width="280"
          height="8"
          rx="4"
          fill="#475569"
          opacity="0.7"
        />
        <rect
          x="72"
          y="180"
          width="260"
          height="8"
          rx="4"
          fill="#475569"
          opacity="0.5"
        />
        <rect
          x="72"
          y="196"
          width="220"
          height="8"
          rx="4"
          fill="#475569"
          opacity="0.35"
        />
        <rect
          x="72"
          y="228"
          width="120"
          height="36"
          rx="10"
          fill="url(#contact-ch-violet)"
          opacity="0.95"
        />
        <path
          d="M320 200 L380 160 L380 248 L320 208 Z"
          fill="url(#contact-ch-cyan)"
          opacity="0.35"
        />
        <circle cx="400" cy="88" r="36" fill="url(#contact-ch-cyan)" opacity="0.2" />
        <circle cx="56" cy="288" r="28" fill="url(#contact-ch-violet)" opacity="0.25" />
      </svg>
      <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-secondary/15 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-4 -left-8 h-28 w-28 rounded-full bg-primary/20 blur-2xl" />
    </div>
  );
}
