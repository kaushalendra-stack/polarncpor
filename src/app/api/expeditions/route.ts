import { NextRequest, NextResponse } from "next/server";
import { getExpeditionsAll } from "@/lib/repository";

/**
 * GET /api/expeditions
 * Query params: region, status, year, limit, offset
 * Serves from PostgreSQL when available, otherwise falls back to mock data.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const region = searchParams.get("region") || "";
  const status = searchParams.get("status") || "";
  const year = searchParams.get("year") || "";
  const limit = Math.min(Number(searchParams.get("limit") || 100), 200);
  const offset = Number(searchParams.get("offset") || 0);

  const { data: all, source } = await getExpeditionsAll();

  let filtered = all.filter(
    (e) =>
      (!region || e.region === region) &&
      (!status || e.status === status) &&
      (!year || String(e.year) === year),
  );

  const total = filtered.length;
  filtered = filtered.slice(offset, offset + limit);

  return NextResponse.json(
    {
      count: filtered.length,
      total,
      limit,
      offset,
      source,
      results: filtered,
    },
    {
      headers: {
        "Cache-Control": "public, max-age=300",
        "Access-Control-Allow-Origin": "*",
      },
    },
  );
}