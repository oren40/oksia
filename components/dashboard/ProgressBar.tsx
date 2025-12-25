import { cn } from "@/lib/cn";

type ProgressBarProps = {
  value: number;
  className?: string;
};

export function ProgressBar({ value, className }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className={cn("h-2 w-full rounded-full bg-black/5 dark:bg-white/10", className)}>
      <div
        className="h-2 rounded-full bg-emerald-500 transition-all"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
