import { Band } from "@/components/ds/band";
import { CutoutTile } from "@/components/ds/surfaces";
import { instruments } from "@/lib/album";
import { PatternField } from "./motifs";

export function Forest() {
  return (
    <section id="forest" className="scroll-mt-28 py-20 sm:py-28">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-20 px-4 sm:px-6">
        {/* Intro */}
        <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <p className="ds-label text-ds-accent-2">The forest</p>
            <h2 className="ds-h1 mt-3 text-balance">A sound that grows out of the Amazon</h2>
          </div>
          <p className="ds-body text-ds-muted">
            The forest is in everything Los Mirlos make. Protecting it is part of their message, and it has shaped
            the music, down to the instruments in their hands. They carry that message from the small towns of the
            Amazon to the NPR Tiny Desk and on tour around the world.
          </p>
        </div>

        {/* Instruments */}
        <div>
          <h3 className="ds-h2">The instruments</h3>
          <p className="ds-body mt-2 max-w-2xl text-ds-muted">
            Two guitars, bass, timbales and drums, congas, güiro, maracas and a tambourine. Together they make the
            rolling, interlocking sound of Amazonian cumbia.
          </p>
          <ul className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
            {instruments.map((it) => (
              <li key={it.name} className="ds-lift flex flex-col gap-3 [&_img]:transition-transform [&_img]:duration-300 hover:[&_img]:scale-110">
                <CutoutTile src={it.src} alt={it.name} label={it.name} tone={it.tone} />
                <p className="ds-caption text-ds-muted">{it.role}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Attire */}
        <div className="overflow-hidden rounded-ds-lg bg-ds-surface shadow-ds-2">
          <Band edge="top" />
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
            <div className="flex flex-col gap-4 p-8 sm:p-12">
              <p className="ds-label text-ds-accent-2">The clothes</p>
              <h3 className="ds-h1 text-balance">Made by local artisan women</h3>
              <p className="ds-body text-ds-muted">
                The band&rsquo;s stage clothes are made by local artisan women. What Los Mirlos wear carries the same
                message as what they play: that the people and the places of the Amazon deserve to be heard.
              </p>
            </div>
            <div className="relative flex items-end justify-center self-stretch bg-ds-accent-2 px-6 pt-8">
              <PatternField variant="kene" className="text-ds-text opacity-[0.16]" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/photos/mirlosGrupoTransparent.png"
                alt="The six members of Los Mirlos standing together in patterned shirts and long beaded necklaces"
                loading="lazy"
                className="relative max-h-[26rem] w-auto object-contain drop-shadow-[0_10px_16px_rgba(0,0,0,0.35)]"
              />
            </div>
          </div>
          <Band edge="bottom" />
        </div>
      </div>
    </section>
  );
}
