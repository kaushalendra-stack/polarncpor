import type { Metadata } from "next";
import { CalendarDays, Award, Milestone, Flag, GraduationCap } from "lucide-react";
import { SectionHeader } from "@/components/UI";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Polar Milestones — PolarNCPOR | NCPOR, Government of India",
  description:
    "A timeline of India's polar programme from the first Antarctic expedition in 1981 to the present — stations, policies and scientific milestones.",
};

const milestones = [
  {
    year: "1981",
    title: "First Indian Antarctic Expedition (IAE-1)",
    desc: "A 21-member team led by Dr S.Z. Qasim lands on Antarctica and plants the Indian flag — launching India's scientific foray to the southern continent.",
    icon: Flag,
    tag: "Expedition",
  },
  {
    year: "1983",
    title: "India accedes to the Antarctic Treaty",
    desc: "India becomes a Consultative Party, gaining voting rights in Antarctic governance and committing to peaceful scientific cooperation.",
    icon: Award,
    tag: "Policy",
  },
  {
    year: "1989",
    title: "Maitri Station established",
    desc: "The second Indian station opens at Schirmacher Oasis, replacing the earlier Dakshin Gangotri base as the primary hub for Indian Antarctic science.",
    icon: Milestone,
    tag: "Station",
  },
  {
    year: "1990",
    title: "Gangotri Glacier research in Himalaya",
    desc: "The Himansh research station (Himalaya) anchors India's cryosphere research on the pristine Himalayan glacier system.",
    icon: GraduationCap,
    tag: "Research",
  },
  {
    year: "2008",
    title: "First Indian expedition to the Arctic",
    desc: "India commissions its first scientific expedition to the Arctic and opens Himadri research station at Ny-Ålesund, Svalbard.",
    icon: Flag,
    tag: "Expedition",
  },
  {
    year: "2012",
    title: "Bharati Station commissioned",
    desc: "India's third Antarctic station at Larsemann Hills becomes fully operational after construction from 2008 — an advanced scientific facility.",
    icon: Milestone,
    tag: "Station",
  },
  {
    year: "2014",
    title: "National Antarctic Programme restructured",
    desc: "NCPOR becomes the nodal agency for the National Antarctic Scientific Programme, integrating ocean, polar and cryosphere research.",
    icon: Award,
    tag: "Policy",
  },
  {
    year: "2018",
    title: "40 years of Indian Antarctic presence",
    desc: "India completes four decades of continuous scientific presence in Antarctica, with over 1,000 scholars having wintered over.",
    icon: CalendarDays,
    tag: "Milestone",
  },
  {
    year: "2022",
    title: "East Antarctic warming report",
    desc: "NCPOR Annual Report documents rapid warming over East Antarctica since the 1940s — a landmark contribution to climate science.",
    icon: GraduationCap,
    tag: "Research",
  },
  {
    year: "2023",
    title: "1,000th expedition member wintered",
    desc: "Indian Antarctic Programme crosses a milestone in manpower rotas, logistics and polar medicine capabilities.",
    icon: CalendarDays,
    tag: "Milestone",
  },
  {
    year: "2024–25",
    title: "44th Indian Scientific Expedition to Antarctica",
    desc: "Current expedition operates across Maitri and Bharati with revamped climate and geoscience campaigns amid global sea-ice records.",
    icon: Flag,
    tag: "Expedition",
  },
];

export default function PolarTimelinePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Polar Milestones — Indian Antarctic Programme",
          description:
            "Timeline of India's polar programme from 1981 to the present.",
          isPartOf: {
            "@type": "WebSite",
            name: "PolarNCPOR Portal",
          },
        }}
      />
      <div className="mb-8 rounded-2xl bg-gradient-to-r from-polar-950 to-polar-800 p-6 text-white">
        <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-polar-300">
          <Milestone className="h-3.5 w-3.5" aria-hidden="true" /> Polar Heritage
        </div>
        <h1 className="text-3xl font-extrabold">Milestones of India&apos;s Polar Programme</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-300">
          From the first flag-planting at Antarctica in 1981 to today&apos;s network of
          four research stations across Antarctica, the Arctic and the Himalaya —
          explore the expeditionary journey of more than four decades.
        </p>
      </div>

      <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { value: "45+", label: "Antarctic Expeditions" },
          { value: "4", label: "Research Stations" },
          { value: "40+", label: "Years of Presence" },
          { value: "2", label: "Continents + Himalaya" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm">
            <div className="text-2xl font-extrabold text-polar-950">{s.value}</div>
            <div className="mt-1 text-[11px] font-medium uppercase tracking-wider text-slate-500">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <section>
        <SectionHeader title="Timeline" />
        <ol className="relative space-y-8 border-l-2 border-slate-200 pl-8">
          {milestones.map((m) => (
            <li key={m.year} className="relative">
              <span
                className="absolute -left-[45px] flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-polar-600 text-white shadow"
                aria-hidden="true"
              >
                <m.icon className="h-4 w-4" />
              </span>
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <span className="text-lg font-extrabold tracking-tight text-polar-800">
                    {m.year}
                  </span>
                  <span className="rounded-full bg-ice-100 px-2.5 py-0.5 text-[11px] font-bold text-polar-700">
                    {m.tag}
                  </span>
                </div>
                <h3 className="mb-1 font-bold text-polar-950">{m.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{m.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <p className="mt-8 text-xs text-slate-500">
        Sources: NCPOR Annual Reports, Antarctic Treaty Secretariat records, official
        Ministry of Earth Sciences releases. Timeline is illustrative for the hackathon
        demo and will be extended with full expedition-by-expedition archives.
      </p>
    </div>
  );
}