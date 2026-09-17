"use client";
import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import type { Publication } from "@/lib/types";
import PublicationCard from "@/components/PublicationCard";
import { SectionHeader } from "@/components/UI";

export default function PublicationsClient({ publications = [] }: { publications: Publication[] }) {
  const [type, setType] = useState<string>("");
  const [query, setQuery] = useState("");

  const types = useMemo(
    () => Array.from(new Set(publications.map((p) => p.type))),
    [publications],
  );

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return publications.filter(
      (p) =>
        (!type || p.type === type) &&
        (!q ||
          p.title.toLowerCase().includes(q) ||
          p.authors.toLowerCase().includes(q) ||
          p.journal.toLowerCase().includes(q)),
    );
  }, [type, query, publications]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeader
        title="Publications"
        subtitle="Research papers, technical reports and annual reports from NCPOR"
      />

      <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search publications by title, author or journal..."
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
            onClick={() => setType("")}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
              !type
                ? "bg-polar-600 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            All
          </button>
          {types.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                type === t
                  ? "bg-polar-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4 text-sm text-slate-500">
        Showing <strong className="text-polar-700">{filtered.length}</strong> publications
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-16 text-center">
          <div className="mb-3 text-4xl">📄</div>
          <p className="text-lg font-semibold text-slate-700">No publications found</p>
          <p className="mt-1 text-sm text-slate-500">Try a different search term.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((pub) => (
            <PublicationCard key={pub.id} publication={pub} />
          ))}
        </div>
      )}
    </div>
  );
}