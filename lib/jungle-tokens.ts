// Jungle design system: single source of truth.
// Colors come from the moodboard: canopy greens, Nazca-line terracotta/ochre/teal, macaw red.
// `jungleVars` is injected on the .jungle wrapper; Tailwind utilities (bg-j-*, text-j-*, ...) read those vars.

export type ColorRole = { key: string; name: string; hex: string; use: string };

export const colorRoles: ColorRole[] = [
  { key: "bg", name: "Background", hex: "#0E1F16", use: "Page background. Deep canopy at night." },
  { key: "surface", name: "Surface", hex: "#17301F", use: "Cards, panels, inputs." },
  { key: "raised", name: "Surface raised", hex: "#1F3D2A", use: "Hover, menus, modals, selected rows." },
  { key: "text", name: "Text", hex: "#F5EBD3", use: "Primary copy. Cream, like aged album paper." },
  { key: "muted", name: "Muted text", hex: "#B3C0A4", use: "Secondary copy, captions, placeholders." },
  { key: "border", name: "Border", hex: "#648B6D", use: "Control outlines (meets 3:1 for UI)." },
  { key: "borderSubtle", name: "Border subtle", hex: "#2E4B37", use: "Decorative dividers only." },
  { key: "accent", name: "Accent", hex: "#E9A93A", use: "Primary actions, focus, selection. Nazca ochre." },
  { key: "accentHover", name: "Accent hover", hex: "#F5BC52", use: "Accent on hover." },
  { key: "accentPressed", name: "Accent pressed", hex: "#CB8D22", use: "Accent on press." },
  { key: "onAccent", name: "On accent", hex: "#1A1208", use: "Text/icons placed on accent fills." },
  { key: "terracotta", name: "Terracotta", hex: "#EE7440", use: "Secondary accent. Highlights, badges." },
  { key: "teal", name: "River teal", hex: "#3FB5A8", use: "Info, secondary accent." },
  { key: "danger", name: "Macaw red", hex: "#FF6B5E", use: "Error." },
  { key: "success", name: "Leaf green", hex: "#8ED17B", use: "Success." },
];

const hexOf = (key: string) => colorRoles.find((c) => c.key === key)!.hex;

// --- contrast (WCAG 2.x) ---
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
const pair = (label: string, fg: string, bg: string, target: number, kind: string): ContrastPair => ({
  label,
  fg: hexOf(fg),
  bg: hexOf(bg),
  ratio: contrast(hexOf(fg), hexOf(bg)),
  target,
  kind,
});

export const contrastPairs: ContrastPair[] = [
  pair("Text on background", "text", "bg", 4.5, "Body text"),
  pair("Text on surface", "text", "surface", 4.5, "Body text"),
  pair("Text on raised", "text", "raised", 4.5, "Body text"),
  pair("Muted on background", "muted", "bg", 4.5, "Body text"),
  pair("Muted on surface", "muted", "surface", 4.5, "Body text"),
  pair("Muted on raised", "muted", "raised", 4.5, "Body text"),
  pair("Accent on background", "accent", "bg", 4.5, "Links, text"),
  pair("Accent on surface", "accent", "surface", 4.5, "Links, text"),
  pair("On-accent on accent", "onAccent", "accent", 4.5, "Button label"),
  pair("On-accent on accent hover", "onAccent", "accentHover", 4.5, "Button label"),
  pair("On-accent on accent pressed", "onAccent", "accentPressed", 4.5, "Button label"),
  pair("Terracotta on surface", "terracotta", "surface", 4.5, "Text"),
  pair("Teal on surface", "teal", "surface", 4.5, "Text"),
  pair("Danger on surface", "danger", "surface", 4.5, "Text"),
  pair("Success on surface", "success", "surface", 4.5, "Text"),
  pair("Border on background", "border", "bg", 3, "UI outline"),
  pair("Border on surface", "border", "surface", 3, "UI outline"),
  pair("Accent (focus ring) on surface", "accent", "surface", 3, "Focus ring"),
];

// --- type roles ---
export type TypeRole = {
  key: string;
  name: string;
  family: "display" | "body";
  size: string;
  sizeLabel: string;
  line: string;
  weight: number;
  tracking: string;
  uppercase?: boolean;
  sample: string;
};

