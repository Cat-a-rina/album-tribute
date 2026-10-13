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
- Design systems live at `/design-systems/<name>`. Jungle: tokens in `lib/jungle-tokens.ts` (single source; injected as `--j-*` CSS vars by `components/jungle/theme.tsx`), Tailwind utilities `bg-j-*`, `text-j-*`, `rounded-j-*`, `shadow-j-*`, type roles `j-display|j-h1..h3|j-body|j-caption|j-label` in `app/globals.css`, components in `components/jungle/`.
- State styling uses custom variants `fx-hover`, `fx-focus`, `fx-press`, which match the real pseudo-class or `data-force="hover|focus|pressed"` (used only to display states in the docs).
- Some instrument photos (guitars, timbales, güiro, tambourine) are opaque JPG/PNG with white backgrounds; `CutoutTile` uses `mix-blend-multiply` to hide that.
