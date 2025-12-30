import { Pool } from "pg";
import { DataType, newDb } from "pg-mem";

let pool: Pool | null = null;
let inMemory = false;

export function getPool(): Pool {
  if (pool) {
    return pool;
  }

  const databaseUrl = process.env.DATABASE_URL;

  if (databaseUrl) {
    inMemory = false;
    pool = new Pool({ connectionString: databaseUrl });
    return pool;
  }

  const mem = newDb({ autoCreateForeignKeyIndices: true });
  mem.public.registerFunction({
    name: "now",
    returns: DataType.timestamptz,
    implementation: () => new Date(),
  });

  const adapter = mem.adapters.createPg();
  inMemory = true;
  pool = new adapter.Pool() as unknown as Pool;

  return pool;
}

export function isInMemoryDb(): boolean {
  return inMemory;
}
