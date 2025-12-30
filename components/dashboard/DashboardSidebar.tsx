"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { dashboardNavItems } from "@/components/dashboard/dashboard-nav";
import { cn } from "@/lib/cn";
import { demoTasks } from "@/lib/demo-data";

export function DashboardSidebar() {
  const pathname = usePathname();

  const completedTasks = demoTasks.filter((task) => task.status === "done").length;
  const openTasks = demoTasks.filter((task) => task.status !== "done").length;
  const progressPercent = Math.round((completedTasks / demoTasks.length) * 100);

  return (
    <aside className="hidden w-80 shrink-0 flex-col border-l border-white/10 bg-zinc-950 p-6 text-zinc-50 lg:flex">
      <Link href="/" className="flex items-center gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15">
          OX
        </span>
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold tracking-tight">
            oksia
          </div>
          <div className="truncate text-xs text-zinc-300">אזור אישי · דמו</div>
        </div>
      </Link>

      <nav className="mt-10 grid gap-1">
        {dashboardNavItems.map((item) => {
          const enabled = item.enabled !== false;
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);

          const baseClassName = cn(
            "flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold transition",
            isActive
              ? "bg-white/10 text-white ring-1 ring-white/15"
              : "text-zinc-200 hover:bg-white/5 hover:text-white"
          );

          if (!enabled) {
            return (
              <div
                key={item.href}
                aria-disabled="true"
                className={cn(baseClassName, "cursor-not-allowed opacity-60 hover:bg-transparent")}
              >
                <span>{item.label}</span>
                {item.metaLabel ? (
                  <span className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-semibold text-zinc-200 ring-1 ring-white/15">
                    {item.metaLabel}
                  </span>
                ) : null}
              </div>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={baseClassName}
            >
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-3xl bg-white/5 p-5 ring-1 ring-white/10">
        <div className="text-xs font-semibold text-zinc-300">סטטוס התהליך</div>
        <div className="mt-2 text-sm font-semibold">90 יום (Build System)</div>
        <div className="mt-3 h-2 rounded-full bg-white/10">
          <div
            className="h-2 rounded-full bg-emerald-400 transition-all"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="mt-2 text-xs text-zinc-300">
          {progressPercent}% התקדמות · {openTasks} משימות פתוחות
        </div>
      </div>
    </aside>
  );
}
