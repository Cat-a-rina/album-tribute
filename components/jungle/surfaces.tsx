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
      <div role="tablist" onKeyDown={onKeyDown} className="flex gap-1 border-b border-j-border-subtle">
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
                "j-label -mb-px h-12 cursor-pointer rounded-t-j-sm border-b-2 px-5 outline-none transition-colors",
                "fx-focus:j-focus-ring disabled:cursor-not-allowed disabled:text-j-muted/60",
                selected
                  ? "border-j-accent text-j-accent"
                  : "border-transparent text-j-muted fx-hover:bg-j-raised fx-hover:text-j-text",
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
    <nav aria-label="Primary" className="flex items-center justify-between gap-6 rounded-j-lg border border-j-border-subtle bg-j-surface px-6 py-3">
      <span className="j-h3 text-j-text">
        Los Mirlos<span className="text-j-accent">.</span>
      </span>
      <ul className="flex flex-wrap items-center gap-1">
        {items.map((item) => (
          <li key={item}>
            <a
              href="#"
              aria-current={item === current ? "page" : undefined}
              className={cx(
                "j-label inline-flex h-10 items-center rounded-j-sm px-3 outline-none transition-colors fx-focus:j-focus-ring",
                item === current
                  ? "text-j-accent underline decoration-2 underline-offset-8"
                  : "text-j-muted fx-hover:bg-j-raised fx-hover:text-j-text",
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

/** Image card. The photo sits in a leaf-shaped frame; swap `src` for any image in /photos. */
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
        "group overflow-hidden rounded-j-leaf border-[1.5px] bg-j-surface shadow-j-1 transition-[transform,box-shadow,border-color] duration-200",
        state === "selected" ? "border-j-accent shadow-j-glow" : "border-j-border",
        state === "disabled" && "opacity-50 grayscale",
        state !== "disabled" && "fx-hover:-translate-y-1 fx-hover:border-j-accent fx-hover:shadow-j-2",
        state === "hover" && "-translate-y-1 border-j-accent shadow-j-2",
      )}
    >
      <div className="aspect-[4/3] overflow-hidden bg-j-raised">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} loading="lazy" className="size-full object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="flex flex-col gap-1 p-5">
        {eyebrow && <p className="j-label text-j-terracotta">{eyebrow}</p>}
        <h3 className="j-h3">{title}</h3>
        {meta && <p className="j-caption text-j-muted">{meta}</p>}
      </div>
    </article>
  );
}

/** Square album cover with a Nazca-dotted frame. */
export function CoverFrame({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <figure className="inline-block">
      <div className="rounded-j-md border-2 border-dotted border-j-accent p-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="aspect-square w-full rounded-j-sm object-cover shadow-j-2" />
      </div>
      {caption && <figcaption className="j-caption mt-2 text-j-muted">{caption}</figcaption>}
    </figure>
  );
}

/** Object on a paper-colored tile with a colored base. `mix-blend-multiply` drops the white box of opaque product photos into the paper. */
export function CutoutTile({ src, alt, label, tone = "terracotta" }: { src: string; alt: string; label: string; tone?: "terracotta" | "teal" | "accent" }) {
  const bar = { terracotta: "bg-j-terracotta", teal: "bg-j-teal", accent: "bg-j-accent" }[tone];
  return (
    <figure className="flex flex-col gap-2">
      <div className="overflow-hidden rounded-j-lg bg-j-text">
        <div className="flex aspect-square items-center justify-center p-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} loading="lazy" className="max-h-full max-w-full object-contain mix-blend-multiply" />
        </div>
        <div className={cx("h-2", bar)} />
      </div>
      <figcaption className="j-label text-j-muted">{label}</figcaption>
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
        "flex items-center gap-4 border-b border-j-border-subtle px-4 py-3 outline-none transition-colors",
        "fx-focus:bg-j-raised fx-focus:shadow-[inset_0_0_0_2px_var(--j-accent)]",
        state === "selected" && "border-l-4 border-l-j-accent bg-j-raised",
        state === "rest" && "fx-hover:bg-j-raised",
        state === "disabled" && "cursor-not-allowed opacity-45",
      )}
    >
      <span className="j-label w-6 text-j-muted tabular-nums">{String(n).padStart(2, "0")}</span>
      <span className="flex-1">
        <span className={cx("j-body-strong block", state === "selected" && "text-j-accent")}>{title}</span>
        {note && <span className="j-caption block text-j-muted">{note}</span>}
      </span>
      {state === "selected" && <Badge tone="accent">Playing</Badge>}
      {state === "disabled" && <Badge>Unavailable</Badge>}
      <span className="j-caption text-j-muted tabular-nums">{length}</span>
    </li>
  );
}

// ---------- Detail panel ----------
export function DetailPanel({ src, eyebrow, title, children, onClose }: { src: string; eyebrow: string; title: string; children: ReactNode; onClose?: () => void }) {
  return (
    <div className="overflow-hidden rounded-j-lg border border-j-accent/30 bg-j-raised shadow-j-3 sm:grid sm:grid-cols-[minmax(0,2fr)_3fr]">
      <div className="relative h-48 sm:h-auto sm:min-h-64">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" className="absolute inset-0 size-full object-cover" />
      </div>
      <div className="flex flex-col gap-4 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="j-label text-j-terracotta">{eyebrow}</p>
            <h3 className="j-h2 mt-1">{title}</h3>
          </div>
          {onClose && (
            <Button variant="ghost" aria-label="Close" onClick={onClose} className="size-11 shrink-0 !px-0 text-lg">
              ✕
            </Button>
          )}
        </div>
        <div className="j-body text-j-muted">{children}</div>
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
        className="m-auto w-[min(44rem,calc(100vw-2rem))] overflow-visible bg-transparent p-0 text-j-text backdrop:bg-black/75 backdrop:backdrop-blur-sm"
      >
        <div className="overflow-hidden rounded-j-lg border border-j-accent/30 bg-j-raised shadow-j-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt="" className="h-48 w-full object-cover" />
          <div className="flex flex-col gap-4 p-6">
            <p className="j-label text-j-terracotta">{eyebrow}</p>
            <h3 id={titleId} className="j-h2">
              {title}
            </h3>
            <div className="j-body text-j-muted">{children}</div>
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
    <blockquote className="border-l-4 border-j-terracotta pl-6">
      <p className="j-h2 italic text-j-text">{children}</p>
      <footer className="j-label mt-3 text-j-muted">{cite}</footer>
    </blockquote>
  );
}

// ---------- Divider ----------
export function NazcaDivider() {
  return <hr className="border-0 border-t-2 border-dotted border-j-accent/60" />;
}
