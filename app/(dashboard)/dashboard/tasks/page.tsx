import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { Badge } from "@/components/dashboard/Badge";
import { Card } from "@/components/dashboard/Card";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { cn } from "@/lib/cn";

type TaskStatus = "todo" | "doing" | "done";

type Task = {
  id: string;
  title: string;
  domain: string;
  dueDate: string | null;
  status: TaskStatus;
};

function getBackendUrl(): string {
  return (
    process.env.BACKEND_URL ??
    process.env.NEXT_PUBLIC_BACKEND_URL ??
    "http://localhost:4000"
  );
}

async function fetchTasks(): Promise<Task[]> {
  const cookieStore = await cookies();
  const token = cookieStore.get("oksia_access_token")?.value;
  if (!token) {
    redirect("/login?next=/dashboard/tasks");
  }

  const res = await fetch(`${getBackendUrl()}/tasks`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (res.status === 401) {
    redirect("/login?next=/dashboard/tasks");
  }

  if (!res.ok) {
    throw new Error("Failed to load tasks");
  }

  const data = (await res.json()) as { tasks?: Task[] };
  return data.tasks ?? [];
}

function formatDueDate(date: string | null): string {
  if (!date) return "-";
  return date;
}

function getStatusLabel(status: TaskStatus): string {
  if (status === "done") return "בוצע";
  if (status === "doing") return "בתהליך";
  return "פתוח";
}

function getStatusTone(status: TaskStatus): "success" | "warning" | "info" {
  if (status === "done") return "success";
  if (status === "doing") return "warning";
  return "info";
}

export default async function DashboardTasksPage() {
  async function markDoneAction(formData: FormData) {
    "use server";

    const taskId = String(formData.get("taskId") ?? "");
    if (!taskId) {
      return;
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("oksia_access_token")?.value;
    if (!token) {
      redirect("/login?next=/dashboard/tasks");
    }

    const res = await fetch(`${getBackendUrl()}/tasks/${taskId}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: "done" }),
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to update task");
    }

    revalidatePath("/dashboard/tasks");
    revalidatePath("/dashboard");
  }

  const tasks = await fetchTasks();
  const openTasks = tasks.filter((task) => task.status !== "done");
  const doneTasks = tasks.filter((task) => task.status === "done");

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
          MVP: הרשימה מגיעה מהשרת. בשלב הבא נוסיף יצירה/עריכה, העלאת קבצים ותשובות.
        </div>

        <div className="mt-6 grid gap-3">
          {tasks.map((task) => (
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
                    {task.domain} · יעד: {formatDueDate(task.dueDate)}
                  </div>
                </div>

                <Badge tone={getStatusTone(task.status)}>
                  {getStatusLabel(task.status)}
                </Badge>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <form action={markDoneAction}>
                  <input type="hidden" name="taskId" value={task.id} />
                  <button
                    type="submit"
                    disabled={task.status === "done"}
                    className={cn(
                      "rounded-full bg-zinc-950 px-4 py-2 text-xs font-semibold text-white dark:bg-white dark:text-zinc-950",
                      task.status === "done" ? "opacity-60" : "hover:opacity-90"
                    )}
                  >
                    סמן בוצע
                  </button>
                </form>
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
