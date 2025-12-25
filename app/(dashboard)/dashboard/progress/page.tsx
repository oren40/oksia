import { Badge } from "@/components/dashboard/Badge";
import { Card } from "@/components/dashboard/Card";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { ProgressBar } from "@/components/dashboard/ProgressBar";

type MonthlyMetric = {
  label: string;
  revenue: number;
  leads: number;
};

const monthlyMetrics: MonthlyMetric[] = [
  { label: "אוק׳", revenue: 12200, leads: 98 },
  { label: "נוב׳", revenue: 18900, leads: 142 },
  { label: "דצ׳", revenue: 24500, leads: 176 },
];

function formatCurrency(value: number): string {
  return `₪${value.toLocaleString("he-IL")}`;
}

export default function DashboardProgressPage() {
  const maxRevenue = Math.max(...monthlyMetrics.map((m) => m.revenue));

  const targetRevenue = 30000;
  const currentRevenue = monthlyMetrics[monthlyMetrics.length - 1].revenue;
  const revenueProgress = Math.round((currentRevenue / targetRevenue) * 100);

  return (
    <div className="grid gap-6">
      <PageHeader
        title="התקדמות ונתונים"
        description="מדדים פשוטים וברורים שמראים מה זז, מה תקוע, ומה הדבר הבא שצריך לעשות."
        actions={<Badge tone="info">דשבורד KPI (דמו)</Badge>}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="text-sm font-semibold">הכנסות החודש</div>
              <div className="mt-2 text-3xl font-semibold tracking-tight">
                {formatCurrency(currentRevenue)}
              </div>
              <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                יעד: {formatCurrency(targetRevenue)} · {revenueProgress}% הושלם
              </div>
            </div>
            <div className="rounded-2xl bg-zinc-50 p-4 text-sm dark:bg-white/5">
              <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-300">
                תובנה
              </div>
              <div className="mt-2 leading-6 text-zinc-700 dark:text-zinc-200">
                אם נשפר יחס סגירה ב־1% השבוע, נוכל להגיע ליעד מוקדם יותר.
              </div>
            </div>
          </div>

          <div className="mt-6">
            <ProgressBar value={revenueProgress} />
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4">
            {monthlyMetrics.map((m) => (
              <div key={m.label} className="rounded-2xl bg-zinc-50 p-4 dark:bg-white/5">
                <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-300">
                  {m.label}
                </div>
                <div className="mt-2 text-sm font-semibold">
                  {formatCurrency(m.revenue)}
                </div>
                <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-300">
                  {m.leads} לידים
                </div>
                <div className="mt-4 h-24 rounded-2xl bg-black/5 p-2 dark:bg-white/10">
                  <div
                    className="h-full w-full rounded-xl bg-emerald-500"
                    style={{ height: `${Math.round((m.revenue / maxRevenue) * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="text-sm font-semibold">יעדים לשבוע</div>
          <div className="mt-5 grid gap-4">
            {[
              {
                label: "שיחות מכירה",
                value: 6,
                target: 10,
              },
              {
                label: "פוסטים",
                value: 4,
                target: 6,
              },
              {
                label: "משימות הושלמו",
                value: 3,
                target: 5,
              },
            ].map((item) => {
              const percent = Math.round((item.value / item.target) * 100);

              return (
                <div key={item.label}>
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm font-semibold">{item.label}</div>
                    <div className="text-xs text-zinc-600 dark:text-zinc-300">
                      {item.value}/{item.target}
                    </div>
                  </div>
                  <div className="mt-3">
                    <ProgressBar value={percent} />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
