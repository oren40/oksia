import { randomUUID } from "node:crypto";

import cors from "cors";
import dotenv from "dotenv";
import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import nodemailer from "nodemailer";
import { z } from "zod";

import type { AccessTokenPayload, UserRole } from "./auth";
import { signAccessToken, verifyAccessToken, verifyPassword } from "./auth";
import { getPool, isInMemoryDb } from "./db";
import { insertEvent, insertNotification } from "./events";
import { ensureSchema } from "./schema";
import { ensureSeed } from "./seed";

dotenv.config();

declare global {
  namespace Express {
    interface Request {
      auth?: AccessTokenPayload;
    }
  }
}

const app = express();
const pool = getPool();

function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
}

function normalizeDate(value: unknown): string | null {
  if (!value) return null;
  if (typeof value === "string") return value.slice(0, 10);
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return null;
}

function escapeHtml(input: string): string {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getEnv(name: string): string | null {
  const value = process.env[name];
  if (!value) return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function getLeadNotifyTo(): string {
  return getEnv("LEAD_NOTIFY_TO") ?? "info@oksia.ai";
}

function getMailFrom(): string {
  return getEnv("MAIL_FROM") ?? getEnv("SMTP_USER") ?? "info@oksia.ai";
}

function getLeadSmtpTransport(): nodemailer.Transporter | null {
  const url = getEnv("SMTP_URL");
  if (url) {
    return nodemailer.createTransport(url);
  }

  const host = getEnv("SMTP_HOST");
  if (!host) return null;

  const port = Number(getEnv("SMTP_PORT") ?? "587");
  const secure = (getEnv("SMTP_SECURE") ?? "false").toLowerCase() === "true";
  const user = getEnv("SMTP_USER");
  const pass = getEnv("SMTP_PASS");

  return nodemailer.createTransport({
    host,
    port: Number.isFinite(port) ? port : 587,
    secure,
    auth: user && pass ? { user, pass } : undefined,
  });
}

async function sendLeadEmail(payload: Record<string, unknown>): Promise<boolean> {
  const transporter = getLeadSmtpTransport();
  if (!transporter) return false;

  const to = getLeadNotifyTo();
  const from = getMailFrom();

  const fullName = typeof payload.fullName === "string" ? payload.fullName : "";
  const email = typeof payload.email === "string" ? payload.email : "";
  const phone = typeof payload.phone === "string" ? payload.phone : "";

  const subjectParts = ["OKSIA Lead", fullName, email, phone].filter(Boolean);
  const subject = subjectParts.join(" - ");

  const entries = Object.entries(payload)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => {
      const stringValue =
        typeof value === "string" ? value : JSON.stringify(value, null, 2);
      return {
        key: escapeHtml(key),
        value: escapeHtml(stringValue ?? ""),
      };
    });

  const html = `
    <div style="font-family: Arial, sans-serif; direction: rtl;">
      <h2>הרשמה חדשה - בדיקת התאמה</h2>
      <table cellpadding="8" cellspacing="0" border="1" style="border-collapse: collapse; width: 100%;">
        <tbody>
          ${entries
            .map(
              (e) =>
                `<tr><td style="font-weight: 600; width: 180px;">${e.key}</td><td><pre style="margin:0; white-space:pre-wrap;">${e.value}</pre></td></tr>`
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `;

  await transporter.sendMail({
    to,
    from,
    subject,
    html,
    text: JSON.stringify(payload, null, 2),
  });

  return true;
}

function isUserRole(role: string): role is UserRole {
  return role === "owner" || role === "coach" || role === "client";
}

function getBearerToken(req: Request): string | null {
  const header = req.headers.authorization;
  if (!header) return null;

  const [scheme, token] = header.split(" ");
  if (scheme !== "Bearer" || !token) return null;
  return token;
}

const requireAuth = asyncHandler(async (req, res, next) => {
  const token = getBearerToken(req);
  if (!token) {
    res.status(401).json({ ok: false, error: "Missing token" });
    return;
  }

  const tokenPayload = verifyAccessToken(token);

  const membership = await pool.query<{ role: string }>(
    "select role from tenant_users where tenant_id = $1 and user_id = $2",
    [tokenPayload.tenantId, tokenPayload.userId]
  );

  const role = membership.rows[0]?.role;
  if (!role || !isUserRole(role)) {
    res.status(403).json({ ok: false, error: "Forbidden" });
    return;
  }

  req.auth = {
    userId: tokenPayload.userId,
    tenantId: tokenPayload.tenantId,
    role,
  };

  next();
});

function requireAnyRole(roles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const role = req.auth?.role;
    if (!role || !roles.includes(role)) {
      res.status(403).json({ ok: false, error: "Forbidden" });
      return;
    }
    next();
  };
}

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/health", asyncHandler(async (_req: Request, res: Response) => {
  res.status(200).json({ ok: true, db: isInMemoryDb() ? "memory" : "postgres" });
}));

