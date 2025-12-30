export type DashboardNavItem = {
  href: string;
  label: string;
  enabled?: boolean;
  metaLabel?: string;
};

export const dashboardNavItems: DashboardNavItem[] = [
  { href: "/dashboard", label: "סקירה", enabled: true },
  { href: "/dashboard/tasks", label: "משימות", enabled: true, metaLabel: "MVP" },
  { href: "/dashboard/sessions", label: "פגישות", enabled: false, metaLabel: "בקרוב" },
  { href: "/dashboard/courses", label: "קורסים", enabled: false, metaLabel: "בקרוב" },
  { href: "/dashboard/ai", label: "AI Center", enabled: false, metaLabel: "בקרוב" },
  { href: "/dashboard/files", label: "קבצים", enabled: false, metaLabel: "בקרוב" },
  { href: "/dashboard/progress", label: "התקדמות", enabled: false, metaLabel: "בקרוב" },
  { href: "/dashboard/notifications", label: "התראות", enabled: false, metaLabel: "בקרוב" },
  { href: "/dashboard/profile", label: "פרופיל", enabled: false, metaLabel: "בקרוב" },
];

const titleByHref: Record<string, string> = Object.fromEntries(
  dashboardNavItems.map((item) => [item.href, item.label])
);

export function getDashboardTitle(pathname: string): string {
  if (titleByHref[pathname]) {
    return titleByHref[pathname];
  }

  const match = dashboardNavItems
    .filter((item) => item.href !== "/dashboard")
    .find((item) => pathname.startsWith(item.href));

  return match?.label ?? "Dashboard";
}
