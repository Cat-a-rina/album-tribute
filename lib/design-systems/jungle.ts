import { resolvePalette } from "./palette";
import type { DesignSystem } from "./types";

const J = "/photos/jungle/";

export const jungle: DesignSystem = {
  slug: "jungle",
  number: "01",
  name: "Jungle",
  summary: "Canopy greens, Nazca ochre and macaw red",
  cover: `${J}peruOlderDrawings.jpg`,
  intro:
    "The Peruvian Amazon after dark: deep canopy greens, the ochre and terracotta of Nazca-line textiles, and the flash of macaw red. Photography does the loud work, so the interface stays low and green around it.",
  fonts: {
    display: "var(--font-young-serif)",
    body: "var(--font-instrument-sans)",
    displayName: "Young Serif",
    bodyName: "Instrument Sans",
    fvs: "normal",
    typeIntro:
      "Young Serif is a warm, slightly rustic old-style serif, the kind of lettering found in the credits on a 1970s record sleeve. Instrument Sans keeps body copy and labels clean and neutral beside it.",
  },
  colorIntro: "Ten colors are chosen by hand: canopy greens, ochre, terracotta. Everything else, such as hover states, dividers and the focus ring, is derived from them.",
  contrastNote: "WCAG 2.x. Text needs 4.5:1, UI outlines and focus rings need 3:1. Ratios are computed from the token values.",
  colors: resolvePalette({
    mode: "dark",
    core: {
      "bg": { name: "Background", hex: "#0E1F16", use: "Page background. Deep canopy at night." },
      "surface": { name: "Surface", hex: "#17301F", use: "Cards, panels, inputs." },
      "text": { name: "Text", hex: "#F5EBD3", use: "Primary copy. Cream, like aged album paper." },
      "muted": { name: "Muted text", hex: "#B3C0A4", use: "Secondary copy, captions, placeholders." },
      "border": { name: "Border", hex: "#648B6D", use: "Control outlines (meets 3:1 for UI)." },
      "accent": { name: "Accent", hex: "#E9A93A", use: "Primary action fills, links, selection. Nazca ochre." },
      "on-accent": { name: "On accent", hex: "#1A1208", use: "Text and icons on accent fills." },
      "accent-2": { name: "Terracotta", hex: "#EE7440", use: "Secondary accent. Eyebrows, highlights." },
      "danger": { name: "Macaw red", hex: "#FF6B5E", use: "Error." },
      "success": { name: "Leaf green", hex: "#8ED17B", use: "Success." },
    },
    strong: "accent",
    raised: { with: "border", amount: 0.2 },
  }),
  typeRoles: [
    { key: "display", name: "Display", family: "display", size: "clamp(2.75rem, 7vw, 5rem)", sizeLabel: "44 to 80px", line: "1.02", weight: 400, tracking: "-0.005em", sample: "The World Meets Los Mirlos" },
    { key: "h1", name: "Heading 1", family: "display", size: "clamp(2rem, 4.5vw, 3rem)", sizeLabel: "32 to 48px", line: "1.1", weight: 400, tracking: "-0.005em", sample: "El Sonido Selvático" },
    { key: "h2", name: "Heading 2", family: "display", size: "1.75rem", sizeLabel: "28px", line: "1.2", weight: 400, tracking: "-0.005em", sample: "Amazonian cumbia, electrified" },
    { key: "h3", name: "Heading 3", family: "display", size: "1.375rem", sizeLabel: "22px", line: "1.3", weight: 400, tracking: "-0.005em", sample: "Tarapoto, 1970s" },
    { key: "body", name: "Body", family: "body", size: "1.0625rem", sizeLabel: "17px", line: "1.65", weight: 400, tracking: "0", sample: "Surf guitars, congas and güiro carried the sound of the Peruvian jungle to the rest of the world." },
    { key: "bodyStrong", name: "Body strong", family: "body", size: "1.0625rem", sizeLabel: "17px", line: "1.65", weight: 600, tracking: "0", sample: "Recorded in Lima, played everywhere." },
    { key: "caption", name: "Caption", family: "body", size: "0.875rem", sizeLabel: "14px", line: "1.5", weight: 400, tracking: "0.005em", sample: "Photo: archive scan, 1973 pressing" },
    { key: "label", name: "Label", family: "body", size: "0.75rem", sizeLabel: "12px", line: "1.2", weight: 700, tracking: "0.14em", uppercase: true, sample: "Track 04 · 3:12" },
  ],
  spacing: {
    note: "A 4px base grid. Tailwind steps: token × 4 = pixels.",
    base: 4,
    steps: [1, 2, 3, 4, 6, 8, 12, 16, 24].map((t) => ({ token: String(t), px: t * 4 })),
  },
  shapeIntro: "A 4px base grid with soft, generous corners and no outlines on cards. The signature detail is the woven band: an Andean textile border in ochre and terracotta across the top and bottom of a card.",
  radii: [
    { key: "sm", name: "Small", value: "6px", use: "Chips, badges, inputs" },
    { key: "md", name: "Medium", value: "12px", use: "Buttons, cards" },
    { key: "lg", name: "Large", value: "20px", use: "Panels, modals" },
    { key: "sig", name: "Soft", value: "20px", use: "Cards and hero frames, with the woven band as the signature detail" },
    { key: "full", name: "Full", value: "9999px", use: "Pills, toggles, avatars" },
  ],
  bw: { line: "1.5px", strong: "2px" },
  card: {
    borderWidth: "0px",
    padding: "1rem",
    textPadding: "1rem 0.25rem 0.25rem",
    imageRadius: "12px",
    selectOutline: "2px",
    band: {
      top: "16px",
      bottom: "8px",
      pattern: [
        "linear-gradient(135deg, var(--ds-accent) 25%, transparent 25%) -8px 0 / 16px 16px",
        "linear-gradient(225deg, var(--ds-accent) 25%, transparent 25%) -8px 0 / 16px 16px",
        "linear-gradient(315deg, var(--ds-accent-2) 25%, transparent 25%) 0 0 / 16px 16px",
        "linear-gradient(45deg, var(--ds-accent-2) 25%, transparent 25%) 0 0 / 16px 16px",
        "var(--ds-raised)",
      ].join(", "),
    },
  },
  frame: { key: "frame", name: "Nazca dots", value: "2px dotted #E9A93A", use: "Album-cover frames, decorative edges" },
  divider: { key: "divider", name: "Nazca dots", value: "2px dotted rgba(233,169,58,0.6)", use: "Section dividers" },
  shadows: [
    { key: "1", name: "Rest", value: "0 1px 0 rgba(255,255,255,0.04) inset, 0 2px 6px rgba(0,0,0,0.35)", use: "Cards at rest" },
    { key: "2", name: "Lift", value: "0 1px 0 rgba(255,255,255,0.06) inset, 0 10px 24px rgba(0,0,0,0.45)", use: "Hover, menus" },
    { key: "3", name: "Float", value: "0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(233,169,58,0.18)", use: "Modals, detail panels" },
    { key: "glow", name: "Sun glow", value: "0 0 0 3px rgba(233,169,58,0.35)", use: "Focus ring" },
  ],
  shadowNote: "Deep, soft and tinted black. On a dark background they read as depth, not as a glow, except the sun glow used for focus.",
  moodboard: {
    intro: "Pulled from the jungle moodboard: dense canopy and river light, hand-painted textile reds and yellows, Nazca-line glyphs on terracotta and teal, the macaws overhead.",
    refs: [
      { src: `${J}waterfalls-in-Peruvian-Amazon-1-1282798694.jpg`, note: "Canopy and mist → background, surface" },
      { src: `${J}peruOlderDrawings.jpg`, note: "Nazca textile → accent, terracotta, teal" },
      { src: `${J}birds-of-peru-1024x585-4023226111.jpg`, note: "Macaws → danger red, success green" },
      { src: `${J}picturesqueWoman.jpg`, note: "Painted grains → warm highlights" },
      { src: `${J}1b33960bbce6adadc2c441eb5e15127a.jpg`, note: "Mossy vine → muted lichen" },
      { src: `${J}cuyAndino.jpg`, note: "Chullo cuy → playful cut-out tone" },
    ],
  },
  images: {
    cards: [
      `${J}waterfalls-in-Peruvian-Amazon-1-1282798694.jpg`,
      `${J}birds-of-peru-1024x585-4023226111.jpg`,
      `${J}peruOlderDrawings.jpg`,
      `${J}picturesqueWoman.jpg`,
    ],
    panel: `${J}1b33960bbce6adadc2c441eb5e15127a.jpg`,
    modal: `${J}waterfalls-in-Peruvian-Amazon-1-1282798694.jpg`,
  },
};