export const typeRoles: TypeRole[] = [
  { key: "display", name: "Display", family: "display", size: "clamp(2.75rem, 7vw, 5rem)", sizeLabel: "44 to 80px", line: "1.02", weight: 800, tracking: "-0.02em", sample: "Los Mirlos Meets The World" },
  { key: "h1", name: "Heading 1", family: "display", size: "clamp(2rem, 4.5vw, 3rem)", sizeLabel: "32 to 48px", line: "1.1", weight: 700, tracking: "-0.015em", sample: "El Sonido Selvático" },
  { key: "h2", name: "Heading 2", family: "display", size: "1.75rem", sizeLabel: "28px", line: "1.2", weight: 700, tracking: "-0.01em", sample: "Amazonian cumbia, electrified" },
  { key: "h3", name: "Heading 3", family: "display", size: "1.375rem", sizeLabel: "22px", line: "1.3", weight: 600, tracking: "0", sample: "Tarapoto, 1970s" },
  { key: "body", name: "Body", family: "body", size: "1.0625rem", sizeLabel: "17px", line: "1.65", weight: 400, tracking: "0", sample: "Surf guitars, congas and güiro carried the sound of the Peruvian jungle to the rest of the world." },
  { key: "bodyStrong", name: "Body strong", family: "body", size: "1.0625rem", sizeLabel: "17px", line: "1.65", weight: 600, tracking: "0", sample: "Recorded in Lima, played everywhere." },
  { key: "caption", name: "Caption", family: "body", size: "0.875rem", sizeLabel: "14px", line: "1.5", weight: 400, tracking: "0.005em", sample: "Photo: archive scan, 1973 pressing" },
  { key: "label", name: "Label", family: "body", size: "0.75rem", sizeLabel: "12px", line: "1.2", weight: 700, tracking: "0.14em", uppercase: true, sample: "Track 04 · 3:12" },
];

// --- spacing, shape, elevation ---
export const spacing = [
  { token: "1", px: 4 },
  { token: "2", px: 8 },
  { token: "3", px: 12 },
  { token: "4", px: 16 },
  { token: "6", px: 24 },
  { token: "8", px: 32 },
  { token: "12", px: 48 },
  { token: "16", px: 64 },
  { token: "24", px: 96 },
];

export const radii = [
  { key: "sm", name: "Small", value: "6px", use: "Chips, badges, inputs" },
  { key: "md", name: "Medium", value: "12px", use: "Buttons, cards" },
  { key: "lg", name: "Large", value: "20px", use: "Panels, modals" },
  { key: "leaf", name: "Leaf", value: "28px 6px 28px 6px", use: "Signature: image cards, hero frames" },
  { key: "full", name: "Full", value: "9999px", use: "Pills, toggles, avatars" },
];

export const borders = [
  { key: "hair", name: "Hairline", value: "1px solid var(--j-border-subtle)", use: "Dividers, list rows" },
  { key: "line", name: "Line", value: "1.5px solid var(--j-border)", use: "Inputs, cards, controls" },
  { key: "strong", name: "Strong", value: "2px solid var(--j-accent)", use: "Selected, focus" },
  { key: "nazca", name: "Nazca dots", value: "2px dotted var(--j-accent)", use: "Decorative frames, dividers" },
];

export const shadows = [
  { key: "1", name: "Rest", value: "0 1px 0 rgba(255,255,255,0.04) inset, 0 2px 6px rgba(0,0,0,0.35)", use: "Cards at rest" },
  { key: "2", name: "Lift", value: "0 1px 0 rgba(255,255,255,0.06) inset, 0 10px 24px rgba(0,0,0,0.45)", use: "Hover, menus" },
  { key: "3", name: "Float", value: "0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(233,169,58,0.18)", use: "Modals, detail panels" },
  { key: "glow", name: "Sun glow", value: "0 0 0 3px rgba(233,169,58,0.35)", use: "Focus ring" },
];

function kebab(s: string) {
  return s.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());
}

// CSS variables for the .jungle wrapper.
export function jungleVars(): Record<string, string> {
  const v: Record<string, string> = {};
  for (const c of colorRoles) v[`--j-${kebab(c.key)}`] = c.hex;
  for (const r of radii) v[`--j-radius-${r.key}`] = r.value;
  for (const s of shadows) v[`--j-shadow-${s.key}`] = s.value;
  for (const t of typeRoles) {
    v[`--j-type-${t.key}-size`] = t.size;
    v[`--j-type-${t.key}-line`] = t.line;
    v[`--j-type-${t.key}-weight`] = String(t.weight);
    v[`--j-type-${t.key}-tracking`] = t.tracking;
  }
  return v;
}
