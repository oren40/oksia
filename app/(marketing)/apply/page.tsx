import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Container } from "@/components/marketing/Container";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "בדיקת התאמה",
};

async function applyAction(formData: FormData) {
  "use server";

  const payload = Object.fromEntries(formData.entries());
  const backendUrl =
    process.env.BACKEND_URL ??
    process.env.NEXT_PUBLIC_BACKEND_URL ??
    "http://localhost:4000";

  const res = await fetch(`${backendUrl}/leads/apply`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Apply lead submission failed");
  }

  redirect("/apply/thanks");
}

type InputProps = {
  label: string;
  name: string;
  type?: "text" | "email" | "tel";
  placeholder?: string;
  required?: boolean;
};

function TextInput({
  label,
  name,
  type = "text",
  placeholder,
  required = true,
}: InputProps) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        {label}
      </span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="h-12 rounded-2xl border border-black/10 bg-white px-4 text-sm text-zinc-950 shadow-sm outline-none ring-0 transition focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 dark:border-white/10 dark:bg-white/5 dark:text-white"
      />
    </label>
  );
}

export default function ApplyPage() {
  const calendlyUrl =
    process.env.NEXT_PUBLIC_CALENDLY_URL ??
    "mailto:hello@oksia.com?subject=%D7%91%D7%93%D7%99%D7%A7%D7%AA%20%D7%94%D7%AA%D7%90%D7%9E%D7%94";
  const whatsappUrl =
    process.env.NEXT_PUBLIC_WHATSAPP_URL ??
    "https://wa.me/972524157305";

  return (
    <div>
      <section className="relative overflow-hidden bg-zinc-950 py-16 text-white">
        <div
          className={cn(
            "pointer-events-none absolute inset-0 -z-10",
            "[background:radial-gradient(60%_60%_at_50%_0%,rgba(16,185,129,0.22),transparent_70%),radial-gradient(50%_50%_at_100%_20%,rgba(59,130,246,0.12),transparent_60%)]"
          )}
        />
        <Container>
          <SectionHeading
            eyebrow="בדיקת התאמה"
            title="בוא נבדוק אם זה המסלול הנכון עבורך"
            description="ממלאים פרטים קצרים, ואנחנו חוזרים עם שיחה שמגדירה כיוון, יעדים והשלבים הבאים."
            variant="inverse"
          />
        </Container>
      </section>

      <section className="bg-white py-16 dark:bg-zinc-950">
        <Container>
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="rounded-3xl border border-black/10 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-white/5">
                <div className="text-lg font-semibold tracking-tight">
                  השאר פרטים
                </div>
                <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                  נשמור על הפרטים שלך. בלי ספאם. בלי רעש.
                </p>

                <form action={applyAction} className="mt-8 grid gap-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <TextInput
                      label="שם מלא"
                      name="fullName"
                      placeholder="איך לקרוא לך?"
                    />
                    <TextInput
                      label="טלפון"
                      name="phone"
                      type="tel"
                      placeholder="050-0000000"
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <TextInput
                      label="אימייל"
                      name="email"
                      type="email"
                      placeholder="name@company.com"
                    />
                    <TextInput
                      label="שם העסק"
                      name="businessName"
                      placeholder="שם החברה / הקליניקה"
                    />
                  </div>

                  <label className="grid gap-2">
                    <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      מה היעד המרכזי שלך ל־90 יום הקרובים?
                    </span>
                    <textarea
                      name="goal"
                      rows={3}
                      required
                      className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-zinc-950 shadow-sm outline-none transition focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 dark:border-white/10 dark:bg-white/5 dark:text-white"
                      placeholder="לדוגמה: להעלות הכנסות, לסדר תהליכים, להרים שיווק יציב..."
                    />
                  </label>

                  <label className="grid gap-2">
                    <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      מה האתגר שמפיל אותך הכי הרבה היום?
                    </span>
                    <textarea
                      name="challenge"
                      rows={3}
                      required
                      className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-zinc-950 shadow-sm outline-none transition focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 dark:border-white/10 dark:bg-white/5 dark:text-white"
                      placeholder="לדוגמה: אין עקביות, אין סדר, שיווק לא יציב, פחד ממכירה..."
                    />
                  </label>

                  <label className="grid gap-2">
                    <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      באיזה מסלול אתה הכי נמשך כרגע?
                    </span>
                    <select
                      name="track"
                      className="h-12 rounded-2xl border border-black/10 bg-white px-4 text-sm text-zinc-950 shadow-sm outline-none transition focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 dark:border-white/10 dark:bg-white/5 dark:text-white"
                      defaultValue="90"
                    >
                      <option value="14">14 יום (Start)</option>
                      <option value="90">90 יום (Restart עסקי)</option>
                      <option value="365">שנה (Business & AI Upgrade)</option>
                      <option value="clinic">קליניקות ומרפאות</option>
                      <option value="startup">סטארטאפים ויזמים</option>
                      <option value="notSure">לא בטוח עדיין</option>
                    </select>
                  </label>

                  <button
                    type="submit"
                    className="mt-2 inline-flex h-12 items-center justify-center rounded-full bg-emerald-600 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-500"
                  >
                    שלח בדיקת התאמה
                  </button>

                  <div className="text-xs text-zinc-500 dark:text-zinc-400">
                    בלחיצה על שליחה אתה מאשר שניצור איתך קשר לגבי בדיקת התאמה.
                  </div>
                </form>
              </div>
            </div>

            <div className="grid gap-6">
              <div className="rounded-3xl border border-black/10 bg-zinc-50 p-8 dark:border-white/10 dark:bg-white/5">
                <div className="text-sm font-semibold">מה קורה אחרי?</div>
                <ol className="mt-4 grid gap-3 text-sm leading-7 text-zinc-700 dark:text-zinc-200">
                  <li>
                    <span className="font-semibold">1.</span> אנחנו עוברים על
                    הפרטים שלך.
                  </li>
                  <li>
                    <span className="font-semibold">2.</span> שיחת התאמה קצרה
                    (10–20 דק׳).
                  </li>
                  <li>
                    <span className="font-semibold">3.</span> בונים יעד, מסלול
                    ותוכנית עבודה ראשונית.
                  </li>
                </ol>
              </div>

              <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-8 dark:bg-emerald-500/10">
                <div className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                  רוצה לדבר עכשיו?
                </div>
                <div className="mt-3 grid gap-3">
                  <a
                    href={calendlyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-12 items-center justify-center rounded-full bg-zinc-950 px-5 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
                  >
                    קביעת שיחה (Calendly)
                  </a>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-12 items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-zinc-950 ring-1 ring-black/10 transition hover:bg-zinc-50 dark:bg-white/5 dark:text-white dark:ring-white/15 dark:hover:bg-white/10"
                  >
                    WhatsApp
                  </a>
                  <Link
                    href="/services"
                    className="inline-flex h-12 items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-zinc-950 ring-1 ring-black/10 transition hover:bg-zinc-50 dark:bg-white/5 dark:text-white dark:ring-white/15 dark:hover:bg-white/10"
                  >
                    לראות שירותים
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
