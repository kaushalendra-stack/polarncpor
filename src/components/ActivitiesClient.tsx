"use client";
import { useState, useMemo } from "react";
import { Search, X, CalendarDays } from "lucide-react";
import type { Activity } from "@/lib/types";
import { SectionHeader } from "@/components/UI";

export default function ActivitiesClient({ activities = [] }: { activities: Activity[] }) {
  const [category, setCategory] = useState("");
  const [query, setQuery] = useState("");

  const categories = useMemo(
    () => Array.from(new Set(activities.map((a) => a.category))),
    [activities],
  );

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return activities.filter(
      (a) =>
        (!category || a.category === category) &&
        (!q ||
          a.title.toLowerCase().includes(q) ||
          a.summary.toLowerCase().includes(q)),
    );
  }, [category, query, activities]);

  const catColors: Record<string, string> = {
    Conference: "bg-indigo-100 text-indigo-700",
    Outreach: "bg-pink-100 text-pink-700",
    Institutional: "bg-sky-100 text-sky-700",
    "Call for Proposals": "bg-amber-100 text-amber-700",
    Collaboration: "bg-emerald-100 text-emerald-700",
    Expedition: "bg-slate-200 text-slate-700",
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeader
        title="Activities & News"
        subtitle="Conferences, outreach events, collaboration announcements and expedition launches"
      />

      <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search activities..."
            className="w-full rounded-xl border border-slate-300 py-2.5 pl-10 pr-10 text-sm text-slate-900 transition focus:border-polar-400 focus:ring-2 focus:ring-polar-200 focus:outline-none"
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

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCategory("")}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
              !category
                ? "bg-polar-600 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                category === c
                  ? "bg-polar-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-16 text-center">
          <div className="mb-3 text-4xl">📋</div>
          <p className="text-lg font-semibold text-slate-700">No activities found</p>
          <p className="mt-1 text-sm text-slate-500">Try adjusting your filters.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    catColors[item.category] || "bg-slate-100 text-slate-600"
                  }`}
                >
                  {item.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-slate-400">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {new Date(item.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>

              <h3 className="mb-2 text-lg font-bold text-polar-950">
                {item.title}
              </h3>
              <p className="mb-3 text-sm leading-relaxed text-slate-600">
                {item.summary}
              </p>
              <p className="text-sm leading-relaxed text-slate-500">
                {item.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}