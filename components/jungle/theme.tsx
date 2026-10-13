import type { CSSProperties, ReactNode } from "react";
import { jungleVars } from "@/lib/jungle-tokens";

/** Scopes the jungle tokens to its subtree. Wrap any jungle page in this. */
export function JungleTheme({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`jungle bg-j-bg text-j-text j-body ${className}`} style={jungleVars() as CSSProperties}>
      {children}
    </div>
  );
}
