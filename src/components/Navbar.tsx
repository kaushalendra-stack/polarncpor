import Link from "next/link";
import { Mountain, Search, LogIn } from "lucide-react";

const navLinks = [
  { href: "/expeditions", label: "Expeditions" },
  { href: "/datasets", label: "Datasets" },
  { href: "/publications", label: "Publications" },
  { href: "/media", label: "Media" },
  { href: "/activities", label: "Activities" },
  { href: "/observatory", label: "Observatory" },
  { href: "/vessels", label: "Vessels" },
  { href: "/polar-timeline", label: "History" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2.5"
          aria-label="PolarSagar — home"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-polar-600 to-ice-500 text-white shadow-sm">
            <Mountain className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="leading-tight">
            <div className="text-[15px] font-bold text-polar-900">PolarSagar</div>
            <div className="text-[10px] font-medium uppercase tracking-widest text-slate-500">
              NCPOR Outreach Portal
            </div>
          </div>
        </Link>

        <nav aria-label="Main navigation">
          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-polar-50 hover:text-polar-700 focus:outline-none focus:ring-2 focus:ring-polar-400"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/search"
            aria-label="Search the portal"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-polar-50 hover:text-polar-700 focus:outline-none focus:ring-2 focus:ring-polar-400"
          >
            <Search className="h-5 w-5" aria-hidden="true" />
          </Link>
          <Link
            href="/login"
            className="flex items-center gap-1.5 rounded-lg bg-polar-600 px-3.5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-polar-700 focus:outline-none focus:ring-2 focus:ring-polar-400 focus:ring-offset-2"
          >
            <LogIn className="h-4 w-4" aria-hidden="true" />
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}