import { Band } from "@/components/ds/band";
import { Badge, TextLink } from "@/components/ds/controls";
import { tinyDesk } from "@/lib/tour";
import { PatternField } from "./motifs";

/** NPR Tiny Desk: the band carries the message to a US audience. */
export function TinyDesk() {
  return (
    <section id="tiny-desk" className="scroll-mt-8 py-20 sm:py-28">
      <div className="mx-auto grid w-full max-w-6xl items-start gap-12 px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
        <div>
          <p className="ds-label text-ds-accent-2">At the desk</p>
          <h2 className="ds-h1 mt-3 text-balance">Five songs and the story of the Amazon, at NPR&rsquo;s Tiny Desk</h2>
          <p className="ds-body mt-4 text-ds-muted">
            Los Mirlos have played Peruvian cumbia for more than fifty years. Their Tiny Desk debut was part of{" "}
            {tinyDesk.series}. Between songs they told stories of the small towns of the Amazon that shaped the sound.
          </p>
          <p className="ds-body mt-4 text-ds-muted">
            They dedicated &ldquo;Llanto en la Selva&rdquo; to Indigenous Amazonian land defenders, and wore clothing
            with kené, the geometric designs made by Shipibo-Konibo women.
          </p>
          <p className="mt-6">
            <TextLink href={tinyDesk.url} target="_blank" rel="noreferrer">
              Watch the Tiny Desk concert on NPR
            </TextLink>
          </p>
        </div>

        <div className="relative overflow-hidden rounded-ds-lg bg-ds-surface shadow-ds-2">
          <Band edge="top" />
          <PatternField variant="kene" className="text-ds-accent opacity-[0.07]" />
          <div className="relative flex flex-col gap-6 p-6">
            <div className="flex flex-wrap items-center gap-3">
              <Badge tone="accent">Tiny Desk Concert</Badge>
              <span className="ds-label text-ds-muted">Posted {tinyDesk.posted}</span>
            </div>
            <div>
              <p className="ds-label text-ds-muted">The set</p>
              <ol className="mt-3 flex flex-col divide-y divide-ds-border-subtle">
                {tinyDesk.songs.map((s, i) => (
                  <li key={s} className="flex items-baseline gap-4 py-3">
                    <span className="ds-label w-6 text-ds-accent-2">{String(i + 1).padStart(2, "0")}</span>
                    <span className="ds-h3">{s}</span>
                  </li>
                ))}
              </ol>
            </div>
            <p className="ds-caption text-ds-muted">Recorded on {tinyDesk.recorded}, Peru&rsquo;s Independence Day.</p>
          </div>
          <Band edge="bottom" />
        </div>
      </div>
    </section>
  );
}