app.post(
  "/leads/apply",
  asyncHandler(async (req: Request, res: Response) => {
    const payload = req.body;

    if (!payload || typeof payload !== "object") {
      res.status(400).json({ ok: false, error: "Invalid payload" });
      return;
    }

    const leadPayload = payload as Record<string, unknown>;

    await pool.query("insert into leads (id, payload) values ($1, $2)", [
      randomUUID(),
      leadPayload,
    ]);

    try {
      const sent = await sendLeadEmail(leadPayload);
      if (!sent) {
        console.warn(
          "Lead email not sent (SMTP not configured). Configure SMTP_URL or SMTP_HOST/SMTP_USER/SMTP_PASS."
        );
      } else {
        console.log(`Lead email sent to ${getLeadNotifyTo()}`);
      }
    } catch (err) {
      console.error("Lead email send failed", err);
    }

    res.status(201).json({ ok: true });
  })
);

app.post(
  "/auth/login",
  asyncHandler(async (req: Request, res: Response) => {
    const body = z
      .object({
        email: z.string().email(),
        password: z.string().min(1),
      })
      .parse(req.body);

    const userRes = await pool.query<{
      id: string;
      email: string;
      full_name: string | null;
      password_hash: string;
    }>("select id, email, full_name, password_hash from users where email = $1", [
      body.email,
    ]);

    const user = userRes.rows[0];
    if (!user) {
      res.status(401).json({ ok: false, error: "Invalid credentials" });
      return;
    }

    const passwordOk = await verifyPassword(body.password, user.password_hash);
    if (!passwordOk) {
      res.status(401).json({ ok: false, error: "Invalid credentials" });
      return;
    }

    const membershipRes = await pool.query<{ tenant_id: string; role: string }>(
      "select tenant_id, role from tenant_users where user_id = $1 order by created_at asc limit 1",
      [user.id]
    );

    const membership = membershipRes.rows[0];
    if (!membership || !isUserRole(membership.role)) {
      res.status(403).json({ ok: false, error: "No tenant" });
      return;
    }

    const token = signAccessToken({
      userId: user.id,
      tenantId: membership.tenant_id,
      role: membership.role,
    });

    res.status(200).json({
      ok: true,
      token,
      user: { id: user.id, email: user.email, fullName: user.full_name },
      tenantId: membership.tenant_id,
      role: membership.role,
    });
  })
);

app.get(
  "/me",
  requireAuth,
  asyncHandler(async (req: Request, res: Response) => {
    const auth = req.auth;
    if (!auth) {
      res.status(401).json({ ok: false, error: "Unauthorized" });
      return;
    }

    const userRes = await pool.query<{
      id: string;
      email: string;
      full_name: string | null;
      created_at: unknown;
    }>("select id, email, full_name, created_at from users where id = $1", [
      auth.userId,
    ]);

    const tenantRes = await pool.query<{ id: string; name: string }>(
      "select id, name from tenants where id = $1",
      [auth.tenantId]
    );

    res.status(200).json({
      ok: true,
      user: {
        id: userRes.rows[0]?.id,
        email: userRes.rows[0]?.email,
        fullName: userRes.rows[0]?.full_name,
        createdAt: userRes.rows[0]?.created_at,
      },
      tenant: tenantRes.rows[0] ?? null,
      role: auth.role,
    });
  })
);

