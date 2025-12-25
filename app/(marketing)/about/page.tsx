import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/marketing/Container";
import { SectionHeading } from "@/components/marketing/SectionHeading";

export const metadata: Metadata = {
  title: "מי אנחנו",
};

export default function AboutPage() {
  const pillars = [
    {
      title: "ליווי עסקי עמוק ומעשי",
      desc: "אסטרטגיה, שיווק, מכירות, תמחור ובניית תהליכים.",
    },
    {
      title: "פיתוח מנטלי ותודעתי",
      desc: "עבודה על פחדים, דפוסי חשיבה, קבלת החלטות ומנהיגות.",
    },
    {
      title: "פתרונות טכנולוגיים חכמים מבוססי AI",
      desc: "אוטומציות, סוכני AI, תהליכי שיווק חכמים וניהול נתונים.",
    },
  ];

  const principles = [
    {
      title: "אדם לפני מערכת",
      desc: "תודעה, החלטות והתמדה הם המנוע. הטכנולוגיה באה לשרת את האדם.",
    },
    {
      title: "מערכת לפני מאמץ",
      desc: "פחות כיבוי שריפות, יותר תהליכים שעובדים גם כשאין זמן.",
    },
    {
      title: "תהליך לפני מוטיבציה",
      desc: "אנחנו בונים שגרה שמייצרת תוצאות גם בימים פחות טובים.",
    },
  ];

  const audiences = [
    "בעלי עסקים קטנים ובינוניים שרוצים לגדול בצורה מסודרת.",
    "בעלי קליניקות, מרפאות ונותני שירות שרוצים לבנות מערכות ולא לעבוד בכיבוי שריפות.",
    "יזמים וסטארטאפים בתחילת הדרך או אחרי שלב ראשון, שצריכים שילוב של פיתוח עסקי + טכנולוגי.",
    "מנהלים שרוצים להפוך את העסק ליותר חכם, מדיד ואוטומטי בלי לאבד את האנושיות.",
  ];

  const flow = [
    {
      title: "אבחון",
      desc: "הלקוח ממלא שאלונים/טפסים, מעלה נתונים ואנחנו בונים תמונת מצב מלאה.",
    },
    {
      title: "בניית תוכנית",
      desc: "תוכנית מותאמת (מנטלית + עסקית + טכנולוגית) לתקופה: 14/90/365 יום.",
    },
    {
      title: "יישום",
      desc: "כל מפגש, משימה, קורס וכלי AI מתועדים ומבוצעים דרך האזור האישי.",
    },
    {
      title: "מדידה ושיפור",
      desc: "הלקוח רואה התקדמות, נתונים, דוחות, ומשימות שבוצעו, ומה הצעד הבא.",
    },
    {
      title: "שדרוג מתמשך",
      desc: "אפשר להוסיף שכבות: עוד סוכני AI, עוד אוטומציות וחיבורים (CRM, דיוור, WhatsApp ועוד).",
    },
  ];

  const dashboardFeatures = [
    {
      title: "Dashboard (לוח בקרה)",
      desc: "תמונת מצב של העסק לפי המדדים שהוגדרו יחד: מכירות, לידים, פעולות ומשימות.",
    },
    {
      title: "משימות ותוכנית עבודה",
      desc: "משימות שבועיות/יומיות לפי המסלול, חלוקה לתחומים, דדליינים ומעקב התקדמות.",
    },
    {
      title: "קורסים וסדנאות",
      desc: "תכנים רלוונטיים שנבחרו אישית: וידאו, תרגילים, סיכומים, הערות ושאלות.",
    },
    {
      title: "פגישות וסיכומים",
      desc: "יומן פגישות, קישורי Zoom, סיכומים, החלטות ומשימות המשך לכל מפגש.",
    },
    {
      title: "AI Center",
      desc: "כלים מותאמים לעסק: תוכן, מכירות, ניתוח עסקי ושאלות מהירות, מחוברים לתהליך.",
    },
    {
      title: "קבצים ומסמכים",
      desc: "ספרייה מסודרת לכל החומרים: אסטרטגיה, דוחות, מצגות, טבלאות וקבצי עבודה.",
    },
  ];

  const differentiators = [
    "שילוב של שלושה עולמות: תודעה, עסק וטכנולוגיה, לא רק אחד מהם.",
    "מערכת דיגיטלית אחת במקום עשר מערכות מפוזרות.",
    "מיקוד בביצוע: כל החלטה הופכת למשימות, לוח זמנים ותוצאות.",
    "שימוש חכם ב-AI, לא גימיק, אלא חלק קבוע במערכת העסקית.",
    "התאמה אישית: לכל עסק יש מסלול אחר ורמות שונות של ליווי ותמיכה.",
  ];

  return (
    <div>
      <section className="relative overflow-hidden bg-zinc-950 py-16 text-white">
        <div className="pointer-events-none absolute inset-0 -z-10 [background:radial-gradient(60%_60%_at_30%_0%,rgba(16,185,129,0.22),transparent_70%),radial-gradient(45%_45%_at_100%_10%,rgba(59,130,246,0.12),transparent_60%),radial-gradient(40%_40%_at_0%_60%,rgba(244,63,94,0.10),transparent_60%)]" />
        <Container>
          <SectionHeading
            eyebrow="מי אנחנו"
            title="oksia: פלטפורמה אחת שמחברת תודעה, עסק ו-AI"
            description="הפלטפורמה שלנו נולדה מתוך צורך ברור: רוב בעלי העסקים מקבלים ייעוץ, קורסים או טכנולוגיה, אבל כמעט אף פעם לא מקבלים מערכת אחת אישית שמרכזת הכול במקום אחד ומתרגמת את זה לביצוע מדיד."
            variant="inverse"
          />

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-950 shadow-sm transition hover:bg-zinc-200"
            >
              בדיקת התאמה
            </Link>
            <Link
              href="/dashboard-demo"
              className="inline-flex items-center justify-center rounded-full bg-white/5 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/15 transition hover:bg-white/10"
            >
              צפה בדמו לדשבורד
            </Link>
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 dark:bg-zinc-950">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-3xl border border-black/10 bg-zinc-50 p-8 dark:border-white/10 dark:bg-white/5 lg:col-span-2">
              <div className="text-lg font-semibold tracking-tight">
                הפלטפורמה נולדה מתוך צורך ברור
              </div>
              <div className="mt-4 grid gap-4 text-sm leading-7 text-zinc-700 dark:text-zinc-200">
                <p>
                  רוב בעלי העסקים מקבלים ידע, אבל נשארים בלי מערכת: פגישות
                  נעלמות, משימות לא מבוצעות, אין מדידה, וההתקדמות לא עקבית.
                </p>
                <p>
                  אנחנו בנינו ב-oksia “בית דיגיטלי” שבו כל התהליך מתרכז: מסלול
                  עבודה ברור, משימות, חומרים, פגישות, קצב התקדמות וכלי AI, עם
                  סדר, אחריות וביצוע.
                </p>
              </div>

              <div className="mt-8 text-sm font-semibold">אנחנו משלבים</div>
              <ul className="mt-3 grid gap-3 text-sm leading-7 text-zinc-700 dark:text-zinc-200">
                {pillars.map((item) => (
                  <li key={item.title} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                    <span>
                      <span className="font-semibold text-zinc-950 dark:text-white">
                        {item.title}
                      </span>{" "}
                      : {item.desc}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-8 dark:bg-emerald-500/10">
              <div className="text-lg font-semibold tracking-tight">
                שלושה עקרונות שמובילים אותנו
              </div>
              <ul className="mt-4 grid gap-4 text-sm leading-7 text-zinc-800 dark:text-zinc-100">
                {principles.map((item) => (
                  <li key={item.title}>
                    <div className="font-semibold">{item.title}</div>
                    <div className="mt-1 text-sm text-zinc-700 dark:text-zinc-200">
                      {item.desc}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-black/10 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-white/5">
              <div className="text-lg font-semibold tracking-tight">
                למי הפלטפורמה מיועדת
              </div>
              <ul className="mt-4 grid gap-3 text-sm leading-7 text-zinc-700 dark:text-zinc-200">
                {audiences.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-900 dark:bg-white" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-black/10 bg-zinc-50 p-8 dark:border-white/10 dark:bg-white/5">
              <div className="text-lg font-semibold tracking-tight">
                מה הפלטפורמה עושה בפועל
              </div>
              <ol className="mt-4 grid gap-3 text-sm leading-7 text-zinc-700 dark:text-zinc-200">
                {flow.map((step, index) => (
                  <li
                    key={step.title}
                    className="rounded-2xl bg-white p-4 ring-1 ring-black/5 dark:bg-black/20 dark:ring-white/10"
                  >
                    <div className="font-semibold text-zinc-950 dark:text-white">
                      {index + 1}. {step.title}
                    </div>
                    <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                      {step.desc}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="mt-12 rounded-3xl border border-black/10 bg-white p-10 shadow-sm dark:border-white/10 dark:bg-white/5">
            <div className="text-lg font-semibold tracking-tight">
              מה יש באזור האישי של כל לקוח
            </div>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-zinc-600 dark:text-zinc-300">
              האזור האישי הוא “הבית הדיגיטלי” של העסק: מסלול עבודה ברור,
              משימות, תכנים, פגישות, מדדים וכלי AI במקום אחד.
            </p>

            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {dashboardFeatures.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-3xl border border-black/10 bg-zinc-50 p-6 dark:border-white/10 dark:bg-white/5"
                >
                  <div className="text-base font-semibold">{feature.title}</div>
                  <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-10 dark:bg-emerald-500/10">
            <div className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
              מה מייחד אותנו
            </div>
            <div className="mt-3 text-2xl font-semibold tracking-tight">
              ONE PLATFORM FOR EVERYTHING
            </div>
            <ul className="mt-6 grid gap-3 text-sm leading-7 text-zinc-800 dark:text-zinc-100">
              {differentiators.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600 dark:bg-emerald-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/apply"
                className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
              >
                בדיקת התאמה
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-950 ring-1 ring-black/10 transition hover:bg-zinc-50 dark:bg-white/5 dark:text-white dark:ring-white/15 dark:hover:bg-white/10"
              >
                לראות מסלולים ומה כלול
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
