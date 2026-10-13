"use client";

import { useState } from "react";
import { Band } from "@/components/ds/band";
import { Badge } from "@/components/ds/controls";
import { TrackRow } from "@/components/ds/surfaces";
import { guestCount, tracks } from "@/lib/album";

const COVER = "/photos/mirlos2026albumCover.jpeg";

export function Tracklist() {
  const [selected, setSelected] = useState(0);
  const track = tracks[selected];

  return (
    <section id="tracklist" className="scroll-mt-8 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-6">
        <p className="ds-label text-ds-accent-2">The songs</p>
        <h2 className="ds-h1 mt-3 max-w-2xl text-balance">Twelve songs, a different guest on every one</h2>
        <p className="ds-body mt-4 max-w-2xl text-ds-muted">
          Los Mirlos open their sound, psychedelic Amazonian cumbia, to {guestCount} artists from across Latin America and
          beyond. Choose a song to see who joins them.
        </p>

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-12">
          <ol className="overflow-hidden rounded-ds-lg border border-ds-border-subtle bg-ds-surface" aria-label="Tracklist">
            {tracks.map((t, i) => (
              <TrackRow
                key={t.n}
                n={t.n}
                title={t.title}
                note={`with ${t.featuring.join(", ")}`}
                state={i === selected ? "selected" : "rest"}
                selectedLabel="Selected"
                onSelect={() => setSelected(i)}
              />
            ))}
          </ol>

          <aside
            aria-live="polite"
            className="overflow-hidden rounded-ds-lg bg-ds-surface shadow-ds-2 lg:sticky lg:top-8"
          >
            <Band edge="top" />
            <div className="flex flex-col gap-6 p-6">
              <div className="flex items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={COVER} alt="" className="size-20 shrink-0 rounded-ds-md object-cover" />
                <div>
                  <p className="ds-label text-ds-accent-2">
                    Song {String(track.n).padStart(2, "0")} of {tracks.length}
                  </p>
                  <h3 className="ds-h2 mt-1">{track.title}</h3>
                </div>
              </div>

              <div>
                <p className="ds-label text-ds-muted">Featuring</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {track.featuring.map((name) => (
                    <li key={name}>
                      <Badge tone="accent">{name}</Badge>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="ds-caption text-ds-muted">
                From <span className="ds-body-strong text-ds-text">The World Meets Los Mirlos</span>, out May 15, 2026.
              </p>
            </div>
            <Band edge="bottom" />
          </aside>
        </div>
      </div>
    </section>
  );
}
