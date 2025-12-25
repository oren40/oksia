import { Badge } from "@/components/dashboard/Badge";
import { DemoAiCard } from "@/components/dashboard/DemoAiCard";
import { PageHeader } from "@/components/dashboard/PageHeader";

export default function DashboardAiPage() {
  return (
    <div className="grid gap-6">
      <PageHeader
        title="AI Center"
        description="סט של כלים שמתחברים לתהליך: תוכן, מכירות, ניתוח עסקי ושאלות מהירות."
        actions={<Badge tone="info">Demo Mode</Badge>}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <DemoAiCard
          mode="content"
          title="AI Content Generator"
          description="מייצר רעיונות לפוסטים, סטוריז ותסריטי וידאו לפי ההקשר שלך."
          placeholder="לדוגמה: אני מאמן כושר, רוצה להביא 20 לידים בשבוע דרך אינסטגרם..."
        />
        <DemoAiCard
          mode="sales"
          title="AI Sales Coach"
          description="עוזר לנסח הצעה, לפתוח שיחה, להתמודד עם התנגדויות ולסגור."
          placeholder="לדוגמה: לקוח אומר 'יקר לי' אחרי ששמע מחיר..."
        />
        <DemoAiCard
          mode="analysis"
          title="Smart Business Analyst"
          description="מסדר תמונת מצב והמלצות ביצוע לפי נתונים, יעדים ותקיעות."
          placeholder="לדוגמה: יש לי 50 לידים בחודש, סוגר 6, ורוצה להכפיל הכנסות..."
        />
        <DemoAiCard
          mode="quick"
          title="שאלה מהירה"
          description="לקבל כיוון מיידי: איך להפוך בעיה למשימה אחת מדידה."
          placeholder="לדוגמה: איך אני מפסיק לדחות שיווק?"
        />
      </div>

      <div className="rounded-3xl border border-black/10 bg-white p-6 text-sm leading-7 text-zinc-700 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-zinc-200">
        (MVP) בשלב הבא נחבר את הכלים לנתוני העסק של המשתמש, נוסיף הרשאות,
        היסטוריית שיחות, והטמעה של מודל אמיתי (עם מפתח API מאובטח).
      </div>
    </div>
  );
}
