import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/marketing/Container";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { cn } from "@/lib/cn";

type StatCardProps = {
  label: string;
  value: string;
  note: string;
};

function StatCard({ label, value, note }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/5">
      <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
        {label}
      </div>
      <div className="mt-2 text-2xl font-semibold tracking-tight">{value}</div>
      <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-300">{note}</div>
    </div>
  );
}

type DemoTaskProps = {
  title: string;
  area: string;
  due: string;
  status: "פתוח" | "בוצע" | "בהמתנה";
};

function DemoTask({ title, area, due, status }: DemoTaskProps) {
  const badgeClassName =
    status === "בוצע"
      ? "bg-emerald-500/10 text-emerald-700 ring-emerald-500/20 dark:text-emerald-300"
      : status === "בהמתנה"
        ? "bg-amber-500/10 text-amber-700 ring-amber-500/20 dark:text-amber-300"
        : "bg-sky-500/10 text-sky-700 ring-sky-500/20 dark:text-sky-300";

  return (
    <div className="grid gap-3 rounded-2xl border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-white/5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold">{title}</div>
          <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-300">
            {area} · יעד: {due}
          </div>
        </div>
        <span
          className={cn(
            "inline-flex shrink-0 items-center rounded-full px-3 py-1 text-xs font-semibold ring-1",
            badgeClassName
          )}
        >
          {status}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded-full bg-zinc-950 px-3 py-2 text-xs font-semibold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
        >
          סמן בוצע
        </button>
        <button
          type="button"
          className="rounded-full bg-white px-3 py-2 text-xs font-semibold text-zinc-950 ring-1 ring-black/10 transition hover:bg-zinc-50 dark:bg-white/5 dark:text-white dark:ring-white/15 dark:hover:bg-white/10"
        >
          בקש עזרה
        </button>
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: "דמו לדשבורד",
};

export default function DashboardDemoPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-zinc-950 py-16 text-white">
        <div
          className={cn(
            "pointer-events-none absolute inset-0 -z-10",
            "[background:radial-gradient(60%_60%_at_20%_0%,rgba(16,185,129,0.22),transparent_70%),radial-gradient(40%_40%_at_90%_10%,rgba(59,130,246,0.16),transparent_60%),radial-gradient(40%_40%_at_0%_60%,rgba(244,63,94,0.12),transparent_60%)]"
          )}
        />
        <Container>
          <SectionHeading
            eyebrow="דמו"
            title="ככה נראה מרכז הפיקוד של הלקוח"
            description="הדשבורד הוא המקום שבו כל התהליך מתרחש: משימות, פגישות, תכנים, מדדים וכלי AI, עם סדר וקצב עבודה ברור."
            variant="inverse"
          />

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-950 shadow-sm transition hover:bg-zinc-200"
            >
              רוצה מערכת כזאת לעסק שלך?
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-full bg-white/5 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/15 transition hover:bg-white/10"
            >
              לראות מה כלול
            </Link>
          </div>
        </Container>
      </section>

      <section className="bg-zinc-50 py-16 dark:bg-black">
        <Container>
          <div className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-xl dark:border-white/10 dark:bg-zinc-950">
            <div className="flex flex-col lg:flex-row">
              <aside className="border-b border-black/10 bg-zinc-950 p-6 text-zinc-50 dark:border-white/10 lg:w-72 lg:border-b-0 lg:border-l">
                <div className="flex items-center gap-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15">
                    OX
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold">oksia</div>
                    <div className="truncate text-xs text-zinc-300">
                      אזור אישי · דמו
                    </div>
                  </div>
                </div>

                <div className="mt-8 grid gap-2 text-sm">
                  {[
                    "Dashboard",
                    "משימות",
                    "פגישות",
                    "קורסים",
                    "AI Center",
                    "קבצים",
                    "מדדים",
                    "פרופיל",
                  ].map((item) => (
                    <div
                      key={item}
                      className={cn(
                        "rounded-2xl px-4 py-3 ring-1 ring-transparent transition",
                        item === "Dashboard"
                          ? "bg-white/10 text-white ring-white/15"
                          : "text-zinc-200 hover:bg-white/5"
                      )}
                    >
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-10 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                  <div className="text-xs font-semibold text-zinc-300">
                    סטטוס התהליך
                  </div>
                  <div className="mt-2 text-sm font-semibold">90 יום (Build System)</div>
                  <div className="mt-3 h-2 rounded-full bg-white/10">
                    <div className="h-2 w-[38%] rounded-full bg-emerald-400" />
                  </div>
                  <div className="mt-2 text-xs text-zinc-300">38% התקדמות</div>
                </div>
              </aside>

              <div className="flex-1 p-6 sm:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="text-sm text-zinc-600 dark:text-zinc-300">
                      ברוך הבא,
                    </div>
                    <div className="mt-1 text-2xl font-semibold tracking-tight">
                      אורן (דמו)
                    </div>
                    <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                      השבוע: 5 משימות פתוחות · פגישה אחת קרובה · 2 שיעורים מומלצים
                    </div>
                  </div>

                  <div className="rounded-2xl border border-black/10 bg-zinc-50 p-4 text-sm dark:border-white/10 dark:bg-white/5">
                    <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                      הודעה אישית
                    </div>
                    <div className="mt-2 leading-6 text-zinc-700 dark:text-zinc-200">
                      השבוע אנחנו סוגרים הצעה ותמחור, ומתחילים להרים משפך לידים.
                    </div>
                  </div>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <StatCard
                    label="לידים השבוע"
                    value="47"
                    note="+12% לעומת שבוע שעבר"
                  />
                  <StatCard
                    label="מכירות החודש"
                    value="₪18,900"
                    note="יעד: ₪30,000"
                  />
                  <StatCard
                    label="עקביות ביצוע"
                    value="82%"
                    note="3 שבועות רצוף"
                  />
                  <StatCard
                    label="משימות"
                    value="5"
                    note="פתוחות השבוע"
                  />
                </div>

                <div className="mt-8 grid gap-6 lg:grid-cols-3">
                  <div className="lg:col-span-2">
                    <div className="text-sm font-semibold">המשימות הבאות</div>
                    <div className="mt-4 grid gap-3">
                      <DemoTask
                        title="לסגור הצעה ותמחור (גרסה 1)"
                        area="עסקי"
                        due="יום חמישי"
                        status="פתוח"
                      />
                      <DemoTask
                        title="להקים טופס לידים + אוטומציה ראשונית"
                        area="טכנולוגי"
                        due="יום ראשון"
                        status="בהמתנה"
                      />
                      <DemoTask
                        title="תרגול החלטה: 3 פעולות שמייצרות שליטה"
                        area="מנטלי"
                        due="היום"
                        status="בוצע"
                      />
                    </div>
                  </div>

                  <div className="grid gap-6">
                    <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
                      <div className="text-sm font-semibold">הפגישה הבאה</div>
                      <div className="mt-3 rounded-2xl bg-zinc-50 p-4 text-sm dark:bg-white/5">
                        <div className="font-semibold">שיחת ליווי שבועית</div>
                        <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-300">
                          יום שני · 11:30 · Zoom
                        </div>
                      </div>
                      <button
                        type="button"
                        className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-zinc-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
                      >
                        כניסה לפגישה
                      </button>
                      <div className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                        בדמו זה כפתור המחשה.
                      </div>
                    </div>

                    <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
                      <div className="text-sm font-semibold">AI Center</div>
                      <div className="mt-4 grid gap-3 text-sm">
                        {[
                          {
                            title: "AI Content Generator",
                            desc: "12 פוסטים לשבוע + רעיונות לסטוריז",
                          },
                          {
                            title: "AI Sales Coach",
                            desc: "ניסוח הצעה ושיפור שיחות",
                          },
                          {
                            title: "AI Business Analyst",
                            desc: "המלצות לפי נתונים ויעדים",
                          },
                        ].map((tool) => (
                          <div
                            key={tool.title}
                            className="rounded-2xl bg-zinc-50 p-4 dark:bg-white/5"
                          >
                            <div className="font-semibold">{tool.title}</div>
                            <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-300">
                              {tool.desc}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-10 dark:bg-emerald-500/10">
            <div className="max-w-2xl">
              <div className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                המטרה של הדשבורד
              </div>
              <div className="mt-3 text-2xl font-semibold tracking-tight">
                להפוך תהליך ללוח בקרה
              </div>
              <p className="mt-3 text-sm leading-7 text-zinc-700 dark:text-zinc-200">
                במקום “ניפגש ונראה”, יש לך מערכת שמודדת, מתעדת ומחזיקה קצב.
                אתה והלקוח רואים בדיוק מה בוצע, מה חסר, ומה הצעד הבא.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/apply"
                  className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
                >
                  בדיקת התאמה
                </Link>
                <Link
                  href="/how-it-works"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-950 ring-1 ring-black/10 transition hover:bg-zinc-50 dark:bg-white/5 dark:text-white dark:ring-white/15 dark:hover:bg-white/10"
                >
                  לראות את התהליך
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
