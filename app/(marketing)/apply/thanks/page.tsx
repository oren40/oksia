import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/marketing/Container";

export const metadata: Metadata = {
  title: "תודה: בדיקת התאמה",
};

export default function ApplyThanksPage() {
  return (
    <div className="bg-white py-20 dark:bg-zinc-950">
      <Container>
        <div className="mx-auto max-w-2xl rounded-3xl border border-black/10 bg-zinc-50 p-10 text-center shadow-sm dark:border-white/10 dark:bg-white/5">
          <div className="text-2xl font-semibold tracking-tight">
            קיבלנו. אנחנו חוזרים אליך בקרוב.
          </div>
          <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
            אם בא לך לקצר תהליכים, אפשר כבר עכשיו לקבוע שיחה או לראות דמו
            לדשבורד.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/dashboard-demo"
              className="inline-flex h-12 items-center justify-center rounded-full bg-zinc-950 px-6 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
            >
              לצפות בדמו
            </Link>
            <Link
              href="/"
              className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-zinc-950 ring-1 ring-black/10 transition hover:bg-zinc-50 dark:bg-white/5 dark:text-white dark:ring-white/15 dark:hover:bg-white/10"
            >
              חזרה לאתר
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
