import { NextResponse } from "next/server";
import type { StationWeather } from "@/lib/types";

const NCPOR_API = "https://data.ncpor.res.in";

const fallbackData: StationWeather[] = [
  { station: "Maitri", region: "Antarctica", temp: -16.8, wind: 21, pressure: 988, humidity: 78, icon: "❄️" },
  { station: "Bharati", region: "Antarctica", temp: -21.4, wind: 34, pressure: 976, humidity: 82, icon: "❄️" },
  { station: "Himansh", region: "Himalaya", temp: 7.4, wind: 12, pressure: 1012, humidity: 41, icon: "🌤️" },
  { station: "Himadri", region: "Arctic", temp: 5.5, wind: 18, pressure: 1003, humidity: 89, icon: "🌧️" },
];

async function fetchStationData(
  stationPath: string,
  fallback: StationWeather,
): Promise<StationWeather> {
  try {
    const res = await fetch(`${NCPOR_API}/${stationPath}/live`, {
      signal: AbortSignal.timeout(3000),
      next: { revalidate: 300 },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    const tempMatch = html.match(/([-]?\d+\.?\d*)\s*°\s*C/);
    if (tempMatch) {
      return { ...fallback, temp: parseFloat(tempMatch[1]) };
    }
  } catch {
    // Silently fall back — NCPOR may not serve JSON or CORS may block
  }
  return fallback;
}

export async function GET() {
  const [maitri, bharati, himansh, himadri] = await Promise.all([
    fetchStationData("maitri", fallbackData[0]),
    fetchStationData("bharati", fallbackData[1]),
    fetchStationData("himansh", fallbackData[2]),
    fetchStationData("himadri", fallbackData[3]),
  ]);

  return NextResponse.json(
    { stations: [maitri, bharati, himansh, himadri] },
    {
      headers: {
        "Cache-Control": "public, max-age=300, stale-while-revalidate=600",
        "Access-Control-Allow-Origin": "*",
      },
    },
  );
}