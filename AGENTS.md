<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project brief (original prompt)

> My goal is to create a tribute to an album titled Los Mirlos Meets The World, by the group called Los Mirlos. In the Photos file are general images with the specific band members and the instruments used. The three different subfolders convey the three different moodboards I have in mind for this website. This will not have a database, accounts, or APIs tied to it. Only create using Next.js and Tailwind CSS as a static site, as we will be focusing on visual designs and presentation right now. Let's start by creating a homepage that will act as a hub for the moodboards, design systems, and site that we will create. The hub will be empty at first and we will fill it in together. After you have created the hub, create the mood boards using the three subfolders in photos: jungle, minimalistic, and psychedelic. By mood board, I mean just place the images I have uploaded in their own section in the hub that I can click on and it opens a page to show the mood board. We are not working on the design systems yet, so the mood board should just present the photos. Place this prompt in an AGENTS.md file for future reference.

## Notes for agents

- Stack: Next.js (static export, `output: "export"`) + Tailwind CSS v4. No database, accounts or APIs.
- `/photos` is the source of truth for images. `scripts/sync-photos.mjs` copies it to `public/photos` on `predev`/`prebuild` (the copy is gitignored). Don't edit `public/photos`.
- Moodboards are registered in `lib/moodboards.ts`; each slug maps to a folder in `/photos` and a page at `/moodboards/[slug]`.
- Use plain `<img>` for photos (image optimization is off for static export).
- Design systems (jungle, relief, psychedelic) live at `/design-systems/<slug>`, all rendered by `components/ds/DesignSystemPage.tsx`. Each system is one data file in `lib/design-systems/<slug>.ts` (colors, optional tint ramps/texture, type roles, radii, borders, shadows, moodboard refs, sample images) implementing the `DesignSystem` type in `lib/design-systems/types.ts`. Register new ones in `lib/design-systems/index.ts` and add their fonts in `app/layout.tsx`.
- Components in `components/ds/` are theme-neutral: they only use `ds-*` Tailwind utilities (`bg-ds-surface`, `text-ds-accent-text`, `rounded-ds-sig`, `shadow-ds-2`, type roles `ds-display|ds-h1..h3|ds-body|ds-caption|ds-label`, defined in `app/globals.css`). `<DesignTheme system={...}>` injects the `--ds-*` variables, so the same component restyles per theme. Never hardcode a hex or a radius in a component.
- Color roles that matter when adding a theme: `accent` is a fill (with `on-accent` text), `accent-text` is for text/links (must hit 4.5:1 on bg), `border-strong` outlines buttons/selected states, `focus` is the focus ring, `paper` sits behind cut-out photos. The page shows computed contrast ratios; keep them at zero failures.
- State styling uses custom variants `fx-hover`, `fx-focus`, `fx-press`, which match the real pseudo-class or `data-force="hover|focus|pressed"` (used only to display states in the docs).
- Some instrument photos (guitars, timbales, güiro, tambourine) are opaque JPG/PNG with white backgrounds; `CutoutTile` uses `mix-blend-multiply` to hide that.
- Font exploration: `components/ds/FontOptionsPage.tsx` renders candidate pairings in a system's own theme. A system's candidates live in `app/design-systems/<slug>/fonts/` (own `fonts.ts` so the fonts only load on that page). Once a pairing is chosen, move its fonts into `app/layout.tsx`, update the system's data file, and delete the options route.
- The "relief" system/moodboard (linocut, woodcut, riso duotone) reads its photos from `photos/minimalistic/`: `lib/moodboards.ts` separates the board `slug` from its `folder`. Its duotone treatment is CSS only: grayscale image + `mix-blend-multiply` over an ink or tint background (`DuotoneImage` in `components/ds/surfaces.tsx`).
- Cards are layout-driven by an optional `card` block in a system data file (border width, inset padding, image radius, select outline, and a woven `band`). `Card`, `LoadingCard` and `Band` read `--ds-card-*` / `--ds-band*` variables, which default to a plain full-bleed bordered card. Jungle uses the woven-band card; Psychedelic (arch) and Relief (block) use the defaults with their own radius and shadow.
- Tribute site: `/site` (Jungle theme, `components/site/`). Album title is "The World Meets Los Mirlos" (user-confirmed; earlier drafts said "Los Mirlos Meets The World"). Story points to carry through the site: forest protection shaped the music and even the instruments; attire made by local artisan women; NPR Tiny Desk, world tour; genre is cumbia, specifically psychedelic cumbia, with a featured artist on every song.
- Site content lives in `lib/album.ts` (12 tracks with featured artists, instruments). Track titles/guests were verified against public listings (Apple Music, Beatport, press); durations are deliberately omitted because no reliable source was found. The "forest protection shaped the instruments" and "attire made by local artisan women" copy comes from the user brief, not from a source I could verify. Re-confirm before publishing.

- Site interactivity: components/site/SiteShell.tsx wraps /site with a sticky header (section links, a Style panel with four palettes from lib/site-themes.ts and a Patterns switch). Motifs (chakana, Inti sun, stepped fret, kene) live in components/site/motifs.tsx and carry data-motif so the Patterns switch can hide them. Reveal fades sections in on scroll; ds-lift is hover-only. Palette contrast was checked by hand (text 4.5:1, UI 3:1); re-check if you change a palette.