app.get(
  "/tasks",
  requireAuth,
  asyncHandler(async (req: Request, res: Response) => {
    const auth = req.auth;
    if (!auth) {
      res.status(401).json({ ok: false, error: "Unauthorized" });
      return;
    }

    const status = req.query.status;
    const allowedStatuses = ["todo", "doing", "done"] as const;
    const statusFilter =
      typeof status === "string" && allowedStatuses.includes(status as any)
        ? (status as (typeof allowedStatuses)[number])
        : null;

    const params: unknown[] = [auth.tenantId];
    let sql =
      "select id, title, domain, due_date, status, created_at, updated_at, completed_at, assigned_to_user_id from tasks where tenant_id = $1";

    if (statusFilter) {
      params.push(statusFilter);
      sql += " and status = $2";
    }

    sql += " order by due_date nulls last, created_at desc";

    const tasksRes = await pool.query<{
      id: string;
      title: string;
      domain: string;
      due_date: unknown;
      status: string;
      created_at: unknown;
      updated_at: unknown;
      completed_at: unknown;
      assigned_to_user_id: string | null;
    }>(sql, params);

    res.status(200).json({
      ok: true,
      tasks: tasksRes.rows.map((t) => ({
        id: t.id,
        title: t.title,
        domain: t.domain,
        dueDate: normalizeDate(t.due_date),
        status: t.status,
        assignedToUserId: t.assigned_to_user_id,
        createdAt: t.created_at,
        updatedAt: t.updated_at,
        completedAt: t.completed_at,
      })),
    });
  })
);

app.post(
  "/tasks",
  requireAuth,
  requireAnyRole(["owner", "coach"]),
  asyncHandler(async (req: Request, res: Response) => {
    const auth = req.auth;
    if (!auth) {
      res.status(401).json({ ok: false, error: "Unauthorized" });
      return;
    }

    const body = z
      .object({
        title: z.string().min(1),
        domain: z.string().min(1),
        dueDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().nullable(),
        assignedToUserId: z.string().uuid().optional().nullable(),
      })
      .parse(req.body);

    const id = randomUUID();
    const assignedToUserId = body.assignedToUserId ?? auth.userId;

    await pool.query(
      "insert into tasks (id, tenant_id, title, domain, due_date, status, created_by_user_id, assigned_to_user_id) values ($1,$2,$3,$4,$5,$6,$7,$8)",
      [
        id,
        auth.tenantId,
        body.title,
        body.domain,
        body.dueDate ?? null,
        "todo",
        auth.userId,
        assignedToUserId,
      ]
    );

    await insertEvent(pool, {
      tenantId: auth.tenantId,
      actorUserId: auth.userId,
      type: "task.created",
      entityType: "task",
      entityId: id,
      data: { title: body.title, domain: body.domain },
    });

    await insertNotification(pool, {
      tenantId: auth.tenantId,
      userId: assignedToUserId,
      title: "נפתחה משימה חדשה",
      description: body.title,
    });

    res.status(201).json({
      ok: true,
      task: {
        id,
        title: body.title,
        domain: body.domain,
        dueDate: body.dueDate ?? null,
        status: "todo",
        assignedToUserId,
      },
    });
  })
);

app.patch(
  "/tasks/:id",
  requireAuth,
  asyncHandler(async (req: Request, res: Response) => {
    const auth = req.auth;
    if (!auth) {
      res.status(401).json({ ok: false, error: "Unauthorized" });
      return;
    }

    const taskId = req.params.id;
    const taskRes = await pool.query<{
      id: string;
      title: string;
      domain: string;
      due_date: unknown;
      status: string;
      assigned_to_user_id: string | null;
    }>(
      "select id, title, domain, due_date, status, assigned_to_user_id from tasks where id = $1 and tenant_id = $2",
      [taskId, auth.tenantId]
    );

    const existing = taskRes.rows[0];
    if (!existing) {
      res.status(404).json({ ok: false, error: "Task not found" });
      return;
    }

    if (auth.role === "client" && existing.assigned_to_user_id !== auth.userId) {
      res.status(403).json({ ok: false, error: "Forbidden" });
      return;
    }

    const body = z
      .object({
        title: z.string().min(1).optional(),
        domain: z.string().min(1).optional(),
        dueDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().nullable(),
        status: z.enum(["todo", "doing", "done"]).optional(),
        assignedToUserId: z.string().uuid().optional().nullable(),
      })
      .parse(req.body);

    if (auth.role === "client" && (body.title || body.domain || body.dueDate || body.assignedToUserId)) {
      res.status(403).json({ ok: false, error: "Forbidden" });
      return;
    }

    const nextTitle = body.title ?? existing.title;
    const nextDomain = body.domain ?? existing.domain;
    const nextDueDate = body.dueDate === undefined ? normalizeDate(existing.due_date) : body.dueDate;
    const nextStatus = body.status ?? existing.status;
    const nextAssignedToUserId = body.assignedToUserId === undefined
      ? existing.assigned_to_user_id
      : body.assignedToUserId;

    const completedAt = nextStatus === "done" ? new Date().toISOString() : null;

    await pool.query(
      "update tasks set title=$1, domain=$2, due_date=$3, status=$4, assigned_to_user_id=$5, updated_at=now(), completed_at=$6 where id=$7 and tenant_id=$8",
      [
        nextTitle,
        nextDomain,
        nextDueDate,
        nextStatus,
        nextAssignedToUserId,
        completedAt,
        taskId,
        auth.tenantId,
      ]
    );

    const eventType = nextStatus === "done" ? "task.completed" : "task.updated";

    await insertEvent(pool, {
      tenantId: auth.tenantId,
      actorUserId: auth.userId,
      type: eventType,
      entityType: "task",
      entityId: taskId,
      data: { status: nextStatus },
    });

    res.status(200).json({
      ok: true,
      task: {
        id: taskId,
        title: nextTitle,
        domain: nextDomain,
        dueDate: nextDueDate,
        status: nextStatus,
        assignedToUserId: nextAssignedToUserId,
        completedAt,
      },
    });
  })
);

