"use client";
import { useState } from "react";
import { TrendingUp, Thermometer, Snowflake, Globe, BarChart3 } from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { stationWeather } from "@/lib/data";

const antarcticTempTrend = [
  { year: "1940", temp: -0.9 },
  { year: "1950", temp: -0.85 },
  { year: "1960", temp: -0.8 },
  { year: "1970", temp: -0.82 },
  { year: "1980", temp: -0.78 },
  { year: "1990", temp: -0.72 },
  { year: "2000", temp: -0.65 },
  { year: "2005", temp: -0.61 },
  { year: "2010", temp: -0.56 },
  { year: "2015", temp: -0.5 },
  { year: "2020", temp: -0.42 },
  { year: "2025", temp: -0.36 },
];

const seaIceMonthly = [
  { month: "Jan", extent: 4.1 },
  { month: "Feb", extent: 3.8 },
  { month: "Mar", extent: 4.9 },
  { month: "Apr", extent: 6.2 },
  { month: "May", extent: 7.8 },
  { month: "Jun", extent: 9.1 },
  { month: "Jul", extent: 10.3 },
  { month: "Aug", extent: 11.5 },
  { month: "Sep", extent: 10.8 },
  { month: "Oct", extent: 8.4 },
  { month: "Nov", extent: 6.1 },
  { month: "Dec", extent: 4.6 },
];

const stationsTempData = stationWeather.map((s) => ({
  name: s.station,
  temperature: s.temp,
  wind: s.wind,
}));

const datasetDistribution = [
  { name: "Atmosphere", count: 165 },
  { name: "Oceans", count: 133 },
  { name: "Cryosphere", count: 112 },
  { name: "Paleoclimate", count: 99 },
  { name: "Human Dim.", count: 91 },
  { name: "Land Surface", count: 83 },
  { name: "Biological", count: 58 },
  { name: "Solid Earth", count: 39 },
  { name: "Biosphere", count: 37 },
  { name: "Sun-Earth", count: 19 },
];

const chartColors = {
line: "#3b82f6",
      area: "#38bdf8",
      bar: "#0d47a1",
      secondary: "#ff9800",
      grid: "#e2e8f0",
    };

    const fmtTemp = (value: unknown) =>
      value == null ? ["—", "Temp anomaly"] : [`${Number(value).toFixed(3)}°C`, "Temp anomaly"];
    const fmtExtent = (value: unknown) =>
      value == null ? ["—", "Sea ice extent"] : [`${Number(value).toFixed(1)} M km²`, "Sea ice extent"];
    const fmtCount = (value: unknown) =>
      value == null ? [0, "Datasets"] : [Number(value), "Datasets"];
    const fmtStation = (value: unknown) =>
      value == null ? ["—", "Temperature"] : [`${Number(value)}°C`, "Temperature"];

