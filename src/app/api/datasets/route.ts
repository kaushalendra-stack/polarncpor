import { NextRequest, NextResponse } from "next/server";
import { getDatasetsAll } from "@/lib/repository";
import { datasetCategories } from "@/lib/data";

/**
 * GET /api/datasets
 * Query params: category, station, q, limit, offset
 * Serves from PostgreSQL when available, otherwise falls back to mock data.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const category = searchParams.get("category") || "";
  const station = searchParams.get("station") || "";
  const q = (searchParams.get("q") || "").toLowerCase();
  const limit = Math.min(Number(searchParams.get("limit") || 100), 200);
  const offset = Number(searchParams.get("offset") || 0);

  const { data: all, source } = await getDatasetsAll();

  let filtered = all.filter(
    (d) =>
      (!category || d.category === category) &&
      (!station || d.station.toLowerCase().includes(station.toLowerCase())) &&
      (!q ||
        d.title.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q)),
  );

  const total = filtered.length;
  filtered = filtered.slice(offset, offset + limit);

  const categories = datasetCategories.map((c) => ({
    name: c.name,
    count: c.count,
  }));

  return NextResponse.json(
    {
      count: filtered.length,
      total,
      limit,
      offset,
      source,
      categories,
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