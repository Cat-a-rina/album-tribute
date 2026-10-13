"use client";

import { useId, useState } from "react";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
} from "react";

/** Lets the docs pin a pseudo-state (hover/focus/pressed) so every state can be shown at once. */
export type Force = "hover" | "focus" | "pressed";
type ForceProp = { "data-force"?: Force };

const cx = (...parts: (string | false | undefined)[]) => parts.filter(Boolean).join(" ");

// ---------- Button ----------
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  ForceProp & { variant?: "primary" | "secondary" | "ghost"; size?: "md" | "lg" };

const buttonBase =
  "ds-label inline-flex items-center justify-center gap-2 rounded-ds-md border-[length:var(--ds-bw-strong)] transition-[background-color,color,box-shadow,transform] duration-150 " +
  "cursor-pointer disabled:cursor-not-allowed disabled:border-ds-border-subtle disabled:bg-ds-raised disabled:text-ds-muted disabled:shadow-none " +
  "fx-focus:ds-focus-ring outline-none fx-press:translate-y-px";

const buttonVariants = {
  primary:
    "border-ds-border-strong bg-ds-accent text-ds-on-accent shadow-ds-1 fx-hover:bg-ds-accent-hover fx-hover:shadow-ds-2 fx-press:bg-ds-accent-pressed fx-press:shadow-none",
  secondary:
    "border-ds-border-strong bg-transparent text-ds-accent-text fx-hover:bg-ds-accent/15 fx-press:bg-ds-accent/25",
  ghost:
    "border-transparent bg-transparent text-ds-text fx-hover:bg-ds-raised fx-press:bg-ds-surface",
};

export function Button({ variant = "primary", size = "md", className, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      {...props}
      className={cx(buttonBase, buttonVariants[variant], size === "lg" ? "h-14 px-8 text-[0.8125rem]" : "h-11 px-5", className)}
    />
  );
}

