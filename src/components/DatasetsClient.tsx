"use client";
import { useState, useMemo } from "react";
import { Search, X, Filter } from "lucide-react";
import type { Dataset } from "@/lib/types";
import DatasetCard from "@/components/DatasetCard";
import { SectionHeader } from "@/components/UI";

interface CategoryMeta {
  name: string;
  icon: string;
  desc: string;
}

export default function DatasetsClient({
  datasets = [],
  categories = [],
}: {
  datasets: Dataset[];
  categories: CategoryMeta[];
}) {
  const [category, setCategory] = useState<string>("");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return datasets.filter(
      (d) =>
        (!category || d.category === category) &&
        (!q ||
          d.title.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q) ||
          d.station.toLowerCase().includes(q)),
    );
  }, [category, query, datasets]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeader
        title="Scientific Datasets"
        subtitle="Explore datasets sourced from the National Polar Data Center (NPDC), NCPOR"
      />

      <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, station or keyword..."
              className="w-full rounded-xl border border-slate-300 py-2.5 pl-10 pr-4 text-sm text-slate-900 transition focus:border-polar-400 focus:ring-2 focus:ring-polar-200 focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-slate-200 p-0.5 text-slate-500 hover:bg-slate-300"
                aria-label="Clear search"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
          {category && (
            <button
              type="button"
              onClick={() => setCategory("")}
              className="inline-flex items-center gap-1.5 rounded-xl bg-polar-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-polar-700"
            >
              <Filter className="h-4 w-4" /> {category} <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((cat) => {
            const count = datasets.filter((d) => d.category === cat.name).length;
            return (
              <button
                key={cat.name}
                type="button"
                onClick={() =>
                  setCategory((prev) => (prev === cat.name ? "" : cat.name))
                }
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                  category === cat.name
                    ? "bg-polar-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat.icon} {cat.name}
                <span className="ml-0.5 rounded-full bg-white/20 px-1.5 text-[10px]">
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mb-4 text-sm text-slate-500">
        Showing <strong className="text-polar-700">{filtered.length}</strong> datasets
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-16 text-center">
          <div className="mb-3 text-4xl">🔍</div>
          <p className="text-lg font-semibold text-slate-700">No datasets found</p>
          <p className="mt-1 text-sm text-slate-500">
            Try a different keyword or clear category filters.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((dataset) => (
            <DatasetCard key={dataset.id} dataset={dataset} />
          ))}
        </div>
      )}
    </div>
  );
}