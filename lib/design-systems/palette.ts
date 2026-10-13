// A design system only needs ~11 colors chosen by hand. Everything else (hover, pressed, dividers, focus ring,
// raised surface, photo-tile paper, info) is derived from them here, so a theme is easier to tune and can't drift.
import type { ColorKey, ColorRole } from "./types";

type Core = { hex: string; name: string; use: string };
type CoreKey = "bg" | "surface" | "text" | "muted" | "border" | "accent" | "on-accent" | "accent-2" | "danger" | "success";

export type PaletteInput = {
  mode: "dark" | "light";
  core: Record<CoreKey, Core> & { "accent-text"?: Core };
  /** Which core color outlines buttons and selected states, and draws the focus ring. */
  strong: "accent" | "accent-2" | "text";
  /** Raised surface = surface mixed with another core color. */
  raised: { with: CoreKey; amount: number };
};

const channel = (hex: string, i: number) => parseInt(hex.slice(i, i + 2), 16);

/** Linear mix of two hex colors: t = 0 gives a, t = 1 gives b. */
export function mix(a: string, b: string, t: number) {
  return (
    "#" +
    [1, 3, 5]
      .map((i) => Math.round(channel(a, i) + (channel(b, i) - channel(a, i)) * t).toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()
  );
}

const pct = (n: number) => `${Math.round(n * 100)}%`;

export function resolvePalette({ mode, core, strong, raised }: PaletteInput): ColorRole[] {
  const dark = mode === "dark";
  const c = (k: CoreKey) => core[k];
  const out: ColorRole[] = [];
  const add = (key: ColorKey, name: string, hex: string, use: string, derived?: string) =>
    out.push({ key, name, hex, use, ...(derived ? { derived } : {}) });

  // Chosen by hand
  for (const k of ["bg", "surface", "text", "muted", "border", "accent", "on-accent"] as const) add(k, c(k).name, c(k).hex, c(k).use);
  const accentText = core["accent-text"];
  if (accentText) add("accent-text", accentText.name, accentText.hex, accentText.use);
  else add("accent-text", "Accent text", c("accent").hex, "Links and accent-colored text.", "Same as the accent");
  for (const k of ["accent-2", "danger", "success"] as const) add(k, c(k).name, c(k).hex, c(k).use);

  // Derived
  const strongCore = c(strong);
  add("raised", "Surface raised", mix(c("surface").hex, c(raised.with).hex, raised.amount), "Hover, selected rows, menus, modals.", `Surface + ${pct(raised.amount)} ${c(raised.with).name.toLowerCase()}`);
  add("border-subtle", "Border subtle", mix(c("bg").hex, c("border").hex, dark ? 0.35 : 0.22), "Dividers and hairlines only.", `Background + ${dark ? "35" : "22"}% border`);
  add("border-strong", "Border strong", strongCore.hex, "Button outlines, selected and hover states, focus ring.", `Same as ${strongCore.name.toLowerCase()}`);
  add("accent-hover", "Accent hover", dark ? mix(c("accent").hex, "#FFFFFF", 0.18) : mix(c("accent").hex, "#000000", 0.16), "Accent fills on hover.", dark ? "Accent + 18% white" : "Accent + 16% black");
  add("accent-pressed", "Accent pressed", dark ? mix(c("accent").hex, "#000000", 0.14) : mix(c("accent").hex, "#000000", 0.34), "Accent fills on press.", dark ? "Accent + 14% black" : "Accent + 34% black");
  add("focus", "Focus ring", strongCore.hex, "Keyboard focus outline.", "Same as border strong");
  add("info", "Info", c("muted").hex, "Info alerts and badges.", "Same as muted text, with an i icon");
  add("paper", "Paper", dark ? c("text").hex : c("surface").hex, "Tiles behind cut-out photos.", dark ? "Same as text" : "Same as surface");
  return out;
}
