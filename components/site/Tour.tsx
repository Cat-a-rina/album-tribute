import { Band } from "@/components/ds/band";
import { Badge } from "@/components/ds/controls";
import { tourLegs } from "@/lib/tour";
import { PatternStrip } from "./motifs";

/** The world tour, grouped by leg. */
export function Tour() {
  return (
    <section id="tour" className="scroll-mt-8 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-6">
        <p className="ds-label text-ds-accent-2">On the road</p>
        <h2 className="ds-h1 mt-3 max-w-2xl text-balance">Taking the message to the world</h2>
        <p className="ds-body mt-4 max-w-2xl text-ds-muted">
          From Chicago to Utrecht and the California coast, and now home across South America. The tour also includes
          festivals such as the Montreal International Jazz Festival and Lima&rsquo;s Una Noche en Perú.
        </p>

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-2">
          {tourLegs.map((leg) => (
            <div key={leg.region} className="overflow-hidden rounded-ds-lg bg-ds-surface shadow-ds-2">
              <Band edge="top" />
              <PatternStrip variant="kene" scale={0.6} className="mt-3 text-ds-accent-2 opacity-70" />
              <div className="p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="ds-h2">{leg.region}</h3>
                  <Badge tone={leg.status === "upcoming" ? "accent" : "neutral"}>
                    {leg.status === "upcoming" ? "Coming up" : "Played"}
                  </Badge>
                </div>
                <ul className="mt-4 flex flex-col divide-y divide-ds-border-subtle">
                  {leg.shows.map((s) => (
                    <li key={`${s.date}-${s.place}`} className="grid grid-cols-[6.5rem_1fr] gap-4 py-3">
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
