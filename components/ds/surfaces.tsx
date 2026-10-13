"use client";

import { useId, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Badge, Button, type Force } from "./controls";

const cx = (...parts: (string | false | undefined)[]) => parts.filter(Boolean).join(" ");

// ---------- Tabs ----------
export function Tabs({ tabs }: { tabs: { label: string; content: ReactNode; disabled?: boolean }[] }) {
  const [active, setActive] = useState(0);
  const base = useId();

  function onKeyDown(e: React.KeyboardEvent) {
    const enabled = tabs.map((t, i) => (t.disabled ? -1 : i)).filter((i) => i >= 0);
    const pos = enabled.indexOf(active);
    let next = active;
    if (e.key === "ArrowRight") next = enabled[(pos + 1) % enabled.length];
    else if (e.key === "ArrowLeft") next = enabled[(pos - 1 + enabled.length) % enabled.length];
    else return;
    e.preventDefault();
    setActive(next);
    document.getElementById(`${base}-tab-${next}`)?.focus();
  }

  return (
    <div>
      <div role="tablist" onKeyDown={onKeyDown} className="flex gap-1 border-b border-ds-border-subtle">
        {tabs.map((t, i) => {
          const selected = i === active;
          return (
            <button
              key={t.label}
              id={`${base}-tab-${i}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`${base}-panel-${i}`}
              tabIndex={selected ? 0 : -1}
              disabled={t.disabled}
              onClick={() => setActive(i)}
              className={cx(
                "ds-label -mb-px h-12 cursor-pointer rounded-t-ds-sm border-b-[length:var(--ds-bw-strong)] px-5 outline-none transition-colors",
                "fx-focus:ds-focus-ring disabled:cursor-not-allowed disabled:text-ds-muted/60",
                selected
                  ? "border-ds-border-strong text-ds-accent-text"
                  : "border-transparent text-ds-muted fx-hover:bg-ds-raised fx-hover:text-ds-text",
              )}
            >
              {t.label}
            </button>
          );
        })}
      </div>
      {tabs.map((t, i) => (
        <div key={t.label} id={`${base}-panel-${i}`} role="tabpanel" aria-labelledby={`${base}-tab-${i}`} hidden={i !== active} className="pt-6">
          {t.content}
        </div>
      ))}
    </div>
  );
}

// ---------- Nav bar ----------
export function NavBar({ items, current }: { items: string[]; current: string }) {
  return (
    <nav aria-label="Primary" className="flex items-center justify-between gap-6 rounded-ds-lg border border-ds-border-subtle bg-ds-surface px-6 py-3">
      <span className="ds-h3 text-ds-text">
        Los Mirlos<span className="text-ds-accent-text">.</span>
      </span>
      <ul className="flex flex-wrap items-center gap-1">
        {items.map((item) => (
          <li key={item}>
            <a
              href="#"
              aria-current={item === current ? "page" : undefined}
              className={cx(
                "ds-label inline-flex h-10 items-center rounded-ds-sm px-3 outline-none transition-colors fx-focus:ds-focus-ring",
                item === current
                  ? "text-ds-accent-text underline decoration-2 underline-offset-8"
                  : "text-ds-muted fx-hover:bg-ds-raised fx-hover:text-ds-text",
              )}
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// ---------- Cards ----------
type CardState = "rest" | "hover" | "selected" | "disabled";

/** Image card. The photo sits in a signature-shaped frame; swap `src` for any image in /photos. */
export function Card({
  src,
  alt = "",
  eyebrow,
  title,
  meta,
  state = "rest",
  force,
}: {
  src: string;
  alt?: string;
  eyebrow?: string;
  title: string;
  meta?: string;
  state?: CardState;
  force?: Force;
}) {
  return (
    <article
      data-force={force}
      aria-disabled={state === "disabled" || undefined}
      className={cx(
        "group overflow-hidden rounded-ds-sig border-[length:var(--ds-bw)] bg-ds-surface shadow-ds-1 transition-[transform,box-shadow,border-color] duration-200",
        state === "selected" ? "border-ds-border-strong shadow-ds-glow" : "border-ds-border",
        state === "disabled" && "opacity-50 grayscale",
        state !== "disabled" && "fx-hover:-translate-y-1 fx-hover:border-ds-border-strong fx-hover:shadow-ds-2",
        state === "hover" && "-translate-y-1 border-ds-border-strong shadow-ds-2",
      )}
    >
      <div className="aspect-[4/3] overflow-hidden bg-ds-raised">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} loading="lazy" className="size-full object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="flex flex-col gap-1 p-5">
        {eyebrow && <p className="ds-label text-ds-accent-2">{eyebrow}</p>}
        <h3 className="ds-h3">{title}</h3>
        {meta && <p className="ds-caption text-ds-muted">{meta}</p>}
      </div>
    </article>
  );
}

/** Square album cover with a Nazca-dotted frame. */
export function CoverFrame({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <figure className="inline-block">
      <div className="rounded-ds-md p-2" style={{ border: "var(--ds-frame)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="aspect-square w-full rounded-ds-sm object-cover shadow-ds-2" />
      </div>
      {caption && <figcaption className="ds-caption mt-2 text-ds-muted">{caption}</figcaption>}
    </figure>
  );
}

/** Object on a paper-colored tile with a colored base. `mix-blend-multiply` drops the white box of opaque product photos into the paper. */
export function CutoutTile({ src, alt, label, tone = "secondary" }: { src: string; alt: string; label: string; tone?: "secondary" | "info" | "accent" }) {
  const bar = { secondary: "bg-ds-accent-2", info: "bg-ds-info", accent: "bg-ds-accent" }[tone];
  return (
    <figure className="flex flex-col gap-2">
      <div className="overflow-hidden rounded-ds-lg bg-ds-paper">
        <div className="flex aspect-square items-center justify-center p-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} loading="lazy" className="max-h-full max-w-full object-contain mix-blend-multiply" />
        </div>
        <div className={cx("h-2", bar)} />
      </div>
      <figcaption className="ds-label text-ds-muted">{label}</figcaption>
    </figure>
  );
}

// ---------- List row (tracklist) ----------
export function TrackRow({
  n,
  title,
  length,
  note,
  state = "rest",
  force,
}: {
  n: number;
  title: string;
  length: string;
  note?: string;
  state?: "rest" | "selected" | "disabled";
  force?: Force;
}) {
  return (
    <li
      data-force={force}
      aria-current={state === "selected" ? "true" : undefined}
      aria-disabled={state === "disabled" || undefined}
      className={cx(
        "flex items-center gap-4 border-b border-ds-border-subtle px-4 py-3 outline-none transition-colors",
        "fx-focus:bg-ds-raised fx-focus:shadow-[inset_0_0_0_2px_var(--ds-focus)]",
        state === "selected" && "border-l-4 border-l-ds-border-strong bg-ds-raised",
        state === "rest" && "fx-hover:bg-ds-raised",
        state === "disabled" && "cursor-not-allowed opacity-45",
      )}
    >
      <span className="ds-label w-6 text-ds-muted tabular-nums">{String(n).padStart(2, "0")}</span>
      <span className="flex-1">
        <span className={cx("ds-body-strong block", state === "selected" && "text-ds-accent-text")}>{title}</span>
        {note && <span className="ds-caption block text-ds-muted">{note}</span>}
      </span>
      {state === "selected" && <Badge tone="accent">Playing</Badge>}
      {state === "disabled" && <Badge>Unavailable</Badge>}
      <span className="ds-caption text-ds-muted tabular-nums">{length}</span>
    </li>
  );
}

// ---------- Detail panel ----------
export function DetailPanel({ src, eyebrow, title, children, onClose }: { src: string; eyebrow: string; title: string; children: ReactNode; onClose?: () => void }) {
  return (
    <div className="overflow-hidden rounded-ds-lg border border-ds-border-strong/30 bg-ds-raised shadow-ds-3 sm:grid sm:grid-cols-[minmax(0,2fr)_3fr]">
      <div className="relative h-48 sm:h-auto sm:min-h-64">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" className="absolute inset-0 size-full object-cover" />
      </div>
      <div className="flex flex-col gap-4 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="ds-label text-ds-accent-2">{eyebrow}</p>
            <h3 className="ds-h2 mt-1">{title}</h3>
          </div>
          {onClose && (
            <Button variant="ghost" aria-label="Close" onClick={onClose} className="size-11 shrink-0 !px-0 text-lg">
              ✕
            </Button>
          )}
        </div>
        <div className="ds-body text-ds-muted">{children}</div>
      </div>
    </div>
  );
}

// ---------- Modal ----------
export function ModalDemo({ triggerLabel, src, eyebrow, title, children }: { triggerLabel: string; src: string; eyebrow: string; title: string; children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  return (
    <>
      <Button variant="secondary" onClick={() => ref.current?.showModal()}>
        {triggerLabel}
      </Button>
      <dialog
        ref={ref}
        aria-labelledby={titleId}
        onClick={(e) => e.target === ref.current && ref.current?.close()}
        className="m-auto w-[min(44rem,calc(100vw-2rem))] overflow-visible bg-transparent p-0 text-ds-text backdrop:bg-black/75 backdrop:backdrop-blur-sm"
      >
        <div className="overflow-hidden rounded-ds-lg border border-ds-border-strong/30 bg-ds-raised shadow-ds-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt="" className="h-48 w-full object-cover" />
          <div className="flex flex-col gap-4 p-6">
            <p className="ds-label text-ds-accent-2">{eyebrow}</p>
            <h3 id={titleId} className="ds-h2">
              {title}
            </h3>
            <div className="ds-body text-ds-muted">{children}</div>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="ghost" onClick={() => ref.current?.close()}>
                Close
              </Button>
              <Button onClick={() => ref.current?.close()}>Listen now</Button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}

// ---------- Pull quote ----------
export function PullQuote({ children, cite }: { children: ReactNode; cite: string }) {
  return (
    <blockquote className="border-l-4 border-ds-accent-2 pl-6">
      <p className="ds-h2 italic text-ds-text">{children}</p>
      <footer className="ds-label mt-3 text-ds-muted">{cite}</footer>
    </blockquote>
  );
}

// ---------- Divider ----------
export function Divider() {
  return <hr className="border-0" style={{ borderTop: "var(--ds-divider)" }} />;
}
