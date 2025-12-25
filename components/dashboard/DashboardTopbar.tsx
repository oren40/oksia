"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  dashboardNavItems,
  getDashboardTitle,
} from "@/components/dashboard/dashboard-nav";
import { cn } from "@/lib/cn";
import { demoNotifications } from "@/lib/demo-data";

export function DashboardTopbar() {
  const pathname = usePathname();
  const title = getDashboardTitle(pathname);
  const notificationCount = demoNotifications.length;

  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-white/80 backdrop-blur dark:border-white/10 dark:bg-zinc-950/70">
      <div className="flex h-16 items-center justify-between gap-3 px-4 sm:px-6 lg:px-10">
        <div className="flex min-w-0 items-center gap-3">
          <details className="relative lg:hidden">
            <summary
              aria-label="תפריט"
              className="list-none cursor-pointer rounded-full p-2 text-zinc-950 ring-1 ring-black/10 transition hover:bg-black/[0.04] dark:text-zinc-50 dark:ring-white/15 dark:hover:bg-white/5"
            >
              <span className="block text-base leading-none">≡</span>
            </summary>
            <div className="absolute right-0 mt-2 w-60 rounded-2xl border border-black/10 bg-white p-2 shadow-xl dark:border-white/10 dark:bg-zinc-950">
              <div className="grid gap-1">
                {dashboardNavItems.map((item) => {
                  const isActive =
                    item.href === "/dashboard"
                      ? pathname === "/dashboard"
                      : pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "rounded-xl px-3 py-2 text-sm font-semibold transition",
                        isActive
                          ? "bg-black/[0.04] text-zinc-950 dark:bg-white/5 dark:text-white"
                          : "text-zinc-700 hover:bg-black/[0.04] dark:text-zinc-200 dark:hover:bg-white/5"
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </details>

          <div className="min-w-0">
            <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
              אזור אישי
            </div>
            <div className="truncate text-lg font-semibold tracking-tight">
              {title}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/dashboard/notifications"
            className="relative hidden rounded-full px-4 py-2 text-sm font-semibold text-zinc-700 ring-1 ring-black/10 transition hover:bg-black/[0.04] dark:text-zinc-200 dark:ring-white/15 dark:hover:bg-white/5 sm:inline-flex"
          >
            התראות
            {notificationCount > 0 ? (
              <span className="absolute -left-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-500 px-1.5 text-[11px] font-semibold text-white shadow-sm">
                {notificationCount}
              </span>
            ) : null}
          </Link>

          <Link
            href="/apply"
            className="hidden rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-500 sm:inline-flex"
          >
            בדיקת התאמה
          </Link>

          <Link
            href="/"
            className="rounded-full px-4 py-2 text-sm font-semibold text-zinc-700 ring-1 ring-black/10 transition hover:bg-black/[0.04] dark:text-zinc-200 dark:ring-white/15 dark:hover:bg-white/5"
          >
            אתר
          </Link>

          <div className="hidden items-center gap-3 rounded-full bg-zinc-50 px-3 py-2 text-sm text-zinc-700 ring-1 ring-black/10 dark:bg-white/5 dark:text-zinc-200 dark:ring-white/15 lg:flex">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-zinc-950 text-xs font-semibold text-white dark:bg-white dark:text-zinc-950">
              O
            </span>
            <span className="text-sm font-semibold">אורן (דמו)</span>
          </div>
        </div>
      </div>
    </header>
  );
}
