import { Card } from "@/components/dashboard/Card";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { demoFiles } from "@/lib/demo-data";

export default function DashboardFilesPage() {
  return (
    <div className="grid gap-6">
      <PageHeader
        title="קבצים ומסמכים"
        description="כל המסמכים, הדוחות והחומרים של התהליך במקום אחד, מסודר לפי תאריך וסוג."
      />

      <Card>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="text-sm font-semibold">קבצים</div>
            <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
              (דמו) בשלב הבא נוסיף תיקיות לפי שלב + הרשאות והעלאה.
            </div>
          </div>

          <button
            type="button"
            disabled
            className="inline-flex h-11 items-center justify-center rounded-full bg-zinc-950 px-5 text-sm font-semibold text-white opacity-70 dark:bg-white dark:text-zinc-950"
          >
            העלאת קובץ (בקרוב)
          </button>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-black/10 dark:border-white/10">
          <table className="w-full text-right text-sm">
            <thead className="bg-zinc-50 text-xs font-semibold text-zinc-500 dark:bg-white/5 dark:text-zinc-300">
              <tr>
                <th className="px-4 py-3">שם</th>
                <th className="px-4 py-3">סוג</th>
                <th className="px-4 py-3">עודכן</th>
                <th className="px-4 py-3">פעולות</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/10 dark:divide-white/10">
              {demoFiles.map((file) => (
                <tr
                  key={file.id}
                  className="bg-white text-zinc-700 dark:bg-transparent dark:text-zinc-200"
                >
                  <td className="px-4 py-4 font-semibold">{file.title}</td>
                  <td className="px-4 py-4">{file.kind}</td>
                  <td className="px-4 py-4">{file.updatedAt}</td>
                  <td className="px-4 py-4">
                    <button
                      type="button"
                      disabled
                      className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-zinc-950 opacity-70 ring-1 ring-black/10 dark:bg-white/5 dark:text-white dark:ring-white/15"
                    >
                      הורדה (בקרוב)
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
