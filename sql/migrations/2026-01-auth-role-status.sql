-- PolarSagar — registration & role-approval migration (2026-01)
-- Adds:
--   1. "status" column to users (active | pending) so scientist/researcher/admin
--      registrations can await NCPOR approval before they can sign in.
--   2. The "researcher" role to the role CHECK constraint.
--
-- Applied automatically by `npm run db:setup` (setup-db.ts runs every
-- `.sql` file in sql/migrations in lexical order after schema.sql).

-- 1) status column (idempotent)
ALTER TABLE IF EXISTS users
  ADD COLUMN IF NOT EXISTS "status" TEXT NOT NULL DEFAULT 'active'
  CHECK ("status" IN ('active', 'pending'));

-- 2) widen role CHECK to admit "researcher" (drop then re-add, idempotent)
ALTER TABLE IF EXISTS users DROP CONSTRAINT IF EXISTS "users_role_check";
ALTER TABLE IF EXISTS users
  ADD CONSTRAINT "users_role_check"
  CHECK ("role" IN ('admin', 'editor', 'researcher', 'scientist', 'student', 'viewer'));
