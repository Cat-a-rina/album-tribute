import type { ReactNode } from "react";
import { Button } from "./controls";

const cx = (...parts: (string | false | undefined)[]) => parts.filter(Boolean).join(" ");

const panel = "flex flex-col items-center gap-4 rounded-j-lg border-[1.5px] p-8 text-center";

// ---------- Alert / toast ----------
const alertTones = {
  info: { box: "border-j-teal bg-j-teal/10", icon: "i", iconColor: "text-j-teal", role: "status" as const },
  success: { box: "border-j-success bg-j-success/10", icon: "✓", iconColor: "text-j-success", role: "status" as const },
  error: { box: "border-j-danger bg-j-danger/10", icon: "!", iconColor: "text-j-danger", role: "alert" as const },
};

export function Alert({ tone, title, children }: { tone: keyof typeof alertTones; title: string; children?: ReactNode }) {
  const t = alertTones[tone];
  return (
    <div role={t.role} className={cx("flex gap-4 rounded-j-md border-[1.5px] p-4", t.box)}>
      <span aria-hidden className={cx("flex size-7 shrink-0 items-center justify-center rounded-full border-2 j-label", t.iconColor, "border-current")}>
        {t.icon}
      </span>
      <div>
        <p className="j-body-strong">{title}</p>
        {children && <p className="j-caption mt-1 text-j-muted">{children}</p>}
      </div>
    </div>
  );
}

// ---------- Empty ----------
export function EmptyState({ src, title, children, action }: { src: string; title: string; children: ReactNode; action?: ReactNode }) {
  return (
    <div className={cx(panel, "border-dashed border-j-border bg-j-surface")}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" className="size-24 object-contain opacity-90" />
      <h3 className="j-h3">{title}</h3>
      <p className="j-body max-w-sm text-j-muted">{children}</p>
      {action}
    </div>
  );
}

// ---------- Loading ----------
export function Spinner({ label = "Loading" }: { label?: string }) {
  return (
    <span role="status" className="inline-flex items-center gap-3 j-body text-j-muted">
      <span aria-hidden className="size-6 animate-spin rounded-full border-[3px] border-j-border-subtle border-t-j-accent motion-reduce:animate-none" />
      {label}
    </span>
  );
}

export function LoadingCard() {
  return (
    <div aria-busy="true" aria-label="Loading" className="overflow-hidden rounded-j-leaf border-[1.5px] border-j-border-subtle bg-j-surface">
      <div className="j-skeleton aspect-[16/9]" />
      <div className="flex flex-col gap-3 p-5">
        <div className="j-skeleton h-3 w-1/3 rounded-full" />
        <div className="j-skeleton h-5 w-4/5 rounded-full" />
        <div className="j-skeleton h-3 w-1/2 rounded-full" />
      </div>
    </div>
  );
}

// ---------- Error ----------
export function ErrorState({ title, children, action }: { title: string; children: ReactNode; action?: ReactNode }) {
  return (
    <div role="alert" className={cx(panel, "border-j-danger bg-j-danger/10")}>
      <span aria-hidden className="flex size-12 items-center justify-center rounded-full border-2 border-j-danger text-xl font-bold text-j-danger">
        !
      </span>
      <h3 className="j-h3">{title}</h3>
      <p className="j-body max-w-sm text-j-muted">{children}</p>
      {action ?? <Button variant="secondary">Try again</Button>}
    </div>
  );
}

// ---------- Success ----------
export function SuccessState({ title, children, action }: { title: string; children: ReactNode; action?: ReactNode }) {
  return (
    <div role="status" className={cx(panel, "border-j-success bg-j-success/10")}>
      <span aria-hidden className="flex size-12 items-center justify-center rounded-full bg-j-success text-xl font-bold text-j-on-accent">
        ✓
      </span>
      <h3 className="j-h3">{title}</h3>
      <p className="j-body max-w-sm text-j-muted">{children}</p>
      {action}
    </div>
  );
}
