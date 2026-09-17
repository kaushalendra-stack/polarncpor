import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Database,
  BookOpen,
  Camera,
  Radar,
  Sparkles,
  CalendarClock,
  FlaskConical,
  BarChart3,
  LogIn,
} from "lucide-react";
import { getExpeditionsAll, getActivitiesAll, getPortalStats } from "@/lib/repository";
import { datasetCategories } from "@/lib/data";
import WeatherWidget from "@/components/WeatherWidget";
import ExpeditionCard from "@/components/ExpeditionCard";
import { SectionHeader } from "@/components/UI";
import JsonLd from "@/components/JsonLd";

export default async function HomePage() {
  const { data: expeditions } = await getExpeditionsAll();
  const { data: activities } = await getActivitiesAll();
  const featured = expeditions.filter((e) => e.recent).slice(0, 3);
  const latestNews = activities.slice(0, 3);
  const { stats } = await getPortalStats();

  return (
    <div>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "PolarSagar Portal",
            url: "https://polarncpor.vercel.app",
            description:
              "Integrated Polar Science Outreach, Knowledge Repository and Media Dissemination Portal of NCPOR, Ministry of Earth Sciences, Government of India.",
            publisher: {
              "@type": "GovernmentOrganization",
              name: "National Centre for Polar and Ocean Research (NCPOR)",
              parentOrganization: {
                "@type": "GovernmentOrganization",
                name: "Ministry of Earth Sciences, Government of India",
              },
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "GovernmentOrganization",
            name: "National Centre for Polar and Ocean Research (NCPOR)",
            alternateName: "NCPOR",
            url: "https://ncpor.res.in",
            email: "info@ncpor.res.in",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Headland Sada, Vasco-da-Gama",
              addressLocality: "Goa",
              addressCountry: "IN",
              postalCode: "403804",
            },
            parentOrganization: {
              "@type": "GovernmentOrganization",
              name: "Ministry of Earth Sciences",
              url: "https://moes.gov.in",
            },
          },
        ]}
      />
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-polar-950 via-polar-900 to-polar-700 text-white">
        <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-ice-400/10 blur-2xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-white/5 blur-2xl" />

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="max-w-2xl">
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wide">
                <Radar className="h-3.5 w-3.5 text-ice-300" />
                SIH26063 &bull; Ministry of Earth Sciences (MoES)
              </span>
              <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Polar Science{" "}
                <span className="bg-gradient-to-r from-ice-300 to-sky-200 bg-clip-text text-transparent">
                  Outreach &amp; Knowledge
                </span>{" "}
                Repository
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-300">
                Archive India&apos;s expedition reports, scientific datasets,
                publications, photographs and videos — and automatically generate
                engaging content for the website and social media. Built for NCPOR,
                India&apos;s polar research gateway.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/expeditions"
                  className="inline-flex items-center gap-2 rounded-xl bg-ice-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-ice-500/25 transition hover:bg-ice-400"
                >
                  Explore Expeditions <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/datasets"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
                >
                  Browse Datasets
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
                >
                  <LogIn className="h-4 w-4" aria-hidden="true" /> Student / Scientist / Admin
                </Link>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/images/hero-polar.svg"
                alt="Illustration of an Indian research vessel sailing toward Antarctic icebergs at sunrise"
                className="w-full rounded-3xl border border-white/10 shadow-2xl shadow-polar-950/40"
                width={800}
                height={480}
                priority
              />
              <div className="pointer-events-none absolute -top-4 -right-4 h-24 w-24 rounded-full bg-ice-400/20 blur-xl" />
            </div>
          </div>

          <div className="mt-12">
            <WeatherWidget />
          </div>

          {/* STATS */}
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {[
              { value: stats.expeditions, label: "Expeditions" },
              { value: stats.datasets, label: "Scientific Datasets" },
              { value: stats.publications, label: "Publications" },
              { value: stats.stations, label: "Research Stations" },
              { value: stats.yearsOfPolarPresence, label: "Years in Polar" },
              { value: stats.mediaAssets, label: "Media Assets" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur"
              >
                <div className="text-2xl font-extrabold text-white">
                  {s.value}
                </div>
                <div className="mt-1 text-[11px] font-medium uppercase tracking-wider text-slate-400">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED EXPEDITIONS */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <SectionHeader title="Featured Expeditions" subtitle="Live expedition updates and archives from India's polar programmes" />
          <Link
            href="/expeditions"
            className="mb-6 hidden items-center gap-1 text-sm font-semibold text-polar-600 hover:text-polar-700 sm:flex"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((expedition) => (
            <ExpeditionCard key={expedition.slug} expedition={expedition} />
          ))}
        </div>
      </section>

      {/* DATASET CATEGORIES */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between">
            <SectionHeader
              title="Explore Scientific Datasets"
              subtitle="810+ datasets served by the National Polar Data Center, surfaced here by category"
            />
            <Link
              href="/datasets"
              className="mb-6 hidden items-center gap-1 text-sm font-semibold text-polar-600 hover:text-polar-700 sm:flex"
            >
              Browse all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {datasetCategories.map((cat) => (
              <Link
                key={cat.name}
                href={`/datasets?category=${encodeURIComponent(cat.name)}`}
                className="group rounded-2xl border border-slate-200 p-5 transition hover:-translate-y-0.5 hover:border-polar-300 hover:shadow-md"
              >
                <div className="mb-3 text-3xl transition group-hover:scale-110">
                  {cat.icon}
                </div>
                <div className="mb-0.5 text-sm font-bold text-polar-950">
                  {cat.name}
                </div>
                <div className="text-xs font-semibold text-slate-400">
                  {cat.count} datasets
                </div>
                <p className="mt-1.5 line-clamp-2 text-xs text-slate-500">
                  {cat.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* NEWS */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <SectionHeader title="Institutional Activities" subtitle="News, conferences and outreach from around the polar programme" />
          <Link
            href="/activities"
            className="mb-6 hidden items-center gap-1 text-sm font-semibold text-polar-600 hover:text-polar-700 sm:flex"
          >
            All activities <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {latestNews.map((item) => (
            <Link
              key={item.id}
              href="/activities"
              className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="mb-3 flex items-center gap-2 text-xs">
                <span className="rounded-full bg-polar-50 px-2.5 py-1 font-semibold text-polar-600">
                  {item.category}
                </span>
                <span className="flex items-center gap-1 text-slate-400">
                  <CalendarClock className="h-3.5 w-3.5" />
                  {new Date(item.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
              <h3 className="mb-2 text-[15px] font-semibold leading-snug text-polar-950 group-hover:text-polar-600">
                {item.title}
              </h3>
              <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-slate-600">
                {item.summary}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* OBSERVATORY */}
      <section className="border-b border-slate-200 bg-gradient-to-br from-sky-50 to-blue-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-xl">
              <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-polar-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-polar-700">
                <BarChart3 className="h-3.5 w-3.5" /> Polar Observatory
              </span>
              <h2 className="text-3xl font-extrabold text-polar-950">
                See the science, not just the archive
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                Interactive charts of Antarctic temperature trends since 1940, the
                seasonal sea-ice cycle, live station climate and the full spread of
                datasets in the National Polar Data Center.
              </p>
            </div>
            <Link
              href="/observatory"
              className="inline-flex items-center gap-2 rounded-xl bg-polar-600 px-6 py-3 text-sm font-bold text-white shadow shadow-polar-600/20 transition hover:bg-polar-700"
            >
              Open Observatory <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* AUTO CONTENT ENGINE */}
      <section className="bg-gradient-to-br from-polar-950 to-polar-800 text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-ice-400/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-ice-300">
              <Sparkles className="h-3.5 w-3.5" /> AI-Powered Dissemination
            </span>
            <h2 className="text-3xl font-extrabold leading-tight">
              One upload. Every channel covered.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-300">
              The portal automatically turns new reports, datasets and
              expedition updates into ready-to-publish content for the official
              website, Twitter, Facebook, Instagram and YouTube — with review,
              scheduling and engagement analytics built in.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-slate-200">
              <li className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                  <FlaskConical className="h-4 w-4 text-ice-300" />
                </div>
                Auto-summarizes expedition reports into social posts
              </li>
              <li className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                  <Camera className="h-4 w-4 text-ice-300" />
                </div>
                Smart-tags photographs by location, wildlife and activity
              </li>
              <li className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                  <Database className="h-4 w-4 text-ice-300" />
                </div>
                Platform-specific formatting &amp; scheduled publishing
              </li>
              <li className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                  <BookOpen className="h-4 w-4 text-ice-300" />
                </div>
                Engagement analytics to optimise the next post
              </li>
            </ul>
            <Link
              href="/admin"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-ice-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-ice-500/25 transition hover:bg-ice-400"
            >
              Try the Content Studio <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Fake social preview */}
          <div className="space-y-4">
            <div className="animate-fade-up rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <div className="mb-2 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-ice-400 to-polar-500 text-sm">
                  🐧
                </div>
                <div>
                  <div className="text-sm font-bold">NCPOR Outreach</div>
                  <div className="text-xs text-slate-400">
                    @NCPOR_India &bull; 11:24 AM
                  </div>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-slate-200">
                🧊 <strong>46th ISEA update:</strong> Winter-over crew at
                Bharati completes balloon launch #500 this season! Their
                readings feed our ozone and radiation monitoring wall at
                Maitri. Read the full report → ncpor.res.in/isea-46
              </p>
              <div className="mt-3 flex gap-5 text-xs text-slate-400">
                <span>❤️ 1,204</span> <span>🔁 386</span> <span>💬 92</span>
              </div>
            </div>

            <div
              className="animate-fade-up rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur"
              style={{ animationDelay: "0.15s" }}
            >
              <div className="mb-2 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 text-sm">
                  📸
                </div>
                <div>
                  <div className="text-sm font-bold">PolarSagar</div>
                  <div className="text-xs text-slate-400">
                    New uploads &bull; 3 min ago
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {["🐧", "🧊", "🌌"].map((e, i) => (
                  <div
                    key={i}
                    className="flex aspect-square items-center justify-center rounded-xl bg-gradient-to-br from-sky-500/40 to-indigo-600/40 text-3xl"
                  >
                    {e}
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-slate-400">
                Auto-tagged: <em>penguin, glacier, aurora</em> • queued for
                Twitter &amp; Instagram
              </p>
            </div>

            <div
              className="animate-fade-up flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
              style={{ animationDelay: "0.3s" }}
            >
              <CalendarClock className="h-5 w-5 text-ice-300" />
              <div className="text-sm text-slate-200">
                Scheduled: <strong>5 posts</strong> across 3 platforms this week
              </div>
              <span className="ml-auto rounded-full bg-emerald-400/15 px-2.5 py-1 text-xs font-bold text-emerald-300">
                Auto-pilot on
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}