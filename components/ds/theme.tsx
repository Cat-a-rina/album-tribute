import type { CSSProperties, ReactNode } from "react";
import { designVars, type DesignSystem } from "@/lib/design-systems/types";

/** Scopes a design system's tokens to its subtree. Wrap any themed page in this. */
export function DesignTheme({ system, children, className = "" }: { system: DesignSystem; children: ReactNode; className?: string }) {
  return (
    <div
      data-theme={system.slug}
      className={`bg-ds-bg text-ds-text ds-body ${className}`}
      style={{ ...designVars(system), ...(system.texture ? { backgroundImage: system.texture } : {}) } as CSSProperties}
    >
      {children}
    </div>
  );
}
