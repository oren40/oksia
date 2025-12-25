import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/marketing/Container";

export const metadata: Metadata = {
  title: "כניסה",
};

export default function LoginPage() {
  return (
    <Container>
      <div className="mx-auto max-w-md">
        <div className="rounded-3xl bg-white/5 p-6 sm:p-8 ring-1 ring-white/10">
          <h1 className="text-2xl font-semibold tracking-tight">
            כניסה לאזור הלקוחות
          </h1>
          <p className="mt-2 text-sm leading-6 text-zinc-300">
            האזור האישי (Dashboard) ייפתח עם התחברות מאובטחת בשלב הבא של
            הפיתוח. בינתיים אפשר לראות דמו או להתחיל בדיקת התאמה.
          </p>

          <div className="mt-6 grid gap-4">
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-zinc-100">אימייל</span>
              <input
                type="email"
                placeholder="name@company.com"
                className="h-12 rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none transition focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-zinc-100">סיסמה</span>
              <input
                type="password"
                placeholder="••••••••"
                className="h-12 rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none transition focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10"
              />
            </label>

            <button
              type="button"
              disabled
              className="mt-2 inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-zinc-950 opacity-70"
            >
              כניסה (בקרוב)
            </button>

            <div className="mt-2 grid gap-2 text-sm text-zinc-300">
              <Link
                href="/dashboard-demo"
                className="rounded-2xl bg-white/5 px-4 py-3 text-center ring-1 ring-white/10 transition hover:bg-white/10"
              >
                לצפות בדמו לדשבורד
              </Link>
              <Link
                href="/apply"
                className="rounded-2xl bg-white/5 px-4 py-3 text-center ring-1 ring-white/10 transition hover:bg-white/10"
              >
                להתחיל בדיקת התאמה
              </Link>
            </div>

            <div className="text-xs text-zinc-400">
              אם תרצה שהכניסה תהיה עם Google / Magic Link, נאמר לנו ונוסיף.
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
