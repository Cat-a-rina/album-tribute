import Link from "next/link";
import type { DesignSystem, Pairing } from "@/lib/design-systems/types";
import { DesignTheme } from "./theme";
import { Badge, Button, TextLink } from "./controls";
import { Card } from "./surfaces";

function withPairing(system: DesignSystem, p: Pairing): DesignSystem {
  return {
    ...system,
    fonts: { ...system.fonts, display: p.display, heading: p.display, body: p.body, displayName: p.displayName, headingName: p.displayName, bodyName: p.bodyName, fvs: "normal" },
    typeRoles: system.typeRoles.map((r) => {
      if (r.family === "display" || r.family === "heading") {
        const key = r.key as "display" | "h1" | "h2" | "h3";
        return { ...r, weight: p.weights[key], tracking: p.tracking, size: p.sizes?.[key] ?? r.size, line: p.line ?? r.line };
      }
      if (r.key === "bodyStrong") return { ...r, weight: p.weights.bodyStrong };
      return r;
    }),
  };
}

/** Side-by-side font pairings shown in a system's own colors and components. */
export function FontOptionsPage({
  system,
  pairings,
  fontClasses,
}: {
  system: DesignSystem;
  pairings: Pairing[];
  /** next/font variable classes for every candidate. */
  fontClasses: string;
}) {
  return (
    <div className={`${fontClasses} min-h-screen`}>
      <DesignTheme system={system}>
        <main className="mx-auto w-full max-w-6xl px-6 pb-24 pt-10">
          <Link
            href={`/design-systems/${system.slug}`}
            className="ds-label inline-block rounded-ds-sm text-ds-muted outline-none hover:text-ds-accent-text focus-visible:ds-focus-ring"
          >
            ← {system.name} design system
          </Link>
          <header className="pb-12 pt-10">
            <p className="ds-label text-ds-accent-2">{system.name} · type exploration</p>
            <h1 className="ds-h1 mt-3">Font options</h1>
            <p className="ds-body mt-4 max-w-2xl text-ds-muted">
              {pairings.length} display and body pairings, each shown in the {system.name} colors and components.
              Everything else in the system stays the same. Tell me a number and I&rsquo;ll apply it to the whole system.
            </p>
          </header>

          <ol className="flex flex-col gap-16">
            {pairings.map((p) => (
              <li key={p.id}>
                <DesignTheme system={withPairing(system, p)} className="rounded-ds-lg border border-ds-border-subtle p-8 sm:p-10">
                  <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-ds-border-subtle pb-5">
                    <p className="ds-label text-ds-accent-2">
                      Option {p.id} · {p.name}
                    </p>
                    <p className="ds-caption text-ds-muted">
                      {p.displayName} + {p.bodyName}
                    </p>
                  </div>
                  <p className="ds-body mt-4 max-w-2xl text-ds-muted">{p.mood}</p>

                  <div className="mt-8 grid items-start gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
                    <div className="flex flex-col gap-6">
                      <h2 className="ds-display">Los Mirlos Meets The World</h2>
                      <h3 className="ds-h1">El Sonido Selvático</h3>
                      <h4 className="ds-h2">Amazonian cumbia, electrified</h4>
                      <h5 className="ds-h3">Tarapoto, 1970s</h5>
                      <p className="ds-body max-w-xl text-ds-muted">
                        Surf guitars, congas and güiro carried the sound of the Peruvian jungle to the rest of the
                        world. <span className="ds-body-strong text-ds-text">Recorded in Lima, played everywhere.</span>
                      </p>
                      <p className="ds-caption text-ds-muted">Photo: archive scan, 1973 pressing</p>
                      <div className="flex flex-wrap items-center gap-4">
                        <Button>Listen</Button>
                        <Button variant="secondary">Tracklist</Button>
                        <Badge tone="secondary">1973</Badge>
                        <TextLink href="#">Read the liner notes</TextLink>
                      </div>
                      <p className="ds-label text-ds-muted">Track 04 · 3:12</p>
                    </div>

                    <Card src={system.images.cards[0]} eyebrow="Gallery" title="El Sonido Selvático" meta="1973 pressing" />
                  </div>
                </DesignTheme>
              </li>
            ))}
          </ol>
        </main>
      </DesignTheme>
    </div>
  );
}
