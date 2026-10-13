import type { CSSProperties } from "react";

/**
 * Decorative motifs from Peru, drawn as SVG in currentColor so they take the
 * theme color of whatever they sit in.
 * - Chakana: the stepped Andean cross.
 * - Inti: the sun.
 * - Stepped fret: the stair-step wave found on Andean textiles and stonework.
 * - Kené: the geometric designs of the Shipibo-Konibo, made by women in the Amazon.
 */

export function Chakana({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={className} fill="currentColor" fillRule="evenodd">
      <path d="M9 0H15V4H19V8H24V16H19V20H15V24H9V20H5V16H0V8H5V4H9Z M12 9a3 3 0 1 0 0 6a3 3 0 1 0 0-6Z" />
    </svg>
  );
}

export function Inti({ className }: { className?: string }) {
  const rays = Array.from({ length: 12 }, (_, i) => i * 30);
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={className} fill="currentColor">
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="2" fill="var(--ds-bg)" />
      {rays.map((a) => (
        <path key={a} d="M12 0.5L13.6 5.2H10.4Z" transform={`rotate(${a} 12 12)`} />
      ))}
    </svg>
  );
}

type Variant = "fret" | "kene";

const tiles: Record<Variant, { w: number; h: number; body: React.ReactNode }> = {
  fret: {
    w: 32,
    h: 16,
    body: (
      <path
        d="M0 15H4V11H8V7H12V3H16V7H20V11H24V15H28V11H32"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="miter"
      />
    ),
  },
  kene: {
    w: 28,
    h: 28,
    body: (
      <g fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M14 1.5L26.5 14L14 26.5L1.5 14Z" />
        <path d="M14 7L21 14L14 21L7 14Z" />
        <path d="M14 11.5L16.5 14L14 16.5L11.5 14Z" fill="currentColor" />
      </g>
    ),
  },
};

/** A seamless repeating strip of one motif. Height is the tile height times `scale`. */
export function PatternStrip({
  variant,
  scale = 1,
  className,
  style,
}: {
  variant: Variant;
  scale?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const t = tiles[variant];
  const id = `motif-${variant}`;
  return (
    <svg aria-hidden data-motif width="100%" height={t.h * scale} className={className} style={style}>
      <defs>
        <pattern id={id} width={t.w * scale} height={t.h * scale} patternUnits="userSpaceOnUse">
          <g transform={`scale(${scale})`}>{t.body}</g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

/** A faint kené or fret field that fills its (relatively positioned) parent. */
export function PatternField({ variant, className }: { variant: Variant; className?: string }) {
  const t = tiles[variant];
  const id = `field-${variant}`;
  return (
    <svg aria-hidden data-motif width="100%" height="100%" className={`pointer-events-none absolute inset-0 ${className ?? ""}`}>
      <defs>
        <pattern id={id} width={t.w * 1.4} height={t.h * 1.4} patternUnits="userSpaceOnUse">
          <g transform="scale(1.4)">{t.body}</g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

/** Section break: a stepped fret border between two lines of kené. */
export function SectionBreak({ variant }: { variant: "fret" | "chakana" }) {
  if (variant === "fret") {
    return (
      <div aria-hidden data-motif className="flex flex-col gap-1.5 text-ds-accent-text opacity-90">
        <PatternStrip variant="fret" />
        <PatternStrip variant="kene" scale={0.5} className="text-ds-accent-2" />
      </div>
    );
  }
  return (
    <div aria-hidden data-motif className="mx-auto flex w-full max-w-6xl items-center gap-5 px-6">
      <span className="h-px flex-1 bg-ds-border" />
      <Chakana className="size-6 text-ds-accent-2" />
      <Inti className="size-9 text-ds-accent-text" />
      <Chakana className="size-6 text-ds-accent-2" />
      <span className="h-px flex-1 bg-ds-border" />
    </div>
  );
}
