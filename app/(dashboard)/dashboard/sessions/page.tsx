import { Badge } from "@/components/dashboard/Badge";
import { Card } from "@/components/dashboard/Card";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { demoSessions } from "@/lib/demo-data";

export default function DashboardSessionsPage() {
  const nextSession = demoSessions[demoSessions.length - 1];

  return (
    <div className="grid gap-6">
      <PageHeader
        title="פגישות"
        description="יומן פגישות, סיכומים, החלטות ומשימות המשך, הכל מתועד ונשמר במקום אחד."
      />

      <Card>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="text-sm font-semibold">הפגישה הבאה</div>
            <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
              {nextSession.date} · {nextSession.time} · {nextSession.location}
            </div>
          </div>
          <Badge tone="info">קרובה</Badge>
        </div>

        <div className="mt-5 rounded-2xl bg-zinc-50 p-4 text-sm leading-7 text-zinc-700 dark:bg-white/5 dark:text-zinc-200">
          {nextSession.notesSummary}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <button
            type="button"
            disabled
            className="rounded-full bg-zinc-950 px-5 py-2.5 text-sm font-semibold text-white opacity-70 dark:bg-white dark:text-zinc-950"
          >
            כניסה ל-Zoom (בקרוב)
          </button>
          <button
            type="button"
            disabled
            className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-zinc-950 opacity-70 ring-1 ring-black/10 dark:bg-white/5 dark:text-white dark:ring-white/15"
          >
            העלאת סיכום (בקרוב)
          </button>
        </div>
      </Card>

      <Card>
        <div className="text-sm font-semibold">היסטוריית פגישות</div>
        <div className="mt-6 grid gap-3">
          {demoSessions.map((session, index) => {
            const isLatest = index === demoSessions.length - 1;

            return (
              <div
                key={session.id}
                className="rounded-2xl border border-black/10 bg-zinc-50 p-4 dark:border-white/10 dark:bg-white/5"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold">
                      {session.title}
                    </div>
                    <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-300">
                      {session.date} · {session.time} · {session.location}
                    </div>
                  </div>
                  <Badge tone={isLatest ? "info" : "neutral"}>
                    {isLatest ? "הבאה" : "עבר"}
                  </Badge>
                </div>

                <div className="mt-4 text-sm leading-7 text-zinc-700 dark:text-zinc-200">
                  {session.notesSummary}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    disabled
                    className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-zinc-950 opacity-70 ring-1 ring-black/10 dark:bg-white/5 dark:text-white dark:ring-white/15"
                  >
                    סיכום מלא (בקרוב)
                  </button>
                  <button
                    type="button"
                    disabled
                    className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-zinc-950 opacity-70 ring-1 ring-black/10 dark:bg-white/5 dark:text-white dark:ring-white/15"
                  >
                    הקלטה (בקרוב)
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
