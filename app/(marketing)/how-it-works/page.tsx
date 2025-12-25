import type { Metadata } from "next";

import { Container } from "@/components/marketing/Container";
import { SectionHeading } from "@/components/marketing/SectionHeading";

export const metadata: Metadata = {
  title: "איך זה עובד",
};

export default function HowItWorksPage() {
  return (
    <div>
      <section className="bg-zinc-950 py-16 text-white">
        <Container>
          <SectionHeading
            eyebrow="איך זה עובד"
            title="תהליך ברור. מערכת אחת. התקדמות מדידה."
            description="האתר הוא מרכז הפיקוד של תהליך הליווי: אבחון, בניית תוכנית, יישום שבועי, מדידה ושדרוג."
            variant="inverse"
          />
        </Container>
      </section>

      <section className="bg-white py-16 dark:bg-zinc-950">
        <Container>
          <div className="grid gap-6 lg:grid-cols-5">
            {[
              {
                title: "הצטרפות ואבחון",
                desc: "נרשמים, מקבלים גישה, ממלאים אבחון (מנטלי + עסקי + טכנולוגי) ומעלים נתונים.",
              },
              {
                title: "פגישת פתיחה ותכנון",
                desc: "מגדירים יעדים כספיים, שיווקיים ותפעוליים ובונים מסלול דיגיטלי לתקופה.",
              },
              {
                title: "עבודה שבועית",
                desc: "נכנסים לאזור האישי, רואים משימות, צופים בתכנים ועובדים עם כלי ה-AI. יש שיחת ליווי לפי מסלול.",
              },
              {
                title: "מדידה ושיפור",
                desc: "עצירת מדידה חודשית: מה השתפר, מה עובד, ומה הפעולות הבאות. הדוח נשמר באזור האישי.",
              },
              {
                title: "סיום ושדרוג",
                desc: "בסוף מחזור: סיכום תהליך, תיעוד ההתקדמות והמלצות. אפשר לשדרג מסלול/להוסיף שירותים.",
              },
            ].map((step, index) => (
              <div
                key={step.title}
                className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5"
              >
                <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                  שלב {index + 1}
                </div>
                <div className="mt-3 text-base font-semibold">{step.title}</div>
                <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-3xl border border-black/10 bg-zinc-50 p-10 dark:border-white/10 dark:bg-white/5">
            <SectionHeading
              eyebrow="מה נמצא באזור האישי"
              title="הבית הדיגיטלי של העסק"
              description="דשבורד, משימות, פגישות, קורסים, קבצים, התקדמות וכלי AI במקום אחד מסודר, ברור ואישי."
            />

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                "Dashboard עם תמונת מצב",
                "משימות ותוכנית עבודה",
                "פגישות וסיכומי פגישות",
                "קורסים וסדנאות",
                "קבצים ומסמכים",
                "AI Center וכלים",
                "התראות ותקשורת",
                "פרופיל משתמש ותשלום",
                "דוחות ומדדים",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-zinc-700 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-zinc-200"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
