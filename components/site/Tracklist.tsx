"use client";

import { useState } from "react";
import { Band } from "@/components/ds/band";
import { Badge, Button } from "@/components/ds/controls";
import { TrackRow } from "@/components/ds/surfaces";
import { guestCount, tracks } from "@/lib/album";

const COVER = "/photos/mirlos2026albumCover.jpeg";
const BAND_PHOTO = "/photos/bandaCAmisasTigreInstrumentos.jpg";

export function Tracklist() {
  const [selected, setSelected] = useState(0);
  const track = tracks[selected];
  const go = (step: number) => setSelected((selected + step + tracks.length) % tracks.length);

  return (
    <section id="tracklist" className="scroll-mt-28 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-12">
          <div>
            <p className="ds-label text-ds-accent-2">The songs</p>
            <h2 className="ds-h1 mt-3 max-w-2xl text-balance">Twelve songs, a different guest on every one</h2>
            <p className="ds-body mt-4 max-w-2xl text-ds-muted">
              Los Mirlos open their sound, psychedelic Amazonian cumbia, to {guestCount} artists from across Latin America
              and beyond. Choose a song to see who joins them.
            </p>
          </div>

          <figure className="ds-lift overflow-hidden rounded-ds-lg bg-ds-surface shadow-ds-3">
            <Band edge="top" />
            <div className="p-3 sm:p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={BAND_PHOTO}
                alt="The seven members of Los Mirlos in leopard-print shirts and green trousers, playing congas, timbales, tambourine, güiro and guitars"
                loading="lazy"
                className="aspect-[4/3] w-full rounded-ds-md object-cover object-[50%_30%] sm:aspect-[16/10]"
              />
            </div>
            <Band edge="bottom" />
          </figure>
        </div>

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

          {/* Desktop: sticky detail panel */}
          <aside aria-live="polite" className="hidden overflow-hidden rounded-ds-lg bg-ds-surface shadow-ds-2 lg:sticky lg:top-24 lg:block">
            <Band edge="top" />
            <div key={track.n} className="ds-rise flex flex-col gap-6 p-6" style={{ animationDuration: "400ms" }}>
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

              <div className="flex gap-2">
                <Button variant="secondary" aria-label="Previous song" onClick={() => go(-1)}>
                  <span aria-hidden>←</span> Prev
                </Button>
                <Button variant="secondary" aria-label="Next song" onClick={() => go(1)}>
                  Next <span aria-hidden>→</span>
                </Button>
              </div>
            </div>
            <Band edge="bottom" />
          </aside>

          {/* Phones and tablets: a mini bar that stays at the bottom of the screen while you browse the list */}
          <div
            aria-live="polite"
            className="sticky bottom-3 z-30 overflow-hidden rounded-ds-lg bg-ds-raised shadow-ds-3 ring-1 ring-ds-border lg:hidden"
          >
            <Band edge="top" />
            <div className="flex items-center gap-3 p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={COVER} alt="" className="size-14 shrink-0 rounded-ds-sm object-cover" />
              <div key={track.n} className="ds-rise min-w-0 flex-1" style={{ animationDuration: "350ms" }}>
                <p className="ds-label text-ds-accent-2">
                  Song {String(track.n).padStart(2, "0")} of {tracks.length}
                </p>
                <p className="ds-body-strong truncate">{track.title}</p>
                <p className="ds-caption truncate text-ds-muted">with {track.featuring.join(", ")}</p>
              </div>
              <div className="flex shrink-0 gap-1">
                <Button variant="secondary" aria-label="Previous song" onClick={() => go(-1)} className="w-11 px-0">
                  <span aria-hidden>←</span>
                </Button>
                <Button variant="secondary" aria-label="Next song" onClick={() => go(1)} className="w-11 px-0">
                  <span aria-hidden>→</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
