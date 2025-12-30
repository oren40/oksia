import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { Container } from "@/components/marketing/Container";

export const metadata: Metadata = {
  title: "כניסה",
};

type LoginPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function getBackendUrl(): string {
  return (
    process.env.BACKEND_URL ??
    process.env.NEXT_PUBLIC_BACKEND_URL ??
    "http://localhost:4000"
  );
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  async function loginAction(formData: FormData) {
    "use server";

    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const next = String(formData.get("next") ?? "/dashboard");

    if (!email || !password) {
      const url = new URL("/login", "http://localhost");
      url.searchParams.set("next", next);
      url.searchParams.set("error", "1");
      redirect(url.pathname + url.search);
    }

    const res = await fetch(`${getBackendUrl()}/auth/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      cache: "no-store",
    });

    if (!res.ok) {
      const url = new URL("/login", "http://localhost");
      url.searchParams.set("next", next);
      url.searchParams.set("error", "1");
      redirect(url.pathname + url.search);
    }

    const data = (await res.json()) as { token?: string };
    if (!data.token) {
      const url = new URL("/login", "http://localhost");
      url.searchParams.set("next", next);
      url.searchParams.set("error", "1");
      redirect(url.pathname + url.search);
    }

    const cookieStore = await cookies();
    cookieStore.set({
      name: "oksia_access_token",
      value: data.token,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    redirect(next.startsWith("/dashboard") ? next : "/dashboard");
  }

  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const next =
    typeof resolvedSearchParams?.next === "string"
      ? resolvedSearchParams.next
      : "/dashboard";
  const hasError = typeof resolvedSearchParams?.error === "string";

  return (
    <Container>
      <div className="mx-auto max-w-md">
        <div className="rounded-3xl bg-white/5 p-6 sm:p-8 ring-1 ring-white/10">
          <h1 className="text-2xl font-semibold tracking-tight">
            כניסה לאזור הלקוחות
          </h1>
          <p className="mt-2 text-sm leading-6 text-zinc-300">
            התחבר כדי לגשת לאזור האישי. (בשלב זה יש משתמש דמו שמגיע מהשרת)
          </p>

          {hasError ? (
            <div className="mt-4 rounded-2xl bg-rose-500/10 px-4 py-3 text-sm text-rose-200 ring-1 ring-rose-500/20">
              אימייל או סיסמה לא נכונים.
            </div>
          ) : null}

          <form action={loginAction} className="mt-6 grid gap-4">
            <input type="hidden" name="next" value={next} />

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-zinc-100">אימייל</span>
              <input
                name="email"
                type="email"
                placeholder="demo@oksia.ai"
                required
                className="h-12 rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none transition focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-zinc-100">סיסמה</span>
              <input
                name="password"
                type="password"
                placeholder="demo1234"
                required
                className="h-12 rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none transition focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10"
              />
            </label>

            <button
              type="submit"
              className="mt-2 inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200"
            >
              כניסה
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
          </form>
        </div>
      </div>
    </Container>
  );
}
