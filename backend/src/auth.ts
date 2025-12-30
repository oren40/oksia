import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export type UserRole = "owner" | "coach" | "client";

export type AccessTokenPayload = {
  userId: string;
  tenantId: string;
  role: UserRole;
};

function getJwtSecret(): string {
  return process.env.JWT_SECRET ?? "dev-secret";
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, passwordHash: string): Promise<boolean> {
  return bcrypt.compare(password, passwordHash);
}

export function signAccessToken(payload: AccessTokenPayload): string {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: "30d" });
}

export function verifyAccessToken(token: string): AccessTokenPayload {
  const decoded = jwt.verify(token, getJwtSecret());

  if (typeof decoded !== "object" || decoded === null) {
    throw new Error("Invalid token payload");
  }

  const record = decoded as Record<string, unknown>;
  const userId = record.userId;
  const tenantId = record.tenantId;
  const role = record.role;

  if (typeof userId !== "string" || typeof tenantId !== "string" || typeof role !== "string") {
    throw new Error("Invalid token payload");
  }

  if (role !== "owner" && role !== "coach" && role !== "client") {
    throw new Error("Invalid token payload");
  }

  return { userId, tenantId, role };
}
