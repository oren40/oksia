import type { Pool } from "pg";

export async function ensureSchema(pool: Pool): Promise<void> {
  await pool.query(`
    create table if not exists tenants (
      id text primary key,
      name text not null,
      created_at timestamptz not null default now()
    );
  `);

  await pool.query(`
    create table if not exists users (
      id text primary key,
      email text not null unique,
      full_name text,
      password_hash text not null,
      created_at timestamptz not null default now()
    );
  `);

  await pool.query(`
    create table if not exists tenant_users (
      tenant_id text not null references tenants(id) on delete cascade,
      user_id text not null references users(id) on delete cascade,
      role text not null,
      created_at timestamptz not null default now(),
      primary key (tenant_id, user_id)
    );
  `);

  await pool.query(`
    create table if not exists tasks (
      id text primary key,
      tenant_id text not null references tenants(id) on delete cascade,
      title text not null,
      domain text not null,
      due_date date,
      status text not null,
      created_by_user_id text references users(id),
      assigned_to_user_id text references users(id),
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now(),
      completed_at timestamptz
    );
  `);

  await pool.query(`
    create table if not exists events (
      id text primary key,
      tenant_id text not null references tenants(id) on delete cascade,
      actor_user_id text references users(id),
      type text not null,
      entity_type text,
      entity_id text,
      data json,
      created_at timestamptz not null default now()
    );
  `);

  await pool.query(`
    create table if not exists notifications (
      id text primary key,
      tenant_id text not null references tenants(id) on delete cascade,
      user_id text not null references users(id) on delete cascade,
      title text not null,
      description text,
      read_at timestamptz,
      created_at timestamptz not null default now()
    );
  `);

  await pool.query(`
    create table if not exists leads (
      id text primary key,
      created_at timestamptz not null default now(),
      payload json not null
    );
  `);

  await pool.query(`
    create table if not exists integrations (
      id text primary key,
      tenant_id text not null references tenants(id) on delete cascade,
      provider text not null,
      config json not null,
      enabled boolean not null default true,
      created_at timestamptz not null default now(),
      unique (tenant_id, provider)
    );
  `);
}
