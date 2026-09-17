import { FileText, CalendarDays, ExternalLink, BookOpen } from "lucide-react";
import type { Publication } from "@/lib/types";

export default function PublicationCard({
  publication,
}: {
  publication: Publication;
}) {
  return (
    <div className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
        <FileText className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="mb-1 text-[15px] font-semibold leading-snug text-polar-950">
          {publication.title}
        </h3>
        <div className="mb-2 text-sm text-slate-600">{publication.authors}</div>
        <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5" /> {publication.journal}
          </span>
          <span className="flex items-center gap-1">
            <CalendarDays className="h-3.5 w-3.5" /> {publication.year}
          </span>
          <span className="rounded-full bg-slate-100 px-2 py-0.5 font-medium text-slate-600">
            {publication.type}
          </span>
        </div>
        <a
          href={`https://doi.org/${publication.doi}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-semibold text-polar-600 hover:text-polar-700"
        >
          <ExternalLink className="h-3.5 w-3.5" /> DOI: {publication.doi}
        </a>
      </div>
    </div>
  );
}