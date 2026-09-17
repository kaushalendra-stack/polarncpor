import Link from "next/link";
import { Mountain } from "lucide-react";
import ExternalAnchor from "./ExternalAnchor";

const footerSections = [
  {
    title: "Quick Links",
    links: [
      { href: "/expeditions", label: "Expeditions" },
      { href: "/datasets", label: "Datasets" },
      { href: "/publications", label: "Publications" },
      { href: "/media", label: "Media Gallery" },
      { href: "/activities", label: "Activities & News" },
      { href: "/observatory", label: "Observatory" },
      { href: "/vessels", label: "Vessel Tracking" },
      { href: "/polar-timeline", label: "Polar Milestones" },
      { href: "/search", label: "Search" },
    ],
  },
  {
    title: "Portals",
    links: [
      { href: "/login", label: "Portals & Login" },
      { href: "/student", label: "Student Hub" },
      { href: "/scientist", label: "Scientist Portal" },
      { href: "/admin", label: "Admin Console" },
    ],
  },
  {
    title: "Open Data & Developers",
    links: [
      { href: "/api-docs", label: "Developer API" },
      { href: "/feed.xml", label: "RSS Feed" },
      { href: "/api/expeditions", label: "Expeditions API" },
      { href: "/api/datasets", label: "Datasets API" },
    ],
  },
  {
    title: "External Links",
    links: [
      { href: "https://ncpor.res.in", label: "NCPOR Website", external: true },
      { href: "https://moes.gov.in", label: "Ministry of Earth Sciences", external: true },
      { href: "https://npdc.ncpor.res.in", label: "National Polar Data Center", external: true },
      { href: "https://sih.gov.in", label: "Smart India Hackathon", external: true },
    ],
  },
  {
    title: "Policies",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Use" },
      { href: "/copyright", label: "Copyright Policy" },
      { href: "/disclaimer", label: "Disclaimer" },
      { href: "/hyperlinking", label: "Hyperlinking Policy" },
      { href: "/accessibility", label: "Accessibility Statement" },
      { href: "/contact", label: "Contact Us" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-polar-950 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-5">
          <div className="md:col-span-2">
            <div className="mb-3 flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-polar-800 text-white">
                <Mountain className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold text-white">PolarSagar</span>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-slate-500">
              Integrated Polar Science Outreach, Knowledge Repository &amp; Media
              Dissemination Portal. Developed under Smart India Hackathon 2026
              (SIH26063) for the National Centre for Polar and Ocean Research
              (NCPOR), Ministry of Earth Sciences, Government of India.
            </p>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-300">
                {section.title}
              </h4>
              <ul className="space-y-2 text-sm">
                {section.links.map((link) => (
                  <li key={link.href}>
                    {"external" in link && link.external ? (
                      <ExternalAnchor
                        href={(link as { href: string; label: string }).href}
                        className="text-slate-400 transition hover:text-white"
                      >
                        {(link as { href: string; label: string }).label}
                      </ExternalAnchor>
                    ) : (
                      <Link
                        href={link.href}
                        className="transition hover:text-white"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-polar-800 pt-6 text-xs text-slate-600">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-slate-400">
                National Centre for Polar and Ocean Research (NCPOR)
              </p>
              <p>
                Headland Sada, Vasco-da-Gama, Goa - 403804, India &bull;{" "}
                <a href="mailto:info@ncpor.res.in" className="hover:text-white">
                  info@ncpor.res.in
                </a>
              </p>
            </div>
            <div className="text-right">
              <p>
                Content Owned by NCPOR &bull; SIH26063 &bull; Ministry of
                Earth Sciences &copy; {new Date().getFullYear()}
              </p>
              <p>
                Last Updated On:{" "}
                {new Date().toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}