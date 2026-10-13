import type { DesignSystem } from "./types";

const M = "/photos/minimalistic/";

// Fine paper grain: faint warm speckle over the page color.
const grain = `url("data:image/svg+xml,${encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.35  0 0 0 0 0.25  0 0 0 0 0.2  0 0 0 0.09 0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>",
)}")`;

export const relief: DesignSystem = {
  slug: "relief",
  number: "02",
  name: "Relief",
  summary: "Linocut ink and one risograph color on paper",
  cover: `${M}df561921015393596035a1fde36eda82.jpg`,
  intro:
    "Relief printmaking: linocut and woodcut, printed in one or two inks on cream paper. Black ink does the drawing, a single vermilion does the color, and tints of each fill in the rest, like a risograph run. Flat, square and simple, so the carved shapes carry the personality.",
  fonts: {
    display: "var(--font-alfa-slab)",
    body: "var(--font-libre-franklin)",
    displayName: "Alfa Slab One",
    bodyName: "Libre Franklin",
    fvs: "normal",
    typeIntro:
      "Alfa Slab One is a heavy slab in the style of wood type, the kind cut for posters and handbills, with the same chunky weight as a carved block. Libre Franklin is a plain, sturdy grotesque that stays out of the way.",
  },
  colorIntro:
    "A duotone: black ink and one vermilion on cream paper. Everything else is a tint of one of the two, the way a risograph builds shades from a single ink. Error and success are not separate hues: they are told apart by deep vermilion versus ink, and by their icons.",
  contrastNote: "WCAG 2.x. Text needs 4.5:1, UI outlines and focus rings need 3:1. Ratios are computed from the token values.",
  colors: [
    { key: "bg", name: "Paper", hex: "#F4EEDF", use: "Page background. Cream print paper, with a faint grain." },
    { key: "surface", name: "Surface", hex: "#FBF8EF", use: "Cards, panels, inputs. A brighter sheet." },
    { key: "raised", name: "Surface raised", hex: "#EFD8C7", use: "Hover, selected rows. A 12% vermilion tint." },
    { key: "text", name: "Ink", hex: "#1B1614", use: "Primary copy and lines. Warm block-print black." },
    { key: "muted", name: "Muted ink", hex: "#5A4D47", use: "Secondary copy, captions, placeholders." },
    { key: "border", name: "Border", hex: "#1B1614", use: "Control outlines." },
    { key: "border-subtle", name: "Border subtle", hex: "#CFC2AF", use: "Decorative dividers only." },
    { key: "border-strong", name: "Border strong", hex: "#1B1614", use: "Buttons, selected and hover outlines." },
    { key: "accent", name: "Vermilion", hex: "#C93A17", use: "Primary action fills. The one color ink." },
    { key: "accent-hover", name: "Vermilion deep", hex: "#B02F10", use: "Accent on hover (a heavier ink laydown)." },
    { key: "accent-pressed", name: "Vermilion darkest", hex: "#8F2209", use: "Accent on press." },
    { key: "on-accent", name: "On accent", hex: "#FBF8EF", use: "Paper-colored text on vermilion fills." },
    { key: "accent-text", name: "Accent text", hex: "#B02F10", use: "Links and accent-colored text." },
    { key: "focus", name: "Focus", hex: "#1B1614", use: "Focus ring, with a soft vermilion halo." },
    { key: "accent-2", name: "Deep vermilion", hex: "#8F2209", use: "Secondary accent. Eyebrows and rules." },
    { key: "info", name: "Info ink", hex: "#4A3F3A", use: "Info. A softened ink, with an i icon." },
    { key: "danger", name: "Danger", hex: "#9E1F0E", use: "Error. Deep vermilion, with a cross icon." },
    { key: "success", name: "Success", hex: "#1B1614", use: "Success. Full ink, with a check icon." },
    { key: "paper", name: "Bright paper", hex: "#FFFDF7", use: "Tiles behind cut-out photos." },
  ],
  ramps: [
    {
      name: "Vermilion ramp",
      note: "One ink at five strengths, mixed with the paper. Fills, hover states and chart-like uses come from this ramp.",
      steps: [
        { label: "100%", hex: "#C93A17" },
        { label: "75%", hex: "#D46749" },
        { label: "50%", hex: "#DF947B" },
        { label: "25%", hex: "#E9C1AD" },
        { label: "12%", hex: "#EFD8C7" },
      ],
    },
    {
      name: "Ink ramp",
      note: "The black ink at five strengths. Use for illustration fills and large decorative areas, not for text.",
      steps: [
        { label: "100%", hex: "#1B1614" },
        { label: "70%", hex: "#5C5751" },
        { label: "45%", hex: "#928D84" },
        { label: "25%", hex: "#BEB8AC" },
        { label: "12%", hex: "#DAD4C7" },
      ],
    },
  ],
  texture: grain,
  duotone: true,
  typeRoles: [
    { key: "display", name: "Display", family: "display", size: "clamp(2.75rem, 8vw, 6rem)", sizeLabel: "44 to 96px", line: "1", weight: 400, tracking: "-0.01em", sample: "Los Mirlos Meets The World" },
    { key: "h1", name: "Heading 1", family: "display", size: "clamp(2rem, 4.8vw, 3.25rem)", sizeLabel: "32 to 52px", line: "1.05", weight: 400, tracking: "-0.005em", sample: "El Sonido Selvático" },
    { key: "h2", name: "Heading 2", family: "display", size: "1.875rem", sizeLabel: "30px", line: "1.15", weight: 400, tracking: "0", sample: "Amazonian cumbia, electrified" },
    { key: "h3", name: "Heading 3", family: "display", size: "1.375rem", sizeLabel: "22px", line: "1.2", weight: 400, tracking: "0", sample: "Tarapoto, 1970s" },
    { key: "body", name: "Body", family: "body", size: "1.0625rem", sizeLabel: "17px", line: "1.6", weight: 400, tracking: "0", sample: "Surf guitars, congas and güiro carried the sound of the Peruvian jungle to the rest of the world." },
    { key: "bodyStrong", name: "Body strong", family: "body", size: "1.0625rem", sizeLabel: "17px", line: "1.6", weight: 700, tracking: "0", sample: "Recorded in Lima, played everywhere." },
    { key: "caption", name: "Caption", family: "body", size: "0.875rem", sizeLabel: "14px", line: "1.5", weight: 400, tracking: "0.01em", sample: "Photo: archive scan, 1973 pressing" },
    { key: "label", name: "Label", family: "body", size: "0.75rem", sizeLabel: "12px", line: "1.2", weight: 700, tracking: "0.16em", uppercase: true, sample: "Track 04 · 3:12" },
  ],
  spacing: {
    note: "An 8px grid with generous steps. Margins are wide, like the blank border left around a print.",
    base: 8,
    steps: [1, 2, 3, 4, 6, 8, 12, 16].map((t) => ({ token: String(t * 2), px: t * 8 })),
  },
  shapeIntro:
    "Square corners and heavy ink lines, like a block cut from a single piece of wood. The only depth is a hard vermilion offset behind an element, a second plate printed slightly out of register.",
  radii: [
    { key: "sm", name: "Small", value: "0px", use: "Chips, badges, inputs" },
    { key: "md", name: "Medium", value: "0px", use: "Buttons, cards" },
    { key: "lg", name: "Large", value: "0px", use: "Panels, modals" },
    { key: "sig", name: "Block", value: "0px", use: "Signature: image cards, hero frames" },
    { key: "full", name: "Full", value: "9999px", use: "Toggles and radios only" },
  ],
  bw: { line: "2px", strong: "3px" },
  frame: { key: "frame", name: "Ink mat", value: "2px solid #1B1614", use: "Album-cover frames: a thick ink rule with a paper mat" },
  divider: { key: "divider", name: "Ink rule", value: "3px solid #1B1614", use: "Section dividers" },
  shadows: [
    { key: "1", name: "Rest", value: "none", use: "Everything at rest is flat" },
    { key: "2", name: "Lift", value: "5px 5px 0 #C93A17", use: "Hover: second plate out of register" },
    { key: "3", name: "Float", value: "10px 10px 0 #C93A17", use: "Modals, detail panels" },
    { key: "glow", name: "Vermilion halo", value: "0 0 0 3px #DF947B", use: "Focus ring, with an ink outline" },
  ],
  shadowNote: "Flat at rest. Hover and overlays get a hard, unblurred vermilion offset, like a second ink plate printed slightly off. There are no soft shadows anywhere.",
  moodboard: {
    intro: "Pulled from the relief moodboard: linocut and woodcut prints, black ink on cream, one or two colors at most, and overprinted shades of a single hue.",
    refs: [
      { src: `${M}df561921015393596035a1fde36eda82.jpg`, note: "Red, black and cream → the duotone itself" },
      { src: `${M}a4bb9bc909a7b4a33bd51d54235bd52f.jpg`, note: "Orange and black overprint → one color ink + ink" },
      { src: `${M}0f27bc20e598cc1be314142e22c69112.jpg`, note: "Block-print lizard → ink, hard carved edges" },
      { src: `${M}21585ed9284bf1c00b4a114c9a149574.jpg`, note: "Koi on cream → warm paper, tonal print" },
      { src: `${M}810c561ee0b56afe573d8ed935362cc9.jpg`, note: "Guitar linocut → bold black linework" },
      { src: `${M}c6d916b33f680ea7c17eee12637fa6c6.jpg`, note: "Bottle woodcut → shades from a single ink" },
    ],
  },
  images: {
    cards: [
      `${M}df561921015393596035a1fde36eda82.jpg`,
      `${M}810c561ee0b56afe573d8ed935362cc9.jpg`,
      `${M}a4bb9bc909a7b4a33bd51d54235bd52f.jpg`,
      `${M}8fbe40152dc8254fb277f87a18b31bd5.jpg`,
    ],
    panel: `${M}c6d916b33f680ea7c17eee12637fa6c6.jpg`,
    modal: `${M}0f27bc20e598cc1be314142e22c69112.jpg`,
  },
};
