import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Users,
  Ship,
  Target,
  Trophy,
  MapPin,
  BarChart3,
} from "lucide-react";
import {
  getExpeditionBySlug,
  getDatasetsAll,
  getMediaAll,
  getPublicationsAll,
} from "@/lib/repository";
import Badge from "@/components/UI";
import { getRegionColor } from "@/lib/data";
import JsonLd from "@/components/JsonLd";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { data: expedition } = await getExpeditionBySlug(slug);
  if (!expedition) return { title: "Not Found — PolarSagar" };
  return { title: `${expedition.name} — PolarSagar` };
}

export default async function ExpeditionDetailPage({ params }: Props) {
  const { slug } = await params;
  const { data: expedition } = await getExpeditionBySlug(slug);
  if (!expedition) notFound();

  const [{ data: allDatasets }, { data: allMedia }, { data: allPubs }] =
    await Promise.all([getDatasetsAll(), getMediaAll(), getPublicationsAll()]);

  const relatedDatasets = allDatasets
    .filter(
      (d) =>
        expedition.station.includes(d.station.split(",")[0]) ||
        d.station.includes(expedition.region),
    )
    .slice(0, 3);

  const relatedMedia = allMedia
    .filter(
      (m) =>
        m.expedition.includes(expedition.designation) ||
        m.location.includes(expedition.region),
    )
    .slice(0, 3);

  const relatedPub = allPubs
    .filter(
      (p) =>
        p.journal.includes("NCPOR") ||
        p.journal.includes("Glaciology") ||
        p.journal.includes("Southern Ocean"),
    )
    .slice(0, 2);

  const statusStyles: Record<string, string> = {
    active: "bg-emerald-100 text-emerald-700",
    completed: "bg-slate-200 text-slate-600",
    planned: "bg-amber-100 text-amber-700",
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Event",
          name: expedition.name,
          startDate: expedition.startDate,
          endDate: expedition.endDate,
          eventStatus:
            expedition.status === "active"
              ? "https://schema.org/EventScheduled"
              : "https://schema.org/EventScheduled",
          location: {
            "@type": "Place",
            name: `${expedition.region} — ${expedition.station}`,
            address: {
              addressRegion: "Antarctica / Arctic / Southern Ocean / Himalaya",
            },
          },
          organizer: {
            "@type": "GovernmentOrganization",
            name: "National Centre for Polar and Ocean Research (NCPOR)",
            parentOrganization: {
              "@type": "GovernmentOrganization",
              name: "Ministry of Earth Sciences, Government of India",
            },
          },
          description: expedition.summary,
        }}
      />
      <Link
        href="/expeditions"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-polar-600 transition hover:text-polar-700"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Expeditions
      </Link>

      <div
        className="mb-8 overflow-hidden rounded-3xl p-8 text-white shadow-xl"
        style={{ background: expedition.theme }}
      >
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <Badge className="bg-white/20 text-white backdrop-blur">
            {expedition.designation}
          </Badge>
          <Badge className={getRegionColor(expedition.region)}>
            {expedition.region}
          </Badge>
          <Badge className={statusStyles[expedition.status]}>
            {expedition.status}
          </Badge>
        </div>

        <h1 className="mb-4 text-3xl font-extrabold leading-tight sm:text-4xl">
          {expedition.name}
        </h1>

        <p className="max-w-2xl text-base leading-relaxed text-white/85">
          {expedition.summary}
        </p>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            {
              icon: CalendarDays,
              label: "Duration",
              value: `${expedition.startDate} → ${expedition.endDate}`,
            },
            {
              icon: Users,
              label: "Crew",
              value: `${expedition.crewCount} members`,
            },
            { icon: Ship, label: "Vessel", value: expedition.ship },
            { icon: MapPin, label: "Stations", value: expedition.station },
          ].map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="rounded-xl bg-white/10 p-3 backdrop-blur"
            >
              <div className="mb-0.5 text-xs font-medium uppercase tracking-wider text-white/60">
                <Icon className="mr-1 inline h-3.5 w-3.5" />
                {label}
              </div>
              <div className="text-sm font-bold text-white">{value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Objectives */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-polar-950">
            <Target className="h-5 w-5 text-polar-600" /> Research Objectives
          </h2>
          <ul className="space-y-2.5">
            {expedition.objectives.map((obj, i) => (
              <li
                key={i}
                className="flex gap-3 text-sm leading-relaxed text-slate-700"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-polar-100 text-xs font-bold text-polar-600">
                  {i + 1}
                </span>
                {obj}
              </li>
            ))}
          </ul>
        </div>

        {/* Highlights */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-polar-950">
            <Trophy className="h-5 w-5 text-emerald-500" /> Highlights
          </h2>
          {expedition.highlights.length === 0 ? (
            <p className="text-sm text-slate-500">
              No highlights yet for this expedition.
            </p>
          ) : (
            <ul className="space-y-2.5">
              {expedition.highlights.map((h, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-sm leading-relaxed text-slate-700"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-xs font-bold text-emerald-600">
                    ✓
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Related */}
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {relatedDatasets.length > 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="mb-3 text-sm font-bold text-polar-950">
              <BarChart3 className="mr-1 inline h-4 w-4 text-polar-600" />
              Related Datasets
            </h3>
            <ul className="space-y-2">
              {relatedDatasets.map((d) => (
                <li key={d.id}>
                  <Link
                    href="/datasets"
                    className="text-sm text-polar-600 hover:text-polar-700 hover:underline"
                  >
                    {d.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {relatedMedia.length > 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="mb-3 text-sm font-bold text-polar-950">
              📸 Related Media
            </h3>
            <ul className="space-y-2">
              {relatedMedia.map((m) => (
                <li key={m.id}>
                  <Link
                    href="/media"
                    className="text-sm text-polar-600 hover:text-polar-700 hover:underline"
                  >
                    {m.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {relatedPub.length > 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="mb-3 text-sm font-bold text-polar-950">
              📄 Related Publications
            </h3>
            <ul className="space-y-2">
              {relatedPub.map((p) => (
                <li key={p.id}>
                  <Link
                    href="/publications"
                    className="text-sm text-polar-600 hover:text-polar-700 hover:underline"
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}