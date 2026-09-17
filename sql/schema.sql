-- PolarSagar Portal — PostgreSQL schema (Phase 1)
-- Naming: identifiers are stored in camelCase and are ALWAYS quoted in queries.

CREATE TABLE IF NOT EXISTS users (
  "id" TEXT PRIMARY KEY,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL UNIQUE,
  "passwordHash" TEXT NOT NULL,
  "role" TEXT NOT NULL DEFAULT 'viewer' CHECK (role IN ('admin', 'editor', 'researcher', 'scientist', 'student', 'viewer')),
  "status" TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'pending')),
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS expeditions (
  "slug" TEXT PRIMARY KEY,
  "name" TEXT NOT NULL,
  "designation" TEXT,
  "region" TEXT NOT NULL,
  "station" TEXT,
  "year" INTEGER NOT NULL,
  "startDate" TEXT,
  "endDate" TEXT,
  "leader" TEXT,
  "status" TEXT NOT NULL DEFAULT 'completed',
  "crewCount" INTEGER,
  "ship" TEXT,
  "summary" TEXT,
  "objectives" JSONB NOT NULL DEFAULT '[]',
  "highlights" JSONB NOT NULL DEFAULT '[]',
  "theme" TEXT,
  "recent" BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE IF NOT EXISTS datasets (
  "id" TEXT PRIMARY KEY,
  "title" TEXT NOT NULL,
  "category" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "station" TEXT,
  "year" INTEGER,
  "format" TEXT,
  "size" TEXT,
  "records" TEXT
);

CREATE TABLE IF NOT EXISTS publications (
  "id" TEXT PRIMARY KEY,
  "title" TEXT NOT NULL,
  "authors" TEXT,
  "journal" TEXT,
  "year" INTEGER,
  "doi" TEXT,
  "type" TEXT NOT NULL DEFAULT 'Research Paper'
);

CREATE TABLE IF NOT EXISTS activities (
  "id" TEXT PRIMARY KEY,
  "title" TEXT NOT NULL,
  "date" TEXT,
  "category" TEXT,
  "summary" TEXT,
  "content" TEXT
);

CREATE TABLE IF NOT EXISTS media (
  "id" TEXT PRIMARY KEY,
  "type" TEXT NOT NULL DEFAULT 'photo',
  "title" TEXT NOT NULL,
  "src" TEXT,
  "expedition" TEXT,
  "year" INTEGER,
  "location" TEXT,
  "tags" JSONB NOT NULL DEFAULT '[]',
  "duration" TEXT
);

CREATE INDEX IF NOT EXISTS idx_expeditions_region ON expeditions ("region");
CREATE INDEX IF NOT EXISTS idx_expeditions_status ON expeditions ("status");
CREATE INDEX IF NOT EXISTS idx_datasets_category ON datasets ("category");