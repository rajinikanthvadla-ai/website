/** Decorative SVG graphics for AI Automation course page */

export function BlobBlue({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" aria-hidden>
      <path
        d="M45 120C20 90 10 55 35 30C60 5 110 15 140 40C170 65 185 110 160 145C135 180 85 185 55 165C25 145 70 150 45 120Z"
        fill="url(#blobBlue)"
        opacity="0.5"
      />
      <defs>
        <linearGradient id="blobBlue" x1="0" y1="0" x2="200" y2="200">
          <stop stopColor="#1d4ed8" />
          <stop offset="1" stopColor="#3b82f6" stopOpacity="0.2" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function BlobOrange({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 180 180" fill="none" aria-hidden>
      <path
        d="M90 15C130 15 165 50 165 90C165 130 130 165 90 165C50 165 15 130 15 90C15 50 50 15 90 15ZM90 40C115 55 125 80 115 105C105 130 75 140 55 125C35 110 40 75 60 55C75 40 90 35 90 40Z"
        fill="url(#blobOrange)"
        opacity="0.35"
      />
      <defs>
        <radialGradient id="blobOrange">
          <stop stopColor="#ea580c" />
          <stop offset="1" stopColor="#ea580c" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export function DotGrid({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 120" aria-hidden>
      {Array.from({ length: 64 }).map((_, i) => {
        const x = (i % 8) * 16 + 4;
        const y = Math.floor(i / 8) * 16 + 4;
        return <circle key={i} cx={x} cy={y} r="1.5" fill="currentColor" opacity="0.25" />;
      })}
    </svg>
  );
}

export function AgentNodes({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 320 200" fill="none" aria-hidden>
      <circle cx="60" cy="100" r="28" stroke="#1d4ed8" strokeWidth="2" fill="#eff6ff" />
      <circle cx="160" cy="50" r="22" stroke="#ea580c" strokeWidth="2" fill="#fff7ed" />
      <circle cx="160" cy="150" r="22" stroke="#ea580c" strokeWidth="2" fill="#fff7ed" />
      <circle cx="260" cy="100" r="28" stroke="#1d4ed8" strokeWidth="2" fill="#eff6ff" />
      <path d="M88 95 L132 58" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 4" />
      <path d="M88 105 L132 142" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 4" />
      <path d="M188 58 L232 95" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 4" />
      <path d="M188 142 L232 105" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 4" />
      <text x="60" y="104" textAnchor="middle" fill="#1d4ed8" fontSize="10" fontWeight="700">RAG</text>
      <text x="160" y="54" textAnchor="middle" fill="#ea580c" fontSize="9" fontWeight="700">MCP</text>
      <text x="160" y="154" textAnchor="middle" fill="#ea580c" fontSize="9" fontWeight="700">HR</text>
      <text x="260" y="104" textAnchor="middle" fill="#1d4ed8" fontSize="9" fontWeight="700">ROI</text>
    </svg>
  );
}

export function SparkBurst({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden>
      <path d="M24 4 L26 20 L42 24 L26 28 L24 44 L22 28 L6 24 L22 20 Z" fill="#ea580c" opacity="0.9" />
      <circle cx="24" cy="24" r="4" fill="#fff" />
    </svg>
  );
}

export function PlatformRings({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" aria-hidden>
      <circle cx="100" cy="100" r="90" stroke="#1d4ed8" strokeWidth="1" opacity="0.2" fill="none" />
      <circle cx="100" cy="100" r="65" stroke="#1d4ed8" strokeWidth="1.5" opacity="0.35" fill="none" strokeDasharray="6 4" />
      <circle cx="100" cy="100" r="40" stroke="#ea580c" strokeWidth="2" opacity="0.5" fill="none" />
      <circle cx="100" cy="100" r="12" fill="#1d4ed8" opacity="0.8" />
      <circle cx="100" cy="28" r="6" fill="#ea580c" />
      <circle cx="172" cy="100" r="6" fill="#1d4ed8" />
      <circle cx="100" cy="172" r="6" fill="#ea580c" />
      <circle cx="28" cy="100" r="6" fill="#1d4ed8" />
    </svg>
  );
}

export function RoleTransformArrow({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 40" aria-hidden>
      <path d="M8 20 H95" stroke="url(#arrowGrad)" strokeWidth="3" strokeLinecap="round" />
      <path d="M88 12 L100 20 L88 28" stroke="#ea580c" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <defs>
        <linearGradient id="arrowGrad" x1="0" y1="0" x2="120" y2="0">
          <stop stopColor="#94a3b8" />
          <stop offset="1" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>
    </svg>
  );
}
