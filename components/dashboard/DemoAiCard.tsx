"use client";

import { useActionState } from "react";

import type { DemoAiMode, DemoAiState } from "@/lib/demo-ai";
import { demoAiAction } from "@/lib/demo-ai";
import { Badge } from "@/components/dashboard/Badge";
import { cn } from "@/lib/cn";

type DemoAiCardProps = {
  mode: DemoAiMode;
  title: string;
  description: string;
  placeholder: string;
};

const initialState: DemoAiState = {
  answer: null,
};

export function DemoAiCard({
  mode,
  title,
  description,
  placeholder,
}: DemoAiCardProps) {
  const [state, formAction, isPending] = useActionState(
    demoAiAction,
    initialState
  );

  return (
    <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-base font-semibold tracking-tight">{title}</div>
          <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
            {description}
          </p>
        </div>
        <Badge tone="info">DEMO</Badge>
      </div>

      <form action={formAction} className="mt-6 grid gap-3">
        <input type="hidden" name="mode" value={mode} />
        <textarea
          name="prompt"
          rows={3}
          placeholder={placeholder}
          required
          className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-zinc-950 shadow-sm outline-none transition focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 dark:border-white/10 dark:bg-white/5 dark:text-white"
        />
        <button
          type="submit"
          className={cn(
            "inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-semibold transition",
            isPending
              ? "bg-zinc-950/70 text-white dark:bg-white/70 dark:text-zinc-950"
              : "bg-zinc-950 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
          )}
          disabled={isPending}
        >
          {isPending ? "מייצר..." : "הפק"}
        </button>
      </form>

      {state.answer ? (
        <div className="mt-5 rounded-2xl bg-zinc-50 p-4 text-sm leading-7 text-zinc-800 ring-1 ring-black/5 dark:bg-white/5 dark:text-zinc-100 dark:ring-white/10">
          <pre className="whitespace-pre-wrap font-sans">{state.answer}</pre>
        </div>
      ) : null}
    </div>
  );
}
