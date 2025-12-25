import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

export type BadgeTone = "neutral" | "success" | "warning" | "info";

type BadgeProps = {
  tone?: BadgeTone;
  className?: string;
  children: ReactNode;
};

export function Badge({ tone = "neutral", className, children }: BadgeProps) {
  const toneClassName =
    tone === "success"
      ? "bg-emerald-500/10 text-emerald-700 ring-emerald-500/20 dark:text-emerald-300"
      : tone === "warning"
        ? "bg-amber-500/10 text-amber-700 ring-amber-500/20 dark:text-amber-300"
        : tone === "info"
          ? "bg-sky-500/10 text-sky-700 ring-sky-500/20 dark:text-sky-300"
          : "bg-zinc-900/5 text-zinc-700 ring-black/10 dark:bg-white/10 dark:text-zinc-200 dark:ring-white/15";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1",
        toneClassName,
        className
      )}
    >
      {children}
    </span>
  );
}
