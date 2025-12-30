import Link from "next/link";

import {
  demoCourses,
  demoNotifications,
  demoSessions,
  demoTasks,
} from "@/lib/demo-data";
import { cn } from "@/lib/cn";

type StatCardProps = {
  label: string;
  value: string;
  hint: string;
};

function StatCard({ label, value, hint }: StatCardProps) {
  return (
    <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
      <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
        {label}
      </div>
      <div className="mt-3 text-2xl font-semibold tracking-tight">{value}</div>
      <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-300">{hint}</div>
    </div>
  );
}

type PillProps = {
  label: string;
  tone?: "neutral" | "success" | "info";
};

function Pill({ label, tone = "neutral" }: PillProps) {
  const className =
    tone === "success"
      ? "bg-emerald-500/10 text-emerald-700 ring-emerald-500/20 dark:text-emerald-300"
      : tone === "info"
        ? "bg-sky-500/10 text-sky-700 ring-sky-500/20 dark:text-sky-300"
        : "bg-zinc-900/5 text-zinc-700 ring-black/10 dark:bg-white/10 dark:text-zinc-200 dark:ring-white/15";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1",
        className
      )}
    >
      {label}
    </span>
  );
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-2 w-full rounded-full bg-black/5 dark:bg-white/10">
      <div
        className="h-2 rounded-full bg-emerald-500"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

export default function DashboardOverviewPage() {
  const completedTasks = demoTasks.filter((task) => task.status === "done").length;
  const openTasks = demoTasks.filter((task) => task.status !== "done").length;
  const progressPercent = Math.round((completedTasks / demoTasks.length) * 100);

  const nextTasks = demoTasks.filter((task) => task.status !== "done").slice(0, 3);
  const nextSession = demoSessions[demoSessions.length - 1];

  return (
    <div className="grid gap-10">
      <div className="flex flex-col gap-6 rounded-3xl border border-black/10 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-white/5 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <div className="text-sm font-semibold text-zinc-500 dark:text-zinc-300">
            ברוך הבא, אורן
          </div>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            השבוע אנחנו סוגרים הצעה ותמחור ומרימים שיווק יציב
          </h1>
          <div className="mt-5 flex flex-wrap gap-2">
            <Pill label={`${openTasks} משימות פתוחות`} tone="info" />
            <Pill label={`התקדמות ${progressPercent}%`} tone="success" />
            <Pill label="90 יום (Build System)" />
          </div>
          <div className="mt-6 max-w-xl">
            <ProgressBar value={progressPercent} />
            <div className="mt-2 text-xs text-zinc-600 dark:text-zinc-300">
              {completedTasks} מתוך {demoTasks.length} משימות הושלמו
            </div>
          </div>
        </div>

        <div className="grid w-full gap-3 sm:grid-cols-2 lg:w-[420px]">
          <Link
            href="/dashboard/tasks"
            className="rounded-3xl bg-zinc-50 p-5 text-sm shadow-sm ring-1 ring-black/10 transition hover:bg-white dark:bg-white/5 dark:ring-white/10 dark:hover:bg-white/10"
          >
            <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-300">
              פעולה מרכזית
            </div>
            <div className="mt-2 text-base font-semibold">לסגור משימות שבוע</div>
            <div className="mt-1 text-xs leading-6 text-zinc-600 dark:text-zinc-300">
              כל מה שסיכמנו הופך לביצוע עם מעקב.
            </div>
          </Link>
          <div
            aria-disabled="true"
            className="cursor-not-allowed rounded-3xl bg-zinc-50 p-5 text-sm opacity-70 shadow-sm ring-1 ring-black/10 dark:bg-white/5 dark:ring-white/10"
          >
            <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-300">
              AI Center
            </div>
            <div className="mt-2 text-base font-semibold">לייצר תוכן לשבוע</div>
            <div className="mt-1 text-xs leading-6 text-zinc-600 dark:text-zinc-300">
              פוסטים, מיילים ותסריטי וידאו לפי העסק שלך.
            </div>
            <div className="mt-3 text-xs font-semibold text-zinc-500 dark:text-zinc-300">
              בקרוב
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="משימות"
          value={`${openTasks}`}
          hint="פתוחות השבוע"
        />
        <StatCard
          label="עקביות ביצוע"
          value="82%"
          hint="3 שבועות רצוף"
        />
        <StatCard
          label="שיעורים"
          value={`${demoCourses.length}`}
          hint="בספרייה שלך"
        />
        <StatCard
          label="התראות"
          value={`${demoNotifications.length}`}
          hint="עדכונים אחרונים"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5 lg:col-span-2">
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm font-semibold">המשימות הבאות</div>
            <Link
              href="/dashboard/tasks"
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-600 dark:text-emerald-300 dark:hover:text-emerald-200"
            >
              לראות הכל
            </Link>
          </div>

          <div className="mt-4 grid gap-3">
            {nextTasks.map((task) => (
              <div
                key={task.id}
                className="flex flex-col gap-3 rounded-2xl border border-black/10 bg-zinc-50 p-4 dark:border-white/10 dark:bg-white/5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold">{task.title}</div>
                  <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-300">
                    {task.area} · יעד: {task.due}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Pill label="פתוח" tone="info" />
                  <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-semibold text-zinc-900 opacity-70 ring-1 ring-black/10 dark:bg-white/5 dark:text-white dark:ring-white/15">
                    בקש עזרה (בקרוב)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6">
          <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm font-semibold">הפגישה הבאה</div>
              <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                כל הפגישות (בקרוב)
              </span>
            </div>

            <div className="mt-4 rounded-2xl bg-zinc-50 p-4 text-sm dark:bg-white/5">
              <div className="font-semibold">{nextSession.title}</div>
              <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-300">
                {nextSession.date} · {nextSession.time} · {nextSession.location}
              </div>
              <div className="mt-3 text-xs leading-6 text-zinc-600 dark:text-zinc-300">
                {nextSession.notesSummary}
              </div>
            </div>

            <button
              type="button"
              disabled
              className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-zinc-950 px-4 py-2.5 text-sm font-semibold text-white opacity-70 dark:bg-white dark:text-zinc-950"
            >
              כניסה לפגישה (בקרוב)
            </button>
          </div>

          <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm font-semibold">שיעורים מומלצים</div>
              <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                ספרייה מלאה (בקרוב)
              </span>
            </div>

            <div className="mt-4 grid gap-3">
              {demoCourses.slice(0, 2).map((course) => (
                <div
                  key={course.id}
                  className="rounded-2xl bg-zinc-50 p-4 text-sm dark:bg-white/5"
                >
                  <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-300">
                    {course.category}
                  </div>
                  <div className="mt-1 font-semibold">{course.title}</div>
                  <div className="mt-3">
                    <ProgressBar value={course.progressPercent} />
                    <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-300">
                      {course.progressPercent}% הושלם · {course.lessons} שיעורים
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
