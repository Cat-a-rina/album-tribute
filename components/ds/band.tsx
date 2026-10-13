/** Decorative woven band for cards. Collapses to nothing (0 height) in themes that do not define one. */
export function Band({ edge }: { edge: "top" | "bottom" }) {
  return (
    <div
      aria-hidden
      className="shrink-0"
      style={{ height: `var(--ds-band-${edge})`, background: "var(--ds-band)" }}
    />
  );
}
