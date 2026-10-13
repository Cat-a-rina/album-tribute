"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Chip, Toggle } from "@/components/ds/controls";
import { DesignTheme } from "@/components/ds/theme";
import { siteThemes } from "@/lib/site-themes";
import { Chakana } from "./motifs";

const links = [
  { id: "tiny-desk", label: "Tiny Desk" },
  { id: "tracklist", label: "Songs" },
  { id: "forest", label: "Forest" },
  { id: "tour", label: "Tour" },
];

/** Themed page frame: sticky header with section links, plus the Style panel (palette chips and a patterns switch). */
export function SiteShell({ children }: { children: ReactNode }) {
  const [themeKey, setThemeKey] = useState(siteThemes[0].key);
  const [patterns, setPatterns] = useState(true);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const theme = siteThemes.find((t) => t.key === themeKey) ?? siteThemes[0];

  // Highlight the link of the section in the middle of the screen.
  useEffect(() => {
    const els = links.map((l) => document.getElementById(l.id)).filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);

  // Close the Style panel on Escape or a click outside it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDown = (e: PointerEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  const linkClass = (id: string) =>
    [
      "ds-label inline-flex h-11 shrink-0 items-center rounded-ds-sm px-3 outline-none transition-colors fx-focus:ds-focus-ring",
      active === id
        ? "text-ds-accent-text underline decoration-2 underline-offset-8"
        : "text-ds-muted fx-hover:bg-ds-raised fx-hover:text-ds-text",
    ].join(" ");

  return (
    <DesignTheme system={theme.system} className="min-h-screen transition-colors duration-500">
      <div data-patterns={patterns ? "on" : "off"} id="top">
        <header className="sticky top-0 z-40 border-b border-ds-border-subtle bg-ds-bg/90 backdrop-blur">
          <div ref={panelRef} className="relative">
            <div className="mx-auto flex h-14 w-full max-w-6xl items-center gap-3 px-4 sm:px-6">
              <a
                href="#top"
                className="ds-h3 flex shrink-0 items-center gap-2 rounded-ds-sm outline-none fx-focus:ds-focus-ring"
              >
                <Chakana className="size-5 text-ds-accent-2" />
                <span>
                  Los Mirlos<span className="text-ds-accent-text">.</span>
                </span>
              </a>

              <nav aria-label="Sections" className="ml-auto hidden items-center gap-1 md:flex">
                {links.map((l) => (
                  <a key={l.id} href={`#${l.id}`} aria-current={active === l.id ? "location" : undefined} className={linkClass(l.id)}>
                    {l.label}
                  </a>
                ))}
              </nav>

              <button
                type="button"
                aria-expanded={open}
                aria-controls="style-panel"
                onClick={() => setOpen(!open)}
                className="ds-label ml-auto inline-flex h-11 shrink-0 cursor-pointer items-center gap-2 rounded-full border-[length:var(--ds-bw)] border-ds-border px-4 outline-none transition-colors fx-hover:border-ds-border-strong fx-hover:bg-ds-raised fx-focus:ds-focus-ring md:ml-2"
              >
                <span aria-hidden className="flex -space-x-1">
                  <span className="size-3.5 rounded-full ring-2 ring-ds-bg" style={{ background: theme.swatch[0] }} />
                  <span className="size-3.5 rounded-full ring-2 ring-ds-bg" style={{ background: theme.swatch[1] }} />
                </span>
                Style
              </button>
            </div>

            {/* Section links as a swipeable row on phones */}
            <nav aria-label="Sections" className="mx-auto flex w-full max-w-6xl gap-1 overflow-x-auto px-3 pb-1 [scrollbar-width:none] md:hidden">
              {links.map((l) => (
                <a key={l.id} href={`#${l.id}`} aria-current={active === l.id ? "location" : undefined} className={linkClass(l.id)}>
                  {l.label}
                </a>
              ))}
            </nav>

            {open && (
              <div
                id="style-panel"
                role="group"
                aria-label="Style"
                className="absolute inset-x-0 top-full z-50 border-b border-ds-border-subtle bg-ds-surface shadow-ds-3 sm:inset-x-auto sm:right-6 sm:top-[calc(100%+0.5rem)] sm:w-[26rem] sm:rounded-ds-lg sm:border"
              >
                <div className="flex flex-col gap-6 p-5">
                  <div>
                    <p className="ds-label text-ds-muted">Colors</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {siteThemes.map((t) => (
                        <Chip key={t.key} selected={t.key === themeKey} onClick={() => setThemeKey(t.key)}>
                          <span aria-hidden className="flex -space-x-1">
                            {t.swatch.map((c) => (
                              <span key={c} className="size-3.5 rounded-full border border-ds-border" style={{ background: c }} />
                            ))}
                          </span>
                          {t.name}
                        </Chip>
                      ))}
                    </div>
                  </div>
                  <Toggle label="Patterns" checked={patterns} onCheckedChange={setPatterns} />
                </div>
              </div>
            )}
          </div>
        </header>
        {children}
      </div>
    </DesignTheme>
  );
}