export default function ObservatoryPage() {
  const [activeChart, setActiveChart] = useState<"trend" | "seasonal" | "distribution">("trend");

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-6 rounded-2xl bg-gradient-to-r from-polar-950 to-polar-800 p-6 text-white">
        <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-polar-300">
          <Globe className="h-3.5 w-3.5" aria-hidden="true" /> Polar Observatory
        </div>
        <h1 className="text-3xl font-extrabold">
          Polar Climate &amp; Data Observatory
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-300">
          Interactive visualisations of Antarctic temperature trends, sea ice
          extent, station climate data and the distribution of scientific datasets
          housed at the National Polar Data Center.
        </p>
      </div>

      <div className="mb-8 flex gap-2">
        {([
          { id: "trend" as const, label: "Antarctic Temperature Trend", icon: TrendingUp },
          { id: "seasonal" as const, label: "Sea Ice Seasonal Cycle", icon: Snowflake },
          { id: "distribution" as const, label: "Dataset Distribution", icon: BarChart3 },
        ]).map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveChart(tab.id)}
            className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold transition ${
              activeChart === tab.id
                ? "bg-polar-600 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <tab.icon className="h-3.5 w-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Chart Area */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        {activeChart === "trend" && (
          <div>
            <h2 className="mb-1 text-lg font-bold text-polar-950">
              East Antarctic Surface Temperature Anomaly
            </h2>
            <p className="mb-5 text-sm text-slate-500">
              Rapid warming over East Antarctica since the 1940s — based on NCPOR
              Annual Report 2022–23 findings. Anomaly relative to the 1951–1980
              baseline. Units: °C.
            </p>
            <ResponsiveContainer width="100%" height={360}>
              <AreaChart data={antarcticTempTrend}>
                <defs>
                  <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={chartColors.area} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={chartColors.area} stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                <XAxis
                  dataKey="year"
                  tick={{ fontSize: 12, fill: "#64748b" }}
                  axisLine={{ stroke: chartColors.grid }}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#64748b" }}
                  axisLine={{ stroke: chartColors.grid }}
                  tickFormatter={(v: number) => `${v.toFixed(2)}°C`}
                  domain={["dataMin - 0.05", "dataMax + 0.05"]}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    fontSize: 13,
                  }}
                  formatter={fmtTemp}
                />
                <Area
                  type="monotone"
                  dataKey="temp"
                  stroke={chartColors.line}
                  strokeWidth={2.5}
                  fill="url(#tempGrad)"
                  dot={{ fill: chartColors.line, r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}

        {activeChart === "seasonal" && (
          <div>
            <h2 className="mb-1 text-lg font-bold text-polar-950">
              Antarctic Sea Ice Extent — Monthly Seasonal Cycle
            </h2>
            <p className="mb-5 text-sm text-slate-500">
              Representative seasonal cycle of Southern Hemisphere sea ice
              concentration from satellite observations (after 1979). September
              represents annual maximum. Unit: million km².
            </p>
            <ResponsiveContainer width="100%" height={360}>
              <AreaChart data={seaIceMonthly}>
                <defs>
                  <linearGradient id="iceGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#64748b" }} />
                <YAxis
                  tick={{ fontSize: 12, fill: "#64748b" }}
                  tickFormatter={(v: number) => `${v}M km²`}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                    fontSize: 13,
                  }}
                  formatter={fmtExtent}
                />
                <Area
                  type="monotone"
                  dataKey="extent"
                  stroke="#0ea5e9"
                  strokeWidth={2.5}
                  fill="url(#iceGrad)"
                  dot={{ fill: "#0ea5e9", r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}

        {activeChart === "distribution" && (
          <div>
            <h2 className="mb-1 text-lg font-bold text-polar-950">
              NPDC Datasets by Science Keyword
            </h2>
            <p className="mb-5 text-sm text-slate-500">
              Distribution of the 838 datasets currently catalogued in the National
              Polar Data Center (NPDC) by major science keyword.
            </p>
            <ResponsiveContainer width="100%" height={420}>
              <BarChart
                data={datasetDistribution}
                layout="vertical"
                margin={{ left: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                <XAxis type="number" tick={{ fontSize: 12, fill: "#64748b" }} />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={110}
                  tick={{ fontSize: 12, fill: "#64748b" }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                    fontSize: 13,
                  }}
                  formatter={fmtCount}
                />
                <Bar
                  dataKey="count"
                  fill={chartColors.bar}
                  radius={[0, 6, 6, 0]}
                  barSize={28}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Station climate bar */}
      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-1 text-lg font-bold text-polar-950">
          <Thermometer className="mr-1 inline h-5 w-5 text-polar-600" />
          Current Station Temperatures
        </h2>
        <p className="mb-5 text-sm text-slate-500">
          Latest readings from all four Indian polar and high-altitude research
          stations. Refresh via the homepage weather widget.
        </p>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={stationsTempData}>
            <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#64748b" }} />
            <YAxis
              tick={{ fontSize: 12, fill: "#64748b" }}
              tickFormatter={(v: number) => `${v}°C`}
            />
            <Tooltip
              contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", fontSize: 13 }}
              formatter={fmtStation}
            />
            <Bar
              dataKey="temperature"
              fill="#1e3a8a"
              radius={[6, 6, 0, 0]}
              barSize={50}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 rounded-2xl bg-slate-100 p-5 text-xs text-slate-500">
        <strong>Data sources:</strong> NCPOR Annual Report 2022–23; National Polar Data
        Center (NPDC) at npdc.ncpor.res.in; station weather via data.ncpor.res.in.
        Data are for demonstration and visualisation purposes.
      </div>
    </div>
  );
}