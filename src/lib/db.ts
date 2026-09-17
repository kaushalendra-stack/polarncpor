import { Pool } from "pg";

/**
 * PostgreSQL access layer with graceful fallback.
 *
 * - If `DATABASE_URL` is not set, every query returns null and callers
 *   fall back to the bundled mock data in `@/lib/data`.
 * - If the database is unreachable (e.g. during a demo without Postgres),
 *   availability is re-checked at most every 30s, and the site keeps working
 *   with mock data until the database comes back.
 */

const databaseUrl = process.env.DATABASE_URL || "";

let pool: Pool | null = null;
let available: boolean | null = null;
let lastCheckedAt = 0;
const CHECK_TTL_MS = 30_000;

function createPool(): Pool {
  return new Pool({
    connectionString: databaseUrl,
    max: 10,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 8_000,
    ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : undefined,
  });
}

export function isDbConfigured(): boolean {
  return databaseUrl.length > 0;
}

export async function isDbAvailable(): Promise<boolean> {
  if (!isDbConfigured()) return false;
  const now = Date.now();
  if (available !== null && now - lastCheckedAt < CHECK_TTL_MS) {
    return available;
  }
  try {
    if (!pool) pool = createPool();
    await pool.query("SELECT 1");
    available = true;
  } catch {
    pool?.end().catch(() => undefined);
    pool = null;
    available = false;
  }
  lastCheckedAt = now;
  return available;
}

export interface QueryResult<T> {
  rows: T[];
}

/**
 * Runs a query against Postgres. Returns null when the database is not
 * configured or unreachable, so callers can fall back to mock data.
 */
export async function runQuery<T>(
  text: string,
  params: unknown[] = [],
): Promise<QueryResult<T> | null> {
  if (!(await isDbAvailable())) return null;
  try {
    if (!pool) pool = createPool();
    const res = await pool.query(text, params);
    return { rows: res.rows as T[] };
  } catch {
    available = false;
    lastCheckedAt = Date.now();
    pool?.end().catch(() => undefined);
    pool = null;
    return null;
  }
}

/** Force a fresh connectivity probe on the next query. */
export function resetDbCheck(): void {
  available = null;
  lastCheckedAt = 0;
}

export async function closeDb(): Promise<void> {
  if (pool) {
    await pool.end().catch(() => undefined);
    pool = null;
  }
}