import type {
  Expedition,
  Dataset,
  Publication,
  Activity,
  MediaItem,
} from "./types";
import { runQuery } from "./db";
import {
  expeditions as mockExpeditions,
  datasets as mockDatasets,
  publications as mockPublications,
  activities as mockActivities,
  mediaItems as mockMedia,
  stats as mockStats,
} from "./data";

/**
 * Repository layer. Preferred source is PostgreSQL; when the database is not
 * configured/unreachable (see `lib/db.ts`), every call transparently falls
 * back to the bundled mock data so the portal keeps serving content.
 */

const ROW_TO_EXPEDITION = `SELECT "slug", "name", "designation", "region", "station",
  "year", "startDate", "endDate", "leader", "status", "crewCount", "ship",
  "summary", "objectives", "highlights", "theme", "recent"
  FROM expeditions`;

export async function getExpeditionsAll(): Promise<{ data: Expedition[]; source: "db" | "mock" }> {
  const q = await runQuery<Expedition>(`${ROW_TO_EXPEDITION} ORDER BY "year" DESC`);
  if (q && q.rows.length) return { data: q.rows, source: "db" };
  return { data: mockExpeditions, source: "mock" };
}

export async function getExpeditionBySlug(
  slug: string,
): Promise<{ data: Expedition | null; source: "db" | "mock" }> {
  const q = await runQuery<Expedition>(`${ROW_TO_EXPEDITION} WHERE "slug" = $1 LIMIT 1`, [slug]);
  if (q && q.rows.length) return { data: q.rows[0], source: "db" };
  return { data: mockExpeditions.find((e) => e.slug === slug) ?? null, source: "mock" };
}

export async function getDatasetsAll(): Promise<{ data: Dataset[]; source: "db" | "mock" }> {
  const q = await runQuery<Dataset>(
    `SELECT "id", "title", "category", "description", "station", "year", "format", "size", "records"
     FROM datasets ORDER BY "year" DESC`,
  );
  if (q && q.rows.length) return { data: q.rows, source: "db" };
  return { data: mockDatasets, source: "mock" };
}

export async function getPublicationsAll(): Promise<{ data: Publication[]; source: "db" | "mock" }> {
  const q = await runQuery<Publication>(
    `SELECT "id", "title", "authors", "journal", "year", "doi", "type"
     FROM publications ORDER BY "year" DESC`,
  );
  if (q && q.rows.length) return { data: q.rows, source: "db" };
  return { data: mockPublications, source: "mock" };
}

export async function getActivitiesAll(): Promise<{ data: Activity[]; source: "db" | "mock" }> {
  const q = await runQuery<Activity>(
    `SELECT "id", "title", "date", "category", "summary", "content"
     FROM activities ORDER BY "date" DESC`,
  );
  if (q && q.rows.length) return { data: q.rows, source: "db" };
  return { data: mockActivities, source: "mock" };
}

export async function getMediaAll(): Promise<{ data: MediaItem[]; source: "db" | "mock" }> {
  const q = await runQuery<MediaItem>(
    `SELECT "id", "type", "title", "src", "expedition", "year", "location", "tags", "duration"
     FROM media ORDER BY "year" DESC`,
  );
  if (q && q.rows.length) return { data: q.rows, source: "db" };
  return { data: mockMedia, source: "mock" };
}

export interface PortalStats {
  expeditions: string;
  datasets: string;
  publications: string;
  stations: string;
  yearsOfPolarPresence: string;
  mediaAssets: string;
}

export async function getPortalStats(): Promise<{ stats: PortalStats; source: "db" | "mock" }> {
  const em = await runQuery<{ count: string }>(
    `SELECT (SELECT count(*)::text FROM expeditions) AS "e",
            (SELECT count(*)::text FROM datasets) AS "d",
            (SELECT count(*)::text FROM publications) AS "p",
            (SELECT count(*)::text FROM media) AS "m"`,
  );
  if (em && em.rows.length) {
    const r = em.rows[0] as unknown as { e: string; d: string; p: string; m: string };
    return {
      stats: {
        expeditions: r.e,
        datasets: r.d,
        publications: r.p,
        stations: "4",
        yearsOfPolarPresence: "40+",
        mediaAssets: r.m,
      },
      source: "db",
    };
  }
  return { stats: mockStats, source: "mock" };
}

export interface DbUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: "admin" | "editor" | "researcher" | "scientist" | "student" | "viewer";
  status: "active" | "pending";
}

export async function getUserByEmail(
  email: string,
): Promise<{ user: DbUser | null; source: "db" | "mock" }> {
  const q = await runQuery<DbUser>(
    `SELECT "id", "name", "email", "passwordHash", "role", "status" FROM users WHERE lower("email") = lower($1) LIMIT 1`,
    [email],
  );
  if (q && q.rows.length) return { user: q.rows[0], source: "db" };
  return { user: null, source: "mock" };
}

export async function createUser(input: {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: DbUser["role"];
  status: DbUser["status"];
}): Promise<boolean> {
  const q = await runQuery(
    `INSERT INTO users ("id", "name", "email", "passwordHash", "role", "status")
     VALUES ($1, $2, $3, $4, $5, $6)
     ON CONFLICT ("email") DO UPDATE SET "name" = EXCLUDED."name", "passwordHash" = EXCLUDED."passwordHash"`,
    [input.id, input.name, input.email, input.passwordHash, input.role, input.status],
  );
  return q !== null;
}