app.get(
  "/notifications",
  requireAuth,
  asyncHandler(async (req: Request, res: Response) => {
    const auth = req.auth;
    if (!auth) {
      res.status(401).json({ ok: false, error: "Unauthorized" });
      return;
    }

    const notificationsRes = await pool.query<{
      id: string;
      title: string;
      description: string | null;
      read_at: unknown;
      created_at: unknown;
    }>(
      "select id, title, description, read_at, created_at from notifications where tenant_id = $1 and user_id = $2 order by created_at desc limit 50",
      [auth.tenantId, auth.userId]
    );

    res.status(200).json({
      ok: true,
      notifications: notificationsRes.rows.map((n) => ({
        id: n.id,
        title: n.title,
        description: n.description,
        readAt: n.read_at,
        createdAt: n.created_at,
      })),
    });
  })
);

app.post(
  "/notifications/:id/read",
  requireAuth,
  asyncHandler(async (req: Request, res: Response) => {
    const auth = req.auth;
    if (!auth) {
      res.status(401).json({ ok: false, error: "Unauthorized" });
      return;
    }

    const id = req.params.id;
    const result = await pool.query(
      "update notifications set read_at = now() where id = $1 and tenant_id = $2 and user_id = $3",
      [id, auth.tenantId, auth.userId]
    );

    if (result.rowCount === 0) {
      res.status(404).json({ ok: false, error: "Notification not found" });
      return;
    }

    res.status(200).json({ ok: true });
  })
);

app.get(
  "/events",
  requireAuth,
  requireAnyRole(["owner", "coach"]),
  asyncHandler(async (req: Request, res: Response) => {
    const auth = req.auth;
    if (!auth) {
      res.status(401).json({ ok: false, error: "Unauthorized" });
      return;
    }

    const eventsRes = await pool.query<{
      id: string;
      type: string;
      entity_type: string | null;
      entity_id: string | null;
      data: unknown;
      created_at: unknown;
      actor_user_id: string | null;
    }>(
      "select id, type, entity_type, entity_id, data, created_at, actor_user_id from events where tenant_id = $1 order by created_at desc limit 100",
      [auth.tenantId]
    );

    res.status(200).json({ ok: true, events: eventsRes.rows });
  })
);

app.use((req: Request, res: Response) => {
  res.status(404).json({ ok: false, error: `Not found: ${req.method} ${req.path}` });
});

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof z.ZodError) {
    res.status(400).json({ ok: false, error: err.flatten() });
    return;
  }

  console.error(err);
  res.status(500).json({ ok: false, error: "Internal server error" });
});

async function start() {
  await ensureSchema(pool);
  const seedInfo = await ensureSeed(pool);
  if (seedInfo) {
    console.log(
      `Seeded demo user: ${seedInfo.email} / ${seedInfo.password} (tenant ${seedInfo.tenantId})`
    );
  }

  const port = Number(process.env.PORT ?? 4000);
  app.listen(port, () => {
    console.log(`oksia-backend listening on http://localhost:${port}`);
  });
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
