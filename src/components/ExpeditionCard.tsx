import Link from "next/link";
import { ArrowRight, CalendarDays, Users } from "lucide-react";
import type { Expedition } from "@/lib/types";
import Badge from "./UI";
import { getRegionColor } from "@/lib/data";

const statusStyles: Record<Expedition["status"], string> = {
  active: "bg-emerald-100 text-emerald-700",
  completed: "bg-slate-200 text-slate-600",
  planned: "bg-amber-100 text-amber-700",
};

export default function ExpeditionCard({
  expedition,
}: {
  expedition: Expedition;
}) {
  return (
    <Link
      href={`/expeditions/${expedition.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div
        className="relative flex h-36 items-end justify-between bg-gradient-to-br p-4 text-white"
        style={{ background: expedition.theme }}
      >
        <span className="absolute right-3 top-3 text-4xl opacity-30 transition group-hover:scale-110">
          {expedition.region === "Antarctica"
            ? "🐧"
            : expedition.region === "Arctic"
              ? "🦊"
              : expedition.region === "Southern Ocean"
                ? "🐋"
                : "🏔️"}
        </span>
        <Badge className="bg-white/20 text-white backdrop-blur">
          {expedition.designation}
        </Badge>
        <Badge className={`${statusStyles[expedition.status]}`}>
          {expedition.status}
        </Badge>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="text-[15px] font-semibold leading-snug text-polar-950 group-hover:text-polar-600">
          {expedition.name}
        </h3>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
          <Badge className={getRegionColor(expedition.region)}>
            {expedition.region}
          </Badge>
          <span className="flex items-center gap-1">
            <CalendarDays className="h-3.5 w-3.5" /> {expedition.year}
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" /> {expedition.crewCount}
          </span>
        </div>

        <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-slate-600">
          {expedition.summary}
        </p>

        <span className="inline-flex items-center gap-1 text-sm font-semibold text-polar-600">
          Explore
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}