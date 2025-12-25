import { Badge } from "@/components/dashboard/Badge";
import { Card } from "@/components/dashboard/Card";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { demoNotifications } from "@/lib/demo-data";

export default function DashboardNotificationsPage() {
  return (
    <div className="grid gap-6">
      <PageHeader
        title="התראות"
        description="עדכונים על משימות, פגישות ותוכן מומלץ כדי שתישאר בקצב."
        actions={<Badge tone="info">{demoNotifications.length} חדש</Badge>}
      />

      <Card>
        <div className="grid gap-3">
          {demoNotifications.map((n) => (
            <div
              key={n.id}
              className="rounded-2xl border border-black/10 bg-zinc-50 p-4 dark:border-white/10 dark:bg-white/5"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="text-sm font-semibold">{n.title}</div>
                  <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                    {n.description}
                  </div>
                </div>
                <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                  {n.createdAt}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
