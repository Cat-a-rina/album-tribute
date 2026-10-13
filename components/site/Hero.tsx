import { Band } from "@/components/ds/band";
import { Badge, ButtonLink } from "@/components/ds/controls";
import { Chakana } from "./motifs";

export const ALBUM = {
  title: "The World Meets Los Mirlos",
  artist: "Los Mirlos",
  cover: "/photos/mirlos2026albumCover.jpeg",
  coverAlt:
    "Album cover: an illustrated Amazon rainforest framed by vines and leaves, with a jaguar, a black bird with spread wings, a hummingbird, orchids, a pink river dolphin and a sun and moon in a pastel sky.",
};

/** The first screen: the album cover, its title, and who it is by. */
export function Hero() {
  return (
    <section className="relative isolate flex min-h-[calc(100svh-6.5rem)] flex-col md:min-h-[calc(100svh-3.5rem)] overflow-hidden">
      {/* Faint green lift at the top, no warm glow */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{ background: "radial-gradient(60% 40% at 50% 0%, var(--ds-surface), transparent 80%)" }}
      />

      <Band edge="top" />

      <div className="mx-auto grid w-full max-w-6xl flex-1 items-center gap-12 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] lg:gap-16 lg:py-20">
        {/* Cover */}
        <div className="ds-rise mx-auto w-full max-w-[34rem] lg:max-w-none">
          <div className="overflow-hidden rounded-ds-lg bg-ds-surface shadow-ds-3">
            <Band edge="top" />
            <div className="p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={ALBUM.cover}
                alt={ALBUM.coverAlt}
                fetchPriority="high"
                className="aspect-square w-full rounded-ds-md object-cover"
              />
            </div>
            <Band edge="bottom" />
          </div>
        </div>

        {/* Title and artist */}
        <div className="flex flex-col items-start gap-7">
          <div className="ds-rise flex flex-wrap items-center gap-3" style={{ animationDelay: "120ms" }}>
            <Badge tone="accent">Psychedelic cumbia</Badge>
            <span className="ds-label text-ds-muted">The new album</span>
          </div>
          <p className="ds-rise ds-label -mb-3 flex items-center gap-2 text-ds-muted" style={{ animationDelay: "160ms" }}>
            <Chakana className="size-4 text-ds-accent-2" />
            From Moyobamba, in the Peruvian Amazon
          </p>

          <h1 className="ds-display ds-rise text-balance" style={{ animationDelay: "220ms" }}>
            {ALBUM.title}
          </h1>

          <div className="ds-rise flex flex-col gap-1" style={{ animationDelay: "340ms" }}>
            <p className="ds-label text-ds-accent-2">A new album by</p>
            <p className="ds-h1 text-ds-accent-text">{ALBUM.artist}</p>
          </div>

          <p className="ds-body ds-rise max-w-md text-ds-muted" style={{ animationDelay: "460ms" }}>
            Amazonian cumbia, turned psychedelic, with a different featured guest on every song.
          </p>

          <div className="ds-rise flex flex-wrap gap-3" style={{ animationDelay: "560ms" }}>
            <ButtonLink href="#tiny-desk" size="lg">
              Watch the story
            </ButtonLink>
            <ButtonLink href="#tracklist" variant="secondary" size="lg">
              Meet the guests
            </ButtonLink>
          </div>
        </div>
      </div>

      <a
        href="#tiny-desk"
        aria-label="Scroll to the next section"
        data-motif
        className="ds-bob mx-auto mb-5 hidden size-11 items-center justify-center rounded-full text-ds-accent-text outline-none fx-focus:ds-focus-ring sm:flex"
      >
        <span aria-hidden className="text-2xl leading-none">↓</span>
      </a>

      <Band edge="bottom" />
    </section>
  );
}
