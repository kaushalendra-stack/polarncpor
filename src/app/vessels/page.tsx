import type { Metadata } from "next";
import { Ship, MapPin, Navigation, Wind, Timer, Users, Compass } from "lucide-react";
import { vessels } from "@/lib/data";
import { SectionHeader } from "@/components/UI";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Vessel Tracking — PolarSagar | NCPOR, Government of India",
  description:
    "Live position and voyage details of Indian research and naval vessels supporting NCPOR expeditions to Antarctica and the Southern Ocean.",
};

const path =
  "M 40,180 L 60,160 L 90,150 L 120,152 L 150,140 L 180,135 L 215,140 L 240,155 L 255,185 L 250,215 L 230,235 L 200,238 L 170,230 L 140,238 L 115,232 L 95,218 L 80,210 L 60,212 L 45,205 L 40,195 Z";

function project(lat: number, lng: number): { x: number; y: number } {
  const x = ((lng + 90) / 180) * 520;
  const y = ((90 - lat) / 180) * 340;
  return { x, y };
}

function PolarMap() {
  const stations = [
    { name: "Maitri", lat: -70.77, lng: 11.73, fill: "#0ea5e9" },
    { name: "Bharati", lat: -69.41, lng: 76.19, fill: "#6366f1" },
  ];

  return (
    <svg
      viewBox="0 0 520 340"
      role="img"
      aria-label="Schematic position map of Indian research vessels in the Southern Ocean relative to the Indian Antarctic stations Maitri and Bharati"
      className="w-full rounded-xl border border-slate-200 bg-gradient-to-b from-[#dbeafe] to-[#f0f9ff]"
    >
      <defs>
        <linearGradient id="ice" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e0f2fe" />
        </linearGradient>
        <radialGradient id="water" cx="50%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#eaf6ff" />
          <stop offset="100%" stopColor="#bae6fd" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="520" height="340" rx="12" fill="url(#water)" />
      <text x="12" y="22" fontSize="11" fill="#64748b" fontFamily="sans-serif">
        Southern Ocean (schematic)
      </text>

      {vessels
        .filter((v) => v.route.length > 0)
        .map((v) => {
          const pts = v.route.map((p) => project(p.lat, p.lng));
          const d = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x},${p.y}`).join(" ");
          return (
            <path
              key={`${v.id}-route`}
              d={d}
              fill="none"
              stroke="#0c4a6e"
              strokeWidth="1.5"
              strokeDasharray="4 3"
              strokeOpacity="0.5"
            />
          );
        })}

      <path d={path} fill="url(#ice)" stroke="#bae6fd" strokeWidth="2" />
      <text
        x="148"
        y="190"
        fontSize="15"
        fontWeight="700"
        fill="#0284c7"
        letterSpacing="1"
        transform="rotate(-8 148 190)"
        fontFamily="sans-serif"
      >
        ANTARCTICA
      </text>

      {stations.map((s) => {
        const { x, y } = project(s.lat, s.lng);
        return (
          <g key={s.name}>
            <circle cx={x} cy={y} r="6" fill={s.fill} stroke="#fff" strokeWidth="2" />
            <text x={x + 10} y={y + 4} fontSize="11" fontWeight="600" fill="#0f172a" fontFamily="sans-serif">
              {s.name}
            </text>
          </g>
        );
      })}

      {vessels
        .filter((v) => v.status !== "In Harbour")
        .map((v) => {
          const { x, y } = project(v.lat, v.lng);
          return (
            <g key={v.id}>
              <g transform={`translate(${x} ${y}) rotate(${v.heading})`}>
                <circle r="14" fill="#ffffff" fillOpacity="0.4" />
                <circle r="8" fill="#e11d48" stroke="#fff" strokeWidth="2" />
                <circle r="3" fill="#fff" />
              </g>
              <text x={x + 18} y={y - 12} fontSize="10" fontWeight="700" fill="#0f172a" fontFamily="sans-serif">
                {v.name}
              </text>
            </g>
          );
        })}
    </svg>
  );
}

export default function VesselsPage() {
  const active = vessels.filter((v) => v.status !== "In Harbour");

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Vessel Tracking — PolarSagar",
          description: "Live position and voyage details of Indian research and naval vessels supporting NCPOR Antarctic expeditions.",
          isPartOf: {
            "@type": "WebSite",
            name: "PolarSagar Portal",
            publisher: {
              "@type": "GovernmentOrganization",
              name: "National Centre for Polar and Ocean Research (NCPOR)",
            },
          },
        }}
      />
      <div className="mb-6 rounded-2xl bg-gradient-to-r from-polar-950 to-polar-800 p-6 text-white">
        <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-polar-300">
          <Ship className="h-3.5 w-3.5" aria-hidden="true" /> Fleet Operations
        </div>
        <h1 className="text-3xl font-extrabold">Vessel Tracking</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-300">
          Monitor the live position and voyage of Indian research and naval
          vessels ferrying personnel and cargo to India&apos;s Antarctic
          research stations — Maitri and Bharati.
        </p>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { icon: Ship, label: "Active Vessels", value: String(active.length) },
          { icon: Navigation, label: "Maitri Resupply", value: "11 kn" },
          { icon: Compass, label: "Bharati Resupply", value: "14 kn" },
          { icon: Timer, label: "Avg. Transit", value: "~20 days" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm">
            <s.icon className="mx-auto mb-2 h-5 w-5 text-polar-600" aria-hidden="true" />
            <div className="text-xl font-extrabold text-polar-950">{s.value}</div>
            <div className="text-xs font-medium text-slate-500">{s.label}</div>
          </div>
        ))}
      </div>

      <section className="mb-10">
        <SectionHeader title="Live Position Map" />
        <PolarMap />
        <p className="mt-2 text-xs text-slate-500">
          Schematic map for demonstration. Positions are illustrative and will be
          replaced with the live AIS feed from Indian Navy / NCPOR vessels during
          the operational phase.
        </p>
      </section>

      <section>
        <SectionHeader title="Vessel Fleet" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {vessels.map((v) => (
            <article
              key={v.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <div className="text-2xl" aria-hidden="true">
                    {v.icon}
                  </div>
                  <h2 className="mt-1 text-lg font-bold text-polar-950">{v.name}</h2>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
                    v.status === "At Sea"
                      ? "bg-emerald-100 text-emerald-700"
                      : v.status === "Resupply Mission"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {v.status}
                </span>
              </div>
              <p className="mb-3 text-sm text-slate-500">
                {v.type} · {v.operator}
              </p>
              <dl className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <dt className="flex items-center gap-1.5 text-slate-500">
                    <MapPin className="h-3.5 w-3.5" aria-hidden="true" /> Destination
                  </dt>
                  <dd className="font-semibold text-polar-900">{v.destination}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="flex items-center gap-1.5 text-slate-500">
                    <Navigation className="h-3.5 w-3.5" aria-hidden="true" /> Speed / Heading
                  </dt>
                  <dd className="font-semibold text-polar-900">
                    {v.speed > 0 ? `${v.speed} kn · ${v.heading}°` : "—"}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="flex items-center gap-1.5 text-slate-500">
                    <Timer className="h-3.5 w-3.5" aria-hidden="true" /> Days at sea
                  </dt>
                  <dd className="font-semibold text-polar-900">
                    {v.daysAtSea > 0 ? `${v.daysAtSea} days` : "Docked"}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="flex items-center gap-1.5 text-slate-500">
                    <Users className="h-3.5 w-3.5" aria-hidden="true" /> Crew
                  </dt>
                  <dd className="font-semibold text-polar-900">{v.crew}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="flex items-center gap-1.5 text-slate-500">
                    <Wind className="h-3.5 w-3.5" aria-hidden="true" /> Distance covered
                  </dt>
                  <dd className="font-semibold text-polar-900">
                    {v.distanceCovered > 0 ? `${v.distanceCovered.toLocaleString("en-IN")} km` : "—"}
                  </dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}