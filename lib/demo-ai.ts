"use server";

export type DemoAiMode = "content" | "sales" | "analysis" | "quick";

export type DemoAiState = {
  answer: string | null;
};

function formatNumberedList(items: string[]): string {
  return items.map((item, index) => `${index + 1}. ${item}`).join("\n");
}

function buildDemoAnswer(mode: DemoAiMode, prompt: string): string {
  const cleanPrompt = prompt.trim();

  if (!cleanPrompt) {
    return "כתוב שאלה או תיאור קצר כדי לקבל תוצאה.";
  }

  if (mode === "content") {
    return [
      "(דמו) יצירת תוכן חכמה לעסק שלך",
      `בריף: ${cleanPrompt}`,
      "",
      "5 רעיונות לפוסטים:",
      formatNumberedList([
        "הסיפור לפני/אחרי: מה היה לפני שהכנסת סדר",
        "3 טעויות נפוצות בתחום שלך + מה לעשות במקום",
        "צעד אחד לשבוע שמייצר תוצאה מדידה",
        "מקרה לקוח קצר עם תובנה אחת",
        "הצעה: מה מקבלים בפועל ומה המשתמש מרוויח",
      ]),
      "",
      "3 Hooks לסטורי:",
      formatNumberedList([
        "אם אתה עובד קשה ועדיין מרגיש תקוע…",
        "בוא נדבר על הטעות שמורידה לך כסף בלי שתשים לב…",
        "3 דקות ואני מראה לך איך להכניס סדר השבוע…",
      ]),
      "",
      "תסריט וידאו קצר (מבנה):",
      "1. פתיחה עם בעיה",
      "2. דוגמה מהשטח",
      "3. פתרון (מערכת/תהליך)",
      "4. CTA: בדיקת התאמה",
    ].join("\n");
  }

  if (mode === "sales") {
    return [
      "(דמו) אימון מכירות",
      `סיטואציה: ${cleanPrompt}`,
      "",
      "פתיחה מומלצת לשיחה:",
      formatNumberedList([
        "שאלה קצרה: מה היעד המרכזי שלך ל־90 יום הקרובים?",
        "הגדרה: בוא נבין איפה העסק עומד ומה התקיעה האמיתית.",
        "מסגור: אני לא מציע עוד שיחה, אלא מערכת שמייצרת ביצוע.",
      ]),
      "",
      "מענה להתנגדויות נפוצות:",
      formatNumberedList([
        "'אין לי זמן' → בדיוק בגלל זה צריך מערכת שמחזיקה ביצוע.",
        "'ניסיתי כבר' → הפער הוא לא ידע, אלא תהליך ומדידה.",
        "'יקר לי' → בוא נחשב ROI לפי יעד ומדדים, לא לפי מחיר.",
      ]),
      "",
      "סגירה:",
      "אם נבנה לך תהליך שבועי עם משימות + מדידה + AI, מה הדבר הראשון שאתה רוצה שיזוז?",
    ].join("\n");
  }

  if (mode === "analysis") {
    return [
      "(דמו) ניתוח עסקי",
      `קלט: ${cleanPrompt}`,
      "",
      "מה הייתי בודק קודם (לפי סדר עדיפויות):",
      formatNumberedList([
        "הצעה: מה ההבטחה ומה ההוכחה?",
        "שיווק: מאיפה מגיעים לידים ומה העלות?",
        "מכירה: מה יחס סגירה ומה שלב התקיעה?",
        "תפעול: איפה נשפך זמן ומה אפשר לאוטומט?",
        "מדדים: 3 KPI שבועיים שאפשר למדוד בלי להסתבך.",
      ]),
      "",
      "המלצה לשבוע הקרוב:",
      "1) לסגור הצעה ותמחור · 2) להרים טופס לידים · 3) לקבוע 2 שיחות מכירה",
      "",
      "כדי להפוך את זה לניתוח אמיתי, נצטרך 5 מספרים: לידים/שבוע, יחס סגירה, מחיר ממוצע, הכנסות חודש, זמן עבודה שבועי.",
    ].join("\n");
  }

  return [
    "(דמו) שאלה מהירה",
    `שאלה: ${cleanPrompt}`,
    "",
    "תשובה קצרה:",
    "הצעד הבא הוא להפוך את זה למשימה אחת ברורה עם דדליין ומדד.",
    "",
    "הצעה:",
    "1) בחר פעולה אחת ל־48 שעות",
    "2) הגדר איך מודדים הצלחה",
    "3) חסם? כתוב אותו ונפרק אותו",
  ].join("\n");
}

export async function demoAiAction(
  prevState: DemoAiState,
  formData: FormData
): Promise<DemoAiState> {
  void prevState;

  const rawMode = String(formData.get("mode") ?? "quick");
  const mode: DemoAiMode =
    rawMode === "content" ||
    rawMode === "sales" ||
    rawMode === "analysis" ||
    rawMode === "quick"
      ? rawMode
      : "quick";

  const prompt = String(formData.get("prompt") ?? "");

  return {
    answer: buildDemoAnswer(mode, prompt),
  };
}
