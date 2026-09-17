import { Play, MapPin, CalendarDays, Tags } from "lucide-react";
import type { MediaItem } from "@/lib/types";
import Badge from "./UI";

const gradients = [
  "from-sky-500 via-blue-600 to-indigo-700",
  "from-cyan-500 via-sky-600 to-blue-700",
  "from-blue-600 via-indigo-600 to-violet-700",
  "from-slate-600 via-slate-800 to-slate-950",
  "from-teal-500 via-cyan-600 to-blue-700",
  "from-indigo-500 via-blue-600 to-sky-700",
];

const emojis = ["🏔️", "🐧", "🧊", "❄️", "🌊", "🦊", "🌌", "⛰️"];

export default function MediaCard({ media }: { media: MediaItem }) {
  const g = gradients[Number(media.id.slice(1)) % gradients.length];
  const emoji = emojis[Number(media.id.slice(1)) % emojis.length];

  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="relative h-40 overflow-hidden">
        {media.src ? (
          <img
            src={media.src}
            alt={media.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div
            className={`relative flex h-40 items-center justify-center bg-gradient-to-br text-white ${g}`}
          >
            <span className="text-5xl opacity-80 transition group-hover:scale-110">
              {emoji}
            </span>
          </div>
        )}
        {media.type === "video" && (
          <>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/25 backdrop-blur">
                <Play className="h-6 w-6 fill-white text-white" />
              </div>
            </div>
            {media.duration && (
              <span className="absolute bottom-2 right-2 rounded-md bg-black/60 px-1.5 py-0.5 text-[11px] font-medium">
                {media.duration}
              </span>
            )}
          </>
        )}
        <span className="absolute left-2 top-2 rounded-md bg-black/40 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide">
          {media.type}
        </span>
      </div>

      <div className="p-4">
        <h3 className="mb-1 text-[14px] font-semibold leading-snug text-polar-950">
          {media.title}
        </h3>
        <div className="mb-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" /> {media.location}
          </span>
          <span className="flex items-center gap-1">
            <CalendarDays className="h-3.5 w-3.5" /> {media.year}
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {media.tags.map((tag) => (
            <Badge key={tag} className="bg-slate-100 text-slate-600">
              <Tags className="mr-1 h-2.5 w-2.5" /> {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}