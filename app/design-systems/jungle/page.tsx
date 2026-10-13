import Link from "next/link";
import type { ReactNode } from "react";
import {
  borders,
  colorRoles,
  contrastPairs,
  radii,
  shadows,
  spacing,
  typeRoles,
} from "@/lib/jungle-tokens";
import { JungleTheme } from "@/components/jungle/theme";
import { Badge, Button, Checkbox, ChipGroup, Chip, Radio, Select, TextInput, TextLink, Toggle } from "@/components/jungle/controls";
import { Card, CoverFrame, CutoutTile, DetailPanel, ModalDemo, NavBar, NazcaDivider, PullQuote, Tabs, TrackRow } from "@/components/jungle/surfaces";
import { Alert, EmptyState, ErrorState, LoadingCard, Spinner, SuccessState } from "@/components/jungle/feedback";

export const metadata = { title: "Jungle design system" };

const J = "/photos/jungle/";
const img = {
  nazca: `${J}peruOlderDrawings.jpg`,
  falls: `${J}waterfalls-in-Peruvian-Amazon-1-1282798694.jpg`,
  woman: `${J}picturesqueWoman.jpg`,
  birds: `${J}birds-of-peru-1024x585-4023226111.jpg`,
  vine: `${J}1b33960bbce6adadc2c441eb5e15127a.jpg`,
  cuy: `${J}cuyAndino.jpg`,
};

const nav = [
  ["moodboard", "Moodboard"],
  ["color", "Color"],
  ["type", "Type"],
  ["shape", "Spacing & shape"],
  ["components", "Components"],
  ["states", "UI states"],
  ["imagery", "Imagery"],
];

function Section({ id, eyebrow, title, intro, children }: { id: string; eyebrow: string; title: string; intro?: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-8 border-t border-j-border-subtle py-16">
      <p className="j-label text-j-terracotta">{eyebrow}</p>
      <h2 className="j-h1 mt-2">{title}</h2>
      {intro && <p className="j-body mt-3 max-w-2xl text-j-muted">{intro}</p>}
      <div className="mt-10 flex flex-col gap-12">{children}</div>
    </section>
  );
}

function Sub({ title, note, children }: { title: string; note?: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="j-h3">{title}</h3>
        {note && <p className="j-caption mt-1 text-j-muted">{note}</p>}
      </div>
      {children}
    </div>
  );
}