// ---------- Link ----------
export function TextLink({
  className,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & ForceProp) {
  return (
    <a
      {...props}
      className={cx(
        "rounded-ds-sm font-semibold text-ds-accent-text underline decoration-ds-accent-text/50 decoration-2 underline-offset-4 outline-none transition-colors",
        "fx-hover:text-ds-text fx-hover:decoration-ds-accent-text fx-press:text-ds-muted fx-focus:ds-focus-ring",
        "aria-disabled:pointer-events-none aria-disabled:text-ds-muted aria-disabled:no-underline",
        className,
      )}
    />
  );
}

// ---------- Field wrapper ----------
type FieldStatus = "default" | "error" | "success";

function Field({
  id,
  label,
  hint,
  status = "default",
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  status?: FieldStatus;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="ds-label text-ds-muted">
        {label}
      </label>
      {children}
      {hint && (
        <p
          id={`${id}-hint`}
          className={cx(
            "ds-caption",
            status === "error" && "text-ds-danger",
            status === "success" && "text-ds-success",
            status === "default" && "text-ds-muted",
          )}
        >
          {status === "error" && "✕ "}
          {status === "success" && "✓ "}
          {hint}
        </p>
      )}
    </div>
  );
}

const fieldBase =
  "h-12 w-full rounded-ds-sm border-[length:var(--ds-bw)] bg-ds-surface px-4 text-ds-text outline-none transition-[border-color,box-shadow] ds-body " +
  "placeholder:text-ds-muted fx-hover:border-ds-text/60 fx-focus:border-ds-border-strong fx-focus:shadow-ds-glow " +
  "disabled:cursor-not-allowed disabled:border-ds-border-subtle disabled:bg-ds-bg disabled:text-ds-muted";

const fieldStatus = {
  default: "border-ds-border",
  error: "border-ds-danger",
  success: "border-ds-success",
};

// ---------- Text input ----------
type TextInputProps = InputHTMLAttributes<HTMLInputElement> &
  ForceProp & { label: string; hint?: string; status?: FieldStatus };

export function TextInput({ label, hint, status = "default", className, id, ...props }: TextInputProps) {
  const auto = useId();
  const fieldId = id ?? auto;
  return (
    <Field id={fieldId} label={label} hint={hint} status={status}>
      <input
        id={fieldId}
        aria-invalid={status === "error" || undefined}
        aria-describedby={hint ? `${fieldId}-hint` : undefined}
        {...props}
        className={cx(fieldBase, fieldStatus[status], className)}
      />
    </Field>
  );
}

// ---------- Select ----------
const chevron = "bg-[image:var(--ds-icon-chevron)] bg-[length:14px_9px] bg-[position:right_1rem_center] bg-no-repeat";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> &
  ForceProp & { label: string; hint?: string; status?: FieldStatus; options: string[] };

export function Select({ label, hint, status = "default", options, className, id, ...props }: SelectProps) {
  const auto = useId();
  const fieldId = id ?? auto;
  return (
    <Field id={fieldId} label={label} hint={hint} status={status}>
      <select
        id={fieldId}
        {...props}
        className={cx(fieldBase, fieldStatus[status], "cursor-pointer appearance-none pr-10", chevron, className)}
      >
        {options.map((o) => (
          <option key={o} className="bg-ds-surface text-ds-text">
            {o}
          </option>
        ))}
      </select>
    </Field>
  );
}

// ---------- Checkbox & radio ----------
const tickBg = "checked:bg-[image:var(--ds-icon-tick)]";

const choiceBase =
  "shrink-0 size-6 cursor-pointer appearance-none border-[length:var(--ds-bw)] border-ds-border bg-ds-surface outline-none transition-[background-color,border-color,box-shadow] " +
  "fx-hover:border-ds-border-strong fx-focus:ds-focus-ring fx-press:bg-ds-raised checked:border-ds-border-strong checked:bg-ds-accent " +
  "disabled:cursor-not-allowed disabled:border-ds-border-subtle disabled:bg-ds-raised checked:disabled:bg-ds-border-subtle";

type ChoiceProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & ForceProp & { label: string };

export function Checkbox({ label, className, ...props }: ChoiceProps) {
  return (
    <label className={cx("inline-flex items-center gap-3 ds-body has-[:disabled]:cursor-not-allowed has-[:disabled]:text-ds-muted", className)}>
      <input type="checkbox" {...props} className={cx(choiceBase, tickBg, "rounded-ds-sm bg-center bg-no-repeat")} />
      {label}
    </label>
  );
}

export function Radio({ label, className, ...props }: ChoiceProps) {
  return (
    <label className={cx("inline-flex items-center gap-3 ds-body has-[:disabled]:cursor-not-allowed has-[:disabled]:text-ds-muted", className)}>
      <input
        type="radio"
        {...props}
        className={cx(
          choiceBase,
          "rounded-full checked:bg-ds-surface checked:bg-[radial-gradient(circle,var(--ds-border-strong)_0_42%,transparent_46%)] checked:disabled:bg-ds-raised",
        )}
      />
      {label}
    </label>
  );
}

// ---------- Toggle ----------
type ToggleProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> &
  ForceProp & { label: string; defaultOn?: boolean };

export function Toggle({ label, defaultOn = false, className, ...props }: ToggleProps) {
  const [on, setOn] = useState(defaultOn);
  return (
    <span className="inline-flex items-center gap-3 ds-body">
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label={label}
        onClick={() => setOn(!on)}
        {...props}
        className={cx(
          "relative h-8 w-14 shrink-0 cursor-pointer rounded-full border-[length:var(--ds-bw)] outline-none transition-colors",
          "fx-focus:ds-focus-ring disabled:cursor-not-allowed disabled:border-ds-border-subtle disabled:bg-ds-raised",
          on ? "border-ds-border-strong bg-ds-accent fx-hover:bg-ds-accent-hover" : "border-ds-border bg-ds-surface fx-hover:border-ds-border-strong",
          className,
        )}
      >
        <span
          aria-hidden
          className={cx(
            "absolute left-1 top-1/2 size-5 -translate-y-1/2 rounded-full shadow-ds-1 transition-transform duration-150",
            on ? "translate-x-6 bg-ds-on-accent" : "bg-ds-muted",
            props.disabled && "opacity-50",
          )}
        />
      </button>
      <span className={props.disabled ? "text-ds-muted" : undefined}>{label}</span>
    </span>
  );
}

// ---------- Badge ----------
const badgeTones = {
  neutral: "border-ds-border text-ds-text",
  accent: "border-ds-border-strong bg-ds-accent text-ds-on-accent",
  secondary: "border-ds-accent-2 text-ds-accent-2",
  info: "border-ds-info text-ds-info",
  success: "border-ds-success text-ds-success",
  danger: "border-ds-danger text-ds-danger",
};

export function Badge({ tone = "neutral", children }: { tone?: keyof typeof badgeTones; children: ReactNode }) {
  return (
    <span className={cx("ds-label inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1", badgeTones[tone])}>
      {children}
    </span>
  );
}

// ---------- Filter chip ----------
type ChipProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> &
  ForceProp & { selected?: boolean };

export function Chip({ selected = false, className, children, ...props }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      {...props}
      className={cx(
        "inline-flex h-10 cursor-pointer items-center gap-2 rounded-full border-[length:var(--ds-bw)] px-4 ds-body font-semibold outline-none transition-colors",
        "fx-focus:ds-focus-ring fx-press:bg-ds-surface disabled:cursor-not-allowed disabled:border-ds-border-subtle disabled:text-ds-muted disabled:bg-transparent",
        selected
          ? "border-ds-border-strong bg-ds-accent text-ds-on-accent fx-hover:bg-ds-accent-hover"
          : "border-ds-border bg-transparent text-ds-text fx-hover:border-ds-border-strong fx-hover:bg-ds-raised",
        className,
      )}
    >
      {selected && <span aria-hidden>✓</span>}
      {children}
    </button>
  );
}

/** Chip group that manages its own selection (multi-select). */
export function ChipGroup({ options, initial = [] }: { options: string[]; initial?: string[] }) {
  const [sel, setSel] = useState<string[]>(initial);
  return (
    <div role="group" aria-label="Filter" className="flex flex-wrap gap-2">
      {options.map((o) => (
        <Chip
          key={o}
          selected={sel.includes(o)}
          onClick={() => setSel(sel.includes(o) ? sel.filter((s) => s !== o) : [...sel, o])}
        >
          {o}
        </Chip>
      ))}
    </div>
  );
}
