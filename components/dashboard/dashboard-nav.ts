export type DashboardNavItem = {
  href: string;
  label: string;
};

export const dashboardNavItems: DashboardNavItem[] = [
  { href: "/dashboard", label: "סקירה" },
  { href: "/dashboard/tasks", label: "משימות" },
  { href: "/dashboard/sessions", label: "פגישות" },
  { href: "/dashboard/courses", label: "קורסים" },
  { href: "/dashboard/ai", label: "AI Center" },
  { href: "/dashboard/files", label: "קבצים" },
  { href: "/dashboard/progress", label: "התקדמות" },
  { href: "/dashboard/notifications", label: "התראות" },
  { href: "/dashboard/profile", label: "פרופיל" },
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