/** Rows of one control shown in each state. */
function StateMatrix({ columns, rows, top = false }: { columns: string[]; rows: { name?: string; cells: ReactNode[] }[]; top?: boolean }) {
  return (
    <div className="overflow-x-auto rounded-j-lg border border-j-border-subtle bg-j-surface">
      <table className="w-full min-w-[44rem] border-collapse">
        <thead>
          <tr>
            {rows.some((r) => r.name) && <th className="p-4" />}
            {columns.map((c) => (
              <th key={c} scope="col" className="j-label p-4 text-left text-j-muted">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-j-border-subtle">
              {rows.some((x) => x.name) && (
                <th scope="row" className="j-label p-4 text-left align-middle text-j-text">
                  {r.name}
                </th>
              )}
              {r.cells.map((cell, j) => (
                <td key={j} className={`p-4 ${top ? "align-top" : "align-middle"}`}>
                  {cell ?? <span className="text-j-muted">n/a</span>}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const typeClass: Record<string, string> = {
  display: "j-display",
  h1: "j-h1",
  h2: "j-h2",
  h3: "j-h3",
  body: "j-body",
  bodyStrong: "j-body-strong",
  caption: "j-caption",
  label: "j-label",
};

const STATES = ["Rest", "Hover", "Focus", "Pressed", "Selected", "Disabled"];

export default function JungleDesignSystem() {
  return (
    <JungleTheme>
      <main className="mx-auto w-full max-w-6xl px-6 pb-24 pt-10">
        {/* Header */}
        <Link href="/" className="j-label inline-block rounded-j-sm text-j-muted outline-none hover:text-j-accent focus-visible:j-focus-ring">
          ← Hub
        </Link>

        <header className="pb-16 pt-10">
          <p className="j-label text-j-terracotta">Design system · 01</p>
          <h1 className="j-display mt-3">Jungle</h1>
          <p className="j-body mt-5 max-w-2xl text-j-muted">
            The Peruvian Amazon after dark: deep canopy greens, the ochre and terracotta of Nazca-line
            textiles, and the flash of macaw red. Photography does the loud work, so the interface stays
            low and green around it.
          </p>
          <nav aria-label="Sections" className="mt-8 flex flex-wrap gap-2">
            {nav.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                className="j-label inline-flex h-10 items-center rounded-full border border-j-border px-4 text-j-text outline-none transition-colors hover:border-j-accent hover:bg-j-raised focus-visible:j-focus-ring"
              >
                {label}
              </a>
            ))}
          </nav>
        </header>

        {/* Moodboard */}
        <Section id="moodboard" eyebrow="Source" title="What the colors come from" intro="Pulled from the jungle moodboard: dense canopy and river light, hand-painted textile reds and yellows, Nazca-line glyphs on terracotta and teal, the macaws overhead.">
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {[
              [img.falls, "Canopy and mist → background, surface"],
              [img.nazca, "Nazca textile → accent, terracotta, teal"],
              [img.birds, "Macaws → danger red, success green"],
              [img.woman, "Painted grains → warm highlights"],
              [img.vine, "Mossy vine → muted lichen"],
              [img.cuy, "Chullo cuy → playful cut-out tone"],
            ].map(([src, note]) => (
              <li key={src} className="flex flex-col gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className="aspect-[4/3] w-full rounded-j-md object-cover" />
                <p className="j-caption text-j-muted">{note}</p>
              </li>
            ))}
          </ul>
        </Section>

        {/* Color */}
        <Section id="color" eyebrow="Foundations" title="Color roles" intro="Every color has a job. Roles, not hues, are what components reference.">
          <Sub title="Roles">
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {colorRoles.map((c) => (
                <li key={c.key} className="overflow-hidden rounded-j-md border border-j-border-subtle bg-j-surface">
                  <div className="h-20 border-b border-j-border-subtle" style={{ background: c.hex }} />
                  <div className="p-4">
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="j-body-strong">{c.name}</p>
                      <code className="j-caption text-j-muted">{c.hex}</code>
                    </div>
                    <p className="j-caption mt-1 text-j-muted">{c.use}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Sub>

          <Sub title="Contrast ratios" note="WCAG 2.x. Text needs 4.5:1, UI outlines and focus rings need 3:1. Ratios are computed from the token values.">
            <div className="overflow-x-auto rounded-j-lg border border-j-border-subtle bg-j-surface">
              <table className="w-full min-w-[40rem] border-collapse text-left">
                <thead>
                  <tr className="j-label text-j-muted">
                    <th className="p-4">Pair</th>
                    <th className="p-4">Sample</th>
                    <th className="p-4">Ratio</th>
                    <th className="p-4">Needs</th>
                    <th className="p-4">Result</th>
                  </tr>
                </thead>
                <tbody>
                  {contrastPairs.map((p) => {
                    const pass = p.ratio >= p.target;
                    return (
                      <tr key={p.label} className="border-t border-j-border-subtle">
                        <td className="p-4">
                          <p className="j-body-strong">{p.label}</p>
                          <p className="j-caption text-j-muted">{p.kind}</p>
                        </td>
                        <td className="p-4">
                          <span className="inline-block rounded-j-sm border border-j-border-subtle px-3 py-1 j-body-strong" style={{ color: p.fg, background: p.bg }}>
                            Aa
                          </span>
                        </td>
                        <td className="j-body-strong p-4 tabular-nums">{p.ratio.toFixed(2)}:1</td>
                        <td className="j-caption p-4 tabular-nums text-j-muted">{p.target}:1</td>
                        <td className="p-4">
                          <Badge tone={pass ? (p.ratio >= 7 ? "accent" : "success") : "danger"}>
                            {pass ? (p.ratio >= 7 ? "AAA" : "AA pass") : "Fail"}
                          </Badge>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Sub>
        </Section>

        {/* Type */}
        <Section id="type" eyebrow="Foundations" title="Type roles" intro="Fraunces gives the headlines a soft, wonky 1970s warmth, like the lettering on the original covers. Figtree keeps body copy and labels clean and legible.">
          <div className="overflow-hidden rounded-j-lg border border-j-border-subtle bg-j-surface">
            {typeRoles.map((t) => (
              <div key={t.key} className="grid gap-4 border-b border-j-border-subtle p-6 last:border-b-0 md:grid-cols-[12rem_1fr]">
                <div>
                  <p className="j-label text-j-terracotta">{t.name}</p>
                  <p className="j-caption mt-2 text-j-muted">
                    {t.family === "display" ? "Fraunces" : "Figtree"} · {t.weight}
                    <br />
                    {t.sizeLabel} / {t.line}
                    <br />
                    tracking {t.tracking}
                    {t.uppercase && <> · caps</>}
                  </p>
                </div>
                <p className={typeClass[t.key]}>{t.sample}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Spacing & shape */}
        <Section id="shape" eyebrow="Foundations" title="Spacing and shape" intro="A 4px base grid. Corners are soft with one signature: the leaf, round on two opposite corners and nearly square on the others.">
          <Sub title="Spacing scale" note="Uses Tailwind's 4px steps. Token number × 4 = pixels.">
            <ul className="flex flex-col gap-2">
              {spacing.map((s) => (
                <li key={s.token} className="flex items-center gap-4">
                  <code className="j-caption w-20 text-j-muted">space-{s.token}</code>
                  <span className="j-caption w-12 tabular-nums text-j-muted">{s.px}px</span>
                  <span className="h-4 rounded-sm bg-j-accent" style={{ width: s.px }} />
                </li>
              ))}
            </ul>
          </Sub>

          <Sub title="Corner radius">
            <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
              {radii.map((r) => (
                <li key={r.key} className="flex flex-col gap-3">
                  <div className="h-24 border-[1.5px] border-j-accent bg-j-surface" style={{ borderRadius: r.value }} />
                  <div>
                    <p className="j-body-strong">{r.name}</p>
                    <p className="j-caption text-j-muted">{r.value}</p>
                    <p className="j-caption text-j-muted">{r.use}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Sub>

          <Sub title="Borders">
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {borders.map((b) => (
                <li key={b.key} className="flex flex-col gap-3">
                  <div className="h-20 rounded-j-md bg-j-surface" style={{ border: b.value }} />
                  <div>
                    <p className="j-body-strong">{b.name}</p>
                    <p className="j-caption text-j-muted">{b.use}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Sub>

          <Sub title="Shadows" note="Deep, soft and tinted black. On a dark background they read as depth, not as a glow, except the sun glow used for focus.">
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {shadows.map((s) => (
                <li key={s.key} className="flex flex-col gap-3">
                  <div className="h-24 rounded-j-md bg-j-surface" style={{ boxShadow: s.value }} />
                  <div>
                    <p className="j-body-strong">{s.name}</p>
                    <p className="j-caption text-j-muted">{s.use}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Sub>
        </Section>

        {/* Components */}
        <Section id="components" eyebrow="Library" title="Components" intro="Every control is shown in the states it supports. Hover, focus and pressed are pinned here so you can see them; on a real page they respond to the pointer and keyboard.">
          <Sub title="Buttons" note="Primary for the one main action per view; secondary for the rest; ghost for low-emphasis actions.">
            <StateMatrix
              columns={STATES}
              rows={[
                {
                  name: "Primary",
                  cells: [
                    <Button key="a">Listen</Button>,
                    <Button key="b" data-force="hover">Listen</Button>,
                    <Button key="c" data-force="focus">Listen</Button>,
                    <Button key="d" data-force="pressed">Listen</Button>,
                    null,
                    <Button key="f" disabled>Listen</Button>,
                  ],
                },
                {
                  name: "Secondary",
                  cells: [
                    <Button key="a" variant="secondary">Tracklist</Button>,
                    <Button key="b" variant="secondary" data-force="hover">Tracklist</Button>,
                    <Button key="c" variant="secondary" data-force="focus">Tracklist</Button>,
                    <Button key="d" variant="secondary" data-force="pressed">Tracklist</Button>,
                    null,
                    <Button key="f" variant="secondary" disabled>Tracklist</Button>,
                  ],
                },
                {
                  name: "Ghost",
                  cells: [
                    <Button key="a" variant="ghost">Skip</Button>,
                    <Button key="b" variant="ghost" data-force="hover">Skip</Button>,
                    <Button key="c" variant="ghost" data-force="focus">Skip</Button>,
                    <Button key="d" variant="ghost" data-force="pressed">Skip</Button>,
                    null,
                    <Button key="f" variant="ghost" disabled>Skip</Button>,
                  ],
                },
              ]}
            />
            <div className="flex flex-wrap items-center gap-4">
              <Button size="lg">Large primary</Button>
              <Button size="lg" variant="secondary">Large secondary</Button>
            </div>
          </Sub>

          <Sub title="Link">
            <StateMatrix
              columns={["Rest", "Hover", "Focus", "Pressed", "Disabled"]}
              rows={[
                {
                  cells: [
                    <TextLink key="a" href="#">Read the liner notes</TextLink>,
                    <TextLink key="b" href="#" data-force="hover">Read the liner notes</TextLink>,
                    <TextLink key="c" href="#" data-force="focus">Read the liner notes</TextLink>,
                    <TextLink key="d" href="#" data-force="pressed">Read the liner notes</TextLink>,
                    <TextLink key="f" href="#" aria-disabled="true">Read the liner notes</TextLink>,
                  ],
                },
              ]}
            />
          </Sub>

          <Sub title="Text input">
            <StateMatrix
              columns={["Rest", "Hover", "Focus", "Error", "Success", "Disabled"]}
              top
              rows={[
                {
                  cells: [
                    <TextInput key="a" label="Your name" placeholder="Rosa" />,
                    <TextInput key="b" label="Your name" placeholder="Rosa" data-force="hover" />,
                    <TextInput key="c" label="Your name" placeholder="Rosa" data-force="focus" />,
                    <TextInput key="d" label="Email" defaultValue="rosa@" status="error" hint="Enter a full email address." />,
                    <TextInput key="e" label="Email" defaultValue="rosa@example.com" status="success" hint="Looks good." />,
                    <TextInput key="f" label="Your name" placeholder="Rosa" disabled />,
                  ],
                },
              ]}
            />
          </Sub>

          <Sub title="Select">
            <StateMatrix
              columns={["Rest", "Hover", "Focus", "Error", "Disabled"]}
              top
              rows={[
                {
                  cells: [
                    <Select key="a" label="Era" options={["1970s", "1980s", "Today"]} />,
                    <Select key="b" label="Era" options={["1970s", "1980s", "Today"]} data-force="hover" />,
                    <Select key="c" label="Era" options={["1970s", "1980s", "Today"]} data-force="focus" />,
                    <Select key="d" label="Era" options={["Choose…", "1970s"]} status="error" hint="Pick an era." />,
                    <Select key="e" label="Era" options={["1970s"]} disabled />,
                  ],
                },
              ]}
            />
          </Sub>

          <Sub title="Checkbox and radio">
            <StateMatrix
              columns={["Rest", "Hover", "Focus", "Pressed", "Selected", "Disabled"]}
              rows={[
                {
                  name: "Checkbox",
                  cells: [
                    <Checkbox key="a" label="Guitar" />,
                    <Checkbox key="b" label="Guitar" data-force="hover" />,
                    <Checkbox key="c" label="Guitar" data-force="focus" />,
                    <Checkbox key="d" label="Guitar" data-force="pressed" />,
                    <Checkbox key="e" label="Guitar" defaultChecked />,
                    <Checkbox key="f" label="Guitar" disabled />,
                  ],
                },
                {
                  name: "Radio",
                  cells: [
                    <Radio key="a" name="r1" label="Vinyl" />,
                    <Radio key="b" name="r2" label="Vinyl" data-force="hover" />,
                    <Radio key="c" name="r3" label="Vinyl" data-force="focus" />,
                    <Radio key="d" name="r4" label="Vinyl" data-force="pressed" />,
                    <Radio key="e" name="r5" label="Vinyl" defaultChecked />,
                    <Radio key="f" name="r6" label="Vinyl" disabled />,
                  ],
                },
              ]}
            />
          </Sub>

          <Sub title="Toggle">
            <StateMatrix
              columns={["Off", "Hover", "Focus", "On", "Disabled off", "Disabled on"]}
              rows={[
                {
                  cells: [
                    <Toggle key="a" label="Autoplay" />,
                    <Toggle key="b" label="Autoplay" data-force="hover" />,
                    <Toggle key="c" label="Autoplay" data-force="focus" />,
                    <Toggle key="d" label="Autoplay" defaultOn />,
                    <Toggle key="e" label="Autoplay" disabled />,
                    <Toggle key="f" label="Autoplay" defaultOn disabled />,
                  ],
                },
              ]}
            />
          </Sub>

          <Sub title="Filter chips" note="Multi-select. The first group is interactive.">
            <ChipGroup options={["All", "Guitar", "Percussion", "Vocals", "Studio"]} initial={["All"]} />
            <StateMatrix
              columns={STATES}
              rows={[
                {
                  cells: [
                    <Chip key="a">Percussion</Chip>,
                    <Chip key="b" data-force="hover">Percussion</Chip>,
                    <Chip key="c" data-force="focus">Percussion</Chip>,
                    <Chip key="d" data-force="pressed">Percussion</Chip>,
                    <Chip key="e" selected>Percussion</Chip>,
                    <Chip key="f" disabled>Percussion</Chip>,
                  ],
                },
              ]}
            />
          </Sub>

          <Sub title="Tabs" note="Arrow keys move between tabs.">
            <div className="rounded-j-lg border border-j-border-subtle bg-j-surface p-6">
              <Tabs
                tabs={[
                  { label: "About", content: <p className="j-body text-j-muted">Los Mirlos took the surf-guitar sound of the 1960s and wrapped it in Amazonian cumbia.</p> },
                  { label: "Players", content: <p className="j-body text-j-muted">Lead and rhythm guitars, bass, timbales and drums, congas, güiro, maracas and tambourine.</p> },
                  { label: "Press", content: <p className="j-body text-j-muted">Reviews and retrospectives would live here.</p> },
                  { label: "Archive", content: null, disabled: true },
                ]}
              />
            </div>
          </Sub>

          <Sub title="Badges">
            <div className="flex flex-wrap gap-3">
              <Badge>Neutral</Badge>
              <Badge tone="accent">New</Badge>
              <Badge tone="terracotta">1973</Badge>
              <Badge tone="teal">Live</Badge>
              <Badge tone="success">Available</Badge>
              <Badge tone="danger">Sold out</Badge>
            </div>
          </Sub>

          <Sub title="Navigation bar">
            <NavBar items={["Album", "Tracks", "Band", "Gallery"]} current="Tracks" />
          </Sub>

          <Sub title="Card" note="The leaf-shaped card is the home for photography. Swap the image for any file in /photos.">
            <div className="grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["Rest", <Card key="a" src={img.falls} eyebrow="Landscape" title="Gocta Falls" meta="Amazonas, Peru" />],
                ["Hover", <Card key="b" src={img.birds} eyebrow="Wildlife" title="Macaws over the canopy" meta="Madre de Dios" state="hover" />],
                ["Selected", <Card key="c" src={img.nazca} eyebrow="Pattern" title="Nazca glyphs" meta="Selected" state="selected" />],
                ["Disabled", <Card key="d" src={img.woman} eyebrow="Craft" title="Painted grains" meta="Unavailable" state="disabled" />],
              ].map(([label, card]) => (
                <div key={label as string} className="flex flex-col gap-3">
                  <p className="j-label text-j-muted">{label}</p>
                  {card}
                </div>
              ))}
            </div>
          </Sub>

          <Sub title="List rows (tracklist)">
            <ul className="overflow-hidden rounded-j-lg border border-j-border-subtle bg-j-surface">
              <TrackRow n={1} title="El Sonido Selvático" length="3:12" note="Rest" />
              <TrackRow n={2} title="La Danza del Río" length="2:58" note="Hover" force="hover" />
              <TrackRow n={3} title="Tarapoto Nights" length="4:05" note="Focus" force="focus" />
              <TrackRow n={4} title="Canto a la Selva" length="3:40" note="Selected" state="selected" />
              <TrackRow n={5} title="Bonus: unreleased" length="3:01" state="disabled" />
            </ul>
            <p className="j-caption text-j-muted">Track titles are placeholders.</p>
          </Sub>

          <Sub title="Detail panel and modal" note="Panel for inline detail, modal for focus. The modal is a native dialog: Escape and a backdrop click close it.">
            <DetailPanel src={img.vine} eyebrow="Instrument · Percussion" title="Güiro">
              A notched gourd scraped with a stick. It gives cumbia its rolling, rasping pulse.
            </DetailPanel>
            <div>
              <ModalDemo triggerLabel="Open modal" src={img.falls} eyebrow="Track 04" title="Canto a la Selva">
                A long-form detail view for a track or a band member. Content, credits and a call to action fit here.
              </ModalDemo>
            </div>
          </Sub>

          <Sub title="Pull quote and divider">
            <PullQuote cite="Placeholder review">The jungle never sounded this electric.</PullQuote>
            <NazcaDivider />
          </Sub>
        </Section>

        {/* UI states */}
        <Section id="states" eyebrow="Feedback" title="UI states" intro="What the page shows when there is nothing, something is happening, it went wrong, or it worked.">
          <div className="grid gap-6 md:grid-cols-2">
            <Sub title="Empty">
              <EmptyState src="/photos/maracas.png" title="No tracks match" action={<Button variant="secondary">Clear filters</Button>}>
                Try removing a filter, or browse the whole album.
              </EmptyState>
            </Sub>
            <Sub title="Loading">
              <div className="flex max-w-sm flex-col gap-4">
                <LoadingCard />
                <Spinner label="Loading tracks…" />
              </div>
            </Sub>
            <Sub title="Error">
              <ErrorState title="Couldn&rsquo;t load the gallery">Check your connection and try again.</ErrorState>
            </Sub>
            <Sub title="Success">
              <SuccessState title="You&rsquo;re on the list" action={<Button variant="ghost">Back to album</Button>}>
                We&rsquo;ll write when the tribute goes live.
              </SuccessState>
            </Sub>
          </div>
          <Sub title="Inline alerts">
            <div className="flex flex-col gap-3">
              <Alert tone="info" title="New photos added">Fifteen scans from the 1973 sessions.</Alert>
              <Alert tone="success" title="Saved">Your selection has been saved.</Alert>
              <Alert tone="error" title="Something went wrong">The audio file could not be played.</Alert>
            </div>
          </Sub>
        </Section>

        {/* Imagery */}
        <Section id="imagery" eyebrow="Content" title="Placing images" intro="The band and instrument photos from /photos aren&rsquo;t styling inputs; they're content. These frames show how each kind of image sits on the page.">
          <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
            <Sub title="Album covers" note="Square, in a Nazca-dotted frame.">
              <div className="grid grid-cols-2 gap-4">
                <CoverFrame src="/photos/mirlos2026albumCover.jpeg" alt="Los Mirlos Meets The World, 2026 cover" caption="2026" />
                <CoverFrame src="/photos/losMirlos1973cover.jpeg" alt="El Sonido Selvático, 1973 cover" caption="1973" />
              </div>
            </Sub>
            <Sub title="Band photograph" note="Wide, leaf-cornered, with a caption.">
              <figure>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/photos/bandaCAmisasTigreInstrumentos.jpg" alt="The band in tiger-print shirts with their instruments" className="aspect-[4/3] w-full rounded-j-leaf object-cover shadow-j-2" />
                <figcaption className="j-caption mt-2 text-j-muted">Los Mirlos with their instruments</figcaption>
              </figure>
            </Sub>
          </div>

          <Sub title="Band cut-out" note="The transparent band PNG sits on a color field and can break out of its frame.">
            <div className="relative overflow-hidden rounded-j-leaf bg-j-terracotta px-6 pt-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/photos/mirlosGrupoTransparent.png" alt="Los Mirlos, cut out from their background" loading="lazy" className="mx-auto block max-h-96 w-auto object-contain drop-shadow-[0_10px_16px_rgba(0,0,0,0.35)]" />
            </div>
          </Sub>

          <Sub title="Instrument cut-outs" note="Objects sit on a paper-colored tile with a colored base. Some of the instrument files have white backgrounds instead of transparency; the tile blends those away.">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <CutoutTile src="/photos/GuitarraPrimera.png" alt="Lead guitar" label="Guitarra primera" tone="terracotta" />
              <CutoutTile src="/photos/guitarraSegunda.png" alt="Rhythm guitar" label="Guitarra segunda" tone="teal" />
              <CutoutTile src="/photos/bajoElectrica.png" alt="Electric bass" label="Bajo eléctrico" tone="accent" />
              <CutoutTile src="/photos/timbalBateria.png" alt="Timbales and drums" label="Timbal y batería" tone="terracotta" />
              <CutoutTile src="/photos/guiro.jpg" alt="Güiro" label="Güiro" tone="teal" />
              <CutoutTile src="/photos/maracas.png" alt="Maracas" label="Maracas" tone="accent" />
              <CutoutTile src="/photos/tambourineHandheld.jpg" alt="Tambourine" label="Pandereta" tone="terracotta" />
              <CutoutTile src="/photos/congas.png" alt="Congas" label="Congas" tone="teal" />
            </div>
          </Sub>
        </Section>
      </main>
    </JungleTheme>
  );
}
