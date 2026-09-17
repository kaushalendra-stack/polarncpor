"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search as SearchIcon,
  X,
  Compass,
  Database,
  FileText,
  Camera,
  Megaphone,
} from "lucide-react";
import type { Expedition, Dataset, Publication, MediaItem, Activity } from "@/lib/types";

interface SearchResult {
  type: "expedition" | "dataset" | "publication" | "media" | "activity";
  title: string;
  href: string;
  excerpt: string;
  icon: string;
  color: string;
}

export default function SearchClient({
  expeditions = [],
  datasets = [],
  publications = [],
  mediaItems = [],
  activities = [],
}: {
  expeditions: Expedition[];
  datasets: Dataset[];
  publications: Publication[];
  mediaItems: MediaItem[];
  activities: Activity[];
}) {
  const [query, setQuery] = useState("");

  const results = useMemo<SearchResult[]>(() => {
    const q = query.toLowerCase().trim();
    if (!q) return [];

    const r: SearchResult[] = [];

    expeditions.forEach((e) => {
      if (
        e.name.toLowerCase().includes(q) ||
        e.region.toLowerCase().includes(q) ||
        e.summary.toLowerCase().includes(q)
      )
        r.push({
          type: "expedition",
          title: e.name,
          href: `/expeditions/${e.slug}`,
          excerpt: e.summary.slice(0, 120) + "...",
          icon: "🧭",
          color: "bg-sky-50 border-sky-200",
        });
    });

    datasets.forEach((d) => {
      if (
        d.title.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q)
      )
        r.push({
          type: "dataset",
          title: d.title,
          href: `/datasets`,
          excerpt: `${d.category} • ${d.station} • ${d.format}`,
          icon: "📊",
          color: "bg-violet-50 border-violet-200",
        });
    });

    publications.forEach((p) => {
      if (
        p.title.toLowerCase().includes(q) ||
        p.authors.toLowerCase().includes(q) ||
        p.journal.toLowerCase().includes(q)
      )
        r.push({
          type: "publication",
          title: p.title,
          href: "/publications",
          excerpt: `${p.authors} • ${p.journal} (${p.year})`,
          icon: "📄",
          color: "bg-amber-50 border-amber-200",
        });
    });

    mediaItems.forEach((m) => {
      if (
        m.title.toLowerCase().includes(q) ||
        m.tags.some((t) => t.toLowerCase().includes(q)) ||
        m.location.toLowerCase().includes(q)
      )
        r.push({
          type: "media",
          title: m.title,
          href: "/media",
          excerpt: `${m.type} • ${m.location} • ${m.year}`,
          icon: m.type === "video" ? "🎬" : "📸",
          color: "bg-emerald-50 border-emerald-200",
        });
    });

    activities.forEach((a) => {
      if (
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
      )
        r.push({
          type: "activity",
          title: a.title,
          href: "/activities",
          excerpt: `${a.category} • ${new Date(a.date).toLocaleDateString("en-IN")}`,
          icon: "📣",
          color: "bg-rose-50 border-rose-200",
        });
    });

    return r;
  }, [query, expeditions, datasets, publications, mediaItems, activities]);

  const typeIcons: Record<string, React.ElementType> = {
    expedition: Compass,
    dataset: Database,
    publication: FileText,
    media: Camera,
    activity: Megaphone,
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-polar-950">
          Search the Portal
        </h1>
        <p className="mt-2 text-slate-600">
          Search across expeditions, datasets, publications, media and activities
        </p>
      </div>

      <div className="relative mb-8">
        <SearchIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type to search... (e.g. 'Maitri', 'penguin', 'glacier', 'ice core')"
          className="w-full rounded-2xl border-2 border-slate-200 bg-white py-4 pl-12 pr-12 text-lg text-slate-900 shadow-sm transition focus:border-polar-400 focus:ring-4 focus:ring-polar-100 focus:outline-none"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-slate-200 p-1 text-slate-500 hover:bg-slate-300"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {query && (
        <div className="mb-4 text-sm text-slate-500">
          Found <strong className="text-polar-700">{results.length}</strong> results
          for &ldquo;{query}&rdquo;
        </div>
      )}

      {results.length > 0 ? (
        <div className="space-y-3">
          {results.map((r, i) => {
            const Icon = typeIcons[r.type] || Compass;
            return (
              <Link
                key={`${r.type}-${r.href}-${i}`}
                href={r.href}
                className={`flex items-start gap-4 rounded-2xl border p-5 transition hover:-translate-y-0.5 hover:shadow-md ${r.color}`}
              >
                <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/80 text-xl">
                  {r.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="mb-0.5 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/80 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-500">
                      <Icon className="h-3 w-3" /> {r.type}
                    </span>
                  </div>
                  <h3 className="text-[15px] font-bold text-polar-950">
                    {r.title}
                  </h3>
                  <p className="mt-0.5 text-sm text-slate-600">{r.excerpt}</p>
                </div>
              </Link>
            );
          })}
        </div>
      ) : query ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-16 text-center">
          <div className="mb-3 text-4xl">🔍</div>
          <p className="text-lg font-semibold text-slate-700">No results found</p>
          <p className="mt-1 text-sm text-slate-500">
            Try searching for &ldquo;Maitri&rdquo;, &ldquo;penguin&rdquo; or
            &ldquo;glacier&rdquo;
          </p>
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mb-3 text-5xl">🌐</div>
          <p className="text-lg font-semibold text-slate-700">
            Start typing to search
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Try: Maitri &bull; penguin &bull; glacier &bull; ice core &bull;
            atmosphere &bull; Kongsfjorden &bull; Southern Ocean
          </p>
        </div>
      )}
    </div>
  );
}