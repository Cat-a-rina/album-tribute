import Link from "next/link";
import { designSystems } from "@/lib/design-systems";
import { getMoodboardImages, moodboards } from "@/lib/moodboards";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-16">
      <header className="mb-16">
        <p className="text-sm uppercase tracking-widest text-foreground/60">Hub</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">
          The World Meets Los Mirlos
        </h1>
        <p className="mt-3 max-w-xl text-foreground/70">
          A tribute to the album by Los Mirlos. Moodboards, design systems and
          the final site all live here.
        </p>
      </header>

      <section className="mb-16">
        <h2 className="mb-6 text-xl font-medium">Moodboards</h2>
        <ul className="grid gap-6 sm:grid-cols-3">
          {moodboards.map((board) => {
            const images = getMoodboardImages(board.folder);
            return (
              <li key={board.slug}>
                <Link
                  href={`/moodboards/${board.slug}`}
                  className="group block overflow-hidden rounded-lg border border-foreground/15 transition-colors hover:border-foreground/50"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={images[0]}
                    alt=""
                    className="aspect-[4/3] w-full object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-medium group-hover:underline">{board.title}</h3>
                    <p className="mt-1 text-sm text-foreground/60">
                      {images.length} images
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mb-16">
        <h2 className="mb-6 text-xl font-medium">Design systems</h2>
        <ul className="grid gap-6 sm:grid-cols-3">
          {designSystems.map((system) => (
            <li key={system.slug}>
              <Link
                href={`/design-systems/${system.slug}`}
                className="group block overflow-hidden rounded-lg border border-foreground/15 transition-colors hover:border-foreground/50"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={system.cover}
                  alt=""
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="font-medium group-hover:underline">{system.name}</h3>
                  <p className="mt-1 text-sm text-foreground/60">{system.summary}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mb-6 text-xl font-medium">Site</h2>
        <ul className="grid gap-6 sm:grid-cols-3">
          <li>
            <Link
              href="/site"
              className="group block overflow-hidden rounded-lg border border-foreground/15 transition-colors hover:border-foreground/50"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/photos/mirlos2026albumCover.jpeg" alt="" className="aspect-[4/3] w-full object-cover" />
              <div className="p-4">
                <h3 className="font-medium group-hover:underline">Tribute site</h3>
                <p className="mt-1 text-sm text-foreground/60">Jungle theme · in progress: opening screen</p>
              </div>
            </Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
