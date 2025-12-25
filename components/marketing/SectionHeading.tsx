import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  variant?: "default" | "inverse";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  variant = "default",
  className,
}: SectionHeadingProps) {
  const isInverse = variant === "inverse";

  return (
    <div className={cn("max-w-3xl", isInverse ? "text-white" : null, className)}>
      {eyebrow ? (
        <p
          className={cn(
            "text-sm font-semibold tracking-wide",
            isInverse
              ? "text-emerald-300"
              : "text-emerald-600 dark:text-emerald-400"
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-4 text-lg leading-8",
            isInverse ? "text-zinc-200" : "text-zinc-600 dark:text-zinc-300"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
