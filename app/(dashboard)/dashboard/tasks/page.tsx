import { Badge } from "@/components/dashboard/Badge";
import { Card } from "@/components/dashboard/Card";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { demoTasks } from "@/lib/demo-data";
import { cn } from "@/lib/cn";

function getStatusLabel(status: string): string {
  if (status === "done") return "בוצע";
  if (status === "doing") return "בתהליך";
  return "פתוח";
}

function getStatusTone(status: string): "success" | "warning" | "info" {
  if (status === "done") return "success";
  if (status === "doing") return "warning";
  return "info";
}

export default function DashboardTasksPage() {
  const openTasks = demoTasks.filter((task) => task.status !== "done");
  const doneTasks = demoTasks.filter((task) => task.status === "done");

  return (
    <div className="grid gap-6">
      <PageHeader
        title="משימות"
        description="כל החלטה בתהליך הופכת למשימה עם תאריך יעד, תחום ומעקב."
        actions={
          <>
            <Badge tone="info">פתוחות {openTasks.length}</Badge>
            <Badge tone="success">בוצעו {doneTasks.length}</Badge>
          </>
        }
      />

      <Card>
        <div className="text-sm font-semibold">רשימת משימות</div>
        <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
          (דמו) בשלב הבא נוסיף יצירה/עריכה, העלאת קבצים ותשובות לכל משימה.
        </div>

        <div className="mt-6 grid gap-3">
          {demoTasks.map((task) => (
            <div
              key={task.id}
              className={cn(
                "rounded-2xl border border-black/10 bg-zinc-50 p-4 dark:border-white/10 dark:bg-white/5",
                task.status === "done" ? "opacity-80" : null
              )}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold">{task.title}</div>
                  <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-300">
                    {task.area} · יעד: {task.due}
                  </div>
                </div>

                <Badge tone={getStatusTone(task.status)}>
                  {getStatusLabel(task.status)}
                </Badge>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  disabled
                  className="rounded-full bg-zinc-950 px-4 py-2 text-xs font-semibold text-white opacity-70 dark:bg-white dark:text-zinc-950"
                >
                  סמן בוצע (בקרוב)
                </button>
                <button
                  type="button"
                  disabled
                  className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-zinc-950 opacity-70 ring-1 ring-black/10 dark:bg-white/5 dark:text-white dark:ring-white/15"
                >
                  בקש עזרה (בקרוב)
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
