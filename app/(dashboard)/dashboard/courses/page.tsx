import Link from "next/link";

import { Badge } from "@/components/dashboard/Badge";
import { Card } from "@/components/dashboard/Card";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { ProgressBar } from "@/components/dashboard/ProgressBar";
import { demoCourses } from "@/lib/demo-data";

export default function DashboardCoursesPage() {
  return (
    <div className="grid gap-6">
      <PageHeader
        title="קורסים"
        description="ספריית תוכן אישית שמותאמת למסלול שלך, עם מעקב התקדמות ומשימות."
        actions={
          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-zinc-950 ring-1 ring-black/10 transition hover:bg-zinc-50 dark:bg-white/5 dark:text-white dark:ring-white/15 dark:hover:bg-white/10"
          >
            להוסיף תוכן (בקרוב)
          </Link>
        }
      />

      <Card>
        <div className="text-sm font-semibold">הקורסים שלך</div>
        <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
          (דמו) בשלב הבא ניצור דפי שיעור, העלאת וידאו, סימון “בוצע” ושאלות.
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {demoCourses.map((course) => (
            <div
              key={course.id}
              className="rounded-2xl border border-black/10 bg-zinc-50 p-5 dark:border-white/10 dark:bg-white/5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-300">
                    {course.category}
                  </div>
                  <div className="mt-1 truncate text-base font-semibold">
                    {course.title}
                  </div>
                </div>
                <Badge tone={course.progressPercent > 0 ? "info" : "neutral"}>
                  {course.progressPercent}%
                </Badge>
              </div>

              <div className="mt-4">
                <ProgressBar value={course.progressPercent} />
                <div className="mt-2 text-xs text-zinc-600 dark:text-zinc-300">
                  {course.lessons} שיעורים · {course.progressPercent}% הושלם
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <button
                  type="button"
                  disabled
                  className="rounded-full bg-zinc-950 px-4 py-2 text-xs font-semibold text-white opacity-70 dark:bg-white dark:text-zinc-950"
                >
                  המשך לשיעור הבא (בקרוב)
                </button>
                <button
                  type="button"
                  disabled
                  className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-zinc-950 opacity-70 ring-1 ring-black/10 dark:bg-white/5 dark:text-white dark:ring-white/15"
                >
                  רשום שאלה (בקרוב)
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
