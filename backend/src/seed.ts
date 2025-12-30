import { randomUUID } from "node:crypto";
import type { Pool } from "pg";

import { hashPassword } from "./auth";
import { insertEvent, insertNotification } from "./events";

export type SeedInfo = {
  tenantId: string;
  userId: string;
  email: string;
  password: string;
};

export async function ensureSeed(pool: Pool): Promise<SeedInfo | null> {
  const { rows } = await pool.query<{ count: string }>("select count(*)::text as count from tenants");
  const count = Number(rows[0]?.count ?? "0");

  if (count > 0) {
    return null;
  }

  const tenantId = randomUUID();
  const userId = randomUUID();
  const email = "demo@oksia.ai";
  const password = "demo1234";
  const passwordHash = await hashPassword(password);

  await pool.query("insert into tenants (id, name) values ($1,$2)", [tenantId, "OKSIA Demo"]);
  await pool.query(
    "insert into users (id, email, full_name, password_hash) values ($1,$2,$3,$4)",
    [userId, email, "Demo", passwordHash]
  );
  await pool.query(
    "insert into tenant_users (tenant_id, user_id, role) values ($1,$2,$3)",
    [tenantId, userId, "owner"]
  );

  const today = new Date();
  const dueInDays = (days: number) => {
    const d = new Date(today);
    d.setDate(d.getDate() + days);
    return d.toISOString().slice(0, 10);
  };

  const tasks = [
    {
      title: "לסגור הצעה ותמחור (גרסה 1)",
      domain: "מכירות",
      dueDate: dueInDays(3),
      status: "todo",
    },
    {
      title: "להקים טופס לידים + אוטומציה ראשונית",
      domain: "שיווק",
      dueDate: dueInDays(5),
      status: "doing",
    },
    {
      title: "לכתוב מסר מרכזי לדף הבית (Hero), גרסה 1",
      domain: "שיווק",
      dueDate: dueInDays(1),
      status: "todo",
    },
    {
      title: "לבנות דוח KPI חודשי בסיסי",
      domain: "ניהול",
      dueDate: dueInDays(7),
      status: "todo",
    },
    {
      title: "תרגול החלטה: 3 פעולות שמייצרות שליטה",
      domain: "ניהול",
      dueDate: dueInDays(0),
      status: "done",
    },
  ];

  for (const task of tasks) {
    const taskId = randomUUID();

    await pool.query(
      "insert into tasks (id, tenant_id, title, domain, due_date, status, created_by_user_id, assigned_to_user_id, completed_at) values ($1,$2,$3,$4,$5,$6,$7,$8,$9)",
      [
        taskId,
        tenantId,
        task.title,
        task.domain,
        task.dueDate,
        task.status,
        userId,
        userId,
        task.status === "done" ? new Date().toISOString() : null,
      ]
    );

    await insertEvent(pool, {
      tenantId,
      actorUserId: userId,
      type: "task.created",
      entityType: "task",
      entityId: taskId,
      data: { title: task.title, domain: task.domain, status: task.status },
    });
  }

  await insertNotification(pool, {
    tenantId,
    userId,
    title: "נפתחה משימה חדשה",
    description: "להקים טופס לידים + אוטומציה ראשונית (שיווק)",
  });

  await insertNotification(pool, {
    tenantId,
    userId,
    title: "סיכום שבועי זמין",
    description: "3 משימות הושלמו, 2 עדיין פתוחות. ממשיכים בקצב.",
  });

  return { tenantId, userId, email, password };
}
