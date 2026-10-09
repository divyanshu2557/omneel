type P = { className?: string; size?: number };

const base = (size = 18) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

export function Mark({ className = "", size = 30 }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className}>
      <rect
        x="4.5"
        y="4.5"
        width="31"
        height="31"
        rx="9"
        stroke="currentColor"
        strokeWidth="1.6"
        opacity="0.9"
      />
      <rect
        x="11"
        y="11"
        width="18"
        height="18"
        rx="5"
        stroke="#3D57F0"
        strokeWidth="1.4"
        transform="rotate(45 20 20)"
      />
      <circle cx="20" cy="20" r="3.5" fill="#E0A21B" />
      <path
        d="M20 4.5v6M20 29.5v6M4.5 20h6M29.5 20h6"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.4"
      />
    </svg>
  );
}

export const IconIntent = ({ className, size }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M13 2 4.5 13.5H11L9.5 22 19 10h-6.5L13 2Z" />
  </svg>
);

export const IconCode = ({ className, size }: P) => (
  <svg {...base(size)} className={className}>
    <path d="m8.5 8-4.5 4 4.5 4M15.5 8l4.5 4-4.5 4M13.5 5l-3 14" />
  </svg>
);

export const IconOS = ({ className, size }: P) => (
  <svg {...base(size)} className={className}>
    <rect x="3" y="4" width="18" height="12" rx="2" />
    <path d="M8 20h8M12 16v4M6.5 8h4M6.5 11.5h7" />
  </svg>
);

export const IconMesh = ({ className, size }: P) => (
  <svg {...base(size)} className={className}>
    <circle cx="12" cy="5" r="2.2" />
    <circle cx="5" cy="18" r="2.2" />
    <circle cx="19" cy="18" r="2.2" />
    <path d="M10.6 6.9 6.4 16M13.4 6.9 17.6 16M7.2 18h9.6" />
  </svg>
);

export const IconKnowledge = ({ className, size }: P) => (
  <svg {...base(size)} className={className}>
    <ellipse cx="12" cy="6" rx="7.5" ry="3" />
    <path d="M4.5 6v12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V6M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3" />
  </svg>
);

export const IconShield = ({ className, size }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M12 3 5 6v6c0 4.2 2.9 7.7 7 9 4.1-1.3 7-4.8 7-9V6l-7-3Z" />
    <path d="m9.2 12 2 2 3.6-3.8" />
  </svg>
);

export const IconArrow = ({ className, size }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const IconArrowUpRight = ({ className, size }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M7 17 17 7M8.5 7H17v8.5" />
  </svg>
);

export const IconCheck = ({ className, size }: P) => (
  <svg {...base(size)} className={className}>
    <path d="m4.5 12.5 5 5L19.5 6.5" />
  </svg>
);

export const IconTerminal = ({ className, size }: P) => (
  <svg {...base(size)} className={className}>
    <rect x="2.5" y="4" width="19" height="16" rx="2.5" />
    <path d="m7 9.5 2.8 2.7L7 15M12.5 15.2h4.5" />
  </svg>
);

export const IconClock = ({ className, size }: P) => (
  <svg {...base(size)} className={className}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);

export const IconGrid = ({ className, size }: P) => (
  <svg {...base(size)} className={className}>
    <rect x="3.5" y="3.5" width="7" height="7" rx="1.6" />
    <rect x="13.5" y="3.5" width="7" height="7" rx="1.6" />
    <rect x="3.5" y="13.5" width="7" height="7" rx="1.6" />
    <rect x="13.5" y="13.5" width="7" height="7" rx="1.6" />
  </svg>
);

export const IconMenu = ({ className, size }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M4 7h16M4 12h16M4 17h10" />
  </svg>
);

export const IconClose = ({ className, size }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const IconCpu = ({ className, size }: P) => (
  <svg {...base(size)} className={className}>
    <rect x="6.5" y="6.5" width="11" height="11" rx="2" />
    <rect x="10" y="10" width="4" height="4" rx="1" />
    <path d="M9.5 3v3.5M14.5 3v3.5M9.5 17.5V21M14.5 17.5V21M3 9.5h3.5M3 14.5h3.5M17.5 9.5H21M17.5 14.5H21" />
  </svg>
);
