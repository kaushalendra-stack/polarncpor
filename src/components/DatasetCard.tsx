import { Database, Download, MapPin, HardDrive, FileText } from "lucide-react";
import type { Dataset } from "@/lib/types";

export default function DatasetCard({ dataset }: { dataset: Dataset }) {
  return (
    <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="mb-3 flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-polar-50 text-polar-600">
          <Database className="h-5 w-5" />
        </div>
        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600">
          {dataset.category}
        </span>
      </div>

      <h3 className="mb-1.5 text-[15px] font-semibold leading-snug text-polar-950">
        {dataset.title}
      </h3>
      <p className="mb-4 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-600">
        {dataset.description}
      </p>

      <div className="mb-4 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-slate-500">
        <span className="flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5" /> {dataset.station}
        </span>
        <span className="flex items-center gap-1">
          <FileText className="h-3.5 w-3.5" /> {dataset.format}
        </span>
        <span className="flex items-center gap-1">
          <HardDrive className="h-3.5 w-3.5" /> {dataset.size}
        </span>
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 pt-3">
        <span className="text-xs text-slate-400">{dataset.records}</span>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-lg bg-polar-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-polar-700"
        >
          <Download className="h-3.5 w-3.5" /> Preview
        </button>
      </div>
    </div>
  );
}