import type { Metadata } from "next";

import { Container } from "@/components/marketing/Container";

export const metadata: Metadata = {
  title: "תודה: בדיקת התאמה",
};

export default function ApplyThanksPage() {
  const calendlyUrl =
    process.env.NEXT_PUBLIC_CALENDLY_URL ??
    "mailto:info@oksia.ai?subject=%D7%A7%D7%91%D7%99%D7%A2%D7%AA%20%D7%A9%D7%99%D7%97%D7%94";

  return (
    <div className="flex flex-1 items-center bg-white py-12 dark:bg-zinc-950 sm:py-16">
      <Container>
        <div className="mx-auto max-w-2xl rounded-3xl border border-black/10 bg-zinc-50 p-8 text-center shadow-sm dark:border-white/10 dark:bg-white/5 sm:p-10">
          <div className="text-2xl font-semibold tracking-tight">
            קיבלנו. אנחנו חוזרים אליך בקרוב.
          </div>
          <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
            אם בא לך לקצר תהליכים, אפשר כבר עכשיו לקבוע שיחה או לראות דמו לדשבורד.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-full bg-emerald-600 px-6 text-sm font-semibold text-white transition hover:bg-emerald-500"
            >
              קביעת שיחה (Calendly)
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}
