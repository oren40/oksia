export type DemoTaskStatus = "todo" | "doing" | "done";

export type DemoTaskArea = "מנטלי" | "עסקי" | "טכנולוגי";

export type DemoTask = {
  id: string;
  title: string;
  area: DemoTaskArea;
  due: string;
  status: DemoTaskStatus;
};

export type DemoSession = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: "Zoom" | "פרונטלי";
  notesSummary: string;
  recordingUrl?: string;
};

export type DemoCourse = {
  id: string;
  title: string;
  category:
    | "כסף"
    | "מכירות"
    | "שיווק"
    | "ניהול"
    | "AI לעסקים"
    | "בניית תהליכים"
    | "פסיכולוגיית יזמים";
  lessons: number;
  progressPercent: number;
};

export type DemoFile = {
  id: string;
  title: string;
  kind: "דוח" | "מסמך" | "טבלה" | "מצגת";
  updatedAt: string;
};

export type DemoNotification = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
};

export const demoTasks: DemoTask[] = [
  {
    id: "t_1",
    title: "לסגור הצעה ותמחור (גרסה 1)",
    area: "עסקי",
    due: "יום חמישי",
    status: "todo",
  },
  {
    id: "t_2",
    title: "להקים טופס לידים + אוטומציה ראשונית",
    area: "טכנולוגי",
    due: "יום ראשון",
    status: "doing",
  },
  {
    id: "t_3",
    title: "תרגול החלטה: 3 פעולות שמייצרות שליטה",
    area: "מנטלי",
    due: "היום",
    status: "done",
  },
  {
    id: "t_4",
    title: "לכתוב מסר מרכזי לדף הבית (Hero), גרסה 1",
    area: "עסקי",
    due: "מחר",
    status: "todo",
  },
  {
    id: "t_5",
    title: "לבנות דוח KPI חודשי בסיסי",
    area: "טכנולוגי",
    due: "עוד שבוע",
    status: "todo",
  },
];

export const demoSessions: DemoSession[] = [
  {
    id: "s_1",
    title: "שיחת פתיחה ותכנון",
    date: "2025-12-29",
    time: "11:30",
    location: "Zoom",
    notesSummary:
      "הגדרנו יעד 90 יום, עידדנו החלטה על הצעה, וסגרנו 3 משימות ראשונות.",
    recordingUrl: undefined,
  },
  {
    id: "s_2",
    title: "שיחת ליווי שבועית",
    date: "2026-01-05",
    time: "11:30",
    location: "Zoom",
    notesSummary:
      "עברנו על תמחור, בנינו תסריט מכירה קצר, והתחלנו להרים אוטומציה ללידים.",
    recordingUrl: undefined,
  },
];

export const demoCourses: DemoCourse[] = [
  {
    id: "c_1",
    title: "תמחור שמכבד את הערך",
    category: "כסף",
    lessons: 7,
    progressPercent: 28,
  },
  {
    id: "c_2",
    title: "משפך לידים חכם (בסיס)",
    category: "שיווק",
    lessons: 9,
    progressPercent: 0,
  },
  {
    id: "c_3",
    title: "AI Content Generator לעסקים",
    category: "AI לעסקים",
    lessons: 6,
    progressPercent: 55,
  },
];

export const demoFiles: DemoFile[] = [
  {
    id: "f_1",
    title: "מסמך אסטרטגיה (גרסה 1)",
    kind: "מסמך",
    updatedAt: "2025-12-22",
  },
  {
    id: "f_2",
    title: "דוח KPI (חודש נובמבר)",
    kind: "דוח",
    updatedAt: "2025-12-01",
  },
  {
    id: "f_3",
    title: "טבלת תמחור (השוואה)",
    kind: "טבלה",
    updatedAt: "2025-12-12",
  },
];

export const demoNotifications: DemoNotification[] = [
  {
    id: "n_1",
    title: "נפתחה משימה חדשה",
    description: "טופס לידים + אוטומציה ראשונית (טכנולוגי)",
    createdAt: "היום",
  },
  {
    id: "n_2",
    title: "פגישה קרובה",
    description: "שיחת ליווי שבועית (יום שני 11:30)",
    createdAt: "אתמול",
  },
  {
    id: "n_3",
    title: "שיעור מומלץ",
    description: "תמחור שמכבד את הערך (שיעור 2)",
    createdAt: "לפני 2 ימים",
  },
];
