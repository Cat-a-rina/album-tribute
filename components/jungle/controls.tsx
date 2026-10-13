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
  "j-label inline-flex items-center justify-center gap-2 rounded-j-md border-2 transition-[background-color,color,box-shadow,transform] duration-150 " +
  "cursor-pointer disabled:cursor-not-allowed disabled:border-j-border-subtle disabled:bg-j-raised disabled:text-j-muted disabled:shadow-none " +
  "fx-focus:j-focus-ring outline-none fx-press:translate-y-px";

const buttonVariants = {
  primary:
    "border-j-accent bg-j-accent text-j-on-accent shadow-j-1 fx-hover:border-j-accent-hover fx-hover:bg-j-accent-hover fx-hover:shadow-j-2 fx-press:border-j-accent-pressed fx-press:bg-j-accent-pressed fx-press:shadow-none",
  secondary:
    "border-j-accent bg-transparent text-j-accent fx-hover:bg-j-accent/15 fx-press:bg-j-accent/25",
  ghost:
    "border-transparent bg-transparent text-j-text fx-hover:bg-j-raised fx-press:bg-j-surface",
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
        "rounded-j-sm font-semibold text-j-accent underline decoration-j-accent/50 decoration-2 underline-offset-4 outline-none transition-colors",
        "fx-hover:text-j-accent-hover fx-hover:decoration-j-accent-hover fx-press:text-j-accent-pressed fx-focus:j-focus-ring",
        "aria-disabled:pointer-events-none aria-disabled:text-j-muted aria-disabled:no-underline",
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
      <label htmlFor={id} className="j-label text-j-muted">
        {label}
      </label>
      {children}
      {hint && (
        <p
          id={`${id}-hint`}
          className={cx(
            "j-caption",
            status === "error" && "text-j-danger",
            status === "success" && "text-j-success",
            status === "default" && "text-j-muted",
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
  "h-12 w-full rounded-j-sm border-[1.5px] bg-j-surface px-4 text-j-text outline-none transition-[border-color,box-shadow] j-body " +
  "placeholder:text-j-muted fx-hover:border-j-text/60 fx-focus:border-j-accent fx-focus:shadow-j-glow " +
  "disabled:cursor-not-allowed disabled:border-j-border-subtle disabled:bg-j-bg disabled:text-j-muted";

const fieldStatus = {
  default: "border-j-border",
  error: "border-j-danger",
  success: "border-j-success",
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
const chevron =
  "bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='9' viewBox='0 0 14 9'%3E%3Cpath d='M1 1.5l6 6 6-6' fill='none' stroke='%23E9A93A' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")] bg-[length:14px_9px] bg-[position:right_1rem_center] bg-no-repeat";

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
          <option key={o} className="bg-j-surface text-j-text">
            {o}
          </option>
        ))}
      </select>
    </Field>
  );
}

// ---------- Checkbox & radio ----------
const tickBg =
  "checked:bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M3.5 8.5l3 3 6-7' fill='none' stroke='%231A1208' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")]";

const choiceBase =
  "shrink-0 size-6 cursor-pointer appearance-none border-[1.5px] border-j-border bg-j-surface outline-none transition-[background-color,border-color,box-shadow] " +
  "fx-hover:border-j-accent fx-focus:j-focus-ring fx-press:bg-j-raised checked:border-j-accent checked:bg-j-accent " +
  "disabled:cursor-not-allowed disabled:border-j-border-subtle disabled:bg-j-raised checked:disabled:bg-j-border-subtle";

type ChoiceProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & ForceProp & { label: string };

export function Checkbox({ label, className, ...props }: ChoiceProps) {
  return (
    <label className={cx("inline-flex items-center gap-3 j-body has-[:disabled]:cursor-not-allowed has-[:disabled]:text-j-muted", className)}>
      <input type="checkbox" {...props} className={cx(choiceBase, tickBg, "rounded-j-sm bg-center bg-no-repeat")} />
      {label}
    </label>
  );
}

export function Radio({ label, className, ...props }: ChoiceProps) {
  return (
    <label className={cx("inline-flex items-center gap-3 j-body has-[:disabled]:cursor-not-allowed has-[:disabled]:text-j-muted", className)}>
      <input
        type="radio"
        {...props}
        className={cx(
          choiceBase,
          "rounded-full checked:bg-j-surface checked:bg-[radial-gradient(circle,var(--j-accent)_0_42%,transparent_46%)] checked:disabled:bg-j-raised",
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
    <span className="inline-flex items-center gap-3 j-body">
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label={label}
        onClick={() => setOn(!on)}
        {...props}
        className={cx(
          "relative h-8 w-14 shrink-0 cursor-pointer rounded-full border-[1.5px] outline-none transition-colors",
          "fx-focus:j-focus-ring disabled:cursor-not-allowed disabled:border-j-border-subtle disabled:bg-j-raised",
          on ? "border-j-accent bg-j-accent fx-hover:bg-j-accent-hover" : "border-j-border bg-j-surface fx-hover:border-j-accent",
          className,
        )}
      >
        <span
          aria-hidden
          className={cx(
            "absolute left-1 top-1/2 size-5 -translate-y-1/2 rounded-full shadow-j-1 transition-transform duration-150",
            on ? "translate-x-6 bg-j-on-accent" : "bg-j-muted",
            props.disabled && "opacity-50",
          )}
        />
      </button>
      <span className={props.disabled ? "text-j-muted" : undefined}>{label}</span>
    </span>
  );
}

// ---------- Badge ----------
const badgeTones = {
  neutral: "border-j-border text-j-text",
  accent: "border-j-accent bg-j-accent text-j-on-accent",
  terracotta: "border-j-terracotta text-j-terracotta",
  teal: "border-j-teal text-j-teal",
  success: "border-j-success text-j-success",
  danger: "border-j-danger text-j-danger",
};

export function Badge({ tone = "neutral", children }: { tone?: keyof typeof badgeTones; children: ReactNode }) {
  return (
    <span className={cx("j-label inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1", badgeTones[tone])}>
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
        "inline-flex h-10 cursor-pointer items-center gap-2 rounded-full border-[1.5px] px-4 j-body font-semibold outline-none transition-colors",
        "fx-focus:j-focus-ring fx-press:bg-j-surface disabled:cursor-not-allowed disabled:border-j-border-subtle disabled:text-j-muted disabled:bg-transparent",
        selected
          ? "border-j-accent bg-j-accent text-j-on-accent fx-hover:bg-j-accent-hover"
          : "border-j-border bg-transparent text-j-text fx-hover:border-j-accent fx-hover:bg-j-raised",
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
