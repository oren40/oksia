import type { ReactNode } from "react";
import Link from "next/link";

import { Container } from "@/components/marketing/Container";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-zinc-950 text-zinc-50">
      <Container className="flex h-16 items-center">
        <Link
          href="/"
          className="inline-flex items-center gap-3 text-sm font-semibold tracking-tight"
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15">
            OX
          </span>
          <span className="text-base">oksia</span>
        </Link>
      </Container>

      <main className="flex min-h-0 flex-1 items-center justify-center overflow-y-auto p-4 sm:p-6">
        {children}
      </main>
    </div>
  );
}
