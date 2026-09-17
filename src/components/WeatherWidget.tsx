"use client";
import { useState, useEffect } from "react";
import { CloudSun, Wind, Droplets, Gauge, RefreshCw } from "lucide-react";
import type { StationWeather } from "@/lib/types";

const fallbackData: StationWeather[] = [
  { station: "Maitri", region: "Antarctica", temp: -16.8, wind: 21, pressure: 988, humidity: 78, icon: "❄️" },
  { station: "Bharati", region: "Antarctica", temp: -21.4, wind: 34, pressure: 976, humidity: 82, icon: "❄️" },
  { station: "Himansh", region: "Himalaya", temp: 7.4, wind: 12, pressure: 1012, humidity: 41, icon: "🌤️" },
  { station: "Himadri", region: "Arctic", temp: 5.5, wind: 18, pressure: 1003, humidity: 89, icon: "🌧️" },
];

export default function WeatherWidget() {
  const [idx, setIdx] = useState(0);
  const [stations, setStations] = useState<StationWeather[]>(fallbackData);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const loadWeather = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/weather", { next: { revalidate: 300 } });
      if (res.ok) {
        const data = await res.json();
        setStations(data.stations);
        setLastUpdated(
          new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
        );
      }
    } catch {
      // Keep fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let alive = true;
    const t = setInterval(() => setIdx((i) => (i + 1) % stations.length), 4000);

    (async () => {
      try {
        const res = await fetch("/api/weather", { next: { revalidate: 300 } });
        if (alive && res.ok) {
          const data = await res.json();
          setStations(data.stations);
          setLastUpdated(
            new Date().toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
            }),
          );
        }
      } catch {
        // Keep fallback
      }
    })();

    return () => {
      alive = false;
      clearInterval(t);
    };
  }, [stations.length]);

  const s = stations[idx];

  return (
    <div
      role="region"
      aria-label={`Live weather at ${s.station}, ${s.region}: ${s.temp}°C`}
      className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-polar-900 via-polar-800 to-polar-700 text-white shadow-lg transition-shadow hover:shadow-xl"
    >
      <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-white/5" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-ice-400/10" />

      <div className="relative flex flex-col gap-6 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-polar-300">
            <CloudSun className="mr-1 inline h-3.5 w-3.5" aria-hidden="true" />
            Live Station Weather
          </div>
          <div className="mb-3 flex items-baseline gap-2">
            <span className="text-4xl font-bold tracking-tight" aria-hidden="true">
              {s.icon}
            </span>
            <span className="text-2xl font-bold">{s.station}</span>
            <span className="text-sm text-polar-400">&bull; {s.region}</span>
          </div>
          <div className="text-6xl font-extrabold tabular-nums tracking-tight">
            {s.temp}°C
          </div>
        </div>

        <div className="flex flex-wrap gap-5 text-sm">
          <div className="flex items-center gap-1.5 text-polar-200">
            <Wind className="h-4 w-4" aria-hidden="true" /> {s.wind} km/h
          </div>
          <div className="flex items-center gap-1.5 text-polar-200">
            <Droplets className="h-4 w-4" aria-hidden="true" /> {s.humidity}%
          </div>
          <div className="flex items-center gap-1.5 text-polar-200">
            <Gauge className="h-4 w-4" aria-hidden="true" /> {s.pressure} hPa
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1 border-t border-white/10 px-6 py-2">
        {stations.map((w, i) => (
          <button
            key={w.station}
            type="button"
            onClick={() => setIdx(i)}
            aria-label={`Show weather for ${w.station}`}
            className={`h-1.5 rounded-full transition-all ${
              i === idx ? "w-6 bg-white" : "w-2 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
        <div className="ml-auto flex items-center gap-2 text-xs text-polar-400">
          {lastUpdated && <span>Updated {lastUpdated}</span>}
          <button
            type="button"
            onClick={loadWeather}
            disabled={loading}
            aria-label="Refresh weather data"
            className="rounded-full p-1 transition hover:bg-white/10 disabled:opacity-50"
          >
            <RefreshCw
              className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`}
              aria-hidden="true"
            />
          </button>
          <span className="text-polar-500">data.ncpor.res.in</span>
        </div>
      </div>
    </div>
  );
}