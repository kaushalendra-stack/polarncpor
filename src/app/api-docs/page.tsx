import type { Metadata } from "next";
import { Code2, Server, ShieldCheck, Globe } from "lucide-react";
import { SectionHeader } from "@/components/UI";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Open Data API — PolarNCPOR | NCPOR, Government of India",
  description:
    "Public REST API documentation for the Integrated Polar Science Outreach and Knowledge Repository Portal — expeditions, datasets and station weather.", 
};

function CodeBlock({ label, code }: { label: string; code: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200">
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-2">
        <span className="text-xs font-semibold text-slate-500">{label}</span>
        <Code2 className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
      </div>
      <pre className="overflow-x-auto bg-slate-950 p-4 text-xs leading-relaxed text-slate-200">
        <code>{code}</code>
      </pre>
    </div>
  );
}

const endpoints = [
  {
    method: "GET",
    path: "/api/expeditions",
    desc: "List all expeditions with optional filters.",
    query: "region, status (active|completed|planned), year, limit, offset",
    sample:
      '{\n  "count": 3,\n  "total": 45,\n  "limit": 100,\n  "offset": 0,\n  "results": [\n    {\n      "slug": "41st-ise",\n      "name": "41st Indian Scientific Expedition to Antarctica",\n      "region": "Antarctica",\n      "status": "active",\n      ...\n    }\n  ]\n}',
  },
  {
    method: "GET",
    path: "/api/datasets",
    desc: "Browse scientific datasets catalogued in the National Polar Data Center (NPDC).",
    query: "category, station, q, limit, offset",
    sample:
      '{\n  "count": 20,\n  "total": 838,\n  "categories": [\n    { "name": "Atmosphere", "count": 165 },\n    { "name": "Oceans", "count": 133 }\n  ],\n  "results": [\n    {\n      "id": "ds-001",\n      "title": "Maitri Weather Station Time Series (2000\u20132023)",\n      ...\n    }\n  ]\n}',
  },
  {
    method: "GET",
    path: "/api/weather",
    desc: "Latest live readings from India's four research stations (with mock fallback when offline).",
    query: "— (no parameters)",
    sample:
      '{\n  "source": "data.ncpor.res.in",\n  "fallback": false,\n  "stations": [\n    {\n      "station": "Maitri",\n      "region": "Antarctica",\n      "temp": -16.8,\n      "wind": 21,\n      "pressure": 988,\n      "humidity": 78\n    }\n  ]\n}',
  },
];

export default function ApiDocsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Open Data API — PolarNCPOR",
          about: "Open data API for polar science outreach dissemination.",
        }}
      />
      <div className="mb-8 rounded-2xl bg-gradient-to-r from-polar-950 to-polar-800 p-6 text-white">
        <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-polar-300">
          <Server className="h-3.5 w-3.5" aria-hidden="true" /> Open Data
        </div>
        <h1 className="text-3xl font-extrabold">Developer API</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-300">
          Machine-readable access to expedition archives, scientific datasets and
          live station weather — enabling researchers, educators and developers to
          reuse NCPOR data in their own applications and visualisations.
        </p>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        {[
          { icon: Globe, title: "Open standards", text: "REST + JSON over HTTPS. No API key required for public reads." },
          { icon: ShieldCheck, title: "Rate limited", text: "Up to 60 requests/min per client. Cache-friendly responses." },
          { icon: Code2, title: "Machine readable", text: "Perfect for scripts, notebooks and interactive dashboards." },
        ].map((f) => (
          <div key={f.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <f.icon className="mb-2 h-5 w-5 text-polar-600" aria-hidden="true" />
            <h2 className="mb-1 font-bold text-polar-950">{f.title}</h2>
            <p className="text-sm text-slate-500">{f.text}</p>
          </div>
        ))}
      </div>

      <section className="space-y-8">
        <SectionHeader title="Endpoints" />
        {endpoints.map((e) => (
          <div key={e.path}>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span
                className={`rounded-md px-2.5 py-1 text-[11px] font-bold ${
                  e.method === "GET" ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-700"
                }`}
              >
                {e.method}
              </span>
              <code className="rounded-md bg-slate-100 px-2 py-1 font-mono text-sm font-semibold text-polar-700">
                {e.path}
              </code>
            </div>
            <p className="mb-2 text-sm text-slate-600">{e.desc}</p>
            <p className="mb-3 text-xs text-slate-500">
              <span className="font-semibold">Query params:</span> {e.query}
            </p>
            <CodeBlock label={`Response — ${e.path}`} code={e.sample} />
          </div>
        ))}

        <div>
          <SectionHeader title="Example" />
          <CodeBlock
            label="cURL"
            code={
              "curl -s 'https://polarncpor.vercel.app/api/expeditions?region=Antarctica&status=active' \\\n  | jq '.results[] | {name, designation}'"
            }
          />
        </div>
      </section>

      <div className="mt-10 rounded-2xl bg-slate-100 p-5 text-xs text-slate-500">
        All public endpoints return <code className="font-mono">Cache-Control: public, max-age=300</code>.
        For bulk data access, contact the National Polar Data Center at{" "}
        <a href="https://npdc.ncpor.res.in" target="_blank" rel="noopener noreferrer" className="font-semibold text-polar-600 underline">
          npdc.ncpor.res.in
        </a>{" "}
        <span className="sr-only">(opens in a new window)</span>.
      </div>
    </div>
  );
}