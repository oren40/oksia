import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/marketing/Container";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { cn } from "@/lib/cn";

type CardProps = {
  title: string;
  description: string;
  items: string[];
};

function Card({ title, description, items }: CardProps) {
  return (
    <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
      <div className="text-lg font-semibold tracking-tight">{title}</div>
      <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
        {description}
      </p>
      <ul className="mt-4 grid gap-2 text-sm text-zinc-700 dark:text-zinc-200">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-[0.2rem] inline-flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30">
              ✓
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const metadata: Metadata = {
  title: "פיתוח מנטלי, עסקי וטכנולוגי במקום אחד",
};

export default function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-zinc-950">
        <div
          className={cn(
            "pointer-events-none absolute inset-0 -z-10",
            "[background:radial-gradient(60%_60%_at_50%_0%,rgba(16,185,129,0.22),transparent_70%),radial-gradient(50%_50%_at_100%_20%,rgba(59,130,246,0.14),transparent_60%),radial-gradient(40%_40%_at_0%_40%,rgba(244,63,94,0.12),transparent_60%)]"
          )}
        />
        <Container className="py-20 sm:py-28">
          <div className="mx-auto max-w-4xl text-center">
            <p className="inline-flex items-center rounded-full bg-white/5 px-4 py-2 text-xs font-semibold tracking-wide text-zinc-200 ring-1 ring-white/10">
              פלטפורמה אחת להכול
            </p>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-6xl">
              פיתוח מנטלי, עסקי וטכנולוגי במקום אחד
            </h1>
            <p className="mt-6 text-lg leading-8 text-zinc-200">
              מערכת ליווי חכמה שמחליפה פגישות מפוזרות בתהליך ברור שמייצר
              תוצאות: משימות, תכנים, מדידה וכלי AI בתוך אזור אישי פרטי.
            </p>

            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/apply"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-950 shadow-sm transition hover:bg-zinc-200"
              >
                התחל תהליך
              </Link>
              <Link
                href="/dashboard-demo"
                className="inline-flex items-center justify-center rounded-full bg-white/5 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/15 transition hover:bg-white/10"
              >
                צפה בדמו לדשבורד
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                {
                  title: "דשבורד אישי",
                  desc: "תמונת מצב, מדדים, סטטוס התקדמות ומה הצעד הבא.",
                },
                {
                  title: "משימות וביצוע",
                  desc: "כל מה שמדברים עליו הופך למשימות עם מעקב ויעדים.",
                },
                {
                  title: "מרכז AI",
                  desc: "כלי AI שמייצרים ערך אמיתי: תוכן, מכירות, ניתוח.",
                },
              ].map((f) => (
                <div
                  key={f.title}
                  className="rounded-2xl bg-white/5 p-4 text-sm text-zinc-200 ring-1 ring-white/10"
                >
                  <div className="font-semibold text-white">{f.title}</div>
                  <div className="mt-1 leading-6 text-zinc-300">{f.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 dark:bg-zinc-950">
        <Container>
          <SectionHeading
            eyebrow="הבעיה"
            title="עסקים עובדים קשה בלי מערכת"
            description="רוב בעלי העסקים מקבלים ידע, אבל נשארים בלי תהליך שמחזיק ביצוע לאורך זמן. אנחנו בנינו פלטפורמה שמרכזת הכול ניהולי, מנטלי וטכנולוגי במקום אחד, אישי ומדיד."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-black/10 bg-zinc-50 p-8 dark:border-white/10 dark:bg-white/5">
              <div className="text-sm font-semibold text-zinc-500 dark:text-zinc-300">
                העולם הישן
              </div>
              <ul className="mt-4 grid gap-3 text-sm leading-6 text-zinc-700 dark:text-zinc-200">
                <li>פגישות מתפזרות, החלטות נעלמות, משימות לא נסגרות.</li>
                <li>טכנולוגיה מפוזרת בין 7–10 מערכות שלא מדברות אחת עם השנייה.</li>
                <li>אין מדידה אמיתית ואין קצב עבודה שמחזיק חודשים.</li>
              </ul>
            </div>
            <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-8 dark:bg-emerald-500/10">
              <div className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                העולם החדש
              </div>
              <ul className="mt-4 grid gap-3 text-sm leading-6 text-zinc-800 dark:text-zinc-100">
                <li>אזור אישי שמחזיק תהליך: משימות, תכנים, סיכומים ודוחות.</li>
                <li>מדדים ברורים: מכירות, לידים, ביצוע, התקדמות ויעדים קדימה.</li>
                <li>AI כחלק מהמערכת העסקית, לא גימיק.</li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-zinc-50 py-16 dark:bg-black">
        <Container>
          <SectionHeading
            eyebrow="מה מקבלים"
            title="שלושה עולמות. מערכת אחת."
            description="כל לקוח מקבל תהליך מותאם שמחבר בין תודעה, אסטרטגיה וביצוע, וכלים טכנולוגיים שמייצרים יתרון ברור בשטח."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <Card
              title="תודעה"
              description="פיתוח תודעתי שמייצר ביצוע: החלטות, מנהיגות, פחדים ודפוסים."
              items={[
                "עבודה על חסמים והימנעות",
                "מנהיגות וקבלת החלטות",
                "התמדה ותהליכי עבודה",
              ]}
            />
            <Card
              title="עסק"
              description="אסטרטגיה ויישום: הצעה, תמחור, שיווק ומכירות עם תהליכים ברורים."
              items={[
                "אסטרטגיה ותמחור",
                "שיווק ומכירות",
                "בניית תהליכים וניהול",
              ]}
            />
            <Card
              title="טכנולוגיה ו-AI"
              description="אוטומציות וכלי AI שמגדילים תפוקה, חוסכים זמן ומייצרים יותר תוצאות."
              items={["סוכני AI", "מחוללי תוכן", "אוטומציות ומדידה"]}
            />
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 dark:bg-zinc-950">
        <Container>
          <SectionHeading
            eyebrow="איך זה עובד"
            title="תהליך ליווי שמתרגם תובנות לביצוע"
            description="המטרה היא תנועה שבועית קבועה. כל שבוע: משימות, תכנים, פגישה (לפי מסלול), מדידה ושיפור."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-5">
            {[
              {
                step: "01",
                title: "אבחון",
                desc: "שאלונים/טפסים + העלאת נתונים ליצירת תמונת מצב מלאה.",
              },
              {
                step: "02",
                title: "תוכנית",
                desc: "מסלול מותאם: 14/90/365 יום (מנטלי, עסקי וטכנולוגי).",
              },
              {
                step: "03",
                title: "יישום",
                desc: "כל מפגש וכל החלטה הופכים למשימות, חומרים ותוצרים בתוך הדשבורד.",
              },
              {
                step: "04",
                title: "מדידה",
                desc: "דוחות חודשיים, מדדי KPI והתקדמות ויזואלית כדי לדעת מה עובד.",
              },
              {
                step: "05",
                title: "שדרוג",
                desc: "הוספת שכבות: עוד סוכני AI, עוד אוטומציות, עוד מסלולים.",
              },
            ].map((s) => (
              <div
                key={s.step}
                className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5"
              >
                <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                  {s.step}
                </div>
                <div className="mt-3 text-base font-semibold">{s.title}</div>
                <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-zinc-50 py-16 dark:bg-black">
        <Container>
          <SectionHeading
            eyebrow="למי זה מתאים"
            title="למי שרוצה לגדול בצורה מסודרת"
            description="לא עוד ידע. מערכת. לא עוד מוטיבציה. תהליך."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-4">
            {[
              {
                title: "בעלי עסקים",
                desc: "בנייה של מערכת עבודה שמייצרת עקביות ותוצאות.",
              },
              {
                title: "קליניקות ומרפאות",
                desc: "תורים, ניהול לקוחות, שיווק ואוטומציות מותאמות.",
              },
              {
                title: "יזמים וסטארטאפים",
                desc: "מודל עסקי, תהליך מכירות, והטמעת טכנולוגיה חכמה.",
              },
              {
                title: "מנהלים",
                desc: "מדידה, אוטומציה ושדרוג ביצועים בלי לאבד אנושיות.",
              },
            ].map((c) => (
              <div
                key={c.title}
                className="rounded-3xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-white/5"
              >
                <div className="text-base font-semibold">{c.title}</div>
                <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 dark:bg-zinc-950">
        <Container>
          <SectionHeading
            eyebrow="מסלולים"
            title="מסלול שמותאם לקצב וליעדים שלך"
            description="אפשר להתחיל מהר (14 יום), לבנות מערכת (90 יום), או לבנות חברה (שנה)."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {[
              {
                title: "14 יום (התחלה)",
                desc: "סדר, אבחון, החלטות ותוכנית פעולה קצרה שמייצרת מומנטום.",
                items: ["אבחון", "תוכנית", "ביצוע מהיר", "מדידה ראשונית"],
              },
              {
                title: "90 יום (אתחול עסקי)",
                desc: "מבנה עסק, הצעה ותמחור, שיווק ראשון ו־AI בסיסי.",
                items: [
                  "תמחור והצעה",
                  "שיווק ומכירות",
                  "תהליכים",
                  "AI ואוטומציות",
                ],
              },
              {
                title: "שנה (שדרוג עסקי ו-AI)",
                desc: "תהליך מלא: מערכת עסקית + הטמעת כלים חכמים + הרחבת פעילות.",
                items: [
                  "בנייה ושדרוג תהליכים",
                  "דוחות חודשיים",
                  "העמקת AI",
                  "סקייל וריטנשן",
                ],
              },
            ].map((p) => (
              <div
                key={p.title}
                className="flex h-full flex-col rounded-3xl border border-black/10 bg-zinc-50 p-8 dark:border-white/10 dark:bg-white/5"
              >
                <div className="text-lg font-semibold tracking-tight">
                  {p.title}
                </div>
                <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                  {p.desc}
                </p>
                <ul className="mt-5 grid gap-2 text-sm text-zinc-700 dark:text-zinc-200">
                  {p.items.map((i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-zinc-900/10 text-zinc-900 ring-1 ring-black/10 dark:bg-white/10 dark:text-white dark:ring-white/15">
                        •
                      </span>
                      <span>{i}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-8">
                  <Link
                    href="/apply"
                    className="inline-flex w-full items-center justify-center rounded-full bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
                  >
                    בדיקת התאמה
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-10 dark:bg-emerald-500/10">
            <div className="max-w-2xl">
              <div className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                מוכן להתחיל?
              </div>
              <div className="mt-3 text-2xl font-semibold tracking-tight">
                בוא נבנה לך בית דיגיטלי שמחזיק תוצאות
              </div>
              <p className="mt-3 text-sm leading-6 text-zinc-700 dark:text-zinc-200">
                השאר פרטים לבדיקת התאמה וקבל שיחה קצרה שתגדיר כיוון, סדר והשלבים
                הבאים.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/apply"
                  className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
                >
                  בדיקת התאמה חינמית
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-950 ring-1 ring-black/10 transition hover:bg-zinc-50 dark:bg-white/5 dark:text-white dark:ring-white/15 dark:hover:bg-white/10"
                >
                  להבין מה כלול
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
