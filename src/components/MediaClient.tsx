"use client";
import { useState, useMemo } from "react";
import { Search, Camera, Play, X } from "lucide-react";
import type { MediaItem } from "@/lib/types";
import MediaCard from "@/components/MediaCard";
import { SectionHeader } from "@/components/UI";

export default function MediaClient({ mediaItems = [] }: { mediaItems: MediaItem[] }) {
  const [mediaType, setMediaType] = useState<"all" | "photo" | "video">("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return mediaItems.filter(
      (m) =>
        (mediaType === "all" || m.type === mediaType) &&
        (!q ||
          m.title.toLowerCase().includes(q) ||
          m.tags.some((t) => t.toLowerCase().includes(q)) ||
          m.location.toLowerCase().includes(q)),
    );
  }, [mediaType, query, mediaItems]);

  const photoCount = mediaItems.filter((m) => m.type === "photo").length;
  const videoCount = mediaItems.filter((m) => m.type === "video").length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeader
        title="Media Gallery"
        subtitle="Photographs and videos from Indian polar expeditions, curated and auto-tagged by AI"
      />

      <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, location or tag..."
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

          <div className="flex gap-2">
            {[
              { value: "all" as const, label: `All (${mediaItems.length})`, icon: null },
              { value: "photo" as const, label: `Photos (${photoCount})`, icon: Camera },
              { value: "video" as const, label: `Videos (${videoCount})`, icon: Play },
            ].map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setMediaType(opt.value)}
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition ${
                  mediaType === opt.value
                    ? "bg-polar-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {opt.icon && <opt.icon className="h-3.5 w-3.5" />}
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-4 text-sm text-slate-500">
        Showing <strong className="text-polar-700">{filtered.length}</strong> items
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-16 text-center">
          <div className="mb-3 text-4xl">📸</div>
          <p className="text-lg font-semibold text-slate-700">No media found</p>
          <p className="mt-1 text-sm text-slate-500">Try a different search term or type filter.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((media) => (
            <MediaCard key={media.id} media={media} />
          ))}
        </div>
      )}
    </div>
  );
}