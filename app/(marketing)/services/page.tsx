import type { Metadata } from "next";

import { Container } from "@/components/marketing/Container";
import { SectionHeading } from "@/components/marketing/SectionHeading";

type ServiceBlockProps = {
  title: string;
  subtitle: string;
  items: string[];
};

function ServiceBlock({ title, subtitle, items }: ServiceBlockProps) {
  return (
    <div className="rounded-3xl border border-black/10 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-white/5">
      <div className="text-xl font-semibold tracking-tight">{title}</div>
      <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
        {subtitle}
      </p>
      <ul className="mt-6 grid gap-2 text-sm text-zinc-700 dark:text-zinc-200">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-[0.2rem] inline-flex h-4 w-4 items-center justify-center rounded-full bg-zinc-900/10 text-zinc-900 ring-1 ring-black/10 dark:bg-white/10 dark:text-white dark:ring-white/15">
              •
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const metadata: Metadata = {
  title: "שירותים",
};

export default function ServicesPage() {
  return (
    <div>
      <section className="bg-zinc-950 py-16 text-white">
        <Container>
          <SectionHeading
            eyebrow="שירותים"
            title="המערכת שלך לתודעה, עסק וטכנולוגיה"
            description="אנחנו לא מוכרים עוד פגישה או עוד קורס. אנחנו בונים תהליך בתוך מערכת, ומוודאים שזה קורה בשטח."
            variant="inverse"
          />
        </Container>
      </section>

      <section className="bg-zinc-50 py-16 dark:bg-black">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            <ServiceBlock
              title="ליווי עסקי"
              subtitle="אסטרטגיה וביצוע: תמחור, מכירות, שיווק ותהליכים."
              items={[
                "בניית הצעה חדה ומבודלת",
                "תמחור שמכבד את הערך",
                "משפכי שיווק ולידים",
                "תהליך מכירה ומדידה",
                "תהליכי ניהול ותקשורת",
              ]}
            />
            <ServiceBlock
              title="פיתוח מנטלי"
              subtitle="בונים מנהיגות פנימית כדי שהעסק יוכל להחזיק סקייל."
              items={[
                "עבודה על פחדים ודפוסי חשיבה",
                "קבלת החלטות תחת לחץ",
                "התמדה וניהול אנרגיה",
                "מיינדסט של ביצוע",
                "הובלה ואחריות",
              ]}
            />
            <ServiceBlock
              title="פיתוח טכנולוגי / AI"
              subtitle="כלים חכמים שמכניסים סדר, חוסכים זמן ומייצרים יתרון."
              items={[
                "אוטומציות בסיסיות לניהול לידים",
                "סוכני AI מותאמים לעסק",
                "מחוללי תוכן ושיווק",
                "דשבורד KPI’s",
                "הכנה לאינטגרציות (CRM, דיוור, WhatsApp)",
              ]}
            />
          </div>

          <div className="mt-12 rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-10 dark:bg-emerald-500/10">
            <div className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
              מה שמייחד אותנו
            </div>
            <div className="mt-3 grid gap-3 text-sm leading-7 text-zinc-800 dark:text-zinc-100">
              <div>
                שילוב של <span className="font-semibold">שלושה עולמות</span>, לא
                רק אחד.
              </div>
              <div>
                <span className="font-semibold">מערכת אחת</span> במקום עשר
                מערכות מפוזרות.
              </div>
              <div>
                <span className="font-semibold">מיקוד בביצוע</span>: הכול
                חייב להופיע במשימות, בלו״ז ובמדדים.
              </div>
              <div>
                <span className="font-semibold">AI כחלק קבוע</span> מהמערכת
                העסקית, לא תוספת.
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
