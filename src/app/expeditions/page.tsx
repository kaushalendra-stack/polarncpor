import Link from "next/link";
import { Compass, Filter, MapPin, X } from "lucide-react";
import { getExpeditionsAll } from "@/lib/repository";
import { regions } from "@/lib/data";
import type { Region, ExpeditionStatus } from "@/lib/types";
import ExpeditionCard from "@/components/ExpeditionCard";
import { SectionHeader } from "@/components/UI";

interface Props {
  searchParams: Promise<{ region?: string; status?: string }>;
}

function getBadgeClass(active: boolean, kind: "region" | "status") {
  if (active) {
    return kind === "region"
      ? "bg-sky-600 text-white"
      : "bg-emerald-600 text-white";
  }
  return "bg-white text-slate-600 border border-slate-300 hover:border-sky-400 hover:text-sky-600";
}

export default async function ExpeditionsPage({ searchParams }: Props) {
  const { region = "", status = "" } = await searchParams;
  const { data: expeditions } = await getExpeditionsAll();

  const filtered = expeditions.filter(
    (e) =>
      (!region || e.region === (region as Region)) &&
      (!status || e.status === (status as ExpeditionStatus)),
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeader
        title="Expedition Archive"
        subtitle="Browse India's polar, Southern Ocean and Himalayan expeditions since the earliest Antarctic voyages"
      />

      <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
          <Filter className="h-4 w-4 text-polar-600" /> Filter by region
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/expeditions"
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition ${getBadgeClass(
              !region,
              "region",
            )}`}
          >
            <MapPin className="h-3.5 w-3.5" /> All Regions
          </Link>
          {regions.map((r) => (
            <Link
              key={r}
              href={`/expeditions?region=${encodeURIComponent(r)}${
                status ? `&status=${status}` : ""
              }`}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition ${getBadgeClass(
                region === r,
                "region",
              )}`}
            >
              {r === "Antarctica"
                ? "🐧"
                : r === "Arctic"
                  ? "🦊"
                  : r === "Southern Ocean"
                    ? "🐋"
                    : "🏔️"}{" "}
              {r}
            </Link>
          ))}
        </div>

        <div className="my-4 h-px bg-slate-100" />

        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
          <Compass className="h-4 w-4 text-polar-600" /> Filter by status
        </div>
        <div className="flex flex-wrap gap-2">
          {(["all", "active", "completed", "planned"] as const).map((s) => (
            <Link
              key={s}
              href={`/expeditions?${region ? `region=${encodeURIComponent(region)}&` : ""}status=${
                s === "all" ? "" : s
              }`}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold capitalize transition ${getBadgeClass(
                status === s || (s === "all" && !status),
                "status",
              )}`}
            >
              {s === "all" ? "● All" : s === "active" ? "● Active" : "● Completed"}{" "}
              {s === "planned" ? "· Planned" : ""}
            </Link>
          ))}
        </div>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-slate-500">
          Showing <strong className="text-polar-700">{filtered.length}</strong>{" "}
          expedition{filtered.length === 1 ? "" : "s"}
        </p>
        {(region || status) && (
          <Link
            href="/expeditions"
            className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 transition hover:bg-slate-200"
          >
            <X className="h-3 w-3" /> Clear filters
          </Link>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-16 text-center">
          <div className="mb-3 text-4xl">🧭</div>
          <p className="text-lg font-semibold text-slate-700">
            No expeditions match these filters
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Try clearing filters or choosing another region.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((expedition) => (
            <ExpeditionCard key={expedition.slug} expedition={expedition} />
          ))}
        </div>
      )}
    </div>
  );
}