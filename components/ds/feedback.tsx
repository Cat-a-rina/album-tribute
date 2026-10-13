import type { ReactNode } from "react";
import { Band } from "./band";
import { Button } from "./controls";

const cx = (...parts: (string | false | undefined)[]) => parts.filter(Boolean).join(" ");

const panel = "flex flex-col items-center gap-4 rounded-ds-lg border-[length:var(--ds-bw)] p-8 text-center";

// ---------- Alert / toast ----------
const alertTones = {
  info: { box: "border-ds-info bg-ds-info/10", icon: "i", iconColor: "text-ds-info", role: "status" as const },
  success: { box: "border-ds-success bg-ds-success/10", icon: "✓", iconColor: "text-ds-success", role: "status" as const },
  error: { box: "border-ds-danger bg-ds-danger/10", icon: "!", iconColor: "text-ds-danger", role: "alert" as const },
};

export function Alert({ tone, title, children }: { tone: keyof typeof alertTones; title: string; children?: ReactNode }) {
  const t = alertTones[tone];
  return (
    <div role={t.role} className={cx("flex gap-4 rounded-ds-md border-[length:var(--ds-bw)] p-4", t.box)}>
      <span aria-hidden className={cx("flex size-7 shrink-0 items-center justify-center rounded-full border-2 ds-label", t.iconColor, "border-current")}>
        {t.icon}
      </span>
      <div>
        <p className="ds-body-strong">{title}</p>
        {children && <p className="ds-caption mt-1 text-ds-muted">{children}</p>}
      </div>
    </div>
  );
}

// ---------- Empty ----------
export function EmptyState({ src, title, children, action }: { src: string; title: string; children: ReactNode; action?: ReactNode }) {
  return (
    <div className={cx(panel, "border-dashed border-ds-border bg-ds-surface")}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" className="size-24 object-contain opacity-90" />
      <h3 className="ds-h3">{title}</h3>
      <p className="ds-body max-w-sm text-ds-muted">{children}</p>
      {action}
    </div>
  );
}

// ---------- Loading ----------
export function Spinner({ label = "Loading" }: { label?: string }) {
  return (
    <span role="status" className="inline-flex items-center gap-3 ds-body text-ds-muted">
      <span aria-hidden className="size-6 animate-spin rounded-full border-[3px] border-ds-border-subtle border-t-ds-border-strong motion-reduce:animate-none" />
      {label}
    </span>
  );
}

export function LoadingCard() {
  return (
    <div aria-busy="true" aria-label="Loading" className="overflow-hidden rounded-ds-sig border-[length:var(--ds-card-bw)] border-ds-border-subtle bg-ds-surface">
      <Band edge="top" />
      <div style={{ padding: "var(--ds-card-pad)" }}>
        <div className="ds-skeleton aspect-[16/9]" style={{ borderRadius: "var(--ds-card-img-radius)" }} />
        <div className="flex flex-col gap-3" style={{ padding: "var(--ds-card-text-pad)" }}>
          <div className="ds-skeleton h-3 w-1/3 rounded-full" />
          <div className="ds-skeleton h-5 w-4/5 rounded-full" />
          <div className="ds-skeleton h-3 w-1/2 rounded-full" />
        </div>
      </div>
      <Band edge="bottom" />
    </div>
  );
}

// ---------- Error ----------
export function ErrorState({ title, children, action }: { title: string; children: ReactNode; action?: ReactNode }) {
  return (
    <div role="alert" className={cx(panel, "border-ds-danger bg-ds-danger/10")}>
      <span aria-hidden className="flex size-12 items-center justify-center rounded-full border-2 border-ds-danger text-xl font-bold text-ds-danger">
        !
      </span>
      <h3 className="ds-h3">{title}</h3>
      <p className="ds-body max-w-sm text-ds-muted">{children}</p>
      {action ?? <Button variant="secondary">Try again</Button>}
    </div>
  );
}

// ---------- Success ----------
export function SuccessState({ title, children, action }: { title: string; children: ReactNode; action?: ReactNode }) {
  return (
    <div role="status" className={cx(panel, "border-ds-success bg-ds-success/10")}>
      <span aria-hidden className="flex size-12 items-center justify-center rounded-full bg-ds-success text-xl font-bold text-ds-bg">
        ✓
      </span>
      <h3 className="ds-h3">{title}</h3>
      <p className="ds-body max-w-sm text-ds-muted">{children}</p>
      {action}
    </div>
  );
}
