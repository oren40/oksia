import { Badge } from "@/components/dashboard/Badge";
import { Card } from "@/components/dashboard/Card";
import { PageHeader } from "@/components/dashboard/PageHeader";

export default function DashboardProfilePage() {
  return (
    <div className="grid gap-6">
      <PageHeader
        title="פרופיל"
        description="פרטי העסק, מסלול ותשלומים."
        actions={<Badge tone="info">דמו</Badge>}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="text-sm font-semibold">פרטים בסיסיים</div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                שם מלא
              </span>
              <input
                defaultValue="אורן (דמו)"
                disabled
                className="h-11 rounded-2xl border border-black/10 bg-white px-4 text-sm text-zinc-950 opacity-80 dark:border-white/10 dark:bg-white/5 dark:text-white"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                אימייל
              </span>
              <input
                defaultValue="oren@example.com"
                disabled
                className="h-11 rounded-2xl border border-black/10 bg-white px-4 text-sm text-zinc-950 opacity-80 dark:border-white/10 dark:bg-white/5 dark:text-white"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                שם העסק
              </span>
              <input
                defaultValue="oksia Demo"
                disabled
                className="h-11 rounded-2xl border border-black/10 bg-white px-4 text-sm text-zinc-950 opacity-80 dark:border-white/10 dark:bg-white/5 dark:text-white"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                תחום
              </span>
              <input
                defaultValue="שירותים / ליווי"
                disabled
                className="h-11 rounded-2xl border border-black/10 bg-white px-4 text-sm text-zinc-950 opacity-80 dark:border-white/10 dark:bg-white/5 dark:text-white"
              />
            </label>

            <label className="grid gap-2 sm:col-span-2">
              <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                יעד שנתי
              </span>
              <textarea
                defaultValue="להפוך את העסק למערכת שמייצרת תוצאות עקביות."
                disabled
                rows={3}
                className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-zinc-950 opacity-80 dark:border-white/10 dark:bg-white/5 dark:text-white"
              />
            </label>
          </div>

          <div className="mt-8 text-sm text-zinc-600 dark:text-zinc-300">
            (דמו) בשלב הבא: עריכת פרטים, מסלולים, חידוש וחשבוניות.
          </div>
        </Card>

        <Card>
          <div className="text-sm font-semibold">מסלול ותשלום</div>

          <div className="mt-6 grid gap-4">
            <div className="rounded-2xl bg-zinc-50 p-4 text-sm dark:bg-white/5">
              <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-300">
                המסלול שלך
              </div>
              <div className="mt-2 font-semibold">90 יום (Restart עסקי)</div>
              <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-300">
                סטטוס: פעיל
              </div>
            </div>

            <div className="rounded-2xl bg-zinc-50 p-4 text-sm dark:bg-white/5">
              <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-300">
                חידוש
              </div>
              <div className="mt-2 font-semibold">31/03/2026</div>
              <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-300">
                ניתן לשדרג/להוסיף שירותים
              </div>
            </div>

            <button
              type="button"
              disabled
              className="inline-flex h-11 items-center justify-center rounded-full bg-emerald-600 px-5 text-sm font-semibold text-white opacity-70"
            >
              ניהול תשלום (בקרוב)
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
