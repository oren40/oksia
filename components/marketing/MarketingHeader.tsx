import Link from "next/link";

import { Container } from "@/components/marketing/Container";
import { cn } from "@/lib/cn";

const navLinks = [
  { href: "/services", label: "שירותים" },
  { href: "/how-it-works", label: "איך זה עובד" },
  { href: "/dashboard-demo", label: "דמו לדשבורד" },
  { href: "/about", label: "מי אנחנו" },
];

export function MarketingHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/70 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className={cn(
              "inline-flex items-center gap-3 text-sm font-semibold tracking-tight text-zinc-50",
              "hover:text-white"
            )}
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15">
              OX
            </span>
            <span className="text-base">oksia</span>
          </Link>
        </div>

        <nav className="hidden items-center gap-8 text-sm text-zinc-200 md:flex">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="hidden rounded-full px-4 py-2 text-sm font-semibold text-zinc-200 ring-1 ring-white/15 transition hover:bg-white/5 md:inline-flex"
          >
            כניסה
          </Link>
          <Link
            href="/apply"
            className="inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-zinc-950 shadow-sm transition hover:bg-zinc-200"
          >
            בדיקת התאמה
          </Link>

          <details className="relative md:hidden">
            <summary
              aria-label="תפריט"
              className="list-none cursor-pointer rounded-full p-2 text-zinc-50 ring-1 ring-white/15 transition hover:bg-white/5"
            >
              <span className="block text-base leading-none">≡</span>
            </summary>
            <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-white/10 bg-zinc-950 p-2 shadow-xl">
              <div className="grid gap-1">
                {navLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-xl px-3 py-2 text-sm text-zinc-200 hover:bg-white/5 hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/login"
                  className="rounded-xl px-3 py-2 text-sm text-zinc-200 hover:bg-white/5 hover:text-white"
                >
                  כניסה
                </Link>
              </div>
            </div>
          </details>
        </div>
      </Container>
    </header>
  );
}
