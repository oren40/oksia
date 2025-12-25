import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type CardProps = {
  className?: string;
  children: ReactNode;
};

export function Card({ className, children }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5",
        className
      )}
    >
      {children}
    </div>
  );
}
