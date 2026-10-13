import { jungle } from "./design-systems/jungle";
import { resolvePalette } from "./design-systems/palette";
import type { DesignSystem } from "./design-systems/types";

type Hand = { bg: string; surface: string; text: string; muted: string; border: string; accent: string; on: string; a2: string; accentText?: string };

function palette(mode: "dark" | "light", h: Hand, strong: "accent" | "text") {
  const n = (hex: string, name: string) => ({ hex, name, use: "" });
  return resolvePalette({
    mode,
    core: {
      "bg": n(h.bg, "Background"),
      "surface": n(h.surface, "Surface"),
      "text": n(h.text, "Text"),
      "muted": n(h.muted, "Muted text"),
      "border": n(h.border, "Border"),
      "accent": n(h.accent, "Accent"),
      "on-accent": n(h.on, "On accent"),
      "accent-2": n(h.a2, "Accent 2"),
      "danger": n(mode === "dark" ? "#FF6B5E" : "#B3261E", "Danger"),
      "success": n(mode === "dark" ? "#8ED17B" : "#2F6B2A", "Success"),
      ...(h.accentText ? { "accent-text": n(h.accentText, "Accent text") } : {}),
    },
    strong,
    raised: { with: "border", amount: 0.2 },
  });
}

export type SiteTheme = { key: string; name: string; swatch: [string, string, string]; system: DesignSystem };

// Every pair below was checked for WCAG 2.x: text 4.5:1, UI outlines 3:1.
const defs: { key: string; name: string; mode: "dark" | "light"; strong: "accent" | "text"; hand: Hand }[] = [
  { key: "canopy", name: "Canopy", mode: "dark", strong: "accent", hand: { bg: "#0E1F16", surface: "#17301F", text: "#F5EBD3", muted: "#B3C0A4", border: "#648B6D", accent: "#E9A93A", on: "#1A1208", a2: "#EE7440" } },
  { key: "river", name: "River", mode: "dark", strong: "accent", hand: { bg: "#0A1F26", surface: "#12333D", text: "#EAF4EE", muted: "#A9C4C2", border: "#5E9AA0", accent: "#5FD0C3", on: "#06201D", a2: "#F2A65A" } },
  { key: "sunset", name: "Sunset", mode: "dark", strong: "accent", hand: { bg: "#24101A", surface: "#3A1A2A", text: "#FBE9DA", muted: "#D8B8B0", border: "#A8637A", accent: "#FF8A5B", on: "#2A0E06", a2: "#FFC857" } },
  { key: "daylight", name: "Daylight", mode: "light", strong: "text", hand: { bg: "#F6ECD2", surface: "#FFF8E8", text: "#17261C", muted: "#4C5B47", border: "#6B8A66", accent: "#E9A93A", on: "#1A1208", a2: "#A83C14", accentText: "#8A5600" } },
];

export const siteThemes: SiteTheme[] = defs.map((d) => ({
  key: d.key,
  name: d.name,
  swatch: [d.hand.accent, d.hand.a2, d.hand.bg],
  system: { ...jungle, colors: palette(d.mode, d.hand, d.strong) },
}));
