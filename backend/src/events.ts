import { randomUUID } from "node:crypto";
import type { Pool } from "pg";

export type EventInsert = {
  tenantId: string;
  actorUserId?: string | null;
  type: string;
  entityType?: string | null;
  entityId?: string | null;
  data?: unknown;
};

export async function insertEvent(pool: Pool, event: EventInsert): Promise<string> {
  const id = randomUUID();

  await pool.query(
    "insert into events (id, tenant_id, actor_user_id, type, entity_type, entity_id, data) values ($1,$2,$3,$4,$5,$6,$7)",
    [
      id,
      event.tenantId,
      event.actorUserId ?? null,
      event.type,
      event.entityType ?? null,
      event.entityId ?? null,
      event.data ?? null,
    ]
  );

  return id;
}

export type NotificationInsert = {
  tenantId: string;
  userId: string;
  title: string;
  description?: string | null;
};

export async function insertNotification(
  pool: Pool,
  notification: NotificationInsert
): Promise<string> {
  const id = randomUUID();

  await pool.query(
    "insert into notifications (id, tenant_id, user_id, title, description) values ($1,$2,$3,$4,$5)",
    [
      id,
      notification.tenantId,
      notification.userId,
      notification.title,
      notification.description ?? null,
    ]
  );

  return id;
}
