import Link from "next/link";

import { Container } from "@/components/marketing/Container";

export function MarketingFooter() {
  return (
    <footer className="border-t border-black/10 bg-white py-16 text-zinc-950 dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-50">
      <Container>
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="text-lg font-semibold tracking-tight">oksia</div>
            <p className="mt-3 max-w-md text-sm leading-6 text-zinc-600 dark:text-zinc-300">
              פלטפורמת ליווי שמחברת בין תודעה, עסק וטכנולוגיה, ומתרגמת את זה
              לתהליך ביצועי ברור: משימות, פגישות, תכנים, מדידה וכלי AI.
            </p>
          </div>

          <div>
            <div className="text-sm font-semibold">תפריט</div>
            <div className="mt-3 grid gap-2 text-sm text-zinc-600 dark:text-zinc-300">
              <Link
                href="/services"
                className="hover:text-zinc-950 dark:hover:text-white"
              >
                שירותים
              </Link>
              <Link
                href="/how-it-works"
                className="hover:text-zinc-950 dark:hover:text-white"
              >
                איך זה עובד
              </Link>
              <Link
                href="/dashboard-demo"
                className="hover:text-zinc-950 dark:hover:text-white"
              >
                דמו לדשבורד
              </Link>
              <Link
                href="/apply"
                className="hover:text-zinc-950 dark:hover:text-white"
              >
                בדיקת התאמה
              </Link>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold">יצירת קשר</div>
            <div className="mt-3 grid gap-2 text-sm text-zinc-600 dark:text-zinc-300">
              <a
                href="https://wa.me/972524157305"
                target="_blank"
                rel="noreferrer"
                className="hover:text-zinc-950 dark:hover:text-white"
              >
                WhatsApp
              </a>
              <a
                href="mailto:info@oksia.ai"
                className="hover:text-zinc-950 dark:hover:text-white"
              >
                info@oksia.ai
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-black/10 pt-8 text-xs text-zinc-500 dark:border-white/10 dark:text-zinc-400 md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} oksia. כל הזכויות שמורות.</div>
          <div className="flex gap-4">
            <Link
              href="/about"
              className="hover:text-zinc-700 dark:hover:text-zinc-200"
            >
              מי אנחנו
            </Link>
            <Link
              href="/login"
              className="hover:text-zinc-700 dark:hover:text-zinc-200"
            >
              כניסה
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
