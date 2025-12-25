import type { ReactNode } from "react";
import Link from "next/link";

import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardTopbar } from "@/components/dashboard/DashboardTopbar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-zinc-950 text-zinc-50">
      <div className="mx-auto flex min-h-dvh w-full max-w-[1680px]">
        <DashboardSidebar />

        <div className="flex min-w-0 flex-1 flex-col bg-zinc-50 text-zinc-950 dark:bg-black dark:text-zinc-50">
          <DashboardTopbar />

          <div className="flex-1 px-4 py-6 sm:px-6 lg:px-10">
            <div className="mx-auto w-full max-w-6xl">
              <div className="mb-6 rounded-3xl border border-amber-500/20 bg-amber-500/10 p-5">
                <div className="text-sm font-semibold">מצב דמו</div>
                <div className="mt-1 text-sm leading-6 text-zinc-700 dark:text-zinc-200">
                  זהו שלד MVP של האזור האישי. בשלב הבא נוסיף התחברות,
                  הרשאות וחיבור למסד נתונים.
                </div>
                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <Link
                    href="/apply"
                    className="inline-flex items-center justify-center rounded-full bg-zinc-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
                  >
                    בדיקת התאמה
                  </Link>
                  <Link
                    href="/dashboard-demo"
                    className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-zinc-950 ring-1 ring-black/10 transition hover:bg-zinc-50 dark:bg-white/5 dark:text-white dark:ring-white/15 dark:hover:bg-white/10"
                  >
                    דמו ציבורי
                  </Link>
                </div>
              </div>

              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
