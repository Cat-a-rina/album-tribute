// Shared shape of a design system. Each system (jungle, relief, psychedelic) fills this in;
// `designVars` turns it into --ds-* CSS variables that the shared components and Tailwind utilities read.

export const COLOR_KEYS = [
  "bg", "surface", "raised", "text", "muted",
  "border", "border-subtle", "border-strong",
  "accent", "accent-hover", "accent-pressed", "on-accent", "accent-text", "focus",
  "accent-2", "info", "danger", "success", "paper",
] as const;
export type ColorKey = (typeof COLOR_KEYS)[number];

export type ColorRole = { key: ColorKey; name: string; hex: string; use: string };

export type TypeRole = {
  key: "display" | "h1" | "h2" | "h3" | "body" | "bodyStrong" | "caption" | "label";
  name: string;
  family: "display" | "heading" | "body";
  size: string;
  sizeLabel: string;
  line: string;
  weight: number;
  tracking: string;
  uppercase?: boolean;
  sample: string;
};

export type Radius = { key: "sm" | "md" | "lg" | "sig" | "full"; name: string; value: string; use: string };
export type Shadow = { key: "1" | "2" | "3" | "glow"; name: string; value: string; use: string };
export type Token = { key: string; name: string; value: string; use: string };

export type MoodboardRef = { src: string; note: string };

export type DesignSystem = {
  slug: string;
  number: string;
  name: string;
  /** Hub card blurb and cover. */
  summary: string;
  cover: string;
  intro: string;
  fonts: {
    display: string;
    /** Optional second heading face for sizes where the display face breaks down. Defaults to display. */
    heading?: string;
    body: string;
    displayName: string;
    headingName?: string;
    bodyName: string;
    fvs: string;
    typeIntro: string;
  };
  colors: ColorRole[];
  colorIntro: string;
  /** Optional tint ramps (e.g. one ink at several strengths), shown under the color roles. */
  ramps?: { name: string; note: string; steps: { label: string; hex: string }[] }[];
  /** Optional page texture, a CSS background-image value (e.g. paper grain). */
  texture?: string;
  /** Show the duotone photo treatments in the imagery section. */
  duotone?: boolean;
  contrastNote: string;
  typeRoles: TypeRole[];
  spacing: { note: string; base: number; steps: { token: string; px: number }[] };
  shapeIntro: string;
  radii: Radius[];
  bw: { line: string; strong: string };
  frame: Token;
  divider: Token;
  shadows: Shadow[];
  shadowNote: string;
  moodboard: { intro: string; refs: MoodboardRef[] };
  images: {
    cards: [string, string, string, string];
    panel: string;
    modal: string;
  };
};

// A candidate display + body font pairing, used by the per-system "font options" pages.
export type Pairing = {
  id: string;
  name: string;
  display: string;
  body: string;
  displayName: string;
  bodyName: string;
  mood: string;
  /** Display weights per role, since each family offers different weights. */
  weights: { display: number; h1: number; h2: number; h3: number; bodyStrong: number };
  tracking: string;
  /** Wide or tall faces may need their own sizes and line heights. */
  sizes?: { display: string; h1: string; h2: string; h3: string };
  line?: string;
};

