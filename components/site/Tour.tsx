"use client";

import { useState } from "react";
import { Band } from "@/components/ds/band";
import { Badge, Chip } from "@/components/ds/controls";
import { tourLegs } from "@/lib/tour";
import { PatternStrip } from "./motifs";

const filters = [
  { key: "all", label: "All dates" },
  { key: "upcoming", label: "Coming up" },
  { key: "played", label: "Played" },
] as const;

/** The world tour, grouped by leg, with a filter. */
export function Tour() {
  const [filter, setFilter] = useState<(typeof filters)[number]["key"]>("all");
  const legs = tourLegs.filter((l) => filter === "all" || l.status === filter);

  return (
    <section id="tour" className="scroll-mt-28 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <p className="ds-label text-ds-accent-2">On the road</p>
        <h2 className="ds-h1 mt-3 max-w-2xl text-balance">Taking the message to the world</h2>
        <p className="ds-body mt-4 max-w-2xl text-ds-muted">
          From Chicago to Utrecht and the California coast, and now home across South America. The tour also includes
          festivals such as the Montreal International Jazz Festival and Lima&rsquo;s Una Noche en Perú.
        </p>

        <div role="group" aria-label="Filter tour dates" className="mt-8 flex flex-wrap gap-2">
          {filters.map((f) => (
            <Chip key={f.key} selected={filter === f.key} onClick={() => setFilter(f.key)}>
              {f.label}
            </Chip>
          ))}
        </div>

        <div className="mt-8 grid items-start gap-6 lg:grid-cols-2 lg:gap-8">
          {legs.map((leg) => (
            <div key={leg.region} className="ds-rise ds-lift overflow-hidden rounded-ds-lg bg-ds-surface shadow-ds-2" style={{ animationDuration: "500ms" }}>
              <Band edge="top" />
              <PatternStrip variant="kene" scale={0.6} className="mt-3 text-ds-accent-2 opacity-70" />
              <div className="p-5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="ds-h2">{leg.region}</h3>
                  <Badge tone={leg.status === "upcoming" ? "accent" : "neutral"}>
                    {leg.status === "upcoming" ? "Coming up" : "Played"}
                  </Badge>
                </div>
                <ul className="mt-4 flex flex-col divide-y divide-ds-border-subtle">
                  {leg.shows.map((s) => (
                    <li key={`${s.date}-${s.place}`} className="grid grid-cols-[5.5rem_1fr] gap-3 py-3 sm:grid-cols-[6.5rem_1fr] sm:gap-4">
                      <span className="ds-label pt-1 text-ds-accent-2">{s.date}</span>
                      <span>
                        <span className="ds-body-strong block">{s.place}</span>
                        {s.venue && <span className="ds-caption text-ds-muted">{s.venue}</span>}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <Band edge="bottom" />
            </div>
          ))}
        </div>
        <p className="ds-caption mt-6 text-ds-muted">Dates from public listings. Check with each venue before travelling.</p>
      </div>
    </section>
  );
}