// ---------- contrast (WCAG 2.x) ----------
function luminance(hex: string) {
  const [r, g, b] = [1, 3, 5]
    .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
export function contrast(a: string, b: string) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

export type ContrastPair = { label: string; fg: string; bg: string; ratio: number; target: number; kind: string };

export function contrastPairs(system: DesignSystem): ContrastPair[] {
  const hex = (k: ColorKey) => system.colors.find((c) => c.key === k)!.hex;
  const pair = (label: string, fg: ColorKey, bg: ColorKey, target: number, kind: string): ContrastPair => ({
    label, fg: hex(fg), bg: hex(bg), ratio: contrast(hex(fg), hex(bg)), target, kind,
  });
  return [
    pair("Text on background", "text", "bg", 4.5, "Body text"),
    pair("Text on surface", "text", "surface", 4.5, "Body text"),
    pair("Text on raised", "text", "raised", 4.5, "Body text"),
    pair("Muted on background", "muted", "bg", 4.5, "Body text"),
    pair("Muted on surface", "muted", "surface", 4.5, "Body text"),
    pair("Muted on raised", "muted", "raised", 4.5, "Body text"),
    pair("Accent text on background", "accent-text", "bg", 4.5, "Links, text"),
    pair("Accent text on surface", "accent-text", "surface", 4.5, "Links, text"),
    pair("Accent text on raised", "accent-text", "raised", 4.5, "Links, text"),
    pair("On-accent on accent", "on-accent", "accent", 4.5, "Button label"),
    pair("On-accent on accent hover", "on-accent", "accent-hover", 4.5, "Button label"),
    pair("On-accent on accent pressed", "on-accent", "accent-pressed", 4.5, "Button label"),
    pair("Secondary accent on background", "accent-2", "bg", 4.5, "Eyebrow text"),
    pair("Secondary accent on surface", "accent-2", "surface", 4.5, "Eyebrow text"),
    pair("Info on surface", "info", "surface", 4.5, "Text"),
    pair("Danger on surface", "danger", "surface", 4.5, "Text"),
    pair("Success on surface", "success", "surface", 4.5, "Text"),
    pair("Border on background", "border", "bg", 3, "UI outline"),
    pair("Border on surface", "border", "surface", 3, "UI outline"),
    pair("Focus ring on background", "focus", "bg", 3, "Focus ring"),
    pair("Focus ring on surface", "focus", "surface", 3, "Focus ring"),
  ];
}

export function borderTokens(system: DesignSystem): Token[] {
  return [
    { key: "hair", name: "Hairline", value: "1px solid var(--ds-border-subtle)", use: "Dividers, list rows" },
    { key: "line", name: "Line", value: `var(--ds-bw) solid var(--ds-border)`, use: "Inputs, cards, controls" },
    { key: "strong", name: "Strong", value: `var(--ds-bw-strong) solid var(--ds-border-strong)`, use: "Buttons, selected, tabs" },
    system.frame,
  ];
}

// ---------- CSS variables ----------
function svg(markup: string) {
  return `url("data:image/svg+xml,${encodeURIComponent(markup)}")`;
}

export function designVars(system: DesignSystem): Record<string, string> {
  const hex = (k: ColorKey) => system.colors.find((c) => c.key === k)!.hex;
  const v: Record<string, string> = {};
  for (const c of system.colors) v[`--ds-${c.key}`] = c.hex;
  for (const r of system.radii) v[`--ds-radius-${r.key}`] = r.value;
  for (const s of system.shadows) v[`--ds-shadow-${s.key}`] = s.value;
  for (const t of system.typeRoles) {
    v[`--ds-type-${t.key}-size`] = t.size;
    v[`--ds-type-${t.key}-line`] = t.line;
    v[`--ds-type-${t.key}-weight`] = String(t.weight);
    v[`--ds-type-${t.key}-tracking`] = t.tracking;
    v[`--ds-type-${t.key}-transform`] = t.uppercase ? "uppercase" : "none";
  }
  v["--ds-font-display"] = system.fonts.display;
  v["--ds-font-heading"] = system.fonts.heading ?? system.fonts.display;
  v["--ds-font-body"] = system.fonts.body;
  v["--ds-fvs"] = system.fonts.fvs;
  v["--ds-bw"] = system.bw.line;
  v["--ds-bw-strong"] = system.bw.strong;
  v["--ds-frame"] = system.frame.value;
  v["--ds-divider"] = system.divider.value;
  v["--ds-icon-chevron"] = svg(
    `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="9" viewBox="0 0 14 9"><path d="M1 1.5l6 6 6-6" fill="none" stroke="${hex("border-strong")}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  );
  v["--ds-icon-tick"] = svg(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M3.5 8.5l3 3 6-7" fill="none" stroke="${hex("on-accent")}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  );
  return v;
}
